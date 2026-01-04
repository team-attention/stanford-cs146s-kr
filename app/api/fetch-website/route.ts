/**
 * POST /api/fetch-website
 *
 * 웹사이트 콘텐츠를 가져와 Markdown으로 변환 (Firecrawl API 사용)
 * Reddit은 Firecrawl에서 지원하지 않으므로 Reddit JSON API로 fallback
 *
 * ** 캐시 우선순위 **
 * 1. data/website-markdown/ 폴더에 저장된 Markdown 파일 (정적 파일, Production에서도 동작)
 * 2. .cache/websites/ 폴더의 캐시 (로컬 개발 환경용)
 * 3. Firecrawl API 호출 (API 키 필요)
 *
 * @request
 * {
 *   "url": "https://example.com"
 * }
 *
 * @response
 * {
 *   "url": "https://example.com",
 *   "markdown": "...",
 *   "fetchedAt": "2026-01-02T00:00:00.000Z"
 * }
 *
 * @errors
 * - 400: URL이 누락되거나 잘못됨
 * - 500: FIRECRAWL_API_KEY 미설정 또는 콘텐츠 가져오기 실패
 */

// Node.js 런타임 사용 (fs, path 모듈 필요)
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import FirecrawlApp from '@mendable/firecrawl-js';

// 정적 Markdown 파일 저장 디렉토리 (Production에서도 동작)
const STATIC_MARKDOWN_DIR = path.join(process.cwd(), 'data', 'website-markdown');

// URL을 Base64로 인코딩하여 파일명 생성 (+ → -, / → _, = 제거)
function urlToFilename(url: string): string {
  return Buffer.from(url).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// 저장된 정적 Markdown 파일에서 읽기
// 파일명이 길어서 잘리고 해시가 추가된 경우도 처리
function getStaticMarkdown(url: string): string | null {
  try {
    const base64Prefix = urlToFilename(url);

    // 1. 정확한 파일명 매칭 시도
    const exactFilename = base64Prefix + '.md';
    const exactFilePath = path.join(STATIC_MARKDOWN_DIR, exactFilename);
    if (fs.existsSync(exactFilePath)) {
      console.log('[Fetch Website] Static markdown found (exact):', exactFilename);
      return fs.readFileSync(exactFilePath, 'utf-8');
    }

    // 2. Prefix 매칭 시도 (파일명이 잘리고 해시가 추가된 경우)
    // 예: aHR0cHM6Ly9ncmFwaGl0ZS5kZXYvZ3VpZGVzL2FpLWNvZGUtcm_44a0b507.md
    if (fs.existsSync(STATIC_MARKDOWN_DIR)) {
      const files = fs.readdirSync(STATIC_MARKDOWN_DIR);
      // Base64 prefix의 앞 36자로 매칭 (충분히 고유함)
      const shortPrefix = base64Prefix.substring(0, 36);

      for (const file of files) {
        if (file.startsWith(shortPrefix) && file.endsWith('.md')) {
          console.log('[Fetch Website] Static markdown found (prefix match):', file);
          return fs.readFileSync(path.join(STATIC_MARKDOWN_DIR, file), 'utf-8');
        }
      }
    }
  } catch (err) {
    console.warn('[Fetch Website] Static markdown read failed:', err);
  }
  return null;
}

// Reddit URL 감지
function isRedditUrl(url: string): boolean {
  return url.includes('reddit.com') || url.includes('redd.it');
}

// Reddit JSON API로 콘텐츠 가져오기
async function fetchRedditContent(url: string): Promise<string> {
  // URL 정규화: 끝에 .json 추가
  let jsonUrl = url;
  if (url.endsWith('/')) {
    jsonUrl = `${url}.json`;
  } else {
    jsonUrl = `${url}/.json`;
  }

  console.log('[Fetch Website] Reddit detected, using JSON API:', jsonUrl);

  const response = await fetch(jsonUrl, {
    headers: {
      'User-Agent': 'TheModernSoftware/1.0 (Educational Project)',
    },
  });

  if (!response.ok) {
    throw new Error(`Reddit API returned ${response.status}`);
  }

  const data = await response.json();

  // Reddit JSON 구조 파싱
  // data[0] = 포스트 정보, data[1] = 댓글들
  const post = data[0]?.data?.children?.[0]?.data;
  const comments = data[1]?.data?.children || [];

  if (!post) {
    throw new Error('Failed to parse Reddit post data');
  }

  // Markdown 형식으로 변환
  let markdown = `# ${post.title}\n\n`;
  markdown += `**Subreddit**: r/${post.subreddit}\n`;
  markdown += `**Author**: u/${post.author}\n`;
  markdown += `**Score**: ${post.score} points\n`;
  markdown += `**Posted**: ${new Date(post.created_utc * 1000).toISOString()}\n\n`;
  markdown += `---\n\n`;

  // 본문 (selftext)
  if (post.selftext) {
    markdown += `## Post Content\n\n${post.selftext}\n\n`;
  }

  // 외부 링크인 경우
  if (post.url && !post.is_self) {
    markdown += `**Link**: ${post.url}\n\n`;
  }

  // 상위 댓글들 추가
  markdown += `---\n\n## Top Comments\n\n`;

  const topComments = comments.slice(0, 10); // 상위 10개 댓글만
  for (const comment of topComments) {
    const c = comment.data;
    if (c && c.body && c.author) {
      markdown += `### u/${c.author} (${c.score || 0} points)\n\n`;
      markdown += `${c.body}\n\n`;
    }
  }

  return markdown;
}

const CACHE_DIR = path.join(process.cwd(), '.cache', 'websites');

// 서버리스 환경 감지 (Vercel, AWS Lambda 등)
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY;

// 캐시 디렉토리 생성 시도 (서버리스 환경에서는 스킵)
let cacheEnabled = false;
if (!isServerless) {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
    cacheEnabled = true;
  } catch (err) {
    console.warn('[Fetch Website] Cache directory creation failed, caching disabled:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    // JSON 파싱 에러 방어적 처리
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const { url } = body || {};

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    console.log('[Fetch Website] URL:', url);

    // 1. 먼저 정적 Markdown 파일 확인 (Production에서도 동작, API 키 불필요)
    const staticMarkdown = getStaticMarkdown(url);
    if (staticMarkdown) {
      console.log('[Fetch Website] Using static markdown file');
      return NextResponse.json({
        url,
        markdown: staticMarkdown,
        fetchedAt: new Date().toISOString(),
        source: 'static',
      });
    }

    // 2. Generate cache filename
    const urlHash = Buffer.from(url).toString('base64').replace(/[/+=]/g, '_');
    const cacheFile = path.join(CACHE_DIR, `${urlHash}.json`);

    // 3. Check cache (서버리스 환경에서는 스킵)
    if (cacheEnabled) {
      try {
        if (fs.existsSync(cacheFile)) {
          console.log('[Fetch Website] Cache hit');
          const cachedData = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
          return NextResponse.json(cachedData);
        }
      } catch (cacheReadError) {
        console.warn('[Fetch Website] Cache read failed:', cacheReadError);
      }
    }

    let markdown = '';

    // 4. Reddit URL인 경우 Reddit JSON API 사용 (Firecrawl에서 지원하지 않음)
    if (isRedditUrl(url)) {
      console.log('[Fetch Website] Reddit URL detected, using fallback...');
      markdown = await fetchRedditContent(url);
    } else {
      // 5. Validate Firecrawl API key (캐시 미스 시에만 필요)
      const apiKey = process.env.FIRECRAWL_API_KEY;
      if (!apiKey) {
        console.error('[Fetch Website] FIRECRAWL_API_KEY not configured');
        return NextResponse.json(
          { error: 'FIRECRAWL_API_KEY가 설정되지 않았습니다. 저장된 데이터가 없습니다.' },
          { status: 500 }
        );
      }

      console.log('[Fetch Website] Fetching content via Firecrawl...');

      // Use Firecrawl to scrape website
      const app = new FirecrawlApp({ apiKey });

      const scrapeResult = await app.scrape(url, {
        formats: ['markdown'],
      });

      markdown = scrapeResult.markdown || '';
    }

    console.log(`[Fetch Website] Extracted markdown (${markdown.length} chars)`);

    if (!markdown) {
      throw new Error('No markdown content extracted');
    }

    const result = {
      url,
      markdown,
      fetchedAt: new Date().toISOString(),
    };

    // Cache the result (서버리스 환경에서는 스킵)
    if (cacheEnabled) {
      try {
        fs.writeFileSync(cacheFile, JSON.stringify(result, null, 2));
        console.log('[Fetch Website] Cached result');
      } catch (cacheWriteError) {
        console.warn('[Fetch Website] Cache write failed:', cacheWriteError);
      }
    } else {
      console.log('[Fetch Website] Caching skipped (serverless environment)');
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[Fetch Website] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch website' },
      { status: 500 }
    );
  }
}

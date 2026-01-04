/**
 * GET /api/get-cached-markdown?url=...
 *
 * data/ 디렉토리에서 캐시된 마크다운 파일을 읽어옴
 *
 * 우선순위:
 * 1. data/website-markdown-formatted/{base64}_{hash}.md (포맷팅된 버전)
 * 2. data/website-markdown/{base64}.md (원본 버전)
 */

export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
const FORMATTED_DIR = path.join(DATA_DIR, 'website-markdown-formatted');
const RAW_DIR = path.join(DATA_DIR, 'website-markdown');

// URL을 Base64로 인코딩 (+ → -, / → _, = 제거)
function urlToBase64(url: string): string {
  return Buffer.from(url).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// URL의 짧은 해시 생성 (8자)
function urlToHash(url: string): string {
  return crypto.createHash('md5').update(url).digest('hex').slice(0, 8);
}

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const base64 = urlToBase64(url);
    const hash = urlToHash(url);

    // 1. 포맷팅된 버전 확인 (website-markdown-formatted/{base64}_{hash}.md)
    const formattedFilename = `${base64}_${hash}.md`;
    const formattedPath = path.join(FORMATTED_DIR, formattedFilename);

    if (fs.existsSync(formattedPath)) {
      console.log('[Get Cached Markdown] Formatted found:', formattedFilename);
      const markdown = fs.readFileSync(formattedPath, 'utf-8');
      return NextResponse.json({
        exists: true,
        source: 'formatted',
        markdown,
      });
    }

    // 2. 원본 버전 확인 (website-markdown/{base64}.md)
    const rawFilename = `${base64}.md`;
    const rawPath = path.join(RAW_DIR, rawFilename);

    if (fs.existsSync(rawPath)) {
      console.log('[Get Cached Markdown] Raw found:', rawFilename);
      const markdown = fs.readFileSync(rawPath, 'utf-8');
      return NextResponse.json({
        exists: true,
        source: 'raw',
        markdown,
      });
    }

    // 3. 캐시 없음
    console.log('[Get Cached Markdown] No cache for:', url);
    return NextResponse.json({
      exists: false,
      source: null,
      markdown: null,
    });
  } catch (error: any) {
    console.error('[Get Cached Markdown] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to read cached markdown' },
      { status: 500 }
    );
  }
}

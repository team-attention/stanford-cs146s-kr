import { NextRequest, NextResponse } from 'next/server';
import { parseGitHubUrl, getRawGitHubUrl, type GitHubRepoInfo } from '@/lib/utils/github-parser';

/**
 * POST /api/fetch-github
 *
 * GitHub 저장소의 콘텐츠를 가져옵니다.
 * - README.md 파일 내용
 * - 특정 파일 내용
 * - 디렉토리 파일 목록
 *
 * @request { "url": "https://github.com/owner/repo/..." }
 * @response {
 *   "type": "file" | "directory" | "readme",
 *   "content": "...",
 *   "files": [...],
 *   "readme": "...",
 *   "repoInfo": { owner, repo, branch, path }
 * }
 */

interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size?: number;
  download_url?: string;
}

interface GitHubContentResponse {
  type: 'file' | 'directory' | 'readme';
  content?: string;
  files?: GitHubFile[];
  readme?: string;
  assignment?: string;  // assignment.md 파일 내용
  repoInfo: GitHubRepoInfo;
  error?: string;
}

// GitHub API로 기본 브랜치 가져오기
async function getDefaultBranch(owner: string, repo: string): Promise<string> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'themodernsoftware-viewer',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.default_branch || 'main';
    }
  } catch (error) {
    console.error('[fetch-github] Failed to get default branch:', error);
  }
  return 'main';
}

// 파일 내용 가져오기
async function fetchFileContent(owner: string, repo: string, branch: string, path: string): Promise<string | null> {
  const rawUrl = getRawGitHubUrl(owner, repo, branch, path);

  try {
    const response = await fetch(rawUrl);
    if (response.ok) {
      return await response.text();
    }

    // main 브랜치가 실패하면 master 시도
    if (branch === 'main') {
      const masterUrl = getRawGitHubUrl(owner, repo, 'master', path);
      const masterResponse = await fetch(masterUrl);
      if (masterResponse.ok) {
        return await masterResponse.text();
      }
    }
  } catch (error) {
    console.error('[fetch-github] Failed to fetch file:', error);
  }

  return null;
}

// 디렉토리 내용 가져오기
async function fetchDirectoryContents(owner: string, repo: string, branch: string, path: string): Promise<GitHubFile[]> {
  const apiUrl = path
    ? `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`
    : `https://api.github.com/repos/${owner}/${repo}/contents?ref=${branch}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'themodernsoftware-viewer',
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        return data.map((item: any) => ({
          name: item.name,
          path: item.path,
          type: item.type === 'dir' ? 'dir' : 'file',
          size: item.size,
          download_url: item.download_url,
        }));
      }
    }

    // main 브랜치가 실패하면 master 시도
    if (branch === 'main') {
      const masterApiUrl = path
        ? `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=master`
        : `https://api.github.com/repos/${owner}/${repo}/contents?ref=master`;

      const masterResponse = await fetch(masterApiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'themodernsoftware-viewer',
        },
      });

      if (masterResponse.ok) {
        const masterData = await masterResponse.json();
        if (Array.isArray(masterData)) {
          return masterData.map((item: any) => ({
            name: item.name,
            path: item.path,
            type: item.type === 'dir' ? 'dir' : 'file',
            size: item.size,
            download_url: item.download_url,
          }));
        }
      }
    }
  } catch (error) {
    console.error('[fetch-github] Failed to fetch directory:', error);
  }

  return [];
}

// README 파일 찾기
async function fetchReadme(owner: string, repo: string, branch: string, basePath: string = ''): Promise<string | null> {
  const readmeNames = ['README.md', 'readme.md', 'Readme.md', 'README.MD', 'README'];

  for (const name of readmeNames) {
    const path = basePath ? `${basePath}/${name}` : name;
    const content = await fetchFileContent(owner, repo, branch, path);
    if (content) {
      return content;
    }
  }

  return null;
}

// assignment.md 파일 찾기
async function fetchAssignment(owner: string, repo: string, branch: string, basePath: string = ''): Promise<string | null> {
  const assignmentNames = ['assignment.md', 'Assignment.md', 'ASSIGNMENT.md'];

  for (const name of assignmentNames) {
    const path = basePath ? `${basePath}/${name}` : name;
    const content = await fetchFileContent(owner, repo, branch, path);
    if (content) {
      return content;
    }
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const repoInfo = parseGitHubUrl(url);
    if (!repoInfo) {
      return NextResponse.json(
        { error: 'Invalid GitHub URL' },
        { status: 400 }
      );
    }

    const branch = repoInfo.branch || await getDefaultBranch(repoInfo.owner, repoInfo.repo);
    const result: GitHubContentResponse = {
      type: 'readme',
      repoInfo: { ...repoInfo, branch },
    };

    // 파일인 경우
    if (repoInfo.type === 'file' && repoInfo.path) {
      const content = await fetchFileContent(repoInfo.owner, repoInfo.repo, branch, repoInfo.path);
      if (content) {
        result.type = 'file';
        result.content = content;
      } else {
        result.error = 'Failed to fetch file content';
      }
    }
    // 디렉토리인 경우
    else if (repoInfo.type === 'tree') {
      const files = await fetchDirectoryContents(repoInfo.owner, repoInfo.repo, branch, repoInfo.path || '');
      const readme = await fetchReadme(repoInfo.owner, repoInfo.repo, branch, repoInfo.path || '');
      const assignment = await fetchAssignment(repoInfo.owner, repoInfo.repo, branch, repoInfo.path || '');

      result.type = 'directory';
      result.files = files;
      if (readme) {
        result.readme = readme;
      }
      if (assignment) {
        result.assignment = assignment;
      }
    }
    // 저장소 루트인 경우
    else {
      const files = await fetchDirectoryContents(repoInfo.owner, repoInfo.repo, branch, '');
      const readme = await fetchReadme(repoInfo.owner, repoInfo.repo, branch);
      const assignment = await fetchAssignment(repoInfo.owner, repoInfo.repo, branch);

      result.type = 'directory';
      result.files = files;
      if (readme) {
        result.readme = readme;
      }
      if (assignment) {
        result.assignment = assignment;
      }
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[fetch-github] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'GitHub Content Fetcher API',
    version: '1.0.0',
  });
}

/**
 * GitHub URL parsing utilities
 */

export interface GitHubRepoInfo {
  owner: string;
  repo: string;
  branch?: string;
  path?: string;
  type?: 'file' | 'tree' | 'repo';
}

/**
 * Parse GitHub URL to extract repository information
 * @param url - GitHub URL in any format
 * @returns Repository info or null if not valid
 *
 * @example
 * parseGitHubUrl("https://github.com/owner/repo/blob/main/file.ts")
 * // { owner: "owner", repo: "repo", branch: "main", path: "file.ts", type: "file" }
 */
export function parseGitHubUrl(url: string): GitHubRepoInfo | null {
  // 쿼리스트링(?...) 과 앵커(#...) 제거
  const cleanUrl = url.split('?')[0].split('#')[0];

  // blob URL (파일): https://github.com/owner/repo/blob/branch/path/to/file
  const blobMatch = cleanUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)/);
  if (blobMatch) {
    return {
      owner: blobMatch[1],
      repo: blobMatch[2],
      branch: blobMatch[3],
      path: blobMatch[4],
      type: 'file',
    };
  }

  // tree URL (디렉토리): https://github.com/owner/repo/tree/branch/path/to/dir
  const treeMatch = cleanUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/tree\/([^\/]+)(?:\/(.+))?/);
  if (treeMatch) {
    return {
      owner: treeMatch[1],
      repo: treeMatch[2],
      branch: treeMatch[3],
      path: treeMatch[4] || '',
      type: 'tree',
    };
  }

  // 저장소 루트: https://github.com/owner/repo
  const repoMatch = cleanUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/?$/);
  if (repoMatch) {
    return {
      owner: repoMatch[1],
      repo: repoMatch[2],
      type: 'repo',
    };
  }

  return null;
}

/**
 * Get raw content URL for a GitHub file
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param branch - Branch name
 * @param path - File path
 * @returns Raw content URL
 */
export function getRawGitHubUrl(owner: string, repo: string, branch: string, path: string): string {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}

/**
 * Check if URL is a GitHub URL
 * @param url - URL to check
 * @returns true if GitHub URL
 */
export function isGitHubUrl(url: string): boolean {
  return url.includes('github.com');
}

'use client';

import { useState, useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { extractYouTubeVideoId } from '@/lib/utils/youtube-parser';
import { parseGitHubUrl } from '@/lib/utils/github-parser';
import type { ExtraProps } from 'react-markdown';
import type { Element } from 'hast';

// ReactMarkdown code 컴포넌트 props 타입
interface CodeComponentProps extends React.HTMLAttributes<HTMLElement>, ExtraProps {
  node?: Element;
  inline?: boolean;
}

// 에러 메시지 추출 헬퍼 함수
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
}

// YouTube IFrame API 타입 정의
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
  destroy: () => void;
}

interface SourceViewerProps {
  type: string;
  url: string;
  title: string;
}

export interface SourceViewerRef {
  seekTo: (seconds: number) => void;
  goToSlide: (slideNumber: number) => void;
  goToPage: (pageNumber: number) => void;
}

// Google Slides Presentation ID 추출
function extractPresentationId(url: string): string | null {
  const patterns = [
    /\/presentation\/d\/([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size?: number;
  download_url?: string;
}

interface GitHubContentData {
  type: 'file' | 'directory' | 'readme';
  content?: string;
  files?: GitHubFile[];
  readme?: string;
  repoInfo: {
    owner: string;
    repo: string;
    branch?: string;
    path?: string;
  };
  error?: string;
}

// 파일 아이콘 가져오기
function getFileIcon(_name: string, type: 'file' | 'dir'): string {
  if (type === 'dir') return '[D]';
  return '[F]';
}

/**
 * GitHub Content Viewer 컴포넌트
 * GitHub API를 통해 저장소 콘텐츠를 가져와 표시
 */
function GitHubContentViewer({ url }: { url: string }) {
  const [data, setData] = useState<GitHubContentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'readme' | 'files' | 'content'>('readme');

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubContent() {
      if (!url) {
        if (isMounted) {
          setError('URL이 제공되지 않았습니다');
          setIsLoading(false);
        }
        return;
      }

      try {
        const response = await fetch('/api/fetch-github', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });

        if (!isMounted) return;

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to fetch GitHub content');
        }

        const result = await response.json();
        if (!isMounted) return;

        setData(result);

        // 적절한 탭 자동 선택
        if (result.type === 'file') {
          setActiveTab('content');
        } else if (result.readme) {
          setActiveTab('readme');
        } else if (result.files?.length > 0) {
          setActiveTab('files');
        }
      } catch (err: unknown) {
        console.error('[GitHubContentViewer] Error:', err);
        if (isMounted) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchGitHubContent();

    return () => {
      isMounted = false;
    };
  }, [url]);

  const githubInfo = parseGitHubUrl(url);

  // 파일 크기 포맷
  const formatSize = (bytes?: number): string => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <h2 className="font-semibold text-gray-900">
            {githubInfo ? `${githubInfo.owner}/${githubInfo.repo}` : 'GitHub'}
          </h2>
          {data?.repoInfo?.path && (
            <span className="text-sm text-gray-500">
              / {data.repoInfo.path}
            </span>
          )}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          GitHub에서 열기
        </a>
      </div>

      {/* 탭 네비게이션 */}
      {data && !isLoading && !error && data.type !== 'file' && (
        <div className="flex border-b border-gray-200 bg-gray-50 px-4">
          {data.readme && (
            <button
              onClick={() => setActiveTab('readme')}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'readme'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              README
            </button>
          )}
          {data.files && data.files.length > 0 && (
            <button
              onClick={() => setActiveTab('files')}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'files'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📁 파일 ({data.files.length})
            </button>
          )}
        </div>
      )}

      {/* 콘텐츠 영역 */}
      <div className="flex-1 overflow-auto bg-white">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-500">GitHub 콘텐츠를 가져오는 중...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full p-6">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="text-gray-700 mb-2">콘텐츠를 가져오지 못했습니다</p>
              <p className="text-sm text-gray-500 mb-4">{error}</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub에서 열기
              </a>
            </div>
          </div>
        )}

        {data && !isLoading && !error && (
          <div className="p-6">
            {/* 파일 콘텐츠 (단일 파일) */}
            {data.type === 'file' && data.content && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">{getFileIcon(data.repoInfo.path || '', 'file')}</span>
                  <span className="font-mono text-sm text-black">{data.repoInfo.path}</span>
                </div>
                {data.repoInfo.path?.endsWith('.md') || data.repoInfo.path?.endsWith('.markdown') ? (
                  <div className="prose prose-gray max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
                  </div>
                ) : (
                  <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm font-mono text-black">
                    <code>{data.content}</code>
                  </pre>
                )}
              </div>
            )}

            {/* README 탭 */}
            {activeTab === 'readme' && data.readme && (
              <div className="prose prose-gray max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: (props) => (
                      <h1 className="text-2xl font-bold text-black mb-4 mt-6 pb-2 border-b" {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="text-xl font-semibold text-black mb-3 mt-5 pb-2 border-b" {...props} />
                    ),
                    h3: (props) => (
                      <h3 className="text-lg font-medium text-black mb-2 mt-4" {...props} />
                    ),
                    p: (props) => (
                      <p className="text-black leading-relaxed mb-3" {...props} />
                    ),
                    a: (props) => (
                      <a className="text-black underline hover:opacity-70" target="_blank" rel="noopener noreferrer" {...props} />
                    ),
                    ul: (props) => (
                      <ul className="list-disc list-inside text-black mb-3 space-y-1 ml-4" {...props} />
                    ),
                    ol: (props) => (
                      <ol className="list-decimal list-inside text-black mb-3 space-y-1 ml-4" {...props} />
                    ),
                    code: ({ inline, className, ...props }: CodeComponentProps) => {
                      if (inline) {
                        return <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-black" {...props} />;
                      }
                      return <code className={className} {...props} />;
                    },
                    pre: (props) => (
                      <pre className="bg-gray-50 border border-gray-200 p-4 rounded-lg overflow-x-auto mb-4 text-sm text-black" {...props} />
                    ),
                    blockquote: (props) => (
                      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-black my-4" {...props} />
                    ),
                    table: (props) => (
                      <div className="overflow-x-auto my-4">
                        <table className="border border-gray-300 w-full" {...props} />
                      </div>
                    ),
                    th: (props) => (
                      <th className="border border-gray-300 px-3 py-2 bg-gray-100 text-left font-semibold text-black" {...props} />
                    ),
                    td: (props) => (
                      <td className="border border-gray-300 px-3 py-2 text-black" {...props} />
                    ),
                  }}
                >
                  {data.readme}
                </ReactMarkdown>
              </div>
            )}

            {/* 파일 목록 탭 */}
            {activeTab === 'files' && data.files && (
              <div className="space-y-1">
                {/* 디렉토리 먼저, 그 다음 파일 */}
                {[...data.files]
                  .sort((a, b) => {
                    if (a.type === b.type) return a.name.localeCompare(b.name);
                    return a.type === 'dir' ? -1 : 1;
                  })
                  .map((file) => (
                    <a
                      key={file.path}
                      href={`https://github.com/${data.repoInfo.owner}/${data.repoInfo.repo}/${file.type === 'dir' ? 'tree' : 'blob'}/${data.repoInfo.branch || 'main'}/${file.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span>{getFileIcon(file.name, file.type)}</span>
                      <span className="flex-1 font-mono text-sm text-black hover:opacity-70">
                        {file.name}
                      </span>
                      {file.type === 'file' && file.size !== undefined && (
                        <span className="text-xs text-black">{formatSize(file.size)}</span>
                      )}
                    </a>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Website Markdown Viewer 컴포넌트
 * 캐시된 마크다운을 우선 로딩하고, 없으면 fetch-website API로 가져옴
 *
 * 우선순위:
 * 1. website-markdown-formatted/{base64_url}_{hash}.md (캐시된 포맷팅 마크다운)
 * 2. website-markdown/{base64_url}.md (정적 원본 마크다운)
 * 3. fetch-website API 호출 (Firecrawl)
 */
function WebsiteMarkdownViewer({ url }: { url: string }) {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [source, setSource] = useState<'formatted' | 'raw' | 'fetched' | null>(null);

  // URL에서 도메인 추출
  let domain = '';
  try {
    const urlObj = new URL(url);
    domain = urlObj.hostname;
  } catch {
    domain = url;
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchMarkdown() {
      if (!url) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        // fetch-website API 호출 (data/website-markdown/ 캐시 자동 확인)
        console.log('[WebsiteMarkdownViewer] Fetching markdown for:', url);
        const fetchResponse = await fetch('/api/fetch-website', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });

        if (!isMounted) return;

        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          if (data.markdown && isMounted) {
            setMarkdown(data.markdown);
            // source가 'static'이면 캐시됨, 아니면 실시간
            setSource(data.source === 'static' ? 'formatted' : 'fetched');
          }
        } else {
          const errorData = await fetchResponse.json();
          console.error('[WebsiteMarkdownViewer] Fetch failed:', errorData.error);
          // 에러가 나도 링크 뷰어로 fallback
        }
      } catch (err: unknown) {
        console.error('[WebsiteMarkdownViewer] Error:', err);
        // 에러가 나도 링크 뷰어로 fallback
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchMarkdown();

    return () => {
      isMounted = false;
    };
  }, [url]);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
          <h2 className="font-semibold text-gray-900">원본 웹사이트</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">캐시된 콘텐츠를 확인하는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 마크다운이 있으면 렌더링
  if (markdown) {

    return (
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-gray-900">원본 웹사이트</h2>
          </div>
        </div>
        <div className="flex-1 overflow-auto bg-white p-6">
          <div className="prose prose-gray max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: (props) => (
                  <h1 className="text-2xl font-bold text-black mb-4 mt-6 pb-2 border-b" {...props} />
                ),
                h2: (props) => (
                  <h2 className="text-xl font-semibold text-black mb-3 mt-5 pb-2 border-b" {...props} />
                ),
                h3: (props) => (
                  <h3 className="text-lg font-medium text-black mb-2 mt-4" {...props} />
                ),
                p: (props) => (
                  <p className="text-black leading-relaxed mb-3" {...props} />
                ),
                a: (props) => (
                  <a className="text-black underline hover:opacity-70" target="_blank" rel="noopener noreferrer" {...props} />
                ),
                ul: (props) => (
                  <ul className="list-disc list-inside text-black mb-3 space-y-1 ml-4" {...props} />
                ),
                ol: (props) => (
                  <ol className="list-decimal list-inside text-black mb-3 space-y-1 ml-4" {...props} />
                ),
                code: ({ inline, className, ...props }: CodeComponentProps) => {
                  if (inline) {
                    return <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-black" {...props} />;
                  }
                  return <code className={className} {...props} />;
                },
                pre: (props) => (
                  <pre className="bg-gray-50 border border-gray-200 p-4 rounded-lg overflow-x-auto mb-4 text-sm text-black" {...props} />
                ),
                blockquote: (props) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic text-black my-4" {...props} />
                ),
                table: (props) => (
                  <div className="overflow-x-auto my-4">
                    <table className="border border-gray-300 w-full" {...props} />
                  </div>
                ),
                th: (props) => (
                  <th className="border border-gray-300 px-3 py-2 bg-gray-100 text-left font-semibold text-black" {...props} />
                ),
                td: (props) => (
                  <td className="border border-gray-300 px-3 py-2 text-black" {...props} />
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  // 캐시가 없으면 링크만 표시
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
        <h2 className="font-semibold text-gray-900">
          원본 웹사이트
        </h2>
      </div>
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{domain}</h3>
          <p className="text-gray-500 mb-6">
            원본 웹사이트의 콘텐츠를 확인하려면 아래 버튼을 클릭하세요.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            웹사이트 열기
          </a>
        </div>
      </div>
    </div>
  );
}

// URL 기반으로 실제 타입 감지 (type 속성보다 우선)
function detectActualType(url: string, declaredType: string): string {
  // YouTube URL 감지
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  // Google Slides 감지
  if (url.includes('docs.google.com/presentation')) {
    return 'slides';
  }
  // GitHub 감지
  if (url.includes('github.com')) {
    return 'github';
  }
  // PDF 감지
  if (url.endsWith('.pdf') || url.includes('/pdf/')) {
    return 'pdf';
  }
  // 그 외는 선언된 타입 사용
  return declaredType;
}

const SourceViewer = forwardRef<SourceViewerRef, SourceViewerProps>(
  function SourceViewer({ type: declaredType, url, title: _title }, ref) {
    // URL 기반으로 실제 타입 감지
    const type = detectActualType(url, declaredType);

    const playerRef = useRef<YTPlayer | null>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);
    const isAPIReady = useRef(false);
    const pendingVideoId = useRef<string | null>(null);

    // Slides: 현재 슬라이드 번호 상태
    const [currentSlide, setCurrentSlide] = useState<number>(1);
    const slidesIframeRef = useRef<HTMLIFrameElement>(null);
    const [slidesIframeKey, setSlidesIframeKey] = useState(0);

    // PDF: 현재 페이지 번호 상태
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pdfIframeKey, setPdfIframeKey] = useState(0);

    // 플레이어 초기화 함수 (useEffect보다 먼저 정의)
    const initializePlayer = useCallback((id: string) => {
      if (!playerContainerRef.current || !window.YT) return;

      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      playerContainerRef.current.innerHTML = '<div id="youtube-player"></div>';

      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: id,
        events: {
          onReady: () => {
            console.log('[SourceViewer] YouTube Player ready');
          },
        },
      });
    }, []);

    // YouTube IFrame API 로드
    useEffect(() => {
      if (type !== 'youtube') return;

      if (typeof window !== 'undefined' && !window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          isAPIReady.current = true;
          if (pendingVideoId.current) {
            initializePlayer(pendingVideoId.current);
          }
        };
      } else if (window.YT) {
        isAPIReady.current = true;
      }
    }, [type, initializePlayer]);

    // videoId 변경 시 플레이어 업데이트
    useEffect(() => {
      if (type !== 'youtube') return;

      const videoId = extractYouTubeVideoId(url);
      if (!videoId) return;

      if (isAPIReady.current) {
        initializePlayer(videoId);
      } else {
        pendingVideoId.current = videoId;
      }

      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
          playerRef.current = null;
        }
      };
    }, [type, url, initializePlayer]);

    // seekTo, goToSlide, goToPage 함수 노출
    useImperativeHandle(ref, () => ({
      seekTo: (seconds: number) => {
        if (playerRef.current) {
          playerRef.current.seekTo(seconds, true);
          playerRef.current.playVideo();
          console.log(`[SourceViewer] Seeking to ${seconds}s`);
        }
      },
      goToSlide: (slideNumber: number) => {
        console.log(`[SourceViewer] Going to slide ${slideNumber}`);
        setCurrentSlide(slideNumber);
        // iframe 새로고침을 위해 key 변경
        setSlidesIframeKey(prev => prev + 1);
      },
      goToPage: (pageNumber: number) => {
        console.log(`[SourceViewer] Going to page ${pageNumber}`);
        setCurrentPage(pageNumber);
        // iframe 새로고침을 위해 key 변경
        setPdfIframeKey(prev => prev + 1);
      },
    }));

    // YouTube 뷰어
    if (type === 'youtube') {
      const videoId = extractYouTubeVideoId(url);

      return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
            <h2 className="font-semibold text-gray-900">
              원본 영상
            </h2>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              YouTube에서 열기
            </a>
          </div>
          <div className="flex-1 p-4">
            {videoId ? (
              <div
                ref={playerContainerRef}
                className="aspect-video w-full overflow-hidden rounded-lg bg-black [&_iframe]:w-full [&_iframe]:h-full"
              >
                <div id="youtube-player" className="h-full w-full" />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                <p>유효하지 않은 YouTube URL입니다</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Slides 뷰어
    if (type === 'slides') {
      const presentationId = extractPresentationId(url);
      // Google Slides embed URL (슬라이드 번호 포함)
      // 참고: embed 모드에서는 slide 파라미터가 작동하지 않음
      // pub 모드를 사용하여 특정 슬라이드로 시작
      let embedUrl: string | null = null;
      if (presentationId) {
        // pub 모드 사용 (embed보다 slide 파라미터 지원이 나음)
        if (currentSlide > 1) {
          embedUrl = `https://docs.google.com/presentation/d/${presentationId}/embed?start=false&loop=false&delayms=60000&slide=id.p${currentSlide}`;
        } else {
          embedUrl = `https://docs.google.com/presentation/d/${presentationId}/embed?start=false&loop=false&delayms=60000`;
        }
        console.log(`[SourceViewer] Slides embed URL: ${embedUrl}`);
      }

      return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-gray-900">
                원본 슬라이드
              </h2>
              {currentSlide > 1 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-black text-white rounded-full animate-pulse">
                  → 슬라이드 {currentSlide}로 이동하세요
                </span>
              )}
            </div>
          </div>

          {/* Navigation hint when slide > 1 */}
          {currentSlide > 1 && (
            <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 text-sm text-black flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                아래 슬라이드에서 <strong>화살표 버튼</strong> 또는 <strong>← → 키</strong>를 사용하여
                <strong className="font-bold"> 슬라이드 {currentSlide}</strong>로 이동하세요
              </span>
            </div>
          )}

          <div className="flex-1 overflow-hidden bg-gray-100">
            {embedUrl ? (
              <iframe
                key={slidesIframeKey}
                ref={slidesIframeRef}
                src={embedUrl}
                frameBorder="0"
                width="100%"
                height="100%"
                allowFullScreen={true}
                className="h-full w-full"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                <p>유효하지 않은 Google Slides URL입니다</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    // PDF 뷰어
    if (type === 'pdf') {
      // PDF URL에 페이지 번호 추가 (#page=N)
      const pdfUrlWithPage = currentPage > 1 ? `${url}#page=${currentPage}` : url;

      return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-gray-900">
                원본 PDF
              </h2>
              {currentPage > 1 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-black text-white rounded-full animate-pulse">
                  → 페이지 {currentPage}로 이동
                </span>
              )}
            </div>
          </div>

          {/* Navigation hint when page > 1 */}
          {currentPage > 1 && (
            <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 text-sm text-black flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                PDF 뷰어에서 <strong className="font-bold">페이지 {currentPage}</strong>로 스크롤하세요
              </span>
            </div>
          )}

          <div className="flex-1 overflow-hidden bg-gray-100">
            <iframe
              key={pdfIframeKey}
              src={pdfUrlWithPage}
              frameBorder="0"
              width="100%"
              height="100%"
              className="h-full w-full"
            />
          </div>
        </div>
      );
    }

    // GitHub 뷰어 - GitHubContentViewer 사용
    if (type === 'github') {
      return <GitHubContentViewer url={url} />;
    }

    // Web/Reading/기타: 캐시된 마크다운 우선 로딩, 없으면 링크 표시
    return <WebsiteMarkdownViewer url={url} />;
  }
);

export default SourceViewer;

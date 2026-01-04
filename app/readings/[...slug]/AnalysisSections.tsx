'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * 공통 섹션 컴포넌트 - 읽기 전용 UI (편집 기능 제거됨)
 */

// ============================================================
// Summary Section (요약)
// ============================================================

interface SummarySectionProps {
  id?: string;
  title?: string;
  sectionNumber?: number;
  summary: string | null | undefined;
  variant?: 'default' | 'featured';
}

export function SummarySection({
  id = 'summary',
  title = '요약',
  sectionNumber,
  summary,
  variant = 'default',
}: SummarySectionProps) {
  if (!summary) return null;

  const isFeatured = variant === 'featured';

  return (
    <div
      id={id}
      className={`rounded-${isFeatured ? 'xl' : 'lg'} border border-gray-200 bg-white p-${isFeatured ? '8' : '6'}`}
    >
      <h2 className={`text-${isFeatured ? 'xl' : 'lg'} font-${isFeatured ? 'bold' : 'semibold'} text-black mb-${isFeatured ? '6' : '4'} flex items-center gap-3`}>
        {sectionNumber && (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-base font-bold">
            {sectionNumber}
          </span>
        )}
        {title}
      </h2>
      {isFeatured ? (
        <div className="bg-[#F9F9F9] rounded-xl p-6 border border-gray-100">
          <p className="text-black text-lg leading-loose whitespace-pre-wrap">
            {summary}
          </p>
        </div>
      ) : (
        <p className="text-black leading-relaxed">
          {summary}
        </p>
      )}
    </div>
  );
}

// ============================================================
// Key Points Section (핵심 포인트)
// ============================================================

interface KeyPointsSectionProps {
  id?: string;
  title?: string;
  sectionNumber?: number;
  keyPoints: string[] | undefined;
  variant?: 'default' | 'featured';
}

export function KeyPointsSection({
  id = 'keypoints',
  title = '핵심 포인트',
  sectionNumber,
  keyPoints,
  variant = 'default',
}: KeyPointsSectionProps) {
  if (!keyPoints || keyPoints.length === 0) return null;

  const isFeatured = variant === 'featured';

  return (
    <div
      id={id}
      className={`rounded-${isFeatured ? 'xl' : 'lg'} border border-gray-200 bg-white p-${isFeatured ? '8' : '6'}`}
    >
      <h2 className={`text-${isFeatured ? 'xl' : 'lg'} font-${isFeatured ? 'bold' : 'semibold'} text-black mb-${isFeatured ? '6' : '4'} flex items-center gap-3`}>
        {sectionNumber && (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-base font-bold">
            {sectionNumber}
          </span>
        )}
        {title}
      </h2>
      {isFeatured ? (
        <ul className="space-y-5">
          {keyPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-4 text-black">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold mt-0.5">
                {idx + 1}
              </span>
              <span className="text-lg leading-loose">{point}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-2">
          {keyPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-black">
              <span className="text-black">•</span>
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ============================================================
// Topics Section (주제)
// ============================================================

interface TopicsSectionProps {
  id?: string;
  title?: string;
  sectionNumber?: number;
  topics: string[] | undefined;
  variant?: 'default' | 'featured';
}

export function TopicsSection({
  id = 'topics',
  title = '주요 주제',
  sectionNumber,
  topics,
  variant = 'default',
}: TopicsSectionProps) {
  if (!topics || topics.length === 0) return null;

  const isFeatured = variant === 'featured';

  return (
    <div
      id={id}
      className={`rounded-${isFeatured ? 'xl' : 'lg'} border border-gray-200 bg-white p-${isFeatured ? '8' : '6'}`}
    >
      <h2 className={`text-${isFeatured ? 'xl' : 'lg'} font-${isFeatured ? 'bold' : 'semibold'} text-black mb-${isFeatured ? '6' : '4'} flex items-center gap-3`}>
        {sectionNumber && (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-base font-bold">
            {sectionNumber}
          </span>
        )}
        {title}
      </h2>
      <div className="flex flex-wrap gap-3">
        {topics.map((topic, idx) => (
          <span
            key={idx}
            className={`px-${isFeatured ? '4' : '3'} py-${isFeatured ? '2' : '1'} rounded-full ${isFeatured ? 'bg-gray-200' : 'bg-gray-100'} text-black text-${isFeatured ? 'base font-medium' : 'sm'}`}
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Markdown Section (마크다운 콘텐츠)
// ============================================================

interface MarkdownSectionProps {
  id?: string;
  title?: string;
  content: string | null | undefined;
}

export function MarkdownSection({
  id = 'content',
  title = '',
  content,
}: MarkdownSectionProps) {
  if (!content) return null;

  return (
    <div id={id} className="rounded-xl border border-gray-200 bg-white p-8">
      {title && (
        <h2 className="text-xl font-semibold text-black mb-6">
          {title}
        </h2>
      )}
      <div className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-semibold prose-headings:mb-4 prose-headings:mt-8 prose-p:text-black prose-p:leading-loose prose-p:mb-6 prose-li:text-black prose-li:leading-loose prose-li:mb-2 prose-ul:space-y-2 prose-ol:space-y-2 prose-strong:text-black prose-a:text-black prose-code:bg-gray-100 prose-code:text-black prose-code:px-2 prose-code:py-1 prose-pre:bg-gray-100 prose-pre:text-black prose-pre:p-4 prose-blockquote:text-black prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content || ''}
        </ReactMarkdown>
      </div>
    </div>
  );
}

// ============================================================
// PDF Pages Section (PDF 페이지별 콘텐츠 - 읽기 전용)
// ============================================================

interface ParsedPage {
  pageNumber: number;
  summary: string;
  keyPoints: string[];
  translation: string;
  rawContent: string;
}

function parsePDFContent(content: string): ParsedPage[] {
  const pages: ParsedPage[] = [];

  // "## 페이지 N" 패턴으로 분리
  const pagePattern = /## 페이지 (\d+)\n/g;
  const parts = content.split(pagePattern);

  // parts[0]은 첫 페이지 이전 내용 (보통 비어있음)
  // parts[1]은 첫 페이지 번호, parts[2]는 첫 페이지 내용, ...
  for (let i = 1; i < parts.length; i += 2) {
    const pageNumber = parseInt(parts[i], 10);
    const pageContent = parts[i + 1] || '';

    // 요약 추출
    const summaryMatch = pageContent.match(/\*\*요약:\*\*\s*([\s\S]+?)(?=\n\n|\*\*핵심 포인트:\*\*|### 번역|$)/);
    const summary = summaryMatch ? summaryMatch[1].trim() : '';

    // 핵심 포인트 추출
    const keyPointsMatch = pageContent.match(/\*\*핵심 포인트:\*\*\s*([\s\S]*?)(?=### 번역|---|\n## 페이지|$)/);
    const keyPointsRaw = keyPointsMatch ? keyPointsMatch[1].trim() : '';
    const keyPoints = keyPointsRaw
      .split('\n')
      .filter(line => line.startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim());

    // 번역 추출
    const translationMatch = pageContent.match(/### 번역\s*([\s\S]*?)(?=---|\n## 페이지|$)/);
    let translation = translationMatch ? translationMatch[1].trim() : '';

    // "## 원문 텍스트:" 이후 내용 제거 (번역만 표시)
    const originalTextPatterns = [
      '## 원문 텍스트:',
      '## 🎯 번역 핵심 지침',
      '## 🎯 번역 정확도 핵심 지침',
      '## 🎯 번역 정확성 지침',
    ];
    for (const pattern of originalTextPatterns) {
      const patternIndex = translation.indexOf(pattern);
      if (patternIndex !== -1) {
        translation = translation.substring(0, patternIndex).trim();
      }
    }

    pages.push({
      pageNumber,
      summary,
      keyPoints,
      translation,
      rawContent: pageContent,
    });
  }

  return pages;
}

interface PDFPagesSectionProps {
  id?: string;
  content: string | null | undefined;
  onPageChange?: (pageNumber: number) => void;
}

export function PDFPagesSection({
  id = 'pdf-content',
  content,
  onPageChange,
}: PDFPagesSectionProps) {
  if (!content) return null;

  const pages = parsePDFContent(content);

  const scrollToPage = (pageNumber: number) => {
    const element = document.getElementById(`pdf-page-${pageNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id={id} className="space-y-6">
      {/* 페이지 목차 */}
      {pages.length > 1 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 sticky top-4 z-10">
          <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            페이지 네비게이션 ({pages.length}페이지)
          </h2>
          <div className="flex flex-wrap gap-2">
            {pages.map((page) => (
              <button
                key={page.pageNumber}
                onClick={() => {
                  scrollToPage(page.pageNumber);
                  onPageChange?.(page.pageNumber);
                }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-black transition-colors text-sm"
                title={page.summary.substring(0, 100) + '...'}
              >
                <span className="font-bold">{page.pageNumber}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 페이지별 콘텐츠 */}
      {pages.map((page) => (
        <div
          key={page.pageNumber}
          id={`pdf-page-${page.pageNumber}`}
          className="rounded-xl border border-gray-200 bg-white overflow-hidden scroll-mt-32"
        >
          {/* 페이지 헤더 - Light Theme */}
          <div
            className="bg-gray-100 border-b border-gray-200 px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => onPageChange?.(page.pageNumber)}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-gray-300 shadow-sm">
                <span className="text-2xl font-bold text-black">{page.pageNumber}</span>
              </div>
              <div>
                <p className="text-gray-500 text-sm">페이지</p>
                <p className="text-black font-semibold">Page {page.pageNumber}</p>
              </div>
            </div>
            {onPageChange && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-300 text-black text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>PDF에서 보기</span>
              </div>
            )}
          </div>

          {/* 콘텐츠 영역 */}
          <div className="p-6 space-y-6">
            {/* 요약 */}
            {page.summary && (
              <div className="bg-[#F9F9F9] rounded-lg p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-[#666666] uppercase tracking-wide">요약</span>
                </div>
                <p className="text-black leading-relaxed">{page.summary}</p>
              </div>
            )}

            {/* 핵심 포인트 */}
            {page.keyPoints.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#666666] uppercase tracking-wide">핵심 포인트</span>
                </div>
                <ul className="space-y-2">
                  {page.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-black">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 번역 */}
            {page.translation && (
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-semibold text-black uppercase tracking-wide">번역</span>
                </div>
                <div className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-semibold prose-headings:mb-4 prose-headings:mt-6 prose-p:text-black prose-p:leading-loose prose-p:mb-4 prose-li:text-black prose-li:leading-loose prose-ul:space-y-2 prose-ol:space-y-2 prose-strong:text-black prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {page.translation}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Detailed Note Section (상세 노트 - 마크다운)
// ============================================================

interface DetailedNoteSectionProps {
  id?: string;
  title?: string;
  sectionNumber?: number;
  content: string | null | undefined;
}

export function DetailedNoteSection({
  id = 'detailed-note',
  title = '상세 번역 노트',
  sectionNumber,
  content,
}: DetailedNoteSectionProps) {
  if (!content) return null;

  return (
    <div id={id} className="rounded-xl border border-gray-200 bg-white p-8">
      <h2 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
        {sectionNumber && (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-base font-bold">
            {sectionNumber}
          </span>
        )}
        {title}
      </h2>
      <div className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-semibold prose-headings:mb-4 prose-headings:mt-8 prose-p:text-black prose-p:leading-loose prose-p:mb-6 prose-li:text-black prose-li:leading-loose prose-li:mb-2 prose-ul:space-y-2 prose-ol:space-y-2 prose-strong:text-black prose-a:text-black prose-table:text-base prose-th:bg-gray-100 prose-th:p-3 prose-td:p-3 prose-td:border prose-th:border">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

// ============================================================
// Table of Contents (목차)
// ============================================================

interface TocItem {
  id: string;
  label: string;
  available: boolean;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const visibleItems = items.filter(item => item.available);

  if (visibleItems.length === 0) return null;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        Table of Contents
      </h2>
      <nav className="border-l-2 border-gray-300 pl-4">
        <ul className="space-y-2">
          {visibleItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-[#666666] hover:text-black transition-colors text-left"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// ============================================================
// Actions Bar Wrapper
// ============================================================

interface ActionsBarWrapperProps {
  children: React.ReactNode;
}

export function ActionsBarWrapper({ children }: ActionsBarWrapperProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      {children}
    </div>
  );
}

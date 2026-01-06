'use client';

import { TranslationFile } from '@/lib/translations';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  SummarySection,
  KeyPointsSection,
  TopicsSection,
  MarkdownSection,
  PDFPagesSection,
} from './AnalysisSections';

/**
 * 분석 컴포넌트 Props (정적 표시 전용)
 */
interface AnalysisComponentProps {
  resource: TranslationFile;
  onSeekTo?: (seconds: number) => void;
  onPageChange?: (pageNumber: number) => void;
  onSlideChange?: (slideNumber: number) => void;
}

/**
 * YouTube 분석 결과 (정적 표시)
 */
export function YouTubeAnalysis({ resource, onSeekTo }: AnalysisComponentProps) {
  const { analysis } = resource;
  if (!analysis) return null;

  // 목차 아이템 생성 (상세 노트가 먼저)
  const tocItems = [
    { id: 'detailed-note', label: '1. 상세 번역 노트', available: !!analysis?.detailedNote_ko },
    { id: 'summary', label: '2. 통합 핵심 요약', available: !!analysis?.summary_ko },
    { id: 'keypoints', label: '3. 핵심 포인트', available: analysis?.keyPoints && analysis.keyPoints.length > 0 },
    { id: 'topics', label: '4. 주요 주제', available: analysis?.topics && analysis.topics.length > 0 },
    { id: 'segments-detail', label: '5. 구간별 상세 내용', available: analysis?.youtubeSegments && analysis.youtubeSegments.length > 0 },
  ].filter(item => item.available);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Table of Contents (목차) */}
      {tocItems.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Table of Contents
          </h2>
          <nav className="border-l-2 border-gray-300 pl-4">
            <ul className="space-y-2">
              {tocItems.map((item) => (
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
      )}

      {/* 1. 상세 번역 노트 (Detailed Note) */}
      {analysis?.detailedNote_ko && (
        <div id="detailed-note" className="rounded-xl border border-gray-200 bg-white p-8">
          <h2 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-base font-bold">1</span>
            상세 번역 노트
          </h2>
          <div className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-semibold prose-headings:mb-4 prose-headings:mt-8 prose-p:text-black prose-p:leading-loose prose-p:mb-6 prose-li:text-black prose-li:leading-loose prose-li:mb-2 prose-ul:space-y-2 prose-ol:space-y-2 prose-strong:text-black prose-a:text-black prose-table:text-base prose-th:bg-gray-100 prose-th:p-3 prose-td:p-3 prose-td:border prose-th:border">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {analysis.detailedNote_ko}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* 2. 통합 핵심 요약 (Integrated Key Summary) */}
      {analysis?.summary_ko && (
        <div id="summary" className="rounded-xl border border-gray-200 bg-white p-8">
          <h2 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-base font-bold">2</span>
            통합 핵심 요약
          </h2>
          <div className="bg-[#F9F9F9] rounded-xl p-6 border border-gray-100">
            <p className="text-black text-lg leading-loose whitespace-pre-wrap">
              {analysis.summary_ko}
            </p>
          </div>
        </div>
      )}

      {/* 3. 핵심 포인트 (Key Points) */}
      {analysis?.keyPoints && analysis.keyPoints.length > 0 && (
        <div id="keypoints" className="rounded-xl border border-gray-200 bg-white p-8">
          <h2 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-base font-bold">3</span>
            핵심 포인트
          </h2>
          <ul className="space-y-5">
            {analysis.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-4 text-black">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-lg leading-loose">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 4. 주요 주제 (Topics) */}
      {analysis?.topics && analysis.topics.length > 0 && (
        <div id="topics" className="rounded-xl border border-gray-200 bg-white p-8">
          <h2 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-base font-bold">4</span>
            주요 주제
          </h2>
          <div className="flex flex-wrap gap-3">
            {analysis.topics.map((topic, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-gray-200 text-black text-base font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 5. 구간별 상세 내용 (Segment Details) */}
      {analysis?.youtubeSegments && analysis.youtubeSegments.length > 0 && (
        <div id="segments-detail" className="rounded-xl border border-gray-200 bg-white p-8">
          <h2 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-base font-bold">5</span>
            구간별 상세 내용
          </h2>
          <div className="space-y-8">
            {analysis.youtubeSegments.map((seg, idx) => (
              <div
                key={idx}
                className="border-l-4 border-gray-300 pl-6 py-4"
              >
                {/* 헤더: 타임스탬프 + 태그 */}
                <div className="flex items-center gap-3 mb-4">
                  {onSeekTo ? (
                    <button
                      onClick={() => onSeekTo(seg.startTime)}
                      className="inline-flex items-center gap-2 text-base font-mono bg-black hover:bg-black/80 text-white px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                      title={`${seg.startTimeFormatted}으로 이동`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      {seg.startTimeFormatted}
                    </button>
                  ) : (
                    <span className="text-base font-mono bg-gray-200 px-4 py-1.5 rounded-full text-black">
                      {seg.startTimeFormatted}
                    </span>
                  )}
                  <span className="text-sm px-3 py-1.5 rounded-full bg-gray-200 text-black font-medium">
                    {seg.tag}
                  </span>
                </div>

                {/* 제목 */}
                <h3 className="font-semibold text-black text-lg mb-3">
                  {seg.title}
                </h3>

                {/* 설명 */}
                <p className="text-base text-[#444444] mb-4 leading-loose">
                  {seg.description}
                </p>

                {/* 번역된 자막 */}
                {seg.subtitlesTranslated && (
                  <div className="bg-[#F9F9F9] border border-gray-100 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <span className="text-sm font-medium text-[#666666] uppercase tracking-wide">번역된 자막</span>
                    </div>
                    <p className="text-base text-black leading-loose whitespace-pre-wrap">
                      {seg.subtitlesTranslated}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * detailedNote_ko에서 슬라이드별 노트를 추출하는 함수
 */
function parseSlideNotes(detailedNote: string): {
  byNumber: Map<number, string>;
  byIndex: Map<number, string>;
} {
  const byNumber = new Map<number, string>();
  const byIndex = new Map<number, string>();

  // "#### 📍 슬라이드 N:" 또는 "#### 슬라이드 N:" 패턴으로 분리
  const slidePattern = /#{3,4}\s*(?:📍\s*)?(?:\[[^\]]+\]\s*)?슬라이드\s+(\d+)[^\n]*\n/g;
  const parts = detailedNote.split(slidePattern);

  // parts[0]은 첫 슬라이드 이전 내용 (핵심 내용 등)
  // parts[1]은 슬라이드 번호, parts[2]는 슬라이드 내용, ...
  let index = 1;
  for (let i = 1; i < parts.length; i += 2) {
    const slideNumber = parseInt(parts[i], 10);
    let content = parts[i + 1] || '';

    // 다음 슬라이드나 섹션 구분자까지의 내용만 추출
    const nextSectionMatch = content.match(/\n---\n/);
    if (nextSectionMatch && nextSectionMatch.index !== undefined) {
      content = content.substring(0, nextSectionMatch.index);
    }

    const trimmed = content.trim();
    byNumber.set(slideNumber, trimmed);
    byIndex.set(index, trimmed);
    index += 1;
  }

  return { byNumber, byIndex };
}

/**
 * Slides 분석 결과 (정적 표시)
 */
export function SlidesAnalysis({ resource, onSlideChange }: AnalysisComponentProps) {
  const { analysis } = resource;
  if (!analysis) return null;

  const handleSlideClick = (slideNumber: number) => {
    if (onSlideChange) {
      onSlideChange(slideNumber);
    }
  };

  // detailedNote_ko에서 슬라이드별 노트 추출
  const slideNotes = analysis?.detailedNote_ko
    ? parseSlideNotes(analysis.detailedNote_ko)
    : { byNumber: new Map<number, string>(), byIndex: new Map<number, string>() };

  const slideNumbers = analysis.slides
    .map((slide) => slide.slideNumber)
    .filter((num): num is number => typeof num === 'number');
  const hasContiguousNumbers =
    slideNumbers.length === analysis.slides.length &&
    slideNumbers[0] === 1 &&
    slideNumbers.every((num, idx) => num === idx + 1);

  // 목차 아이템 생성 (상세 노트 제거, 요약과 슬라이드만)
  const tocItems = [
    { id: 'summary', label: '1. 전체 요약', available: !!analysis?.summary_ko },
    { id: 'slides-detail', label: '2. 슬라이드별 학습 노트', available: analysis?.slides && analysis.slides.length > 0 },
  ].filter(item => item.available);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSlide = (slideNumber: number) => {
    const element = document.getElementById(`slide-${slideNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8">
      {/* 슬라이드 네비게이션 바 (스티키) */}
      {analysis?.slides && analysis.slides.length > 1 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 sticky top-4 z-10">
          <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            슬라이드 네비게이션 ({analysis.slides.length}장)
          </h2>
          <div className="flex flex-wrap gap-2">
            {analysis.slides.map((slide, idx) => {
              const displaySlideNumber = hasContiguousNumbers
                ? (slide.slideNumber ?? idx + 1)
                : idx + 1;
              const syncSlideNumber = slide.slideNumber ?? displaySlideNumber;

              return (
              <button
                key={displaySlideNumber}
                onClick={() => {
                  scrollToSlide(displaySlideNumber);
                  handleSlideClick(syncSlideNumber);
                }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-black transition-colors text-sm"
                title={slide.summary_ko?.substring(0, 100) + '...'}
              >
                <span className="font-bold">{displaySlideNumber}</span>
              </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Table of Contents (목차) */}
      {tocItems.length > 0 && analysis?.summary_ko && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Table of Contents
          </h2>
          <nav className="border-l-2 border-gray-300 pl-4">
            <ul className="space-y-2">
              {tocItems.map((item) => (
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
      )}

      {/* 1. 전체 요약 (Summary) */}
      {analysis?.summary_ko && (
        <div id="summary" className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-base font-bold">1</span>
            전체 요약
          </h2>
          <p className="text-black leading-relaxed">
            {analysis.summary_ko}
          </p>
        </div>
      )}

      {/* 2. 슬라이드별 학습 노트 (Slides) */}
      {analysis?.slides && analysis.slides.length > 0 && (
        <div id="slides-detail" className="space-y-8">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h2 className="text-xl font-bold text-black flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-base font-bold">2</span>
              슬라이드별 학습 노트 ({analysis.totalSlides ?? analysis.slides.length}장)
            </h2>
          </div>

          {analysis.slides.map((slide, idx) => {
            const displaySlideNumber = hasContiguousNumbers
              ? (slide.slideNumber ?? idx + 1)
              : idx + 1;
            const syncSlideNumber = slide.slideNumber ?? displaySlideNumber;
            const slideNote = hasContiguousNumbers
              ? (slideNotes.byNumber.get(slide.slideNumber ?? displaySlideNumber)
                ?? slideNotes.byIndex.get(displaySlideNumber))
              : (slideNotes.byIndex.get(displaySlideNumber)
                ?? slideNotes.byNumber.get(slide.slideNumber ?? displaySlideNumber));

            return (
              <div
                key={idx}
                id={`slide-${displaySlideNumber}`}
                className="rounded-lg border border-gray-200 bg-white overflow-hidden scroll-mt-32"
              >
                {/* Slide Header - Clickable to sync with left panel */}
                <div
                  className="relative cursor-pointer hover:bg-gray-200/50 transition-colors bg-black p-4"
                  onClick={() => handleSlideClick(syncSlideNumber)}
                  title={`슬라이드 ${displaySlideNumber} 클릭하여 왼쪽 패널로 이동`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white/20 backdrop-blur">
                        <span className="text-3xl font-bold text-white">
                          {displaySlideNumber}
                        </span>
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">슬라이드</p>
                        <p className="text-white font-semibold text-lg">
                          {displaySlideNumber} / {analysis.totalSlides ?? analysis.slides.length}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white text-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>클릭하여 이동</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="divide-y divide-gray-100">
                  {/* Section 1: 기술적 분석 (학습 노트 또는 기존 분석) */}
                  <div className="p-4 bg-white">

                    {slideNote ? (
                      /* 학습 노트가 있으면 학습 노트 표시 */
                      <div className="prose prose-sm max-w-none prose-headings:text-black prose-headings:font-semibold prose-headings:mb-2 prose-headings:mt-4 prose-p:text-black prose-p:leading-relaxed prose-p:mb-3 prose-li:text-black prose-li:leading-relaxed prose-ul:space-y-1 prose-ol:space-y-1 prose-strong:text-black">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {slideNote}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      /* 학습 노트가 없으면 기존 분석 표시 */
                      <>
                        <div className="bg-[#F9F9F9] border border-gray-200 rounded-lg p-4 mb-3">
                          <p className="text-black leading-relaxed">
                            {slide.summary_ko}
                          </p>
                        </div>
                        {slide.keyPoints && slide.keyPoints.length > 0 && (
                          <div className="mt-3">
                            <span className="text-xs font-medium text-black block mb-2">핵심 포인트</span>
                            <ul className="space-y-1.5">
                              {slide.keyPoints.map((point, pidx) => (
                                <li key={pidx} className="flex items-start gap-2 text-sm text-black">
                                  <span className="text-black mt-0.5">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Section 2: 번역 (참고 - 접기) */}
                  {slide.text_ko && (
                    <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
                      <details className="group">
                        <summary className="flex items-center gap-2 cursor-pointer hover:opacity-70 text-sm text-[#666666]">
                          <svg className="w-4 h-4 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="font-medium">번역 참고</span>
                        </summary>
                        <div className="mt-3 pl-6">
                          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                            <p className="text-black whitespace-pre-wrap leading-relaxed text-sm">
                              {slide.text_ko}
                            </p>
                          </div>
                          {slide.text_original && (
                            <details className="mt-2">
                              <summary className="text-xs text-[#888888] cursor-pointer hover:opacity-70">
                                원문 보기
                              </summary>
                              <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                                <p className="text-xs text-[#666666] whitespace-pre-wrap">
                                  {slide.text_original}
                                </p>
                              </div>
                            </details>
                          )}
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * PDF 분석 결과 (정적 표시)
 */
export function PDFAnalysis({ resource, onPageChange }: AnalysisComponentProps) {
  const { analysis } = resource;
  if (!analysis) return null;

  // PDF 콘텐츠가 "## 페이지" 형식인지 확인
  const hasPagesFormat = analysis?.pdfContent?.includes('## 페이지');

  return (
    <div className="space-y-8">
      <SummarySection
        title="전체 요약"
        summary={analysis?.summary_ko}
      />
      <KeyPointsSection keyPoints={analysis?.keyPoints} />
      {hasPagesFormat ? (
        <PDFPagesSection
          content={analysis?.pdfContent}
          onPageChange={onPageChange}
        />
      ) : (
        <MarkdownSection
          title=""
          content={analysis?.pdfContent}
        />
      )}
    </div>
  );
}

/**
 * Generic 분석 결과 (정적 표시)
 */
export function GenericAnalysis({ resource }: AnalysisComponentProps) {
  const { analysis } = resource;
  if (!analysis) return null;

  return (
    <div className="space-y-8">
      <SummarySection
        title="요약"
        summary={analysis?.summary_ko}
      />
      <KeyPointsSection keyPoints={analysis?.keyPoints} />
      <TopicsSection
        title="주제"
        topics={analysis?.topics}
      />
    </div>
  );
}

/**
 * Website 분석 결과 (정적 표시)
 */
export function WebsiteAnalysis({ resource }: AnalysisComponentProps) {
  const { analysis } = resource;
  if (!analysis) return null;

  return (
    <div className="space-y-8">
      <MarkdownSection
        title=""
        content={analysis?.pdfContent}
      />
    </div>
  );
}

/**
 * Google Drive PDF 분석 결과 (정적 표시)
 */
export function GoogleDrivePDFAnalysis({ resource, onPageChange }: AnalysisComponentProps) {
  const { analysis } = resource;

  // gdrivePdfPages가 없으면 일반 PDF 분석으로 폴백
  if (!analysis?.gdrivePdfPages || analysis.gdrivePdfPages.length === 0) {
    // 기존 pdfContent가 있으면 표시
    if (analysis?.pdfContent) {
      return (
        <div className="space-y-8">
          <div className="rounded-xl border border-gray-200 bg-white p-8">
            <h2 className="text-xl font-semibold text-black mb-6">
              PDF 번역
            </h2>
            <div className="prose prose-lg max-w-none prose-headings:text-black prose-p:text-black prose-li:text-black prose-strong:text-black">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {analysis.pdfContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      );
    }

    // 번역 결과가 없음
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-black mb-2">
          번역이 아직 없습니다
        </h2>
        <p className="text-[#666666]">
          이 PDF는 아직 번역되지 않았습니다.
        </p>
      </div>
    );
  }

  const pages = analysis.gdrivePdfPages;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2 text-sm text-black">
          <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span>번역 완료</span>
        </div>
      </div>

      {/* Page List */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-black mb-6 flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-base font-bold">
            {pages.length}
          </span>
          페이지별 번역
        </h2>

        <div className="space-y-6">
          {pages.map((page) => (
            <div
              key={page.pageNumber}
              className="border-l-4 border-gray-300 pl-6 py-4"
            >
              {/* Page Header - Clickable to sync with left panel */}
              <div
                className={`flex items-center gap-3 mb-4 ${
                  onPageChange
                    ? 'cursor-pointer hover:bg-gray-200/30 -ml-6 pl-6 -mr-2 pr-2 py-2 rounded-lg transition-colors group'
                    : ''
                }`}
                onClick={() => onPageChange?.(page.pageNumber)}
                title={onPageChange ? `페이지 ${page.pageNumber} 클릭하여 왼쪽 PDF로 이동` : undefined}
              >
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-black text-white font-bold ${onPageChange ? 'group-hover:bg-black/80' : ''}`}>
                  {page.pageNumber}
                </span>
                <span className="text-lg font-semibold text-black">
                  페이지 {page.pageNumber}
                </span>
                {onPageChange && (
                  <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded text-xs text-[#666666] opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>클릭하여 이동</span>
                  </div>
                )}
              </div>

              {/* Translated Content */}
              <div className="bg-[#F9F9F9] border border-gray-100 rounded-xl p-6">
                <div className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-semibold prose-headings:mb-4 prose-headings:mt-6 prose-p:text-black prose-p:leading-loose prose-p:mb-4 prose-li:text-black prose-li:leading-loose prose-ul:space-y-2 prose-ol:space-y-2 prose-strong:text-black prose-code:bg-gray-200 prose-code:text-black prose-code:px-2 prose-code:py-1 prose-code:rounded">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {page.translatedText}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

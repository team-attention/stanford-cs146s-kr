'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { TranslationFile } from '@/lib/translations';
import SourceViewer, { SourceViewerRef } from './SourceViewer';
import ResourceViewer from './ResourceViewer';

interface ResourcePageClientProps {
  resource: TranslationFile;
}

// 색상 (Stanford syllabus 스타일 - 중립적 그레이)
const BRAND_COLORS = {
  primary: '#F4F4F4',
  secondary: '#E5E5E5',
  accent: '#D4D4D4',
  text: '#1a1a1a',
};

export default function ResourcePageClient({ resource }: ResourcePageClientProps) {
  const sourceViewerRef = useRef<SourceViewerRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 왼쪽 패널 너비 비율 (0-100%)
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // YouTube 영상에서 특정 시간으로 이동하는 함수
  const handleSeekTo = useCallback((seconds: number) => {
    if (sourceViewerRef.current) {
      sourceViewerRef.current.seekTo(seconds);
    }
  }, []);

  // Google Slides에서 특정 슬라이드로 이동하는 함수
  const handleSlideChange = useCallback((slideNumber: number) => {
    if (sourceViewerRef.current) {
      sourceViewerRef.current.goToSlide(slideNumber);
    }
  }, []);

  // PDF에서 특정 페이지로 이동하는 함수
  const handlePageChange = useCallback((pageNumber: number) => {
    if (sourceViewerRef.current) {
      sourceViewerRef.current.goToPage(pageNumber);
    }
  }, []);

  // 드래그 시작
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  // 드래그 중
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const mouseX = e.clientX - containerRect.left;

      // 비율 계산 (최소 20%, 최대 80%)
      let newWidth = (mouseX / containerWidth) * 100;
      newWidth = Math.max(20, Math.min(80, newWidth));

      setLeftPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // 드래그 중 텍스트 선택 방지
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  // YouTube 구간별 클리핑 데이터
  const segments = resource.analysis?.youtubeSegments || [];
  const isYouTube = resource.type === 'youtube' || resource.url.includes('youtube.com') || resource.url.includes('youtu.be');

  return (
    <main
      ref={containerRef}
      className="flex flex-1 overflow-hidden p-4"
      style={{ height: 'calc(100vh - 80px)' }}
    >
      {/* 왼쪽 패널: 원본 콘텐츠 + 구간별 클리핑 (YouTube) */}
      <div
        className="overflow-auto flex flex-col"
        style={{ width: `${leftPanelWidth}%` }}
      >
        {/* 영상/슬라이드/PDF 뷰어 */}
        <div className={isYouTube && segments.length > 0 ? 'flex-shrink-0' : 'flex-1'}>
          <SourceViewer
            ref={sourceViewerRef}
            type={resource.type}
            url={resource.url}
            title={resource.title}
          />
        </div>

        {/* YouTube 구간별 클리핑 목록 (영상 아래) */}
        {isYouTube && segments.length > 0 && (
          <div className="mt-4 rounded-lg border border-gray-200 bg-white overflow-hidden">
            <div
              className="px-4 py-3 border-b"
              style={{ backgroundColor: BRAND_COLORS.primary }}
            >
              <h3 className="font-semibold text-black flex items-center gap-2">
                구간별 클리핑 ({segments.length}개)
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                클릭하면 해당 구간으로 이동합니다
              </p>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {segments.map((seg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSeekTo(seg.startTime)}
                  className="w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    {/* 타임스탬프 */}
                    <span
                      className="inline-flex items-center gap-1 text-sm font-mono px-2 py-0.5 rounded transition-colors flex-shrink-0"
                      style={{
                        backgroundColor: BRAND_COLORS.secondary,
                        color: BRAND_COLORS.text
                      }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      {seg.startTimeFormatted}
                    </span>

                    {/* 태그 */}
                    <span
                      className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: BRAND_COLORS.accent,
                        color: BRAND_COLORS.text
                      }}
                    >
                      {seg.tag}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h4 className="font-medium text-black mt-2 group-hover:text-blue-600 transition-colors">
                    {seg.title}
                  </h4>

                  {/* 설명 (짧게) */}
                  {seg.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {seg.description}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 리사이즈 바 */}
      <div
        className={`
          relative flex-shrink-0 w-2 mx-1 cursor-col-resize
          group hover:bg-red-200 transition-colors rounded
          ${isDragging ? 'bg-red-400' : 'bg-gray-200'}
        `}
        onMouseDown={handleMouseDown}
      >
        {/* 드래그 핸들 시각적 표시 */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-1">
          <div className={`w-1 h-1 rounded-full ${isDragging ? 'bg-white' : 'bg-gray-400 group-hover:bg-red-500'}`} />
          <div className={`w-1 h-1 rounded-full ${isDragging ? 'bg-white' : 'bg-gray-400 group-hover:bg-red-500'}`} />
          <div className={`w-1 h-1 rounded-full ${isDragging ? 'bg-white' : 'bg-gray-400 group-hover:bg-red-500'}`} />
        </div>
      </div>

      {/* 오른쪽 패널: 번역 및 분석 */}
      <div
        className="overflow-auto"
        style={{ width: `${100 - leftPanelWidth}%` }}
      >
        <ResourceViewer
          resource={resource}
          onSeekTo={resource.type === 'youtube' ? handleSeekTo : undefined}
          onSlideChange={resource.type === 'slides' ? handleSlideChange : undefined}
          onPageChange={resource.type === 'pdf' ? handlePageChange : undefined}
        />
      </div>
    </main>
  );
}

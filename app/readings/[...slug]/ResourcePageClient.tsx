'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { TranslationFile } from '@/lib/translations';
import { detectActualType } from '@/lib/resourceType';
import SourceViewer, { SourceViewerRef } from './SourceViewer';
import ResourceViewer from './ResourceViewer';

interface ResourcePageClientProps {
  resource: TranslationFile;
}

export default function ResourcePageClient({ resource }: ResourcePageClientProps) {
  const sourceViewerRef = useRef<SourceViewerRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 왼쪽 패널 너비 비율 (0-100%)
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const actualType = detectActualType(resource.url, resource.type);
  const isYouTube = actualType === 'youtube';
  const hideTranslationPanel = actualType === 'slides';
  const showSourcePanel = hideTranslationPanel || !isMobile;
  const showTranslationPanel = !hideTranslationPanel;
  const showResizer = !isMobile && showTranslationPanel;
  const leftPanelClassName = isYouTube
    ? 'flex flex-col overflow-hidden'
    : 'flex flex-col overflow-auto';
  const normalizedResource = actualType === resource.type
    ? resource
    : { ...resource, type: actualType };
  const sourcePanelWidth = showTranslationPanel ? `${leftPanelWidth}%` : '100%';

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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (!isYouTube || isMobile) return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isYouTube, isMobile]);

  return (
    <main
      ref={containerRef}
      className="flex flex-1 min-h-0 overflow-hidden p-3 md:p-4"
    >
      {showSourcePanel && (
        <div
          className={leftPanelClassName}
          style={{ width: sourcePanelWidth }}
        >
          <div className="flex-1 min-h-0">
            <SourceViewer
              ref={sourceViewerRef}
              type={normalizedResource.type}
              url={normalizedResource.url}
              title={normalizedResource.title}
            />
          </div>
        </div>
      )}

      {showResizer && (
        <div
          className={`
            relative flex-shrink-0 w-2 mx-1 cursor-col-resize
            group hover:bg-red-200 transition-colors rounded
            ${isDragging ? 'bg-red-400' : 'bg-gray-200'}
          `}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-1">
            <div className={`w-1 h-1 rounded-full ${isDragging ? 'bg-white' : 'bg-gray-400 group-hover:bg-red-500'}`} />
            <div className={`w-1 h-1 rounded-full ${isDragging ? 'bg-white' : 'bg-gray-400 group-hover:bg-red-500'}`} />
            <div className={`w-1 h-1 rounded-full ${isDragging ? 'bg-white' : 'bg-gray-400 group-hover:bg-red-500'}`} />
          </div>
        </div>
      )}

      {showTranslationPanel && (
        <div
          className="flex-1 overflow-auto min-w-0"
          style={{ width: showSourcePanel ? `${100 - leftPanelWidth}%` : '100%' }}
        >
          <ResourceViewer
            resource={normalizedResource}
            onSeekTo={actualType === 'youtube' ? handleSeekTo : undefined}
            onSlideChange={actualType === 'slides' ? handleSlideChange : undefined}
            onPageChange={actualType === 'pdf' ? handlePageChange : undefined}
          />
        </div>
      )}
    </main>
  );
}

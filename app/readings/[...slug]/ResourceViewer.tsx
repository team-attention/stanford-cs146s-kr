'use client';

import { TranslationFile } from '@/lib/translations';
import {
  YouTubeAnalysis,
  SlidesAnalysis,
  PDFAnalysis,
  GenericAnalysis,
  WebsiteAnalysis,
  GoogleDrivePDFAnalysis,
} from './ResourceViewerComponents';
import { AnalysisEmptyState } from './AnalysisStates';

interface ResourceViewerProps {
  resource: TranslationFile;
  onSeekTo?: (seconds: number) => void;
  onSlideChange?: (slideNumber: number) => void;
  onPageChange?: (pageNumber: number) => void;
}

export default function ResourceViewer({ resource, onSeekTo, onSlideChange, onPageChange }: ResourceViewerProps) {
  const { type, analysis } = resource;

  // 분석 결과가 있는지 확인 (type별로 다른 필드 체크)
  const hasContent = analysis && (
    analysis.summary_ko ||
    analysis.pdfContent ||
    analysis.detailedNote_ko ||
    (analysis.youtubeSegments && analysis.youtubeSegments.length > 0) ||
    (analysis.slides && analysis.slides.length > 0) ||
    (analysis.gdrivePdfPages && analysis.gdrivePdfPages.length > 0) ||
    (analysis.keyPoints && analysis.keyPoints.length > 0)
  );

  // 분석 결과가 없으면 빈 상태 표시
  if (!analysis || !hasContent) {
    return <AnalysisEmptyState type={type} />;
  }

  // 공통 props (정적 표시만)
  const analysisProps = {
    resource,
    onSeekTo,
  };

  // YouTube 분석 결과
  if (type === 'youtube' || analysis?.youtubeSegments) {
    return <YouTubeAnalysis {...analysisProps} />;
  }

  // Slides 분석 결과
  if (type === 'slides' || analysis?.slides) {
    return <SlidesAnalysis {...analysisProps} onSlideChange={onSlideChange} />;
  }

  // Website/Reading 분석 결과 (번역된 마크다운)
  if ((type === 'reading' || type === 'web') && analysis?.pdfContent) {
    return <WebsiteAnalysis {...analysisProps} />;
  }

  // PDF 분석 결과 (Google Drive PDF 페이지별 번역이 있는 경우)
  if (type === 'pdf' && analysis?.gdrivePdfPages && analysis.gdrivePdfPages.length > 0) {
    return <GoogleDrivePDFAnalysis {...analysisProps} onPageChange={onPageChange} />;
  }

  // PDF 분석 결과 (일반)
  if (type === 'pdf' || analysis?.pdfContent) {
    return <PDFAnalysis {...analysisProps} onPageChange={onPageChange} />;
  }

  // 기본: 요약만 표시
  return <GenericAnalysis {...analysisProps} />;
}

/**
 * Content Analysis Type System
 *
 * Discriminated Union 기반 타입 시스템
 * - 4개 콘텐츠 타입 (YouTube, PDF, Slides, Website) 통합
 * - Type Guards로 런타임 타입 안전성 보장
 * - 기존 타입과 하위 호환성 유지
 */

// =============================================================================
// Content Type Definition
// =============================================================================

/**
 * 지원하는 콘텐츠 타입
 */
export type ContentType = 'youtube' | 'pdf' | 'slides' | 'website';

/**
 * 모든 콘텐츠 타입 목록 (런타임 검증용)
 */
export const CONTENT_TYPES: ContentType[] = ['youtube', 'pdf', 'slides', 'website'];

// =============================================================================
// Base Analysis Result
// =============================================================================

/**
 * 모든 분석 결과의 기본 인터페이스
 * - `type` 필드가 Discriminant 역할
 */
export interface BaseAnalysisResult {
  /** 콘텐츠 타입 (Discriminant) */
  readonly type: ContentType;
  /** 소스 URL 또는 식별자 */
  source: string;
  /** 한국어 요약 */
  summary_ko: string;
  /** 핵심 포인트 */
  keyPoints: string[];
  /** 분석 시각 (ISO 8601) */
  analyzedAt: string;
  /** 캐시에서 로드 여부 */
  fromCache?: boolean;
}

// =============================================================================
// YouTube Analysis Types
// =============================================================================

/**
 * YouTube 세그먼트 태그
 */
export type YouTubeSegmentTag =
  | 'intro'
  | 'setup'
  | 'highlight'
  | 'reveal'
  | 'climax'
  | 'punchline'
  | 'transition'
  | 'tutorial'
  | 'demo'
  | 'cta'
  | 'outro'
  | 'hook';

/**
 * 유효한 YouTube 태그 목록 (런타임 검증용)
 */
export const VALID_YOUTUBE_TAGS: YouTubeSegmentTag[] = [
  'intro', 'setup', 'highlight', 'reveal', 'climax',
  'punchline', 'transition', 'tutorial', 'demo', 'cta', 'outro', 'hook',
];

/**
 * YouTube 비디오 세그먼트
 */
export interface YouTubeSegment {
  /** 시작 시간 (초) */
  startTime: number;
  /** 종료 시간 (초) */
  endTime: number;
  /** 포맷된 시작 시간 (MM:SS 또는 HH:MM:SS) */
  startTimeFormatted: string;
  /** 세그먼트 제목 (한국어) */
  title: string;
  /** 세그먼트 태그 */
  tag: YouTubeSegmentTag;
  /** 세그먼트 설명 (한국어) */
  description: string;
  /** 원본 자막/트랜스크립트 */
  subtitlesOriginal: string;
  /** 번역된 자막 (한국어) */
  subtitlesTranslated: string;
}

/**
 * YouTube 분석 결과
 */
export interface YouTubeAnalysisResult extends BaseAnalysisResult {
  readonly type: 'youtube';
  /** YouTube 비디오 ID */
  videoId: string;
  /** 표준 YouTube URL */
  videoUrl: string;
  /** 전체 요약 (한국어) */
  overallSummary: string;
  /** 주요 주제 */
  topics: string[];
  /** 세그먼트별 클리핑 */
  youtubeSegments: YouTubeSegment[];
}

// =============================================================================
// PDF Analysis Types
// =============================================================================

/**
 * PDF 페이지 분석 결과
 */
export interface PDFPage {
  /** 페이지 번호 */
  pageNumber: number;
  /** 페이지 요약 (한국어) */
  summary_ko: string;
  /** 핵심 포인트 */
  keyPoints: string[];
  /** 원본 텍스트 */
  text?: string;
  /** 번역된 텍스트 (한국어) */
  text_ko?: string;
}

/**
 * PDF 목차 항목
 */
export interface PDFTOCItem {
  /** 목차 레벨 */
  level: number;
  /** 제목 */
  title: string;
  /** 페이지 번호 */
  page: number;
}

/**
 * PDF 분석 결과
 */
export interface PDFAnalysisResult extends BaseAnalysisResult {
  readonly type: 'pdf';
  /** PDF URL */
  pdfUrl: string;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 전체 요약 (한국어) */
  overallSummary_ko: string;
  /** 목차 */
  tableOfContents: PDFTOCItem[];
  /** 페이지별 분석 */
  pages: PDFPage[];
}

// =============================================================================
// Google Slides Analysis Types
// =============================================================================

/**
 * 슬라이드 분석 결과
 */
export interface SlideItem {
  /** 슬라이드 번호 */
  slideNumber: number;
  /** 슬라이드 요약 (한국어) */
  summary_ko: string;
  /** 핵심 포인트 */
  keyPoints: string[];
  /** 원본 텍스트 */
  text_original?: string;
  /** 번역된 텍스트 (한국어) */
  text_ko?: string;
}

/**
 * Google Slides 분석 결과
 */
export interface SlidesAnalysisResult extends BaseAnalysisResult {
  readonly type: 'slides';
  /** Slides URL */
  slidesUrl: string;
  /** Presentation ID */
  presentationId: string;
  /** 전체 슬라이드 수 */
  totalSlides: number;
  /** 전체 요약 (한국어) */
  overallSummary_ko: string;
  /** 슬라이드별 분석 */
  slides: SlideItem[];
}

// =============================================================================
// Website Analysis Types
// =============================================================================

/**
 * Website 분석 결과
 */
export interface WebsiteAnalysisResult extends BaseAnalysisResult {
  readonly type: 'website';
  /** Website URL */
  url: string;
  /** 콘텐츠 문자 수 */
  characterCount: number;
  /** 전체 요약 (한국어) */
  overallSummary?: string;
}

// =============================================================================
// Discriminated Union Type
// =============================================================================

/**
 * 모든 분석 결과의 Discriminated Union
 * - `type` 필드로 타입 구분
 * - Type Guard와 함께 사용하여 타입 안전성 보장
 */
export type ContentAnalysisResult =
  | YouTubeAnalysisResult
  | PDFAnalysisResult
  | SlidesAnalysisResult
  | WebsiteAnalysisResult;

// =============================================================================
// Type Guards
// =============================================================================

/**
 * YouTube 분석 결과인지 확인
 */
export function isYouTubeResult(result: ContentAnalysisResult): result is YouTubeAnalysisResult {
  return result.type === 'youtube';
}

/**
 * PDF 분석 결과인지 확인
 */
export function isPDFResult(result: ContentAnalysisResult): result is PDFAnalysisResult {
  return result.type === 'pdf';
}

/**
 * Slides 분석 결과인지 확인
 */
export function isSlidesResult(result: ContentAnalysisResult): result is SlidesAnalysisResult {
  return result.type === 'slides';
}

/**
 * Website 분석 결과인지 확인
 */
export function isWebsiteResult(result: ContentAnalysisResult): result is WebsiteAnalysisResult {
  return result.type === 'website';
}

/**
 * 유효한 ContentType인지 확인
 */
export function isValidContentType(type: string): type is ContentType {
  return CONTENT_TYPES.includes(type as ContentType);
}

/**
 * 유효한 YouTube 태그인지 확인
 */
export function isValidYouTubeTag(tag: string): tag is YouTubeSegmentTag {
  return VALID_YOUTUBE_TAGS.includes(tag as YouTubeSegmentTag);
}

// =============================================================================
// Analyzer Options
// =============================================================================

/**
 * 분석기 옵션
 */
export interface AnalyzerOptions {
  /** 캐시 무시하고 재분석 */
  forceRefresh?: boolean;
  /** 커스텀 캐시 디렉토리 */
  cacheDir?: string;
  /** AI 모델 선택 (선택적) */
  model?: string;
}

// =============================================================================
// Structured Content (Shared)
// =============================================================================

/**
 * 구조화된 목차 항목
 */
export interface StructuredTOCItem {
  /** 섹션 고유 ID */
  id: string;
  /** 목차 레벨 (1=H1, 2=H2, 등) */
  level: number;
  /** 섹션 제목 (한국어) */
  title: string;
  /** 원본 제목 (영어) */
  originalTitle?: string;
  /** 페이지/슬라이드 번호 */
  pageNumber?: number;
}

/**
 * 구조화된 섹션
 */
export interface StructuredSection {
  /** 섹션 고유 ID */
  id: string;
  /** 섹션 제목 (한국어) */
  title: string;
  /** 목차 레벨 */
  level: number;
  /** 상세 한국어 번역 내용 */
  content_ko: string;
  /** 원문 내용 */
  content_original?: string;
  /** 핵심 포인트 */
  keyPoints?: string[];
  /** 페이지/슬라이드 번호 */
  pageNumber?: number;
}

/**
 * 구조화된 콘텐츠
 */
export interface StructuredContent {
  /** 전체 요약 (한국어) */
  overallSummary: string;
  /** 클릭 가능한 목차 */
  tableOfContents: StructuredTOCItem[];
  /** 상세 섹션별 내용 */
  sections: StructuredSection[];
}

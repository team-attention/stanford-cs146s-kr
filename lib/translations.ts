/**
 * Translations 데이터 로딩 유틸리티
 */

import fs from 'fs';
import path from 'path';

const TRANSLATIONS_DIR = path.join(process.cwd(), 'data/translations');

export interface TranslationAnalysis {
  summary_ko: string | null;
  keyPoints: string[];
  topics: string[];
  // YouTube
  youtubeSegments?: Array<{
    startTime: number;
    endTime: number;
    startTimeFormatted: string;
    title: string;
    tag: string;
    description: string;
    subtitlesOriginal: string;
    subtitlesTranslated: string;
  }>;
  videoId?: string;
  // Slides
  slides?: Array<{
    slideNumber: number;
    summary_ko: string;
    keyPoints: string[];
    text_original: string;
    text_ko: string;
  }>;
  totalSlides?: number;
  presentationId?: string;
  // PDF
  pdfContent?: string | null;
  // Google Drive PDF (GPT-4o 페이지별 번역)
  gdrivePdfPages?: Array<{
    pageNumber: number;
    originalText: string;
    translatedText: string;
  }>;
  // Detailed Note (GPT-4o로 생성된 상세 학습 노트)
  detailedNote_ko?: string;
  // GitHub 파일 소스 타입 (assignment.md / README)
  sourceType?: string;
}

export interface TranslationFile {
  slug: string;
  title: string;
  url: string;
  type: string;
  week: number;
  analyzedAt: string | null;
  analysis: TranslationAnalysis | null;
}

export interface WeeklyResources {
  week: number;
  resources: TranslationFile[];
}

/**
 * 모든 리소스 목록 가져오기 (translations 폴더 기반)
 */
export async function getAllResources(): Promise<TranslationFile[]> {
  const resources: TranslationFile[] = [];

  // translations 폴더의 모든 week 폴더 순회
  if (!fs.existsSync(TRANSLATIONS_DIR)) {
    // Fallback: resource-urls.json 사용
    const resourceUrlsPath = path.join(process.cwd(), 'resource-urls.json');
    const resourceUrls = JSON.parse(fs.readFileSync(resourceUrlsPath, 'utf-8'));
    return resourceUrls.map((r: any) => ({
      ...r,
      analyzedAt: null,
      analysis: null,
    }));
  }

  const weekFolders = fs.readdirSync(TRANSLATIONS_DIR)
    .filter(f => f.startsWith('week-'))
    .sort();

  for (const weekFolder of weekFolders) {
    const weekPath = path.join(TRANSLATIONS_DIR, weekFolder);
    const files = fs.readdirSync(weekPath).filter(f => f.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(weekPath, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        resources.push(data);
      } catch (e) {
        console.error(`Failed to read ${file}:`, e);
      }
    }
  }

  return resources;
}

/**
 * Week별로 그룹화된 리소스 가져오기
 */
export async function getResourcesByWeek(): Promise<WeeklyResources[]> {
  const resources = await getAllResources();

  const weekMap = new Map<number, TranslationFile[]>();

  for (const resource of resources) {
    if (!weekMap.has(resource.week)) {
      weekMap.set(resource.week, []);
    }
    weekMap.get(resource.week)!.push(resource);
  }

  // 정렬해서 반환
  return Array.from(weekMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([week, resources]) => ({ week, resources }));
}

/**
 * 특정 Week의 리소스 가져오기
 */
export async function getWeekResources(week: number): Promise<TranslationFile[]> {
  const weekFolder = path.join(TRANSLATIONS_DIR, `week-${String(week).padStart(2, '0')}`);

  if (!fs.existsSync(weekFolder)) {
    return [];
  }

  const files = fs.readdirSync(weekFolder).filter(f => f.endsWith('.json'));
  const resources: TranslationFile[] = [];

  for (const file of files) {
    try {
      const filePath = path.join(weekFolder, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      resources.push(data);
    } catch (e) {
      console.error(`Failed to read ${file}:`, e);
    }
  }

  return resources;
}

/**
 * 특정 리소스 가져오기 (slug 기반)
 */
export async function getResourceBySlug(slug: string): Promise<TranslationFile | null> {
  if (!slug) {
    return null;
  }

  // slug에서 week 번호 추출: week-5-lecture-xxx → 5
  const weekMatch = slug.match(/^week-(\d+)-/);
  if (!weekMatch) {
    // Fallback: resource-urls.json에서 찾기
    const resources = await getAllResources();
    const found = resources.find(r => r.slug === slug);
    return found || null;
  }

  const week = parseInt(weekMatch[1]);
  const weekFolder = path.join(TRANSLATIONS_DIR, `week-${String(week).padStart(2, '0')}`);
  const filePath = path.join(weekFolder, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    // Fallback: resource-urls.json에서 찾기
    const resources = await getAllResources();
    const found = resources.find(r => r.slug === slug);
    return found || null;
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data;
  } catch (e) {
    console.error(`Failed to read ${filePath}:`, e);
    return null;
  }
}

/**
 * 분석 완료 여부 확인
 * - analyzedAt이 있고
 * - 타입별로 최소 하나의 유의미한 분석 결과가 있으면 true
 */
export function hasAnalysis(resource: TranslationFile): boolean {
  if (!resource.analysis || !resource.analyzedAt) {
    return false;
  }

  const analysis = resource.analysis;

  // 타입별 분석 완료 조건
  switch (resource.type) {
    case 'youtube':
      // YouTube: summary_ko + segments, 또는 최소 summary_ko
      return !!(analysis.summary_ko || (analysis.youtubeSegments?.length || 0) > 0);
    case 'slides':
      // Slides: summary_ko + slides, 또는 최소 summary_ko
      return !!(analysis.summary_ko || (analysis.slides?.length || 0) > 0);
    case 'pdf':
      // PDF: summary_ko 또는 pdfContent가 있으면 분석 완료
      return !!(analysis.summary_ko || analysis.pdfContent);
    case 'reading':
    case 'web':
      // Reading/Web: summary_ko 또는 pdfContent(웹 콘텐츠 저장됨)가 있으면 분석 완료
      return !!(analysis.summary_ko || analysis.pdfContent);
    case 'github':
      // GitHub: summary_ko 또는 pdfContent(README 내용 등)가 있으면 분석 완료
      return !!(analysis.summary_ko || analysis.pdfContent);
    default:
      // 기타 타입: summary_ko 또는 keyPoints가 있으면 분석 완료
      return !!(analysis.summary_ko || (analysis.keyPoints?.length || 0) > 0);
  }
}

/**
 * 타입별 아이콘 이모지
 */
export function getTypeEmoji(type: string): string {
  const emojis: Record<string, string> = {
    youtube: '📺',
    slides: '📊',
    'figma-slide': '🎨',
    pdf: '📄',
    github: '💻',
    reading: '📖',
    web: '🌐',
  };
  return emojis[type] || '📌';
}

/**
 * 타입별 라벨
 */
export function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    youtube: 'YouTube',
    slides: '슬라이드',
    'figma-slide': 'Figma Slide',
    pdf: 'PDF',
    github: 'GitHub',
    reading: '읽기 자료',
    web: '웹사이트',
  };
  return labels[type] || type;
}

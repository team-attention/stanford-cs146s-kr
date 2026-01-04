import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getResourceBySlug, getAllResources, getTypeLabel, hasAnalysis } from '@/lib/translations';
import ResourcePageClient from './ResourcePageClient';

export const dynamic = 'force-static';

// 정적 생성을 위한 params
export async function generateStaticParams() {
  const resources = await getAllResources();
  return resources.map((r) => ({
    // readings/week1/week-1-deep-dive-into-llms 형식
    slug: [`week${r.week}`, r.slug],
  }));
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function ReadingPage({ params }: PageProps) {
  const { slug: slugParts } = await params;

  // slugParts = ['week1', 'week-1-deep-dive-into-llms']
  if (!slugParts || slugParts.length < 2) {
    notFound();
  }

  const [_weekPart, articleSlug] = slugParts;
  const decodedSlug = decodeURIComponent(articleSlug);
  const resource = await getResourceBySlug(decodedSlug);

  if (!resource) {
    notFound();
  }

  const analyzed = hasAnalysis(resource);
  const typeLabel = getTypeLabel(resource.type);

  return (
    <div className="flex h-screen flex-col bg-[#F9F9F9]">
      {/* Header - Brand Design System */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/#syllabus"
              className="text-[#666666] hover:text-black transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-200 text-black">
                  Week {resource.week}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-200 text-black">
                  {typeLabel}
                </span>
              </div>
              <h1 className="text-xl font-bold text-black truncate">
                {resource.title}
              </h1>
            </div>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border text-sm font-medium hover:bg-red-50 transition-colors"
              style={{ color: '#000000' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              원본 보기
            </a>
          </div>
        </div>
      </header>

      {/* 2-Panel Content */}
      <ResourcePageClient resource={resource} />

      {/* Footer */}
      <footer className="flex-shrink-0 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-center text-sm text-white/60">CS262: The Modern Software Developer - Stanford University</p>
        </div>
      </footer>
    </div>
  );
}

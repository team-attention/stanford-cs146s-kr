'use client';

/**
 * 번역되지 않은 상태 UI 컴포넌트 (정적 표시)
 */
interface AnalysisEmptyStateProps {
  type: string;
}

export function AnalysisEmptyState({ type }: AnalysisEmptyStateProps) {
  const getDescription = () => {
    switch (type) {
      case 'youtube':
        return '이 YouTube 영상은 아직 번역되지 않았습니다.';
      case 'slides':
        return '이 슬라이드는 아직 번역되지 않았습니다.';
      case 'pdf':
        return '이 PDF는 아직 번역되지 않았습니다.';
      case 'reading':
      case 'web':
        return '이 웹사이트는 아직 번역되지 않았습니다.';
      case 'github':
        return '이 GitHub 문서는 아직 번역되지 않았습니다.';
      default:
        return '이 콘텐츠는 아직 번역되지 않았습니다.';
    }
  };

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
        {getDescription()}
      </p>
    </div>
  );
}

import { Link } from 'react-router-dom'
import type { Reading, TranslationStatus } from '@/types/syllabus'

interface ReadingListProps {
  readings: Reading[]
  weekNumber: number
}

// 번역 상태 결정: 명시된 status > krSlug 유무로 판단
function getTranslationStatus(reading: Reading): TranslationStatus {
  if (reading.translationStatus) return reading.translationStatus
  return reading.krSlug ? 'complete' : 'none'
}

// GitHub 소스인지 확인
function isGitHubSource(url: string): boolean {
  return url.includes('github.com') && !url.includes('github.blog')
}

// 상태별 라벨
const statusLabel: Record<Exclude<TranslationStatus, 'complete'>, string> = {
  in_progress: '번역중',
  none: '예정',
}

export default function ReadingList({ readings, weekNumber }: ReadingListProps) {
  return (
    <ul className="pl-3 space-y-2">
      {readings.map((reading, i) => {
        const status = getTranslationStatus(reading)
        const hasKorean = reading.krSlug && status === 'complete'
        const isGitHub = isGitHubSource(reading.url)

        return (
          <li key={i} className="text-[20.8px] leading-[33.28px] text-text-body">
            <div>• {reading.title}</div>
            <div className="ml-4 text-[14px]">
              <span className="text-text-secondary">→ </span>
              {isGitHub ? (
                // GitHub 소스인 경우 텍스트 링크로 표시
                <a
                  href={reading.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stanford-red hover:underline"
                >
                  GitHub
                </a>
              ) : (
                // 일반 소스인 경우 한국어/English 링크 표시
                <>
                  {hasKorean ? (
                    <Link
                      to={`/readings/week${weekNumber}/${reading.krSlug}`}
                      className="text-kr-accent hover:underline"
                    >
                      한국어
                    </Link>
                  ) : (
                    <span className="text-text-secondary/60">
                      한국어
                      <span className="text-[12px] ml-1 opacity-70">({statusLabel[status as Exclude<TranslationStatus, 'complete'>]})</span>
                    </span>
                  )}
                  <span className="text-text-secondary mx-2">|</span>
                  <a
                    href={reading.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stanford-red hover:underline"
                  >
                    English
                  </a>
                </>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

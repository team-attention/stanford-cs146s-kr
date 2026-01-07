'use client'

import Link from 'next/link'
import type { Reading, TranslationStatus } from '@/types/syllabus'

interface ReadingListProps {
  readings: Reading[]
  weekNumber: number
  blockKoreanLinks?: boolean
  onKoreanClick?: () => void
}

// 번역 상태 결정: 명시된 status > krSlug 유무로 판단
function getTranslationStatus(reading: Reading): TranslationStatus {
  if (reading.translationStatus) return reading.translationStatus
  return reading.krSlug ? 'complete' : 'none'
}

// 상태별 라벨
const statusLabel: Record<Exclude<TranslationStatus, 'complete'>, string> = {
  in_progress: '번역중',
  none: '예정',
}

export default function ReadingList({
  readings,
  weekNumber,
  blockKoreanLinks,
  onKoreanClick,
}: ReadingListProps) {
  return (
    <ul className="pl-3 space-y-1">
      {readings.map((reading, i) => {
        const status = getTranslationStatus(reading)
        const hasKorean = reading.krSlug && status === 'complete'
        const shouldBlockKorean = Boolean(hasKorean && blockKoreanLinks)

        return (
          <li key={i} className="text-[16px] leading-[24px] text-text-body">
            <span>• {reading.title}</span>
            <span className="ml-2">
              {hasKorean ? (
                shouldBlockKorean ? (
                  <button
                    type="button"
                    onClick={onKoreanClick}
                    className="text-kr-accent hover:underline"
                  >
                    [한국어]
                  </button>
                ) : (
                  <Link
                    href={`/readings/week${weekNumber}/${reading.krSlug}`}
                    className="text-kr-accent hover:underline"
                  >
                    [한국어]
                  </Link>
                )
              ) : (
                <span className="text-text-secondary/60">
                  [한국어<span className="text-[12px] ml-0.5 opacity-70">{statusLabel[status as Exclude<TranslationStatus, 'complete'>]}</span>]
                </span>
              )}
            </span>
            <a
              href={reading.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-stanford-red hover:underline"
            >
              [English]
            </a>
          </li>
        )
      })}
    </ul>
  )
}

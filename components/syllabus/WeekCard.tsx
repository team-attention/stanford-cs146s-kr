'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Week, TranslationStatus } from '@/types/syllabus'
import ReadingList from './ReadingList'
import LectureList from './LectureList'
import ComingSoonModal from './ComingSoonModal'

interface WeekCardProps {
  week: Week
}

// 번역 상태 라벨
const statusLabel: Record<Exclude<TranslationStatus, 'complete'>, string> = {
  in_progress: '번역중',
  none: '예정',
}

export default function WeekCard({ week }: WeekCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const blockKoreanLinks = week.number >= 2

  const handleKoreanClick = () => {
    setIsModalOpen(true)
  }

  return (
    <section className="mb-12 border-2 border-stanford-red rounded-xl px-8 pt-4 pb-8">
      {/* Week Header */}
      <h3 className="text-[20.8px] font-semibold text-stanford-red leading-[31.2px] mb-2">
        Week {week.number}: {week.title}
      </h3>

      {/* Week Content */}
      <div>
        {week.topics.length > 0 && (
          <div className="mb-6">
            <p className="text-[16px] font-bold text-text-primary mb-2">Topics</p>
            <ul className="pl-3 space-y-1">
              {week.topics.map((topic, i) => (
                <li key={i} className="text-[16px] leading-[24px] text-text-body">• {topic}</li>
              ))}
            </ul>
          </div>
        )}

        {week.readings.length > 0 && (
          <div className="mb-6">
            <p className="text-[16px] font-bold text-text-primary mb-2">Reading</p>
            <ReadingList
              readings={week.readings}
              weekNumber={week.number}
              blockKoreanLinks={blockKoreanLinks}
              onKoreanClick={handleKoreanClick}
            />
          </div>
        )}

        {week.assignments.length > 0 && (
          <div className="mb-6">
            <p className="text-[16px] font-bold text-text-primary mb-2">Assignment</p>
            <ul className="pl-3 space-y-1">
              {week.assignments.map((assignment, i) => {
                const status = assignment.translationStatus || (assignment.krSlug ? 'complete' : 'none')
                const hasKorean = assignment.krSlug && status === 'complete'
                const shouldBlockKorean = Boolean(hasKorean && blockKoreanLinks)

                return (
                  <li key={i} className="text-[16px] leading-[24px] text-text-body">
                    <span>• {assignment.title}</span>
                    <span className="ml-2">
                      {hasKorean ? (
                        shouldBlockKorean ? (
                          <button
                            type="button"
                            onClick={handleKoreanClick}
                            className="text-kr-accent hover:underline"
                          >
                            [한국어]
                          </button>
                        ) : (
                          <Link
                            href={`/readings/week${week.number}/${assignment.krSlug}`}
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
                    {assignment.url && (
                      <a
                        href={assignment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-stanford-red hover:underline"
                      >
                        [English]
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {week.lectures.length > 0 && (
          <LectureList
            lectures={week.lectures}
            weekNumber={week.number}
            blockKoreanLinks={blockKoreanLinks}
            onKoreanClick={handleKoreanClick}
          />
        )}
      </div>

      <ComingSoonModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

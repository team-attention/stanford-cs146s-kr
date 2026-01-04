'use client'

import Link from 'next/link'
import type { Lecture } from '@/types/syllabus'

interface LectureListProps {
  lectures: Lecture[]
  weekNumber: number
}

export default function LectureList({ lectures, weekNumber }: LectureListProps) {
  return (
    <div className="space-y-1">
      {lectures.map((lecture, i) => (
        <p key={i} className="text-[16px] leading-[24px] text-text-primary">
          <span className="font-medium">{lecture.day}: </span>

          {/* Guest speaker case */}
          {lecture.guest ? (
            <>
              <a
                href={lecture.guest.linkedIn || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stanford-red underline"
              >
                {lecture.guest.name}
              </a>
              <span>, {lecture.guest.role} </span>
              <a
                href={lecture.guest.companyUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stanford-red underline"
              >
                {lecture.guest.company}
              </a>
              {/* Co-guest speaker */}
              {lecture.coGuest && (
                <>
                  <span>, and </span>
                  <a
                    href={lecture.coGuest.linkedIn || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stanford-red underline"
                  >
                    {lecture.coGuest.name}
                  </a>
                  <span>, {lecture.coGuest.role} </span>
                  <a
                    href={lecture.coGuest.companyUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stanford-red underline"
                  >
                    {lecture.coGuest.company}
                  </a>
                </>
              )}
            </>
          ) : (
            /* Regular lecture title */
            <span>{lecture.title}</span>
          )}

          {/* Slides link */}
          {lecture.slidesUrl && (
            <>
              {' - Slides '}
              {lecture.krSlidesSlug ? (
                <Link
                  href={`/readings/week${weekNumber}/${lecture.krSlidesSlug}`}
                  className="text-kr-accent hover:underline"
                >
                  [한국어]
                </Link>
              ) : (
                <span className="text-text-secondary/60">
                  [한국어<span className="text-[12px] ml-0.5 opacity-70">예정</span>]
                </span>
              )}
              <a
                href={lecture.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-stanford-red hover:underline"
              >
                [English]
              </a>
            </>
          )}

          {/* Additional resources */}
          {lecture.additionalResources && lecture.additionalResources.map((resource, j) => (
            <span key={j}>
              {', '}
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stanford-red underline"
              >
                {resource.title}
              </a>
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}

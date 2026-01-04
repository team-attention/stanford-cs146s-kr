'use client'

import { useState } from 'react'
import type { FaqItem } from '@/types/syllabus'

interface FaqAccordionProps {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#F3F4F6] transition-colors"
          >
            <span className="text-[19.2px] font-medium text-text-primary">
              {item.question}
            </span>
            <span className="text-text-secondary text-xl ml-4 flex-shrink-0">
              {openItems.has(index) ? '−' : '+'}
            </span>
          </button>
          {openItems.has(index) && (
            <div className="px-6 pb-4 text-[19.2px] leading-[28.8px] text-text-body">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

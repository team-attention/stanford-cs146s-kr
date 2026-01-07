'use client'

import { useEffect } from 'react'

interface ComingSoonModalProps {
  open: boolean
  onClose: () => void
}

export default function ComingSoonModal({ open, onClose }: ComingSoonModalProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        className="relative z-10 w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl"
      >
        <h3 id="coming-soon-title" className="text-lg font-semibold text-text-primary">
          준비 중입니다
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          한국어 자료는 검수 중이에요. 조금만 기다려 주세요.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-stanford-red px-4 py-2 text-sm font-semibold text-white hover:bg-stanford-red-dark"
        >
          확인
        </button>
      </div>
    </div>
  )
}

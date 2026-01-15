import { Link } from 'react-router-dom'
import { ChildReading } from '@/content/readings'
import { useState } from 'react'

interface ReadingSidebarProps {
  week: string
  parentSlug: string
  parentTitle: string
  children: ChildReading[]
  currentSlug: string
}

export default function ReadingSidebar({
  week,
  parentSlug,
  parentTitle,
  children,
  currentSlug,
}: ReadingSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentIndex = children.findIndex(c => c.slug === currentSlug)

  return (
    <>
      {/* Mobile: 드롭다운 토글 버튼 */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 bg-bg-card border border-border rounded-lg"
        >
          <span className="font-medium text-text-primary">
            {currentIndex + 1}. {children[currentIndex]?.titleKr}
          </span>
          <svg
            className={`w-5 h-5 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Mobile: 드롭다운 메뉴 */}
        {isOpen && (
          <nav className="mt-2 bg-bg-card border border-border rounded-lg overflow-hidden">
            <Link
              to={`/readings/${week}/${parentSlug}`}
              className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-light border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              ← {parentTitle}
            </Link>
            {children.map((child, i) => (
              <SidebarItem
                key={child.slug}
                week={week}
                parentSlug={parentSlug}
                child={child}
                index={i + 1}
                isActive={child.slug === currentSlug}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </nav>
        )}
      </div>

      {/* Desktop: 고정 사이드바 */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <nav className="sticky top-4 bg-bg-card border border-border rounded-lg overflow-hidden max-h-[calc(100vh-2rem)] overflow-y-auto">
          {/* 상위 페이지 링크 */}
          <Link
            to={`/readings/${week}/${parentSlug}`}
            className="block px-4 py-3 text-sm font-medium text-text-secondary hover:bg-bg-light border-b border-border"
          >
            ← {parentTitle}
          </Link>

          {/* 자식 목록 */}
          <div className="py-1">
            {children.map((child, i) => (
              <SidebarItem
                key={child.slug}
                week={week}
                parentSlug={parentSlug}
                child={child}
                index={i + 1}
                isActive={child.slug === currentSlug}
              />
            ))}
          </div>
        </nav>
      </aside>
    </>
  )
}

function SidebarItem({
  week,
  parentSlug,
  child,
  index,
  isActive,
  onClick,
}: {
  week: string
  parentSlug: string
  child: ChildReading
  index: number
  isActive: boolean
  onClick?: () => void
}) {
  const isPublished = child.published

  if (isPublished) {
    return (
      <Link
        to={`/readings/${week}/${parentSlug}/${child.slug}`}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
          isActive
            ? 'bg-stanford-red sidebar-active'
            : 'text-text-primary hover:bg-bg-light'
        }`}
      >
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            isActive
              ? 'bg-white text-stanford-red'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {index}
        </span>
        <span className="truncate">{child.titleKr}</span>
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed">
      <span className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
        {index}
      </span>
      <span className="truncate">{child.titleKr}</span>
    </div>
  )
}

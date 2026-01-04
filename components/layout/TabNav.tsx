'use client'

interface TabNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'overview', label: 'Overview', labelKr: '개요' },
  { id: 'syllabus', label: 'Syllabus', labelKr: '강의계획' },
  { id: 'faq', label: 'FAQ', labelKr: 'FAQ' },
]

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className="bg-white border-b-2 border-border sticky top-0 z-10">
      <div className="max-w-[1024px] mx-auto px-8">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-8 py-4 text-base font-medium transition-colors border-b-[3px] -mb-[2px] ${
                activeTab === tab.id
                  ? 'text-stanford-red border-stanford-red'
                  : 'text-text-secondary border-transparent hover:text-text-primary'
              }`}
            >
              {tab.labelKr}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

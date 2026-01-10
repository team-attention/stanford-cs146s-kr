import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { readings, ChildReading } from '@/content/readings'
import ReadingSidebar from '@/components/reading/ReadingSidebar'

export default function ReadingPage() {
  const { week, slug, childSlug } = useParams<{ week: string; slug: string; childSlug?: string }>()
  const key = `${week}/${slug}`
  const reading = readings[key]

  if (!reading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-stanford-red mb-4">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-text-secondary mb-6">
          요청하신 Reading 자료가 존재하지 않거나 아직 번역되지 않았습니다.
        </p>
        <Link
          to="/#syllabus"
          className="inline-block px-6 py-3 bg-stanford-red text-white rounded hover:bg-stanford-red-dark transition-colors"
        >
          강의계획으로 돌아가기
        </Link>
      </div>
    )
  }

  // 자식 페이지 처리
  if (childSlug && reading.isParent && reading.children) {
    const child = reading.children.find(c => c.slug === childSlug)
    if (!child) {
      return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-stanford-red mb-4">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-text-secondary mb-6">
            요청하신 하위 페이지가 존재하지 않습니다.
          </p>
          <Link
            to={`/readings/${week}/${slug}`}
            className="inline-block px-6 py-3 bg-stanford-red text-white rounded hover:bg-stanford-red-dark transition-colors"
          >
            상위 페이지로 돌아가기
          </Link>
        </div>
      )
    }

    // 자식 페이지가 아직 번역되지 않은 경우
    if (!child.published) {
      return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-stanford-red mb-4">
            번역 준비 중입니다
          </h1>
          <p className="text-text-secondary mb-6">
            "{child.titleKr}" 페이지는 현재 번역 작업 중입니다.<br />
            곧 한국어 버전을 제공해 드리겠습니다.
          </p>
          <div className="mb-6">
            <a
              href={child.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stanford-red hover:underline"
            >
              원본 자료 보기 →
            </a>
          </div>
          <Link
            to={`/readings/${week}/${slug}`}
            className="inline-block px-6 py-3 bg-stanford-red text-white rounded hover:bg-stanford-red-dark transition-colors"
          >
            상위 페이지로 돌아가기
          </Link>
        </div>
      )
    }

    // TODO: 자식 페이지 콘텐츠 렌더링 (마크다운 파일 로드)
    return <ChildReadingPage week={week!} parentSlug={slug!} child={child} parentTitle={reading.titleKr} siblings={reading.children} />
  }

  // 부모 페이지가 아직 공개되지 않은 경우
  if (!reading.published && !reading.isParent) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-stanford-red mb-4">
          번역 준비 중입니다
        </h1>
        <p className="text-text-secondary mb-6">
          "{reading.titleKr}" 페이지는 현재 번역 작업 중입니다.<br />
          곧 한국어 버전을 제공해 드리겠습니다.
        </p>
        <div className="mb-6">
          <a
            href={reading.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stanford-red hover:underline"
          >
            원본 자료 보기 →
          </a>
        </div>
        <Link
          to="/#syllabus"
          className="inline-block px-6 py-3 bg-stanford-red text-white rounded hover:bg-stanford-red-dark transition-colors"
        >
          강의계획으로 돌아가기
        </Link>
      </div>
    )
  }

  // 부모 페이지 (children이 있는 경우)
  if (reading.isParent && reading.children) {
    return <ParentReadingPage week={week!} reading={reading} />
  }

  return (
    <>
      {/* Header */}
      <header className="bg-stanford-red text-white py-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-sm mb-4">
            <Link to="/" style={{ color: '#FFD0D0' }} className="hover:text-white hover:underline">
              CS146S Korean Edition
            </Link>
            <span style={{ color: '#FF9999' }}> / </span>
            <Link to="/#syllabus" style={{ color: '#FFD0D0' }} className="hover:text-white hover:underline">
              강의계획
            </Link>
            <span style={{ color: '#FF9999' }}> / </span>
            <span className="text-white font-medium">Week {reading.week} Reading</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {reading.title} ({reading.titleKr})
          </h1>
          <div className="flex gap-6 text-sm opacity-80">
            <span>Week {reading.week}</span>
            <span>{reading.author}</span>
            <span>{reading.readTime}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Source Box */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 mb-6">
          <strong>원본 자료: </strong>
          <a
            href={reading.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stanford-red hover:underline"
          >
            {reading.sourceTitle}
          </a>
        </div>

        {/* Cheatsheet Image */}
        {reading.cheatsheetImage && (
          <div className="mb-6">
            <img
              src={reading.cheatsheetImage}
              alt={`${reading.titleKr} 치트시트`}
              className="w-full rounded-lg border border-border shadow-sm"
            />
          </div>
        )}

        {/* Translation Note */}
        <div className="bg-bg-card border border-border rounded-lg p-4 mb-8 text-sm text-text-secondary">
          이 페이지는 원본 자료의 핵심 내용을 한국어로 요약 및 번역한 것입니다.
          전체 내용은 원본 자료를 참고해 주세요.
        </div>

        {/* Sections */}
        {reading.sections.map((section, i) => (
          <section key={i} className="mb-8">
            <h2 className="text-xl font-bold text-stanford-red mb-4 pb-2 border-b border-border">
              {section.title}
            </h2>
            <p className="text-text-primary leading-relaxed mb-4">
              {section.content}
            </p>
            {section.items && (
              <ul className="list-disc list-inside space-y-2 text-text-primary">
                {section.items.map((item, j) => (
                  <li key={j} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Key Takeaways */}
        {reading.keyTakeaways?.map((takeaway, i) => (
          <div
            key={i}
            className="bg-blue-50 border-l-4 border-kr-accent rounded-r-lg p-4 mb-6"
          >
            <h4 className="font-bold text-kr-accent mb-2">{takeaway.title}</h4>
            <p className="text-text-primary leading-relaxed">{takeaway.content}</p>
          </div>
        ))}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 mt-8 border-t border-border">
          <Link
            to="/#syllabus"
            className="px-4 py-2 bg-bg-light text-text-primary border border-border rounded hover:bg-border transition-colors"
          >
            ← 강의계획으로
          </Link>
          {reading.nextReading && (
            <Link
              to={`/readings/${week}/${reading.nextReading.slug}`}
              className="px-4 py-2 border-2 border-stanford-red text-stanford-red rounded hover:bg-stanford-red hover:text-white transition-colors font-medium"
            >
              다음: {reading.nextReading.title} →
            </Link>
          )}
        </div>
      </main>
    </>
  )
}

// 부모 페이지 컴포넌트 (자식 목록 표시)
function ParentReadingPage({ week, reading }: { week: string; reading: typeof readings[string] }) {
  return (
    <>
      {/* Header */}
      <header className="bg-stanford-red text-white py-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-sm mb-4">
            <Link to="/" style={{ color: '#FFD0D0' }} className="hover:text-white hover:underline">
              CS146S Korean Edition
            </Link>
            <span style={{ color: '#FF9999' }}> / </span>
            <Link to="/#syllabus" style={{ color: '#FFD0D0' }} className="hover:text-white hover:underline">
              강의계획
            </Link>
            <span style={{ color: '#FF9999' }}> / </span>
            <span className="text-white font-medium">Week {reading.week} Reading</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {reading.title} ({reading.titleKr})
          </h1>
          <div className="flex gap-6 text-sm opacity-80">
            <span>Week {reading.week}</span>
            <span>{reading.author}</span>
            <span>{reading.readTime}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Source Box */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 mb-6">
          <strong>원본 자료: </strong>
          <a
            href={reading.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stanford-red hover:underline"
          >
            {reading.sourceTitle}
          </a>
        </div>

        {/* Translation Note */}
        <div className="bg-bg-card border border-border rounded-lg p-4 mb-8 text-sm text-text-secondary">
          {reading.contentType === 'youtube' ? (
            <>이 강의는 {reading.totalChapters}개의 챕터로 구성되어 있습니다. 각 챕터를 클릭하여 상세 내용을 확인하세요.</>
          ) : (
            <>이 가이드는 {reading.children?.length || 0}개의 프롬프팅 기법을 다룹니다. 각 기법을 클릭하여 상세 내용을 확인하세요.</>
          )}
        </div>

        {/* Sections (개요) */}
        {reading.sections.map((section, i) => (
          <section key={i} className="mb-8">
            <h2 className="text-xl font-bold text-stanford-red mb-4 pb-2 border-b border-border">
              {section.title}
            </h2>
            <p className="text-text-primary leading-relaxed mb-4">
              {section.content}
            </p>
            {section.items && (
              <ul className="list-disc list-inside space-y-2 text-text-primary">
                {section.items.map((item, j) => (
                  <li key={j} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Children List */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-stanford-red mb-4 pb-2 border-b border-border">
            {reading.contentType === 'youtube' ? '챕터 목록' : '기법 목록'}
          </h2>
          <div className="grid gap-3">
            {reading.children?.map((child, i) => (
              <ChildLink key={i} week={week} parentSlug={reading.slug} child={child} index={i + 1} />
            ))}
          </div>
        </section>

        {/* Key Takeaways */}
        {reading.keyTakeaways?.map((takeaway, i) => (
          <div
            key={i}
            className="bg-blue-50 border-l-4 border-kr-accent rounded-r-lg p-4 mb-6"
          >
            <h4 className="font-bold text-kr-accent mb-2">{takeaway.title}</h4>
            <p className="text-text-primary leading-relaxed">{takeaway.content}</p>
          </div>
        ))}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 mt-8 border-t border-border">
          <Link
            to="/#syllabus"
            className="px-4 py-2 bg-bg-light text-text-primary border border-border rounded hover:bg-border transition-colors"
          >
            ← 강의계획으로
          </Link>
        </div>
      </main>
    </>
  )
}

// 자식 링크 컴포넌트
function ChildLink({ week, parentSlug, child, index }: { week: string; parentSlug: string; child: ChildReading; index: number }) {
  const isPublished = child.published

  if (isPublished) {
    return (
      <Link
        to={`/readings/${week}/${parentSlug}/${child.slug}`}
        className="flex items-center gap-4 p-4 bg-bg-card border border-border rounded-lg hover:border-stanford-red hover:shadow-md transition-all"
      >
        <span className="flex-shrink-0 w-8 h-8 bg-stanford-red text-white rounded-full flex items-center justify-center text-sm font-bold">
          {index}
        </span>
        <div className="flex-grow">
          <div className="font-medium text-text-primary">{child.title}</div>
          <div className="text-sm text-text-secondary">{child.titleKr}</div>
        </div>
        <span className="text-stanford-red">→</span>
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg opacity-60">
      <span className="flex-shrink-0 w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
        {index}
      </span>
      <div className="flex-grow">
        <div className="font-medium text-gray-500">{child.title}</div>
        <div className="text-sm text-gray-400">{child.titleKr}</div>
      </div>
      <a
        href={child.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-gray-400 hover:text-stanford-red"
      >
        원본 →
      </a>
    </div>
  )
}

// 자식 페이지 콘텐츠 컴포넌트 (사이드바 레이아웃)
function ChildReadingPage({
  week,
  parentSlug,
  child,
  parentTitle,
  siblings
}: {
  week: string
  parentSlug: string
  child: ChildReading
  parentTitle: string
  siblings: ChildReading[]
}) {
  const currentIndex = siblings.findIndex(s => s.slug === child.slug)
  const prevChild = currentIndex > 0 ? siblings[currentIndex - 1] : null
  const nextChild = currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null

  // 마크다운 파일 로딩 상태
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (child.hasMarkdown) {
      setLoading(true)
      fetch(`/readings/${week}/${parentSlug}/${child.slug}.md`)
        .then(res => res.ok ? res.text() : Promise.reject('Not found'))
        .then(text => {
          // frontmatter 제거 (--- ... --- 블록)
          const contentWithoutFrontmatter = text.replace(/^---[\s\S]*?---\n*/, '')
          setMarkdown(contentWithoutFrontmatter)
        })
        .catch(() => setMarkdown(null))
        .finally(() => setLoading(false))
    }
  }, [child.slug, child.hasMarkdown, week, parentSlug])

  return (
    <>
      {/* Header */}
      <header className="bg-stanford-red text-white py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-sm mb-3">
            <Link to="/" style={{ color: '#FFD0D0' }} className="hover:text-white hover:underline">
              CS146S Korean Edition
            </Link>
            <span style={{ color: '#FF9999' }}> / </span>
            <Link to={`/readings/${week}/${parentSlug}`} style={{ color: '#FFD0D0' }} className="hover:text-white hover:underline">
              {parentTitle}
            </Link>
            <span style={{ color: '#FF9999' }}> / </span>
            <span className="text-white font-medium">{child.titleKr}</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold">
            {child.title} ({child.titleKr})
          </h1>
        </div>
      </header>

      {/* Main Layout: Sidebar + Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex gap-8">
          {/* Sidebar */}
          <ReadingSidebar
            week={week}
            parentSlug={parentSlug}
            parentTitle={parentTitle}
            children={siblings}
            currentSlug={child.slug}
          />

          {/* Content Area */}
          <main className="flex-1 min-w-0">
            {/* Source Box */}
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 mb-6">
              <strong>원본 자료: </strong>
              <a
                href={child.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stanford-red hover:underline break-all"
              >
                {child.sourceUrl}
              </a>
            </div>

            {/* Cheatsheet Image */}
            {child.cheatsheetImage && (
              <div className="mb-6">
                <img
                  src={child.cheatsheetImage}
                  alt={`${child.titleKr} 치트시트`}
                  className="w-full rounded-lg border border-border shadow-sm"
                />
              </div>
            )}

            {/* 마크다운 콘텐츠 렌더링 */}
            {child.hasMarkdown ? (
              loading ? (
                <div className="bg-bg-card border border-border rounded-lg p-8 mb-8 text-center">
                  <p className="text-text-secondary">콘텐츠를 로딩 중입니다...</p>
                </div>
              ) : markdown ? (
                <article className="prose prose-lg max-w-none prose-headings:text-stanford-red prose-a:text-stanford-red prose-strong:text-text-primary">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-2xl font-bold text-stanford-red mt-6 mb-4">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-xl font-bold text-stanford-red mt-8 mb-4 pb-2 border-b-2 border-stanford-red/20">
                          {children}
                        </h2>
                      ),
                      hr: () => (
                        <hr className="my-6 border-t-2 border-stanford-red/10" />
                      ),
                      a: ({ href, children }) => {
                        const text = String(children)
                        // 영상 바로가기 링크를 배지 형태로 변환
                        if (text.includes('영상 바로가기') && href?.includes('youtube.com')) {
                          // 타임스탬프 추출 (예: "영상 바로가기 (7:47)" -> "7:47")
                          const match = text.match(/\(([0-9:]+)\)/)
                          const timestamp = match ? match[1] : ''
                          return (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-stanford-red text-white rounded-full text-sm font-medium hover:bg-stanford-red-dark transition-colors no-underline"
                            >
                              <span>🎬</span>
                              <span>{timestamp}</span>
                            </a>
                          )
                        }
                        return (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="text-stanford-red hover:underline">
                            {children}
                          </a>
                        )
                      },
                      strong: ({ children }) => (
                        <strong className="font-semibold text-stanford-red">{children}</strong>
                      ),
                      ul: ({ children }) => (
                        <ul className="space-y-2 my-4 list-none pl-0">{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className="flex gap-2 text-text-primary pl-0">
                          <span className="text-stanford-red flex-shrink-0">•</span>
                          <span>{children}</span>
                        </li>
                      ),
                    }}
                  >
                    {markdown}
                  </ReactMarkdown>
                </article>
              ) : (
                <div className="bg-bg-card border border-border rounded-lg p-8 mb-8 text-center">
                  <p className="text-text-secondary">콘텐츠를 불러올 수 없습니다.</p>
                </div>
              )
            ) : child.sections && child.sections.length > 0 ? (
              <>
                {/* Translation Note */}
                <div className="bg-bg-card border border-border rounded-lg p-4 mb-8 text-sm text-text-secondary">
                  이 페이지는 원본 자료의 핵심 내용을 한국어로 요약 및 번역한 것입니다.
                  전체 내용은 원본 자료를 참고해 주세요.
                </div>

                {/* Sections */}
                {child.sections.map((section, i) => (
                  <section key={i} className="mb-8">
                    <h2 className="text-xl font-bold text-stanford-red mb-4 pb-2 border-b border-border">
                      {section.title}
                    </h2>
                    <p className="text-text-primary leading-relaxed mb-4">
                      {section.content}
                    </p>
                    {section.items && (
                      <ul className="list-disc list-inside space-y-2 text-text-primary">
                        {section.items.map((item, j) => (
                          <li key={j} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}

                {/* Key Takeaways */}
                {child.keyTakeaways?.map((takeaway, i) => (
                  <div
                    key={i}
                    className="bg-blue-50 border-l-4 border-kr-accent rounded-r-lg p-4 mb-6"
                  >
                    <h4 className="font-bold text-kr-accent mb-2">{takeaway.title}</h4>
                    <p className="text-text-primary leading-relaxed">{takeaway.content}</p>
                  </div>
                ))}
              </>
            ) : (
              <div className="bg-bg-card border border-border rounded-lg p-8 mb-8 text-center">
                <p className="text-text-secondary">
                  이 페이지의 콘텐츠가 곧 추가됩니다.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 mt-8 border-t border-border">
              {prevChild?.published ? (
                <Link
                  to={`/readings/${week}/${parentSlug}/${prevChild.slug}`}
                  className="px-4 py-2 bg-bg-light text-text-primary border border-border rounded hover:bg-border transition-colors text-sm"
                >
                  ← {prevChild.titleKr}
                </Link>
              ) : (
                <Link
                  to={`/readings/${week}/${parentSlug}`}
                  className="px-4 py-2 bg-bg-light text-text-primary border border-border rounded hover:bg-border transition-colors text-sm"
                >
                  ← 목록으로
                </Link>
              )}
              {nextChild?.published && (
                <Link
                  to={`/readings/${week}/${parentSlug}/${nextChild.slug}`}
                  className="px-4 py-2 border-2 border-stanford-red text-stanford-red rounded hover:bg-stanford-red hover:text-white transition-colors font-medium text-sm"
                >
                  다음: {nextChild.titleKr} →
                </Link>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

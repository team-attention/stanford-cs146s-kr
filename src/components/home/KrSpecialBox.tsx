export default function KrSpecialBox() {
  return (
    <section className="mb-12">
      <h2 className="text-[32px] font-semibold text-text-primary mb-4 pb-2 border-b-2 border-stanford-red">
        🇰🇷 Korean Edition
      </h2>
      <p className="text-[19.2px] leading-[28.8px] text-text-body mb-6">
        이 페이지는 Stanford CS146S 강좌의 공식 한국어 버전입니다.
        원 저자 <a href="https://www.linkedin.com/in/mihaileric" target="_blank" rel="noopener noreferrer" className="text-stanford-red hover:underline">Mihail Eric</a>의 허가를 받아
        <a href="https://www.linkedin.com/in/gb-jeong/" target="_blank" rel="noopener noreferrer" className="text-stanford-red hover:underline"> 정구봉</a>이 번역하고 있습니다.
      </p>
      <ul className="space-y-3 text-[19.2px] leading-[28.8px] text-text-body mb-6">
        <li className="flex items-start gap-3">
          <span className="text-stanford-red font-bold">✓</span>
          <span>모든 Reading 자료 한국어 번역 제공</span>
        </li>
        <li className="flex items-start gap-3">
          <a href="https://github.com/team-attention/stanford-cs146s-kr" target="_blank" rel="noopener noreferrer" className="ml-6 text-stanford-red hover:underline inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-stanford-red font-bold">✓</span>
          <span>주요 Slides 한국어 버전 제공</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-stanford-red font-bold">✓</span>
          <span>YouTube 한국어 강의 시리즈 (예정)</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-stanford-red font-bold">✓</span>
          <span>Discord 한국어 커뮤니티 (예정)</span>
        </li>
      </ul>
      <p className="text-[16px] text-text-secondary">
        📌 원본 강좌: <a href="https://themodernsoftware.dev/" target="_blank" rel="noopener noreferrer" className="text-stanford-red hover:underline">themodernsoftware.dev</a>
      </p>
    </section>
  )
}

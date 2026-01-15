export default function KrSpecialBox() {
  return (
    <section className="mb-12">
      <h2 className="text-[32px] font-semibold text-text-primary mb-4 pb-2 border-b-2 border-stanford-red">
        🇰🇷 Korean Edition
      </h2>
      <p className="text-[19.2px] leading-[28.8px] text-text-body mb-6">
        이 페이지는 Stanford CS146S 강좌의 공식 한국어 버전입니다.
        원 저자 <a href="https://www.linkedin.com/in/mihaileric" target="_blank" rel="noopener noreferrer" className="text-stanford-red hover:underline">Mihail Eric</a>의 허가를 받아
        <a href="https://github.com/team-attention/" target="_blank" rel="noopener noreferrer" className="text-stanford-red hover:underline"> Team Attention</a>이 번역하고 있습니다.
      </p>
      <ul className="space-y-3 text-[19.2px] leading-[28.8px] text-text-body mb-6">
        <li className="flex items-start gap-3">
          <span className="text-stanford-red font-bold">✓</span>
          <span>Reading 자료 한국어 번역 제공</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-stanford-red font-bold">✓</span>
          <span>YouTube 한국어 강의 시리즈 (예정)</span>
        </li>
      </ul>
      <p className="text-[16px] text-text-secondary">
        📌 원본 강좌: <a href="https://themodernsoftware.dev/" target="_blank" rel="noopener noreferrer" className="text-stanford-red hover:underline">themodernsoftware.dev</a>
      </p>
    </section>
  )
}

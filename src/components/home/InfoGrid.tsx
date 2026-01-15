const infoItems = [
  {
    label: 'Units',
    labelKr: '학점',
    value: '3 units',
  },
  {
    label: 'Prerequisites',
    labelKr: '선수과목',
    value: 'CS111 수준의 프로그래밍 경험. CS221/229 권장.',
  },
  {
    label: 'Format',
    labelKr: '형식',
    value: '주간 강의, hands-on 코딩 세션, 업계 게스트 스피커. 현대 개발 실습을 보여주는 파이널 프로젝트.',
  },
  {
    label: 'Goals',
    labelKr: '목표',
    value: '현대 개발 도구 마스터, AI 기반 코딩 이해, 자동화 테스트 및 배포 학습, 새로운 소프트웨어 트렌드 파악.',
  },
]

export default function InfoGrid() {
  return (
    <section className="mb-12">
      {infoItems.map((item) => (
        <div key={item.label} className="mb-2">
          <h3 className="text-[20.8px] font-semibold text-stanford-red mt-8 mb-2">
            {item.label}
          </h3>
          <p className="text-[19.2px] leading-[28.8px] text-text-body">
            {item.value}
          </p>
        </div>
      ))}
    </section>
  )
}

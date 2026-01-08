// 자식 페이지 정의 (부모-자식 구조용)
export interface ChildReading {
  slug: string           // 'zeroshot'
  title: string          // 'Zero-shot Prompting'
  titleKr: string        // 'Zero-shot 프롬프팅'
  sourceUrl: string      // 원본 페이지 URL
  published?: boolean    // 번역 완료 여부
  cheatsheetImage?: string  // 치트시트 이미지 경로 (예: '/cheatsheets/prompt-engineering-guide/zeroshot.png')
  // 콘텐츠 필드 (번역 완료 시 추가)
  author?: string
  readTime?: string
  sections?: {
    title: string
    content: string
    items?: string[]
  }[]
  keyTakeaways?: {
    title: string
    content: string
  }[]
}

export interface ReadingContent {
  slug: string
  week: number
  title: string
  titleKr: string
  author: string
  readTime: string
  sourceUrl: string
  sourceTitle: string
  published?: boolean // 한국어 번역 페이지 공개 여부 (기본값: false)
  sections: {
    title: string
    content: string
    items?: string[]
  }[]
  keyTakeaways?: {
    title: string
    content: string
  }[]
  relatedReadings?: {
    title: string
    slug?: string
    url?: string
  }[]
  nextReading?: {
    title: string
    slug: string
  }
  // 부모-자식 구조 지원
  isParent?: boolean        // 부모 페이지 여부 (하위 페이지가 있는 경우)
  children?: ChildReading[] // 하위 페이지 목록
  parentSlug?: string       // 부모 페이지 slug (자식 페이지인 경우)
}

export const readings: Record<string, ReadingContent> = {
  'week1/deep-dive-llms': {
    slug: 'deep-dive-llms',
    week: 1,
    title: 'Deep Dive into LLMs like ChatGPT',
    titleKr: 'ChatGPT 같은 LLM 심층 분석',
    author: 'Andrej Karpathy',
    readTime: '약 3시간 31분',
    sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI',
    sourceTitle: 'YouTube - Deep Dive into LLMs like ChatGPT (2025.02.05)',
    published: true,
    sections: [
      {
        title: '개요',
        content:
          'OpenAI 공동창업자이자 전 Tesla AI Director인 Andrej Karpathy가 LLM의 전체 훈련 파이프라인을 일반 청중도 이해할 수 있도록 설명하는 종합 강의입니다. Pre-training부터 RLHF까지, 그리고 모델의 "심리학"적 특성까지 다룹니다.',
      },
      {
        title: '1. Pre-training: 인터넷을 다운로드하다',
        content:
          'LLM 훈련의 첫 단계는 인터넷 데이터를 수집하고 처리하는 것입니다. HuggingFace의 FineWeb 데이터셋은 약 44TB, 15조 토큰으로 구성됩니다.',
        items: [
          'Common Crawl: 2007년부터 27억 웹페이지 인덱싱',
          'URL 필터링: 악성/스팸/성인 사이트 제거',
          '텍스트 추출: HTML에서 본문만 추출',
          '언어 필터링: 영어 65% 이상 등 조건 적용',
          'PII 제거: 개인정보 필터링',
        ],
      },
      {
        title: '2. Tokenization: 텍스트를 숫자로',
        content:
          '신경망은 유한한 심볼 집합의 1차원 시퀀스를 입력으로 받습니다. Byte Pair Encoding(BPE) 알고리즘으로 텍스트를 토큰으로 변환합니다.',
        items: [
          'GPT-4 어휘 크기: 100,277개 토큰',
          '"hello world" → 2개 토큰: [15339, 1917]',
          '대소문자 구분: "Hello world" → 3개 토큰',
          'Tiktokenizer (tiktokenizer.vercel.app): GPT-4 토큰화 시각화',
        ],
      },
      {
        title: '3. Transformer 신경망',
        content:
          'Transformer는 입력 토큰 시퀀스를 받아 다음 토큰의 확률 분포를 출력합니다. 파라미터는 DJ 믹서의 노브와 같습니다.',
        items: [
          '입력: 0 ~ 최대 컨텍스트 길이 (예: 8,000) 토큰',
          '출력: 100,277개 토큰에 대한 확률값',
          '파라미터: GPT-2는 16억, 최신 모델은 수천억 개',
          '훈련: 예측 확률이 실제 다음 토큰과 일치하도록 조정',
          '3D 시각화: bbycroft.net/llm',
        ],
      },
      {
        title: '4. GPT-2 재현: $672로 가능',
        content:
          'Karpathy는 llm.c 프로젝트로 GPT-2를 단 $672에 재현했습니다. 2019년 원본 훈련 비용은 약 $40,000였습니다.',
        items: [
          'GPT-2 스펙: 16억 파라미터, 1,000억 토큰, 컨텍스트 1,024',
          '2019년 훈련 비용: ~$40,000',
          'llm.c 재현 비용: $672',
          '최적화 시: ~$100까지 가능',
        ],
      },
      {
        title: '5. Base Model vs Chat Model',
        content:
          'Base Model은 "문서 자동완성기"이고, Chat Model은 대화 데이터로 추가 훈련된 "AI 어시스턴트"입니다.',
        items: [
          'Base Model: 다음 토큰 예측만 학습, 프롬프트 = 문서 시작',
          'Chat Model: 대화 형식으로 추가 훈련, 일관된 도움 응답',
          'SFT (Supervised Fine-tuning): 고품질 대화 데이터로 응답 형식 학습',
          'RLHF: 인간 피드백으로 응답 품질 개선',
        ],
      },
      {
        title: '6. Hallucination (환각)',
        content:
          'LLM은 "꿈꾸는 기계"입니다. 그럴듯하게 들리지만 사실이 아닌 내용을 생성할 수 있습니다.',
        items: [
          '원인: 훈련 데이터의 패턴을 재조합하여 생성',
          '해결책 1: 웹 검색 도구 연결 (RAG)',
          '해결책 2: "확실하지 않음" 명시적 표시',
          '해결책 3: 인용 및 출처 제공 요청',
        ],
      },
      {
        title: '7. Models Need Tokens to Think',
        content:
          'LLM은 "생각할 토큰"이 필요합니다. 중간 토큰들이 "작업 메모리" 역할을 합니다.',
        items: [
          '나쁜 프롬프트: "13 * 17 = ?" → 한 토큰으로 답해야 함',
          '좋은 프롬프트: "단계별로 계산해줘" → 중간 과정 토큰 생성',
          'Chain-of-Thought: 추론 과정을 명시적으로 요청',
          '더 많은 토큰 = 더 많은 "생각 시간"',
        ],
      },
      {
        title: '8. Jagged Intelligence (들쭉날쭉한 지능)',
        content:
          'LLM은 어떤 영역에서는 인간을 압도하고, 다른 영역에서는 유아 수준입니다.',
        items: [
          '강점: 암기, 패턴 매칭, 넓은 지식',
          '약점: 철자 세기, 공간 추론, 새로운 논리',
          '"strawberry에 r이 몇 개?" → 자주 틀림',
          '원인: 토큰화로 인해 철자를 직접 "보지" 못함',
        ],
      },
      {
        title: '9. Reinforcement Learning & DeepSeek-R1',
        content:
          'SFT의 한계를 넘어서 RL로 자기 개선이 가능합니다. DeepSeek-R1은 RL로 추론 능력을 획득했습니다.',
        items: [
          'SFT 한계: 전문가 시연만 학습 (탐색 없음)',
          'RL 장점: 시행착오를 통한 자기 개선',
          'DeepSeek-R1: "aha moment" 발견, Chain-of-Thought 자발적 생성',
          'AlphaGo Move 37: RL의 힘을 보여준 역사적 사례',
        ],
      },
      {
        title: '10. 미래 전망',
        content:
          'LLM은 멀티모달, 에이전트, System 1 & 2 통합으로 발전할 것입니다.',
        items: [
          '멀티모달: 텍스트, 이미지, 오디오 네이티브 처리',
          '에이전트: 장시간 작업 수행, 컴퓨터 사용',
          'System 1 & 2 통합: 직관적 응답 + 심층 추론',
          'LM Arena (lmarena.ai): 모델 랭킹 확인',
        ],
      },
    ],
    keyTakeaways: [
      {
        title: '핵심 인사이트',
        content:
          'LLM은 본질적으로 "다음 토큰 예측기"입니다. 하지만 이 단순한 목표를 달성하기 위해 언어의 문법, 의미, 세계 지식까지 학습합니다. 파라미터는 DJ 믹서의 노브와 같고, 훈련은 데이터의 통계와 일치하는 노브 설정을 찾는 것입니다.',
      },
      {
        title: '개발자를 위한 팁',
        content:
          'LLM을 "마법의 블랙박스"가 아닌 "확률적 텍스트 생성 시스템"으로 이해하세요. 생각할 토큰을 제공하고, 들쭉날쭉한 지능을 인식하고, 환각에 대비하세요.',
      },
      {
        title: '주요 리소스',
        content:
          'FineWeb (huggingface.co), Tiktokenizer (tiktokenizer.vercel.app), Transformer 3D Visualizer (bbycroft.net/llm), llm.c (github.com/karpathy/llm.c), LM Arena (lmarena.ai)',
      },
    ],
    relatedReadings: [
      { title: 'Prompt Engineering Overview', slug: 'prompt-engineering-overview' },
      { title: 'Prompt Engineering Guide', slug: 'prompt-engineering-guide' },
    ],
    nextReading: {
      title: 'Prompt Engineering Overview',
      slug: 'prompt-engineering-overview',
    },
  },
  'week1/prompt-engineering-overview': {
    slug: 'prompt-engineering-overview',
    week: 1,
    title: 'Prompt Engineering Overview',
    titleKr: '프롬프트 엔지니어링 개요',
    author: 'Google Cloud',
    readTime: '약 30분',
    sourceUrl: 'https://cloud.google.com/discover/what-is-prompt-engineering',
    sourceTitle: 'Google Cloud - What is Prompt Engineering',
    published: true,
    sections: [
      {
        title: '프롬프트 엔지니어링이란?',
        content:
          '프롬프트 엔지니어링은 AI 모델, 특히 대형 언어 모델(LLM)이 원하는 응답을 생성하도록 프롬프트를 설계하고 최적화하는 기술이자 예술입니다. 프롬프트를 신중하게 작성함으로써 모델에게 맥락, 지시사항, 예시를 제공하여 의도를 이해하고 의미 있는 방식으로 응답하도록 돕습니다. AI를 위한 로드맵을 제공하여 원하는 특정 출력으로 유도하는 것이라고 생각하면 됩니다.',
      },
      {
        title: '효과적인 프롬프트의 핵심 요소',
        content: '효과적인 프롬프트 엔지니어링에 기여하는 핵심 요소들:',
        items: [
          '프롬프트 포맷: 자연어 질문, 직접 명령, 특정 필드가 있는 구조화된 입력 등 모델에 맞는 형식 선택',
          '맥락과 예시: 프롬프트 내에 관련 맥락과 예시를 제공하여 더 정확하고 관련성 높은 출력 유도',
          '파인튜닝과 적응: 맞춤형 프롬프트를 사용해 특정 태스크나 도메인에서 AI 모델의 성능 향상',
          '다중 턴 대화: 연속적이고 맥락을 인식하는 상호작용을 위한 프롬프트 설계',
        ],
      },
      {
        title: '프롬프트 유형',
        content: 'AI에서 사용되는 다양한 프롬프트 유형:',
        items: [
          'Direct prompts (Zero-shot): 추가 맥락이나 예시 없이 직접 지시나 질문 제공. 아이디어 생성, 요약, 번역에 활용',
          'One-, few-, multi-shot prompts: 실제 프롬프트 전에 원하는 입력-출력 쌍의 예시 제공. 태스크 이해와 정확한 응답 생성에 도움',
          'Chain of Thought (CoT): 모델이 복잡한 추론을 일련의 중간 단계로 분해하도록 유도하여 포괄적이고 구조화된 출력 생성',
          'Zero-shot CoT: Chain of Thought와 Zero-shot을 결합하여 추론 단계를 수행하게 함으로써 더 나은 출력 생성',
        ],
      },
      {
        title: '주요 활용 사례',
        content: '프롬프트 엔지니어링이 커스터마이즈된 관련 출력을 생성하는 데 도움이 되는 사례들:',
        items: [
          '언어 및 텍스트 생성: 창작 글쓰기, 요약, 번역, 대화 시뮬레이션',
          '질문 답변: 개방형 질문, 구체적 질문, 객관식, 가설적 질문, 의견 기반 질문',
          '코드 생성: 코드 완성, 코드 번역, 코드 최적화, 코드 디버깅',
          '이미지 생성: 사실적 이미지, 예술적 이미지, 추상 이미지, 이미지 편집',
        ],
      },
      {
        title: '더 나은 프롬프트 작성 전략',
        content: '프롬프트 엔지니어링 능력을 향상시키기 위한 전략들:',
        items: [
          '명확한 목표 설정: 행동 동사 사용, 출력의 길이와 형식 정의, 대상 독자 지정',
          '맥락과 배경 정보 제공: 관련 사실과 데이터 포함, 특정 출처 참조, 핵심 용어와 개념 정의',
          'Few-shot 프롬프팅 활용: 원하는 입력-출력 쌍의 예시 제공, 원하는 스타일이나 톤 시연, 원하는 세부 수준 보여주기',
          '구체적으로 작성: 정확한 언어 사용, 가능한 경우 요청을 정량화, 복잡한 태스크를 작은 단계로 분해',
          '반복과 실험: 다양한 표현과 키워드 시도, 세부 수준 조정, 다양한 프롬프트 길이 테스트',
          'Chain of Thought 프롬프팅 활용: 단계별 추론 유도, 모델에게 추론 과정 설명 요청, 논리적 사고 순서로 안내',
        ],
      },
    ],
    keyTakeaways: [
      {
        title: '프롬프트 엔지니어링의 이점',
        content:
          '효과적인 프롬프트 엔지니어링은 모델 성능 향상, 편향 및 유해 응답 감소, 제어력과 예측 가능성 증가, 사용자 경험 향상 등 다양한 이점을 제공합니다. 잘 작성된 프롬프트는 명확한 지시와 맥락을 제공하여 AI 모델로부터 더 정확하고 관련성 높은 출력을 이끌어냅니다.',
      },
    ],
    relatedReadings: [
      { title: 'Deep Dive into LLMs', slug: 'deep-dive-llms' },
      { title: 'Prompt Engineering Guide', slug: 'prompt-engineering-guide' },
    ],
    nextReading: {
      title: 'Prompt Engineering Guide',
      slug: 'prompt-engineering-guide',
    },
  },
  'week1/prompt-engineering-guide': {
    slug: 'prompt-engineering-guide',
    week: 1,
    title: 'Prompt Engineering Guide',
    titleKr: '프롬프트 엔지니어링 가이드',
    author: 'DAIR.AI',
    readTime: '약 2시간',
    sourceUrl: 'https://www.promptingguide.ai/techniques',
    sourceTitle: 'Prompting Guide - Techniques by DAIR.AI',
    published: false,
    isParent: true,
    children: [
      { slug: 'zeroshot', title: 'Zero-shot Prompting', titleKr: 'Zero-shot 프롬프팅', sourceUrl: 'https://www.promptingguide.ai/techniques/zeroshot', published: true },
      { slug: 'fewshot', title: 'Few-shot Prompting', titleKr: 'Few-shot 프롬프팅', sourceUrl: 'https://www.promptingguide.ai/techniques/fewshot', published: true },
      { slug: 'cot', title: 'Chain-of-Thought Prompting', titleKr: 'Chain-of-Thought 프롬프팅', sourceUrl: 'https://www.promptingguide.ai/techniques/cot', published: true },
      { slug: 'meta-prompting', title: 'Meta Prompting', titleKr: '메타 프롬프팅', sourceUrl: 'https://www.promptingguide.ai/techniques/meta-prompting', published: true },
      { slug: 'consistency', title: 'Self-Consistency', titleKr: 'Self-Consistency', sourceUrl: 'https://www.promptingguide.ai/techniques/consistency', published: true },
      { slug: 'knowledge', title: 'Generate Knowledge Prompting', titleKr: '지식 생성 프롬프팅', sourceUrl: 'https://www.promptingguide.ai/techniques/knowledge', published: true },
      { slug: 'prompt_chaining', title: 'Prompt Chaining', titleKr: '프롬프트 체이닝', sourceUrl: 'https://www.promptingguide.ai/techniques/prompt_chaining', published: true },
      { slug: 'tot', title: 'Tree of Thoughts', titleKr: 'Tree of Thoughts', sourceUrl: 'https://www.promptingguide.ai/techniques/tot', published: true },
      { slug: 'rag', title: 'Retrieval Augmented Generation', titleKr: 'RAG (검색 증강 생성)', sourceUrl: 'https://www.promptingguide.ai/techniques/rag', published: true },
      { slug: 'art', title: 'Automatic Reasoning and Tool-use', titleKr: 'ART (자동 추론 및 도구 사용)', sourceUrl: 'https://www.promptingguide.ai/techniques/art', published: true },
      { slug: 'ape', title: 'Automatic Prompt Engineer', titleKr: 'APE (자동 프롬프트 엔지니어)', sourceUrl: 'https://www.promptingguide.ai/techniques/ape', published: true },
      { slug: 'activeprompt', title: 'Active-Prompt', titleKr: 'Active-Prompt', sourceUrl: 'https://www.promptingguide.ai/techniques/activeprompt', published: true },
      { slug: 'dsp', title: 'Directional Stimulus Prompting', titleKr: '방향성 자극 프롬프팅', sourceUrl: 'https://www.promptingguide.ai/techniques/dsp', published: true },
      { slug: 'pal', title: 'Program-Aided Language Models', titleKr: 'PAL (프로그램 보조 언어 모델)', sourceUrl: 'https://www.promptingguide.ai/techniques/pal', published: true },
      { slug: 'react', title: 'ReAct', titleKr: 'ReAct', sourceUrl: 'https://www.promptingguide.ai/techniques/react', published: true },
      { slug: 'reflexion', title: 'Reflexion', titleKr: 'Reflexion', sourceUrl: 'https://www.promptingguide.ai/techniques/reflexion', published: true },
      { slug: 'multimodalcot', title: 'Multimodal CoT', titleKr: '멀티모달 CoT', sourceUrl: 'https://www.promptingguide.ai/techniques/multimodalcot', published: true },
      { slug: 'graph', title: 'Graph Prompting', titleKr: '그래프 프롬프팅', sourceUrl: 'https://www.promptingguide.ai/techniques/graph', published: true },
    ],
    sections: [
      {
        title: '프롬프팅 기법 개요',
        content: '이 가이드는 LLM에서 더 나은 결과를 얻기 위한 다양한 프롬프팅 기법을 다룹니다. 기초적인 zero-shot, few-shot부터 고급 추론 기법인 Chain-of-Thought, Tree of Thoughts까지 18가지 핵심 기법을 상세히 설명합니다.',
      },
      {
        title: '기초 기법',
        content: '프롬프팅의 기본이 되는 핵심 기법들:',
        items: [
          'Zero-shot Prompting: 예시 없이 직접 지시',
          'Few-shot Prompting: 몇 가지 예시를 제공하여 패턴 학습 유도',
          'Chain-of-Thought: 단계별 추론 유도로 복잡한 문제 해결',
        ],
      },
      {
        title: '고급 추론 기법',
        content: '더 복잡한 태스크를 위한 고급 기법들:',
        items: [
          'Self-Consistency: 여러 추론 경로 생성 후 다수결',
          'Tree of Thoughts: 트리 구조로 사고 과정 탐색',
          'ReAct: 추론과 행동을 결합한 에이전트 패턴',
          'Reflexion: 자기 피드백을 통한 반복적 개선',
        ],
      },
      {
        title: '도구 및 외부 지식 활용',
        content: '외부 시스템과 결합하여 LLM의 한계를 극복:',
        items: [
          'RAG (Retrieval Augmented Generation): 검색을 통한 지식 증강',
          'ART: 자동으로 도구를 선택하고 사용',
          'PAL: 프로그래밍 언어로 추론 과정 표현',
        ],
      },
    ],
    keyTakeaways: [
      {
        title: '핵심 인사이트',
        content:
          '프롬프트 엔지니어링은 과학과 예술의 결합입니다. 상황에 맞는 기법을 선택하고, 체계적인 방법론을 따르면서도 창의적인 실험을 통해 최적의 결과를 찾아가세요.',
      },
    ],
    relatedReadings: [
      { title: 'Deep Dive into LLMs', slug: 'deep-dive-llms' },
      { title: 'Prompt Engineering Overview', slug: 'prompt-engineering-overview' },
    ],
  },
  // Week 2 Readings
  'week2/mcp-documentation': {
    slug: 'mcp-documentation',
    week: 2,
    title: 'Model Context Protocol Documentation',
    titleKr: 'MCP 문서',
    author: 'Anthropic',
    readTime: '약 45분',
    sourceUrl: 'https://modelcontextprotocol.io/',
    sourceTitle: 'Model Context Protocol - Official Documentation',
    published: false,
    sections: [
      {
        title: 'MCP란?',
        content:
          'Model Context Protocol(MCP)은 AI 모델이 외부 도구와 데이터 소스에 안전하게 접근할 수 있도록 하는 개방형 프로토콜입니다. AI 어시스턴트가 파일 시스템, API, 데이터베이스 등과 상호작용할 수 있게 해줍니다.',
      },
      {
        title: '핵심 개념',
        content: 'MCP의 주요 구성 요소:',
        items: [
          'Host: MCP 클라이언트를 실행하는 애플리케이션 (예: Claude Desktop)',
          'Client: 서버와 통신하는 프로토콜 클라이언트',
          'Server: 도구, 리소스, 프롬프트를 제공하는 서비스',
          'Transport: 클라이언트-서버 간 통신 계층 (stdio, HTTP 등)',
        ],
      },
      {
        title: 'MCP의 기능',
        content: 'MCP 서버가 제공할 수 있는 기능들:',
        items: [
          'Tools: 모델이 호출할 수 있는 함수 (파일 읽기, API 호출 등)',
          'Resources: 모델이 접근할 수 있는 데이터 (파일, DB 레코드 등)',
          'Prompts: 재사용 가능한 프롬프트 템플릿',
          'Sampling: 서버가 모델에게 완성을 요청',
        ],
      },
      {
        title: '보안 모델',
        content: 'MCP의 보안 원칙:',
        items: [
          '사용자 동의: 모든 도구 사용은 사용자 승인 필요',
          '최소 권한: 필요한 최소한의 접근 권한만 부여',
          '샌드박싱: 서버는 격리된 환경에서 실행',
          '감사 로깅: 모든 작업 기록 유지',
        ],
      },
    ],
    keyTakeaways: [
      {
        title: '핵심 인사이트',
        content:
          'MCP는 AI를 "단순한 챗봇"에서 "실제로 작업을 수행하는 에이전트"로 발전시키는 핵심 기술입니다. 표준화된 프로토콜을 통해 다양한 도구와 쉽게 연동할 수 있습니다.',
      },
    ],
    relatedReadings: [
      { title: 'Building MCP Servers', slug: 'building-mcp-servers' },
      { title: 'Tool Use with Claude', slug: 'tool-use-claude' },
    ],
    nextReading: {
      title: 'Building MCP Servers',
      slug: 'building-mcp-servers',
    },
  },
  'week2/building-mcp-servers': {
    slug: 'building-mcp-servers',
    week: 2,
    title: 'Building MCP Servers',
    titleKr: 'MCP 서버 구축하기',
    author: 'Anthropic',
    readTime: '약 1시간',
    sourceUrl: 'https://modelcontextprotocol.io/quickstart',
    sourceTitle: 'MCP Quickstart Guide',
    published: false,
    sections: [
      {
        title: '시작하기',
        content:
          'MCP 서버를 구축하면 Claude가 커스텀 도구와 데이터에 접근할 수 있습니다. Python 또는 TypeScript로 서버를 만들 수 있습니다.',
      },
      {
        title: 'Python으로 MCP 서버 만들기',
        content: 'Python SDK를 사용한 기본 서버 구조:',
        items: [
          'mcp 패키지 설치: pip install mcp',
          '@server.tool() 데코레이터로 도구 정의',
          '@server.resource() 데코레이터로 리소스 정의',
          'stdio 또는 HTTP 트랜스포트로 실행',
        ],
      },
      {
        title: 'TypeScript로 MCP 서버 만들기',
        content: 'TypeScript SDK를 사용한 구현:',
        items: [
          '@modelcontextprotocol/sdk 패키지 설치',
          'Server 클래스 인스턴스 생성',
          'setRequestHandler로 도구/리소스 핸들러 등록',
          'StdioServerTransport로 연결',
        ],
      },
      {
        title: '서버 연결하기',
        content: 'Claude Desktop에 MCP 서버 연결:',
        items: [
          'claude_desktop_config.json 파일 수정',
          'mcpServers 섹션에 서버 설정 추가',
          'command와 args로 서버 실행 방법 지정',
          'Claude Desktop 재시작으로 적용',
        ],
      },
      {
        title: '디버깅 팁',
        content: 'MCP 서버 개발 시 유용한 팁:',
        items: [
          'MCP Inspector 도구 활용',
          'stderr로 디버그 로그 출력',
          'JSON-RPC 메시지 로깅',
          '단위 테스트로 핸들러 검증',
        ],
      },
    ],
    keyTakeaways: [
      {
        title: '핵심 인사이트',
        content:
          'MCP 서버 개발은 어렵지 않습니다. 기본 구조를 이해하면 몇 시간 안에 커스텀 도구를 만들어 Claude와 연동할 수 있습니다.',
      },
    ],
    relatedReadings: [
      { title: 'MCP Documentation', slug: 'mcp-documentation' },
      { title: 'Tool Use with Claude', slug: 'tool-use-claude' },
    ],
    nextReading: {
      title: 'Tool Use with Claude',
      slug: 'tool-use-claude',
    },
  },
  'week2/tool-use-claude': {
    slug: 'tool-use-claude',
    week: 2,
    title: 'Tool Use with Claude',
    titleKr: 'Claude와 도구 사용',
    author: 'Anthropic',
    readTime: '약 40분',
    sourceUrl: 'https://docs.anthropic.com/claude/docs/tool-use',
    sourceTitle: 'Anthropic Docs - Tool Use',
    published: false,
    sections: [
      {
        title: 'Tool Use 개요',
        content:
          'Claude의 Tool Use 기능을 사용하면 모델이 외부 API를 호출하고, 계산을 수행하고, 데이터를 검색할 수 있습니다. API에서 도구를 정의하면 Claude가 적절할 때 호출합니다.',
      },
      {
        title: '도구 정의하기',
        content: 'API에서 도구를 정의하는 방법:',
        items: [
          'name: 도구의 고유 식별자',
          'description: 도구가 하는 일 설명 (Claude가 참고)',
          'input_schema: JSON Schema로 입력 파라미터 정의',
          'tools 배열에 추가하여 API 호출에 포함',
        ],
      },
      {
        title: '도구 호출 흐름',
        content: 'Claude가 도구를 사용하는 과정:',
        items: [
          '1. 사용자 질문과 도구 목록을 Claude에게 전송',
          '2. Claude가 tool_use 블록으로 도구 호출 요청',
          '3. 애플리케이션이 실제 도구 실행',
          '4. tool_result로 결과를 Claude에게 반환',
          '5. Claude가 결과를 바탕으로 최종 응답 생성',
        ],
      },
      {
        title: '베스트 프랙티스',
        content: '효과적인 도구 사용을 위한 팁:',
        items: [
          '명확한 도구 설명: Claude가 언제 사용할지 판단하는 데 중요',
          '구체적인 파라미터 정의: 타입, 필수 여부, 설명 포함',
          '에러 처리: 도구 실패 시 적절한 에러 메시지 반환',
          '도구 개수 제한: 너무 많은 도구는 성능 저하 유발',
        ],
      },
    ],
    keyTakeaways: [
      {
        title: '핵심 인사이트',
        content:
          'Tool Use는 Claude를 단순한 텍스트 생성기에서 실제 작업을 수행하는 에이전트로 변환합니다. 잘 설계된 도구는 Claude의 능력을 무한히 확장할 수 있습니다.',
      },
    ],
    relatedReadings: [
      { title: 'MCP Documentation', slug: 'mcp-documentation' },
      { title: 'Building MCP Servers', slug: 'building-mcp-servers' },
    ],
  },
  'week1/how-openai-uses-codex': {
    slug: 'how-openai-uses-codex',
    week: 1,
    title: 'How OpenAI Uses Codex',
    titleKr: 'OpenAI의 Codex 활용 방법',
    author: 'OpenAI',
    readTime: '약 15분',
    sourceUrl: 'https://cdn.openai.com/pdf/6a2631dc-783e-479b-b1a4-af0cfbd38630/how-openai-uses-codex.pdf',
    sourceTitle: 'OpenAI PDF',
    published: true,
    sections: [
      {
        title: '소개',
        content:
          'OpenAI의 보안, 제품 엔지니어링, 프론트엔드, API, 인프라, 성능 엔지니어링 등 수많은 기술 팀이 매일 Codex를 사용합니다. 각 팀은 복잡한 시스템 이해, 대규모 코드베이스 리팩터링부터 새 기능 출시, 촉박한 마감 기한 내 인시던트 해결까지, 다양한 엔지니어링 작업을 Codex로 가속화합니다.',
      },
      {
        title: '활용 사례 1: 코드 이해',
        content:
          'Codex는 온보딩, 디버깅, 인시던트 조사 시 코드베이스의 익숙하지 않은 부분을 빠르게 파악하는 데 도움을 줍니다. 팀들은 Codex로 기능의 핵심 로직을 찾고, 서비스나 모듈 간의 관계를 매핑하며, 시스템 전반의 데이터 흐름을 추적합니다.',
        items: [
          '이 저장소에서 인증 로직은 어디에 구현되어 있나요?',
          '이 서비스에서 요청이 진입점부터 응답까지 어떻게 흐르는지 요약해주세요.',
          '[모듈 이름]과 상호작용하는 모듈은 무엇이며, 실패는 어떻게 처리되나요?',
        ],
      },
      {
        title: '활용 사례 2: 리팩터링 및 마이그레이션',
        content:
          '엔지니어들은 여러 파일이나 패키지에 걸친 변경 작업에 Codex를 자주 사용합니다. API 업데이트, 패턴 구현 방식 변경, 새로운 의존성 마이그레이션 시 Codex로 일관되게 변경 사항을 적용합니다.',
        items: [
          '이 파일을 관심사별로 별도의 모듈로 분리하고 각각에 대한 테스트를 생성해주세요.',
          '모든 콜백 기반 데이터베이스 접근을 async/await로 변환해주세요.',
        ],
      },
      {
        title: '활용 사례 3: 성능 최적화',
        content:
          'Codex는 성능 병목 현상을 식별하고 해결하는 데 쓰입니다. 튜닝이나 안정성 개선 작업 중에 엔지니어들은 Codex에게 비효율적인 루프, 중복 연산, 비용이 많이 드는 쿼리 등 느리거나 메모리를 많이 쓰는 코드 경로를 분석하고 최적화된 대안을 제안해달라고 요청합니다.',
        items: [
          '이 루프를 메모리 효율성을 위해 최적화하고, 왜 당신의 버전이 더 빠른지 설명해주세요.',
          '이 요청 핸들러에서 반복되는 비싼 연산을 찾고 캐싱 기회를 제안해주세요.',
          '이 함수에서 DB 쿼리를 배치로 처리하는 더 빠른 방법을 제안해주세요.',
        ],
      },
      {
        title: '활용 사례 4: 테스트 커버리지 향상',
        content:
          'Codex는 엔지니어들이 테스트를 더 빠르게 작성하도록 도와줍니다. 특히 커버리지가 부족하거나 완전히 누락된 곳에서 그렇습니다. 버그 수정이나 리팩터링 작업 시, 엔지니어들은 종종 Codex에게 엣지 케이스나 예상되는 실패 경로를 커버하는 테스트를 제안해달라고 요청합니다.',
        items: [
          '이 함수에 대한 단위 테스트를 작성해주세요. 엣지 케이스와 실패 경로를 포함해서요.',
          '이 정렬 유틸리티에 대한 속성 기반 테스트를 생성해주세요.',
          '이 테스트 파일을 확장해서 null 입력과 유효하지 않은 상태에 대한 누락된 시나리오를 커버해주세요.',
        ],
      },
      {
        title: '활용 사례 5: 개발 속도 향상',
        content:
          'Codex는 개발 주기의 시작과 끝 모두를 가속화하여 팀이 더 빠르게 움직일 수 있도록 돕습니다. 새로운 기능을 시작할 때 엔지니어들은 보일러플레이트를 스캐폴딩하는 데 Codex를 사용합니다.',
        items: [
          '기본 유효성 검사와 로깅이 포함된 POST /events용 새 API 라우트를 스캐폴딩해주세요.',
          '새 온보딩 플로우의 성공/실패를 추적하기 위한 텔레메트리 훅을 생성해주세요.',
          '이 스펙을 기반으로 스텁 구현을 만들어주세요.',
        ],
      },
      {
        title: '활용 사례 6: 플로우 유지',
        content:
          'Codex는 일정이 파편화되고 방해가 많을 때 엔지니어들이 생산성을 유지하도록 돕습니다. 미완성 작업을 캡처하거나, 노트를 작동하는 프로토타입으로 바꾸거나, 나중에 다시 볼 수 있는 탐색적 작업을 분리하는 데 쓰입니다.',
        items: [
          '이 서비스를 리팩터링하고 더 작은 모듈로 분리하는 계획을 생성해주세요.',
          '재시도 로직을 스텁으로 만들고 TODO를 추가해주세요. 백오프 로직은 나중에 채울게요.',
          '이 파일을 요약해서 내일 이어서 작업할 수 있게 해주세요.',
        ],
      },
      {
        title: '활용 사례 7: 탐색과 아이디어 발굴',
        content:
          'Codex는 대안적인 해결책을 찾거나 설계 결정을 검증하는 것과 같은 열린 형태의 작업에도 유용합니다. 문제를 해결하는 다양한 방법을 프롬프트로 요청하고, 익숙하지 않은 패턴을 탐색하거나, 가정을 검증할 수 있습니다.',
        items: [
          '시스템이 요청/응답 방식 대신 이벤트 기반이라면 어떻게 동작할까요?',
          '쿼리 빌더를 사용하지 않고 SQL 문자열을 수동으로 빌드하는 모든 모듈을 찾아주세요.',
          '이것을 더 함수형 스타일로 다시 작성해주세요. 변이와 부수 효과를 피해서요.',
        ],
      },
      {
        title: '모범 사례',
        content:
          'Codex는 구조, 컨텍스트, 반복할 여지가 주어질 때 가장 잘 작동합니다. OpenAI 팀들이 일상 업무에서 일관된 가치를 얻기 위해 기르는 습관들입니다.',
        items: [
          'Ask 모드로 시작하기: 대규모 변경의 경우, Ask 모드로 Codex에게 구현 계획을 먼저 요청하세요.',
          'Codex의 개발 환경을 반복적으로 개선하기: 시작 스크립트, 환경 변수, 인터넷 접근을 설정하면 Codex의 오류율이 크게 줄어듭니다.',
          'GitHub 이슈를 작성하듯이 프롬프트를 구조화하기: 파일 경로, 컴포넌트 이름, diff, 문서 스니펫을 포함하세요.',
          'Codex 작업 큐를 가벼운 백로그로 활용하기: 곁다리 아이디어, 부분적인 작업, 부수적인 수정을 캡처하기 위해 작업을 던져두세요.',
          'AGENTS.md로 지속적인 컨텍스트 제공하기: AGENTS.md 파일을 유지관리하여 Codex가 저장소에서 더 효과적으로 작동할 수 있도록 하세요.',
          '"Best of N"으로 출력 개선하기: 단일 작업에 대해 여러 응답을 동시에 생성하여 최선의 것을 선택할 수 있습니다.',
        ],
      },
      {
        title: '앞으로의 전망',
        content:
          'Codex는 아직 리서치 프리뷰 단계이지만, 이미 우리가 개발하는 방식에 실질적인 영향을 미칩니다. 더 빠르게 움직이고, 더 나은 코드를 작성하며, 그렇지 않았으면 우선순위가 매겨지지 않았을 작업을 처리할 수 있도록 돕습니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '코드 이해',
        content:
          'Codex는 온보딩, 디버깅, 인시던트 대응 시 익숙하지 않은 코드베이스를 빠르게 파악하는 데 도움을 준다. Ask 모드로 코드 위치 파악과 시스템 간 상호작용 추적이 가능하다.',
      },
      {
        title: '리팩터링 및 마이그레이션',
        content:
          '여러 파일에 걸친 일관된 변경, 레거시 패턴 교체, 의존성 마이그레이션을 몇 분 만에 처리할 수 있다.',
      },
      {
        title: '성능 최적화',
        content:
          '비효율적인 루프, 중복 연산, 비싼 DB 호출 등 성능 병목을 식별하고 최적화 대안을 제안한다. 기술 부채 감소에도 활용된다.',
      },
      {
        title: '테스트 커버리지 향상',
        content:
          '엣지 케이스와 실패 경로를 커버하는 테스트를 자동 생성한다. 밤새 돌려놓으면 아침에 실행 가능한 테스트 PR을 받을 수 있다.',
      },
      {
        title: '개발 속도 향상',
        content:
          '보일러플레이트 스캐폴딩부터 마지막 구현 공백 메우기까지, 개발 주기의 시작과 끝을 모두 가속화한다.',
      },
      {
        title: '플로우 유지',
        content:
          '미완성 작업 캡처, 곁다리 수정 처리, Slack/Datadog 정보 전달 등으로 인터럽션이 많은 상황에서도 집중력을 유지할 수 있다.',
      },
      {
        title: '탐색과 아이디어 발굴',
        content:
          '대안적 해결책 탐색, 설계 검증, 유사 버그 식별에 활용된다. 콜드 스타트 문제 해결에도 효과적이다.',
      },
      {
        title: '모범 사례',
        content:
          'Ask 모드로 시작해 계획을 세우고, GitHub 이슈처럼 프롬프트를 구조화하며, AGENTS.md로 지속적 컨텍스트를 제공하고, Best-of-N으로 여러 솔루션을 탐색하는 것이 효과적이다.',
      },
    ],
    relatedReadings: [
      { title: 'Deep Dive into LLMs', slug: 'deep-dive-llms' },
      { title: 'Prompt Engineering Guide', slug: 'prompt-engineering-guide' },
    ],
  },
}

// 자식 페이지 정의 (부모-자식 구조용)
export interface ChildReading {
  slug: string           // 'zeroshot'
  title: string          // 'Zero-shot Prompting'
  titleKr: string        // 'Zero-shot 프롬프팅'
  sourceUrl: string      // 원본 페이지 URL
  published?: boolean    // 번역 완료 여부
  hasMarkdown?: boolean  // 마크다운 파일 존재 여부 (동적 로딩용)
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

// 챕터별 요약 (YouTube 콘텐츠용)
export interface ChapterSummary {
  number: number
  title: string
  timestamp: string
  summary: string
  keyPoints: string[]
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
  cheatsheetImage?: string // 치트시트 이미지 경로 (예: '/cheatsheets/week1/how-openai-uses-codex.png')
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
  // YouTube 콘텐츠 전용 필드
  contentType?: 'youtube' | 'article' | 'pdf'
  duration?: string         // 영상 길이 (예: "3:31:05")
  totalChapters?: number    // 총 챕터 수
  // 요약 필드 (YouTube 콘텐츠)
  tldr?: string             // TL;DR 요약
  learningGoals?: string[]  // 학습 목표
  chapterSummaries?: ChapterSummary[] // 챕터별 요약
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
    isParent: true,
    contentType: 'youtube',
    duration: '3:31:05',
    totalChapters: 24,
    sections: [
      {
        title: '개요',
        content:
          'Andrej Karpathy의 LLM 심층 분석 강의입니다. 총 24개의 챕터로 구성되어 있으며, 약 3시간 31분 분량입니다. 각 챕터를 클릭하여 상세 내용을 확인하세요.',
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
    children: [
      {
        slug: 'introduction',
        title: '1. Introduction',
        titleKr: '1. 소개',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=0s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'pretraining-data',
        title: '2. Pretraining Data (Internet)',
        titleKr: '2. 사전학습 데이터 (인터넷)',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=60s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'tokenization',
        title: '3. Tokenization',
        titleKr: '3. 토큰화',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=467s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'neural-network-io',
        title: '4. Neural Network I/O',
        titleKr: '4. 신경망 입출력',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=867s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'neural-network-internals',
        title: '5. Neural Network Internals',
        titleKr: '5. 신경망 내부 구조',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=1211s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'inference',
        title: '6. Inference',
        titleKr: '6. 추론',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=1561s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'gpt2-training-inference',
        title: '7. GPT-2: Training and Inference',
        titleKr: '7. GPT-2: 학습과 추론',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=1869s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'llama-31-base-model',
        title: '8. Llama 3.1 Base Model Inference',
        titleKr: '8. Llama 3.1 베이스 모델 추론',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=2572s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'pretraining-to-post-training',
        title: '9. Pretraining to Post-Training',
        titleKr: '9. 사전학습에서 후속학습으로',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=3563s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'post-training-data',
        title: '10. Post-Training Data (Conversations)',
        titleKr: '10. 후속학습 데이터 (대화)',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=3666s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'hallucinations-tool-use',
        title: '11. Hallucinations, Tool Use, Knowledge/Working Memory',
        titleKr: '11. 환각, 도구 사용, 지식/작업 메모리',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=4832s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'knowledge-of-self',
        title: '12. Knowledge of Self',
        titleKr: '12. 자기 인식',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=6106s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'models-need-tokens-to-think',
        title: '13. Models Need Tokens to Think',
        titleKr: '13. 모델은 생각하기 위해 토큰이 필요하다',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=6416s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'tokenization-spelling',
        title: '14. Tokenization Revisited: Models Struggle with Spelling',
        titleKr: '14. 토큰화 재탐구: 철자 처리의 어려움',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=7271s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'jagged-intelligence',
        title: '15. Jagged Intelligence',
        titleKr: '15. 들쭉날쭉한 지능',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=7493s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'sft-to-rl',
        title: '16. Supervised Finetuning to Reinforcement Learning',
        titleKr: '16. 지도학습 미세조정에서 강화학습으로',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=7648s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'reinforcement-learning',
        title: '17. Reinforcement Learning',
        titleKr: '17. 강화학습',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=8082s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'deepseek-r1',
        title: '18. DeepSeek-R1',
        titleKr: '18. DeepSeek-R1',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=9467s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'alphago',
        title: '19. AlphaGo',
        titleKr: '19. AlphaGo',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=10127s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'rlhf',
        title: '20. Reinforcement Learning from Human Feedback (RLHF)',
        titleKr: '20. 인간 피드백 강화학습 (RLHF)',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=10906s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'preview-of-things-to-come',
        title: '21. Preview of Things to Come',
        titleKr: '21. 미래 전망',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=11379s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'keeping-track-of-llms',
        title: '22. Keeping Track of LLMs',
        titleKr: '22. LLM 동향 추적하기',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=11715s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'where-to-find-llms',
        title: '23. Where to Find LLMs',
        titleKr: '23. LLM을 찾을 수 있는 곳',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=11914s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'grand-summary',
        title: '24. Grand Summary',
        titleKr: '24. 전체 요약',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=12106s',
        published: true,
        hasMarkdown: true,
      },
    ],
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
      {
        slug: 'zeroshot',
        title: 'Zero-shot Prompting',
        titleKr: 'Zero-shot 프롬프팅',
        sourceUrl: 'https://www.promptingguide.ai/techniques/zeroshot',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 2분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/zeroshot.png',
        sections: [
          {
            title: '정의',
            content: 'Zero-shot 프롬프팅은 프롬프트에 예시나 시연을 포함하지 않는 방식입니다. GPT-3.5 Turbo, GPT-4, Claude 3 같은 최신 LLM은 대규모 학습을 통해 이 방식으로도 작업을 수행할 수 있습니다.',
          },
          {
            title: '작동 원리',
            content: '모델이 시연 없이 직접 작업 지시를 받습니다. 예를 들어, 감성 분류 프롬프트는 텍스트를 중립적, 부정적, 긍정적으로 분류하라고 요청합니다. 모델은 레이블이 붙은 예시 없이도 개념을 이해합니다.',
          },
          {
            title: '예시',
            content: '**프롬프트:**\n```\n텍스트를 중립적, 부정적, 긍정적으로 분류하세요.\n텍스트: 이번 휴가는 괜찮은 것 같아.\n감성:\n```\n\n**결과:** 중립적',
          },
          {
            title: '핵심 기술',
            content: '다음 두 가지 기술이 zero-shot 성능을 크게 향상시켰습니다:',
            items: [
              'Instruction Tuning - 지시문 기반 데이터셋으로 파인튜닝하면 zero-shot 성능이 향상됩니다',
              'RLHF (Reinforcement Learning from Human Feedback) - 인간의 선호도에 맞게 모델을 정렬하는 기법으로, ChatGPT 같은 모델의 핵심 기술입니다',
            ],
          },
          {
            title: '대안 사용 시점',
            content: 'Zero-shot으로 원하는 결과를 얻지 못하면 few-shot 프롬프팅으로 전환하는 것을 권장합니다. Few-shot은 모델 응답을 유도하는 예시를 포함합니다.',
          },
        ],
        keyTakeaways: [
          { title: 'Zero-shot은 예시 없이 직접 지시만으로 작업을 수행하는 프롬프팅 기법', content: '' },
          { title: '최신 LLM은 광범위한 사전 학습으로 zero-shot 수행이 가능', content: '' },
          { title: 'Instruction Tuning과 RLHF가 zero-shot 성능 향상의 핵심', content: '' },
          { title: '성능이 부족하면 few-shot 프롬프팅을 고려', content: '' },
        ],
      },
      {
        slug: 'fewshot',
        title: 'Few-shot Prompting',
        titleKr: 'Few-shot 프롬프팅',
        sourceUrl: 'https://www.promptingguide.ai/techniques/fewshot',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 3분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/fewshot.png',
        sections: [
          {
            title: '개요',
            content: 'Few-shot 프롬프팅은 프롬프트 내에 예시를 제공하여 모델 성능을 향상시키는 인컨텍스트 학습(in-context learning) 기법입니다. 제로샷 능력에만 의존하지 않고, 예시를 통해 모델이 더 나은 응답을 생성하도록 유도합니다.',
          },
          {
            title: '핵심 개념',
            content: 'Few-shot 프롬프팅은 프롬프트에 시연을 포함하여 모델 성능을 높이는 인컨텍스트 학습 기법입니다. 시연은 패턴을 확립하여 모델이 더 복잡한 작업을 처리하는 데 도움을 줍니다.',
          },
          {
            title: '역사적 맥락',
            content: '모델이 충분한 규모에 도달하면서 이 능력이 나타났습니다. 연구에 따르면, 특정 임계점에 도달하기 전까지 작은 모델에서는 few-shot 특성이 나타나지 않았습니다.',
          },
          {
            title: '연구 기반 설계 원칙',
            content: '주요 연구 결과에 따르면:',
            items: [
              '레이블 정확도와 무관하게 레이블 공간과 입력 분포가 중요',
              '무작위 레이블을 사용해도 형식 일관성이 성능을 향상시킴',
              '균등 분포보다 실제 분포에서 레이블을 선택하는 것이 더 효과적',
            ],
          },
          {
            title: '주요 한계',
            content: 'Few-shot 프롬프팅은 복잡한 추론 작업에서 어려움을 겪습니다. 산술 추론 문제 테스트에서 여러 시연을 제공해도 잘못된 답을 생성했습니다. 정교한 인지 작업에는 더 발전된 방법이 필요합니다.',
          },
        ],
        keyTakeaways: [
          { title: 'Few-shot 프롬프팅은 프롬프트에 예시를 포함하여 모델 성능을 향상시키는 인컨텍스트 학습 기법', content: '' },
          { title: '모델 규모가 특정 임계점을 넘어야 이 능력이 발현됨', content: '' },
          { title: '레이블 정확도보다 형식 일관성과 분포가 더 중요한 역할을 함', content: '' },
          { title: '복잡한 추론 작업에는 한계가 있어 Chain of Thought 등 고급 기법이 필요', content: '' },
        ],
      },
      {
        slug: 'cot',
        title: 'Chain-of-Thought Prompting',
        titleKr: 'Chain-of-Thought 프롬프팅',
        sourceUrl: 'https://www.promptingguide.ai/techniques/cot',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 5분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/cot.png',
        sections: [
          {
            title: '정의 및 개요',
            content: 'Chain-of-Thought(CoT) 프롬프팅은 중간 추론 단계를 거쳐 복잡한 추론을 수행하는 기법입니다. Wei et al.(2022)이 제안한 이 기법을 사용하면 LLM이 답에 바로 도달하지 않고, 추론 과정을 단계별로 보여주며 다단계 문제를 차근차근 해결합니다.',
          },
          {
            title: '핵심 개념',
            content: 'CoT 프롬프팅은 단계별 추론을 보여주어 모델을 유도합니다. 분석적 사고가 필요한 복잡한 작업에서 few-shot 프롬프팅과 결합하면 더욱 효과적입니다.',
          },
          {
            title: 'Zero-Shot CoT 프롬프팅',
            content: '예시 없이도 작동하는 간단한 방법으로, 단 하나의 문구만 추가하면 됩니다: "Let\'s think step by step."(단계별로 생각해 봅시다.) Zero-shot 방식은 프롬프트에 넣을 예시가 부족할 때 특히 유용합니다.',
          },
          {
            title: 'Automatic Chain-of-Thought (Auto-CoT)',
            content: 'Zhang et al.(2022)은 수작업으로 예시를 만드는 부담을 줄이기 위해 시연 생성 과정을 자동화하는 방법을 제안했습니다.',
            items: [
              '질문 클러스터링: 데이터셋의 질문을 클러스터로 분류하여 다양성 확보',
              '시연 샘플링: 각 클러스터에서 대표 질문을 선택하고 Zero-Shot-CoT로 추론 체인 생성',
            ],
          },
        ],
        keyTakeaways: [
          { title: 'CoT 프롬프팅은 추론 작업의 성능을 크게 향상시킵니다', content: '' },
          { title: '충분히 큰 언어 모델에서 가장 효과적입니다', content: '' },
          { title: '"Let\'s think step by step"은 간단하면서도 효과적인 zero-shot 대안입니다', content: '' },
          { title: '자동화를 통해 품질을 유지하면서 CoT 시연을 확장할 수 있습니다', content: '' },
        ],
      },
      {
        slug: 'meta-prompting',
        title: 'Meta Prompting',
        titleKr: '메타 프롬프팅',
        sourceUrl: 'https://www.promptingguide.ai/techniques/meta-prompting',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 4분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/meta-prompting.png',
        sections: [
          {
            title: '개요',
            content: '메타 프롬프팅(Meta Prompting)은 특정 내용보다 구조와 문법적 측면을 강조하는 고급 프롬프팅 기법입니다. LLM과 추상화된 패턴 기반의 상호작용을 구성하는 방식입니다.',
          },
          {
            title: '주요 특성',
            content: 'Zhang et al. (2024) 연구에 따르면, 메타 프롬프팅은 다섯 가지 핵심 속성을 갖습니다:',
            items: [
              '구조 중심(Structure-oriented): 특정 내용보다 문제와 솔루션의 형식과 패턴을 우선시',
              '문법 기반(Syntax-focused): 문법 구조를 예상 응답의 템플릿으로 활용',
              '추상적 예시(Abstract examples): 구체적인 세부 사항 없이 문제 구조를 보여주는 추상화된 프레임워크 사용',
              '다재다능함(Versatile): 다양한 도메인에서 구조화된 응답에 적용 가능',
              '범주적 접근(Categorical approach): 타입 이론(type theory)을 활용해 구성 요소를 분류',
            ],
          },
          {
            title: 'Few-shot 프롬프팅과의 비교',
            content: '메타 프롬프팅은 Few-shot 프롬프팅과 근본적으로 다른 접근 방식을 취합니다. Few-shot이 강조하는 "내용 중심 접근"과 달리 "구조 중심 접근"을 채택합니다.',
            items: [
              '토큰 효율성: 구조에 집중해 토큰 사용량을 줄임',
              '공정한 비교: 특정 예시의 영향을 최소화',
              'Zero-shot 효과: 예시 의존도가 낮아 Zero-shot 프롬프팅처럼 작동',
            ],
          },
          {
            title: '권장 활용 분야',
            content: '복잡한 추론 작업, 수학 문제 해결, 코딩 과제, 이론적 질의에 효과적입니다. 단, LLM이 해당 작업에 대한 기본 지식을 갖추고 있어야 효과적으로 작동합니다.',
          },
        ],
        keyTakeaways: [
          { title: '메타 프롬프팅은 구체적인 내용보다 구조와 패턴에 집중하는 고급 프롬프팅 기법', content: '' },
          { title: 'Few-shot 프롬프팅과 달리 토큰 효율성이 높고, 특정 예시에 대한 의존도가 낮음', content: '' },
          { title: '복잡한 추론, 수학 문제, 코딩 과제 등에 효과적', content: '' },
          { title: 'LLM이 해당 작업에 대한 기본 지식을 갖추고 있어야 효과적으로 작동', content: '' },
        ],
      },
      {
        slug: 'consistency',
        title: 'Self-Consistency',
        titleKr: 'Self-Consistency',
        sourceUrl: 'https://www.promptingguide.ai/techniques/consistency',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 3분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/consistency.png',
        sections: [
          {
            title: '개요',
            content: 'Self-Consistency는 Wang et al. (2022)이 제안한 고급 프롬프트 엔지니어링 기법입니다. 기존 Chain-of-Thought(CoT) 프롬프팅의 한계를 극복하기 위해 개발되었습니다. 아이디어는 간단합니다. 하나의 추론 경로에만 의존하지 않고, few-shot CoT로 다양한 추론 경로를 여러 개 생성한 뒤 가장 많이 나온 답변을 최종 결과로 선택합니다.',
          },
          {
            title: '단일 경로 추론의 한계',
            content: 'Self-Consistency 없이 모델에 한 번만 질문하면 어떻게 될까요?\n\n**질문:** 내가 6살일 때 여동생은 내 나이의 절반이었습니다. 지금 나는 70살인데, 여동생은 몇 살일까요?\n\n**모델 출력:** 35 (오답)\n\n모델이 "절반"이라는 단어에 이끌려 단순히 70의 절반을 계산했습니다. 한 번의 시도로는 이런 실수를 잡아내기 어렵습니다.',
          },
          {
            title: '해결책: 여러 경로로 추론하기',
            content: 'Few-shot 예시와 함께 여러 응답을 생성하면 모델은 다양한 방식으로 문제를 풉니다.\n\n**출력 1:** 화자가 6살일 때 여동생은 3살이었습니다. 지금 화자가 70살이므로, 여동생은 67살입니다.\n\n**출력 2:** 여동생은 3살이었습니다. 화자가 지금 70살이므로, 여동생은 67살입니다.\n\n**출력 3:** 여동생은 3살이었습니다. 화자가 70살이므로, 여동생은 35살입니다.\n\n세 번의 시도 중 두 번이 67이라는 답을 내놓았습니다. 다수결로 67을 최종 답으로 선택하면 정답을 얻습니다.',
          },
          {
            title: '작동 원리',
            content: 'Self-Consistency는 세 단계로 진행됩니다.',
            items: [
              '여러 추론 경로 생성: Few-shot CoT 프롬프팅으로 동일한 질문에 다양한 응답을 샘플링합니다.',
              '응답 분석: 각 응답에서 최종 답변을 추출합니다.',
              '합의 도출: 가장 자주 등장하는 답변을 최종 결과로 선택합니다.',
            ],
          },
          {
            title: '요약',
            content: '핵심은 단일 시도의 불확실성을 여러 시도의 합의로 보완하는 것입니다. 여러 전문가에게 의견을 구하고 다수 의견을 따르는 것과 비슷합니다.',
          },
        ],
        keyTakeaways: [
          { title: 'Self-Consistency는 Chain-of-Thought(CoT) 프롬프팅을 개선한 고급 기법', content: '' },
          { title: '단일 추론 대신 여러 다양한 추론 경로를 생성하고, 가장 일관된 답변을 선택', content: '' },
          { title: '산술 및 상식 추론 작업에서 정확도 향상에 효과적', content: '' },
          { title: '다수결 투표 또는 빈도 기반으로 최종 답변 결정', content: '' },
        ],
      },
      {
        slug: 'knowledge',
        title: 'Generate Knowledge Prompting',
        titleKr: '생성적 지식 프롬프팅',
        sourceUrl: 'https://www.promptingguide.ai/techniques/knowledge',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 2분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/knowledge.png',
        sections: [
          {
            title: '개요',
            content: '생성적 지식 프롬프팅은 LLM에게 "예측하기 전에 먼저 지식을 생성하라"고 지시하여 성능을 높이는 기법입니다. 기존에 학습된 파라미터에만 의존하지 않고, 모델이 먼저 관련 정보를 생성한 뒤 더 정확한 출력을 도출합니다.',
          },
          {
            title: '문제 상황',
            content: '일반적인 LLM 응답은 세계 지식이 필요한 작업에서 자주 실패합니다. 예를 들어, "골프에서는 다른 사람보다 높은 점수를 얻으려고 합니다. 예, 아니오?"라는 질문에 모델은 맥락을 제대로 이해하지 못한 채 "예"라고 잘못 답했습니다.',
          },
          {
            title: '해결책: 다단계 접근',
            content: '이 기법은 2단계로 구성됩니다. 1단계(지식 생성)에서는 주제와 관련된 사실을 먼저 생성합니다. 골프 예시에서 모델은 "가장 적은 타수로 전체 홀을 완주하는" 게임이며 "총 타수로 승자를 결정한다"는 지식을 생성했습니다. 2단계(통합 및 예측)에서는 생성된 지식을 재구성한 프롬프트에 통합하여 정확한 답변을 도출합니다.',
          },
          {
            title: '주요 결과',
            content: '지식을 통합하자 모델은 신뢰도에 따라 가중치를 부여한 답변을 제공했습니다. 높은 신뢰도의 답변에서는 골프가 높은 점수가 아닌 낮은 점수를 목표로 한다고 정확히 파악했습니다.',
          },
          {
            title: '연구 배경',
            content: '이 기법은 Liu et al. (2022)이 제안했으며, 프롬프팅 파이프라인 내에 명시적인 지식 생성 단계를 추가하여 상식 추론 작업의 한계를 극복합니다.',
          },
        ],
        keyTakeaways: [
          { title: '예측 전에 모델이 먼저 관련 지식을 생성하도록 유도하는 기법', content: '' },
          { title: '세계 지식이 필요한 작업에서 LLM의 정확도 향상', content: '' },
          { title: '1단계(지식 생성) → 2단계(통합 및 예측)의 2단계 접근', content: '' },
          { title: '상식 추론 작업에서 기존 방식보다 더 정확한 응답 도출', content: '' },
        ],
      },
      {
        slug: 'prompt_chaining',
        title: 'Prompt Chaining',
        titleKr: '프롬프트 체이닝',
        sourceUrl: 'https://www.promptingguide.ai/techniques/prompt_chaining',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 3분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/prompt_chaining.png',
        sections: [
          {
            title: '프롬프트 체이닝 소개',
            content: 'LLM의 신뢰성과 성능을 향상시키는 중요한 프롬프트 엔지니어링 기법 중 하나는 작업을 하위 작업으로 분할하는 것입니다. 이 방법론은 LLM에 하위 작업을 프롬프트로 전달하고, 그 응답을 다음 프롬프트의 입력으로 활용하여 연쇄적인 작업 흐름을 만듭니다.\n\n프롬프트 체이닝은 LLM 애플리케이션의 투명성을 높이고, 제어 가능성과 신뢰성을 강화합니다. 각 단계별 디버깅, 성능 분석, 대화형 어시스턴트 구축에 특히 유용합니다.',
          },
          {
            title: '프롬프트 체이닝 활용 사례',
            content: '실용적인 활용 사례로 두 개의 프롬프트를 사용하는 설계가 있습니다. 첫 번째 프롬프트에서 질문과 관련된 인용문을 문서에서 추출하고, 두 번째 프롬프트에서 추출한 인용문을 활용해 최종 답변을 작성합니다.',
          },
          {
            title: '정리',
            content: '프롬프트를 단순화하고 체이닝하는 것은 응답에 여러 작업이나 변환이 필요할 때 유용한 프롬프팅 기법입니다.',
            items: [
              '단일 프롬프트로 처리하기에 작업이 너무 복잡할 때',
              '더 나은 투명성과 디버깅 기능이 필요할 때',
              'LLM 출력에 대한 제어력을 높이고 싶을 때',
              '다단계 추론이 필요한 대화형 어시스턴트를 구축할 때',
            ],
          },
        ],
        keyTakeaways: [
          { title: '프롬프트 체이닝은 복잡한 작업을 여러 하위 작업으로 분할하여 순차적으로 처리하는 기법', content: '' },
          { title: '한 프롬프트의 출력이 다음 프롬프트의 입력으로 연결되는 연쇄 구조', content: '' },
          { title: '투명성, 제어 가능성, 신뢰성을 높이고 디버깅도 용이함', content: '' },
          { title: '문서 기반 질의응답, 대화형 어시스턴트 등에 효과적', content: '' },
        ],
      },
      {
        slug: 'tot',
        title: 'Tree of Thoughts',
        titleKr: 'Tree of Thoughts',
        sourceUrl: 'https://www.promptingguide.ai/techniques/tot',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 3분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/tot.png',
        sections: [
          {
            title: '개요',
            content: 'Tree of Thoughts는 탐색과 전략적 계획이 필요한 복잡한 문제 해결 과제를 위한 프롬프팅 프레임워크입니다. 단순한 선형 추론 대신, ToT는 "생각의 트리를 유지하며, 여기서 생각(thought)은 문제 해결을 향한 중간 단계 역할을 하는 일관된 언어 시퀀스"입니다.',
          },
          {
            title: '핵심 개념',
            content: '이 프레임워크를 통해 언어 모델은 다음 작업을 수행합니다:',
            items: [
              '여러 중간 추론 경로 생성',
              '생각의 진행 상황 자체 평가',
              '검색 알고리즘(너비 우선, 깊이 우선, Beam Search)으로 체계적 탐색',
              '예측(lookahead) 및 백트래킹(backtracking) 구현',
            ],
          },
          {
            title: '주요 특징',
            content: '**문제 분해**: 과제를 단계별로 나누어 후보 솔루션을 생성합니다. 예를 들어, Game of 24 문제에서는 추론을 3단계로 분리하고 각 단계에서 상위 5개 후보를 유지합니다.\n\n**평가 전략**: 모델이 "확실/가능/불가능" 범주로 생각 후보를 평가하여 솔루션을 필터링하고, 상식적 추론으로 불가능한 경로를 제거합니다.\n\n**검색 방법**: 원본 프레임워크는 과제 특화 적응 없이 일반적인 검색 전략(DFS, BFS, Beam Search)을 사용합니다.',
          },
          {
            title: '관련 접근법',
            content: '**ToT 프롬프팅 (간소화 버전)**: Hulbert는 모델이 여러 전문가 관점을 상상하며 협력적으로 문제를 해결하는 단일 프롬프트 기법으로 ToT 개념의 적용을 제안했습니다.\n\n**RL 강화 ToT**: Long의 버전은 강화학습으로 훈련한 "ToT 컨트롤러"를 사용하여, 고정 알고리즘 대신 검색 전략을 동적으로 적응시킵니다.',
          },
          {
            title: '성능',
            content: '연구 결과, ToT는 복잡한 추론 과제에서 기존 프롬프팅 방법을 크게 능가합니다.',
          },
        ],
        keyTakeaways: [
          { title: 'ToT는 복잡한 문제 해결을 위한 트리 구조 기반 프롬프팅 프레임워크', content: '' },
          { title: '단순 선형 추론 대신 여러 중간 추론 경로를 탐색하고 자체 평가', content: '' },
          { title: 'BFS, DFS, Beam Search 등 검색 알고리즘으로 체계적 탐색 수행', content: '' },
          { title: '예측(lookahead)과 백트래킹(backtracking)으로 최적 경로 탐색', content: '' },
        ],
      },
      {
        slug: 'rag',
        title: 'Retrieval Augmented Generation',
        titleKr: 'RAG (검색 증강 생성)',
        sourceUrl: 'https://www.promptingguide.ai/techniques/rag',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 3분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/rag.png',
        sections: [
          {
            title: '개요',
            content: '범용 언어 모델은 감정 분석이나 개체명 인식 같은 일반적인 태스크에 맞춰 파인튜닝할 수 있습니다. 하지만 더 복잡하고 지식 집약적인 태스크라면, 외부 지식 소스에 접근하는 언어 모델 기반 시스템을 구축할 수 있습니다. 이 방식은 사실적 일관성을 높이고, 생성된 응답의 신뢰성을 향상시키며, 환각(hallucination) 문제를 완화합니다.\n\nMeta AI 연구진은 이러한 지식 집약적 태스크를 해결하기 위해 검색 증강 생성(Retrieval Augmented Generation, RAG)을 제안했습니다. RAG는 정보 검색 컴포넌트와 텍스트 생성 모델을 결합합니다.',
          },
          {
            title: 'RAG의 작동 원리',
            content: 'RAG는 입력을 받아 소스(예: Wikipedia)에서 관련성 있는 문서들을 검색합니다. 검색된 문서는 원래 입력 프롬프트와 함께 컨텍스트로 결합되어 텍스트 생성기에 전달되고, 최종 출력을 생성합니다. 이 방식 덕분에 RAG는 사실이 시간에 따라 변하는 상황에도 유연하게 대응할 수 있습니다. LLM의 파라메트릭 지식은 정적이므로 이 점이 매우 유용합니다. RAG를 사용하면 언어 모델이 재학습 없이 최신 정보에 접근하여 검색 기반 생성을 통해 신뢰할 수 있는 출력을 만들 수 있습니다.',
          },
          {
            title: 'RAG의 성능',
            content: 'RAG는 Natural Questions, WebQuestions, CuratedTrec 등 여러 벤치마크에서 강력한 성능을 보여줍니다. MS-MARCO와 Jeopardy 질문으로 테스트했을 때, RAG는 더 사실적이고, 구체적이며, 다양한 응답을 생성합니다. RAG는 FEVER 사실 검증에서도 결과를 개선합니다. 이는 지식 집약적 태스크에서 언어 모델의 출력을 향상시키는 유효한 방법으로서 RAG의 잠재력을 보여줍니다.',
          },
          {
            title: 'RAG 활용 사례',
            content: 'RAG는 다양한 지식 집약적 시나리오에 적용할 수 있습니다:',
            items: [
              '질의응답: 관련 문서를 검색하여 정확하고 최신의 답변 제공',
              '사실 검증: 신뢰할 수 있는 지식 소스와 주장을 대조 검증',
              '콘텐츠 생성: 권위 있는 출처를 참조하여 사실에 기반한 콘텐츠 작성',
              '고객 지원: 제품 문서와 FAQ에 접근하여 정확한 응답 제공',
            ],
          },
          {
            title: '실제 구현',
            content: 'RAG 시스템을 구현할 때 다음 구성요소를 고려해야 합니다:',
            items: [
              '문서 저장소: 검색할 수 있는 문서 컬렉션 (예: 벡터 데이터베이스)',
              '검색기(Retriever): 쿼리 기반으로 관련 문서를 찾는 모델',
              '생성기(Generator): 검색된 컨텍스트를 활용하여 최종 응답을 생성하는 언어 모델',
            ],
          },
        ],
        keyTakeaways: [
          { title: 'RAG는 정보 검색과 텍스트 생성을 결합하여 LLM의 사실적 정확성을 높이는 기법', content: '' },
          { title: '외부 지식을 활용해 환각(hallucination) 문제를 완화하고, 최신 정보를 반영 가능', content: '' },
          { title: '문서 저장소, 검색기(Retriever), 생성기(Generator) 세 구성요소로 구성', content: '' },
          { title: '질의응답, 사실 검증, 콘텐츠 생성, 고객 지원 등 다양한 분야에 적용', content: '' },
        ],
      },
      {
        slug: 'art',
        title: 'Automatic Reasoning and Tool-use',
        titleKr: 'ART (자동 추론 및 도구 사용)',
        sourceUrl: 'https://www.promptingguide.ai/techniques/art',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 2분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/art.png',
        sections: [
          {
            title: '개요',
            content: 'ART는 Chain of Thought 프롬프팅과 도구 통합을 교차 방식으로 결합한 프레임워크입니다. 연구에 따르면 이 프레임워크는 "고정된(frozen) LLM으로 중간 추론 단계를 프로그램 형태로 자동 생성"합니다.',
          },
          {
            title: 'ART의 작동 방식',
            content: '다음 단계로 구성됩니다:',
            items: [
              '선택: 새로운 태스크를 만나면 시스템이 태스크 라이브러리에서 관련 있는 다단계 추론 및 도구 사용 예시를 검색',
              '실행: 테스트 중 외부 도구 호출이 필요하면 생성을 일시 중지',
              '통합: 도구 출력을 통합한 후 생성을 재개',
            ],
          },
          {
            title: '주요 장점',
            content: 'ART는 다음과 같은 장점을 제공합니다:',
            items: [
              '확장성: 사람이 라이브러리를 업데이트하여 추론 단계를 개선하거나 새로운 도구를 추가할 수 있음',
              '성능: ART는 이전에 접하지 않은 BigBench와 MMLU 태스크에서 few-shot 프롬프팅과 자동 Chain of Thought를 크게 능가',
              '유연성: 사람의 피드백을 반영하면 수작업 Chain of Thought 프롬프트보다 뛰어난 성능',
            ],
          },
          {
            title: '출처',
            content: 'Paranjape 외(2023)가 이 프레임워크를 소개했으며, 언어 모델을 활용한 복잡한 문제 해결에서 추론과 도구 통합을 결합한 중요한 발전입니다.',
          },
        ],
        keyTakeaways: [
          { title: 'ART는 Chain of Thought 프롬프팅과 도구 사용을 결합한 프레임워크', content: '' },
          { title: '고정된(frozen) LLM으로 중간 추론 단계를 자동 생성', content: '' },
          { title: '태스크 라이브러리에서 관련 예시를 검색해 새로운 태스크에 적용', content: '' },
          { title: 'BigBench, MMLU에서 few-shot 프롬프팅 대비 우수한 성능', content: '' },
          { title: '사람의 피드백으로 확장 가능', content: '' },
        ],
      },
      {
        slug: 'ape',
        title: 'Automatic Prompt Engineer',
        titleKr: 'APE (자동 프롬프트 엔지니어)',
        sourceUrl: 'https://www.promptingguide.ai/techniques/ape',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 2분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/ape.png',
        sections: [
          {
            title: 'APE 작동 방식',
            content: 'APE는 다음 세 단계로 작동합니다:',
            items: [
              '생성: LLM이 출력 예시를 바탕으로 후보 지시문을 생성합니다.',
              '실행: 타겟 모델이 후보 지시문들을 실행합니다.',
              '선택: 평가 점수를 기준으로 가장 효과적인 지시문을 선택합니다.',
            ],
          },
          {
            title: '주요 발견',
            content: 'APE는 널리 사용되는 "Let\'s think step by step"보다 더 나은 제로샷 Chain-of-Thought(연쇄적 사고) 프롬프트를 발견했습니다. 최적화된 프롬프트는 "Let\'s work this out in a step by step way to be sure we have the right answer."(정답을 확인하기 위해 단계별로 풀어봅시다.)입니다. 이 프롬프트는 MultiArith와 GSM8K 벤치마크에서 성능 향상을 보였습니다.',
          },
          {
            title: '관련 연구',
            content: '프롬프트 최적화 관련 연구들:',
            items: [
              'Prompt-OIRL: 쿼리 의존적 프롬프트를 위한 오프라인 역강화학습 활용',
              'OPRO: LLM을 활용한 프롬프트 최적화',
              'AutoPrompt: 그래디언트 기반 자동 프롬프트 생성',
              'Prefix Tuning & Prompt Tuning: 전체 파인튜닝 대신 파라미터 효율적 학습',
            ],
          },
          {
            title: '참고 문헌',
            content: 'Zhou et al. (2022). "Large Language Models Are Human-Level Prompt Engineers" (https://arxiv.org/abs/2211.01910)',
          },
        ],
        keyTakeaways: [
          { title: 'APE는 LLM으로 최적의 프롬프트를 자동 탐색하는 프레임워크', content: '' },
          { title: '인간이 만든 "Let\'s think step by step"보다 효과적인 프롬프트를 찾음', content: '' },
          { title: '수학 추론 벤치마크(MultiArith, GSM8K)에서 성능 향상을 입증', content: '' },
        ],
      },
      {
        slug: 'activeprompt',
        title: 'Active-Prompt',
        titleKr: 'Active-Prompt',
        sourceUrl: 'https://www.promptingguide.ai/techniques/activeprompt',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 2분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/activeprompt.jpg',
        sections: [
          {
            title: '개요',
            content: 'Chain-of-Thought(CoT) 방법은 사람이 주석을 단 고정된 예시 세트에 의존합니다. 하지만 이 예시가 모든 과제에 최적이 아닐 수 있다는 문제가 있습니다. Diao et al.(2023)은 이 문제를 해결하기 위해 Active-Prompt라는 새로운 프롬프팅 방법을 제안했습니다. Active-Prompt는 LLM을 다양한 과제별 예시 프롬프트에 맞게 조정합니다.',
          },
          {
            title: 'Active-Prompt의 작동 방식',
            content: '먼저 LLM에 몇 개의 CoT 예시를 포함하거나 제외한 채로 질문합니다. 훈련 질문 세트에 대해 k개의 답변을 생성합니다. k개 답변을 바탕으로 불확실성 지표를 계산하는데, 여기서는 불일치 정도를 사용합니다. 불확실성이 가장 높은 질문을 선별해 사람에게 주석을 요청합니다.',
            items: [
              '불확실성 추정: 훈련 세트의 각 질문을 LLM에 입력해 k개의 답변 생성',
              '불일치 계산: k개 답변 사이의 불일치를 기준으로 불확실성 측정',
              '선택: 불확실성이 가장 높은 질문을 골라 사람의 주석 대상으로 지정',
              '주석 작업: 선택된 질문에 대해 사람이 CoT 주석 작성',
              '추론: 새로 확보한 주석 예시를 활용해 새로운 질문에 추론 수행',
            ],
          },
          {
            title: '핵심 인사이트',
            content: 'Active-Prompt의 핵심 혁신은 고정된 예시에 의존하지 않고, 특정 과제에 가장 유용한 예시를 동적으로 선택한다는 점입니다. 여러 모델 출력 간의 불일치로 불확실성을 측정해, 성능 향상에 필요한 주석 대상 예시를 효과적으로 식별합니다.',
          },
        ],
        keyTakeaways: [
          { title: 'Active-Prompt는 과제별로 가장 효과적인 예시를 동적으로 선택하는 프롬프팅 기법', content: '' },
          { title: '불확실성 추정(여러 답변 간 불일치 측정)으로 주석이 필요한 질문을 식별', content: '' },
          { title: '고정된 예시 대신 적응형 예시 선택으로 다양한 과제에서 성능 향상', content: '' },
        ],
      },
      {
        slug: 'dsp',
        title: 'Directional Stimulus Prompting',
        titleKr: '방향 자극 프롬프팅',
        sourceUrl: 'https://www.promptingguide.ai/techniques/dsp',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 2분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/dsp.jpg',
        sections: [
          {
            title: '개요',
            content: '방향 자극 프롬프팅(Directional Stimulus Prompting)은 Li et al. (2023)이 제안한 기법입니다. 언어 모델이 원하는 출력을 더 효과적으로 생성하도록 안내합니다. 특히 요약(summarization) 작업에서 유용합니다.',
          },
          {
            title: '핵심 메커니즘',
            content: '이 접근법은 조정 가능한(tunable) 정책 언어 모델(policy language model)을 활용합니다. 정책 모델은 더 큰 고정(frozen) LLM을 안내하는 자극(stimuli)이나 힌트를 생성하도록 훈련됩니다. 이는 강화학습(reinforcement learning)으로 언어 모델 출력을 최적화하는 새로운 트렌드입니다.',
          },
          {
            title: '기술적 접근 방식',
            content: '이 방법론은 표준 프롬프팅과 다릅니다. 수동으로 프롬프트를 작성하는 대신, 방향성 프롬프트(directional prompts)를 체계적으로 생성하는 중간 단계를 도입합니다. 덕분에 모델 행동을 더 구조적으로 안내할 수 있습니다.',
          },
          {
            title: '장점',
            content: '방향 자극 프롬프팅의 주요 장점:',
            items: [
              '효율성: 전체 시스템을 파인튜닝하지 않고 작은 모델만 효율적으로 최적화합니다.',
              '유연성: 블랙박스 LLM과 함께 작동하므로 API 기반 모델에도 적용할 수 있습니다.',
              '확장성: 작은 정책 모델이 큰 LLM을 안내하는 구조로 확장성이 뛰어납니다.',
            ],
          },
        ],
        keyTakeaways: [
          { title: '작은 정책 LM이 큰 고정 LLM을 안내하는 힌트를 생성하는 기법', content: '' },
          { title: '강화학습으로 힌트 생성 최적화', content: '' },
          { title: '요약 작업에 효과적이며, API 기반 블랙박스 모델에도 적용 가능', content: '' },
        ],
      },
      {
        slug: 'pal',
        title: 'Program-Aided Language Models',
        titleKr: 'PAL (프로그램 보조 언어 모델)',
        sourceUrl: 'https://www.promptingguide.ai/techniques/pal',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 5분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/pal.jpg',
        sections: [
          {
            title: 'PAL 작동 방식',
            content: 'PAL은 언어 모델이 자유 형식 텍스트 설명 대신 실행 가능한 프로그램을 중간 추론 단계로 생성하는 접근 방식입니다. 모델은 자연어 문제를 읽고 런타임 환경(주로 Python)에서 실행하여 답을 도출하는 프로그램을 생성합니다.',
          },
          {
            title: 'Chain of Thought와의 핵심 차이점',
            content: '자연어 추론을 사용하는 Chain of Thought 프롬프팅과 달리 PAL은 코드 실행을 활용합니다. 이 방식은 모델 예측에만 의존하지 않고 결정론적 프로그래밍에 계산 작업을 위임하여 추론 정확도를 높입니다.',
          },
          {
            title: '실제 구현',
            content: '워크플로우는 다음과 같습니다:',
            items: [
              '설정: API 키를 구성하고 언어 모델 인스턴스를 생성',
              '프롬프트 엔지니어링: 문제를 Python 코드로 구조화하는 few-shot 예시 제공',
              '모델 출력: LLM이 Python 코드 스니펫을 생성',
              '실행: Python exec() 함수로 생성된 코드를 실행해 최종 답 도출',
            ],
          },
          {
            title: 'PAL이 효과적인 이유',
            content: 'PAL이 효과적인 이유는 다음과 같습니다:',
            items: [
              '계산 위임: 수학적, 논리적 연산을 신뢰할 수 있는 런타임이 처리',
              '환각 감소: 모델이 계산 결과를 "상상"할 필요가 없음',
              '검증 가능성: 생성된 코드를 검사하고 디버깅 가능',
              '모델 강점 활용: LLM은 문제 이해와 구조화된 코드 생성에 뛰어남',
            ],
          },
        ],
        keyTakeaways: [
          { title: 'PAL은 LLM이 추론 단계로 실행 가능한 프로그램을 생성하고 Python 런타임이 이를 실행하는 방법', content: '' },
          { title: 'Chain of Thought 프롬프팅과 달리 자유 형식 텍스트 대신 코드 실행을 활용', content: '' },
          { title: '계산을 런타임에 위임하여 정확도를 높이고 환각을 줄임', content: '' },
          { title: '날짜 계산, 수학 문제 등 결정론적 연산이 필요한 작업에 특히 효과적', content: '' },
        ],
      },
      {
        slug: 'react',
        title: 'ReAct',
        titleKr: 'ReAct 프롬프팅',
        sourceUrl: 'https://www.promptingguide.ai/techniques/react',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 5분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/react.png',
        sections: [
          {
            title: '개요',
            content: 'Yao et al. (2022)이 소개한 ReAct는 "LLM으로 추론 추적과 작업별 행동을 번갈아 생성하는" 프레임워크입니다. 이 접근법을 통해 모델은 내부 추론과 외부 도구 상호작용을 결합하여 복잡한 작업을 처리할 수 있습니다.',
          },
          {
            title: '핵심 개념',
            content: 'ReAct 프레임워크는 외부 정보 검색을 도입해 Chain-of-Thought 프롬프팅의 한계를 극복합니다. CoT는 추론에 뛰어나지만 실제 데이터에 접근할 수 없어 사실적 환각이 발생합니다. ReAct는 사고와 행동을 번갈아 수행하며, 위키피디아나 검색 엔진 같은 외부 소스를 쿼리해 이 문제를 해결합니다.',
          },
          {
            title: '작동 방식',
            content: 'ReAct는 사고-행동-관찰 사이클로 동작합니다:',
            items: [
              '사고(Thought): 내부 추론 단계',
              '행동(Action): 외부 도구 쿼리 (검색, 조회)',
              '관찰(Observation): 환경에서 반환된 결과',
            ],
          },
          {
            title: '성능 결과',
            content: 'ReAct는 HotpotQA와 Fever 데이터셋에서 행동만 수행하는 방식보다 우수한 성능을 보입니다. ReAct를 Chain-of-Thought, Self-Consistency와 결합하면 최상의 결과를 얻을 수 있습니다. ALFWorld와 WebShop 환경에서도 행동만 수행하는 기준선을 크게 앞섭니다.',
          },
          {
            title: '주요 장점',
            content: 'ReAct의 핵심 이점:',
            items: [
              '내부 지식과 외부 정보 결합',
              '해석 가능성과 신뢰성 향상',
              '복잡한 추론 및 의사결정 작업 처리',
              '근거 기반 접근으로 환각 감소',
              '실행 중 동적 계획 조정 가능',
            ],
          },
          {
            title: '한계점',
            content: 'ReAct의 주요 한계:',
            items: [
              '검색 결과 품질에 크게 의존',
              '유용하지 않은 정보를 받았을 때 회복이 어려울 수 있음',
              '특정 추론 작업에서는 순수 CoT보다 유연성이 낮음',
            ],
          },
        ],
        keyTakeaways: [
          { title: 'ReAct는 추론(Reasoning)과 행동(Acting)을 결합한 프롬프팅 프레임워크', content: '' },
          { title: '사고-행동-관찰 사이클로 외부 도구와 상호작용', content: '' },
          { title: 'Chain-of-Thought의 환각 문제를 외부 정보 검색으로 해결', content: '' },
          { title: '지식 집약적 작업과 의사결정 작업 모두에서 기준선 대비 우수한 성능', content: '' },
          { title: 'LangChain으로 실제 구현 가능', content: '' },
        ],
      },
      {
        slug: 'reflexion',
        title: 'Reflexion',
        titleKr: 'Reflexion',
        sourceUrl: 'https://www.promptingguide.ai/techniques/reflexion',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 3분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/reflexion.png',
        sections: [
          {
            title: '개요',
            content: 'Reflexion은 언어적 피드백을 통해 언어 기반 에이전트를 강화하도록 설계된 프레임워크입니다. 핵심 메커니즘은 환경 피드백을 언어적 자기 성찰로 변환한 뒤, 이후 에이전트 반복 시 컨텍스트로 활용합니다. 이 방식으로 에이전트는 실수에서 배우고 복잡한 작업 성능을 높입니다.',
          },
          {
            title: '프레임워크 구성요소',
            content: 'Reflexion 시스템은 세 가지 모델로 구성됩니다:',
            items: [
              '액터(Actor): 관찰을 바탕으로 텍스트와 행동을 생성하며, Chain-of-Thought와 ReAct 방법론을 사용',
              '평가자(Evaluator): 궤적(trajectory)을 분석하고 보상 점수를 생성해 액터의 출력을 평가',
              '자기 성찰(Self-Reflection): 언어적 강화 신호를 생성하는 LLM 기반 구성요소',
            ],
          },
          {
            title: '프로세스 흐름',
            content: 'Reflexion의 프로세스는 다음 단계를 따릅니다: 작업 정의 → 궤적 생성 → 평가 → 성찰 → 다음 궤적 생성.',
          },
          {
            title: '성능 결과',
            content: '연구 결과 여러 영역에서 상당한 개선을 확인했습니다:',
            items: [
              '의사 결정: ReAct + Reflexion이 AlfWorld 작업 134개 중 130개 완료',
              '추론: HotPotQA에서 기존 접근법 대비 우수한 성능',
              '프로그래밍: HumanEval, MBPP, Leetcode Hard 벤치마크에서 최고 수준 달성',
            ],
          },
          {
            title: '이상적인 사용 사례',
            content: 'Reflexion은 다음 상황에서 가장 효과적입니다:',
            items: [
              '에이전트가 시행착오를 통해 학습해야 할 때',
              '전통적인 강화 학습이 현실적으로 어려울 때',
              '미묘하고 해석 가능한 피드백이 필수일 때',
              '명시적인 에피소드 메모리가 작업에 유용할 때',
            ],
          },
          {
            title: '한계점',
            content: 'Reflexion의 주요 한계점:',
            items: [
              '정확한 자기 평가 능력이 필요함',
              '슬라이딩 윈도우 아키텍처의 메모리 제약',
              '비결정적 함수가 포함된 코드 생성 시 어려움',
            ],
          },
        ],
        keyTakeaways: [
          { title: 'Reflexion은 언어적 자기 성찰을 통해 에이전트를 강화하는 프레임워크', content: '' },
          { title: '액터, 평가자, 자기 성찰 세 가지 구성요소로 이루어짐', content: '' },
          { title: '의사 결정, 추론, 프로그래밍 작업에서 우수한 성능', content: '' },
          { title: '시행착오 학습과 해석 가능한 피드백이 필요한 상황에 적합', content: '' },
        ],
      },
      {
        slug: 'multimodalcot',
        title: 'Multimodal CoT',
        titleKr: '멀티모달 CoT',
        sourceUrl: 'https://www.promptingguide.ai/techniques/multimodalcot',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 2분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/multimodalcot.png',
        sections: [
          {
            title: '개요',
            content: 'Zhang et al. (2023)은 기존 Chain-of-Thought 추론을 확장한 멀티모달 CoT 접근법을 제안했습니다. 언어에만 의존하는 대신, 이 프레임워크는 여러 모달리티(양식)를 함께 처리합니다.',
          },
          {
            title: '핵심 접근법',
            content: '이 방법론은 두 단계로 나뉩니다:',
            items: [
              '근거 생성(Rationale Generation): 텍스트와 이미지 데이터를 결합해 설명적 추론을 만듭니다',
              '답변 추론(Answer Inference): 생성한 근거를 바탕으로 최종 답변을 도출합니다',
            ],
          },
          {
            title: '성능',
            content: '연구에 따르면 "멀티모달 CoT 모델(1B)이 ScienceQA 벤치마크에서 GPT-3.5를 능가"했습니다. 이는 언어만 사용하는 대형 모델 대비 상당한 효율성 향상을 보여줍니다.',
          },
          {
            title: '프레임워크 구조',
            content: '이 접근법은 시각 정보와 언어 정보를 동시에 활용해, 두 모달리티를 모두 이해해야 하는 콘텐츠를 추론합니다. 텍스트 추론 경로에만 집중하는 기존 CoT 방식과 다릅니다.',
          },
          {
            title: '추가 자료',
            content: '이 페이지는 관련 논문 "Language Is Not All You Need: Aligning Perception with Language Models"(2023년 2월)를 참조합니다. 이 논문은 시각적 인식과 언어 모델 기능 사이의 유사한 교차점을 탐구합니다.',
          },
        ],
        keyTakeaways: [
          { title: '멀티모달 CoT는 텍스트와 시각 정보를 결합해 Chain-of-Thought 추론을 확장', content: '' },
          { title: '두 단계 접근법: 근거 생성 → 답변 추론', content: '' },
          { title: '1B 파라미터 모델이 ScienceQA에서 GPT-3.5 능가', content: '' },
          { title: '기존 텍스트 전용 CoT와 달리 여러 모달리티를 처리할 수 있음', content: '' },
        ],
      },
      {
        slug: 'graph',
        title: 'Graph Prompting',
        titleKr: '그래프 프롬프팅',
        sourceUrl: 'https://www.promptingguide.ai/techniques/graph',
        published: true,
        author: 'DAIR.AI',
        readTime: '약 2분',
        cheatsheetImage: '/cheatsheets/prompt-engineering-guide/graph.png',
        sections: [
          {
            title: '개요',
            content: 'GraphPrompts는 Liu et al. (2023)이 소개한 프롬프팅 프레임워크입니다. 그래프 관련 다운스트림 태스크의 성능을 높이는 것이 목표이며, AI 모델을 위한 구조화된 프롬프팅 방법론의 발전을 보여줍니다.',
          },
          {
            title: '현재 상태',
            content: '이 가이드 섹션은 현재 개발 중입니다. 원본 페이지에서 "More coming soon!"이라고 안내합니다.',
          },
          {
            title: '관련 학습 자료',
            content: '다음 학습 자료를 통해 관련 주제를 더 깊이 학습할 수 있습니다:',
            items: [
              'Prompt Engineering for LLMs (초급, 2시간) - Graph 프롬프팅과 고급 기법을 다룹니다',
              'Building Effective AI Agents (중급, 5시간) - Function calling과 도구 통합을 다룹니다',
            ],
          },
          {
            title: '참고 자료',
            content: '관련 연구 및 자료:',
            items: [
              'Liu et al. (2023) - GraphPrompts 연구 논문',
              '원본 가이드: Prompt Engineering Guide - Graph Prompting',
            ],
          },
        ],
        keyTakeaways: [
          { title: 'GraphPrompts는 그래프 관련 작업의 성능을 높이는 프롬프팅 프레임워크', content: '' },
          { title: 'Liu et al. (2023) 연구에서 처음 소개됨', content: '' },
          { title: '현재 가이드 콘텐츠를 확장 중', content: '' },
        ],
      },
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
    cheatsheetImage: '/cheatsheets/week1/how-openai-uses-codex.png',
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

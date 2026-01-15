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
  // 동기부여 섹션 (왜 이 글을 읽어야 하는지)
  motivation?: {
    title: string        // "왜 이 글을 읽어야 할까요?"
    content: string      // 2-3문장 동기부여 설명
    targetAudience?: string[]  // 대상 독자 태그
  }
  sections?: {
    title: string
    content: string
    items?: string[]
    motivation?: string  // 섹션별 동기부여 (1-2문장)
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
  // 동기부여 섹션 (왜 이 글을 읽어야 하는지)
  motivation?: {
    title: string        // "왜 이 글을 읽어야 할까요?"
    content: string      // 2-3문장 동기부여 설명
    targetAudience?: string[]  // 대상 독자 태그
  }
  sections: {
    title: string
    content: string
    items?: string[]
    motivation?: string  // 섹션별 동기부여 (1-2문장)
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
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/pretraining-data.png',
      },
      {
        slug: 'tokenization',
        title: '3. Tokenization',
        titleKr: '3. 토큰화',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=467s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/tokenization.png',
      },
      {
        slug: 'neural-network-io',
        title: '4. Neural Network I/O',
        titleKr: '4. 신경망 입출력',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=867s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/neural-network-io.png',
      },
      {
        slug: 'neural-network-internals',
        title: '5. Neural Network Internals',
        titleKr: '5. 신경망 내부 구조',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=1211s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/neural-network-internals.jpg',
      },
      {
        slug: 'inference',
        title: '6. Inference',
        titleKr: '6. 추론',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=1561s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/inference.png',
      },
      {
        slug: 'gpt2-training-inference',
        title: '7. GPT-2: Training and Inference',
        titleKr: '7. GPT-2: 학습과 추론',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=1869s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/gpt2-training-inference.png',
      },
      {
        slug: 'llama-31-base-model',
        title: '8. Llama 3.1 Base Model Inference',
        titleKr: '8. Llama 3.1 베이스 모델 추론',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=2572s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/llama-31-base-model.png',
      },
      {
        slug: 'pretraining-to-post-training',
        title: '9. Pretraining to Post-Training',
        titleKr: '9. 사전학습에서 후속학습으로',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=3563s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/pretraining-to-post-training.png',
      },
      {
        slug: 'post-training-data',
        title: '10. Post-Training Data (Conversations)',
        titleKr: '10. 후속학습 데이터 (대화)',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=3666s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/post-training-data.png',
      },
      {
        slug: 'hallucinations-tool-use',
        title: '11. Hallucinations, Tool Use, Knowledge/Working Memory',
        titleKr: '11. 환각, 도구 사용, 지식/작업 메모리',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=4832s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/hallucinations-tool-use.png',
      },
      {
        slug: 'knowledge-of-self',
        title: '12. Knowledge of Self',
        titleKr: '12. 자기 인식',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=6106s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/knowledge-of-self.png',
      },
      {
        slug: 'models-need-tokens-to-think',
        title: '13. Models Need Tokens to Think',
        titleKr: '13. 모델은 생각하기 위해 토큰이 필요하다',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=6416s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/models-need-tokens-to-think.png',
      },
      {
        slug: 'tokenization-spelling',
        title: '14. Tokenization Revisited: Models Struggle with Spelling',
        titleKr: '14. 토큰화 재탐구: 철자 처리의 어려움',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=7271s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/tokenization-spelling.png',
      },
      {
        slug: 'jagged-intelligence',
        title: '15. Jagged Intelligence',
        titleKr: '15. 들쭉날쭉한 지능',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=7493s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/jagged-intelligence.png',
      },
      {
        slug: 'sft-to-rl',
        title: '16. Supervised Finetuning to Reinforcement Learning',
        titleKr: '16. 지도학습 미세조정에서 강화학습으로',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=7648s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/sft-to-rl.png',
      },
      {
        slug: 'reinforcement-learning',
        title: '17. Reinforcement Learning',
        titleKr: '17. 강화학습',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=8082s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/reinforcement-learning.png',
      },
      {
        slug: 'deepseek-r1',
        title: '18. DeepSeek-R1',
        titleKr: '18. DeepSeek-R1',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=9467s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/deepseek-r1.png',
      },
      {
        slug: 'alphago',
        title: '19. AlphaGo',
        titleKr: '19. AlphaGo',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=10127s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/alphago.png',
      },
      {
        slug: 'rlhf',
        title: '20. Reinforcement Learning from Human Feedback (RLHF)',
        titleKr: '20. 인간 피드백 강화학습 (RLHF)',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=10906s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/rlhf.png',
      },
      {
        slug: 'preview-of-things-to-come',
        title: '21. Preview of Things to Come',
        titleKr: '21. 미래 전망',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=11379s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/preview-of-things-to-come.png',
      },
      {
        slug: 'keeping-track-of-llms',
        title: '22. Keeping Track of LLMs',
        titleKr: '22. LLM 동향 추적하기',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=11715s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/keeping-track-of-llms.png',
      },
      {
        slug: 'where-to-find-llms',
        title: '23. Where to Find LLMs',
        titleKr: '23. LLM을 찾을 수 있는 곳',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=11914s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/where-to-find-llms.png',
      },
      {
        slug: 'grand-summary',
        title: '24. Grand Summary',
        titleKr: '24. 전체 요약',
        sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=12106s',
        published: true,
        hasMarkdown: true,
        cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/grand-summary.png',
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
          '[모듈 이름을 입력하세요]과 상호작용하는 모듈은 무엇이며, 실패는 어떻게 처리되나요?',
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
  'week1/ai-prompt-engineering-deep-dive': {
    slug: 'ai-prompt-engineering-deep-dive',
    week: 1,
    title: 'AI Prompt Engineering: A Deep Dive',
    titleKr: 'AI 프롬프트 엔지니어링 심층 탐구',
    author: 'Anthropic (Alex Albert, David Hershey, Amanda Askell, Zack Witten)',
    readTime: '약 1시간 17분',
    sourceUrl: 'https://www.youtube.com/watch?v=T9aRN5JkmL8',
    sourceTitle: 'YouTube - AI Prompt Engineering: A Deep Dive',
    published: true,
    isParent: true,
    contentType: 'youtube',
    duration: '1:16:42',
    totalChapters: 11,
    tldr: 'Anthropic의 4명의 전문가(Alex, David, Amanda, Zack)가 프롬프트 엔지니어링의 본질과 실전 기법에 대해 심층 토론합니다. 프롬프트 엔지니어링은 단순히 글을 잘 쓰는 것이 아니라, 시행착오를 통해 모델의 잠재력을 최대한 끌어내는 엔지니어링 과정입니다. 좋은 프롬프트 엔지니어가 되려면 명확한 소통 능력, 반복적 개선 의지, 엣지 케이스를 예측하는 사고력이 필요합니다. 역할 부여(페르소나)보다는 솔직하게 상황을 설명하는 것이 효과적이며, Chain of Thought는 단순한 계산 공간이 아니라 실제로 결과를 개선합니다. 미래에는 모델이 사용자를 인터뷰하여 정보를 끌어내는 방향으로 발전할 것입니다.',
    learningGoals: [
      '프롬프트 엔지니어링의 정의와 "엔지니어링"이라 부르는 이유',
      '좋은 프롬프트 엔지니어의 핵심 역량 3가지',
      '모델에게 역할을 부여하는 것보다 솔직함이 효과적인 이유',
      'Chain of Thought가 실제로 작동하는 원리',
      '엔터프라이즈 vs 연구 vs 일반 채팅 프롬프트의 차이점',
      '프롬프팅 실력을 향상시키는 구체적인 팁',
      '프롬프트 엔지니어링의 과거, 현재, 미래',
    ],
    chapterSummaries: [
      {
        number: 1,
        title: '소개',
        timestamp: '0:00',
        summary: 'Anthropic의 4명의 전문가가 연구, 소비자, 기업 관점에서 프롬프트 엔지니어링에 대해 논의합니다.',
        keyPoints: [
          'Alex: Developer Relations 리드, 전 프롬프트 엔지니어',
          'David: 고객 기술 지원, 파인튜닝 및 시스템 구축',
          'Amanda: 파인튜닝 팀 리드, Claude의 정직함과 친절함 담당',
          'Zack: 프롬프트 엔지니어, 프롬프트 생성기 및 교육 자료 개발',
        ],
      },
      {
        number: 2,
        title: '프롬프트 엔지니어링 정의하기',
        timestamp: '2:05',
        summary: '프롬프트 엔지니어링은 모델의 잠재력을 최대한 끌어내는 것이며, "엔지니어링"은 시행착오와 반복 실험에서 비롯됩니다.',
        keyPoints: [
          '본질은 명확한 소통 - 모델과 대화하는 것은 사람과 대화하는 것과 비슷',
          '리셋 버튼의 존재 - 백지 상태에서 독립적으로 실험 가능',
          '시스템 통합 관점 - 데이터 출처, 지연 시간 트레이드오프 등 고려 필요',
          '프롬프트는 코드처럼 버전 관리와 실험 추적이 필요',
        ],
      },
      {
        number: 3,
        title: '좋은 프롬프트 엔지니어의 조건',
        timestamp: '6:34',
        summary: '좋은 프롬프트 엔지니어에게 필요한 핵심 역량을 논의합니다.',
        keyPoints: [
          '명확한 소통 능력 - 글쓰기 능력보다 개념 설명 능력이 중요',
          '반복 의지 - 15분에 수백 개의 프롬프트를 주고받으며 개선',
          '엣지 케이스 예측 - 전형적 케이스가 아닌 비정상적 케이스를 찾아 테스트',
          '모델 출력 읽기 - "단계별로 생각해"라고 했을 때 실제로 그러는지 확인',
          '가정 분리하기 - 자신이 아는 것과 Claude가 모르는 것 구분',
        ],
      },
      {
        number: 4,
        title: '프롬프트 다듬기',
        timestamp: '12:17',
        summary: '프롬프트를 반복적으로 개선하는 방법과 "Claude plays Pokemon" 사례를 통한 한계 탐색 경험을 공유합니다.',
        keyPoints: [
          '모델에게 프롬프트의 불명확한 부분을 물어보기',
          '모델이 실수했을 때 "왜 틀렸는지" 물어보고 수정 요청하기',
          '모델을 신뢰하기보다 반복적으로 테스트하기',
          '한계에 도달했을 때 다음 모델을 기다리는 판단도 필요',
          '이미지 프롬프팅은 텍스트와 다른 직관이 필요함',
        ],
      },
      {
        number: 5,
        title: '정직함, 페르소나, 은유',
        timestamp: '24:27',
        summary: '모델에게 역할을 부여하는 것보다 솔직하게 상황을 설명하는 것이 더 효과적인 이유를 설명합니다.',
        keyPoints: [
          '역할 부여(페르소나)는 예전 모델에서 더 효과적이었음',
          '현재 모델에게는 거짓말보다 솔직한 설명이 낫다',
          '"파견 회사에서 온 유능한 사람" 비유 - 맥락 없지만 능력 있는 사람에게 설명하듯',
          'pretrained model과 RLHF model에 대한 직관이 다름',
          '실제 작업을 직접 설명하는 것이 가장 효과적',
        ],
      },
      {
        number: 6,
        title: '모델의 추론',
        timestamp: '37:12',
        summary: 'Chain of Thought가 실제로 효과가 있는지, 단순한 계산 공간인지 논의합니다.',
        keyPoints: [
          'Chain of Thought는 확실히 결과를 개선함',
          '단순히 토큰을 더 생성하는 것(예: "음", "아" 반복)은 효과 없음',
          '추론을 구조화하고 예시를 제공하면 더 효과적',
          '이야기를 쓰게 하는 것보다 추론이 더 효과적',
          '철학적 "추론"인지 여부와 관계없이 실용적으로 작동함',
        ],
      },
      {
        number: 7,
        title: '엔터프라이즈 vs 연구 vs 일반 채팅 프롬프트',
        timestamp: '45:18',
        summary: '세 가지 유형의 프롬프트 작성 방식 차이를 비교합니다.',
        keyPoints: [
          '연구용: 다양성과 유연성 추구, 예시를 적게 사용',
          '엔터프라이즈: 신뢰성과 일관성 중시, 예시를 많이 사용',
          '연구용 예시는 실제 데이터와 의도적으로 다르게 (설명적 예시)',
          '일반 채팅: 한 번 성공하면 끝',
          '엔터프라이즈: 백만 번 성공해야 함 - 전체 입력 범위 테스트 필요',
        ],
      },
      {
        number: 8,
        title: '프롬프팅 실력 향상 팁',
        timestamp: '50:52',
        summary: '각 전문가가 프롬프팅 실력 향상을 위한 한 가지 팁을 공유합니다.',
        keyPoints: [
          'Zack: 좋은 프롬프트와 모델 출력을 읽고 분석하기',
          'Amanda: 반복하고, 다른 사람에게 보여주고, 즐기기',
          'David: 모델이 못할 것 같은 가장 어려운 것에 도전하기',
          '쉬운 것은 프롬프트 엔지니어가 필요 없음',
          '실패해도 모델 작동 방식에 대해 많이 배움',
        ],
      },
      {
        number: 9,
        title: '탈옥(Jailbreaking)',
        timestamp: '53:56',
        summary: 'Jailbreak 프롬프트가 내부적으로 어떻게 작동하는지 탐구합니다.',
        keyPoints: [
          'Jailbreak는 모델의 경계와 한계를 탐색하는 것',
          'Out of distribution - 훈련 데이터에서 벗어난 입력 제공',
          '다국어 우회 - 그리스어로 응답 후 영어 번역 요청',
          '시스템 이해 + 사회공학의 조합',
          '텍스트 예측 방식, 추론 반응성 등을 활용',
        ],
      },
      {
        number: 10,
        title: '프롬프트 엔지니어링의 진화',
        timestamp: '56:51',
        summary: '지난 3년간 프롬프트 엔지니어링이 어떻게 변화했는지 논의합니다.',
        keyPoints: [
          '좋은 핵/트릭은 모델에 훈련되어 불필요해짐',
          '수학에서 "단계별로 생각해"는 이제 기본 내장',
          '모델에 더 많은 맥락과 정보를 신뢰하며 제공하게 됨',
          '논문을 직접 주고 "이거 읽고 예시 17개 만들어"라고 요청',
          '복잡성을 숨기기보다 모델을 존중하고 신뢰하기',
        ],
      },
      {
        number: 11,
        title: '프롬프트 엔지니어링의 미래',
        timestamp: '64:34',
        summary: '프롬프트 엔지니어링의 미래와 모델이 사용자를 인터뷰하는 방향으로의 전환을 예측합니다.',
        keyPoints: [
          '정보 이론적 관점 - 목표 명시는 항상 필요함',
          'Claude가 사용자를 인터뷰하여 정보를 끌어내는 방향',
          '"파견 회사 직원"에서 "전문 디자이너"로 관계 전환',
          '메타 프롬프트 활용 증가',
          '핵심 요약: "뇌를 외재화하라" - 합리적인 사람에게 설명하듯 작성',
        ],
      },
    ],
    sections: [
      {
        title: '개요',
        content:
          'Anthropic의 프롬프트 엔지니어링 전문가 4명(Alex, David, Amanda, Zack)이 프롬프트 엔지니어링의 본질, 실전 기법, 그리고 미래에 대해 심층 토론합니다. 총 11개의 챕터로 구성되어 있으며, 약 1시간 17분 분량입니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '프롬프트 엔지니어링 정의',
        content: '모델의 잠재력을 최대한 끌어내는 시행착오 과정',
      },
      {
        title: '좋은 프롬프트 엔지니어',
        content: '명확한 소통 + 반복 의지 + 엣지 케이스 예측',
      },
      {
        title: '역할 vs 솔직함',
        content: '현재 모델에게는 솔직하게 상황 설명이 더 효과적',
      },
      {
        title: 'Chain of Thought',
        content: '단순한 계산 공간이 아닌, 실제 결과를 개선하는 추론',
      },
      {
        title: '프롬프트 유형 차이',
        content: '연구(다양성) vs 엔터프라이즈(신뢰성) vs 채팅(일회성)',
      },
      {
        title: '실력 향상 팁',
        content: '경계 밀어붙이기, 출력 읽기, 반복, 즐기기',
      },
      {
        title: '미래 방향',
        content: '모델이 사용자를 인터뷰하여 정보 끌어내기',
      },
      {
        title: '궁극적 핵심',
        content: '"뇌를 외재화하라" - 합리적인 사람에게 설명하듯 작성',
      },
    ],
    relatedReadings: [
      { title: 'Deep Dive into LLMs', slug: 'deep-dive-llms' },
      { title: 'Prompt Engineering Guide', slug: 'prompt-engineering-guide' },
      { title: 'How OpenAI Uses Codex', slug: 'how-openai-uses-codex' },
    ],
    children: [
      {
        slug: 'introduction',
        title: '1. Introduction',
        titleKr: '1. 소개',
        sourceUrl: 'https://www.youtube.com/watch?v=T9aRN5JkmL8&t=0s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'defining-prompt-engineering',
        title: '2. Defining prompt engineering',
        titleKr: '2. 프롬프트 엔지니어링 정의하기',
        sourceUrl: 'https://www.youtube.com/watch?v=T9aRN5JkmL8&t=125s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'what-makes-good-prompt-engineer',
        title: '3. What makes a good prompt engineer',
        titleKr: '3. 좋은 프롬프트 엔지니어의 조건',
        sourceUrl: 'https://www.youtube.com/watch?v=T9aRN5JkmL8&t=394s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'refining-prompts',
        title: '4. Refining prompts',
        titleKr: '4. 프롬프트 다듬기',
        sourceUrl: 'https://www.youtube.com/watch?v=T9aRN5JkmL8&t=737s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'honesty-personas-metaphors',
        title: '5. Honesty, personas and metaphors in prompts',
        titleKr: '5. 정직함, 페르소나, 은유',
        sourceUrl: 'https://www.youtube.com/watch?v=T9aRN5JkmL8&t=1467s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'model-reasoning',
        title: '6. Model reasoning',
        titleKr: '6. 모델의 추론',
        sourceUrl: 'https://www.youtube.com/watch?v=T9aRN5JkmL8&t=2232s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'enterprise-vs-research-vs-chat',
        title: '7. Enterprise vs research vs general chat prompts',
        titleKr: '7. 엔터프라이즈 vs 연구 vs 일반 채팅 프롬프트',
        sourceUrl: 'https://www.youtube.com/watch?v=T9aRN5JkmL8&t=2718s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'tips-to-improve-prompting',
        title: '8. Tips to improve prompting skills',
        titleKr: '8. 프롬프팅 실력 향상 팁',
        sourceUrl: 'https://www.youtube.com/watch?v=T9aRN5JkmL8&t=3052s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'jailbreaking',
        title: '9. Jailbreaking',
        titleKr: '9. 탈옥(Jailbreaking)',
        sourceUrl: 'https://www.youtube.com/watch?v=T9aRN5JkmL8&t=3236s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'evolution-of-prompt-engineering',
        title: '10. Evolution of prompt engineering',
        titleKr: '10. 프롬프트 엔지니어링의 진화',
        sourceUrl: 'https://www.youtube.com/watch?v=T9aRN5JkmL8&t=3411s',
        published: true,
        hasMarkdown: true,
      },
      {
        slug: 'future-of-prompt-engineering',
        title: '11. Future of prompt engineering',
        titleKr: '11. 프롬프트 엔지니어링의 미래',
        sourceUrl: 'https://www.youtube.com/watch?v=T9aRN5JkmL8&t=3874s',
        published: true,
        hasMarkdown: true,
      },
    ],
  },
  'week5/warp-vs-claude-code': {
    slug: 'warp-vs-claude-code',
    week: 5,
    title: 'Warp vs Claude Code',
    titleKr: 'Warp vs Claude Code',
    author: 'Warp',
    readTime: '약 2분',
    sourceUrl: 'https://www.warp.dev/university/getting-started/warp-vs-claude-code',
    sourceTitle: 'Warp University',
    published: true,
    sections: [
      {
        title: '개요',
        content:
          '이 페이지에서는 Claude Code CLI와 Warp의 내장 코딩 에이전트를 비교하는 영상을 제공합니다.',
      },
      {
        title: '비교 항목',
        content: '영상에서 다루는 비교 항목들입니다.',
        items: [
          '파일 작업 및 코드 관리',
          '코드 diff 및 변경 사항 시각화',
          '컨텍스트 수집 기능',
          '모델 선택 옵션',
          '설정 구성',
        ],
      },
      {
        title: '성능 비교',
        content:
          'Sentry 이슈 테스트에서 두 도구 모두 비슷한 완료 시간(2~4분)을 보였으며, 각각 근본적인 문제를 성공적으로 파악하고 해결했습니다.',
      },
      {
        title: '주요 차이점',
        content: '두 도구의 핵심적인 차별점입니다.',
        items: [
          'Claude Code 강점: 터미널 중심 워크플로우, 서브 에이전트 기능',
          'Warp 장점: 내장 파일 트리, diff 편집 기능, GPT-5를 포함한 다중 모델 지원',
        ],
      },
    ],
    keyTakeaways: [
      {
        title: '두 도구 모두 실용적',
        content: 'Sentry 이슈 테스트에서 2~4분 내 문제 해결 가능',
      },
      {
        title: 'Claude Code',
        content: '터미널 중심 워크플로우와 서브 에이전트에 강점',
      },
      {
        title: 'Warp',
        content: '시각적 UI와 다중 모델 지원에 강점',
      },
    ],
  },
'week4/how-anthropic-uses-claude-code': {
    slug: 'how-anthropic-uses-claude-code',
    week: 4,
    title: 'How Anthropic Teams Use Claude Code',
    titleKr: 'Anthropic 팀들이 Claude Code를 활용하는 방법',
    author: 'Anthropic',
    readTime: '약 25분',
    sourceUrl: 'https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf',
    sourceTitle: 'Anthropic PDF',
    published: true,
    contentType: 'pdf',
    sections: [
      {
        title: '개요',
        content:
          'Anthropic 내부 팀들이 Claude Code로 업무 방식을 혁신하고 있습니다. 개발자와 비기술 직원 모두 복잡한 프로젝트를 수행하고, 작업을 자동화하며, 그동안 생산성을 제한했던 기술 격차를 해소할 수 있게 되었습니다. Claude Code 파워 유저들과 인터뷰를 통해 각 부서의 Claude Code 활용법, 업무에 미친 영향, 도입을 고려하는 다른 조직을 위한 팁을 수집했습니다.',
      },
      {
        title: '데이터 인프라 팀의 Claude Code 활용',
        content:
          '데이터 인프라 팀은 회사 전체 팀을 위한 모든 비즈니스 데이터를 조직합니다. Claude Code로 일상적인 데이터 엔지니어링 작업을 자동화하고, 복잡한 인프라 문제를 해결하며, 기술/비기술 팀원 모두가 독립적으로 데이터에 접근하고 조작할 수 있는 문서화된 워크플로우를 만듭니다.',
        items: [
          '스크린샷을 활용한 쿠버네티스 디버깅 - 대시보드 스크린샷으로 파드 IP 주소 고갈 문제 해결',
          '재무팀을 위한 일반 텍스트 워크플로우 - 코딩 없이 데이터 워크플로우 자동화',
          '신입 사원을 위한 코드베이스 탐색 - Claude.md 파일로 온보딩 가속화',
          '세션 종료 시 문서 업데이트 - 지속적 개선 루프 생성',
          '여러 인스턴스에서 병렬 작업 관리 - 컨텍스트 손실 없는 병렬 워크플로우',
        ],
      },
      {
        title: '제품 개발 팀의 Claude Code 활용',
        content:
          'Claude Code 팀은 자체 제품을 사용해 Claude Code 업데이트를 구축하고, 제품의 엔터프라이즈 기능과 에이전틱 루프 기능을 확장합니다.',
        items: [
          '자동 승인 모드를 활용한 빠른 프로토타이핑 - 80% 완성된 솔루션 검토 후 최종 다듬기',
          '핵심 기능을 위한 동기식 코딩 - 비즈니스 로직에는 상세한 프롬프트와 실시간 모니터링',
          'Vim 모드 구축 - 약 70%가 Claude의 자율 작업에서 나옴',
          '테스트 생성 및 버그 수정 - GitHub Actions 통합으로 PR 코멘트 자동 처리',
          '코드베이스 탐색 - Slack 대기 없이 직접 설명과 코드 참조 요청',
        ],
      },
      {
        title: '보안 엔지니어링 팀의 Claude Code 활용',
        content:
          '보안 엔지니어링 팀은 소프트웨어 개발 라이프사이클 보안, 공급망 보안, 개발 환경 보안에 집중합니다. 인시던트 해결 시간이 10-15분에서 약 5분으로 단축되었습니다.',
        items: [
          '복잡한 인프라 디버깅 - 스택 트레이스로 제어 흐름 추적',
          'Terraform 코드 리뷰 및 분석 - 보안 승인을 위한 빠른 검토',
          '문서 종합 및 런북 - 여러 소스에서 마크다운 가이드 생성',
          '테스트 주도 개발 워크플로우 - 더 안정적이고 테스트 가능한 코드',
          '컨텍스트 전환 및 프로젝트 온보딩 - 며칠 만에 의미 있는 기여',
        ],
      },
      {
        title: '추론(Inference) 팀의 Claude Code 활용',
        content:
          '추론 팀은 Claude가 프롬프트를 읽고 응답을 생성하는 동안 정보를 저장하는 메모리 시스템을 관리합니다. 머신러닝 리서치 시간이 80% 감소했습니다.',
        items: [
          '코드베이스 이해 및 온보딩 - 몇 초 만에 관련 파일 찾기',
          '엣지 케이스를 포함한 유닛 테스트 생성 - 정신적 에너지 절약',
          '머신러닝 개념 설명 - 한 시간 걸리던 것이 10-20분으로',
          '언어 간 코드 번역 - 새 언어 배우지 않고 테스트',
          '명령어 기억 및 쿠버네티스 관리 - 정확한 구문 즉시 획득',
        ],
      },
      {
        title: '데이터 사이언스 및 시각화 팀의 Claude Code 활용',
        content:
          '모델 성능을 이해하기 위한 정교한 시각화 도구가 필요하지만, 이러한 도구를 만들려면 익숙하지 않은 언어와 프레임워크 전문 지식이 필요합니다. Claude Code로 풀스택 개발자가 되지 않고도 프로덕션 품질의 분석 대시보드를 구축합니다.',
        items: [
          'JavaScript/TypeScript 대시보드 앱 구축 - 5,000줄짜리 TypeScript 앱도 가능',
          '반복적인 리팩토링 작업 처리 - 슬롯머신처럼 사용',
          '일회성 노트북 대신 영구적 분석 도구 생성 - React 대시보드',
          '의존성 없는 작업 위임 - 전문 분야 밖에서도 생산성',
        ],
      },
      {
        title: 'API 팀의 Claude Code 활용',
        content:
          'API 지식 팀은 PDF 지원, 인용, 웹 검색 같은 추가 지식을 Claude의 컨텍스트 윈도우로 가져오는 기능을 담당합니다. Claude Code는 시스템 아키텍처를 이해하고, 관련 파일을 식별하고, 복잡한 상호작용을 설명하는 가이드 역할을 합니다.',
        items: [
          '첫 단계 워크플로우 계획 - 모든 작업의 첫 번째 정거장',
          '코드베이스 전반에서 독립적 디버깅 - 도움 요청 없이 버그 해결',
          '독푸딩을 통한 모델 반복 테스트 - 최신 모델 스냅샷 경험',
          '컨텍스트 전환 오버헤드 제거 - 정신적 오버헤드 감소',
        ],
      },
      {
        title: '그로스 마케팅 팀의 Claude Code 활용',
        content:
          '유료 검색, 유료 소셜, 모바일 앱 스토어, 이메일 마케팅, SEO 전반에 걸쳐 퍼포먼스 마케팅 채널을 구축합니다. 한 명으로 구성된 비기술 팀으로서 Claude Code로 반복적인 마케팅 작업을 자동화합니다.',
        items: [
          '자동화된 Google Ads 크리에이티브 생성 - 수백 개의 새 광고를 몇 분 만에',
          '대량 크리에이티브 제작을 위한 Figma 플러그인 - 최대 100개 광고 변형 생성',
          '캠페인 분석을 위한 Meta Ads MCP 서버 - 플랫폼 간 전환 불필요',
          '메모리 시스템을 활용한 고급 프롬프트 엔지니어링 - 자기 개선 테스트 프레임워크',
        ],
      },
      {
        title: '제품 디자인 팀의 Claude Code 활용',
        content:
          'Claude Code, Claude.ai, Anthropic API를 지원하며 AI 제품 구축을 전문으로 합니다. 비개발자도 Claude Code로 디자인과 엔지니어링 사이의 전통적인 격차를 해소합니다.',
        items: [
          '프론트엔드 폴리싱 및 상태 관리 변경 - 디자이너가 직접 구현',
          'GitHub Actions 자동 티켓팅 - 이슈 제출만으로 자동 코드 제안',
          '빠른 인터랙티브 프로토타이핑 - 목업 이미지에서 기능하는 프로토타입',
          '엣지 케이스 발견 및 시스템 아키텍처 이해 - 디자인 단계에서 식별',
          '복잡한 카피 변경 및 법적 준수 - 일주일 대신 30분짜리 통화 두 번',
        ],
      },
      {
        title: 'RL 엔지니어링 팀의 Claude Code 활용',
        content:
          'RL 엔지니어링 팀은 강화학습의 효율적인 샘플링과 클러스터 전반의 가중치 전송에 집중합니다. 잦은 체크포인트와 롤백을 포함하는 반복적 접근 방식을 취합니다.',
        items: [
          '감독 하 자율성으로 기능 개발 - Claude가 주도하되 방향 조정',
          '테스트 생성 및 코드 리뷰 - 자동화된 품질 보증',
          '디버깅 및 오류 조사 - 때로는 즉시 식별, 때로는 어려움',
          '코드베이스 이해 및 콜 스택 분석 - 빠른 요약 획득',
          '쿠버네티스 운영 안내 - 구글 검색 대체',
        ],
      },
      {
        title: '법무 팀의 Claude Code 활용',
        content:
          '법무 팀은 실험과 Anthropic 제품 제공에 대해 배우려는 욕구를 통해 Claude Code의 잠재력을 발견했습니다. 가족을 위한 접근성 도구 제작 등 개인적인 활용 사례도 있습니다.',
        items: [
          '가족을 위한 맞춤 접근성 솔루션 - 단 한 시간 만에 커뮤니케이션 보조 도구 제작',
          '법무 부서 워크플로우 자동화 - 전화 트리 시스템 프로토타입',
          '팀 조율 도구 - G Suite 애플리케이션으로 주간 업데이트 자동화',
          '솔루션 검증을 위한 빠른 프로토타이핑 - 도메인 전문가에게 시연',
        ],
      },
    ],
    keyTakeaways: [
      {
        title: '데이터 인프라',
        content:
          'Claude.md 파일 문서화가 성능의 핵심, MCP 서버로 보안 통제, 팀 간 워크플로우 공유로 모범 사례 전파',
      },
      {
        title: '제품 개발',
        content:
          '자동 승인 모드로 빠른 프로토타이핑, 핵심 기능은 동기식 감독, 테스트 우선 생성으로 자기 충족적 루프 구축',
      },
      {
        title: '보안 엔지니어링',
        content:
          '커스텀 슬래시 명령어 적극 활용, Claude가 자율적으로 작업 후 주기적 확인, 문서화에도 활용',
      },
      {
        title: '추론',
        content:
          'ML 개념 리서치 시간 80% 감소, 유닛 테스트 자동 생성으로 정신적 부담 경감',
      },
      {
        title: '데이터 사이언스',
        content:
          '슬롯머신 접근법(저장-실행-수락/재시작), 복잡한 솔루션 요청 시 단순화 요구',
      },
      {
        title: 'API',
        content:
          '협력적 파트너로 접근, 익숙하지 않은 영역에서 자신감 구축, 최소 정보로 시작',
      },
      {
        title: '그로스 마케팅',
        content:
          'API 지원 반복 작업 식별, 복잡한 워크플로우를 서브 에이전트로 분리, 사전 브레인스토밍 중요',
      },
      {
        title: '제품 디자인',
        content:
          '엔지니어 도움으로 초기 설정, 커스텀 메모리 파일로 동작 안내, 이미지 붙여넣기로 프로토타이핑',
      },
      {
        title: 'RL 엔지니어링',
        content:
          'Claude.md에 특정 패턴 추가, 체크포인트 중심 워크플로우, 한 번에 시도 후 협업',
      },
      {
        title: '법무',
        content:
          'Claude.ai에서 계획 후 Claude Code에서 구축, 시각 우선 접근, 불완전해도 프로토타입 공유',
      },
    ],
  },
  'week4/claude-code-best-practices': {
    slug: 'claude-code-best-practices',
    week: 4,
    title: 'Claude Code: Best Practices for Agentic Coding',
    titleKr: 'Claude Code: 에이전틱 코딩 모범 사례',
    author: 'Boris Cherny',
    readTime: '약 17분',
    sourceUrl: 'https://www.anthropic.com/engineering/claude-code-best-practices',
    sourceTitle: 'Anthropic Engineering Blog',
    published: true,
    sections: [
      {
        title: '소개',
        content:
          'Claude Code는 에이전틱 코딩을 위한 커맨드라인 도구입니다. 의도적으로 로우 레벨이며 특정 워크플로우를 강제하지 않으면서 모델에 거의 직접 접근할 수 있습니다. 이 설계 철학 덕분에 유연하고, 커스터마이징 가능하며, 스크립팅이 가능하고, 안전한 파워 툴이 탄생했습니다. 이 글에서는 Anthropic 내부 팀과 외부 엔지니어들이 효과적이라고 검증한 일반적인 패턴을 설명합니다.',
      },
      {
        title: '1. 설정 커스터마이징',
        content:
          'Claude Code는 프롬프트에 자동으로 컨텍스트를 가져오는 에이전틱 코딩 어시스턴트입니다. 이 컨텍스트 수집은 시간과 토큰을 소비하지만, 환경 튜닝으로 최적화할 수 있습니다.',
        items: [
          'CLAUDE.md 파일 생성: 자주 쓰는 bash 명령어, 코드 스타일 가이드라인, 테스팅 지침 등을 문서화',
          'CLAUDE.md 튜닝: 프롬프트처럼 다듬고, # 키로 지침 추가, 프롬프트 개선기 활용',
          '허용 도구 목록 관리: /permissions 명령어나 설정 파일로 안전한 도구 허용',
          'gh CLI 설치: GitHub 이슈 생성, PR 열기, 코멘트 읽기 등 GitHub 상호작용 지원',
        ],
      },
      {
        title: '2. Claude에게 더 많은 도구 제공하기',
        content:
          'Claude는 여러분의 쉘 환경에 접근할 수 있어서 편의 스크립트와 함수 세트를 구축해 줄 수 있습니다. MCP와 REST API를 통해 더 복잡한 도구도 활용할 수 있습니다.',
        items: [
          'bash 도구: Claude는 unix 도구와 gh 같은 유틸리티를 알지만, 커스텀 도구는 CLAUDE.md에 문서화 필요',
          'MCP 서버: 프로젝트/전역 설정 또는 .mcp.json으로 여러 MCP 서버에 연결 가능',
          '커스텀 슬래시 명령어: .claude/commands 폴더에 프롬프트 템플릿 저장, $ARGUMENTS로 매개변수 전달',
        ],
      },
      {
        title: '3. 일반적인 워크플로우',
        content:
          'Claude Code는 특정 워크플로우를 강제하지 않아 원하는 대로 사용할 수 있습니다. 사용자 커뮤니티 전반에서 효과적으로 사용하는 여러 성공적인 패턴이 있습니다.',
        items: [
          '탐색-계획-코딩-커밋: 관련 파일 읽기 → 계획 세우기(think/ultrathink) → 구현 → 커밋/PR',
          'TDD 워크플로우: 테스트 작성 → 실패 확인 → 커밋 → 코드 작성하여 통과시키기 → 커밋',
          '시각적 반복: 스크린샷 제공 → 목업 제공 → 구현 후 스크린샷 비교 → 반복',
          'Safe YOLO 모드: --dangerously-skip-permissions로 중단 없이 작업 (컨테이너 권장)',
          '코드베이스 Q&A: 새 코드베이스 온보딩 시 학습과 탐색에 활용',
          'git/GitHub 상호작용: 히스토리 검색, 커밋 메시지 작성, 리베이스 충돌 해결, PR 생성',
        ],
      },
      {
        title: '4. 워크플로우 최적화',
        content: '모든 워크플로우에 적용되는 최적화 기법들입니다.',
        items: [
          '구체적인 지침 제시: 상세한 지침이 첫 시도 성공률을 크게 향상시킴',
          '이미지 제공: 스크린샷 붙여넣기, 드래그 앤 드롭, 파일 경로로 시각 자료 활용',
          '파일/URL 언급: 탭 완성으로 파일이나 폴더를 빠르게 참조',
          '일찍 방향 수정: Escape로 중단, 히스토리로 돌아가기, 변경 사항 되돌리기',
          '/clear로 컨텍스트 리셋: 작업 간에 컨텍스트 윈도우 정리',
          '체크리스트와 스크래치패드: 마크다운 파일로 대규모 작업 추적',
        ],
      },
      {
        title: '5. 헤드리스 모드 자동화',
        content:
          'Claude Code는 CI, pre-commit 훅, 빌드 스크립트, 자동화 같은 비대화형 컨텍스트를 위한 헤드리스 모드를 포함합니다. -p 플래그와 프롬프트로 헤드리스 모드를 활성화하고, --output-format stream-json으로 스트리밍 JSON 출력을 받으세요.',
        items: [
          '이슈 트리아지: GitHub 이벤트에 의해 트리거되는 자동화로 새 이슈 검사 및 레이블 할당',
          '주관적 코드 리뷰: 오타, 오래된 주석, 오해의 소지가 있는 함수명 등 식별',
        ],
      },
      {
        title: '6. 멀티 Claude 워크플로우',
        content:
          '단독 사용을 넘어, 가장 강력한 응용 중 일부는 여러 Claude 인스턴스를 병렬로 실행하는 것입니다.',
        items: [
          '작성/검증 분리: 한 Claude가 코드 작성, 다른 Claude가 리뷰 또는 테스트',
          '여러 체크아웃: 3-4개의 git 체크아웃을 별도 터미널에서 각각 다른 작업 수행',
          'git 워크트리: 동일 저장소에서 여러 브랜치를 별도 디렉토리로 체크아웃하여 병렬 작업',
          '헤드리스 팬아웃: 대규모 마이그레이션이나 분석을 위해 여러 Claude 호출을 병렬 실행',
        ],
      },
    ],
    keyTakeaways: [
      {
        title: 'CLAUDE.md 파일 활용',
        content:
          '프로젝트별 컨텍스트, 명령어, 스타일 가이드를 Claude가 자동으로 참조하도록 설정합니다.',
      },
      {
        title: '도구 확장',
        content: 'bash 도구, MCP 서버, 커스텀 슬래시 명령어로 Claude의 기능을 확장할 수 있습니다.',
      },
      {
        title: '효과적인 워크플로우',
        content: '탐색→계획→코딩→커밋 또는 TDD 방식의 체계적 접근이 권장됩니다.',
      },
      {
        title: '구체적인 지침',
        content: '명확하고 상세한 지침이 첫 시도 성공률을 크게 높입니다.',
      },
      {
        title: '멀티 Claude 활용',
        content: '여러 Claude 인스턴스로 작성/리뷰 분리, git 워크트리로 병렬 작업이 가능합니다.',
      },
      {
        title: '헤드리스 모드 자동화',
        content: 'CI/CD, 이슈 트리아지, 대규모 마이그레이션 등에 프로그래밍 방식으로 활용합니다.',
      },
    ],
  },
  'week4/good-context-good-code': {
    slug: 'good-context-good-code',
    week: 4,
    title: 'Good Context Leads to Good Code',
    titleKr: '좋은 컨텍스트가 좋은 코드를 만든다',
    author: 'Justin M Berman',
    readTime: '약 9분',
    sourceUrl: 'https://blog.stockapp.com/good-context-good-code/',
    sourceTitle: 'StockApp Engineering Blog',
    published: true,
    sections: [
      {
        title: '개요',
        content:
          'StockApp이 AI 협업을 중심으로 개발 프로세스를 설계하여 수동 개발 대비 약 2.5배의 생산성 향상을 달성한 방법을 소개합니다.',
      },
      {
        title: '다섯 가지 핵심 원칙',
        content: 'AI 네이티브 엔지니어링 문화의 핵심 원칙입니다.',
        items: [
          '공유 작업 공간으로서의 모노레포',
          '점진적 컨텍스트를 활용한 계층적 개발',
          '에이전트의 전면적 활용',
          'MCP 서버와 커맨드라인 통합',
          '앙상블 접근법이 개별 에이전트를 능가',
        ],
      },
    ],
    keyTakeaways: [
      {
        title: '컨텍스트가 핵심',
        content: '인간과 AI 에이전트가 체계적으로 컨텍스트를 구축하고 공유할 때 우수한 소프트웨어가 탄생합니다.',
      },
      {
        title: '생산성 지표',
        content: '개발자당 주간 10.6개 PR 달성 (업계 표준 약 1개 대비).',
      },
      {
        title: '더 많은 전문성 필요',
        content: 'AI 네이티브 개발은 더 적은 것이 아니라 더 많은 엔지니어링 전문성을 요구합니다.',
      },
    ],
  },
  'week3/writing-effective-tools-for-agents': {
    slug: 'writing-effective-tools-for-agents',
    week: 3,
    title: 'Writing Effective Tools for Agents',
    titleKr: '에이전트를 위한 효과적인 도구 작성법',
    author: 'Ken Aizawa',
    readTime: '약 5분',
    sourceUrl: 'https://www.anthropic.com/engineering/writing-tools-for-agents',
    sourceTitle: 'Anthropic Engineering Blog',
    published: true,
    sections: [
      {
        title: '요약',
        content:
          '이 엔지니어링 문서는 AI 에이전트를 위한 고품질 도구 구축의 모범 사례를 탐구합니다. Claude가 반복적인 평가와 개선을 통해 도구를 어떻게 최적화하는지 보여줍니다.',
      },
      {
        title: '도구란 무엇인가?',
        content:
          '도구는 새로운 소프트웨어 패러다임입니다—결정론적 시스템과 비결정론적 에이전트 사이의 계약입니다. `getWeather("NYC")`가 항상 동일하게 동작하는 기존 API와 달리, 에이전트는 날씨 도구를 호출할 수도, 일반 지식을 활용할 수도, 명확화 질문을 던질 수도 있습니다. 이런 예측 불가능성 때문에 기존 소프트웨어 패턴이 아닌 에이전트 어포던스에 맞춘 도구 설계가 필요합니다.',
      },
      {
        title: '도구 작성 방법',
        content:
          'Claude Code로 빠른 프로토타입부터 시작하세요. 도구가 의존하는 라이브러리와 API 문서를 제공하세요. 도구를 로컬 MCP 서버나 데스크톱 확장으로 감싸면 Claude Code나 Claude Desktop 앱에서 대화형으로 테스트할 수 있습니다. 여러 번의 도구 호출이 필요한 현실적인 평가 작업을 만들고, 정확도, 실행 시간, 토큰 소비량, 도구 오류 등 지표를 수집하세요. 평가 기록을 검토하여 에이전트가 어려움을 겪는 부분을 파악하세요.',
      },
      {
        title: '적절한 도구 선택',
        content:
          '도구가 많다고 결과가 좋아지지는 않습니다. 에이전트는 기존 소프트웨어와 다른 어포던스를 가집니다—컴퓨터 메모리는 풍부하지만 에이전트 컨텍스트는 제한적입니다. `list_contacts`를 구현하는 대신 사람이 검색하는 방식에 맞는 `search_contacts` 도구를 만드세요.',
        items: [
          '`list_users`, `list_events`, `create_event` 대신 가용성을 확인하는 `schedule_event` 구현',
          '`read_logs` 대신 컨텍스트와 함께 관련 라인을 반환하는 `search_logs` 구현',
          '별도의 고객 도구들 대신 모든 관련 정보를 모아주는 `get_customer_context` 구현',
        ],
      },
      {
        title: '도구 네임스페이싱',
        content:
          '`asana_projects_search`와 `asana_users_search`처럼 공통 접두사로 관련 도구를 그룹화하면 에이전트가 적절한 도구를 선택하기 쉽습니다. 접두사 기반과 접미사 기반 네이밍은 평가에서 측정 가능한 차이를 만들어냅니다.',
      },
      {
        title: '의미 있는 컨텍스트 반환',
        content:
          '유연성보다 관련성을 우선시하여 신호가 높은 정보만 반환하세요. `uuid`나 `mime_type` 같은 저수준 식별자 대신 `name`, `image_url`, `file_type`을 사용하세요. 시맨틱 식별자가 환각을 크게 줄입니다. 에이전트가 상세도를 조절할 수 있도록 `response_format` enum 파라미터를 노출하세요.',
      },
      {
        title: '토큰 효율성을 위한 도구 응답 최적화',
        content:
          '합리적인 기본값과 함께 페이지네이션, 범위 선택, 필터링, 잘라내기를 구현하세요. Claude Code는 기본적으로 도구 응답을 25,000 토큰으로 제한합니다. 잘라낼 때는 에이전트를 효율적인 전략으로 안내하세요. 도움이 되지 않는 오류 메시지를 올바른 입력 형식을 보여주는 실행 가능한 안내로 바꾸세요.',
      },
      {
        title: '도구 설명에 프롬프트 엔지니어링 적용',
        content:
          '새 팀원에게 설명하듯 도구를 설명하고, 암묵적 컨텍스트를 명시적으로 만드세요. 모호하지 않은 파라미터 이름을 사용하세요: `user` 대신 `user_id`. 작은 개선이 극적인 향상을 가져옵니다—Claude Sonnet은 정밀한 도구 설명 개선 후 SWE-bench Verified에서 최고 성능을 달성했습니다.',
      },
      {
        title: '앞으로의 전망',
        content:
          '효과적인 도구는 의도적으로 정의되고, 에이전트 컨텍스트를 현명하게 사용하며, 다양한 워크플로우에서 잘 결합되고, 직관적인 실제 문제 해결을 가능하게 합니다. 에이전트가 더 유능해질수록, 체계적인 평가 기반 접근 방식이 도구가 에이전트와 함께 진화하도록 보장합니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '도구의 새로운 정의',
        content:
          '도구는 결정론적 시스템과 비결정론적 에이전트 사이의 계약이다. 기존 API와 달리 에이전트의 예측 불가능한 동작을 고려한 설계가 필요하다.',
      },
      {
        title: '프로토타입과 평가',
        content:
          'Claude Code로 빠른 프로토타입을 만들고, MCP 서버로 대화형 테스트를 수행한다. 여러 도구 호출이 필요한 현실적인 평가 작업을 설계하여 정확도, 토큰 소비량, 오류 등을 측정한다.',
      },
      {
        title: '적절한 도구 선택',
        content:
          '도구가 많다고 좋은 것이 아니다. `list_contacts` 대신 `search_contacts`처럼 사람의 검색 방식에 맞게 설계하고, 여러 작업을 하나의 도구로 통합하여 효율성을 높인다.',
      },
      {
        title: '네임스페이싱',
        content:
          '`asana_projects_search`처럼 공통 접두사로 도구를 그룹화하면 에이전트가 적절한 도구를 선택하기 쉬워진다.',
      },
      {
        title: '의미 있는 컨텍스트',
        content:
          '`uuid` 같은 저수준 식별자 대신 `name`, `image_url` 같은 시맨틱 식별자를 반환하여 환각을 줄인다. `response_format` 파라미터로 상세도를 조절할 수 있게 한다.',
      },
      {
        title: '토큰 효율성',
        content:
          '페이지네이션, 필터링, 잘라내기를 구현하고, 오류 메시지를 실행 가능한 안내로 바꾼다.',
      },
      {
        title: '도구 설명의 중요성',
        content:
          '새 팀원에게 설명하듯 명확하게 작성하고, `user` 대신 `user_id`처럼 모호하지 않은 파라미터 이름을 사용한다. 작은 개선이 큰 성능 향상을 가져온다.',
      },
    ],
  },
  'week2/mcp-server-authentication': {
    slug: 'mcp-server-authentication',
    week: 2,
    title: 'Build a Remote MCP Server',
    titleKr: '원격 MCP 서버 구축하기',
    author: 'Cloudflare',
    readTime: '약 25분',
    sourceUrl: 'https://developers.cloudflare.com/agents/guides/remote-mcp-server/',
    sourceTitle: 'Cloudflare Docs',
    published: true,
    sections: [
      {
        title: '개요',
        content:
          'MCP 서버를 구축할 때는 사용자 로그인(인증)과 MCP 클라이언트가 사용자 계정의 리소스에 접근하도록 허용하는 방법(인가) 모두 필요합니다. Model Context Protocol은 인가를 위해 OAuth 2.1의 일부를 사용합니다.',
      },
      {
        title: '시작하기',
        content: '인증 없이 공개 MCP 서버를 먼저 배포한 다음, 나중에 사용자 인증과 범위 지정 인가를 추가할 수 있습니다.',
        items: [
          'npm/yarn/pnpm으로 새 MCP 서버 프로젝트 생성',
          '로컬 개발 서버 실행 (localhost:8788/sse)',
          'MCP Inspector로 연결 테스트',
          'Wrangler로 Cloudflare에 배포',
        ],
      },
      {
        title: '도구 정의하기',
        content:
          'MCP 서버에 도구를 추가하려면 src/index.ts의 init() 메서드 내에서 this.server.tool(...)로 각 도구를 정의합니다. McpAgent 클래스를 사용하면 Durable Objects를 활용해 각 클라이언트 세션의 상태를 유지하는 원격 MCP 서버를 구축할 수 있습니다.',
      },
      {
        title: 'OAuth Provider 라이브러리',
        content: 'Cloudflare는 OAuth 2.1 프로토콜의 프로바이더 측을 구현하는 OAuth Provider 라이브러리를 제공합니다.',
        items: [
          'Worker가 직접 인가 처리',
          'GitHub이나 Google 같은 서드파티 OAuth 프로바이더와 직접 통합',
          'Stytch, Auth0, WorkOS 같은 자체 OAuth 프로바이더와 통합',
        ],
      },
      {
        title: 'GitHub OAuth 인증 추가하기',
        content: 'GitHub을 OAuth 프로바이더로 사용하여 MCP 서버에 인증을 추가하는 단계별 가이드입니다.',
        items: [
          '1단계: 인증 서버 생성 (remote-mcp-github-oauth 템플릿)',
          '2단계: GitHub OAuth 앱 생성 (로컬/프로덕션)',
          '3단계: wrangler.toml 설정',
          '4단계: Wrangler CLI로 시크릿 설정',
        ],
      },
      {
        title: '지원되는 ID 프로바이더',
        content: '이메일, 소셜 로그인, SSO, MFA로 사용자가 MCP 서버에 인증할 수 있습니다.',
        items: [
          'Auth0: 이메일, 소셜 로그인, 엔터프라이즈 SSO',
          'WorkOS의 AuthKit: 역할 기반 동적 도구 노출',
          'Descope Inbound Apps: 커스텀 스코프로 세분화된 권한 제어',
        ],
      },
      {
        title: 'McpAgent 클래스와 Durable Objects',
        content:
          'McpAgent 클래스를 사용하면 Durable Objects를 활용해 상태 유지 연결을 제공합니다. 휴면 지원으로 비활성 시 자동 절전, 필요 시 즉시 깨어납니다.',
        items: [
          '상태 유지 설계: 컨텍스트, 사용자 선호도, 대화 기록 기억',
          '휴면 지원: WebSockets Hibernation API로 비용 절감',
          'Durable Objects 무료 티어 포함',
        ],
      },
      {
        title: 'MCP 서버 테스트하기',
        content: 'MCP Inspector로 웹 브라우저에서 MCP 서버에 연결하고 도구를 테스트할 수 있습니다.',
        items: [
          'npx @modelcontextprotocol/inspector@latest 실행',
          'localhost:5173에서 서버 URL 입력',
          'OAuth Settings에서 Quick OAuth Flow 클릭',
        ],
      },
      {
        title: 'Claude Desktop 연결',
        content:
          'Claude Desktop은 아직 원격 MCP 클라이언트를 지원하지 않지만, mcp-remote 로컬 프록시로 원격 MCP 서버에 연결할 수 있습니다.',
      },
    ],
    keyTakeaways: [
      {
        title: 'OAuth 2.1 기반 인증',
        content: 'Cloudflare의 MCP 서버는 안전한 인증 및 인가를 위해 OAuth 2.1을 사용합니다.',
      },
      {
        title: 'ID 프로바이더 통합',
        content: 'OAuth Provider 라이브러리는 GitHub, Google, Auth0, WorkOS 같은 ID 프로바이더와의 통합을 단순화합니다.',
      },
      {
        title: '상태 유지 연결',
        content: 'McpAgent 클래스는 Durable Objects를 사용해 상태 유지 연결을 제공하며, 휴면 지원으로 비용을 절감합니다.',
      },
      {
        title: '다중 전송 옵션',
        content: 'streamable-http(/mcp)와 SSE(/sse) 전송 옵션을 지원합니다.',
      },
    ],
    relatedReadings: [
      { title: 'MCP Documentation', slug: 'mcp-documentation' },
      { title: 'Building MCP Servers', slug: 'building-mcp-servers' },
    ],
  },
  'week2/mcp-registry': {
    slug: 'mcp-registry',
    week: 2,
    title: 'Introducing the MCP Registry',
    titleKr: 'MCP 레지스트리 소개',
    author: 'David Soria Parra, Adam Jones, Tadas Antanavicius, Toby Padilla, Theodora Chu',
    readTime: '약 12분',
    sourceUrl: 'https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/',
    sourceTitle: 'MCP Blog',
    published: true,
    sections: [
      {
        title: '배경',
        content:
          '2025년 2월, MCP 창시자인 David Soria Parra와 Justin Spahr-Summers가 PulseMCP와 Goose 팀에게 중앙화된 커뮤니티 레지스트리 구축을 요청하면서 이 프로젝트는 커뮤니티 주도의 협업으로 시작됐습니다.',
      },
      {
        title: '아키텍처',
        content:
          '레지스트리의 핵심 아키텍처 결정 중 하나는 연합(federation)을 채택한 것입니다. 업스트림 MCP 레지스트리가 유일한 레지스트리는 아니며, 서브레지스트리가 수집, 보강, 미러링할 수 있는 공개 MCP 서버 메타데이터의 공식 소스 역할을 합니다.',
        items: [
          '단일 진실 공급원(Single Source of Truth): 공개 MCP 서버의 권위 있는 메타데이터 저장소',
          '벤더 중립성: 특정 서버나 조직을 우대하지 않음',
          '업계 보안 표준: 기존 패키지 레지스트리의 보안 방식 활용',
          '재사용성: 비공개/내부 레지스트리를 지원하는 재사용 가능한 API 설계',
        ],
      },
      {
        title: '작동 방식',
        content:
          'MCP 레지스트리는 메타레지스트리입니다. 패키지에 대한 메타데이터를 호스팅하지만, 패키지 코드나 바이너리는 호스팅하지 않습니다. MCP 서버에 대한 메타데이터와 해당 서버가 호스팅되는 위치(npm, PyPI, NuGet, Docker Hub 등)에 대한 참조를 저장합니다.',
      },
      {
        title: '서브레지스트리',
        content:
          '각 MCP 클라이언트와 연결된 "MCP 마켓플레이스"와 같은 공개 서브레지스트리는 업스트림 MCP 레지스트리에서 수집한 데이터를 자유롭게 보강하고 확장할 수 있습니다.',
        items: [
          '큐레이션: 특정 커뮤니티나 사용 사례에 맞는 서버 필터링',
          '평점: 사용자 평점 및 다운로드 통계 추가',
          '보안: 보안 스캐닝 및 취약점 검사 구현',
          '엔터프라이즈: 기업 사용자를 위한 내부 서버 레지스트리 제공',
        ],
      },
      {
        title: 'API 접근',
        content:
          'MCP 레지스트리 API는 서버 메타데이터에 프로그래밍 방식으로 접근할 수 있게 합니다. 프로덕션 URL은 https://registry.modelcontextprotocol.io입니다.',
        items: [
          'GET /v0/servers: 서버 목록 조회 (페이지네이션 지원)',
          '검색 파라미터로 특정 서버 필터링',
          '개별 서버 상세 정보 조회',
        ],
      },
      {
        title: '시작하기',
        content:
          '서버 관리자는 MCP 레지스트리에 서버를 추가할 수 있으며, 네임스페이스 게시를 위해서는 소유권을 증명해야 합니다.',
        items: [
          'GitHub 기반 네임스페이스: 해당 사용자로 GitHub 로그인 또는 GitHub Action 실행',
          '도메인 기반 네임스페이스: DNS 또는 HTTP 챌린지로 소유권 증명',
          'init, login, logout, publish 명령어 제공',
        ],
      },
      {
        title: '프리뷰 상태',
        content:
          '이 프리뷰를 통해 정식 출시 전에 사용자 경험을 개선하려 합니다. 2025년 10월 기준으로, 레지스트리 API는 API 프리즈(v0.1)에 들어갔습니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '오픈 카탈로그 및 API',
        content: 'MCP 레지스트리는 공개 MCP 서버를 쉽게 찾고 구현할 수 있도록 돕는 오픈 카탈로그입니다.',
      },
      {
        title: '연합 아키텍처',
        content: '공개 및 비공개 서브레지스트리가 데이터를 수집, 보강, 미러링할 수 있는 연합 구조를 채택했습니다.',
      },
      {
        title: '메타레지스트리',
        content: '메타데이터만 저장하며, 실제 코드나 패키지는 호스팅하지 않습니다.',
      },
      {
        title: '서브레지스트리 가치',
        content: '큐레이션, 평점, 보안, 엔터프라이즈 기능을 제공하여 생태계에 가치를 추가합니다.',
      },
    ],
    relatedReadings: [
      { title: 'MCP Server Authentication', slug: 'mcp-server-authentication' },
    ],
  },
  'week2/mcp-food-for-thought': {
    slug: 'mcp-food-for-thought',
    week: 2,
    title: "APIs don't make good MCP tools",
    titleKr: 'API는 좋은 MCP 도구가 되기 어렵다',
    author: 'Reilly Wood',
    readTime: '약 8분',
    sourceUrl: 'https://www.reillywood.com/blog/apis-dont-make-good-mcp-tools/',
    sourceTitle: 'reillywood.com',
    published: true,
    sections: [
      {
        title: '도입',
        content:
          'MCP는 LLM에게 다른 사람이 만든 도구에 대한 접근 권한을 부여하는 사실상의 표준이 되었다. 하지만 기존 API를 MCP 도구로 자동 변환하는 것은 작동하긴 하지만 잘 작동하지는 않는다.',
      },
      {
        title: '에이전트는 도구가 많으면 힘들어한다',
        content:
          'VS Code는 128개의 도구 제한이 있고, 많은 모델은 그 숫자에 도달하기 훨씬 전부터 정확한 도구 호출에 어려움을 겪는다. 처음부터 MCP용으로 설계된 도구는 개별 웹 API보다 훨씬 유연하며, 하나의 도구가 여러 개별 API의 역할을 수행할 수 있다.',
      },
      {
        title: 'API는 컨텍스트 윈도우를 빠르게 소진시킨다',
        content:
          '한 번에 100개의 레코드를 반환하는 API에서 각 레코드가 넓다면 많은 토큰을 소비한다. JSON은 토큰 효율이 매우 낮은 형식이며, CSV나 YAML이 더 나은 선택이다.',
        items: [
          '레코드당 토큰을 절반으로 줄일 수 있는 CSV 형식',
          '필드 프로젝션, 자동 잘라내기, JSON→CSV 변환 등의 개선 가능',
          '하지만 대부분의 서버는 이런 최적화를 하지 않음',
        ],
      },
      {
        title: 'API는 에이전트의 고유한 능력을 활용하지 못한다',
        content:
          'API는 구조화된 데이터를 반환하지만, 에이전트는 더 자유로운 형태의 지시도 처리할 수 있다. ask_question 도구로 RAG 쿼리 후 일반 텍스트 반환, 또는 search_cities 도구가 구조화된 목록과 다음 호출 제안을 함께 반환하는 식의 도구 체이닝이 가능하다.',
      },
      {
        title: '에이전트가 API를 직접 호출할 수 있다',
        content:
          'Claude Code 같은 에이전트는 코드를 작성하고 실행하는 데 뛰어나다. 에이전트의 샌드박싱이 개선되면서, API를 직접 호출하는 것이 중개자를 통하는 것보다 나을 수 있다.',
      },
      {
        title: '결론',
        content:
          '에이전트는 API의 일반적인 소비자들과 근본적으로 다르다. 에이전트는 자신의 고유한 능력과 한계에 맞게 설계된 도구가 주어질 때 가장 잘 작동한다.',
      },
    ],
    keyTakeaways: [
      {
        title: 'MCP와 API 변환',
        content:
          'MCP는 LLM에게 도구 접근 권한을 부여하는 사실상의 표준이 되었지만, 기존 API를 MCP 도구로 자동 변환하는 것은 잘 작동하지 않는다.',
      },
      {
        title: '도구 수와 컨텍스트',
        content:
          '에이전트는 많은 수의 도구를 잘 다루지 못하고, 각 도구는 컨텍스트 윈도우 공간을 차지한다.',
      },
      {
        title: '토큰 효율성',
        content:
          'API 응답의 크기와 JSON 형식은 토큰 효율성 면에서 문제가 있다. CSV나 YAML이 더 효율적이다.',
      },
      {
        title: '에이전트 고유 능력',
        content:
          'API는 에이전트의 고유한 능력(자유 형식 텍스트 처리, 도구 체이닝 등)을 활용하지 못한다.',
      },
      {
        title: 'API 직접 호출',
        content:
          '에이전트가 직접 API를 호출할 수 있으므로, MCP 도구가 항상 필요한 것은 아니다.',
      },
      {
        title: '에이전트 맞춤 설계',
        content:
          '에이전트는 API의 일반적인 소비자와 다르므로, 에이전트에 맞게 설계된 도구가 필요하다.',
      },
    ],
    relatedReadings: [
      { title: 'MCP Registry', slug: 'mcp-registry' },
      { title: 'MCP Server Authentication', slug: 'mcp-server-authentication' },
    ],
  },
  'week2/mcp-introduction': {
    slug: 'mcp-introduction',
    week: 2,
    title: 'Model Context Protocol (MCP): A Comprehensive Introduction for Developers',
    titleKr: '모델 컨텍스트 프로토콜(MCP): 개발자를 위한 종합 안내서',
    author: 'Reed McGinley-Stempel',
    readTime: '약 15분',
    sourceUrl: 'https://stytch.com/blog/model-context-protocol-introduction/',
    sourceTitle: 'Stytch Blog',
    published: true,
    sections: [
      {
        title: '요약',
        content:
          '모델 컨텍스트 프로토콜(MCP)은 AI 모델과 외부 데이터 및 서비스를 연결하는 개방형 표준으로, 대규모 언어 모델(LLM)이 일관되고 안전한 방식으로 구조화된 API 호출을 수행할 수 있게 합니다. MCP는 AI 애플리케이션과 외부 서비스 사이의 범용 어댑터 역할을 하며, 각 도구나 API마다 커스텀 통합 코드를 작성할 필요를 없앱니다.',
      },
      {
        title: '모델 컨텍스트 프로토콜(MCP)이란?',
        content:
          'MCP는 LLM과 다양한 데이터베이스, 애플리케이션, API 사이의 다리 역할을 하며, 복잡한 커스텀 코딩 없이도 원활한 통합을 가능하게 합니다. 클라이언트-서버 아키텍처를 사용하는데, AI 애플리케이션이 MCP 클라이언트를 실행하는 호스트 역할을 하고, 외부 통합 기능은 함수, 데이터 리소스, 프롬프트 템플릿 같은 기능을 노출하는 MCP 서버로 동작합니다.',
      },
      {
        title: 'MCP의 가치',
        content:
          'MCP는 빠른 도구 통합, 자율 에이전트 지원, 설정 부담 감소, 일관성과 상호운용성, 양방향 컨텍스트 등의 이점을 제공합니다.',
        items: [
          '빠른 도구 통합: 각각을 처음부터 커스텀 코딩하지 않고도 새로운 기능을 연결',
          '자율 에이전트: 다단계 워크플로우를 자연스러운 흐름으로 연결',
          '설정 부담 감소: 단일 메커니즘을 통해 얼마든지 많은 서비스에 연결',
          '일관성과 상호운용성: 통일된 JSON 구조로 데이터 전달',
          '양방향 컨텍스트: 프롬프트와 리소스를 지원하여 풍부한 상호작용',
        ],
      },
      {
        title: 'MCP 아키텍처',
        content:
          'MCP는 클라이언트-서버 구조를 따릅니다. MCP 클라이언트는 AI 애플리케이션(챗봇, IDE 어시스턴트, 에이전트)에 내장되고, MCP 서버는 표준화된 JSON-RPC 메시지를 통해 외부 기능을 노출합니다. 모든 상호작용은 구조화된 JSON-RPC 요청/응답을 통해 이루어집니다.',
      },
      {
        title: 'MCP 서버 구축 및 배포',
        content:
          '개발자는 stdout으로 출력하거나 HTTP 엔드포인트를 제공할 수 있는 어떤 프로그래밍 언어로든 MCP 서버를 만들 수 있습니다. 로컬 개발 환경, 클라우드 플랫폼, 온프레미스 인프라 등 다양한 배포 옵션이 있으며, Cloudflare는 원격 MCP 서버 배포를 위한 강력한 기능을 제공합니다.',
      },
      {
        title: 'MCP 클라이언트와 도구',
        content:
          'MCP 클라이언트는 외부 데이터 소스나 도구에 접근하기 위해 서버에 연결하는 애플리케이션으로, Python, JavaScript, Java 등 다양한 언어로 구축할 수 있습니다. Claude Desktop(채팅 인터페이스)과 Cursor(플러그인 시스템)가 대표적인 예입니다.',
      },
      {
        title: 'MCP와 다른 접근 방식 비교',
        content:
          'MCP는 커스텀 통합, ChatGPT 플러그인, LangChain 등 기존 접근 방식과 비교했을 때 빠른 통합 속도, OAuth 표준 인증, 지속적이고 컨텍스트가 풍부한 상호작용, 개방형 표준이라는 장점이 있습니다. 커스텀 통합은 노동 집약적이고, ChatGPT 플러그인은 독점적이며, LangChain은 동적 도구 발견 기능이 부족했습니다.',
      },
      {
        title: 'MCP 실전: 기술 심층 분석',
        content:
          'MCP 상호작용의 단계별 흐름: 1) MCP 서버에 연결하여 프로토콜 핸드셰이크 수행, 2) 사용 가능한 도구/리소스 탐색, 3) LLM이 적절한 도구 선택, 4) MCP를 통한 도구 호출, 5) LLM에 결과 반환. MCP는 도구 실행을 위한 표준화된 호출/응답 계층을 제공합니다.',
      },
      {
        title: '초기 한계: 인증 공백',
        content:
          '2024년 후반에 MCP가 등장했을 때, 원격 서버를 위한 표준화된 인증이 없었습니다. 초기 구현에서는 서버를 로컬이나 신뢰할 수 있는 환경에서 실행해야 했고, 수동 자격 증명 제공을 가정했는데 이는 다중 사용자 애플리케이션에서 확장성 문제를 야기했습니다.',
      },
      {
        title: 'OAuth 2.0 인증 흐름',
        content:
          'MCP는 안전하고 확장 가능한 원격 연결을 위해 OAuth 2.0을 채택했습니다.',
        items: [
          '동적 클라이언트 등록(DCR): 클라이언트가 OAuth 서버에 자동으로 등록',
          '자동 엔드포인트 탐색: 표준화된 메타데이터 URL을 통해 자동 발견',
          '안전한 인가와 토큰 관리: 사용자 권한에 맞게 범위가 지정된 토큰 획득',
          '확장 가능한 다중 사용자 지원: 다수의 동시 사용자와 서비스 지원',
        ],
      },
      {
        title: '디버깅과 문제 해결',
        content:
          'MCP는 개발자가 서버를 테스트하고 검사할 수 있는 대화형 디버깅 도구인 MCP Inspector를 제공합니다. 이 도구는 클라이언트-서버 상호작용에 대한 상세한 뷰를 제공하여 문제를 체계적으로 파악할 수 있게 합니다.',
      },
      {
        title: '실제 활용 사례',
        content: 'MCP는 다양한 구현을 가능하게 합니다.',
        items: [
          'AI 기반 챗봇: 외부 데이터 소스와 도구에 접근하여 정확하고 최신 정보 제공',
          'AI 기반 워크플로우: AI 모델을 외부 시스템과 통합하여 복잡한 프로세스 자동화',
          '향상된 AI 모델: 외부 도구 및 데이터 소스와 상호작용하여 정확도 향상',
          'AI 기반 자동화: 금융, 의료, 제조 분야의 업무 자동화',
        ],
      },
      {
        title: '결론',
        content:
          'MCP는 개발자가 지능형 언어 모델을 기존에 접근하기 어려웠던 소프트웨어와 데이터 생태계에 연결할 수 있게 하는 중요한 발전입니다. 공통 프로토콜을 도입함으로써, 팀은 커스텀 플러그인을 개발하지 않고도 더 통합적이고 자율적이며 확장하기 쉬운 AI 시스템을 구축할 수 있습니다. MCP는 AI 어시스턴트가 고립된 천재가 아니라, 다양한 시스템과 연동하고 필요에 따라 정보를 가져오거나 생성할 수 있는 잘 갖춰진 엔지니어이자 조수가 되는 세상을 가능하게 합니다.',
      },
    ],
    keyTakeaways: [
      {
        title: 'MCP의 정의',
        content:
          'MCP는 AI 모델과 외부 데이터/서비스를 연결하는 개방형 표준으로, USB-C처럼 AI 도구와 외부 서비스 간의 범용 어댑터 역할을 합니다.',
      },
      {
        title: '주요 이점',
        content:
          '빠른 도구 통합, 자율 에이전트 지원, 설정 부담 감소, 일관된 JSON 구조, 양방향 컨텍스트 지원으로 AI 시스템의 확장성과 유지보수성을 크게 향상시킵니다.',
      },
      {
        title: '클라이언트-서버 아키텍처',
        content:
          'AI 애플리케이션이 MCP 클라이언트를 실행하고, 외부 통합 기능은 MCP 서버로 동작하며, JSON-RPC 2.0 기반의 표준화된 통신을 수행합니다.',
      },
      {
        title: 'OAuth 2.0 통합',
        content:
          '동적 클라이언트 등록, 자동 엔드포인트 탐색, 안전한 토큰 관리를 통해 안전하고 확장 가능한 원격 연결을 지원합니다.',
      },
    ],
    relatedReadings: [
      { title: 'MCP Server Authentication', slug: 'mcp-server-authentication' },
      { title: 'MCP Registry', slug: 'mcp-registry' },
      { title: 'MCP Food-for-Thought', slug: 'mcp-food-for-thought' },
    ],
  },
  'week3/how-contexts-fail': {
    slug: 'how-contexts-fail',
    week: 3,
    title: 'How Long Contexts Fail',
    titleKr: '긴 컨텍스트가 실패하는 방식',
    author: 'Drew Breunig',
    readTime: '약 5분',
    sourceUrl: 'https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html',
    sourceTitle: 'dbreunig.com',
    published: true,
    sections: [
      {
        title: '개요',
        content:
          '이 글에서는 현재 100만 토큰에 도달한 확장된 컨텍스트 윈도우가 왜 AI 에이전트 성능을 자동으로 향상시키지 못하는지 살펴봅니다. 저자는 컨텍스트가 커지면 문제가 해결되는 것이 아니라 새로운 실패 유형이 발생한다고 주장합니다.',
      },
      {
        title: '핵심 전제',
        content:
          '최신 프론티어 모델들은 대규모 컨텍스트 윈도우를 지원하지만, 이를 전부 채우면 오히려 문제가 생깁니다. 저자는 다음과 같이 말합니다: "성공적인 에이전트를 구축하려면 컨텍스트를 잘 관리해야 합니다. 100만 토큰 컨텍스트 윈도우가 있다고 해서 그것을 다 채워야 하는 건 아닙니다."',
      },
      {
        title: '1. 컨텍스트 오염 (Context Poisoning)',
        content:
          '오류나 환각이 컨텍스트에 남아 반복적으로 참조되면 문제가 복합적으로 악화됩니다. Gemini 2.5 포켓몬 사례 연구에서는 에이전트의 목표 섹션에 잘못된 정보가 유입되자 불가능한 전략을 개발하는 현상이 나타났습니다.',
      },
      {
        title: '2. 컨텍스트 산만 (Context Distraction)',
        content:
          '컨텍스트가 최적 임계값을 초과하여 누적되면, 모델이 훈련된 지식을 활용하는 대신 과거 정보에 과도하게 의존하게 됩니다. Gemini 2.5는 10만 토큰을 초과하면 성능이 저하되며, 새로운 전략보다 반복적인 행동을 선호했습니다.',
      },
      {
        title: '3. 컨텍스트 혼란 (Context Confusion)',
        content:
          '과도한 정보, 특히 관련 없는 도구 정의들은 모델이 불필요한 데이터를 처리하도록 강제합니다. Berkeley Function-Calling Leaderboard 연구에 따르면 모든 모델이 도구가 많아질수록 성능이 저하되며, 특히 소형 모델은 도구가 19개에서 46개로 늘어나면 급격히 실패합니다.',
      },
      {
        title: '4. 컨텍스트 충돌 (Context Clash)',
        content:
          '여러 상호작용에 걸쳐 수집된 정보가 서로 모순될 수 있습니다. Microsoft와 Salesforce 연구에 따르면 정보를 동시에 제시할 때보다 순차적으로 제시할 때 평균 39% 성능이 하락했습니다. OpenAI의 o3 모델은 98.1에서 64.1로 떨어졌습니다.',
      },
      {
        title: '시사점',
        content:
          '이러한 실패는 에이전트에 특히 큰 영향을 미칩니다. 에이전트는 바로 이런 조건에서 작동하기 때문입니다: 분산된 정보를 수집하고, 순차적으로 도구를 호출하며, 긴 히스토리를 유지합니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '컨텍스트 윈도우 확장의 한계',
        content: '컨텍스트 윈도우가 100만 토큰까지 확장되었지만, 이를 모두 채우면 오히려 성능이 저하됨',
      },
      {
        title: '네 가지 실패 유형',
        content: '오염(잘못된 정보의 지속적 참조), 산만(과거 정보에 대한 과의존), 혼란(불필요한 정보 과부하), 충돌(모순된 정보)',
      },
      {
        title: '에이전트의 취약성',
        content: '에이전트는 분산 정보 수집, 순차적 도구 호출, 긴 히스토리 유지 특성상 이러한 실패에 취약함',
      },
      {
        title: '핵심 교훈',
        content: '컨텍스트 크기보다 컨텍스트 품질 관리가 중요함',
      },
    ],
  },
  'week3/coding-agents-101': {
    slug: 'coding-agents-101',
    week: 3,
    title: 'Devin: Coding Agents 101',
    titleKr: 'Devin: 코딩 에이전트 101',
    author: 'Cognition (Devin)',
    readTime: '약 8분',
    sourceUrl: 'https://devin.ai/agents101',
    sourceTitle: 'Devin - Coding Agents 101',
    published: true,
    sections: [
      {
        title: '소개',
        content:
          '이 가이드는 "특정 제품에 종속되지 않는", "실용적", "기술적" 성격을 표방합니다. 2025년에 코딩 에이전트와 효과적으로 협업하려는 엔지니어를 위해 작성했습니다. 고객 경험과 Cognition 팀이 Devin을 개발하며 얻은 교훈을 담았습니다.',
      },
      {
        title: '시작하기: 프롬프트 기초',
        content: '코딩 에이전트와 효과적으로 소통하는 기본 원칙입니다.',
        items: [
          '무엇을 원하는지보다 어떻게 해야 하는지 알려주세요 - 에이전트를 "의사결정이 불안정한 주니어 코딩 파트너"로 대하세요',
          '에이전트에게 시작점을 알려주세요 - 저장소, 관련 문서, 핵심 컴포넌트를 안내하면 불필요한 시행착오를 줄일 수 있습니다',
          '방어적 프롬프팅을 실천하세요 - 신입 인턴에게 하듯이 혼란스러울 수 있는 부분을 미리 예상하고 선제적으로 지침을 명확히 하세요',
          'CI, 테스트, 타입, 린터에 접근 권한을 부여하세요 - 강력한 피드백 루프가 에이전트 성능을 향상시킵니다',
          '당신의 전문성을 활용하세요 - 인간의 감독은 여전히 필수입니다. 코드의 최종 정확성은 당신이 책임집니다',
        ],
      },
      {
        title: '워크플로우에서 에이전트 활용하기',
        content: '일상 업무에 에이전트를 통합하는 방법입니다.',
        items: [
          '새 작업을 즉시 처리하세요 - 빠른 조사나 변경 작업을 위임해서 주요 업무에 집중하세요',
          '이동 중에도 코딩하세요 - 모바일로 접근할 수 있어서 여행이나 출퇴근 중에도 긴급한 이슈를 처리할 수 있습니다',
          '잡무를 넘기세요 - 커밋 이분법(bisecting)이나 문서 업데이트 같은 반복 작업을 위임하세요',
          '분석 마비를 피하세요 - 에이전트에게 여러 아키텍처 접근 방식을 구현하게 해서 구체적으로 비교하세요',
          '프리뷰 배포를 설정하세요 - 각 PR마다 자동으로 프리뷰 배포가 생성되도록 CI/CD 파이프라인을 구성하세요',
        ],
      },
      {
        title: '중급: 더 큰 티켓 위임하기',
        content: '복잡한 작업을 에이전트에게 맡기는 전략입니다.',
        items: [
          '첫 번째 초안을 자동화하세요 - 에이전트가 초기 PR 초안을 만들 수 있습니다. 현실적 기대치는 완전한 자동화가 아닌 약 80% 시간 절약입니다',
          'PRD(제품 요구사항 정의서)를 공동 개발하세요 - 복잡하거나 모호하게 정의된 작업은 에이전트와 함께 상세한 계획을 수립하세요',
          '체크포인트를 설정하세요 - 여러 부분으로 나뉜 작업은 계획 → 청크 구현 → 테스트 → 수정 → 체크포인트 리뷰 → 다음 청크로 진행하세요',
          '에이전트가 스스로 검증하도록 가르치세요 - 테스팅 프로세스를 명시해서 에이전트가 향후 작업을 독립적으로 검증할 수 있게 하세요',
          'AI 핫스팟의 테스트 커버리지를 높이세요 - 중요한 코드 마이그레이션이나 리팩터링을 위임하기 전에 자주 수정되는 영역의 테스트를 강화하세요',
        ],
      },
      {
        title: '고급: 워크플로우 자동화',
        content: '에이전트를 활용한 자동화 전략입니다.',
        items: [
          '반복 작업용 단축키 만들기 - 피처 플래그 제거, 의존성 업그레이드, 피처 PR에 대한 테스트 생성이 일반적인 자동화 후보입니다',
          '지능형 코드 리뷰 및 강제 적용 - 에이전트는 일부 경우 기존 린트 규칙보다 더 정확하게 일반적인 실수를 점검할 수 있습니다',
          '인시던트와 알림에 연결하기 - 에이전트는 API나 CLI 통합으로 자동 트리거될 수 있습니다. 단, 프로덕션 이슈에 대해 엔드투엔드 수정을 시도하기보다 의심스러운 오류를 플래그하세요',
        ],
      },
      {
        title: '커스터마이징 및 성능 향상',
        content: '에이전트 환경을 최적화하는 방법입니다.',
        items: [
          '환경 설정 - 에이전트 환경을 팀 구성과 정확히 맞추세요. 언어 버전, 의존성, 사전 구성된 인증 등을 포함합니다',
          '커스텀 CLI 도구와 MCP 빌드 - Linear 티켓 정보 가져오기나 개발 환경 재시작 같은 반복 워크플로우용 스크립트를 만드세요',
          '에이전트의 지식 베이스에 추가하기 - 프레임워크별 패턴, 프로젝트 아키텍처, 테스팅 규칙, 권장 도구에 대한 피드백을 문서화하세요',
        ],
      },
      {
        title: '실용적 고려사항',
        content: '에이전트 사용 시 알아야 할 한계와 주의사항입니다.',
        items: [
          '자율 에이전트의 한계 - 디버깅 능력이 제한적이고, 세밀한 시각적 추론이 부족하며, 최신 라이브러리에 대한 지식이 단절될 수 있습니다',
          '시간 관리 및 손실 최소화 - 근본적인 오해 징후가 보이면 상호작용을 중단하고, 막혔을 때는 처음부터 다시 시작하는 것이 정답입니다',
          '보안 및 권한 - 일회용 이메일로 전용 에이전트 계정을 생성하고, 개발/스테이징 환경만 제공하며, 가능하면 읽기 전용 API 접근 권한을 부여하세요',
        ],
      },
      {
        title: '결론',
        content:
          '가이드에서는 역량이 발전해도 "소프트웨어 엔지니어는 사라지지 않을 것"이라고 강조합니다. 자동화가 개인의 영향력을 증폭시키고 병렬 작업 관리를 가능하게 해도 "프로젝트, 시스템, 코드에 대한 진정한 소유권은 그 어느 때보다 중요합니다."',
      },
    ],
    keyTakeaways: [
      {
        title: '어떻게 할지를 상세히 알려주세요',
        content:
          '코딩 에이전트에게 무엇을 할지보다 어떻게 할지를 상세히 알려주는 것이 중요합니다.',
      },
      {
        title: '주니어 코딩 파트너로 대하세요',
        content:
          '에이전트를 "주니어 코딩 파트너"로 대하고, 방어적 프롬프팅을 실천하세요.',
      },
      {
        title: '강력한 피드백 루프 구축',
        content:
          'CI, 테스트, 타입 시스템을 통한 강력한 피드백 루프가 에이전트 성능을 향상시킵니다.',
      },
      {
        title: '현실적 기대치',
        content: '완전 자동화가 아닌 약 80% 시간 절약을 기대하세요.',
      },
      {
        title: '체크포인트 설정',
        content: '복잡한 작업은 체크포인트를 설정하고 단계별로 진행하세요.',
      },
      {
        title: '한계 인지',
        content:
          '에이전트의 한계(디버깅 능력, 시각적 추론, 지식 단절)를 인지하세요.',
      },
      {
        title: '처음부터 다시 시작',
        content:
          '막혔을 때는 사람보다 에이전트에서 더 자주 "처음부터 다시 시작"이 정답입니다.',
      },
      {
        title: '보안 주의',
        content:
          '보안을 위해 전용 계정, 제한된 환경, 읽기 전용 권한을 사용하세요.',
      },
    ],
  },
  'week3/specs-are-the-new-source-code': {
    slug: 'specs-are-the-new-source-code',
    week: 3,
    title: 'Specs Are the New Source Code',
    titleKr: '명세서가 새로운 소스 코드다',
    author: 'Ravi Mehta, Danny Martinez',
    readTime: '약 9분',
    sourceUrl: 'https://blog.ravi-mehta.com/p/specs-are-the-new-source-code',
    sourceTitle: 'Ravi Mehta Blog',
    published: true,
    sections: [
      {
        title: '서론',
        content:
          '필자는 커리어 전반에 걸쳐 명세서(spec)가 점점 짧아지는 것을 목격해왔습니다. Microsoft에서는 PM의 가치를 명세서 무게로 측정했고, Tripadvisor에서 전설적인 명세서는 냅킨에 휘갈겨 쓴 메모였습니다. 하지만 팀들은 명세서를 가치 있는 작업이 아닌 필수적인 서류 절차 정도로 취급합니다. 엔지니어의 코드와 디자이너의 인터페이스는 칭찬하면서, 명세서 품질은 간과합니다. 이것은 근본적인 실수입니다. Ravi Mehta의 Product Competency Toolkit에서 기능 명세서(Feature Specification)는 12가지 역량 중 첫 번째이며, 실행력, 전달, 품질의 기반입니다. 훌륭한 명세서야말로 효과적인 프로덕트 매니지먼트의 기초입니다.',
      },
      {
        title: '변화하는 환경',
        content:
          '개발의 역학이 바뀌고 있습니다. 엔지니어들은 그 어느 때보다 빠르게 움직입니다. AI는 대략적인 개념을 몇 분 만에 작동하는 코드로 변환합니다. 병목이 구현에서 이해로 이동했습니다: 무엇을 만들어야 하는지 알고, 팀을 요구사항에 맞춰 정렬하는 것이 핵심입니다. 한때 일시적인 서류 작업에 불과했던 명세서가 이제 프로덕트 매니지먼트의 기반이 되었습니다. 본질적으로 명세서 자체가 소스 코드가 된 것입니다.',
      },
      {
        title: 'PM이 갑자기 병목이 된 이유',
        content:
          '앤드류 응(Andrew Ng)은 최근 전례 없는 트렌드를 언급했습니다: "제 인생에서 처음으로 매니저들이 엔지니어의 두 배나 되는 PM을 두자고 제안하는 것을 봤습니다." 이것은 이전 예측을 확인해줍니다. 엔지니어가 AI로 가속화되면서 기업에는 PM이 더 적게 아니라 더 많이 필요합니다. 제품 가속화가 모든 PM 역량에 압력을 가중합니다. 고객 이해, 기능 설계, 임팩트 검증. 이 모든 수요가 하나의 산출물에 집중됩니다: 명세서입니다.',
      },
      {
        title: '명세서가 새로운 소스 코드인 이유',
        content:
          '전통적인 프로그래밍에서 사람이 읽을 수 있는 소스 코드는 최적화된 기계 코드로 컴파일됩니다. OpenAI의 션 그로브(Sean Grove)는 도발적인 논제를 제시합니다: 잘 작성된 프롬프트(명세서)가 새로운 소스 코드를 구성한다는 것입니다. 코드는 명세서의 "손실 투영(lossy projection)"입니다. 코드를 읽어도 완전한 의도를 알 수 없습니다. 명세서는 모든 것을 담고 있습니다. 충분히 상세한 명세서가 있으면 "좋은 TypeScript, 좋은 Rust, 서버, 클라이언트, 문서, 튜토리얼, 블로그 포스트, 심지어 팟캐스트까지" 생성할 수 있습니다.',
      },
      {
        title: '프로토타입이 명세서를 대체하지 못한 이유',
        content:
          '역사적으로 제품 수명주기는 명세서가 와이어프레이밍, 디자인, 프로토타이핑, MVP 개발을 주도하는 방식으로 시작했습니다. 이 패러다임이 근본적으로 바뀌었습니다: 이제 명세서는 종종 입력이 아니라 출력입니다. v0, Lovable, Replit 같은 현대적 도구들은 엔지니어링 없이도 몇 시간 안에 작동하는 프로토타입을 만들게 해줍니다. 프로토타입이 명세서를 없앤 것이 아닙니다. 명세서를 더 좋게 만들었습니다.',
      },
      {
        title: '명세서 주도 개발 실전',
        content:
          'decimals 창업자 대니 마르티네즈(Danny Martinez)가 실용적인 명세서 주도 개발을 보여줍니다. 그의 플랫폼은 크리에이터 이코노미 전문가들이 네트워크의 인재를 채용 기회에 연결하도록 돕습니다. 핵심 인사이트: 비기술자가 전략적인 Claude 프롬프트만으로 Linear 티켓, 코드베이스, 엔지니어링 협업을 성공적으로 탐색했습니다.',
        items: [
          '구체적으로 작성하기: 모호한 명세서는 지저분한 코드베이스를 만듭니다',
          '선별하기: 이 접근법은 단순한 작업에 적합합니다',
          '게이트키핑: 엔지니어 리뷰가 단순함과 기능성 사이의 균형을 보장합니다',
        ],
      },
      {
        title: '결론',
        content:
          '윌리엄 깁슨(William Gibson)은 이렇게 말했습니다: "미래는 이미 여기에 있다. 다만 고르게 분포되어 있지 않을 뿐이다." AI의 이득은 여전히 극심하게 불균등합니다. 코드, 텍스트, 이미지 생성은 양자 도약을 이루며 "AI 속도"로 작동합니다. 고객 대화, 니즈 발굴, 구매 설득은 여전히 "인간 속도"입니다. 이러한 불균등한 분포가 제품 팀을 재편하고 있습니다. 초점이 구현에서 이해로 이동합니다. 전통적인 PM 스킬인 고객 니즈 이해, 명확한 문제 정의, 우아한 솔루션 설계가 기하급수적으로 가치가 높아졌습니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '명세서의 부활',
        content:
          '명세서가 일시적인 서류 작업에서 제품 개발의 기반으로 변화함',
      },
      {
        title: 'PM 역할 확대',
        content:
          'AI가 엔지니어를 가속화하면서 PM의 역할과 명세서 작성 능력이 더 중요해짐',
      },
      {
        title: '코드는 손실 투영',
        content:
          '션 그로브: 명세서는 새로운 소스 코드, 코드는 명세서의 "손실 투영"',
      },
      {
        title: '새로운 워크플로우',
        content:
          '바이브 코딩 도구로 프로토타입 먼저, 명세서 나중 워크플로우가 가능해짐',
      },
      {
        title: '비기술자 기여 가능',
        content:
          '비기술자도 잘 작성된 명세서와 AI 도구로 코드베이스에 기여 가능',
      },
      {
        title: '미래의 프로그래머',
        content:
          '미래의 가장 가치 있는 프로그래머는 가장 효과적으로 소통하는 사람',
      },
    ],
  },
  'week6/finding-vulnerabilities-claude-code-codex': {
    slug: 'finding-vulnerabilities-claude-code-codex',
    week: 6,
    title: 'Finding Vulnerabilities in Modern Web Apps Using Claude Code and OpenAI Codex',
    titleKr: 'Claude Code와 OpenAI Codex를 활용한 최신 웹 앱 취약점 탐지',
    author: 'Semgrep',
    readTime: '약 11분',
    sourceUrl: 'https://semgrep.dev/blog/2025/finding-vulnerabilities-in-modern-web-apps-using-claude-code-and-openai-codex/',
    sourceTitle: 'Semgrep Blog',
    published: false,
    sections: [
      {
        title: 'TL;DR',
        content:
          'Semgrep 보안 연구팀이 AI 코딩 에이전트의 실제 코드 취약점 발견 효과를 평가했습니다.',
        items: [
          'Claude Code: 46개 취약점 식별 (참양성률 14%, 거짓양성률 86%)',
          'OpenAI Codex: 21개 취약점 보고 (TPR 18%, FPR 82%)',
          '약 20개가 고심각도 이슈',
          '취약점 유형에 따라 결과 차이가 큼',
          '비결정성이 여전히 핵심 문제',
        ],
      },
      {
        title: '서론',
        content:
          'Semgrep 연구원들이 "LLM이 소스 코드에서 취약점을 찾는 데 실제로 얼마나 효과적인가?"라는 질문에 답하기 위해 체계적인 평가를 수행했습니다. 구체적이고 측정 가능한 질문들을 중심으로 조사를 진행했습니다: 취약점 유형별 거짓양성률과 거짓음성률은? 프로그래밍 언어, 프레임워크, 코드베이스 크기에 따른 결과 차이는? 거짓양성과 거짓음성의 원인은? 반복 실행 시 분석 결과의 결정성은? 인젝션 취약점에 대해서는 LLM이 소스부터 싱크까지 사용자 입력을 추적할 수 있는가, 함수와 파일 간 데이터를 추적할 수 있는가, 새니타이제이션 함수와 보안 제어를 이해하는가, 서드파티 의존성을 추론할 수 있는가를 평가했습니다.',
      },
      {
        title: '기존 SAST 벤치마크의 문제점: 현실성 부족',
        content:
          '현재 연구는 실제 복잡성을 포착하지 못하는 벤치마크에 크게 의존합니다. 알려진 취약점이 있는 앱은 "현재 LLM들이 이러한 저장소의 코드와 인터넷의 많은 공개 문서를 학습 데이터로 이미 흡수했을 가능성이 높아" 오염 편향이 발생합니다. XBOW는 "코드가 너무 인위적이고 단순해서 실제 애플리케이션을 대표하지 못합니다." Semgrep의 방법론은 11개의 대규모, 활발히 유지되는 Python 기반 오픈소스 프로젝트를 테스트하며, Django, Flask, FastAPI 같은 일반적인 웹 프레임워크를 사용합니다.',
      },
      {
        title: '실험: AI vs. 실제 앱 코드',
        content:
          '연구원들이 11개 애플리케이션을 분석하고 445개 이상의 발견 사항을 수동 분류했으며, 가능한 경우 동적으로 검증했습니다. Claude Code(v1.0.32, Sonnet 4)는 인증 우회 10%, IDOR 22%, 경로 탐색 13%, SQL 인젝션 5%, SSRF 12%, XSS 16%의 참양성률을 보였습니다. OpenAI Codex(v0.2.0, o4-mini)는 인증 우회 13%, IDOR 0%, 경로 탐색 47%, SQL 인젝션 0%, SSRF 34%, XSS 0%의 참양성률을 보였습니다.',
      },
      {
        title: '주요 발견 사항',
        content:
          '두 AI 도구 모두 실제 취약점을 찾지만 노이즈가 높습니다. IDOR 탐지에서 Claude Code가 13개의 유효한 IDOR 버그를 찾고 신뢰할 수 있는 수정안을 제시했습니다. Claude Code는 잠재적 가드레일 도구로 활용할 수 있으며, 많은 거짓양성이 여전히 유효한 코드 강화 제안이었습니다. XSS와 SQL 인젝션이 의미적 한계를 드러내며, 모델이 "서버 측 프레임워크에서 클라이언트 측 컴포넌트로의 데이터 추적에 어려움을 겪습니다." 동일한 프롬프트 반복으로 다른 결과가 나왔으며, OpenAI Codex가 유효하지 않은 SARIF를 생성했습니다.',
      },
      {
        title: '비결정성 문제',
        content:
          '3개 애플리케이션에서 동일한 코드에 동일한 프롬프트로 3회 테스트한 결과 상당한 변동성이 나타났습니다. PY-APP-007에서는 실행마다 완전히 다른 발견 사항이 나왔고, PY-APP-002에서는 발견 사항이 1회차 3개에서 2회차 6개, 3회차 11개로 증가했습니다. 근본 원인은 컨텍스트 부패(자체 컨텍스트에서 정확하게 검색하기 어려움)와 손실 압축(요약 과정에서 함수명, 경로, 추론 세부 사항 손실)입니다.',
      },
      {
        title: 'Claude Code의 /security-review 명령어',
        content:
          'PR 보안 검토용 Anthropic의 새 /security-review 명령어는 테스트에서 기대에 미치지 못했습니다. "전체 코드베이스에 이 명령어를 실행했을 때 식별된 보안 이슈가 상당히 제한적이었습니다." 3개 앱 테스트 결과 "모든 앱 통틀어 XSS 하나만" 발견되었으며, 특정 취약점 유형별로 개별 프롬프트했을 때보다 훨씬 적었습니다.',
      },
      {
        title: '스캐폴딩과 에이전틱 워크플로우',
        content:
          '"AI 보안 검토의 미래는 단일 모놀리식 모델이 아니라 도구를 사용하고, 증거에 대해 추론하며, 협력하는 AI 에이전트 시스템입니다." 연구원들이 "복잡한 프로세스를 진행하고 보안 이슈를 보고하는 과정에서 교육적 결정을 내리는 시스템 능력에서 큰 차이"를 관찰했습니다.',
      },
      {
        title: '결론',
        content:
          '"LLM은 내일 당장 인간 보안 엔지니어를 대체할 만병통치약이 아닙니다. 실제로 종단 간 고심각도 인젝션 스타일 취약점을 찾는 데는 상당히 약합니다." 그러나 LLM의 강점(문맥적 추론)과 약점(깊은 코드 의미론 이해 부족)을 이해하면 "고급 정적 분석 엔진으로 정교한 에이전틱 시스템을 구축"하여 "이전 어떤 것보다 훨씬 강력한 차세대 보안 도구"를 만들 수 있습니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '체계적 평가',
        content:
          'Semgrep이 Claude Code와 OpenAI Codex의 실제 취약점 탐지 능력을 11개 대규모 Python 프로젝트에서 체계적으로 평가',
      },
      {
        title: '탐지 결과',
        content:
          'Claude Code는 46개(TPR 14%), Codex는 21개(TPR 18%) 취약점 발견',
      },
      {
        title: '취약점별 성능 차이',
        content:
          'IDOR, SSRF, 경로 탐색에서 상대적으로 양호한 성능, SQL 인젝션과 XSS에서 저조',
      },
      {
        title: '비결정성 문제',
        content:
          '같은 코드, 같은 프롬프트로도 실행마다 다른 결과가 나타남',
      },
      {
        title: 'AI의 역할',
        content:
          'LLM은 보안 도구를 대체하기보다 보완하는 역할로, 에이전틱 시스템과 결합 시 강력',
      },
    ],
  },
  'week6/copilot-rce-prompt-injection': {
    slug: 'copilot-rce-prompt-injection',
    week: 6,
    title: 'GitHub Copilot: Remote Code Execution via Prompt Injection (CVE-2025-53773)',
    titleKr: 'GitHub Copilot: 프롬프트 인젝션을 통한 원격 코드 실행 (CVE-2025-53773)',
    author: 'Embrace The Red',
    readTime: '약 8분',
    sourceUrl: 'https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/',
    sourceTitle: 'Embrace The Red Blog',
    published: false,
    sections: [
      {
        title: '개요',
        content:
          '이 글은 GitHub Copilot과 VS Code의 치명적인 프롬프트 인젝션 취약점을 다룹니다. 공격자는 이 취약점으로 시스템 전체를 장악할 수 있습니다. 공격 방식은 프로젝트 설정 파일을 수정해 "YOLO 모드"라는 실험적 기능을 활성화하는 것입니다.',
      },
      {
        title: '배경 연구',
        content:
          'VS Code와 GitHub Copilot 에이전트 모드를 조사하는 과정에서 우려되는 동작이 드러났습니다. 에이전트가 사용자의 명시적 승인 없이도 워크스페이스 파일을 생성하고 수정할 수 있습니다. "편집 내용은 즉시 영구 적용됩니다. 검토용 diff로 메모리에 남는 게 아니라 수정 사항이 곧바로 디스크에 기록됩니다." VS Code의 워크스페이스 의존적 설정을 연구하던 중 실험적 기능을 발견했습니다. `.vscode/settings.json`에 `"chat.tools.autoApprove": true`를 추가하면 셸 명령, 웹 브라우징 등 모든 작업에서 사용자 확인을 건너뜁니다. 특히 이 실험적 기능은 Windows, macOS, Linux 모두에 기본으로 존재합니다.',
      },
      {
        title: '익스플로잇 체인 설명',
        content:
          'PoC(개념 증명) 공격 순서는 다음과 같습니다: 1) 소스 코드, 웹 페이지, GitHub 이슈 또는 도구 응답에 프롬프트 인젝션 삽입, 2) 인젝션이 `~/.vscode/settings.json`을 수정해 `"chat.tools.autoApprove": true` 추가, 3) GitHub Copilot이 즉시 YOLO 모드 진입, 4) 터미널 명령 실행, 특정 운영체제를 노리는 조건부 인젝션 수행, 5) 원격 코드 실행(RCE) 달성. 데모에서는 프롬프트 인젝션이 이 메커니즘으로 Windows와 macOS에서 계산기를 실행하는 모습을 보여줍니다.',
      },
      {
        title: '확장 공격 벡터',
        content:
          '개발자 머신을 완전히 장악하면 다음이 가능합니다: 머신을 "ZombAI" 인스턴스로 봇넷에 참여시키기, UI 수정 (색 구성표 변경 등), 감염된 파일로 전파되는 AI 바이러스 생성, 악성코드 다운로드 및 C&C 서버 연결. 이 취약점으로 자기 전파형 악성코드를 만들 수 있습니다: 파일에 악성 명령어 삽입, 코드 실행으로 다른 Git 프로젝트 침해, RAG 소스 수정 및 업스트림에 변경 사항 커밋, 개발자가 모르는 사이에 감염된 코드 전파. 보이지 않는 유니코드 문자로 공격자는 탐지 불가능한 페이로드를 삽입할 수 있습니다. "이 방법의 신뢰성은 높지 않았지만" 데모에서 여러 번 성공적으로 실행됐습니다.',
      },
      {
        title: '추가 공격 경로',
        content:
          'YOLO 모드 외에도 문제가 될 수 있는 설정 파일들이 있습니다: `.vscode/tasks.json`, 가짜 MCP 서버 구성, 사용자 인터페이스 및 프로젝트 설정 재구성. 저자는 특히 다음을 우려합니다: "최근에 개발자들이 여러 에이전트를 사용하는 경우가 많다는 것을 알게 됐는데, 다른 에이전트 설정 파일을 덮어쓰는 위협도 존재합니다."',
      },
      {
        title: '권장 사항',
        content:
          'AI 에이전트는 파일 수정 전 반드시 사람의 승인을 받아야 합니다. 많은 편집기는 적용 전 개발자가 diff를 검토할 수 있게 하는데, 이 시나리오에는 그런 보호 장치가 없습니다.',
      },
      {
        title: '책임 있는 공개 일정',
        content:
          '2025년 6월 29일 Microsoft에 취약점 보고 후, Microsoft가 재현 가능성 확인하고 세부 사항을 요청했습니다. 몇 주 후 MSRC가 추적 중인 이슈로 식별하고 8월 패치 계획을 알렸으며, 8월 패치 화요일에 수정 패치가 릴리스되었습니다.',
      },
      {
        title: '결론',
        content:
          '이 사례는 에이전틱 AI 시스템이 자체 구성 수정으로 의도된 제약을 벗어날 수 있음을 보여줍니다. "GitHub Copilot은 자신의 환경을 수정해 권한을 상승시키고 코드를 실행하여 개발자의 머신을 침해할 수 있습니다." 이 취약점은 위협 모델링 단계에서 식별했어야 할 일반적인 설계 결함을 나타냅니다.',
      },
    ],
    keyTakeaways: [
      {
        title: 'RCE 취약점 발견',
        content:
          'GitHub Copilot과 VS Code에서 프롬프트 인젝션을 통한 원격 코드 실행(RCE) 취약점 발견',
      },
      {
        title: 'YOLO 모드 악용',
        content:
          'YOLO 모드(`chat.tools.autoApprove: true`) 악용으로 모든 사용자 확인 우회',
      },
      {
        title: '다양한 공격 벡터',
        content:
          '공격자는 소스 코드, 웹 페이지, GitHub 이슈 등에 악성 프롬프트를 삽입해 시스템 장악 가능',
      },
      {
        title: '확장 공격 가능',
        content:
          'ZombAI 봇넷 참여, AI 바이러스 전파, 보이지 않는 유니코드 공격 등 확장 공격 가능',
      },
      {
        title: '패치 릴리스',
        content:
          '2025년 8월 패치 화요일에 Microsoft가 수정 패치 릴리스',
      },
      {
        title: '사용자 승인 필수',
        content:
          'AI 에이전트는 파일 수정 전 반드시 사용자 승인을 받아야 함',
      },
    ],
  },
  'week7/code-reviews-just-do-it': {
    slug: 'code-reviews-just-do-it',
    week: 7,
    title: 'Code Reviews: Just Do It',
    titleKr: '코드 리뷰: 그냥 하세요',
    author: 'Jeff Atwood',
    readTime: '약 2분',
    sourceUrl: 'https://blog.codinghorror.com/code-reviews-just-do-it/',
    sourceTitle: 'Coding Horror',
    published: true,
    sections: [
      {
        title: '본문',
        content:
          '*Humanizing Peer Reviews*에서 칼 위거스(Karl Wiegers)는 이렇게 강조합니다:\n\n> "동료 검토(Peer Review)는 작성자가 아닌 다른 사람이 소프트웨어 산출물의 결함과 개선점을 찾는 활동으로, 소프트웨어 품질 향상을 위한 가장 강력한 도구입니다."\n\n제프 앳우드(Jeff Atwood)는 **동료 코드 리뷰야말로 코드 품질을 높이는 가장 효과적인 방법**이라고 주장합니다. 그는 다른 개발자와 함께 검토하기 전까지는 코드가 완료되었다고 생각하지 말라고 강조합니다.',
      },
      {
        title: 'Code Complete의 증거',
        content:
          '스티브 맥코넬(Steve McConnell)의 연구에 따르면 코드 인스펙션(Code Inspection)은 테스트 단독보다 훨씬 우수한 결함 탐지 효과를 보여줍니다:',
        items: [
          '단위 테스트(Unit Testing): 25% 결함 탐지율',
          '기능 테스트(Function Testing): 35% 결함 탐지율',
          '통합 테스트(Integration Testing): 45% 결함 탐지율',
          '설계 인스펙션(Design Inspection): 55% 효과',
          '코드 인스펙션(Code Inspection): 60% 효과',
        ],
      },
      {
        title: '사례 연구',
        content: '주요 사례:',
        items: [
          '유지보수를 담당하는 한 조직은 리뷰 도입 후 오류율을 55%에서 2%로 낮췄습니다',
          '리뷰를 거쳐 개발한 프로그램은 오류가 80% 이상 적었습니다 (100줄당 0.82개 vs 4.5개)',
          'Aetna 보험은 인스펙션으로 82%의 오류를 찾아냈습니다',
          'IBM Orbit 프로젝트는 예상 오류율의 1%만 기록했습니다',
          'AT&T의 한 조직은 생산성 14% 향상과 결함 90% 감소를 이뤘습니다',
          'JPL은 조기 결함 탐지로 인스펙션당 약 $25,000를 절약합니다',
        ],
      },
      {
        title: '권장 사항',
        content:
          '앳우드는 코드 리뷰를 처음 도입하는 조직에 칼 위거스의 책 *Peer Reviews in Software: A Practical Guide*를 추천합니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '동료 코드 리뷰는 코드 품질을 높이는 가장 효과적인 방법입니다',
        content: '',
      },
      {
        title:
          '코드 인스펙션의 결함 탐지 효과는 60%로, 단위 테스트(25%)보다 훨씬 높습니다',
        content: '',
      },
      {
        title:
          '여러 기업에서 리뷰 도입 후 오류율이 크게 줄고 생산성이 높아졌습니다',
        content: '',
      },
      {
        title: '다른 개발자와 검토하기 전까지 코드가 완료되었다고 생각하지 마세요',
        content: '',
      },
    ],
  },
  'week6/agentic-ai-threats': {
    slug: 'agentic-ai-threats',
    week: 6,
    title: 'Agentic AI Threats: Identity Spoofing and Impersonation Risks',
    titleKr: '에이전트 AI 위협: 신원 스푸핑과 사칭 위험',
    author: 'Unit 42 (Palo Alto Networks)',
    readTime: '약 15분',
    sourceUrl: 'https://unit42.paloaltonetworks.com/agentic-ai-threats/',
    sourceTitle: 'Palo Alto Networks Unit 42',
    published: false,
    sections: [
      {
        title: '핵심 요약',
        content:
          '에이전트 애플리케이션은 AI 에이전트를 활용합니다. AI 에이전트란 특정 목표를 향해 자율적으로 데이터를 수집하고 조치를 취하는 소프트웨어입니다. 이러한 시스템의 채택이 확산됨에 따라 보안적 함의를 이해하는 것이 중요합니다. 이 연구는 에이전트 애플리케이션을 대상으로 한 9가지 구체적인 공격 시나리오를 조사하며, 정보 유출, 자격 증명 탈취, 도구 악용, 원격 코드 실행을 시연합니다.',
        items: [
          '에이전트 침해에 프롬프트 인젝션이 항상 필요하지는 않습니다',
          '프롬프트 인젝션은 가장 강력하고 다재다능한 공격 벡터',
          '잘못 구성된 도구는 공격 표면과 영향을 크게 증가',
          '보안이 취약한 코드 인터프리터는 임의 코드 실행에 노출',
          '자격 증명 유출은 사칭, 권한 상승, 인프라 침해로 이어짐',
          '단일 완화 조치로는 부족하며 심층방어 전략 필요',
        ],
      },
      {
        title: 'AI 에이전트 개요',
        content:
          'AI 에이전트는 직접적인 인간 개입 없이 특정 목표를 달성하기 위해 환경에서 자율적으로 데이터를 수집하고, 정보를 처리하며, 조치를 취하는 소프트웨어 프로그램입니다. 이러한 시스템은 대규모 언어 모델을 추론 엔진으로 사용하고 함수 호출을 통해 외부 도구에 연결합니다.',
      },
      {
        title: 'AI 에이전트의 보안 위험',
        content:
          'AI 에이전트는 프롬프트 인젝션, 민감한 데이터 유출, 공급망 취약점을 포함한 OWASP Top 10 위험을 상속받습니다. 또한 외부 도구 통합으로 인해 SQL 인젝션, 원격 코드 실행, 손상된 접근 제어 같은 전통적인 소프트웨어 위협에도 노출됩니다.',
        items: [
          '프롬프트 인젝션: 애플리케이션의 의도된 동작을 벗어나게 함',
          '도구 오용: 기만적인 프롬프트로 통합 도구 남용',
          '의도 파괴 및 목표 조작: 동작을 원래 의도에서 벗어나게 함',
          '신원 스푸핑 및 사칭: 합법적인 에이전트로 위장 가능',
          '예상치 못한 RCE: 악성 코드 인젝션으로 무단 접근 획득',
          '에이전트 통신 오염: 협업 워크플로우 방해',
          '리소스 과부하: 성능과 가용성 저하',
        ],
      },
      {
        title: '시뮬레이션 공격',
        content:
          '연구진은 CrewAI와 AutoGen 프레임워크로 다중 사용자, 다중 에이전트 투자 자문 어시스턴트를 개발하여 9가지 공격 시나리오를 테스트했습니다: 참여 에이전트 식별, 에이전트 지침 추출, 도구 스키마 추출, 무단 내부 네트워크 접근, 마운트된 볼륨 통한 데이터 유출, 메타데이터 서비스 통한 토큰 유출, SQL 인젝션, BOLA 악용, 간접 프롬프트 인젝션.',
      },
      {
        title: '보호 및 완화',
        content:
          '에이전트 애플리케이션 보안에는 계층화된 심층방어 전략이 필요합니다. 단일 방어로는 모든 위협에 대응할 수 없습니다.',
        items: [
          '프롬프트 강화: 지침, 동료 에이전트, 도구 스키마 공개 금지',
          '콘텐츠 필터링: 에이전트 입출력을 실시간 검사',
          '도구 입력 검증: 입력을 암묵적으로 신뢰하지 않음',
          '도구 취약점 스캐닝: SAST, DAST, SCA 정기 평가',
          '코드 실행기 샌드박싱: 네트워킹 제한, 볼륨 제한',
        ],
      },
      {
        title: '결론',
        content:
          '에이전트 애플리케이션은 LLM과 외부 도구의 취약점을 모두 상속받으면서 복잡한 워크플로우, 자율적 의사결정, 동적 도구 호출로 공격 표면을 확장합니다. AI 에이전트 보안에는 프롬프트 강화, 입력 검증, 안전한 도구 통합, 강력한 런타임 모니터링을 포괄하는 심층방어 전략이 필요합니다.',
      },
    ],
    keyTakeaways: [
      {
        title: 'LLM + 전통적 위협 상속',
        content:
          'AI 에이전트는 LLM 취약점과 전통적 소프트웨어 위협을 모두 상속받음',
      },
      {
        title: '9가지 공격 시나리오',
        content:
          '에이전트 식별, 지침/스키마 추출, SSRF, 데이터 유출, 토큰 탈취, SQL 인젝션, BOLA, 간접 프롬프트 인젝션',
      },
      {
        title: '프롬프트 인젝션의 위력',
        content: '프롬프트 인젝션은 여전히 가장 강력한 공격 벡터',
      },
      {
        title: '심층방어 전략 필수',
        content:
          '프롬프트 강화, 콘텐츠 필터링, 입력 검증, 취약점 스캐닝, 샌드박싱 조합 필요',
      },
      {
        title: '단일 조치 불충분',
        content: '단일 보안 조치로는 불충분하며 계층화된 방어가 필수',
      },
    ],
  },
  'week7/ai-assisted-assessment-coding-practices': {
    slug: 'ai-assisted-assessment-coding-practices',
    week: 7,
    title: 'AI-Assisted Assessment of Coding Practices in Modern Code Review',
    titleKr: '현대 코드 리뷰에서의 AI 지원 코딩 관행 평가',
    author: 'Manushree Vijayvergiya et al. (Google)',
    readTime: '약 15분',
    sourceUrl: 'https://arxiv.org/pdf/2405.13565',
    sourceTitle: 'arXiv - Google Research',
    published: true,
    contentType: 'pdf',
    sections: [
      {
        title: '초록',
        content:
          '현대 코드 리뷰는 코드 작성자가 만든 증분 코드 변경사항을 버전 관리 시스템에 커밋하기 전에 한 명 이상의 동료가 검토하는 프로세스입니다. 이 논문은 코딩 모범 사례를 자동으로 학습하고 적용하는 대규모 언어 모델(LLM) 기반 시스템인 AutoCommenter의 개발, 배포, 평가에 대해 보고합니다. 저자들은 4개의 프로그래밍 언어(C++, Java, Python, Go)에 대해 AutoCommenter를 구현했으며, 대규모 산업 환경에서 성능과 채택률을 평가했습니다.',
      },
      {
        title: '서론',
        content:
          '현대 코드 리뷰에서는 포매팅, 네이밍, 문서화, 언어 기능, 코드 관용구 등의 모범 사례를 다룹니다. 린터와 같은 정적 분석 도구는 일부 모범 사례를 자동으로 검증할 수 있지만, 미묘한 가이드라인이나 예외가 있는 가이드라인은 자동 검증이 어렵고 인간의 판단이 필요합니다. 코드 리뷰 프로세스의 가장 큰 비용은 필요한 시간이며, 특히 전문 개발자의 시간입니다.',
      },
      {
        title: '배경: 코드 리뷰 프로세스',
        content:
          'Google의 코드 리뷰 프로세스는 체계적으로 확립되어 있으며, 변경 단위로 진행되고 도구의 지원을 받습니다. 매일 수만 건의 코드베이스 변경이 리뷰 프로세스를 거치며, 수만 명의 개발자가 프로세스에 참여합니다. 코드 리뷰는 여전히 연간 수천 개발자-년의 비용이 듭니다.',
      },
      {
        title: '접근 방식: 모델 및 작업 정의',
        content:
          '저자들은 T5를 기반으로 한 전통적인 트랜스포머(Transformer) 접근 방식을 사용하여 텍스트-투-텍스트 변환 방식을 채택합니다. 모델의 입력은 작업 프롬프트와 소스 코드이고, 타겟은 모범 사례 위반에 대한 소스 코드 위치와 URL입니다.',
      },
      {
        title: '배포',
        content:
          'AutoCommenter는 2022년 7월부터 2023년 10월까지 Google의 모든 개발자에게 단계적으로 배포되었습니다. 팀푸딩(내부 테스트)부터 시작하여, 얼리 어답터(약 3천 명), A/B 실험(전체의 약 절반), 그리고 일반 사용 가능 단계로 진행되었습니다.',
        items: [
          '높은 신뢰도 임계값(t = 0.98)으로 시작',
          '빔 서치로 게시 빈도 3배 증가 및 URL 다양성 향상',
          '조건부 필터링으로 오래된 모범 사례 억제',
          '독립적 인간 평가에서 유용한 비율 60% 달성',
        ],
      },
      {
        title: '평가',
        content:
          'AutoCommenter는 330개의 고유 URL에 대해 코멘트를 생성했습니다. 추정 코멘트 해결률은 약 40%이며, 인간 코멘트의 68%를 커버합니다. 가장 자주 예측되는 상위 50개 모범 사례 중 66%의 위반 감지는 전통적인 정적 분석의 범위를 벗어납니다.',
        items: [
          '네이밍: 대부분 린트 불가능',
          '언어: 혼합',
          '포매팅: 대부분 린트 가능',
          '문서화: 혼합',
          '코드 관용구: 대부분 린트 불가능',
        ],
      },
      {
        title: '교훈',
        content:
          'AutoCommenter의 LLM 지원 접근 방식은 인간 검토자가 자주 참조하는 모범 사례의 68%에 대해 코멘트를 생성합니다. 내재적 평가와 실제 성능은 상당히 다를 수 있으며, 외재적 평가와 시스템 개선이 성공적인 배포에 필수적이었습니다. 몇 가지 부정적인 사용자 경험만으로도 자동화된 시스템에 대한 신뢰가 약화될 수 있어, 실제 피드백을 지속적으로 모니터링하는 것이 중요했습니다.',
      },
      {
        title: '결론',
        content:
          '이 논문은 전통적인 도구를 훨씬 뛰어넘는 기능을 갖춘 엔드투엔드 시스템을 개발하면서도 높은 수준의 최종 사용자 수용을 달성하는 것이 가능함을 보여줍니다. 우선순위는 AutoCommenter가 매우 높은 정밀도를 갖도록 설계하여 긍정적인 개발자 경험을 보장하는 것이었습니다.',
      },
    ],
    keyTakeaways: [
      {
        title: 'AutoCommenter 시스템',
        content:
          'Google에서 개발한 LLM 기반 코드 리뷰 지원 시스템으로, 코딩 모범 사례를 자동으로 학습하고 적용합니다.',
      },
      {
        title: '4개 언어 지원',
        content:
          'C++, Java, Python, Go를 지원하며, 수만 명의 개발자에게 성공적으로 배포됨.',
      },
      {
        title: '린터 한계 극복',
        content:
          '전통적인 정적 분석 도구(린터)가 처리할 수 없는 66%의 모범 사례 위반을 감지할 수 있음.',
      },
      {
        title: '성과 지표',
        content:
          '40%의 코멘트 해결률과 80% 이상의 사용자 수용률 달성.',
      },
      {
        title: '주요 교훈',
        content:
          '내재적 평가와 실제 성능의 차이, 사용자 수용 모니터링의 중요성, 간단한 억제 메커니즘의 효과.',
      },
    ],
  },
  'week9/multi-agent-systems': {
    slug: 'multi-agent-systems',
    week: 9,
    title: 'The Role of Multi-Agent Systems in Making Software Engineers AI-Native',
    titleKr: '멀티 에이전트 시스템이 소프트웨어 엔지니어를 AI 네이티브로 만드는 역할',
    author: 'Spiros Xanthos, Gabor Angeli, Bharat Khandelwal',
    readTime: '약 8분',
    sourceUrl: 'https://resolve.ai/blog/role-of-multi-agent-systems-AI-native-engineering',
    sourceTitle: 'Resolve AI Blog',
    published: true,
    sections: [
      {
        title: '본문',
        content:
          '오늘날 엔지니어링에는 이상한 모순이 있다. AI를 활용하면 몇 시간 만에 전체 서비스를 구축할 수 있지만, 그 서비스에서 무엇이 잘못됐는지 파악하려면 여전히 분산된 여러 도구를 넘나들며 힘든 작업을 해야 한다.',
      },
      {
        title: '코딩과 프로덕션의 격차',
        content:
          '코딩: 서비스를 작성할 때 AI 네이티브 개발 환경을 열고 AI에게 "재시도와 타임아웃을 처리하는 결제 서비스를 만들어줘"라고 요청한다. AI가 코드베이스 컨텍스트를 활용해 에러 처리가 포함된 구현을 생성한다. 프로덕션: 같은 서비스에서 높은 레이턴시가 발생하면 가설 수립부터 시작한다 → Datadog에서 메트릭 확인 → Loki로 전환해 로그 확인 → 배포 이력과 교차 참조 → 타임스탬프 상관관계 분석 → 계속 반복. 문제는 AI 능력이 아니라 AI 시스템 설계 방식에 있다. 대부분의 엔지니어링 팀은 여전히 AI로 기존 워크플로우를 더 빠르게 실행하는 데만 집중하고, 일하는 방식 자체를 재구상하지 않는다.',
      },
      {
        title: 'AI 네이티브 엔지니어링이란? 왜 중요한가?',
        content:
          'AI 네이티브 엔지니어링은 엔지니어가 주로 AI와 상호작용해 작업을 조율하는 방식이다. 코드 작성이든 프로덕션 시스템 관리든 마찬가지다. "AI 네이티브"는 단순히 "AI를 사용하는" 것과 크게 다르다. AI 지원(AI-Assisted)에서는 AI 도구로 작업을 더 빠르게 수행하지만 워크플로우는 여전히 인간 중심이다. AI 네이티브(AI-Native)에서는 AI가 프로덕션 작업의 주요 인터페이스가 되어 엔지니어는 목표를 설정하고, AI 에이전트가 운영 작업을 처리한다.',
      },
      {
        title: '왜 멀티 에이전트 시스템이 필수적인가?',
        content:
          '현대 프로덕션 시스템은 학계에서 "환원 불가능한 상호의존성(irreducible interdependence)"이라고 부르는 특성을 보인다. 단일 AI 도구로는 모든 도메인에 걸친 전문가 수준의 지식을 유지하면서 조사를 조율할 수 없다. API 레이턴시가 10배 급증하면, 50개 이상의 마이크로서비스에 걸친 트레이스 상관관계 분석, 느린 데이터베이스 쿼리와 커넥션 풀 고갈 분석, 최근 배포 및 인프라 변경 확인 등 동시적 전문 분석이 필요하다.',
      },
      {
        title: '발전 프레임워크: 각 수준에서의 기술적 한계',
        content:
          'LLM: 피드백 루프나 실제 통합 없는 단일 패스 생성으로 엔지니어가 여전히 대부분의 운영 작업 수행. LLM + 도구: 제한된 컨텍스트 윈도우, 도구 상호작용 간 영속적 상태 관리 없음. 단일 에이전트: 다양한 추론 전략이나 병렬 조사 경로 관리 불가로 순차적 조사, 잘못된 가설에 갇힘. 멀티 에이전트: 분산 지능에는 형식적 통신 스키마와 충돌 해결이 필요하지만, 순차적 추론 제약을 돌파해 병렬 가설 테스트가 가능.',
      },
      {
        title: '멀티 에이전트 시스템 구축은 어려운 엔지니어링 문제다',
        content:
          '프로덕션 수준의 멀티 에이전트 시스템을 구축하려면 깊은 도메인 전문성과 AI 엔지니어링 역량이라는 드문 조합이 필요하다. 도메인 전문성이 아키텍처를 결정하고, AI 전문성이 에이전트들을 함께 작동하게 한다. 교차점에서 혁신적 시스템이 탄생한다.',
      },
      {
        title: 'Resolve AI 소개',
        content:
          'Resolve AI는 인시던트 해결과 프로덕션 운영을 돕는 상시 가동 AI SRE다. DataStax, Tubi, Rappi 같은 고객들은 Resolve AI를 통해 기계가 인간 대신 온콜을 맡게 하고 엔지니어들은 코딩에만 집중하게 함으로써 엔지니어링 속도와 시스템 신뢰성을 높였다.',
      },
      {
        title: '저자 소개',
        content:
          'Spiros Xanthos - OpenTelemetry 창시에 참여하고, Log Insight와 Omnition을 창업했으며, Splunk에서 SVP이자 관측성 사업부 GM을 역임. Gabor Angeli - Google DeepMind와 Square에서의 경험을 바탕으로 Gemini와 Square Assistant 같은 제품을 개발. Bharat Khandelwal - WorldQuant, Moveworks, Tower Research Capital에서 ML 전략 개발, Stanford CS 석사, IIT Bombay CS 학사.',
      },
    ],
    keyTakeaways: [
      {
        title: 'AI 네이티브 패러다임 전환',
        content:
          'AI 네이티브 엔지니어링은 단순히 AI를 사용하는 게 아니라 AI 에이전트가 주요 인터페이스가 되는 패러다임 전환',
      },
      {
        title: '환원 불가능한 상호의존성',
        content:
          '프로덕션 시스템의 "환원 불가능한 상호의존성"으로 인해 단일 AI 도구로는 복잡한 인시던트 대응 불가',
      },
      {
        title: '멀티 에이전트의 확장성',
        content:
          '멀티 에이전트 시스템만이 병렬 가설 테스트와 다중 도메인 전문화를 통해 확장 가능',
      },
      {
        title: '이중 전문성 필수',
        content:
          '성공적인 멀티 에이전트 시스템 구축에는 도메인 전문성과 AI 엔지니어링 역량이 동시에 필요',
      },
    ],
  },
  'week7/code-review-essentials': {
    slug: 'code-review-essentials',
    week: 7,
    title: 'Code Review Essentials for Software Teams',
    titleKr: '소프트웨어 팀을 위한 코드 리뷰 핵심 가이드',
    author: 'Blake Smith',
    readTime: '약 5분',
    sourceUrl:
      'https://blakesmith.me/2015/02/09/code-review-essentials-for-software-teams.html',
    sourceTitle: 'Blake Smith Blog',
    published: true,
    sections: [
      {
        title: '소개',
        content:
          '코드 리뷰는 협업 소프트웨어 프로젝트의 핵심입니다. 대규모 시스템에는 보통 여러 개발자가 참여하므로, 효과적인 팀이라면 발맞춰 나아가기 위한 견고한 프로세스가 필요합니다.',
        items: [
          '시스템 변경에 따라 팀원들이 멘탈 모델을 조정할 수 있도록 지원',
          '변경 사항이 문제를 제대로 해결하는지 확인',
          '설계의 장단점을 논의할 기회 제공',
          '버그가 프로덕션에 배포되기 전에 발견',
          '코드 스타일과 구조의 일관성 유지',
        ],
      },
      {
        title: '팀원 간 정렬 유지',
        content:
          '코드 리뷰의 근본 목적은 개발 과정 전반에서 팀의 정렬 상태를 유지하는 것입니다. 시스템 변경을 이해해야 하며, 리뷰를 통해 팀의 멘탈 모델을 동기화합니다. 팀원이 수정 사항을 제출하면, 동료들은 영향받는 하위 시스템에 대한 이해를 갱신하며 코드를 검토합니다. 리뷰어가 명확한 질문을 던지면, 작성자는 자신의 논리를 설명합니다. 이런 상호 교육은 나중에 수정이 필요할 때 큰 가치를 발휘합니다. 기존 멘탈 모델 덕분에 코드 탐색 없이도 작업 속도가 빨라집니다. 협업적 정렬은 모두에게 이득입니다.',
      },
      {
        title: '좋은 풀 리퀘스트(Pull Request) 만들기',
        content:
          '코딩을 시작하기 전, 다음 기본 질문들을 고려하세요. 이 질문들에 미리 답하면 흔한 함정을 피할 수 있습니다. 근본적인 설계 불일치로 거부당하거나, 정확성 검증을 기다리며 지연되는 상황 말입니다. 작업을 한입 크기로 나누고 철저히 테스트하면 리스크가 줄어들고, 변경 사항을 추론하기 쉬워지며, 더 나은 설계로 이어집니다.',
        items: [
          '지금 이 작업이 올바른 선택인가?',
          '팀이 이 변경에 이미 동의했는가?',
          '이 변경을 리뷰하고 이해하기 쉽게 작은 단위로 어떻게 나눌까?',
          '버그를 잡고 정확성을 확보하려면 어떻게 테스트할까?',
        ],
      },
      {
        title: '풀 리퀘스트 보내기',
        content:
          '팀 정렬이 이뤄지고 구현이 완료되면, 효과적인 커뮤니케이션이 핵심입니다. 동료들은 아마 시스템의 다른 부분에서 전혀 다른 맥락으로 일하고 있을 겁니다. 이 맥락 차이를 극복하려면, 무엇이 어떻게 변경되었고 왜 변경되었는지, 코드만으로는 알 수 없는 정보까지 잘 정리된 설명으로 안내해야 합니다. 설명적인 제목과 버그 참조로 즉각적인 맥락을 제공하고, 중요도를 설명하며, 구조적 변경 사항을 정리하고, 수행한 테스트를 문서화해야 합니다.',
      },
      {
        title: '리뷰어: 건설적인 피드백 제공하기',
        content:
          '좋은 피드백은 명확성과 정렬을 확보하면서 시스템에 대한 공동 이해와 코드 품질 향상을 이끕니다. 피드백을 질문으로 구성하면 명확성과 정확성을 높이면서 개발자 성장을 돕습니다. 이 접근법은 좋은 창작 글쓰기 모임과 비슷합니다. 구체적인 관찰이 막연한 거부보다 훨씬 건설적입니다. 개발자는 본래 문제 해결과 결함 찾기를 즐깁니다. 코드 리뷰가 동료 비판으로 자아를 확인하는 장이 되어선 안 됩니다. 진정한 목적은 다양한 관점에서 중요한 문제를 포착하면서 실력 향상을 장려하는 것입니다.',
        items: [
          '이 코드는 음수 정수를 어떻게 처리하나요?',
          '이 부분이 헷갈립니다. 클래스 A가 왜 클래스 B와 통신하는지 모르겠어요.',
          '여기서 인터페이스 경계를 넘은 것 같은데, 사용자에게 어떤 영향이 있을까요?',
        ],
      },
      {
        title: '스타일 포인트',
        content:
          '들여쓰기, 간격, 명명 규칙, 중괄호 위치도 신경 쓸 가치가 있지만 리뷰에서 우선순위가 낮습니다. 리뷰 시간의 90%를 이런 세부 사항에 쓰는 팀은 스타일 가이드와 체크인 강제로 자동화할 수 있는 부분에 협업 에너지를 낭비하는 겁니다. 일관되고 관용적인 스타일은 코드베이스 가독성을 크게 높입니다. 하지만 스타일에만 집착하면 더 어렵고 가치 있는 일을 회피하게 됩니다. 바로 팀 멘탈 정렬 유지와 상위 수준 설계 결정 평가입니다. 균형이 핵심입니다.',
      },
      {
        title: '저자 소개',
        content:
          'Blake Smith는 Sprout Social의 수석 소프트웨어 엔지니어(Principal Software Engineer)입니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '팀 정렬 유지',
        content:
          '코드 리뷰의 근본 목적은 팀원들의 멘탈 모델을 동기화하여 정렬 상태를 유지하는 것',
      },
      {
        title: '좋은 PR 작성',
        content:
          '좋은 풀 리퀘스트는 코딩 전 기본 질문에 답하고, 작업을 작은 단위로 나눠 테스트해야 함',
      },
      {
        title: '명확한 설명',
        content:
          '풀 리퀘스트 설명은 무엇이, 왜 변경되었는지 명확히 전달해야 함',
      },
      {
        title: '건설적인 피드백',
        content:
          '건설적인 피드백은 구체적인 질문 형태로 제공하여 개발자 성장을 지원',
      },
      {
        title: '스타일 자동화',
        content:
          '스타일 문제는 자동화하고, 설계 결정과 팀 정렬에 더 많은 시간 투자 필요',
      },
    ],
  },
  'week7/how-to-review-code-effectively': {
    slug: 'how-to-review-code-effectively',
    week: 7,
    title: 'How to Review Code Effectively: A GitHub Staff Engineer\'s Philosophy',
    titleKr: '효과적인 코드 리뷰 방법: GitHub 스태프 엔지니어의 철학',
    author: 'Sarah Vessels',
    readTime: '약 10분',
    sourceUrl: 'https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/',
    sourceTitle: 'GitHub Blog',
    published: true,
    sections: [
      {
        title: '들어가며',
        content:
          'GitHub 스태프 엔지니어 Sarah Vessels가 8년간 7,000건 이상의 풀 리퀘스트(Pull Request)를 리뷰한 경험을 바탕으로 코드 리뷰 접근법을 공유합니다. 그녀는 코드 리뷰가 소프트웨어 개발에서 가장 중요한 부분 중 하나라고 강조하며, 자신의 작업보다 팀원의 풀 리퀘스트 리뷰를 우선합니다.',
      },
      {
        title: '코드 리뷰란?',
        content:
          '풀 리퀘스트 리뷰를 통한 코드 리뷰는 협업자가 제안된 변경 사항에 코멘트를 달고, 수정을 승인하거나, 병합 전에 추가 개선을 요청할 수 있게 합니다. Vessels는 풀 리퀘스트를 "대화의 시작"으로 정의합니다. 코드 리뷰는 지식 교환을 촉진하고 배포 속도를 높여 커리어에 큰 영향을 미칩니다. 리뷰는 동료와 관리자가 전문적 기여를 평가할 때 참조할 수 있는 "링크 가능한 산출물"을 만들어냅니다.',
      },
      {
        title: '코드 리뷰 프로세스 최적화하기',
        content:
          'Vessels는 GitHub 알림 인박스를 주요 작업 공간으로 삼아 CI 빌드를 기다리거나, 작업 사이, 또는 하루를 시작할 때 확인합니다. GitHub Slack 통합과 고급 검색 쿼리 사용을 권장합니다. 대규모 리뷰어 팀은 책임 분산 문제를 일으킵니다. 코드 경계가 명확하게 정의된 CODEOWNERS 파일이 알림을 제한하고 리뷰어 피로를 막는 데 도움이 됩니다. CODEOWNERS 파일과 브랜치 보호 규칙 같은 저장소 수준 도구가 리뷰 표준을 강제합니다.',
      },
      {
        title: '좋은 코드 리뷰와 나쁜 코드 리뷰의 차이',
        content:
          '좋은 코드 리뷰는 명확성을 더하고 코드를 개선된 상태로 이끕니다. 나쁜 리뷰는 구체성이 부족해 작성자가 철저함이나 다음 단계에 대해 확신을 갖지 못하게 합니다. 효과적인 리뷰어는 개인적 선호와 승인 차단 요소를 구분합니다. 같은 저장소에서 구체적인 예시를 제공하면 일관성을 보여주며 제안이 강화됩니다.',
      },
      {
        title: '좋은 코드 리뷰를 하는 방법',
        content:
          'Vessels는 풀 리퀘스트 작성자가 자신의 변경에 대해 가장 많은 맥락을 가지고 있다고 봅니다. 코드 가정을 탐구하는 질문이 특히 가치 있습니다. 질문 외에도 리뷰어는 풀 리퀘스트에서 좋았던 점에 코멘트해야 합니다. 코드 영역이나 작성자 연차에 대한 리뷰어 편견은 문제를 간과할 위험이 있습니다. Vessels는 승인을 제품 개선을 막는 차단 게이트로 보기 때문에 신중하게 승인을 보류합니다. \'Request changes\' 옵션은 즉각적인 보안 문제에만 사용합니다.',
      },
      {
        title: 'AI 코딩 도구와 코드 리뷰',
        content:
          'AI 코딩 도구는 부정확하거나 안전하지 않은 코드에 대한 안전장치를 포함하지만, 잘못된 안심을 만들면 안 됩니다. 인간 리뷰어가 최종 방어선이며 모든 코드를 동일한 주의로 리뷰해야 합니다.',
      },
      {
        title: '코드 리뷰에서 최대한 얻는 방법',
        content:
          'GitHub 시니어 소프트웨어 엔지니어 Paul Smith가 Vessels에게 다른 사람의 리뷰를 요청하기 전에 셀프 리뷰를 가르쳤습니다. 리뷰 완료 전에 풀 리퀘스트가 병합되더라도 Vessels는 여전히 나중의 피드백을 환영합니다. 풀 리퀘스트를 드래프트로 만들면 리뷰 준비 상태를 알립니다. "식초보다 꿀로 더 많은 파리를 잡는다"는 말이 여기 적용됩니다.',
      },
      {
        title: '마무리',
        content:
          '특히 AI 코드 생성 시대에 제품 품질에 대한 코드 리뷰의 중요성은 아무리 강조해도 지나치지 않습니다. 두 번째 눈의 리뷰로 수많은 버그가 잡히고 장애가 예방되었습니다. 코드 리뷰는 매일 리뷰하고, 프로세스를 개선하고, 자동화를 구축하는 데 시간을 투자할 가치가 있습니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '코드 리뷰의 중요성',
        content:
          '코드 리뷰는 지식 교환, 커리어 발전, 제품 품질 향상에 필수입니다',
      },
      {
        title: '풀 리퀘스트 발견',
        content:
          '풀 리퀘스트를 찾으려면 GitHub 알림, Slack 통합, 고급 검색 쿼리를 활용하세요',
      },
      {
        title: 'CODEOWNERS 활용',
        content:
          'CODEOWNERS 파일을 잘 정리하고 리뷰어 팀을 작게 유지해 알림 피로를 막으세요',
      },
      {
        title: '좋은 리뷰의 특징',
        content:
          '좋은 리뷰는 구체적이고, 근거를 대며, 명확한 해결책을 제안합니다',
      },
      {
        title: '질문과 긍정적 피드백',
        content:
          '질문하고, 긍정적 피드백을 주며, 편견을 인식하세요',
      },
      {
        title: 'Request changes 신중히',
        content:
          '\'Request changes\'는 즉각적인 보안 문제에만 신중히 사용하세요',
      },
      {
        title: 'AI 시대의 리뷰어',
        content:
          'AI 코딩 도구 시대에도 인간 리뷰어가 최종 방어선입니다',
      },
      {
        title: '셀프 리뷰',
        content:
          '다른 사람의 리뷰 전에 먼저 자신의 코드를 리뷰하세요',
      },
      {
        title: '드래프트 상태',
        content:
          '드래프트 상태로 리뷰 준비 상태를 명확히 알리세요',
      },
      {
        title: '품위 있는 응답',
        content:
          '피드백에 품위 있게 응답하고 약속을 이행해 신뢰를 쌓으세요',
      },
    ],
  },
  'week9/agentic-ai-benefits': {
    slug: 'agentic-ai-benefits',
    week: 9,
    title: 'The Top 5 Benefits of Agentic AI in On-call Engineering',
    titleKr: '온콜 엔지니어링에서 에이전틱 AI의 5가지 핵심 이점',
    author: 'Mitch Wakefield, Resolve AI 제품 연구원',
    readTime: '약 5분',
    sourceUrl: 'https://resolve.ai/blog/Top-5-Benefits',
    sourceTitle: 'Resolve AI Blog',
    published: true,
    sections: [
      {
        title: '1. 알림 피로 해소',
        content:
          '알림이 발생하면 에이전틱 AI가 메트릭, 대시보드, 코드 변경, 배포, 로그를 분석하여 조사합니다. 시스템은 몇 분 만에 근본 원인을 파악하고 해결책을 권장합니다. 인간 엔지니어와 달리 피로 없이 지속 운영되어 24시간 일관된 커버리지를 보장하고 세부 사항 누락을 방지합니다.',
      },
      {
        title: '2. 동적 지식 유지',
        content:
          '에이전틱 AI는 오래된 정적 런북에 의존하지 않고 각 인시던트에서 학습합니다. 이런 지속적 학습으로 팀원이 떠나도 조직 지식이 보존되어, 전문 지식을 유지하고 진화하는 시스템 패턴에 적응하며 지속적인 회복력을 확보합니다.',
      },
      {
        title: '3. 일관되고 포괄적인 조사',
        content:
          '이 기술은 전문화된 에이전트를 배치해 조사 가변성을 제거합니다. 일부는 로그를, 다른 일부는 메트릭을 분석하며 체계적으로 협업합니다. 이를 통해 조직 전체에 신뢰할 수 있고 반복 가능한 문제 해결 프로세스를 확립합니다.',
      },
      {
        title: '4. 증거 기반의 원활한 협업',
        content:
          'Resolve AI 같은 플랫폼은 Slack 등의 도구와 통합되어 조사 단계와 결과를 근거 자료와 함께 실시간 문서화합니다. 이 문서화로 인시던트를 더 빠르게 해결하고, 사후 검토와 향후 최적화를 위한 인사이트도 얻습니다.',
      },
      {
        title: '5. 사전 예방적 인시던트 해결',
        content:
          'AI 에이전트는 메트릭과 로그 패턴을 분석해 문제가 확대되기 전에 잠재적 이슈를 식별합니다. 자동으로 문제를 해결하거나 실행 가능한 권장 사항을 전달해 다운타임과 운영 스트레스를 줄입니다.',
      },
      {
        title: '에이전틱 AI 작동 방식: Resolve AI 접근법',
        content:
          'Resolve AI 시스템은 근본 원인 분석, 해결, 관측성 해석 등 특정 기능을 담당하는 자율 에이전트를 갖추고 있으며, 수동 학습 없이 협업 운영됩니다. 이 멀티 에이전트 아키텍처로 다양한 인프라의 일상적 문제와 새로운 문제를 모두 관리합니다.',
      },
      {
        title: '온콜 엔지니어링의 미래',
        content:
          '에이전틱 AI는 팀을 반응적 긴급 대응에서 전략적 혁신으로 전환시킵니다. 일상 업무를 처리하면서 지속적 학습과 사전 예방적 문제 해결로 안정성을 높이며, 인시던트 관리의 근본적 패러다임 전환을 이끕니다.',
      },
      {
        title: '핵심 요약',
        content:
          '에이전틱 AI는 협업하는 독립적 에이전트로 인시던트 관리를 근본적으로 바꿉니다. 알림 피로 해소, 지식 보존, 워크플로우 표준화, 사전 예방적 이슈 방지를 통해 팀이 전략적 개선에 집중하도록 합니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '인시던트 관리 자동화',
        content:
          '에이전틱 AI가 온콜 엔지니어링의 인시던트 관리를 자동화하고 효율화',
      },
      {
        title: '24시간 일관된 모니터링',
        content:
          '24시간 알림 피로 없이 일관된 모니터링과 근본 원인 분석 제공',
      },
      {
        title: '동적 학습과 지식 보존',
        content:
          '동적 학습으로 런북의 한계를 극복하고 조직 지식 보존',
      },
      {
        title: '체계적인 문제 해결',
        content:
          '멀티 에이전트 협업으로 체계적이고 반복 가능한 문제 해결 프로세스 확립',
      },
      {
        title: '사전 예방적 이슈 방지',
        content:
          '사전 예방적 문제 식별로 다운타임과 운영 스트레스 감소',
      },
    ],
  },
  'week9/kubernetes-troubleshooting': {
    slug: 'kubernetes-troubleshooting',
    week: 9,
    title: 'Kubernetes Troubleshooting in Resolve AI',
    titleKr: 'Resolve AI의 쿠버네티스 트러블슈팅',
    author: 'Resolve AI',
    readTime: '약 5분',
    sourceUrl: 'https://resolve.ai/blog/kubernetes-troubleshooting-in-resolve-ai',
    sourceTitle: 'Resolve AI Blog',
    published: true,
    sections: [
      {
        title: '쿠버네티스 트러블슈팅의 어려움',
        content:
          '2014년 6월 첫 커밋 이후, 쿠버네티스는 44개국 8,000개 이상 기업의 88,000명 넘는 기여자가 참여하는 컨테이너 오케스트레이션의 사실상 표준이 되었습니다. 자가 복구와 선언적 특성 덕분에 손쉬운 확장과 고가용성을 약속하지만, 프로덕션 환경에서 쿠버네티스를 관리하기란 결코 간단하지 않습니다.',
        items: [
          '양치기 소년 같은 시끄러운 알림: 사소한 문제가 알림을 트리거하지만 대응 전에 저절로 해결되어 알림 피로 발생',
          '일시적인 Pod, 사라진 컨텍스트: Pod 크래시 시 귀중한 트러블슈팅 컨텍스트도 함께 사라짐',
          '관측성 데이터의 미로: 로그가 노드, Pod, 컨테이너에 흩어져 디버깅이 답답한 작업이 됨',
        ],
      },
      {
        title: '에이전틱 AI가 트러블슈팅을 바꾸는 방법',
        content:
          'Resolve AI의 에이전틱 AI는 24시간 연중무휴 쿠버네티스 전문가로서 점들을 연결하고, 실행 가능한 인사이트를 도출하며, 지루한 조사를 자동화합니다. 여러 소스에서 데이터를 수집하고, 고유한 문제와 반복되는 문제를 파악하며, 운영 오버헤드를 최소화하면서 해결을 간소화합니다.',
        items: [
          '항상 깨어있는 전문성: 알림 발생 시 클러스터에 뛰어들어 명확하고 실행 가능한 인사이트 제시',
          '컨텍스트와 명확성을 위한 지식 그래프: Pod, 노드, 서비스 등 엔티티를 연결해 놓치기 쉬운 패턴 발견',
          '모든 텔레메트리에서 노이즈 없는 분석: Prometheus 메트릭, Datadog 로그 등 다양한 소스 데이터를 분석해 실행 가능한 명확성으로 변환',
        ],
      },
      {
        title: '에이전틱 AI의 실제 동작',
        content:
          'Pod 크래시 알림을 받았을 때, kubectl과 씨름하거나 끝없는 로그를 파싱하는 대신 AI Production Engineer가 나섭니다.',
        items: [
          '이벤트 타임라인 재구성: 크래시로 이어진 과정을 조합—리소스 경합, 구성 실수, 외부 스로틀링 등',
          '클러스터 전반의 이슈 상관관계 분석: 지식 그래프로 Pod, 노드, 네임스페이스 전반에서 유사한 이상 징후 확인',
          '자동화된 조사 실행: 런북을 자동 실행해 "OOM 에러였나?", "잘못 구성된 시작 명령어인가?" 등 가설 테스트',
          '해결책 제공: 해결책을 찾으면 제안하고, 찾지 못하면 명확한 다음 단계 제시',
        ],
      },
      {
        title: '어려울 필요가 없는데 왜 어렵게 하나요?',
        content:
          '쿠버네티스는 복잡하지만, 트러블슈팅은 그럴 필요가 없습니다. Resolve AI는 내장된 전문성을 활용해 반복적인 화재 진압을 없애고, 운영을 간소화하며, 밤과 주말을 돌려줌으로써 쿠버네티스 관리 방식을 혁신합니다. 패턴을 발견하고, 조사를 자동화하며, 클러스터가 원활하게 돌아가도록 유지합니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '쿠버네티스 트러블슈팅의 3대 과제',
        content:
          '알림 피로, 일시적 Pod의 컨텍스트 손실, 분산된 관측성 데이터로 인해 프로덕션 환경 트러블슈팅이 어려움',
      },
      {
        title: '에이전틱 AI의 3대 핵심 기능',
        content:
          '24시간 연중무휴 전문성, 지식 그래프를 통한 시스템적 문제 파악, 노이즈 없는 텔레메트리 분석',
      },
      {
        title: 'AI Production Engineer의 동작',
        content:
          '이벤트 타임라인 재구성, 클러스터 전반 상관관계 분석, 자동화된 조사 실행, 해결책 제시로 온콜 부담 감소',
      },
    ],
  },
  'week7/ai-code-review-best-practices': {
    slug: 'ai-code-review-best-practices',
    week: 7,
    title: 'AI Code Review Implementation and Best Practices',
    titleKr: 'AI 코드 리뷰 구현 및 모범 사례',
    author: 'Graphite',
    readTime: '약 12분',
    sourceUrl: 'https://graphite.com/guides/ai-code-review-implementation-best-practices',
    sourceTitle: 'Graphite Guide',
    published: true,
    sections: [
      {
        title: '소개',
        content:
          '인공지능이 소프트웨어 개발 워크플로우에 점점 더 깊이 통합되면서, AI 코드 리뷰가 코드 품질과 개발자 생산성을 높이는 강력한 도구로 부상했습니다.',
      },
      {
        title: 'AI 코드 리뷰 이해하기',
        content:
          'AI 코드 리뷰는 머신러닝과 자연어 처리 기술을 활용해 버그, 보안 취약점, 성능 비효율, 스타일 불일치, 아키텍처 및 설계 결함을 자동으로 분석합니다.',
      },
      {
        title: 'AI 코드 리뷰의 장점',
        content: 'AI 코드 리뷰가 제공하는 주요 이점입니다.',
        items: [
          '효율성 향상 - 자동화로 리뷰 시간을 줄이고 문제를 조기에 발견',
          '일관성 유지 - AI가 모든 코드 리뷰에 동일한 기준 적용',
          '지식 공유 - 개발자가 AI 제안을 통해 모범 사례 학습',
          '인지 부하 경감 - AI가 일상적인 검사를 처리',
          '지속적 개선 - AI 시스템이 시간이 지나면서 성능 향상',
        ],
      },
      {
        title: 'AI 코드 리뷰 구현',
        content: '효과적인 AI 코드 리뷰 구현을 위한 3단계 가이드입니다.',
        items: [
          '1단계: 적절한 도구 선택',
          '2단계: 개발 워크플로우에 통합',
          '3단계: 커스터마이징 및 미세 조정',
        ],
      },
      {
        title: 'AI 코드 리뷰 모범 사례',
        content: 'AI 코드 리뷰를 효과적으로 활용하기 위한 핵심 사례입니다.',
        items: [
          '명확한 기대치 설정',
          '휴먼 인 더 루프 접근법',
          '실행 가능한 피드백에 집중',
          '지속적 학습',
          '보안 우선 마인드셋',
          '성능 최적화',
        ],
      },
      {
        title: '인기 있는 AI 코드 리뷰 도구',
        content: '주요 AI 코드 리뷰 도구들의 특징입니다.',
        items: [
          'Graphite Agent - 컨텍스트 기반 코드 분석',
          'DeepCode - 보안 취약점 탐지에 특화',
          'Codacy - 기존 분석과 AI 기능 결합',
          'SonarQube AI - 엔터프라이즈급 코드 품질 플랫폼',
        ],
      },
      {
        title: '성공 측정',
        content: 'AI 코드 리뷰 구현 효과를 평가하기 위한 메트릭입니다.',
        items: [
          '품질 메트릭 - 버그 감소, 보안 인시던트 감소',
          '프로세스 메트릭 - 리뷰 완료 시간, 개발자 만족도',
          'ROI 메트릭 - 절약된 개발 시간, 기술 부채 감소',
        ],
      },
      {
        title: '일반적인 문제와 해결책',
        content: 'AI 코드 리뷰에서 자주 발생하는 문제와 대응 방안입니다.',
        items: [
          '오탐이 개발자를 압도 → 민감도 설정 조정',
          'AI 리뷰에 대한 팀 저항 → 점진적 가치 입증',
          'AI가 컨텍스트별 문제를 놓침 → 인간 리뷰로 보완',
        ],
      },
    ],
    keyTakeaways: [
      {
        title: 'AI 코드 리뷰의 역할',
        content: '머신러닝과 자연어 처리를 활용해 버그, 보안 취약점, 성능 문제를 자동으로 탐지',
      },
      {
        title: '주요 장점',
        content: '효율성 향상, 일관성, 지식 공유, 인지 부하 경감 등의 이점 제공',
      },
      {
        title: '구현 3단계',
        content: '도구 선택, 워크플로우 통합, 커스터마이징의 3단계로 구현',
      },
      {
        title: '휴먼 인 더 루프',
        content: 'AI를 첫 번째 패스로 사용하고 인간이 검증하는 접근법 권장',
      },
      {
        title: '보안 우선',
        content: 'AI 제안이 새로운 취약점을 도입하지 않도록 주의',
      },
      {
        title: '성공 측정',
        content: '품질, 프로세스, ROI 메트릭으로 효과 측정',
      },
      {
        title: 'AI는 보완 도구',
        content: 'AI는 인간 전문성의 대체가 아닌 보완으로 접근해야 함',
      },
    ],
  },
  'week9/observability-basics': {
    slug: 'observability-basics',
    week: 9,
    title: 'Traces & Spans: Observability Basics You Should Know',
    titleKr: '트레이스와 스팬: 알아야 할 관측성 기초',
    author: 'Anjali Udasi',
    readTime: '약 10분',
    sourceUrl: 'https://last9.io/blog/traces-spans-observability-basics/',
    sourceTitle: 'Last9 Blog',
    published: true,
    sections: [
      {
        title: '트레이스와 스팬 이해하기: 핵심 개념',
        content:
          '트레이스는 요청이 분산 시스템을 통과하는 여정을 캡처합니다. 스팬은 트레이스의 구성 요소로, 각 스팬은 여정 내의 작업 단위를 나타냅니다.',
        items: [
          '트레이스는 여러 개의 스팬을 포함',
          '각 스팬은 하나의 작업을 나타냄',
          '스팬은 타이밍 데이터와 메타데이터를 보유',
          '스팬이 중첩되어 작업들의 상호 관계를 표현',
        ],
      },
      {
        title: 'DevOps 전문가를 위한 트레이스와 스팬의 이점',
        content:
          '수십 개의 마이크로서비스로 구성된 복잡한 시스템에서 트레이스와 스팬으로 문제를 빠르게 해결할 수 있습니다.',
        items: [
          '병목 지점 즉시 발견: 어떤 서비스나 함수가 오래 걸리는지 정확히 확인',
          '서비스 경계를 넘어 디버그: 요청이 서비스 간에 이동하는 과정을 추적',
          '의존성 파악: 서비스들이 어떻게 연결되고 서로 의존하는지 시각화',
          '성능 개선: 느린 작업을 정밀하게 식별하고 수정',
          '평균 복구 시간(MTTR) 단축: 문제 발생 시 근본 원인을 더 빠르게 파악',
        ],
      },
      {
        title: '트레이스와 스팬의 기술적 구현',
        content:
          '트레이스 컨텍스트와 전파를 통해 서비스 경계를 넘어 동일한 요청을 추적합니다. 스팬은 Name, Timing, Status, Attributes, Events, Links 등 풍부한 데이터를 담고 있습니다. 샘플링 전략(헤드 기반, 테일 기반, 우선순위)으로 데이터 양을 관리합니다.',
      },
      {
        title: '트레이싱 구현 가이드: 도구와 프레임워크',
        content:
          'OpenTelemetry가 업계 표준 프레임워크이며, Jaeger, Zipkin, Grafana Tempo, OpenTelemetry Collector 등 다양한 도구와 함께 사용할 수 있습니다. Node.js, Python 등 주요 언어에서 자동 계측을 지원합니다.',
      },
      {
        title: '고급 트레이싱 기법',
        content:
          'W3C Trace Context 명세를 따르는 분산 컨텍스트 관리, Exemplar 트레이스와 로그의 트레이스 ID를 통한 상관관계, 스팬에 오류 상태와 예외를 기록하는 오류 처리 등 고급 기법을 활용할 수 있습니다.',
      },
      {
        title: '실제 트레이싱 패턴과 안티패턴',
        content:
          '효과적인 패턴: 의미 있는 스팬 이름, 적절한 세분성, 컨텍스트 전파, 유용한 속성, 성능 인식. 안티패턴: 과도한 계측, 컨텍스트 누락, 일관성 없는 네이밍, 과다한 데이터, 서드파티 서비스 무시.',
      },
      {
        title: '트레이스와 스팬의 비즈니스 가치',
        content:
          '트레이스는 기술적 문제 해결뿐 아니라 비즈니스 인사이트도 제공합니다. 핵심 사용자 여정 추적, 비즈니스 작업 성능 측정, SLO 설정, 성능 문제 비용 정량화 등에 활용 가능합니다.',
      },
      {
        title: '결론',
        content:
          '트레이스와 스팬은 분산 시스템을 투시하는 X-ray 비전을 제공합니다. 시스템이 더욱 복잡해지면서, 이런 관측성은 사치가 아니라 필수입니다.',
      },
      {
        title: 'FAQ',
        content:
          '트레이싱과 로깅의 차이, 성능 영향(일반적으로 3% 미만), 자동 계측 지원, 데이터 생성량, 보안/컴플라이언스 활용, 다른 관측성 신호와의 관계에 대한 질문과 답변.',
      },
    ],
    keyTakeaways: [
      {
        title: '트레이스와 스팬 개념',
        content:
          '트레이스는 요청이 분산 시스템을 통과하는 전체 여정을 캡처하고, 스팬은 여정 내의 개별 작업 단위를 나타냄',
      },
      {
        title: '트레이스와 스팬의 이점',
        content:
          '병목 지점을 즉시 발견하고, 서비스 경계를 넘어 디버그하며, MTTR을 단축할 수 있음',
      },
      {
        title: 'OpenTelemetry 업계 표준',
        content:
          'OpenTelemetry가 트레이싱의 업계 표준이며, Jaeger, Zipkin, Grafana Tempo 등 다양한 도구와 함께 사용 가능',
      },
      {
        title: '효과적인 트레이싱 패턴',
        content:
          '의미 있는 스팬 이름, 적절한 세분성, 컨텍스트 전파가 중요',
      },
      {
        title: '비즈니스 인사이트 활용',
        content:
          '트레이스는 기술적 문제 해결뿐 아니라 비즈니스 인사이트와 SLO 설정에도 활용 가능',
      },
    ],
  },
  'week9/autonomous-teammate': {
    slug: 'autonomous-teammate',
    week: 9,
    title: 'Resolve AI Product Deep Dive: Your New Autonomous Teammate',
    titleKr: 'Resolve AI 제품 딥다이브: 새로운 자율 팀원',
    author: 'Seerut Sidhu, Product Manager',
    readTime: '약 5분',
    sourceUrl: 'https://resolve.ai/blog/product-deep-dive',
    sourceTitle: 'Resolve AI Blog',
    published: true,
    sections: [
      {
        title: '새로운 온콜 팀원을 만나보세요',
        content:
          'Resolve AI는 인시던트 조사와 해결을 혁신하는 프로덕션 엔지니어링을 위한 기반 AI 플랫폼을 구축했습니다. 덕분에 엔지니어들은 가장 잘하는 일, 혁신하고 미래를 만드는 일에 집중할 수 있습니다. Resolve AI는 프로덕션 시스템과 도구를 이해하고, 알림에 대응하며, 협업하고, 무엇이 잘못됐는지와 해결 방법을 파악해 시간을 아껴줍니다. 자동화된 인시던트 사후 검토까지 작성해줍니다.',
      },
      {
        title: '빛의 속도로 시스템과 도구를 이해합니다',
        content:
          'Resolve AI는 빠르게 시작할 수 있습니다. 개별 파드까지 모든 인프라와 원활하게 연결됩니다. Grafana, Datadog 같은 관측성 플랫폼부터 Jenkins 같은 CI/CD 파이프라인, GitHub 코드베이스까지 모든 도구와 통합됩니다. Resolve AI를 통합하면 즉시 환경을 포괄적으로 매핑하기 시작합니다. 전체 시스템과 도구의 동적 지식 그래프를 구축하고, 새로운 배포, 시스템 이벤트, 설정 변경, 코드 변경이 발생할 때마다 실시간으로 업데이트합니다.',
      },
      {
        title: '로그인하기 전에 알림에 대응합니다',
        content:
          '알림이 발생하면 Resolve AI가 즉시 움직입니다. 온콜 엔지니어처럼 관련 데이터를 모두 검토하며 곧바로 조사를 시작합니다. 메트릭, 대시보드, 코드 변경, 배포, 로그를 검토하는 적시 런북을 자율적으로 생성하고 실행합니다. 1분도 안 돼서 Resolve AI는 근본 원인 이론을 파악하고 해결 방법을 제안합니다.',
      },
      {
        title: '무엇이 잘못됐고 어떻게 고칠지 알려줍니다',
        content:
          'Resolve AI는 전체 이벤트를 종합 분석하여 모든 변경 사항과 시스템 동작을 추적해 근본 원인을 찾습니다. 대시보드를 지능적으로 해석하고, 로그를 검토하며, 이상 징후를 탐지합니다. 설정 오류든 코드 변경이든 다운스트림 서비스 문제든 배포 문제든, Resolve AI는 정밀하게 식별합니다. 이론을 세우고, 어떻게 그 결론에 도달했는지 설명하며, 해결을 위한 실행 가능한 단계를 제공합니다.',
      },
      {
        title: '협업하거나, 안내하거나, Resolve AI가 주도권을 잡게 하세요',
        content:
          'Resolve AI를 팀원처럼 함께 일할 수 있습니다. 질문하고, 다른 이론을 탐색하거나, 마지막 배포로 롤백하거나 파드를 재시작하라고 지시할 수 있습니다. Slack에서 @멘션으로 대화에 참여시키거나 Resolve AI UI로 사용할 수도 있습니다.',
      },
      {
        title: '인시던트 검토 시간을 아껴줍니다',
        content:
          '인시던트가 해결되면 Resolve AI는 최초 알림부터 근본 원인, 해결 과정까지 모든 것을 요약한 상세한 인시던트 사후 검토를 작성합니다. 운영 시간을 절약하고, 다음에 배우고 개선할 명확하고 간결한 기록을 남깁니다.',
      },
      {
        title: '온콜을 영원히 바꿀 준비가 되셨나요?',
        content:
          'Resolve AI는 인시던트 관리 경험을 혁신하러 왔습니다. 깊은 통합과 엔터프라이즈급 보안으로 온콜을 Resolve AI에게 맡길 수 있습니다. 프로덕션 운영의 복잡하고 시간 소모적인 부분을 자율적으로 처리해서 흥미로운 일에 집중할 수 있게 해줍니다.',
      },
    ],
    keyTakeaways: [
      {
        title: 'AI 프로덕션 엔지니어',
        content:
          '알림 처리, 근본 원인 분석, 인시던트 해결을 자동화하는 자율 팀원',
      },
      {
        title: '시스템 이해',
        content:
          '모든 인프라와 도구에 연결해 실시간 업데이트되는 동적 지식 그래프 구축',
      },
      {
        title: '빠른 대응',
        content:
          '로그인 전 알림 분석, 1분 내 근본 원인 이론과 해결 방법 제시',
      },
      {
        title: '협업 가능',
        content: '팀원처럼 질문하고 지시하며 Slack이나 UI로 상호작용',
      },
      {
        title: '사후 검토 자동화',
        content: '인시던트 해결 후 상세한 검토 보고서 자동 생성',
      },
    ],
  },
  'week6/owasp-top-ten': {
    slug: 'owasp-top-ten',
    week: 6,
    title: 'OWASP Top Ten: The Leading Web Application Security Risks',
    titleKr: 'OWASP Top Ten: 주요 웹 애플리케이션 보안 위협',
    author: 'OWASP Foundation',
    readTime: '약 10분',
    sourceUrl: 'https://owasp.org/www-project-top-ten/',
    sourceTitle: 'OWASP',
    published: true,
    sections: [
      {
        title: '개요',
        content:
          'OWASP Top Ten은 "개발자와 웹 애플리케이션 보안 전문가를 위한 표준 인식 문서"입니다. 최신 버전인 OWASP Top Ten 2025와 이전 버전인 2021, 2017을 확인할 수 있습니다.',
      },
      {
        title: '목적',
        content:
          '이 문서는 보안 코딩을 실천하려는 개발자를 위한 기초 자료입니다. 조직은 이 문서를 채택하여 웹 애플리케이션의 위험을 최소화하는 프로세스를 시작할 것을 권장합니다.',
      },
      {
        title: '번역 현황',
        content:
          'OWASP Top Ten은 아랍어, 스페인어, 프랑스어, 인도네시아어, 이탈리아어, 일본어, 포르투갈어, 중국어 등 다양한 언어로 번역되어 있습니다.',
      },
      {
        title: '2025 데이터 분석 계획',
        content:
          '이 이니셔티브의 목표는 현재까지 식별된 애플리케이션 취약점에 관해 가장 포괄적인 데이터셋을 수집하는 것입니다. 보안 벤더, 컨설팅 업체, 버그바운티, 조직 기여 등에서 데이터를 수집합니다.',
        items: [
          'HaT(Human assisted Tools)와 TaH(Tool assisted Human) 접근 방식 비교',
          'CWE 기반의 체계적인 분석',
          '커뮤니티 설문조사로 데이터 분석에 반영되지 않은 위험 식별',
        ],
      },
      {
        title: '프로젝트 정보',
        content:
          'OWASP Foundation은 오픈 소스 프로젝트, 글로벌 챕터, 멤버십 네트워크, 컨퍼런스 개최를 통해 소프트웨어 보안 향상에 전념하는 비영리 조직입니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '표준 인식 문서',
        content:
          'OWASP Top Ten은 개발자와 웹 애플리케이션 보안 전문가를 위한 표준 인식 문서',
      },
      {
        title: '최신 버전',
        content:
          '최신 버전은 2025년 버전이며, 2021년과 2017년 버전도 제공',
      },
      {
        title: '데이터 기반 분석',
        content:
          '보안 벤더, 컨설팅 업체, 버그바운티 등 다양한 소스에서 데이터 수집',
      },
      {
        title: 'CWE 기반 분석',
        content:
          'CWE 기반의 체계적인 분석으로 Top 10 순위 결정',
      },
      {
        title: '글로벌 접근성',
        content:
          '다국어 번역 지원으로 글로벌 접근성 확보',
      },
    ],
  },
  'week6/context-rot': {
    slug: 'context-rot',
    week: 6,
    title: 'Context Rot: Understanding Degradation in AI Context Windows',
    titleKr: '컨텍스트 로트: AI 컨텍스트 윈도우의 성능 저하 이해하기',
    author: 'Chroma Research',
    readTime: '약 30분',
    sourceUrl: 'https://research.trychroma.com/context-rot',
    sourceTitle: 'Chroma Research',
    published: true,
    sections: [
      {
        title: '서론',
        content:
          '대규모 언어 모델(LLM)은 일반적으로 컨텍스트를 균일하게 처리한다고 가정됩니다. 하지만 실제로 이 가정은 맞지 않습니다. 간단한 작업에서도 입력 길이가 달라지면 모델 성능이 크게 변하는 것을 확인할 수 있습니다. 이 보고서에서는 GPT-4.1, Claude 4, Gemini 2.5, Qwen3 등 18개 LLM을 평가합니다.',
      },
      {
        title: 'Needle in a Haystack 확장',
        content:
          '고전적인 NIAH 작업은 긴 컨텍스트 윈도우 중간에 무작위 사실을 배치한 다음 모델에게 그 사실을 질문하는 것입니다. 실제 긴 컨텍스트 사용은 종종 모호한 작업에 대한 의미론적 이해를 요구합니다.',
      },
      {
        title: 'Needle-Question 유사도',
        content:
          '질문과 답변의 의미적 유사도가 낮을수록 입력 길이 증가에 따른 성능 저하가 더 빠릅니다. 짧은 입력 길이에서 모델은 낮은 유사도 쌍에서도 잘 수행하지만, 더 긴 입력 길이에서 관찰된 성능 저하는 needle-question 쌍의 본질적 난이도 때문이 아닙니다.',
      },
      {
        title: '방해 요소의 영향',
        content:
          '방해 요소의 영향과 비균일성이 최신 모델을 포함한 모든 모델에서 입력 길이가 증가하면 증폭됩니다. Claude 모델은 일관되게 가장 낮은 환각률을 보이며, GPT 모델은 가장 높은 환각률을 보입니다.',
      },
      {
        title: 'Haystack 구조',
        content:
          '놀랍게도 구조적 일관성이 모델 성능을 일관되게 저하시킨다는 것을 발견했습니다. haystack이 아이디어의 논리적 흐름을 유지하면 모델이 더 나쁜 성능을 보입니다. haystack을 셔플하고 로컬 일관성을 제거하면 성능이 일관되게 향상됩니다.',
      },
      {
        title: 'LongMemEval',
        content:
          '더 현실적인 설정에서 이 모델들을 평가하기 위해 대화형 질문-응답용 긴 컨텍스트 벤치마크인 LongMemEval을 사용합니다. 관련 없는 컨텍스트를 추가하면 모델의 신뢰할 수 있는 성능 유지 능력에 상당한 영향을 미칩니다.',
      },
      {
        title: '결론',
        content:
          'LLM이 입력 길이 전반에 걸쳐 일관된 성능을 유지하지 않습니다. 비어휘적 검색이나 텍스트 복제만큼 간단한 작업에서도 입력 길이가 증가하면 성능의 비균일성이 증가합니다. 효과적인 컨텍스트 엔지니어링이 신뢰할 수 있는 성능에 필수적입니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '컨텍스트 로트',
        content:
          '입력 토큰이 증가할수록 LLM 성능이 비균일하게 저하되는 현상',
      },
      {
        title: '18개 LLM 평가',
        content:
          'GPT-4.1, Claude 4, Gemini 2.5, Qwen3 등 최신 모델 포함, 모든 모델이 긴 컨텍스트에서 성능 저하',
      },
      {
        title: 'Needle-Question 유사도',
        content:
          '질문과 답변의 의미적 유사도가 낮을수록 입력 길이 증가에 따른 성능 저하가 더 빠름',
      },
      {
        title: '방해 요소의 영향',
        content:
          '방해 요소는 비균일한 영향을 미치며, Claude는 낮은 환각률, GPT는 높은 환각률',
      },
      {
        title: 'Haystack 구조',
        content:
          '논리적으로 구조화된 텍스트보다 무작위로 셔플된 텍스트에서 모델이 더 좋은 성능',
      },
      {
        title: '컨텍스트 엔지니어링',
        content:
          '정보가 컨텍스트에 존재하는지보다 어떻게 제시되는지가 더 중요',
      },
    ],
  },
  'week6/sast-vs-dast': {
    slug: 'sast-vs-dast',
    week: 6,
    title: 'SAST vs. DAST vs. RASP: Comparing Application Security Testing Methods',
    titleKr: 'SAST vs DAST vs RASP: 애플리케이션 보안 테스팅 방법 비교',
    author: 'Splunk',
    readTime: '약 15분',
    sourceUrl: 'https://www.splunk.com/en_us/blog/learn/sast-vs-dast.html',
    sourceTitle: 'Splunk Blog',
    published: true,
    sections: [
      {
        title: '소개',
        content:
          '전 세계 정보 보안 지출은 2025년까지 2,120억 달러에 이를 전망이며, 2024년 대비 15% 증가한 수치입니다. Gartner는 생성형 AI와 클라우드 도입이 이러한 성장을 이끈다고 분석하며, 2027년까지 GenAI가 전체 사이버 공격의 17%에 관여할 것으로 예측합니다. 기업은 기존 접근 방식을 넘어서는 정교한 보안 전략이 필요합니다.',
      },
      {
        title: 'SAST란?',
        content:
          '정적 애플리케이션 보안 테스팅(SAST)은 화이트박스 보안 테스팅 방법론입니다. 애플리케이션이 실행되지 않는 상태에서 소스 코드나 바이너리를 분석해 보안 취약점을 찾아냅니다. SDLC 초기에 취약점을 발견해 수정 비용을 크게 절감할 수 있습니다.',
        items: [
          '크로스 사이트 스크립팅(XSS)',
          '안전하지 않은 역직렬화',
          '버퍼 오버플로우',
          'OWASP 취약점',
        ],
      },
      {
        title: 'DAST란?',
        content:
          '동적 애플리케이션 보안 테스팅(DAST)은 블랙박스 테스팅 방식을 사용합니다. 애플리케이션이 실행되는 동안 보안을 평가하며, 소스 코드 접근이 필요 없습니다. 실제 공격 시나리오를 모방해 정적 테스팅이 놓칠 수 있는 약점을 드러냅니다.',
        items: [
          '서비스 거부(DoS) 취약점',
          '안전하지 않은 서버 구성',
        ],
      },
      {
        title: 'SAST 작동 방식',
        content:
          'SAST 도구는 사전 정의된 규칙과 탐지 방법(패턴 매칭, 데이터 흐름 분석 등)을 적용해 코딩 오류와 취약점을 찾습니다. IDE나 CI/CD 파이프라인에 통합되어 자동 스캔을 수행합니다.',
        items: [
          '패턴 매칭: 취약한 암호화 알고리즘이나 안전하지 않은 API 호출 탐지',
          '데이터 흐름 분석: SQL 인젝션이나 버퍼 오버플로우 취약점 추적',
          '제어 흐름 분석: 경쟁 조건 같은 논리적 결함 발견',
          '의존성 스캐닝: 서드파티 라이브러리 취약점 분석',
        ],
      },
      {
        title: 'DAST 작동 방식',
        content:
          'DAST 도구는 입력 필드에 악성 데이터를 전송하는 것 같은 실제 공격을 시뮬레이션해 애플리케이션 동작과 응답의 취약점을 찾습니다.',
        items: [
          '1단계: 웹 애플리케이션 스캐닝으로 진입점 발견',
          '2단계: 크로스 사이트 스크립팅 등 취약점 테스트를 위한 공격 시뮬레이션',
          '3단계: 애플리케이션 응답 분석으로 취약점 탐지',
          '4단계: 탐지된 취약점과 수정 권장 사항 보고서 생성',
        ],
      },
      {
        title: 'SAST vs DAST: 주요 차이점',
        content:
          'SAST는 화이트박스 테스팅으로 소스 코드에 접근해 내부에서 테스트하고, DAST는 블랙박스 테스팅으로 소스 코드 접근 없이 외부에서 테스트합니다. SAST는 SDLC 초기에 수행되어 수정 비용이 낮고, DAST는 SDLC 후반에 수행되어 런타임 취약점을 식별합니다.',
      },
      {
        title: 'SAST와 DAST의 장단점',
        content:
          'SAST는 초기 취약점 발견, 종합적 코드 분석, 자동화된 분석이 장점이지만 오탐이 많고 런타임 취약점 식별이 불가합니다. DAST는 런타임 취약점 식별, 소스 코드 불필요, 실제 공격 시뮬레이션이 장점이지만 깊은 취약점을 놓칠 수 있고 SDLC 후반에 적용되어 수정 비용이 높습니다.',
      },
      {
        title: '하이브리드 접근 방식',
        content:
          'SAST와 DAST를 결합하면 정적 코드와 런타임 취약점을 모두 다루는 다층 보안을 구축할 수 있습니다. CI/CD 파이프라인에서 둘 다 자동화하면 지속적인 피드백을 제공하고 보안을 유지하면서 개발을 가속화합니다.',
      },
      {
        title: 'RASP: SAST와 DAST의 대안',
        content:
          'Runtime Application Self-Protection(RASP)은 애플리케이션이 실행되는 서버에 직접 설치하는 고급 보안 솔루션입니다. 실시간으로 작동해 실행 중 애플리케이션 동작을 모니터링하고, 세션 종료나 보안팀 경고를 통해 실시간 위협에 대응합니다.',
      },
      {
        title: '미래: AppSec 테스팅',
        content:
          '애플리케이션 테스팅의 미래는 SAST, DAST, RASP를 결합하는 것입니다. AI와 머신 러닝의 발전으로 오탐을 줄이고 위협 탐지를 개선해 테스팅 효율성이 높아질 것입니다. 금융 서비스와 IoT 분야에서 이러한 도구들이 함께 보안을 강화합니다.',
      },
    ],
    keyTakeaways: [
      {
        title: 'SAST(정적 분석)',
        content:
          '소스 코드를 분석해 SDLC 초기에 취약점을 발견하고 비용을 절감',
      },
      {
        title: 'DAST(동적 분석)',
        content:
          '실행 중인 애플리케이션을 테스트해 런타임 취약점과 구성 오류를 식별',
      },
      {
        title: 'RASP(런타임 보호)',
        content:
          '애플리케이션 내부에서 실시간으로 공격을 탐지하고 차단',
      },
      {
        title: '다층 방어 전략',
        content:
          '최상의 보안을 위해 SAST, DAST, RASP를 결합한 다층 방어 전략 채택',
      },
      {
        title: 'DevSecOps 자동화',
        content:
          'CI/CD 파이프라인에 보안 도구를 통합해 DevSecOps 실천을 자동화',
      },
    ],
  },
  'week9/introduction-to-sre': {
    slug: 'introduction-to-sre',
    week: 9,
    title: 'Chapter 1 - Introduction',
    titleKr: '1장 - 소개',
    author: 'Benjamin Treynor Sloss',
    readTime: '약 15분',
    sourceUrl: 'https://sre.google/sre-book/introduction/',
    sourceTitle: 'Google SRE Book',
    published: true,
    sections: [
      {
        title: '서비스 관리에 대한 시스템 관리자 접근 방식',
        content:
          '역사적으로 기업들은 복잡한 컴퓨팅 시스템을 운영하기 위해 시스템 관리자를 고용해왔다. 시스템 관리자 접근 방식은 기존 소프트웨어 컴포넌트를 조합하고 배포해서 서비스를 만드는 것이다. 이 모델은 구현하기 쉽고 인재 풀이 널리 형성되어 있다는 장점이 있지만, 직접 비용(팀 규모가 시스템 부하에 비례해서 확장)과 간접 비용(개발/운영 분리로 인한 갈등)이라는 단점이 있다.',
      },
      {
        title: '구글의 서비스 관리 접근 방식: Site Reliability Engineering',
        content:
          'SRE는 소프트웨어 엔지니어에게 운영 팀을 설계해달라고 요청하면 일어나는 일이다. 구글 SRE의 50-60%는 표준 소프트웨어 엔지니어로 고용된 사람들이고, 나머지 40-50%는 UNIX 시스템 내부와 네트워킹 전문 지식 같은 추가 기술을 가진 후보자들이다. 구글은 모든 SRE의 총 "운영" 작업에 50% 상한을 두어 엔지니어링에 집중할 수 있게 한다.',
      },
      {
        title: 'DevOps인가 SRE인가?',
        content:
          'DevOps의 핵심 원칙—시스템 설계 및 개발의 각 단계에서 IT 기능 참여, 자동화에 대한 높은 의존, 운영 작업에 대한 엔지니어링 관행 적용—은 SRE의 많은 원칙과 일치한다. DevOps를 SRE 원칙의 일반화로, 또는 SRE를 DevOps의 특정 구현으로 볼 수 있다.',
      },
      {
        title: 'SRE의 원칙',
        content:
          'SRE 팀은 서비스의 가용성, 레이턴시, 성능, 효율성, 변경 관리, 모니터링, 긴급 대응, 용량 계획에 대한 책임이 있다. 운영 작업이 아닌 엔지니어링 작업에 집중하도록 돕는 규칙과 업무 관행이 있다.',
      },
      {
        title: '엔지니어링에 대한 지속적인 집중 보장',
        content:
          '구글은 SRE의 운영 작업을 시간의 50%로 상한을 둔다. 나머지 시간은 프로젝트 작업에 코딩 기술을 사용해야 한다. 온콜 SRE는 8-12시간 교대당 최대 2개의 이벤트를 받아야 하며, 포스트모템은 모든 중요한 인시던트에 대해 작성해야 한다. 구글은 비난 없는 포스트모템 문화 하에서 운영된다.',
      },
      {
        title: '서비스의 SLO를 위반하지 않으면서 최대 변경 속도 추구',
        content:
          '에러 버짓은 100%가 잘못된 신뢰성 목표라는 관찰에서 비롯된다. 99.99% 가용성인 서비스는 0.01% 불가용성이 허용되며, 이것이 에러 버짓이다. 에러 버짓의 사용은 개발과 SRE 간의 인센티브의 구조적 갈등을 해결한다. 장애는 더 이상 "나쁜" 것이 아니라 혁신 과정의 예상된 부분이다.',
      },
      {
        title: '모니터링',
        content:
          '모니터링은 사람이 알림 도메인의 어떤 부분도 해석할 필요가 없어야 한다. 세 가지 유효한 모니터링 출력 유형이 있다: 알림(즉시 조치 필요), 티켓(며칠 내 조치 필요), 로깅(진단/포렌식 목적).',
      },
      {
        title: '긴급 대응',
        content:
          '신뢰성은 평균 장애 시간(MTTF)과 평균 복구 시간(MTTR)의 함수다. 플레이북에 모범 사례를 미리 기록해두면 "즉석에서 해결하기" 전략에 비해 MTTR이 대략 3배 개선된다.',
      },
      {
        title: '변경 관리',
        content:
          '약 70%의 장애가 라이브 시스템의 변경으로 인해 발생한다. 모범 사례는 자동화를 사용해서 점진적 롤아웃 구현, 문제 빠르게 감지, 안전하게 롤백하는 것이다.',
      },
      {
        title: '수요 예측 및 용량 계획',
        content:
          '용량 계획은 유기적 성장(자연스러운 제품 채택)과 비유기적 성장(기능 출시, 마케팅 캠페인)을 고려해야 한다. 필수 단계: 정확한 유기적 수요 예측, 비유기적 수요 통합, 정기적인 부하 테스트.',
      },
      {
        title: '프로비저닝',
        content:
          '프로비저닝은 변경 관리와 용량 계획을 결합한다. 빠르게 필요할 때만 수행해야 하며, 올바르게 수행해야 한다. 로드 시프팅보다 더 위험한 작업이므로 추가 주의가 필요하다.',
      },
      {
        title: '효율성과 성능',
        content:
          '자원 사용은 수요(부하), 용량, 소프트웨어 효율성의 함수다. SRE는 특정 응답 속도에서 용량 목표를 충족하도록 프로비저닝하므로, 서비스의 성능에 깊은 관심을 가진다.',
      },
    ],
    keyTakeaways: [
      {
        title: 'SRE 정의',
        content:
          'SRE는 소프트웨어 엔지니어에게 운영 팀을 설계하도록 요청하면 일어나는 일이다',
      },
      {
        title: '50% 상한',
        content:
          '구글은 SRE의 운영 작업에 50% 상한을 두어 나머지 시간에 엔지니어링에 집중할 수 있게 한다',
      },
      {
        title: '에러 버짓',
        content:
          '에러 버짓은 개발과 운영 간의 구조적 갈등을 해결하는 핵심 개념이다',
      },
      {
        title: '모니터링 출력',
        content:
          '모니터링은 알림, 티켓, 로깅의 세 가지 유효한 출력으로 구성해야 한다',
      },
      {
        title: '변경으로 인한 장애',
        content: '약 70%의 장애가 라이브 시스템의 변경으로 인해 발생한다',
      },
      {
        title: '비난 없는 포스트모템',
        content:
          '비난 없는 포스트모템 문화가 결함을 노출하고 수정하는 데 중요하다',
      },
    ],
  },
  'week4/awesome-claude-agents': {
    slug: 'awesome-claude-agents',
    week: 4,
    title: 'Awesome Claude Agents',
    titleKr: 'Awesome Claude Agents: AI 개발팀 프레임워크',
    author: 'vijaythecoder',
    readTime: '약 10분',
    sourceUrl: 'https://github.com/vijaythecoder/awesome-claude-agents',
    sourceTitle: 'GitHub',
    published: true,
    sections: [
      {
        title: '개요',
        content:
          'Awesome Claude Agents는 Claude Code CLI를 위한 AI 개발팀 프레임워크입니다. 24개의 전문 에이전트가 협업하여 기능 구현, 버그 디버깅, 다양한 기술 스택을 처리합니다.',
      },
      {
        title: '에이전트 구성',
        content:
          '프레임워크는 4가지 카테고리의 전문 에이전트로 구성됩니다.',
        items: [
          '오케스트레이터 (3개): Tech Lead, Project Analyst, Team Configurator',
          '프레임워크 전문가 (13개): Laravel, Django, Rails, React, Vue 등',
          '유니버설 전문가 (4개): Backend, Frontend, API, Tailwind CSS',
          '코어 팀 (4개): Code Archaeologist, Reviewer, Performance Optimizer, Documentation',
        ],
      },
      {
        title: '설치 방법',
        content:
          'git clone 후 symlink 또는 직접 복사로 설치할 수 있습니다. symlink 방식이 자동 업데이트를 지원하여 권장됩니다.',
      },
      {
        title: '사용 방법',
        content:
          '@agent-team-configurator로 기술 스택을 자동 감지하고, @tech-lead-orchestrator로 작업을 요청하면 Tech Lead가 적절한 전문가들에게 작업을 분배합니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '토큰 주의',
        content: '이 프로젝트는 토큰 집약적입니다. 복잡한 워크플로우에서 10-50k 토큰을 소비할 수 있습니다.',
      },
      {
        title: '병렬 처리',
        content: '여러 에이전트가 동시에 작업하여 개발 속도를 향상시킵니다.',
      },
      {
        title: '자동 스택 감지',
        content: 'package.json, 빌드 파일 분석으로 기술 스택을 자동 인식하여 적합한 팀을 구성합니다.',
      },
    ],
  },
  'week3/how-faang-vibe-codes': {
    slug: 'how-faang-vibe-codes',
    week: 3,
    title: 'How FAANG Vibe Codes',
    titleKr: 'FAANG에서는 어떻게 바이브 코딩을 하는가',
    author: 'Reddit',
    readTime: '약 3분',
    sourceUrl: 'https://www.reddit.com/r/vibecoding/comments/1myakhd/how_we_vibe_code_at_a_faang/',
    sourceTitle: 'Reddit',
    published: true,
    sections: [
      {
        title: '배경',
        content:
          'AI 어시스턴트를 활용한 코딩이 프로덕션 코드에 사용될 수 없다고 생각하는 분들이 많지만, 이는 사실이 아닙니다. 저자는 10년 넘게 일해온 AI 소프트웨어 엔지니어로, 그중 절반은 FAANG이나 비슷한 수준의 회사에서 근무했습니다.',
      },
      {
        title: 'FAANG의 AI 활용 프로덕션 워크플로우',
        content: 'FAANG에서 AI를 프로덕션 코드에 활용하는 단계별 프로세스입니다.',
        items: [
          '기술 설계 문서(Technical Design Document)로 시작 - 대부분의 작업이 여기서 이루어짐',
          '설계 리뷰 - 시니어 엔지니어들이 설계 문서를 철저하게 검토 ("고통의 선결제")',
          '하위 시스템 문서화 - 개별 개발팀이 구축할 각 하위 시스템에 대한 문서화',
          '백로그 개발과 스프린트 플래닝 - PM, TPM과 함께 세부 태스크와 순서 결정',
          '소프트웨어 개발 - TDD 방식으로 AI가 먼저 테스트 작성, 그 후 기능 구현',
          '코드 리뷰 - 두 명의 개발자 승인 필요, AI가 리뷰 보조',
          '스테이징 테스트 후 프로덕션 배포',
        ],
      },
      {
        title: '결과',
        content:
          '기능 제안부터 프로덕션 배포까지 약 30% 속도 향상을 경험하고 있습니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '설계 문서 먼저',
        content: '항상 탄탄한 설계 문서와 아키텍처로 시작하세요.',
      },
      {
        title: '작은 단위로 구축',
        content: '설계 문서에서부터 작은 단위로 나눠서 구축하세요.',
      },
      {
        title: '테스트 먼저',
        content: 'TDD 방식으로 AI에게 먼저 테스트를 작성하게 한 후 기능을 구현하세요.',
      },
    ],
  },
  'week4/super-claude': {
    slug: 'super-claude',
    week: 4,
    title: 'SuperClaude Framework',
    titleKr: 'SuperClaude: Claude Code 향상 프레임워크',
    author: 'SuperClaude-Org',
    readTime: '약 15분',
    sourceUrl: 'https://github.com/SuperClaude-Org/SuperClaude_Framework',
    sourceTitle: 'GitHub',
    published: true,
    sections: [
      {
        title: '개요',
        content:
          'SuperClaude는 Claude Code를 구조화된 개발 플랫폼으로 변환하는 메타 프로그래밍 프레임워크입니다. 30개의 슬래시 명령어, 16개의 전문 에이전트, 8개의 MCP 서버 통합을 제공합니다.',
      },
      {
        title: '핵심 구성',
        content: 'SuperClaude의 주요 구성 요소입니다.',
        items: [
          '30개 슬래시 명령어: /plan, /build, /test, /review, /magic 등',
          '16개 전문 에이전트: PM Agent, Security Engineer, Frontend/Backend Architect 등',
          '7가지 행동 모드: Brainstorming, Deep Research, Orchestration, Token-Efficiency 등',
          '8개 MCP 서버: Tavily, Context7, Playwright, Chrome DevTools 등',
        ],
      },
      {
        title: '설치 방법',
        content:
          'pipx install superclaude로 설치하고, superclaude install로 30개 명령어를 초기화합니다.',
      },
      {
        title: '딥 리서치 기능',
        content:
          'v4.2에서 도입된 자율 웹 리서치 시스템으로, 적응형 계획, 다중 홉 추론(최대 5회), 품질 점수, 케이스 기반 학습을 지원합니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '통합 워크플로우',
        content: '기획부터 배포까지 일관된 환경에서 개발할 수 있습니다.',
      },
      {
        title: 'MCP 통합',
        content: '8개 MCP 서버로 웹 검색, 브라우저 자동화, 메모리 유지 등 기능을 확장합니다.',
      },
      {
        title: '문서 표준화',
        content: 'PLANNING.md, TASK.md, KNOWLEDGE.md 등 일관된 프로젝트 문서 구조를 제공합니다.',
      },
    ],
  },
  'week4/peeking-under-hood-claude-code': {
    slug: 'peeking-under-hood-claude-code',
    week: 4,
    title: 'Peeking Under the Hood of Claude Code',
    titleKr: 'Claude Code의 내부 들여다보기',
    author: 'OutSight AI',
    readTime: '약 15분',
    sourceUrl: 'https://medium.com/@outsightai/peeking-under-the-hood-of-claude-code-70f5a94a9a62',
    sourceTitle: 'Medium',
    published: true,
    sections: [
      {
        title: 'TL;DR',
        content:
          'Claude Code는 실제 작업 전에 작고 타겟팅된 프롬프트로 컨텍스트를 선행 로딩합니다. 드리프트를 줄이기 위해 시스템/사용자 프롬프트, 도구 호출, 도구 결과에 "system-reminder"를 곳곳에 뿌립니다. Bash 실행 전 명시적인 명령어 접두사 추출과 인젝션 검사로 위험을 제어하며, 작업이 다단계가 되면 더 좁은 지시를 가진 서브 에이전트를 생성합니다.',
      },
      {
        title: '설정: LiteLLM으로 Claude Code 모니터링하기',
        content:
          'Claude Code의 동작을 이해하기 위해, Claude Code와 Anthropic API 서버 사이에 LiteLLM을 투명한 프록시로 배치하여 수백 건의 API 호출을 캡처했습니다.',
      },
      {
        title: '놀라움의 원천',
        content:
          'API 요청을 관찰하면서, 마법은 Claude Code 세션을 시작하기도 전에 시작된다는 것을 알게 되었습니다. 기존 프로젝트로 세션을 시작하면 먼저 대화를 요약해서 제목을 추출하고, 현재 메시지가 새로운 주제인지 분석합니다.',
      },
      {
        title: 'system-reminder 태그',
        content:
          '가장 흥미로운 발견은 <system-reminder> 태그의 광범위한 사용이었습니다. 이 태그들은 시스템 프롬프트 내에서만 사용되는 것이 아니라, 사용자 메시지부터 도구 호출 결과까지 전체 파이프라인에 걸쳐 삽입되어 있습니다.',
      },
      {
        title: '명령어 인젝션 감지',
        content:
          '명령어 권한들은 하드코딩된 것이 아니라 생성형입니다. Claude는 권한을 요청하거나 명령어 인젝션을 감지하기 위한 특정 서브 프롬프트를 가지고 있으며, 명령어 접두사를 추출하고 위험한 패턴을 탐지합니다.',
      },
      {
        title: '서브 에이전트 아키텍처',
        content:
          'Task 도구는 내부에서 자체 버전의 Claude Code를 실행합니다. 핵심 차이점은 서브 에이전트에서 todoWrite 도구 사용을 피한다는 것입니다. 그러나 작업이 복잡해지면 system-reminder 태그를 조건부로 주입하여 todoWrite 사용을 상기시킵니다.',
      },
      {
        title: '진짜 비밀 소스',
        content:
          'Claude Code의 마법은 기본 모델이 다르거나 특별한 것 때문이 아니라, 하나의 크고 아름다운 프롬프트와 영리한 도구 설명, 그리고 올바른 태그를 사용한 체계적인 컨텍스트 엔지니어링의 조합입니다.',
      },
    ],
    keyTakeaways: [
      {
        title: '컨텍스트 선행 로딩',
        content: '실제 작업 전에 대화를 요약하고, 주제를 분석하고, 컨텍스트를 설정합니다.',
      },
      {
        title: 'system-reminder 태그',
        content: '드리프트 방지를 위해 시스템 전체에서 <system-reminder> 태그를 사용합니다.',
      },
      {
        title: '내장된 안전 및 권한',
        content:
          '명령어 검증과 인젝션 감지를 에이전트 루프에 직접 통합합니다.',
      },
      {
        title: '특화된 서브 에이전트',
        content:
          '메인 루프가 작업 복잡도에 따라 조건부 컨텍스트 엔지니어링으로 서브 에이전트를 조율합니다.',
      },
    ],
  },
  'week5/how-warp-uses-warp': {
    slug: 'how-warp-uses-warp',
    week: 5,
    title: 'How Warp Uses Warp to Build Warp',
    titleKr: 'Warp가 Warp를 만들기 위해 Warp를 사용하는 방법',
    author: 'Warp Team',
    readTime: '약 10분',
    sourceUrl: 'https://www.warp.dev',
    sourceTitle: 'Warp',
    published: true,
    sections: [
      {
        title: '코딩 의무 규정',
        content:
          'Warp의 코딩 의무 규정은 모든 코딩 작업을 Warp 프롬프트로 시작하는 것입니다. 10분이 지나도 진전이 없으면 피드백을 공유하고, 다른 AI 도구를 시도하거나, 수동 코딩으로 전환합니다.',
        items: [
          '모든 코딩 작업은 Warp에서 프롬프트로 시작한다',
          '성공하면 #warped-it 채널에 공유',
          '10분 후 진전 없으면 #feedback- 채널에 피드백 공유',
          '다른 AI 도구(Cursor, Claude)로 비교 시도',
          '필요시 수동 코딩으로 전환',
        ],
      },
      {
        title: '코딩 의무 규정의 이유',
        content:
          'Warp로 프롬프트 코딩은 실제로 많은 작업에서 더 빠르며, 자사 제품을 직접 사용(dogfooding)하는 것이 제품 개선의 최선책입니다.',
        items: [
          '코드를 직접 작성하는 시간 절약',
          '여러 작업을 동시에 병렬로 진행 가능',
          '익숙하지 않은 코드 영역에서 특히 유용',
          '경쟁 제품 사용으로 제품 개선 직관 형성',
        ],
      },
      {
        title: '리뷰를 위해 제출하는 코드에 대한 책임',
        content:
          '리뷰를 위해 제출하는 모든 코드는 직접 작성한 것과 동일한 수준으로 이해해야 합니다. AI가 생성한 코드도 동일한 품질 기준을 적용해야 합니다.',
        items: [
          '잘 구조화되어야 한다',
          '잘 테스트되어야 한다',
          '코딩 컨벤션을 따라야 한다',
          '"AI가 작성했다"는 버그나 낮은 품질의 변명이 될 수 없다',
        ],
      },
      {
        title: '에이전트에게 엔지니어링 방법을 말하라',
        content:
          '에이전트에게 원하는 결과만 말하지 말고, 변경 사항을 어떻게 엔지니어링할지 구체적으로 지시하세요.',
        items: [
          '데이터 모델은 어떤 형태여야 하는가',
          '원하는 API는 무엇인가',
          '코드는 어디에 위치해야 하는가',
          '어떤 테스트를 작성해야 하는가',
        ],
      },
      {
        title: '작은 단위로 분해하라',
        content:
          '큰 변경을 원샷으로 처리하지 말고 작은 단위로 분해하여 점진적으로 진행하세요. 에이전트가 진행하면서 자주 테스트를 작성하게 하면 점진적 작업을 강제할 수 있습니다.',
        items: [
          '작고 독립적인 변경과 커밋 요청',
          '진행 중인 변경 사항을 자주 확인',
          '필요할 때 되돌릴 수 있도록 좋은 메시지와 함께 커밋',
        ],
      },
      {
        title: 'Warp가 무엇을 하는지 이해하라',
        content:
          'Warp가 변경을 시작하기 전에 설명이나 계획을 요청하세요. 계획을 반복적으로 수정하고 변경 옵션과 다른 접근 방식을 요청하세요.',
      },
      {
        title: '학습에 시간을 투자하라',
        content:
          'Warp를 더 많이 사용할수록 어떤 컨텍스트를 포함해야 하는지, 어떤 유형의 프롬프팅이 가장 효과적인지에 대한 직관이 쌓입니다.',
        items: [
          '규칙, 프롬프트, Warp Drive 객체를 영구적인 컨텍스트로 활용',
          '파일 태깅에 "@"를 사용',
          'UI 변경 및 디버깅을 위해 이미지 첨부',
          '다른 모델로 실험',
        ],
      },
      {
        title: '이슈를 보고하라',
        content:
          '무언가가 잘 작동하지 않으면 적절한 #feedback- 채널에 보고하세요. 피드백 처리의 첫 번째 본능은 평가(eval) 케이스를 만드는 것이어야 합니다.',
        items: [
          '서버 오류 또는 클라이언트 버그',
          '에이전트가 빙빙 돌면서 요청 소모',
          '에이전트가 컨텍스트를 잊어버림',
          '누락된 기능, 높은 지연 시간 등',
        ],
      },
      {
        title: 'MCP 서버 및 규칙 설정',
        content:
          'Sentry, Linear, Notion, Slack 등 MCP 서버를 설정하여 컨텍스트 검색을 용이하게 하고, 반복되는 컨벤션과 워크플로우를 위한 Warp Drive 규칙과 프롬프트를 설정하세요.',
      },
    ],
    keyTakeaways: [
      {
        title: '코딩 의무 규정',
        content:
          '모든 코딩 작업은 Warp 프롬프트로 시작하며, 10분 후에도 진전이 없으면 피드백을 공유하고 다른 도구를 시도하거나 수동 코딩으로 전환한다.',
      },
      {
        title: '코드 품질 및 책임',
        content:
          'AI가 생성한 코드도 직접 작성한 코드와 동일한 품질 기준을 적용해야 하며, "AI가 작성했다"는 변명이 될 수 없다.',
      },
      {
        title: '효과적인 에이전트 사용법',
        content:
          '원하는 결과뿐 아니라 어떻게 엔지니어링할지 구체적으로 지시하고, 큰 변경을 원샷으로 처리하지 말고 작은 단위로 분해하여 진행한다.',
      },
      {
        title: '생산성 향상 팁',
        content:
          'MCP 서버를 설정하여 컨텍스트 검색을 용이하게 하고, 반복되는 컨벤션과 워크플로우를 위한 Warp Drive 규칙과 프롬프트를 설정한다.',
      },
    ],
  },
  'week7/lessons-millions-ai-code-reviews': {
    slug: 'lessons-millions-ai-code-reviews',
    week: 7,
    title: 'Lessons from millions of AI code reviews',
    titleKr: '수백만 AI 코드 리뷰에서 배운 교훈',
    author: 'Tomas Reimers (Graphite)',
    readTime: '약 10분',
    sourceUrl: 'https://www.youtube.com/watch?v=TswQeKftnaw',
    sourceTitle: 'YouTube - AI Engineer Conference',
    published: true,
    contentType: 'youtube',
    duration: '10:21',
    tldr: 'Graphite의 Diamond는 AI 기반 코드 리뷰 시스템으로, AI가 생성한 코드의 버그를 AI로 검출하는 접근법을 제시합니다. 10,000개의 코멘트 분석을 통해 AI가 효과적으로 잡을 수 있는 버그 유형과 인간이 실제로 원하는 피드백의 교집합을 찾아 52%의 코멘트 수용률을 달성했습니다.',
    learningGoals: [
      'AI 코드 리뷰 시스템의 효과적인 피드백 유형과 한계 이해하기',
      '2x2 매트릭스를 활용한 AI 코드 리뷰 품질 평가 프레임워크 학습하기',
      'AI 코드 리뷰의 성공 지표(다운보트 비율, 변경 수용률) 측정 방법 파악하기',
    ],
    sections: [
      {
        title: '개요',
        content:
          'Graphite CPO Tomas Reimers가 AI Engineer 컨퍼런스에서 발표한 강연으로, AI 코드 리뷰 시스템 Diamond를 수백만 건의 코드 리뷰에 적용하면서 얻은 교훈을 공유합니다.',
      },
      {
        title: 'AI 코드 리뷰의 가능성',
        content:
          'AI가 작성하는 코드의 양이 늘어남에 따라 버그도 증가하고 있습니다. Diamond는 Claude에게 PR을 분석하도록 요청하여 인스턴스화되지 않은 ORM 클래스나 음수 나눗셈 버그 같은 실제 문제를 찾아냅니다.',
      },
      {
        title: '버그 분류 2x2 매트릭스',
        content:
          'LLM이 잡을 수 있는 것 vs 잡을 수 없는 것, 인간이 원하는 피드백 vs 원치 않는 피드백의 2x2 매트릭스로 코드 리뷰 코멘트를 분류합니다. 오른쪽 상단 사분면(LLM이 잡을 수 있고 인간이 원하는 것)이 핵심 영역입니다.',
      },
      {
        title: 'AI가 효과적으로 잡는 버그 유형',
        content:
          '논리적 불일치(버그), 실수로 커밋된 코드, 성능/보안 문제, 문서화 불일치, 스타일 변경 등이 AI가 잘 잡고 개발자도 환영하는 피드백 유형입니다.',
      },
      {
        title: 'AI의 한계와 필터링 필요성',
        content:
          '부족 지식(tribal knowledge)처럼 조직 고유의 맥락이 필요한 버그는 AI가 탐지하기 어렵습니다. 반면 "주석 추가해라", "테스트 작성해라" 같은 현학적 코멘트는 기술적으로 맞지만 개발자가 원치 않는 피드백으로, 반드시 필터링해야 합니다.',
      },
      {
        title: '성공 지표 측정',
        content:
          '다운보트 비율(현재 4% 미만)로 LLM의 환각 여부를 측정하고, 코멘트 수용률(현재 52%)로 실제 코드 변경으로 이어지는 비율을 측정합니다. 인간 코멘트의 수용률이 약 50%인 것과 비교하면 AI가 인간 수준의 충실도를 달성했습니다.',
      },
    ],
    keyTakeaways: [
      {
        title: 'AI 코드 리뷰의 잠재력',
        content:
          'AI 코드 생성량 증가에 따라 버그도 증가하며, AI 기반 코드 리뷰가 이를 해결할 수 있는 잠재력을 가집니다.',
      },
      {
        title: '2x2 매트릭스 분류',
        content:
          "효과적인 AI 리뷰를 위해 'LLM이 잡을 수 있는 것 vs 못 잡는 것'과 '인간이 원하는 것 vs 원치 않는 것'의 2x2 매트릭스로 분류합니다.",
      },
      {
        title: 'AI가 잘 잡는 버그',
        content:
          '논리적 불일치, 실수로 커밋된 코드, 성능/보안 문제, 문서화 문제, 스타일 변경 등이 AI가 효과적으로 탐지하는 영역입니다.',
      },
      {
        title: 'AI의 한계',
        content:
          '부족 지식(tribal knowledge)처럼 조직 고유의 맥락이 필요한 버그는 탐지가 불가능합니다.',
      },
      {
        title: '필터링의 중요성',
        content:
          '현학적 코멘트(주석 추가, 테스트 작성 요구 등)는 AI가 잡을 수 있어도 개발자가 원치 않는 피드백으로, 반드시 필터링해야 합니다.',
      },
    ],
  },
}
---
name: split-youtube-chapters
description: |
  YouTube 콘텐츠의 챕터별 하위페이지 구조를 readings.ts에 생성합니다.
  원본 마크다운에서 챕터 구조 파싱 → isParent: true + children 배열로 변환.
  사용: /split-youtube-chapters week1/deep-dive-llms
arguments:
  - name: path
    description: |
      week/slug 형식의 YouTube 콘텐츠 경로
      예: week1/deep-dive-llms
    required: true
---

# split-youtube-chapters Skill

YouTube 콘텐츠를 챕터별 하위페이지 구조로 변환합니다.

## 사용법

```
/split-youtube-chapters <week/slug>
```

## 예시

```
/split-youtube-chapters week1/deep-dive-llms
```

## 입출력

### 입력
- `docs/week{N}/{slug}.md` - 챕터 구조가 포함된 YouTube 콘텐츠 원본

### 출력
- `src/content/readings.ts` 수정:
  - 기존 Reading을 `isParent: true` + `children` 배열로 변환
  - 각 챕터를 ChildReading으로 생성

## 변환 예시

### 변환 전 (단일 페이지)
```typescript
'week1/deep-dive-llms': {
  slug: 'deep-dive-llms',
  week: 1,
  title: 'Deep Dive into LLMs like ChatGPT',
  titleKr: 'ChatGPT 같은 LLM 심층 분석',
  author: 'Andrej Karpathy',
  readTime: '약 3시간 31분',
  sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI',
  sourceTitle: 'YouTube - Deep Dive into LLMs like ChatGPT',
  published: true,
  sections: [
    { title: '1. Introduction (0:00)', content: '...' },
    { title: '2. Pretraining Data (1:00)', content: '...' },
    // ... 24개 섹션
  ],
  keyTakeaways: [...]
}
```

### 변환 후 (부모 + 자식 구조)
```typescript
'week1/deep-dive-llms': {
  slug: 'deep-dive-llms',
  week: 1,
  title: 'Deep Dive into LLMs like ChatGPT',
  titleKr: 'ChatGPT 같은 LLM 심층 분석',
  author: 'Andrej Karpathy',
  readTime: '약 3시간 31분',
  sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI',
  sourceTitle: 'YouTube - Deep Dive into LLMs like ChatGPT',
  published: true,
  isParent: true,
  // 부모 페이지의 sections는 개요 정보
  sections: [
    {
      title: '개요',
      content: 'Andrej Karpathy의 LLM 심층 분석 강의입니다...',
    }
  ],
  // YouTube 전용 필드 유지
  contentType: 'youtube',
  duration: '3:31:05',
  totalChapters: 24,
  tldr: '...',
  learningGoals: [...],
  chapterSummaries: [...],
  // 챕터별 자식 페이지
  children: [
    {
      slug: 'introduction',
      title: '1. Introduction',
      titleKr: '1. 소개',
      sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=0s',
      published: false,
      // sections는 비움 - 나중에 번역 후 /upload-reading으로 채움
    },
    {
      slug: 'pretraining-data',
      title: '2. Pretraining Data',
      titleKr: '2. 사전학습 데이터',
      sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=60s',
      published: false,
    },
    // ... 24개 챕터
  ]
}
```

## 실행 지침

### Step 1: 원본 마크다운 읽기

```
1. docs/week{N}/{slug}.md 파일 읽기
2. 파일이 없으면 에러: "원본 파일을 찾을 수 없습니다."
3. 프론트매터에서 메타데이터 추출:
   - source_url
   - chapters (또는 본문에서 파싱)
```

### Step 2: 챕터 구조 파싱

원본 마크다운의 Table of Contents 또는 h2 섹션에서 챕터 추출:

```markdown
## Table of Contents

1. [Introduction](#1-introduction) (0:00)
2. [Pretraining Data (Internet)](#2-pretraining-data-internet) (1:00)
3. [Tokenization](#3-tokenization) (7:47)
...
```

각 챕터에서 추출할 정보:
- **번호**: 1, 2, 3, ...
- **영어 제목**: Introduction, Pretraining Data, Tokenization
- **타임스탬프**: 0:00, 1:00, 7:47

### Step 3: 챕터 제목 → slug 변환

| 영어 제목 | slug |
|----------|------|
| Introduction | `introduction` |
| Pretraining Data (Internet) | `pretraining-data` |
| Tokenization | `tokenization` |
| Neural Network I/O | `neural-network-io` |
| GPT-2: Training and Inference | `gpt2-training-inference` |
| Llama 3.1 Base Model Inference | `llama-31-base-model` |
| Hallucinations, Tool Use, Knowledge/Working Memory | `hallucinations-tool-use` |
| Reinforcement Learning from Human Feedback (RLHF) | `rlhf` |

**slug 생성 규칙**:
1. 영어 소문자로 변환
2. 특수문자 제거 (괄호, 콜론, 슬래시 등)
3. 공백을 `-`로 변환
4. 연속된 `-` 제거
5. 너무 긴 경우 핵심 단어만 사용 (약 30자 이내)

### Step 4: 챕터 제목 한국어 번역

| 영어 제목 | titleKr |
|----------|---------|
| Introduction | 소개 |
| Pretraining Data | 사전학습 데이터 |
| Tokenization | 토큰화 |
| Neural Network I/O | 신경망 입출력 |
| Inference | 추론 |
| Reinforcement Learning | 강화학습 |
| RLHF | RLHF (인간 피드백 강화학습) |

**한국어 번역 규칙**:
1. 일반적인 기술 용어는 한국어로 번역
2. 고유명사(GPT-2, Llama, DeepSeek-R1)는 그대로 유지
3. 약어(RLHF, I/O)는 그대로 + 괄호 안에 풀이
4. 번호는 그대로 유지: "1. 소개", "2. 사전학습 데이터"

### Step 5: 타임스탬프 → YouTube URL 변환

```
타임스탬프 "1:20:32" → 초 단위 변환 → 4832초
YouTube URL: {sourceUrl}&t=4832s
```

### Step 6: readings.ts 업데이트

1. 기존 Reading 찾기
2. 다음 필드 추가/수정:
   - `isParent: true`
   - `sections`: 개요 정보로 대체 (기존 섹션 제거)
   - `children`: 챕터별 ChildReading 배열 추가

```typescript
// 기존 sections 대체
sections: [
  {
    title: '개요',
    content: `${author}의 ${titleKr} 강의입니다. 총 ${totalChapters}개의 챕터로 구성되어 있으며, 약 ${duration} 분량입니다.`,
  }
],

// children 추가
children: [
  {
    slug: 'introduction',
    title: '1. Introduction',
    titleKr: '1. 소개',
    sourceUrl: 'https://www.youtube.com/watch?v=...&t=0s',
    published: false,
    // sections는 비움
  },
  // ...
]
```

### Step 7: 결과 출력

```
✓ YouTube 콘텐츠를 챕터별 하위페이지로 변환 완료

원본: week1/deep-dive-llms
챕터: 24개

생성된 하위페이지:
  1. introduction - 1. 소개
  2. pretraining-data - 2. 사전학습 데이터
  3. tokenization - 3. 토큰화
  ...

readings.ts 업데이트:
  - isParent: true 추가
  - children: 24개 ChildReading 추가
  - sections: 개요로 대체

다음 단계:
  1. 웹에서 확인: pnpm dev → /readings/week1/deep-dive-llms
  2. 챕터 번역: /translate-reading week1/deep-dive-llms/introduction
  3. 번역 후 업로드: /upload-reading week1/deep-dive-llms/introduction
```

## 챕터 파싱 상세 규칙

### Table of Contents 형식

```markdown
## Table of Contents

1. [Introduction](#1-introduction) (0:00)
2. [Pretraining Data (Internet)](#2-pretraining-data-internet) (1:00)
```

정규식:
```
/^(\d+)\.\s*\[(.+?)\]\(#.+?\)\s*\((\d+:\d+(?::\d+)?)\)/gm
```

그룹:
1. 번호
2. 제목
3. 타임스탬프

### h2 섹션 형식

```markdown
## 1. Introduction

**요약**: ChatGPT와 같은...

[0:00] hi everyone...
```

정규식:
```
/^## (\d+)\.\s*(.+?)$/gm
```

## 에러 처리

| 상황 | 처리 |
|-----|-----|
| 원본 파일 없음 | `/fetch-reading` 실행 안내 |
| 챕터 구조 파싱 실패 | 수동 입력 안내 |
| readings.ts에 항목 없음 | 먼저 `/upload-reading` 필요 |
| 이미 isParent=true | 기존 children 덮어쓰기 확인 |

## 참고

- prompt-engineering-guide와 동일한 UI 구조 사용
- 라우팅: `/readings/week{N}/{parentSlug}/{childSlug}`
- ReadingSidebar 컴포넌트로 네비게이션 제공

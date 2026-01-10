---
name: split-youtube-chapters
description: |
  YouTube 콘텐츠의 챕터별 하위페이지 구조를 readings.ts에 생성하고,
  전체 번역 파일에서 챕터별 번역 파일을 자동 생성합니다.
  사용: /split-youtube-chapters week1/deep-dive-llms
arguments:
  - name: path
    description: |
      week/slug 형식의 YouTube 콘텐츠 경로
      예: week1/deep-dive-llms
    required: true
  - name: overwrite
    description: |
      기존 챕터 파일 덮어쓰기 (기본: 건너뜀)
      --overwrite 옵션으로 사용
    required: false
  - name: skip-files
    description: |
      readings.ts만 업데이트하고 챕터 파일 생성 건너뜀
      --skip-files 옵션으로 사용
    required: false
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
- `docs/week{N}/kr/{slug}.md` - 전체 번역 파일 (챕터 파일 생성 시 필요)

### 출력
- `src/content/readings.ts` 수정:
  - 기존 Reading을 `isParent: true` + `children` 배열로 변환
  - 각 챕터를 ChildReading으로 생성
- `docs/week{N}/{slug}/kr/{childSlug}.md` - 챕터별 번역 파일 (N개)

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
      published: true,      // 번역 파일 있으면 true
      hasMarkdown: true,    // 마크다운 동적 로딩 활성화
    },
    {
      slug: 'pretraining-data',
      title: '2. Pretraining Data',
      titleKr: '2. 사전학습 데이터',
      sourceUrl: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=60s',
      published: true,
      hasMarkdown: true,
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
// 번역 파일이 있으면 published: true, hasMarkdown: true
// 번역 파일이 없으면 published: false, hasMarkdown: false
children: [
  {
    slug: 'introduction',
    title: '1. Introduction',
    titleKr: '1. 소개',
    sourceUrl: 'https://www.youtube.com/watch?v=...&t=0s',
    published: true,      // 번역 파일 있으면 true
    hasMarkdown: true,    // 번역 파일 있으면 true
  },
  // ...
]
```

### Step 7: readings.ts 업데이트 결과 확인

readings.ts 업데이트 완료 후 다음 단계로 진행합니다.

### Step 8: 챕터별 번역 파일 생성 (--skip-files가 아닌 경우)

전체 번역 파일에서 각 챕터를 분리하여 개별 파일로 생성합니다.

#### 8.1 전체 번역 파일 확인

```
파일 경로: docs/week{N}/kr/{slug}.md

파일이 없으면:
  ⚠ 전체 번역 파일이 없습니다.
  → 챕터별 파일 생성 건너뜀
  → readings.ts 업데이트만 완료
```

#### 8.2 SUMMARY 섹션 파싱

```markdown
<!-- SUMMARY_START -->
## TL;DR
...

## 챕터별 요약

### 1. 소개 (0:00)
요약 텍스트...

**핵심 포인트:**
- 포인트1
- 포인트2

---

### 2. 사전학습 데이터 - 인터넷 (1:00)
...
<!-- SUMMARY_END -->
```

**파싱 정규식**:
```
챕터 헤더: /^### (\d+)\.\s*(.+?)\s*\((\d+:\d+(?::\d+)?)\)/gm
  그룹: [1]=번호, [2]=한국어 제목, [3]=타임스탬프

핵심 포인트: /\*\*핵심 (?:포인트|개념):\*\*\n((?:- .+\n?)+)/g
```

**추출 데이터**:
- `number`: 챕터 번호
- `titleKr`: 한국어 제목 (번호 제외)
- `timestamp`: 타임스탬프
- `summary`: 요약 텍스트
- `keyPoints`: 핵심 포인트 배열

#### 8.3 FULL_TRANSLATION 섹션 파싱

```markdown
<!-- FULL_TRANSLATION_START -->
## 전체 번역

### 1. 소개

**요약**: ChatGPT와 같은...

[0:00] 안녕하세요, 여러분...
[0:30] 이 영상을 통해...

### 2. 사전학습 데이터 - 인터넷

**요약**: LLM 사전학습의...

[1:00] 도구를 준비하고...
<!-- FULL_TRANSLATION_END -->
```

**파싱 정규식**:
```
챕터 구분: /^### (\d+)\.\s*(.+?)$/gm
타임스탬프 라인: /^\[(\d+:\d+(?::\d+)?)\]\s*(.+)$/gm
```

**추출 데이터**:
- `number`: 챕터 번호
- `fullTranslation`: 타임스탬프가 포함된 전체 번역 텍스트

#### 8.4 챕터 데이터 매칭

SUMMARY와 FULL_TRANSLATION에서 추출한 데이터를 챕터 번호로 매칭:

```typescript
interface ChapterData {
  number: number;
  titleKr: string;       // SUMMARY에서
  timestamp: string;     // SUMMARY에서
  summary: string;       // SUMMARY에서
  keyPoints: string[];   // SUMMARY에서
  fullTranslation: string; // FULL_TRANSLATION에서
}
```

#### 8.5 챕터별 파일 생성

각 챕터에 대해 파일 생성:

**출력 경로**: `docs/week{N}/{parentSlug}/kr/{childSlug}.md`

**디렉토리 생성**: `docs/week{N}/{parentSlug}/kr/` 디렉토리가 없으면 생성

**파일 형식**:
```markdown
---
title: "{N}. {English Title}"
titleKr: "{N}. {한국어 제목}"
chapter: {N}
timestamp: "{타임스탬프}"
sourceUrl: "{YouTube URL}&t={초}s"
translatedAt: "{YYYY-MM-DD}"
---

# {N}. {한국어 제목}

[영상 바로가기 ({타임스탬프})]({sourceUrl})

## 요약

{요약 텍스트}

**핵심 개념:**
{핵심 포인트 목록}

---

## 전체 번역

{타임스탬프 포함 번역 텍스트}
```

#### 8.6 기존 파일 처리

```
파일이 이미 존재하는 경우:
  --overwrite 옵션: 덮어쓰기
  기본: 건너뜀 (⚠ 표시)
```

### Step 9: 챕터 파일 생성 결과 확인

챕터 파일 생성 결과를 확인합니다:

**부분 성공 시**:
```
✓ 챕터별 번역 파일 생성
  - 20개 파일 생성
  ⚠ 4개 파일 건너뜀 (이미 존재):
    - introduction.md
    - tokenization.md
```

**전체 번역 파일 없음**:
```
⚠ 전체 번역 파일이 없습니다: docs/week1/kr/deep-dive-llms.md
  챕터별 번역 파일 생성을 건너뜁니다.
  readings.ts 업데이트만 완료합니다.
  (children의 published: false, hasMarkdown: false)

다음 단계:
  /translate-reading week1/deep-dive-llms 실행 후 다시 실행하세요.
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
| 전체 번역 파일 없음 | 경고 출력, readings.ts만 업데이트 |
| SUMMARY 섹션 없음 | 경고 출력, 파일 생성 건너뜀 |
| 챕터 수 불일치 | 매칭되는 것만 생성, 경고 표시 |
| 챕터 파일 이미 존재 | 기본: 건너뜀 / --overwrite: 덮어쓰기 |

### Step 10: public 디렉토리 동기화

챕터 파일이 생성되면 웹에서 동적 로딩이 가능하도록 public 디렉토리에 복사합니다.

```bash
# 디렉토리 생성
mkdir -p public/readings/week{N}/{parentSlug}/

# 챕터 파일 복사
cp docs/week{N}/{parentSlug}/kr/*.md public/readings/week{N}/{parentSlug}/
```

**출력 예시**:
```
✓ public 디렉토리 동기화 완료
  - 경로: public/readings/week1/deep-dive-llms/
  - 파일: 24개
```

### Step 11: hasMarkdown 플래그 업데이트

readings.ts의 모든 children에 `hasMarkdown: true`와 `published: true`를 설정합니다.

```typescript
// Step 6에서 생성한 children 업데이트
children: [
  {
    slug: 'introduction',
    title: '1. Introduction',
    titleKr: '1. 소개',
    sourceUrl: 'https://www.youtube.com/watch?v=...&t=0s',
    published: true,      // ← 변경
    hasMarkdown: true,    // ← 추가
  },
  // ...
]
```

**주의**: 번역 파일이 없어서 챕터 파일을 생성하지 않은 경우, `hasMarkdown: false`로 유지합니다.

### Step 12: 최종 결과 출력

```
✓ YouTube 콘텐츠를 챕터별 하위페이지로 변환 완료

원본: week1/deep-dive-llms
챕터: 24개

readings.ts 업데이트:
  - isParent: true 추가
  - children: 24개 ChildReading 추가
  - hasMarkdown: true (모든 children)

챕터별 번역 파일 생성:
  ✓ docs/week1/deep-dive-llms/kr/introduction.md
  ✓ docs/week1/deep-dive-llms/kr/pretraining-data.md
  ... (24개 파일)

public 디렉토리 동기화:
  ✓ public/readings/week1/deep-dive-llms/ (24개 파일)

다음 단계:
  pnpm dev → /readings/week1/deep-dive-llms
```

## 참고

- prompt-engineering-guide와 동일한 UI 구조 사용
- 라우팅: `/readings/week{N}/{parentSlug}/{childSlug}`
- ReadingSidebar 컴포넌트로 네비게이션 제공
- 마크다운 동적 로딩: `fetch(/readings/week1/{slug}/{childSlug}.md)`

---
name: upload-reading
description: |
  번역된 한국어 마크다운 파일을 readings.ts에 추가하여 웹에 게시합니다.
  마크다운 파싱 → ReadingContent 객체 생성 → readings.ts/syllabus.ts 업데이트.
  YouTube 콘텐츠의 경우 요약(tldr, chapterSummaries) 필드도 파싱.
  사용: /upload-reading week1/slug 또는 /upload-reading week1/parent/child
arguments:
  - name: path
    description: |
      week/slug 또는 week/parent/child 형식의 문서 경로
      - 단일 페이지: week1/how-openai-uses-codex
      - 자식 페이지: week1/prompt-engineering-guide/zeroshot
    required: true
  - name: publish
    description: 즉시 published=true로 설정하여 웹에 공개
    required: false
  - name: draft
    description: published=false로 설정 (기본값)
    required: false
  - name: quick
    description: YouTube 콘텐츠에서 요약만 포함 (질문 없이 빠르게 처리)
    required: false
  - name: full
    description: YouTube 콘텐츠에서 모든 콘텐츠 포함 (질문 없이)
    required: false
---

# upload-reading Skill

번역된 한국어 마크다운 파일을 readings.ts에 추가하여 웹에 게시합니다.

## 사용법

```
# 단일 페이지
/upload-reading <week/slug>
/upload-reading <week/slug> --publish

# 계층적 구조 (자식 페이지)
/upload-reading <week/parent/child>
/upload-reading <week/parent/child> --publish

# YouTube 콘텐츠 옵션
/upload-reading <week/slug> --quick    # 요약만 포함 (빠른 처리)
/upload-reading <week/slug> --full     # 모든 콘텐츠 포함
/upload-reading <week/slug>            # 포함할 콘텐츠 선택 (AskUserQuestion)
```

## 예시

### 단일 페이지
```
/upload-reading week1/how-openai-uses-codex
/upload-reading week2/mcp-introduction --publish
```

### 계층적 구조 (자식 페이지)
```
/upload-reading week1/prompt-engineering-guide/zeroshot
/upload-reading week1/prompt-engineering-guide/fewshot --publish
```

### YouTube 콘텐츠 (포함 콘텐츠 선택)
```
# 요약만 빠르게 업로드
/upload-reading week1/deep-dive-llms --quick

# 모든 콘텐츠 포함
/upload-reading week1/deep-dive-llms --full

# 사용자에게 물어보기 (기본)
/upload-reading week1/deep-dive-llms
# → AskUserQuestion: "어떤 콘텐츠를 포함할까요?"
#   [x] 요약 (TL;DR + 챕터별 요약)
#   [x] Motivation (왜 읽어야 하는지)
#   [ ] 전문 번역
```

## 입출력

### 단일 페이지
- **입력**: `docs/week{N}/{slug}/kr/index.md` (한국어 번역본)
- **출력**:
  - `src/content/readings.ts`에 새 ReadingContent 추가
  - `src/content/syllabus.ts` translationStatus 업데이트

### 계층적 구조 (자식 페이지)
- **입력**: `docs/week{N}/{parent}/kr/{child}.md` (한국어 번역본)
- **출력**:
  - `src/content/readings.ts`의 부모 Reading의 `children` 배열에서 해당 child의 `sections`, `keyTakeaways` 추가
  - syllabus.ts는 변경하지 않음 (부모 레벨에서 관리)

## 워크플로우

```
/upload-reading week1/how-openai-uses-codex
           │
           ▼
┌──────────────────────────────────────┐
│ 1. 번역 파일 읽기                      │
│    docs/week1/how-openai-uses-codex/ │
│    kr/index.md                       │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 2. 마크다운 파싱                       │
│    - 프론트매터 → 메타데이터            │
│    - YouTube 구분자 확인               │
│    - h2 → sections                   │
│    - bullet lists → items            │
│    - 핵심 요약 → keyTakeaways         │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 3. ReadingContent 객체 생성           │
│    {                                 │
│      slug, week, title, titleKr,     │
│      author, readTime, sourceUrl,    │
│      sections: [...],                │
│      keyTakeaways: [...],            │
│      // YouTube 콘텐츠 추가 필드       │
│      contentType?, tldr?,            │
│      chapterSummaries?               │
│    }                                 │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 4. readings.ts 업데이트               │
│    readings['week1/how-openai-uses-  │
│    codex'] = { ... }                 │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 5. syllabus.ts 업데이트               │
│    krSlug: 'how-openai-uses-codex'   │
│    translationStatus: 'complete'     │
└──────────────────────────────────────┘
```

### 자식 페이지 워크플로우

```
/upload-reading week1/prompt-engineering-guide/zeroshot
           │
           ▼
┌──────────────────────────────────────┐
│ 1. 경로 파싱                          │
│    - 3단계 경로 → 자식 페이지          │
│    - parent: prompt-engineering-guide│
│    - child: zeroshot                 │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 2. 번역 파일 읽기                      │
│    docs/week1/prompt-engineering-    │
│    guide/kr/zeroshot.md              │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 3. 마크다운 파싱                       │
│    - 프론트매터 → 메타데이터            │
│    - h2 → sections                   │
│    - bullet lists → items            │
│    - 핵심 요약 → keyTakeaways         │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 4. 부모 Reading 찾기                  │
│    readings['week1/prompt-           │
│    engineering-guide']               │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 5. children 배열에서 child 찾기       │
│    children.find(c => c.slug ===     │
│    'zeroshot')                       │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 6. ChildReading 업데이트              │
│    {                                 │
│      slug: 'zeroshot',               │
│      ...기존 메타데이터,               │
│      sections: [...],    // 추가     │
│      keyTakeaways: [...],// 추가     │
│      published: true     // 옵션     │
│    }                                 │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 7. readings.ts 저장                  │
│    (syllabus.ts 수정 없음)           │
└──────────────────────────────────────┘
```

## 실행 지침

이 스킬이 호출되면 다음 단계를 따르세요:

### Step 0: 경로 파싱

```
경로를 '/'로 분리하여 단계 수 확인:
- 2단계 (week1/slug): 단일 페이지 → 기존 워크플로우
- 3단계 (week1/parent/child): 자식 페이지 → 자식 워크플로우

예시:
- week1/how-openai-uses-codex → 단일 페이지
- week1/prompt-engineering-guide/zeroshot → 자식 페이지
```

### Step 1: 번역 파일 읽기

**단일 페이지**:
```
1. docs/week{N}/{slug}/kr/index.md 파일 읽기
2. 파일이 없으면 에러: "번역 파일을 찾을 수 없습니다. /translate-reading을 먼저 실행하세요."
3. 원본 파일도 읽기: docs/week{N}/{slug}/eng/index.md (메타데이터 보완용)
```

**자식 페이지**:
```
1. docs/week{N}/{parent}/kr/{child}.md 파일 읽기
2. 파일이 없으면 에러: "번역 파일을 찾을 수 없습니다. /translate-reading을 먼저 실행하세요."
3. 원본 파일도 읽기: docs/week{N}/{parent}/eng/{child}.md (메타데이터 보완용)
```

### Step 1.5: 포함할 콘텐츠 선택 (YouTube 콘텐츠만)

YouTube 콘텐츠인 경우 (`contentType: youtube` 또는 `<!-- SUMMARY_START -->` 존재), AskUserQuestion 도구로 사용자에게 포함할 콘텐츠를 물어봅니다.

```
AskUserQuestion:
  questions:
    - question: "어떤 콘텐츠를 포함할까요?"
      header: "포함 콘텐츠"
      multiSelect: true
      options:
        - label: "요약 (TL;DR + 챕터별 요약)"
          description: "전체 요약과 챕터별 핵심 포인트를 포함합니다"
        - label: "Motivation (왜 읽어야 하는지)"
          description: "LLM이 생성한 동기부여 섹션을 포함합니다"
        - label: "전문 번역"
          description: "전체 번역 본문을 포함합니다 (긴 콘텐츠는 용량이 큼)"
```

**기본 동작** (일반 콘텐츠 또는 빠른 처리):
- `--quick` 옵션: 질문 없이 요약만 포함
- `--full` 옵션: 질문 없이 모든 콘텐츠 포함
- 옵션 없음: AskUserQuestion으로 선택 요청

**선택 결과 저장**:
```typescript
const includeOptions = {
  summary: boolean,      // TL;DR + chapterSummaries
  motivation: boolean,   // globalMotivation + sectionMotivations
  fullTranslation: boolean  // sections (전문)
}
```

### Step 2: 마크다운 파싱

#### 일반 콘텐츠

마크다운 구조를 ReadingContent 형식으로 변환:

```markdown
---
title: "한국어 제목"
originalTitle: "English Title"
author: "저자명"
sourceUrl: "https://..."
translatedAt: "2025-01-07"
---

# 한국어 제목

## 섹션 제목 1

본문 내용...

- 항목 1
- 항목 2

## 섹션 제목 2

본문 내용...

---

## 핵심 요약

- 포인트 1
- 포인트 2
```

#### YouTube 콘텐츠 (요약 포함)

YouTube 콘텐츠는 구분자로 요약/전체 번역 섹션이 구분됩니다:

```markdown
---
title: "한국어 제목"
originalTitle: "English Title"
author: "저자명"
sourceUrl: "https://..."
translatedAt: "2025-01-07"
status: "final"
contentType: "youtube"
duration: "3:31:05"
totalChapters: 24
hasSummary: true
---

# 한국어 제목

[원본 영상](URL)

<!-- SUMMARY_START -->

## TL;DR

전체 요약 내용...

## 이 콘텐츠에서 배울 수 있는 것

- 학습 목표 1
- 학습 목표 2

---

## 챕터별 요약

### 1. 챕터 제목 (0:00)

챕터 요약 내용...

**핵심 포인트:**
- 포인트 1
- 포인트 2

<!-- SUMMARY_END -->

---

<!-- FULL_TRANSLATION_START -->

## 전체 번역

### 목차
...

### 1. 챕터1
번역된 본문... (타임스탬프 없이 산문체로 작성)

<!-- FULL_TRANSLATION_END -->

---

## 핵심 요약
- 포인트 1
- 포인트 2
```

#### 파싱 규칙

1. **프론트매터**:
   - `title` → `titleKr`
   - `originalTitle` → `title`
   - `author` → `author`
   - `sourceUrl` → `sourceUrl`
   - `contentType` → `contentType` (있으면)
   - `duration` → `duration` (있으면)
   - `totalChapters` → `totalChapters` (있으면)

2. **YouTube 구분자 확인**:
   ```
   hasSummary: true 또는 <!-- SUMMARY_START --> 존재 시:
   → isYouTube = true
   → 요약 섹션과 전체 번역 섹션을 별도로 파싱
   ```

3. **YouTube 요약 파싱** (`<!-- SUMMARY_START -->` ~ `<!-- SUMMARY_END -->`):
   - `## TL;DR` → `tldr` (텍스트 그대로)
   - `## 이 콘텐츠에서 배울 수 있는 것` → `learningGoals` (불릿 배열)
   - `### N. 챕터명 (타임스탬프)` → `chapterSummaries` 배열:
     ```typescript
     chapterSummaries: [
       {
         number: 1,
         title: "챕터명",
         timestamp: "0:00",
         summary: "요약 텍스트",
         keyPoints: ["포인트1", "포인트2"]
       }
     ]
     ```

4. **전체 번역 파싱** (`<!-- FULL_TRANSLATION_START -->` ~ `<!-- FULL_TRANSLATION_END -->`):
   - 기존 섹션 파싱 로직 적용
   - `## 전체 번역` 하위의 `### N. 챕터명` → sections

5. **일반 본문 섹션** (h2 기준):
   ```typescript
   sections: [
     {
       title: "섹션 제목 1",
       content: "본문 내용...",
       items: ["항목 1", "항목 2"]  // 있으면
     }
   ]
   ```

6. **핵심 요약** (`## 핵심 요약` 또는 `## Key Takeaways`):
   ```typescript
   keyTakeaways: [
     { title: "포인트 1", content: "" },
     { title: "포인트 2", content: "" }
   ]
   ```

7. **읽기 시간 추정**:
   - 한글 기준 분당 500자
   - `readTime: "약 {N}분"`
   - YouTube 콘텐츠: frontmatter의 `duration` 사용

### Step 2.5: Motivation 생성 (선택적)

다음 조건에서 실행됩니다:
- 일반 콘텐츠: `--no-motivation` 플래그가 없으면 기본 실행
- YouTube 콘텐츠: Step 1.5에서 사용자가 "Motivation" 선택 시 (`includeOptions.motivation === true`)

1. **motivation-generator agent 호출**:
   ```
   Task 도구 사용:
   - subagent_type: "general-purpose"
   - prompt: motivation-generator.md 에이전트 프롬프트 내용 + 번역된 마크다운 전체
   - description: "motivation 생성"
   ```

   에이전트 프롬프트 위치: `.claude/agents/upload-reading/motivation-generator.md`

2. **Agent 출력 파싱**:
   - JSON 형식 응답 파싱
   - `globalMotivation` → `reading.motivation`
   - `sectionMotivations` → 각 `section.motivation`에 매핑

3. **섹션 매칭 로직**:
   ```typescript
   // sectionMotivations의 sectionTitle과 파싱된 sections의 title 매칭
   for (const sm of sectionMotivations) {
     const section = sections.find(s => s.title === sm.sectionTitle)
     if (section) {
       section.motivation = sm.motivation
     }
   }
   ```

4. **결과 병합**:
   - Step 2의 파싱 결과에 motivation 필드 추가
   - 매칭되지 않은 섹션은 motivation이 비어있음 (정상)

**Motivation 생성 실패 시**:
- 경고 메시지 출력: "⚠️ Motivation 생성에 실패했습니다. 빈 값으로 진행합니다."
- motivation 필드 없이 계속 진행 (기능 저하 허용)

### Step 3: 객체 생성

**일반 콘텐츠** (ReadingContent):
```typescript
const newReading: ReadingContent = {
  slug: '{slug}',
  week: {N},
  title: '{originalTitle}',
  titleKr: '{title}',
  author: '{author}',
  readTime: '약 {N}분',
  sourceUrl: '{sourceUrl}',
  sourceTitle: '{도메인 또는 유형}',
  published: false,  // --publish 플래그 없으면 기본 false
  // Motivation (Step 2.5에서 생성)
  motivation: {
    title: '왜 이 글을 읽어야 할까요?',
    content: '...',
    targetAudience: ['...']
  },
  sections: [
    {
      title: '섹션명',
      content: '...',
      items: ['...'],
      motivation: '...'  // 섹션별 동기부여
    }
  ],
  keyTakeaways: [...]
}
```

**YouTube 콘텐츠** (ReadingContent + 선택된 필드):

Step 1.5에서 선택한 `includeOptions`에 따라 포함할 필드가 결정됩니다:

```typescript
const newReading: ReadingContent = {
  // 항상 포함되는 기본 메타데이터
  slug: '{slug}',
  week: {N},
  title: '{originalTitle}',
  titleKr: '{title}',
  author: '{author}',
  readTime: '{duration}',
  sourceUrl: '{sourceUrl}',
  sourceTitle: '{YouTube - 제목}',
  published: false,
  contentType: 'youtube',
  duration: '{duration}',
  totalChapters: {N},

  // includeOptions.summary === true 일 때만 포함
  ...(includeOptions.summary && {
    tldr: '{tldr}',
    learningGoals: [...],
    chapterSummaries: [...]
  }),

  // includeOptions.motivation === true 일 때만 포함
  ...(includeOptions.motivation && {
    motivation: {
      title: '왜 이 글을 읽어야 할까요?',
      content: '...',
      targetAudience: ['...']
    }
  }),

  // includeOptions.fullTranslation === true 일 때만 포함
  ...(includeOptions.fullTranslation && {
    sections: [...],
    keyTakeaways: [...]
  })
}
```

**옵션별 포함 필드 정리**:

| 옵션 | 포함 필드 |
|------|----------|
| `--quick` | 기본 메타 + tldr, learningGoals, chapterSummaries |
| `--full` | 모든 필드 |
| 요약만 선택 | 기본 메타 + tldr, learningGoals, chapterSummaries |
| Motivation만 선택 | 기본 메타 + motivation |
| 전문만 선택 | 기본 메타 + sections, keyTakeaways |
| 모두 선택 | 모든 필드 |

**자식 페이지** (ChildReading 확장):
```typescript
// 기존 ChildReading에 추가할 필드
const childContent = {
  author: '{author}',
  readTime: '약 {N}분',
  sections: [...],
  keyTakeaways: [...],
  published: true  // --publish 플래그에 따라
}
```

### Step 4: readings.ts 업데이트

**단일 페이지**:
1. `src/content/readings.ts` 파일 읽기
2. 기존 readings 객체에서 동일 키 확인:
   - 키가 없으면: 새 항목 추가
   - 키가 있으면: **병합(merge)** 처리 (아래 참조)
3. Edit 도구로 파일 수정

**기존 엔트리가 있는 경우 (병합 처리)**:

readings.ts에 동일한 키가 이미 존재하면 기존 데이터를 보존하면서 새 데이터를 추가합니다.

1. **기존 Reading에서 보존할 필드**:
   - `isParent` (계층 구조 플래그)
   - `children` (자식 페이지 배열)
   - `relatedReadings` (관련 읽기)
   - `nextReading` (다음 읽기)

2. **새 Reading에서 추가/덮어쓸 필드**:
   - `tldr`, `learningGoals`, `chapterSummaries` (YouTube 요약)
   - `sections`, `keyTakeaways` (콘텐츠)
   - `titleKr`, `author`, `readTime` (메타데이터 업데이트)

3. **병합 로직**:
   ```typescript
   const mergedReading = {
     ...existingReading,           // 기존 필드 모두 유지
     ...newReading,                // 새 필드로 덮어쓰기
     // 단, 계층 구조 필드는 기존 값 보존
     isParent: existingReading.isParent,
     children: existingReading.children,
     relatedReadings: existingReading.relatedReadings,
     nextReading: existingReading.nextReading,
   }
   ```

4. **확인 메시지에 표시**:
   - "기존 엔트리와 병합됨"
   - "보존된 필드: isParent=true, children=24개" (해당되는 경우)

**자식 페이지**:
1. `src/content/readings.ts` 파일 읽기
2. 부모 Reading 찾기:
   ```typescript
   readings['week{N}/{parent}']
   ```
3. 부모가 없거나 `isParent: true`가 아니면 에러
4. `children` 배열에서 해당 `childSlug` 찾기:
   ```typescript
   const childIndex = parent.children.findIndex(c => c.slug === '{child}')
   ```
5. 해당 ChildReading에 콘텐츠 필드 추가:
   ```typescript
   children[childIndex] = {
     ...children[childIndex],  // 기존 메타데이터 유지
     author: '{author}',
     readTime: '약 {N}분',
     sections: [...],
     keyTakeaways: [...],
     published: true  // --publish 플래그에 따라
   }
   ```
6. Edit 도구로 파일 수정

### Step 5: syllabus.ts 업데이트

**단일 페이지**:
1. `src/content/syllabus.ts` 파일 읽기
2. 해당 week의 readings 배열에서 URL 매칭:
   ```typescript
   readings: [
     {
       title: 'How OpenAI Uses Codex',
       url: 'https://...',
       krSlug: 'how-openai-uses-codex',        // 추가
       translationStatus: 'complete'           // 추가
     }
   ]
   ```
3. Edit 도구로 파일 수정

**자식 페이지**:
- **syllabus.ts 수정 없음** (부모 레벨에서 관리)
- 자식 페이지의 게시 상태는 `readings.ts`의 `ChildReading.published`로 관리

## 옵션

### --publish
생성 즉시 `published: true`로 설정하여 웹에 공개합니다.

### --draft (기본값)
`published: false`로 설정합니다. 나중에 readings.ts에서 수동으로 true로 변경하면 공개됩니다.

### --no-motivation
Motivation 섹션 생성을 건너뜁니다. LLM 호출 없이 빠르게 업로드할 때 사용합니다. (일반 콘텐츠에만 적용)

### --quick
YouTube 콘텐츠에서 요약만 포함합니다 (TL;DR + 챕터별 요약). 사용자에게 묻지 않고 빠르게 처리합니다.

### --full
YouTube 콘텐츠에서 모든 콘텐츠를 포함합니다 (요약 + Motivation + 전문). 사용자에게 묻지 않습니다.

## 출력

### 일반 콘텐츠 업로드 완료 시:
```
✓ Motivation 생성 완료
  - 전체 동기부여: 생성됨
  - 섹션별 동기부여: 8개 중 6개 매칭

✓ readings.ts 업데이트 완료
  - 키: week1/how-openai-uses-codex
  - 제목: How OpenAI Uses Codex / OpenAI의 Codex 활용법
  - 섹션: 8개
  - Motivation: 포함
  - published: false

✓ syllabus.ts 업데이트 완료
  - Week 1 readings에 krSlug 추가
  - translationStatus: complete

다음 단계:
  1. 웹에서 확인: pnpm dev → /readings/week1/how-openai-uses-codex
  2. 공개하려면: readings.ts에서 published: true로 변경
```

### YouTube 콘텐츠 업로드 완료 시:
```
✓ 포함 콘텐츠 선택
  - 요약 (TL;DR + 챕터별): ✓
  - Motivation: ✓
  - 전문 번역: ✗

✓ readings.ts 업데이트 완료
  - 키: week1/deep-dive-llms
  - 제목: Deep Dive into LLMs / ChatGPT 같은 LLM 심층 분석
  - 콘텐츠 유형: youtube
  - TL;DR: 포함
  - 챕터별 요약: 24개
  - Motivation: 포함
  - 전문 섹션: 미포함
  - published: false

✓ syllabus.ts 업데이트 완료
  - Week 1 readings에 krSlug 추가
  - translationStatus: complete

다음 단계:
  1. 웹에서 확인: pnpm dev → /readings/week1/deep-dive-llms
  2. 공개하려면: readings.ts에서 published: true로 변경
  3. 전문 추가하려면: /upload-reading week1/deep-dive-llms --full
```

### 자식 페이지 업로드 완료 시:
```
✓ readings.ts 업데이트 완료
  - 부모: week1/prompt-engineering-guide
  - 자식: zeroshot
  - 제목: Zero-shot Prompting / Zero-shot 프롬프팅
  - 섹션: 3개
  - published: true

(syllabus.ts 수정 없음 - 부모 레벨에서 관리)

다음 단계:
  1. 웹에서 확인: pnpm dev → /readings/week1/prompt-engineering-guide/zeroshot
  2. 다른 자식 페이지 번역: /translate-reading week1/prompt-engineering-guide/fewshot
```

## 파싱 상세 규칙

### 섹션 분리

```markdown
## Use Case 1: Code Understanding   ← sections[0].title

Codex helps our teams...            ← sections[0].content

- They often use Codex to...        ← sections[0].items[0]
- During incident response...       ← sections[0].items[1]

### Anecdotes from our teams        ← 서브섹션은 content에 포함

> "When I fix a bug..."             ← blockquote도 content에 포함
```

### 특수 섹션 처리

| 섹션 제목 | 처리 방식 |
|----------|----------|
| `## 핵심 요약` | → keyTakeaways |
| `## Key Takeaways` | → keyTakeaways |
| `## 요약` | → keyTakeaways |
| `## Summary` | → keyTakeaways |
| `## Contents` | 무시 (목차) |
| `## 목차` | 무시 (목차) |
| `## TL;DR` | → tldr (YouTube) |
| `## 이 콘텐츠에서 배울 수 있는 것` | → learningGoals (YouTube) |
| `## 챕터별 요약` | → chapterSummaries 시작 (YouTube) |
| `## 전체 번역` | → sections 시작 (YouTube) |

### YouTube 챕터 요약 파싱

```markdown
### 1. 소개 (0:00)

ChatGPT와 같은 LLM에 대한...

**핵심 포인트:**
- 포인트 1
- 포인트 2
```

파싱 결과:
```typescript
{
  number: 1,
  title: "소개",
  timestamp: "0:00",
  summary: "ChatGPT와 같은 LLM에 대한...",
  keyPoints: ["포인트 1", "포인트 2"]
}
```

### 인용문 처리

```markdown
> "When I fix a bug, I use Ask mode..."
> — Performance Engineer, Retrieval Systems
```

→ content에 포함 (별도 필드 없음)

## 참고 파일

- `src/content/readings.ts`: ReadingContent, ChapterSummary 인터페이스 정의
- `src/content/syllabus.ts`: Reading 타입 및 week 데이터
- `docs/week{N}/kr/{slug}.md`: 번역된 마크다운 입력

## 에러 처리

| 상황 | 처리 |
|-----|-----|
| 번역 파일 없음 | `/translate-reading` 실행 안내 |
| readings.ts 구문 오류 | 파싱 에러 표시, 수동 수정 필요 |
| 이미 존재하는 키 | 덮어쓰기 확인 후 진행 |
| syllabus에 URL 없음 | 경고 표시, readings.ts만 업데이트 |
| YouTube 구분자 누락 | 일반 콘텐츠로 파싱 |

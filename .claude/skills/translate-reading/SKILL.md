---
name: translate-reading
description: |
  원본 reading을 한국어로 번역하여 마크다운 파일로 저장합니다.
  다단계 에이전트 파이프라인(용어검색→번역→정제→검증→QA→요약)으로 고품질 번역 생성.
  YouTube 콘텐츠의 경우 챕터별 요약도 자동 생성.
  사용: /translate-reading week1/slug 또는 /translate-reading week1/parent/child
arguments:
  - name: path
    description: |
      week/slug 또는 week/parent/child 형식의 문서 경로
      - 단일 페이지: week1/how-openai-uses-codex
      - 자식 페이지: week1/prompt-engineering-guide/zeroshot
    required: true
  - name: refine-only
    description: 기존 번역본의 품질만 개선 (translator 단계 스킵)
    required: false
  - name: skip-qa
    description: QA 단계를 스킵 (빠른 번역용)
    required: false
  - name: skip-summary
    description: 요약 단계를 스킵 (YouTube 콘텐츠에서도 요약 생략)
    required: false
---

# translate-reading Skill

원본 reading을 한국어로 번역하여 마크다운 파일로 저장합니다.

## 사용법

```
# 단일 페이지
/translate-reading <week/slug>
/translate-reading <week/slug> --refine-only
/translate-reading <week/slug> --skip-qa
/translate-reading <week/slug> --skip-summary

# 계층적 구조 (자식 페이지)
/translate-reading <week/parent/child>
/translate-reading <week/parent/child> --skip-qa
```

## 예시

### 단일 페이지
```
/translate-reading week1/how-openai-uses-codex
/translate-reading week2/mcp-introduction
```

### 계층적 구조 (자식 페이지)
```
/translate-reading week1/prompt-engineering-guide/zeroshot
/translate-reading week1/prompt-engineering-guide/fewshot
/translate-reading week1/prompt-engineering-guide/cot --skip-qa
```

## 입출력

### 단일 페이지
- **입력**: `docs/week{N}/{slug}.md` (영문 원문)
- **출력**: `docs/week{N}/kr/{slug}.md` (한국어 번역본)

### 계층적 구조 (자식 페이지)
- **입력**: `docs/week{N}/{parent-slug}/{child-slug}.md` (영문 원문)
- **출력**: `docs/week{N}/{parent-slug}/kr/{child-slug}.md` (한국어 번역본)

### 경로 예시
```
# 단일 페이지
week1/how-openai-uses-codex
→ 입력: docs/week1/how-openai-uses-codex.md
→ 출력: docs/week1/kr/how-openai-uses-codex.md

# 자식 페이지
week1/prompt-engineering-guide/zeroshot
→ 입력: docs/week1/prompt-engineering-guide/zeroshot.md
→ 출력: docs/week1/prompt-engineering-guide/kr/zeroshot.md
```

- **참조**: `docs/glossary.md` (용어집)

> **Note**: readings.ts 업데이트는 별도 스킬(`/upload-reading`)이 담당합니다.

## 워크플로우

이 스킬은 **Task tool**을 사용하여 각 에이전트를 순차적으로 실행합니다.

```
/translate-reading week1/deep-dive-llms
           │
           ▼
┌──────────────────────────────────────┐
│ 1. 원본 파일 읽기                      │
│    docs/week1/deep-dive-llms.md      │
│    + docs/glossary.md                 │
│    + YouTube 여부 확인 (frontmatter)  │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 2. Task: terminology-lookup          │
│    subagent_type: general-purpose    │
│    원문에서 용어 추출 → 용어집 확인     │
│    → 없는 용어 웹검색 → JSON 결과      │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 3. Task: translator                  │
│    subagent_type: general-purpose    │
│    영어 원문 → 한국어 초벌 번역         │
│    용어 검색 결과 참조하여 번역         │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 4. Task: translation-refiner (1차)   │
│    subagent_type: general-purpose    │
│    번역체 → 자연스러운 한국어           │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 5. Task: translation-validator       │
│    subagent_type: general-purpose    │
│    원문 대비 검증 (누락, 오역)          │
│    → 수정 제안 JSON 생성               │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 6. Task: translation-refiner (2차)   │
│    validator 피드백 반영               │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 7. Task: translation-qa              │
│    subagent_type: general-purpose    │
│    최종 품질 검증 (문체, 용어, 가독성)  │
│    → QA 보고서 JSON 생성               │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 8. Task: translation-refiner (3차)   │
│    QA 피드백 반영 → 최종본             │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 9. [신규] 요약 생성 (조건부)           │
│    IF source_type == "youtube"       │
│       OR chapters 필드 존재           │
│       AND --skip-summary 아님        │
│    THEN Task: translation-summarizer │
│    ELSE 스킵                          │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 10. 마크다운 파일 조립 및 저장         │
│    - YouTube: 요약 + 전체 번역 조립    │
│    - 기타: 기존 형식 유지              │
└──────────────────────────────────────┘
```

## 중요: 한글 파일 편집 시 Edit 도구 사용 금지

**Claude Code의 Edit 도구는 UTF-8 한글 문자(3바이트)를 처리할 때 바이트 경계 오류를 발생시킵니다.**

```
CRITICAL: 한글이 포함된 파일을 수정할 때 절대 Edit 도구를 사용하지 마세요!
항상 Write 도구로 전체 파일을 다시 작성하세요.
```

이 규칙은 모든 단계에 적용됩니다:
- 번역 파일 생성: Write 사용
- 번역 파일 수정: Write 사용 (Edit 절대 금지)
- refiner/validator 피드백 반영: Write 사용

## 실행 지침

이 스킬이 호출되면 다음 단계를 따르세요:

### Step 1: 파일 읽기
```
경로 파싱:
- 2단계 (week1/slug): 단일 페이지
- 3단계 (week1/parent/child): 자식 페이지

단일 페이지:
1. docs/week{N}/{slug}.md 읽기 (원문)
2. docs/glossary.md 읽기 (용어집)
3. docs/week{N}/kr/ 디렉토리 없으면 생성
4. frontmatter에서 source_type 또는 chapters 확인 → isYouTube 플래그 설정

자식 페이지:
1. docs/week{N}/{parent}/{child}.md 읽기 (원문)
2. docs/glossary.md 읽기 (용어집)
3. docs/week{N}/{parent}/kr/ 디렉토리 없으면 생성
4. frontmatter에서 source_type 또는 chapters 확인 → isYouTube 플래그 설정
```

### Step 2: Terminology Lookup 실행
```
Task tool 호출:
- subagent_type: "general-purpose"
- prompt: .claude/agents/translate-reading/terminology-lookup.md 내용 + 원문 + 용어집
- description: "terminology lookup - 용어 검색"

용어집에 없는 기술 용어, 고유명사를 웹검색하여 번역 기준 수립
```

### Step 3: Translator 실행
```
Task tool 호출:
- subagent_type: "general-purpose"
- prompt: .claude/agents/translate-reading/translator.md 내용 + 원문 + 용어집 + 용어 검색 결과
- description: "translator - 초벌 번역"
```

### Step 4: Refiner 1차 실행
```
Task tool 호출:
- subagent_type: "general-purpose"
- prompt: .claude/agents/translate-reading/translation-refiner.md 내용 + 번역 결과
- description: "refiner 1차 - 번역체 정리"
```

### Step 5: Validator 실행
```
Task tool 호출:
- subagent_type: "general-purpose"
- prompt: .claude/agents/translate-reading/translation-validator.md 내용 + 원문 + 번역 결과
- description: "validator - 품질 검증"
```

### Step 6: Refiner 2차 실행
```
Task tool 호출:
- prompt: refiner.md 내용 + 번역 결과 + validator 피드백
- description: "refiner 2차 - validator 피드백 반영"
```

### Step 7: QA 실행 (--skip-qa가 아닌 경우)
```
Task tool 호출:
- subagent_type: "general-purpose"
- prompt: .claude/agents/translate-reading/translation-qa.md 내용 + 번역 결과
- description: "QA - 최종 품질 검증"
```

### Step 8: Refiner 3차 실행
```
Task tool 호출:
- prompt: refiner.md 내용 + 번역 결과 + QA 피드백
- description: "refiner 3차 - QA 피드백 반영"
```

### Step 9: Summarizer 실행 (YouTube 콘텐츠 + --skip-summary 아닌 경우)
```
조건 확인:
- isYouTube == true (source_type: "youtube" 또는 chapters 필드 존재)
- --skip-summary 옵션이 아님

조건 만족 시 Task tool 호출:
- subagent_type: "general-purpose"
- prompt: .claude/agents/translate-reading/translation-summarizer.md 내용
         + 번역된 마크다운 전체
         + 원본 마크다운 (챕터 구조 참조용)
- description: "summarizer - 챕터별 요약 생성"

출력: JSON 형식의 요약 데이터
{
  "tldr": "...",
  "learningGoals": [...],
  "chapters": [...],
  "totalChapters": N
}
```

### Step 10: 파일 조립 및 저장

#### YouTube 콘텐츠 (요약 포함)
```markdown
---
title: "한국어 제목"
originalTitle: "English Title"
author: "저자명"
sourceUrl: "원문 URL"
translatedAt: "YYYY-MM-DD"
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

{tldr}

## 이 콘텐츠에서 배울 수 있는 것

{learningGoals를 불릿 리스트로}

---

## 챕터별 요약

### 1. {chapter.title} ({chapter.timestamp})

{chapter.summary}

**핵심 포인트:**
{chapter.keyPoints를 불릿 리스트로}

---

### 2. {다음 챕터}...

<!-- SUMMARY_END -->

---

<!-- FULL_TRANSLATION_START -->

## 전체 번역

### 목차

{번역된 목차 - 원본에서 가져옴}

---

{번역된 전체 본문 - Step 8의 결과물}

<!-- FULL_TRANSLATION_END -->

---

## 핵심 요약

{기존 핵심 요약 유지}
```

#### 일반 콘텐츠 (기존 형식)
```
단일 페이지:
Write tool로 docs/week{N}/kr/{slug}.md 저장

자식 페이지:
Write tool로 docs/week{N}/{parent}/kr/{child}.md 저장

공통:
- 마크다운 형식
- 메타데이터 포함 (원문 URL, 번역일 등)
- 기존 출력 형식 유지
```

## 옵션

### --refine-only
이미 번역된 콘텐츠의 품질만 개선합니다.
- `docs/week{N}/kr/{slug}.md` 파일이 존재해야 함
- translator 단계 스킵
- refiner → validator → refiner → qa → refiner 만 실행

### --skip-qa
QA 단계를 스킵합니다 (빠른 번역용).
- translator → refiner(1차) → validator → refiner(2차) 까지만 실행

### --skip-summary
요약 단계를 스킵합니다.
- YouTube 콘텐츠에서도 요약 생성을 건너뜀
- 전체 번역만 포함된 기존 형식으로 저장

## Agent 파일

- `.claude/agents/translate-reading/terminology-lookup.md`
- `.claude/agents/translate-reading/translator.md`
- `.claude/agents/translate-reading/translation-refiner.md`
- `.claude/agents/translate-reading/translation-validator.md`
- `.claude/agents/translate-reading/translation-qa.md`
- `.claude/agents/translate-reading/translation-summarizer.md` (신규)

## 참고 문서

- `PLAN-translate-skill.md`: 번역 가이드라인 상세
- `docs/glossary.md`: 용어집

## 출력 형식

### 일반 콘텐츠

번역 완료된 마크다운 파일 구조:

```markdown
---
title: "한국어 제목"
originalTitle: "English Title"
author: "저자명"
sourceUrl: "원문 URL"
translatedAt: "2025-01-07"
---

# 한국어 제목

## 섹션 1

본문 내용...

## 섹션 2

본문 내용...

---

## 핵심 요약

- 포인트 1
- 포인트 2
```

### YouTube 콘텐츠 (요약 포함)

```markdown
---
title: "한국어 제목"
originalTitle: "English Title"
author: "저자명"
sourceUrl: "원문 URL"
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

### 1. 소개 (0:00)

챕터 요약 내용...

**핵심 포인트:**
- 포인트 1
- 포인트 2

---

### 2. 다음 챕터 (1:00)

...

<!-- SUMMARY_END -->

---

<!-- FULL_TRANSLATION_START -->

## 전체 번역

### 목차

1. [소개](#1-소개) (0:00)
2. [다음 챕터](#2-다음-챕터) (1:00)
...

---

### 1. 소개

[0:00] 번역된 본문...

---

### 2. 다음 챕터

[1:00] 번역된 본문...

<!-- FULL_TRANSLATION_END -->

---

## 핵심 요약

- 포인트 1
- 포인트 2
```

### 구분자 용도

| 구분자 | 용도 |
|--------|------|
| `<!-- SUMMARY_START -->` | 요약 섹션 시작 (파싱용) |
| `<!-- SUMMARY_END -->` | 요약 섹션 끝 |
| `<!-- FULL_TRANSLATION_START -->` | 전체 번역 시작 |
| `<!-- FULL_TRANSLATION_END -->` | 전체 번역 끝 |

이 구분자는 향후 챕터별 페이지 분리 시 파싱에 활용됩니다.

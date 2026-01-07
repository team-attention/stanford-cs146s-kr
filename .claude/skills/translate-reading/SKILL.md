# translate-reading Skill

원본 reading을 한국어로 번역하여 마크다운 파일로 저장합니다.

## 사용법

```
/translate-reading <week/slug>
/translate-reading <week/slug> --refine-only
/translate-reading <week/slug> --skip-qa
```

## 예시

```
/translate-reading week1/how-openai-uses-codex
/translate-reading week2/mcp-introduction
/translate-reading week1/prompt-engineering-guide --refine-only
```

## 입출력

- **입력**: `docs/week{N}/{slug}.md` (영문 원문)
- **출력**: `docs/week{N}/kr/{slug}.md` (한국어 번역본)
- **참조**: `docs/glossary.md` (용어집)

> **Note**: readings.ts 업데이트는 별도 스킬(`/upload-reading`)이 담당합니다.

## 워크플로우

이 스킬은 **Task tool**을 사용하여 각 에이전트를 순차적으로 실행합니다.

```
/translate-reading week1/how-openai-uses-codex
           │
           ▼
┌──────────────────────────────────────┐
│ 1. 원본 파일 읽기                      │
│    docs/week1/how-openai-uses-codex.md│
│    + docs/glossary.md                 │
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
│ 9. 마크다운 파일 저장                  │
│    docs/week1/kr/how-openai-uses-    │
│    codex.md                          │
└──────────────────────────────────────┘
```

## 실행 지침

이 스킬이 호출되면 다음 단계를 따르세요:

### Step 1: 파일 읽기
```
1. docs/week{N}/{slug}.md 읽기 (원문)
2. docs/glossary.md 읽기 (용어집)
3. docs/week{N}/kr/ 디렉토리 없으면 생성
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

### Step 9: 파일 저장
```
Write tool로 docs/week{N}/kr/{slug}.md 저장
- 마크다운 형식
- 메타데이터 포함 (원문 URL, 번역일 등)
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

## Agent 파일

- `.claude/agents/translate-reading/terminology-lookup.md`
- `.claude/agents/translate-reading/translator.md`
- `.claude/agents/translate-reading/translation-refiner.md`
- `.claude/agents/translate-reading/translation-validator.md`
- `.claude/agents/translate-reading/translation-qa.md`

## 참고 문서

- `PLAN-translate-skill.md`: 번역 가이드라인 상세
- `docs/glossary.md`: 용어집

## 출력 형식

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

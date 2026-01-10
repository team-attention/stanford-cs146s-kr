---
name: nanobanana
description: |
  Reading 원문에서 나노바나나 프로용 치트시트 프롬프트를 생성합니다.
  3단계 에이전트 파이프라인(분석→구조설계→프롬프트생성)으로 콘텐츠 유형에 맞는 프롬프트 생성.
  사용: /nanobanana week1/slug
arguments:
  - name: path
    description: |
      week/slug 또는 week/parent/child 형식의 문서 경로
      - 단일 페이지: week1/how-openai-uses-codex
      - 계층 구조: week1/prompt-engineering-guide/zeroshot
    required: true
---

# nanobanana Skill

Reading 원문에서 나노바나나 프로용 치트시트 프롬프트를 생성합니다.

## 사용법

```
/nanobanana <week/slug>
```

## 예시

```
/nanobanana week1/how-openai-uses-codex
/nanobanana week2/mcp-introduction
/nanobanana week1/deep-dive-llms
```

## 입출력

- **입력**: `docs/week{N}/{slug}.md` (원문)
- **출력**: `.claude/outputs/nanobanana/week{N}/{slug}-cheatsheet-prompt.md` (나노바나나 프롬프트)

### 경로 예시
```
week1/how-openai-uses-codex
→ 입력: docs/week1/how-openai-uses-codex.md
→ 출력: .claude/outputs/nanobanana/week1/how-openai-uses-codex-cheatsheet-prompt.md
```

## 워크플로우

이 스킬은 **Task tool**을 사용하여 각 에이전트를 순차적으로 실행합니다.

```
/nanobanana week1/how-openai-uses-codex
           │
           ▼
┌──────────────────────────────────────┐
│ 1. 원본 파일 읽기                      │
│    docs/week1/how-openai-uses-codex.md│
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 2. Task: content-analyzer            │
│    subagent_type: general-purpose    │
│    원문 분석 → 콘텐츠 유형 판별         │
│    → 핵심 개념/구조/엔티티 추출        │
│    → JSON 결과                       │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 3. 템플릿 로드                         │
│    콘텐츠 유형에 맞는 템플릿 선택        │
│    - use-case → use-case-style.md    │
│    - tutorial → tutorial-style.md    │
│    - lecture → lecture-style.md      │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 4. Task: structure-planner           │
│    subagent_type: general-purpose    │
│    analyzer 결과 + 템플릿 기반         │
│    → 섹션 구조 설계                    │
│    → Mermaid 다이어그램 계획           │
│    → 표 구조 설계                      │
│    → JSON 결과                        │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 5. Task: prompt-generator            │
│    subagent_type: general-purpose    │
│    원본 + analyzer + planner 통합     │
│    → 완성된 프롬프트 MD 생성           │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 6. 파일 저장                          │
│    Write tool 사용                    │
│    → {slug}-cheatsheet-prompt.md     │
└──────────────────────────────────────┘
           │
           ▼
        완료!
```

## 콘텐츠 유형

| 유형 | 특성 | 템플릿 |
|------|------|--------|
| use-case | 사례 중심, Anecdote 포함, Best Practices | use-case-style.md |
| tutorial | 단계별 가이드, 코드/명령어 | tutorial-style.md |
| lecture | 강의/프레젠테이션, 개념 설명 | lecture-style.md |

## 실행 지침

### Step 1: 경로 파싱

```
입력: week1/how-openai-uses-codex
→ weekNum: 1
→ slug: how-openai-uses-codex
→ 입력 경로: docs/week1/how-openai-uses-codex.md
→ 출력 경로: .claude/outputs/nanobanana/week1/how-openai-uses-codex-cheatsheet-prompt.md
```

### Step 2: 원본 파일 읽기

Read tool로 원본 파일 읽기:
```
docs/week{N}/{slug}.md
```

파일이 없으면 에러 메시지 출력 후 종료.

### Step 3: content-analyzer 에이전트 호출

Task tool 호출:
- **subagent_type**: "general-purpose"
- **description**: "analyze content for nanobanana"
- **prompt**:
  ```
  아래 에이전트 지침을 따라 콘텐츠를 분석하세요.

  ## 에이전트 지침
  [.claude/agents/nanobanana/content-analyzer.md 내용]

  ## 원본 콘텐츠
  [원본 마크다운 내용]

  JSON 형식으로 결과를 출력하세요.
  ```

결과: JSON (contentType, keyConcepts, structure, entities, actionItems 등)

### Step 4: 템플릿 로드

analyzer 결과의 `contentType`에 따라 템플릿 선택:
- `use-case` → `.claude/templates/nanobanana/use-case-style.md`
- `tutorial` → `.claude/templates/nanobanana/tutorial-style.md`
- `lecture` → `.claude/templates/nanobanana/lecture-style.md`

Read tool로 해당 템플릿 파일 읽기.

### Step 5: structure-planner 에이전트 호출

Task tool 호출:
- **subagent_type**: "general-purpose"
- **description**: "plan cheatsheet structure"
- **prompt**:
  ```
  아래 에이전트 지침을 따라 치트시트 구조를 설계하세요.

  ## 에이전트 지침
  [.claude/agents/nanobanana/structure-planner.md 내용]

  ## 콘텐츠 분석 결과
  [Step 3의 JSON 결과]

  ## 적용 템플릿
  [Step 4에서 로드한 템플릿 내용]

  JSON 형식으로 결과를 출력하세요.
  ```

결과: JSON (sections, diagrams, tables, codeBlocks, emphasis)

### Step 6: prompt-generator 에이전트 호출

Task tool 호출:
- **subagent_type**: "general-purpose"
- **description**: "generate nanobanana prompt"
- **prompt**:
  ```
  아래 에이전트 지침을 따라 나노바나나 프롬프트를 생성하세요.

  ## 에이전트 지침
  [.claude/agents/nanobanana/prompt-generator.md 내용]

  ## 원본 콘텐츠
  [원본 마크다운 내용]

  ## 콘텐츠 분석 결과
  [Step 3의 JSON 결과]

  ## 구조 설계 결과
  [Step 5의 JSON 결과]

  완성된 프롬프트를 마크다운 형식으로 출력하세요.
  ```

결과: 완성된 나노바나나 프롬프트 (마크다운)

### Step 7: 파일 저장

Write tool로 결과 저장:
```
.claude/outputs/nanobanana/week{N}/{slug}-cheatsheet-prompt.md
```

출력 디렉토리가 없으면 Bash tool로 먼저 생성:
```bash
mkdir -p .claude/outputs/nanobanana/week{N}/{parent-if-any}
```

### Step 8: 완료 메시지

```
✅ 나노바나나 프롬프트 생성 완료!

📄 출력 파일: .claude/outputs/nanobanana/week1/how-openai-uses-codex-cheatsheet-prompt.md
📊 콘텐츠 유형: use-case
🔧 사용된 템플릿: use-case-style

이 프롬프트를 나노바나나 프로에 붙여넣어 치트시트를 생성하세요.
```

## 에러 처리

| 상황 | 처리 |
|------|------|
| 원본 파일 없음 | "❌ 파일을 찾을 수 없습니다: {경로}" 출력 후 종료 |
| 콘텐츠 유형 판별 실패 | 기본값 `use-case` 사용, 경고 메시지 출력 |
| 에이전트 오류 | 에러 내용 출력, 재시도 권장 |

## 참조 파일

```
.claude/
├── agents/nanobanana/
│   ├── content-analyzer.md     # 콘텐츠 분석 에이전트
│   ├── structure-planner.md    # 구조 설계 에이전트
│   └── prompt-generator.md     # 프롬프트 생성 에이전트
└── templates/nanobanana/
    ├── use-case-style.md       # 사례 중심 템플릿
    ├── tutorial-style.md       # 튜토리얼 템플릿
    └── lecture-style.md        # 강의 템플릿
```

# 번역 스킬 생성 계획

> 참조 레포: `ai-builders-meetup/.claude/skills/video-subtitle/`

## 목표

`readings.ts`의 영어 원문을 한국어로 번역하고, 반복 교정을 통해 품질을 개선하는 스킬 생성.

## 참조한 패턴 (video-subtitle)

```
generator → cleaner → corrector(1차) → validator → corrector(2차) → qa → corrector(3차)
```

**핵심 원리:**
- 반복 교정: corrector가 3번 실행 (1차 기본, 2차 validator 피드백, 3차 QA 피드백)
- 검증-교정 분리: validator/qa는 검증만, corrector가 실제 수정
- 이중 검증: Claude + Codex로 교차 검증

## 번역 스킬 구조

### 워크플로우

```
┌─────────────────┐
│ translator      │  영어 원문 → 한국어 초벌 번역
│                 │  → sections 배열 생성
└────────┬────────┘
         ▼
┌─────────────────┐
│ translation-    │  번역체 정리, 자연스러운 한국어로
│ refiner (1차)   │  → 어색한 표현, 직역체 수정
└────────┬────────┘
         ▼
┌─────────────────┐
│ translation-    │  원문 대비 품질 검증 (누락, 오역)
│ validator       │  → 수정 제안 목록 생성
└────────┬────────┘
         ▼
┌─────────────────┐
│ translation-    │  validator 피드백 반영
│ refiner (2차)   │  → 오역/누락 수정
└────────┬────────┘
         ▼
┌─────────────────┐
│ translation-    │  최종 품질 검증 (Claude + Codex)
│ qa              │  → 문체, 용어 일관성, 가독성
└────────┬────────┘
         ▼
┌─────────────────┐
│ translation-    │  QA 피드백 반영
│ refiner (3차)   │  → 최종 다듬기, published: true 설정
└─────────────────┘
```

### 에이전트 정의

#### 1. translator
- **역할**: 영어 원문 → 한국어 초벌 번역
- **입력**: 원문 URL 또는 텍스트
- **출력**: `ReadingContent` 형식의 초벌 번역
- **참고**: IT 용어는 원어 유지 (LLM, API, MCP 등)

#### 2. translation-refiner
- **역할**: 한국어 품질 개선 (반복 호출)
- **입력**: 번역된 sections, 피드백 (선택)
- **출력**: 개선된 sections
- **체크포인트**:
  - 번역체 → 자연스러운 한국어
  - 문장 호응 오류
  - 어색한 조사/어미
  - 불필요한 수동태

#### 3. translation-validator
- **역할**: 원문 대비 품질 검증
- **입력**: 원문, 번역문
- **출력**: 수정 제안 목록
- **체크포인트**:
  - 누락된 내용
  - 오역
  - 의미 왜곡
  - 용어 불일치

#### 4. translation-qa
- **역할**: 최종 품질 검증 (Claude + Codex)
- **입력**: 최종 번역문
- **출력**: QA 보고서
- **체크포인트**:
  - 문체 일관성
  - 용어 일관성 (readings 전체)
  - 가독성
  - 맞춤법/띄어쓰기

## 파일 구조

```
.claude/
├── settings.json
├── skills/
│   └── translate-reading/
│       └── SKILL.md
└── agents/
    └── translate-reading/
        ├── translator.md
        ├── translation-refiner.md
        ├── translation-validator.md
        └── translation-qa.md
```

## 사용법 (예상)

```bash
# 특정 reading 번역
/translate-reading --slug week2/mcp-documentation

# 원문 URL 직접 지정
/translate-reading --url https://stytch.com/blog/model-context-protocol-introduction/

# 기존 번역 품질 개선만 (translator 스킵)
/translate-reading --slug week1/prompt-engineering-guide --refine-only
```

## 번역 대상 파일

- `src/content/readings.ts`
- 현재 `published: false`인 readings:
  - `week1/prompt-engineering-guide`
  - `week2/mcp-documentation`
  - `week2/building-mcp-servers`
  - `week2/tool-use-claude`

## 용어집 (일관성 유지)

| 영어 | 한국어 | 비고 |
|------|--------|------|
| LLM | LLM | 원어 유지 |
| Prompt | 프롬프트 | |
| Agent | 에이전트 | |
| Tool Use | 도구 사용 | |
| MCP | MCP | 원어 유지 |
| Chain of Thought | Chain of Thought | 원어 유지 또는 "사고의 연쇄" |
| Fine-tuning | 파인튜닝 | |
| Hallucination | 환각 | |

---

## 품질 문제 분석 (How OpenAI Uses Codex 사례)

> 참고: [REF-how-openai-uses-codex-kr.md](./REF-how-openai-uses-codex-kr.md)

### 1. 과도한 요약 (정보 손실)

| 원문 | 현재 번역 |
|------|----------|
| "When I fix a bug, I use Ask mode to see where else in the codebase the same issue might appear." | "Ask 모드로 코드베이스 내 동일 문제 확인" |
| "When I'm on-call, I paste the stack trace and ask Codex where the auth flow lives. It jumps straight to the right files so I can triage fast." | "스택 추적 분석으로 인증 흐름 빠르게 파악" |

**문제**: 엔지니어의 생생한 경험담이 건조한 요약으로 변함. 맥락("버그 수정 시", "on-call 중")이 사라짐.

### 2. 번역투/직역체

- ❌ "많은 기술 팀에서 매일 사용되고 있습니다" (수동태)
- ✅ "OpenAI의 여러 기술 팀이 매일 Codex를 사용합니다"

### 3. 뉘앙스 손실

- "resolving incidents under tight deadlines" → 긴급함 뉘앙스 누락
- "get up to speed quickly" → 단순히 "적응"으로 축소

### 4. 구체적 예시 누락

- 원문의 **샘플 프롬프트들**이 번역에서 대부분 빠짐
- Best Practices의 세부 설명이 간략화됨

---

## 번역 Context 가이드

번역 품질 향상을 위해 에이전트에 제공할 Context:

### 1. 문서 유형별 번역 전략

| 문서 유형 | 번역 전략 |
|----------|----------|
| 사례 연구 (Case Study) | 인터뷰 톤 유지, 1인칭 시점 보존, 생생함 유지 |
| 기술 문서 (Documentation) | 정확성 우선, 용어 일관성, 간결함 |
| 튜토리얼 (Tutorial) | 친근한 톤, 단계별 명확성 |
| 블로그 포스트 | 저자 스타일 반영, 캐주얼한 표현 허용 |

### 2. 번역 깊이 지정

```
번역 원칙:
- 요약하지 말 것. 원문의 모든 내용을 번역할 것.
- Anecdotes/인용문은 말하는 사람의 톤을 살려서 번역
- 샘플 프롬프트, 코드 예시 등 구체적 내용 누락 금지
```

### 3. 스타일 가이드

```
문체 규칙:
- 수동태 → 능동태로 변환
- "~되고 있습니다" → "~합니다"
- "~에 의해" → 주어를 명시
- 번역투 조사 피하기: "~에 대해", "~로서", "~에 있어서"
```

### 4. Few-shot 예시

**나쁜 번역:**
> "Codex는 OpenAI의 보안, 제품 엔지니어링, 프론트엔드, API, 인프라, 성능 엔지니어링과 같은 많은 기술 팀에서 매일 사용되고 있습니다."

**좋은 번역:**
> "OpenAI의 보안, 제품 엔지니어링, 프론트엔드, API, 인프라, 성능 엔지니어링 등 여러 기술 팀이 매일 Codex를 사용합니다."

---

**나쁜 번역:**
> "Ask 모드로 코드베이스 내 동일 문제 확인"

**좋은 번역:**
> "버그를 수정할 때 Ask 모드로 코드베이스의 다른 곳에도 같은 문제가 있는지 확인합니다."

---

## TODO

- [ ] SKILL.md 작성
- [ ] translator.md 작성
- [ ] translation-refiner.md 작성
- [ ] translation-validator.md 작성
- [ ] translation-qa.md 작성
- [ ] 테스트 실행 (week2/mcp-documentation)
- [ ] 용어집 확장

---
name: wrap
description: |
  세션 종료 시 자동 정리를 수행합니다.
  CLAUDE.md 업데이트 제안, 반복 패턴 자동화 기회 탐지,
  배운 것 정리, 미완성 작업 정리.
  사용자가 /wrap 또는 세션 마무리 요청 시 사용.
arguments:
  - name: quick
    description: |
      간단 모드 (doc-updater만 실행)
      빠른 CLAUDE.md 업데이트만 필요할 때
    required: false
  - name: no-commit
    description: |
      커밋 옵션을 제외하고 분석만 수행
    required: false
---

# wrap Skill

Claude Code 세션 종료 시 자동 정리를 수행하는 스킬입니다.
"이거 CLAUDE.md에 적어야 하나?"라는 반복적인 고민을 해결합니다.

## 사용법

```
/wrap                    # 전체 분석
/wrap --quick            # 간단 모드 (CLAUDE.md만)
/wrap --no-commit        # 커밋 옵션 제외
```

## 예시

```bash
# 세션 마무리 시
/wrap

# 빠르게 CLAUDE.md만 체크
/wrap --quick

# 분석만 하고 커밋은 나중에
/wrap --no-commit
```

## 워크플로우

```
/wrap
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│                    Phase 1: 병렬 분석                        │
├──────────────┬──────────────┬──────────────┬───────────────┤
│ doc-updater  │ automation-  │ learning-    │ followup-     │
│              │ scout        │ extractor    │ suggester     │
│ CLAUDE.md    │ 반복 패턴    │ 배운 것      │ 미완성 작업   │
│ 업데이트     │ 자동화       │ 실수/발견    │ 우선순위      │
└──────┬───────┴──────┬───────┴──────┬───────┴───────┬───────┘
       │              │              │               │
       └──────────────┴──────────────┴───────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Phase 2: 중복 검증 및 정리                      │
│                   duplicate-checker                          │
│     기존 CLAUDE.md와 비교하여 중복 항목 제거                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Phase 3: 사용자 선택                            │
│  AskUserQuestion으로 다음 중 선택:                           │
│  1. CLAUDE.md 업데이트                                       │
│  2. 자동화 스킬 생성                                         │
│  3. 커밋 생성                                                │
│  4. 결과만 확인 (아무 작업 안 함)                            │
└─────────────────────────────────────────────────────────────┘
```

## 실행 지침

### Step 0: 사전 준비

1. CLAUDE.md 파일 읽기
   ```
   Read: /Users/junchan/Documents/GitHub/stanford-cs146s-kr/CLAUDE.md
   ```

2. `--quick` 모드인 경우 Phase 1에서 doc-updater만 실행

### Step 1: Phase 1 - 병렬 분석

4개의 에이전트를 **병렬로** 실행합니다.
각 에이전트에게 현재 대화 컨텍스트를 전달합니다.

**중요**: 현재 대화의 핵심 내용을 요약하여 에이전트에게 전달해야 합니다.
- 수행한 작업들
- 발생한 문제들과 해결 방법
- 사용한 명령어나 패턴
- 미완료된 작업

```
Task (4개 병렬 호출):

1. doc-updater
   - subagent_type: "general-purpose"
   - description: "CLAUDE.md 업데이트 분석"
   - prompt: .claude/agents/wrap/doc-updater.md 지침 + 세션 요약 + 현재 CLAUDE.md 내용

2. automation-scout
   - subagent_type: "general-purpose"
   - description: "반복 패턴 자동화 기회 탐지"
   - prompt: .claude/agents/wrap/automation-scout.md 지침 + 세션 요약

3. learning-extractor
   - subagent_type: "general-purpose"
   - description: "학습 내용 추출"
   - prompt: .claude/agents/wrap/learning-extractor.md 지침 + 세션 요약

4. followup-suggester
   - subagent_type: "general-purpose"
   - description: "미완성 작업 정리"
   - prompt: .claude/agents/wrap/followup-suggester.md 지침 + 세션 요약
```

### Step 2: Phase 2 - 중복 검증

Phase 1의 모든 결과를 수집한 후, duplicate-checker 에이전트를 실행합니다.

```
Task:
- subagent_type: "general-purpose"
- description: "중복 검증 및 정리"
- prompt: .claude/agents/wrap/duplicate-checker.md 지침 + Phase 1 결과 + 현재 CLAUDE.md 내용
```

### Step 3: Phase 3 - 결과 정리 및 사용자 선택

중복이 제거된 결과를 정리하여 사용자에게 보여주고 선택을 받습니다.

**결과 출력 형식**:

```markdown
## 세션 정리 결과

### CLAUDE.md 업데이트 제안 (N건)
- [섹션명] 내용 요약
- ...

### 자동화 기회 (N건)
- "패턴 설명" (N회 반복) → `/suggested-skill` 스킬 제안
- ...

### 배운 것 (N건)
- [발견/실수/인사이트] 내용
- ...

### 미완성 작업 (N건)
- [P0/P1/P2] 작업 설명
- ...
```

**AskUserQuestion으로 선택**:

```
AskUserQuestion:
- question: "어떤 작업을 수행할까요?"
- header: "Action"
- options:
  - label: "CLAUDE.md 업데이트 (Recommended)"
    description: "제안된 내용을 CLAUDE.md에 추가합니다"
  - label: "자동화 스킬 생성"
    description: "반복 패턴을 스킬로 만듭니다"
  - label: "커밋 생성" (--no-commit이면 제외)
    description: "현재 변경사항을 커밋합니다"
  - label: "아무것도 안 함"
    description: "결과만 확인하고 종료합니다"
- multiSelect: true
```

### Step 4: 선택된 작업 수행

사용자 선택에 따라 작업을 수행합니다.

**CLAUDE.md 업데이트 선택 시**:
1. 현재 CLAUDE.md 읽기
2. 적절한 섹션에 새 내용 추가
3. Edit tool로 파일 수정
4. 결과 확인

**자동화 스킬 생성 선택 시**:
1. 사용자에게 생성할 스킬 선택 받기 (여러 개인 경우)
2. 선택된 패턴에 대해 스킬 뼈대 생성
3. `.claude/skills/{skill-name}/SKILL.md` 생성
4. 필요시 에이전트 파일 생성

**커밋 생성 선택 시**:
1. `/commit` 스킬 호출과 동일한 워크플로우 수행
2. git status 확인
3. 커밋 메시지 생성
4. 사용자 확인 후 커밋

## 에러 처리

| 상황 | 처리 |
|------|------|
| CLAUDE.md 없음 | 새로 생성할지 사용자에게 확인 |
| 에이전트 실패 | 해당 섹션 스킵하고 경고 표시 |
| 제안 사항 없음 | "이번 세션에서 추가할 내용이 없습니다" 메시지 |
| 선택 취소 | 정상 종료 |

## 에이전트 파일

| 에이전트 | 파일 경로 |
|----------|----------|
| doc-updater | `.claude/agents/wrap/doc-updater.md` |
| automation-scout | `.claude/agents/wrap/automation-scout.md` |
| learning-extractor | `.claude/agents/wrap/learning-extractor.md` |
| followup-suggester | `.claude/agents/wrap/followup-suggester.md` |
| duplicate-checker | `.claude/agents/wrap/duplicate-checker.md` |

## 참고

- 원본: [session-wrap 플러그인](https://www.linkedin.com/feed/update/urn:li:activity:7415878861919379456/)
- 관련 스킬: `/commit`

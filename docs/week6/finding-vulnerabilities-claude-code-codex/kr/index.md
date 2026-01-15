---
title: "Claude Code와 OpenAI Codex를 활용한 최신 웹 앱 취약점 탐지"
originalTitle: "Finding Vulnerabilities in Modern Web Apps Using Claude Code and OpenAI Codex"
author: "Semgrep"
sourceUrl: "https://semgrep.dev/blog/2025/finding-vulnerabilities-in-modern-web-apps-using-claude-code-and-openai-codex/"
translatedAt: "2026-01-13"
status: "final"
qaScore:
  consistency: 9
  readability: 8
  accuracy: 9
  overall: 8
---

# Claude Code와 OpenAI Codex를 활용한 최신 웹 앱 취약점 탐지

[원본 링크](https://semgrep.dev/blog/2025/finding-vulnerabilities-in-modern-web-apps-using-claude-code-and-openai-codex/)

## TL;DR

Semgrep 보안 연구팀이 AI 코딩 에이전트의 실제 코드 취약점 발견 효과를 평가했습니다:

- **Claude Code**: 46개 취약점 식별 (참양성률(True Positive Rate, TPR) 14%, 거짓양성률(False Positive Rate, FPR) 86%)
- **OpenAI Codex**: 21개 취약점 보고 (TPR 18%, FPR 82%)
- 약 20개가 고심각도 이슈
- 취약점 유형에 따라 결과 차이가 큼
- 비결정성이 여전히 핵심 문제

## 서론

Semgrep 연구원들이 "LLM이 소스 코드에서 취약점을 찾는 데 실제로 얼마나 효과적인가?"라는 질문에 답하기 위해 체계적인 평가를 수행했습니다.

구체적이고 측정 가능한 질문들을 중심으로 조사를 진행했습니다:

- 취약점 유형별 거짓양성률과 거짓음성률은?
- 프로그래밍 언어, 프레임워크, 코드베이스 크기에 따른 결과 차이는?
- 거짓양성과 거짓음성의 원인은?
- 반복 실행 시 분석 결과의 결정성은?

인젝션 취약점에 대한 구체적 질문:

- LLM이 소스부터 싱크까지 사용자 입력을 추적할 수 있는가?
- 함수와 파일 간 데이터를 추적할 수 있는가?
- 새니타이제이션 함수와 보안 제어를 이해하는가?
- 서드파티 의존성을 추론할 수 있는가?

## 기존 SAST 벤치마크의 문제점: 현실성 부족

현재 연구는 실제 복잡성을 포착하지 못하는 벤치마크에 크게 의존합니다:

### 알려진 취약점이 있는 앱

이러한 벤치마크는 취약점이 이미 문서화된 오픈소스 애플리케이션을 사용합니다. 그러나 "현재 LLM들이 이러한 저장소의 코드와 인터넷의 많은 공개 문서를 학습 데이터로 이미 흡수했을 가능성이 높아" 오염 편향이 발생합니다.

문제 예시:
- 변수명과 주석이 취약점 위치를 암시함
- 도구 결과가 이미 저장소에 체크인되어 있을 수 있음
- 코드가 비현실적이고 과도하게 주석 처리된 경우가 많음

### 기존 벤치마크의 한계

**XBOW**가 검증 벤치마크를 제공하지만 한계가 있습니다: "코드가 너무 인위적이고 단순해서 실제 애플리케이션을 대표하지 못합니다." 이 벤치마크는 평균 98줄 미만 코드의 3개 파일로 구성된 45개 Python 테스트 케이스만 포함합니다.

Timothée Chauvin이 만든 **EyeballVul**은 실제 환경에서 사람이 검증한 취약점을 추출하지만 여전히 더 넓은 애플리케이션 컨텍스트와 분리되어 있습니다.

**SecVulEval과 CyberGym**은 주로 C와 C++에 초점을 맞춰서 Python, JavaScript 등 현대 웹 개발 적용성이 제한됩니다.

### Semgrep의 접근 방식

Semgrep의 방법론은 다음을 테스트한다는 점에서 다릅니다:

- 11개의 대규모, 활발히 유지되는 Python 기반 오픈소스 프로젝트
- 일반적인 웹 프레임워크: Django, Flask, FastAPI
- 분리된 예시가 아닌 대표적인 실제 애플리케이션
- 모델 학습 데이터에 포함되지 않았을 가능성이 높은 코드
- 개발자가 오늘날 실제로 만드는 애플리케이션

## 이 블로그 포스트의 범위

연구 범위:

- Anthropic Claude Code(v1.0.32, Sonnet 4)와 OpenAI Codex(v0.2.0, o4-mini) **각 1회 실행**
- 취약점 유형 간 재사용하는 단순하고 스크립트화된 프롬프트
- SARIF 형식 보안 이슈 보고
- **11개 대규모 실제 Python 프로젝트**
- 취약점 유형: 인증 우회, IDOR, 경로 탐색, SQL 인젝션, SSRF, XSS
- Anthropic의 `/security-review` 명령어 평가
- 3개 애플리케이션에서 각 3회 실행으로 비결정성 탐구

### 애플리케이션 규모

| App ID | 커밋 수 | 스타 수 | Python 파일 수 | Python LOC |
|--------|---------|---------|----------------|-----------|
| PY-APP-001 | >25k | 5k | >500 | 85k |
| PY-APP-002 | >5k | 6k | >500 | 60k |
| PY-APP-003 | >15k | 10k | >200 | 45k |
| PY-APP-004 | >5k | >100 | >500 | 95k |
| PY-APP-005 | >15k | 1k | >500 | 100k |
| PY-APP-006 | >25k | 2k | >1000 | 110k |
| PY-APP-007 | >5k | 20k | >1000 | 250k |
| PY-APP-008 | >1k | >100 | >200 | 40k |
| PY-APP-009 | 1k | 3k | >50 | 2k |
| PY-APP-010 | 15k | 5k | >200 | 45k |
| PY-APP-011 | >5k | >25k | >200 | 30k |
| **합계** | — | — | **7k 파일** | **>800k LOC** |

_애플리케이션 이름은 책임 있는 공개 절차 완료 전까지 비공개입니다._

## 실험: AI vs. 실제 앱 코드

연구원들이 11개 애플리케이션을 분석하고 445개 이상의 발견 사항을 수동 분류했으며, 가능한 경우 동적으로 검증했습니다.

### Anthropic Claude Code (v1.0.32, Sonnet 4)

| 취약점 유형 | 참양성 | 거짓양성 | 참양성률 |
|------------|--------|---------|---------|
| 인증 우회 | 6 | 52 | 10% (6/58) |
| **IDOR** | **13** | **46** | **22% (13/59)** |
| 경로 탐색 | 5 | 31 | 13% (5/36) |
| **SQL 인젝션** | **2** | **36** | **5% (2/38)** |
| SSRF | 8 | 57 | 12% (8/65) |
| **XSS** | **12** | **62** | **16% (12/74)** |

사용 명령어:

```bash
claude --verbose
       --print
       --output-format json
       --dangerously-skip-permissions
       <PROMPT>
```

### OpenAI Codex (v0.2.0, o4-mini/high reasoning)

| 취약점 유형 | 참양성 | 거짓양성 | 참양성률 |
|------------|--------|---------|---------|
| 인증 우회 | 5 | 32 | 13% (5/37) |
| **IDOR** | **0** | **5** | **0% (0/5)** |
| **경로 탐색** | **8** | **9** | **47% (8/17)** |
| SQL 인젝션 | 0 | 5 | 0% (0/5) |
| **SSRF** | **8** | **15** | **34% (8/23)** |
| XSS | 0 | 28 | 0% (0/28) |

사용 명령어:

```bash
codex --config disable_response_storage=true
      --config model_reasoning_effort=high
      --config model_reasoning_summary=detailed
      exec
      --model o4-mini
      --full-auto
      --skip-git-repo-check
      <PROMPT>
```

### 주요 발견 사항

- **두 AI 도구 모두 실제 취약점을 찾지만 노이즈가 높습니다.** Claude Code는 46개 취약점을 식별했고(TPR 14%, FPR 86%), Codex는 21개를 보고했습니다(TPR 18%, FPR 82%).

- **IDOR 탐지에서 신뢰할 수 있는 수정안을 제시했습니다.** Claude Code가 13개의 유효한 IDOR 버그를 찾고 기존 코드 패턴 기반으로 권한 검사를 제안했습니다. 그러나 대부분의 발견 사항은 수동 검증이 필요했습니다.

- **Claude Code는 잠재적 가드레일 도구로 활용할 수 있습니다.** 많은 거짓양성이 여전히 유효한 코드 강화 제안이었습니다(예: 이미 안전한 쿼리 파라미터화). 취약점은 아니지만 코드를 강화합니다. 일부 인스턴스는 특히 클라이언트 측 JavaScript DOM 조작에서 기능을 손상시켰습니다.

- **XSS와 SQL 인젝션이 의미적 한계를 드러냅니다.** 모델이 "서버 측 프레임워크에서 클라이언트 측 컴포넌트로의 데이터 추적에 어려움을 겪으며" 서버 측 새니타이제이션을 인식하지 못합니다.

- **동일한 프롬프트 반복으로 다른 결과가 나왔습니다.** 확률적 특성 때문에 동일한 프롬프트가 새로운 발견을 생성하여 일관성 문제를 부각시켰습니다.

- **OpenAI Codex가 유효하지 않은 SARIF를 생성했습니다.** 9개 보고서가 유효한 SARIF/JSON이 아니었습니다. Claude Code는 이런 문제가 없었습니다.

## 같은 코드, 같은 AI, 매번 다른 버그: 비결정성 문제

3개 애플리케이션에서 동일한 코드에 동일한 프롬프트로 3회 테스트한 결과 상당한 변동성이 나타났습니다:

### 예시

**PY-APP-007**: 실행마다 완전히 다른 발견 사항이 나왔습니다.
- 1회차: 다른 실행에서는 없는 "검색 권한 누락" 취약점 식별
- 2회차: 1회차와 다른 고유한 이슈 표시
- 3회차: 또 다른 취약점 발견, 최소한의 중복

**PY-APP-006**: 유사한 패턴—첫 번째 실행에서 사용자 API 취약점 발견, 후속 실행은 이벤트 초록과 노트 모듈에 집중.

**PY-APP-002**: 가장 두드러진 변동성—발견 사항이 1회차 3개에서 2회차 6개, 3회차 11개로 증가했으며 부분적 중복만 있었습니다.

### 근본 원인

연구원들은 이를 다음 요인으로 봅니다:

1. **컨텍스트 부패(Context rot)**: 자체 컨텍스트에서 정확하게 검색하기 어려움
2. **손실 압축(컴팩션)**: 요약 과정에서 함수명, 경로, 추론 세부 사항 손실

"긴 복잡한 소설을 요약하는 것과 비슷합니다. 주요 줄거리는 포착하겠지만 일부 미묘한 뉘앙스는 놓치기 마련입니다."

구체적 예: PY-APP-006에서 제안된 수정안이 불완전했는데, AI가 "사용자 인증용 기존 베이스 클래스를 재사용하지 못했기 때문입니다—해당 실행에서 중요한 컨텍스트를 잃은 것으로 보입니다."

### 함의

- **불완전한 커버리지**: 단일 실행은 거짓 안도감을 줍니다. 후속 실행에서 잡힌 중요한 취약점을 놓칠 수 있습니다
- **재현성 부족**: 발견 사항 검증과 일관된 출력 신뢰가 어렵습니다
- **비용 증가**: 포괄적인 커버리지에 여러 번의 감사가 필요합니다. "이 경우 코드베이스를 읽고 추론하는 데 스캔당 수십에서 수백 달러의 토큰 비용이 발생할 수 있습니다"

## Claude Code의 새로운 `/security-review` 명령어는 얼마나 효과적인가?

PR 보안 검토용 Anthropic의 새 `/security-review` 명령어는 테스트에서 기대에 미치지 못했습니다. "전체 코드베이스에 이 명령어를 실행했을 때 식별된 보안 이슈가 상당히 제한적이었습니다."

PY-APP-003, PY-APP-002, PY-APP-008 테스트 결과 "모든 앱 통틀어 XSS 하나만" 발견되었으며, 특정 취약점 유형별로 개별 프롬프트했을 때보다 훨씬 적었습니다.

## 질문에 대한 답변

### FP/FN 비율

거짓양성률은 53%(경로 탐색, Codex)에서 95%(SQL 인젝션, Claude Code)까지 다양했습니다. 애플리케이션별 성능 차이가 컸습니다: "PY-APP-002(Claude Code)에서 100%(10/10) 실제 IDOR부터 PY-APP-007에서 0%(0/7)까지."

전체적으로: Claude Code가 46개 취약점을 찾았고(TPR 14%, FPR 86%), Codex는 21개를 보고했습니다(TPR 18%, FPR 82%).

거짓음성은 실제 애플리케이션으로 정확히 측정할 수 없었습니다.

### 왜 실패하는가

"관찰한 주요 약점은 인젝션 이슈에 대한 코드 실행의 깊은 의미적 이해 부족입니다. 모델이 함수 간 오염 추적(inter-procedural taint flow)과 암시적 흐름(implicit flows)에 어려움을 겪는데, 이는 전통적인 SAST 엔진이 주로 구축되는 부분입니다."

컨텍스트 압축과 컨텍스트 부패도 기여했습니다.

### 스캐폴딩과 에이전틱 워크플로우

이것들은 "중요할 뿐만 아니라 필수가 되고 있습니다. AI 보안 검토의 미래는 단일 모놀리식 모델이 아니라 도구를 사용하고, 증거에 대해 추론하며, 협력하는 AI 에이전트 시스템입니다."

연구원들이 "복잡한 프로세스를 진행하고 보안 이슈를 보고하는 과정에서 교육적 결정을 내리는 시스템 능력에서 큰 차이"를 관찰했습니다.

### 비용 분석

"Claude Code의 전체 비용은 $114였습니다"—모든 애플리케이션의 모든 취약점에 대해(비결정성 실행과 `/security-review` 테스트 제외).

Claude Code와 Codex 간 비용 추적은 균일하지 않았습니다.

## 데이터셋: 향후 공개

연구원들이 데이터셋과 애플리케이션 이름을 공개하기 전에 애플리케이션 개발자들과 책임 있는 공개를 진행 중입니다. 취약점이 수정되고 검증되면 전체 세부 사항을 공개할 예정입니다.

## 결론

"LLM은 내일 당장 인간 보안 엔지니어를 대체할 만병통치약이 아닙니다. 실제로 종단 간 고심각도 인젝션 스타일 취약점을 찾는 데는 상당히 약합니다."

그러나 여전히 강력한 도구입니다. LLM의 강점(문맥적 추론)과 약점(깊은 코드 의미론 이해 부족)을 이해하면 "고급 정적 분석 엔진으로 정교한 에이전틱 시스템을 구축"하여 "이전 어떤 것보다 훨씬 강력한 차세대 보안 도구"를 만들 수 있습니다.

---

## 부록: 예시 프롬프트 템플릿

```
BATCH_PROMPT_TEMPLATE = """
I am a core developer of this app. It's been reported to me that
there are several {vuln_type} vulnerabilities in the code base. I need
your expertise to find all of them!

# Instructions
- Find all {vuln_type} vulnerabilities in my code, don't worry about
  third-party code.
- Explain why they are real security vulnerabilities I should care about; give
  code snippets from the code to support your analysis (trace from entry points);
  maybe some clue on how to trigger the issue for testing.
- Report all {vuln_type} vulnerabilities using the SARIF JSON format that you will
  write within the <SARIF_OUTPUT>...</SARIF_OUTPUT> tag; make sure it's valid JSON.
- Fix these security issues in the code.

Don't ask for confirmation, just do it.
"""
```

---

## 핵심 요약

- Semgrep이 Claude Code와 OpenAI Codex의 실제 취약점 탐지 능력을 11개 대규모 Python 프로젝트에서 체계적으로 평가
- Claude Code는 46개(TPR 14%), Codex는 21개(TPR 18%) 취약점 발견
- IDOR, SSRF, 경로 탐색에서 상대적으로 양호한 성능, SQL 인젝션과 XSS에서 저조
- 비결정성이 주요 문제: 같은 코드, 같은 프롬프트로도 실행마다 다른 결과
- LLM은 보안 도구를 대체하기보다 보완하는 역할로, 에이전틱 시스템과 결합 시 강력

# SuperClaude: Claude Code 향상 프레임워크

> **원본**: [SuperClaude-Org/SuperClaude_Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework)
> **스타**: 20k | **포크**: 1.7k

## 개요

SuperClaude는 Claude Code를 **구조화된 개발 플랫폼**으로 변환하는 메타 프로그래밍 프레임워크입니다. 30개의 슬래시 명령어, 16개의 전문 에이전트, 8개의 MCP 서버 통합을 제공하여 개발 워크플로우 전체를 체계화합니다.

### 핵심 수치

| 구성 요소 | 개수 |
|----------|------|
| 슬래시 명령어 | 30개 |
| 전문 에이전트 | 16개 |
| 행동 모드 | 7개 |
| MCP 서버 통합 | 8개 |

> **참고**: 이 프로젝트는 Anthropic과 제휴하거나 보증받지 않습니다.

---

## 설치

### pipx로 설치 (권장)

```bash
# 설치
pipx install superclaude

# 초기화 (30개 명령어 설치)
superclaude install

# MCP 서버 목록 확인
superclaude mcp --list
```

### 현재 안정 버전

- **v4.1.9** (안정)
- TypeScript 플러그인 시스템 v5.0 개발 중

---

## 30개 슬래시 명령어

### 기획/설계

| 명령어 | 설명 |
|--------|------|
| `/plan` | 프로젝트 계획 수립 |
| `/design` | 아키텍처 설계 |
| `/analyze` | 코드베이스 분석 |

### 개발

| 명령어 | 설명 |
|--------|------|
| `/build` | 기능 구현 |
| `/refactor` | 코드 리팩토링 |
| `/debug` | 버그 디버깅 |

### 테스트/품질

| 명령어 | 설명 |
|--------|------|
| `/test` | 테스트 작성 및 실행 |
| `/review` | 코드 리뷰 |
| `/security` | 보안 점검 |

### 문서화

| 명령어 | 설명 |
|--------|------|
| `/doc` | 문서 생성 |
| `/api-doc` | API 명세 작성 |

### 버전 관리

| 명령어 | 설명 |
|--------|------|
| `/commit` | 커밋 메시지 생성 |
| `/pr` | PR 생성 |

### 유틸리티

| 명령어 | 설명 |
|--------|------|
| `/magic` | v0 스타일 UI 코드 즉시 생성 |
| `/research` | 딥 리서치 실행 |

---

## 16개 전문 에이전트

### 관리 에이전트

| 에이전트 | 역할 |
|---------|------|
| **PM Agent** | 프로젝트 관리, 일정 조율 |
| **Deep Research** | 심층 조사, 다중 검색 |

### 기술 에이전트

| 에이전트 | 역할 |
|---------|------|
| **Security Engineer** | 보안 취약점 분석 |
| **Frontend Architect** | UI/UX 아키텍처 설계 |
| **Backend Architect** | 서버 아키텍처 설계 |
| **DevOps Engineer** | CI/CD, 인프라 관리 |

에이전트들은 컨텍스트 기반으로 **자동 조율**됩니다.

---

## 7가지 행동 모드

| 모드 | 설명 | 사용 시점 |
|------|------|----------|
| **Brainstorming** | 아이디어 발산, 창의적 탐색 | 초기 기획 |
| **Business Panel** | 비즈니스 관점 분석 | 의사결정 |
| **Deep Research** | 심층 조사, 다중 검색 | 기술 조사 |
| **Orchestration** | 여러 에이전트 조율 | 복잡한 작업 |
| **Token-Efficiency** | 토큰 최적화 모드 | 비용 절감 |
| **Task Management** | 작업 추적 및 관리 | 프로젝트 관리 |
| **Introspection** | 자기 분석, 개선점 도출 | 회고 |

---

## 8개 MCP 서버 통합

| 서버 | 기능 |
|------|------|
| **Tavily** | 웹 검색 |
| **Context7** | 문서 컨텍스트 관리 |
| **Sequential-Thinking** | 단계적 추론 |
| **Serena** | 세션 간 메모리 유지 |
| **Playwright** | 브라우저 자동화 |
| **Magic** | UI 컴포넌트 생성 |
| **Morphllm-Fast-Apply** | 빠른 코드 적용 |
| **Chrome DevTools** | 브라우저 디버깅 |

---

## 딥 리서치 기능

v4.2에서 도입된 자율 웹 리서치 시스템:

### 특징

- **적응형 계획**: 3가지 전략 중 자동 선택
- **다중 홉 추론**: 최대 5회 연속 검색
- **품질 점수**: 0.0-1.0 스케일로 결과 평가
- **케이스 기반 학습**: 세션 간 학습 유지

### 사용 예시

```
/research "React 19의 새로운 기능과 마이그레이션 가이드"
```

---

## 문서 구조

SuperClaude는 표준화된 문서 템플릿을 제공:

| 파일 | 용도 |
|------|------|
| `PLANNING.md` | 아키텍처, 설계 원칙 |
| `TASK.md` | 현재 우선순위, 백로그 |
| `KNOWLEDGE.md` | 베스트 프랙티스, 트러블슈팅 |
| `CONTRIBUTING.md` | 기여 가이드라인 |

---

## 사용 사례

### 1. 신규 프로젝트 시작

```bash
superclaude install
/plan "이커머스 플랫폼 MVP"
/design
/build
```

### 2. 기존 코드베이스 분석

```bash
/analyze
/research "성능 병목점 분석"
/refactor
```

### 3. 보안 점검

```bash
/security
# Security Engineer 에이전트가 자동 실행
```

---

## 고려사항

### 장점

- **통합 워크플로우**: 기획부터 배포까지 일관된 환경
- **MCP 통합**: 8개 서버로 기능 확장
- **딥 리서치**: 자율 웹 조사 기능
- **문서 표준화**: 일관된 프로젝트 문서 구조

### 단점

- **학습 곡선**: 30개 명령어 및 7가지 모드 숙지 필요
- **Python 의존성**: pipx 설치 필요
- **MCP 설정**: 서버별 추가 설정 필요할 수 있음

### 적합한 사용자

- Claude Code를 주력으로 사용하는 개발자
- 체계적인 워크플로우를 원하는 솔로 개발자
- MCP 서버 통합이 필요한 프로젝트

---

## 관련 자료

- [GitHub 저장소](https://github.com/SuperClaude-Org/SuperClaude_Framework)
- [공식 문서](https://superclaude.netlify.app/)
- [한국어 사용법 가이드](https://rokrokss.com/post/2025/07/29/슈퍼클로드-superclaude-사용법.html)
- [Medium 튜토리얼](https://medium.com/@datasciencedisciple/take-your-claude-code-workflow-to-another-level-with-superclaude-7ff2832ae607)
- [ClaudeLog 가이드](https://claudelog.com/claude-code-mcps/super-claude/)

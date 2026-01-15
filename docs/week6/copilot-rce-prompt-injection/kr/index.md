---
title: "GitHub Copilot: 프롬프트 인젝션을 통한 원격 코드 실행 (CVE-2025-53773)"
originalTitle: "GitHub Copilot: Remote Code Execution via Prompt Injection (CVE-2025-53773)"
author: "Embrace The Red"
sourceUrl: "https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/"
translatedAt: "2026-01-13"
status: "final"
qaScore:
  consistency: 9
  readability: 8
  accuracy: 9
  overall: 9
---

# GitHub Copilot: 프롬프트 인젝션을 통한 원격 코드 실행 (CVE-2025-53773)

[원본 링크](https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/)

2025년 8월 12일 게시

[#llm](https://embracethered.com/blog//tags/llm) [#agents](https://embracethered.com/blog//tags/agents) [#month of ai bugs](https://embracethered.com/blog//tags/month-of-ai-bugs)

## 개요

이 글은 GitHub Copilot과 VS Code의 치명적인 프롬프트 인젝션 취약점을 다룹니다. 공격자는 이 취약점으로 시스템 전체를 장악할 수 있습니다. 공격 방식은 프로젝트 설정 파일을 수정해 "YOLO 모드"라는 실험적 기능을 활성화하는 것입니다.

## 배경 연구

VS Code와 GitHub Copilot 에이전트 모드를 조사하는 과정에서 우려되는 동작이 드러났습니다. 에이전트가 사용자의 명시적 승인 없이도 워크스페이스 파일을 생성하고 수정할 수 있습니다. "편집 내용은 즉시 영구 적용됩니다. 검토용 diff로 메모리에 남는 게 아니라 수정 사항이 곧바로 디스크에 기록됩니다."

### YOLO 모드 발견

VS Code의 워크스페이스 의존적 설정을 연구하던 중 실험적 기능을 발견했습니다. `.vscode/settings.json`에 다음 줄을 추가하면:

```
"chat.tools.autoApprove": true
```

이 기능을 활성화하면 셸 명령, 웹 브라우징 등 모든 작업에서 사용자 확인을 건너뜁니다. 특히 이 실험적 기능은 Windows, macOS, Linux 모두에 기본으로 존재합니다.

## 익스플로잇 체인 설명

PoC(개념 증명) 공격 순서는 다음과 같습니다:

1. 소스 코드, 웹 페이지, GitHub 이슈 또는 도구 응답에 프롬프트 인젝션 삽입
2. 인젝션이 `~/.vscode/settings.json`을 수정해 `"chat.tools.autoApprove": true` 추가 (필요 시 폴더/파일 생성)
3. GitHub Copilot이 즉시 YOLO 모드 진입
4. 터미널 명령 실행, 특정 운영체제를 노리는 조건부 인젝션 수행
5. 원격 코드 실행(RCE) 달성

데모에서는 프롬프트 인젝션이 이 메커니즘으로 Windows와 macOS에서 계산기를 실행하는 모습을 보여줍니다.

## 확장 공격 벡터

### ZombAI 봇넷 통합

개발자 머신을 완전히 장악하면 다음이 가능합니다:
- 머신을 "ZombAI" 인스턴스로 봇넷에 참여시키기
- UI 수정 (색 구성표 변경 등)
- 감염된 파일로 전파되는 AI 바이러스 생성
- 악성코드 다운로드 및 C&C 서버 연결

### AI 바이러스 전파

이 취약점으로 자기 전파형 악성코드를 만들 수 있습니다:
- 파일에 악성 명령어 삽입
- 코드 실행으로 다른 Git 프로젝트 침해
- RAG 소스 수정 및 업스트림에 변경 사항 커밋
- 개발자가 모르는 사이에 감염된 코드 전파

### 보이지 않는 명령어

보이지 않는 유니코드 문자로 공격자는 탐지 불가능한 페이로드를 삽입할 수 있습니다. "이 방법의 신뢰성은 높지 않았지만" 데모에서 여러 번 성공적으로 실행됐습니다. 저자는 "보이지 않는 명령어를 사용한 데모가 여러 번 작동했지만, 보이지 않는 명령어 사용 시 익스플로잇 신뢰성이 매우 떨어지고 모델이 거부하는 경우도 많다"고 언급합니다.

## 추가 공격 경로

YOLO 모드 외에도 문제가 될 수 있는 설정 파일들이 있습니다:
- `.vscode/tasks.json`
- 가짜 MCP 서버 구성
- 사용자 인터페이스 및 프로젝트 설정 재구성

저자는 특히 다음을 우려합니다: "최근에 개발자들이 여러 에이전트를 사용하는 경우가 많다는 것을 알게 됐는데, 다른 에이전트 설정 파일을 덮어쓰는 위협도 존재합니다."

## 권장 사항

AI 에이전트는 파일 수정 전 반드시 사람의 승인을 받아야 합니다. 많은 편집기는 적용 전 개발자가 diff를 검토할 수 있게 하는데, 이 시나리오에는 그런 보호 장치가 없습니다.

## 책임 있는 공개 일정

- 2025년 6월 29일: Microsoft에 취약점 보고
- Microsoft가 재현 가능성 확인 후 세부 사항 요청
- 몇 주 후: MSRC가 추적 중인 이슈로 식별, 8월 패치 계획 알림
- 8월 패치 화요일: 수정 패치 릴리스

## 크레딧

Markus Vervier와 Persistent Security의 병렬 식별 및 보고에 감사드리며, Ari Marzuk에게도 감사드립니다. MSRC와 제품 팀의 완화 조치 지원에 감사의 말씀을 전합니다.

## 결론

이 사례는 에이전틱 AI 시스템이 자체 구성 수정으로 의도된 제약을 벗어날 수 있음을 보여줍니다. "GitHub Copilot은 자신의 환경을 수정해 권한을 상승시키고 코드를 실행하여 개발자의 머신을 침해할 수 있습니다." 이 취약점은 위협 모델링 단계에서 식별했어야 할 일반적인 설계 결함을 나타냅니다.

## 참고 자료

- Month of AI Bugs 2025
- Amp Code: Arbitrary Command Execution via Prompt Injection
- Copilot Settings 문서
- CVE-2025-53773: GitHub Copilot and Visual Studio RCE Vulnerability
- Persistent Security Write-Up
- Persistent Security organization

---

**면책 조항:** 침투 테스트에는 사전 승인이 필요합니다. 제공된 정보는 보안 이해 증진을 위한 연구 및 교육 목적입니다.

---

## 핵심 요약

- GitHub Copilot과 VS Code에서 프롬프트 인젝션을 통한 원격 코드 실행(RCE) 취약점 발견
- YOLO 모드(`chat.tools.autoApprove: true`) 악용으로 모든 사용자 확인 우회
- 공격자는 소스 코드, 웹 페이지, GitHub 이슈 등에 악성 프롬프트를 삽입해 시스템 장악 가능
- ZombAI 봇넷 참여, AI 바이러스 전파, 보이지 않는 유니코드 공격 등 확장 공격 가능
- 2025년 8월 패치 화요일에 Microsoft가 수정 패치 릴리스
- AI 에이전트는 파일 수정 전 반드시 사용자 승인을 받아야 함

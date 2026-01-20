---
title: "규칙으로 코딩 선호도 설정하기"
originalTitle: "Set Coding Preferences with Rules"
category: "rules"
sourceUrl: "https://youtu.be/zWvRB2zWr-4"
translatedAt: "2026-01-20"
status: "draft"
---

# 규칙으로 코딩 선호도 설정하기

[영상 바로가기](https://youtu.be/zWvRB2zWr-4)

## 핵심 요약

- Warp의 규칙 기능을 사용하여 AI 에이전트의 도구 선호도를 설정할 수 있음
- 패키지 매니저 선호도 설정 예시: npm 대신 PNPM 사용
- Python 환경 설정 예시: Miniconda를 기본값으로 지정
- 데스크톱 앱 개발 환경 설정 예시: Tauri CLI 우선 사용
- 프로젝트별 환경 도구를 명시하면 AI가 일관된 개발 환경을 유지함

---

## 전체 번역

환경 선호도를 규칙에 추가하세요. 예를 들어, Claude 같은 에이전트를 사용할 때 기본적으로 npm을 사용하는 경향이 있지만, 저는 워크스페이스를 포함한 대규모 웹 프로젝트를 관리할 때 PNPM을 선호합니다. 그래서 규칙을 설정하고 PNPM을 사용하거나 현재 프로젝트에서 사용 중인 것을 기본값으로 사용하도록 선호도를 설명했습니다. 이렇게 하면 의존성을 업데이트할 때 pnpm을 먼저 사용해야 한다는 것을 알 수 있습니다.

또한 Python 환경을 업데이트하여 항상 Miniconda를 사용하도록 할 수 있습니다. 또는 Tauri CLI로 데스크톱 앱을 빌드하는 경우 해당 매니저를 기본값으로 설정할 수도 있습니다.

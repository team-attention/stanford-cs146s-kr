---
title: "Sentry MCP 서버 사용하기"
titleKr: "Sentry MCP 서버 사용하기"
category: "using-mcp"
sourceUrl: "https://youtu.be/mOzC0RyP9YA"
translatedAt: "2026-01-20"
status: "draft"
---
# Sentry MCP 서버 사용하기

[영상 바로가기](https://youtu.be/mOzC0RyP9YA)

## 전체 자막

Sentry MCP 서버를 사용하면 에이전트가 Sentry에서 실시간 오류 데이터를 가져올 수 있습니다. 이 예시에서는 Sentry의 공식 데모 프로젝트인 Empower Plant 리포지토리를 사용하고 있습니다. 이것은 React 프론트엔드와 여러 백엔드 옵션을 갖춘 가상의 이커머스 식물 스토어로, 테스트를 위해 실제 버그가 포함되어 있습니다. 설정하려면 Sentry JSON 설정을 Warp의 MCP 패널에 붙여넣고 저장을 클릭하면 됩니다. 앱을 로컬에서 실행한 다음 웹사이트를 방문하면 몇 가지 오류가 발생합니다. Sentry 대시보드로 이동하여 수정하고 싶은 타입 오류를 클릭하고 이 이슈의 링크를 복사합니다.

그런 다음 Warp에게 Sentry 오류를 진단하고 코드에서 어디서 발생했는지 보여주고 수정 사항을 만들어달라고 프롬프트를 입력합니다. Sentry MCP 서버는 get issue details를 호출하여 Sentry에서 스택 트레이스를 가져오고, Warp는 제 코드베이스를 스캔합니다. 실제로 문제를 찾아내는데, 이것은 기본적으로 배열에 대해 toUpperCase 함수를 호출한 것이었고, 심지어 이를 수정하기 위한 간단한 코드 변경까지 생성합니다. Sentry MCP 서버가 없었다면 AI는 이러한 인증된 오류 세부 정보에 접근할 수 없었을 것이며, 이는 더 적은 컨텍스트와 더 약한 수정 사항을 의미했을 것입니다. 이를 통해 한 번에 정확한 진단과 작동하는 패치를 얻을 수 있습니다.

---

## 핵심 요약

- Sentry MCP 서버는 에이전트가 Sentry에서 실시간 오류 데이터를 가져올 수 있게 함
- Warp의 MCP 패널에 Sentry JSON 설정을 추가하여 간단히 설정
- AI가 인증된 오류 세부 정보(스택 트레이스)에 접근하여 더 정확한 진단과 수정 가능
- 예시: 배열에 toUpperCase 호출 오류를 자동으로 찾아내고 수정 사항 생성
- MCP 없이는 AI가 충분한 컨텍스트 없이 약한 수정 사항만 제공

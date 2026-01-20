---
title: "Puppeteer MCP 서버 사용하기"
originalTitle: "Using Puppeteer MCP Server"
sourceUrl: "https://youtu.be/cYpENRzmpBU"
translatedAt: "2026-01-20"
status: "draft"
---

# Puppeteer MCP 서버 사용하기

[영상 바로가기](https://youtu.be/cYpENRzmpBU)

## 핵심 요약

- **Puppeteer MCP 서버**: 브라우저 자동화를 위한 MCP 서버
- **주요 기능**: navigate, fill, screenshot, evaluate 등의 엔드포인트 제공
- **음성 입력**: Warp의 Whisper 기반 음성-텍스트 변환 기능 활용
- **자율 워크플로우**: Amazon 접속 → 검색 → 결과 스크래핑 → 제품 리뷰 분석 → 추천까지 완전 자동화
- **활용 사례**: 제품 조사, 경쟁사 분석, 반복적인 웹 스크래핑 작업

---

## 전체 번역

Puppeteer MCP 서버는 브라우저에서 무엇이든 자동화하는 데 뛰어납니다. 설정 방법은 다음과 같습니다. Warp의 명령 팔레트를 열고 MCP를 입력한 다음 MCP 패널을 엽니다. "추가"를 클릭하고 Puppeteer용 JSON 구성을 붙여넣습니다. 저장을 누르면 Puppeteer navigate, fill, screenshot, evaluate 같은 엔드포인트들이 보입니다. 이번 데모에서는 Warp의 음성 입력 기능도 선보이겠습니다. 마이크 아이콘을 클릭하고 프롬프트를 말할 수 있습니다. "Amazon에 접속해서 white t-shirt woman을 검색하고, 결과를 스크래핑해줘. 제목, 가격, 링크를 가져오고, 각 제품 링크를 열어서 제품 리뷰를 요약해줘. 그리고 가격과 리뷰 품질을 종합해서 어떤 셔츠를 사야 할지 추천해줘." Warp는 Whisper를 사용해 방금 제가 말한 내용을 텍스트로 변환합니다. 프롬프트를 실행하면 Puppeteer가 작동을 시작합니다. Amazon으로 이동하고, 검색창을 찾아서 입력하고, 스크린샷과 JavaScript 선택자를 사용해 제품 데이터를 캡처합니다. 그런 다음 각 제품을 클릭해서 리뷰 내용을 스크래핑합니다. 화면에서 Amazon과 Warp를 나란히 열어둔 모습을 보실 수 있습니다. 저는 아무것도 건드리지 않습니다. Puppeteer가 이 전체 워크플로우를 자율적으로 수행하고 있습니다.

마지막에는 흰색 셔츠의 순위 목록을 제공하고 cozy t-shirt를 추천합니다. 가격은 8달러, 4.5점 평점이며, 고객 리뷰에 따르면 착용감이 좋고 부드러운 원단이라고 합니다. Puppeteer MCP는 제품 조사, 경쟁사 분석 또는 수동으로 하고 싶지 않은 반복적인 웹 스크래핑에 완벽합니다.

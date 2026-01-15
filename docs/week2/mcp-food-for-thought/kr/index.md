---
title: "API는 좋은 MCP 도구가 되기 어렵다"
originalTitle: "APIs don't make good MCP tools"
author: "Reilly Wood"
sourceUrl: "https://www.reillywood.com/blog/apis-dont-make-good-mcp-tools/"
translatedAt: "2026-01-12"
status: "final"
---

[Model Context Protocol](https://modelcontextprotocol.io/overview)(MCP)은 요즘 상당히 중요한 화두다. MCP는 LLM에게 다른 사람이 만든 도구에 대한 접근 권한을 부여하는 사실상의 표준이 되었고, 이를 통해 LLM은 [에이전트](https://simonwillison.net/2025/May/22/tools-in-a-loop/)가 된다. 하지만 새로운 MCP 서버용 도구를 작성하는 것은 어렵기 때문에, 사람들은 종종 [기존 API를 MCP 도구로 자동 변환](https://blog.christianposta.com/semantics-matter-exposing-openapi-as-mcp-tools/)하자고 제안한다. 보통 OpenAPI 메타데이터를 활용해서 말이다([1](https://jedisct1.github.io/openapi-mcp/), [2](https://www.gravitee.io/blog/turn-any-rest-api-into-mcp-server-inside-gravitee)).

내 경험상, 이 방식은 작동하긴 하지만 *잘* 작동하지는 않는다. 그 이유를 몇 가지 설명하겠다.

## 에이전트는 도구가 많으면 힘들어한다

잘 알려진 사실이지만, [VS Code는 128개의 도구 제한](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode)이 있다. 그리고 [많은 모델은 그 숫자에 도달하기 훨씬 전부터 정확한 도구 호출에 어려움을 겪는다](https://arxiv.org/abs/2411.15399). 게다가 각 도구와 그 설명은 귀중한 컨텍스트 윈도우 공간을 차지한다.

대부분의 웹 API는 이런 제약을 염두에 두고 설계되지 않았다! 코드에서 호출할 때는 단일 제품 영역에 수많은 API가 있어도 괜찮지만, 그 API들이 각각 MCP 도구로 매핑되면 결과가 좋지 않을 수 있다.

처음부터 MCP용으로 설계된 도구는 일반적으로 [개별 웹 API보다 훨씬 유연하며](https://engineering.block.xyz/blog/blocks-playbook-for-designing-mcp-servers), 하나의 도구가 여러 개별 API의 역할을 수행할 수 있다.

## API는 컨텍스트 윈도우를 빠르게 소진시킨다

한 번에 100개의 레코드를 반환하는 API를 상상해 보자. 각 레코드가 매우 넓다면(예: 50개 필드) 그 결과를 그대로 에이전트에게 보내면 많은 토큰을 소비한다. 쿼리가 몇 개의 필드만으로 충족될 수 있더라도, 모든 필드가 컨텍스트 윈도우에 들어가게 된다.

API는 일반적으로 레코드 수로 페이지네이션되지만, 레코드의 크기는 *크게* 다를 수 있다. 한 레코드는 100,000 [토큰](https://learn.microsoft.com/en-us/dotnet/ai/conceptual/understanding-tokens)을 차지하는 큰 텍스트 필드를 포함할 수 있고, 다른 레코드는 10토큰일 수도 있다. 이런 API 결과를 에이전트의 컨텍스트 윈도우에 직접 넣는 것은 도박이다. 어떨 때는 작동하고, 어떨 때는 터져버린다.

데이터 형식도 문제가 될 수 있다. 요즘 대부분의 웹 API는 JSON을 반환하지만, JSON은 토큰 효율이 매우 낮은 형식이다. 이것을 보자:

```json
[
  {
    "firstName": "Alice",
    "lastName": "Johnson",
    "age": 28
  },
  {
    "firstName": "Bob",
    "lastName": "Smith",
    "age": 35
  }
]
```

같은 데이터를 CSV 형식으로 표현하면:

```csv
firstName,lastName,age
Alice,Johnson,28
Bob,Smith,35
```

CSV 데이터가 *훨씬* 간결하다. 레코드당 토큰을 절반으로 줄일 수 있다. [일반적으로 CSV, TSV, 또는 YAML(중첩 데이터용)이 JSON보다 나은 선택이다](https://david-gilbertson.medium.com/llm-output-formats-why-json-costs-more-than-tsv-ebaf590bd541).

이런 문제들은 극복할 수 없는 것이 아니다. 에이전트가 필드를 [프로젝션](https://en.wikipedia.org/wiki/Projection_(relational_algebra))할 수 있도록 도구 인자를 자동으로 추가하고, 큰 결과를 자동으로 잘라내거나 요약하고, JSON 결과를 CSV(또는 중첩 데이터의 경우 YAML)로 자동 변환하는 것을 상상해 볼 수 있다. 하지만 내가 본 대부분의 서버는 이런 것들을 전혀 하지 않는다.

## API는 에이전트의 고유한 능력을 활용하지 못한다

API는 코드에서 처리하기 위한 구조화된 데이터를 반환한다. 에이전트가 도구 호출에서 원하는 것도 종종 그것이다... 하지만 에이전트는 더 자유로운 형태의 지시도 처리할 수 있다.

예를 들어 `ask_question` 도구는 특정 문서에 대해 RAG 쿼리를 수행한 다음, 다음 도구 호출에 활용될 정보를 일반 텍스트로 반환할 수 있다. 구조화된 데이터를 완전히 건너뛰는 것이다.

또는 `search_cities` 도구 호출이 도시들의 구조화된 목록 *그리고* 다음에 무엇을 호출할지에 대한 제안을 함께 반환할 수 있다:

```csv
city_name,population,country,region
Tokyo,37194000,Japan,Asia
Delhi,32941000,India,Asia
Shanghai,28517000,China,Asia

Suggestion: To get more specific information (weather, attractions, demographics), try calling get_city_details with the city_name parameter.
```

이런 종류의 레이어링과 도구 체이닝은 MCP 서버에서 [매우 효과적일 수 있으며](https://engineering.block.xyz/blog/build-mcp-tools-like-ogres-with-layers), API를 도구로 자동 변환하면 완전히 놓치게 되는 부분이다.

## 에이전트가 API를 호출해야 한다면, 그냥 직접 하면 된다

Claude Code 같은 에이전트는 요즘 코드를 작성하고 실행하는 데 놀라울 정도로 뛰어나다. 웹 API를 호출하는 스크립트도 마찬가지다. 어떤 사람들은 이것을 [MCP가 전혀 필요 없다는 주장](https://lucumr.pocoo.org/2025/7/3/tools/)까지 밀고 나간다!

나는 그 결론에 동의하지 않지만, 미래를 내다보고 대비해야 한다고 생각한다. [에이전트의 샌드박싱은 빠르게 개선되고 있고](https://github.com/openai/codex), 에이전트가 API를 직접 호출하는 것이 쉽고 안전하다면 중개자를 없애고 그렇게 하는 것이 나을 수 있다.

## 결론

에이전트는 API의 일반적인 소비자들과 근본적으로 다르다. 기존 API에서 MCP 도구를 자동으로 생성하는 것은 가능하지만, 그렇게 하면 *잘* 작동할 가능성은 낮다. 에이전트는 자신의 고유한 능력과 한계에 맞게 설계된 도구가 주어질 때 가장 잘 작동한다.

---

## 핵심 요약

- MCP는 LLM에게 도구 접근 권한을 부여하는 사실상의 표준이 되었지만, 기존 API를 MCP 도구로 자동 변환하는 것은 잘 작동하지 않는다
- 에이전트는 많은 수의 도구를 잘 다루지 못하고, 각 도구는 컨텍스트 윈도우 공간을 차지한다
- API 응답의 크기와 JSON 형식은 토큰 효율성 면에서 문제가 있다. CSV나 YAML이 더 효율적이다
- API는 에이전트의 고유한 능력(자유 형식 텍스트 처리, 도구 체이닝 등)을 활용하지 못한다
- 에이전트가 직접 API를 호출할 수 있으므로, MCP 도구가 항상 필요한 것은 아니다
- 에이전트는 API의 일반적인 소비자와 다르므로, 에이전트에 맞게 설계된 도구가 필요하다

<!--
## Refiner 변경 사항 (3차 - 최종)

### 1차 교정
- 번역투 검토: 기존 번역이 전반적으로 양호함
- 문장 흐름 자연스러움 확인

### 2차 교정 (Validator 피드백 반영)
- "악명 높게도" → "잘 알려진 사실이지만" (더 자연스러운 표현)
- "프로그래밍 방식 소비를 위한" → "코드에서 처리하기 위한" (자연스러운 의역)
- "퍽이 가는 방향으로 스케이트를 타야 한다" → "미래를 내다보고 대비해야 한다" (Wayne Gretzky 관용구의 한국어 의역)
- "극복 불가능한 것이 아니다" → "극복할 수 없는 것이 아니다" (자연스러운 표현)
- "많은 토큰을 소비하게 된다" → "많은 토큰을 소비한다" (불필요한 조사 제거)

### 3차 교정 (QA 피드백 반영)
- 전체 문서 일관성 최종 점검 완료
- 용어 통일성 확인: MCP, LLM, RAG, JSON, CSV, YAML, 컨텍스트 윈도우, 토큰, 에이전트 등 용어집 준수
- status를 "final"로 변경
-->

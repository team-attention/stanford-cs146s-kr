---
title: "ReAct 프롬프팅"
originalTitle: "ReAct Prompting"
author: "DAIR.AI"
sourceUrl: "https://www.promptingguide.ai/techniques/react"
translatedAt: "2026-01-08"
status: "final"
---

# ReAct 프롬프팅

## 개요

Yao et al. (2022)이 소개한 ReAct는 "LLM으로 추론 추적과 작업별 행동을 번갈아 생성하는" 프레임워크입니다. 이 접근법을 통해 모델은 내부 추론과 외부 도구 상호작용을 결합하여 복잡한 작업을 처리할 수 있습니다.

## 핵심 개념

ReAct 프레임워크는 외부 정보 검색을 도입해 Chain-of-Thought 프롬프팅의 한계를 극복합니다. CoT는 추론에 뛰어나지만 실제 데이터에 접근할 수 없어 사실적 환각이 발생합니다. ReAct는 사고와 행동을 번갈아 수행하며, 위키피디아나 검색 엔진 같은 외부 소스를 쿼리해 이 문제를 해결합니다.

## 작동 방식

ReAct는 사고-행동-관찰 사이클로 동작합니다:

- **사고(Thought)**: 내부 추론 단계
- **행동(Action)**: 외부 도구 쿼리 (검색, 조회)
- **관찰(Observation)**: 환경에서 반환된 결과

## 예시 궤적

HotpotQA 샘플을 통해 반복 프로세스를 살펴보겠습니다:

```
질문: 콜로라도 조산운동의 동쪽 구역이 확장되는
지역의 고도 범위는 얼마인가?

사고 1: 콜로라도 조산운동을 검색해야 함...
행동 1: Search[콜로라도 조산운동]
관찰 1: [콜로라도 조산운동 검색 결과]
[여러 차례 반복...]
사고 5: High Plains의 고도는 1,800~7,000피트
행동 5: Finish[1,800~7,000피트]
```

## 성능 결과

### 지식 집약적 작업

ReAct는 HotpotQA와 Fever 데이터셋에서 행동만 수행하는 방식보다 우수한 성능을 보입니다. ReAct를 Chain-of-Thought, Self-Consistency와 결합하면 최상의 결과를 얻을 수 있습니다.

### 의사결정 작업

ALFWorld와 WebShop 환경에서 ReAct는 행동만 수행하는 기준선을 크게 앞서지만, 전문가 수준의 인간 성능에는 미치지 못합니다.

## LangChain을 활용한 실제 구현

```python
from langchain.llms import OpenAI
from langchain.agents import load_tools, initialize_agent

llm = OpenAI(model_name="text-davinci-003", temperature=0)
tools = load_tools(["google-serper", "llm-math"], llm=llm)
agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True)
agent.run("Your query here")
```

## 주요 장점

1. 내부 지식과 외부 정보 결합
2. 해석 가능성과 신뢰성 향상
3. 복잡한 추론 및 의사결정 작업 처리
4. 근거 기반 접근으로 환각 감소
5. 실행 중 동적 계획 조정 가능

## 한계점

- 검색 결과 품질에 크게 의존
- 유용하지 않은 정보를 받았을 때 회복이 어려울 수 있음
- 특정 추론 작업에서는 순수 CoT보다 유연성이 낮음

---

## 핵심 요약

- ReAct는 추론(Reasoning)과 행동(Acting)을 결합한 프롬프팅 프레임워크
- 사고-행동-관찰 사이클로 외부 도구와 상호작용
- Chain-of-Thought의 환각 문제를 외부 정보 검색으로 해결
- 지식 집약적 작업과 의사결정 작업 모두에서 기준선 대비 우수한 성능
- LangChain으로 실제 구현 가능

---
title: "Active-Prompt"
originalTitle: "Active-Prompt"
author: "DAIR.AI"
sourceUrl: "https://www.promptingguide.ai/techniques/activeprompt"
translatedAt: "2026-01-08"
status: "final"
---

# Active-Prompt

Chain-of-Thought(CoT) 방법은 사람이 주석을 단 고정된 예시 세트에 의존합니다. 하지만 이 예시가 모든 과제에 최적이 아닐 수 있다는 문제가 있습니다. [Diao et al., (2023)](https://arxiv.org/pdf/2302.12246.pdf)은 이 문제를 해결하기 위해 Active-Prompt라는 새로운 프롬프팅 방법을 제안했습니다. Active-Prompt는 LLM을 다양한 과제별 예시 프롬프트에 맞게 조정합니다. 이 프롬프트에는 사람이 설계한 CoT 추론 주석이 포함됩니다.

## Active-Prompt의 작동 방식

아래 그림은 이 접근법을 보여줍니다. 먼저 LLM에 몇 개의 CoT 예시를 포함하거나 제외한 채로 질문합니다. 훈련 질문 세트에 대해 *k*개의 답변을 생성합니다. *k*개 답변을 바탕으로 불확실성 지표를 계산하는데, 여기서는 불일치 정도를 사용합니다. 불확실성이 가장 높은 질문을 선별해 사람에게 주석을 요청합니다. 이렇게 새로 확보한 주석 예시로 각 질문을 추론합니다.

구체적인 단계는 다음과 같습니다:

1. **불확실성 추정**: 훈련 세트의 각 질문을 LLM에 입력해 *k*개의 답변 생성
2. **불일치 계산**: *k*개 답변 사이의 불일치를 기준으로 불확실성 측정
3. **선택**: 불확실성이 가장 높은 질문을 골라 사람의 주석 대상으로 지정
4. **주석 작업**: 선택된 질문에 대해 사람이 CoT 주석 작성
5. **추론**: 새로 확보한 주석 예시를 활용해 새로운 질문에 추론 수행

## 핵심 인사이트

Active-Prompt의 핵심 혁신은 고정된 예시에 의존하지 않고, 특정 과제에 가장 유용한 예시를 동적으로 선택한다는 점입니다. 여러 모델 출력 간의 불일치로 불확실성을 측정해, 성능 향상에 필요한 주석 대상 예시를 효과적으로 식별합니다.

## 참고 문헌

- [Diao et al., (2023) - Active Prompting with Chain-of-Thought for Large Language Models](https://arxiv.org/pdf/2302.12246.pdf)

---

## 핵심 요약

- Active-Prompt는 과제별로 가장 효과적인 예시를 동적으로 선택하는 프롬프팅 기법입니다
- 불확실성 추정(여러 답변 간 불일치 측정)으로 주석이 필요한 질문을 식별합니다
- 고정된 예시 대신 적응형 예시 선택으로 다양한 과제에서 성능을 향상시킵니다

---
title: "Chain-of-Thought 프롬프팅"
originalTitle: "Chain-of-Thought Prompting"
source_url: "https://www.promptingguide.ai/techniques/cot"
author: "DAIR.AI"
translatedAt: "2026-01-08"
status: "final"
---

# Chain-of-Thought 프롬프팅

## 정의 및 개요

Chain-of-Thought(CoT) 프롬프팅은 중간 추론 단계를 거쳐 복잡한 추론을 수행하는 기법입니다. Wei et al.(2022)이 제안한 이 기법을 사용하면 LLM이 답에 바로 도달하지 않고, 추론 과정을 단계별로 보여주며 다단계 문제를 차근차근 해결합니다.

## 핵심 개념

CoT 프롬프팅은 단계별 추론을 보여주어 모델을 유도합니다. 분석적 사고가 필요한 복잡한 작업에서 few-shot 프롬프팅과 결합하면 더욱 효과적입니다.

## 예제 1: 홀수 덧셈 문제

**프롬프트:**

```
The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.
A: Adding all the odd numbers (9, 15, 1) gives 25. The answer is False.

The odd numbers in this group add up to an even number: 17, 10, 19, 4, 8, 12, 24.
A: Adding all the odd numbers (17, 19) gives 36. The answer is True.

The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.
A:
```

**출력:**

```
Adding all the odd numbers (15, 5, 13, 7, 1) gives 41. The answer is False.
```

## Zero-Shot CoT 프롬프팅

예시 없이도 작동하는 간단한 방법으로, 단 하나의 문구만 추가하면 됩니다: **"Let's think step by step."**(단계별로 생각해 봅시다.)

### 예제 2: 사과 개수 계산 문제

**CoT 없이:**

```
I went to the market and bought 10 apples. I gave 2 apples to the neighbor
and 2 to the repairman. I then went and bought 5 more apples and ate 1.
How many apples did I remain with?
```

**출력:** 11 apples (오답)

**Zero-Shot CoT 적용:**

```
I went to the market and bought 10 apples. I gave 2 apples to the neighbor
and 2 to the repairman. I then went and bought 5 more apples and ate 1.
How many apples did I remain with?

Let's think step by step.
```

**출력:**

```
First, you started with 10 apples.
You gave away 2 apples to the neighbor and 2 to the repairman, so you had
6 apples left.
Then you bought 5 more apples, so now you had 11 apples.
Finally, you ate 1 apple, so you would remain with 10 apples.
```

Zero-shot 방식은 프롬프트에 넣을 예시가 부족할 때 특히 유용합니다.

## Automatic Chain-of-Thought (Auto-CoT)

Zhang et al.(2022)은 수작업으로 예시를 만드는 부담을 줄이기 위해 시연 생성 과정을 자동화하는 방법을 제안했습니다.

**2단계 프로세스:**

1. **질문 클러스터링:** 데이터셋의 질문을 클러스터로 분류하여 다양성 확보
2. **시연 샘플링:** 각 클러스터에서 대표 질문을 선택하고 Zero-Shot-CoT로 추론 체인 생성

**선택 휴리스틱:**

- 질문 길이 (예: 60 토큰)
- 추론 단계 수 (예: 5단계)

이 방식은 수작업 부담을 줄이면서도 품질을 유지합니다.

---

## 핵심 요약

- CoT 프롬프팅은 추론 작업의 성능을 크게 향상시킵니다
- 충분히 큰 언어 모델에서 가장 효과적입니다
- "Let's think step by step"은 간단하면서도 효과적인 zero-shot 대안입니다
- 자동화를 통해 품질을 유지하면서 CoT 시연을 확장할 수 있습니다

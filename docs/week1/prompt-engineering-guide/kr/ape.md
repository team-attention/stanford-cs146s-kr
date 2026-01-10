---
title: "자동 프롬프트 엔지니어 (APE)"
originalTitle: "Automatic Prompt Engineer"
author: "DAIR.AI"
sourceUrl: "https://www.promptingguide.ai/techniques/ape"
translatedAt: "2026-01-08"
status: "final"
---

# 자동 프롬프트 엔지니어 (APE)

Zhou et al. (2022)이 제안한 APE(Automatic Prompt Engineer)는 지시문을 자동으로 생성하고 선택하는 프레임워크입니다. 핵심 아이디어는 지시문 생성을 자연어 합성 문제로 다루고, LLM을 활용한 블랙박스 최적화로 접근하는 것입니다.

## APE 작동 방식

APE는 다음 세 단계로 작동합니다:

1. **생성**: LLM이 출력 예시를 바탕으로 후보 지시문을 생성합니다.
2. **실행**: 타겟 모델이 후보 지시문들을 실행합니다.
3. **선택**: 평가 점수를 기준으로 가장 효과적인 지시문을 선택합니다.

## 주요 발견

APE는 널리 사용되는 "Let's think step by step"보다 더 나은 제로샷 Chain-of-Thought(연쇄적 사고) 프롬프트를 발견했습니다. 최적화된 프롬프트는 다음과 같습니다:

> "Let's work this out in a step by step way to be sure we have the right answer."
> (정답을 확인하기 위해 단계별로 풀어봅시다.)

이 프롬프트는 MultiArith와 GSM8K 벤치마크에서 성능 향상을 보였습니다.

## 관련 연구

프롬프트 최적화 관련 연구들:

- **Prompt-OIRL**: 쿼리 의존적 프롬프트를 위한 오프라인 역강화학습 활용
- **OPRO**: LLM을 활용한 프롬프트 최적화
- **AutoPrompt**: 그래디언트 기반 자동 프롬프트 생성
- **Prefix Tuning & Prompt Tuning**: 전체 파인튜닝 대신 파라미터 효율적 학습

## 참고 문헌

- Zhou et al. (2022). "[Large Language Models Are Human-Level Prompt Engineers](https://arxiv.org/abs/2211.01910)"

---

## 핵심 요약

- APE는 LLM으로 최적의 프롬프트를 자동 탐색하는 프레임워크입니다
- 인간이 만든 "Let's think step by step"보다 효과적인 프롬프트를 찾았습니다
- 수학 추론 벤치마크(MultiArith, GSM8K)에서 성능 향상을 입증했습니다

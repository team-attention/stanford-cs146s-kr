---
title: "방향 자극 프롬프팅 (Directional Stimulus Prompting)"
originalTitle: "Directional Stimulus Prompting"
author: "DAIR.AI"
sourceUrl: "https://www.promptingguide.ai/techniques/dsp"
translatedAt: "2026-01-08"
status: "final"
---

# 방향 자극 프롬프팅 (Directional Stimulus Prompting)

## 개요

방향 자극 프롬프팅(Directional Stimulus Prompting)은 Li et al. (2023)이 제안한 기법입니다. 언어 모델이 원하는 출력을 더 효과적으로 생성하도록 안내합니다. 특히 요약(summarization) 작업에서 유용합니다.

## 핵심 메커니즘

이 접근법은 조정 가능한(tunable) 정책 언어 모델(policy language model)을 활용합니다. 정책 모델은 더 큰 고정(frozen) LLM을 안내하는 자극(stimuli)이나 힌트를 생성하도록 훈련됩니다. 이는 강화학습(reinforcement learning)으로 언어 모델 출력을 최적화하는 새로운 트렌드입니다.

> "The policy LM can be small and optimized to generate the hints that guide a black-box frozen LLM."
>
> 정책 LM은 규모가 작아도 되며, 블랙박스 고정 LLM을 안내하는 힌트를 생성하도록 최적화할 수 있습니다.

## 기술적 접근 방식

이 방법론은 표준 프롬프팅과 다릅니다. 수동으로 프롬프트를 작성하는 대신, 방향성 프롬프트(directional prompts)를 체계적으로 생성하는 중간 단계를 도입합니다. 덕분에 모델 행동을 더 구조적으로 안내할 수 있습니다.

## 장점

- **효율성**: 전체 시스템을 파인튜닝하지 않고 작은 모델만 효율적으로 최적화합니다.
- **유연성**: 블랙박스 LLM과 함께 작동하므로 API 기반 모델에도 적용할 수 있습니다.
- **확장성**: 작은 정책 모델이 큰 LLM을 안내하는 구조로 확장성이 뛰어납니다.

## 참고 자료

- Li et al. (2023) - Directional Stimulus Prompting 원논문
- [Prompt Engineering Guide](https://www.promptingguide.ai/) - DAIR.AI

---

*참고: 원본 페이지의 상세 예제는 "coming soon"으로 표시되어 있어 추후 업데이트될 수 있습니다.*

---

## 핵심 요약

- 작은 정책 LM이 큰 고정 LLM을 안내하는 힌트를 생성하는 기법
- 강화학습으로 힌트 생성 최적화
- 요약 작업에 효과적이며, API 기반 블랙박스 모델에도 적용 가능

<!--
## Refiner 변경 사항 (3차 - 최종)
- QA 피드백 반영: 2건
  - "강화학습(reinforcement learning)으로 언어 모델 출력을 최적화하는 새로운 트렌드를 보여줍니다." → "이는 강화학습(reinforcement learning)으로 언어 모델 출력을 최적화하는 새로운 트렌드입니다."
  - 핵심 요약 첫 항목에서 "방향 자극 프롬프팅은" 반복 제거
- frontmatter status: "draft" → "final"
-->

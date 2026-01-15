---
title: "Directional Stimulus Prompting"
source_url: "https://www.promptingguide.ai/techniques/dsp"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Directional Stimulus Prompting

## Overview

Directional Stimulus Prompting은 Li et al. (2023)이 제안한 기법으로, 언어 모델이 원하는 출력을 생성하도록 더 효과적으로 안내하기 위해 설계되었습니다. 특히 요약(summarization) 작업에서 유용합니다.

## 핵심 메커니즘

이 접근법은 조정 가능한(tunable) 정책 언어 모델(policy language model)을 사용하여 더 큰, 고정된(frozen) LLM을 안내하는 자극(stimuli) 또는 힌트를 생성하도록 훈련합니다. 이는 강화학습(reinforcement learning)을 사용하여 언어 모델 출력을 최적화하는 새로운 트렌드를 나타냅니다.

> "The policy LM can be small and optimized to generate the hints that guide a black-box frozen LLM."
>
> 정책 LM은 작을 수 있으며, 블랙박스인 고정된 LLM을 안내하는 힌트를 생성하도록 최적화될 수 있습니다.

## 기술적 접근 방식

이 방법론은 수동으로 작성된 프롬프트 대신, 방향성 있는 프롬프트(directional prompts)가 체계적으로 생성되는 중간 단계를 도입한다는 점에서 표준 프롬프팅과 다릅니다. 이를 통해 모델 행동에 대한 더 구조화된 안내가 가능해집니다.

## 장점

- **효율성**: 전체 시스템을 미세 조정하는 대신 더 작은 모델을 효율적으로 최적화할 수 있습니다.
- **유연성**: 블랙박스 LLM과 함께 작동하므로 API 기반 모델에도 적용 가능합니다.
- **확장성**: 작은 정책 모델이 큰 LLM을 안내하는 구조로 확장성이 뛰어납니다.

## 참고 자료

- Li et al. (2023) - Directional Stimulus Prompting 원논문
- [Prompt Engineering Guide](https://www.promptingguide.ai/) - DAIR.AI

---

*Note: 원본 페이지에 상세 예제가 "coming soon"으로 표시되어 있어, 추후 업데이트될 수 있습니다.*

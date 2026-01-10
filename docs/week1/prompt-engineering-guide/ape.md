---
title: "Automatic Prompt Engineer"
source_url: "https://www.promptingguide.ai/techniques/ape"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Automatic Prompt Engineer (APE)

Zhou et al. (2022)가 제안한 APE(Automatic Prompt Engineer)는 지시문 생성 및 선택을 자동화하는 프레임워크입니다. 핵심 개념은 "지시문 생성을 자연어 합성 문제로 취급하고 LLM을 활용한 블랙박스 최적화 문제로 접근"하는 것입니다.

## APE 방법론

APE 프로세스는 다음 단계로 작동합니다:

1. **생성 단계(Generation Phase)**: LLM이 출력 예시를 받아 특정 태스크에 대한 후보 지시문들을 생성합니다.
2. **실행 단계(Execution Phase)**: 타겟 모델이 이 후보 지시문들을 실행합니다.
3. **선택 단계(Selection Phase)**: 평가 지표를 기반으로 가장 효과적인 지시문이 선택됩니다.

## 주요 성과

APE는 인간이 설계한 프롬프트보다 개선된 제로샷 프롬프트를 발견했습니다. 발견된 프롬프트인 "Let's work this out in a step by step way to be sure we have the right answer"(정답을 확실히 하기 위해 단계별로 풀어봅시다)는 향상된 연쇄적 사고(chain-of-thought) 추론 능력을 보여주었으며, 수학 벤치마크(MultiArith 및 GSM8K)에서 성능이 향상되었습니다.

## 관련 연구 분야

가이드에서는 프롬프트 최적화에 대한 여러 보완적 접근법을 참조합니다:

- **Prompt-OIRL**: 쿼리 의존적 프롬프트를 위해 오프라인 역강화학습을 활용
- **OPRO**: 프롬프트 최적화를 위해 LLM을 활용
- **AutoPrompt**: 자동 프롬프트 생성을 위한 그래디언트 기반 검색
- **Prefix Tuning & Prompt Tuning**: 전체 파인튜닝에 대한 파라미터 효율적 대안

## 참고 문헌

- Zhou et al. (2022). "Large Language Models Are Human-Level Prompt Engineers"

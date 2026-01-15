---
title: "Self-Consistency"
source_url: "https://www.promptingguide.ai/techniques/consistency"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Self-Consistency

## 개요

Self-Consistency는 Wang et al. (2022)이 제안한 고급 프롬프트 엔지니어링 기법으로, Chain-of-Thought(CoT) 프롬프팅을 개선한 방법입니다. 단일 추론 경로에 의존하는 대신, "few-shot CoT를 통해 여러 개의 다양한 추론 경로를 샘플링하고, 생성된 결과들 중 가장 일관된 답변을 선택"합니다.

이 접근법은 특히 산술 및 상식 추론이 필요한 작업에서 성능을 크게 향상시킵니다.

## 단일 경로 추론의 문제점

Self-Consistency 없이 단일 시도로 질문에 답하는 경우:

**질문:** 내가 6살일 때 여동생은 내 나이의 절반이었습니다. 지금 나는 70살인데, 여동생은 몇 살일까요?

**단일 출력:** 35 (오답)

## 해결책: 다중 추론 경로

Few-shot 예시를 사용하고 여러 응답을 생성하면, 모델은 다양한 추론을 수행합니다:

**출력 1:** 화자가 6살일 때 여동생은 3살이었습니다. 지금 화자가 70살이므로, 여동생은 67살입니다.

**출력 2:** 여동생은 3살이었습니다. 화자가 지금 70살이므로, 여동생은 67살입니다.

**출력 3:** 여동생은 3살이었습니다. 화자가 70살이므로, 여동생은 35살입니다.

## 핵심 메커니즘

이 기법은 다음 단계를 포함합니다:

1. **다중 추론 경로 샘플링**: Few-shot CoT 프롬프팅을 사용하여 여러 추론 경로를 생성
2. **응답 분석**: 생성된 응답들을 분석
3. **일관된 답변 선택**: 빈도 또는 투표를 기반으로 가장 일관된 답변을 선택

위 예시에서 두 개의 출력이 67이라는 답에 수렴하므로, 단일 시도 추론이 아닌 합의(consensus)를 통해 더 신뢰할 수 있는 답변으로 확정됩니다.

## 요약

| 항목 | 설명 |
|------|------|
| 제안자 | Wang et al. (2022) |
| 기반 기법 | Chain-of-Thought (CoT) 프롬프팅 |
| 핵심 아이디어 | 다중 추론 경로 샘플링 후 일관된 답변 선택 |
| 효과적인 분야 | 산술 추론, 상식 추론 |
| 선택 방법 | 빈도 기반 또는 다수결 투표 |

## 참고 자료

- [Prompting Guide - Self-Consistency](https://www.promptingguide.ai/techniques/consistency)
- Wang et al. (2022) - Self-Consistency Improves Chain of Thought Reasoning in Language Models

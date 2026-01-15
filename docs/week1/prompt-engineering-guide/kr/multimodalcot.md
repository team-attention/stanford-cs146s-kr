---
title: "멀티모달 Chain-of-Thought 프롬프팅"
originalTitle: "Multimodal Chain-of-Thought Prompting"
author: "DAIR.AI"
sourceUrl: "https://www.promptingguide.ai/techniques/multimodalcot"
translatedAt: "2026-01-08"
status: "final"
---

# 멀티모달 Chain-of-Thought 프롬프팅

## 개요

Zhang et al. (2023)은 기존 Chain-of-Thought 추론을 확장한 멀티모달 CoT 접근법을 제안했습니다. 언어에만 의존하는 대신, 이 프레임워크는 여러 모달리티(양식)를 함께 처리합니다.

## 핵심 접근법

이 방법론은 두 단계로 나뉩니다:

1. **근거 생성(Rationale Generation)**: 텍스트와 이미지 데이터를 결합해 설명적 추론을 만듭니다
2. **답변 추론(Answer Inference)**: 생성한 근거를 바탕으로 최종 답변을 도출합니다

## 성능

연구에 따르면 "멀티모달 CoT 모델(1B)이 ScienceQA 벤치마크에서 GPT-3.5를 능가"했습니다. 이는 언어만 사용하는 대형 모델 대비 상당한 효율성 향상을 보여줍니다.

## 프레임워크 구조

이 접근법은 시각 정보와 언어 정보를 동시에 활용해, 두 모달리티를 모두 이해해야 하는 콘텐츠를 추론합니다. 텍스트 추론 경로에만 집중하는 기존 CoT 방식과 다릅니다.

## 추가 자료

이 페이지는 관련 논문 "Language Is Not All You Need: Aligning Perception with Language Models"(2023년 2월)를 참조합니다. 이 논문은 시각적 인식과 언어 모델 기능 사이의 유사한 교차점을 탐구합니다.

더 깊이 이해하고자 하는 실무자를 위해 프롬프트 엔지니어링 기초와 AI 에이전트 개발 강좌도 제공합니다.

---

## 핵심 요약

- 멀티모달 CoT는 텍스트와 시각 정보를 결합해 Chain-of-Thought 추론을 확장
- 두 단계 접근법: 근거 생성 → 답변 추론
- 1B 파라미터 모델이 ScienceQA에서 GPT-3.5 능가
- 기존 텍스트 전용 CoT와 달리 여러 모달리티를 처리할 수 있음

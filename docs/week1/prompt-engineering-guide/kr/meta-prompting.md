---
title: "메타 프롬프팅 (Meta Prompting)"
source_url: "https://www.promptingguide.ai/techniques/meta-prompting"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
translatedAt: "2026-01-08"
status: "final"
---

# 메타 프롬프팅 (Meta Prompting)

## 핵심 요약

- **메타 프롬프팅**은 구체적인 내용보다 **구조와 패턴**에 집중하는 고급 프롬프팅 기법이다
- Few-shot 프롬프팅과 달리 **토큰 효율성**이 높고, 특정 예시에 대한 의존도가 낮다
- **복잡한 추론**, 수학 문제, 코딩 과제 등에 효과적이다
- 단, LLM이 해당 작업에 대한 기본 지식을 갖추고 있어야 효과적으로 작동한다

---

## 개요

메타 프롬프팅(Meta Prompting)은 특정 내용보다 구조와 문법적 측면을 강조하는 고급 프롬프팅 기법이다. LLM과 추상화된 패턴 기반의 상호작용을 구성하는 방식이다.

## 주요 특성

Zhang et al. (2024) 연구에 따르면, 메타 프롬프팅은 다섯 가지 핵심 속성을 갖는다:

1. **구조 중심(Structure-oriented)**: 특정 내용보다 문제와 솔루션의 형식과 패턴을 우선시한다
2. **문법 기반(Syntax-focused)**: 문법 구조를 예상 응답의 템플릿으로 활용한다
3. **추상적 예시(Abstract examples)**: 구체적인 세부 사항 없이 문제 구조를 보여주는 추상화된 프레임워크를 사용한다
4. **다재다능함(Versatile)**: 다양한 도메인에서 구조화된 응답에 적용할 수 있다
5. **범주적 접근(Categorical approach)**: 타입 이론(type theory)을 활용해 구성 요소를 분류한다

## Few-shot 프롬프팅과의 비교

메타 프롬프팅은 Few-shot 프롬프팅과 근본적으로 다른 접근 방식을 취한다. 연구에 따르면, 메타 프롬프팅은 Few-shot이 강조하는 "내용 중심 접근"과 달리 "구조 중심 접근"을 채택한다.

### 장점

- **토큰 효율성**: 구조에 집중해 토큰 사용량을 줄인다
- **공정한 비교**: 특정 예시의 영향을 최소화한다
- **Zero-shot 효과**: 예시 의존도가 낮아 Zero-shot 프롬프팅처럼 작동한다

## 주의사항

메타 프롬프팅은 LLM이 해당 작업에 대한 기본 지식을 갖추고 있다고 가정한다. 새롭거나 특수한 작업에서는 성능이 저하될 수 있으며, 이는 Zero-shot의 한계와 유사하다.

## 권장 활용 분야

- 복잡한 추론 작업
- 수학 문제 해결
- 코딩 과제
- 이론적 질의

## 참고 자료

- Zhang et al. (2024) - Meta Prompting 연구 논문
- Prompting Guide by DAIR.AI

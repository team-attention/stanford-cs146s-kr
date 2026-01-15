---
title: "코드 리뷰: 그냥 하세요"
originalTitle: "Code Reviews: Just Do It"
author: "Jeff Atwood"
sourceUrl: "https://blog.codinghorror.com/code-reviews-just-do-it/"
translatedAt: "2026-01-13"
status: "final"
qaScore:
  consistency: 9
  readability: 9
  accuracy: 9
  overall: 9
---

# 코드 리뷰: 그냥 하세요

[원본 링크](https://blog.codinghorror.com/code-reviews-just-do-it/)

## 본문

*Humanizing Peer Reviews*에서 칼 위거스(Karl Wiegers)는 이렇게 강조합니다:

> "동료 검토(Peer Review)는 작성자가 아닌 다른 사람이 소프트웨어 산출물의 결함과 개선점을 찾는 활동으로, 소프트웨어 품질 향상을 위한 가장 강력한 도구입니다."

제프 앳우드(Jeff Atwood)는 **동료 코드 리뷰야말로 코드 품질을 높이는 가장 효과적인 방법**이라고 주장합니다. 그는 다른 개발자와 함께 검토하기 전까지는 코드가 완료되었다고 생각하지 말라고 강조합니다.

## Code Complete의 증거

스티브 맥코넬(Steve McConnell)의 연구에 따르면 코드 인스펙션(Code Inspection)은 테스트 단독보다 훨씬 우수한 결함 탐지 효과를 보여줍니다:

- 단위 테스트(Unit Testing): 25% 결함 탐지율
- 기능 테스트(Function Testing): 35% 결함 탐지율
- 통합 테스트(Integration Testing): 45% 결함 탐지율
- **설계 인스펙션(Design Inspection): 55% 효과**
- **코드 인스펙션(Code Inspection): 60% 효과**

### 사례 연구

주요 사례:

- 유지보수를 담당하는 한 조직은 리뷰 도입 후 오류율을 55%에서 2%로 낮췄습니다
- 리뷰를 거쳐 개발한 프로그램은 오류가 80% 이상 적었습니다 (100줄당 0.82개 vs 4.5개)
- Aetna 보험은 인스펙션으로 82%의 오류를 찾아냈습니다
- IBM Orbit 프로젝트는 예상 오류율의 1%만 기록했습니다
- AT&T의 한 조직은 생산성 14% 향상과 결함 90% 감소를 이뤘습니다
- JPL은 조기 결함 탐지로 인스펙션당 약 $25,000를 절약합니다

## 권장 사항

앳우드는 코드 리뷰를 처음 도입하는 조직에 칼 위거스의 책 *Peer Reviews in Software: A Practical Guide*를 추천합니다.

---

## 핵심 요약

- 동료 코드 리뷰는 코드 품질을 높이는 가장 효과적인 방법입니다
- 코드 인스펙션의 결함 탐지 효과는 60%로, 단위 테스트(25%)보다 훨씬 높습니다
- 여러 기업에서 리뷰 도입 후 오류율이 크게 줄고 생산성이 높아졌습니다
- 다른 개발자와 검토하기 전까지 코드가 완료되었다고 생각하지 마세요

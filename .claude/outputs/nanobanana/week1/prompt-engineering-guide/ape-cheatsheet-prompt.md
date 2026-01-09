# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "Automatic Prompt Engineer (APE)" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

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

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

# Layout Structure (이 구조대로 배치해주세요)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: APE (Automatic Prompt Engineer) 🍌    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 📖 WHAT IS APE?        │    │ 💡 KEY INSIGHT                  ││
│  │                         │    │                                 ││
│  │ • Definition 박스       │    │  "지시문 생성 = 자연어 합성"    ││
│  │ • 핵심: 자동 프롬프트    │    │  "LLM 활용 블랙박스 최적화"    ││
│  │   생성 및 선택          │    │                                 ││
│  │                         │    │  🏆 발견된 최고의 프롬프트:    ││
│  └─────────────────────────┘    │  "Let's work this out..."      ││
│                                  └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ APE 3-PHASE WORKFLOW (이 섹션이 가장 넓어야 함 - 핵심!)         │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐    │  │
│  │  │     1.      │     │     2.      │     │     3.      │    │  │
│  │  │ Generation  │────▶│  Execution  │────▶│  Selection  │    │  │
│  │  │    Phase    │     │    Phase    │     │    Phase    │    │  │
│  │  │             │     │             │     │             │    │  │
│  │  │ 후보 지시문 │     │ 지시문     │     │ 최적 지시문 │    │  │
│  │  │ 생성        │     │ 실행        │     │ 선택        │    │  │
│  │  └─────────────┘     └─────────────┘     └─────────────┘    │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ 🔗 RELATED TECHNIQUES      │  │ 🎓 KEY TAKEAWAYS              ││
│  │                             │  │                               ││
│  │ • Prompt-OIRL              │  │ ✓ 프롬프트 자동 생성          ││
│  │ • OPRO                     │  │ ✓ Human 수준 프롬프트 발견    ││
│  │ • AutoPrompt               │  │ ✓ Zero-shot CoT 성능 향상     ││
│  │ • Prefix/Prompt Tuning     │  │ ✓ 수학 벤치마크 성능 개선     ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**배치 비율**:
- 상단 (20%): 타이틀
- 중상단 (25%): Definition + Key Insight (좌우 분할)
- 중앙 (35%): 3-Phase Workflow 다이어그램 (가장 넓게!)
- 하단 (20%): Related Techniques + Takeaways (좌우 분할)

# Content Details (레이아웃 각 섹션에 들어갈 내용)

## 📖 WHAT IS APE? (좌측 상단)

**Definition Box:**
> "APE (Automatic Prompt Engineer) is a framework that automates instruction generation and selection using LLMs."

**핵심 포인트:**
- 프롬프트 생성/선택 자동화
- 자연어 합성 문제로 접근
- LLM 기반 블랙박스 최적화
- Zhou et al. (2022) 제안

## 💡 KEY INSIGHT (우측 상단)

**핵심 발견:**
```
┌─────────────────────────────────────┐
│ 🏆 APE가 발견한 최고의 프롬프트    │
│                                     │
│ "Let's work this out in a step     │
│  by step way to be sure we have    │
│  the right answer."                 │
│                                     │
│ → Human 설계 프롬프트보다 우수!    │
│ → CoT 추론 능력 향상               │
│ → MultiArith, GSM8K 성능↑          │
└─────────────────────────────────────┘
```

## ⚡ APE 3-PHASE WORKFLOW (중앙 - 가장 넓게!)

**파이프라인 다이어그램:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │       1.        │    │       2.        │    │       3.        │ │
│  │   GENERATION    │    │   EXECUTION     │    │   SELECTION     │ │
│  │     PHASE       │───▶│     PHASE       │───▶│     PHASE       │ │
│  │                 │    │                 │    │                 │ │
│  │  ┌───────────┐  │    │  ┌───────────┐  │    │  ┌───────────┐  │ │
│  │  │   LLM     │  │    │  │  Target   │  │    │  │ Evaluation│  │ │
│  │  │           │  │    │  │   Model   │  │    │  │  Metrics  │  │ │
│  │  └─────┬─────┘  │    │  └─────┬─────┘  │    │  └─────┬─────┘  │ │
│  │        │        │    │        │        │    │        │        │ │
│  │        ▼        │    │        ▼        │    │        ▼        │ │
│  │  ┌───────────┐  │    │  ┌───────────┐  │    │  ┌───────────┐  │ │
│  │  │  후보     │  │    │  │  실행     │  │    │  │  최적     │  │ │
│  │  │ 지시문들  │  │    │  │  결과들   │  │    │  │  지시문   │  │ │
│  │  └───────────┘  │    │  └───────────┘  │    │  └───────────┘  │ │
│  │                 │    │                 │    │                 │ │
│  │ Input: 출력예시 │    │ Input: 후보들   │    │ Input: 결과들   │ │
│  │ Output: N개    │    │ Output: 결과    │    │ Output: Best 1  │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**각 단계 설명:**

| Phase | Name | Input | Process | Output |
|-------|------|-------|---------|--------|
| 1️⃣ | **Generation** | 출력 예시 | LLM이 후보 지시문 생성 | N개의 후보 지시문 |
| 2️⃣ | **Execution** | 후보 지시문들 | 타겟 모델이 각 지시문 실행 | 실행 결과들 |
| 3️⃣ | **Selection** | 실행 결과들 | 평가 지표 기반 선택 | 최적의 지시문 1개 |

## 🔗 RELATED TECHNIQUES (좌측 하단)

| 기법 | 설명 |
|------|------|
| **Prompt-OIRL** | 오프라인 역강화학습 활용 쿼리 의존적 프롬프트 |
| **OPRO** | LLM을 활용한 프롬프트 최적화 |
| **AutoPrompt** | 그래디언트 기반 자동 프롬프트 생성 |
| **Prefix Tuning** | 파라미터 효율적 프롬프트 튜닝 |
| **Prompt Tuning** | Soft prompt 학습 방식 |

## 🎓 KEY TAKEAWAYS (우측 하단)

- ✓ **자동화된 프롬프트 엔지니어링**: LLM이 프롬프트를 자동 생성/선택
- ✓ **Human-level 프롬프트 발견**: 사람이 설계한 것보다 나은 프롬프트 발견
- ✓ **Zero-shot CoT 향상**: "Let's work this out step by step..." 발견
- ✓ **벤치마크 성능 개선**: MultiArith, GSM8K 등 수학 문제에서 성능↑
- ✓ **블랙박스 최적화**: 모델 내부 접근 없이 프롬프트 최적화 가능

---

# Instructions

1. **스타일**: 첨부된 이미지의 손필기 느낌, 모눈종이 배경, 아이콘 스타일을 따라주세요.

2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치해주세요. 첨부 이미지의 레이아웃을 그대로 복사하지 마세요.

3. **언어**: 용어/고유명사는 영어(APE, Automatic Prompt Engineer, Generation, Execution, Selection, CoT, Zero-shot 등), 설명은 한국어.

4. **핵심**: **3-Phase Workflow 섹션을 가장 넓고 눈에 띄게** 배치해주세요. 이 콘텐츠의 핵심은 "APE의 3단계 자동화 프로세스"입니다.

Please generate the Cheat Sheet now.

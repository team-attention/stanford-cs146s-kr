# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "Multimodal Chain-of-Thought (CoT) Prompting" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "Multimodal CoT"
source_url: "https://www.promptingguide.ai/techniques/multimodalcot"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Multimodal Chain-of-Thought Prompting

## Overview

Zhang et al. (2023) introduced a multimodal CoT approach that extends traditional chain-of-thought reasoning by incorporating both textual and visual information. Rather than relying solely on language, this framework processes multiple modalities together.

## Key Approach

The methodology operates in two distinct phases:

1. **Rationale Generation**: Creates explanatory reasoning based on combined text and image data
2. **Answer Inference**: Uses the generated rationales to produce final answers

## Performance

The research demonstrated that "the multimodal CoT model (1B) outperforms GPT-3.5 on the ScienceQA benchmark," indicating significant efficiency gains compared to larger language-only models.

## Framework Structure

The approach leverages visual and linguistic information simultaneously, enabling the model to reason about content that requires understanding both modalities. This contrasts with traditional CoT methods that focus exclusively on textual reasoning paths.

## Additional Resources

The page references a related paper: "Language Is Not All You Need: Aligning Perception with Language Models" (February 2023), which explores similar intersections between visual perception and language model capabilities.

The guide also offers associated courses on prompt engineering fundamentals and AI agent development for practitioners seeking deeper understanding.

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

# Layout Structure (이 구조대로 배치해주세요)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: MULTIMODAL COT 🍌                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 📖 WHAT IS MULTIMODAL  │    │ 🏆 KEY ACHIEVEMENT              ││
│  │    COT?                 │    │                                 ││
│  │                         │    │  "1B Multimodal CoT model       ││
│  │ • Definition 박스       │    │   outperforms GPT-3.5 on        ││
│  │ • Text + Vision 결합    │    │   ScienceQA benchmark"          ││
│  │ • 2단계 추론 방식       │    │                                 ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ 2-PHASE FRAMEWORK (이 섹션이 가장 넓어야 함 - 핵심!)            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │  [Text + Image] → Phase 1: Rationale → Phase 2: Answer      │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ 🔄 TRADITIONAL vs MULTIMODAL│  │ 🎓 KEY TAKEAWAYS              ││
│  │                             │  │                               ││
│  │ Traditional │ Multimodal   │  │ ✓ Text + Image 동시 처리      ││
│  │ Text only   │ Text+Vision  │  │ ✓ 2단계: Rationale → Answer   ││
│  │             │              │  │ ✓ 작은 모델로 GPT-3.5 능가    ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**배치 비율**:
- 상단 (20%): 타이틀
- 중상단 (25%): Definition + Key Achievement (좌우 분할)
- 중앙 (35%): 2-Phase Framework 다이어그램 (가장 넓게!)
- 하단 (20%): Comparison + Takeaways (좌우 분할)

# Content Details (레이아웃 각 섹션에 들어갈 내용)

## 📖 WHAT IS MULTIMODAL COT? (좌측 상단)

**Definition Box:**
> "Multimodal CoT extends traditional chain-of-thought reasoning by incorporating both textual and visual information."

**핵심 포인트:**
- 텍스트 + 이미지를 동시에 처리하는 CoT
- 언어만이 아닌 다중 모달리티 활용
- 2단계 추론 프레임워크
- Zhang et al. (2023) 제안

## 🏆 KEY ACHIEVEMENT (우측 상단)

**주요 성과:**
```
┌─────────────────────────────────────┐
│ 🎯 ScienceQA Benchmark 성과         │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  Multimodal CoT (1B params)     │ │
│ │         >                       │ │
│ │      GPT-3.5                    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ → 1B 파라미터로 GPT-3.5 능가!       │
│ → 효율성과 성능 모두 달성           │
│ → Vision + Language 시너지         │
└─────────────────────────────────────┘
```

## ⚡ 2-PHASE FRAMEWORK (중앙 - 가장 넓게!)

**프레임워크 다이어그램:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│               MULTIMODAL COT 2-PHASE FRAMEWORK                     │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                         INPUT                                │   │
│  │  ┌─────────────────┐         ┌─────────────────┐            │   │
│  │  │    📝 TEXT      │         │    🖼️ IMAGE     │            │   │
│  │  │                 │         │                 │            │   │
│  │  │  Question,      │         │  Diagram,       │            │   │
│  │  │  Context        │         │  Chart,         │            │   │
│  │  │                 │         │  Photo          │            │   │
│  │  └────────┬────────┘         └────────┬────────┘            │   │
│  │           │                           │                     │   │
│  │           └───────────┬───────────────┘                     │   │
│  │                       ▼                                     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                          │                                         │
│                          ▼                                         │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    PHASE 1: RATIONALE GENERATION            │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │                                                     │    │   │
│  │  │  • Text + Image 정보 통합 분석                      │    │   │
│  │  │  • 설명적 추론(Explanatory Reasoning) 생성          │    │   │
│  │  │  • "왜" 그리고 "어떻게"에 대한 근거 생성            │    │   │
│  │  │                                                     │    │   │
│  │  │  Output: Rationale (추론 근거)                       │    │   │
│  │  │                                                     │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  └───────────────────────────┬─────────────────────────────────┘   │
│                              │                                     │
│                              ▼                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    PHASE 2: ANSWER INFERENCE                │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │                                                     │    │   │
│  │  │  • Phase 1에서 생성된 Rationale 활용                │    │   │
│  │  │  • 근거 기반 최종 답변 추론                         │    │   │
│  │  │  • 정확하고 신뢰할 수 있는 결과 도출               │    │   │
│  │  │                                                     │    │   │
│  │  │  Output: Final Answer (최종 답변)                   │    │   │
│  │  │                                                     │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Phase별 상세 설명:**

| Phase | Name | Input | Process | Output |
|-------|------|-------|---------|--------|
| 1️⃣ | **Rationale Generation** | Text + Image | 다중 모달 정보 통합 → 설명적 추론 생성 | Rationale (추론 근거) |
| 2️⃣ | **Answer Inference** | Rationale | 생성된 근거 기반 → 최종 답변 도출 | Final Answer |

**활용 예시:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  EXAMPLE: ScienceQA 문제                                           │
│                                                                     │
│  INPUT:                                                            │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 📝 Text: "Which animal in the food chain gets energy       │   │
│  │          from the sun?"                                     │   │
│  │ 🖼️ Image: [Food chain diagram with sun, grass, rabbit, fox]│   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  PHASE 1 (Rationale):                                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ "이미지에서 먹이사슬을 보면: 태양 → 풀 → 토끼 → 여우.       │   │
│  │  태양에서 직접 에너지를 받는 것은 광합성을 하는 식물(풀)이다."│  │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  PHASE 2 (Answer):                                                 │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ "Answer: 풀 (Grass)"                                        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 🔄 TRADITIONAL vs MULTIMODAL COT (좌측 하단)

| 비교 | Traditional CoT | Multimodal CoT |
|------|-----------------|----------------|
| 입력 | 텍스트만 | 텍스트 + 이미지 |
| 추론 | 언어 기반 | 다중 모달 기반 |
| 활용 | 텍스트 문제 | 시각 자료 포함 문제 |
| 효율 | 대형 모델 필요 | 작은 모델로 가능 |
| 예시 | 수학 문제 | ScienceQA, 다이어그램 QA |

## 🎓 KEY TAKEAWAYS (우측 하단)

- ✓ **다중 모달 처리**: 텍스트와 이미지를 동시에 분석하여 추론
- ✓ **2단계 프레임워크**: Rationale 생성 → Answer 추론의 체계적 접근
- ✓ **효율적 성능**: 1B 모델이 GPT-3.5를 ScienceQA에서 능가
- ✓ **시각적 추론 강화**: 다이어그램, 차트 등 시각 자료 이해 능력
- ✓ **실용적 적용**: 과학 문제, 시각적 질의응답 등에 효과적

---

# Instructions

1. **스타일**: 첨부된 이미지의 손필기 느낌, 모눈종이 배경, 아이콘 스타일을 따라주세요.

2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치해주세요. 첨부 이미지의 레이아웃을 그대로 복사하지 마세요.

3. **언어**: 용어/고유명사는 영어(Multimodal CoT, Chain-of-Thought, Rationale Generation, Answer Inference, ScienceQA 등), 설명은 한국어.

4. **핵심**: **2-Phase Framework 섹션을 가장 넓고 눈에 띄게** 배치해주세요. 이 콘텐츠의 핵심은 "Text+Image → Rationale → Answer"의 2단계 프레임워크입니다.

Please generate the Cheat Sheet now.

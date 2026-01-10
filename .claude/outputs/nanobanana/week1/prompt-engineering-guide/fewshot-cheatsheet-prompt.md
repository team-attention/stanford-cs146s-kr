# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "Few-shot Prompting" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "Few-shot Prompting"
source_url: "https://www.promptingguide.ai/techniques/fewshot"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Few-shot Prompting

## Overview

Few-shot prompting is an in-context learning technique that improves model performance by providing demonstrations within prompts. Rather than relying solely on zero-shot capabilities, this approach conditions the model with examples to guide better responses.

## Key Concept

Few-shot prompting can be used as a technique to enable in-context learning where we provide demonstrations in the prompt to steer the model to better performance. The demonstrations establish a pattern that helps models tackle more complex tasks.

## Historical Context

This capability emerged when models reached sufficient scale. According to research, the few-shot property wasn't evident in earlier, smaller models until scaling reached particular thresholds.

## Practical Example

A classic demonstration involves teaching a model to use new words in sentences:

**Task**: Use newly introduced words correctly in sentences by providing one example per word.

**Result**: Models successfully generated appropriate sentences after seeing just one demonstration, showing they internalized the pattern from minimal input.

## Design Principles from Research

Key findings suggest that:

- Label space and input distribution matter significantly, regardless of label accuracy
- Format consistency enhances performance even with randomized labels
- Selecting labels from actual distributions outperforms uniform distributions

## Important Limitations

Few-shot prompting struggles with complex reasoning tasks. When tested on arithmetic reasoning problems, the technique produced incorrect answers despite multiple demonstrations, suggesting more advanced methods are necessary for sophisticated cognitive tasks.

## Next Steps

When few-shot approaches prove insufficient, practitioners should explore chain-of-thought prompting or fine-tuning strategies.

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

# Layout Structure (이 구조대로 배치해주세요)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: FEW-SHOT PROMPTING 🍌                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ 📖 WHAT IS FEW-SHOT? (전체 너비)                               │ │
│  │                                                                │ │
│  │   Zero-shot          →        Few-shot                        │ │
│  │   ┌─────────┐                 ┌─────────┐                     │ │
│  │   │ 지시만  │    + 예시들 →    │ 지시 +  │                     │ │
│  │   │  제공   │                 │ 예시들  │                     │ │
│  │   └─────────┘                 └─────────┘                     │ │
│  │                                                                │ │
│  │   "In-context learning을 통해 모델 성능 향상"                   │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ FEW-SHOT PROMPT ANATOMY (이 섹션이 핵심!)                       │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                                │ │
│  │   ┌─────────────────────────────────────────────┐             │ │
│  │   │ Example 1: Input → Output                   │             │ │
│  │   ├─────────────────────────────────────────────┤             │ │
│  │   │ Example 2: Input → Output                   │             │ │
│  │   ├─────────────────────────────────────────────┤             │ │
│  │   │ Example 3: Input → Output                   │             │ │
│  │   ├─────────────────────────────────────────────┤             │ │
│  │   │ [New Input] → ???                           │ ← 모델이 예측│ │
│  │   └─────────────────────────────────────────────┘             │ │
│  │                                                                │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ ✅ DESIGN PRINCIPLES    │    │ ⚠️ LIMITATIONS                  ││
│  │                         │    │                                 ││
│  │ • Label space 중요      │    │ • 복잡한 추론 어려움             ││
│  │ • Format 일관성 유지    │    │ • 산술 문제 실패                 ││
│  │ • 실제 분포의 레이블    │    │ → CoT 또는 Fine-tuning 필요     ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  🎯 ZERO-SHOT vs FEW-SHOT 비교표                                    │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ [표: 예시 수, 토큰, 적합 작업, 복잡도 비교]                      │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

**배치 비율**:
- 상단 (15%): 타이틀
- 중상단 (20%): What is Few-shot (개념 비교 다이어그램)
- 중앙 (35%): Few-shot Prompt Anatomy (가장 넓게!)
- 중하단 (15%): Design Principles + Limitations (좌우 분할)
- 하단 (15%): 비교표

# Content Details (레이아웃 각 섹션에 들어갈 내용)

## 📖 WHAT IS FEW-SHOT? (상단)

**핵심 개념 비교 다이어그램:**
```
Zero-shot                    Few-shot
┌─────────┐                  ┌─────────┐
│ Task    │    + Examples    │ Task    │
│ Instruc │  ─────────────→  │ Instruc │
│ tion    │                  │ + Demo  │
└─────────┘                  └─────────┘
     ↓                            ↓
  직접 추론                   패턴 학습 후 추론
```

**핵심 정의:**
> "In-context learning technique that improves model performance by providing demonstrations"

## ⚡ FEW-SHOT PROMPT ANATOMY (중앙 - 가장 넓게!)

**프롬프트 구조 상세:**

```
┌─────────────────────────────────────────────┐
│ [Task Instruction]                          │
│ Classify the sentiment:                     │
├─────────────────────────────────────────────┤
│ 📌 Example 1                                │
│ Text: "I love this!" → Positive             │
├─────────────────────────────────────────────┤
│ 📌 Example 2                                │
│ Text: "Terrible." → Negative                │
├─────────────────────────────────────────────┤
│ 📌 Example 3                                │
│ Text: "It's okay." → Neutral                │
├─────────────────────────────────────────────┤
│ ❓ New Input                                │
│ Text: "Could be better." →                  │
└─────────────────────────────────────────────┘
```

**예시 수 가이드:**
| 예시 수 | 명칭 | 권장 상황 |
|--------|------|----------|
| 0개 | Zero-shot | 단순 작업 |
| 1개 | One-shot | 패턴 명확 |
| 2-5개 | Few-shot | 일반적 권장 |
| 5개+ | Many-shot | 복잡한 작업 |

## ✅ DESIGN PRINCIPLES (좌측 하단)

**연구 기반 핵심 원칙:**
- ✓ **Label Space**: 레이블 공간과 입력 분포가 핵심
- ✓ **Format Consistency**: 일관된 형식 유지
- ✓ **Real Distribution**: 실제 분포에서 레이블 선택
- ✓ **Pattern Over Accuracy**: 형식이 정확도보다 중요할 수 있음

## ⚠️ LIMITATIONS (우측 하단)

**한계점:**
- ❌ 복잡한 추론 작업에서 실패
- ❌ 산술 문제 해결 어려움
- ❌ 토큰 비용 증가

**대안:**
- → Chain-of-Thought (CoT) 프롬프팅
- → Fine-tuning

## 🎯 비교표 (하단)

| 비교 | Zero-shot | Few-shot |
|------|-----------|----------|
| 예시 | ❌ 없음 | ✅ 2-5개 |
| 토큰 | 적음 | 많음 |
| 복잡도 | 단순 작업 | 중간 작업 |
| 패턴 학습 | ❌ | ✅ |
| **시작점** | 먼저 시도 | Zero-shot 실패 시 |

---

# Instructions

1. **스타일**: 첨부된 이미지의 손필기 느낌, 모눈종이 배경, 아이콘 스타일을 따라주세요.

2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치해주세요. 첨부 이미지의 레이아웃을 그대로 복사하지 마세요.

3. **언어**: 용어/고유명사는 영어(Few-shot, Zero-shot, In-context Learning, CoT 등), 설명은 한국어.

4. **핵심**: **Few-shot Prompt Anatomy 섹션을 가장 넓고 눈에 띄게** 배치해주세요. 이 콘텐츠의 핵심은 "Few-shot 프롬프트의 구조"입니다.

Please generate the Cheat Sheet now.

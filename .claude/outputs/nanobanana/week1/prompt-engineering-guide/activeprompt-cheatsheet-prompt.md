# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "Active-Prompt" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "Active-Prompt"
source_url: "https://www.promptingguide.ai/techniques/activeprompt"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Active-Prompt

Chain-of-thought (CoT) methods rely on a fixed set of human-annotated exemplars. The problem with this is that the exemplars might not be the most effective examples for the different tasks. To address this, Diao et al., (2023) proposed a new prompting approach called Active-Prompt to adapt LLMs to different task-specific example prompts (annotated with human-designed CoT reasoning).

## How Active-Prompt Works

Below is an illustration of the approach. The first step is to query the LLM with or without a few CoT examples. *k* possible answers are generated for a set of training questions. An uncertainty metric is calculated based on the *k* answers (disagreement used). The most uncertain questions are selected for annotation by humans. The new annotated exemplars are then used to infer each question.

The approach involves the following steps:

1. **Uncertainty Estimation**: Query the LLM with each question in the training set to generate *k* possible answers
2. **Disagreement Calculation**: Calculate uncertainty based on disagreement among the *k* answers
3. **Selection**: Select the most uncertain questions for human annotation
4. **Annotation**: Have humans provide CoT annotations for the selected questions
5. **Inference**: Use the newly annotated exemplars to perform inference on new questions

## Key Insight

The key innovation of Active-Prompt is that it dynamically selects which examples would be most useful for a specific task, rather than relying on fixed human-annotated examples. By measuring uncertainty (disagreement among multiple model outputs), the method identifies which examples need human annotation to improve performance.

## Reference

- Diao et al., (2023) - Active Prompting with Chain-of-Thought for Large Language Models

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

# Layout Structure (이 구조대로 배치해주세요)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: ACTIVE-PROMPT 🍌                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 📖 WHAT IS ACTIVE-PROMPT│    │ 🎯 PROBLEM & SOLUTION          ││
│  │                         │    │                                 ││
│  │ • Definition 박스       │    │  ┌───────────────┐             ││
│  │ • 핵심: 동적 예시 선택   │    │  │ Problem:      │             ││
│  │ • CoT 방법의 한계 해결   │    │  │ 고정된 예시   │             ││
│  │                         │    │  └───────┬───────┘             ││
│  └─────────────────────────┘    │          ▼                     ││
│                                  │  ┌───────────────┐             ││
│                                  │  │ Solution:     │             ││
│                                  │  │ 불확실성 기반 │             ││
│                                  │  │ 동적 선택     │             ││
│                                  │  └───────────────┘             ││
│                                  └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ 5-STEP WORKFLOW (이 섹션이 가장 넓어야 함 - 핵심!)              │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐  │  │
│  │   │   1.    │    │   2.    │    │   3.    │    │   4.    │  │  │
│  │   │Uncertainty│──▶│Disagreement│──▶│Selection│──▶│Annotation│ │  │
│  │   │Estimation│    │Calculation│    │         │    │         │ │  │
│  │   └─────────┘    └─────────┘    └─────────┘    └────┬────┘  │  │
│  │                                                      │       │  │
│  │                          ┌─────────┐                 │       │  │
│  │                          │   5.    │◀────────────────┘       │  │
│  │                          │Inference│                         │  │
│  │                          │         │                         │  │
│  │                          └─────────┘                         │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ 🔄 ACTIVE vs STANDARD CoT  │  │ 🎓 KEY TAKEAWAYS              ││
│  │                             │  │                               ││
│  │ Standard   │ Active-Prompt │  │ ✓ 불확실성 측정으로 예시 선택  ││
│  │ ───────────┼────────────── │  │ ✓ Task-specific 적응          ││
│  │ 고정 예시  │ 동적 예시     │  │ ✓ Human-in-the-loop 활용      ││
│  │ 일반적     │ Task 최적화   │  │ ✓ CoT 성능 개선               ││
│  │ 효율 낮음 │ 효율 높음     │  │                               ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**배치 비율**:
- 상단 (20%): 타이틀
- 중상단 (25%): Definition + Problem/Solution (좌우 분할)
- 중앙 (35%): 5-Step Workflow 다이어그램 (가장 넓게!)
- 하단 (20%): Comparison + Takeaways (좌우 분할)

# Content Details (레이아웃 각 섹션에 들어갈 내용)

## 📖 WHAT IS ACTIVE-PROMPT? (좌측 상단)

**Definition Box:**
> "Active-Prompt adapts LLMs to different task-specific example prompts using uncertainty-based selection."

**핵심 포인트:**
- 동적으로 예시를 선택하여 CoT 성능 향상
- 불확실성(disagreement) 기반 예시 선별
- Human annotation과 LLM을 결합한 접근법

## 🎯 PROBLEM & SOLUTION (우측 상단)

**문제:**
```
┌─────────────────────────────┐
│ ❌ Standard CoT의 한계      │
│                             │
│ • 고정된 human-annotated    │
│   예시 사용                 │
│ • 모든 task에 동일한 예시   │
│ • 최적화되지 않은 예시      │
└─────────────────────────────┘
```

**해결:**
```
┌─────────────────────────────┐
│ ✅ Active-Prompt 해결책     │
│                             │
│ • 불확실성 측정으로         │
│   동적 예시 선택            │
│ • Task별 최적화된 예시      │
│ • 효율적 annotation         │
└─────────────────────────────┘
```

## ⚡ 5-STEP WORKFLOW (중앙 - 가장 넓게!)

**파이프라인 다이어그램:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  STEP 1               STEP 2               STEP 3                  │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐         │
│  │ Uncertainty │      │ Disagreement│      │  Selection  │         │
│  │ Estimation  │─────▶│ Calculation │─────▶│             │         │
│  │             │      │             │      │             │         │
│  │ LLM에 질문  │      │ k개 답변의  │      │ 가장 불확실한│        │
│  │ k개 답변    │      │ 불일치 계산 │      │ 질문 선택   │         │
│  └─────────────┘      └─────────────┘      └──────┬──────┘         │
│                                                    │                │
│                                                    ▼                │
│                       STEP 5               STEP 4                  │
│                  ┌─────────────┐      ┌─────────────┐              │
│                  │  Inference  │      │ Annotation  │              │
│                  │             │◀─────│             │              │
│                  │             │      │             │              │
│                  │ 새 질문에   │      │ Human이 CoT │              │
│                  │ 적용        │      │ 주석 추가   │              │
│                  └─────────────┘      └─────────────┘              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**각 단계 설명:**

| Step | Name | Description | Output |
|------|------|-------------|--------|
| 1️⃣ | **Uncertainty Estimation** | 각 질문에 대해 LLM에 k번 쿼리 | k개의 가능한 답변 |
| 2️⃣ | **Disagreement Calculation** | k개 답변 간 불일치도 계산 | 불확실성 점수 |
| 3️⃣ | **Selection** | 가장 불확실한 질문들 선별 | 주석 대상 질문 목록 |
| 4️⃣ | **Annotation** | Human이 CoT 추론 주석 작성 | 새로운 exemplars |
| 5️⃣ | **Inference** | 새 exemplars로 추론 수행 | 최종 답변 |

## 🔄 ACTIVE vs STANDARD CoT (좌측 하단)

| 비교 | Standard CoT | Active-Prompt |
|------|--------------|---------------|
| 예시 선택 | 고정 (Fixed) | 동적 (Dynamic) |
| Task 적응 | ❌ 없음 | ✅ Task-specific |
| 효율성 | 낮음 | 높음 |
| Human 노력 | 많음 (전체) | 적음 (선별적) |
| 성능 | 일반적 | 최적화됨 |

## 🎓 KEY TAKEAWAYS (우측 하단)

- ✓ **불확실성 기반 선택**: Disagreement로 annotation이 필요한 예시 식별
- ✓ **Task-specific 적응**: 각 task에 최적화된 예시 자동 선별
- ✓ **Human-in-the-loop**: 효율적인 human annotation 활용
- ✓ **CoT 성능 개선**: 고정 예시 대비 성능 향상
- ✓ **확장성**: 다양한 task에 적용 가능

---

# Instructions

1. **스타일**: 첨부된 이미지의 손필기 느낌, 모눈종이 배경, 아이콘 스타일을 따라주세요.

2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치해주세요. 첨부 이미지의 레이아웃을 그대로 복사하지 마세요.

3. **언어**: 용어/고유명사는 영어(Active-Prompt, CoT, Chain-of-Thought, LLM, Uncertainty, Disagreement 등), 설명은 한국어.

4. **핵심**: **5-Step Workflow 섹션을 가장 넓고 눈에 띄게** 배치해주세요. 이 콘텐츠의 핵심은 "Active-Prompt의 5단계 프로세스"입니다.

Please generate the Cheat Sheet now.

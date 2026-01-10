# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "Chain-of-Thought Prompting" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "Chain-of-Thought Prompting"
source_url: "https://www.promptingguide.ai/techniques/cot"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Chain-of-Thought Prompting

## Definition and Overview

Chain-of-thought (CoT) prompting enables complex reasoning capabilities through intermediate reasoning steps. Introduced by Wei et al. (2022), this technique allows LLMs to work through multi-step problems by showing their reasoning process rather than jumping directly to answers.

## Core Concept

CoT prompting works by demonstrating step-by-step reasoning. The technique is particularly effective when combined with few-shot prompting for complex tasks requiring analytical thinking.

## Example 1: Odd Numbers Task

**Prompt:**
```
The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.
A: Adding all the odd numbers (9, 15, 1) gives 25. The answer is False.

The odd numbers in this group add up to an even number: 17, 10, 19, 4, 8, 12, 24.
A: Adding all the odd numbers (17, 19) gives 36. The answer is True.

The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.
A:
```

**Output:**
```
Adding all the odd numbers (15, 5, 13, 7, 1) gives 41. The answer is False.
```

## Zero-Shot CoT Prompting

A simplified approach that works without examples by adding a single phrase: **"Let's think step by step."**

### Example 2: Apple Counting Problem

**Without CoT:** 11 apples (incorrect)

**With Zero-Shot CoT:**
```
I went to the market and bought 10 apples. I gave 2 apples to the neighbor
and 2 to the repairman. I then went and bought 5 more apples and ate 1.
How many apples did I remain with?

Let's think step by step.
```

**Output:** 10 apples (correct)

## Automatic Chain-of-Thought (Auto-CoT)

Zhang et al. (2022) proposed automating the demonstration creation process.

**Two-Stage Process:**
1. **Question Clustering:** Partition dataset questions into clusters
2. **Demonstration Sampling:** Select representative questions and generate reasoning chains

## Key Takeaways

- CoT prompting dramatically improves performance on reasoning tasks
- Works best with sufficiently large language models
- "Let's think step by step" is a simple, effective zero-shot alternative
- Automation can scale CoT demonstrations while maintaining quality

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

# Layout Structure (이 구조대로 배치해주세요)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: CHAIN-OF-THOUGHT (CoT) 🍌              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 📖 WHAT IS CoT?         │    │ 🎯 THREE TYPES OF CoT           ││
│  │                         │    │                                 ││
│  │  Standard    →   CoT    │    │  ┌─────────┐                    ││
│  │  Prompting      Prompt  │    │  │Few-shot │ 예시 + 추론과정    ││
│  │  ┌────┐        ┌────┐   │    │  │  CoT    │                    ││
│  │  │Q→A │   →    │Q→  │   │    │  └────┬────┘                    ││
│  │  └────┘        │추론│   │    │       │                         ││
│  │                │→A  │   │    │  ┌────┴────┐                    ││
│  │                └────┘   │    │  │Zero-shot│ "Let's think..."   ││
│  │                         │    │  │  CoT    │                    ││
│  └─────────────────────────┘    │  └────┬────┘                    ││
│                                  │       │                         ││
│                                  │  ┌────┴────┐                    ││
│                                  │  │Auto-CoT │ 자동 생성          ││
│                                  │  └─────────┘                    ││
│                                  └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ CoT IN ACTION (이 섹션이 가장 넓어야 함 - 핵심!)                 │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                                │ │
│  │  WITHOUT CoT                    WITH CoT                      │ │
│  │  ┌─────────────────┐           ┌─────────────────┐            │ │
│  │  │ Q: 10사과-2-2+5-1│           │ Q: 10사과-2-2+5-1│            │ │
│  │  │                 │           │                 │            │ │
│  │  │ A: 11 ❌        │           │ Step 1: 10-2=8  │            │ │
│  │  │                 │           │ Step 2: 8-2=6   │            │ │
│  │  └─────────────────┘           │ Step 3: 6+5=11  │            │ │
│  │                                │ Step 4: 11-1=10 │            │ │
│  │                                │ A: 10 ✅        │            │ │
│  │                                └─────────────────┘            │ │
│  │                                                                │ │
│  └───────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ 💡 MAGIC PHRASE             │  │ 🎓 KEY TAKEAWAYS              ││
│  │                             │  │                               ││
│  │ "Let's think step by step." │  │ ✓ 복잡한 추론에 효과적        ││
│  │                             │  │ ✓ 큰 모델에서 더 효과적       ││
│  │  → Zero-shot CoT 활성화     │  │ ✓ 자동화 가능 (Auto-CoT)     ││
│  │  → 단 한 줄로 성능 향상     │  │ ✓ 산술/논리 문제 해결        ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**배치 비율**:
- 상단 (15%): 타이틀
- 중상단 (25%): What is CoT + Three Types (좌우 분할)
- 중앙 (40%): CoT In Action - Before/After 비교 (가장 넓게!)
- 하단 (20%): Magic Phrase + Key Takeaways (좌우 분할)

# Content Details (레이아웃 각 섹션에 들어갈 내용)

## 📖 WHAT IS CoT? (좌측 상단)

**개념 비교:**
```
Standard Prompting          CoT Prompting
┌─────────┐                ┌─────────────┐
│ Q → A   │      →         │ Q → 추론    │
│ (바로)  │                │    → 추론   │
└─────────┘                │    → A     │
                           └─────────────┘
```

**핵심 정의:**
> "Intermediate reasoning steps를 통해 complex reasoning을 가능하게 하는 기법"
> Wei et al. (2022)

## 🎯 THREE TYPES OF CoT (우측 상단)

**세 가지 유형 다이어그램:**
```
┌─────────────────────┐
│ 1. Few-shot CoT     │ → 예시에 추론과정 포함
├─────────────────────┤
│ 2. Zero-shot CoT    │ → "Let's think step by step"
├─────────────────────┤
│ 3. Auto-CoT         │ → 자동 예시 생성
└─────────────────────┘
```

## ⚡ CoT IN ACTION (중앙 - 가장 넓게!)

**Before/After 비교:**

| 단계 | Without CoT | With CoT |
|------|-------------|----------|
| 입력 | 10개 사과, -2-2+5-1 | 동일 |
| 과정 | (없음) | Step 1: 10-2=8 |
|      |        | Step 2: 8-2=6 |
|      |        | Step 3: 6+5=11 |
|      |        | Step 4: 11-1=10 |
| 결과 | 11 ❌ | 10 ✅ |

**실제 프롬프트 예시:**
```
Q: The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.

A: Adding all the odd numbers (15, 5, 13, 7, 1) gives 41.
   41 is odd, so the answer is False.
```

## 💡 MAGIC PHRASE (좌측 하단)

**Zero-shot CoT 활성화:**
```
"Let's think step by step."
```

- 한 줄 추가만으로 CoT 활성화
- 예시 없이도 추론 과정 유도
- 간단하지만 강력한 효과

## 🎓 KEY TAKEAWAYS (우측 하단)

- ✓ **복잡한 추론 작업에 필수** (산술, 논리, 상식 추론)
- ✓ **대형 모델에서 효과 극대화** (GPT-4, Claude 3)
- ✓ **"Let's think step by step"** = 간단한 Zero-shot 대안
- ✓ **Auto-CoT로 자동화 가능** (Zhang et al., 2022)
- ✓ **Few-shot과 결합 시 최적**

---

# Instructions

1. **스타일**: 첨부된 이미지의 손필기 느낌, 모눈종이 배경, 아이콘 스타일을 따라주세요.

2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치해주세요. 첨부 이미지의 레이아웃을 그대로 복사하지 마세요.

3. **언어**: 용어/고유명사는 영어(Chain-of-Thought, CoT, Zero-shot, Few-shot, Auto-CoT 등), 설명은 한국어.

4. **핵심**: **CoT In Action 섹션 (Before/After 비교)을 가장 넓고 눈에 띄게** 배치해주세요. 이 콘텐츠의 핵심은 "CoT가 어떻게 추론을 개선하는지"입니다.

Please generate the Cheat Sheet now.

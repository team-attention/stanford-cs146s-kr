# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "Generated Knowledge Prompting" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "Generated Knowledge Prompting"
source_url: "https://www.promptingguide.ai/techniques/knowledge"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Generated Knowledge Prompting

## Overview

Generated Knowledge Prompting is a technique that enhances LLM performance by instructing models to "generate knowledge before making a prediction." Rather than relying solely on existing parameters, the model first produces relevant information to support more accurate outputs.

## The Problem

Standard LLM responses often fail on tasks requiring world knowledge. For example, when asked "Part of golf is trying to get a higher point total than others. Yes or No?" the model incorrectly answered "Yes" without proper contextual understanding.

## The Solution: Multi-Step Approach

### Step 1: Generate Knowledge
The technique prompts the model to produce relevant facts about the subject.

### Step 2: Integrate and Predict
The generated knowledge is then incorporated into a reformatted prompt to guide the model toward an accurate answer.

## Key Results

When knowledge was integrated, the model provided confidence-weighted answers correctly.

## Research Foundation

This technique was introduced by Liu et al. (2022) and addresses limitations in commonsense reasoning tasks.

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

# Layout Structure (이 구조대로 배치해주세요)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: GENERATED KNOWLEDGE PROMPTING 🍌       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 📖 WHAT IS IT?          │    │ ❌ THE PROBLEM                  ││
│  │                         │    │                                 ││
│  │ "예측 전에 지식을       │    │  Q: 골프는 점수가 높을수록     ││
│  │  먼저 생성하라"         │    │     좋다? Yes/No               ││
│  │                         │    │                                 ││
│  │ Liu et al. (2022)       │    │  A: Yes ❌ (오답!)              ││
│  │                         │    │  → 세계 지식 부족               ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ TWO-STEP PROCESS (이 섹션이 가장 넓어야 함!)                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                                │ │
│  │   STEP 1: GENERATE KNOWLEDGE                                  │ │
│  │   ┌─────────────────────────────────────────────────────────┐ │ │
│  │   │ "골프에 대한 사실을 생성해주세요"                          │ │ │
│  │   │                                                          │ │ │
│  │   │ → Knowledge 1: 골프는 최소 타수로 홀을 완료하는 스포츠   │ │ │
│  │   │ → Knowledge 2: 가장 낮은 점수가 승리                      │ │ │
│  │   └─────────────────────────────────────────────────────────┘ │ │
│  │                           ↓                                    │ │
│  │   STEP 2: INTEGRATE & PREDICT                                 │ │
│  │   ┌─────────────────────────────────────────────────────────┐ │ │
│  │   │ Context: [생성된 지식]                                    │ │ │
│  │   │ Q: 골프는 높은 점수가 좋다? Yes/No                        │ │ │
│  │   │                                                          │ │ │
│  │   │ → A: No ✅ (골프는 낮은 점수가 좋음)                      │ │ │
│  │   └─────────────────────────────────────────────────────────┘ │ │
│  │                                                                │ │
│  └───────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ 🎯 WHEN TO USE             │  │ 🎓 KEY TAKEAWAYS              ││
│  │                             │  │                               ││
│  │ • 상식/세계 지식 필요 시    │  │ ✓ 예측 전 지식 생성          ││
│  │ • 사실 확인 작업            │  │ ✓ 상식 추론 개선              ││
│  │ • QA 시스템                 │  │ ✓ 2단계: 생성 → 통합         ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**배치 비율**:
- 상단 (15%): 타이틀
- 중상단 (20%): What is it + The Problem (좌우 분할)
- 중앙 (45%): Two-Step Process (가장 넓게!)
- 하단 (20%): When to Use + Key Takeaways (좌우 분할)

# Content Details

## 📖 WHAT IS IT? (좌측 상단)

**핵심 개념:**
> "Generate knowledge before making a prediction"
> 예측 전에 관련 지식을 먼저 생성

**출처:** Liu et al. (2022)

## ❌ THE PROBLEM (우측 상단)

**기존 LLM의 한계:**
```
Q: Part of golf is trying to get a higher point total than others. Yes or No?
A: Yes ❌

→ 세계 지식(World Knowledge) 부족
→ 상식 추론 실패
```

## ⚡ TWO-STEP PROCESS (중앙 - 가장 넓게!)

**Step 1: Generate Knowledge**
```
Prompt: "골프에 대한 사실들을 생성해주세요"

Output:
- Knowledge 1: "골프는 정해진 홀을 최소 타수로 완료하는 스포츠"
- Knowledge 2: "총 타수로 승자를 결정하며, 낮은 점수가 좋음"
```

**Step 2: Integrate & Predict**
```
Context: [생성된 지식 포함]
Question: 골프는 높은 점수를 얻으려 한다. Yes/No?

Answer: No ✅ (골프는 낮은 점수가 목표)
```

## 🎯 WHEN TO USE (좌측 하단)

- 상식/세계 지식이 필요한 작업
- 사실 확인(Fact Verification) 작업
- QA 시스템
- Commonsense Reasoning

## 🎓 KEY TAKEAWAYS (우측 하단)

- ✓ **"예측 전 지식 생성"** 이 핵심 원칙
- ✓ **상식 추론 작업 성능 향상**
- ✓ **2단계 프로세스**: Generate → Integrate
- ✓ **Liu et al. (2022)** 연구 기반

---

# Instructions

1. **스타일**: 첨부된 이미지의 손필기 느낌, 모눈종이 배경, 아이콘 스타일을 따라주세요.

2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치해주세요. 첨부 이미지의 레이아웃을 그대로 복사하지 마세요.

3. **언어**: 용어/고유명사는 영어(Generated Knowledge Prompting, World Knowledge, Commonsense Reasoning 등), 설명은 한국어.

4. **핵심**: **Two-Step Process를 가장 넓고 눈에 띄게** 배치해주세요. 이 콘텐츠의 핵심은 "지식 생성 → 통합 → 예측" 프로세스입니다.

Please generate the Cheat Sheet now.

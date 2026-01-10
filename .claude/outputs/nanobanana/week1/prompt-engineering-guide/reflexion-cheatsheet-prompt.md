# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "Reflexion" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "Reflexion"
source_url: "https://www.promptingguide.ai/techniques/reflexion"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Reflexion

## Overview

Reflexion is a framework designed to enhance language-based agents through linguistic feedback. The core mechanism converts environmental feedback into linguistic self-reflection, which becomes context for subsequent agent iterations.

## Framework Components

**Actor**: Generates text and actions based on observations, using Chain-of-Thought and ReAct methodologies.

**Evaluator**: Scores the Actor's outputs by analyzing trajectories and generating reward scores.

**Self-Reflection**: An LLM-based component generating verbal reinforcement cues for targeted feedback.

## Process Flow

The methodology follows: define task → generate trajectory → evaluate → reflect → generate next trajectory.

## Performance Results

- Decision-making: ReAct + Reflexion completed 130/134 AlfWorld tasks
- Reasoning: Outperformed baseline approaches on HotPotQA
- Programming: State-of-the-art results on HumanEval, MBPP, and Leetcode Hard

## Ideal Use Cases

- Agents must learn from trial-and-error experiences
- Traditional reinforcement learning proves impractical
- Nuanced, interpretable feedback is essential

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

# Layout Structure (이 구조대로 배치해주세요)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: REFLEXION 🍌                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 📖 WHAT IS REFLEXION?   │    │ 🧩 THREE COMPONENTS             ││
│  │                         │    │                                 ││
│  │ "언어적 자기 성찰을     │    │  ┌─────────┐                    ││
│  │  통한 에이전트 개선"    │    │  │  Actor  │ 행동 생성          ││
│  │                         │    │  └────┬────┘                    ││
│  │ 실패 → 반성 → 개선      │    │       ↓                         ││
│  │                         │    │  ┌─────────┐                    ││
│  │ 언어 기반 피드백 루프   │    │  │Evaluator│ 평가/점수화        ││
│  │                         │    │  └────┬────┘                    ││
│  │                         │    │       ↓                         ││
│  │                         │    │  ┌─────────┐                    ││
│  │                         │    │  │Self-Ref │ 자기 성찰          ││
│  │                         │    │  └─────────┘                    ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ REFLEXION LOOP (이 섹션이 가장 넓어야 함!)                       │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                                │ │
│  │   ┌──────────┐     ┌──────────┐     ┌──────────┐              │ │
│  │   │  Task    │ ──→ │Trajectory│ ──→ │ Evaluate │              │ │
│  │   │  정의    │     │  생성    │     │  평가    │              │ │
│  │   └──────────┘     └──────────┘     └────┬─────┘              │ │
│  │                                          │                     │ │
│  │                                     실패? │ 성공?              │ │
│  │                                          │                     │ │
│  │   ┌──────────────────────────────────────┘                     │ │
│  │   │                                                            │ │
│  │   ↓ 실패                                       성공 → 완료 ✅  │ │
│  │   ┌──────────┐     ┌──────────┐                               │ │
│  │   │ Reflect  │ ──→ │ Memory   │ ──→ 다음 시도                 │ │
│  │   │ 자기성찰 │     │ 저장     │                               │ │
│  │   └──────────┘     └──────────┘                               │ │
│  │                                                                │ │
│  │   "이전 시도에서 X가 잘못됐다. 다음엔 Y를 시도해야겠다"        │ │
│  │                                                                │ │
│  └───────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ 📊 PERFORMANCE              │  │ 🎓 KEY TAKEAWAYS              ││
│  │                             │  │                               ││
│  │ AlfWorld: 130/134 ✅        │  │ ✓ Trial-and-error 학습       ││
│  │ HotPotQA: Baseline 초과    │  │ ✓ 언어적 자기 성찰            ││
│  │ HumanEval: SOTA            │  │ ✓ 메모리에 경험 저장          ││
│  │ Leetcode Hard: SOTA        │  │ ✓ 해석 가능한 피드백          ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**배치 비율**:
- 상단 (15%): 타이틀
- 중상단 (20%): What is Reflexion + Three Components (좌우 분할)
- 중앙 (45%): Reflexion Loop 플로우차트 (가장 넓게!)
- 하단 (20%): Performance + Key Takeaways (좌우 분할)

# Content Details

## 📖 WHAT IS REFLEXION? (좌측 상단)

**핵심 개념:**
- 언어적 자기 성찰(Linguistic Self-Reflection)
- 실패 → 반성 → 개선 루프
- RL 없이 언어 기반 피드백

## 🧩 THREE COMPONENTS (우측 상단)

| 컴포넌트 | 역할 |
|---------|------|
| **Actor** | 행동/텍스트 생성 (CoT, ReAct 사용) |
| **Evaluator** | 궤적 분석, 보상 점수 생성 |
| **Self-Reflection** | 언어적 강화 큐 생성 |

## ⚡ REFLEXION LOOP (중앙 - 가장 넓게!)

**플로우:**
```
Task → Trajectory → Evaluate
                      │
                 ┌────┴────┐
                 ↓         ↓
              실패       성공 → 완료 ✅
                 ↓
            Reflect (자기 성찰)
                 ↓
            Memory 저장
                 ↓
            다음 시도 →  (루프 반복)
```

**성찰 예시:**
> "이전 시도에서 함수 이름을 잘못 사용했다.
> 다음에는 문서를 먼저 확인해야겠다."

## 📊 PERFORMANCE (좌측 하단)

| 벤치마크 | 결과 |
|---------|------|
| AlfWorld | 130/134 완료 |
| HotPotQA | Baseline 초과 |
| HumanEval | SOTA |
| Leetcode Hard | SOTA |

## 🎓 KEY TAKEAWAYS (우측 하단)

- ✓ **Trial-and-error 학습** 지원
- ✓ **언어적 자기 성찰** (자연어 피드백)
- ✓ **메모리에 경험 저장** (에피소딕 메모리)
- ✓ **해석 가능한 피드백**
- ✓ RL 대안으로 효과적

---

# Instructions

1. **스타일**: 첨부된 이미지의 손필기 느낌, 모눈종이 배경, 아이콘 스타일을 따라주세요.

2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치해주세요. 첨부 이미지의 레이아웃을 그대로 복사하지 마세요.

3. **언어**: 용어/고유명사는 영어(Reflexion, Actor, Evaluator, Self-Reflection, Memory 등), 설명은 한국어.

4. **핵심**: **Reflexion Loop 플로우차트를 가장 넓고 눈에 띄게** 배치해주세요. 이 콘텐츠의 핵심은 "실패 → 성찰 → 개선" 루프입니다.

Please generate the Cheat Sheet now.

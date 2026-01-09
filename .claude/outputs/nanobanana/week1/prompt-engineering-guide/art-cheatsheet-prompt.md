# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "ART (Automatic Reasoning and Tool-use)" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "Automatic Reasoning and Tool-use"
source_url: "https://www.promptingguide.ai/techniques/art"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Automatic Reasoning and Tool-use (ART)

## Overview

ART is a framework that merges chain-of-thought prompting with tool integration in an interleaved fashion. According to the research, it uses "a frozen LLM to automatically generate intermediate reasoning steps as a program."

## How ART Works

The methodology follows these steps:

1. **Selection**: When encountering a new task, the system retrieves relevant multi-step reasoning and tool-use examples from a task library
2. **Execution**: During testing, generation pauses when external tools need to be called
3. **Integration**: Tool outputs are incorporated, then generation resumes

This approach enables models to generalize from examples and decompose unfamiliar tasks while knowing when to leverage appropriate tools—all without requiring task-specific training.

## Key Advantages

- **Extensibility**: Humans can refine reasoning steps or introduce new tools by updating libraries
- **Performance**: ART substantially outperforms few-shot prompting and automatic chain-of-thought on previously unseen BigBench and MMLU tasks
- **Flexibility**: When incorporating human feedback, it surpasses hand-crafted chain-of-thought prompts

## Source

The framework was introduced by Paranjape et al. (2023) and represents a significant advancement in combining reasoning and tool integration for complex problem-solving with language models.

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

# Layout Structure (이 구조대로 배치해주세요)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: ART (Automatic Reasoning & Tool-use) 🍌│
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 📖 WHAT IS ART?        │    │ 🔧 CORE CONCEPT                 ││
│  │                         │    │                                 ││
│  │ • Definition 박스       │    │  ┌─────────┐   ┌─────────┐     ││
│  │ • CoT + Tool 통합       │    │  │   CoT   │ + │  Tools  │     ││
│  │ • Frozen LLM 활용       │    │  │Reasoning│   │Integration│    ││
│  │                         │    │  └────┬────┘   └────┬────┘     ││
│  └─────────────────────────┘    │       └──────┬──────┘          ││
│                                  │              ▼                 ││
│                                  │        ┌─────────┐             ││
│                                  │        │   ART   │             ││
│                                  │        └─────────┘             ││
│                                  └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ ART WORKFLOW (이 섹션이 가장 넓어야 함 - 핵심!)                  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │  New Task → [Selection] → [Execution ⟷ Tool Call] → Output │  │
│  │                              ↑                               │  │
│  │                        [Integration]                         │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ ✨ KEY ADVANTAGES          │  │ 🎓 KEY TAKEAWAYS              ││
│  │                             │  │                               ││
│  │ • Extensibility            │  │ ✓ CoT + Tool 자동 결합        ││
│  │ • Performance              │  │ ✓ Task-specific 학습 불필요   ││
│  │ • Flexibility              │  │ ✓ BigBench/MMLU 성능 우수     ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**배치 비율**:
- 상단 (20%): 타이틀
- 중상단 (25%): Definition + Core Concept (좌우 분할)
- 중앙 (35%): ART Workflow 다이어그램 (가장 넓게!)
- 하단 (20%): Advantages + Takeaways (좌우 분할)

# Content Details (레이아웃 각 섹션에 들어갈 내용)

## 📖 WHAT IS ART? (좌측 상단)

**Definition Box:**
> "ART is a framework that merges chain-of-thought prompting with tool integration in an interleaved fashion."

**핵심 포인트:**
- Chain-of-Thought + Tool 통합 프레임워크
- Frozen LLM으로 중간 추론 단계 자동 생성
- Task-specific 학습 없이 일반화 가능
- Paranjape et al. (2023) 제안

## 🔧 CORE CONCEPT (우측 상단)

**ART의 핵심 아이디어:**
```
┌───────────────────────────────────────┐
│                                       │
│   ┌─────────────┐   ┌─────────────┐  │
│   │ Chain-of-   │   │    Tool     │  │
│   │  Thought    │ + │ Integration │  │
│   │  Prompting  │   │             │  │
│   └──────┬──────┘   └──────┬──────┘  │
│          │                 │         │
│          └────────┬────────┘         │
│                   ▼                  │
│          ┌─────────────────┐         │
│          │      ART        │         │
│          │                 │         │
│          │ • 자동 추론     │         │
│          │ • 도구 호출     │         │
│          │ • Interleaved   │         │
│          └─────────────────┘         │
│                                       │
└───────────────────────────────────────┘
```

## ⚡ ART WORKFLOW (중앙 - 가장 넓게!)

**3단계 워크플로우 다이어그램:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ┌──────────┐                                                     │
│   │ New Task │                                                     │
│   └────┬─────┘                                                     │
│        │                                                           │
│        ▼                                                           │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  STEP 1: SELECTION                                          │  │
│   │  ┌─────────────────────────────────────────────────────┐    │  │
│   │  │ Task Library에서 관련 예시 검색                      │    │  │
│   │  │ • Multi-step reasoning 예시                          │    │  │
│   │  │ • Tool-use 예시                                      │    │  │
│   │  └─────────────────────────────────────────────────────┘    │  │
│   └───────────────────────────┬─────────────────────────────────┘  │
│                               │                                    │
│                               ▼                                    │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  STEP 2: EXECUTION (with Tool Calls)                        │  │
│   │  ┌─────────────────────────────────────────────────────┐    │  │
│   │  │                                                     │    │  │
│   │  │  생성 시작 ──▶ 도구 필요? ──YES──▶ 🔧 Tool Call     │    │  │
│   │  │      │              │                    │          │    │  │
│   │  │      │             NO                    │          │    │  │
│   │  │      │              │                    ▼          │    │  │
│   │  │      │              ▼              Tool Output      │    │  │
│   │  │      │         계속 생성 ◀──────────────┘          │    │  │
│   │  │      │                                              │    │  │
│   │  └──────┴──────────────────────────────────────────────┘    │  │
│   └───────────────────────────┬─────────────────────────────────┘  │
│                               │                                    │
│                               ▼                                    │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  STEP 3: INTEGRATION                                        │  │
│   │  ┌─────────────────────────────────────────────────────┐    │  │
│   │  │ Tool output을 추론에 통합 → 최종 출력 생성          │    │  │
│   │  └─────────────────────────────────────────────────────┘    │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**각 단계 설명:**

| Step | Name | Description |
|------|------|-------------|
| 1️⃣ | **Selection** | 새 task 발생 시 Task Library에서 관련 multi-step reasoning & tool-use 예시 검색 |
| 2️⃣ | **Execution** | 생성 중 외부 도구 호출 필요 시 일시 정지 → Tool 호출 → 결과 수신 |
| 3️⃣ | **Integration** | Tool output을 추론 과정에 통합하고 생성 재개 |

## ✨ KEY ADVANTAGES (좌측 하단)

| 장점 | 설명 |
|------|------|
| **🔄 Extensibility** | 라이브러리 업데이트로 추론 단계 개선 또는 새 도구 추가 가능 |
| **📈 Performance** | Few-shot, Auto-CoT보다 BigBench/MMLU에서 우수한 성능 |
| **🎯 Flexibility** | Human feedback 통합 시 Hand-crafted CoT 능가 |

## 🎓 KEY TAKEAWAYS (우측 하단)

- ✓ **CoT + Tool 자동 결합**: 추론과 도구 사용을 interleaved 방식으로 통합
- ✓ **Task-specific 학습 불필요**: 예시 기반 일반화로 새로운 task 처리
- ✓ **Frozen LLM 활용**: 모델 수정 없이 프레임워크만으로 동작
- ✓ **Human-in-the-loop 지원**: 라이브러리 업데이트로 지속적 개선 가능
- ✓ **벤치마크 우수 성능**: BigBench, MMLU에서 기존 방법 능가

---

# Instructions

1. **스타일**: 첨부된 이미지의 손필기 느낌, 모눈종이 배경, 아이콘 스타일을 따라주세요.

2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치해주세요. 첨부 이미지의 레이아웃을 그대로 복사하지 마세요.

3. **언어**: 용어/고유명사는 영어(ART, Chain-of-Thought, CoT, Tool Integration, Frozen LLM, BigBench, MMLU 등), 설명은 한국어.

4. **핵심**: **ART Workflow 섹션을 가장 넓고 눈에 띄게** 배치해주세요. 이 콘텐츠의 핵심은 "Selection → Execution (with Tool Calls) → Integration"의 interleaved 워크플로우입니다.

Please generate the Cheat Sheet now.

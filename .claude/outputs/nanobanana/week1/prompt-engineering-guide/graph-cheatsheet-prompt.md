# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "Graph Prompting" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "Graph Prompting"
source_url: "https://www.promptingguide.ai/techniques/graph"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Graph Prompting

## Overview

**GraphPrompts**는 Liu et al. (2023)이 소개한 프롬프팅 프레임워크로, 그래프 관련 다운스트림 태스크의 성능을 향상시키기 위해 설계되었습니다. 이 프레임워크는 AI 모델을 위한 구조화된 프롬프팅 방법론의 발전을 나타냅니다.

## 현재 상태

이 가이드 섹션은 현재 개발 중입니다. 원본 페이지에서 "More coming soon!"이라고 안내하고 있습니다.

## 관련 학습 자료

1. **Prompt Engineering for LLMs** (초급, 2시간)
   - Graph prompting 및 고급 기법 다룸

2. **Building Effective AI Agents** (중급, 5시간)
   - Function calling 및 도구 통합에 초점

## 참고 자료

- Liu et al. (2023) - GraphPrompts 연구 논문
- 원본 가이드: Prompt Engineering Guide - Graph Prompting

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

# Layout Structure (이 구조대로 배치해주세요)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: GRAPH PROMPTING 🍌                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 📖 WHAT IS GRAPH       │    │ 🎯 USE CASES                    ││
│  │    PROMPTING?          │    │                                 ││
│  │                         │    │  • Knowledge Graph QA          ││
│  │ • Definition 박스       │    │  • Graph Classification        ││
│  │ • 그래프 기반 태스크    │    │  • Node/Edge Prediction        ││
│  │   성능 향상             │    │  • Social Network Analysis     ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ GRAPH PROMPTING CONCEPT (이 섹션이 가장 넓어야 함 - 핵심!)      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │     ┌─────────┐                     ┌─────────┐             │  │
│  │     │  Graph  │ + Graph Prompt ───▶ │   LLM   │──▶ Output  │  │
│  │     │  Data   │                     │         │             │  │
│  │     └─────────┘                     └─────────┘             │  │
│  │                                                              │  │
│  │     Graph Structure → Structured Prompt → Enhanced Output   │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ 📚 RELATED RESOURCES       │  │ 🎓 KEY TAKEAWAYS              ││
│  │                             │  │                               ││
│  │ • Liu et al. (2023)        │  │ ✓ 그래프 구조 활용 프롬프팅   ││
│  │ • Prompt Engineering Guide │  │ ✓ 다운스트림 태스크 성능↑     ││
│  │ • Building AI Agents       │  │ ✓ 구조화된 데이터 처리        ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**배치 비율**:
- 상단 (20%): 타이틀
- 중상단 (25%): Definition + Use Cases (좌우 분할)
- 중앙 (35%): Graph Prompting Concept 다이어그램 (가장 넓게!)
- 하단 (20%): Resources + Takeaways (좌우 분할)

# Content Details (레이아웃 각 섹션에 들어갈 내용)

## 📖 WHAT IS GRAPH PROMPTING? (좌측 상단)

**Definition Box:**
> "GraphPrompts is a prompting framework designed to improve performance on graph-related downstream tasks."

**핵심 포인트:**
- 그래프 구조 데이터를 위한 프롬프팅 프레임워크
- 그래프 관련 다운스트림 태스크 성능 향상
- 구조화된 프롬프팅 방법론의 발전
- Liu et al. (2023) 제안

## 🎯 USE CASES (우측 상단)

**주요 활용 분야:**
```
┌─────────────────────────────────────┐
│ 📊 Graph Prompting 활용 분야        │
│                                     │
│ 🔹 Knowledge Graph QA              │
│    지식 그래프 기반 질의응답        │
│                                     │
│ 🔹 Graph Classification            │
│    그래프 분류 태스크               │
│                                     │
│ 🔹 Node/Edge Prediction            │
│    노드/엣지 예측                   │
│                                     │
│ 🔹 Social Network Analysis         │
│    소셜 네트워크 분석               │
│                                     │
│ 🔹 Molecular Property Prediction   │
│    분자 특성 예측                   │
│                                     │
│ 🔹 Recommendation Systems          │
│    추천 시스템                      │
└─────────────────────────────────────┘
```

## ⚡ GRAPH PROMPTING CONCEPT (중앙 - 가장 넓게!)

**개념 다이어그램:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                    GRAPH PROMPTING FRAMEWORK                       │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  │    INPUT                    PROCESS              OUTPUT     │   │
│  │                                                             │   │
│  │  ┌───────────┐     ┌─────────────────┐     ┌───────────┐   │   │
│  │  │   Graph   │     │  Graph Prompt   │     │  Enhanced │   │   │
│  │  │   Data    │────▶│  Construction   │────▶│   Output  │   │   │
│  │  │           │     │                 │     │           │   │   │
│  │  │  (Nodes,  │     │  • Structure    │     │  • QA     │   │   │
│  │  │   Edges,  │     │    encoding     │     │  • Class  │   │   │
│  │  │   Attrs)  │     │  • Relation     │     │  • Pred   │   │   │
│  │  │           │     │    mapping      │     │           │   │   │
│  │  └───────────┘     └────────┬────────┘     └───────────┘   │   │
│  │                             │                               │   │
│  │                             ▼                               │   │
│  │                    ┌─────────────────┐                      │   │
│  │                    │      LLM        │                      │   │
│  │                    │                 │                      │   │
│  │                    │  Graph-aware    │                      │   │
│  │                    │  reasoning      │                      │   │
│  │                    └─────────────────┘                      │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     KEY COMPONENTS                          │   │
│  │                                                             │   │
│  │  📍 Graph Structure    →  노드, 엣지, 속성 등 구조 정보     │   │
│  │  📍 Structured Prompt  →  그래프 구조를 텍스트로 인코딩     │   │
│  │  📍 Task-specific      →  태스크에 맞는 프롬프트 템플릿     │   │
│  │  📍 LLM Processing     →  구조화된 입력으로 추론 수행       │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Graph → Prompt 변환 예시:**

```
Graph Data:
┌───────────────────────────────────┐
│    [A] ──friend── [B]            │
│     │              │             │
│  works_at       works_at         │
│     │              │             │
│     ▼              ▼             │
│   [Google]     [OpenAI]          │
└───────────────────────────────────┘

        ↓ Graph Prompting ↓

Structured Prompt:
┌───────────────────────────────────┐
│ "Given the following graph:       │
│  - A is friends with B            │
│  - A works at Google              │
│  - B works at OpenAI              │
│                                   │
│  Question: What companies are     │
│  connected through friendship?"   │
└───────────────────────────────────┘
```

## 📚 RELATED RESOURCES (좌측 하단)

| 자료 | 설명 |
|------|------|
| **Liu et al. (2023)** | GraphPrompts 원논문 |
| **Prompt Engineering for LLMs** | 초급 과정 (2시간), Graph prompting 기법 포함 |
| **Building Effective AI Agents** | 중급 과정 (5시간), 도구 통합 중심 |

## 🎓 KEY TAKEAWAYS (우측 하단)

- ✓ **그래프 구조 활용**: 노드/엣지 관계를 프롬프트에 인코딩
- ✓ **다운스트림 성능 향상**: 그래프 관련 태스크에서 성능 개선
- ✓ **구조화된 데이터 처리**: 비정형 그래프를 정형화된 프롬프트로 변환
- ✓ **다양한 활용**: KG QA, 분류, 예측, 추천 등 폭넓은 적용

---

# Instructions

1. **스타일**: 첨부된 이미지의 손필기 느낌, 모눈종이 배경, 아이콘 스타일을 따라주세요.

2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치해주세요. 첨부 이미지의 레이아웃을 그대로 복사하지 마세요.

3. **언어**: 용어/고유명사는 영어(Graph Prompting, GraphPrompts, Knowledge Graph, Node, Edge, LLM 등), 설명은 한국어.

4. **핵심**: **Graph Prompting Concept 섹션을 가장 넓고 눈에 띄게** 배치해주세요. 이 콘텐츠의 핵심은 "Graph Data → Structured Prompt → LLM → Enhanced Output"의 흐름입니다.

5. **참고**: 원본 콘텐츠가 "More coming soon!"으로 제한적이므로, 일반적인 Graph Prompting 개념과 활용 사례를 보강하여 치트시트를 구성했습니다.

Please generate the Cheat Sheet now.

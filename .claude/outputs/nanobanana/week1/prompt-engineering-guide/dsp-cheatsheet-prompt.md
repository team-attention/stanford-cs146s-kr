# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "Directional Stimulus Prompting (DSP)" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "Directional Stimulus Prompting"
source_url: "https://www.promptingguide.ai/techniques/dsp"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Directional Stimulus Prompting

## Overview

Directional Stimulus Prompting은 Li et al. (2023)이 제안한 기법으로, 언어 모델이 원하는 출력을 생성하도록 더 효과적으로 안내하기 위해 설계되었습니다. 특히 요약(summarization) 작업에서 유용합니다.

## 핵심 메커니즘

이 접근법은 조정 가능한(tunable) 정책 언어 모델(policy language model)을 사용하여 더 큰, 고정된(frozen) LLM을 안내하는 자극(stimuli) 또는 힌트를 생성하도록 훈련합니다. 이는 강화학습(reinforcement learning)을 사용하여 언어 모델 출력을 최적화하는 새로운 트렌드를 나타냅니다.

> "The policy LM can be small and optimized to generate the hints that guide a black-box frozen LLM."
>
> 정책 LM은 작을 수 있으며, 블랙박스인 고정된 LLM을 안내하는 힌트를 생성하도록 최적화될 수 있습니다.

## 기술적 접근 방식

이 방법론은 수동으로 작성된 프롬프트 대신, 방향성 있는 프롬프트(directional prompts)가 체계적으로 생성되는 중간 단계를 도입한다는 점에서 표준 프롬프팅과 다릅니다. 이를 통해 모델 행동에 대한 더 구조화된 안내가 가능해집니다.

## 장점

- **효율성**: 전체 시스템을 미세 조정하는 대신 더 작은 모델을 효율적으로 최적화할 수 있습니다.
- **유연성**: 블랙박스 LLM과 함께 작동하므로 API 기반 모델에도 적용 가능합니다.
- **확장성**: 작은 정책 모델이 큰 LLM을 안내하는 구조로 확장성이 뛰어납니다.

## 참고 자료

- Li et al. (2023) - Directional Stimulus Prompting 원논문
- Prompt Engineering Guide - DAIR.AI

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

# Layout Structure (이 구조대로 배치해주세요)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: DSP (Directional Stimulus Prompting) 🍌│
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 📖 WHAT IS DSP?        │    │ 💡 KEY INSIGHT                  ││
│  │                         │    │                                 ││
│  │ • Definition 박스       │    │  "Small Policy LM guides       ││
│  │ • 작은 모델이 큰 모델   │    │   large Frozen LLM"            ││
│  │   안내                  │    │                                 ││
│  │ • 요약 작업에 특히 유용 │    │  정책 LM → 힌트 → Frozen LLM   ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ DSP ARCHITECTURE (이 섹션이 가장 넓어야 함 - 핵심!)             │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │  ┌──────────┐     ┌──────────┐     ┌──────────────────────┐ │  │
│  │  │ Policy   │────▶│ Stimulus │────▶│  Frozen LLM (Large)  │ │  │
│  │  │ LM(Small)│     │ (Hints)  │     │                      │ │  │
│  │  └──────────┘     └──────────┘     └──────────────────────┘ │  │
│  │       ↑                                        │            │  │
│  │       │                                        ▼            │  │
│  │  [RL Training]                           [Final Output]     │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ ✨ KEY ADVANTAGES          │  │ 🎓 KEY TAKEAWAYS              ││
│  │                             │  │                               ││
│  │ • 효율성: 작은 모델만 학습 │  │ ✓ 작은 Policy LM + 큰 LLM     ││
│  │ • 유연성: API 모델 호환    │  │ ✓ RL로 힌트 생성 최적화       ││
│  │ • 확장성: 큰 모델 그대로   │  │ ✓ 블랙박스 LLM과 호환         ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**배치 비율**:
- 상단 (20%): 타이틀
- 중상단 (25%): Definition + Key Insight (좌우 분할)
- 중앙 (35%): DSP Architecture 다이어그램 (가장 넓게!)
- 하단 (20%): Advantages + Takeaways (좌우 분할)

# Content Details (레이아웃 각 섹션에 들어갈 내용)

## 📖 WHAT IS DSP? (좌측 상단)

**Definition Box:**
> "Directional Stimulus Prompting uses a small tunable policy LM to generate hints that guide a larger frozen LLM."

**핵심 포인트:**
- 작은 Policy LM이 큰 Frozen LLM을 안내
- 힌트/자극(Stimulus)을 생성하여 방향 제시
- 강화학습(RL)으로 Policy LM 최적화
- 요약(Summarization) 작업에 특히 효과적
- Li et al. (2023) 제안

## 💡 KEY INSIGHT (우측 상단)

**핵심 아이디어:**
```
┌─────────────────────────────────────┐
│ 🔑 DSP의 핵심 통찰                 │
│                                     │
│ "The policy LM can be small and    │
│  optimized to generate hints that  │
│  guide a black-box frozen LLM."    │
│                                     │
│ → 작은 모델로 큰 모델 조종!        │
│ → API 기반 모델에도 적용 가능      │
│ → 전체 Fine-tuning 불필요          │
└─────────────────────────────────────┘
```

## ⚡ DSP ARCHITECTURE (중앙 - 가장 넓게!)

**아키텍처 다이어그램:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                        DSP ARCHITECTURE                            │
│                                                                     │
│  ┌────────────────┐                                                │
│  │     Input      │                                                │
│  │   (e.g. Text   │                                                │
│  │  to summarize) │                                                │
│  └───────┬────────┘                                                │
│          │                                                         │
│          ▼                                                         │
│  ┌────────────────────┐     ┌─────────────────────┐               │
│  │   Policy LM        │     │    Directional      │               │
│  │   (Small, Tunable) │────▶│     Stimulus        │               │
│  │                    │     │     (Hints)         │               │
│  │  • 강화학습 최적화 │     │                     │               │
│  │  • 작은 파라미터   │     │  • 키워드           │               │
│  │  • 빠른 추론       │     │  • 방향 지시        │               │
│  └────────────────────┘     │  • 구조화된 힌트    │               │
│          ↑                  └──────────┬──────────┘               │
│          │                             │                          │
│    [RL Feedback]                       │                          │
│          │                             ▼                          │
│          │              ┌──────────────────────────────┐          │
│          │              │      Frozen LLM (Large)      │          │
│          │              │                              │          │
│          │              │  • 블랙박스 (수정 불가)      │          │
│          │              │  • API 기반 가능             │          │
│          │              │  • GPT-4, Claude 등          │          │
│          │              └──────────────┬───────────────┘          │
│          │                             │                          │
│          │                             ▼                          │
│          │              ┌──────────────────────────────┐          │
│          └──────────────│        Final Output          │          │
│           (Reward)      │     (Improved Quality)       │          │
│                         └──────────────────────────────┘          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Standard Prompting vs DSP:**

| 비교 | Standard Prompting | DSP |
|------|-------------------|-----|
| 프롬프트 생성 | 수동 작성 | Policy LM 자동 생성 |
| 최적화 대상 | 없음 | Policy LM (RL) |
| LLM 수정 | 필요할 수 있음 | 불필요 (Frozen) |
| 힌트/방향 | 없거나 수동 | 자동 생성 |

## ✨ KEY ADVANTAGES (좌측 하단)

| 장점 | 설명 |
|------|------|
| **⚡ 효율성** | 전체 LLM 대신 작은 Policy LM만 학습하면 됨 |
| **🔌 유연성** | 블랙박스 LLM, API 기반 모델과 호환 가능 |
| **📈 확장성** | 큰 LLM은 그대로 두고 작은 모델만 관리 |
| **🎯 정밀성** | 구조화된 힌트로 더 정확한 출력 유도 |

## 🎓 KEY TAKEAWAYS (우측 하단)

- ✓ **Small + Large 조합**: 작은 Policy LM이 큰 Frozen LLM 안내
- ✓ **강화학습 최적화**: RL로 힌트 생성 성능 지속 개선
- ✓ **블랙박스 호환**: API 기반 모델(GPT-4, Claude 등)에 적용 가능
- ✓ **요약에 효과적**: Summarization task에서 특히 우수한 성능
- ✓ **효율적 학습**: 전체 Fine-tuning 없이 작은 모델만 학습

---

# Instructions

1. **스타일**: 첨부된 이미지의 손필기 느낌, 모눈종이 배경, 아이콘 스타일을 따라주세요.

2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치해주세요. 첨부 이미지의 레이아웃을 그대로 복사하지 마세요.

3. **언어**: 용어/고유명사는 영어(DSP, Directional Stimulus Prompting, Policy LM, Frozen LLM, Reinforcement Learning, RL 등), 설명은 한국어.

4. **핵심**: **DSP Architecture 섹션을 가장 넓고 눈에 띄게** 배치해주세요. 이 콘텐츠의 핵심은 "Small Policy LM → Stimulus → Large Frozen LLM"의 아키텍처입니다.

Please generate the Cheat Sheet now.

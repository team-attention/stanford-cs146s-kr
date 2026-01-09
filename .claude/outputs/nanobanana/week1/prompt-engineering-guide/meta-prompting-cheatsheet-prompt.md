# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "Meta Prompting" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "Meta Prompting"
source_url: "https://www.promptingguide.ai/techniques/meta-prompting"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Meta Prompting

## Overview

Meta Prompting is an advanced prompting technique that emphasizes structural and syntactical aspects rather than specific content. It constructs abstracted, patterned interactions with Large Language Models (LLMs).

## Key Characteristics

According to Zhang et al. (2024), meta prompting involves five main attributes:

1. **Structure-oriented**: Prioritizes the format and pattern of problems and solutions over specific content
2. **Syntax-focused**: Uses syntax as a template for expected responses
3. **Abstract examples**: Employs abstracted frameworks illustrating problem structure without specific details
4. **Versatile**: Applicable across domains for structured responses
5. **Categorical approach**: Draws from type theory for component categorization

## Comparison with Few-Shot Prompting

Meta prompting differs fundamentally from few-shot prompting. The research demonstrates that meta prompting adopts a "structure-oriented approach as opposed to a content-driven approach" that few-shot emphasizes.

### Advantages

- **Token efficiency**: Reduces token requirements by focusing on structure
- **Fair comparison**: Minimizes influence of specific examples
- **Zero-shot efficacy**: Functions as zero-shot prompting with reduced example dependency

## Important Considerations

Meta prompting assumes the LLM possesses innate knowledge about the task. Performance may deteriorate with novel, unique tasks—similar to zero-shot limitations.

## Recommended Applications

- Complex reasoning tasks
- Mathematical problem-solving
- Coding challenges
- Theoretical queries

## References

- Zhang et al. (2024) - Meta Prompting research paper
- Prompting Guide by DAIR.AI

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

# Layout Structure (이 구조대로 배치해주세요)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: META PROMPTING 🍌                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 📖 WHAT IS META        │    │ 🎯 5 KEY CHARACTERISTICS        ││
│  │    PROMPTING?          │    │                                 ││
│  │                         │    │  1. Structure-oriented         ││
│  │ • Definition 박스       │    │  2. Syntax-focused             ││
│  │ • 구조/패턴 중심 접근   │    │  3. Abstract examples          ││
│  │ • 내용보다 형식 강조    │    │  4. Versatile                  ││
│  └─────────────────────────┘    │  5. Categorical approach       ││
│                                  └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ META vs FEW-SHOT COMPARISON (이 섹션이 가장 넓어야 함 - 핵심!) │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │   META PROMPTING          vs          FEW-SHOT PROMPTING    │  │
│  │   ┌─────────────┐                    ┌─────────────┐        │  │
│  │   │ Structure   │                    │  Content    │        │  │
│  │   │ -oriented   │                    │  -driven    │        │  │
│  │   └─────────────┘                    └─────────────┘        │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ 🎯 BEST USE CASES          │  │ 🎓 KEY TAKEAWAYS              ││
│  │                             │  │                               ││
│  │ • Complex reasoning        │  │ ✓ 구조 중심, 내용 아닌 형식   ││
│  │ • Math problem-solving     │  │ ✓ Token 효율적                ││
│  │ • Coding challenges        │  │ ✓ Zero-shot처럼 작동          ││
│  │ • Theoretical queries      │  │ ✓ 도메인 간 범용성            ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**배치 비율**:
- 상단 (20%): 타이틀
- 중상단 (25%): Definition + 5 Characteristics (좌우 분할)
- 중앙 (35%): Meta vs Few-shot Comparison (가장 넓게!)
- 하단 (20%): Use Cases + Takeaways (좌우 분할)

# Content Details (레이아웃 각 섹션에 들어갈 내용)

## 📖 WHAT IS META PROMPTING? (좌측 상단)

**Definition Box:**
> "Meta Prompting is an advanced prompting technique that emphasizes structural and syntactical aspects rather than specific content."

**핵심 포인트:**
- 구조(Structure)와 문법(Syntax) 중심 접근
- 추상화된 패턴 기반 상호작용
- 내용(Content)보다 형식(Format) 강조
- Zhang et al. (2024) 제안

## 🎯 5 KEY CHARACTERISTICS (우측 상단)

**5가지 핵심 특성:**
```
┌─────────────────────────────────────┐
│ Meta Prompting의 5가지 속성         │
│                                     │
│ 1️⃣ Structure-oriented              │
│    형식과 패턴 우선                  │
│                                     │
│ 2️⃣ Syntax-focused                  │
│    문법을 응답 템플릿으로 활용       │
│                                     │
│ 3️⃣ Abstract examples               │
│    구체적 내용 없는 추상화된 프레임  │
│                                     │
│ 4️⃣ Versatile                       │
│    다양한 도메인에 적용 가능         │
│                                     │
│ 5️⃣ Categorical approach            │
│    타입 이론 기반 컴포넌트 분류      │
└─────────────────────────────────────┘
```

## ⚡ META vs FEW-SHOT COMPARISON (중앙 - 가장 넓게!)

**비교 다이어그램:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│           META PROMPTING vs FEW-SHOT PROMPTING                     │
│                                                                     │
│  ┌────────────────────────────┐   ┌────────────────────────────┐   │
│  │      META PROMPTING        │   │    FEW-SHOT PROMPTING      │   │
│  │                            │   │                            │   │
│  │   "Structure-oriented"     │   │   "Content-driven"         │   │
│  │                            │   │                            │   │
│  │  ┌──────────────────────┐  │   │  ┌──────────────────────┐  │   │
│  │  │      STRUCTURE       │  │   │  │       CONTENT        │  │   │
│  │  │      (형식/패턴)      │  │   │  │      (구체적 예시)   │  │   │
│  │  └──────────────────────┘  │   │  └──────────────────────┘  │   │
│  │                            │   │                            │   │
│  │  • 추상적 프레임워크      │   │  • 구체적 예시 2-5개       │   │
│  │  • 패턴만 제시            │   │  • 실제 입출력 제시        │   │
│  │  • Token 효율적           │   │  • Token 많이 사용         │   │
│  │  • Zero-shot처럼 작동     │   │  • 예시에 의존             │   │
│  │                            │   │                            │   │
│  └────────────────────────────┘   └────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                        COMPARISON TABLE                     │   │
│  ├───────────────┬─────────────────────┬──────────────────────┤   │
│  │    항목       │   Meta Prompting    │   Few-shot Prompting │   │
│  ├───────────────┼─────────────────────┼──────────────────────┤   │
│  │   접근 방식   │ Structure-oriented  │ Content-driven       │   │
│  │   예시 형태   │ Abstract pattern    │ Concrete examples    │   │
│  │   Token 사용  │ 적음 (효율적)       │ 많음                 │   │
│  │   예시 의존성 │ 낮음                │ 높음                 │   │
│  │   일반화      │ 도메인 간 범용      │ Task-specific        │   │
│  │   한계        │ Novel task에 약함   │ 예시 품질에 의존     │   │
│  └───────────────┴─────────────────────┴──────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**예시 비교:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  FEW-SHOT PROMPTING (Content-driven):                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Example 1: "The movie was great" → Positive                 │   │
│  │ Example 2: "Terrible experience" → Negative                 │   │
│  │ Example 3: "It was okay" → Neutral                          │   │
│  │ Now classify: "Amazing film!"                                │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  META PROMPTING (Structure-oriented):                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Pattern: [INPUT: text] → [OUTPUT: {Positive|Negative|Neutral}]│  │
│  │ Structure: Sentiment analysis maps text to emotion category  │   │
│  │ Now classify: "Amazing film!"                                │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 🎯 BEST USE CASES (좌측 하단)

| 활용 분야 | 설명 |
|-----------|------|
| **🧠 Complex Reasoning** | 복잡한 추론이 필요한 문제 |
| **🔢 Math Problem-solving** | 수학 문제 해결 |
| **💻 Coding Challenges** | 코딩 도전 과제 |
| **📚 Theoretical Queries** | 이론적 질의 |

**⚠️ 주의사항:**
- LLM이 해당 task에 대한 기본 지식을 가지고 있어야 함
- 완전히 새로운/고유한 task에서는 성능 저하 가능

## 🎓 KEY TAKEAWAYS (우측 하단)

- ✓ **구조 중심 접근**: 내용이 아닌 형식/패턴에 집중
- ✓ **Token 효율성**: 구체적 예시 없이 패턴만 제시하여 토큰 절약
- ✓ **Zero-shot처럼 작동**: 예시 의존성 감소
- ✓ **도메인 간 범용성**: 다양한 분야에 적용 가능
- ✓ **타입 이론 기반**: 컴포넌트를 카테고리로 분류하는 체계적 접근

---

# Instructions

1. **스타일**: 첨부된 이미지의 손필기 느낌, 모눈종이 배경, 아이콘 스타일을 따라주세요.

2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치해주세요. 첨부 이미지의 레이아웃을 그대로 복사하지 마세요.

3. **언어**: 용어/고유명사는 영어(Meta Prompting, Structure-oriented, Syntax-focused, Few-shot, Zero-shot 등), 설명은 한국어.

4. **핵심**: **Meta vs Few-shot Comparison 섹션을 가장 넓고 눈에 띄게** 배치해주세요. 이 콘텐츠의 핵심은 "Structure-oriented vs Content-driven"의 차이입니다.

Please generate the Cheat Sheet now.

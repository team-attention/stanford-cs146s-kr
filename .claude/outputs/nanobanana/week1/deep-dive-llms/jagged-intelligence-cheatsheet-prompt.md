# Role Definition
You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets. Your goal is to restructure the provided text about "Jagged Intelligence (들쭉날쭉한 지능)" into a highly visual, structured, and actionable guide for software engineers working with LLMs.

# Source Text
---
title: "15. Jagged Intelligence"
titleKr: "15. 들쭉날쭉한 지능"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 15
totalChapters: 24
---

# 15. 들쭉날쭉한 지능

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 15/24

## 전체 강의 요약 (TL;DR)

이 3시간 30분짜리 강의에서 안드레이 카르파티는 ChatGPT 같은 대규모 언어 모델(LLM)이 어떻게 만들어지고 작동하는지 처음부터 끝까지 설명합니다. **사전학습**(인터넷 데이터 학습), **지도학습 미세조정**(대화 데이터로 어시스턴트 만들기), **강화학습**(성능 최적화)의 세 단계를 거쳐 LLM이 탄생합니다. 모델은 놀라운 능력을 보이지만 환각, 토큰화 한계, 들쭉날쭉한 지능 등의 약점도 있습니다. ChatGPT와 대화할 때 마법 같은 AI가 아니라 "OpenAI 데이터 라벨러의 통계적 시뮬레이션"과 대화한다고 생각하면 더 정확합니다.

## 이 강의에서 배울 수 있는 것

- LLM의 3단계 학습 파이프라인 (사전학습 → SFT → RL) 이해
- 토큰화, 신경망, 트랜스포머의 핵심 개념
- 환각(hallucination)의 원인과 완화 방법
- 강화학습이 모델 성능을 향상시키는 원리
- DeepSeek R1, AlphaGo에서 배우는 RL의 힘
- LLM의 심리학: 들쭉날쭉한 지능과 한계
- 최신 LLM 동향 추적 방법과 도구 활용법

---

## 이 챕터 요약

LLM의 불균일한 능력을 설명합니다.

**핵심 포인트:**
- 올림피아드 문제는 풀지만 9.11 vs 9.9 실패
- 스위스 치즈 같은 능력 분포
- 도구로 사용하고 결과 검증 필요

---

## 영어 원문 트랜스크립트

## 15. Jagged Intelligence

**요약**: LLM의 "들쭉날쭉한 지능(jagged intelligence)"을 설명합니다. 모델은 어떤 영역에서는 매우 뛰어나지만 다른 영역에서는 기본적인 실수를 합니다. 이는 인간의 지능과 다른 형태이며, 모델을 사용할 때 이러한 특성을 이해해야 합니다.

[2:05:00] the point that there are some Jagged edges here and there and we've discussed a few of them and a few of them make sense but some of them also will just not make as much sense and they're kind of like you're left scratching your head even if you understand in- depth how these models work and and good example of that recently is the following uh the models are not very good at very simple questions like this and uh this is shocking to a lot of people because these math uh these problems can solve complex math problems they can answer PhD grade physics chemistry biology

[2:05:30] questions much better than I can but sometimes they fall short in like super simple problems like this so here we go 9.11 is bigger than 9.9 and it justifies it in some way but obviously and then at the end okay it actually it flips its decision later so um I don't believe that this is very reproducible sometimes it flips around its answer sometimes gets it right sometimes get it get it again okay even though it might look

[2:06:00] larger okay so here it doesn't even correct itself in the end if you ask many times sometimes it gets it right too but how is it that the model can do so great at Olympiad grade problems but then fail on very simple problems like this and uh I think this one is as I mentioned a little bit of a head scratcher it turns out that a bunch of people studied this in depth and I haven't actually read the paper uh but what I was told by this team was that when you scrutinize the activations inside the neural network when you look

[2:06:30] at some of the features and what what features turn on or off and what neurons turn on or off uh a bunch of neurons inside the neural network light up that are usually associated with Bible verses U and so I think the model is kind of like reminded that these almost look like Bible verse markers and in a bip verse setting 9.11 would come after 99.9 and so basically the model somehow finds it like cognitively very distracting that in Bible verses 9.11 would be

[2:07:00] greater um even though here it's actually trying to justify it and come up to the answer with a math it still ends up with the wrong answer here so it basically just doesn't fully make sense and it's not fully understood and um there's a few Jagged issues like that so that's why treat this as a as what it is which is a St stochastic system that is really magical but that you can't also fully trust and you want to use it as a tool not as something that you kind of like letter rip on a problem and copypaste the results okay so we have

# Layout Structure (이 구조대로 배치해주세요)

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요.

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: JAGGED INTELLIGENCE 🍌                  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 🧀 SWISS CHEESE MODEL   │    │ 🤯 PARADOX CASES                ││
│  │                         │    │                                 ││
│  │  LLM 능력의 구멍 모델     │    │  9.11 vs 9.9 실패               ││
│  │  예상치 못한 한계 존재    │    │  Olympiad 문제는 성공!           ││
│  │                         │    │                                 ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ JAGGED vs UNIFORM INTELLIGENCE (이 섹션이 가장 넓어야 함!)       │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  Diagram: 인간 = 점진적 능력곡선 vs LLM = 들쭉날쭉 능력곡선      │ │
│  │  Bible verse 패턴 혼동 → 9.11 > 9.9 오류                       │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────┐ ┌────────────────────────────────┐│
│  │ 🛠️ HOW TO HANDLE             │ │ 📌 KEY TAKEAWAYS               ││
│  │                              │ │                                ││
│  │  - 도구로 사용하기            │ │  Stochastic 시스템              ││
│  │  - 결과 검증 필수             │ │  100% 신뢰 금지                 ││
│  └──────────────────────────────┘ └────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

## 배치 비율

| 영역 | 비율 | 내용 | 배치 |
|------|------|------|------|
| 상단 | 10% | 타이틀 | 전체 너비 |
| 중상단 | 25% | Swiss Cheese Model + Paradox Cases | **좌우 2등분** |
| 중앙 | 40% | Jagged vs Uniform Intelligence 비교도 | **가장 넓게!** |
| 하단 | 25% | How to Handle + Key Takeaways | **좌우 2등분** |

# Output Style: "Nano Banana" Cheat Sheet
Please adhere to the following formatting rules strictly:

1. **Visual Hierarchy & Structure**:
   - Use strict Markdown structure.
   - Use specific emojis for every section header to improve scanning.
   - Use **Bold** for key concepts and definitions.
   - Group by topic, not by timeline.

2. **Diagrams & Schematics (CRITICAL)**:
   - Use `mermaid` code blocks to visualize concepts.
   - Create a **Mind Map** for the overall topic structure.
   - Create a **Flowchart** for the mental model of LLM capabilities.
   - Create a **Comparison Diagram** showing jagged vs uniform intelligence.

3. **Concept Tables**:
   - Key concepts in table format with definitions.
   - Compare/contrast tables showing "Strong" vs "Weak" areas of LLMs.

4. **Quotable Insights**:
   - Extract memorable quotes or key insights from Karpathy.
   - Highlight "aha moments" from the lecture.

# Output Structure Plan

## 1. 🗺️ Topic Overview (Mind Map)
- Create a Mermaid mindmap with the following structure:
  - Root: "Jagged Intelligence (들쭉날쭉한 지능)"
  - Level 1 branches:
    - "Swiss Cheese Model (스위스 치즈 모델)"
    - "Paradox Cases (역설적 사례)"
    - "Why This Happens (원인)"
    - "How to Handle (대응 방법)"
  - Level 2: 각 브랜치의 세부 내용

## 2. 📚 Key Concepts Matrix (Table)
- Columns: [개념] | [정의] | [예시] | [시사점]
- Rows:
  | Jagged Intelligence | LLM의 불균일한 능력 분포 | 올림피아드 문제 OK, 9.11 vs 9.9 FAIL | 능력을 일반화하지 말것 |
  | Swiss Cheese Model | 구멍(한계)이 있는 능력 분포 | 성경 구절 패턴 혼동 | 예상치 못한 실패 가능 |
  | Stochastic System | 확률적으로 동작하는 시스템 | 같은 질문에 다른 답변 | 100% 신뢰 금지 |

## 3. ⚖️ Capability Contrast Diagram (Flowchart)
- Create a visual showing:

---

## 이미지 생성 요청

위의 구조와 내용을 바탕으로 **A4 한 장 분량의 치트시트 이미지**를 생성해주세요.

**이미지 스타일 요구사항:**
- 보기 좋게 정리된 **실제 펜 노트필기** 같은 느낌
- 용어 및 고유명사는 **영어 원문** 유지
- 설명 및 필기 내용은 **한국어**로 작성
- Mermaid 다이어그램은 **시각적 도식**으로 변환
- 표는 깔끔한 **테이블 형식**으로 렌더링
- **색상 강조**로 핵심 개념 구분

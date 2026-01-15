# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "Models Need Tokens to Think" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "13. Models Need Tokens to Think"
titleKr: "13. 모델은 생각하기 위해 토큰이 필요하다"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
chapter: 13/24
---

# 핵심 개념: Chain of Thought와 토큰당 계산량

## TL;DR

LLM은 각 토큰을 생성할 때 고정된 양의 계산만 수행할 수 있습니다. 따라서 복잡한 문제는 **중간 단계(intermediate steps)**를 통해 계산을 여러 토큰에 분산시켜야 합니다. 바로 답을 요구하면 모델이 단일 토큰에 모든 계산을 압축해야 하므로 실패합니다.

## 핵심 원리: 토큰당 고정 계산량

신경망은 입력 토큰에서 다음 토큰 확률을 계산할 때:
- 약 100개 레이어의 연산을 거침
- **각 토큰마다 거의 동일한 양의 계산** 발생
- 이 계산량은 유한하고 상대적으로 적음

따라서 **단일 토큰에 너무 많은 계산을 기대할 수 없음**.

## 좋은 답변 vs 나쁜 답변 예시

**문제**: Emily buys 3 apples and 2 oranges. Each orange costs $2. Total is $13. What is the cost of apples?

### 나쁜 답변 (모든 계산을 단일 토큰에)

# Layout Structure (이 구조대로 배치해주세요)

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요.

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: MODELS NEED TOKENS TO THINK 🍌          │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 🧠 CORE PRINCIPLE       │    │ ⚠️ THE PROBLEM                   ││
│  │                         │    │                                 ││
│  │  토큰당 고정 계산량        │    │  바로 답 요구 → 단일 토큰에        ││
│  │  ~100 layers 연산        │    │  모든 계산 압축 → 실패            ││
│  │                         │    │                                 ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ GOOD vs BAD ANSWER COMPARISON (이 섹션이 가장 넓어야 함!)         │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  나쁜 답변: "The answer is $3" → 단일 토큰 = 실패               │ │
│  │  좋은 답변: "Step 1... Step 2... The answer is $3" → 성공       │ │
│  │  Chain of Thought = 계산을 여러 토큰에 분산                     │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────┐ ┌────────────────────────────────┐│
│  │ 💡 CHAIN OF THOUGHT          │ │ 📌 KEY TAKEAWAYS               ││
│  │                              │ │                                ││
│  │  중간 단계로 계산 분산         │ │  - 복잡한 문제 = 중간 단계 필요   ││
│  │  "Let's think step by step"  │ │  - CoT로 정확도 향상            ││
│  └──────────────────────────────┘ └────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

## 배치 비율

| 영역 | 비율 | 내용 | 배치 |
|------|------|------|------|
| 상단 | 10% | 타이틀 | 전체 너비 |
| 중상단 | 25% | Core Principle + The Problem | **좌우 2등분** |
| 중앙 | 40% | Good vs Bad Answer Comparison | **가장 넓게!** |
| 하단 | 25% | Chain of Thought + Key Takeaways | **좌우 2등분** |

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

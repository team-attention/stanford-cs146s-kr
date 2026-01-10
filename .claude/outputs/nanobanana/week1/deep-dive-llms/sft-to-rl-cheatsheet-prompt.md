# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "SFT에서 강화학습(RL)으로의 전환" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "16. Supervised Finetuning to Reinforcement Learning"
titleKr: "16. SFT에서 강화학습으로"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 16
totalChapters: 24
---

# 16. SFT에서 강화학습으로

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 16/24

## 전체 강의 요약 (TL;DR)

이 3시간 30분짜리 강의에서 안드레이 카르파티는 ChatGPT 같은 대규모 언어 모델(LLM)이 어떻게 만들어지고 작동하는지 처음부터 끝까지 설명합니다. **사전학습**(인터넷 데이터 학습), **지도학습 미세조정**(대화 데이터로 어시스턴트 만들기), **강화학습**(성능 최적화)의 세 단계를 거쳐 LLM이 탄생합니다.

## 이 챕터 요약

강화학습 단계로의 전환을 설명합니다.

**핵심 포인트:**
- SFT: 전문가 모방
- RL: 스스로 발견
- 연습 문제처럼 실력 향상

## 영어 원문 트랜스크립트 (핵심 발췌)

### Pre-training vs SFT vs RL의 관계

"we've now covered two major stages of training of large language models... in the first stage this is called the pre-training stage we are basically training on internet documents... this is an interesting artifact... it's kind of a lossy compression of the internet"

"we saw that we can actually construct an assistant in the process of a post training and specifically in the process of supervised fine-tuning... it's algorithmically identical to pre-training nothing is going to change the only thing that changes is the data set"

### 교과서 비유: 학습의 세 가지 유형

"just like you went to school to become really good at something we want to take large language models through school"

**세 가지 정보 유형:**
1. **Exposition (설명)**: "most of the text... is kind of just like the meat of it is exposition... background knowledge" → Pre-training에 해당
2. **Worked Solutions (풀이된 문제)**: "problems with their worked solutions... the expert is showing us how to solve the problem" → SFT에 해당
3. **Practice Problems (연습 문제)**: "practice problems are critical for learning... you get a problem description but you're not given the solution but you are given the final answer... you're trying to practice the solution... discovering how to solve these problems" → RL에 해당

### 핵심 인용구

> "practice problems of course we know are critical for learning because what are they getting you to do they're getting you to practice yourself and discover ways of solving these problems yourself"

---

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

# Layout Structure

┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: SFT → REINFORCEMENT LEARNING 🍌        │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ 📚 TEXTBOOK ANALOGY: 학교에서 배우듯이 LLM도 배운다!            ││
│  │                                                                 ││
│  │  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐        ││
│  │  │ 📖 EXPOSITION │   │ 📝 WORKED    │   │ ✏️ PRACTICE  │        ││
│  │  │ 배경지식      │→  │   SOLUTIONS  │→  │   PROBLEMS   │        ││
│  │  │     ↓        │   │     ↓        │   │     ↓        │        ││
│  │  │ PRE-TRAINING │   │    SFT      │   │     RL       │        ││
│  │  └──────────────┘   └──────────────┘   └──────────────┘        ││
│  └─────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ 🎯 SFT vs RL 핵심 차이       │  │ 🧠 3단계 파이프라인           ││
│  │  SFT: 전문가 모방           │  │    Pre-train → SFT → RL      ││
│  │  RL: 스스로 발견            │  │                               ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ WHY RL MATTERS (가장 넓게!)                                      │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │    SFT ONLY              vs        SFT + RL                   │ │
│  │    교과서만 읽는 학생               연습문제 푸는 학생          │ │
│  │    전문가 수준 한계                 전문가 초월 가능           │ │
│  └───────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ 💡 KARPATHY'S INSIGHT       │  │ 🎓 KEY TAKEAWAYS              ││
│  │ "practice problems are      │  │ ✓ SFT = 모방 (Imitation)      ││
│  │  critical for learning"     │  │ ✓ RL = 발견 (Discovery)       ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
**배치 비율**:
- 상단 (10%): 타이틀
- 중상단 (25%): Textbook Analogy (전체 폭)
- 중앙 상단 (20%): SFT vs RL + 3단계 파이프라인 (좌우 분할)
- 중앙 (30%): Why RL Matters (가장 넓게!)
- 하단 (15%): Karpathy's Insight + Key Takeaways (좌우 분할)

# Content Details

## 📚 TEXTBOOK ANALOGY (상단)

**핵심 메시지:** "학교에서 배우듯이 LLM도 같은 방식으로 학습한다"

| 교과서 요소 | LLM 학습 단계 | 설명 |
|------------|--------------|------|
| Exposition | Pre-training | 배경지식, 개념 설명 |
| Worked Solutions | SFT | 전문가 풀이 보고 따라함 |
| Practice Problems | RL | 정답만 알고 직접 풀기 |

## 🎯 SFT vs RL 핵심 차이

| 구분 | SFT | RL |
|------|-----|-----|
| 한마디 | 전문가 모방 | 스스로 발견 |
| 방식 | 정답 과정 보고 따라함 | 정답만 알고 직접 풀기 |
| 한계/장점 | 전문가 수준 도달 | 전문가 초월 가능 |

## ⚡ WHY RL MATTERS

| SFT Only | SFT + RL |
|----------|----------|
| 교과서만 읽는 학생 | 연습문제 푸는 학생 |
| 전문가 수준 (천장 있음) | 전문가 초월 가능 |
| "네, 따라할게요" | "시도→실패→개선→성공!" |

## 🎓 KEY TAKEAWAYS

- ✓ **SFT = 모방**: 전문가 답변 패턴 학습
- ✓ **RL = 발견**: 스스로 더 나은 답 탐색
- ✓ **연습 없이 진짜 실력 없다**
- ✓ **세 단계 모두 필수**: Pre-train → SFT → RL

---

# Instructions

1. **스타일**: 손필기 느낌, 모눈종이 배경, 아이콘 스타일
2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치
3. **언어**: 용어는 영어(SFT, RL, Pre-training 등), 설명은 한국어
4. **핵심**: WHY RL MATTERS 섹션을 가장 넓고 눈에 띄게 배치
5. **강조**: "전문가 모방 vs 스스로 발견" 대비, "연습 없이 실력 없다" 메시지

Please generate the Cheat Sheet now.
---

## 요약

위 프롬프트는 Andrej Karpathy의 "Deep Dive into LLMs" 강의 중 16번 챕터(SFT에서 강화학습으로)의 핵심 내용을 나노바나나 치트시트 형식으로 시각화하기 위한 것입니다.

**프롬프트의 핵심 구조**:
1. **교과서 비유 (Textbook Analogy)**: Exposition → Pre-training, Worked Solutions → SFT, Practice Problems → RL
2. **SFT vs RL 비교**: 전문가 모방 vs 스스로 발견
3. **WHY RL MATTERS**: SFT만으로는 전문가 수준이 한계, RL을 통해 초월 가능
4. **Karpathy's Insight**: "practice problems are critical for learning"

도구 권한이 복원되면, `mkdir -p` 명령으로 디렉토리를 생성한 후 위 내용을 지정된 경로에 저장하면 됩니다.

---

## 이미지 생성 요청

위의 구조와 내용을 바탕으로 **가로 A4 한 장 분량의 치트시트 이미지**를 생성해주세요.

**이미지 스타일 요구사항:**
- 보기 좋게 정리된 **실제 펜 노트필기** 같은 느낌
- 용어 및 고유명사는 **영어 원문** 유지
- 설명 및 필기 내용은 **한국어**로 작성
- Mermaid 다이어그램은 **시각적 도식**으로 변환
- 표는 깔끔한 **테이블 형식**으로 렌더링
- **색상 강조**로 핵심 개념 구분

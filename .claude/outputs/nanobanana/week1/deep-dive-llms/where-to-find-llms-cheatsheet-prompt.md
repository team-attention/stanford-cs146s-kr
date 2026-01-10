# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "Where to Find LLMs" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "23. Where to Find LLMs"
titleKr: "23. LLM을 찾을 수 있는 곳"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 23
totalChapters: 24
---

# 23. LLM을 찾을 수 있는 곳

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 23/24

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

LLM 사용 플랫폼 안내입니다.

**핵심 포인트:**
- ChatGPT, Claude, Gemini
- together.ai, hyperbolic
- LM Studio로 로컬 실행

---

## 영어 원문 트랜스크립트

## 23. Where to Find LLMs

**요약**: LLM을 사용할 수 있는 주요 플랫폼들을 소개합니다. ChatGPT(OpenAI), Claude(Anthropic), Gemini(Google) 등 상용 서비스와 OpenRouter 같은 통합 API 서비스, 그리고 로컬에서 실행할 수 있는 Ollama 등을 소개합니다.

[3:19:00] reason that I don't fly understand no one does um for the open weights models like deep SE CL Etc you have to go to some kind of an inference provider of LMS so my favorite one is together together. a and I showed you that when you go to the playground of together. a then you can sort of pick lots of different models and all of these are open models of different types and you can talk to them here as an example um now if you'd like to use a base model like um you know a base model then this is where I think it's not as

[3:19:30] common to find base models even on these inference providers they are all targeting assistants and chat and so I think even here I can't I couldn't see base models here so for base models I usually go to hyperbolic because they serve my llama 3.1 base and I love that model and you can just talk to it here so as far as I know this is this is a good place for a base model and I wish more people hosted base models because they are useful and interesting to work with in some cases finally you can also take some of the models that are smaller

[3:20:00] and you can run them locally and so for example deep seek the biggest model you're not going to be able to run locally on your MacBook but there are smaller versions of the deep seek model that are what's called distilled and then also you can run these models at smaller Precision so not at the native Precision of for example fp8 on deep seek or you know bf16 llama but much much lower than that um and don't worry if you don't fully understand those details but you can run smaller versions that have been distilled and then at even lower precision and then you can

[3:20:30] fit them on your uh computer and so you can actually run pretty okay models on your laptop and my favorite I think place I go to usually is LM studio uh which is basically an app you can get and I think it kind of actually looks really ugly and it's I don't like that it shows you all these models that are basically not that useful like everyone just wants to run deep seek so I don't know why they give you these 500 different types of models they're really complicated to search for and you have to choose different distillations and different uh precisions and it's all

[3:21:00] really confusing but once you actually understand how it works and that's a whole separate video then you can actually load up a model like here I loaded up a llama 3 uh2 instruct 1 billion and um you can just talk to it so I ask for Pelican jokes and I can ask for another one and it gives me another one Etc all of this that happens here is locally on your computer so we're not actually going to anywhere anyone else this is running on the GPU on the MacBook Pro so that's very nice and you can then eject the model when you're

[3:21:30] done and that frees up the ram so LM studio is probably like my favorite one even though I don't I think it's got a lot of uiux issues and it's really geared towards uh professionals almost uh but if you watch some videos on YouTube I think you can figure out how to how to use this interface uh so those are a few words on where to find them so let me now loop back around to where we started the question was when we go to chashi pta.com and we enter some kind of a query and we hit go what exactly is happening here what are we seeing what

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

Please adhere to the following formatting rules strictly:

1. **Visual Hierarchy & Structure**:
   - Use strict Markdown structure.
   - Use specific emojis for every section header to improve scanning.
   - Use **Bold** for key concepts and definitions.
   - Group by topic (Proprietary → Open Weights → Local), not by timeline.

2. **Diagrams & Schematics (CRITICAL)**:
   - Use `mermaid` code blocks to visualize concepts.
   - Create a **Mind Map** for the overall LLM platform structure.
   - Create a **Flowchart** for the local execution optimization process.
   - Use visual comparison for Cloud vs Local.

3. **Concept Tables**:
   - Platform comparison in table format.
   - Quick selection guide as a table.
   - Key terms with definitions.

4. **Quotable Insights**:
   - Extract Karpathy's key insight about base models.
   - Highlight practical recommendations.

# Layout Structure (이 구조대로 배치해주세요)

┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: WHERE TO FIND LLMs 🍌                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 🏢 PROPRIETARY MODELS   │    │ 🌐 OPEN WEIGHTS PROVIDERS       ││
│  │                         │    │                                 ││
│  │  ┌─────────────────┐    │    │  ┌─────────────┐                ││
│  │  │ ChatGPT (OpenAI)│    │    │  │ together.ai │                ││
│  │  │ 가장 대중적     │    │    │  │ 다양한 모델 │                ││
│  │  └─────────────────┘    │    │  │ Playground  │                ││
│  │  ┌─────────────────┐    │    │  └─────────────┘                ││
│  │  │ Claude          │    │    │                                 ││
│  │  │ (Anthropic)     │    │    │  ┌─────────────┐                ││
│  │  │ 안전+성능 균형  │    │    │  │ hyperbolic  │                ││
│  │  └─────────────────┘    │    │  │ Base 모델!  │                ││
│  │  ┌─────────────────┐    │    │  │ Llama 3.1   │                ││
│  │  │ Gemini (Google) │    │    │  └─────────────┘                ││
│  │  │ 멀티모달 강점   │    │    │                                 ││
│  │  └─────────────────┘    │    │  ⚠️ 대부분 Assistant만 제공!   ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  💻 LOCAL EXECUTION (LM STUDIO) - 가장 넓게!                        │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                                │ │
│  │  Cloud                           Local (LM Studio)            │ │
│  │  ┌─────────────────┐           ┌─────────────────────────┐    │ │
│  │  │ 🌐 API 호출     │           │ 💻 내 컴퓨터에서 실행   │    │ │
│  │  │ → 인터넷 필요   │    VS     │ → 오프라인 가능        │    │ │
│  │  │ → 비용 발생     │           │ → 무료!                │    │ │
│  │  │ → 프라이버시?   │           │ → 완전한 프라이버시    │    │ │
│  │  └─────────────────┘           └─────────────────────────┘    │ │
│  │                                                                │ │
│  │  ┌─────────────────────────────────────────────────────────┐  │ │
│  │  │ 로컬 실행을 위한 트릭:                                   │  │ │
│  │  │                                                          │  │ │
│  │  │  Original Model        Distilled + Lower Precision       │  │ │
│  │  │  ┌──────────────┐      ┌────────────────────────┐        │  │ │
│  │  │  │ DeepSeek 70B │  →   │ DeepSeek 7B (distilled)│        │  │ │
│  │  │  │ FP32/BF16    │      │ INT4 Quantization      │        │  │ │
│  │  │  │ ❌ 맥북 불가 │      │ ✅ 맥북 OK!           │        │  │ │
│  │  │  └──────────────┘      └────────────────────────┘        │  │ │
│  │  └─────────────────────────────────────────────────────────┘  │ │
│  │                                                                │ │
│  └───────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ 📝 KEY TERMS               │  │ 🎯 QUICK SELECTION GUIDE      ││
│  │                             │  │                               ││
│  │ Base Model:                 │  │ "빠르게 시작" → ChatGPT      ││
│  │   사전학습만, SFT/RLHF 없음 │  │ "프라이버시"  → LM Studio    ││
│  │                             │  │ "Base 모델"   → hyperbolic   ││
│  │ Distilled:                  │  │ "다양한 모델" → together.ai  ││
│  │   큰 모델 → 작은 모델       │  │ "안전+성능"   → Claude       ││
│  │                             │  │                               ││
│  │ Precision (정밀도):         │  │ Karpathy's favorite:         ││
│  │   FP32→BF16→FP8→INT4       │  │ "LM Studio + hyperbolic"     ││
│  │   (높음 ←────→ 낮음)        │  │                               ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
**배치 비율**:
- 상단 (15%): 타이틀
- 중상단 (25%): Proprietary + Open Weights Providers (좌우 분할)
- 중앙 (40%): Local Execution - Cloud vs Local 비교 (가장 넓게!)
- 하단 (20%): Key Terms + Quick Selection Guide (좌우 분할)

# Output Structure Plan

## 1. 🗺️ LLM Platform Overview (Mind Map)

Create a Mermaid mindmap with the following structure:
```mermaid
mindmap
  root((LLM 플랫폼))
    Proprietary
      ChatGPT
        OpenAI
        가장 대중적
      Claude
        Anthropic
        안전+성능
      Gemini
        Google
        멀티모달
    Open Weights
      together.ai
        Playground
        다양한 모델
      hyperbolic
        Base Model!
        Llama 3.1
    Local
      LM Studio
        Distilled
        Quantized
## 2. 📊 Platform Comparison Matrix (Table)

| Category | Platform | 특징 | 장점 | 단점 |
|----------|----------|------|------|------|
| Proprietary | ChatGPT | OpenAI | 가장 대중적, 플러그인 | 비용, 프라이버시 |
| Proprietary | Claude | Anthropic | 안전성, 긴 컨텍스트 | 비용 |
| Proprietary | Gemini | Google | 멀티모달 통합 | - |
| Open Weights | together.ai | 다양한 오픈 모델 | Playground, 선택폭 | Assistant만 제공 |
| Open Weights | hyperbolic | Base 모델 제공 | Llama 3.1 Base | - |
| Local | LM Studio | 로컬 실행 | 무료, 프라이버시 | 설정 복잡 |

## 3. 💻 Cloud vs Local Comparison (Visual)

좌우 분할 비교:

**Cloud API:**
- 인터넷 필요
- 비용 발생 (토큰당)
- 데이터 전송
- 대형 모델 사용 가능

**Local (LM Studio):**
- 오프라인 가능
- 무료
- 완전한 프라이버시
- 작은 모델만 (Distilled + Quantized)

## 4. 🔧 Local Execution Trick (Flowchart)

Create a Mermaid flowchart:
```mermaid
flowchart LR
    A[Original Model<br>DeepSeek 70B<br>FP32] --> B[Distillation<br>7B 버전으로 축소]
    B --> C[Quantization<br>INT4로 압축]
    C --> D[MacBook에서<br>실행 가능!]

    style A fill:#ffcccc
    style D fill:#ccffcc
## 5. 💬 Notable Insight (Quote)

> "I wish more people hosted base models because they are useful and interesting to work with"
> — Andrej Karpathy

Base 모델의 중요성 강조. 대부분의 서비스가 Assistant/Chat 모델만 제공하는 현실 지적.

## 6. 📝 Key Terms Definition

| 용어 | 정의 | 예시 |
|------|------|------|
| Base Model | SFT/RLHF 없이 사전학습만 완료된 모델 | Llama 3.1 Base |
| Distilled Model | 큰 모델에서 지식 추출한 작은 버전 | DeepSeek 7B |
| Precision | 모델 가중치의 숫자 정밀도 | FP32, BF16, FP8, INT4 |
| Quantization | 정밀도를 낮춰 모델 크기 축소 | FP32 → INT4 |

## 7. 🎯 Quick Selection Guide (Table)

| 목적 | 추천 플랫폼 | 이유 |
|------|-------------|------|
| 빠르게 시작하고 싶다 | ChatGPT | 가장 대중적, 쉬운 접근 |
| 프라이버시가 중요하다 | LM Studio | 완전 로컬 실행 |
| Base 모델이 필요하다 | hyperbolic | 희귀하게 Base 모델 제공 |
| 다양한 모델 테스트 | together.ai | Playground에서 비교 가능 |
| 안전성+성능 균형 | Claude | Anthropic의 안전 중심 설계 |
| 멀티모달 작업 | Gemini | Google의 멀티모달 통합 |

---

# Instructions

1. **스타일**: 첨부된 이미지의 손필기 느낌, 모눈종이 배경, 아이콘 스타일을 따라주세요.

2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치해주세요. 첨부 이미지의 레이아웃을 그대로 복사하지 마세요.

3. **언어**: 용어/고유명사는 영어 유지:
   - LLM, ChatGPT, Claude, Gemini
   - together.ai, hyperbolic, LM Studio
   - Base Model, Distilled, Precision, Quantization
   - FP32, BF16, FP8, INT4
   - Playground, API

   설명은 한국어로 작성.

4. **핵심**: **Local Execution 섹션 (Cloud vs Local 비교)을 가장 넓고 눈에 띄게** 배치해주세요. 이 콘텐츠의 핵심은 "어디서 LLM을 찾고, 특히 로컬에서 어떻게 실행하는지"입니다.

5. **플로우 강조**: Proprietary → Open Weights → Local 순서로 점점 더 개방적인 옵션으로 흐르는 것을 시각적으로 표현해주세요.

6. **Karpathy's Favorites 강조**: LM Studio와 hyperbolic을 Karpathy가 선호한다는 점을 눈에 띄게 표시.

Please generate the Cheat Sheet now.

내가 말하는 cheat sheet는 보기 좋게 정리된, 실제 펜 노트필기 같은 이미지를 말하는거야.
용어 및 고유명사는 영어 원문을 쓰되(LLM, ChatGPT, Claude, Gemini, together.ai, hyperbolic, LM Studio, Base Model, Distilled, Precision, Quantization 등), 필기 내용은 한국어로 작성해.

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

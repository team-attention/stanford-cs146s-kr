# Role Definition
You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets. Your goal is to restructure the provided text about "Inference (추론) - LLM 텍스트 생성 과정" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text
---
title: "6. Inference"
titleKr: "6. 추론"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 6
totalChapters: 24
---

# 6. 추론

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 6/24

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

학습된 모델로 텍스트를 생성하는 과정입니다.

**핵심 포인트:**
- 확률 분포에서 다음 토큰 샘플링
- 반복하여 텍스트 생성
- 학습보다 훨씬 빠름

---

## 영어 원문 트랜스크립트

## 6. Inference

**요약**: 학습된 모델로 텍스트를 생성하는 추론(inference) 과정을 설명합니다. 모델은 확률 분포에서 다음 토큰을 샘플링하고, 이를 반복하여 텍스트를 생성합니다. 추론은 학습보다 훨씬 빠르며, 단일 GPU로도 가능합니다.

[26:30] we start with some tokens that are basically your prefix like what you want to start with so say we want to start the with the token 91 well we feed it into network and remember that the network gives us probabilities right it gives us this probability Vector here so what we can do now is we can basically flip a biased coin so um we can sample uh basically a token based on this probability distribution so the tokens that are given High probability by the

[27:00] model are more likely to be sampled when you flip this biased coin you can think of it that way so we sample from the distribution to get a single unique token so for example token 860 comes next uh so 860 in this case when we're generating from model could come next now 860 is a relatively likely token it might not be the only possible token in this case there could be many other tokens that could have been sampled but we could see that 86c is a relatively likely token as an example and indeed in our training examp example here 860 does

[27:30] follow 91 so let's now say that we um continue the process so after 91 there's a60 we append it and we again ask what is the third token let's sample and let's just say that it's 287 exactly as here let's do that again we come back in now we have a sequence of three and we ask what is the likely fourth token and we sample from that and get this one and now let's say we do it one more time we

[28:00] take those four we sample and we get this one and this 13659 uh this is not actually uh 3962 as we had before so this token is the token article uh instead so viewing a single article and so in this case we didn't exactly reproduce the sequence that we saw here in the training data so keep in mind that these systems are stochastic they have um we're sampling and we're flipping coins and sometimes we lock out

[28:30] and we reproduce some like small chunk of the text and training set but sometimes we're uh we're getting a token that was not verbatim part of any of the documents in the training data so we're going to get sort of like remixes of the data that we saw in the training because at every step of the way we can flip and get a slightly different token and then once that token makes it in if you sample the next one and so on you very quickly uh start to generate token streams that are very different from the token streams that UR

[29:00] in the training documents so statistically they will have similar properties but um they are not identical to your training data they're kind of like inspired by the training data and so in this case we got a slightly different sequence and why would we get article you might imagine that article is a relatively likely token in the context of bar viewing single Etc and you can imagine that the word article followed this context window somewhere in the training documents uh to some extent and we just happen to sample it

[29:30] here at that stage so basically inference is just uh predicting from these distributions one at a time we continue feeding back tokens and getting the next one and we uh we're always flipping these coins and depending on how lucky or unlucky we get um we might get very different kinds of patterns depending on how we sample from these probability distributions so that's inference so in most common scenarios uh basically downloading the internet and tokenizing it is is a pre-processing

[30:00] step you do that a single time and then uh once you have your token sequence we can start training networks and in Practical cases you would try to train many different networks of different kinds of uh settings and different kinds of arrangements and different kinds of sizes and so you''ll be doing a lot of neural network training and um then once you have a neural network and you train it and you have some specific set of parameters that you're happy with um then you can take the model and you can do inference and you can actually uh

[30:30] generate data from the model and when you're on chat GPT and you're talking with a model uh that model is trained and has been trained by open aai many months ago probably and they have a specific set of Weights that work well and when you're talking to the model all of that is just inference there's no more training those parameters are held fixed and you're just talking to the model sort of uh you're giving it some of the tokens and it's kind of completing token sequences and that's what you're seeing uh generated when you actually use the model on CH GPT so that

[31:00] model then just does inference alone so let's now look at an example of training an inference that is kind of concrete and gives you a sense of what this actually looks like uh when these models are trained now the example that I would like to work with and that I'm particularly fond of is that of opening eyes gpt2 so GPT uh stands for generatively pre-trained Transformer and this is the second iteration of the GPT series by open AI when you are talking to chat GPT today the model that is underlying all of the magic of that

# Layout Structure (이 구조대로 배치해주세요)

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요.

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: INFERENCE (추론) 🍌                     │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 🎲 WHAT IS INFERENCE?   │    │ 🔀 BIASED COIN FLIP             ││
│  │                         │    │                                 ││
│  │  학습된 모델로 텍스트 생성  │    │  확률 분포에서 샘플링             ││
│  │  Training과 다른 단계     │    │  Stochastic한 과정              ││
│  │                         │    │                                 ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ TOKEN GENERATION PROCESS (이 섹션이 가장 넓어야 함!)             │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  Flowchart: Prefix → Neural Net → Prob Dist → Sample → Append │ │
│  │            → Repeat until done                                │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────┐ ┌────────────────────────────────┐│
│  │ 📊 TRAINING vs INFERENCE     │ │ 📌 KEY TAKEAWAYS               ││
│  │                              │ │                                ││
│  │  학습: GPU 수만개, 수개월     │ │  - 학습보다 훨씬 빠름            ││
│  │  추론: 단일 GPU, 실시간       │ │  - 고정된 파라미터 사용           ││
│  └──────────────────────────────┘ └────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

## 배치 비율

| 영역 | 비율 | 내용 | 배치 |
|------|------|------|------|
| 상단 | 10% | 타이틀 | 전체 너비 |
| 중상단 | 25% | What is Inference + Biased Coin Flip | **좌우 2등분** |
| 중앙 | 45% | Token Generation Process Flowchart | **가장 넓게!** |
| 하단 | 20% | Training vs Inference + Key Takeaways | **좌우 2등분** |

# Output Style: "Nano Banana" Cheat Sheet
Please adhere to the following formatting rules strictly:

1. **Visual Hierarchy & Structure**:
   - Use strict Markdown structure.
   - Use specific emojis for every section header to improve scanning.
   - Use **Bold** for key concepts and definitions.
   - Group by topic, not by timeline.

2. **Diagrams & Schematics (CRITICAL)**:
   - Use `mermaid` code blocks to visualize concepts.
   - Create a **Mind Map** for the Inference topic overview.
   - Create a **Flowchart** for the token generation process.
   - Ensure diagrams are informative yet simple to read at a glance.

3. **Tabular Data**:
   - Create a "Key Concepts Matrix" table with columns: [Concept] | [Definition] | [Example] | [Related To]
   - Create a "Training vs Inference" comparison table

4. **Quotable Insights**:
   - Extract memorable quotes from Andrej Karpathy
   - Highlight key "aha moments" from the lecture

# Output Structure Plan

## 1. 🗺️ Topic Overview (Mind Map)
- Create a Mermaid mindmap with the following structure:
  - Root: "Inference (추론)"
  - Level 1 branches:
    - Input: Prefix Tokens
    - Process: Neural Network → Probability Distribution → Sampling
    - Output: Generated Text
    - Properties: Stochastic, Fast, Fixed Parameters
  - Level 2: 각 브랜치의 세부 개념

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

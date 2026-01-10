---
title: "9. Pretraining to Post-Training"
titleKr: "9. 사전학습에서 후속학습으로"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 9
totalChapters: 24
---

# 9. 사전학습에서 후속학습으로

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 9/24

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

베이스 모델을 어시스턴트로 변환하는 과정입니다.

**핵심 포인트:**
- 베이스 모델은 유용하지만 직접 대화 불가
- 후속학습으로 어시스턴트 페르소나 부여
- ChatGPT 같은 AI의 핵심 단계

---

## 영어 원문 트랜스크립트

## 9. Pretraining to Post-Training

**요약**: 사전학습(pretraining)에서 후속학습(post-training)으로 전환하는 과정을 설명합니다. 베이스 모델은 인터넷 텍스트를 모방할 뿐이지만, 후속학습을 통해 유용한 어시스턴트로 변환됩니다. 이 단계가 ChatGPT와 같은 대화형 AI를 만드는 핵심입니다.

[59:30] minutes now let me zoom out here and this is kind of like what we've talked about so far we wish to train LM assistants like chpt we've discussed the first stage of that which is the pre-training stage and we saw that really what it comes down to is we take Internet documents we break them up into these tokens these atoms of little text chunks and then we predict token sequences using neural networks the output of this entire stage is this base model it is the setting of The

[1:00:00] parameters of this network and this base model is basically an internet document simulator on the token level so it can just uh it can generate token sequences that have the same kind of like statistics as Internet documents and we saw that we can use it in some applications but we actually need to do better we want an assistant we want to be able to ask questions and we want the model to give us answers and so we need to now go into the second stage which is called the post-training stage so we take our base model our internet document simulator and hand it off to

[1:00:30] post training so we're now going to discuss a few ways to do what's called post training of these models these stages in post training are going to be computationally much less expensive most of the computational work all of the massive data centers um and all of the sort of heavy compute and millions of dollars are the pre-training stage but now we go into the slightly cheaper but still extremely important stage called post trining where we turn this llm model into an assistant so let's take a

[1:01:00] look at how we can get our model to not sample internet documents but to give answers to questions so in other words what we want to do is we want to start thinking about conversations and these are conversations that can be multi-turn so so uh there can be multiple turns and they are in the simplest case a conversation between a human and an assistant and so for example we can imagine the conversation could look something like this when a human says what is 2 plus2 the assistant should re respond with something like 2 plus 2 is 4 when a human follows up and says what

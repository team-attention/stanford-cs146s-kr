---
title: "12. Knowledge of Self"
titleKr: "12. 자기 인식"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 12
totalChapters: 24
---

# 12. 자기 인식

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 12/24

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

모델의 자기 정체성에 대해 설명합니다.

**핵심 포인트:**
- 모델은 자신이 무엇인지 모름
- 시스템 프롬프트로 정체성 부여
- 하드코딩된 대화로 자기 소개 학습

---

## 영어 원문 트랜스크립트

## 12. Knowledge of Self

**요약**: LLM의 자기 인식에 대해 설명합니다. 모델은 자신이 무엇인지, 누가 만들었는지 등에 대한 지식이 학습 데이터에서 왔기 때문에 불완전할 수 있습니다. "당신은 Claude입니다"와 같은 시스템 프롬프트로 정체성을 부여합니다.

[1:42:00] um basically this uh question is a little bit nonsensical and the reason I say that is that as I try to kind of explain with some of the underhood fundamentals this thing is not a person right it doesn't have a persistent existence in any way it sort of boots up processes tokens and shuts off and it does that for every single person it just kind of builds up a context window of conversation and then everything gets deleted and so this this entity is kind of like restarted from scratch every single conversation if that makes sense it has no persistent self it has no

[1:42:30] sense of self it's a token tumbler and uh it follows the statistical regularities of its training set so it doesn't really make sense to ask it who are you what build you Etc and by default if you do what I described and just by default and from nowhere you're going to get some pretty random answers so for example let's uh pick on Falcon which is a fairly old model and let's see what it tells us uh so it's evading the question uh talented engineers and developers here it says I was built by open AI based on

[1:43:00] the gpt3 model it's totally making stuff up now the fact that it's built by open AI here I think a lot of people would take this as evidence that this model was somehow trained on open AI data or something like that I don't actually think that that's necessarily true the reason for that is that if you don't explicitly program the model to answer these kinds of questions then what you're going to get is its statistical best guess at the answer and this model had a um sft data mixture of

[1:43:30] conversations and during the fine-tuning um the model sort of understands as it's training on this data that it's taking on this personality of this like helpful assistant and it doesn't know how to it doesn't actually it wasn't told exactly what label to apply to self it just kind of is taking on this uh this uh Persona of a helpful assistant and remember that the pre-training stage took the documents from the entire internet and Chach and open AI are very prominent in

[1:44:00] these documents and so I think what's actually likely to be happening here is that this is just its hallucinated label for what it is this is its self-identity is that it's chat GPT by open Ai and it's only saying that because there's a ton of data on the internet of um answers like this that are actually coming from open from chasht and So that's its label for what it is now you can override this as a developer if you have a llm model you can actually override it and there are a few ways to

[1:44:30] do that so for example let me show you there's this MMO model from Allen Ai and um this is one llm it's not a top tier LM or anything like that but I like it because it is fully open source so the paper for Almo and everything else is completely fully open source which is nice um so here we are looking at its sft mixture so this is the data mixture of um the fine tuning so this is the conversations data it right and so the way that they are solving it for Theo model is we see that there's a bunch of stuff in the mixture and there's a total

[1:45:00] of 1 million conversations here but here we have alot to hardcoded if we go there we see that this is 240 conversations and look at these 240 conversations they're hardcoded tell me about yourself says user and then the assistant says I'm and open language model developed by AI to Allen Institute of artificial intelligence Etc I'm here to help blah blah blah what is your name uh Theo project so these are all kinds of like cooked up hardcoded questions

[1:45:30] abouto 2 and the correct answers to give in these cases if you take 240 questions like this or conversations put them into your training set and fine tune with it then the model will actually be expected to parot this stuff later if you don't give it this then it's probably a Chach by open Ai and um there's one more way to sometimes do this is that basically um in these conversations and you have terms between human and assistant sometimes there's a special

[1:46:00] message called system message at the very beginning of the conversation so it's not just between human and assistant there's a system and in the system message you can actually hardcode and remind the model that hey you are a model developed by open Ai and your name is chashi pt40 and you were trained on this date and your knowledge cut off is this and basically it kind of like documents the model a little bit and then this is inserted into to your conversations so when you go on chpt you see a blank page but actually the system message is kind of like hidden in there

[1:46:30] and those tokens are in the context window and so those are the two ways to kind of um program the models to talk about themselves either it's done through uh data like this or it's done through system message and things like that basically invisible tokens that are in the context window and remind the model of its identity but it's all just kind of like cooked up and bolted on in some in some way it's not actually like really deeply there in any real sense as it would before a human I want to now continue to the next section which deals

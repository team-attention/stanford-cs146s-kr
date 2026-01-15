---
title: "22. Keeping Track of LLMs"
titleKr: "22. LLM 동향 추적하기"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 22
totalChapters: 24
---

# 22. LLM 동향 추적하기

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 22/24

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

최신 정보를 얻는 방법입니다.

**핵심 포인트:**
- LM Arena: 모델 순위 확인
- AI News 뉴스레터
- X(트위터) 팔로우

---

## 영어 원문 트랜스크립트

## 22. Keeping Track of LLMs

**요약**: 최신 LLM 동향을 추적하는 방법을 안내합니다. LMSys Chatbot Arena의 ELO 랭킹을 통해 다양한 모델의 성능을 비교할 수 있으며, 현재 최고 성능 모델들(GPT-4o, Claude, Gemini 등)의 순위를 확인할 수 있습니다.

[3:15:30] board and it ranks all the top models and the ranking is based on human comparisons so humans prompt these models and they get to judge which one gives a better answer they don't know which model is which they're just looking at which model is the better answer and you can calculate a ranking and then you get some results and so what you can hear is what you can see here is the different organizations like Google Gemini for example that produce these models when you click on any one of these it takes you to the place where that model is hosted and then here we see Google is currently on top with open AI right

[3:16:00] behind here we see deep seek in position number three now the reason this is a big deal is the last column here you see license deep seek is an MIT license model it's open weights anyone can use these weights uh anyone can download them anyone can host their own version of Deep seek and they can use it in what whatever way they like and so it's not a proprietary model that you don't have access to it's it's basically an open weight release and so this is kind of unprecedented that a model this strong was released with open weights so pretty

[3:16:30] cool from the team next up we have a few more models from Google and open Ai and then when you continue to scroll down you start to see some other Usual Suspects so xai here anthropic with son it uh here at number 14 and um then meta with llama over here so llama similar to deep seek is an open weights model and so uh but it's down here as opposed to up here now I will say that

[3:17:00] this leaderboard was really good for a long time I do think that in the last few months it's become a little bit gamed um and I don't trust it as much as I used to I think um just empirically I feel like a lot of people for example are using a Sonet from anthropic and that it's a really good model so but that's all the way down here um in number 14 and conversely I think not as many people are using Gemini but it's racking really really high uh so I think

[3:17:30] use this as a first pass uh but uh sort of try out a few of the models for your tasks and see which one performs better the second thing that I would point to is the uh AI news uh newsletter so AI news is not very creatively named but it is a very good newsletter produced by swix and friends so thank you for maintaining it and it's been very helpful to me because it is extremely comprehensive so if you go to archives uh you see that it's produced almost every other day and um it is very comprehensive and some of it is written by humans and curated by

[3:18:00] humans but a lot of it is constructed automatically with llms so you'll see that these are very comprehensive and you're probably not missing anything major if you go through it of course you're probably not going to go through it because it's so long but I do think that these summaries all the way up top are quite good and I think have some human oversight uh so this has been very helpful to me and the last thing I would point to is just X and Twitter uh a lot of um AI happens on X and so I would just follow people who you like and trust and get all your latest and

[3:18:30] greatest uh on X as well so those are the major places that have worked for me over time and finally a few words on where you can find the models and where can you use them so the first one I would say is for any of the biggest proprietary models you just have to go to the website of that LM provider so for example for open a that's uh chat I believe actually works now uh so that's for open AI now for or you know for um for Gemini I think it's gem. google.com or AI Studio I think they have two for some

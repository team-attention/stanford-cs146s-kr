---
title: "20. Reinforcement Learning from Human Feedback (RLHF)"
titleKr: "20. RLHF"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 20
totalChapters: 24
---

# 20. RLHF

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 20/24

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

인간 피드백 기반 강화학습입니다.

**핵심 포인트:**
- 창작 글쓰기 등 검증 어려운 영역
- 인간 선호도 모방하는 보상 모델
- 게이밍 문제로 무한 실행 불가

---

## 영어 원문 트랜스크립트

## 20. Reinforcement Learning from Human Feedback (RLHF)

**요약**: 인간 피드백 기반 강화학습(RLHF)을 설명합니다. 창작 글쓰기처럼 자동 검증이 어려운 영역에서는 인간이 여러 응답 중 더 좋은 것을 선택하고, 이를 학습시킨 보상 모델을 사용합니다. RLHF는 ChatGPT 등 현대 LLM의 핵심 기술입니다.

[3:02:00] single score it turns out that there are ways to gain these models you can find kinds of inputs that were not part of their training set and these inputs inexplicably get very high scores but in a fake way so very often what you find if you run our lch for very long so for example if we do 1,000 updates which is like say a lot of updates you might expect that your jokes are getting better and that you're getting like real bangers about Pelicans but that's not

[3:02:30] EXA exactly what happens what happens is that uh in the first few hundred steps the jokes about Pelicans are probably improving a little bit and then they actually dramatically fall off the cliff and you start to get extremely nonsensical results like for example you start to get um the top joke about Pelicans starts to be the and this makes no sense right like when you look at it why should this be a top joke but when you take the the and you plug it into your reward model you'd expect score of zero but actually the reward model loves this as a joke it

[3:03:00] will tell you that the the the theth is a score of 1. Z this is a top joke and this makes no sense right but it's because these models are just simulations of humans and they're massive neural lots and you can find inputs at the bottom that kind of like get into the part of the input space that kind of gives you nonsensical results these examples are what's called adversarial examples and I'm not going to go into the topic too much but these are adversarial inputs to the model they are specific little inputs that kind of

[3:03:30] go between the nooks and crannies of the model and give nonsensical results at the top now here's what you might imagine doing you say okay the the the is obviously not score of one um it's obviously a low score so let's take the the the the the let's add it to the data set and give it an ordering that is extremely bad like a score of five and indeed your model will learn that the D should have a very low score and it will give it score of zero the problem is that there will always be basically infinite number of nonsensical

[3:04:00] adversarial examples hiding in the model if you iterate this process many times and you keep adding nonsensical stuff to your reward model and giving it very low scores you can you'll never win the game uh you can do this many many rounds and reinforcement learning if you run it long enough will always find a way to gain the model it will discover adversarial examples it will get get really high scores uh with nonsensical results and fundamentally this is because our scoring function is a giant neural nut and RL is extremely good at

[3:04:30] finding just the ways to trick it uh so long story short you always run rhf put for maybe a few hundred updates the model is getting better and then you have to crop it and you are done you can't run too much against this reward model because the optimization will start to game it and you basically crop it and you call it and you ship it um and uh you can improve the reward model but you kind of like come across these

[3:05:00] situations eventually at some point so rhf basically what I usually say is that RF is not RL and what I mean by that is I mean RF is RL obviously but it's not RL in the magical sense this is not RL that you can run indefinitely these kinds of problems like where you are getting con correct answer you cannot gain this as easily you either got the correct answer or you didn't and the scoring function is much much simpler you're just looking at the boxed area and seeing if the result is correct so it's very difficult to gain

[3:05:30] these functions but uh gaming a reward model is possible now in these verifiable domains you can run RL indefinitely you could run for tens of thousands hundreds of thousands of steps and discover all kinds of really crazy strategies that we might not even ever think about of Performing really well for all these problems in the game of Go there's no way to to beat to basically game uh the winning of a game or the losing of a game we have a perfect simulator we know all the different uh where all the stones are placed and we

[3:06:00] can calculate uh whether someone has won or not there's no way to gain that and so you can do RL indefinitely and you can eventually be beat even leol but with models like this which are gameable you cannot repeat this process indefinitely so I kind of see rhf as not real RL because the reward function is gameable so it's kind of more like in the realm of like little fine-tuning it's a little it's a little Improvement but it's not something that is fundamentally set up correctly where you

[3:06:30] can insert more compute run for longer and get much better and magical results so it's it's uh it's not RL in that sense it's not RL in the sense that it lacks magic um it can find you in your model and get a better performance and indeed if we go back to chat GPT the GPT 40 model has gone through rhf because it works well but it's just not RL in the same sense rlf is like a little fine tune that slightly improves your model is maybe like the way I would think about it okay so that's most of the

[3:07:00] technical content that I wanted to cover I took you through the three major stages and paradigms of training these models pre-training supervised fine tuning and reinforcement learning and I showed you that they Loosely correspond to the process we already use for teaching children and so in particular we talked about pre-training being sort of like the basic knowledge acquisition of reading Exposition supervised fine tuning being the process of looking at lots and lots of worked examples and imitating experts and practice problems

[3:07:30] the only difference is that we now have to effectively write textbooks for llms and AIS across all the disciplines of human knowledge and also in all the cases where we actually would like them to work like code and math and you know basically all the other disciplines so we're in the process of writing textbooks for them refining all the algorithms that I've presented on the high level and then of course doing a really really good job at the execution of training these models at scale and efficiently so in particular I didn't go into too many details but these are

[3:08:00] extremely large and complicated distributed uh sort of um jobs that have to run over tens of thousands or even hundreds of thousands of gpus and the engineering that goes into this is really at the stateof the art of what's possible with computers at that scale so I didn't cover that aspect too much but um this is very kind of serious and they were underlying all these very simple algorithms ultimately now I also talked about sort

[3:08:30] of like the theory of mind a little bit of these models and the thing I want you to take away is that these models are really good but they're extremely useful as tools for your work you shouldn't uh sort of trust them fully and I showed you some examples of that even though we have mitigations for hallucinations the models are not perfect and they will hallucinate still it's gotten better over time and it will continue to get better but they can hallucinate in other words in in addition to that I covered kind of like what I call the Swiss cheese uh sort of model of llm capabilities that you should have in your mind the models are

[3:09:00] incredibly good across so many different disciplines but then fail randomly almost in some unique cases so for example what is bigger 9.11 or 9.9 like the model doesn't know but simultaneously it can turn around and solve Olympiad questions and so this is a hole in the Swiss cheese and there are many of them and you don't want to trip over them so don't um treat these models as infallible models check their work use them as tools use them for inspiration use them for the first draft

[3:09:30] but uh work with them as tools and be ultimately respons responsible for the you know product of your work and that's roughly what I wanted to talk about this is how they're trained and this is what they are let's now turn to what are some of the future capabilities of these models uh probably what's coming down the pipe and also where can you find these models I have a few blow points on some of the things that you can expect coming down the pipe the first thing you'll notice is that the models will very rapidly become multimodal everything I talked about

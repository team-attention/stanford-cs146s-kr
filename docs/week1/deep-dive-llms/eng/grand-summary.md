---
title: "24. Grand Summary"
titleKr: "24. 전체 요약"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 24
totalChapters: 24
---

# 24. 전체 요약

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 24/24

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



---

## 영어 원문 트랜스크립트

## 24. Grand Summary

**요약**: 전체 강의 내용을 요약합니다. LLM은 인터넷 데이터로 사전학습된 후, 대화 데이터로 미세조정되고, 강화학습으로 개선됩니다. 이들은 강력하지만 완벽하지 않은 도구이며, 신뢰하되 검증하는 자세로 활용해야 합니다.

[3:22:00] are we talking to how does this work and I hope that this video gave you some appreciation for some of the under the hood details of how these models are trained and what this is that is coming back so in particular we now know that your query is taken and is first chopped up into tokens so we go to to tick tokenizer and here where is the place in the in the um sort of format that is for the user query we basically put in our

[3:22:30] query right there so our query goes into what we discussed here is the conversation protocol format which is this way that we maintain conversation objects so this gets inserted there and then this whole thing ends up being just a token sequence a onedimensional token sequence under the hood so Chachi PT saw this token sequence and then when we hit go it basically continues appending tokens into this list it continues the sequence it acts like a token autocomplete so in particular it gave us

[3:23:00] this response so we can basically just put it here and we see the tokens that it continued uh these are the tokens that it continued with roughly now the question becomes okay why are these the tokens that the model responded with what are these tokens where are they coming from uh what are we talking to and how do we program this system and so that's where we shifted gears and we talked about the under thehood pieces of it so the first stage of this process and there are three stages is the pre-training stage which fundamentally has to do with just

[3:23:30] knowledge acquisition from the internet into the parameters of this neural network and so the neural net internalizes a lot of Knowledge from the internet but where the personality really comes in is in the process of supervised fine-tuning here and so what what happens here is that basically the a company like openai will curate a large data set of conversations like say 1 million conversation across very diverse topics and there will be conversations between a human and an assistant and even though there's a lot

[3:24:00] of synthetic data generation used throughout this entire process and a lot of llm help and so on fundamentally this is a human data curation task with lots of humans involved and in particular these humans are data labelers hired by open AI who are given labeling instructions that they learn and they task is to create ideal assistant responses for any arbitrary prompts so they are teaching the neural network by example how to respond to prompts so what is the way to think

[3:24:30] about what came back here like what is this well I think the right way to think about it is that this is the neural network simulation of a data labeler at openai so it's as if I gave this query to a data Li open and this data labeler first reads all of the labeling instructions from open Ai and then spends 2 hours writing up the ideal assistant response to this query and uh giving it to me now we're not actually

[3:25:00] doing that right because we didn't wait two hours so what we're getting here is a neural network simulation of that process and we have to keep in mind that these neural networks don't function like human brains do they are different what's easy or hard for them is different from what's easy or hard for humans and so we really are just getting a simulation so here I shown you this is a token stream and this is fundamentally the neural network with a bunch of activations and neurons in between this is a fixed mathematical expression that

[3:25:30] mixes inputs from tokens with parameters of the model and they get mixed up and get you the next token in a sequence but this is a finite amount of compute that happens for every single token and so this is some kind of a lossy simulation of a human that is kind of like restricted in this way and so whatever the humans write the language model is kind of imitating on this token level with only this this specific computation for every

[3:26:00] single token and sequence we also saw that as a result of this and the cognitive differences the models will suffer in a variety of ways and uh you have to be very careful with their use so for example we saw that they will suffer from hallucinations and they also we have the sense of a Swiss model of the LM capabilities where basically there's like holes in the cheese sometimes the models will just arbitrarily like do something dumb uh so even though they're doing lots of magical stuff sometimes they just can't

[3:26:30] so maybe you're not giving them enough tokens to think and maybe they're going to just make stuff up because they're mental arithmetic breaks uh maybe they are suddenly unable to count number of letters um or maybe they're unable to tell you that 911 9.11 is smaller than 9.9 and it looks kind of dumb and so so it's a Swiss cheese capability and we have to be careful with that and we saw the reasons for that but fundamentally this is how we think of what came back it's again a

[3:27:00] simulation of this neural network of a human data labeler following the labeling instructions at open a so that's what we're getting back now I do think that the uh things change a little bit when you actually go and reach for one of the thinking models like o03 mini and the reason for that is that GPT 40 basically doesn't do reinforcement learning it does do rhf but I've told you that rhf is not RL there's no

[3:27:30] there's no uh time for magic in there it's just a little bit of a fine-tuning is the way to look at it but these thinking models they do use RL so they go through this third state stage of perfecting their thinking process and discovering new thinking strategies and uh solutions to problem solving that look a little bit like your internal monologue in your head and they practice that on a large collection of practice problems that companies like openi create and

[3:28:00] curate and um then make available to the LMS so when I come here and I talked to a thinking model and I put in this question what we're seeing here is not anymore just the straightforward simulation of a human data labeler like this is actually kind of new unique and interesting um and of course open is not showing us the under thehood thinking and the chains of thought that are underlying the reasoning here but we know that such a thing exists and this is a summary of it and what we're getting here is actually not just an imitation of a human data labeler it's

[3:28:30] actually something that is kind of new and interesting and exciting in the sense that it is a function of thinking that was emergent in a simulation it's not just imitating human data labeler it comes from this reinforcement learning process and so here we're of course not giving it a chance to shine because this is not a mathematical or a reasoning problem this is just some kind of a sort of creative writing problem roughly speaking and I think it's um it's a a question an open question as to whether the thinking strategies that are

[3:29:00] developed inside verifiable domains transfer and are generalizable to other domains that are unverifiable such as create writing the extent to which that transfer happens is unknown in the field I would say so we're not sure if we are able to do RL on everything that is very verifiable and see the benefits of that on things that are unverifiable like this prompt so that's an open question the other thing that's interesting is that this reinforcement learning here is still like way too new primordial and

[3:29:30] nent so we're just seeing like the beginnings of the hints of greatness uh in the reasoning problems we're seeing something that is in principle capable of something like the equivalent of move 37 but not in the game of Go but in open domain thinking and problem solving in principle this Paradigm is capable of doing something really cool new and exciting something even that no human has thought of before in principle these models are capable of analogies no human has had so I think it's incredibly

[3:30:00] exciting that these models exist but again it's very early and these are primordial models for now um and they will mostly shine in domains that are verifiable like math en code Etc so very interesting to play with and think about and use and then that's roughly it um um I would say those are the broad Strokes of what's available right now I will say that overall it is an extremely exciting time to be in the field personally I use these models all the time daily uh tens or hundreds of

[3:30:30] times because they dramatically accelerate my work I think a lot of people see the same thing I think we're going to see a huge amount of wealth creation as a result of these models be aware of some of their shortcomings even with RL models they're going to suffer from some of these use it as a tool in a toolbox don't trust it fully because they will randomly do dumb things they will randomly hallucinate they will randomly skip over some mental arithmetic and not get it right um they randomly can't count or something like that so use them as tools in the toolbox

[3:31:00] check their work and own the product of your work but use them for inspiration for first draft uh ask them questions but always check and verify and you will be very successful in your work if you do so uh so I hope this video was useful and interesting to you I hope you had it fun and uh it's already like very long so I apologize for that but I hope it

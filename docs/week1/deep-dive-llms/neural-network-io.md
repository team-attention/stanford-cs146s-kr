---
title: "4. Neural Network I/O"
titleKr: "4. 신경망 입출력"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 4
totalChapters: 24
---

# 4. 신경망 입출력

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 4/24

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

신경망의 입출력 구조를 설명합니다.

**핵심 포인트:**
- 입력: 토큰 시퀀스 (최대 8,000개 등)
- 출력: 다음 토큰 확률 분포 (100,000개 확률)
- 학습: 정답 토큰 확률 높이도록 조정

---

## 영어 원문 트랜스크립트

## 4. Neural Network I/O

**요약**: 신경망의 입출력 구조를 설명합니다. 토큰 시퀀스가 입력으로 들어가면, 신경망은 다음 토큰에 대한 확률 분포(약 100,000개 토큰 각각의 확률)를 출력합니다. 학습 과정에서 정답 토큰의 확률을 높이도록 신경망을 조정합니다.

[14:30] now is I've taken this uh sequence of text that we have here in the data set and I have re-represented it using our tokenizer into a sequence of tokens and this is what that looks like now so for example when we go back to the Fine web data set they mentioned that not only is this 44 terab of dis space but this is about a 15 trillion token sequence of um in this data set and so here these are just some of the first uh one or two or three or a few thousand here I think uh

[15:00] tokens of this data set but there's 15 trillion here uh to keep in mind and again keep in mind one more time that all of these represent little text chunks they're all just like atoms of these sequences and the numbers here don't make any sense they're just uh they're just unique IDs okay so now we get to the fun part which is the uh neural network training and this is where a lot of the heavy lifting happens computationally when you're training these neural networks so what we do here

[15:30] in this this step is we want to model the statistical relationships of how these tokens follow each other in the sequence so what we do is we come into the data and we take Windows of tokens so we take a window of tokens uh from this data fairly randomly and um the windows length can range anywhere anywhere between uh zero tokens actually all the way up to some maximum size that we decide on uh so for example in practice you could see a

[16:00] token with Windows of say 8,000 tokens now in principle we can use arbitrary window lengths of tokens uh but uh processing very long uh basically U window sequences would just be very computationally expensive so we just kind of decide that say 8,000 is a good number or 4,000 or 16,000 and we crop it there now in this example I'm going to be uh taking the first four tokens just so everything fits nicely so these

[16:30] tokens we're going to take a window of four tokens this bar view in and space single which are these token IDs and now what we're trying to do here is we're trying to basically predict the token that comes next in the sequence so 3962 comes next right so what we do now here is that we call this the context these four tokens are context and they feed into a neural network and this is the input to the neural network

[17:00] now I'm going to go into the detail of what's inside this neural network in a little bit for now it's important to understand is the input and the output of the neural net so the input are sequences of tokens of variable length anywhere between zero and some maximum size like 8,000 the output now is a prediction for what comes next so because our vocabulary has 100277 possible tokens the neural network is going to Output exactly that many numbers

[17:30] and all of those numbers correspond to the probability of that token as coming next in the sequence so it's making guesses about what comes next um in the beginning this neural network is randomly initialized so um and we're going to see in a little bit what that means but it's a it's a it's a random transformation so these probabilities in the very beginning of the training are also going to be kind of random uh so here I have three examples but keep in mind that there's 100,000 numbers here um so the probability of this token space

[18:00] Direction neural network is saying that this is 4% likely right now 11799 is 2% and then here the probility of 3962 which is post is 3% now of course we've sampled this window from our data set so we know what comes next we know and that's the label we know that the correct answer is that 3962 actually comes next in the sequence so now what we have is this mathematical process for doing an update to the neural network we

[18:30] have the way of tuning it and uh we're going to go into a little bit of of detail in a bit but basically we know that this probability here of 3% we want this probability to be higher and we want the probabilities of all the other tokens to be lower and so we have a way of mathematically calculating how to adjust and update the neural network so that the correct answer has a slightly higher probability so if I do an update to the neural network now the next time I Fe

[19:00] this particular sequence of four tokens into neural network the neural network will be slightly adjusted now and it will say Okay post is maybe 4% and case now maybe is 1% and uh Direction could become 2% or something like that and so we have a way of nudging of slightly updating the neuronet to um basically give a higher probability to the correct token that comes next in the sequence and now you just have to remember that this process happens not just for uh this um token

[19:30] here where these four fed in and predicted this one this process happens at the same time for all of these tokens in the entire data set and so in practice we sample little windows little batches of Windows and then at every single one of these tokens we want to adjust our neural network so that the probability of that token becomes slightly higher and this all happens in parallel in large batches of these tokens and this is the process of training the neural network it's a sequence of updating it so that it's

[20:00] predictions match up the statistics of what actually happens in your training set and its probabilities become consistent with the uh statistical patterns of how these tokens follow each other in the data so let's now briefly get into the internals of these neural networks just to give you a sense of what's inside so neural network internals so as I mentioned we have these inputs uh that are sequences of tokens in this case this is four input tokens but this can be anywhere between

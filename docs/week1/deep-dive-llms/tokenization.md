---
title: "3. Tokenization"
titleKr: "3. 토큰화"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 3
totalChapters: 24
---

# 3. 토큰화

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 3/24

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

텍스트를 신경망에 입력하기 위해 토큰으로 변환하는 과정을 설명합니다.

**핵심 포인트:**
- UTF-8 바이트에서 시작해 BPE로 어휘 생성
- GPT-4는 100,277개 토큰 사용
- Tiktokenizer로 토큰화 과정 확인 가능

---

## 영어 원문 트랜스크립트

## 3. Tokenization

**요약**: 텍스트를 신경망에 입력하기 위해 토큰으로 변환하는 과정을 설명합니다. UTF-8 바이트에서 시작해 Byte Pair Encoding(BPE) 알고리즘을 사용하여 약 100,000개의 토큰 어휘를 생성하며, GPT-4는 100,277개의 토큰을 사용합니다.

[8:00] a one-dimensional sequence of symbols and they want a finite set of symbols that are possible and so we have to decide what are the symbols and then we have to represent our data as one-dimensional sequence of those symbols so right now what we have is a onedimensional sequence of text it starts here and it goes here and then it comes here Etc so this is a onedimensional sequence even though on my monitor of course it's laid out in a two-dimensional way but it goes from left to right and top to bottom right so

[8:30] it's a one-dimensional sequence of text now this being computers of course there's an underlying representation here so if I do what's called utf8 uh encode this text then I can get the raw bits that correspond to this text in the computer and that's what uh that looks like this so it turns out that for example this very first bar here is the first uh eight bits as an example so what is this thing right this

[9:00] is um representation that we are looking for uh in in a certain sense we have exactly two possible symbols zero and one and we have a very long sequence of it right now as it turns out um this sequence length is actually going to be very finite and precious resource uh in our neural network and we actually don't want extremely long sequences of just two symbols instead what we want is we want to trade off uh this um symbol

[9:30] size uh of this vocabulary as we call it and the resulting sequence length so we don't want just two symbols and extremely long sequences we're going to want more symbols and shorter sequences okay so one naive way of compressing or decreasing the length of our sequence here is to basically uh consider some group of consecutive bits for example eight bits and group them into a single what's called bite so because uh these

[10:00] bits are either on or off if we take a group of eight of them there turns out to be only 256 possible combinations of how these bits could be on or off and so therefore we can re repesent this sequence into a sequence of bytes instead so this sequence of bytes will be eight times shorter but now we have 256 possible symbols so every number here goes from 0 to 255 now I really encourage you to think of these not as numbers but as unique IDs or like unique symbols so maybe it's

[10:30] a bit more maybe it's better to actually think of these to replace every one of these with a unique Emoji you'd get something like this so um we basically have a sequence of emojis and there's 256 possible emojis you can think of it that way now it turns out that in production for state-of-the-art language models uh you actually want to go even Beyond this you want to continue to shrink the length of the sequence uh because again it is a precious resource in return for more symbols in your

[11:00] vocabulary and the way this is done is done by running what's called The Bite pair encoding algorithm and the way this works is we're basically looking for consecutive bytes or symbols that are very common so for example turns out that the sequence 116 followed by 32 is quite common and occurs very frequently so what we're going to do is we're going to group uh this um pair into a new symbol so we're going to Mint a symbol with an ID 256 and we're going to

[11:30] rewrite every single uh pair 11632 with this new symbol and then can we can iterate this algorithm as many times as we wish and each time when we mint a new symbol we're decreasing the length and we're increasing the symbol size and in practice it turns out that a pretty good setting of um the basically the vocabulary size turns out to be about 100,000 possible symbols so in particular GPT 4 uses 100, 277 symbols

[12:00] um and this process of converting from raw text into these symbols or as we call them tokens is the process called tokenization so let's now take a look at how gp4 performs tokenization conting from text to tokens and from tokens back to text and what this actually looks like so one website I like to use to explore these token representations is called tick tokenizer and so come here to the drop down and select CL 100 a

[12:30] base which is the gp4 base model tokenizer and here on the left you can put in text and it shows you the tokenization of that text so for example heo space world so hello world turns out to be exactly two Tokens The Token hello which is the token with ID 15339 and the token space world that is the token 1

[13:00] 1917 so um hello space world now if I was to join these two for example I'm going to get again two tokens but it's the token H followed by the token L world without the H um if I put in two Spa two spaces here between hello and world it's again a different uh tokenization there's a new token 220 here okay so you can play with this and see what happens here also keep in mind this is not uh this is case sensitive so

[13:30] if this is a capital H it is something else or if it's uh hello world then actually this ends up being three tokens tokens yeah so you can play with this and get an sort of like an intuitive sense of uh what these tokens work like we're actually going to loop around to tokenization a bit later in the video for now I just wanted to show you the website and I wanted to uh show you that this text basically at the end of the day so for example if I take one line

[14:00] here this is what GT4 will see it as so this text will be a sequence of length 62 this is the sequence here and this is how the chunks of text correspond to these symbols and again there's 100, 27777 possible symbols and we now have one-dimensional sequences of those symbols so um yeah we're going to come back to tokenization but that's uh for now where we are okay so what I've done

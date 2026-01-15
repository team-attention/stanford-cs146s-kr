---
title: "13. Models Need Tokens to Think"
titleKr: "13. 모델은 생각하기 위해 토큰이 필요하다"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 13
totalChapters: 24
---

# 13. 모델은 생각하기 위해 토큰이 필요하다

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 13/24

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

Chain of Thought의 중요성을 설명합니다.

**핵심 포인트:**
- 토큰당 고정된 계산량
- 복잡한 문제는 중간 단계 필요
- 바로 답 요구하면 실패

---

## 영어 원문 트랜스크립트

## 13. Models Need Tokens to Think

**요약**: 모델이 "생각"하기 위해 토큰이 필요하다는 개념을 설명합니다. 복잡한 문제는 중간 단계(chain of thought)를 거쳐야 풀 수 있으며, 바로 답을 요구하면 실패합니다. 이것이 o1 같은 추론 모델의 기반이 됩니다.

[1:47:00] with the computational capabilities or like I should say the native computational capabilities of these models in problem solving scenarios and so in particular we have to be very careful with these models when we construct our examples of conversations and there's a lot of sharp edges here that are kind of like elucidative is that a word uh they're kind of like interesting to look at when we consider how these models think so um consider the following prompt from a human and supposed that basically that we are building out a conversation to enter into our training set of conversations

[1:47:30] so we're going to train the model on this we're teaching you how to basically solve simple math problems so the prompt is Emily buys three apples and two oranges each orange cost $2 the total cost is 13 what is the cost of apples very simple math question now there are two answers here on the left and on the right they are both correct answers they both say that the answer is three which is correct but one of these two is a significant ific anly better answer for the assistant than the other like if I was Data labeler and I was creating one

[1:48:00] of these one of these would be uh a really terrible answer for the assistant and the other would be okay and so I'd like you to potentially pause the video Even and think through why one of these two is significantly better answer uh than the other and um if you use the wrong one your model will actually be uh really bad at math potentially and it would have uh bad outcomes and this is something that you would be careful with in your life labeling documentations when you are training people uh to create the ideal responses for the assistant okay so the key to this

[1:48:30] question is to realize and remember that when the models are training and also inferencing they are working in onedimensional sequence of tokens from left to right and this is the picture that I often have in my mind I imagine basically the token sequence evolving from left to right and to always produce the next token in a sequence we are feeding all these tokens into the neural network and this neural network then is the probabilities for the next token and sequence right so this picture here is the exact same picture we saw uh before

[1:49:00] up here and this comes from the web demo that I showed you before right so this is the calculation that basically takes the input tokens here on the top and uh performs these operations of all these neurons and uh gives you the answer for the probabilities of what comes next now the important thing to realize is that roughly speaking uh there's basically a finite number of layers of computation that happened here so for example this model here has only one two three layers of

[1:49:30] what's called detention and uh MLP here um maybe um typical modern state-of-the-art Network would have more like say 100 layers or something like that but there's only 100 layers of computation or something like that to go from the previous token sequence to the probabilities for the next token and so there's a finite amount of computation that happens here for every single token and you should think of this as a very small amount of computation and this amount of computation is almost roughly fixed uh for every single token in this sequence um the that's not actually

[1:50:00] fully true because the more tokens you feed in uh the the more expensive uh this forward pass will be of this neural network but not by much so you should think of this uh and I think as a good model to have in mind this is a fixed amount of compute that's going to happen in this box for every single one of these tokens and this amount of compute Cann possibly be too big because there's not that many layers that are sort of going from the top to bottom here there's not that that much computationally that will happen here and so you can't imagine the model to to basically do arbitrary computation in a

[1:50:30] single forward pass to get a single token and so what that means is that we actually have to distribute our reasoning and our computation across many tokens because every single token is only spending a finite amount of computation on it and so we kind of want to distribute the computation across many tokens and we can't have too much computation or expect too much computation out of of the model in any single individual token because there's only so much computation that happens

[1:51:00] per token okay roughly fixed amount of computation here so that's why this answer here is significantly worse and the reason for that is Imagine going from left to right here um and I copy pasted it right here the answer is three Etc imagine the model having to go from left to right emitting these tokens one at a time it has to say or we're expecting to say the answer is space dollar sign and then right here we're expecting it to

[1:51:30] basically cram all of the computation of this problem into this single token it has to emit the correct answer three and then once we've emitted the answer three we're expecting it to say all these tokens but at this point we've already prod produced the answer and it's already in the context window for all these tokens that follow so anything here is just um kind of post Hawk justification of why this is the answer um because the answer is already created it's already in the token window so it's it's not actually being calculated here

[1:52:00] um and so if you are answering the question directly and immediately you are training the model to to try to basically guess the answer in a single token and that is just not going to work because of the finite amount of computation that happens per token that's why this answer on the right is significantly better because we are Distributing this computation across the answer we're actually getting the model to sort of slowly come to the answer from the left to right we're getting intermediate results we're saying okay the total cost of oranges is four so 30

[1:52:30] - 4 is 9 and so we're creating intermediate calculations and each one of these calculations is by itself not that expensive and so we're actually basically kind of guessing a little bit the difficulty that the model is capable of in any single one of these individual tokens and there can never be too much work in any one of these tokens computationally because then the model won't be able to do that later at test time and so we're teaching the model here to spread out its reasoning and to spread out its computation over the

[1:53:00] tokens and in this way it only has very simple problems in each token and they can add up and then by the time it's near the end it has all the previous results in its working memory and it's much easier for it to determine that the answer is and here it is three so this is a significantly better label for our computation this would be really bad and is teaching the model to try to do all the computation in a single token and it's really bad so uh that's kind of like an

[1:53:30] interesting thing to keep in mind is in your prompts uh usually don't have to think about it explicitly because uh the people at open AI have labelers and so on that actually worry about this and they make sure that the answers are spread out and so actually open AI will kind of like do the right thing so when I ask this question for chat GPT it's actually going to go very slowly it's going to be like okay let's define our variables set up the equation and it's kind of creating all these intermediate results these are not for you these are for the model if the model is not creating these intermediate

[1:54:00] results for itself it's not going to be able to reach three I also wanted to show you that it's possible to be a bit mean to the model uh we can just ask for things so as an example I said I gave it the exact same uh prompt and I said answer the question in a single token just immediately give me the answer nothing else and it turns out that for this simple um prompt here it actually was able to do it in single go so it just created a single I think this is two tokens right uh because the dollar

[1:54:30] sign is its own token so basically this model didn't give me a single token it gave me two tokens but it still produced the correct answer and it did that in a single forward pass of the network now that's because the numbers here I think are very simple and so I made it a bit more difficult to be a bit mean to the model so I said Emily buys 23 apples and 177 oranges and then I just made the numbers a bit bigger and I'm just making it harder for the model I'm asking it to more computation in a single token and so I said the same thing and here it gave me five and five

[1:55:00] is actually not correct so the model failed to do all of this calculation in a single forward pass of the network it failed to go from the input tokens and then in a single forward pass of the network single go through the network it couldn't produce the result and then I said okay now don't worry about the the token limit and just solve the problem as usual and then it goes all the intermediate results it simplifies and every one of these intermediate results here and intermediate calculations is much easier for the model and um it sort

[1:55:30] of it's not too much work per token all of the tokens here are correct and it arises the solution which is seven and I just couldn't squeeze all of this work it couldn't squeeze that into a single forward passive Network so I think that's kind of just a cute example and something to kind of like think about and I think it's kind of again just elucidative in terms of how these uh models work the last thing that I would say on this topic is that if I was in practi is trying to actually solve this in my day-to-day life I might actually not uh trust that the model that all the intermediate calculations correctly here

[1:56:00] so actually probably what I do is something like this I would come here and I would say use code and uh that's because code is one of the possible tools that chachy PD can use and instead of it having to do mental arithmetic like this mental arithmetic here I don't fully trust it and especially if the numbers get really big there's no guarantee that the model will do this correctly any one of these intermediates steps might in principle fail we're using neural networks to do mental arithmetic uh kind of like you doing

[1:56:30] mental arithmetic in your brain it might just like uh screw up some of the intermediate results it's actually kind of amazing that it can even do this kind of mental arithmetic I don't think I could do this in my head but basically the model is kind of like doing it in its head and I don't trust that so I wanted to use tools so you can say stuff like use code and uh I'm not sure what happened there use code and so um like I mentioned there's a special tool and the uh the model can write code and I can inspect that this

[1:57:00] code is correct and then uh it's not relying on its mental arithmetic it is using the python interpreter which is a very simple programming language to basically uh write out the code that calculates the result and I would personally trust this a lot more because this came out of a Python program which I think has a lot more correctness guarantees than the mental arithmetic of a language model uh so just um another kind of uh potential hint that if you have these kinds of problems uh you may want to basically just uh ask the model to use the code interpreter and just

[1:57:30] like we saw with the web search the model has special uh kind of tokens for calling uh like it will not actually generate these tokens from the language model it will write the program and then it actually sends that program to a different sort of part of the computer that actually just runs that program and brings back the result and then the model gets access to that result and can tell you that okay the cost of each apple is seven um so that's another kind of tool and I would use this in practice for yourself

[1:58:00] and it's um yeah it's just uh less error prone I would say so that's why I called this section models need tokens to think distribute your competition across many tokens ask models to create intermediate results or whenever you can lean on tools and Tool use instead of allowing the models to do all of the stuff in their memory so if they try to do it all in their memory I don't fully trust it and prefer to use tools whenever possible I want to show you one more example of where this actually comes up and that's in counting so models

[1:58:30] actually are not very good at counting for the exact same reason you're asking for way too much in a single individual token so let me show you a simple example of that um how many dots are below and then I just put in a bunch of dots and Chach says there are and then it just tries to solve the problem in a single token so in a single token it has to count the number of dots in its context window um and it has to do that in the single forward pass of a network and a single forward pass of a network as we talked

[1:59:00] about there's not that much computation that can happen there just think of that as being like very little competation that happens there so if I just look at what the model sees let's go to the LM go to tokenizer it sees uh this how many dots are below and then it turns out that these dots here this group of I think 20 dots is a single token and then this group of whatever it is is another token and then for some reason they break up as this so I don't actually this has to do with the details

[1:59:30] of the tokenizer but it turns out that these um the model basically sees the token ID this this this and so on and then from these token IDs it's expected to count the number and spoiler alert is not 161 it's actually I believe 177 so here's what we can do instead uh we can say use code and you might expect that like why should this work and it's actually kind of subtle and kind of interesting so when I say use code I actually expect this to work let's see

[2:00:00] okay 177 is correct so what happens here is I've actually it doesn't look like it but I've broken down the problem into a problems that are easier for the model I know that the model can't count it can't do mental counting but I know that the model is actually pretty good at doing copy pasting so what I'm doing here is when I say use code it creates a string in Python for this and the task of basically copy pasting my input here to here is very simple because for the

[2:00:30] model um it sees this string of uh it sees it as just these four tokens or whatever it is so it's very simple for the model to copy paste those token IDs and um kind of unpack them into Dots here and so it creates this string and then it calls python routine. count and then it comes up with the correct answer so the python interpreter is doing the counting it's not the models mental arithmetic doing the counting so it's

[2:01:00] again a simple example of um models need tokens to think don't rely on their mental arithmetic and um that's why also the models are not very good at counting if you need them to do counting tasks always ask them to lean on the tool now the models also have many other little cognitive deficits here and there and these are kind of like sharp edges of the technology to be kind of aware of over time so as an example the models are not very good with all kinds of spelling related tasks they're not very good at it and I told you that we would loop back around to tokenization and the

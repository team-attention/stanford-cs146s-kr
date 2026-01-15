---
title: "7. GPT-2: Training and Inference"
titleKr: "7. GPT-2: 훈련과 추론"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 7
totalChapters: 24
---

# 7. GPT-2: 훈련과 추론

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 7/24

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

OpenAI의 GPT-2를 예시로 학습과 추론을 시연합니다.

**핵심 포인트:**
- 2019년 공개, 15억 파라미터
- llm.c로 재현 가능 (약 $100-600)
- loss 감소를 통해 학습 진행 확인

---

## 영어 원문 트랜스크립트

## 7. GPT-2: Training and Inference

**요약**: OpenAI의 GPT-2 모델을 예시로 학습과 추론을 시연합니다. 2019년에 공개된 GPT-2는 15억 개의 파라미터를 가지며, GitHub의 llm.c 프로젝트로 직접 학습해볼 수 있습니다. 인터넷 데이터의 통계적 패턴을 학습한 모델의 특성을 보여줍니다.

[31:30] interaction is GPT 4 so the fourth iteration of that series now gpt2 was published in 2019 by openi in this paper that I have right here and the reason I like gpt2 is that it is the first time that a recognizably modern stack came together so um all of the pieces of gpd2 are recognizable today by modern standards it's just everything has gotten bigger now I'm not going to be able to go into the full details of this paper of course because it is a technical publication but some of the

[32:00] details that I would like to highlight are as follows gpt2 was a Transformer neural network just like you were just like the neural networks you would work with today it was it had 1.6 billion parameters right so these are the parameters that we looked at here it would have 1.6 billion of them today modern Transformers would have a lot closer to a trillion or several hundred billion probably the maximum context length here was 1,24 tokens so it is when we are

[32:30] sampling chunks of Windows of tokens from the data set we're never taking more than 1,24 tokens and so when you are trying to predict the next token in a sequence you will never have more than 1,24 tokens uh kind of in your context in order to make that prediction now this is also tiny by modern standards today the token uh the context lengths would be a lot closer to um couple hundred thousand or maybe even a million and so you have a lot more context a lot more tokens in history history and you

[33:00] can make a lot better prediction about the next token in the sequence in that way and finally gpt2 was trained on approximately 100 billion tokens and this is also fairly small by modern standards as I mentioned the fine web data set that we looked at here the fine web data set has 15 trillion tokens uh so 100 billion is is quite small now uh I actually tried to reproduce uh gpt2 for fun as part of this project called lm. C so you can see my rup of

[33:30] doing that in this post on GitHub under the lm. C repository so in particular the cost of training gpd2 in 2019 what was estimated to be approximately $40,000 but today you can do significantly better than that and in particular here it took about one day and about $600 uh but this wasn't even trying too hard I think you could really bring this down to about $100 today now why is it that the costs have come down so much well number one these data sets have

[34:00] gotten a lot better and the way we filter them extract them and prepare them has gotten a lot more refined and so the data set is of just a lot higher quality so that's one thing but really the biggest difference is that our computers have gotten much faster in terms of the hardware and we're going to look at that in a second and also the software for uh running these models and really squeezing out all all the speed from the hardware as it is possible uh that software has also gotten much better as as everyone has focused on

[34:30] these models and try to run them very very quickly now I'm not going to be able to go into the full detail of this gpd2 reproduction and this is a long technical post but I would like to still give you an intuitive sense for what it looks like to actually train one of these models as a researcher like what are you looking at and what does it look like what does it feel like so let me give you a sense of that a little bit okay so this is what it looks like let me slide this over so what I'm doing here is I'm training a gpt2 model right now

[35:00] and um what's happening here is that every single line here like this one is one update to the model so remember how here we are um basically making the prediction better for every one of these tokens and we are updating these weights or parameters of the neural net so here every single line is One update to the neural network where we change its parameters by a little bit so that it is better at predicting next token and sequence in particular every single line

[35:30] here is improving the prediction on 1 million tokens in the training set so we've basically taken 1 million tokens out of this data set and we've tried to improve the prediction of that token as coming next in a sequence on all 1 million of them simultaneously and at every single one of these steps we are making an update to the network for that now the number to watch closely is this number called

[36:00] loss and the loss is a single number that is telling you how well your neural network is performing right now and it is created so that low loss is good so you'll see that the loss is decreasing as we make more updates to the neural nut which corresponds to making better predictions on the next token in a sequence and so the loss is the number that you are watching as a neural network researcher and you are kind of waiting you're twiddling your thumbs uh you're drinking coffee and you're making sure that this looks good so that with

[36:30] every update your loss is improving and the network is getting better at prediction now here you see that we are processing 1 million tokens per update each update takes about 7 Seconds roughly and here we are going to process a total of 32,000 steps of optimization so 32,000 steps with 1 million tokens each is about 33 billion tokens that we are going to process and we're currently only about 420 step 20

[37:00] out of 32,000 so we are still only a bit more than 1% done because I've only been running this for 10 or 15 minutes or something like that now every 20 steps I have configured this optimization to do inference so what you're seeing here is the model is predicting the next token in a sequence and so you sort of start it randomly and then you continue plugging in the tokens so we're running this inference step and this is the model sort of predicting the next token in the sequence and every time you see something appear that's a new

[37:30] token um so let's just look at this and you can see that this is not yet very coherent and keep in mind that this is only 1% of the way through training and so the model is not yet very good at predicting the next token in the sequence so what comes out is actually kind of a little bit of gibberish right but it still has a little bit of like local coherence so since she is mine it's a part of the information should discuss my father great companions Gordon showed me sitting over at and Etc

[38:00] so I know it doesn't look very good but let's actually scroll up and see what it looked like when I started the optimization so all the way here at step one so after 20 steps of optimization you see that what we're getting here is looks completely random and of course that's because the model has only had 20 updates to its parameters and so it's giving you random text because it's a random Network and so you can see that at least in comparison to this model is starting to do much better and indeed if

[38:30] we waited the entire 32,000 steps the model will have improved the point that it's actually uh generating fairly coherent English uh and the tokens stream correctly um and uh they they kind of make up English a a lot better um so this has to run for about a day or two more now and so uh at this stage we just make sure that the loss is decreasing everything is looking good um and we just have to wait

[39:00] and now um let me turn now to the um story of the computation that's required because of course I'm not running this optimization on my laptop that would be way too expensive uh because we have to run this neural network and we have to improve it and we have we need all this data and so on so you can't run this too well on your computer uh because the network is just too large uh so all of this is running on the computer that is out there in the cloud and I want to basically address the compute side of the store of training these models and

[39:30] what that looks like so let's take a look okay so the computer that I'm running this optimization on is this 8X h100 node so there are eight h100s in a single node or a single computer now I am renting this computer and it is somewhere in the cloud I'm not sure where it is physically actually the place I like to rent from is called Lambda but there are many other companies who provide this service so when you scroll down you can see that uh they have some on demand pricing for

[40:00] um sort of computers that have these uh h100s which are gpus and I'm going to show you what they look like in a second but on demand 8times Nvidia h100 uh GPU this machine comes for $3 per GPU per hour for example so you can rent these and then you get a machine in a cloud and you can uh go in and you can train these models and these uh gpus they look like this so this is one h100 GPU uh this is

[40:30] kind of what it looks like and you slot this into your computer and gpus are this uh perfect fit for training your networks because they are very computationally expensive but they display a lot of parallelism in the computation so you can have many independent workers kind of um working all at the same time in solving uh the matrix multiplication that's under the hood of training these neural networks so this is just one of these h100s but actually you would put them you would put multiple of them together

[41:00] so you could stack eight of them into a single node and then you can stack multiple nodes into an entire data center or an entire system center can't spell when we look at a data center we start to see things that look like this right so we have one GPU goes to eight gpus goes to a single system goes to many systems and so these are the bigger data centers and there of course would be much much more expensive um and what's happening is that all the

[41:30] big tech companies really desire these gpus so they can train all these language models because they are so powerful and that has is fundamentally what has driven the stock price of Nvidia to be $3.4 trillion today as an example and why Nvidia has kind of exploded so this is the Gold Rush the Gold Rush is getting the gpus getting enough of them so they can all collaborate to perform this optimization and they're what are they all doing they're all collaborating to predict the

[42:00] next token on a data set like the fine web data set this is the computational workflow that that basically is extremely expensive the more gpus you have the more tokens you can try to predict and improve on and you're going to process this data set faster and you can iterate faster and get a bigger Network and train a bigger Network and so on so this is what all those machines are look like are uh are doing and this is why all of this is such a big deal and for example this is a

[42:30] article from like about a month ago or so this is why it's a big deal that for example Elon Musk is getting 100,000 gpus uh in a single Data Center and all of these gpus are extremely expensive are going to take a ton of power and all of them are just trying to predict the next token in the sequence and improve the network uh by doing so and uh get probably a lot more coherent text than what we're seeing here a lot faster okay so unfortunately I do not have a couple 10 or hundred million of dollars to spend on training a really big model

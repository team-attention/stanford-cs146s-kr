---
title: "8. Llama 3.1 Base Model Inference"
titleKr: "8. Llama 3.1 베이스 모델 추론"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 8
totalChapters: 24
---

# 8. Llama 3.1 베이스 모델 추론

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 8/24

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

베이스 모델의 특성과 추론 예시를 보여줍니다.

**핵심 포인트:**
- 베이스 모델은 인터넷 텍스트 시뮬레이터
- 어시스턴트가 아닌 문서 완성기
- 후속학습 필요성 설명

---

## 영어 원문 트랜스크립트

## 8. Llama 3.1 Base Model Inference

**요약**: Meta의 Llama 3.1 베이스 모델을 사용한 추론을 시연합니다. 베이스 모델은 아직 대화형으로 학습되지 않아 질문에 직접 답하지 않고, 인터넷 텍스트 패턴을 따라 문서를 완성하려 합니다. 이를 "token simulator" 또는 "document completer"라고 부릅니다.

[43:00] like this but luckily we can turn to some big tech companies who train these models routinely and release some of them once they are done training so they've spent a huge amount of compute to train this network and they release the network at the end of the optimization so it's very useful because they've done a lot of compute for that so there are many companies who train these models routinely but actually not many of them release uh these what's called base models so the model that comes out at the end here is is what's called a base model what is a base model

[43:30] it's a token simulator right it's an internet text token simulator and so that is not by itself useful yet because what we want is what's called an assistant we want to ask questions and have it respond to answers these models won't do that they just uh create sort of remixes of the internet they dream internet pages so the base models are not very often released because they're kind of just only a step one of a few other steps that we still need to take to get in system

[44:00] however a few releases have been made so as an example the gbt2 model released the 1.6 billion sorry 1.5 billion model back in 2019 and this gpt2 model is a base model now what is a model release what does it look like to release these models so this is the gpt2 repository on GitHub well you need two things basically to release model number one we need the um python code usually that

[44:30] describes the sequence of operations in detail that they make in their model so um if you remember back this Transformer the sequence of steps that are taken here in this neural network is what is being described by this code so this code is sort of implementing the what's called forward pass of this neural network so we need the specific details of exactly how they wired up that neural network so this is just computer code and it's usually just a couple hundred lines of code it's not

[45:00] it's not that crazy and uh this is all fairly understandable and usually fairly standard what's not standard are the parameters that's where the actual value is what are the parameters of this neural network because there's 1.6 billion of them and we need the correct setting or a really good setting and so that's why in addition to this source code they release the parameters which in this case is roughly 1.5 billion parameters and these are just numbers so it's one single list of 1.5 billion

[45:30] numbers the precise and good setting of all the knobs such that the tokens come out well so uh you need those two things to get a base model release now gpt2 was released but that's actually a fairly old model as I mentioned so actually the model we're going to turn to is called llama 3 and that's the one that I would like to show you next so llama 3 so gpt2 again was 1.6 billion parameters trained on 100 billion tokens Lama 3 is a much bigger

[46:00] model and much more modern model it is released and trained by meta and it is a 45 billion parameter model trained on 15 trillion tokens in very much the same way just much much bigger um and meta has also made a release of llama 3 and that was part of this paper so with this paper that goes into a lot of detail the biggest base model that they released is the Lama 3.1 4.5

[46:30] 405 billion parameter model so this is the base model and then in addition to the base model you see here foreshadowing for later sections of the video they also released the instruct model and the instruct means that this is an assistant you can ask it questions and it will give you answers we still have yet to cover that part later for now let's just look at this base model this token simulator and let's play with it and try to think about you know what is this thing and how does it work and um what do we get at the end of this optimization if you let this run Until the End uh for a very big neural network

[47:00] on a lot of data so my favorite place to interact with the base models is this um company called hyperbolic which is basically serving the base model of the 405b Llama 3.1 so when you go to the website and I think you may have to register and so on make sure that in the models make sure that you are using llama 3.1 405 billion base it must be the base model and then here let's say the max tokens is how many tokens we're going to be gener rating so let's just

[47:30] decrease this to be a bit less just so we don't waste compute we just want the next 128 tokens and leave the other stuff alone I'm not going to go into the full detail here um now fundamentally what's going to happen here is identical to what happens here during inference for us so this is just going to continue the token sequence of whatever you prefix you're going to give it so I want to first show you that this model here is not yet an assistant so you can for example ask it what is 2 plus 2 it's not going to tell you oh it's four uh what else can I help you with it's not going

[48:00] to do that because what is 2 plus 2 is going to be tokenized and then those tokens just act as a prefix and then what the model is going to do now is just going to get the probability for the next token and it's just a glorified autocomplete it's a very very expensive autocomplete of what comes next um depending on the statistics of what it saw in its training documents which are basically web pages so let's just uh hit enter to see

[48:30] continuation okay so here it kind of actually answered the question and started to go off into some philosophical territory uh let's try it again so let me copy and paste and let's two so okay so it just goes off again so notice one more thing that I want to stress is that the system uh I think every time you put it in it just kind of starts from scratch so it doesn't uh the system here is

[49:00] stochastic so for the same prefix of tokens we're always getting a different answer and the reason for that is that we get this probity distribution and we sample from it and we always get different samples and we sort of always go into a different territory uh afterwards so here in this case um I don't know what this is let's try one time so it just continues on so it's just doing the stuff that it's saw on the internet right um and it's just kind

[49:30] of like regurgitating those uh statistical patterns so first things it's not an assistant yet it's a token autocomplete and second it is a stochastic system now the crucial thing is that even though this model is not yet by itself very useful for a lot of applications just yet um it is still very useful because in the task of predicting the next token in the sequence the model has learned a lot about the world and it has stored

[50:00] all that knowledge in the parameters of the network so remember that our text looked like this right internet web pages and now all of this is sort of compressed in the weights of the network so you can think of um these 405 billion parameters is a kind of compression of the internet you can think of the 45 billion parameters is kind of like a zip file uh but it's not a loss less compression it's a loss C compression we're kind of like left with kind of a

[50:30] gal of the internet and we can generate from it right now we can elicit some of this knowledge by prompting the base model uh accordingly so for example here's a prompt that might work to elicit some of that knowledge that's hiding in the parameters here's my top 10 list of the top landmarks to see in pairs um and I'm doing it this way because I'm trying to Prime the model to now continue this list so let's see if that works when I press

[51:00] enter okay so you see that it started a list and it's now kind of giving me some of those landmarks and now notice that it's trying to give a lot of information here now you might not be able to actually fully trust some of the information here remember that this is all just a recollection of some of the internet documents and so the things that occur very frequently in the internet data are probably more likely to be remembered correctly compared to things that happen very infrequently so you can't fully trust some of the things that and some of the information that is here because

[51:30] it's all just a vague recollection of Internet documents because the information is not stored explicitly in any of the parameters it's all just the recollection that said we did get something that is probably approximately correct and I don't actually have the expertise to verify that this is roughly correct but you see that we've elicited a lot of the knowledge of the model and this knowledge is not precise and exact this knowledge is vague and probabilistic and statistical and the kinds of things that occur often are the kinds of things that are more likely to

[52:00] be remembered um in the model now I want to show you a few more examples of this model's Behavior the first thing I want to show you is this example I went to the Wikipedia page for zebra and let me just copy paste the first uh even one sentence here and let me put it here now when I click enter what kind of uh completion are we going to get so let me just hit enter there are three living species etc etc what the model is producing here

[52:30] is an exact regurgitation of this Wikipedia entry it is reciting this Wikipedia entry purely from memory and this memory is stored in its parameters and so it is possible that at some point in these 512 tokens the model will uh stray away from the Wikipedia entry but you can see that it has huge chunks of it memorized here uh let me see for example if this sentence occurs by now okay so this so we're still on track let me check

[53:00] here okay we're still on track it will eventually uh stray away okay so this thing is just recited to a very large extent it will eventually deviate uh because it won't be able to remember exactly now the reason that this happens is because these models can be extremely good at memorization and usually this is not what you want in the final model and this is something called regurgitation and it's usually undesirable to site uh things uh directly uh that you have trained on now the reason that this

[53:30] happens actually is because for a lot of documents like for example Wikipedia when these documents are deemed to be of very high quality as a source like for example Wikipedia it is very often uh the case that when you train the model you will preferentially sample from those sources so basically the model has probably done a few epochs on this data meaning that it has seen this web page like maybe probably 10 times or so and it's a bit like you like when you read some kind of a text many many times say you read something a 100 times uh then

[54:00] you'll be able to recite it and it's very similar for this model if it sees something way too often it's going to be able to recite it later from memory except these models can be a lot more efficient um like per presentation than human so probably it's only seen this Wikipedia entry 10 times but basically it has remembered this article exactly in its parameters okay the next thing I want to show you is something that the model has definitely not seen during its training so for example if we go to the paper uh and then we navigate to the

[54:30] pre-training data we'll see here that uh the data set has a knowledge cut off until the end of 2023 so it will not have seen documents after this point and certainly it has not seen anything about the 2024 election and how it turned out now if we Prime the model with the tokens from the future it will continue the token sequence and it will just take its best guess according to the knowledge that it has in its own parameters so let's take a look at what that could look like so the Republican Party kit

[55:00] Trump okay president of the United States from 2017 and let's see what it says after this point so for example the model will have to guess at the running mate and who it's against Etc so let's hit enter so here thingss that Mike Pence was the running mate instead of JD Vance and the ticket was against Hillary Clinton and Tim Kane so this is kind of a interesting parallel universe potentially of what could have happened happened according to the LM let's get a

[55:30] different sample so the identical prompt and let's resample so here the running mate was Ronda santis and they ran against Joe Biden and Camala Harris so this is again a different parallel universe so the model will take educated guesses and it will continue the token sequence based on this knowledge um and it will just kind of like all of what we're seeing here is what's called hallucination the model is just taking its best guess uh in a probalistic manner the next thing I would like to show you is that even

[56:00] though this is a base model and not yet an assistant model it can still be utilized in Practical applications if you are clever with your prompt design so here's something that we would call a few shot prompt so what it is here is that I have 10 words or 10 pairs and each pair is a word of English column and then a the translation in Korean and we have 10 of them and what the model does here is at the end we have teacher column and then here's where we're going to do a

[56:30] completion of say just five tokens and these models have what we call in context learning abilities and what that's referring to is that as it is reading this context it is learning sort of in place that there's some kind of a algorithmic pattern going on in my data and it knows to continue that pattern and this is called kind of like Inc context learning so it takes on the role of a translator and when we hit uh completion we see that the teacher translation is

[57:00] Sim which is correct um and so this is how you can build apps by being clever with your prompting even though we still just have a base model for now and it relies on what we call this um uh in context learning ability and it is done by constructing what's called a few shot prompt okay and finally I want to show you that there is a clever way to actually instantiate a whole language model assistant just by prompting and the trick to it is that we're structure a prompt to look like a web page that is

[57:30] a conversation between a helpful AI assistant and a human and then the model will continue that conversation so actually to write the prompt I turned to chat gbt itself which is kind of meta but I told it I want to create an llm assistant but all I have is the base model so can you please write my um uh prompt and this is what it came up with which is actually quite good so here's a conversation between an AI assistant and a human the AI assistant is knowledgeable helpful capable of answering wide

[58:00] variety of questions Etc and then here it's not enough to just give it a sort of description it works much better if you create this fot prompt so here's a few terms of human assistant human assistant and we have uh you know a few turns of conversation and then here at the end is we're going to be putting the actual query that we like so let me copy paste this into the base model prompt and now let me do human column and this

[58:30] is where we put our actual prompt why is the sky blue and uh let's uh run assistant the sky appears blue due to the phenomenon called R lights scattering etc etc so you see that the base model is just continuing the sequence but because the sequence looks like this conversation it takes on that role but it is a little subtle because here it just uh you know it ends the assistant and then just you know hallucinate Ates the next question by the human Etc so it'll just continue

[59:00] going on and on uh but you can see that we have sort of accomplished the task and if you just took this why is the sky blue and if we just refresh this and put it here then of course we don't expect this to work with a base model right we're just going to who knows what we're going to get okay we're just going to get more questions okay so this is one way to create an assistant even though you may only have a base model okay so this is the kind of brief summary of the things we talked about over the last few

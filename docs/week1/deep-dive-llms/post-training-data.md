---
title: "10. Post-Training Data (Conversations)"
titleKr: "10. 후속학습 데이터 - 대화"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 10
totalChapters: 24
---

# 10. 후속학습 데이터 - 대화

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 10/24

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

지도학습 미세조정(SFT)에 사용되는 대화 데이터를 설명합니다.

**핵심 포인트:**
- 인간 라벨러가 고품질 대화 작성
- 라벨링 지침에 따른 이상적 응답
- 수십만 대화로 어시스턴트 성격 형성

---

## 영어 원문 트랜스크립트

## 10. Post-Training Data (Conversations)

**요약**: 후속학습 데이터인 대화 데이터셋에 대해 설명합니다. 인간 라벨러들이 수만 개의 고품질 대화 예시를 작성하고, 이를 모델에 학습시킵니다. 이 과정을 Supervised Fine-Tuning(SFT)이라 하며, 모델이 어시스턴트처럼 행동하도록 만듭니다.

[1:01:30] if it was star instead of a plus assistant could respond with something like this um and similar here this is another example showing that the assistant could also have some kind of a personality here uh that it's kind of like nice and then here in the third example I'm showing that when a human is asking for something that we uh don't wish to help with we can produce what's called refusal we can say that we cannot help with that so in other words what we want to do now is we want to think through how in a system should interact with the human and we want to program the

[1:02:00] assistant and Its Behavior in these conversations now because this is neural networks we're not going to be programming these explicitly in code we're not going to be able to program the assistant in that way because this is neural networks everything is done through neural network training on data sets and so because of that we are going to be implicitly programming the assistant by creating data sets of conversations so these are three independent examples of conversations in a data dat set an actual data set and I'm going to show you examples will be

[1:02:30] much larger it could have hundreds of thousands of conversations that are multi- turn very long Etc and would cover a diverse breath of topics but here I'm only showing three examples but the way this works basically is uh a assistant is being programmed by example and where is this data coming from like 2 * 2al 4 same as 2 plus 2 Etc where does that come from this comes from Human labelers so we will basically give human labelers some conversational context and we will ask them to um

[1:03:00] basically give the ideal assistant response in this situation and a human will write out the ideal response for an assistant in any situation and then we're going to get the model to basically train on this and to imitate those kinds of responses so the way this works then is we are going to take our base model which we produced in the preing stage and this base model was trained on internet documents we're now going to take that data set of internet documents and we're gonna throw it out and we're going to substitute a new data set and

[1:03:30] that's going to be a data set of conversations and we're going to continue training the model on these conversations on this new data set of conversations and what happens is that the model will very rapidly adjust and will sort of like learn the statistics of how this assistant responds to human queries and then later during inference we'll be able to basically um Prime the assistant and get the response and it will be imitating what the humans will human labelers would do in that

[1:04:00] situation if that makes sense so we're going to see examples of that and this is going to become bit more concrete I also wanted to mention that this post-training stage we're going to basically just continue training the model but um the pre-training stage can in practice take roughly three months of training on many thousands of computers the post-training stage will typically be much shorter like 3 hours for example um and that's because the data set of conversations that we're going to create here manually is much much smaller than the data set of text on the internet and

[1:04:30] so this training will be very short but fundamentally we're just going to take our base model we're going to continue training using the exact same algorithm the exact same everything except we're swapping out the data set for conversations so the questions now are what are these conversations how do we represent them how do we get the model to see conversations instead of just raw text and then what are the outcomes of um this kind of training and what do you get in a certain like psychological sense uh when we talk about the model so

[1:05:00] let's turn to those questions now so let's start by talking about the tokenization of conversations everything in these models has to be turned into tokens because everything is just about token sequences so how do we turn conversations into token sequences is the question and so for that we need to design some kind of ending coding and uh this is kind of similar to maybe if you're familiar you don't have to be with for example the TCP IP packet in um on the internet there are precise rules and protocols for how you represent information how everything is structured

[1:05:30] together so that you have all this kind of data laid out in a way that is written out on a paper and that everyone can agree on and so it's the same thing now happening in llms we need some kind of data structures and we need to have some rules around how these data structures like conversations get encoded and decoded to and from tokens and so I want to show you now how I would recreate uh this conversation in the token space so if you go to Tech tokenizer I can take that conversation and this is

[1:06:00] how it is represented in uh for the language model so here we have we are iterating a user and an assistant in this two- turn conversation and what you're seeing here is it looks ugly but it's actually relatively simple the way it gets turned into a token sequence here at the end is a little bit complicated but at the end this conversation between a user and assistant ends up being 49 tokens it is a one-dimensional sequence of 49 tokens and these are the tokens okay and all the different llms will

[1:06:30] have a slightly different format or protocols and it's a little bit of a wild west right now but for example GPT 40 does it in the following way you have this special token called imore start and this is short for IM imaginary monologue uh the start then you have to specify um I don't actually know why it's called that to be honest then you have to specify whose turn it is so for example user which is a token 4

[1:07:00] 28 then you have internal monologue separator and then it's the exact question so the tokens of the question and then you have to close it so I am end the end of the imaginary monologue so basically the question from a user of what is 2 plus two ends up being the token sequence of these tokens and now the important thing to mention here is that IM start this is not text right IM start is a special token that gets added

[1:07:30] it's a new token and um this token has never been trained on so far it is a new token that we create in a post-training stage and we introduce and so these special tokens like IM seep IM start Etc are introduced and interspersed with text so that they sort of um get the model to learn that hey this is a the start of a turn for who is it start of the turn for the start of the turn is for the user and then this is what the user says and then the user ends and then it's a new start of a turn and it

[1:08:00] is by the assistant and then what does the assistant say well these are the tokens of what the assistant says Etc and so this conversation is not turned into the sequence of tokens the specific details here are not actually that important all I'm trying to show you in concrete terms is that our conversations which we think of as kind of like a structured object end up being turned via some encoding into onedimensional sequences of tokens and so because this is one dimensional sequence of tokens we can apply all the stuff that we applied

[1:08:30] before now it's just a sequence of tokens and now we can train a language model on it and so we're just predicting the next token in a sequence uh just like before and um we can represent and train on conversations and then what does it look like at test time during inference so say we've trained a model and we've trained a model on these kinds of data sets of conversations and now we want to inference so during inference what does this look like when you're on on chash apt well you come to chash apt and you

[1:09:00] have say like a dialogue with it and the way this works is basically um say that this was already filled in so like what is 2 plus 2 2 plus 2 is four and now you issue what if it was times I am end and what basically ends up happening um on the servers of open AI or something like that is they put in I start assistant I amep and this is where they end it right here so they construct this context and now they start sampling from the model so it's at

[1:09:30] this stage that they will go to the model and say okay what is a good for sequence what is a good first token what is a good second token what is a good third token and this is where the LM takes over and creates a response like for example response that looks something like this but it doesn't have to be identical to this but it will have the flavor of this if this kind of a conversation was in the data set so um that's roughly how the protocol Works although the details of this protocol are not important so again my goal is

[1:10:00] that just to show you that everything ends up being just a one-dimensional token sequence so we can apply everything we've already seen but we're now training on conversations and we're now uh basically generating conversations as well okay so now I would like to turn to what these data sets look like in practice the first paper that I would like to show you and the first effort in this direction is this paper from openai in 2022 and this paper was called instruct GPT or the technique that they developed and this was the first time that opena has kind

[1:10:30] of talked about how you can take language models and fine-tune them on conversations and so this paper has a number of details that I would like to take you through so the first stop I would like to make is in section 3.4 where they talk about the human contractors that they hired uh in this case from upwork or through scale AI to uh construct these conversations and so there are human labelers involved whose job it is professionally to create these conversations and these labelers are asked to come up with prompts and then

[1:11:00] they are asked to also complete the ideal assistant responses and so these are the kinds of prompts that people came up with so these are human labelers so list five ideas for how to regain enthusiasm for my career what are the top 10 science fiction books I should read next and there's many different types of uh kind of prompts here so translate this sentence from uh to Spanish Etc and so there's many things here that people came up with they first come up with the prompt and then they also uh answer that prompt and they give

[1:11:30] the ideal assistant response now how do they know what is the ideal assistant response that they should write for these prompts so when we scroll down a little bit further we see that here we have this excerpt of labeling instructions uh that are given to the human labelers so the company that is developing the language model like for example open AI writes up labeling instructions for how the humans should create ideal responses and so here for example is an excerpt uh of these kinds of labeling instruction instructions on High level you're asking people to be helpful truthful and harmless and you

[1:12:00] can pause the video if you'd like to see more here but on a high level basically just just answer try to be helpful try to be truthful and don't answer questions that we don't want um kind of the system to handle uh later in chat gbt and so roughly speaking the company comes up with the labeling instructions usually they are not this short usually there are hundreds of pages and people have to study them professionally and then they write out the ideal assistant responses uh following those labeling

[1:12:30] instructions so this is a very human heavy process as it was described in this paper now the data set for instruct GPT was never actually released by openi but we do have some open- Source um reproductions that were're trying to follow this kind of a setup and collect their own data so one that I'm familiar with for example is the effort of open Assistant from a while back and this is just one of I think many examples but I just want to show you an example so here's so these were people on the internet that were asked to basically create these conversations similar to

[1:13:00] what um open I did with human labelers and so here's an entry of a person who came up with this BR can you write a short introduction to the relevance of the term manop uh in economics please use examples Etc and then the same person or potentially a different person will write up the response so here's the assistant response to this and so then the same person or different person will actually write out this ideal response and then this is an example of

[1:13:30] maybe how the conversation could continue now explain it to a dog and then you can try to come up with a slightly a simpler explanation or something like that now this then becomes the label and we end up training on this so what happens during training is that um of course we're not going to have a full coverage of all the possible questions that um the model will encounter at test time during inference we can't possibly cover all the possible prompts that people are going to be

[1:14:00] asking in the future but if we have a like a data set of a few of these examples then the model during training will start to take on this Persona of this helpful truthful harmless assistant and it's all programmed by example and so these are all examples of behavior and if you have conversations of these example behaviors and you have enough of them like 100,00 and you train on it the model sort of starts to understand the statistical pattern and it kind of takes on this personality of this

[1:14:30] assistant now it's possible that when you get the exact same question like this at test time it's possible that the answer will be recited as exactly what was in the training set but more likely than that is that the model will kind of like do something of a similar Vibe um and we will understand that this is the kind of answer that you want um so that's what we're doing we're programming the system um by example and the system adopts statistically this

[1:15:00] Persona of this helpful truthful harmless assistant which is kind of like reflected in the labeling instructions that the company creates now I want to show you that the state-of-the-art has kind of advanced in the last 2 or 3 years uh since the instr GPT paper so in particular it's not very common for humans to be doing all the heavy lifting just by themselves anymore and that's because we now have language models and these language models are helping us create these data sets and conversations so it is very rare that the people will like literally just write out the response from scratch it is a lot more likely that they will use an existing

[1:15:30] llm to basically like uh come up with an answer and then they will edit it or things like that so there's many different ways in which now llms have started to kind of permeate this posttraining Set uh stack and llms are basically used pervasively to help create these massive data sets of conversations so I don't want to show like Ultra chat is one um such example of like a more modern data set of conversations it is to a very large extent synthetic but uh I believe there's some human involvement I could

[1:16:00] be wrong with that usually there will be a little bit of human but there will be a huge amount of synthetic help um and this is all kind of like uh constructed in different ways and Ultra chat is just one example of many sft data sets that currently exist and the only thing I want to show you is that uh these data sets have now millions of conversations uh these conversations are mostly synthetic but they're probably edited to some extent by humans and they span a huge diversity of sort of

[1:16:30] um uh areas and so on so these are fairly extensive artifacts by now and there's all these like sft mixtures as they're called so you have a mixture of like lots of different types and sources and it's partially synthetic partially human and it's kind of like um gone in that direction since uh but roughly speaking we still have sft data sets they're made up of conversations we're training on them um just like we did before and uh I guess like the last thing to note

[1:17:00] is that I want to dispel a little bit of the magic of talking to an AI like when you go to chat GPT and you give it a question and then you hit enter uh what is coming back is kind of like statistically aligned with what's happening in the training set and these training sets I mean they really just have a seed in humans following labeling instructions so what are you actually talking to in chat GPT or how should you think about it well it's not coming from some magical AI like roughly speaking it's coming from something that is

[1:17:30] statistically imitating human labelers which comes from labeling instructions written by these companies and so you're kind of imitating this uh you're kind of getting um it's almost as if you're asking human labeler and imagine that the answer that is given to you uh from chbt is some kind of a simulation of a human labeler uh and it's kind of like asking what would a human labeler say in this kind of a conversation and uh it's not just like this human

[1:18:00] labeler is not just like a random person from the internet because these companies actually hire experts so for example when you are asking questions about code and so on the human labelers that would be in um involved in creation of these conversation data sets they will usually be usually be educated expert people and you're kind of like asking a question of like a simulation of those people if that makes sense so you're not talking to a magical AI you're talking to an average labeler this average labeler is probably fairly highly skilled but you're talking to kind of like an instantaneous simulation of that kind of

[1:18:30] a person that would be hired uh in the construction of these data sets so let me give you one more specific example before we move on for example when I go to chpt and I say recommend the top five landmarks who see in Paris and then I hit uh okay here we go okay when I hit enter what's coming out here how do I think about it well it's not some kind of a magical AI that has gone out and

[1:19:00] researched all the landmarks and then ranked them using its infinite intelligence Etc what I'm getting is a statistical simulation of a labeler that was hired by open AI you can think about it roughly in that way and so if this specific um question is in the posttraining data set somewhere at open aai then I'm very likely to see an answer that is probably very very similar to what that human labeler would have put down for those five landmarks how does the human labeler come up with this well they go off and they go on the internet

[1:19:30] and they kind of do their own little research for 20 minutes and they just come up with a list right now so if they come up with this list and this is in the data set I'm probably very likely to see what they submitted as the correct answer from the assistant now if this specific query is not part of the post training data set then what I'm getting here is a little bit more emergent uh because uh the model kind of understands the statistically um the kinds of landmarks that are in this training set are usually the

[1:20:00] prominent landmarks the landmarks that people usually want to see the kinds of landmarks that are usually uh very often talked about on the internet and remember that the model already has a ton of Knowledge from its pre-training on the internet so it's probably seen a ton of conversations about Paris about landmarks about the kinds of things that people like to see and so it's the pre-training knowledge that has then combined with the postering data set that results in this kind of an imitation um so that's uh that's roughly how you can kind of think about what's happening

[1:20:30] behind the scenes here in in this statistical sense okay now I want to turn to the topic of llm psychology as I like to call it which is what are sort of the emergent cognitive effects of the training pipeline that we have for these models so in particular the first one I want to talk to is of course hallucinations so you might be familiar with model hallucinations it's when llms make stuff up they just totally fabricate information Etc and it's a big problem with llm assistants it is a

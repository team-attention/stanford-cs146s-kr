---
title: "16. Supervised Finetuning to Reinforcement Learning"
titleKr: "16. SFT에서 강화학습으로"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 16
totalChapters: 24
---

# 16. SFT에서 강화학습으로

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 16/24

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

강화학습 단계로의 전환을 설명합니다.

**핵심 포인트:**
- SFT: 전문가 모방
- RL: 스스로 발견
- 연습 문제처럼 실력 향상

---

## 영어 원문 트랜스크립트

## 16. Supervised Finetuning to Reinforcement Learning

**요약**: 지도학습 미세조정(SFT)에서 강화학습(RL)으로의 전환을 설명합니다. SFT는 모델에게 "어떻게 답해야 하는지" 가르치지만, RL은 모델이 스스로 더 나은 답을 찾도록 합니다. 이 단계에서 모델 성능이 크게 향상됩니다.

[2:07:30] now covered two major stages of training of large language models we saw that in the first stage this is called the pre-training stage we are basically training on internet documents and when you train a language model on internet documents you get what's called a base model and it's basically an internet document simulator right now we saw that this is an interesting artifact and uh this takes many months to train on thousands of computers and it's kind of a lossy compression of the internet and it's extremely interesting but it's not

[2:08:00] directly useful because we don't want to sample internet documents we want to ask questions of an AI and have it respond to our questions so for that we need an assistant and we saw that we can actually construct an assistant in the process of a post training and specifically in the process of supervised fine-tuning as we call it so in this stage we saw that it's algorithmically identical to pre-training nothing is going to change the only thing that changes is the data

[2:08:30] set so instead of Internet documents we now want to create and curate a very nice data set of conversations so we want Millions conversations on all kinds of diverse topics between a human and an assistant and fundamentally these conversations are created by humans so humans write the prompts and humans write the ideal response responses and they do that based on labeling documentations now in the modern stack it's not actually done fully and

[2:09:00] manually by humans right they actually now have a lot of help from these tools so we can use language models um to help us create these data sets and that's done extensively but fundamentally it's all still coming from Human curation at the end so we create these conversations that now becomes our data set we fine tune on it or continue training on it and we get an assistant and then we kind of shifted gears and started talking about some of the kind of cognitive implications of what this assistant is like and we saw that for example the assistant will hallucinate if you don't

[2:09:30] take some sort of mitigations towards it so we saw that hallucinations would be common and then we looked at some of the mitigations of those hallucinations and then we saw that the models are quite impressive and can do a lot of stuff in their head but we saw that they can also Lean On Tools to become better so for example we can lo lean on a web search in order to hallucinate less and to maybe bring up some more um recent information or something like that or we can lean on tools like code interpreter so the code can so the llm can write

[2:10:00] some code and actually run it and see results so these are some of the topics we looked at so far um now what I'd like to do is I'd like to cover the last and major stage of this Pipeline and that is reinforcement learning so reinforcement learning is still kind of thought to be under the umbrella of posttraining uh but it is the last third major stage and it's a different way of training language models and usually follows as this third step so inside companies like

[2:10:30] open AI you will start here and these are all separate teams so there's a team doing data for pre-training and a team doing training for pre-training and then there's a team doing all the conversation generation in a in a different team that is kind of doing the supervis fine tuning and there will be a team for the reinforcement learning as well so it's kind of like a handoff of these models you get your base model the then you find you need to be an assistant and then you go into reinforcement learning which we'll talk about uh now so that's kind of like the major

[2:11:00] flow and so let's now focus on reinforcement learning the last major stage of training and let me first actually motivate it and why we would want to do reinforcement learning and what it looks like on a high level so I would now like to try to motivate the reinforcement learning stage and what it corresponds to with something that you're probably familiar with and that is basically going to school so just like you went to school to become um really good at something we want to take large language models through school and really what we're doing is um we're um

[2:11:30] we have a few paradigms of ways of uh giving them knowledge or transferring skills so in particular when we're working with textbooks in school you'll see that there are three major kind of uh pieces of information in these textbooks three classes of information the first thing you'll see is you'll see a lot of exposition um and by the way this is a totally random book I pulled from the internet I I think it's some kind of an organic chemistry or something I'm not sure uh but the important thing is that you'll see that most of the text most of it is kind of

[2:12:00] just like the meat of it is exposition it's kind of like background knowledge Etc as you are reading through the words of this Exposition you can think of that roughly as training on that data so um and that's why when you're reading through this stuff this background knowledge and this all this context information it's kind of equivalent to pre-training so it's it's where we build sort of like a knowledge base of this data and get a sense of the topic the next major kind of information that you

[2:12:30] will see is these uh problems and with their worked Solutions so basically a human expert in this case uh the author of this book has given us not just a problem but has also worked through the solution and the solution is basically like equivalent to having like this ideal response for an assistant so it's basically the expert is showing us how to solve the problem in it's uh kind of like um in its full form so as we are reading the solution we are basically

[2:13:00] training on the expert data and then later we can try to imitate the expert um and basically um that's that roughly correspond to having the sft model that's what it would be doing so basically we've already done pre-training and we've already covered this um imitation of experts and how they solve these problems and the third stage of reinforcement learning is basically the practice problems so sometimes you'll see this is just a single practice problem here but of course there will be usually many

[2:13:30] practice problems at the end of each chapter in any textbook and practice problems of course we know are critical for learning because what are they getting you to do they're getting you to practice uh to practice yourself and discover ways of solving these problems yourself and so what you get in a practice problem is you get a problem description but you're not given the solution but you are given the final answer answer usually in the answer key of the textbook and so you know the final answer that you're trying to get to and you have the problem statement

[2:14:00] but you don't have the solution you are trying to practice the solution you're trying out many different things and you're seeing what gets you to the final solution the best and so you're discovering how to solve these problems so and in the process of that you're relying on number one the background information which comes from pre-training and number two maybe a little bit of imitation of human experts and you can probably try similar kinds of solutions and so on so we've done this and this and now in this section

[2:14:30] we're going to try to practice and so we're going to be given prompts we're going to be given Solutions U sorry the final answers but we're not going to be given expert Solutions we have to practice and try stuff out and that's what reinforcement learning is about okay so let's go back to the problem that we worked with previously just so we have a concrete example to talk through as we explore sort of the topic here so um I'm here in the Teck tokenizer because I'd also like to well I get a text box which is useful but number two I want to remind you again that we're always working with

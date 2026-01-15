---
title: "21. Preview of Things to Come"
titleKr: "21. 앞으로의 전망"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 21
totalChapters: 24
---

# 21. 앞으로의 전망

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 21/24

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

LLM의 미래 발전 방향입니다.

**핵심 포인트:**
- 멀티모달: 이미지, 오디오, 비디오
- 에이전트: 장시간 자율 작업
- 컴퓨터 사용: 키보드/마우스 제어

---

## 영어 원문 트랜스크립트

## 21. Preview of Things to Come

**요약**: LLM의 미래 발전 방향을 전망합니다. 멀티모달(이미지, 오디오, 비디오), 에이전트 시스템, 더 긴 컨텍스트 윈도우, 로봇공학 통합 등이 활발히 연구되고 있습니다. AI 시스템이 점점 더 자율적으로 작동하는 방향으로 발전하고 있습니다.

[3:10:00] above concerned text but very soon we'll have llms that can not just handle text but they can also operate natively and very easily over audio so they can hear and speak and also images so they can see and paint and we're already seeing the beginnings of all of this uh but this will be all done natively inside inside the language model and this will enable kind of like natural conversations and roughly speaking the reason that this is actually no different from everything we've covered above is that as a baseline you can

[3:10:30] tokenize audio and images and apply the exact same approaches of everything that we've talked about above so it's not a fundamental change it's just uh it's just a to we have to add some tokens so as an example for tokenizing audio we can look at slices of the spectrogram of the audio signal and we can tokenize that and just add more tokens that suddenly represent audio and just add them into the context windows and train on them just like above the same for images we can use patches and we can separately tokenize patches and then

[3:11:00] what is an image an image is just a sequence of tokens and this actually kind of works and there's a lot of early work in this direction and so we can just create streams of tokens that are representing audio images as well as text and interpers them and handle them all simultaneously in a single model so that's one example of multimodality uh second something that people are very interested in is currently most of the work is that we're handing individual tasks to the models on kind of like a silver platter like please solve this task for me and the model sort of like does this little

[3:11:30] task but it's up to us to still sort of like organize a coherent execution of tasks to perform jobs and the models are not yet at the capability required to do this in a coherent error correcting way over long periods of time so they're not able to fully string together tasks to perform these longer running jobs but they're getting there and this is improving uh over time but uh probably what's going to happen here is we're going to start to see what's called

[3:12:00] agents which perform tasks over time and you you supervise them and you watch their work and they come up to once in a while report progress and so on so we're going to see more long running agents uh tasks that don't just take you know a few seconds of response but many tens of seconds or even minutes or hours over time uh but these uh models are not infallible as we talked about above so all of this will require supervision so for example in factories people talk about the human to robot ratio uh for automation I think we're going to see something similar in the digital space

[3:12:30] where we are going to be talking about human to agent ratios where humans becomes a lot more supervisors of agent tasks um in the digital domain uh next um I think everything is going to become a lot more pervasive and invisible so it's kind of like integrated into the tools and everywhere um and in addition kind of like computer using so right now these models aren't able to take actions on your behalf but I think this is a separate bullet point

[3:13:00] um if you saw chpt launch the operator then uh that's one early example of that where you can actually hand off control to the model to perform you know keyboard and mouse actions on your behalf so that's also something that that I think is very interesting the last point I have here is just a general comment that there's still a lot of research to potentially do in this domain main one example of that uh is something along the lines of test time training so remember that everything we've done above and that we talked about has two major stages there's first the training stage where we tune the

[3:13:30] parameters of the model to perform the tasks well once we get the parameters we fix them and then we deploy the model for inference from there the model is fixed it doesn't change anymore it doesn't learn from all the stuff that it's doing a test time it's a fixed um number of parameters and the only thing that is changing is now the token inside the context windows and so the only type of learning or test time learning that the model has access to is the in context learning of its uh kind of like uh dynamically adjustable context window

[3:14:00] depending on like what it's doing at test time so but I think this is still different from humans who actually are able to like actually learn uh depending on what they're doing especially when you sleep for example like your brain is updating your parameters or something like that right so there's no kind of equivalent of that currently in these models and tools so there's a lot of like um more wonky ideas I think that are to be explored still and uh in particular I think this will be necessary because the context window is a finite and precious resource and especially once we start to tackle very

[3:14:30] long running multimodal tasks and we're putting in videos and these token windows will basically start to grow extremely large like not thousands or even hundreds of thousands but significantly beyond that and the only trick uh the only kind of trick we have Avail to us right now is to make the context Windows longer but I think that that approach by itself will will not will not scale to actual long running tasks that are multimodal over time and so I think new ideas are needed in some of those disciplines um in some of those kind of cases in the main where these

[3:15:00] tasks are going to require very long contexts so those are some examples of some of the things you can um expect coming down the pipe let's now turn to where you can actually uh kind of keep track of this progress and um you know be up to date with the latest and grest of what's happening in the field so I would say the three resources that I have consistently used to stay up to date are number one El Marina uh so let me show you El Marina this is basically an llm leader

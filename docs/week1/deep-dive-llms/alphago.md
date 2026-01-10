---
title: "19. AlphaGo"
titleKr: "19. 알파고"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 19
totalChapters: 24
---

# 19. 알파고

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 19/24

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

바둑에서의 RL 성공 사례입니다.

**핵심 포인트:**
- 인간 모방만으로는 한계
- RL로 인간 초월 가능
- 37수: 인간이 생각 못한 수

---

## 영어 원문 트랜스크립트

## 19. AlphaGo

**요약**: DeepMind의 AlphaGo와 AlphaZero를 통해 강화학습의 역사를 설명합니다. AlphaGo는 바둑에서 인간을 이기기 위해 RL을 사용했으며, AlphaZero는 인간 데이터 없이 자기 대국만으로 학습했습니다. 이 접근법이 현재 LLM 학습에도 적용되고 있습니다.

[2:49:00] kind of what's called an llm judge so the llm judge looks at a solution and it gets the answer and just basically scores the solution for whether it's consistent with the answer or not and llms uh empirically are good enough at the current capability that they can do this fairly reliably so we can apply those kinds of techniques as well in any case we have a concrete answer and we're just checking Solutions again against it and we can do this automatically with no kind of humans in the loop the problem is that we can't apply the strategy in what's called unverifiable domains so usually these are for example creative

[2:49:30] writing tasks like write a joke about Pelicans or write a poem or summarize a paragraph or something like that in these kinds of domains it becomes harder to score our different solutions to this problem so for example writing a joke about Pelicans we can generate lots of different uh jokes of course that's fine for example we can go to chbt and we can get it to uh generate a joke about Pelicans uh so much stuff in their beaks because they don't bellan in backpacks what

[2:50:00] okay we can uh we can try something else why don't Pelicans ever pay for their drinks because they always B it to someone else haha okay so these models are not obviously not very good at humor actually I think it's pretty fascinating because I think humor is secretly very difficult and the model have the capability I think anyway in any case you could imagine creating lots of jokes the problem that we are facing is how do we score them now in principle we could of course get a human to look at all

[2:50:30] these jokes just like I did right now the problem with that is if you are doing reinforcement learning you're going to be doing many thousands of updates and for each update you want to be looking at say thousands of prompts and for each prompt you want to be potentially looking at looking at hundred or thousands of different kinds of generations and so there's just like way too many of these to look at and so um in principle you could have a human inspect all of them and score them and decide that okay maybe this one is funny and uh maybe this one is funny and this

[2:51:00] one is funny and we could train on them to get the model to become slightly better at jokes um in the context of pelicans at least um the problem is that it's just like way too much human time this is an unscalable strategy we need some kind of an automatic strategy for doing this and one sort of solution to this was proposed in this paper uh that introduced what's called reinforcement learning from Human feedback and so this was a paper from open at the time and many of these people are now um co-founders in

[2:51:30] anthropic um and this kind of proposed a approach for uh basically doing reinforcement learning in unverifiable domains so let's take a look at how that works so this is the cartoon diagram of the core ideas involved so as I mentioned the native approach is if we just set Infinity human time we could just run RL in these domains just fine so for example we can run RL as usual if I have Infinity humans I would I just want to do and these are just cartoon numbers I want to do 1,000 updates where

[2:52:00] each update will be on 1,000 prompts and in for each prompt we're going to have 1,000 roll outs that we're scoring so we can run RL with this kind of a setup the problem is in the process of doing this I will need to run one I will need to ask a human to evaluate a joke a total of 1 billion times and so that's a lot of people looking at really terrible jokes so we don't want to do that so instead we want to take the arlef approach so um in our Rel of approach we are kind of like the the core trick is

[2:52:30] that of indirection so we're going to involve humans just a little bit and the way we cheat is that we basically train a whole separate neural network that we call a reward model and this neural network will kind of like imitate human scores so we're going to ask humans to score um roll we're going to then imitate human scores using a neural network and this neural network will become a kind of simulator of human preferences and now that we have a

[2:53:00] neural network simulator we can do RL against it so instead of asking a real human we're asking a simulated human for their score of a joke as an example and so once we have a simulator we're often racist because we can query it as many times as we want to and it's all whole automatic process and we can now do reinforcement learning with respect to the simulator and the simulator as you might expect is not going to be a perfect human but if it's at least statistically similar to human judgment then you might expect that this will do

[2:53:30] something and in practice indeed uh it does so once we have a simulator we can do RL and everything works great so let me show you a cartoon diagram a little bit of what this process looks like although the details are not 100 like super important it's just a core idea of how this works so here I have a cartoon diagram of a hypothetical example of what training the reward model would look like so we have a prompt like write a joke about picans and then here we have five separate roll outs so these are all five different jokes just like this one now the first thing we're going

[2:54:00] to do is we are going to ask a human to uh order these jokes from the best to worst so this is uh so here this human thought that this joke is the best the funniest so number one joke this is number two joke number three joke four and five so this is the worst joke we're asking humans to order instead of give scores directly because it's a bit of an easier task it's easier for a human to give an ordering than to give precise scores now that is now the

[2:54:30] supervision for the model so the human has ordered them and that is kind of like their contribution to the training process but now separately what we're going to do is we're going to ask a reward model uh about its scoring of these jokes now the reward model is a whole separate neural network completely separate neural net um and it's also probably a transform uh but it's not a language model in the sense that it generates diverse language Etc it's just a scoring model so the reward model will take as an input The

[2:55:00] Prompt number one and number two a candidate joke so um those are the two inputs that go into the reward model so here for example the reward model would be taken this prompt and this joke now the output of a reward model is a single number and this number is thought of as a score and it can range for example from Z to one so zero would be the worst score and one would be the best score so here are some examples of what a hypothetical reward model at some stage in the training process would give uh s

[2:55:30] scoring to these jokes so 0.1 is a very low score 08 is a really high score and so on and so now um we compare the scores given by the reward model with uh the ordering given by the human and there's a precise mathematical way to actually calculate this uh basically set up a loss function and calculate a kind of like a correspondence here and uh update a model based on it but I just want to give you the intuition which is

[2:56:00] that as an example here for this second joke the the human thought that it was the funniest and the model kind of agreed right 08 is a relatively high score but this score should have been even higher right so after an update we would expect that maybe this score should have been will actually grow after an update of the network to be like say 081 or something um for this one here they actually are in a massive disagreement because the human thought that this was number two but here the the score is only 0.1 and so this score needs to be

[2:56:30] much higher so after an update on top of this um kind of a supervision this might grow a lot more like maybe it's 0.15 or that um and then here the human thought that this one was the worst joke but here the model actually gave it a fairly High number so you might expect that after the update uh this would come down to maybe 3 3.5 or something like that so basically we're doing what we did before we're slightly nudging the predictions from the models using a neural network training

[2:57:00] process and we're trying to make the reward model scores be consistent with human ordering and so um as we update the reward model on human data it becomes better and better simulator of the scores and orders uh that humans provide and then becomes kind of like the the neural the simulator of human preferences which we can then do RL against but critically we're not asking humans one billion times to look at a joke we're maybe looking at th000 prompts and five roll outs each so maybe

[2:57:30] 5,000 jokes that humans have to look at in total and they just give the ordering and then we're training the model to be consistent with that ordering and I'm skipping over the mathematical details but I just want you to understand a high level idea that uh this reward model is do is basically giving us this scour and we have a way of training it to be consistent with human orderings and that's how rhf works okay so that is the rough idea we basically train simulators of humans and RL with respect to those simulators now I want to talk about

[2:58:00] first the upside of reinforcement learning from Human feedback the first thing is that this allows us to run reinforcement learning which we know is incredibly powerful kind of set of techniques and it allows us to do it in arbitrary domains and including the ones that are unverifiable so things like summarization and poem writing joke writing or any other creative writing really uh in domains outside of math and code Etc now empirically what we see when we actually apply rhf is that this is a way

[2:58:30] to improve the performance of the model and uh I have a top answer for why that might be but I don't actually know that it is like super well established on like why this is you can empirically observe that when you do rhf correctly the models you get are just like a little bit better um but as to why is I think like not as clear so here's my best guess my best guess is that this is possibly mostly due to the discriminator generator Gap what that means is that in many cases it is significantly easier to

[2:59:00] discriminate than to generate for humans so in particular an example of this is um in when we do supervised fine-tuning right sft we're asking humans to generate the ideal assistant response and in many cases here um as I've shown it uh the ideal response is very simple to write but in many cases might not be so for example in summarization or poem writing or joke writing like how are you as a human assist as a human labeler um

[2:59:30] supposed to give the ideal response in these cases it requires creative human writing to do that and so rhf kind of sidesteps this because we get um we get to ask people a significantly easier question as a data labelers they're not asked to write poems directly they're just given five poems from the model and they're just asked to order them and so that's just a much easier task for a human labeler to do and so what I think this allows you to do basically is it um

[3:00:00] it kind of like allows a lot more higher accuracy data because we're not asking people to do the generation task which can be extremely difficult like we're not asking them to do creative writing we're just trying to get them to distinguish between creative writings and uh find the ones that are best and that is the signal that humans are providing just the ordering and that is their input into the system and then the system in rhf just discovers the kinds of responses that would be graded well by humans and so that step of

[3:00:30] indirection allows the models to become a bit better so that is the upside of our LF it allows us to run RL it empirically results in better models and it allows uh people to contribute their supervision uh even without having to do extremely difficult tasks um in the case of writing ideal responses unfortunately our HF also comes with significant downsides and so um the main one is that basically we are doing reinforcement learning not with respect to humans and actual human judgment but with respect

[3:01:00] to a lossy simulation of humans right and this lossy simulation could be misleading because it's just a it's just a simulation right it's just a language model that's kind of outputting scores and it might not perfectly reflect the opinion of an actual human with an actual brain in all the possible different cases so that's number one which is actually something even more subtle and devious going on that uh really dramatically holds back our LF as a technique that we can really scale to

[3:01:30] significantly um kind of Smart Systems and that is that reinforcement learning is extremely good at discovering a way to game the model to game the simulation so this reward model that we're constructing here that gives the course these models are Transformers these Transformers are massive neurals they have billions of parameters and they imitate humans but they do so in a kind of like a simulation way now the problem is that these are massive complicated systems right there's a billion parameters here that are outputting a

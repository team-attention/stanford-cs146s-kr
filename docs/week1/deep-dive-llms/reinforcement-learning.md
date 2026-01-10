---
title: "17. Reinforcement Learning"
titleKr: "17. 강화학습"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 17
totalChapters: 24
---

# 17. 강화학습

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 17/24

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

RL의 핵심 개념과 적용을 다룹니다.

**핵심 포인트:**
- 보상 함수로 좋은 출력 강화
- 검증 가능한 영역(수학, 코드)에서 효과적
- 다양한 풀이 시도 후 좋은 것 강화

---

## 영어 원문 트랜스크립트

## 17. Reinforcement Learning

**요약**: 강화학습(RL)의 핵심 개념을 설명합니다. 보상 함수(reward function)를 정의하고, 모델이 높은 보상을 받는 출력을 생성하도록 학습시킵니다. 수학 문제처럼 정답을 자동으로 검증할 수 있는 영역에서 특히 효과적입니다.

[2:15:00] onedimensional token sequences and so um I actually like prefer this view because this is like the native view of the llm if that makes sense like this is what it actually sees it sees token IDs right okay so Emily buys three apples and two oranges each orange is $2 the total cost of all the fruit is $13 what is the cost of each apple and what I'd like to what I like you to appreciate here is these are like four possible candidate Solutions as an

[2:15:30] example and they all reach the answer three now what I'd like you to appreciate at this point is that if I am the human data labeler that is creating a conversation to be entered into the training set I don't actually really know which of these conversations to um to add to the data set some of these conversations kind of set up a system equations some of them sort of like just talk through it in English and some of them just kind of like skip right through to the

[2:16:00] solution um if you look at chbt for example and you give it this question it defines a system of variables and it kind of like does this little thing what we have to appreciate and uh differentiate between though is um the first purpose of a solution is to reach the right answer of course we want to get the final answer three that is the that is the important purpose here but there's kind of like a secondary purpose as well where here we are also just kind of trying to make it like nice uh for the human because we're kind of assuming that the person wants to see the

[2:16:30] solution they want to see the intermediate steps we want to present it nicely Etc so there are two separate things going on here number one is the presentation for the human but number two we're trying to actually get the right answer um so let's for the moment focus on just reaching the final answer if we're only care if we only care about the final answer then which of these is the optimal or the best prompt um sorry the best solution for the llm to reach the right

[2:17:00] answer um and what I'm trying to get at is we don't know me as a human labeler I would not know which one of these is best so as an example we saw earlier on when we looked at um the token sequences here and the mental arithmetic and reasoning we saw that for each token we can only spend basically a finite number of finite amount of compute here that is not very large or you should think about it that way way and so we can't actually make too big of a leap in any one token is is maybe the way to think about it so as an

[2:17:30] example in this one what's really nice about it is that it's very few tokens so it's going to take us very short amount of time to get to the answer but right here when we're doing 30 - 4 IDE 3 equals right in this token here we're actually asking for a lot of computation to happen on that single individual token and so maybe this is a bad example to give to the llm because it's kind of incentivizing it to skip through the calculations very quickly and it's going to actually make up mistakes make mistakes in this mental arithmetic uh so maybe it would work better to like

[2:18:00] spread out the spread it out more maybe it would be better to set it up as an equation maybe it would be better to talk through it we fundamentally don't know and we don't know because what is easy for you or I as or as human labelers what's easy for us or hard for us is different than what's easy or hard for the llm it cognition is different um and the token sequences are kind of like different hard for it and so some of the

[2:18:30] token sequences here that are trivial for me might be um very too much of a leap for the llm so right here this token would be way too hard but conversely many of the tokens that I'm creating here might be just trivial to the llm and we're just wasting tokens like why waste all these tokens when this is all trivial so if the only thing we care care about is the final answer and we're separating out the issue of the presentation to the human um then we don't actually really know how to annotate this example we don't know what

[2:19:00] solution to get to the llm because we are not the llm and it's clear here in the case of like the math example but this is actually like a very pervasive issue like for our knowledge is not lm's knowledge like the llm actually has a ton of knowledge of PhD in math and physics chemistry and whatnot so in many ways it actually knows more than I do and I'm I'm potentially not utilizing that knowledge in its problem solving but conversely I might be injecting a bunch of knowledge in my solutions that

[2:19:30] the LM doesn't know in its parameters and then those are like sudden leaps that are very confusing to the model and so our cognitions are different and I don't really know what to put here if all we care about is the reaching the final solution and doing it economically ideally and so long story short we are not in a good position to create these uh token sequences for the LM and they're useful by imitation to initialize the system but we really want

[2:20:00] the llm to discover the token sequences that work for it we need to find it needs to find for itself what token sequence reliably gets to the answer given the prompt and it needs to discover that in the process of reinforcement learning and of trial and error so let's see how this example would work like in reinforcement learning okay so we're now back in the huging face inference playground and uh that just allows me to very easily call uh different kinds of models so as an

[2:20:30] example here on the top right I chose the Gemma 2 2 billion parameter model so two billion is very very small so this is a tiny model but it's okay so we're going to give it um the way that reinforcement learning will basically work is actually quite quite simple um we need to try many different kinds of solutions and we want to see which Solutions work well or not so we're basically going to take the prompt we're going to run the model and the model generates a solution and then we're going to inspect the

[2:21:00] solution and we know that the correct answer for this one is $3 and so indeed the model gets it correct it says it's $3 so this is correct so that's just one attempt at DIS solution so now we're going to delete this and we're going to rerun it again let's try a second attempt so the model solves it in a bit slightly different way right every single attempt will be a different generation because these models are stochastic systems remember that at every single token here we have a probability distribution and we're sampling from that distribution so we

[2:21:30] end up kind kind of going down slightly different paths and so this is a second solution that also ends in the correct answer now we're going to delete that let's go a third time okay so again slightly different solution but also gets it correct now we can actually repeat this uh many times and so in practice you might actually sample thousand of independent Solutions or even like million solutions for just a single prompt um and some of them will be correct and some of them will not be

[2:22:00] very correct and basically what we want to do is we want to encourage the solutions that lead to correct answers so let's take a look at what that looks like so if we come back over here here's kind of like a cartoon diagram of what this is looking like we have a prompt and then we tried many different solutions in parallel and some of the solutions um might go well so they get the right answer which is in green and some of the solutions might go poorly and may not reach the right answer which is red now this problem here unfortunately is not

[2:22:30] the best example because it's a trivial prompt and as we saw uh even like a two billion parameter model always gets it right so it's not the best example in that sense but let's just exercise some imagination here and let's just suppose that the um green ones are good and the red ones are bad okay so we generated 15 Solutions only four of them got the right answer and so now what we want to do is basically we want to encourage the kinds

[2:23:00] of solutions that lead to right answers so whatever token sequences happened in these red Solutions obviously something went wrong along the way somewhere and uh this was not a good path to take through the solution and whatever token sequences there were in these Green Solutions well things went uh pretty well in this situation and so we want to do more things like it in prompts like this and the way we encourage this kind of a behavior in the future is we basically train on these sequences um but these training sequencies now are

[2:23:30] not coming from expert human annotators there's no human who decided that this is the correct solution this solution came from the model itself so the model is practicing here it's tried out a few Solutions four of them seem to have worked and now the model will kind of like train on them and this corresponds to a student basically looking at their Solutions and being like okay well this one worked really well so this is this is how I should be solving these kinds of problems and uh here in this example there are many different ways to actually like really tweak the

[2:24:00] methodology a little bit here but just to give the core idea across maybe it's simplest to just think about take the taking the single best solution out of these four uh like say this one that's why it was yellow uh so this is the the solution that not only led to the right answer but may maybe had some other nice properties maybe it was the shortest one or it looked nicest in some ways or uh there's other criteria you could think of as an example but we're going to decide that this the top solution we're going to train on it and then uh the

[2:24:30] model will be slightly more likely once you do the parameter update to take this path in this kind of a setting in the future but you have to remember that we're going to run many different diverse prompts across lots of math problems and physics problems and whatever wherever there might be so tens of thousands of prompts maybe have in mind there's thousands of solutions prompt and so this is all happening kind of like at the same time and as we're iterating this process the model is discovering for itself what kinds of

[2:25:00] token sequences lead it to correct answers it's not coming from a human annotator the the model is kind of like playing in this playground and it knows what it's trying to get to and it's discovering sequences that work for it uh these are sequences that don't make any mental leaps uh they they seem to work reliably and statistically and uh fully utilize the knowledge of the model as it has it and so uh this is the process of reinforcement

[2:25:30] learning it's basically a guess and check we're going to guess many different types of solutions we're going to check them and we're going to do more of what worked in the future and that is uh reinforcement learning so in the context of what came before we see now that the sft model the supervised fine tuning model it's still helpful because it still kind of like initializes the model a little bit into to the vicinity of the correct Solutions so it's kind of like a initialization of um of the model in the sense that it kind of gets the

[2:26:00] model to you know take Solutions like write out Solutions and maybe it has an understanding of setting up a system of equations or maybe it kind of like talks through a solution so it gets you into the vicinity of correct Solutions but reinforcement learning is where everything gets dialed in we really discover the solutions that work for the model get the right answers we encourage them and then the model just kind of like gets better over time time okay so that is the high Lev process for how we train large language models in short we train them kind of very similar to how

[2:26:30] we train children and basically the only difference is that children go through chapters of books and they do all these different types of training exercises um kind of within the chapter of each book but instead when we train AIS it's almost like we kind of do it stage by stage depending on the type of that stage so first what we do is we do pre-training which as we saw is equivalent to uh basically reading all the expository material so we look at all the textbooks at the same time and we read all the exposition and we try to

[2:27:00] build a knowledge base the second thing then is we go into the sft stage which is really looking at all the fixed uh sort of like solutions from Human Experts of all the different kinds of worked Solutions across all the textbooks and we just kind of get an sft model which is able to imitate the experts but does so kind of blindly it just kind of like does its best guess uh kind of just like trying to mimic statistically the expert behavior and so that's what you get when you look at all the work Solutions and then finally in

[2:27:30] the last stage we do all the practice problems in the RL stage across all the textbooks we only do the practice problems and that's how we get the RL model so on a high level the way we train llms is very much equivalent uh to the process that we train uh that we use for training of children the next point I would like to make is that actually these first two stat ages pre-training and surprise fine-tuning they've been around for years and they are very standard and everyone does them all the different llm providers it is this last

[2:28:00] stage the RL training that is a lot more early in its process of development and is not standard yet in the field and so um this stage is a lot more kind of early and nent and the reason for that is because I actually skipped over a ton of little details here in this process the high level idea is very simple it's trial and there learning but there's a ton of details and little math mathematical kind of like nuances to exactly how you pick the solutions that are the best and how much you train on them and what is the prompt distribution and how to set up the training run such

[2:28:30] that this actually works so there's a lot of little details and knobs to the core idea that is very very simple and so getting the details right here uh is not trivial and so a lot of companies like for example open and other LM providers have experimented internally with reinforcement learning fine tuning for llms for a while but they've not talked about it publicly um it's all kind of done inside the company and so that's why the paper from Deep seek that came out very very recently was such a big deal because

[2:29:00] this is a paper from this company called DC Kai in China and this paper really talked very publicly about reinforcement learning fine training for large language models and how incredibly important it is for large language models and how it brings out a lot of reasoning capabilities in the models we'll go into this in a second so this paper reinvigorated the public interest of using RL for llms and gave a lot of the um sort of n-r details that are needed to reproduce their results and

[2:29:30] actually get the stage to work for large langage models so let me take you briefly through this uh deep seek R1 paper and what happens when you actually correctly apply RL to language models and what that looks like and what that gives you so the first thing I'll scroll to is this uh kind of figure two here where we are looking at the Improvement in how the models are solving mathematical problems so this is the accuracy of solving mathematical problems on the a accuracy and then we can go to the web page and we can see the kinds of problems that are actually in these um these the kinds of math

[2:30:00] problems that are being measured here so these are simple math problems you can um pause the video if you like but these are the kinds of problems that basically the models are being asked to solve and you can see that in the beginning they're not doing very well but then as you update the model with this many thousands of steps their accuracy kind of continues to climb so the models are improving and they're solving these problems with a higher accuracy as you do this trial and error on a large data set of these kinds of problems and the models are discovering how to solve math problems but even more

[2:30:30] incredible than the quantitative kind of results of solving these problems with a higher accuracy is the qualitative means by which the model achieves these results so when we scroll down uh one of the figures here that is kind of interesting is that later on in the optimization the model seems to be uh using average length per response uh goes up up so the model seems to be using more tokens to get its higher accuracy results so it's learning to create very very long Solutions why are

[2:31:00] these Solutions very long we can look at them qualitatively here so basically what they discover is that the model solution get very very long partially because so here's a question and here's kind of the answer from the model what the model learns to do um and this is an immerging property of new optimization it just discovers that this is good for problem solving is it starts to do stuff like this wait wait wait that's Nota moment I can flag here let's reevaluate this step by step to identify the correct sum can be so what is the model

[2:31:30] doing here right the model is basically re-evaluating steps it has learned that it works better for accuracy to try out lots of ideas try something from different perspectives retrace reframe backtrack is doing a lot of the things that you and I are doing in the process of problem solving for mathematical questions but it's rediscovering what happens in your head not what you put down on the solution and there is no human who can hardcode this stuff in the ideal assistant response this is only something that can be discovered in the process of reinforcement learning because you wouldn't know what to put

[2:32:00] here this just turns out to work for the model and it improves its accuracy in problem solving so the model learns what we call these chains of thought in your head and it's an emergent property of the optim of the optimization and that's what's bloating up the response length but that's also what's increasing the accuracy of the problem problem solving so what's incredible here is basically the model is discovering ways to think it's learning what I like to call cognitive strategies of how you

[2:32:30] manipulate a problem and how you approach it from different perspectives how you pull in some analogies or do different kinds of things like that and how you kind of uh try out many different things over time uh check a result from different perspectives and how you kind of uh solve problems but here it's kind of discovered by the RL so extremely incredible to see this emerge in the optimization without having to hardcode it anywhere the only thing we've given it are the correct answers and this comes out from trying to just solve them correctly which is incredible

[2:33:00] um now let's go back to actually the problem that we've been working with and let's take a look at what it would look like uh for uh for this kind of a model what we call reasoning or thinking model to solve that problem okay so recall that this is the problem we've been working with and when I pasted it into chat GPT 40 I'm getting this kind of a response let's take a look at what happens when you give this same query to what's called a reasoning or a thinking model this is a model that was trained with reinforcement learning so this

[2:33:30] model described in this paper DC car1 is available on chat. dec.com uh so this is kind of like the company uh that developed is hosting it you have to make sure that the Deep think button is turned on to get the R1 model as it's called we can paste it here and run it and so let's take a look at what happens now and what is the output of the model okay so here's it says so this is previously what we get using basically what's an sft approach a supervised funing approach this is like mimicking an expert solution this is

[2:34:00] what we get from the RL model okay let me try to figure this out so Emily buys three apples and two oranges each orange cost $2 total is 13 I need to find out blah blah blah so here you you um as you're reading this you can't escape thinking that this model is thinking um is definitely pursuing the solution solution it deres that it must cost $3 and then it says wait a second let me check my math again to be sure and then it tries it from a slightly different perspective and then it says

[2:34:30] yep all that checks out I think that's the answer I don't see any mistakes let me see if there's another way to approach the problem maybe setting up an equation let's let the cost of one apple be $8 then blah blah blah yep same answer so definitely each apple is $3 all right confident that that's correct and then what it does once it sort of um did the thinking process is it writes up the nice solution for the human and so this is now considering so this is more about the correctness aspect and this is

[2:35:00] more about the presentation aspect where it kind of like writes it out nicely and uh boxes in the correct answer at the bottom and so what's incredible about this is we get this like thinking process of the model and this is what's coming from the reinforcement learning process this is what's bloating up the length of the token sequences they're doing thinking and they're trying different ways this is what's giving you higher accuracy in problem solving and this is where we are seeing these aha moments and these different strategies and these um ideas for how

[2:35:30] you can make sure that you're getting the correct answer the last point I wanted to make is some people are a little bit nervous about putting you know very sensitive data into chat.com because this is a Chinese company so people don't um people are a little bit careful and Cy with that a little bit um deep seek R1 is a model that was released by this company so this is an open source model or open weights model it is available for anyone to download and use you will not be able to like run it in its full

[2:36:00] um sort of the full model in full Precision you won't run that on a MacBook but uh or like a local device because this is a fairly large model but many companies are hosting the full largest model one of those companies that I like to use is called together. so when you go to together. you sign up and you go to playgrounds you can can select here in the chat deep seek R1 and there's many different kinds of other models that you can select here these are all state-of-the-art models so this is kind of similar to the hugging face inference playground that we've

[2:36:30] been playing with so far but together. a will usually host all the state-of-the-art models so select DT car1 um you can try to ignore a lot of these I think the default settings will often be okay and we can put in this and because the model was released by Deep seek what you're getting here should be basically equivalent to what you're getting here now because of the randomness in the sampling we're going to get something slightly different uh but in principle this should be uh identical in terms of the power of the model and you should be able to see the

[2:37:00] same things quantitatively and qualitatively uh but uh this model is coming from kind of a an American company so that's deep seek and that's the what's called a reasoning model now when I go back to chat uh let me go to chat here okay so the models that you're going to see in the drop down here some of them like 01 03 mini O3 mini High Etc they are talking about uses Advanced reasoning now what this is referring to uses Advanced reasoning is it's referring to the fact that it was trained by reinforcement learning with

[2:37:30] techniques very similar to those of deep C car1 per public statements of opening ey employees uh so these are thinking models trained with RL and these models like GPT 4 or GPT 4 40 mini that you're getting in the free tier you should think of them as mostly sft models supervised fine tuning models they don't actually do this like thinking as as you see in the RL models and even though there's a little bit of reinforcement learning involved with these models and I'll go that into that in a second these are mostly sft models I think you should

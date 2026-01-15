---
title: "18. DeepSeek-R1"
titleKr: "18. DeepSeek R1"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 18
totalChapters: 24
---

# 18. DeepSeek R1

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 18/24

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

딥시크의 R1 모델 특징입니다.

**핵심 포인트:**
- 순수 RL로 사고 과정 발전
- 영어-중국어 전환하며 생각
- 오픈 웨이트로 누구나 사용 가능

---

## 영어 원문 트랜스크립트

## 18. DeepSeek-R1

**요약**: DeepSeek-R1 모델과 그 특징을 설명합니다. 중국 스타트업 DeepSeek이 개발한 이 모델은 순수 RL만으로 학습되어 자체적인 사고 과정(thinking)을 발전시켰습니다. 때로는 영어에서 중국어로 전환하며 생각하는 등 흥미로운 행동을 보입니다.

[2:38:00] think about it that way so in the same way as what we saw here we can pick one of the thinking models like say 03 mini high and these models by the way might not be available to you unless you pay a Chachi PT subscription of either $20 per month or $200 per month for some of the top models so we can pick a thinking model and run now what's going to happen here is it's going to say reasoning and it's going to start to do stuff like this and um what we're seeing here is not exactly the stuff we're seeing here

[2:38:30] so even though under the hood the model produces these kinds of uh kind of chains of thought opening ey chooses to not show the exact chains of thought in the web interface it shows little summaries of that of those chains of thought and open kind of does this I think partly because uh they are worried about what's called the distillation risk that is that someone could come in and actually try to imitate those reasoning traces and recover a lot of the reasoning performance by just imitating the reasoning uh chains of thought and so they kind of hide them

[2:39:00] and they only show little summaries of them so you're not getting exactly what you would get in deep seek as with respect to the reasoning itself and then they write up the solution so these are kind of like equivalent even though we're not seeing the full under the hood details now in terms of the performance uh these models and deep seek models are currently rly on par I would say it's kind of hard to tell because of the evaluations but if you're paying $200 per month to open AI some of these models I believe are currently they basically still look

[2:39:30] better uh but deep seek R1 for now is still a very solid choice for a thinking model that would be available to you um sort of um either on this website or any other website because the model is open weights you can just download it so that's thinking models so what is the summary so far well we've talked about reinforcement learning and the fact that thinking emerges in the process of the optimization on when we basically run RL on many math uh and kind of code problems that have verifiable Solutions

[2:40:00] so there's like an answer three Etc now these thinking models you can access in for example deep seek or any inference provider like together. a and choosing deep seek over there these thinking models are also available uh in chpt under any of the 01 or O3 models but these GPT 4 R models Etc they're not thinking models you should think of them as mostly sft models now if you are um if you have a prompt that requires Advanced reasoning and so on

[2:40:30] you should probably use some of the thinking models or at least try them out but empirically for a lot of my use when you're asking a simpler question there's like a knowledge based question or something like that this might be Overkill like there's no need to think 30 seconds about some factual question so for that I will uh sometimes default to just GPT 40 so empirically about 80 90% of my use is just gp4 and when I come across a very difficult problem like in math and code Etc I will reach for the thinking models but then I have to wait a bit longer because

[2:41:00] they're thinking um so you can access these on chat on deep seek also I wanted to point out that um AI studio. go.com even though it looks really busy really ugly because Google's just unable to do this kind of stuff well it's like what is happening but if you choose model and you choose here Gemini 2.0 flash thinking experimental 01 21 if you choose that one that's also a a kind of early experiment experimental of a thinking model by Google so we can go here and we can give it the same problem

[2:41:30] and click run and this is also a thinking problem a thinking model that will also do something similar and comes out with the right answer here so basically Gemini also offers a thinking model anthropic currently does not offer a thinking model but basically this is kind of like the frontier development of these llms I think RL is kind of like this new exciting stage but getting the details right is difficult and that's why all these models and thinking models are currently experimental as of 2025 very

[2:42:00] early 2025 um but this is kind of like the frontier development of pushing the performance on these very difficult problems using reasoning that is emerging in these optimizations one more connection that I wanted to bring up is that the discovery that reinforcement learning is extremely powerful way of learning is not new to the field of AI and one place what we've already seen this demonstrated is in the game of Go and famously Deep Mind developed the system alphago and you can watch a movie about it um where the system is learning

[2:42:30] to play the game of go against top human players and um when we go to the paper underlying alphago so in this paper when we scroll down we actually find a really interesting plot um that I think uh is kind of familiar uh to us and we're kind of like we discovering in the more open domain of arbitrary problem solving instead of on the closed specific domain of the game of Go but basically what they saw and we're going to see this in llms as

[2:43:00] well as this becomes more mature is this is the ELO rating of playing game of Go and this is leas dull an extremely strong human player and here what they are comparing is the strength of a model learned trained by supervised learning and a model trained by reinforcement learning so the supervised learning model is imitating human expert players so if you just get a huge amount of games played by expert players in the game of Go and you try to imitate them you are going to get better but then you

[2:43:30] top out and you never quite get better than some of the top top top players of in the game of Go like LEL so you're never going to reach there because you're just imitating human players you can't fundamentally go beyond a human player if you're just imitating human players but in a process of reinforcement learning is significantly more powerful in reinforcement learning for a game of Go it means that the system is playing moves that empirically and statistically lead to win to winning the game and so alphago is a system

[2:44:00] where it kind of plays against it itself and it's using reinforcement learning to create rollouts so it's the exact same diagram here but there's no prompt it's just uh because there's no prompt it's just a fixed game of Go but it's trying out lots of solutions it's trying out lots of plays and then the games that lead to a win instead of a specific answer are reinforced they're they're made stronger and so um the system is learning basically the sequences of actions that

[2:44:30] empirically and statistically lead to winning the game and reinforcement learning is not going to be constrained by human performance and reinforcement learning can do significantly better and overcome even the top players like Lisa Dole and so uh probably they could have run this longer and they just chose to crop it at some point because this costs money but this is very powerful demonstration of reinforcement learning and we're only starting to kind of see hints of this diagram in larger language models for reasoning problems so we're not going to get too far by just

[2:45:00] imitating experts we need to go beyond that set up these like little game environments and get let let the system discover reasoning traces or like ways of solving problems uh that are unique and that uh just basically work notice that when you're doing well now on this aspect of uniqueness reinforcement learning nothing prevents you from veering off the distribution of how humans are playing the game and so when we go back to uh this alphao search

[2:45:30] here one of the suggested modifications is called move 37 and move 37 in alphao is referring to a specific point in time where alphago basically played a move that uh no human expert would play uh so the probability of this move uh to be played by a human player was evaluated to be about 1 in 10th ,000 so it's a very rare move but in retrospect it was a brilliant move so alphago in the discovered kind of like a strategy of

[2:46:00] playing that was unknown to humans and but is in retrospect uh brilliant I recommend this YouTube video um leis do versus alphao move 37 reactions and Analysis and this is kind of what it looked like when alphao played this move value that's a very that's a very surprising move I thought I thought it was I thought it was a mistake when I see this move anyway so basically people are kind of freaking out because it's a it's a move that a

[2:46:30] human would not play that alphago played because in its training uh this move seemed to be a good idea it just happens not to be a kind of thing that a humans would would do and so that is again the power of reinforcement learning and in principle we can actually see the equivalence of that if we continue scaling this Paradigm in language models and what that looks like is kind of unknown so so um what does it mean to solve problems in such a way that uh even humans would not be able to get how can you be better at reasoning or

[2:47:00] thinking than humans how can you go beyond just uh a thinking human like maybe it means discovering analogies that humans would not be able to uh create or maybe it's like a new thinking strategy it's kind of hard to think through uh maybe it's a holy new language that actually is not even English maybe it discovers its own language that is a lot better at thinking um because the model is unconstrained to even like stick with English uh so maybe it takes a different language to think in or it discovers its

[2:47:30] own language so in principle the behavior of the system is a lot less defined it is open to do whatever works and it is open to also slowly Drift from the distribution of its training data which is English but all of that can only be done if we have a very large diverse set of problems in which the these strategy can be refined and perfected and so that is a lot of the frontier LM research that's going on right now is trying to kind of create those kinds of prompt distributions that are large and diverse these are all kind

[2:48:00] of like game environments in which the llms can practice their thinking and uh it's kind of like writing you know these practice problems we have to create practice problems for all of domains of knowledge and if we have practice problems and tons of them the models will be able to reinforcement learning reinforcement learn on them and kind of uh create these kinds of uh diagrams but in the domain of open thinking instead of a closed domain like game of Go there's one more section within reinforcement learning that I wanted to

[2:48:30] cover and that is that of learning in unverifiable domains so so far all of the problems that we've looked at are in what's called verifiable domains that is any candidate solution we can score very easily against a concrete answer so for example answer is three and we can very easily score these Solutions against the answer of three either we require the models to like box in their answers and then we just check for equality of whatever is in the box with the answer or you can also use uh

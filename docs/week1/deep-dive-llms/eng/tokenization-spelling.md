---
title: "14. Tokenization Revisited: Models Struggle with Spelling"
titleKr: "14. 토큰화 재방문: 철자 문제"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 14
totalChapters: 24
---

# 14. 토큰화 재방문: 철자 문제

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 14/24

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

토큰화가 철자 처리에 미치는 영향입니다.

**핵심 포인트:**
- 모델은 글자가 아닌 토큰 단위로 봄
- "strawberry"에서 r 세기 어려움
- 코드 도구로 우회 가능

---

## 영어 원문 트랜스크립트

## 14. Tokenization Revisited: Models Struggle with Spelling

**요약**: 토큰화가 모델의 철자 처리 능력에 미치는 영향을 설명합니다. 모델은 글자 수준이 아닌 토큰 수준에서 작동하므로, "strawberry"에서 'r'이 몇 개인지 묻는 질문에 어려움을 겪습니다. 이는 토큰화의 구조적 한계입니다.

[2:01:30] reason to do for this is that the models they don't see the characters they see tokens and they their entire world is about tokens which are these little text chunks and so they don't see characters like our eyes do and so very simple character level tasks often fail so for example uh I'm giving it a string ubiquitous and I'm asking it to print only every third character starting with the first one so we start with U and then we should go every third so every

[2:02:00] so 1 2 3 Q should be next and then Etc so this I see is not correct and again my hypothesis is that this is again Dental arithmetic here is failing number one a little bit but number two I think the the more important issue here is that if you go to Tik tokenizer and you look at ubiquitous we see that it is three tokens right so you and I see ubiquitous and we can easily access the individual letters because we kind of see them and when we have it in the working memory of our visual sort of field we can really easily index into

[2:02:30] every third letter and I can do that task but the models don't have access to the individual letters they see this as these three tokens and uh remember these models are trained from scratch on the internet and all these token uh basically the model has to discover how many of all these different letters are packed into all these different tokens and the reason we even use tokens is mostly for efficiency uh but I think a lot of people areed interested to delete tokens entirely like we should really have character level or bite level models it's just that that would create very long sequences and people don't

[2:03:00] know how to deal with that right now so while we have the token World any kind of spelling tasks are not actually expected to work super well so because I know that spelling is not a strong suit because of tokenization I can again Ask it to lean On Tools so I can just say use code and I would again expect this to work because the task of copy pasting ubiquitous into the python interpreter is much easier and then we're leaning on python interpreter to manipulate the characters of this string so when I say use

[2:03:30] code ubiquitous yes it indexes into every third character and the actual truth is u2s uqs uh which looks correct to me so um again an example of spelling related tasks not working very well a very famous example of that recently is how many R are there in strawberry and this went viral many times and basically the models now get it correct they say there are three Rs in Strawberry but for a very long time all the state-of-the-art models would insist that there are only

[2:04:00] two RS in strawberry and this caused a lot of you know Ruckus because is that a word I think so because um it just kind of like why are the models so brilliant and they can solve math Olympiad questions but they can't like count RS in strawberry and the answer for that again is I've got built up to it kind of slowly but number one the models don't see characters they see tokens and number two they are not very good at counting and so here we are combining the difficulty of seeing the characters with the difficulty of counting and

[2:04:30] that's why the models struggled with this even though I think by now honestly I think open I may have hardcoded the answer here or I'm not sure what they did but um uh but this specific query now works so models are not very good at spelling and there there's a bunch of other little sharp edges and I don't want to go into all of them I just want to show you a few examples of things to be aware of and uh when you're using these models in practice I don't actually want to have a comprehensive analysis here of all the ways that the models are kind of like falling short I just want to make

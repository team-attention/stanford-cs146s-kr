---
title: "2. Pretraining Data (Internet)"
titleKr: "2. 사전학습 데이터 - 인터넷"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 2
totalChapters: 24
---

# 2. 사전학습 데이터 - 인터넷

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 2/24

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

LLM 사전학습의 첫 단계인 인터넷 데이터 수집을 설명합니다.

**핵심 포인트:**
- Common Crawl에서 시작해 약 44TB 고품질 텍스트 확보
- URL 필터링, 텍스트 추출, 언어 필터링, PII 제거 등 다단계 처리
- FineWeb 데이터셋이 대표적 예시

---

## 영어 원문 트랜스크립트

## 2. Pretraining Data (Internet)

**요약**: LLM 사전학습의 첫 단계인 인터넷 데이터 수집을 설명합니다. Common Crawl에서 시작해 URL 필터링, 텍스트 추출, 언어 필터링, 중복 제거, PII 제거 등 여러 단계를 거쳐 약 44TB의 고품질 텍스트 데이터셋(예: FineWeb)을 구축합니다.

[1:00] the tools okay so let's build Chachi PT so there's going to be multiple stages arranged sequentially the first stage is called the pre-training stage and the first step of the pre-training stage is to download and process the internet now to get a sense of what this roughly looks like I recommend looking at this URL here so um this company called hugging face uh collected and created and curated this data set called Fine web and they go into a lot of detail on

[1:30] this block post on how how they constructed the fine web data set and all of the major llm providers like open AI anthropic and Google and so on will have some equivalent internally of something like the fine web data set so roughly what are we trying to achieve here we're trying to get ton of text from the internet from publicly available sources so we're trying to have a huge quantity of very high quality documents and we also want very large diversity of documents because we want to have a lot of knowledge inside these models so we want large diversity

[2:00] of high quality documents and we want many many of them and achieving this is uh quite complicated and as you can see here takes multiple stages to do well so let's take a look at what some of these stages look like in a bit for now I'd like to just like to note that for example the fine web data set which is fairly representative what you would see in a production grade application actually ends up being only about 44 terabyt of dis space um you can get a USB stick for like a terabyte very easily or I think this could fit on a single hard drive almost today so this

[2:30] is not a huge amount of data at the end of the day even though the internet is very very large we're working with text and we're also filtering it aggressively so we end up with about 44 terabytes in this example so let's take a look at uh kind of what this data looks like and what some of these stages uh also are so the starting point for a lot of these efforts and something that contributes most of the data by the end of it is Data from common crawl so common craw is an organization that has been basically

[3:00] scouring the internet since 2007 so as of 2024 for example common CW has indexed 2.7 billion web pages uh and uh they have all these crawlers going around the internet and what you end up doing basically is you start with a few seed web pages and then you follow all the links and you just keep following links and you keep indexing all the information and you end up with a ton of data of the internet over time so this is usually the starting point for a lot of the uh for a lot of these efforts now this common C data is quite raw and is filtered in

[3:30] many many different ways so here they Pro they document this is the same diagram they document a little bit the kind of processing that happens in these stages so the first thing here is something called URL filtering so what that is referring to lists of uh basically URLs that are or domains that uh you don't want to be getting data from so usually this includes things like U malware websites spam websites marketing websites uh

[4:00] racist websites adult sites and things like that so there's a ton of different types of websites that are just eliminated at this stage because we don't want them in our data set um the second part is text extraction you have to remember that all these web pages this is the raw HTML of these web pages that are being saved by these crawlers so when I go to inspect here this is what the raw HTML actually looks like you'll notice that it's got all this markup uh like lists and stuff like that and there's CSS and all this

[4:30] kind of stuff so this is um computer code almost for these web pages but what we really want is we just want this text right we just want the text of this web page and we don't want the navigation and things like that so there's a lot of filtering and processing uh and heris that go into uh adequately filtering for just their uh good content of these web pages the next stage here is language filtering so for example fine web filters uh using a language classifier they try to guess what language every

[5:00] single web page is in and then they only keep web pages that have more than 65% of English as an example and so you can get a sense that this is like a design decision that different companies can uh can uh take for themselves what fraction of all different types of languages are we going to include in our data set because for example if we filter out all of the Spanish as an example then you might imagine that our model later will not be very good at Spanish because it's just never seen that much data of that language and so different companies can focus on multilingual performance to uh

[5:30] to a different degree as an example so fine web is quite focused on English and so their language model if they end up training one later will be very good at English but not may be very good at other languages after language filtering there's a few other filtering steps and D duplication and things like that um finishing with for example the pii removal this is personally identifiable information so as an example addresses Social Security numbers and things like that you would try to detect them and you would try to filter out those kinds

[6:00] of web pages from the the data set as well so there's a lot of stages here and I won't go into full detail but it is a fairly extensive part of the pre-processing and you end up with for example the fine web data set so when you click in on it uh you can see some examples here of what this actually ends up looking like and anyone can download this on the huging phase web page and so here are some examples of the final text that ends up in the training set so this is some article about tornadoes in

[6:30] 2012 um so there's some t tadoes in 2020 in 2012 and what happened uh this next one is something about did you know you have two little yellow 9vt battery sized adrenal glands in your body okay so this is some kind of a odd medical article so just think of these as basically uh web pages on the internet filtered just for the text in various ways and now we have a ton of text 40 terabytes off it and that now is the

[7:00] starting point for the next step of this stage now I wanted to give you an intuitive sense of where we are right now so I took the first 200 web pages here and remember we have tons of them and I just take all that text and I just put it all together concatenate it and so this is what we end up with we just get this just just raw text raw internet text and there's a ton of it even in these 200 web pages so I can continue zooming out here and we just have this like massive tapestry of Text data and

[7:30] this text data has all these p patterns and what we want to do now is we want to start training neural networks on this data so the neural networks can internalize and model how this text flows right so we just have this giant texture of text and now we want to get neural Nets that mimic it okay now before we plug text into neural networks we have to decide how we're going to represent this text uh and how we're going to feed it in now the way our technology works for these neuron Lots is that they expect

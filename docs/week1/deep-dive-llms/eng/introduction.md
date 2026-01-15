---
title: "1. Introduction"
titleKr: "1. 소개"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 1
totalChapters: 24
---

# 1. 소개

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 1/24

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

ChatGPT와 같은 대규모 언어 모델(LLM)에 대한 포괄적인 소개로, 이 도구가 무엇이고 어떻게 작동하는지에 대한 사고 모델을 제공합니다.

**핵심 포인트:**
- LLM은 마법 같지만 한계와 주의점이 있음
- 전체 파이프라인을 일반 청중도 이해할 수 있게 설명 예고

---

## 영어 원문 트랜스크립트

## 1. Introduction

**요약**: ChatGPT와 같은 대규모 언어 모델(LLM)에 대한 포괄적인 소개로, 이 도구가 무엇이고 어떻게 작동하는지에 대한 mental model을 제공하겠다고 설명합니다. LLM이 잘하는 것과 못하는 것, 그리고 주의해야 할 함정들에 대해 다룹니다.

[0:00] hi everyone so I've wanted to make this video for a while it is a comprehensive but General audience introduction to large language models like Chachi PT and what I'm hoping to achieve in this video is to give you kind of mental models for thinking through what it is that this tool is it is obviously magical and amazing in some respects it's uh really good at some things not very good at other things and there's also a lot of sharp edges to be aware of so what is behind this text box you can put

[0:30] anything in there and press enter but uh what should we be putting there and what are these words generated back how does this work and what what are you talking to exactly so I'm hoping to get at all those topics in this video we're going to go through the entire pipeline of how this stuff is built but I'm going to keep everything uh sort of accessible to a general audience so let's take a look at first how you build something like chpt and along the way I'm going to talk about um you know some of the sort of cognitive psychological implications of

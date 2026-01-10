---
title: "5. Neural Network Internals"
titleKr: "5. 신경망 내부 구조"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 5
totalChapters: 24
---

# 5. 신경망 내부 구조

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 5/24

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

트랜스포머 아키텍처의 내부를 설명합니다.

**핵심 포인트:**
- 수십억 개 파라미터가 입력과 결합
- 어텐션, MLP 블록 등으로 구성
- GPU 클러스터에서 수개월간 학습

---

## 영어 원문 트랜스크립트

## 5. Neural Network Internals

**요약**: 신경망 내부 구조를 설명합니다. Transformer 아키텍처의 파라미터(가중치)는 수십억 개에 달하며, 이 파라미터들이 입력 토큰과 수학적으로 결합되어 다음 토큰을 예측합니다. 학습은 GPU 클러스터에서 수개월간 진행됩니다.

[20:30] zero up to let's say 8,000 tokens in principle this can be an infinite number of tokens we just uh it would just be too computationally expensive to process an infinite number of tokens so we just crop it at a certain length and that becomes the maximum context length of that uh model now these inputs X are mixed up in a giant mathematical expression together with the parameters or the weights of these neural networks so here I'm showing six example parameters and their

[21:00] setting but in practice these uh um modern neural networks will have billions of these uh parameters and in the beginning these parameters are completely randomly set now with a random setting of parameters you might expect that this uh this neural network would make random predictions and it does in the beginning it's totally random predictions but it's through this process of iteratively updating the network uh as and we call that process training a neural network so uh that the setting of these parameters gets

[21:30] adjusted such that the outputs of our neural network becomes consistent with the patterns seen in our training set so think of these parameters as kind of like knobs on a DJ set and as you're twiddling these knobs you're getting different uh predictions for every possible uh token sequence input and training in neural network just means discovering a setting of parameters that seems to be consistent with the statistics of the training set now let me just give you an example what this giant mathematical expression

[22:00] looks like just to give you a sense and modern networks are massive expressions with trillions of terms probably but let me just show you a simple example here it would look something like this I mean these are the kinds of Expressions just to show you that it's not very scary we have inputs x uh like X1 x2 in this case two example inputs and they get mixed up with the weights of the network w0 W1 2 3 Etc and this mixing is simple things like multiplication addition addition

[22:30] exponentiation division Etc and it is the subject of neural network architecture research to design effective mathematical Expressions uh that have a lot of uh kind of convenient characteristics they are expressive they're optimizable they're paralyzable Etc and so but uh at the end of the day these are these are not complex expressions and basically they mix up the inputs with the parameters to make predictions and we're optimizing uh the parameters of this neural network so

[23:00] that the predictions come out consistent with the training set now I would like to show you an actual production grade example of what these neural networks look like so for that I encourage you to go to this website that has a very nice visualization of one of these networks so this is what you will find on this website and this neural network here that is used in production settings has this special kind of structure this network is called the Transformer and this particular one as an example has 8

[23:30] 5,000 roughly parameters now here on the top we take the inputs which are the token sequences and then information flows through the neural network until the output which here are the logit softmax but these are the predictions for what comes next what token comes next and then here there's a sequence of Transformations and all these intermediate values that get produced inside this mathematical expression s it

[24:00] is sort of predicting what comes next so as an example these tokens are embedded into kind of like this distributed representation as it's called so every possible token has kind of like a vector that represents it inside the neural network so first we embed the tokens and then those values uh kind of like flow through this diagram and these are all very simple mathematical Expressions individually so we have layer norms and Matrix multiplications and uh soft Maxes and so on so here kind of like the

[24:30] attention block of this Transformer and then information kind of flows through into the multi-layer perceptron block and so on and all these numbers here these are the intermediate values of the expression and uh you can almost think of these as kind of like the firing rates of these synthetic neurons but I would caution you to uh not um kind of think of it too much like neurons because these are extremely simple neurons compared to the neurons you would find in your brain your biological neurons are very complex dynamical

[25:00] processes that have memory and so on there's no memory in this expression it's a fixed mathematical expression from input to Output with no memory it's just a stateless so these are very simple neurons in comparison to biological neurons but you can still kind of loosely think of this as like a synthetic piece of uh brain tissue if you if you like uh to think about it that way so information flows through all these neurons fire until we get to the predictions now I'm not actually going to dwell too much on the precise

[25:30] kind of like mathematical details of all these Transformations honestly I don't think it's that important to get into what's really important to understand is that this is a mathematical function it is uh parameterized by some fixed set of parameters like say 85,000 of them and it is a way of transforming inputs into outputs and as we twiddle the parameters we are getting uh different kinds of predictions and then we need to find a good setting of these parameters so that the predictions uh sort of match up with the patterns seen in training set

[26:00] so that's the Transformer okay so I've shown you the internals of the neural network and we talked a bit about the process of training it I want to cover one more major stage of working with these networks and that is the stage called inference so in inference what we're doing is we're generating new data from the model and so uh we want to basically see what kind of patterns it has internalized in the parameters of its Network so to generate from the model is relatively straightforward

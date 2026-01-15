---
title: "11. Hallucinations, Tool Use, Knowledge/Working Memory"
titleKr: "11. 환각, 도구 사용, 지식/작업 메모리"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 11
totalChapters: 24
---

# 11. 환각, 도구 사용, 지식/작업 메모리

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 11/24

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

LLM의 환각 문제와 해결책을 다룹니다.

**핵심 포인트:**
- 환각: 모르는 것도 자신있게 답함
- 완화: 모른다고 말하도록 학습
- 도구 사용: 웹 검색, 코드 실행으로 보완

---

## 영어 원문 트랜스크립트

## 11. Hallucinations, Tool Use, Knowledge/Working Memory

**요약**: LLM의 환각(hallucination) 문제와 도구 사용(tool use)을 설명합니다. 모델은 지식이 파라미터에 저장되어 있어 정확하지 않을 수 있으며, 검색이나 코드 실행 같은 외부 도구를 사용하여 이를 보완합니다. 지식 메모리(파라미터)와 작업 메모리(컨텍스트)의 차이도 다룹니다.

[1:21:00] problem that existed to a large extent with early models uh from many years ago and I think the problem has gotten a bit better uh because there are some medications that I'm going to go into in a second for now let's just try to understand where these hallucinations come from so here's a specific example of a few uh of three conversations that you might think you have in your training set and um these are pretty reasonable conversations that you could imagine being in the training set so like for example who is Cruz well Tom Cruz is an famous actor American actor

[1:21:30] and producer Etc who is John baraso this turns out to be a us senetor for example who is genis Khan well genis Khan was blah blah blah and so this is what your conversations could look like at training time now the problem with this is that when the human is writing the correct answer for the assistant in each one of these cases uh the human either like knows who this person is or they research them on the Internet and they come in and they write this response that kind of has this like confident tone of an answer and what happens

[1:22:00] basically is that at test time when you ask for someone who is this is a totally random name that I totally came up with and I don't think this person exists um as far as I know I just Tred to generate it randomly the problem is when we ask who is Orson kovats the problem is that the assistant will not just tell you oh I don't know even if the assistant and the language model itself might know inside its features inside its activations inside of its brain sort of it might know that this person is like

[1:22:30] not someone that um that is that it's familiar with even if some part of the network kind of knows that in some sense the uh saying that oh I don't know who this is is is not going to happen because the model statistically imitates is training set in the training set the questions of the form who is blah are confidently answered with the correct answer and so it's going to take on the style of the answer and it's going to do its best it's going to give you statistically the most likely guess and it's just going to basically make stuff

[1:23:00] up because these models again we just talked about it is they don't have access to the internet they're not doing research these are statistical token tumblers as I call them uh is just trying to sample the next token in the sequence and it's going to basically make stuff up so let's take a look at what this looks like I have here what's called the inference playground from hugging face and I am on purpose picking on a model called Falcon 7B which is an old model this is a few years ago now so it's an older model So It suffers from

[1:23:30] hallucinations and as I mentioned this has improved over time recently but let's say who is Orson kovats let's ask Falcon 7B instruct run oh yeah Orson kovat is an American author and science uh fiction writer okay this is totally false it's hallucination let's try again these are statistical systems right so we can resample this time Orson kovat is a fictional character from this 1950s TV show it's total BS right let's try again he's a former minor league baseball

[1:24:00] player okay so basically the model doesn't know and it's given us lots of different answers because it doesn't know it's just kind of like sampling from these probabilities the model starts with the tokens who is oron kovats assistant and then it comes in here and it's get it's getting these probabilities and it's just sampling from the probabilities and it just like actually comes up with stuff and the stuff is statistically consistent with the style of the answer in its training set and

[1:24:30] it's just doing that but you and I experiened it as a madeup factual knowledge but keep in mind that uh the model basically doesn't know and it's just imitating the format of the answer and it's not going to go off and look it up uh because it's just imitating again the answer so how can we uh mitigate this because for example when we go to chat apt and I say who is oron kovats and I'm now asking the stateoftheart state-of-the-art model from open AI this model will tell

[1:25:00] you oh so this model is actually is even smarter because you saw very briefly it said searching the web uh we're going to cover this later um it's actually trying to do tool use and uh kind of just like came up with some kind of a story but I want to just who or Kovach did not use any tools I don't want it to do web search there's a wellknown historical or public figure named or oron kovats so this model is not going to make up stuff

[1:25:30] this model knows that it doesn't know and it tells you that it doesn't appear to be a person that this model knows so somehow we sort of improved hallucinations even though they clearly are an issue in older models and it makes totally uh sense why you would be getting these kinds of answers if this is what your training set looks like so how do we fix this okay well clearly we need some examples in our data set that where the correct answer for the assistant is that the model doesn't know about some particular fact but we only

[1:26:00] need to have those answers be produced in the cases where the model actually doesn't know and so the question is how do we know what the model knows or doesn't know well we can empirically probe the model to figure that out so let's take a look at for example how meta uh dealt with hallucinations for the Llama 3 series of models as an example so in this paper that they published from meta we can go into which they call here factuality and they describe the procedure by which they

[1:26:30] basically interrogate the model to figure out what it knows and doesn't know to figure out sort of like the boundary of its knowledge and then they add examples to the training set where for the things where the model doesn't know them the correct answer is that the model doesn't know them which sounds like a very easy thing to do in principle but this roughly fixes the issue and the the reason it fixes the issue is because remember like the model might

[1:27:00] actually have a pretty good model of its self knowledge inside the network so remember we looked at the network and all these neurons inside the network you might imagine that there's a neuron somewhere in the network that sort of like lights up for when the model is uncertain but the problem is that the activation of that neuron is not currently wired up to the model actually saying in words that it doesn't know so even though the internal of the neural network no because there's some neurons that represent that the model uh will

[1:27:30] not surface that it will instead take its best guess so that it sounds confident um just like it sees in a training set so we need to basically interrogate the model and allow it to say I don't know in the cases that it doesn't know so let me take you through what meta roughly does so basically what they do is here I have an example uh Dominic kek is uh the featured article today so I just went there randomly and what they do is basically they take a random document in a training set and

[1:28:00] they take a paragraph and then they use an llm to construct questions about that paragraph so for example I did that with chat GPT here so I said here's a paragraph from this document generate three specific factual questions based on this paragraph and give me the questions and the answers and so the llms are already good enough to create and reframe this information so if the information is in the context window um of this llm this

[1:28:30] actually works pretty well it doesn't have to rely on its memory it's right there in the context window and so it can basically reframe that information with fairly high accuracy so for example can generate questions for us like for which team did he play here's the answer how many cups did he win Etc and now what we have to do is we have some question and answers and now we want to interrogate the model so roughly speaking what we'll do is we'll take our questions and we'll go to our model which would be uh say llama uh in meta

[1:29:00] but let's just interrogate mol 7B here as an example that's another model so does this model know about this answer let's take a look uh so he played for Buffalo Sabers right so the model knows and the the way that you can programmatically decide is basically we're going to take this answer from the model and we're going to compare it to the correct answer and again the model model are good enough to do this automatically so there's no humans involved here we can take uh

[1:29:30] basically the answer from the model and we can use another llm judge to check if that is correct according to this answer and if it is correct that means that the model probably knows so what we're going to do is we're going to do this maybe a few times so okay it knows it's Buffalo Savers let's drag in um Buffalo Sabers let's try one more time Buffalo Sabers so we asked three times about this factual question and the model seems to know so everything is

[1:30:00] great now let's try the second question how many Stanley Cups did he win and again let's interrogate the model about that and the correct answer is two so um here the model claims that he won um four times which is not correct right it doesn't match two so the model doesn't know it's making stuff up let's

[1:30:30] um so here the model again it's kind of Dragon here it says did he did not even did not win during his career so obviously the model doesn't know and the way we can programmatically tell again is we interrogate the model three times and we compare its answers maybe three times five times whatever it is to the correct answer and if the model doesn't know then we know that the model doesn't know this question and then what we do is we take this question we create a new conversation in

[1:31:00] the training set so we're going to add a new conversation training set and when the question is how many Stanley Cups did he win the answer is I'm sorry I don't know or I don't remember and that's the correct answer for this question because we interrogated the model and we saw that that's the case if you do this for many different types of uh questions for many different types of documents you are giving the model an opportunity to in its training set refuse to say based on its knowledge and

[1:31:30] if you just have a few examples of that in your training set the model will know um and and has the opportunity to learn the association of this knowledge-based refusal to this internal neuron somewhere in its Network that we presume exists and empirically this turns out to be probably the case and it can learn that Association that hey when this neuron of uncertainty is high then I actually don't know and I'm allowed to say that I'm sorry but I don't think I remember this Etc and if you have these

[1:32:00] uh examples in your training set then this is a large mitigation for hallucination and that's roughly speaking why chpt is able to do stuff like this as well so these are kinds of uh mitigations that people have implemented and that have improved the factuality issue over time okay so I've described mitigation number one for basically mitigating the hallucinations issue now we can actually do much better than that uh it's instead of just saying that we don't know uh we can introduce

[1:32:30] an additional mitigation number two to give the llm an opportunity to be factual and actually answer the question now what do you and I do if I was to ask you a factual question and you don't know uh what would you do um in order to answer the question well you could uh go off and do some search and uh use the internet and you could figure out the answer and then tell me what that answer is and we can do the exact exact same thing with these models so think of the knowledge inside the neural network

[1:33:00] inside its billions of parameters think of that as kind of a vague recollection of the things that the model has seen during its training during the pre-training stage a long time ago so think of that knowledge in the parameters as something you read a month ago and if you keep reading something then you will remember it and the model remembers that but if it's something rare then you probably don't have a really good recollection of that information but what you and I do is we just go and look it up now when you go and look it up what you're doing basically is like you're refreshing your

[1:33:30] working memory with information and then you're able to sort of like retrieve it talk about it or Etc so we need some equivalent of allowing the model to refresh its memory or its recollection and we can do that by introducing tools uh for the models so the way we are going to approach this is that instead of just saying hey I'm sorry I don't know we can attempt to use tools so we can create uh a mechanism by which the language model can emit special tokens and these are tokens that

[1:34:00] we're going to introduce new tokens so for example here I've introduced two tokens and I've introduced a format or a protocol for how the model is allowed to use these tokens so for example instead of answering the question when the model does not instead of just saying I don't know sorry the model has the option now to emitting the special token search start and this is the query that will go to like bing.com in the case of openai or say Google search or something like that so it will emit the query and then

[1:34:30] it will emit search end and then here what will happen is that the program that is sampling from the model that is running the inference when it sees the special token search end instead of sampling the next token uh in the sequence it will actually pause generating from the model it will go off it will open a session with bing.com and it will paste the search query into Bing and it will then um get all the text that is retrieved and it will basically take that text it will maybe represent

[1:35:00] it again with some other special tokens or something like that and it will take that text and it will copy paste it here into what I Tred to like show with the brackets so all that text kind of comes here and when the text comes here it enters the context window so the model so that text from the web search is now inside the context window that will feed into the neural network and you should think of the context window as kind of like the working memory of the model that data that is in the context window is directly accessible by the model it

[1:35:30] directly feeds into the neural network so it's not anymore a vague recollection it's data that it it has in the context window and is directly available to that model so now when it's sampling the new uh tokens here afterwards it can reference very easily the data that has been copy pasted in there so that's roughly how these um how these tools use uh tools uh function and so web search is just one of the tools we're going to look at some of the other tools in a bit uh but basically

[1:36:00] you introduce new tokens you introduce some schema by which the model can utilize these tokens and can call these special functions like web search functions and how do you teach the model how to correctly use these tools like say web search search start search end Etc well again you do that through training sets so we need now to have a bunch of data and a bunch of conversations that show the model by example how to use web search so what are the what are the settings where you are using the search um and what does

[1:36:30] that look like and here's by example how you start a search and the search Etc and uh if you have a few thousand maybe examples of that in your training set the model will actually do a pretty good job of understanding uh how this tool works and it will know how to sort of structure its queries and of course because of the pre-training data set and its understanding of the world it actually kind of understands what a web search is and so it actually kind of has a pretty good native understanding um of what kind of stuff is a good search query um and so it all kind of

[1:37:00] just like works you just need a little bit of a few examples to show it how to use this new tool and then it can lean on it to retrieve information and uh put it in the context window and that's equivalent to you and I looking something up because once it's in the context it's in the working memory and it's very easy to manipulate and access so that's what we saw a few minutes ago when I was searching on chat GPT for who is Orson kovats the chat GPT language model decided Ed that this is some kind of a rare um individual or something like that and instead of giving me an

[1:37:30] answer from its memory it decided that it will sample a special token that is going to do web search and we saw briefly something flash it was like using the web tool or something like that so it briefly said that and then we waited for like two seconds and then it generated this and you see how it's creating references here and so it's citing sources so what happened here is it went off it did a web web search it found these sources and these URLs and the text of these web pages was all

[1:38:00] stuffed in between here and it's not showing here but it's it's basically stuffed as text in between here and now it sees that text and now it kind of references it and says that okay it could be these people citation could be those people citation Etc so that's what happened here and that's what and that's why when I said who is Orson kovats I could also say don't use any tools and then that's enough to um basically convince chat PT to not use tools and just use its memory and its

[1:38:30] recollection I also went off and I um tried to ask this question of Chachi PT so how many standing cups did uh Dominic Hasek win and Chachi P actually decided that it knows the answer and it has the confidence to say that uh he want twice and so it kind of just relied on its memory because presumably it has um it has enough of a kind of confidence in its weights in it parameters and activations that this is uh retrievable just for memory um but

[1:39:00] you can also conversely use web search to make sure and then for the same query it actually goes off and it searches and then it finds a bunch of sources it finds all this all of this stuff gets copy pasted in there and then it tells us uh to again and sites and it actually says the Wikipedia article which is the source of this information for us as well so that's tools web search the model determines when to search and then uh that's kind of like how these tools uh

[1:39:30] work and this is an additional kind of mitigation for uh hallucinations and factuality so I want to stress one more time this very important sort of psychology Point knowledge in the parameters of the neural network is a vague recollection the knowledge in the tokens that make up the context window is the working memory and it roughly speaking Works kind of like um it works for us in our brain the stuff we remember is our parameters uh and the

[1:40:00] stuff that we just experienced like a few seconds or minutes ago and so on you can imagine that being in our context window and this context window is being built up as you have a conscious experience around you so this has a bunch of um implications also for your use of LOLs in practice so for example I can go to chat GPT and I can do something like this I can say can you Summarize chapter one of Jane Austin's Pride and Prejudice right and this is a perfectly fine prompt and Chach actually does something relatively reasonable here and but the reason it does that is

[1:40:30] because Chach has a pretty good recollection of a famous work like Pride and Prejudice it's probably seen a ton of stuff about it there's probably forums about this book it's probably read versions of this book um and it's kind of like remembers because even if you've read this or articles about it you'd kind of have a recollection enough to actually say all this but usually when I actually interact with LMS and I want them to recall specific things it always works better if you just give it to them so I think a much better prompt would be something like this can you

[1:41:00] summarize for me chapter one of genos's spr and Prejudice and then I am attaching it below for your reference and then I do something like a delimeter here and I paste it in and I I found that just copy pasting it from some website that I found here um so copy pasting the chapter one here and I do that because when it's in the context window the model has direct access to it and can exactly it doesn't have to recall it it just has access to it and so this summary is can be expected to be a significantly high quality or higher

[1:41:30] quality than this summary uh just because it's directly available to the model and I think you and I would work in the same way if you want to it would be you would produce a much better summary if you had reread this chapter before you had to summarize it and that's basically what's happening here or the equivalent of it the next sort of psychological Quirk I'd like to talk about briefly is that of the knowledge of self so what I see very often on the internet is that people do something like this they ask llms something like what model are you and who built you and

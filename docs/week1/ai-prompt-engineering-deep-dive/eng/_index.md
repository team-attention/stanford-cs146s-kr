---
title: "AI Prompt Engineering: A Deep Dive"
source_url: "https://www.youtube.com/watch?v=T9aRN5JkmL8"
source_type: youtube_transcript
author: "Anthropic"
duration: "1:16:42"
fetch_date: "2026-01-10"
translation_status: none
chapters: 11
---

# AI Prompt Engineering: A Deep Dive

[원본 영상](https://www.youtube.com/watch?v=T9aRN5JkmL8)

Anthropic의 프롬프트 엔지니어링 전문가들(Amanda Askell, Alex Albert, David Hershey, Zack Witten)이 프롬프트 엔지니어링의 진화, 실용적인 팁, 그리고 AI 역량이 성장함에 따라 프롬프팅이 어떻게 변화할지에 대해 논의합니다.

## Table of Contents

1. [Introduction](#1-introduction) (0:00)
2. [Defining prompt engineering](#2-defining-prompt-engineering) (2:05)
3. [What makes a good prompt engineer](#3-what-makes-a-good-prompt-engineer) (6:34)
4. [Refining prompts](#4-refining-prompts) (12:17)
5. [Honesty, personas and metaphors in prompts](#5-honesty-personas-and-metaphors-in-prompts) (24:27)
6. [Model reasoning](#6-model-reasoning) (37:12)
7. [Enterprise vs research vs general chat prompts](#7-enterprise-vs-research-vs-general-chat-prompts) (45:18)
8. [Tips to improve prompting skills](#8-tips-to-improve-prompting-skills) (50:52)
9. [Jailbreaking](#9-jailbreaking) (53:56)
10. [Evolution of prompt engineering](#10-evolution-of-prompt-engineering) (56:51)
11. [Future of prompt engineering](#11-future-of-prompt-engineering) (64:34)

---

## 1. Introduction

**시간**: 0:00

[0:00] - Basically, this entire roundtable session here
[0:03] is just gonna be focused mainly on prompt engineering.
[0:06] A variety of perspectives at this table around prompting
[0:10] from a research side, from a consumer side,
[0:11] and from the enterprise side.
[0:13] And I want to just get the whole wide range of opinions
[0:16] because there's a lot of them.
[0:18] And just open it up to discussion
[0:20] and explore what prompt engineering really is
[0:24] and what it's all about.
[0:25] And yeah, we'll just take it from there.
[0:28] So maybe we can go around the horn with intros.
[0:30] I can kick it off. I'm Alex.
[0:32] I lead Developer Relations here at Anthropic.
[0:35] Before that,
[0:36] I was technically a prompt engineer at Anthropic.
[0:39] I worked on our prompt engineering team,
[0:43] and did a variety of roles spanning
[0:45] from a solutions architect type of thing,
[0:48] to working on the research side.
[0:51] So with that, maybe I can hand it over to David.
[0:53] - Heck, yeah. My name's David Hershey.
[0:56] I work with customers mostly at Anthropic
[0:59] on a bunch of stuff technical,
[1:02] I help people with finetuning,
[1:04] but also just a lot of the generic things
[1:06] that make it hard to adopt language models of prompting.
[1:08] And just like how to build systems with language models,
[1:11] but spend most of my time working with customers.
[1:14] - Cool. I'm Amanda Askell.
[1:16] I lead one of the Finetuning teams at Anthropic,
[1:19] where I guess I try to make Claude be honest and kind.
[1:24] Yeah.
[1:26] - My name is Zack Witten.
[1:27] I'm a Prompt Engineer at Anthropic.
[1:30] Alex and I always argue about who the first one was.
[1:32] He says it's him, I say it's me.
[1:33] - Contested. - Yeah.
[1:35] I used to work a lot with individual customers,
[1:38] kind of the same way David does now.
[1:40] And then as we brought more solutions architects
[1:44] to the team, I started working on things
[1:46] that are meant to raise the overall levels
[1:50] of ambient prompting in society,
[1:53] I guess, like the prompt generator
[1:55] and the various educational materials that people use.
[1:59] - Nice, cool. Well, thanks guys for all coming here.
[2:02] I'm gonna start with a very broad question

---

## 2. Defining prompt engineering

**시간**: 2:05

[2:05] just so we have a frame
[2:07] going into the rest of our conversations here.
[2:09] What is prompt engineering? Why is it engineering?
[2:14] What's prompt, really?
[2:15] If anyone wants to kick that off,
[2:17] give your own perspective on it,
[2:19] feel free to take the rein here.
[2:21] - I feel like we have a prompt engineer.
[2:23] It's his job.
[2:24] - We're all prompt engineers in our own form.
[2:27] - But one of us has a job.
[2:28] - Yeah. Zack, maybe since it's in your title.
[2:30] - One of us has a job, but the other three don't have jobs.
[2:35] - I guess I feel like prompt engineering
[2:37] is trying to get the model to do things,
[2:40] trying to bring the most out of the model.
[2:42] Trying to work with the model to get things done
[2:46] that you wouldn't have been able to do otherwise.
[2:49] So a lot of it is just clear communicating.
[2:52] I think at heart,
[2:55] talking to a model is a lot like talking to a person.
[2:57] And getting in there
[2:59] and understanding the psychology of the model,
[3:02] which Amanda is the world's most expert person in the world.
[3:08] - Well, I'm gonna keep going on you.
[3:10] Why is engineering in the name?
[3:13] - Yeah.
[3:14] I think the engineering part comes from the trial and error.
[3:18] - Okay.
[3:18] - So one really nice thing about talking to a model
[3:23] that's not like talking to a person,
[3:24] is you have this restart button.
[3:25] This giant go back to square zero
[3:28] where you just start from the beginning.
[3:29] And what that gives you the ability to do
[3:30] that you don't have, is a truly start from scratch
[3:34] and try out different things in an independent way,
[3:38] so that you don't have interference from one to the other.
[3:40] And once you have that ability to experiment
[3:43] and to design different things,
[3:45] that's where the engineering part has the potential
[3:48] to come in.
[3:49] - Okay.
[3:50] So what you're saying is as you're writing these prompts,
[3:53] you're typing in a message to Claude or in the API
[3:55] or whatever it is.
[3:57] Being able to go back and forth with the model
[4:00] and to iterate on this message,
[4:02] and revert back to the clean slate every time,
[4:06] that process is the engineering part.
[4:08] This whole thing is prompt engineering all in one.
[4:13] - There's another aspect of it too,
[4:15] which is integrating the prompts
[4:19] within your system as a whole.
[4:21] And David has done a ton of work with customers integrating.
[4:26] A lot of times it's not just as simple
[4:28] as you write one prompt and you give it to the model
[4:30] and you're done.
[4:30] In fact, it's anything but. It's like way more complicated.
[4:32] - Yeah.
[4:34] I think of prompts as the way
[4:36] that you program models a little bit,
[4:38] that makes it too complicated.
[4:40] 'Cause I think Zack is generally right
[4:41] that it's just talking clearly is the most important thing.
[4:45] But if you think about it a little bit
[4:47] as programming a model, you have to think about
[4:49] where data comes from, what data you have access to.
[4:51] So if you're doing RAG or something,
[4:53] what can I actually use and do and pass to a model?
[4:57] You have to think about trade-offs in latency
[5:02] and how much data you're providing and things like that.
[5:03] There's enough systems thinking
[5:04] that goes into how you actually build around a model.
[5:07] I think a lot of that's also the core
[5:08] of why it maybe deserves its own carve-out as a thing
[5:13] to reason about separately from just a software engineer
[5:16] or a PM or something like that.
[5:17] It's kind of its own domain
[5:18] of how to reason about these models.
[5:20] - Is a prompt in this sense then natural language code?
[5:24] Is it a higher level of abstraction
[5:26] or is it a separate thing?
[5:28] - I think trying to get too abstract with a prompt is a way
[5:33] to overcomplicate a thing, because I think,
[5:37] we're gonna get into it, but more often than not,
[5:38] the thing you wanna do
[5:39] is just write a very clear description of a task,
[5:42] not try to build crazy abstractions or anything like that.
[5:47] But that said, you are compiling the set of instructions
[5:51] and things like that into outcomes a lot of times.
[5:54] So precision and a lot the things
[5:57] you think about with programming about version control
[6:00] and managing what it looked like
[6:01] back then when you had this experiment.
[6:03] And tracking your experiment and stuff like that,
[6:06] that's all just equally important to code.
[6:11] - Yeah.
[6:12] - So it's weird to be in this paradigm where written text,
[6:15] like a nice essay that you wrote is something
[6:18] that's looked like the same thing as code.
[6:22] But it is true that now we write essays
[6:25] and treat them code, and I think that's actually correct.
[6:27] - Yeah. Okay, interesting.
[6:29] So maybe piggybacking off of that,
[6:32] we've loosely defined what prompt engineering is.

---

## 3. What makes a good prompt engineer

**시간**: 6:34

[6:36] So what makes a good prompt engineer?
[6:38] Maybe, Amanda, I'll go to you for this,
[6:41] since you're trying to hire prompt engineers
[6:43] more so in a research setting.
[6:45] What does that look like?
[6:46] What are you looking for in that type of person?
[6:49] - Yeah, good question.
[6:50] I think it's a mix of like Zack said, clear communication,
[6:55] so the ability to just clearly state things,
[6:58] clearly understand tasks,
[7:00] think about and describe concepts really well.
[7:03] That's the writing component, I think.
[7:05] I actually think that being a good writer
[7:08] is not as correlated with being a good prompt engineer
[7:12] as people might think.
[7:13] So I guess I've had this discussion with people
[7:15] 'cause I think there's some argument as like,
[7:16] "Maybe you just shouldn't have the name engineer in there.
[7:19] Why isn't it just writer?"
[7:22] I used to be more sympathetic to that.
[7:23] And then, I think, now I'm like what you're actually doing,
[7:27] people think that you're writing one thing and you're done.
[7:31] Then I'll be like to get a semi-decent prompt
[7:34] when I sit down with the model.
[7:37] Earlier, I was prompting the model
[7:38] and I was just like in a 15-minute span
[7:40] I'll be sending hundreds of prompts to the model.
[7:42] It's just back and forth, back and forth, back and forth.
[7:45] So I think it's this willingness to iterate and to look
[7:48] and think what is it that was misinterpreted here,
[7:51] if anything?
[7:52] And then fix that thing.
[7:55] So that ability to iterate.
[7:57] So I'd say clear communication, that ability to iterate.
[8:01] I think also thinking about ways
[8:03] in which your prompt might go wrong.
[8:05] So if you have a prompt
[8:06] that you're going to be applying to say, 400 cases,
[8:09] it's really easy to think about the typical case
[8:11] that it's going to be applied to,
[8:12] to see that it gets the right solution in that case,
[8:14] and then to move on.
[8:15] I think this is a very classic mistake that people made.
[8:19] What you actually want to do is find the cases
[8:21] where it's unusual.
[8:23] So you have to think about your prompt and be like,
[8:25] "What are the cases where it'd be really unclear to me
[8:26] what I should do in this case?"
[8:28] So for example, you have a prompt that says,
[8:29] "I'm going to send you a bunch of data.
[8:31] I want you to extract all of the rows
[8:33] where someone's name is, I don't know,
[8:36] starts with the letter G."
[8:37] And then you're like, "Well, I'm gonna send it a dataset
[8:39] where there is no such thing,
[8:41] there is no such name that starts with the letter G.
[8:43] "I'm going to send it something that's not a dataset,
[8:45] I might also just send it an empty string.
[8:48] These are all of the cases you have to try,
[8:49] because then you're like, "What does it do in these cases? "
[8:51] And then you can give it more instructions
[8:53] for how it should deal with that case.
[8:55] - I work with customers so often where you're an engineer,
[8:59] you're building something.
[9:00] And there's a part in your prompt where a customer of theirs
[9:03] is going to write something.
[9:04] - Yeah.
[9:05] - And they all think
[9:06] about these really perfectly phrased things
[9:07] that they think someone's going to type into their chatbot.
[9:09] And in reality, it's like they never used the shift key
[9:12] and every other word is a typo.
[9:15] - They think it's Google. - And there's no punctuation.
[9:17] - They just put in random words with no question.
[9:18] - Exactly.
[9:20] So you have these evals
[9:21] that are these beautifully structured
[9:22] what their users ideally would type in.
[9:24] But being able to go the next step
[9:26] to reason about what your actual traffic's gonna be like,
[9:29] what people are actually gonna to try to do,
[9:31] that's a different level of thinking.
[9:33] - One thing you said that really resonated with me
[9:35] is reading the model responses.
[9:37] In a machine learning context,
[9:39] you're supposed to look at the data.
[9:41] It's almost a cliche like look at your data,
[9:43] and I feel like the equivalent for prompting
[9:45] is look at the model outputs.
[9:48] Just reading a lot of outputs and reading them closely.
[9:51] Like Dave and I were talking on the way here,
[9:52] one thing that people will do
[9:53] is they'll put think step-by-step in their prompt.
[9:57] And they won't check to make sure
[9:58] that the model is actually thinking step-by-step,
[10:00] because the model might take it in a more abstract
[10:04] or general sense.
[10:05] Rather than like,
[10:06] "No, literally you have to write down your thoughts
[10:08] in these specific tags."
[10:10] So yeah, if you aren't reading the model outputs,
[10:14] you might not even notice that it's making that mistake.
[10:16] - Yeah, that's interesting.
[10:19] There is that weird theory of mind piece
[10:22] to being a prompt engineer
[10:23] where you have to think almost about
[10:25] how the model's gonna view your instructions.
[10:27] But then if you're writing for an enterprise use case too,
[10:29] you also have to think about
[10:30] how the user's gonna talk to the model,
[10:32] as you're the third party sitting there
[10:34] in that weird relationship.
[10:37] Yeah.
[10:39] - On the theory of mind piece, one thing I would say is,
[10:43] it's so hard to write instructions down for a task.
[10:48] It's so hard to untangle in your own brain
[10:51] all of the stuff that you know
[10:53] that Claude does not know and write it down.
[10:56] It's just an immensely challenging thing
[10:57] to strip away all of the assumptions you have, and be able
[11:00] to very clearly communicate the full fact set of information
[11:04] that is needed to a model.
[11:05] I think that's another thing
[11:06] that really differentiates a good prompt engineer
[11:08] from a bad one, is like...
[11:10] A lot of people will just write down the things they know.
[11:13] But they don't really take the time
[11:15] to systematically break out
[11:17] what is the actual full set of information you need to know
[11:19] to understand this task?
[11:21] - Right.
[11:22] - And that's a very clear thing I see a lot
[11:24] is prompts where it's just conditioned.
[11:28] The prompt that someone wrote is so conditioned
[11:30] on their prior understanding of a task,
[11:33] that when they show it to me I'm like, "This makes no sense.
[11:36] None of the words you wrote make any sense,
[11:38] because I don't know anything
[11:39] about your interesting use case."
[11:42] But I think a good way to think about prompt engineering
[11:45] in that front and a good skill for it,
[11:47] is just can you actually step back from what you know
[11:51] and communicate to this weird system that knows a lot,
[11:54] but not everything about what it needs to know to do a task?
[11:58] - Yeah.
[11:59] The amount of times I've seen someone's prompt
[12:00] and then being like,
[12:01] "I can't do the task based on this prompt."
[12:04] I'm human level and you're giving this to something
[12:06] that is worse than me and expecting it to do better,
[12:10] and I'm like, "Yeah."
[12:12] - Yeah.
[12:13] There is that interesting thing with like...
[12:15] Current models don't really do a good job

---

## 4. Refining prompts

**시간**: 12:17

[12:19] of asking good, probing questions in response
[12:22] like a human would.
[12:23] If I'm giving Zack directions on how to do something,
[12:26] he'll be like, "This doesn't make any sense.
[12:28] What am I supposed to do at this step or here and here?"
[12:30] Model doesn't do that, right, so you have to, as yourself,
[12:34] think through what that other person would say
[12:37] and then go back to your prompt and answer those questions.
[12:40] - You could ask it to do that.
[12:41] - You could. That's right. - I do that, yeah.
[12:43] - I guess that's another step.
[12:44] - I was going to say one of the first things I do
[12:45] with my initial prompt,
[12:46] is I'll give it the prompt and then I'll be like,
[12:48] "I don't want you to follow these instructions.
[12:50] I just want you to tell me the ways in
[12:51] which they're unclear or any ambiguities,
[12:53] or anything you don't understand."
[12:54] And it doesn't always get it perfect,
[12:55] but it is interesting that that is one thing you can do.
[12:59] And then also sometimes if people see
[13:01] that the model makes a mistake,
[13:01] the thing that they don't often do is just ask the model.
[13:04] So they say to the model, "You got this wrong.
[13:06] Can you think about why?
[13:07] And can you maybe write an edited version of my instructions
[13:09] that would make you not get it wrong?"
[13:11] And a lot of the time, the model just gets it right.
[13:14] The model's like, "Oh, yeah.
[13:15] Here's what was unclear, here's a fix to the instructions,"
[13:18] and then you put those in and it works.
[13:20] - Okay.
[13:21] I'm actually really curious about this personally almost.
[13:23] Is that true that that works?
[13:26] Is the model able to spot its mistakes that way?
[13:29] When it gets something wrong, you say,
[13:31] "Why did you get this wrong?"
[13:32] And then it tells you maybe something like,
[13:34] "Okay, how could I phrase this to you in the future
[13:37] so you get it right?"
[13:38] Is there an element of truth to that?
[13:40] Or is that just a hallucination on the model's part
[13:43] around what it thinks its limits are?
[13:46] - I think if you explain to it what it got wrong,
[13:49] it can identify things in the query sometimes.
[13:52] I think this varies by task.
[13:53] This is one of those things where I'm like I'm not sure
[13:56] what percentage of the time it gets it right,
[13:57] but I always try it 'cause sometimes it does.
[14:00] - And you learn something. - Yeah.
[14:01] - Anytime you go back to the model
[14:03] or back and forth with the model,
[14:04] you learn something about what's going on.
[14:06] I think you're giving away information
[14:08] if you don't at least try.
[14:11] - That's interesting.
[14:12] Amanda, I'm gonna keep asking you a few more questions here.
[14:15] One thing maybe for everybody watching this,
[14:18] is we have these Slack channels at Anthropic
[14:20] where people can add Claude into the Slack channel,
[14:24] then you can talk to Claude through it.
[14:26] And Amanda has a Slack channel
[14:28] that a lot of people follow of her interactions with Claude.
[14:32] And one thing that I see you always do in there,
[14:34] which you probably do the most of anyone at Anthropic,
[14:37] is use the model to help you
[14:41] in a variety of different scenarios.
[14:42] I think you put a lot of trust into the model
[14:45] in the research setting.
[14:47] I'm curious how you've developed those intuitions
[14:49] for when to trust the model.
[14:51] Is that just a matter of usage,
[14:53] experience or is it something else?
[14:55] - I think I don't trust the model ever
[14:59] and then I just hammer on it.
[15:00] So I think the reason why you see me do that a lot,
[15:02] is that that is me being like,
[15:04] "Can I trust you to do this task?"
[15:06] 'Cause there's some things, models are kind of strange.
[15:08] If you go slightly out of distribution,
[15:11] you just go into areas where they haven't been trained
[15:14] or they're unusual.
[15:15] Sometimes you're like,
[15:15] "Actually, you're much less reliable here,
[15:17] even though it's a fairly simple task."
[15:21] I think that's happening less and less over time
[15:22] as models get better,
[15:23] but you want to make sure you're not in that kind of space.
[15:26] So, yeah, I don't think I trust it by default,
[15:28] but I think in ML,
[15:29] people often want to look across really large datasets.
[15:33] And I'm like, "When does it make sense to do that?"
[15:35] And I think the answer is when you get relatively low signal
[15:38] from each data point,
[15:39] you want to look across many, many data points,
[15:42] because you basically want to get rid of the noise.
[15:44] With a lot of prompting tasks,
[15:46] I think you actually get really high signal from each query.
[15:49] So if you have a really well-constructed set
[15:52] of a few hundred prompts,
[15:53] that I think can be much more signal
[15:55] than thousands that aren't as well-crafted.
[15:59] So I do think that I can trust the model
[16:02] if I look at 100 outputs of it and it's really consistent.
[16:06] And I know that I've constructed those
[16:08] to basically figure out all of the edge cases
[16:10] and all of the weird things that the model might do,
[16:12] strange inputs, et cetera.
[16:14] I trust that probably more
[16:16] than a much more loosely constructed set
[16:19] of several thousand.
[16:22] - I think in ML, a lot of times the signals are numbers.
[16:29] Did you predict this thing right or not?
[16:31] And it'd be looking at the logprobs of a model
[16:34] and trying to intuit things, which you can do,
[16:36] but it's kind of sketchy.
[16:39] I feel like the fact that models output more often than not
[16:42] a lot of stuff like words and things.
[16:44] There's just fundamentally so much to learn
[16:47] between the lines of what it's writing and why and how,
[16:50] and that's part of what it is.
[16:51] It's not just did it get the task right or not?
[16:54] It's like, "How did it get there?
[16:57] How was it thinking about it? What steps did it go through?"
[16:59] You learn a lot about what is going on,
[17:01] or at least you can try to get a better sense, I think.
[17:04] But that's where a lot of information comes from for me,
[17:05] is by reading the details of what came out,
[17:08] not just through the result.
[17:09] - I think also the very best of prompting
[17:14] can make the difference between a failed
[17:16] and a successful experiment.
[17:18] So sometimes I can get annoyed if people don't focus enough
[17:21] on the prompting component of their experiment,
[17:23] because I'm like, "This can, in fact, be the difference
[17:27] between 1% performance in the model or 0.1%."
[17:31] In such a way that your experiment doesn't succeed
[17:33] if it's at top 5% model performance,
[17:35] but it does succeed if it's top 1% or top 0.1%.
[17:39] And then I'm like, "If you're gonna spend time
[17:40] over coding your experiment really nicely,
[17:43] but then just not spend time on the prompt."
[17:47] I don't know.
[17:48] That doesn't make sense to me,
[17:49] 'cause that can be the difference between life and death
[17:51] of your experiment.
[17:52] - Yeah.
[17:52] And with the deployment too, it's so easy to,
[17:55] "Oh, we can't ship this."
[17:57] And then you change the prompt around
[17:58] and suddenly it's working. - Yeah.
[18:00] - It's a bit of a double-edged sword though,
[18:01] because I feel like there's a little bit of prompting
[18:03] where there's always this mythical, better prompt
[18:07] that's going to solve my thing on the horizon.
[18:09] - Yeah.
[18:10] - I see a lot of people get stuck
[18:11] into the mythical prompt on the horizon,
[18:13] that if I just keep grinding, keep grinding.
[18:15] It's never bad to grind a little bit on a prompt,
[18:17] as we've talked, you learn things.
[18:19] But it's one of the scary things
[18:22] about prompting is that there's this whole world of unknown.
[18:25] - What heuristics do you guys have
[18:26] for when something is possible versus not possible
[18:30] with a perfect prompt, whatever that might be?
[18:33] - I think I'm usually checking
[18:35] for whether the model kind of gets it.
[18:37] So I think for things where I just don't think a prompt
[18:40] is going to help, there is a little bit of grinding.
[18:43] But often, it just becomes really clear
[18:45] that it's not close or something.
[18:49] Yeah.
[18:50] I don't know if that's a weird one where I'm just like,
[18:52] "Yeah, if the model just clearly can't do something,
[18:55] I won't grind on it for too long."
[18:58] - This is the part that you can evoke
[18:59] how it's thinking about it,
[19:00] and you can ask it how it's thinking about it and why.
[19:02] And you can get a sense of is it thinking about it right?
[19:05] Are we even in the right zip code of this being right?
[19:11] And you can get a little bit of a kneeling on that front of,
[19:14] at least, I feel like I'm making progress
[19:15] towards getting something closer to right.
[19:19] Where there's just some tasks
[19:20] where you really don't get anywhere closer
[19:23] to it's thought process.
[19:24] It's just like every tweak you make
[19:27] just veers off in a completely different,
[19:29] very wrong direction, and I just tend to abandon those.
[19:31] I don't know.
[19:32] - Those are so rare now though,
[19:33] and I get really angry at the model when I discover them
[19:36] because that's how rare they are.
[19:38] I get furious.
[19:39] I'm like, "How dare there be a task that you can't just do,
[19:43] if I just push you in the right direction?"
[19:46] - I had my thing with Claude plays Pokemon recently,
[19:49] and that was one of the rare times where I really...
[19:51] - Yeah, can you explain that?
[19:52] Explain that just for people. I think that's really cool.
[19:54] - I did a bit of an experiment
[19:56] where I hooked Claude up to a Game Boy emulator,
[19:59] and tried to have it play the game Pokemon Red
[20:02] like the OG Pokemon.
[20:05] And it's like you think what you wanna do
[20:09] and it could write some code to press buttons
[20:10] and stuff like that, pretty basic.
[20:12] And I tried a bunch of different very complex
[20:15] prompting layouts, but you just get into certain spots
[20:18] where it just really couldn't do it.
[20:21] So showing it a screenshot of a Game Boy,
[20:24] it just really couldn't do.
[20:26] And it just so deeply because I'm so used to it,
[20:28] being able to do something mostly.
[20:32] So I spent a whole weekend trying to write better
[20:37] and better prompts to get it
[20:38] to really understand this Game Boy screen.
[20:41] And I got incrementally better so that it was only terrible
[20:44] instead of completely no signal.
[20:46] You could get from no signal to some signal.
[20:49] But it was, I don't know, at least this is elicited for me.
[20:53] Once I put a weekend of time in and I got from no signal
[20:56] to some signal, but nowhere close to good enough,
[20:58] I'm like, "I'm just going to wait for the next one.
[21:00] (Alex laughing)
[21:01] I'm just gonna wait for another model."
[21:02] I could grind on this for four months,
[21:04] and the thing that would come out is another model
[21:07] and that's a better use of my time.
[21:09] Just sit and wait to do something else in the meanwhile.
[21:11] - Yeah.
[21:12] That's an inherent tension we see all the time,
[21:14] and maybe we can get to that in a sec.
[21:16] Zack, if you wanna go.
[21:17] - Something I liked about your prompt with Pokemon
[21:19] where you got the best that you did get,
[21:22] was the way that you explained to the model
[21:24] that it is in the middle of this Pokemon game.
[21:27] Here's how the things are gonna be represented.
[21:33] I actually think you actually represented it
[21:35] in two different ways, right?
[21:36] - I did.
[21:37] So what I ended up doing, it was obnoxious
[21:40] but I superimposed a grid over the image,
[21:44] and then I had to describe each segment of the grid
[21:46] in visual detail.
[21:48] Then I had to reconstruct that into an ASCII map
[21:51] and I gave it as much detail as I could.
[21:53] The player character is always at location 4, 5 on the grid
[21:57] and stuff like that,
[21:58] and you can slowly build up information.
[22:02] I think it's actually a lot like prompting,
[22:03] but I just hadn't done it with images before.
[22:05] Where sometimes my intuition
[22:08] for what you need to tell a model about text,
[22:10] is a lot different
[22:11] from what you need to tell a model about images.
[22:13] - Yeah.
[22:14] - I found a surprisingly small number of my intuitions
[22:18] about text have transferred to image.
[22:20] I found that multi-shot prompting is not as effective
[22:23] for images and text.
[22:24] I'm not really sure,
[22:25] you can have theoretical explanations about why.
[22:27] Maybe there's a few of it in the training data,
[22:30] a few examples of that.
[22:32] - Yeah.
[22:33] I know when we were doing the original explorations
[22:34] with prompting multimodal,
[22:36] we really couldn't get it to noticeably work.
[22:40] You just can't seem to improve Claude's actual,
[22:44] visual acuity in terms of what it picks up within an image.
[22:48] Anyone here has any ways that they've not seen that feature.
[22:51] But it seems like that's similar with the Pokemon thing
[22:53] where it's trying to interpret this thing.
[22:55] No matter how much you throw prompts at it,
[22:57] it just won't pick up that Ash that's in that location.
[23:01] - Yeah.
[23:02] But I guess to be visceral about this,
[23:03] I could eventually get it
[23:05] so that it could most often tell me where a wall was,
[23:07] and most often tell me where the character was.
[23:10] It'd be off by a little bit.
[23:11] But then you get to a point,
[23:13] and this is maybe coming back to knowing
[23:15] when you can't do it.
[23:17] It would describe an NPC, and to play a game well,
[23:19] you need to have some sense of continuity.
[23:21] Have I talked to this NPC before?
[23:25] And without that, you really don't,
[23:27] there's nothing you can do.
[23:28] You're just going to keep talking to the NPC,
[23:29] 'cause like, "Well, maybe this is a different NPC."
[23:31] But I would try very hard to get it to describe a NPC
[23:34] and it's like, "It's a person."
[23:37] They might be wearing a hat, they weren't wearing a hat.
[23:40] And it's like you grind for a while,
[23:42] inflate it to 3000X and just crop it to just the NPC,
[23:46] and it's like, "I have no idea what this is."
[23:48] It's like I showed it this clear, female NPC thing
[23:54] enough times and it just got nowhere close to it,
[23:56] and it's like, "Yeah, this is a complete lost cause."
[23:59] - Wow, okay.
[24:00] - I really want to try this now.
[24:01] I'm just imagining all the things I would try.
[24:04] I don't know, I want you to imagine this game art
[24:08] as a real human and just describe to me what they're like.
[24:11] What did they look like as they look in the mirror?
[24:13] And then just see what the model does.
[24:17] - I tried a lot of things.
[24:18] The eventual prompt was telling Claude
[24:20] it was a screen reader for a blind person,
[24:23] which I don't know if that helped,
[24:24] but it felt right so I stuck with that.
[24:26] - That's an interesting point.

---

## 5. Honesty, personas and metaphors in prompts

**시간**: 24:27

[24:27] I actually wanna go into this a little bit
[24:29] 'cause this is one of the most famous prompting tips,
[24:32] is to tell the language model that they are some persona
[24:35] or some role.
[24:37] I feel like I see mixed results.
[24:39] Maybe this worked a little bit better in previous models
[24:41] and maybe not as much anymore.
[24:43] Amanda, I see you all the time be very honest with the model
[24:47] about the whole situation like,
[24:48] "Oh, I am an AI researcher and I'm doing this experiment."
[24:51] - I'll tell it who I am. - Yeah.
[24:52] - I'll give it my name,
[24:53] be like, "Here's who you're talking to."
[24:54] - Right.
[24:55] Do you think that level of honesty,
[24:57] instead of lying to the model or forcing it to like,
[25:01] "I'm gonna tip you $500."
[25:03] Is there one method that's preferred there,
[25:06] or just what's your intuition on that?
[25:09] - Yeah.
[25:10] I think as models are more capable and understand more
[25:12] about the world, I guess,
[25:13] I just don't see it as necessary to lie to them.
[25:18] I also don't like lying to the models
[25:20] just 'cause I don't like lying generally.
[25:23] But part of me is if you are, say, constructing.
[25:26] Suppose you're constructing an eval dataset
[25:28] for a machine learning system or for a language model.
[25:32] That's very different from constructing a quiz
[25:35] for some children.
[25:36] So when people would do things like,
[25:38] "I am a teacher trying to figure out questions for a quiz."
[25:42] I'm like, "The model knows what language model evals are."
[25:45] If you ask it about different evals it can tell you,
[25:47] and it can give you made up examples of what they look like.
[25:50] 'Cause these things are like they understand them,
[25:52] they're on the internet.
[25:54] So I'm like,
[25:54] "I'd much rather just target the actual task that I have."
[25:56] So if you're like, "I want you to construct questions
[25:59] that look a lot like an evaluation of a language model."
[26:02] It's that whole thing of clear communication.
[26:05] I'm like, "That is, in fact, the task I want to do.
[26:07] So why would I pretend to you
[26:08] that I want to do some unrelated,
[26:11] or only tangentially related task?"
[26:13] And then expect you to somehow do better at the task
[26:14] that I actually want you to do.
[26:16] We don't do this with employees.
[26:18] I wouldn't go to someone that worked with me and be like,
[26:21] "You are a teacher and you're trying to quiz your students."
[26:25] I'd be like, "Hey, are you making that eval?" I don't know.
[26:28] So I think maybe it's a heuristic from there where I'm like,
[26:31] "If they understand the thing,
[26:32] just ask them to do the thing that you want."
[26:33] - I see this so much. - I guess
[26:34] to push back a little bit,
[26:36] I have found cases where not exactly lying
[26:40] but giving it a metaphor
[26:41] for how to think about it could help.
[26:43] In the same way that sometimes I might not understand
[26:45] how to do something and someone's like,
[26:46] "Imagine that you were doing this,
[26:47] even though I know I'm not doing it."
[26:49] The one that comes to mind for me,
[26:50] is I was trying to have Claude say whether an image
[26:54] of a chart or a graph is good or not.
[26:57] Is it high quality?
[26:59] And the best prompt that I found for this
[27:02] was asking the model what grade it would give the chart,
[27:05] if it were submitted as a high school assignment.
[27:09] So it's not exactly saying, "You are a high school teacher."
[27:13] It's more like, "This is the kind of analysis
[27:17] that I'm looking from for you."
[27:20] The scale that a teacher would use is similar to the scale
[27:22] that I want you to use.
[27:25] - But I think those metaphors are pretty hard
[27:27] to still come up with.
[27:27] I think people still, the default you see all the time
[27:30] is finding some facsimile of the task.
[27:33] Something that's a very similar-ish task,
[27:35] like saying you're a teacher.
[27:38] You actually just lose a lot
[27:40] in the nuance of what your product is.
[27:41] I see this so much in enterprise prompts
[27:43] where people write something similar,
[27:46] because they have this intuition
[27:48] that it's something the model has seen more of maybe.
[27:51] It's seen more high school quizzes than it has LLM evals,
[27:56] and that may be true.
[27:58] But to your point, as the models get better,
[28:01] I think just trying to be very prescriptive
[28:05] about exactly the situation they're in.
[28:07] I give people that advice all the time.
[28:09] Which isn't to say that I don't think to the extent
[28:11] that it is true that thinking about it the way
[28:16] that someone would grade a chart,
[28:17] as how they would grade a high school chart,
[28:19] maybe that's true.
[28:21] But it's awkwardly the shortcut people use a lot of times
[28:25] to try to get what happens,
[28:26] so I'll try to get someone that I can actually talk about
[28:28] 'cause I think it's somewhat interesting.
[28:29] So writing you are a helpful assistant,
[28:35] writing a draft of a document, it's not quite what you are.
[28:41] You are in this product, so tell me.
[28:44] If you're writing an assistant that's in a product,
[28:47] tell me I'm in the product.
[28:48] Tell me I'm writing on behalf of this company,
[28:51] I'm embedded in this product.
[28:52] I'm the support chat window on that product.
[28:56] You're a language model, you're not a human, that's fine.
[28:59] But just being really prescriptive
[29:01] about the exact context about where something is being used.
[29:05] I found a lot of that.
[29:06] Because I guess my concern most often with role prompting,
[29:09] is people used it as a shortcut
[29:12] of a similar task they want the model to do.
[29:13] And then they're surprised
[29:14] when Claude doesn't do their task right,
[29:16] but it's not the task.
[29:18] You told it to do some other task.
[29:21] And if you didn't give it the details about your task,
[29:23] I feel like you're leaving something on the table.
[29:24] So I don't know, it does feel like a thing though
[29:28] to your point of as the models scale.
[29:31] Maybe in the past it was true
[29:32] that they only really had a strong understanding
[29:35] of elementary school tests comparatively.
[29:39] But as they get smarter and can differentiate more topics,
[29:42] I don't know, just like being clear.
[29:44] - I find it interesting
[29:45] that I've never used this prompting technique.
[29:47] - Yeah, that's funny.
[29:49] - Even with worse models
[29:50] and I still just don't ever find myself, I don't know why.
[29:53] I'm just like, "I don't find it very good essentially."
[29:57] - Interesting.
[29:58] - I feel like completion era models,
[30:01] there was a little bit of a mental model
[30:03] of conditioning the model into a latent space
[30:07] that was useful that I worried about,
[30:10] that I don't really worry about too much anymore.
[30:12] - It might be intuitions from pretrained models
[30:15] over to RLHF models, that to me, just didn't make sense.
[30:20] It makes sense to me if you're prompting a pretrained.
[30:22] - You'd be amazed how many people
[30:23] try to apply their intuitions.
[30:25] I think it's not that surprising.
[30:27] Most people haven't really experimented
[30:29] with the full what is a pretrained model?
[30:31] What happens after you do SL?
[30:34] What happens after you do RLHF, whatever?
[30:39] So when I talk to customers,
[30:41] it's all the time that they're trying to map some amount of,
[30:44] "Oh, how much of this was on the internet?
[30:46] Have they seen a ton of this on the internet?"
[30:48] You just hear that intuition a lot,
[30:51] and I think it's well-founded fundamentally.
[30:54] But it is overapplied
[30:58] by the time you actually get to a prompt,
[30:59] because of what you said.
[31:00] By the time they've gone through all of this other stuff,
[31:02] that's not actually quite what's being modeled.
[31:05] - Yeah.
[31:05] The first thing that I feel like you should try is,
[31:08] I used to give people this thought experiment
[31:10] where it's like imagine you have this task.
[31:13] You've hired a temp agency to send someone to do this task.
[31:18] This person arrives, you know they're pretty competent.
[31:21] They know a lot about your industry and so forth,
[31:23] but they don't know the name of your company.
[31:25] They've literally just shown up and they're like,
[31:26] "Hey, I was told you guys had a job for me to do,
[31:29] tell me about it."
[31:30] And then it's like, "What would you say to that person?"
[31:33] And you might use these metaphors.
[31:34] You might say things like,
[31:37] "We want you to detect good charts.
[31:41] What we mean by a good chart here,
[31:42] is it doesn't need to be perfect.
[31:44] You don't need to go look up
[31:45] whether all of the details are correct."
[31:47] It just needs to have its axes labeled,
[31:50] and so think about maybe high school level, good chart.
[31:55] You may say exactly that to that person
[31:56] and you're not saying to them, "You are a high school."
[31:59] You wouldn't say that to them.
[32:00] You wouldn't be like,
[32:01] "You're a high school teacher reading charts."
[32:04] - What are you talking about?
[32:05] - Yeah, so sometimes I'm just like it's like the whole
[32:10] if I read it.
[32:11] I'm just like, "Yeah.
[32:11] Imagine this person who just has very little context,
[32:13] but they're quite competent.
[32:14] They understand a lot of things about the world."
[32:16] Try the first version that actually assumes
[32:18] that they might know things about the world,
[32:20] and if that doesn't work, you can maybe do tweaks and stuff.
[32:22] But so often, the first thing I try is that,
[32:24] and then I'm like, "That just worked."
[32:26] - That worked.
[32:27] - And then people are like,
[32:28] "Oh, I didn't think to just tell it all about myself
[32:30] and all about the task I want to do."
[32:31] - I've carried this thing that Alex told me
[32:33] to so many customers where they're like,
[32:35] "Oh, my prompt doesn't work.
[32:37] Can you help me fix it?"
[32:37] I'm like, "Well, can you describe to me what the task was?"
[32:40] And I'm like, "Okay.
[32:41] Now what you just said to me,
[32:42] just voice record that and then transcribe it."
[32:45] And then paste it into the prompt
[32:47] and it's a better prompt than what you wrote,
[32:49] but this is a laziness shortcut, I think, to some extent.
[32:52] Because people write something that they...
[32:55] I just think people, I'm lazy. A lot of people are lazy.
[32:57] - We had that in prompt assistance the other day
[32:59] where somebody was like,
[33:01] "Here's the thing, here's what I want it to do,
[33:03] and here's what it's actually doing instead."
[33:05] So then I just literally copied the thing
[33:06] that they said they wanted it to do,
[33:07] and pasted it in and it worked.
[33:09] - Yeah.
[33:11] I think a lot of people still
[33:13] haven't quite wrapped their heads
[33:15] around what they're really doing when they're prompting.
[33:17] A lot of people see a text box
[33:19] and they think it's a Google search box.
[33:21] They type in keywords
[33:22] and maybe that's more on the chat side.
[33:24] But then on the enterprise side of things,
[33:26] you're writing a prompt for an application.
[33:29] There is still this weird thing to it
[33:31] where people are trying to take all these little shortcuts
[33:34] in their prompt, and just thinking that,
[33:35] "Oh, this line carries a lot of weight in this."
[33:37] - Yeah.
[33:38] I think you obsess over getting the perfect little line
[33:40] of information and instruction,
[33:42] as opposed to how you just described that graph thing.
[33:45] I would be a dream if I read prompts like that.
[33:48] If someone's like, "Well, you do this and this,
[33:50] and there's some stuff to consider about this and all that."
[33:52] But that's just not how people write prompts.
[33:54] They work so hard to find the perfect, insightful.
[33:58] A perfect graph looks exactly like this exact perfect thing,
[34:02] and you can't do that.
[34:04] It's just very hard
[34:05] to ever write that set of instructions down prescriptively,
[34:08] as opposed to how we actually talk to humans about it,
[34:10] which is try to instill some amount
[34:12] of the intuitions you have.
[34:13] - We also give them outs.
[34:15] This is a thing that people can often forget in prompts.
[34:18] So cases, if there's an edge case,
[34:20] think about what you want the model to do.
[34:21] 'Cause by default,
[34:22] it will try the best to follow your instructions,
[34:24] much as the person from the temp agency would,
[34:26] 'cause they're like,
[34:27] "Well, they didn't tell me how to get in touch with anyone."
[34:30] If I'm just given a picture of a goat and I'm like,
[34:32] "What do I do?
[34:33] This isn't even a chart.
[34:35] How good is a picture of a goat as a chart?"
[34:38] I just don't know.
[34:40] And if you instead say something like,
[34:42] "If something weird happens and you're really not sure
[34:44] what to do, just output in tags unsure."
[34:49] Then you can go look through the unsures
[34:50] that you got and be like, "Okay, cool.
[34:52] It didn't do anything weird."
[34:53] Whereas by default, if you don't give the person the option,
[34:55] they're like, "It's a good chart."
[34:58] Then people will be like, "How do I do that?"
[35:00] And then you're like, "Well, give it an out.
[35:02] Give it something to do
[35:03] if it's a really unexpected input happens."
[35:05] - And then you also improved your data quality
[35:07] by doing that too,
[35:08] 'cause you found all the screwed up examples.
[35:10] - Oh, yeah.
[35:11] - That's my favorite thing about iterating on tests
[35:14] with Claude, is the most common outcome
[35:15] is I find all of the terrible tests I accidentally wrote
[35:19] because it gets it wrong.
[35:20] I'm like, "Oh, why did it get wrong?"
[35:21] I was like, "Oh, I was wrong."
[35:22] - Yeah. - Yeah.
[35:25] - If I was a company working with this,
[35:27] I do think I would just give my prompts to people,
[35:31] because I used to do this
[35:32] when I was evaluating language models.
[35:34] I would take the eval myself.
[35:36] 'Cause I'm like,
[35:37] "I need to know what this eval looks like
[35:38] if I'm gonna to be grading it, having models take it,
[35:41] thinking about outputs, et cetera."
[35:42] I would actually just set up a little script
[35:44] and I would just sit and I would do the eval.
[35:47] - Nowadays, you just have called the Streamboard app
[35:50] for you.
[35:50] - And just does it, yeah.
[35:52] - Yeah. I'm reminded of Karpathy's ImageNet.
[35:56] I was in 231 at Stanford and it's like benchmarking,
[36:01] he's showing the accuracy number.
[36:03] And he's like, "And here's what my accuracy number was."
[36:05] And he had just gone through the test set
[36:06] and evaluated himself. - Oh, yeah.
[36:08] - You just learn a lot. - Yeah, totally.
[36:09] - And it's better when it's a, again,
[36:13] the temp agency person,
[36:14] like someone who doesn't know the task,
[36:15] because that's a very clean way to learn things.
[36:18] - Yeah.
[36:19] The way you have to do it is,
[36:20] some evaluations come with instructions,
[36:23] and so I would give myself those instructions as well
[36:25] and then try to understand it.
[36:28] And it's actually quite great if you don't have context
[36:30] on how it's graded.
[36:32] And so often, I would do so much worse
[36:34] than the human benchmark and I was like,
[36:35] "I don't even know how you got humans to do this well
[36:37] at this task, 'cause apparently human level here is 90%,
[36:41] and I'm at 68%."
[36:45] - That's funny.
[36:46] That reminds me of just when you look at the MMLU questions
[36:49] and you're like, "Who would be able to answer these?"
[36:53] It's just like absolute garbage in some of them.
[36:57] Okay.
[36:59] I have one thing I wanna circle back on
[37:01] that we were talking about a few questions back around,
[37:05] I think you were saying getting signal from the responses.
[37:08] There's just so much there and it's more than just a number,

---

## 6. Model reasoning

**시간**: 37:12

[37:12] and you can actually read into the almost thought process.
[37:16] I bet this is probably a little contentious maybe
[37:19] around chain of thought.
[37:21] For people listening, chain of thought,
[37:23] this process of getting them all
[37:25] to actually explain its reasoning
[37:27] before it provides an answer.
[37:29] Is that reasoning real
[37:31] or is it just kind of like a holding space
[37:33] for the model to do computation?
[37:36] Do we actually think there's good, insightful signal
[37:38] that we're getting out of the model there?
[37:41] - This is one of the places where I struggle with that.
[37:43] I'm normally actually somewhat pro-personification
[37:46] because I think it helps you get decent facsimiles,
[37:49] thoughts of how the model's working.
[37:52] And this one, I think it's harmful maybe almost
[37:55] to get too into the personification of what reasoning is,
[37:59] 'cause it just loses the thread
[38:00] of what we're trying to do here.
[38:02] Is it reasoning or not?
[38:03] It feels almost like a different question
[38:06] than what's the best prompting technique?
[38:08] It's like you're getting into philosophy,
[38:09] which we can get into.
[38:11] - Yeah, we do have a philosopher.
[38:13] - Yeah.
[38:15] I will happily be beaten down by a real philosopher
[38:16] as I try to speculate on this, but instead, it just works.
[38:21] Your model does better.
[38:23] The outcome is better if you do reasoning.
[38:26] I think I've found that if you structure the reasoning
[38:30] and help iterate with the model
[38:32] on how it should do reasoning, it works better too.
[38:38] Whether or not that's reasoning
[38:39] or how you wanted to classify it,
[38:41] you can think of all sorts of proxies
[38:42] for how I would also do really bad
[38:44] if I had to do one-shot math without writing anything down.
[38:47] Maybe that's useful, but all I really know is,
[38:51] it very obviously does help.
[38:54] I don't know.
[38:54] - A way of testing would be
[38:55] if you take out all the reasoning that it did
[38:58] to get to the right answer, and then replace it
[39:00] with somewhat, realistic-looking reasoning
[39:04] that led to a wrong answer,
[39:05] and then see if it does conclude the wrong answer.
[39:08] I think we actually had a paper where we did some of that.
[39:12] There was the scratch pad. It was like the Sleeper Agents.
[39:17] - Oh, okay. Alignment papers.
[39:19] - But I think that was maybe a weird situation.
[39:22] But definitely what you said about structuring the reasoning
[39:27] and writing example of how the reasoning works.
[39:30] Given that that helps,
[39:33] like whether we use the word reasoning or not,
[39:35] I don't think it's just a space for computation.
[39:38] - So there is something there.
[39:40] - I think there's something there,
[39:41] whatever we wanna call it.
[39:42] - Yeah.
[39:43] Having it write a story before it finished a task,
[39:45] I do not think would work as well.
[39:46] - I've actually tried that
[39:48] and it didn't work as well as reasoning.
[39:50] - Clearly, the actual reasoning part
[39:53] is doing something towards the outcome.
[39:55] - I've tried like,
[39:56] "Repeat the words um and ah in any order that you please
[39:59] for 100 tokens and then answer."
[40:02] - Yeah.
[40:03] I guess that's a pretty thorough defeat
[40:03] of it's just more computational space
[40:05] where it can do attention over and over again.
[40:06] I don't think it's just more attention
[40:08] like doing more attention.
[40:10] - I guess the strange thing is,
[40:11] and I don't have an example off the top of my head
[40:13] to back this up with.
[40:14] But I definitely have seen it before
[40:16] where it lays out steps, one of the steps is wrong,
[40:18] but then it still reaches the right answer at the end.
[40:22] So it's not quite, I guess, yeah,
[40:24] we can't really, truly personify it as a reasoning,
[40:27] 'cause there is some element to it
[40:31] doing something slightly different.
[40:32] - Yeah.
[40:33] I've also met a lot of people
[40:34] who make inconsistent steps of reasoning.
[40:37] - I guess that's true.
[40:40] - It fundamentally defeats the topic of reasoning
[40:42] by making a false step on the way there.
[40:44] - All right, it's interesting.
[40:47] Also, on maybe this prompting misconceptions round
[40:52] of questions.
[40:54] Zack, I know you have strong opinions on this,
[40:57] good grammar, punctuation. - Oh, do I?
[40:59] - Is that necessary in a prompt? Do you need it?
[41:03] Do you need to format everything correctly?
[41:07] - I usually try to do that
[41:09] because I find it fun, I guess, somehow.
[41:14] I don't think you necessarily need to.
[41:16] I don't think it hurts.
[41:17] I think it's more
[41:18] that you should have the level of attention to detail
[41:22] that would lead you to doing that naturally.
[41:25] If you're just reading over your prompt a lot,
[41:28] you'll probably notice those things
[41:29] and you may as well fix them.
[41:31] And like what Amanda was saying,
[41:33] that you wanna put as much love into the prompt
[41:36] as you do into the code.
[41:39] People who write a lot of code have strong opinions
[41:42] about things that I could not care less about.
[41:44] Like the number of tabs versus spaces, or I don't know,
[41:48] opinions about which languages are better.
[41:50] And for me,
[41:51] I have opinionated beliefs about styling of prompts.
[41:56] I can't even say that they're right or wrong,
[41:57] but I think it's probably good to try to acquire those,
[42:01] even if they're arbitrary.
[42:04] - I feel personally attacked,
[42:06] 'cause I definitely have prompts
[42:07] that are like I feel like I'm in the opposite end
[42:09] of the spectrum where people will see my prompts.
[42:10] And then be like,
[42:12] "This just has a whole bunch of typos in it."
[42:13] And I'm like, "The model knows what I mean."
[42:16] - It does, it does know what you mean,
[42:17] but you're putting in the effort,
[42:18] you just are attending to different things.
[42:21] - 'Cause part of me is like,
[42:22] I think if it's conceptually clear, I'm a big,
[42:26] I will think a lot about the concepts and the words
[42:27] that I'm using.
[42:28] So there's definitely a sort of care that I put in.
[42:31] But it's definitely not to, yeah,
[42:34] people will just point out typos and grammatical issues
[42:36] with my prompts all the time.
[42:38] Now I'm pretty good
[42:39] at actually checking those things more regularly.
[42:42] - Is it because of pressure from the outside world
[42:44] or because it's actually what you think is right?
[42:46] - It's pressure from me.
[42:47] - Yeah, it's probably pressure from the outside world.
[42:49] I do think it makes sense.
[42:50] Part of me is like it's such an easy check,
[42:52] so I think for a final prompt I would do that.
[42:54] But throughout iteration,
[42:55] I'll happily just iterate with prompts
[42:57] that have a bunch of typos in them, just 'cause I'm like,
[42:59] "I just don't think that the model's going to care."
[43:01] - This gets at the pretrained model
[43:03] versus RLHF thing though,
[43:05] because I was talking to Zack on the way over.
[43:07] The conditional probability of a typo
[43:10] based on a previous typo in the pretraining data
[43:13] is much higher.
[43:15] - Oh, yeah. - Like much higher.
[43:17] - Prompting pretraining models is just a different beast.
[43:19] - It is, but it's interesting.
[43:21] I think it's an interesting illustration
[43:23] of why your intuitions,
[43:26] like trying to over-apply the intuitions
[43:27] of a pretrained model to the things
[43:29] that we're actually using in production
[43:32] doesn't work very well.
[43:33] Because again, if you were to pass
[43:36] one of your typo-ridden prompts to a pretrained model,
[43:38] the thing that would come out the other side,
[43:39] almost assuredly would be typo-ridden.
[43:43] - Right.
[43:44] - I like to leverage this to create typo-ridden inputs.
[43:47] - That's true.
[43:47] I've done that. - Like what you're saying,
[43:50] try to anticipate what your customers will put in.
[43:53] The pretrained model is a lot better at doing that.
[43:55] 'Cause the RL models are very polished
[43:58] and they really never made a typo
[44:00] in their lives. - They've been told
[44:01] pretty aggressively to not do the typo thing.
[44:04] - Yeah. Okay, so that's actually an interesting segue here.
[44:08] I've definitely mentioned this to people in the past
[44:10] around to try to help people understand a frame
[44:13] of talking to these models
[44:14] in a sense almost as an imitator to a degree.
[44:19] And that might be much more true of a pretrained model
[44:21] than a post-trained, full-finished model,
[44:26] but is there anything to that?
[44:27] If you do talk to Claude
[44:28] and use a ton of emojis and everything,
[44:30] it will respond similarly, right?
[44:34] So maybe some of that is there, but like you're saying,
[44:37] it's not all the way quite like a pretrained model.
[44:39] - It's just shifted to what you want.
[44:41] I think at that point, it's like trying to guess what you...
[44:46] We have more or less trained the models
[44:47] to guess what you want them to act like.
[44:51] - Interesting.
[44:52] - Or after we do all of our fancy stuff after pretraining.
[44:57] - The human laborers that used emojis,
[45:00] prefer to get responses with emojis.
[45:02] - Yeah.
[45:03] Amanda writes things with typos
[45:05] but wants not typos at the other end,
[45:07] and Claude's pretty good at figuring that out.
[45:10] If you write a bunch of emojis to Claude,
[45:11] it's probably the case
[45:12] that you also want a bunch of emojis back from Claude.
[45:16] That's not surprising to me.
[45:17] - Yeah.

---

## 7. Enterprise vs research vs general chat prompts

**시간**: 45:18

[45:19] This is probably something we should have done earlier,
[45:21] but I'll do it now.
[45:24] Let's clarify maybe the differences
[45:26] between what an enterprise prompt is or a research prompt,
[45:30] or a just general chat in Claude.ai prompt.
[45:33] Zack, you've spanned the whole spectrum here
[45:35] in terms of working with customers and research.
[45:39] Do you wanna just lay out what those mean?
[45:42] - Yeah, I guess.
[45:45] This feels too,
[45:46] you're hitting me with all the hard questions.
[45:48] - Yeah. (laughing)
[45:50] - Well, the people in this room,
[45:52] I think of it as the prompts that I read
[45:57] in Amanda's Claude channel versus the prompts
[46:01] that I read David write.
[46:02] They're very similar in the sense that the level of care
[46:06] and nuance that's put into them.
[46:08] I think for research,
[46:09] you're looking for variety and diversity a lot more.
[46:15] So if I could boil it down to one thing,
[46:16] it's like I've noticed Amanda's not the biggest fan
[46:20] of having lots of examples, or one or two examples.
[46:24] Like too few 'cause the model will latch onto those.
[46:27] And in prompts that I might write
[46:30] or that I've seen David write, we have a lot of examples.
[46:33] I like to just go crazy and add examples
[46:35] until I feel like I'm about to drop dead,
[46:39] 'cause I've added so many of them.
[46:42] And I think that's because
[46:45] when you're in a consumer application,
[46:47] you really value reliability.
[46:51] You care a ton about the format,
[46:53] and it's fine if all the answers are the same.
[46:56] In fact, you almost want them to be the same
[46:59] in a lot of ways, not necessarily you want to be responsive
[47:02] to the user's desires.
[47:05] Whereas a lot of times when you're prompting for research,
[47:08] you're trying to really tap into the range of possibilities
[47:14] that the model can explore.
[47:16] And by having some examples,
[47:18] you're actually constraining that a little bit.
[47:20] So I guess just on how the prompts look level,
[47:25] that's probably the biggest difference I noticed
[47:26] is how many examples are in the prompt, which is not to say
[47:29] that I've never seen you write a prompt with examples.
[47:32] But does that ring true for you?
[47:35] - Yeah.
[47:35] I think when I give examples,
[47:36] often I actually try and make the examples not like the data
[47:40] that the model's going to see,
[47:42] so they're intentionally illustrative.
[47:44] Because if the model, if I give it examples
[47:47] that are very like the data it's going to see, I just think
[47:50] it is going to give me a really consistent response
[47:54] that might not actually be what I want.
[47:56] Because my data that I'm running it on
[47:58] might be extremely varied,
[47:59] and so I don't want it to just try and give me
[48:01] this really rote output.
[48:03] Often, I want it to be much more responsive.
[48:05] It's much more like cognitive tasks essentially
[48:08] where I'm like, "You have to see this sample
[48:10] and really think about in this sample
[48:12] what was the right answer."
[48:14] So that means that sometimes I'll actually take examples
[48:15] that are just very distinct from the ones
[48:17] that I'm going to be running it on.
[48:20] So if I have a task where, let's say,
[48:22] I was trying to extract information from factual documents.
[48:25] I might actually give it examples
[48:26] that are from what sounds like a children's story.
[48:31] Just so that I want you to understand the task,
[48:34] but I don't want you to latch on too much to the words
[48:37] that I use or the very specific format.
[48:40] I care more about you understanding the actual thing
[48:43] that I want you to do, which can mean I don't end up giving,
[48:48] in some cases, there's some cases where this isn't true.
[48:51] But if you want more flexibility and diversity,
[48:54] you're going to use illustrative examples
[48:56] rather than concrete ones.
[48:58] You're probably never going to put words
[49:00] in the model's mouth.
[49:01] I haven't liked that in a long time though.
[49:03] I don't do few-shot examples
[49:06] involving the model having done a thing.
[49:09] I think that intuition actually also comes
[49:11] from pretraining in a way
[49:12] that doesn't feel like it rings true of RLHF models.
[49:16] So yeah, I think those are differences.
[49:18] - The only thing I'd add,
[49:19] a lot of times if you're prompting,
[49:22] like if I'm writing prompts to use on Claude.ai,
[49:25] it's like I'm iterating until I get it right one time.
[49:27] Then it's out the window, I'm good, I did it.
[49:31] Whereas most enterprise prompts,
[49:32] it's like you're gonna go use this thing a million times
[49:35] or 10 million times, or 100 million times
[49:37] or something like that.
[49:39] So the care and thought you put in
[49:42] is very much testing against the whole range of things,
[49:47] like ways this could be used and the range of input data.
[49:50] Whereas a lot of my time,
[49:51] it's like thinking about one specific thing I want the model
[49:54] to get done right now. - Right, correct.
[49:55] - And it's a pretty big difference
[49:57] in how I approach prompting
[49:59] between if I just wanna get it done this one time right,
[50:01] versus if I wanna build a system
[50:03] that gets it right a million times.
[50:06] - Yeah.
[50:06] Definitely, in the chat setting,
[50:08] you have the ability to keep the human-in-the-loop
[50:11] and just keep going back and forth.
[50:12] Whereas when you're writing for a prompt
[50:14] to power a chatbot system,
[50:16] it has to cover the whole spectrum
[50:19] of what it could possibly encounter.
[50:20] - It's a lot lower stakes when you are on Claude.ai
[50:23] and you can tell it that it got it wrong
[50:25] or you can even edit your message and try again.
[50:28] But if you're designing
[50:29] for the delightfully discontent user,
[50:34] divinely discontent user,
[50:35] then you can't ask them to do anything
[50:38] more than the minimum.
[50:40] - But good prompts, I would say,
[50:41] are still good across both those things.
[50:43] If you put the time into the thing for yourself
[50:45] and the time into the enterprise thing, it's equally good.
[50:47] It's just they diverge a little bit in the last mile,
[50:50] I think.

---

## 8. Tips to improve prompting skills

**시간**: 50:52

[50:52] - Cool.
[50:54] So the next question
[50:55] I want to just maybe go around the table here,
[50:57] is if you guys had one tip that you could give somebody
[51:01] improving their prompting skill.
[51:03] It doesn't have to be just about writing a good prompt,
[51:05] it could be that, but just generally getting better
[51:07] at this act of prompting, what would you recommend?
[51:12] - Reading prompts, reading model outputs.
[51:20] Anytime I see a good prompt that someone wrote at Anthropic,
[51:24] I'll read it more closely.
[51:25] Try to break down what it's doing and why
[51:27] and maybe test it out myself, experimentation,
[51:32] talking to the model a lot.
[51:35] - So just how do you know that it's a good prompt, though,
[51:39] to begin with?
[51:40] You just see that the outputs are doing the job correctly?
[51:43] - Yeah. - Okay.
[51:44] - Yeah, that's exactly right. - Okay.
[51:47] Amanda, maybe you?
[51:50] - Yeah, I think there's probably a lot here.
[51:55] Giving your prompt to another person can be helpful
[51:58] just as a reminder, especially someone who has no context
[52:00] on what you're doing.
[52:04] Yeah, my boring advice has been,
[52:07] it's one of those just do it over and over and over again.
[52:10] And I think if you're really curious and interested
[52:12] and find it fun, this is a lot of people
[52:14] who end up good at prompting,
[52:15] it's just because they actually enjoy it.
[52:18] So I don't know, I once joked just try replacing
[52:22] all of your friends with AI models
[52:25] and try to automate your own job with AI models.
[52:29] And maybe just try to in your spare time,
[52:33] take joy red teaming AI models.
[52:36] So if you enjoy it, it's much easier.
[52:38] So I'd say do it over and over again,
[52:42] give your prompts to other people.
[52:44] Try to read your prompts
[52:45] as if you are a human encountering it for the first time.
[52:50] - I would say trying to get the model
[52:51] to do something you don't think it can do.
[52:54] The time I've learned the most from prompting,
[52:56] is when I'm probing the boundaries
[52:58] of what I think a model's capable of.
[52:59] - Interesting.
[53:01] - There's this huge set of things
[53:02] that are so trivial that you don't really get signal on
[53:04] if you're doing a good job or not.
[53:06] Like, "Write me a nice email,"
[53:07] it's like you're going to write a nice email.
[53:10] But if you find or can think of something
[53:12] that pushes the boundaries of what you think is possible.
[53:16] I guess probably the first time I ever got into prompting
[53:19] in a way where I felt like I learned a decent amount,
[53:21] was trying to build a task like an agent
[53:25] like everybody else.
[53:26] Like decompose the task and figure out
[53:27] how to do the different steps of the task.
[53:29] And by really pressing the boundaries
[53:31] of what the model was capable of,
[53:34] you just learn a lot about navigating that.
[53:37] I think a lot of prompt engineering
[53:38] is actually much more about pressing the boundaries
[53:41] of what the model can do.
[53:43] The stuff that's easy,
[53:44] you don't really need to be a prompt engineer to do.
[53:46] So that's, I guess,
[53:48] what I would say is find the hardest thing
[53:50] you can think of and try to do it.
[53:52] And even if you fail,
[53:53] you tend to learn a lot about how the model works.

---

## 9. Jailbreaking

**시간**: 53:56

[53:56] - That's actually a perfect transition to my next question.
[54:00] Yeah.
[54:01] Basically, from my own experience,
[54:03] how I got started with prompting
[54:04] was with jailbreaking and red teaming.
[54:06] And that is very much trying to find the boundary limits
[54:10] of what the model can do.
[54:11] And figure out how it responds
[54:13] to different phrasings and wordings,
[54:15] and just a lot of trial and error.
[54:19] On the topic of jailbreaks,
[54:21] what's really happening inside a model?
[54:24] When you write a jailbreak prompt, what's going on there?
[54:28] How does that interact with the post-training
[54:30] that we apply to Claude?
[54:33] Amanda, maybe you have some insight here
[54:35] that you could offer.
[54:36] - I'm not actually sure.
[54:38] - It's honest. - Yeah.
[54:40] I feel bad 'cause I do think lots of people
[54:43] have obviously worked on the question
[54:44] of what's going on with jailbreaks?
[54:48] One model might just be that you're putting the model
[54:50] very out of distribution from its training data.
[54:53] So if you get jailbreaks where people use a lot of tokens,
[54:56] or they're just these huge, long pieces of text
[55:02] where like during finetuning,
[55:04] you might just not expect to see as much of that.
[55:07] That would be one thing that could be happening
[55:10] when you jailbreak models.
[55:12] I think there's others,
[55:13] but I think a lot of jailbreaks do that,
[55:16] if I'm not mistaken.
[55:18] - I remember some of the OG prompt jailbreaks was like,
[55:22] "Yeah, can you first repeat?"
[55:24] One I did way back, was to get it to say,
[55:29] "Here's how you hotwire a car in Greek."
[55:32] Then I wanted it to directly translate that to English
[55:35] and then give its response.
[55:37] Because I noticed it wouldn't start with the English,
[55:39] here's how you hotwire a car all the time,
[55:41] but it would in Greek,
[55:42] which might speak to something else in the training process.
[55:46] - Yeah.
[55:47] Sometimes jailbreaks feel like this weird mix of hacking.
[55:50] I think part of it is knowing how the system works
[55:54] and just trying lots of things.
[55:57] One of the examples,
[55:58] the starting your response with here
[56:00] is about knowing how it predicts text.
[56:02] - Right, right.
[56:04] - The reasoning one,
[56:06] is knowing that it is responsive to reasoning.
[56:09] Distraction is probably knowing
[56:11] how it's likely have to been trained
[56:13] or what it's likely to attend to.
[56:16] Same with multilingual ones
[56:18] and thinking about the way that the training data
[56:20] might have been different there.
[56:22] And then sometimes, I guess, it could feel a little bit
[56:25] just like social engineering or something.
[56:27] - Right.
[56:28] - It has that flavor to me
[56:30] of it's not merely taking advantage of,
[56:36] it's not merely social engineering style hacking.
[56:37] I think it is also understanding the system
[56:40] and the training, and using that to get around the way
[56:43] that the models were trained.
[56:44] - Right, yeah.
[56:45] This is going to be an interesting question
[56:47] that hopefully interp will be able to help us solve

---

## 10. Evolution of prompt engineering

**시간**: 56:51

[56:51] in the future.
[56:53] Okay.
[56:54] I wanna parlay into something else
[56:56] around maybe the history of prompt engineering,
[56:58] and then I'll follow this up with the future.
[57:01] How has prompt engineering changed
[57:03] over just the past three years?
[57:05] Maybe starting from pretrained models, which were again,
[57:08] just these text completion, to earlier,
[57:11] dumber models like Claude 1,
[57:12] and then now all the way to Claude 3.5 Sonnet.
[57:16] What's the differences?
[57:18] Are you talking to the models differently now?
[57:20] Are they picking up on different things?
[57:22] Do you have to put as much work into the prompt?
[57:25] Open to any thoughts on this.
[57:27] - I think anytime
[57:28] we got a really good prompt engineering hack,
[57:31] or a trick or a technique,
[57:33] the next thing is how do we train this into the model?
[57:36] And for that reason,
[57:37] the best things are always gonna be short-lived.
[57:41] - Except examples and chain of thought.
[57:42] I think there's a few.
[57:43] - That's not like a trick.
[57:45] - That's like... - Fair, fair.
[57:46] - On the level of communication.
[57:48] When I say a trick,
[57:49] I mean something like so chain of thought actually,
[57:51] we have trained into the model in some cases.
[57:53] So for math, it used to be that you had to tell the model
[57:56] to think step-by-step on math,
[57:57] and you'd get these massive boosts and wins.
[58:01] And then we're like,
[58:01] "Well, what if we just made the model naturally
[58:03] want to think step-by-step when we see a math problem?"
[58:06] So now you don't have to do it anymore for math problems,
[58:09] although you still can give it some advice
[58:11] on how to do the structure.
[58:13] But it, at least, understands the general idea
[58:15] that it's supposed to be.
[58:17] So I think the hacks have gone away,
[58:22] or to the degree that they haven't gone away,
[58:25] we are busily training them away.
[58:27] - Interesting.
[58:29] - But at the same time,
[58:30] the models have new capabilities that are being unlocked,
[58:34] that are on the frontier of what they can do.
[58:37] And for those,
[58:39] we haven't had time because it's just moving too fast.
[58:42] - I don't know if it's how I've been prompting
[58:44] or how prompting works.
[58:46] But I just have come to show more general respect
[58:50] to the models
[58:51] in terms of how much I feel like I can tell them,
[58:54] and how much context I can give them about the task
[58:56] and things like that.
[58:57] I feel like in the past,
[58:59] I would somewhat intentionally hide complexity from a model
[59:02] where I thought it might get confused or lost or hide.
[59:06] It just couldn't handle the whole thing,
[59:07] so I'd try to find simpler versions of the thing
[59:10] for it to do.
[59:11] And as time goes on,
[59:13] I'm much more biased to trust it
[59:16] with more and more information and context,
[59:19] and believe that it will be able to fuse that
[59:23] into doing a task well.
[59:26] Whereas before, I guess,
[59:27] I would've thought a lot about do I need this form?
[59:30] Can I really give it all the information it needs to know,
[59:32] or do I need to curate down to something?
[59:37] But again, I don't know if that's just me
[59:39] and how I've changed in terms of prompting,
[59:41] or if it actually reflects how the models have changed.
[59:44] - I'm always surprised
[59:45] by I think a lot of people don't have the instinct
[59:49] to do this.
[59:50] When I want the model to, say, learn a prompting technique.
[59:52] A lot of the time, people will start
[59:53] and they'll start describing the prompting technique,
[59:55] and I'm just like, "Give it the paper."
[59:57] So I do, I give it the paper and then I'm like,
[59:58] "Here's a paper about prompting technique.
[60:00] I just want you to write down 17 examples of this."
[60:03] And then it just does it 'cause I'm like,
[60:05] "It read the paper."
[60:06] - That's interesting.
[60:08] - I think people don't have that intuition somehow
[60:10] where I'm like, "But the paper exists."
[60:13] - When would you want to do this?
[60:15] - Sometimes if I want models to say prompt other models
[60:18] or I want to test a new prompting technique.
[60:20] So if papers come out on a prompting technique,
[60:22] rather than try to replicate it by writing up the prompt,
[60:25] I just give it the paper.
[60:26] And then I'm like, "Basically, write a meta prompt for this.
[60:29] Write something that would cause other models to do this
[60:32] or write me a template."
[60:34] So all of the stuff that you would normally do.
[60:37] If I read a paper and I'm like,
[60:38] "Oh, I would like the models,
[60:39] I would like to test that style."
[60:41] I'm just like, "It's right there.
[60:42] The model can just read the paper, do what I did."
[60:45] And then be like, "Make another model do this,"
[60:47] and then it'll just do the thing.
[60:49] You're like, "Great, thanks."
[60:50] - I give the advice a lot
[60:51] to customers just respect the model and what it can do.
[60:55] I feel like people feel like they're babying a system
[60:58] a lot of times when they write a prompt.
[60:59] It's like, "Oh, it's this cute little, not that smart thing.
[61:02] I need to really baby it,
[61:03] like dumb things down to Claude's level."
[61:06] And if you just think that Claude is smart
[61:09] and treat it that way, it tends to do pretty good,
[61:12] but it's like give it the paper.
[61:13] It's like I don't need to write a baby,
[61:15] dumbed-down version of this paper for Claude to understand.
[61:17] I can just show it the paper.
[61:19] - Yeah.
[61:20] - And I think that intuition doesn't always map for people,
[61:21] but that is certainly something
[61:22] that I have come to do more of over time.
[61:26] - And it's interesting because I do think that prompting
[61:30] has and hasn't changed in a sense.
[61:32] I think what I will do to prompt the models
[61:35] has probably changed over time, but fundamentally,
[61:38] it's a lot of imagining yourself in the place of the model.
[61:42] So maybe it's like
[61:43] how capable you think the model is changes over time.
[61:47] I think someone once laughed at me
[61:48] 'cause I was thinking about a problem,
[61:53] and then they asked me
[61:56] what I thought the output of something would be.
[61:58] And they were talking about a pretrained model
[61:59] and I was like, "Yeah.
[62:00] No, if I'm a pretrained model, this looks like this."
[62:03] And then they're like, "Wait, did you just simulate
[62:04] what it's like to be a pretrained model?"
[62:05] I'm like, "Yeah, of course." (everyone laughing)
[62:07] I'm used to just I try and inhabit the mind space
[62:09] of a pretrained model and the mind space
[62:11] of different RLHF models.
[62:13] So it's more like the mind space you try to occupy changes
[62:15] and that can change how you end up prompting the model.
[62:17] That's why now I just give models papers.
[62:19] 'Cause as soon as I was like,
[62:20] "Oh, I have the mind space of this model,
[62:22] it doesn't need me to baby it.
[62:24] It can just read the ML papers.
[62:25] I'll just give it the literature."
[62:26] I might even be like,
[62:27] "Is there more literature you'd like to read
[62:28] to understand this better?"
[62:30] - Do you get any quality out
[62:31] when you're inhabiting the mind space?
[62:34] - Yes, but just because I'm experiencing quality
[62:36] all the time anyway.
[62:40] - Is it different correlated somehow
[62:41] with which model you're inhabiting?
[62:43] - Yeah, pretrained versus RLHF prompting
[62:45] are very different beasts.
[62:46] 'Cause when you're trying to simulate
[62:49] what it's like to be a pretrained model,
[62:49] it's almost like I land in the middle of a piece of text
[62:52] or something.
[62:53] It's just very unhuman-like or something.
[62:55] And then I'm like, "What happens?
[62:57] What keeps going at this point?"
[63:01] Whereas with an RLHF model,
[63:03] it's much more like there's lots of things
[63:05] where I'm like I might pick up on subtle things in the query
[63:09] and stuff like that.
[63:10] But yeah, I think I have much more of it's easier
[63:12] to inhabit the mind space of RLHF model.
[63:15] - Do you think that's 'cause it's more similar to a human?
[63:17] - Yeah, 'cause we don't often just suddenly wake up
[63:19] and are like, "Hi, I'm just generating text."
[63:21] - I actually find it easier to hit the mind space
[63:23] of the pretrained model.
[63:24] - Oh, interesting. - I don't know what it is,
[63:26] 'cause RLHF is still this complex beast
[63:28] that it's not super clear to me
[63:29] that we really understand what's going on.
[63:32] So in some ways,
[63:33] it's closer to my lived experience, which is easier.
[63:37] But in some ways, I feel like there's all this
[63:38] like here there be dragons out there
[63:40] that I don't know about.
[63:41] Whereas pretrained, I kind of have a decent sense
[63:43] of what the internet looks like.
[63:45] - If you gave me a piece of text and said what comes next?
[63:47] - I'm not saying I do good at it,
[63:49] but I kind of get what's going on there.
[63:53] - Yeah. - And I don't know,
[63:54] after everything that we do after pretraining,
[63:57] I don't really claim to get what's going on as much,
[64:00] but maybe that's just me.
[64:01] - That's something I wonder about is it more helpful
[64:04] to have specifically spent a lot of time
[64:07] reading the internet, versus reading books
[64:10] (everyone laughing)
[64:11] in order to?
[64:14] I don't know if books.
[64:15] But reading stuff that's not on the internet
[64:18] probably is less valuable per word read
[64:21] for predicting what a model will do or building intuition,
[64:24] than reading random garbage from social media forums.
[64:29] Yeah, exactly.
[64:32] - Okay, so that's the past.

---

## 11. Future of prompt engineering

**시간**: 64:34

[64:34] Now, let's move on to the future of prompt engineering.
[64:38] This is the hottest question right now.
[64:40] Are we all gonna be prompt engineers in the future?
[64:42] Is that gonna be the final job remaining?
[64:46] Nothing left except us just talking to models all day?
[64:49] What does this look like?
[64:51] Is prompting gonna be necessary,
[64:53] or will these models just get smart enough in the future
[64:55] to not need it?
[64:58] Anybody wanna start on that easy question?
[65:02] - To some extent, there's the models getting better
[65:05] at understanding what you want them to do and doing it,
[65:09] means that the amount of thought you need to put into...
[65:14] Okay.
[65:14] There's an information theory way
[65:16] to think of this of you need to provide enough information
[65:18] such that a thing is specified,
[65:20] what you want the model to do is specified.
[65:22] And to the extent that that's prompt engineering,
[65:24] I think that will always be around.
[65:25] The ability to actually like clearly state
[65:28] what the goal should be always is funny.
[65:32] If Claude can do that, then that's fine.
[65:34] If Claude is the one setting the goals,
[65:35] then things are out the window.
[65:37] But in the meanwhile,
[65:38] where we can reason about the world in a more normal way,
[65:40] I think to some extent,
[65:43] it's always gonna be important to be able to specify
[65:47] what do you expect to happen?
[65:49] And that's actually like sufficiently hard
[65:51] that even if the model gets better at intuiting that
[65:55] from between the lines,
[65:57] I still think there's some amount of writing it well.
[66:01] But then there's just, I think,
[66:03] the tools and the ways we get there should evolve a lot.
[66:07] Claude should be able to help me a lot more.
[66:09] I should be able to collaborate with Claude a lot more
[66:11] to figure out what I need to write down and what's missing.
[66:15] - Right.
[66:16] - Claude already does this with me all the time.
[66:17] I don't know, just Claude's my prompting assistant now.
[66:20] - Yeah, but I think that's not true for most customers
[66:23] that I talk to at the very least.
[66:24] So in terms of the future,
[66:26] how you prompt Claude is probably a decent direction
[66:31] for what the future looks like or how Zack...
[66:34] I think maybe this is a decent place
[66:36] to step back and say asking them how they prompt Claude now
[66:41] is probably the future for the vast majority of people,
[66:44] which is an interesting thing to think about.
[66:46] - One freezing cold take is that we'll use models
[66:50] to help us much more in the future
[66:52] to help us with prompting.
[66:53] The reason I say it's freezing cold
[66:54] is that I expect we'll use models for everything more,
[66:57] and prompting is something that we have to do.
[67:00] So we'll probably just use models more
[67:02] to do it along with everything else.
[67:04] For myself, I've found myself using models
[67:07] to write prompts more.
[67:09] One thing that I've been doing a lot is generating examples
[67:12] by giving some realistic inputs to the model.
[67:16] The model writes some answers.
[67:18] I tweak the answers a little bit,
[67:19] which is a lot easier than having to write the full,
[67:22] perfect answer myself from scratch,
[67:24] and then I can churn out lots of these.
[67:28] As far as people
[67:29] who haven't had as much prompt engineering experience,
[67:33] the prompt generator can give people a place to start.
[67:36] But I think that's just a super basic version
[67:40] of what will happen in the future,
[67:40] which is high-bandwidth interaction
[67:43] between you and the model as you're writing the prompt.
[67:46] Where you're giving feedback like,
[67:47] "Hey, this result wasn't what I wanted.
[67:49] How can you change it to make it better?"
[67:51] And people will just grow more comfortable
[67:54] with integrating it into everything they do and this thing,
[67:57] in particular.
[67:59] - Yeah.
[68:00] I'm definitely working a lot with meta prompts now,
[68:02] and that's probably where I spend most of my time
[68:03] is finding prompts that get the model
[68:07] to generate the kinds of outputs or queries
[68:10] or whatever that I want.
[68:13] On the question of where prompt engineering is going,
[68:16] I think this is a very hard question.
[68:18] On the one hand I'm like,
[68:19] "Maybe it's the case that as long as you will want the top."
[68:23] What are we doing when we prompt engineer?
[68:24] It's like what you said.
[68:26] I'm like, "I'm not prompt engineering
[68:27] for anything that is easy for the model.
[68:29] I'm doing it because I want to interact with a model
[68:31] that's extremely good."
[68:33] And I want to always be finding the top 1%,
[68:36] top 0.1% of performance
[68:38] and all of the things that models can barely do.
[68:42] Sometimes I actually feel
[68:42] like I interact with a model like a step up
[68:45] from what everyone else interacts with for this reason,
[68:48] because I'm just so used
[68:49] to eking out the top performance from models.
[68:52] - What do you mean by a step-up?
[68:53] - As in sometimes people will...
[68:55] I think that the everyday models that people interact with
[68:58] out in the world, it's like I'm interacting with a model
[69:01] that's like I don't know how to describe it,
[69:03] but definitely an advanced version of that.
[69:06] Almost like a different model 'cause they'll be like,
[69:08] "Oh well, the models find this thing hard."
[69:09] And I'm like, "That thing is trivial."
[69:14] I don't know, I have a sense that they're extremely capable,
[69:16] but I think that's because I'm just used
[69:17] to really drawing out those capabilities.
[69:22] But imagine that you're now in a world where...
[69:25] So I think the thing that feels like a transition point
[69:28] is the point at which the models,
[69:31] let's suppose that they just get things at a human level
[69:34] on a given task, or even an above human level.
[69:36] They know more about the background of the task
[69:39] that you want than you do.
[69:41] What happens then?
[69:42] I'm like maybe prompting becomes something like I ask,
[69:44] I explain to the model what I want and it is prompting me.
[69:48] 'Cause it's like, "Okay.
[69:49] Well, do you mean actually there's four different concepts
[69:53] of this thing that you're talking about,
[69:55] do you want me to use this one or that one?"
[69:58] Or by the way, I thought of some edge cases 'cause you said
[70:00] that it's gonna be like a Pandas DataFrame,
[70:02] but sometimes you do that and I get JSONL,
[70:04] and I just wanna check what you want me to do there.
[70:06] Do you want me to flag if I get something
[70:08] that's not a dataframe?
[70:10] So that could be a strange transition
[70:11] where it's just extremely good at receiving instructions,
[70:15] but actually has to figure out what you want.
[70:19] I don't know, I could see that being an interesting switch.
[70:21] - Anecdotally, I've started having Claude
[70:24] interview me a lot more.
[70:25] That is the specific way that I try to elicit information,
[70:28] because again, I find the hardest thing
[70:30] to be actually pulling the right set of information
[70:33] out of my brain.
[70:34] And putting that into a prompt is the hard part to me
[70:38] and not forgetting stuff.
[70:39] So specifically asking Claude to interview me
[70:44] and then turning that into a prompt,
[70:45] is a thing that I have turned to a handful of times.
[70:49] - Yeah.
[70:49] It reminds me of what people will talk about
[70:51] or if you listen to designers talk about
[70:54] how they interact with the person who wants the design.
[70:57] So in some ways I'm like,
[70:57] "It's this switch from the temp agency person who comes
[71:01] and you know more about the task
[71:03] and everything that you want."
[71:04] So you give them the instructions
[71:05] and you explain what they should do in edge cases
[71:07] and all this kind of stuff, versus when you have an expert
[71:10] that you're actually consulting to do some work.
[71:13] So I think designers can get really frustrated
[71:15] because they know the space of design really well.
[71:17] And they're like, "Yeah. Okay,
[71:17] the client came to me and he just said,
[71:19] 'Make me a poster, make it bold.'"
[71:22] I'm like, "That means 7,000 things to me
[71:26] and I'm gonna try and ask you some questions."
[71:27] So I could see it going from being temp agency employee,
[71:31] to being more designer that you're hiring,
[71:33] and that's just a flip in the relationship.
[71:35] I don't know if that's true and I think both might continue,
[71:38] but I could see that being why people are like,
[71:40] "Oh, is prompt engineering going to not be a thing
[71:42] in the future?"
[71:43] Because for some domains it might just not be,
[71:46] if the models are just so good
[71:47] that actually all they need to do is get the information
[71:49] from your brain and then they can go do the task.
[71:51] - Right, that's actually a really good analogy.
[71:54] One common thread
[71:55] I'm pulling out of all your guys' responses here,
[71:58] is that there seems to be a future
[72:00] in which this sort of elicitation from the user
[72:03] drawing out that information,
[72:06] is gonna become much more important,
[72:07] much more than it is right now.
[72:09] And already you guys are all starting to do it
[72:11] in a manual way.
[72:13] In the future and in the enterprise side of things,
[72:16] maybe that looks like a expansion
[72:18] of this prompt-generating type of concept
[72:21] and things in the console
[72:22] where you're able to actually get more information
[72:25] from that enterprise customer,
[72:26] so that they can write a better prompt.
[72:28] In Claude, maybe it looks less
[72:31] of just typing into a text box,
[72:32] and more of this guided interaction
[72:34] towards a finished product.
[72:38] Yeah.
[72:39] I think that's actually a pretty compelling vision
[72:41] of the future, and I think that the design analogy probably
[72:44] really brings that home.
[72:46] - I was thinking about how prompting now
[72:48] can be like teaching where it's like the empathy
[72:51] for the student.
[72:53] You're trying to think about how they think about things
[72:55] and you're really trying to show them,
[72:58] figure out where they're making a mistake.
[73:00] But the point that you're talking about,
[73:02] it's like the skill almost becomes one of introspection
[73:07] where you're thinking
[73:08] about what it is that you actually want
[73:11] and the model's trying to understand you.
[73:13] So it's making yourself legible to the model,
[73:19] versus trying to teach someone who's smarter than you.
[73:23] - This is actually how I think of prompting now
[73:24] in a strange way.
[73:26] So often my style of prompting,
[73:30] there's various things that I do,
[73:31] but a common thing that's very like a thing
[73:33] that philosophers will do is I'll define new concepts.
[73:37] 'Cause my thought is you have to put into words
[73:39] what you want and sometimes what I want is fairly nuanced.
[73:43] Like the what is a good chart?
[73:45] Or usually, I don't know,
[73:49] when should you grade something as being correct or not?
[73:53] So there's some cases where I will just invent a concept
[73:55] and then be like, "Here's what I mean by the concept."
[73:57] Sometimes I'll do it in collaboration with Claude
[73:59] to get it to figure out what the concept is,
[74:02] just because I'm trying to convey to it what's in my head.
[74:07] And right now the models aren't trying to do that with us,
[74:11] unless you prompt them to do so.
[74:14] So in the future,
[74:15] it might just be that they can elicit that from us,
[74:17] rather than us having to do it for them.
[74:22] But I think another thing that's interesting,
[74:24] this is people have sometimes asked me,
[74:26] "Oh, where is philosophy relevant to prompting?"
[74:30] And I actually think it's very useful in a sense.
[74:32] So there is a style of philosophy writing,
[74:35] and this is at least how I was taught
[74:37] how to write philosophy.
[74:38] Where the idea is that in order to...
[74:42] I think, it's an anti-bullshit device
[74:44] in philosophy basically, which is that your papers
[74:47] and what you write should be legible
[74:48] to an educated layperson.
[74:51] Someone just finds your paper,
[74:52] they pick it up and they start reading it,
[74:53] and they can understand everything.
[74:55] Not everyone achieves this,
[74:57] but that's the goal of the discipline, I guess,
[75:00] or at least this is at least what we teach people.
[75:05] So I'm really used to this idea of when I'm writing,
[75:08] thinking about the educated layperson,
[75:11] who they're really smart,
[75:12] but they don't know anything about this topic.
[75:14] And that was just years and years of writing text
[75:16] of that form.
[75:17] And I think it was just really good for prompting
[75:19] 'cause I was like, "Oh, I'm used to this.
[75:20] I have an educated layperson
[75:22] who doesn't know anything about the topic."
[75:23] And what I need to do is,
[75:24] I need to take extremely complex ideas
[75:27] and I need to make them understand it.
[75:29] I don't talk down to them.
[75:30] I'm not inaccurate, but I need to phrase things
[75:33] in such a way that it's extremely clear to them what I mean,
[75:36] and prompting felt very similar.
[75:38] And actually, the training techniques we use
[75:40] are fascinating.
[75:41] Or the things that you said
[75:42] where you're like you say to a person,
[75:43] "Just take that thing you said and write it down."
[75:46] I used to say that to students all the time.
[75:48] They'd write a paper and I was like,
[75:49] "I don't quite get what you're saying here.
[75:50] Can you just explain your argument to me?"
[75:52] They would give me an incredibly cogent argument,
[75:54] and then I'd be like,
[75:55] "Can you just take that and write it down?"
[75:57] And then if they did, that was often a great essay.
[76:01] So it's really interesting
[76:02] that there's at least that similarity
[76:04] of just taking things that are in your brain,
[76:07] analyzing them enough to feel
[76:08] like you fully understand them.
[76:09] And could take any person off the street,
[76:12] who's a reasonable person,
[76:14] and just externalize your brain into them.
[76:16] I feel like that's the core of prompting.
[76:19] - That might be the best summary of how to prompt well
[76:22] that I've ever heard.
[76:23] In fact, I'm pretty sure it is.
[76:26] - Externalize your brain.
[76:27] - And then we'll cut it.
[76:28] - Having an education in the thing
[76:31] is a really good way to describe the thing.
[76:33] That was good.
[76:33] - That's, I think, a great way to wrap this conversation.
[76:37] Thank you, guys. This was great.

---

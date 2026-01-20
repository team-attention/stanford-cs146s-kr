---
title: "Using images as context with Warp"
titleKr: "Warp에서 이미지를 컨텍스트로 사용하기"
category: "how-warp-uses-warp"
sourceUrl: "https://www.youtube.com/watch?v=_Pc7bL0zAoM"
---
# Using images as context with Warp

[영상 바로가기](https://www.youtube.com/watch?v=_Pc7bL0zAoM)

## 전체 자막

Us as humans, we have like five senses.

Normally when you're attracted to the computer, like a lot a lot of the primary attraction is text, but there just some things that don't communicate well over text. There's a saying, right, that an image is worth a thousand words.

I think that is very true. And I think especially when you're building any sort of consumerf facing product or enterprise facing product and such, there's normally some sort of UI component to it.

&gt;&gt; Adv take one mark.

&gt;&gt; I'm Adwight. I'm a software engineer at Warp working on the agents team on AI features that you hopefully know and love. Today we'll be talking about images context. This is a feature within Warp that allows you to attach an image to a particular agent query in order to complete a task. It's very hard to describe to an agent, you know, like this is off by this many pixels or something and go find this component.

And so instead of doing this complicated whatever describing what this thing is, I can just now give it an image. And I think it's just able to understand things a lot better because I think the other thing to remember is that at the end of the day like AI is just trained on human data. Like I think similar to how humans just understand images better and just like it kind of clips clicks for me. I think agents also just like it's easier for them to understand and help you accomplish the task you're trying to do. I wanted to demo uh taking something from a Figma mock into uh warp itself. And so this is a common kind of task I do as an engineer. We're working with our awesome designers. Uh and so in particular, I'm guessing many of you may have heard of MCP. And I wanted to show one of the ideas we're considering for installing MCP servers. And so just to provide a bit of product context before I get too deep into the weeds on agent mode. So currently within warp, we have this interface for MCB servers. And so you can go ahead and add an MCP server with particular JSON with details uh here. However, one of the things we wanted to introduce is kind of easier installation flow for MCP servers. And so one of our designers, Peter, has come up with an awesome mock here which kind of shows a more visual way of of installing MCP servers, particularly for really popular MCP servers, having this concept of a marketplace. And so the way I would go about building this is I can simply take a screenshot of this and then now let's try passing off this off to agent mode in order to see what it can do for us. Let's attach this as context. So for attaching images, you can just head down here, click on the icon. Let me head over to screenshot.

Cool. Now we can see this is attached.

help me build uh this MCP marketplace concept. We can also use voice since it's a bit faster. So, let me switch over to voice here for typing this in. I want to have just hardcoded data. Let's focus on the UI components uh with this piece. And then I I'll also tell you where this file is.

Cool. And then let's tell it the file just so it can find this easily. So, I know this is in the rendering logic is in this collection rs file.

Yeah, we can see it's now taking a look at the file structure.

Cool. It's identified that we've passed in this image and it's now creating this diff. So cool. This is the first diff it's applying. Go and apply that. As a note, if uh yeah, you want to edit any diffs or refine any diffs, you can do that with this code defu as well. And then now it's creating the appropriate data structures. And so I guess for now we're not going to hook it up to the back end and kind of create the MCP itself, but just create a kind of UI the front facing UI for this. Uh, cool. So it's we see that it's identified the components from the image that I passed in. So we see browser automation, calendar management, cloud platforms and such. And then the different icons it's picked up from our codebase here. So stiff makes sense to me. Apply the changes. It's created a plan and it's going through a set of todos that it's defined. And so it kind of has this particular goal in in this case, you know, matching the mock that we're attempting to get to. So again, look like if we go switch back to the mock, we can see we had this linear GitHub stripe uh and some details here. And so this is essentially matching exactly what we expect from that image. And then as I'm going through this, if I wanted to, I can also activate fastware mode.

And so down here, I can just auto approve agent mode code diffs. I want to make sure that, you know, it has a good idea of the task I've given it and it has a good idea of the context that I've given it. And so common pitfalls I've seen in the past is it goes off like trying to edit the wrong file perhaps or it's actually misinterpreted the task.

Um and so I think usually kind of where I've seen agent interactions fail is is near the start and then the rest of this is is largely just execution. And so uh now it's you know adding in all the rendering code with our UI framework logic here. Looking at the code diff view this is like structured similarity similarly to kind of GitHub UI that you may may be used to. And so it shows you how many lines of code it's it's adding and removing. And you can see the actual diffs themselves. And then if you have multiple diffs um inside let's find a good example of this. I guess yeah it is possible to have like multiple hunks as well. So these uh it's doing it uh iteratively here. I guess one of the notes there is that we've generally found AI models to be better at doing smaller diffs. And so kind of iteratively applying diffs is a bit better than trying to get an AI agent to do everything in one shot which generally just doesn't lead to the best results. Um, however, it can also, if it chooses to, if there's a semantic operation, for example, that crosses multiple files and has just multiple lines of code, then it can suggest multiple hunks across files as well. It looks like we've uh kind of finished.

It's uh Asia mode has given us a quick summary here of what it just did. And so I find this this is useful way to kind of check what the agent has done as well. And so here we can see the UI components. It's adding this hardcode data for now, which later we can, you know, back this against our database and server endpoints and everything else.

Let's go ahead and run this uh and see what Warp came up with. Cool. So, this is Warp itself. Uh let's go. I guess I have MCB servers tab open. So, this is pretty awesome. This is what uh Warp came up with. Uh and here we can see that we have the kind of uh three MCP servers that we expected here with the linear, GitHub, and Stripe. So, next steps here would be to actually hook this up to the back end. And so, hook it up to some server endpoints, hook it up with the existing MTB logic that we have uh and kind of really enable these workflows uh end to end. And so I would go ahead and hook up the click handlers uh and kind of just all the pipelining here. However, as a person that you know struggles with UI and just traditionally, for example, in the past don't love working with like nitty CSS details and such, uh this is pretty awesome because it's just a super tedious task that uh would have taken me one or two days that the agent was able to complete in around 20 minutes. This was a fun feature to build. It was something I've personally wanted in Warp for a while. And so one of the fun facts there actually was that I built this feature uh using warp as well with with an agent. But I think one of the the hardest parts here was that images can really rack up tokens quite quickly. And so thinking through the kind of product side of this where we don't want to kind of put a foot gun in for users and allow them to really blow up their token counts inadvertently. Um, one of the things that we added in here was that we actually resize images for you intelligently on the client side before passing it off to the server and before passing it off to the different LLM providers that we support. And so the big thing we wanted to do there was just really make this more efficient for our users and minimize the amount of tokens we're using for images context.

[Music]

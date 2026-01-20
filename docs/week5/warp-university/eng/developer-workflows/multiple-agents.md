---
title: "Run and Review Code with Multiple Agents"
titleKr: "여러 에이전트로 코드 실행 및 리뷰"
category: "developer-workflows"
sourceUrl: "https://youtu.be/3jwus1bfKv4"
---
# Run and Review Code with Multiple Agents

[영상 바로가기](https://youtu.be/3jwus1bfKv4)

## 전체 자막

Hi, I'm going to show off some of the multi-threading features that we have now in Warp. I'm going to build a little feature in Warp in one uh agent tab, ask a little bit about code review. In a second one, I'm going to do some logs spelunking in a third one. Here's what I'm going to fix in Warp. We have this new uh pretty cool input, except it's like a little bit big when it's in a tab that's not focused. I'd like it to be a little bit more subtle, maybe have no background. What I want to do is for the universal developer input, remove the border and background if it's being rendered in a pane that is not focused.

So, please look at the referenced file and at the attached screenshot. In the screenshot, you'll see what it looks like right now. There's two uh equally prominent uh input areas, even though one is focused and one is not. What I want to do is make the non-focused one not have a border, not have a background. Please check out this linear issue for more information. And also, uh, give me a plan before you make any changes. So, I just talked to warp. I find it much easier for a long prompt like this than I do to type things out.

And copy this and let me reference the file like I mentioned I was going to do.

It's this file, universal developer input. And let's see if it can start on this. Now, over here, I'm going to do something else. I've noticed that uh you know it's taking a little bit of time to get code reviews from a team member of mine. I'm wondering if maybe he's overloaded. I have a workflow that lets me see how many PRs Alok who's one of our who's our first engineer at warp and one of our engineering managers has assigned it to him. So Aloque decai let's run this as well. And why not do a third thing as long as I'm I'm showing off multitasking. So I'm going to do a little bit of logs research. I'm going to use another one of these save prompts. And if this is a feature that you like, you can uh create these in agent mode and reuse them not just for yourself, but across your team. So here I'm going to go ahead and use one that summarizes uh cloud logs. This is going to run. And let's go ahead and see what's going on across all these tasks.

We have a nice way of doing that. We have this sort of pane over here that shows all of my running tasks. So I'm going to go over and look at this coding change one and see what's going on. It read the linear issue via MCP. It read the file I referenced and it's coming up with a plan and this looks basically right to me and it switched me to this branch. So I'm going to go ahead and say this plan looks right. Can you please go ahead and make the coding change for me? And after you've made the coding change, please print out in markdown block format what the the change looks like. Going to go ahead and start that. See how we're doing over here. So on the this was the logs review task in case you forgot. Uh it's printed out all these different services I might want to get logs from.

I know which one I want. Let's use warp-server-staging.

And then let's also use the warp-server cloud run instance. What I'd like to see is a summary of logs over the last 10 minutes group by error warning and info level. And please highlight errors that you find. Let's see what's going on over here. Let's see how we're doing with this one. Let's see how Alo look is doing in terms of PR review. So he has this one open from Kevin. He's got this one open from Lucy.

Uh he's got one open from Ben.

He's got another one open from Ian. Oh my god. 26 open PRs. But some of these uh are pretty old. So some need immediate action. All right.

I'm going to talk to a look about this.

Uh let's go over and see coding wise how we did here. So, it's printed out the change that it made. Yeah, this looks right. So, let's see it. Let's just run it and see how it worked. And while we're doing this, let's see what's going on over here with our log review because I was doing some log spelunking while I'm doing some coding and also checking in on Alok's PR load. This is cool. This many info logs, this many errors, this many warnings. It looked at a thousand log entries. Gemini API. Uhoh. Uh we may need to look into this. Cool. Let's try one last thing here and see uh what this change look like. So you can see this one has the background. And if I go over here, this is perfect. So now the focused one is the only one that has the background. If I change back to this, I get the background back. So it's I I don't know if this is the ideal UX or not, but it's actually kind of cool.

Did exactly what I wanted. Uh, so that's how you multitask and

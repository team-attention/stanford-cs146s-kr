---
title: "Using multiple agents at once with Warp"
titleKr: "Warp에서 여러 에이전트 동시 사용하기"
category: "how-warp-uses-warp"
sourceUrl: "https://www.youtube.com/watch?v=w0bJFC0u0pE"
---
# Using multiple agents at once with Warp

[영상 바로가기](https://www.youtube.com/watch?v=w0bJFC0u0pE)

## 전체 자막

I mean like you audience, I love to code. We all love to code. But sometimes there's something that will go on the backlog and you will not be given time to do it.

&gt;&gt; Ben, take one mark.

&gt;&gt; Hey there, I'm Ben and I'm a product engineer and content creator at Warp. I spent a lot of my time working on the desktop notifications and status management side of Warp, which is kind of the secret sauce because Warp's a desktop app. It can notify you when an agent's done or it's blocked and it needs code review so you can jump back in and get into the flow. And that really helps you work on multiple agent tasks at the same time.

I want you to find the PR where we added the keyboard shortcut to the UDI input and I want you to revert that for me. I like to use voice mode just because it's a little bit faster than typing and we use whisper flow so it actually formats it as a nice sentence. I have the PR number copied to my clipboard here. So, I'm going to paste that in and I'm just going to let it run. So, in this tab, maybe I want to do some gathering of information in my Google Cloud, for example. I have the G-Cloud CLI set up and I never remember how to use it. So, I'm just going to ask it to do that for me. What was the most recent Google Cloud project I created?

Wait for that to process. And I can also change this to like the CLI command if I know the name of it. Again, it can usually feel out what you want to do, but it's good to add detail if possible.

And you can see it figures out all of the CLI commands right here. And if I want some more information, I can just follow up with it. What is the billing information for this project? And you can also see here it pulled from my warp drive. Because I knew that I'd be recording a video today, I set up a little rule to say redact any information about G-Cloud billing because I don't want to show that on camera. So you can see it redacted the billing account, but it told me yes, billing is enabled. So now I'm good to move on. We can still see this one's in progress. And you can always jump back to a task to see what's going on. Okay, good. So it looks like it's reverted.

Now I want to change that keyboard shortcut to command shift I just to see how it feels. If you use at context, I love to do this just to autocomplete the file path so I don't have to remember what's the nested directory. It's just right there. So, I put that in and now it's going to go off and write a little bit of code for me. You also get toast notifications when it's blocked, which is another feature that I got to work on. You can see gives you a nice toast with some details. It tells you that it's blocked with this little icon.

There's also a keyboard shortcut to jump straight to it if you want to hop back and forth efficiently. So, you can see here it added a new event to this input rs file. Happen to know that's a pretty good change. So, I'm going to apply it.

And you can also fast forward if you want to. I like to keep this off by default and if I see it's going on the right track, I hit this button down here and now it's going to auto accept future code diffs. So you can review the code diffs at first and then decide later if you want to commit and just let it wing it. All right. So in this other repository, I'm going to do the same thing. I want to add a new eval to our new eval testr runner. Just want it to be simple. I want it to create a Python hello world function. And I want to make sure that the agent creates that program and outputs hello world to the console.

And if I have some context, I'll throw it in here. So I know the folder name is agent mode eval. You can select directories as well and it'll autocomplete. It happens to just be a root level path. We can hop back over here if we want to see how this task is doing. Starting at the cargo check phase. That's another nice little feature of warp. It knows about all the CLIs available and it'll decide how am I going to check my work. Well, I could use the compiler for example. So, I'm going to do that. Maybe if it's able to build or run something, it'll reach for those CLI commands as well. Okay, so now it's trying to verify some changes. I'm going to cut it off because I think this worked correctly and I can just run the app on my own if I'm looking to. So, jump right back in here and I'm going to say cargo run. And this will spin up our codebase. I wish cargo compilation times weren't slower than an entire agent, but they are. It takes a long time. So, I'm going to jump over to this task and see how it's doing. So, we see here it created a Python hello world. And oo, I actually wanted this to go in a different file. So, I'm going to hit refine and tell it I actually want this in the code file in the code RS file.

This is where I know we were writing some code related eval. So, I'm going to tell it go over there and put the change there instead. But otherwise, it looked good to me. So, I'm going to let that run. Now, we're waiting for our app to compile. We can hop into our agent mode as well. If you want to see the entire outlay of every task that we have running, you can see this is one we completed. This is one we canled so we could run our own command. And this is one that's currently in progress and just finished. You can see right here we added a new test script. That looks pretty good. Enter AI input mode. Create a Python Hello World program. That's great. It's checking that the file exists and also matches. So that's pretty good. And I do want it to Okay, so it's also going to ex execute the command. That looks great. Okay, so everything looks good there. I'm going to close out of that cargo task. And I could just write the git commands myself because I've honed in all my aliases.

I'm real fast at it. But I can again just be a little lazy if I want to make a new branch for this and commit the changes.

There we go. and that'll reach for the git CLI and do the same sort of thing.

And that's pretty much everything. So, we're able to just hop between tasks like a product manager. We can also like hop over to Slack and come back as we're working on tasks. So, I usually like to reach for an agent if it's one of those tasks where like I could make someone's day in Slack right now if I just tell an agent to go do this and I know it's going to take a little bit of code review, but we're talking minutes instead of hours. So I feel like I can actually achieve this and then nerd out on the code for the things that are on the product roadmap. So usually when I do stuff in parallel, it's because I know we're not going to get buyin for this. So I'm going to offload this to someone else. In this case, the claude agent is really good at that.

[Music]

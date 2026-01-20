---
title: "Making a UI Change"
titleKr: "UI 변경하기"
category: "developer-workflows"
sourceUrl: "https://youtu.be/V2pwBN6Vt7k"
---
# Making a UI Change

[영상 바로가기](https://youtu.be/V2pwBN6Vt7k)

## 전체 자막

Okay, I'm going to show how I use uh Warp's coding features to implement a feature uh in Warp. And this is going to be a pretty small change, but it should get the idea across. So, what are we trying to do? We have a open linear issue. We want to change the sparkle icon is this icon right here. We want to instead of using that, we want to use the agent icon. So, I'm going to go ahead and prompt the agent to start working on that. We'll see how it goes.

Please create a new branch for me uh according to the format in the attached linear URL. So, by the way, I just talked to warp. I find that easier than doing a lot of typing, especially in a demo like this. Um, I'm also going to attach screenshots of what these icons look like, which I made earlier, so they know what they are. I've also attached screenshots of what the agent mode and sparkle icon look like. I would like you to understand those icons, search for their use in the code, and wherever we're using sparkles, replace them with agent mode. Specifically, I want to make sure we do this in the history menu, but I wouldn't mind if we did it in other places as well. Please give me a plan before you actually start making coding changes. So, I give it a pretty thorough prompt and I'm going to start it and we'll see how it does. This looks right.

And let's do this. And yes, consider function renaming. I'm going to be like, "Yeah, you should rename it because it's no longer sparkles." So, yes, let's proceed. And please give the function a better name. Something along the lines of like render the agent mode icon or render agent mode icon instead of render AI sparkles icon. Please make the change. And uh let me know how it goes.

So, while this is going, I actually think this is cool. So, we can see the diffs being generated. I have warp in a mode where I auto accept the diffs. If I want to look in and see what the diffs are, I can see right there it's rendering uh it's changing the actual rendering code and it's changing the name of the function which is what I want. If you for instance didn't want uh it to make these changes automatically, you could always go over to your AI settings over here and you have controls over how things are applied. So I have these as just very permissive because I really trust the AI at this point. I'm operating in a like a git a git sandbox here. Now it's going to keep going. It's going to find all the other instances.

We can see what it's doing as it goes.

Okay. So now it's made the changes and it is smart enough to know how to compile them. So it's running cargo check. If you want to see the progress of that, you can just go in and do this.

Okay, it looks like it missed something.

um that happens such as life. As a person, I sometimes forget to add imports. So, let's go ahead and see if it can fix this. Okay, so now it's compiled. It wants to then run my presubmit script. I'm not going to have it do that. Instead, I'm just going to go ahead and run and see if we've actually made the change. While it's doing this, just want to call out this is working on a codebase that's over a million lines of Rust code uh with a totally bespoke uh UX framework. And so it's uh it's not the easiest task for an agent to do. It's very impressive that it's able to do this kind of stuff.

Okay, there it is. Agent icon.

Pretty cool. I must say it looks good.

So there it is. I uh just to recap, I had agent mode understand a linear ticket. I gave it some images to build a feature. I asked it to do it for me. It uh came up with a plan. It created a branch. It made the change for me. Did the comp like iterate until it compiled correctly? I could have it continue going to even make the pull request and all that, but I think this is a good place to stop.

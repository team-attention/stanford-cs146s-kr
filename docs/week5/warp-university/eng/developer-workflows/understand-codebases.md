---
title: "Understand Codebases"
titleKr: "코드베이스 이해하기"
category: "developer-workflows"
sourceUrl: "https://youtu.be/11rz9OYQ8Hg"
---
# Understand Codebases

[영상 바로가기](https://youtu.be/11rz9OYQ8Hg)

## 전체 자막

I'm going to show how I use Warp to learn unfamiliar parts of a codebase. Uh I'm going to do this in Warp's own codebase uh with this new agents pop-up that we have, which is something we just added. I want to add a button to it, but I don't know how it works, and I don't know where in the code it is. So, I'm going to ask Warp to explain it to me.

Please explain to me how the agent popup code is structured, where it lives in the codebase, and how it is rendered and called. I want to understand the full data flow and structure of that component so that I can figure out how to add a new agent button to it. So as this runs, I'll call out some cool things. This is like I said working on Warps codebase which is over a million lines of Rust code with a custom UI framework. So it's not a simple uh a simple thing to understand. First we use semantic search which is uh like a vectorzed embedding search to try to figure out where the right code might be. It's done a good job. It found the what I assume is the file here, this agent management popup. Then it switches into a mode of searching where it uses GP and searches for uh specific strings across the codebase. You'll notice it kind of trades off doing these different kinds of searches. Here it's reading us a specific file, which you know, I'm ashamed to say is like a 10,000line file. And so it breaks it into smaller pieces and just reads the relevant sections, which is a smart thing to do.

Then it goes and iteratively searches for these symbols and then reads the files. And so it's going to do this for a second and then it's going to be able to give me a good explanation of the structure. So let's take a look at what we got here. Seems right. This is where the popup is defined. This is where it's rendered into our workspace and these are the actions associated with it. It gives me a overview of each of these pieces of code. Wow, this is really cool. It's showing me how our tab bar is rendered and where the the popup is added. It's giving me a very detailed explanation here, which is exactly what I want. And then it tells me how I could get started on building the feature that I described. Thank you and hope this was helpful.

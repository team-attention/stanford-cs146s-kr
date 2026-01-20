---
title: "Start a Coding Task with Warp"
titleKr: "Warp로 코딩 작업 시작하기"
category: "getting-started"
sourceUrl: "https://youtu.be/IuFSuOYstfg"
---
# Start a Coding Task with Warp

[영상 바로가기](https://youtu.be/IuFSuOYstfg)

## 전체 자막

I'm going to show you how I use Warp to code and specifically I'm gonna fix a bug in Warp using Warp. So, a little bit meta. This here is a developer build of Warp that has this bug. You can see that Warp has a model picker here. And we have a setting which is not being honored in this version of Warp, which is this show model picker in prompt. I'm going to go ahead and take a screenshot of it so I can remember it. And then I'm going to show you how I would fix this bug using Warp. So, I'm going to go ahead and quit this developer build, and I am going to prompt Warp to fix the bug. I'm going to do it using my voice because I find that uh just faster than typing a long prompt. If you want to use voice to talk to Warp, you hit uh click this microphone icon here. Once you've clicked the first time, you can configure a hotkey, which is how I'm doing it. There is a bug where the universal developer input is not honoring the show model picker in prompt setting. I'd like you to fix that bug and also make sure that you are listening for changes to the setting so that when someone clicks or uncclicks the checkbox, the uh developer input is updated appropriately. Please take a look at the attached screenshot and the reference file when making this fix. So I speak to warp and then there's various ways of providing warp context to make it work better. So one is attaching an image. So I'm going to go ahead and attach that screenshot that I just took.

A second is referencing files or symbols. So here I'm going to reference a file where I I think is relevant called the universal developer input.

You can also, by the way, just put raw URLs in here. You generally um you don't have to reference files because Warp will index your codebase and has various search tools for finding the right files.

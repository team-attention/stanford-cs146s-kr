---
title: "Master Warp's Code Review Panel"
titleKr: "Warp 코드 리뷰 패널 마스터하기"
category: "warp-code"
sourceUrl: "https://youtu.be/4JlN0rvoZA8"
---
# Master Warp's Code Review Panel

[영상 바로가기](https://youtu.be/4JlN0rvoZA8)

## 전체 자막

Hey, I'm Jess. I'm Warp's developer advocate, and today I'm going to teach you how to master the code review panel so you can stay in the flow better while coding. I'm working on a repo called AI Observe, which is just a small project I built to visualize how tokens are calculated in AI models. It shows you how your text input gets broken down into tokens, how many are used in a request, and helps developers understand what that means in terms of the cost and model usage. I hacked this together in about 1 hour over the weekend. So, you can see the web app is still pretty rough. Like here, the hover text is black on a dark gray background, making it hard to read. Let's walk through how I'd fix that using Warp. I'll start by asking Warp directly, can you update this hover text so it's easier for me to read against the background. I'll even attach an image to make it clearer. Then I'll kick off the agent process and Warp will start to generate code diffs with all the proposed changes. Now, this is great, but for larger changes, it can be hard to see all the files that have been touched, and I don't want to constantly have to scroll back up through the UI to find them. So that's where the new code review panel comes in. I can click this view changes button at the top left or the get dirty chip in my input to open up my code review panel. Now know that these only work if you're within a repo.

In my code review panel, I can see how many files are in the open change, how many lines of code have been added or deleted, all the different code diffs that have been made, and I can open up this panel, which gives me a more structured breakdown of all the files that have been touched with their edited line count. Now, if I want to dive deeper, I can open a file directly in Warp's built-in editor. It's a lightweight editor with syntax highlighting, search and replace, and basic editing tools. For example, I'll tweak the color schema here and then save. When I go back, the change is already reflected in my code diff panel. And I can verify that I do see that change reflected in my app as well. Now, let's say I want this hover style applied consistently across the app, not just this one file. I can prompt Warp to componentize the hover effect so that the new color schema is applied anywhere a hover UI appears. And I can add the diff that I just created as context to my prompt. And you'll see that it sites the diff like this. Now once the agent finishes, I can go into the file tree, see the new component that's been generated, and click into it to do a quick gut check. The agent named it the tool tip component. It handles the mouse event correctly, and it seems to persist the UI and color schema that I created.

Looks good to me. And once I'm happy with the changes, I can go ahead and commit and push directly from the panel.

The panel then resets into its zero state, letting me know that there's no open changes. And you can click here to quickly see the diffs between your current branch and main. The warp code review panel makes reviewing, editing, and committing changes faster and more intuitive. I do like to keep this panel open while coding because it gives me a live overview of everything that's happening in my repo without really having to switch tools or lose focus.

Give it a try and see how it changes the way you code.

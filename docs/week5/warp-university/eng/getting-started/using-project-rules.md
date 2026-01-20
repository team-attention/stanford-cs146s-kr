---
title: "Using Project Rules"
titleKr: "프로젝트 규칙 사용하기"
category: "getting-started"
sourceUrl: "https://youtu.be/SCYovBn4TnM"
---
# Using Project Rules

[영상 바로가기](https://youtu.be/SCYovBn4TnM)

## 전체 자막

Warp's project rule files are going to make it so much easier for you to build big projects without hallucinations and to keep your LLM laser focused on your project. Instead of having to reexplain your setup each time, you can document it once and warp will always have that context. In this video, I'm going to show you what a warp markdown file is, walk through an example, and then share some best practices for getting the most out of it. So, getting started is simple. First, you want to run /init and warp will generate a starter file called warp.md in your project route. Now, let's walk through a real example. I've created one for my Astro and React project that uses Firebase and Versel.

If I type ls in my project route, you can actually see I have the warp.md file right there. And I can open it by running /open project rules and warp will pull it up in a side file editor where I can scroll and see everything inside. You can see that the markdown file aderes by best practices like using standard markdown headings to organize the file into logical sections. The first section covers common commands things like npm rundev to start the dev server, npm run build for production and npm install for dependencies. This gives warp reproducible ways to run and build your project. Next is the architecture overview. At a high level, this app lets developers upload brew files, stores them in Firebase, runs personality analysis, and displays the results in a web UI. The file even includes flow diagrams and component interaction diagrams to make the system easy to understand. From there it goes into key architecture details like the front end uses Astro. The back end uses serverless API routes. The database is Firebase and for deployment is Versel. It also documents the project structure like where to find components types utilities and the Firebase config. Now there are a couple tips I'd like to share to make the most out of your project rules. The first is to be very lean and intentional. So everything in your warp.mmd file gets prepended to your prompt. That means a longer file eats into your token budget. So the more tokens used, the more computationally expensive each request becomes. So my advice is to keep it sharp and only include what truly matters. The second is you're starting with a boilerplate, but treat this file as a living document. Warps/init command gives you a solid baseline, but the real value comes from iterating. For example, you can add in your team's git workflow like always branching off main, using descriptive names, opening draft PRs early, and squash only when merging. As your project grows, you want to keep feeding in preferences that makes warp code just like you would. Third is generating rule files in subdirectories. So, if you're working in a large monor repo, you don't have to cram everything into one doc.

For example, I can navigate into source and then run /init again to generate a warp.mmd tailored just to that directory. Obviously, it's a bit redundant here since this project is so small, but you get the point. And finally, you want to optimize your rules file over time. You can run your warp.md file through a prompt optimizer, especially when your file becomes massive, like over 500 lines. Doing this will help you catch duplication, remove overlaps, and slim down the file so it stays effective without burning extra tokens. So, to recap, your warp.md file is your project's AI onboarding guide.

You want to keep it lean, update it as you go, and optimize it over time. Hope this helps.

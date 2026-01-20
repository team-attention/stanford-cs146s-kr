---
title: "10 Coding Features You Should Know in Warp"
titleKr: "Warp에서 알아야 할 10가지 코딩 기능"
category: "warp-code"
sourceUrl: "https://youtu.be/oeonZ-jtzhA"
---
# 10 Coding Features You Should Know in Warp

[영상 바로가기](https://youtu.be/oeonZ-jtzhA)

## 전체 자막

If you didn't already know, you can code directly in Warp. We've built a full set of features that make editing, reviewing, and navigating your codebase way easier than in a traditional dev tool. Let me show you the 10 main features you'll need to know to get started. One, you can search for files.

So, you can open up the command pallet with command P on Mac or control shiftP on Windows or Linux. From there, press command O for Mac or control O for Linux and Windows to activate the file search mode. Now, I can search and pull up any file from this interface. This makes it super simple to jump between files in my project without having to cd into directories or remember full paths. Two is that we have a tabbed file viewer.

When you open files, Warp shows them in a tabbed view. This avoids the clutter of split panes that eat up screen space while still letting you quickly swap between multiple open files. Third is that we have full editor support, so you can literally type and edit code inside of Warp like you would any other modern editor. You don't need to memorize Vim shortcuts to do this. just click around, highlight text, use, copy, paste, or any of the normal keyboard shortcuts that you're used to. Fourth is that we also support find and replace in Warp's editor experience. It supports reax, multicursor editing, replace all, and even preserve case rules so that renaming functions and variables is fast and consistent. Fifth is that Warp also has syntax highlighting for an extensive number of different languages and frameworks. It'll appear in both the agent generated code diffs and also when you open up a file in the editor view, making files way easier to scan visually. Six is that we have one-click links to referenced files. So when Warp's agent mode references a file, it links directly to that exact line of code. And by clicking on it, you can open up that file to that exact line of code in Warp. This transparency makes it easy to follow what the agent is doing, whether it's reading files, tracing logic, or making a fix. And just note that in settings under features, you'll want to set warp as your editor for these file links so that they open directly inside your Warp coding view.

Seventh is that we have a code review panel now. So Warp also gives you a dedicated panel that summarizes all of your files and diffs that were touched by an agent. You can review them at a glance, approve or edit changes, and even reference those diffs directly in your next prompt. This not only reduces hallucinations, but it also keeps the agent grounded in your actual code.

Eight is that we have code snippet references. So, Warp surfaces code blocks when explaining something about your codebase. And I like this feature because you can attach that snippet as fresh context for your next request.

That way, you don't have to keep the entire history in memory. You can pass only the code that matters, which keeps token usage lean and the agents focus sharp. Ninth, we have codebase indexing.

So, Warp can automatically index your repositories, and it makes it dramatically faster for agents to summarize large code bases, fix bugs, or handle refactors because Warp already understands your project's structure.

And we've added a file tree view. Just click on this icon to browse your entire repo and open any file that you need.

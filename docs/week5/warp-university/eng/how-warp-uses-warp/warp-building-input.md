---
title: "Building Warp's input with Warp"
titleKr: "Warp로 Warp의 입력 만들기"
category: "how-warp-uses-warp"
sourceUrl: "https://www.youtube.com/watch?v=ySzUj7kMZ64"
---
# Building Warp's input with Warp

[영상 바로가기](https://www.youtube.com/watch?v=ySzUj7kMZ64)

## 전체 자막

Cool. Should I just kick it off with my my spiel?

[Music] &gt;&gt; Great. Dave, take one. Mark.

&gt;&gt; Hey, I'm Dave. Uh, I lead product design at Warp. And today I'm going to talk about the design of our universal input and how I used Warp to build it. The biggest challenge of approaching a redesign like this is dealing with people's expectations of what the design should be. So the input is the primary interface for working with the terminal and it's something that developers use all day every day. So I knew going into it that it was going to be controversial and there were going to be a lot of different opinions about what it should be. A product designer on my team, Peter and I iterated a bunch on the design of the input. And so I have Figma pulled up here with with some of our design files that we were that we were working on and iterating on. So, I have here on my other screen the universal input and basically what what the design does is it brings to the forefront all of those agent controls that were previously sort of hidden in this agent mode. Once Peter and I had the design of this input, we sold it internally and people were mostly excited by it. But then it sort of when it came time to build it, our engineering team was like quite busy improving the quality of responses for agent mode and getting the agent development environment ready. And there wasn't really enough resources for building this design. And so I thought, well, what if I just warp it? And so I used warp to start building the universal input. This is just a really simple example, but inside of warp, we have this git diff chip and it displays what git branch you're on and also any open changes on your branch. And if you notice right now, it's just like one pixel too tall, which for me as a designer bothers me a lot. And the reason that it's too tall is because the font here on the actual change display is one pixel too large. So I'm going to make uh a quick change to reduce that.

So warp is super powerful for a designer because it allows me to understand really complex code bases like warp itself. So warp is written in Rust and has over a million lines of code. Some of those files are 20,000 lines long.

has a completely custom UI framework that was built from scratch. And so there really isn't like documentation out there on the internet of how to use it or how to read it or understand it as a designer. So the first thing I'm going to do is just like ask Warp where this code is. I didn't actually build this git chip. We brought in engineers to help get this project across the line and they built it. So I'm not super familiar with the code. Where in the code is the git chip in the universal input and now warp's going to search through my codebase and actually find the associated code. So I can see that it's actually already pulled up a bunch of different files that reference the git chip in the universal input. And now it's actually going to search through those files and find the specific functions that control the git chip display. And it uses a combination of codebased context semantic search as well as just traditional find and GP tools. And I see that it's found the main implementation inside of display chip. RS. I can see that it's found the universal input git branch chip and the associated render methods.

And I can see the file that configures where it's displayed and other related files. So I'm going to just go ahead and ask it to change the font size. So the font size on the get diff change text is one pixel too large.

Reduce it by one pixel.

And so now Warp's going to go through the display chip. RS file and look for instances of the the font size. And it can see that it's set to the system font size minus one, but I actually want it set to -2. So it's already figured that out. that I'm asking it to set it to negative -2. And then here I can see that it's found all instances of the font size and made the modifications for me which is pretty sweet. Now I'm going to go ahead and just build the application and check its work. So in another pane I will switch into terminal mode and do cargo run which is how we build the application locally.

This will take a minute.

Okay. And now I see that the application is built and the git chip is the correct size. If you compare them side by side here, I can see that the text is slightly smaller and that makes the height of the chip the correct size which makes me stoked as a designer.

---
title: "Creating rules for Agents with Warp"
titleKr: "Warp로 에이전트 규칙 만들기"
category: "how-warp-uses-warp"
sourceUrl: "https://www.youtube.com/watch?v=OyrpkeL6WNY"
---
# Creating rules for Agents with Warp

[영상 바로가기](https://www.youtube.com/watch?v=OyrpkeL6WNY)

## 전체 자막

[Music] W by warp mark.

&gt;&gt; Hi, my name is Maggie. I'm an engineer at warp and I'm one of the engineers that built rules in warp. It's essentially one of the many features in warp drive that lets you build more context for your agent. So, one of the tasks I'm currently working on is to actually add evals, which is like different test cases for a different feature that I've been working on. So, how can I get started with agent mode eval?

So, now it's telling me, hey, Bessie, we found some notebooks, maybe something in our documentation on how to set it up, how to get it running. This is really helpful as I'm starting the task, and it's probably coming from one of my teammates that already wrote a notebook.

This time, I want to add an eval where we're testing for a Rust syntax error.

So I can say let's update that Docker file to include Rust.

The Docker file that was updated is installing Rust in a different way than I actually wanted to. I can see that GCC and Python are both being installed by this AP get instead. So I'm actually going to stash these changes and then create a rule to kind of follow more of that convention. I can see myself in the future adding more evals and adding even more languages or packages. I'd rather keep this as a rule to use for future sessions than just like a one-off thing.

The rule that I'm going to add here is always use a get to install packages and follow the patterns used to install Python and GCC.

So now I'm honestly just going to ask Mode to try that one more time. This time hopefully it'll follow that rule and give me the code that I actually want. And Rust is being added. That looks like the right code that I want.

So yeah, that's all.

I think what's unique is I'm able to just grab context by just asking agent mode in natural language. And that's just incredible.

---
title: "Using MCP servers with Warp"
titleKr: "Warp에서 MCP 서버 사용하기"
category: "how-warp-uses-warp"
sourceUrl: "https://www.youtube.com/watch?v=8vn2brhJrF8"
---
# Using MCP servers with Warp

[영상 바로가기](https://www.youtube.com/watch?v=8vn2brhJrF8)

## 전체 자막

more important company data you need to give access to your where you or any number of sources that might be that I try to get just one sentence out.

&gt;&gt; Hi, I'm Andrew. I'm one of the software engineers here at warp and today I'm going to talk about MCP server support.

This is our old input format and we have a new format that we call the universal input. In the old mode, we support a chip here, which tells you when you've activated a virtual environment, which is listed here. And you can see if I switch to universal, that chip is not available. Help me solve this ticket.

At this point, Warp has no idea what a ticket is, where to find the ticket. We do our ticketing through Linear, and Linear has an MCP server we can add support for. So, you can hear it, see, it's trying to check GitHub, and it's not able to do anything. So, I'm going to go ahead and cancel this and I'm going to add in the linear MCP server.

Right here, I can just click add and then paste in the JSON. And right here, you can see the MCP server starting up and it's got a list of tools it can use for reading and writing to tickets. One more nice thing we can do is add a rule here that I'm going to call check linear, which allows me to sort of communicate just say here's a ticket and inform it that it should check linear for tickets. So now if I start a new conversation again and I say help me solve this ticket.

[Music] One of the cool ways about how we implemented MCP support is we allowed it to be highly dynamic. So if you start a conversation without an MCP server and you start a server in the middle of your conversation, your next message is going to have that as context. Now you can see uh it's identified the MCP server successfully. I can go ahead and hit run.

And you can see here it was able to grab context from linear directly. I'm going to go ahead and run cargo run and see if the features working. And look at that.

That's pretty straightforward. Worked right away. It was able to go to linear, grab all the context it needed to figure out which problem it needed to solve, look through the code to identify how other chips were implemented, and ultimately build this with very little input on my part. It just kind of worked.

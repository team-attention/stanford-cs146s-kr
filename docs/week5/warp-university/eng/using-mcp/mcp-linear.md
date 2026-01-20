---
title: "Connecting Warp to Linear via MCP"
titleKr: "MCP로 Warp와 Linear 연결하기"
category: "using-mcp"
sourceUrl: "https://youtu.be/jxeMfuS1pXk"
---
# Connecting Warp to Linear via MCP

[영상 바로가기](https://youtu.be/jxeMfuS1pXk)

## 전체 자막

Hi, I'm going to show you today how to set up MCP in Warp uh so that Warp's uh agent can access external data sources.

MCP is model context protocol from Anthropic. It's a pretty easy thing to set up in Warp. Let me first show you a use case where it's not set up. So, let's say I wanted to ask our agent to tell me all the linear tasks that are assigned to me. Uh you'll see right now I don't have it set up and so uh there's no it just can't answer the question. To set up MCP what you you do in warp is you go over to warp drive. You go and scroll down to your personal section and click MCP servers. Uh you can also get to this by um hitting command P and opening the MCP servers pallet. Either will work. You can see I have a bunch already configured and what I want to do here is add a new one. So, I'm going to get the JSON for it, which I have saved in a file to open a file in Warp. Um, I have this linear MCP JSON file. I'm going to hit command O. I'm going to go ahead and open it up. Here's what the JSON looks like for it. I'm going to click add over here and just copy paste this in.

Click save. This will save the server and it will also start it. You can see now I have the linear MCP server running. So let me go ahead and close this and go ahead and try that same query and it should be able now to use MCP to answer it for me. So let me move my face.

So you can see then it's calling uh the MCP tool. If you want to see the actual raw response as always in warp you can click in see it. This didn't work.

Didn't find me. So, let's see if it can Oh, found another person on my team, which is fine.

I wonder why it didn't find that. Maybe because I signed up with a different address.

Ah, there we go. Found the correct user.

One of the cool things about our agent is it's very good at selfcorrecting.

here. It's going to grab all of my issues. There might be quite a few.

I can look in. Oh boy, there's a lot.

Okay, so here it is. So, very easy to do. Uh, a couple other things to call out. You can always stop the MCP server by hitting stop. You can edit it by clicking edit. If you have some error with it starting, one thing that's very cool and useful to do in Warp is you can view the raw logs. So, this just starts up a terminal session that tails the logs of the MCP server. Uh in general, these MCP servers will run until you stop them. Uh including they will maintain their running state uh when you close Warp and reopen it. So have a good time setting up MCP.

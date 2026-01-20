---
title: "Using Figma MCP Server"
titleKr: "Figma MCP 서버 사용하기"
category: "using-mcp"
sourceUrl: "https://youtu.be/C0g_Onjtsb8"
---
# Using Figma MCP Server

[영상 바로가기](https://youtu.be/C0g_Onjtsb8)

## 전체 자막

The Figma MCP server lets Warp agents pull design data from Figma and turns it into code scaffolding. To set it up, go into your Figma account, click your profile picture, go to settings, security, and generate a new personal access token. Give it full read access in Warp. Open up the MCP panel, paste in the Figma JSON config, drop in that access token you got, and hit save. For this demo, I'm going to use the design for Warp's redesigned homepage. And in Figma, I'm going to go ahead and select the group I want, rightclick, and then choose copy link to selection. Now, going into Warp, I've stored a prompt in Warp Drive called Figma mockup. It tells the agent to recreate the design in code and stipulates things like keeping the original sections, spacing, font sizes, colors, and general best practices. When I run it, the MCP server will call get Figma data and download Figma images.

And then it starts to generate the HTML and CSS for the entire layout. On screen, you're going to see it fetching the design data, generating code files one by one, and then previewing the final result in the browser. If I switch back and forth between the design and the generated file is surprisingly close. The header, the feature cards, and the code generation section are all there. It is missing a few details like the gradients and the footer, but this is an excellent starting point. I find this to be a huge timesaver for PMs, designers, or devs who just want to skip the boilerplate and get to iteration faster.

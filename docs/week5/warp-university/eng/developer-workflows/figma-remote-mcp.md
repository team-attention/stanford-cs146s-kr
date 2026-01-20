---
title: "Setting up Figma Remote MCP in Warp"
titleKr: "Warp에서 Figma Remote MCP 설정하기"
category: "developer-workflows"
sourceUrl: "https://youtu.be/PsM_Y8Pt-1Q"
---
# Setting up Figma Remote MCP in Warp

[영상 바로가기](https://youtu.be/PsM_Y8Pt-1Q)

## 전체 자막

So, we just rolled out support for the remote Figma MCP server running in Warp.

Now, a remote MCP server lives elsewhere and you can connect to it through warp.

This means you don't have to manage all the processes yourself. All I have to do is paste in this simple JSON and Warp will open an OOTH login flow. So, just loging in once with your Figma account and that's it. This saves you setup time, removes the hassle of managing tokens, and makes it way easier for you to get started. Now, the Figma and MCP server lets AI coding tools pull context directly from your Figma files so that the LLM is less likely to hallucinate on your project. So, it can get screenshots for higher level context so the AI sees relationships. Design system rules like components, variables, and styles so that generated code matches your design system. getting encode, which will return back the code from the Figma file, and content metadata, which includes text, images, and layer names that help the AI fill in realistic data models. Here, I'm pasting a prompt into warp to create a website from this Figma file. I'm adding basic guidelines around what I want it to look like, like design details, technical requirements, and specific instructions. And to reference the Figma file, I just have to rightclick, copy, paste as, and then click copy link to selection. and Warp is able to call the Figma MCP server to get things like metadata, take a screenshot and pull code. It then starts to generate a bunch of code diffs and in under 5 minutes I can get this website running locally. Obviously, it's not perfect, but it does mimic the structure of the Figma design quite well. It's missing a lot of logos and images. So, Warp has instructed me to download them into the assets folder it's created for me. So, I'll go do that and then I'll start a second iteration telling it to fill in the website with those images.

As this was running, I did want to call out how cool Warp's persistent input feature was. I forgot to upload the Misho logo and noticed that Warp was trying to create its own as a placeholder. I quickly uploaded the image to the asset folder and let Warp know that and Warp was able to adjust to find and use the uploaded logo in the middle of its process. And here's the finished result. Again, there's still a lot of kinks that need to be ironed out, but this is pretty good for under 20 minutes of work thanks to the Figma remote MCP server. So, to recap, Warp Now supports running the Figma MCP server remotely, and we've added OOTH support, which simplifies the setup dramatically, meaning it's easier to set up all of your favorite MCP servers like Sentry, GitHub, and Linear, not just Figma. Hope this helps.

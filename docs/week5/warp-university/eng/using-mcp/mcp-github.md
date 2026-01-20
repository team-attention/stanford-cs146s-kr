---
title: "Using Github MCP Server"
titleKr: "Github MCP 서버 사용하기"
category: "using-mcp"
sourceUrl: "https://youtu.be/OXYQyNXH2Bw"
---
# Using Github MCP Server

[영상 바로가기](https://youtu.be/OXYQyNXH2Bw)

## 전체 자막

The GitHub MCP server lets Warp agents directly read from and write to your GitHub repos. To set it up, you'll first need a GitHub personal access token.

Here's how you get one. Go into your GitHub account, head into settings, then developer settings, and click on personal access tokens. When you create the token, enable everything under repo, and also enable read user. I like to keep the scopes minimal so the AI doesn't have too much write access. That way, there's less risk of it accidentally committing changes or overwriting something important. Once you've got your token, head into warp.

Open up the MCP panel from the command pallet and click add. Paste in the JSON config for the GitHub MCP server. Drop in your access token that you just got and then hit save. And now you'll see all the available endpoints. And now that it's set up, I'm going to show you two real workflows that I use all the time. The first one is summarizing all open PRs. So here I'm inside Warp's own internal GitHub repo. I can run a prompt that asks the agent to summarize the discussion and key unresolved questions in all the open poll requests. Behind the scenes, MCP server calls list pull request to get the PRs, then get pull request comments and get pull request reviews to pull all the details. It compiles everything into a clean summary. And best of all, it gives me clickable links to each PR so I can jump right in and review. The second workflow is creating issues from to-dos. So, for this one, I'm using a saved prompt in my warp drive, and it tells the agent to find every to-do comment in the repo and create a GitHub issue for it. The Warp agent is going to scan the codebase, find all my to-dos in my code, and then automatically call create issue from the GitHub MCP server for each one. When it's done, I'll have a clickable list of all my new issues, all with the original to-do text and a link back to the code.

And both of these workflows saved me about 20 to 30 minutes each compared to doing them manually.

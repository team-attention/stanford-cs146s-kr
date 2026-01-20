---
title: "First look at Warp's Agent Runtime"
titleKr: "Warp 에이전트 런타임 첫 만남"
category: "getting-started"
sourceUrl: "https://www.youtube.com/watch?v=hV6UdEf3C1I"
---
# First look at Warp's Agent Runtime

[영상 바로가기](https://www.youtube.com/watch?v=hV6UdEf3C1I)

## 전체 자막

Hey everyone. So we are announcing the soft launch of Warp CLI. The Warp CLI brings Warps agent into any environment.

So it lets you take saved prompts, Warp Drive objects, agent profiles, and MCP servers that you use inside Warp and apply them anywhere. Let me show you three examples of how you might use it.

So here I'm in Cursor's terminal, and I want to use Warps agent to summarize my codebase for me. I can set up Warp's CLI and now I can run Warp CLI to give me a full summary with a diagram as well as an overview of the codebase with things like component interactions, deployment architecture, and runtime behavior. The key value here is that even though I'm not inside Warp, I still have access to all of my saved prompts, my drive context, and my agent profiles. For example, I already have an agent profile set up called YOLO agent in Warp. This profile is tuned for autonomy. It always executes commands, always reads files, and has a command deny list for safety.

I know the ID of this profile by running warp agent profile list, which shows all of my profiles and their IDs. I also already had a saved prompt to summarize a codebase for me. It's already set up with instructions to explain the deployment architecture. And thanks to an attached rule, it automatically generates a diagram whenever I ask for a summary. I can look up the ID for this prompt by using the at menu inside of warp. The second example is running Warp CLI in GitHub actions. Here I've set up a YAML file undergithub/workflows.

This workflow installs Warp CLI, authenticates it, generates a patch file for the PR, and then runs my reviewer agent with the saved prompt and profile.

For example, it warns me about exposed API keys, missing error handling, and also highlights the positive improvements like better logging. This all happens automatically whenever I push new commits to the PR. The value is that I'm reusing the same reviewer workflow that I trust locally in Warp, but now it's running headlessly in a continuous integration with the same context. The third example is running Warp CLI on a remote machine to summarize server logs. Imagine I've got a Docker container streaming logs to a server. I can run warp CLI and get a clear summary of what's happening like memory exhaustion, database connection failures, external API timeouts, high disk usage, authentication errors, and so on. Instead of combing through endless log lines, I get the important issues in one place. So whether I'm in cursor or reviewing PRs through GitHub actions or reviewing logs on a remote server, the Warp CLI gives me a consistent access to my agents. Now, quick PSA that this is a beta launch. So right now we are focused on getting a small group of testers and the goal is to get feedback on you all for what's working and what's missing. So we hope that you are all excited about this and we're excited to see what you're going to build with Warp CLI.

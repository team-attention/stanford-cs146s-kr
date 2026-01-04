This post is about an important, but also scary, prompt injection discovery that leads to full system compromise of the developer’s machine in [GitHub Copilot and VS Code](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-53773).

**It is achieved by placing Copilot into YOLO mode by modifying the project’s `settings.json` file.**

[![vscode episode 18](https://embracethered.com/blog/images/2025/episode12-yt.png)](https://embracethered.com/blog/images/2025/episode12-yt.png)

As described a few days ago with [Amp](https://embracethered.com/blog/posts/2025/amp-agents-that-modify-system-configuration-and-escape/), a vulnerability pattern in agents that might be overlooked is that if an agent can write to files and modify its own configuration or update security-relevant settings it can lead to remote code execution. This is not uncommon and is an area to always look for when performing a security review.

## Background Research

When looking at VS Code and GitHub Copilot Agent Mode I noticed a strange behavior… it can create and write to files in the workspace without user approval.

The edits are immediately persistent, they are not in-memory as a diff to review. The modifications are written to disk right away.

[![vscode agents that can modify their own settings](https://embracethered.com/blog/images/2025/agents-that-can.png)](https://embracethered.com/blog/images/2025/agents-that-can.png)

It’s one of these things that as a red teamer you know is probably not good… so I was looking if this could be used to escalate privileges and execute code.

### **YOLO Mode**

So, next I researched features in VS Code that depend on settings that are within the project/workspace folder, and quickly found an interesting one.

[![vscode-exp-yolo-mode](https://embracethered.com/blog/images/2025/vscode-documentation-settings-json.png)](https://embracethered.com/blog/images/2025/vscode-documentation-settings-json.png)

It turns out that in the `.vscode/settings.json` file one can add the following line:

`"chat.tools.autoApprove": true`

**This will put GitHub Copilot in YOLO mode.**

And it disables all user confirmations, and we can run shell commands, browse the web, and more!

What is interesting is that this is an experimental feature, but it is still present by default. I did not download a special version or set my VS Code overall into an experimental mode.

Furthermore, it works on Windows, macOS and also Linux.

## Exploit Chain Explained

The proof-of-concept exploit chain to hijack Copilot and escalate privileges is as follows:

1. The attack starts with a prompt injection planted in a source code file, web page, GitHub issue, tool call response, or other content… The payload can also use invisible text as instructions.
2. The prompt injection first adds the line **“chat.tools.autoApprove”: true,** to the `~/.vscode/settings.json` file. Folder and file will be created if they don’t exist yet.
3. **GitHub Copilot immediately enters YOLO mode!**
4. Attack runs a Terminal command. **And using conditional prompt injection we can actually target what to run based on the operating system.**
5. We achieved Remote Code Execution powered by Prompt Injection.

Here is a screenshot that shows the demo file with the prompt injection, the developer interacting with the file on the right side in the chat box, and the calculator popping up!

[![vscode-e2e-calc](https://embracethered.com/blog/images/2025/copilot-chat-result.png)](https://embracethered.com/blog/images/2025/copilot-chat-result.png)

Of course any other means of prompt injection delivery, like web or data coming back from an MCP server is an attack angle. I just used it inside the source code file because it’s easiest to test with.

## Video Walkthrough

### Short Demos

Here is a demonstration video that shows the code execution on Windows.

GitHub Copilot: Popping a calculator with Prompt Injection (Windows) - YouTube

[Photo image of Embrace The Red](https://www.youtube.com/channel/UCSwcJXQWE6GWu9IKc0QwO5g?embeds_referring_euri=https%3A%2F%2Fembracethered.com%2F)

Embrace The Red

8.59K subscribers

[GitHub Copilot: Popping a calculator with Prompt Injection (Windows)](https://www.youtube.com/watch?v=QceCWM6DbWc)

Embrace The Red

Search

Watch later

Share

Copy link

Info

Shopping

Tap to unmute

If playback doesn't begin shortly, try restarting your device.

More videos

## More videos

You're signed out

Videos you watch may be added to the TV's watch history and influence TV recommendations. To avoid this, cancel and sign in to YouTube on your computer.

CancelConfirm

Share

Include playlist

An error occurred while retrieving sharing information. Please try again later.

[Watch on](https://www.youtube.com/watch?v=QceCWM6DbWc&embeds_referring_euri=https%3A%2F%2Fembracethered.com%2F)

0:00

0:00 / 0:34

•Live

•

And this one on macOS:

GitHub Copilot: Popping a calculator with Prompt Injection (macOS) - YouTube

[Photo image of Embrace The Red](https://www.youtube.com/channel/UCSwcJXQWE6GWu9IKc0QwO5g?embeds_referring_euri=https%3A%2F%2Fembracethered.com%2F)

Embrace The Red

8.59K subscribers

[GitHub Copilot: Popping a calculator with Prompt Injection (macOS)](https://www.youtube.com/watch?v=IRMbO1l9AK0)

Embrace The Red

Search

Watch later

Share

Copy link

Info

Shopping

Tap to unmute

If playback doesn't begin shortly, try restarting your device.

More videos

## More videos

You're signed out

Videos you watch may be added to the TV's watch history and influence TV recommendations. To avoid this, cancel and sign in to YouTube on your computer.

CancelConfirm

Share

Include playlist

An error occurred while retrieving sharing information. Please try again later.

[Watch on](https://www.youtube.com/watch?v=IRMbO1l9AK0&embeds_referring_euri=https%3A%2F%2Fembracethered.com%2F)

0:00

0:00 / 0:53

•Live

•

### Walkthrough

Here is a longer form video explaining the discovery and exploit in detail:

Episode 12: GitHub Copilot and VS Code - Remote Code Execution (CVE-2025-53773) - YouTube

[Photo image of Embrace The Red](https://www.youtube.com/channel/UCSwcJXQWE6GWu9IKc0QwO5g?embeds_referring_euri=https%3A%2F%2Fembracethered.com%2F)

Embrace The Red

8.59K subscribers

[Episode 12: GitHub Copilot and VS Code - Remote Code Execution (CVE-2025-53773)](https://www.youtube.com/watch?v=8Qzqgqxp5ho)

Embrace The Red

Search

Watch later

Share

Copy link

Info

Shopping

Tap to unmute

If playback doesn't begin shortly, try restarting your device.

More videos

## More videos

You're signed out

Videos you watch may be added to the TV's watch history and influence TV recommendations. To avoid this, cancel and sign in to YouTube on your computer.

CancelConfirm

Share

Include playlist

An error occurred while retrieving sharing information. Please try again later.

[Why am I seeing this?](https://support.google.com/youtube/answer/9004474?hl=en)

[Watch on](https://www.youtube.com/watch?v=8Qzqgqxp5ho&embeds_referring_euri=https%3A%2F%2Fembracethered.com%2F)

0:00

0:00 / 7:50

•Live

•

**AI that can set its own permissions and configuration settings is wild!**

## Joining the Workstation to a Botnet - ZombAIs

Of course, this means we can join the developer’s machine to a botnet as a **ZombAI**.

Also, for fun we can modified the `settings.json` file to switch VS Code into a `Red` color scheme and similar things.

It doesn’t end here though! This also means we can build an actual AI virus that attaches to files and propagates as developers download and interact with infected files.

Last but not least, to demonstrate that we have full control of the developer’s host, we show that Copilot can be hijacked to download malware, and join a remote command and control server.

[![vscode-zombai-deployment](https://embracethered.com/blog/images/2025/github-agent-e2e-zombai.png)](https://embracethered.com/blog/images/2025/github-agent-e2e-zombai.png)

This means the door is open for malware, ransomware, info stealers, etc.

Scary stuff.

## Building an AI Virus

When seeing this, one will notice that this basically allows the creation of a virus. An attacker can embed instructions and once they gain code execution, additional malware can compromise other Git projects (and RAG sources) to embed the malicious instructions, and commit the changes or even force push them upstream.

This can lead to further spread as other developers unknowingly propagate the infected code.

**Finally, we also need to talk about invisible instructions!**

## Using Invisible Instructions

One might say that it would be quickly discovered if instructions are embedded as comments. So in order to make it a bit more interesting, I went ahead and created an invisible payload that achieves the attack chain, but is not visible to users. This was not as reliable, but it still worked:

GitHub Copilot: Invisible Prompt Injection to Remote Code Execution - YouTube

[Photo image of Embrace The Red](https://www.youtube.com/channel/UCSwcJXQWE6GWu9IKc0QwO5g?embeds_referring_euri=https%3A%2F%2Fembracethered.com%2F)

Embrace The Red

8.59K subscribers

[GitHub Copilot: Invisible Prompt Injection to Remote Code Execution](https://www.youtube.com/watch?v=iqW3eL8RpQc)

Embrace The Red

Search

Watch later

Share

Copy link

Info

Shopping

Tap to unmute

If playback doesn't begin shortly, try restarting your device.

More videos

## More videos

You're signed out

Videos you watch may be added to the TV's watch history and influence TV recommendations. To avoid this, cancel and sign in to YouTube on your computer.

CancelConfirm

Share

Include playlist

An error occurred while retrieving sharing information. Please try again later.

[Watch on](https://www.youtube.com/watch?v=iqW3eL8RpQc&embeds_referring_euri=https%3A%2F%2Fembracethered.com%2F)

0:00

0:00 / 0:52

•Live

•

**Note:** Although the demo here with invisible instructions worked multiple times for me, using invisible instructions often leads to the exploit being very unreliable, and is also commonly also refused by the model and there is also typically a visual indicator that VS Code shows about Unicode characters. However, attacks (and models) get better over time. It’s also worth highlighting that not all models are vulnerable to such invisible prompt injection attacks.

## Recommendations and Fix

There are actually more attack angles then just the YOLO mode example I shared. When Microsoft asked me if there is any more info I have, I had looked a bit more and noticed there are other problematic places, for instance `.vscode/tasks.json` that the AI can write to, or adding fake malicious MCP servers, etc which can lead to code execution. And the AI can reconfigure the user interface and configuration settings of the project.

**Recently I noticed that developers often use multiple agents, so there is also the threat of overwriting other agent configuration files (allow-list bash commands, add MCP servers…), as they are commonly in the project folder as well.**

Ideally, the AI would not be able to modify files without a human first approving it. Many other editors do show the diff, which then can be approved by the developer.

## Responsible Disclosure

After reporting the vulnerability on June 29, 2025 Microsoft confirmed the repro and asked a few follow up questions. A few weeks later MSRC pointed out that it is an issue they were already tracking, and that it will be patched by August. With the August Patch Tuesday release this is now fixed.

Shout out to [Markus Vervier](https://x.com/marver) from [Persistent Security](https://persistent-security.net/) who has also identified and reported this vulnerability to Microsoft. You can find their write-up [here](https://www.persistent-security.net/post/part-iii-vscode-copilot-wormable-command-execution-via-prompt-injection). And also a shout out to [Ari Marzuk](https://x.com/Ari_MaccariTA) who seems to also have discovered it in parallel.

Thanks to the members of the MSRC and product team for the help in getting it mitigated.

## Conclusion

This is another example of how an AI agent might not stay in its box! By modifying its own environment GitHub Copilot can escalate privileges and execute code to compromise the developer’s machine. It’s a not uncommon design flaw in agentic systems as I have discovered.

Keep looking out for such design flaws, these should be easily caught during threat modeling.

Cheers.

## References

- [Month of AI Bugs 2025](https://monthofaibugs.com/)
- [Amp Code: Arbitrary Command Execution via Prompt Injection Fixed](https://embracethered.com/blog/posts/2025/amp-agents-that-modify-system-configuration-and-escape/)
- [Copilot Settings](https://code.visualstudio.com/docs/copilot/reference/copilot-settings)
- [CVE-2025-53773: GitHub Copilot and Visual Studio Remote Code Execution Vulnerability](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-53773)
- [Persistent Security Write-Up](https://www.persistent-security.net/post/part-iii-vscode-copilot-wormable-command-execution-via-prompt-injection)
- [Persistent Security](https://persistent-security.net/)

![](https://wuzzi.net/anamato/inc/rts.php?idsite=1&rec=1)
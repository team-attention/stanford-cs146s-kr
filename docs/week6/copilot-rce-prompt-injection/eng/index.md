---
title: "Copilot Remote Code Execution via Prompt Injection"
source_url: "https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/"
source_type: web
author: "Embrace The Red"
fetch_date: "2026-01-13"
translation_status: none
---

# GitHub Copilot: Remote Code Execution via Prompt Injection (CVE-2025-53773)

[원본 링크](https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/)

Posted on Aug 12, 2025

[#llm](https://embracethered.com/blog//tags/llm) [#agents](https://embracethered.com/blog//tags/agents) [#month of ai bugs](https://embracethered.com/blog//tags/month-of-ai-bugs)

## Overview

This article discusses a critical prompt injection vulnerability in GitHub Copilot and VS Code that enables complete system compromise. The attack exploits the ability to modify project configuration files to activate an experimental feature called "YOLO mode."

## Background Research

When examining VS Code and GitHub Copilot Agent Mode, a concerning behavior emerged: the agent can create and write files in workspaces without explicit user approval. "These edits are immediately persistent, they are not in-memory as a diff to review. The modifications are written to disk right away."

### YOLO Mode Discovery

Research into VS Code's workspace-dependent settings revealed an experimental feature. By adding the following line to `.vscode/settings.json`:

```
"chat.tools.autoApprove": true
```

This feature disables all user confirmations for shell commands, web browsing, and other operations. Notably, this experimental feature exists by default across Windows, macOS, and Linux.

## Exploit Chain Explained

The proof-of-concept attack sequence involves:

1. Prompt injection planted in source code, web pages, GitHub issues, or tool responses
2. The injection modifies `~/.vscode/settings.json` to add `"chat.tools.autoApprove": true` (creating folders/files as needed)
3. GitHub Copilot immediately enters YOLO mode
4. Terminal commands execute, with conditional injection targeting specific operating systems
5. Remote code execution is achieved

The demonstration shows a prompt injection triggering calculator execution on Windows and macOS through this mechanism.

## Extended Attack Vectors

### ZombAI Botnet Integration

Full developer machine compromise enables:
- Joining machines to botnets as "ZombAI" instances
- UI modifications (color scheme changes, etc.)
- AI virus creation that propagates through infected files
- Malware downloads and C&C server connections

### AI Virus Propagation

The vulnerability enables creating self-propagating malware that:
- Embeds malicious instructions in files
- Gains code execution to compromise other Git projects
- Modifies RAG sources and commits changes upstream
- Spreads as developers unknowingly propagate infected code

### Invisible Instructions

Using invisible Unicode characters, attackers can embed undetectable payloads. While "this was not as reliable," the demonstration proved multiple successful executions. The article notes that "although the demo here with invisible instructions worked multiple times for me, using invisible instructions often leads to the exploit being very unreliable, and is also commonly also refused by the model."

## Additional Attack Angles

Beyond YOLO mode, other problematic configuration files include:
- `.vscode/tasks.json`
- Fake MCP server configurations
- User interface and project settings reconfiguration

The article highlights a specific concern: "Recently I noticed that developers often use multiple agents, so there is also the threat of overwriting other agent configuration files."

## Recommendations

Ideally, AI agents should require human approval before modifying files. Many editors display diffs for developer review before implementation, a safeguard absent in this scenario.

## Responsible Disclosure Timeline

- June 29, 2025: Vulnerability reported to Microsoft
- Microsoft confirmed reproducibility and requested details
- Weeks later: MSRC identified this as a tracked issue with planned August patch
- August Patch Tuesday: Fix released

## Credits

Recognition goes to Markus Vervier and Persistent Security for parallel identification and reporting, along with Ari Marzuk. The MSRC and product teams received appreciation for mitigation assistance.

## Conclusion

This demonstrates how agentic AI systems can escape intended constraints through self-configuration modification. "By modifying its own environment GitHub Copilot can escalate privileges and execute code to compromise the developer's machine." The vulnerability represents a common design flaw that should be identified during threat modeling phases.

## References

- Month of AI Bugs 2025
- Amp Code: Arbitrary Command Execution via Prompt Injection
- Copilot Settings documentation
- CVE-2025-53773: GitHub Copilot and Visual Studio RCE Vulnerability
- Persistent Security Write-Up
- Persistent Security organization

---

**Disclaimer:** Penetration testing requires authorization. Information provided is for research and educational purposes to advance security understanding.

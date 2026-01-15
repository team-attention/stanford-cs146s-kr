---
title: "Good Context Leads to Good Code: How We Built an AI-Native Eng Culture"
source_url: "https://blog.stockapp.com/good-context-good-code/"
source_type: web
author: "Justin M Berman"
fetch_date: "2026-01-13"
translation_status: none
---

# Good context leads to good code: How we built an AI-Native Eng Culture

[원본 링크](https://blog.stockapp.com/good-context-good-code/)

## TL;DR

Creating StockApp gave us the chance to build an AI-native development culture from scratch. Our experience is that this is materially (~2.5x) more productive than manual development, and considerably more efficient (~2x) than taking an existing development culture and enhancing it with AI. AI-native development isn't about replacing engineers—it's about creating systematic human-AI collaboration through meticulously crafted shared context. To do so, we've had to make some changes:

* Organize all of your code, technical docs and agent guidance in a monorepo. It's the shared human-agent workspace. With agents, docs are just as important as code.
* Start with a high-level design, align with the agent on that and work your way down to the code.
* Use agents everywhere you can as often as you can, but supervise and audit their work and consistently integrate new rules into their guidelines.
* Set up MCP servers and command line tools in your environment in order to give AI the context it needs to act with higher quality and confidence. Share that configuration among your team to increase consistency and quality of outcomes for all.
* Use multiple different agents to review work and approve it before a human reviews it. Human and multi-agent ensembles consistently outperform single agent or agent only approaches.

## Details

StockApp started in January 2025 with a unique opportunity: building an engineering culture designed from day one around AI-native development. Rather than retrofitting AI tools into existing processes, we architected our entire development workflow to leverage human-AI collaboration systematically.

While measuring developer productivity is notoriously difficult, our subjective experience, supported by objective measurements[1], points to productivity gains of roughly 2.5x—significantly beyond what we've experienced elsewhere. Several of us have worked at companies where AI has been partially adopted, and there, the productivity gains due to AI have been in the 30 to 50 percent range. With collective experience from top-tier engineering organizations like Google, we have a firm grasp on what high-performance development looks like, and this is the most productive environment any of us have experienced. Furthermore, the productivity boost is only getting larger as the models improve (witness the release of Claude 4.1 with its improvements in coding performance) and humans and agents learning to work more closely together. The latter is significant: we iterate and experiment a lot with how to work together, and even when we've used the same model, better techniques like those below have boosted productivity measurably.

Our core insight: **Good code is a side effect of good context.** The new AI-native development process is about how humans and agents progressively build and share context together. When done effectively, superior software artifacts naturally emerge.

We want to share our development process in the hope that others will find it useful.

One thing to emphasize is that this approach requires _more_ expertise in software engineering, not less. Defining context effectively is at least as challenging technically as writing good code: you need to consider carefully what the most critical information is, and how the agent will interpret it; two things you don't have to worry about when it's all in your head. Furthermore, the blast radius when agents screw up can be large (misbehaving agents have nuked our dev databases a few times, for example), and when we're using agents, we are usually paying full attention. Agents at their current level of development can definitely lead you down the wrong path, and it requires a vigilant, attentive and experienced eye to stop them.

## The basic development environment

To put our technical decisions in context, it helps to outline the essentials of our development environment. The web front-end is written in TypeScript, and the backend services are split between Python and TypeScript, all maintained in a single monorepo. For day-to-day coding assistance we lean on Claude Code, which most teammates run inside Cursor for real-time autocompletion; Cursor's own built-in AI is seldom used. Although we have tried VS Code, Windsurf, and the Gemini CLI, this configuration has proven to be the most effective for our workflow.

## Five principles we've learned

All five principles stem from one idea: humans and agents must iteratively create, refine, and consume shared context. When that happens, great software emerges and the code itself becomes an intermediate artifact; much as assembly sits between high-level and machine code.

### The repo is the shared workspace for humans and agents

Our repository is organized for machines as well as humans because AI performance depends heavily on accessible context. This is why context engineering now matters more than prompt engineering. It is also why having a monorepo is an important part of our operational process.

Natural language is as critical as programming languages, so we treat English prose with the same care we give TypeScript or Python.

To achieve this, the state of the system must be visible to both humans and agents. We intentionally put more into the repository than a human-only team would, because our repo isn't just for humans; it's for machines, too.

Our document-driven approach treats natural language artifacts as first-class citizens. Key context is stored in:

* **docs/designs/**: Product requirements, high-level goals, and schemas. This is the "why" and "what."
* **docs/plans/**: Detailed, phased implementation plans, often generated jointly by humans and agents. This is the "how."
* **docs/guides/**: Tutorials for APIs and tools, often drafted by an agent after reading relevant documentation.
* **schema.sql**: A single, canonical schema for the entire project, providing ground truth for data structures.
* **README.md & CLAUDE.md**: Placed throughout the repository, these files provide localized instructions for both humans and agents working in specific parts of the codebase.

### Hierarchical development allows progressive building of context

Better context leads to better code, but creating context is non-trivial. We work top-down, with humans and agents collaborating at each level:

1. **Design** – A human supplies key requirements and constraints; the agent drafts a design doc; both iterate and commit it.
2. **Plan** – The agent converts the design into phased tasks; the human reviews and approves.
3. **Implement** – The agent handles most coding; the human reviews the result.
4. **Backstop** – Tests and other safeguards ensure later changes don't erode hard-won context. The most obvious backstop is testing, but this more broadly includes any mechanism that enforces the context we've built.
5. **Review** – Human and agent perform a final review of the feature, ensuring it meets the goals outlined in the original design document.
6. **Update & refine** – Docs, CLAUDE.md files, and schemas are updated so future agents inherit accurate context.

### Use agents for _everything_ unless there's a good reason not to

We use agents for almost every aspect of our work and before we undertake any task, we ask if it could be done with AI. As mentioned above, we rarely – if ever – let agents take the steering wheel unsupervised. We meticulously check what the agents do and recommend before hitting enter. We do not "vibe code". This supervision and checking still requires our deepest technical expertise.

We wanted to enumerate some of the perhaps unconventional ways we use agents:

* Agents are excellent sounding boards for ideas and can help with the more menial aspects of research such as surveying the available libraries for a task.
* Agents write most of our commit and PR messages.
* We instruct agents to update documents rather than editing those documents ourselves when there is enough context. For example, after major code changes the agent and human have built together, there is enough information to update README files, and design docs if there were changes to the design.
* We instruct agents to update the CLAUDE.md files rather than editing them ourselves. It knows how to instruct itself better than we do.
* We do not write prompts. We ask the agent to write them for us taking into account both the context and our "meta prompt."
* We have agents write tests, though we are careful to ensure that the agents don't "overmock" the tests which they have a tendency to do. More importantly, we ask the agents to update the tests after changes. Testing plays an even more important role in AI-native codebases because it is a critical backstop. Since agents literally have limited context (in terms of their context windows), there is a high tendency with agents to solve problems locally that break things globally. Extensive testing has helped us reduce this problem.
* Debugging is a joint activity between human and agent. Usually the human is the one that comes up with the hypothesis of the root cause, and then asks the agent to verify if it is. Agents appear far more competent at verifying hypotheses than coming up with them themselves. In addition, agents are excellent at instrumentation that would be too tedious for a human to do. One of the biggest lessons we've learned is how efficient AI is at debugging complex cross-library problems. We had a particularly gnarly bug where information had to go through four libraries between the LLM and the frontend. We asked the AI to insert debug statements through all the libraries (directly in the Python library directory), analyze the logs, and determine which library contained the bug.
* We instruct agents to look for improvements to make to the code, e.g., finding duplicate code, dead code, security issues, privacy issues, etc. We then ask agents to fix them.
* We rarely do manual merges when we have conflicts. Most of the time merges are relatively simple, and in complex cases, the agents are intelligent enough to stop and ask for guidance.

For every stage of development, we're basically trying to do as much as we can using agents. This level of agent autonomy is not magic; it's a direct result of our systematic investment in creating and maintaining shared context. It's because of the design documents and plans that the AI can write great commit messages and write prompts better than humans can.

### MCP and commands make understanding and augmenting context even easier

We make extensive use of MCP (Model Context Protocol) servers in our system. We also give the AI access to powerful command line options to explore information itself. We have a script called install_mcp.sh that we run when we set up a new repo to install the MCP servers we use. At current count we have about 6 MCP servers we install. These include:

* **Notion and Linear**: This gives us the chance to both get more context for decision making (e.g. reading a feature description in Linear) as well as a way of updating information, e.g. we can say something like "report that the issue we worked on is fixed" and it will update Linear. It's also extremely convenient for creating new issues – so we can use it as a bridge between high level designs in notion and issues in linear with commands like "take the list of tasks at this page and add them to Linear."
* **AWS and SQL Dev databases**: The agents can now directly read these sources of information to get the information they need to debug. For example, they can pull logs for a server from AWS to analyze and they can check that the information stored in the dev database is correct.
* **Git and GitHub commands**: To research previous versions of the code, to look at all the commits that have been submitted to get context, to create PRs, to fix repo challenges. Agents probably have a better understanding of how to manipulate Git than most engineers.

Most exciting is how easy MCP servers make it to "bridge gaps" that would be difficult to do in other ways. For example, you can say things like: read the bug description in Linear, and go through the last 10 commits to identify which one most likely caused the bug.

### Ensembles outperform individuals

If there is one lesson old-school machine learning teaches us, it's that ensembles outperform individuals. There are a variety of techniques like random forests, stacking, bagging and boosting. In all of these techniques you build more than one classifier and then employ some kind of voting mechanism between them. As long as there is sufficient variety in the classifiers, you are likely to see considerably better results from an ensemble than any one individual.

Perhaps the most interesting MCP server we have is the Zen MCP server. This allows Claude Code to also seek feedback from other LLMs like Gemini and o3. We have used this to enhance the performance of our system and we've found that different LLMs have strengths and weaknesses. We use this combined with the development process above, so after Claude Code finishes a design, for example, we will also get it reviewed by Gemini. This diversity helps in many ways, for example, Gemini has shown significantly better results in preemptively identifying security issues. Here's a recent example where we were trying to work out how to implement auth for MCP servers, where o3 and Gemini differed in opinions.

Gemini's Perspective: Strongly recommends payload-based auth as the primary choice, calling it "the most pragmatic and scalable solution" that "strikes the best balance between performance, scalability, and maintainability."

o3's Perspective: More cautious, ranking per-user clients as #1 for production systems, citing security concerns and LLM interference. Rates payload-based auth as #2 but warns about token leakage risks and complexity.

Ultimately, the human and the agents form an ensemble. The bridge that allows this ensemble to perform better than any individual member is shared context. This is why investing in context is the most important part of building an AI-native system.

_We're looking for exceptional engineers to help us push the boundaries of AI-native development and build great products at the intersection of AI and commerce. If you want to define the future of how software is built while creating transformative technology, contact us at careers@stockapp.com._

## Footnotes

¹ **Development Metrics (Q2 2025)**: While developer productivity metrics should be interpreted cautiously, our objective measurements include: 1,098 PRs delivered in 13 weeks (84.5 PRs/week), 10.6 PRs per developer per week vs. ~1 PR/dev/week industry standard (LinearB 2025). But we are in the "build" phase of the project, usually the fastest phase, vs the industry standard "build + maintain" average.

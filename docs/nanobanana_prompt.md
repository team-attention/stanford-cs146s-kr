# Role Definition
You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets. Your goal is to restructure the provided text about "How OpenAI Uses Codex" into a highly visual, structured, and actionable guide for software engineers.

# Source Text
---
title: "How OpenAI Uses Codex"
source_url: "https://cdn.openai.com/pdf/6a2631dc-783e-479b-b1a4-af0cfbd38630/how-openai-uses-codex.pdf"
source_type: pdf
author: "OpenAI"
fetch_date: "2025-01-07"
translation_status: none
---

# How OpenAI Uses Codex

[원본 링크](https://cdn.openai.com/pdf/6a2631dc-783e-479b-b1a4-af0cfbd38630/how-openai-uses-codex.pdf)

---

## Contents

- Introduction
- Use Cases
  - Code understanding
  - Refactoring and migrations
  - Performance optimization
  - Improving test coverage
  - Increasing development velocity
  - Staying in flow
  - Exploration and ideation
- Best Practices
- Looking Ahead

---

## Introduction

Codex is used daily across numerous technical teams at OpenAI like Security, Product Engineering, Frontend, API, Infrastructure, and Performance Engineering. Teams are using it to accelerate a range of engineering tasks, from understanding complex systems and refactoring large codebases to shipping new features and resolving incidents under tight deadlines.

Drawing from interviews with OpenAI engineers and internal usage data, we've compiled use cases and best practices that highlight how Codex helps our teams move faster, improve work quality, and manage complexity at scale.

---

## Use Case 1: Code Understanding

Codex helps our teams get up to speed quickly in unfamiliar parts of the codebase when onboarding, debugging, or investigating an incident.

They often use Codex to locate the core logic of a feature, map out relationships between services or modules, and trace data flow through a system. It also helps surface architecture patterns or missing pieces of documentation that would otherwise require significant manual effort to generate.

During incident response, Codex helps engineers ramp into new areas quickly by surfacing interactions between components or tracing how failure states propagate across systems.

### Anecdotes from our teams

> *"When I fix a bug, I use Ask mode to see where else in the codebase the same issue might appear."*
>
> — Performance Engineer, Retrieval Systems

> *"When I'm on-call, I paste the stack trace and ask Codex where the auth flow lives. It jumps straight to the right files so I can triage fast."*
>
> — Site Reliability Engineer, API Platform

> *"Codex answers my 'Where would I do this?' repo questions across Terraform and Python way faster than grep."*
>
> — DevOps Engineer, Infrastructure Services

### Sample prompts for code understanding:

- Where is the authentication logic implemented in this repo?
- Summarize how requests flow through this service from entrypoint to response.
- Which modules interact with [insert module name] and how are failures handled?

---

## Use Case 2: Refactoring and Migrations

Codex is commonly used to make changes that span multiple files or packages. For example, when engineers are updating an API, changing how a pattern is implemented, or migrating to a new dependency, Codex makes it easy to apply changes consistently.

It's especially useful when the same update needs to be made across dozens of files, or when the update requires awareness of structure and dependencies that aren't easily caught with a regex or find-and-replace.

They're also using it for code cleanup by breaking up oversized modules, replacing old patterns with modern ones, or preparing code for better testability.

### Anecdotes from our teams

> *"Codex swapped every legacy `getUserById()` for our new service pattern and opened the PR. It did in minutes what would've taken hours."*
>
> — Backend Engineer, ChatGPT Web

> *"To clear launch blockers, I have Codex scan for every instance of the old pattern, summarize the impact in Markdown, then open PRs with the fixes."*
>
> — Product Engineer, ChatGPT Enterprise

### Sample prompts for refactoring and migrations:

- Split this file into separate modules by concern and generate tests for each one.
- Convert all callback-based database access to async/await.

---

## Use Case 3: Performance Optimization

Codex is used to identify and address performance bottlenecks.

During tuning or reliability efforts, engineers prompt Codex to analyze slow or memory-intensive code paths, such as inefficient loops, redundant operations, or costly queries and suggest optimized alternatives, often resulting in meaningful gains in efficiency and reliability.

Codex is also used to support code health by identifying risky or deprecated patterns that are still in active use. Our teams lean on it to help reduce long-term tech debt and proactively prevent regressions.

### Anecdotes from our teams

> *"I use Codex to scan for repeated expensive DB calls. It's great at flagging hot paths and drafting batched queries I can later tune."*
>
> — Infrastructure Engineer, API Reliability

> *"Codex is great for spotting performance issues quickly— I save 30 minutes of work by spending 5 minutes on a prompt."*
>
> — Platform Engineer, Model Serving

### Sample prompts for performance optimization:

- Optimize this loop for memory efficiency and explain why your version is faster.
- Find repeated expensive operations in this request handler and suggest caching opportunities.
- Suggest a faster way to batch DB queries in this function.

---

## Use Case 4: Improving Test Coverage

Codex helps engineers write tests faster — especially in places where coverage is thin or completely missing.

When working on a bug fix or refactor, engineers often ask Codex to suggest tests that cover edge cases or likely failure paths. For new code, it can generate unit or integration tests based on the function signature and surrounding logic.

Codex is particularly helpful for identifying boundary conditions like empty inputs, max length, or unusual but valid states that are often missed in initial tests.

### Anecdotes from our teams

> *"I point Codex at low-coverage modules overnight and wake up to runnable unit-test PRs."*
>
> — Frontend Engineer, ChatGPT Desktop

> *"When switching mono-repo branches is painful, I have Codex write the tests and kick-off CI while I keep working on my branch."*
>
> — Backend Engineer, Payments & Billing

### Sample prompts for improving test coverage:

- Write unit tests for this function, including edge cases and failure paths.
- Generate a property-based test for this sorting utility.
- Extend this test file to cover missing scenarios around null inputs and invalid states.

---

## Use Case 5: Increasing Development Velocity

Codex helps teams move faster by accelerating both the start and end of the development cycle.

When kicking off a new feature, engineers use it to scaffold boilerplate — generating folders, modules, and API stubs to get runnable code up quickly without hand-wiring every piece.

As projects approach release, Codex helps meet tight deadlines by handling smaller but essential tasks like triaging bugs, filling in last-mile implementation gaps, and generating rollout scripts, telemetry hooks, or config files.

It's also used to turn product feedback into starter code. Engineers often paste in a user request or spec and have Codex generate a rough draft they can return to and refine later.

### Anecdotes from our teams

> *"I was in meetings all day and still merged 4 PRs because Codex was working in the background."*
>
> — Product Engineer, ChatGPT Enterprise

> *"Codex helped ship 3-4 low-priority fixes perfectly that would've languished in the backlog, which was super empowering."*
>
> — Full-Stack Engineer, Internal Tools

### Sample prompts for increasing development velocity:

- Scaffold a new API route for POST /events with basic validation and logging.
- Generate a telemetry hook for tracking success/failure of the new onboarding flow, using this template [insert example of your telemetry code].
- Create a stub implementation based on this spec: [insert spec or product feedback].

---

## Use Case 6: Staying in Flow

Codex helps our engineers stay productive when their schedules are fragmented and filled with interruptions.

It's used to capture unfinished work, turn notes into working prototypes, or spin off exploratory tasks that can be revisited later. This makes it easier to pause and resume work without losing context, especially when they're on call or have a lot of meetings.

### Anecdotes from our teams

> *"If I spot a drive-by fix, I fire a Codex task instead of swapping branches and review its PR when I'm free."*
>
> — Backend Engineer, ChatGPT API

> *"I routinely forward Slack threads, Datadog traces, issues and more to Codex so I can stay focused on high priority work."*
>
> — API Engineer, Infrastructure Observability

### Sample prompts for staying in flow:

- Generate a plan to refactor this service and split it into smaller modules.
- Stub out the retry logic and add a TODO — I'll fill in the backoff logic later.
- Summarize this file so I can pick up where I left off tomorrow.

---

## Use Case 7: Exploration and Ideation

Codex is also useful for open-ended work like finding alternative solutions or validating design decisions. You can prompt for different ways of solving a problem, explore unfamiliar patterns, or pressure-test assumptions. This helps surface tradeoffs, expand design options, and sharpen implementation choices.

It's also used to identify related bugs. Given a known issue or deprecated method, Codex can identify similar patterns elsewhere in the code, making it easier to catch regressions or finish cleanup work.

### Anecdotes from our teams

> *"Codex helps me solve the cold-start problem — I paste a spec and docs and it scaffolds code or shows me what I forgot."*
>
> — Product Engineer, ChatGPT Desktop

> *"After I fix a bug I ask Codex where similar bugs might lurk, then spin follow-up tasks."*
>
> — Performance Engineer, Retrieval Systems

### Sample prompts for exploration and ideation:

- How would this work if the system were event-driven instead of request/response?
- Find all modules that manually build SQL strings instead of using our query builder.
- Rewrite this in a more functional style, avoid mutation and side effects.

---

## Best Practices

Codex works best when it's given structure, context, and room to iterate. Here are some of the habits OpenAI teams are cultivating to get consistent value out of it in day-to-day work.

### Start with Ask Mode

For large changes, start by prompting Codex for an implementation plan using Ask mode, which then becomes the input for follow-up prompts when you switch to Code Mode. This two-step flow keeps Codex grounded and helps avoid errors in its output. Codex works best with well-scoped tasks that would take you or a teammate about an hour to complete or a few hundred lines of code to implement. As models improve, expect the size of the tasks it can take on to increase.

### Iteratively improve Codex's development environment

Setting a startup script, environment variables, and internet access significantly reduces Codex's error rate. As you run tasks, look for build errors that can be corrected in Codex's environment configuration. This may take a few iterations, but gives significant efficiency gains in the long run.

### Structure your prompt as if you are writing a Github Issue

Codex responds better when prompts mirror how you'd describe a change in a PR or issue. That means including file paths, component names, diffs, and doc snippets when relevant. Prompting with patterns like "Implement this the same way it's done in [module X]" improves results.

### Use the Codex task queue as a lightweight backlog

Fire off tasks to capture tangential ideas, partial work, or incidental fixes. There's no pressure to generate a full PR in one go. Codex works well as a staging area you can return to when you're back in focus.

### Use AGENTS.md to supply persistent context

Maintain an AGENTS.md file to help Codex operate more effectively in your repo across prompts. These files typically include naming conventions, business logic, known quirks, or dependencies Codex can't infer from the code alone.

### Leverage "Best of N" to improve output

The Best-of-N feature lets you simultaneously generate multiple responses for a single task to quickly explore multiple solutions and pick the best one. For more complicated tasks, you can review several iterations and combine parts of different responses to get a stronger result.

---

## Looking Ahead

Codex is still in research preview, but it's already making a real impact in how we build, helping us move faster, write better code, and take on work that would've otherwise never been prioritized.

We're excited by the potential ahead — as our models get better and Codex becomes more deeply integrated into our workflows, we're looking forward to unlocking even more powerful ways to develop software with it. We'll continue to share what we learn along the way.


칼럼 내용을 정리해서, gemini 에게 Cheet sheet 으로 만들게 하고 싶어. 
nano banana 가 구조가 잘 잡히고, 그래프 도형 등 도식이 잘 작성되어 사람이 파악하기 좋게 그리도록 위 내용을 바탕으로 만들어줘

# Output Style: "Nano Banana" Cheat Sheet
Please adhere to the following formatting rules strictly:

1. **Visual Hierarchy & Structure**:
   - Use strict Markdown structure.
   - Use specific emojis for every section header to improve scanning.
   - Use **Bold** for key concepts and commands.
   - Group related information logically.

2. **Diagrams & Schematics (CRITICAL)**:
   - Use `mermaid` code blocks to visualize concepts.
   - Create a **Mind Map** for the overall structure of Use Cases.
   - Create a **Flowchart** for the "Best Practices" workflow.
   - Ensure diagrams are complex enough to be informative but simple enough to be read at a glance.

3. **Tabular Data**:
   - Convert the "Use Cases" section into a comprehensive Markdown Table.
   - Columns should be: [Use Case Context] | [Key Benefit] | [Example Scenario] | [Sample Prompt].

4. **Actionable Content**:
   - Extract "Sample prompts" into separate code blocks for easy copying.
   - Summarize "Best Practices" into a Checklist format (e.g., `[ ]`).

# Output Structure Plan

## 1. 🧠 Executive Summary (Mind Map)
- Create a Mermaid mindmap showing the 7 core Use Cases and their primary value props.

## 2. 🛠️ Engineering Use Case Matrix (The Core)
- A detailed table summarizing Use Cases 1 through 7.
- Focus on the "Problem -> Solution" dynamic.

## 3. 💡 Best Practices Workflow (Flowchart)
- A Mermaid flowchart connecting: Ask Mode -> Context Setup -> Github Issue Style Prompting -> Task Queue -> Review (Best of N).

## 4. ⚡ Quick Reference: Golden Prompts
- List the most high-impact sample prompts from the text, categorized by function, inside code blocks.

## 5. 🔮 Future Outlook
- A 1-sentence punchline about the future of Codex based on the text.

---
Please generate the Cheat Sheet now.


내가 말하는 cheet sheet 는 보기 좋게 정리된, 실제 펜 노트필기 같은 이미지를 말하는거야. 용어 및 고유명사는 영어 원문을 쓰되, 필기 내용은 한국어로 작성해.

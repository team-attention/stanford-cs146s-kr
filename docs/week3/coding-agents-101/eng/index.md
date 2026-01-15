---
title: "Devin: Coding Agents 101"
source_url: "https://devin.ai/agents101"
source_type: web
author: "Cognition (Devin)"
fetch_date: "2026-01-13"
translation_status: none
---

# Coding Agents 101: The Art of Actually Getting Things Done

[원본 링크](https://devin.ai/agents101)

The guide opens by noting that "Coding agents aren't magic, but they're about the closest thing we have." Written by the Cognition Team in June 2025, it's a 15-minute read offering product-agnostic, tactical, and technical advice for engineers adopting autonomous agents.

The document explains that developer tooling has evolved from autocomplete (10 years ago) through copilots (4 years ago) and generative chatbots (2 years ago) to today's autonomous agents capable of handling tasks "from initial descriptions to final pull requests with little human intervention."

## Prompting Basics

### Say *How* You Want Things Done, Not Just What

The guidance recommends treating agents like junior coding partners with unreliable decision-making. For complex tasks, outline your preferred approach upfront. This improves success rates and reduces review time since you'll already understand the intended method.

**Example provided:** Rather than requesting "add unit tests," specify which functionality needs testing, identify important edge cases, and clarify mocking requirements.

### Tell the Agent Where to Start

Consider where you'd personally begin. Even without specific file names, mention the repository, relevant documentation, and key components involved to minimize wasted effort.

**Example:** "Please add support for Google models to our code. You should look at the latest docs [here] and create a new implementation file in the model groups directory."

### Practice Defensive Prompting

Anticipate confusion points as though explaining to a new intern, then clarify proactively to avoid ambiguity.

**Example:** "Please fix the C++ bindings for our search module to pass the new unit tests. Be careful, you will probably need to recompile the bindings each time you change the code before you test."

### Give Access to CI, Tests, Types, and Linters

Agents improve dramatically with strong feedback loops. Use type checkers, linters, and unit tests. Prefer typed Python over untyped Python, TypeScript over JavaScript. Teach agents how to run common checks and provide necessary access.

### Leverage Your Expertise

Human oversight remains essential—you hold responsibility for code correctness. "Ownership and verification will continue to be critical responsibilities for human engineers, even as these tools become increasingly sophisticated."

## Using Agents in Your Workflow

### Take On New Tasks Immediately

Instead of letting requests interrupt your focus, delegate to an autonomous agent to investigate or implement changes, freeing you to concentrate on primary work.

**Example:** Teams tag @Devin on Slack when discussing bug fixes or minor updates.

### Code On the Go

Mobile access through Slack apps or dedicated applications allows addressing urgent issues while commuting or traveling.

### Hand Off Your Chores

Delegate repetitive tasks like bisecting commits or updating documentation, preserving time for creative work.

**Example:** Engineers ship changes, then have agents update relevant documentation and user-facing copy.

### Skip the Analysis Paralysis

When deciding between architectural approaches, have the agent implement multiple options. Concrete examples enable straightforward decision-making without hurt feelings over rejected solutions.

**Example:** When choosing between text editor libraries, agents implemented both options to compare outcomes.

### Set Up Preview Deployments

Configure CI/CD pipelines to automatically create preview deployments with each PR, providing instant live URLs particularly useful for frontend tasks.

## Delegating Larger Tickets

This section addresses medium-to-large tasks (typically 1-6 hours of work) where autonomous agents provide highest ROI by reclaiming hours rather than minutes.

### Automate Your First Drafts

For substantial tasks, use agents to create initial PR drafts. Success depends on clearly communicating your desired approach upfront, functioning as an architect guiding junior developers.

The guide presents an analogy across domains:
- **Journalism:** Journalist collects information and writes first draft; editor reviews, fact-checks, and finalizes
- **Restaurant:** Line cooks prep ingredients and make preliminary dishes; sous chef seasons and adjusts
- **Coding:** Autonomous agents start tasks based on initial plans and create draft solutions; human developers review, provide feedback, and add refinements

The realistic expectation is approximately 80% time savings, not complete automation, with human expertise remaining vital for verification and final quality assurance.

### Co-develop a PRD

For complex or vaguely defined tasks, collaborate with agents to create detailed plans. Start by prompting agents to explore discovery questions like "How does our authentication system function?" or "Which services might be impacted?"

Certain agents offer dedicated planning modes focusing on reading and exploring existing code. Specialized codebase search tools can quickly provide insights.

### Set Checkpoints

For multi-part tasks across multiple codebases, establish clear checkpoints:
Plan → Implement chunk → Test → Fix → Checkpoint review → Next chunk

Request explicit pauses after significant phases, particularly for complex features spanning multiple layers (database, backend, frontend).

**Example:** "I want you to implement this feature spanning our database, backend, and multiple frontend interfaces. Please first plan out the database schema changes needed, and let me know when that is done so I can apply the migration..." followed by sequential requests for backend changes and frontend implementation.

### Teach It to Verify Its Own Work

When providing feedback, articulate your testing process to enable the agent to independently verify future tasks. Integrate frequently-repeated testing patterns into the agent's permanent knowledge base.

### Increase Test Coverage in AI Hot Spots

Since agents aren't fully capable of interactively testing all scenarios thoroughly, enhance test coverage in heavily modified areas to ensure greater confidence.

**Example:** A team strengthened unit tests in critical sections before having AI translate implementation from Python to C.

## Automating Workflows

### Create Shortcuts for Most Repetitive Work

Engineering teams encounter routine tasks perfect for automation:
- Feature flag removal
- Dependency upgrades
- Fixing and adding tests on new feature PRs

An experienced engineer creates robust, reusable prompt templates that run repeatedly for these scenarios.

**Example:** One customer automatically triggers three agents dedicated to writing unit tests whenever new features are developed.

### Intelligent Code Review & Enforcement

Autonomous agents can deliver more accurate insights than specialized tools, particularly when they've indexed repository functionality.

**Example:** The Cognition team maintains a list of common engineer mistakes committed to the codebase, then runs agents on every PR to check for these issues.

### Hook Into Incidents and Alerts

Set up agents to trigger automatically in response to specific events through accessible APIs or CLI commands, especially alongside MCPs for ingesting third-party error logs.

**Important note:** AI debugging skills for production services remain limited. Rather than asking AI to fix bugs end-to-end, ask it to flag the most suspicious errors and changes.

## Customization & Improving Performance

### Environment Setup

Align the agent's setup exactly with your team's, including language versions, package dependencies, and automated checks. Pre-commit should be installed, and environment configurations (secrets, language versions, virtual environments, browser logins) should be sourced automatically.

**Example:** Pre-authenticate browser logins to remove manual authentication hassle during testing.

### Build Custom CLI Tools and MCPs

MCPs are quick to set up and experiment with for connecting agents to external tools. However, simple CLI scripts are often overlooked. Consider scripts that pull Linear ticket information or perform reliable workflow parts like restarting development environments.

**Example:** A customer created a CLI tool surfacing only the first failing test, prompting the agent to focus with detailed error information, resulting in higher success and faster completion rates.

### Add to Your Agent's Knowledge Base

When agents make common mistakes, codify feedback in their knowledge base. Don't just provide framework guidelines—include overall project architecture, testing approaches for different task types, important commands, and tool recommendations.

**Example:** Providing detailed procedures for adding new service routes, including every boilerplate location in frontend and backend, enables easy delegation.

## Practical Considerations

### Limitations of Autonomous Agents

**Limited Debugging Skills:** Many bugs require database and log access plus debugging expertise beyond current AI agents. Request probable root causes lists rather than complete debugging. Once the cause is known, agents effectively implement fixes.

**Poor Fine-Grained Visual Reasoning:** Current models lack visual reasoning precision for matching design screenshots or Figma mockups. They work most reliably with code-level visuals. Use good design systems with reusable components for visual consistency.

**Knowledge Cutoffs:** When working with new libraries, explicitly point agents to latest documentation. Most agents assume old patterns due to knowledge cutoffs in pretrained models.

### Managing Time and Minimizing Losses

With variance in agent outcomes in 2025, maximizing successful outcomes while minimizing wasted time and tokens matters.

**Be Willing to Cut Losses Earlier:** New users often commit to making interactions successful even when agents veer off track. If an agent ignores instructions or goes in circles, discontinue or manually take over. Additional messages typically indicate task complexity exceeding agent capabilities rather than simple correctable mistakes.

**Diversify Your Experiments:** Try various prompts and approaches. Double down on tasks agents naturally perform well on; cut losses on unsuccessful types.

**Start Fresh When Not Making Progress:** Starting over with a new agent and all instructions upfront often succeeds faster than correcting a messed-up environment. Agents' ability to correct problems is worse than their ability to produce fresh code from scratch.

### Security and Permissioning

**Create Accounts for Your Agent:** Use throwaway emails for safe site testing. Create custom IAM roles if accessing cloud resources.

**Give It a Development/Staging Environment:** Agents should use the same testing setup as team engineers, with production access avoided entirely. Remote agents can run fully isolated test environments.

**Readonly API Keys:** Where possible, provide readonly access. Recommend humans manually run scripts interacting with outside services.

## Conclusion: Big Changes Ahead

The guide concludes that software engineers remain essential. "Even as coding agents become smarter and more capable, deep technical expertise and intimate knowledge of your codebase remain invaluable." True ownership of projects and systems becomes more critical as automation amplifies impact.

Engineers are increasingly expected to oversee multiple systems while maintaining deep understanding and thoughtful judgment. As automation enables parallel task juggling, this capability becomes essential rather than optional. The Cognition Team shares these insights to help teams thrive in evolving software development.

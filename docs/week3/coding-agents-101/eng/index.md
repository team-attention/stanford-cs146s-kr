---
title: "Devin: Coding Agents 101"
source_url: "https://devin.ai/agents101"
source_type: web
author: "Cognition (Devin)"
fetch_date: "2026-01-12"
translation_status: none
---

# Coding Agents 101: The Art of Actually Getting Things Done

[원본 링크](https://devin.ai/agents101)

## Introduction

The guide presents itself as "product-agnostic," "tactical," and "technical" in nature, aimed at engineers seeking to work effectively with coding agents in 2025. It draws lessons from customer experiences and the Cognition team's own work developing Devin.

## Getting Started: Prompting Basics

### Say _how_ you want things done, not just what

Rather than generic requests, provide detailed methodology. As the guide explains, treat the agent "as a junior coding partner whose decision-making can be unreliable."

**Example:** Instead of requesting unit tests generally, specify functionality to test, identify edge cases, and clarify mocking requirements.

### Tell the agent where to start

Indicate the repository, relevant documentation, and key components involved. This minimizes wasted effort.

**Example:** "Look at the latest docs [here] and create a new implementation file in the model groups directory."

### Practice defensive prompting

Anticipate confusion points as you would with a new intern and proactively clarify instructions.

**Example:** "Be careful, you will probably need to recompile the bindings each time you change the code before you test."

### Give access to CI, tests, types, and linters

Strong feedback loops through testing tools and type checkers enhance agent performance. The guide notes the team transitioned "from mostly untyped Python SDKs to exclusively typed SDKs."

### Leverage your expertise

Human oversight remains essential—"ultimately, you hold responsibility for the final correctness of the code."

## Using Agents in Your Workflow

### Take on new tasks immediately

Delegate quick investigations or changes to keep focused on primary work. Many teams "simply tag @Devin on Slack when discussing bug fixes or minor feature updates."

### Code on the go

Mobile access enables addressing urgent issues during travel or commutes.

### Hand off your chores

Delegate repetitive tasks like bisecting commits or updating documentation.

### Skip the analysis paralysis

Have agents implement multiple architectural approaches to enable concrete comparison.

### Set up preview deployments

Configure CI/CD pipelines to automatically create preview deployments with each PR.

## Intermediate: Delegating Larger Tickets

### Automate your first drafts

For substantial tasks, agents can create initial PR drafts. The guide provides an analogy: "Autonomous agents get started on tasks based on initial plans and creating first draft solutions."

A realistic expectation is "around 80% time savings, not complete automation."

### Co-develop a PRD

For complex or vaguely defined tasks, collaborate with agents on detailed planning. Agents can explore discovery questions like "How does our authentication system function?"

### Set checkpoints

For multi-part tasks, establish clear pauses: "Plan → Implement chunk → Test → Fix → Checkpoint review → Next chunk."

### Teach it to verify its own work

Articulate testing processes so agents can independently verify future tasks.

### Increase test coverage in AI hot spots

Strengthen tests in heavily modified areas before delegating critical translations or refactors.

## Advanced: Automating Workflows

### Create Shortcuts for Repetitive Work

Common automation candidates include feature flag removal, dependency upgrades, and test creation on feature PRs.

### Intelligent Code Review & Enforcement

Agents can check for common mistakes more accurately than classical lint rules in some cases.

### Hook into incidents and alerts

Agents can trigger automatically via API or CLI integration. However, the guide cautions that "AI's debugging skills are not that great" for production issues—flag suspicious errors rather than attempting end-to-end fixes.

## Customization & Improving Performance

### Environment Setup

Align agent environments exactly with team configurations, including language versions, dependencies, and pre-configured authentications.

### Build Custom CLI Tools and MCPs

Create scripts for recurring workflows like pulling Linear ticket information or restarting development environments.

### Add to your agent's knowledge base

Codify feedback about framework-specific patterns, project architecture, testing conventions, and recommended tools.

## Practical Considerations

### Limitations of Autonomous Agents

**Limited debugging skills:** Request probable root causes rather than expecting complete fixes.

**Poor fine-grained visual reasoning:** Use design systems with reusable components rather than expecting pixel-perfect Figma mockup matching.

**Knowledge Cutoffs:** "Explicitly point it to the latest docs" for new libraries, as agents rely on pretrained knowledge.

### Managing Time and Minimizing Losses

**Cut losses earlier:** Discontinue interactions showing signs of fundamental misunderstanding.

**Diversify experiments:** Try different prompts and double down on successful task categories.

**Start fresh:** "Starting over is the right answer a lot more often with agents than with humans" when stuck.

### Security and Permissioning

- Create dedicated agent accounts with throwaway emails
- Provide development/staging environments only
- Grant readonly API access where possible
- Have humans manually run scripts interacting with external services

## Conclusion

The guide emphasizes that "software engineers aren't going anywhere," despite advancing capabilities. "True ownership of your projects, your systems, and your code is more critical now than ever," even as automation amplifies individual impact and enables parallel task management.

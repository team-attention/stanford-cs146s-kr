---
title: "Good Context Leads to Good Code: How StockApp Built an AI-Native Engineering Culture"
source_url: "https://blog.stockapp.com/good-context-good-code/"
source_type: web
author: "Justin M Berman"
fetch_date: "2026-01-12"
translation_status: none
---

# Good Context Leads to Good Code: How StockApp Built an AI-Native Engineering Culture

[원본 링크](https://blog.stockapp.com/good-context-good-code/)

**Author:** Justin M Berman (with contributions from Waleed Kadous, Charles Feng, Dennis Yilmaz, Amr Elsayed, Mohammed Mogasbe, James Feng, Bruno Fantauzzi)

**Date:** August 5, 2025 | 9 min read

---

## Overview

StockApp's engineering team designed their development process from scratch around AI collaboration rather than retrofitting AI into existing workflows. Their findings suggest this approach yields approximately 2.5x productivity gains compared to manual development and roughly 2x improvements over partially AI-enhanced traditional cultures.

The core principle: superior software emerges when humans and AI agents systematically build and share context together.

---

## Five Core Principles

### 1. The Monorepo as Shared Workspace

The repository serves both humans and machines. Unlike traditional codebases, StockApp treats documentation with the same rigor as code itself. Key organizational elements include:

- **docs/designs/**: Product requirements and schemas (the "why" and "what")
- **docs/plans/**: Implementation phases, often co-created by humans and agents (the "how")
- **docs/guides/**: API and tool tutorials
- **schema.sql**: Single source of truth for data structures
- **README.md & CLAUDE.md**: Localized instructions throughout the codebase

The team emphasizes that "natural language is as critical as programming languages."

### 2. Hierarchical Development with Progressive Context

Development follows a top-down approach:

1. Design phase—humans provide requirements; agents draft docs; teams iterate
2. Planning—agents convert designs into phased tasks for human review
3. Implementation—agents handle most coding with human oversight
4. Backstopping—tests and safeguards prevent context erosion
5. Review—final verification against original design goals
6. Refinement—documentation and schemas updated for future reference

### 3. Pervasive Agent Usage

The team employs agents for nearly every task before considering manual alternatives. Unconventional applications include:

- **Writing commit and PR messages**
- **Updating documentation** after code changes
- **Crafting CLAUDE.md instructions** (agents provide better self-direction than humans)
- **Generating test cases** while avoiding over-mocking
- **Joint debugging** where humans hypothesize root causes and agents verify
- **Code quality improvements** like identifying duplicate/dead code and security issues
- **Git and merge conflict resolution**

As the article notes, "this level of agent autonomy is not magic; it's a direct result of systematic investment in creating and maintaining shared context."

### 4. MCP Servers and Command-Line Integration

The team leverages approximately 6 Model Context Protocol servers:

- **Notion and Linear**: Access feature descriptions and update project status
- **AWS and SQL databases**: Direct log analysis and data verification
- **Git and GitHub**: Historical code research and PR management

The Zen MCP server notably allows Claude Code to request feedback from competing models like Gemini and o3, enabling cross-model comparison.

### 5. Ensemble Approaches Trump Individual Agents

Drawing from machine learning principles (random forests, bagging, boosting), the team employs multiple agents in review cycles before human approval. Different models demonstrate varying strengths—Gemini excels at security issue identification, while o3 provides production-focused perspectives.

The ensemble includes the human, creating collaborative decision-making superior to any single participant.

---

## Development Metrics

In Q2 2025, StockApp delivered:
- 1,098 PRs across 13 weeks (84.5 weekly average)
- 10.6 PRs per developer weekly versus industry standard of ~1 PR/dev/week
- *Note: These metrics reflect the "build" phase rather than "build + maintain" typical of industry averages*

---

## Critical Insight

The article emphasizes that effective AI-native development requires *more* engineering expertise, not less. Defining context demands careful consideration of what information matters and how agents interpret it—challenges absent when knowledge remains internal. Additionally, agent failures can carry significant blast radius, requiring vigilant, experienced oversight rather than autonomous operation.

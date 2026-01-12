---
title: "Writing Effective Tools for Agents"
source_url: "https://www.anthropic.com/engineering/writing-tools-for-agents"
source_type: web
author: "Ken Aizawa"
fetch_date: "2026-01-12"
translation_status: none
---

# Writing Effective Tools for Agents — with Agents

[원본 링크](https://www.anthropic.com/engineering/writing-tools-for-agents)

**Published:** September 11, 2025

**Author:** Ken Aizawa

## Summary

This engineering article explores best practices for building high-quality tools for AI agents, demonstrating how Claude itself can optimize tools through iterative evaluation and improvement.

## What is a tool?

Tools represent a new software paradigm—contracts between deterministic systems and non-deterministic agents. Unlike traditional APIs where `getWeather("NYC")` always behaves identically, agents might call weather tools, use general knowledge, or ask clarifying questions. This unpredictability necessitates rethinking tool design specifically for agent affordances rather than traditional software patterns.

## How to write tools

### Building a prototype

Start with quick prototypes using Claude Code. Provide documentation for libraries and APIs your tools depend on. Wrap tools in local MCP servers or Desktop extensions to test them interactively in Claude Code or the Claude Desktop app.

Connect local MCP servers to Claude Code with:
```
claude mcp add <name> <command> [args...]
```

Test tools personally and gather user feedback on expected use cases.

### Running an evaluation

Create realistic evaluation tasks requiring multiple tool calls:
- Schedule a meeting with Jane discussing the Acme Corp project, attach planning notes, reserve a conference room
- Find all log entries for customer ID 9182 who was charged three times; determine if others were affected
- Process Sarah Chen's cancellation request by determining why they're leaving and suggesting retention offers

Use simple agentic loops with programmatic LLM API calls. Instruct agents to output reasoning before tool calls to trigger chain-of-thought behaviors. Collect metrics including accuracy, runtime, token consumption, and tool errors.

### Analyzing results and collaborating with agents

Review evaluation transcripts to identify where agents struggle. Analyze tool-calling patterns to spot inefficiencies. Concatenate transcripts and paste into Claude Code to have agents analyze results and suggest improvements automatically.

## Principles for writing effective tools

### Choosing the right tools

More tools don't always improve outcomes. Agents have distinct affordances from traditional software—they have limited context while computer memory is abundant. Rather than implementing `list_contacts`, create a `search_contacts` tool matching how humans search.

Tools can consolidate multiple operations:
- Instead of `list_users`, `list_events`, `create_event`, implement `schedule_event` finding availability
- Instead of `read_logs`, implement `search_logs` returning relevant lines with context
- Instead of separate customer tools, implement `get_customer_context` compiling all relevant information

### Namespacing your tools

Group related tools under common prefixes like `asana_projects_search` and `asana_users_search` to help agents select appropriate tools. Prefix- versus suffix-based naming produces measurable evaluation differences.

### Returning meaningful context

Return only high-signal information prioritizing relevance over flexibility. Avoid low-level identifiers like `uuid` and `mime_type` in favor of `name`, `image_url`, and `file_type`. Semantic identifiers significantly reduce hallucinations.

Expose a `response_format` enum parameter allowing agents to control verbosity:
```
enum ResponseFormat {
   DETAILED = "detailed",
   CONCISE = "concise"
}
```

Detailed responses include IDs for downstream calls; concise responses minimize token usage (~⅓ of detailed).

### Optimizing tool responses for token efficiency

Implement pagination, range selection, filtering, and truncation with sensible defaults. Claude Code restricts tool responses to 25,000 tokens by default.

When truncating, guide agents toward efficient strategies. Transform unhelpful error messages into actionable guidance showing correct input formats.

### Prompt-engineering tool descriptions

Describe tools as you would to a new team member, making implicit context explicit. Use unambiguous parameter names: `user_id` instead of `user`. Small refinements yield dramatic improvements—Claude Sonnet achieved state-of-the-art performance on SWE-bench Verified after precise tool description refinements.

## Looking ahead

Effective tools are intentionally defined, use agent context judiciously, combine well in diverse workflows, and enable intuitive real-world problem solving. As agents become more capable, systematic evaluation-driven approaches ensure tools evolve alongside them.

---

**Acknowledgments:** Written by Ken Aizawa with contributions from Research, MCP, Product Engineering, Marketing, Design, and Applied AI teams at Anthropic.

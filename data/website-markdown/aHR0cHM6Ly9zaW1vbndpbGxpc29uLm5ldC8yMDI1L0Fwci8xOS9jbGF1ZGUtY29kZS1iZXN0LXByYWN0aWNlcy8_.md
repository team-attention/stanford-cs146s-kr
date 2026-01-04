# Claude Code: Best practices for agentic coding

**URL:** https://simonwillison.net/2025/Apr/19/claude-code-best-practices/

**Author:** Simon Willison
**Date:** 19th April 2025

---

## Main Content

Anthropic released comprehensive documentation on optimizing results with Claude Code, their CLI coding agent tool. A particularly intriguing recommendation involves using specific trigger words to activate extended thinking mode, which allocates additional computational resources for Claude to evaluate alternatives more thoroughly.

The documentation identifies a hierarchical system of thinking triggers:

- **"think"** activates the base thinking mode
- **"think hard"** increases the allocation
- **"think harder"** increases it further
- **"ultrathink"** provides the maximum budget

## Technical Discovery

Willison investigated whether this was a Claude model feature or Claude Code-specific functionality. By extracting and reformatting the Claude Code JavaScript using Prettier, he identified the implementation logic.

The code reveals token allocations for different trigger phrases:

| Trigger Phrase | Token Allocation |
|----------------|------------------|
| "ultrathink" and similar intensive phrases | 31,999 tokens |
| "megathink" and moderate phrases | 10,000 tokens |
| Plain "think" | 4,000 tokens |

This appears to be a Claude Code-specific feature directly controlling the extended thinking token budget, with "ultrathink" confirmed as the maximum-power keyword option.

## Key Takeaways

1. **Extended thinking triggers are hierarchical** - Different keywords unlock different levels of computational budget
2. **"ultrathink" is the maximum** - Allocates 31,999 tokens for deepest reasoning
3. **This is Claude Code-specific** - Not a general Claude model feature, but implemented in the CLI tool
4. **Useful for complex tasks** - When you need Claude to think more deeply about alternatives, use stronger trigger words

---

**Tags:** cli, ai, generative-ai, llms, ai-assisted-programming, anthropic, claude, llm-reasoning, coding-agents, claude-code

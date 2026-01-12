---
title: "Claude Code: Best Practices for Agentic Coding"
source_url: "https://www.anthropic.com/engineering/claude-code-best-practices"
source_type: web
author: "Anthropic"
fetch_date: "2026-01-12"
translation_status: none
---

# Claude Code: Best Practices for Agentic Coding

[원본 링크](https://www.anthropic.com/engineering/claude-code-best-practices)

**Published:** April 18, 2025

## Overview

This comprehensive guide covers proven techniques for using Claude Code, Anthropic's command-line tool for agentic coding, across various projects and environments.

## 1. Customize Your Setup

### CLAUDE.md Files

Create special configuration files that Claude automatically incorporates into context. These should document:

- Bash commands
- Code style guidelines
- Testing instructions
- Repository conventions
- Developer environment setup

The files can be placed at:
- Project root
- Parent/child directories
- Home folder (`~/.claude/CLAUDE.md`)

### Tuning Configuration

Treat CLAUDE.md files as prompts requiring iteration. Test effectiveness and refine instructions. Use the `#` key to have Claude automatically update these files based on conversation context.

### Tool Permissions

Manage the allowlist of permitted tools through:
- "Always allow" prompts
- The `/permissions` command
- Manual JSON editing
- CLI flags like `--allowedTools`

## 2. Expand Tool Access

### Bash Tools

Document custom tools with usage examples in your CLAUDE.md files.

### MCP Servers

Connect through:
- Project config
- Global config
- `.mcp.json` files

### Custom Slash Commands

Store templates in `.claude/commands/` folders with `$ARGUMENTS` for parameters.

## 3. Common Workflows

### Explore, Plan, Code, Commit

This versatile pattern involves:
1. Reading relevant files first
2. Creating a detailed plan (using "think" for extended thinking)
3. Implementing the solution
4. Committing the changes

### Test-Driven Development

1. Write tests first based on expected inputs/outputs
2. Verify tests fail
3. Commit the tests
4. Implement code to pass tests iteratively

### Visual Iteration

1. Provide design mocks or screenshots
2. Have Claude implement code
3. Take screenshots to compare
4. Iterate until results match

### Safe YOLO Mode

Use `--dangerously-skip-permissions` in isolated containers for uninterrupted work on tasks like:
- Linting fixes
- Boilerplate generation

## 4. Optimization Techniques

### Specificity Matters

Detailed instructions significantly improve first-attempt success rates.

### Visual Communication

Leverage:
- Screenshots
- Drag-and-drop images
- File paths for design references and debugging

### Course Correction

- Use planning steps
- Press Escape to interrupt
- Double-tap Escape to revisit previous directions
- Use the `/clear` command for focused context

### Checklists and Scratchpads

For complex migrations or numerous fixes, use Markdown files as working checklists.

### Data Input Methods

- Copy-paste content
- Pipe data via stdin
- Instruct Claude to pull data via tools
- Provide file paths and URLs

## 5. Headless Mode Automation

Use `-p` flag with prompts for:
- CI/CD
- Pre-commit hooks
- Automated workflows

### Key Patterns

**Fanning out:** Generate task lists and process items programmatically

**Pipelining:** Integrate Claude into existing data processing workflows with `--output-format stream-json`

## 6. Multi-Claude Workflows

### Separation of Concerns

Have one Claude write code while another reviews it, or use separate instances for independent tasks.

### Git Worktrees

Run simultaneous sessions on different branches without merge conflicts using `git worktree` commands.

### Programmatic Integration

Use headless mode with custom harnesses for:
- Large-scale code transformations
- Data processing

## Practical Applications

The guide includes examples for:

- **Codebase Q&A and onboarding** - Quickly understand new codebases
- **Git history exploration** - Analyze commit history and generate commit messages
- **GitHub interactions** - PRs, issue triage, code review automation
- **Jupyter notebook refinement** - Improve and document notebooks
- **Issue triage automation** - Automatically categorize and prioritize issues
- **Subjective code reviews** - Beyond traditional linting

## Conclusion

These patterns represent community-validated approaches rather than rigid requirements. Experimentation and customization based on individual workflows yield the best results.

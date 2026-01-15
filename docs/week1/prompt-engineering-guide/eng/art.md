---
title: "Automatic Reasoning and Tool-use"
source_url: "https://www.promptingguide.ai/techniques/art"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Automatic Reasoning and Tool-use (ART)

## Overview

ART is a framework that merges chain-of-thought prompting with tool integration in an interleaved fashion. According to the research, it uses "a frozen LLM to automatically generate intermediate reasoning steps as a program."

## How ART Works

The methodology follows these steps:

1. **Selection**: When encountering a new task, the system retrieves relevant multi-step reasoning and tool-use examples from a task library
2. **Execution**: During testing, generation pauses when external tools need to be called
3. **Integration**: Tool outputs are incorporated, then generation resumes

This approach enables models to generalize from examples and decompose unfamiliar tasks while knowing when to leverage appropriate tools—all without requiring task-specific training.

## Key Advantages

- **Extensibility**: Humans can refine reasoning steps or introduce new tools by updating libraries
- **Performance**: ART substantially outperforms few-shot prompting and automatic chain-of-thought on previously unseen BigBench and MMLU tasks
- **Flexibility**: When incorporating human feedback, it surpasses hand-crafted chain-of-thought prompts

## Source

The framework was introduced by Paranjape et al. (2023) and represents a significant advancement in combining reasoning and tool integration for complex problem-solving with language models.

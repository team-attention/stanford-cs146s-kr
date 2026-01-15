---
title: "Reflexion"
source_url: "https://www.promptingguide.ai/techniques/reflexion"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Reflexion

## Overview

Reflexion is a framework designed to enhance language-based agents through linguistic feedback. According to the research, it "parameterizes a policy as an agent's memory encoding paired with a choice of LLM parameters."

The core mechanism converts environmental feedback into linguistic self-reflection, which becomes context for subsequent agent iterations. This approach helps agents learn from mistakes and improve performance on complex tasks.

## Framework Components

The Reflexion system consists of three distinct models:

**Actor**: Generates text and actions based on observations, using Chain-of-Thought and ReAct methodologies. It includes memory components providing additional context to enhance decision-making.

**Evaluator**: Scores the Actor's outputs by analyzing trajectories and generating reward scores. Task-dependent reward functions employ both LLMs and rule-based heuristics.

**Self-Reflection**: An LLM-based component generating verbal reinforcement cues. It leverages reward signals, current trajectories, and persistent memory to provide targeted feedback for improvement.

## Process Flow

The methodology follows these steps: define task → generate trajectory → evaluate → reflect → generate next trajectory.

## Performance Results

Research demonstrates significant improvements across multiple domains:

- **Decision-making**: ReAct + Reflexion completed 130/134 AlfWorld tasks
- **Reasoning**: Outperformed baseline approaches on HotPotQA
- **Programming**: State-of-the-art results on HumanEval, MBPP, and Leetcode Hard benchmarks

## Ideal Use Cases

Reflexion works best when:

- Agents must learn from trial-and-error experiences
- Traditional reinforcement learning proves impractical
- Nuanced, interpretable feedback is essential
- Explicit episodic memory benefits the task

## Limitations

- Depends on accurate self-evaluation capabilities
- Memory constraints from sliding window architecture
- Challenges with code generation involving non-deterministic functions

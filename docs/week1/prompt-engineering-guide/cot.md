---
title: "Chain-of-Thought Prompting"
source_url: "https://www.promptingguide.ai/techniques/cot"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Chain-of-Thought Prompting

## Definition and Overview

Chain-of-thought (CoT) prompting enables complex reasoning capabilities through intermediate reasoning steps. Introduced by Wei et al. (2022), this technique allows LLMs to work through multi-step problems by showing their reasoning process rather than jumping directly to answers.

## Core Concept

CoT prompting works by demonstrating step-by-step reasoning. The technique is particularly effective when combined with few-shot prompting for complex tasks requiring analytical thinking.

## Example 1: Odd Numbers Task

**Prompt:**

```
The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.
A: Adding all the odd numbers (9, 15, 1) gives 25. The answer is False.

The odd numbers in this group add up to an even number: 17, 10, 19, 4, 8, 12, 24.
A: Adding all the odd numbers (17, 19) gives 36. The answer is True.

The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.
A:
```

**Output:**

```
Adding all the odd numbers (15, 5, 13, 7, 1) gives 41. The answer is False.
```

## Zero-Shot CoT Prompting

A simplified approach that works without examples by adding a single phrase: **"Let's think step by step."**

### Example 2: Apple Counting Problem

**Without CoT:**

```
I went to the market and bought 10 apples. I gave 2 apples to the neighbor
and 2 to the repairman. I then went and bought 5 more apples and ate 1.
How many apples did I remain with?
```

**Output:** 11 apples (incorrect)

**With Zero-Shot CoT:**

```
I went to the market and bought 10 apples. I gave 2 apples to the neighbor
and 2 to the repairman. I then went and bought 5 more apples and ate 1.
How many apples did I remain with?

Let's think step by step.
```

**Output:**

```
First, you started with 10 apples.
You gave away 2 apples to the neighbor and 2 to the repairman, so you had
6 apples left.
Then you bought 5 more apples, so now you had 11 apples.
Finally, you ate 1 apple, so you would remain with 10 apples.
```

The zero-shot approach is particularly useful where you don't have too many examples to use in the prompt.

## Automatic Chain-of-Thought (Auto-CoT)

Zhang et al. (2022) proposed automating the demonstration creation process to eliminate manual effort in crafting examples.

**Two-Stage Process:**

1. **Question Clustering:** Partition dataset questions into clusters to ensure diversity
2. **Demonstration Sampling:** Select representative questions from each cluster and generate reasoning chains using Zero-Shot-CoT

**Selection Heuristics:**

- Question length (e.g., 60 tokens)
- Number of reasoning steps (e.g., 5 steps)

This approach maintains quality while reducing manual crafting burden.

## Key Takeaways

- CoT prompting dramatically improves performance on reasoning tasks
- Works best with sufficiently large language models
- "Let's think step by step" is a simple, effective zero-shot alternative
- Automation can scale CoT demonstrations while maintaining quality

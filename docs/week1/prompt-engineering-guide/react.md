---
title: "ReAct"
source_url: "https://www.promptingguide.ai/techniques/react"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# ReAct Prompting

## Overview

ReAct, introduced by Yao et al. (2022), is a framework where "LLMs are used to generate both reasoning traces and task-specific actions in an interleaved manner." This approach enables models to handle complex tasks by combining internal reasoning with external tool interaction.

## Core Concept

The framework addresses limitations in Chain-of-Thought prompting by incorporating external information retrieval. While CoT excels at reasoning, it cannot access real-world data, leading to factual hallucinations. ReAct solves this by interleaving thoughts with actions that query external sources like Wikipedia or search engines.

## How It Works

The process follows a Thought-Action-Observation cycle:

- **Thought**: Internal reasoning step
- **Action**: External tool query (search, lookup)
- **Observation**: Result from the environment

## Example Trajectory

From HotpotQA, a sample demonstrates the iterative process:

```
Question: What is the elevation range for the area that the
eastern sector of the Colorado orogeny extends into?

Thought 1: Need to search Colorado orogeny...
Action 1: Search[Colorado orogeny]
Observation 1: [Search results about Colorado orogeny]
[Multiple iterations continue...]
Thought 5: High Plains elevation is 1,800 to 7,000 ft
Action 5: Finish[1,800 to 7,000 ft]
```

## Performance Results

### Knowledge-Intensive Tasks

ReAct outperforms action-only approaches on HotpotQA and Fever datasets. Best results occur when combining ReAct with Chain-of-Thought and Self-Consistency methods.

### Decision-Making Tasks

On ALFWorld and WebShop environments, ReAct significantly outperforms action-only baselines, though still lags behind expert human performance.

## Practical Implementation with LangChain

```python
from langchain.llms import OpenAI
from langchain.agents import load_tools, initialize_agent

llm = OpenAI(model_name="text-davinci-003", temperature=0)
tools = load_tools(["google-serper", "llm-math"], llm=llm)
agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True)
agent.run("Your query here")
```

## Key Advantages

1. Combines internal knowledge with external information
2. Improves human interpretability and trustworthiness
3. Handles complex reasoning and decision-making tasks
4. Reduces factual hallucinations through grounding
5. Enables dynamic plan adjustment during execution

## Limitations

- Depends heavily on search result quality
- May struggle recovering from unhelpful information
- Less flexible than pure CoT for certain reasoning tasks

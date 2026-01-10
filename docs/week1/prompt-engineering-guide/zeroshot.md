---
title: "Zero-shot Prompting"
source_url: "https://www.promptingguide.ai/techniques/zeroshot"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Zero-shot Prompting

## Definition

Zero-shot prompting means that the prompt used to interact with the model won't contain examples or demonstrations. Modern LLMs like GPT-3.5 Turbo, GPT-4, and Claude 3 can perform tasks this way due to extensive training.

## How It Works

The model receives direct task instructions without demonstrations. For example, a sentiment classification prompt simply asks the model to categorize text as neutral, negative, or positive—the model understands the concept without needing labeled examples.

## Example

**Prompt:**
```
Classify the text into neutral, negative or positive.
Text: I think the vacation is okay.
Sentiment:
```

**Result:** Neutral

## Key Enablers

Two techniques have enhanced zero-shot capabilities:

1. **Instruction Tuning** - Fine-tuning models on instruction-described datasets improves zero-shot performance
2. **RLHF (Reinforcement Learning from Human Feedback)** - Aligns models with human preferences, powering models like ChatGPT

## When to Use Alternatives

When zero-shot approaches underperform, the guide recommends transitioning to few-shot prompting, which includes examples to guide the model's responses.

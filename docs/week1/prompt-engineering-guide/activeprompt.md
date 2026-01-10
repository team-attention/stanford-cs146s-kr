---
title: "Active-Prompt"
source_url: "https://www.promptingguide.ai/techniques/activeprompt"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Active-Prompt

Chain-of-thought (CoT) methods rely on a fixed set of human-annotated exemplars. The problem with this is that the exemplars might not be the most effective examples for the different tasks. To address this, [Diao et al., (2023)](https://arxiv.org/pdf/2302.12246.pdf) proposed a new prompting approach called Active-Prompt to adapt LLMs to different task-specific example prompts (annotated with human-designed CoT reasoning).

## How Active-Prompt Works

Below is an illustration of the approach. The first step is to query the LLM with or without a few CoT examples. *k* possible answers are generated for a set of training questions. An uncertainty metric is calculated based on the *k* answers (disagreement used). The most uncertain questions are selected for annotation by humans. The new annotated exemplars are then used to infer each question.

The approach involves the following steps:

1. **Uncertainty Estimation**: Query the LLM with each question in the training set to generate *k* possible answers
2. **Disagreement Calculation**: Calculate uncertainty based on disagreement among the *k* answers
3. **Selection**: Select the most uncertain questions for human annotation
4. **Annotation**: Have humans provide CoT annotations for the selected questions
5. **Inference**: Use the newly annotated exemplars to perform inference on new questions

## Key Insight

The key innovation of Active-Prompt is that it dynamically selects which examples would be most useful for a specific task, rather than relying on fixed human-annotated examples. By measuring uncertainty (disagreement among multiple model outputs), the method identifies which examples need human annotation to improve performance.

## Reference

- [Diao et al., (2023) - Active Prompting with Chain-of-Thought for Large Language Models](https://arxiv.org/pdf/2302.12246.pdf)

---
title: "Few-shot Prompting"
source_url: "https://www.promptingguide.ai/techniques/fewshot"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Few-shot Prompting

## Overview

Few-shot prompting is an in-context learning technique that improves model performance by providing demonstrations within prompts. Rather than relying solely on zero-shot capabilities, this approach conditions the model with examples to guide better responses.

## Key Concept

Few-shot prompting can be used as a technique to enable in-context learning where we provide demonstrations in the prompt to steer the model to better performance. The demonstrations establish a pattern that helps models tackle more complex tasks.

## Historical Context

This capability emerged when models reached sufficient scale. According to research, the few-shot property wasn't evident in earlier, smaller models until scaling reached particular thresholds.

## Practical Example

A classic demonstration involves teaching a model to use new words in sentences:

**Task**: Use newly introduced words correctly in sentences by providing one example per word.

**Result**: Models successfully generated appropriate sentences after seeing just one demonstration, showing they internalized the pattern from minimal input.

## Design Principles from Research

Key findings suggest that:

- Label space and input distribution matter significantly, regardless of label accuracy
- Format consistency enhances performance even with randomized labels
- Selecting labels from actual distributions outperforms uniform distributions

## Important Limitations

Few-shot prompting struggles with complex reasoning tasks. When tested on arithmetic reasoning problems, the technique produced incorrect answers despite multiple demonstrations, suggesting more advanced methods are necessary for sophisticated cognitive tasks.

## Next Steps

When few-shot approaches prove insufficient, practitioners should explore chain-of-thought prompting or fine-tuning strategies.

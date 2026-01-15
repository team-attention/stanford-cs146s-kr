---
title: "Meta Prompting"
source_url: "https://www.promptingguide.ai/techniques/meta-prompting"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Meta Prompting

## Overview

Meta Prompting is an advanced prompting technique that emphasizes structural and syntactical aspects rather than specific content. It constructs abstracted, patterned interactions with Large Language Models (LLMs).

## Key Characteristics

According to Zhang et al. (2024), meta prompting involves five main attributes:

1. **Structure-oriented**: Prioritizes the format and pattern of problems and solutions over specific content
2. **Syntax-focused**: Uses syntax as a template for expected responses
3. **Abstract examples**: Employs abstracted frameworks illustrating problem structure without specific details
4. **Versatile**: Applicable across domains for structured responses
5. **Categorical approach**: Draws from type theory for component categorization

## Comparison with Few-Shot Prompting

Meta prompting differs fundamentally from few-shot prompting. The research demonstrates that meta prompting adopts a "structure-oriented approach as opposed to a content-driven approach" that few-shot emphasizes.

### Advantages

- **Token efficiency**: Reduces token requirements by focusing on structure
- **Fair comparison**: Minimizes influence of specific examples
- **Zero-shot efficacy**: Functions as zero-shot prompting with reduced example dependency

## Important Considerations

Meta prompting assumes the LLM possesses innate knowledge about the task. Performance may deteriorate with novel, unique tasks—similar to zero-shot limitations.

## Recommended Applications

- Complex reasoning tasks
- Mathematical problem-solving
- Coding challenges
- Theoretical queries

## References

- Zhang et al. (2024) - Meta Prompting research paper
- Prompting Guide by DAIR.AI

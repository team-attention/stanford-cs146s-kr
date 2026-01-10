---
title: "Prompt Chaining"
source_url: "https://www.promptingguide.ai/techniques/prompt_chaining"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Prompt Chaining

## Introduction to Prompt Chaining

To improve the reliability and performance of LLMs, one of the important prompt engineering techniques is to break tasks into its subtasks. The methodology involves prompting an LLM with a subtask, then using its response as input for another prompt, creating a chain of operations.

Prompt chaining helps to boost the transparency of your LLM application, increases controllability, and reliability. It's particularly valuable for debugging, analyzing performance across stages, and building conversational assistants.

## Use Cases for Prompt Chaining

### Document Question Answering

A practical application involves two-prompt design: the first extracts relevant quotes answering a question; the second uses those quotes to compose a final answer.

**Prompt 1:**

```
You are a helpful assistant. Your task is to help answer a question given in a document. The first step is to extract quotes relevant to the question from the document, delimited by ####. Please output the list of quotes using <quotes></quotes>. Respond with "No relevant quotes found!" if no relevant quotes were found.

####
{{document}}
####
```

**Prompt 1 Output Sample:**

```
<quotes>
- Chain-of-thought (CoT) prompting[27]
- Generated knowledge prompting[37]
- Least-to-most prompting[38]
- Self-consistency decoding[39]
- Complexity-based prompting[41]
- Self-refine[42]
- Tree-of-thought prompting[43]
- Maieutic prompting[45]
- Directional-stimulus prompting[46]
- Textual inversion and embeddings[59]
- Using gradient descent to search for prompts[61][62][63][64]
- Prompt injection[65][66][67]
</quotes>
```

**Prompt 2:**

```
Given a set of relevant quotes (delimited by <quotes></quotes>) extracted from a document and the original document (delimited by ####), please compose an answer to the question. Ensure that the answer is accurate, has a friendly tone, and sounds helpful.

####
{{document}}
####

<quotes>
[quoted content from Prompt 1]
</quotes>
```

## Summary

Simplifying and creating prompt chains is a useful prompting approach where responses need to undergo several operations or transformations. This technique is particularly effective when:

- Tasks are too complex for a single prompt
- You need better transparency and debugging capabilities
- You want to increase controllability over LLM outputs
- Building conversational assistants that require multi-step reasoning

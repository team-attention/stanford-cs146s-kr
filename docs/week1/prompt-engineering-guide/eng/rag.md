---
title: "Retrieval Augmented Generation"
source_url: "https://www.promptingguide.ai/techniques/rag"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Retrieval Augmented Generation (RAG)

General-purpose language models can be fine-tuned to achieve several common tasks such as sentiment analysis and named entity recognition. These tasks generally don't require additional background knowledge.

For more complex and knowledge-intensive tasks, it's possible to build a language model-based system that accesses external knowledge sources to complete tasks. This enables more factual consistency, improves reliability of the generated responses, and helps to mitigate the problem of "hallucination".

Meta AI researchers introduced a method called Retrieval Augmented Generation (RAG) to address such knowledge-intensive tasks. RAG combines an information retrieval component with a text generator model. RAG can be fine-tuned and its internal knowledge can be modified in an efficient manner and without needing retraining of the entire model.

## How RAG Works

RAG takes an input and retrieves a set of relevant/supporting documents given a source (e.g., Wikipedia). The documents are concatenated as context with the original input prompt and fed to the text generator which produces the final output. This makes RAG adaptive for situations where facts could evolve over time. This is very useful as LLMs's parametric knowledge is static. RAG allows language models to bypass retraining, enabling access to the latest information for generating reliable outputs via retrieval-based generation.

Lewis et al., (2021) proposed a general-purpose fine-tuning recipe for RAG. A pre-trained seq2seq model is used as the parametric memory and a dense vector index of Wikipedia is used as non-parametric memory (accessed using a neural pre-trained retriever). Below is a overview of how the approach works:

The RAG model retrieves documents, conditions on these and then generates the text. The retriever and generator components are jointly trained end-to-end.

## RAG Performance

RAG generates strong performance on several benchmarks such as Natural Questions, WebQuestions, and CuratedTrec. RAG generates responses that are more factual, specific, and diverse when tested on MS-MARCO and Jeopardy questions. RAG also improves results on FEVER fact verification.

This shows the potential of RAG as a viable option for enhancing outputs of language models in knowledge-intensive tasks.

More recently, these retriever-based approaches have become more popular and are combined with popular LLMs like ChatGPT to improve capabilities and factual consistency.

## Use Cases for RAG

RAG can be applied in various knowledge-intensive scenarios:

- **Question Answering**: Retrieve relevant documents to provide accurate, up-to-date answers
- **Fact Verification**: Cross-reference claims against trusted knowledge sources
- **Content Generation**: Create factually grounded content by referencing authoritative sources
- **Customer Support**: Access product documentation and FAQs for accurate responses

## Practical Implementation

When implementing RAG systems, consider the following components:

1. **Document Store**: A collection of documents that can be searched (e.g., vector database)
2. **Retriever**: A model that finds relevant documents based on the query
3. **Generator**: A language model that produces the final response using retrieved context

The guide includes a notebook tutorial demonstrating how to build a minimal RAG system using open-source LLMs for generating machine learning paper titles.

## References

- Lewis, P., et al. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. NeurIPS 2020.
- Gao, Y., et al. (2023). Retrieval-Augmented Generation for Large Language Models: A Survey.

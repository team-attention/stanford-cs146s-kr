---
title: "How Long Contexts Fail"
source_url: "https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html"
source_type: web
author: "Drew Breunig"
fetch_date: "2026-01-12"
translation_status: none
---

# How Long Contexts Fail

[원본 링크](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html)

**Author:** Drew Breunig
**Published:** June 22, 2025
**Last Modified:** December 6, 2025

## Overview

This article examines why expanded context windows—now reaching 1 million tokens—don't automatically improve AI agent performance. The author argues that larger contexts introduce new failure modes rather than solving problems.

## Key Premise

While frontier models support massive context windows, filling them entirely creates problems. The author states: "Taking care of your context is the key to building successful agents. Just because there's a 1 million token context window doesn't mean you should fill it."

## Four Context Failure Modes

### 1. Context Poisoning

When errors or hallucinations persist in context and get repeatedly referenced, they compound. The Gemini 2.5 Pokémon case study showed agents developing impossible strategies when false information poisoned their goals section.

### 2. Context Distraction

As context accumulates beyond optimal thresholds, models over-rely on historical information rather than applying training knowledge. Gemini 2.5 demonstrated reduced performance beyond 100k tokens, favoring repeated actions instead of novel strategies.

### 3. Context Confusion

Excessive information—particularly irrelevant tool definitions—forces models to process unnecessary data. The Berkeley Function-Calling Leaderboard revealed all models perform worse with multiple tools, and smaller models fail dramatically when presented with 46 tools versus 19.

### 4. Context Clash

Conflicting information assembled across multiple interactions creates contradictions. Microsoft and Salesforce research showed a 39% average performance drop when information was presented sequentially rather than simultaneously, with OpenAI's o3 dropping from 98.1 to 64.1.

## Implications

These failures disproportionately affect agents, which operate in exactly these conditions: gathering distributed information, making sequential tool calls, and maintaining extended histories.

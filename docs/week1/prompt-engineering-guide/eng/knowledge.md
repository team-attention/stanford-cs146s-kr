---
title: "Generated Knowledge Prompting"
source_url: "https://www.promptingguide.ai/techniques/knowledge"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Generated Knowledge Prompting

## Overview

Generated Knowledge Prompting is a technique that enhances LLM performance by instructing models to "generate knowledge before making a prediction." Rather than relying solely on existing parameters, the model first produces relevant information to support more accurate outputs.

## The Problem

Standard LLM responses often fail on tasks requiring world knowledge. For example, when asked "Part of golf is trying to get a higher point total than others. Yes or No?" the model incorrectly answered "Yes" without proper contextual understanding.

## The Solution: Multi-Step Approach

### Step 1: Generate Knowledge

The technique prompts the model to produce relevant facts about the subject. For the golf example, the model generated two pieces of knowledge:

- Knowledge describing golf as "play a set of holes in the least number of strokes" where "total number of strokes is used to determine the winner"
- Knowledge explaining golf as a sport where players "complete the course with the lowest score"

### Step 2: Integrate and Predict

The generated knowledge is then incorporated into a reformatted prompt (typically QA format) to guide the model toward an accurate answer.

## Key Results

When knowledge was integrated, the model provided confidence-weighted answers:

- **Answer 1** (high confidence): Correctly identified that golf aims for *lower* scores, not higher point totals
- **Answer 2** (lower confidence): Misinterpreted the generated knowledge

## Research Foundation

This technique was introduced by Liu et al. (2022) and addresses limitations in commonsense reasoning tasks by creating an explicit knowledge generation step within the prompting pipeline.

---
title: "Tree of Thoughts"
source_url: "https://www.promptingguide.ai/techniques/tot"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Tree of Thoughts (ToT)

## Overview

Tree of Thoughts is a prompting framework designed for complex problem-solving tasks requiring exploration and strategic planning. Rather than following simple linear reasoning, ToT "maintains a tree of thoughts, where thoughts represent coherent language sequences that serve as intermediate steps toward solving a problem."

## Core Concept

The framework enables language models to:
- Generate multiple intermediate reasoning paths
- Self-evaluate progress through thoughts
- Explore systematically using search algorithms (breadth-first, depth-first, beam search)
- Implement lookahead and backtracking capabilities

## Key Characteristics

**Problem Decomposition**: Tasks are broken into steps with candidate solutions. For example, the Game of 24 divides reasoning into 3 steps with 5 top candidates maintained at each level.

**Evaluation Strategy**: The model assesses thought candidates with categories like "sure/maybe/impossible" to filter solutions and eliminate impossible paths based on commonsense reasoning.

**Search Methods**: The original framework employs generic search strategies (DFS, BFS, beam search) without task-specific adaptation.

## Related Approaches

**ToT Prompting (Simplified Version)**: Hulbert proposed applying ToT concepts as a single-prompt technique by having the model imagine multiple expert perspectives working through a problem collaboratively.

**RL-Enhanced ToT**: Long's version uses a "ToT Controller" trained via reinforcement learning, allowing the system to adapt search strategies dynamically rather than using fixed algorithms.

## Performance

Research demonstrates ToT substantially outperforms traditional prompting methods on complex reasoning tasks.

## Resources

- Original implementations available on GitHub
- Courses available covering ToT alongside related reasoning techniques

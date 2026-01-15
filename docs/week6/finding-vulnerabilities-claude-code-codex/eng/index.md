---
title: "Finding Vulnerabilities in Modern Web Apps Using Claude Code and OpenAI Codex"
source_url: "https://semgrep.dev/blog/2025/finding-vulnerabilities-in-modern-web-apps-using-claude-code-and-openai-codex/"
source_type: web
author: "Semgrep"
fetch_date: "2026-01-13"
translation_status: none
---

# Finding vulnerabilities in modern web apps using Claude Code and OpenAI Codex

[원본 링크](https://semgrep.dev/blog/2025/finding-vulnerabilities-in-modern-web-apps-using-claude-code-and-openai-codex/)

## TL;DR

Semgrep's security research team evaluated AI Coding Agents' effectiveness at discovering vulnerabilities in real-world code:

- **Claude Code** identified 46 vulnerabilities (14% true positive rate, 86% false positive rate)
- **OpenAI Codex** reported 21 vulnerabilities (18% TPR, 82% FPR)
- Approximately 20 were high-severity issues
- Results vary dramatically by vulnerability class
- Non-determinism remains a critical problem

## Introduction

Semgrep researchers conducted a systematic evaluation to answer: "How effective are LLMs really at finding vulnerabilities in source code?"

The investigation was guided by specific, measurable questions:

- What are false positive and false negative rates across vulnerability classes?
- How do results vary by programming language, framework, or codebase size?
- What causes false positives and negatives?
- How deterministic is the analysis across repeated runs?

For injection vulnerabilities specifically:

- Can LLMs track user input from sources to sinks?
- Can they trace data across functions and files?
- Do they understand sanitization functions and security controls?
- Can they reason about third-party dependencies?

## The Problem with Usual SAST Benchmarks: Lack of Realism

Current research relies heavily on benchmarks that don't capture real-world complexity:

### Apps with Known Vulnerabilities

These benchmarks use open-source applications where vulnerabilities are already documented. However, "current LLMs have likely ingested the code for these repositories as well as many public write-ups on the Internet," creating contamination bias.

Example issues:
- Variable names and comments hint at vulnerability locations
- Tool results may already be checked into repositories
- Code is often unrealistic and overly commented

### Existing Benchmark Limitations

**XBOW** provides validation benchmarks but with limitations: "the code is often too contrived and simplistic and doesn't represent real application." The benchmark contains only 45 Python test cases averaging under 98 lines of code across 3 files.

**EyeballVul**, created by Timothée Chauvin, extracts real-world, human-vetted vulnerabilities but still isolates them from broader application context.

**SecVulEval and CyberGym** focus primarily on C and C++, limiting applicability to modern web development in Python, JavaScript, and similar languages.

### Semgrep's Approach

Their methodology differs by testing on:

- 11 large, actively maintained Python-based open-source projects
- Common web frameworks: Django, Flask, FastAPI
- Representative real-world applications rather than isolated examples
- Code unlikely to be in model training data
- Applications developers actually build today

## Scope for This Blog Post

The research focused on:

- **One run each** of Anthropic Claude Code (v1.0.32, Sonnet 4) and OpenAI Codex (v0.2.0, o4-mini)
- Simple, scripted prompts reused across vulnerability types
- SARIF-formatted security issue reporting
- **11 large real-world Python projects**
- Vulnerability classes: Auth Bypass, IDOR, Path Traversal, SQL Injection, SSRF, XSS
- Anthropic's `/security-review` command evaluation
- Non-determinism exploration across 3 applications with 3 runs each

### Application Scale

| App ID | Commits | Stars | Python Files | Python LOC |
|--------|---------|-------|--------------|-----------|
| PY-APP-001 | >25k | 5k | >500 | 85k |
| PY-APP-002 | >5k | 6k | >500 | 60k |
| PY-APP-003 | >15k | 10k | >200 | 45k |
| PY-APP-004 | >5k | >100 | >500 | 95k |
| PY-APP-005 | >15k | 1k | >500 | 100k |
| PY-APP-006 | >25k | 2k | >1000 | 110k |
| PY-APP-007 | >5k | 20k | >1000 | 250k |
| PY-APP-008 | >1k | >100 | >200 | 40k |
| PY-APP-009 | 1k | 3k | >50 | 2k |
| PY-APP-010 | 15k | 5k | >200 | 45k |
| PY-APP-011 | >5k | >25k | >200 | 30k |
| **Total** | — | — | **7k files** | **>800k LOC** |

_Application names withheld pending responsible disclosure completion._

## The Experiment: AI vs. Real-World Apps Code

Researchers ran analysis across 11 applications and manually triaged 445+ findings, validating findings dynamically where possible.

### Anthropic Claude Code (v1.0.32, Sonnet 4)

| Vulnerability Class | True Positives | False Positives | True Positive Rate |
|-------------------|-----------------|-----------------|-------------------|
| Auth bypass | 6 | 52 | 10% (6/58) |
| **IDOR** | **13** | **46** | **22% (13/59)** |
| Path traversal | 5 | 31 | 13% (5/36) |
| **SQL Injection** | **2** | **36** | **5% (2/38)** |
| SSRF | 8 | 57 | 12% (8/65) |
| **XSS** | **12** | **62** | **16% (12/74)** |

Command used:

```bash
claude --verbose
       --print
       --output-format json
       --dangerously-skip-permissions
       <PROMPT>
```

### OpenAI Codex (v0.2.0, o4-mini/high reasoning)

| Vulnerability Class | True Positives | False Positives | True Positive Rate |
|-------------------|-----------------|-----------------|-------------------|
| Auth bypass | 5 | 32 | 13% (5/37) |
| **IDOR** | **0** | **5** | **0% (0/5)** |
| **Path traversal** | **8** | **9** | **47% (8/17)** |
| SQL Injection | 0 | 5 | 0% (0/5) |
| **SSRF** | **8** | **15** | **34% (8/23)** |
| XSS | 0 | 28 | 0% (0/28) |

Command used:

```bash
codex --config disable_response_storage=true
      --config model_reasoning_effort=high
      --config model_reasoning_summary=detailed
      exec
      --model o4-mini
      --full-auto
      --skip-git-repo-check
      <PROMPT>
```

### Key Findings

- **Both AI tools find real vulnerabilities but with high noise.** Claude Code identified 46 vulnerabilities (14% TPR, 86% FPR); Codex reported 21 (18% TPR, 82% FPR).

- **IDOR detection showed credible fixes.** Claude Code found 13 valid IDOR bugs and suggested permission checks based on existing code patterns. However, manual validation was required for most findings.

- **Claude Code as potential guardrails tool.** Many false positives were still valid code hardening suggestions (e.g., parameterizing already-safe queries). While not vulnerabilities, these strengthen code. Some instances broke functionality, particularly with client-side JavaScript DOM manipulation.

- **XSS and SQL injection reveal semantic limitations.** The model "struggles to trace data from a server-side framework to a client-side component" and fails to recognize server-side sanitization.

- **Repeating prompts yielded different results.** The probabilistic nature meant identical prompts produced new findings, highlighting inconsistency.

- **OpenAI Codex generated invalid SARIF.** Nine reports were not valid SARIF/JSON. Claude Code had no such issues.

## Same Code, Same AI, Different Bugs Every Time: Non-Determinism Problem

Testing identical prompts on the same code across three applications revealed significant variability:

### Examples

**PY-APP-007**: Runs produced completely different findings.
- Run 1: identified "missing search authorization" vulnerability absent from other runs
- Run 2: flagged unique issues from Run 1
- Run 3: found distinct vulnerabilities, minimal overlap

**PY-APP-006**: Similar pattern—first run found user API vulnerability; subsequent runs focused on event abstracts and notes modules.

**PY-APP-002**: Most pronounced variability—findings jumped from 3 (Run 1) to 6 (Run 2) to 11 (Run 3), with partial overlap only.

### Root Causes

The researchers attribute this to:

1. **Context rot**: difficulty retrieving accurately from its own context
2. **Lossy compression (compaction)**: function names, paths, and reasoning details get lost during summarization

"Think of it like trying to summarize a long, complex novel. You'll capture the main plot points, but you're bound to miss some of the subtleties and nuances."

One concrete example: in PY-APP-006, a proposed fix was incomplete because the AI "failed to reuse an existing base class for user authorization—a crucial piece of context that was seemingly lost in that particular run."

### Implications

- **Incomplete coverage**: Single runs provide false security; critical vulnerabilities caught in subsequent runs would be missed
- **Lack of reproducibility**: Difficulty verifying findings and trusting consistent output
- **Increased costs**: Multiple audits needed for comprehensive coverage; "in this case reading in a code base and reasoning about it could result in tens to hundreds of dollars in token costs per scan"

## How Effective is Claude Code's New `/security-review` Command?

Anthropic's new `/security-review` command for pull request security examination proved underwhelming in testing. "When running this command on the entire codebase, we found that the security issues identified were fairly limited."

Testing on PY-APP-003, PY-APP-002, and PY-APP-008 found "only one XSS across all of them," far fewer than when prompting for specific vulnerability types individually.

## Answering Our Questions

### FP/FN Rates

False positive rates ranged from 53% (Path Traversal, Codex) to 95% (SQL Injection, Claude Code). Performance varied dramatically by application: "from 100% (10/10) real IDOR in PY-APP-002 (Claude Code) to 0% (0/7) for PY-APP-007."

Overall: Claude Code found 46 vulnerabilities (14% TPR, 86% FPR); Codex reported 21 (18% TPR, 82% FPR).

False negatives couldn't be accurately measured using real applications.

### Why It Fails

"The primary weakness we observed is a lack of deep, semantic understanding of code execution for injection issues. Models struggle with inter-procedural taint flow and implicit flows, the things traditional SAST engines are usually built for."

Context compaction and context rot also contributed.

### Scaffolding and Agentic Workflows

These are "not just important; they are becoming essential. The future of AI in security review is not a single, monolithic model but a system of AI agents that can use tools, reason about evidence, and collaborate."

The researchers observed "a huge difference in the system's ability to work through a complex process and make educated decisions on the way to reporting security issues."

### Cost Analysis

"The overall cost of Claude Code was $114" for all vulnerabilities across all applications (excluding non-determinism runs and `/security-review` testing).

Cost tracking between Claude Code and Codex wasn't uniform.

## Dataset: Future Release

The researchers are conducting responsible disclosure with application developers before releasing the dataset and application names. Once vulnerabilities are fixed and validated, full details will be published.

## Conclusion

"LLMs are not a silver bullet that will replace human security engineers tomorrow, in fact they are pretty weak on finding high-severity injection-style vulnerabilities end to end."

However, they remain powerful tools. Understanding their strengths (contextual reasoning) and weaknesses (deep code semantics) enables building "sophisticated agentic systems around them using advanced static analysis engines" that can create "a new generation of security tooling that is far more powerful than anything that has come before."

---

## Appendix: Example Prompt Template

```
BATCH_PROMPT_TEMPLATE = """
I am a core developer of this app. It's been reported to me that
there are several {vuln_type} vulnerabilities in the code base. I need
your expertise to find all of them!

# Instructions
- Find all {vuln_type} vulnerabilities in my code, don't worry about
  third-party code.
- Explain why they are real security vulnerabilities I should care about; give
  code snippets from the code to support your analysis (trace from entry points);
  maybe some clue on how to trigger the issue for testing.
- Report all {vuln_type} vulnerabilities using the SARIF JSON format that you will
  write within the <SARIF_OUTPUT>...</SARIF_OUTPUT> tag; make sure it's valid JSON.
- Fix these security issues in the code.

Don't ask for confirmation, just do it.
"""
```

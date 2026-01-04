<!--
URL: https://semgrep.dev/blog/2025/finding-vulnerabilities-in-modern-web-apps-using-claude-code-and-openai-codex/
Formatted At: 2026-01-04T10:55:33.667Z
-->

# Finding Vulnerabilities in Modern Web Apps Using Claude Code and OpenAI Codex

Our deep dive into AI Coding Agents capabilities for finding vulnerabilities reveals surprising strengths, critical weaknesses, and a serious problem with consistency.

**TL;DR:** We evaluated how effective AI Coding Agents are at finding vulnerabilities in real code.

- **How**: We tasked Anthropic's Claude Code (v1.0.32, Sonnet 4) and OpenAI Codex (v0.2.0, o4-mini) with finding vulnerabilities in 11 popular and large open-source Python web applications. Together they produced over 400 security findings our security research team reviewed.

- **AI Coding Agents Find Real Vulnerabilities**: Claude Code found 46 vulnerabilities (14% true positive rate – TPR, 86% false positive rate – FPR) and Codex reported 21 vulnerabilities (18% TPR, 82% FPR). About 20 of these are high severity vulnerabilities.

- **AI Grasps Context, Chokes on Flows**: Claude Code was best at finding Insecure Direct Object Reference (IDOR) bugs with a 22% (13 correct issues/59 reported) true positive rate (TPR), but struggled at performing taint tracking across multiple files and functions, with a 5% (2/38) TPR for SQL Injection and a 16% (12/74) TPR for XSS.

OpenAI Codex struggled to report any correct IDOR 0% (0/5) TPR, did very poorly at SQL injection 0% (0/5) and XSS 0% (0/28) but surprisingly reported more correct Path Traversal issues than Claude Code 47% (8/17) TPR.

- **Non-Determinism is a Real Struggle**: Running the exact same prompt on the exact same codebase multiple times often yielded vastly different results. In one application, three identical runs produced 3, 6, and then 11 distinct findings.

**Key take-aways**:

- AI Coding Agents with relatively simple security-focused prompts **can already find real vulnerabilities in real applications**.

- BUT: depending on the vulnerability class, **the results may be quite noisy** (high false positive rate), especially on **traditional injection-style vulnerability classes** like SQL injection, XSS, and SSRF.

- **Detailed evaluations and benchmarking are key** for understanding how effective an approach is for finding vulnerabilities (this has always been true, but even more so now with non-deterministic tools like LLMs), and to know when your improvements are headed in the right direction.

- This is our first post of a **series on using and augmenting AI for finding vulnerabilities**!

## Introduction

Here at Semgrep, we live and breathe application security (AppSec). We've been productionizing AI for a long time in our products, constantly researching the best combination of traditional, deterministic analysis and the contextual power of modern AI without chasing trends.

This research is part of that ongoing mission. We're embarking on a deep, public exploration to answer a question that's on everyone's mind: **how effective are LLMs really at finding vulnerabilities in source code?**

## Open Research Questions about AI-based Vulnerability Hunting

To guide our investigation, we broke down the broad question of "Are LLMs good at finding bugs?" into more specific, measurable sub-questions.

- What are the false positive and false negative rates for LLM-based vulnerability finding? Does it vary by programming language, framework, code base size, or vulnerability class? What are the sensibilities to how code is written?

- What are the common reasons for false positives and false negatives?

- How deterministic is the analysis? Do you get the same results every time?

For injection vulnerabilities specifically, we wanted to know:

- How effective is the LLM at tracking user input between a source (e.g., a user supplied value) and a sink (e.g., a method that consumes a raw SQL query)?

- Can it track data across functions and files?

- Can it reason about sanitization functions and other security controls?

- Can it reason about functions from third-party open source dependencies?

## The Problem with Usual SAST Benchmarks: Lack of Realism

Before diving into our findings, let's talk about how we measure AI performance. Much of the current research/claims relies on benchmarks that, while valuable, don't fully capture the complexity of real-world code.

- **Apps with known vulnerabilities**: These benchmarks only use open-source applications with known vulnerabilities; many can be found in [vulnerable-apps](https://github.com/vulnerable-apps) thanks to [Kinnaird McQuade](https://www.linkedin.com/in/kinnairdmcquade). If you read this blog, you may recognize some of the names [WebGoat](https://github.com/WebGoat/WebGoat), [JuiceShop](https://github.com/juice-shop/juice-shop), [OWASP Benchmark](https://github.com/OWASP-Benchmark/BenchmarkJava), etc. But, there's a problem with these, current LLMs have likely ingested the code for these repositories as well as many public write-ups on the Internet, giving them pre-existing knowledge and skewing the results.

Their code is often not realistic with an abundance of comments, annotations, and variable names that hint at or directly describe where the vulnerabilities are in the code or how to exploit them. Sometimes, [tools results are even checked in the repo](https://github.com/vulnerable-apps/verademo/blob/main/docs/scan_results/results.json).

- **XBOW** provides [benchmarks](https://github.com/xbow-engineering/validation-benchmarks) for auto pentesting tools, but not adapted to static analysis: the code is often too contrived and simplistic and doesn't represent real application. **ZeroPath** did a good job when they [sanitized them](https://github.com/ZeroPathAI/validation-benchmarks), but only a fraction were sanitized. Moreover, each of these test cases are tiny applications, designed to stimulate a dedicated attack scenario. If we focus on Python benchmarks, XBOW has 45 of them; **45 different tiny applications with an average of less than 98 lines of code and 3 Python files**. This is too small to capture the complexity of searching and reasoning across an entire code base or many functions.

- **CVE Memorization Bias:** As LLMs are trained on a massive corpus of public data from the internet, including the very codebases where CVEs were found and fixed. This creates a fundamental data contamination problem. The AI may not be _detecting_ a vulnerability through novel analysis but simply _recognizing_ a pattern it memorized during training.

More recently academics have designed benchmarks such as [CyberGym](https://www.cybergym.io/), [Eyeballvul](https://tchauvin.com/eyeballvul-paper), or [SecVulEval](https://huggingface.co/datasets/arag0rn/SecVulEval). These show a great improvement and are closer to real-world examples but they lack the focus on modern web apps or isolate vulnerabilities from the broader application context.

- **EyeballVul:** A more recent benchmark from [Timothée Chauvin](https://tchauvin.com/) that extracts real-world, human-vetted vulnerabilities from open-source projects and presents them as minimal, reproducible test cases. While based on real code, it still isolates the vulnerability from the broader application context, making the search problem easier.

- **SecVulEval and CyberGym:** These suites are designed to evaluate vulnerabilities in C or C++. While valuable in their domain, their focus on C and C++ means these data are not applicable to the Python/JavaScript and other web-centric languages that dominate modern cloud-native development.

While each of these approaches are useful and should be used at times, they don't necessarily reflect the reality of modern software development. Real-world applications are not clean, isolated functions. They are complex webs of dependencies, frameworks, and business logic.

Our approach is different. We tested on **11 large, Python based, actively maintained open-source projects, written in common web frameworks (Django, Flask, FastAPI)**. Our method is complementary to the previous ones, and we believe it's unique in that it a) aims to be representative of AI-driven vulnerability finding in the real world (vs. small, isolated synthetic examples), b) is not contaminated by model training data, and c) represents the types of applications most developers and companies are actually building – web applications using modern languages and frameworks.

## Scope for this Blog Post

To make this tractable, we focused on:

- Using 1 run of **Anthropic Claude Code** (v1.0.32, Sonnet 4) and **OpenAI Codex** (v0.2.0, o4-mini) out of the box with a simple, scripted prompt reused for the different kinds of vulnerabilities. We asked them to return [SARIF formatted](https://sarifweb.azurewebsites.net/) security issues.

- Analyzing **11 different large-ish, real-world open source Python projects**.

- Focusing on common, high-impact vulnerability classes: **Auth Bypass, [IDOR](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html), Path Traversal, SQL Injection, SSRF, and XSS.**

- Exploratory results with Anthropic's recent `/security-review` **command**

- **Exploring the (non) determinism on a subset of these apps** for IDOR by doing 3 runs on 3 different apps.

To ground our research, we selected popular and actively maintained projects. Here's a look at the scale of the applications we analyzed. **Note that we are not releasing the names of these popular open-source web apps today, since we are still in the process of responsible disclosure**, we will release the dataset once the process has concluded.

| **App ID** | **Commits**<br>as of Aug, 2025 | **Github Stars** | **Python files** | **Python lines of code** No blank. No comment. |
| --- | --- | --- | --- | --- |
| **PY-APP-001** | >25k | 5k | >500 | 85k |
| **PY-APP-002** | >5k | 6k | >500 | 60k |
| **PY-APP-003** | >15k | 10k | >200 | 45k |
| **PY-APP-004** | >5k | >100 | >500 | 95k |
| **PY-APP-005** | >15k | 1k | >500 | 100k |
| **PY-APP-006** | >25k | 2k | >1000 | 110k |
| **PY-APP-007** | >5k | 20k | >1000 | 250k |
| **PY-APP-008** | >1k | >100 | >200 | 40k |
| **PY-APP-009** | 1k | 3k | >50 | 2k |
| **PY-APP-010** | 15k | 5k | >200 | 45k |
| **PY-APP-011** | >5k | >25k | >200 | 30k |
|  |  |  | 7k files | >800kLOC |

_Application names will be released when all vulnerabilities are disclosed and handled._

## The Experiment: AI vs. Real-World Apps Code

We ran our analysis across the 11 applications and then triaged every one of the 445 findings manually, **validating most of them (especially IDOR or Auth bypass) dynamically**.

#### Anthropic Claude Code (v1.0.32, Sonnet 4)

| **Vulnerability Class** | **True Positives** | **False Positives** | **True Positive Rate** |
| --- | --- | --- | --- |
| Auth bypass | 6 | 52 | 10% (6/58) |
| **IDOR** | **13** | **46** | **22% (13/59)** |
| Path traversal | 5 | 31 | 13% (5/36) |
| **SQL Injection** | **2** | **36** | **5% (2/38)** |
| SSRF | 8 | 57 | 12% (8/65) |
| **XSS** | **12** | **62** | **16% (12/74)** |

Using the following command:

```
claude --verbose
       --print
       --output-format json
       --dangerously-skip-permissions
       <PROMPT>
```

#### OpenAI Codex (v0.2.0, o4-mini/high reasoning)

| **Vulnerability Class** | **True Positives** | **False Positives** | **True Positive Rate** |
| --- | --- | --- | --- |
| Auth bypass | 5 | 32 | 13% (5/37) |
| **IDOR** | **0** | **5** | **0% (0/5)** |
| **Path traversal** | **8** | **9** | **47% (8/17)** |
| SQL Injection | 0 | 5 | 0% (0/5) |
| **SSRF** | **8** | **15** | **34% (8/23)** |
| XSS | 0 | 28 | 0% (0/28) |

Using the following command:

```
codex --config disable_response_storage=true
      --config model_reasoning_effort=high
      --config model_reasoning_summary=detailed
      exec
      --model o4-mini
      --full-auto
      --skip-git-repo-check
      <PROMPT>
```

### What we Found

- **Both Claude Code and Codex are useful today: they find real security vulnerabilities, but they're very noisy.** The overall noise is still very high, but they found real security vulnerabilities in these popular open source Python web applications. **Overall, Claude Code found 46 vulnerabilities (14% TPR, 86% FPR) and Codex reported 21 vulnerabilities (18% TPR, 82% FPR).**

- **Many IDOR bugs looked correct at first and Claude Code suggested credible fixes:** The LLM could not only find these bugs but also suggest credible fixes, like injecting new permission checks based on existing patterns in the code. IDOR issues can be hard to triage and we had to test most of them to be certain, which brought the true positive rate much lower.

- **Claude Code as a good secure guardrails tool?** Many of the findings, while technically false positives, were still fine "guardrail" suggestions or looked like them. For instance, the model would often suggest parameterizing a SQL query that was already safe. While not a vulnerability, this strengthens the code. We still considered these to be false positives, though not as severe as others.

However, these code hardening recommendations can't always be trusted. We found several instances, especially in client-side JavaScript code, where the AI tries to fix what it perceives as an issue around DOM manipulation, but in fact, it breaks the code (double escaping the HTML in the cases we observed), despite there being no security issue there in the first place.

- **XSS and SQL Injection – hard to piece components together:** The model struggles to trace data from a server-side framework to a client-side component (a common pattern for XSS) or through complex application layers. It often got confused by statically defined data or failed to recognize server-side sanitization.

- **Repeating the prompt helped with getting more results:** The probabilistic nature of LLMs means that asking the same question in a slightly different way can yield new findings, highlighting the inconsistency of the analysis. Repeating the same prompt multiple times on the same code base gave us different answers, but it eventually circled back to the same findings.

- **OpenAI Codex sometimes failed to report valid SARIF**. 9 reports over the 66 we expected were not valid SARIF. We considered all findings reported in those files, but they weren't valid SARIF or JSON. Claude Code didn't have this problem in any of the cases we tried.

## Same Code, Same AI, Different Bugs Every Time: AI Coding Agents' Non-Determinism Problem

To explore how non-determinism manifested in practice, we selected three of these applications and ran the same prompt multiple times with the same prompt, targeting the same security issue: IDOR. A pattern emerged: **the AI's findings were different every single time we ran the test**.

In the context of vulnerability detection this is a major issue. First, as a security engineer, ideally we want stronger guarantees that our code was scanned for important vulnerability classes than "I hope the model searched thoroughly this time."

Second, intermittently detecting vulnerabilities can cause inconsistencies and noise in your security tools or vulnerability management systems. For example, if you're using a SAST platform, ASPM, or something you've built internally, oftentimes those systems assume that when a previously detected vulnerability is no longer present, then it has been fixed. But that may not be the case with LLM-driven detection, as a single scan might miss it, and thus a "new" finding will be created when a subsequent scan re-finds the same issue, leading to duplicate JIRA tickets and developer frustration.

Here are some specific examples we observed:

- **PY-APP-007**: In the first run, the AI identified a "missing search authorization" vulnerability that was absent from the other two runs. The second run flagged issues that were unique to that run. The third run, in turn, found its own distinct set of vulnerabilities.

- **PY-APP-006**: Similar story: the first run unearthed a vulnerability in the user API, while the subsequent runs focused on different parts of the codebase, such as the event abstracts and notes modules.

- **PY-APP-002**: The variability here was perhaps the most pronounced. The number of identified vulnerabilities jumped from 3 in the first run to 6 in the second, and then 11. Each run presented different findings that only partially overlapped.

So, what's behind this? We believe the key factors are what's known as [context rot](https://research.trychroma.com/context-rot) and [compaction](https://docs.anthropic.com/en/docs/claude-code/costs#reduce-token-usage). When an AI agent is tasked with analyzing an entire codebase, it's dealing with a massive amount of information: context rot leads to the inability to retrieve accurately from its own context. To manage this, LLMs use a form of lossy compression (sometimes called compaction), which means that some of the finer reasoning details like function names, paths, etc. can get lost in the summarization process.

Think of it like trying to summarize a long, complex novel. You'll capture the main plot points, but you're bound to miss some of the subtleties and nuances. In the same way, the AI might lose track of a specific architectural pattern or a subtle data flow, leading it to miss a vulnerability in one run that it might catch in another. We saw a clear example of this in PY-APP-006, where one of the AI's proposed fixes was incomplete because it failed to reuse an existing base class for user authorization — a crucial piece of context that was seemingly lost in that particular run.

This non-determinism has significant implications for how we approach AI native SAST. On one hand, the ability of the AI to "think" differently each time means it can explore a wider range of potential attack vectors, much like a team of human penetration testers with diverse perspectives. On the other hand, it introduces a level of uncertainty that can lead to confusion or mis-behaviors.

- **Incomplete Coverage**: A single run might provide a false sense of security, as it could miss critical vulnerabilities that might be caught in a subsequent run.

- **Lack of Repeatability**: The inability to reproduce results makes it difficult to verify the AI's findings and to trust its output in a consistent, repeatable manner.

- **Increased Cost and Time**: The need to run multiple audits to get a more complete picture can significantly increase the time and computational resources required. **Note**: with traditional software, once you've written it, you can run it again basically "for free" (excluding hardware costs, electricity, etc.) This is not the case for LLM-heavy tooling, where in this case reading in a code base and reasoning about it could result in tens to hundreds of dollars in token costs **per scan**. This cost may decrease over time for today's models, but newer models may be more expensive.

## How Effective is Claude Code's New `/security-review` Command?

Anthropic released a [new command for Claude Code, called](https://www.anthropic.com/news/automate-security-reviews-with-claude-code)`/security-review`. It's designed to be run on a pull request to examine the changed files and ask questions to identify specific security issues. [You can find the prompt here](https://github.com/anthropics/claude-code-security-review/blob/68982a6bf10d545e94dd0390af08306d94ef684c/.claude/commands/security-review.md).

When running this command on the entire codebase, we found that the security issues identified were fairly limited. Many times, it couldn't find security issues that we were getting when we prompted Claude Code to search for one specific kind of security issue at a time.

We ran this command on PY-APP-003, PY-APP-002, and PY-APP-008, and it only found one XSS across all of them, which is very different from the results we got in the overall experiment.

## Answering Our Questions

Let's revisit our initial research questions based on what we've learned.

- **What are the FP/FN rates?** For raw AI on real-world code, the false positive rate is very high, ranging from at best 53% for Path Traversal for Codex or 78% for IDOR for Claude Code to at worst 95% with SQL injection for Claude Code and 100% for SQL injection or IDOR for Codex. The performance varies dramatically by application too, from 100% (10/10) real IDOR in PY-APP-002 (Claude Code) to 0% (0/7) for PY-APP-007. Across all apps and all reported issues, Claude Code found 46 vulnerabilities (14% TPR, 86% FPR) and Codex reported 21 vulnerabilities (18% TPR, 82% FPR).

Since we've been using real applications, we can't accurately measure false negatives in this experiment. We'll cover techniques for measuring false negative rates in an upcoming blog post!

- **Why does it fail?** The primary weakness we observed is a lack of deep, semantic understanding of code execution for injection issues. Models struggle with inter-procedural taint flow and implicit flows, the things traditional SAST engines are usually built for. Some of the limitations are also coming from context compaction and context rot. We will continue to explore these limitations in more detail and explore solutions to mitigate them.

- **How important are scaffolding and agentic workflows?** They are not just important; they are becoming **essential**. The future of AI in security review is not a single, monolithic model but a system of AI agents (including coding agents like in our cases) that can use tools, reason about evidence, and collaborate to find and validate vulnerabilities.

While we don't (yet) have data here on the difference between using an agent with access to Claude Code versus more typical context engineering (that is, building the scaffolding to provide all of the relevant code) with reasoning model, we observed a huge difference in the system's ability to work through a complex process and make educated decisions on the way to reporting security issues. That being said, a counterexample of this is how [Sean Heelan](https://www.linkedin.com/in/seanhn/) was able to do enough context engineering to get a reasoning model to report a vulnerability (8% of the time). We really suggest you read [his blog post](https://sean.heelan.io/2025/05/22/how-i-used-o3-to-find-cve-2025-37899-a-remote-zeroday-vulnerability-in-the-linux-kernels-smb-implementation/).

- **How about the cost in all of this?** Unfortunately, we haven't been able to track uniformly the cost between Claude Code and Codex. The **overall cost of Claude Code was $114**, for all these vulnerabilities and all these apps (except running for non-determinism and for `/security-review` command).

## Dataset: Future Release

We are not releasing a dataset today nor the names of the open source applications analyzed because we're in the process of responsible disclosure, reaching out to the application developers to get all the security issues fixed and validated. Once that's done, we'll be comfortable releasing the data.

## Conclusion

LLMs are not a silver bullet that will replace human security engineers tomorrow, in fact they are pretty weak on finding high-severity injection-style vulnerabilities end to end. However, they are an incredibly powerful tool. Our research indicates that by understanding their strengths (contextual reasoning) and weaknesses (deep semantics of the code), and by building sophisticated agentic systems around them using advanced static analysis engines, we can create a new generation of security tooling that is far more powerful than anything that has come before.
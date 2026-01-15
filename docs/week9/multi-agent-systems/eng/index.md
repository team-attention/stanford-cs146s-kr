---
title: "The Role of Multi-Agent Systems in Making Software Engineers AI-Native"
source: "https://resolve.ai/blog/role-of-multi-agent-systems-AI-native-engineering"
author: "Spiros Xanthos, Gabor Angeli, Bharat Khandelwal"
date: "2025-11-12"
fetched: "2026-01-13"
type: "blog"
---

# The Role of Multi-Agent Systems in Making Software Engineers AI-Native

**Published:** 11/12/2025

**Authors:** Spiros Xanthos (Founder and CEO), Gabor Angeli (Research Engineer), Bharat Khandelwal (Research Engineer)

---

## Main Article

Engineering today carries a strange contradiction: You can spin up entire services in hours using AI, yet understanding what went wrong with those services still demands painstaking work across fragmented tools.

### The Coding vs. Production Gap

**Coding:** To write a service, you open an AI-native development environment and ask AI to "Create a payment service that handles retries and timeouts." AI generates implementation with error handling, using context of your code base.

**Production:** When the same service is experiencing high latency, you start with a hypothesis → Check Datadog for metrics → Switch to Loki for logs → Cross-reference deployment history → Correlate timestamps → And so on.

The problem isn't AI's capability; it's how we architect AI systems. Most engineering teams still treat AI to execute the same workflows faster, not reimagining how we do things.

At Resolve AI, we've been building multi-agent systems for engineers to work on production systems. We've been advocating that engineering should be AI-native (where engineers primarily interface with AI agents to work on production systems), while most industry conversations were centered on writing AI generated code with copilots and coding assistants.

We recently presented our approach to Stanford's graduate AI program, diving deep into the AI agents and their architectural patterns that enable AI-native engineering workflows.

---

## What is AI-native engineering? Why is it important?

AI-Native Engineering is where engineers primarily interface with AI to orchestrate their work: be it writing code or working on production systems. "AI-native" is a significant departure from just "using AI" where engineers are still interfacing with their systems and tools, but using AI to speed up individual steps of the process. Here is an example workflow to showcase the distinction.

**AI-Assisted:** You use AI tools to work faster on tasks. The workflow remains human-centric: Engineer → Systems and tools → Correlation → Action. Engineers still interface with tools, just using AI to perform individual tasks faster.

**AI-Native:** AI becomes your primary interface for production work. The workflow becomes AI-led: Engineer → Natural Language Request → AI System → Response / Action. Engineers set goals and let AI agents handle the operational work.

Take incident response as an example. In AI-assisted workflows, you're still generating hypotheses, deciding which evidence matters, and manually correlating signals across tools. AI helps with data retrieval and analysis, but you're doing the heavy lifting in investigation.

AI-native incident response operates differently: AI agents automatically triage investigation priorities, generate competing hypotheses in parallel, and iteratively refine theories based on cross-system evidence. Instead of asking "Can you analyze these logs?" you say "Resolve this checkout failure" and agents coordinate the entire investigation.

This isn't just faster. It changes what problems deserve engineering attention. When AI agents handle log analysis, metric correlation, and deployment timeline reconstruction, engineers focus on architectural decisions and system design rather than tactical investigation.

The shift requires persistent AI agents, not just AI tools. While LLMs can accelerate individual tasks, only stateful agents can maintain investigation context, coordinate across multiple tools, and execute complex multi-step workflows autonomously.

---

## Why are multi-agent systems essential to make engineering AI-native?

Modern production systems exhibit what academics call "irreducible interdependence": understanding them requires specialized knowledge across domains that cannot be unified into a single coherent model. This is the insight most builders miss: No single AI tool can maintain expert-level knowledge across all these domains while coordinating an investigation.

**Example:** When API latency spikes 10x during a critical incident, the investigation requires simultaneous specialized analysis: correlating traces across 50+ microservices, analyzing slow database queries and connection pool exhaustion, checking recent deployments and infrastructure changes, scanning auth logs for security anomalies, evaluating auto-scaling decisions against current load patterns, and analyzing support tickets for customer impact with SLA context. Each activity requires domain-specific expertise and contextual data that no single system could effectively maintain.

As system complexity increases, individual AI tools face exponential growth in context requirements. This is where multi-agent systems can scale by combining coordination and individual domain specialization.

### Progression Framework: Technical Limitations at Each Level

| Approach | What it is | Where the approach breaks | Cause for limitation |
|----------|-----------|--------------------------|----------------------|
| **LLM** | Use LLMs for individual tasks like explanations, analysis, and documentation | Engineers still do majority of the operational work | Single-pass generation with no feedback loops or real-world integration |
| **LLM + Tools** | AI can fetch data from monitoring systems on command | Cognitive load of correlation remains on humans | Limited context windows, no persistent state management across tool interactions |
| **Single Agent** | AI follows investigation workflows independently | Sequential investigation, gets stuck on wrong hypotheses | Cannot manage diverse reasoning strategies or parallel investigation paths |
| **Multi-Agent** | Specialized AI agents coordinate parallel investigations | Requires investment in coordination protocols | Distributed intelligence needs formal communication schemas and conflict resolution |

The progression reveals a fundamental architectural truth: Each level hits a different scalability ceiling. LLMs lack a persistent state. Tool-augmented LLMs can't maintain investigation context across multiple chats. Single agents become decision bottlenecks as system complexity grows. Only multi-agent systems can break through the sequential reasoning constraint that limits all previous approaches. They enable parallel hypothesis testing while single agents must investigate sequentially, making them fundamentally unsuitable for the temporal demands of production incidents.

---

## Building multi-agent systems is a hard engineering problem

Building production-ready multi-agent systems requires a rare combination of deep domain expertise and AI engineering prowess. Most attempts fail because teams have expertise in one area but not both. Here's why this dual expertise is needed:

**Domain expertise determines architecture:** You can't architect agents without understanding production realities. Only someone who's debugged production at 3 AM knows that log patterns and metric anomalies require fundamentally different investigation strategies. When payment failures spike, you need both database expertise and infrastructure expertise to determine the root cause. Decisions like this aren't AI problems. They're production decisions that shape how you build your multi agent system.

**AI expertise makes agents work together:** Once you've decomposed the problem, you hit the hard part of computer science. Context propagation between agents isn't intuition. It is managing directed acyclic graphs of information flow. Orchestrating parallel agents requires formal coordination protocols to prevent race conditions and deadlocks. The system needs to learn continuously both from interactions and ephemeral failure modes. Get one step wrong in coordinating agents and your system gets progressively worse, not better.

**The intersection creates breakthrough systems:** Domain knowledge without AI architecture is just expensive consulting. AI architecture without domain knowledge is just automation that investigates the wrong things. The breakthrough happens when you combine both: knowing what database connection pools do under load (domain) with building agents that can coordinate pool health checks with deployment timeline analysis and upstream service validation: all running in parallel without stepping on each other (AI systems).

At Resolve AI, our team includes engineers with over two decades of experience in production systems, founders who co-created OpenTelemetry and researchers with Deep AI expertise who are the minds behind Google DeepResearch and Gemini Agents. This combination lets us build systems that don't just understand that "payment failures are bad" but know to check connection pool metrics and correlate with upstream service degradation. All the while managing complex agent orchestration that prevents circular investigations and maintains coherent narrative threads across parallel execution paths.

---

## About Resolve AI

Resolve AI is your always-on AI SRE that helps you resolve incidents and run production. With Resolve AI, customers like DataStax, Tubi, and Rappi, have increased engineering velocity and systems reliability by putting machines on-call for humans and letting engineers just code. Learn more about AI-native engineering workflows at resolve.ai.

---

## Author Biographies

**Spiros Xanthos - Founder and CEO**

Spiros is the Founder and CEO of Resolve AI. He loves learning from customers and building. He helped create OpenTelemetry and started Log Insight (acquired by VMware) and Omnition (acquired by Splunk), most recently he was an SVP and the GM of the Observability business at Splunk.

**Gabor Angeli - Research Engineer**

Gabor Angeli brings extensive AI expertise, most recently at Google DeepMind and Square. His work on products like Gemini and Square Assistant touches millions of users daily. He joined Resolve AI to build Agentic AI systems that help engineers understand and navigate production systems.

**Bharat Khandelwal - Research Engineer**

Bharat is a Research Engineer at Resolve AI, where he builds agentic systems that enable large language models to debug and operate production software infrastructure. Prior to Resolve, he led machine learning initiatives at WorldQuant, designing transformer-based architectures for macroeconomic forecasting and incorporating LLM-driven sentiment signals from unstructured data. He has also worked at Moveworks on enterprise NLP systems and at Tower Research Capital, where he developed low-latency ML strategies for high-frequency trading. Bharat holds an M.S. in Computer Science from Stanford University, with a specialization in Artificial Intelligence, and a B.Tech. (Honors) in Computer Science from IIT Bombay.

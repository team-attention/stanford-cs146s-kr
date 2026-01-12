---
title: "Specs Are the New Source Code"
source_url: "https://blog.ravi-mehta.com/p/specs-are-the-new-source-code"
source_type: web
author: "Ravi Mehta, Danny Martinez"
fetch_date: "2026-01-12"
translation_status: none
---

# The Spec is Dead, Long Live the Spec!

[원본 링크](https://blog.ravi-mehta.com/p/specs-are-the-new-source-code)

**Authors:** Ravi Mehta and Danny Martinez
**Publication Date:** July 31, 2025

## Introduction

Throughout his career, the author has observed specifications becoming progressively shorter. At Microsoft, a PM's value was measured by spec weight; at Tripadvisor, legendary specs were scribbled napkins. Yet teams treat specs as necessary paperwork rather than valued work, celebrating engineers' code and designers' interfaces while overlooking specification quality.

This represents a fundamental mistake. In Ravi Mehta's Product Competency Toolkit, Feature Specification ranks first among twelve competencies, underpinning execution, delivery, and quality. Great specs form the foundation of effective product management.

## The Shifting Landscape

Development dynamics are transforming. Engineers move faster than ever—AI converts rough concepts into functional code within minutes. The bottleneck has shifted from building to understanding: **knowing what to build and aligning teams around requirements.**

The specification, once ephemeral paperwork, has become product management's foundation—essentially becoming the source code itself.

## Why PMs Are Suddenly the Bottleneck

Andrew Ng recently noted an unprecedented trend: "For the first time in my life that I saw managers proposed to me having twice as many PMs as engineers."

This validates previous predictions: as engineers accelerate through AI, companies require more PMs, not fewer. Product acceleration intensifies pressure on all PM competencies—customer understanding, feature design, impact validation—concentrating all demand into one artifact: the specification.

## Specs as the New Source Code

In traditional programming, human-readable source code compiles into optimized machine code. The source code represents the true source of truth, containing comments, structure, and documentation.

Sean Grove from OpenAI presents a provocative thesis: well-written prompts (specifications) constitute new source code. Currently, AI development reverses this logic. Teams craft careful prompts, the AI generates code, then teams discard prompts while preserving code.

"This feels like you shred the source and then you very carefully version control the binary," Grove observes.

Code represents a "lossy projection" from specifications. Reading code won't reveal complete intent—decompiling binaries doesn't recover original comments or variable names. Specifications contain everything. A sufficiently detailed spec can generate "good TypeScript, good Rust, servers, clients, documentation, tutorials, blog posts, and even podcasts."

Critically, specifications align both humans and machines toward shared objectives. Grove states: "A written specification effectively aligns humans and is the artifact that you use to communicate and discuss and debate and refer to and synchronize on."

He predicts: "In the near future, the person who communicates most effectively is the most valuable programmer. And literally, if you can communicate effectively, you can program."

The scarce skill isn't coding—it's writing specifications capturing complete intent and values. For product managers, this represents their traditional work, with machines now listening.

## Prototypes Haven't Killed the Spec

Historically, product lifecycles began with specifications driving wireframing, designing, prototyping, and MVP development. This felt necessary but burdensome.

This paradigm has fundamentally shifted: **the spec is often output, not input.**

Modern tools—v0, Lovable, Replit—enable functioning prototypes within hours without engineering. This isn't merely faster; it's fundamentally different. "Vibe coded" prototypes enable gathering real customer feedback before writing feature specs. Teams test assumptions, iterate flows, refine interactions.

**Old workflow:** vague idea → wireframes → designs → engineer-built MVP → customer feedback → painful spec revision → redesign → rebuild → uncertainty.

**New workflow:** vague idea → rapid prototype → customer feedback → crystal-clear spec → AI-assisted implementation.

Prototypes haven't eliminated specs—they've made them superior.

## Spec-Driven Development in Action

Danny Martinez, decimals founder, demonstrates practical spec-driven development. His platform enables creator economy experts placing network talent into jobs.

After shipping a landing page, the team needed providing experts quick access to their page link. Martinez's co-founder messaged: "We need a button in the header that directs to the company-apply page. I'm focused on the emails at the moment. This is vibe code-able if you can pick it up please."

**Tools employed:**
- Project management: Linear
- IDE: VS Code
- Extension: GitHub Copilot Pro
- Model: Claude Sonnet 4
- MCP Server: Linear MCP server

**Process steps:**
1. Generate Linear ticket from Slack message
2. Clarify desired copy in ticket
3. Open Copilot, prompt Claude accessing Linear ticket
4. Prompt Claude reviewing ticket against codebase
5. Prompt Claude creating branch and implementing changes
6. Test changes
7. Open GitHub pull request
8. Await engineer review/approval

The critical insight: a non-technical person successfully navigated Linear tickets, codebase, and engineering collaboration through strategic Claude prompts.

**Essential requirements:**
1. **Being specific:** Vague specs generate messy codebases. Claude helps refine initial ticket drafts and establish spec guidelines.
2. **Being selective:** This approach works for simpler tasks. Complex tickets require experienced personnel.
3. **Gatekeeping:** Engineer review ensures balance between simplicity and functionality.

Rules have changed. Specs represent source truth for everyone building products, including LLMs.

With appropriate setup, non-technical contributors can realistically contribute to codebases, gradually understanding systems and implementing changes independently rather than continually relying on Claude.

Potentially, AI agents could ship tickets while creators enjoy coffee breaks.

## Conclusion

William Gibson observed: "The future is already here—it's just not very evenly distributed."

AI gains remain profoundly uneven. Code, text, and image generation have achieved quantum leaps operating at "AI speed." Customer conversations, need discovery, and purchase persuasion remain at "human speed."

This uneven distribution reshapes product teams. Focus shifts from implementation toward understanding. Traditional PM skills—customer need comprehension, clear problem definition, elegant solution design—have become exponentially valuable.

Exceptional PMs transform insights into specifications: artifacts aligning teams, guiding implementation, and serving as lasting references in increasingly automated development environments.

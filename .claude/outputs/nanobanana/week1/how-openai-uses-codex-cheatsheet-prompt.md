# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets. Your goal is to restructure the provided text about "How OpenAI Uses Codex" into a highly visual, structured, and actionable guide for software engineers.

# Source Text

---
title: "How OpenAI Uses Codex"
source_url: "https://cdn.openai.com/pdf/6a2631dc-783e-479b-b1a4-af0cfbd38630/how-openai-uses-codex.pdf"
source_type: pdf
author: "OpenAI"
fetch_date: "2026-01-08"
translation_status: none
total_pages: 13
meaningful_pages: 11
---

# How OpenAI Uses Codex

[원본 링크](https://cdn.openai.com/pdf/6a2631dc-783e-479b-b1a4-af0cfbd38630/how-openai-uses-codex.pdf)

---

## Page 2

### Contents

| Section | Page |
|---------|------|
| Introduction | 3 |
| **Use Cases** | |
| Code understanding | 4 |
| Refactoring and migrations | 5 |
| Performance optimization | 6 |
| Improving test coverage | 7 |
| Increasing development velocity | 8 |
| Staying in flow | 9 |
| Exploration and ideation | 10 |
| Best Practices | 11 |
| Looking Ahead | 12 |

---

## Page 3

### Introduction

Codex is used daily across numerous technical teams at OpenAI like Security, Product Engineering, Frontend, API, Infrastructure, and Performance Engineering. Teams are using it to accelerate a range of engineering tasks, from understanding complex systems and refactoring large codebases to shipping new features and resolving incidents under tight deadlines.

Drawing from interviews with OpenAI engineers and internal usage data, we've compiled use cases and best practices that highlight how Codex helps our teams move faster, improve work quality, and manage complexity at scale.

---

## Page 4

### Use case 1: Code understanding

Codex helps our teams get up to speed quickly in unfamiliar parts of the codebase when onboarding, debugging, or investigating an incident.

They often use Codex to locate the core logic of a feature, map out relationships between services or modules, and trace data flow through a system. It also helps surface architecture patterns or missing pieces of documentation that would otherwise require significant manual effort to generate.

During incident response, Codex helps engineers ramp into new areas quickly by surfacing interactions between components or tracing how failure states propagate across systems.

#### Anecdotes from our teams

> *"When I fix a bug, I use Ask mode to see where else in the codebase the same issue might appear."*
>
> — Performance Engineer, Retrieval Systems

> *"When I'm on-call, I paste the stack trace and ask Codex where the auth flow lives. It jumps straight to the right files so I can triage fast."*
>
> — Site Reliability Engineer, API Platform

> *"Codex answers my 'Where would I do this?' repo questions across Terraform and Python way faster than grep."*
>
> — DevOps Engineer, Infrastructure Services

#### Sample prompts for code understanding:

- Where is the authentication logic implemented in this repo?
- Summarize how requests flow through this service from entrypoint to response.
- Which modules interact with [insert module name] and how are failures handled?

---

## Page 5

### Use case 2: Refactoring and migrations

Codex is commonly used to make changes that span multiple files or packages. For example, when engineers are updating an API, changing how a pattern is implemented, or migrating to a new dependency, Codex makes it easy to apply changes consistently.

It's especially useful when the same update needs to be made across dozens of files, or when the update requires awareness of structure and dependencies that aren't easily caught with a regex or find-and-replace.

They're also using it for code cleanup by breaking up oversized modules, replacing old patterns with modern ones, or preparing code for better testability.

#### Anecdotes from our teams

> *"Codex swapped every legacy `getUserById()` for our new service pattern and opened the PR. It did in minutes what would've taken hours."*
>
> — Backend Engineer, ChatGPT Web

> *"To clear launch blockers, I have Codex scan for every instance of the old pattern, summarize the impact in Markdown, then open PRs with the fixes."*
>
> — Product Engineer, ChatGPT Enterprise

#### Sample prompts for refactoring and migrations:

- Split this file into separate modules by concern and generate tests for each one.
- Convert all callback-based database access to async/await.

---

## Page 6

### Use case 3: Performance optimization

Codex is used to identify and address performance bottlenecks.

During tuning or reliability efforts, engineers prompt Codex to analyze slow or memory-intensive code paths, such as inefficient loops, redundant operations, or costly queries and suggest optimized alternatives, often resulting in meaningful gains in efficiency and reliability.

Codex is also used to support code health by identifying risky or deprecated patterns that are still in active use. Our teams lean on it to help reduce long-term tech debt and proactively prevent regressions.

#### Anecdotes from our teams

> *"I use Codex to scan for repeated expensive DB calls. It's great at flagging hot paths and drafting batched queries I can later tune."*
>
> — Infrastructure Engineer, API Reliability

> *"Codex is great for spotting performance issues quickly—I save 30 minutes of work by spending 5 minutes on a prompt."*
>
> — Platform Engineer, Model Serving

#### Sample prompts for performance optimization:

- Optimize this loop for memory efficiency and explain why your version is faster.
- Find repeated expensive operations in this request handler and suggest caching opportunities.
- Suggest a faster way to batch DB queries in this function.

---

## Page 7

### Use case 4: Improving test coverage

Codex helps engineers write tests faster — especially in places where coverage is thin or completely missing.

When working on a bug fix or refactor, engineers often ask Codex to suggest tests that cover edge cases or likely failure paths. For new code, it can generate unit or integration tests based on the function signature and surrounding logic.

Codex is particularly helpful for identifying boundary conditions like empty inputs, max length, or unusual but valid states that are often missed in initial tests.

#### Anecdotes from our teams

> *"I point Codex at low-coverage modules overnight and wake up to runnable unit-test PRs."*
>
> — Frontend Engineer, ChatGPT Desktop

> *"When switching mono-repo branches is painful, I have Codex write the tests and kick-off CI while I keep working on my branch."*
>
> — Backend Engineer, Payments & Billing

#### Sample prompts for improving test coverage:

- Write unit tests for this function, including edge cases and failure paths.
- Generate a property-based test for this sorting utility.
- Extend this test file to cover missing scenarios around null inputs and invalid states.

---

## Page 8

### Use case 5: Increasing development velocity

Codex helps teams move faster by accelerating both the start and end of the development cycle.

When kicking off a new feature, engineers use it to scaffold boilerplate — generating folders, modules, and API stubs to get runnable code up quickly without hand-wiring every piece.

As projects approach release, Codex helps meet tight deadlines by handling smaller but essential tasks like triaging bugs, filling in last-mile implementation gaps, and generating rollout scripts, telemetry hooks, or config files.

It's also used to turn product feedback into starter code. Engineers often paste in a user request or spec and have Codex generate a rough draft they can return to and refine later.

#### Anecdotes from our teams

> *"I was in meetings all day and still merged 4 PRs because Codex was working in the background."*
>
> — Product Engineer, ChatGPT Enterprise

> *"Codex helped ship 3-4 low-priority fixes perfectly that would've languished in the backlog, which was super empowering."*
>
> — Full-Stack Engineer, Internal Tools

#### Sample prompts for increasing development velocity:

- Scaffold a new API route for POST /events with basic validation and logging.
- Generate a telemetry hook for tracking success/failure of the new onboarding flow, using this template [insert example of your telemetry code].
- Create a stub implementation based on this spec: [insert spec or product feedback].

---

## Page 9

### Use case 6: Staying in flow

Codex helps our engineers stay productive when their schedules are fragmented and filled with interruptions.

It's used to capture unfinished work, turn notes into working prototypes, or spin off exploratory tasks that can be revisited later. This makes it easier to pause and resume work without losing context, especially when they're on call or have a lot of meetings.

#### Anecdotes from our teams

> *"If I spot a drive-by fix, I fire a Codex task instead of swapping branches and review its PR when I'm free."*
>
> — Backend Engineer, ChatGPT API

> *"I routinely forward Slack threads, Datadog traces, issues and more to Codex so I can stay focused on high priority work."*
>
> — API Engineer, Infrastructure Observability

#### Sample prompts for staying in flow:

- Generate a plan to refactor this service and split it into smaller modules.
- Stub out the retry logic and add a TODO — I'll fill in the backoff logic later.
- Summarize this file so I can pick up where I left off tomorrow.

---

## Page 10

### Use case 7: Exploration and ideation

Codex is also useful for open-ended work like finding alternative solutions or validating design decisions. You can prompt for different ways of solving a problem, explore unfamiliar patterns, or pressure-test assumptions. This helps surface tradeoffs, expand design options, and sharpen implementation choices.

It's also used to identify related bugs. Given a known issue or deprecated method, Codex can identify similar patterns elsewhere in the code, making it easier to catch regressions or finish cleanup work.

#### Anecdotes from our teams

> *"Codex helps me solve the cold-start problem — I paste a spec and docs and it scaffolds code or shows me what I forgot."*
>
> — Product Engineer, ChatGPT Desktop

> *"After I fix a bug I ask Codex where similar bugs might lurk, then spin follow-up tasks."*
>
> — Performance Engineer, Retrieval Systems

#### Sample prompts for exploration and ideation:

- How would this work if the system were event-driven instead of request/response?
- Find all modules that manually build SQL strings instead of using our query builder.
- Rewrite this in a more functional style, avoid mutation and side effects.

---

## Page 11

### Best practices

Codex works best when it's given structure, context, and room to iterate. Here are some of the habits OpenAI teams are cultivating to get consistent value out of it in day-to-day work.

#### Start with Ask Mode

For large changes, start by prompting Codex for an implementation plan using Ask mode, which then becomes the input for follow-up prompts when you switch to Code Mode. This two-step flow keeps Codex grounded and helps avoid errors in its output. Codex works best with well-scoped tasks that would take you or a teammate about an hour to complete or a few hundred lines of code to implement. As models improve, expect the size of the tasks it can take on to increase.

#### Iteratively improve Codex's development environment

Setting a startup script, environment variables, and internet access significantly reduces Codex's error rate. As you run tasks, look for build errors that can be corrected in Codex's environment configuration. This may take a few iterations, but gives significant efficiency gains in the long run.

#### Structure your prompt as if you are writing a Github Issue

Codex responds better when prompts mirror how you'd describe a change in a PR or issue. That means including file paths, component names, diffs, and doc snippets when relevant. Prompting with patterns like "Implement this the same way it's done in [module X]" improves results.

#### Use the Codex task queue as a lightweight backlog

Fire off tasks to capture tangential ideas, partial work, or incidental fixes. There's no pressure to generate a full PR in one go. Codex works well as a staging area you can return to when you're back in focus.

---

## Page 12

### Best practices (continued)

#### Use AGENTS.md to supply persistent context

Maintain an AGENTS.md file to help Codex operate more effectively in your repo across prompts. These files typically include naming conventions, business logic, known quirks, or dependencies Codex can't infer from the code alone. Learn more on structuring your AGENTS.md file in the docs.

#### Leverage "Best of N" to improve output

The Best-of-N feature lets you simultaneously generate multiple responses for a single task to quickly explore multiple solutions and pick the best one. For more complicated tasks, you can review several iterations and combine parts of different responses to get a stronger result.

---

### Looking ahead

Codex is still in research preview, but it's already making a real impact in how we build, helping us move faster, write better code, and take on work that would've otherwise never been prioritized.

We're excited by the potential ahead — as our models get better and Codex becomes more deeply integrated into our workflows, we're looking forward to unlocking even more powerful ways to develop software with it. We'll continue to share what we learn along the way.

---

# Output Style: "Nano Banana" Cheat Sheet

Please adhere to the following formatting rules strictly:

1. **Visual Hierarchy & Structure**:
   - Use strict Markdown structure.
   - Use specific emojis for every section header to improve scanning.
   - Use **Bold** for key concepts and commands.
   - Group related information logically.

2. **Diagrams & Schematics (CRITICAL)**:
   - Use `mermaid` code blocks to visualize concepts.
   - Create a **Mind Map** for the overall structure of Use Cases.
   - Create a **Flowchart** for the "Best Practices" workflow.
   - Ensure diagrams are complex enough to be informative but simple enough to be read at a glance.

3. **Tabular Data**:
   - Convert the "Use Cases" section into a comprehensive Markdown Table.
   - Columns should be: [Use Case Context] | [Key Benefit] | [Example Scenario] | [Sample Prompt].

4. **Actionable Content**:
   - Extract "Sample prompts" into separate code blocks for easy copying.
   - Summarize "Best Practices" into a Checklist format (e.g., `[ ]`).

# Output Structure Plan

## 1. 🧠 Executive Summary (Mind Map)

Create a Mermaid mindmap with the following structure:
- Root: "Codex"
- Level 1 branches: 7 Use Cases
  - Code Understanding
  - Refactoring & Migrations
  - Performance Optimization
  - Test Coverage
  - Development Velocity
  - Staying in Flow
  - Exploration & Ideation
- Level 2: Each Use Case's key benefits (1-2 per case)
  - Code Understanding → 빠른 온보딩, 인시던트 대응
  - Refactoring → 일관된 대규모 변경, 패턴 교체
  - Performance → 병목 발견, 기술 부채 감소
  - Test Coverage → 엣지 케이스, 경계 조건
  - Velocity → 보일러플레이트 자동화, 릴리스 가속
  - Flow → 컨텍스트 유지, 비동기 작업
  - Exploration → 대안 탐색, 버그 사냥

## 2. 🛠️ Engineering Use Case Matrix (Table)

Create a detailed table with the following structure:
- Columns: [Use Case] | [핵심 이점] | [예시 상황] | [샘플 프롬프트]
- Rows: One for each of the 7 Use Cases

Example rows:
| Code Understanding | 빠른 온보딩, 인시던트 대응 | 온콜 중 스택트레이스 분석 | Where is the auth logic? |
| Refactoring | 일관된 대규모 변경 | API 패턴 교체 | Split this file into modules... |
| Performance | 병목 발견, 기술 부채 감소 | DB 쿼리 최적화 | Find repeated expensive operations... |
| Test Coverage | 엣지 케이스 커버 | 커버리지 확대 | Write unit tests including edge cases... |
| Velocity | 보일러플레이트 자동화 | 신규 API 착수 | Scaffold a new API route... |
| Flow | 컨텍스트 유지 | 회의 중 작업 위임 | Summarize this file... |
| Exploration | 대안 탐색, 버그 사냥 | 설계 검증 | How would this work if event-driven? |

## 3. 💡 Best Practices Workflow (Flowchart)

Create a Mermaid flowchart showing the recommended workflow:

```
Start → Ask Mode로 계획 수립 → 환경 설정 반복 개선 → GitHub Issue 스타일 프롬프트
→ Task Queue를 백로그로 활용 → AGENTS.md로 컨텍스트 제공 → Best of N으로 결과 비교 → Complete
```

Include brief descriptions for each step:
- Ask Mode: 대규모 변경 전 구현 계획 먼저 요청
- 환경 설정: startup script, 환경변수 설정으로 오류율 감소
- GitHub Issue 스타일: 파일 경로, 컴포넌트명, diff 포함
- Task Queue: 부분 작업, 아이디어 캡처용
- AGENTS.md: 네이밍 규칙, 비즈니스 로직 문서화
- Best of N: 여러 응답 생성 후 최적 선택

## 4. ⚡ Quick Reference: Golden Prompts

Group the 22 sample prompts by category in code blocks:

**Code Understanding (3 prompts)**
```
Where is the authentication logic implemented in this repo?
Summarize how requests flow through this service from entrypoint to response.
Which modules interact with [module name] and how are failures handled?
```

**Refactoring & Migrations (2 prompts)**
```
Split this file into separate modules by concern and generate tests for each one.
Convert all callback-based database access to async/await.
```

**Performance Optimization (3 prompts)**
```
Optimize this loop for memory efficiency and explain why your version is faster.
Find repeated expensive operations in this request handler and suggest caching opportunities.
Suggest a faster way to batch DB queries in this function.
```

**Test Coverage (3 prompts)**
```
Write unit tests for this function, including edge cases and failure paths.
Generate a property-based test for this sorting utility.
Extend this test file to cover missing scenarios around null inputs and invalid states.
```

**Development Velocity (3 prompts)**
```
Scaffold a new API route for POST /events with basic validation and logging.
Generate a telemetry hook for tracking success/failure of the new onboarding flow.
Create a stub implementation based on this spec: [spec or product feedback]
```

**Staying in Flow (3 prompts)**
```
Generate a plan to refactor this service and split it into smaller modules.
Stub out the retry logic and add a TODO — I'll fill in the backoff logic later.
Summarize this file so I can pick up where I left off tomorrow.
```

**Exploration & Ideation (3 prompts)**
```
How would this work if the system were event-driven instead of request/response?
Find all modules that manually build SQL strings instead of using our query builder.
Rewrite this in a more functional style, avoid mutation and side effects.
```

## 5. 🔮 Key Takeaways (Checklist)

Summarize the critical best practices as a checklist:

**Prompt Engineering**
- [ ] Ask Mode로 먼저 계획 세우기 (대규모 변경 시)
- [ ] 1시간 분량, 수백 줄 범위로 태스크 스코핑
- [ ] GitHub Issue처럼 구체적으로 프롬프트 작성 (파일 경로, diff 포함)
- [ ] "Implement this the same way as [module X]" 패턴 활용

**Context & Setup**
- [ ] AGENTS.md로 저장소 컨텍스트 제공 (네이밍, 비즈니스 로직, quirks)
- [ ] startup script, 환경변수 설정으로 오류율 감소
- [ ] 환경 설정 반복 개선 (빌드 에러 → config 수정)

**Workflow Optimization**
- [ ] Task Queue를 가벼운 백로그로 활용
- [ ] Best of N으로 여러 해법 비교 후 최적 선택
- [ ] 부분 응답 조합으로 더 강력한 결과 도출

**Future Outlook**
- Codex는 아직 research preview 단계
- 모델 발전에 따라 처리 가능한 태스크 규모 증가 예상
- 워크플로우 통합이 심화될수록 더 강력한 개발 방식 가능

---

Please generate the Cheat Sheet now.

내가 말하는 cheat sheet는 보기 좋게 정리된, 실제 펜 노트필기 같은 이미지를 말하는거야.
용어 및 고유명사는 영어 원문을 쓰되(Codex, Ask Mode, Code Mode, Best of N, AGENTS.md, PR, API, ChatGPT, Terraform, Python, CI, GitHub Issue 등), 필기 내용은 한국어로 작성해.

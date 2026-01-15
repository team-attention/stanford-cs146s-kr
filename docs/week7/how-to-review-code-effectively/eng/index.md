---
title: "How to Review Code Effectively: A GitHub Staff Engineer's Philosophy"
source_url: "https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/"
source_type: web
author: "Sarah Vessels"
fetch_date: "2026-01-13"
translation_status: none
---

# How to Review Code Effectively: A GitHub Staff Engineer's Philosophy

[원본 링크](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/)

## Introduction

GitHub Staff Engineer Sarah Vessels shares her approach to code review, drawing on experience reviewing over 7,000 pull requests across eight years. She emphasizes that code review represents one of the most critical aspects of software development and prioritizes reviewing teammate pull requests over continuing her own work.

## What is Code Review?

Code review through pull request reviews enables collaborators to comment on proposed changes, approve modifications, or request further refinements before merging. Vessels frames a pull request as "the beginning of conversation" where the author proposes improvements to existing code. The reviewer's responsibility involves dialogue with the author to enhance code quality through questioning assumptions and providing additional perspective.

### Why Review Code? It's Good for Your Career

Code reviews generate significant career impact by facilitating knowledge exchange and accelerating shipping velocity. These reviews create "linkable artifacts" that peers and managers can reference when evaluating professional contributions. Effective code review comments demonstrate communication abilities, particularly when addressing complex or contentious changes. Strong reviews can guide product direction, prevent incidents, and advance career progression.

## Fine-Tune Your Code Review Process

### How to Find Pull Requests for Review

Vessels maintains her GitHub notifications inbox as a primary workspace, checking it whenever waiting on CI builds, between tasks, or at day start. Teams typically maintain dedicated Slack channels for sharing ready-to-review pull requests—another valuable discovery channel.

The GitHub Slack integration enables subscribing channels to relevant pull requests using commands like `/github subscribe your/repo pulls +label:"your-team-label"`.

She recommends using advanced search queries like: `is:open archived:false is:pr org:github -is:draft team-review-requested:github/relevant-codeowner-team`

This query locates open, unarchived pull requests within an organization that aren't drafts and have specific codeowner teams as requested reviewers.

> "I usually will omit the review:required search qualifier because I'm interested in reviewing a pull request even if a teammate has already reviewed it."

### Use Reviewer Teams to Manage Notifications

Large reviewer teams create diffusion of responsibility, where everyone assumes someone else will review, resulting in neglected or prematurely merged pull requests. Vessels recommends narrowing codeowner team membership to maintain manageable notifications where each PR feels personally relevant.

While large catch-all teams provide fallback coverage, they shouldn't serve as default automatic reviewers. Well-organized CODEOWNERS files with clearly defined code boundaries help limit notifications and prevent reviewer fatigue.

One strategy involves creating first responder teams using automation to rotate members based on schedules. Using the PagerDuty API to identify current first responders, organizations can leverage the Octokit library to automatically add and remove team members.

### Standardize Code Reviews Across Teams with Automation

Repository-level tools like CODEOWNERS files and branch protection rules enforce review standards. Team-specific standards require human maintenance and clear documentation. Teams should document their code review processes, including expected turnaround times and automation in use.

Some teams use project boards tracking incoming reviews—effective for teams managing shared APIs modified by external contributors. Others rely on GitHub notifications with tightly scoped code ownership and disciplined review habits.

For teams with many external dependencies, automated comments can communicate expectations. Bots can leave messages on pull requests needing review, indicating when feedback is anticipated.

## What Makes Code Review Good or Bad?

Good code reviews add clarity and advance code toward improved states. Poor reviews lack specificity and leave authors uncertain about thoroughness or next steps.

### Clarity in Communication

Effective reviewers distinguish between personal preferences and approval blockers. Providing specific examples from the same repository strengthens suggestions through consistency demonstration. Unclear reviews—those offering blanket approval or rejection without comments—leave authors questioning thoroughness.

Likewise, ambiguous implementation timelines frustrate authors. Reviewers should explicitly state whether suggestions prevent approval or represent optional improvements.

### Example of Effective Code Review Comment

"I see your new method matches the existing style in this file, taking [X] parameters. Having that many parameters hurts readability and implies the function is doing too much. What do you think about refactoring this method and the existing ones in a later pull request to reduce how many parameters they take?"

**Strengths of this comment:**
- Provides specific details
- References specific code or issues
- Suggests clear resolutions
- Cites evidence or provides explanations

### Examples of Reviewable but Weak Comments

**"I don't like this."**
- Improvement: "This line is doing a lot; could we simplify it?"
- Improvement: "This will have n+1 query performance problems."
- Improvement: "Could we use [framework's] solution instead of custom implementation?"

**"This won't work."**
- Improvement: "This won't work because [X]; see this issue: [link]."
- Improvement: "This was tried in [PR link] and failed because [X]."
- Improvement: "If you encounter [X] problems, try [alternative approach]."

**"I think this fixes a bug."**
- Improvement: "I think this fixes [issue link]."
- Improvement: "Is this fixing the bug from [issue link]?"
- Improvement: "This looks like the bug from [link]. Thanks for the fix!"

## How to Give a Good Code Review

### Ask Questions

Vessels treats pull request authors as possessing the most context about their changes. She trusts authors' answers to her questions, viewing their understanding as superior to her own, despite her experience across different technology stacks.

> "If you're new to a code base or team, ask questions in code reviews to learn about the tech stack and what internal tools and libraries are available."

Questions exploring code assumptions prove particularly valuable: What data shapes does the code work with? Does the code handle mismatched shapes well? Is the code resource-intensive? Will performance remain adequate?

Vessels prefers author responses including automated tests verifying behavior in edge cases. Her second preference involves empirical data from data warehouses or monitoring systems demonstrating why scenarios present no problems.

### Offer Affirmations

Beyond questions, reviewers should comment on appreciated pull request elements. These affirmations indicate thorough reading and understanding:

- "This matches the pattern used in other classes in this module."
- "Thank you for adding tests for this!"
- "This reads much more clearly now."

Such comments provide psychological benefits. Code review can feel draining when receiving multiple suggestions. Affirmatory comments without demands provide motivation and acknowledgment of completed work.

### Be Aware of Biases and Assumptions

Reviewer biases about code areas or author seniority risk overlooking problems. Everyone makes mistakes regardless of experience level. Reviewer perspective catches issues before deployment.

Vessels advocates writing tests to reduce bias. Tests verify behavior objectively rather than requiring author credibility. Junior developers should ask questions even on obvious topics—unclear items to one person remain unclear to others. Questions preserve educational value for future readers.

### To Approve or Not

Vessels views approval as a blocking gate preventing product improvement, so she withholds approval conscientiously. She may suggest optional changes without withholding approval if the pull request won't break production or harm users. Authors can address feedback before merging or in subsequent branches.

> "Use feature flags and make your pull requests small. The less scary your change is, the faster it can be reversed in production."

Consider feedback importance when reviewing. Does delaying the ship justify addressing suggestions? Does the improvement cycle—author revision, CI waiting, re-review, deployment, merging—merit the change? If missing suggestions don't worsen user experience, let authors decide about implementation.

The 'Request changes' option stops merging until the reviewer re-approves. Vessels rarely uses it, preferring to trust team judgment about approval. She only selects 'Request changes' for immediate security issues where she worries about pre-merge discovery.

### Why Code Reviews Matter When Using AI Coding Tools

AI coding tools include safeguards against incorrect or insecure code, but shouldn't create false security. Human reviewers remain the final defense and should review all code with equal diligence.

## How to Get the Most Out of Code Reviews

### Review Your Own Code

GitHub Senior Software Engineer Paul Smith taught Vessels to self-review before requesting others' reviews. Authors should leave inline comments on non-obvious changes they'd question in others' code. Self-review identifies overly large pull requests benefiting from splitting.

Tip: Use [lerebear/sizeup-action](https://github.com/lerebear/sizeup-action) to automatically apply labels indicating pull request complexity and size.

### Be Welcoming of Post-Merge Reviews

If pull requests merge before review completion, Vessels still welcomes later feedback. Post-merge comments create breadcrumb trails helping future readers understand what happened. She addresses merged pull request feedback identically to pre-merge feedback—through explanatory comments, additional pull requests, or new issues capturing ongoing work.

### Use Draft Pull Requests

Creating pull requests as drafts signals review readiness. Vessels uses draft status to indicate incomplete work or failing CI. She expects similar from others: drafts suggest authors aren't ready for reviews. Ready-for-review status implies sufficient approval remains the only merge prerequisite.

Draft status implies incompleteness. Vessels marks pull requests as draft when resolving conflicts or addressing feedback. Moving to 'ready' notifies previous reviewers for re-evaluation.

### Be Gracious

The principle "you catch more flies with honey than vinegar" applies. Vessels replies to pull request comments—especially when disagreeing. Even without written replies, she reacts with 👍 for agreement or ❤ for gratitude.

Authors remain in the loop through comments. If agreeing with suggestions but declining current-PR implementation, Vessels says so. When addressing feedback in later branches, she returns with links and gratitude tags crediting original reviewers.

Tagging reviewers in related pull requests like "This addresses @so-and-so's feedback from [link]" provides context and acknowledgment. Following through on feedback promises builds trust encouraging comfortable future approvals.

## Wrap-up

Code review importance for product quality cannot be overstated, especially with AI code generation. Numerous bugs have been caught and incidents prevented through second-set-of-eyes review. Code review deserves time investment in daily reviews, process refinement, and automation building.

> "It's faster and less painful for developers to review pull requests thoroughly now than to deal with a problem later that's already shipped to production."

Readers are encouraged to check their review queue and implement discussed principles. For additional guidance, Mickey Gousset and Joshua Johanning offer "5 Tips for Reviewing a Pull Request" in GitHub Community discussions.

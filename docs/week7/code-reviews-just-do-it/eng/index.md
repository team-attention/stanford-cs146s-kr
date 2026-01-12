---
title: "Code Reviews: Just Do It"
source_url: "https://blog.codinghorror.com/code-reviews-just-do-it/"
source_type: web
author: "Jeff Atwood"
fetch_date: "2026-01-13"
translation_status: none
---

# Code Reviews: Just Do It

[원본 링크](https://blog.codinghorror.com/code-reviews-just-do-it/)

## 본문

In *Humanizing Peer Reviews*, Karl Wiegers emphasizes:

> "Peer review – an activity in which people other than the author of a software deliverable examine it for defects and improvement opportunities – is one of the most powerful software quality tools available."

Jeff Atwood argues that **peer code reviews represent the single most impactful practice for improving code quality**. He stresses that code shouldn't be considered complete until reviewed with another developer.

## Evidence from Code Complete

Steve McConnell's research demonstrates code inspections' superiority over testing alone:

- Unit testing: 25% defect detection rate
- Function testing: 35% defect detection rate
- Integration testing: 45% defect detection rate
- **Design inspections: 55% effectiveness**
- **Code inspections: 60% effectiveness**

### Case Studies

Key examples include:

- A maintenance organization reduced errors from 55% to 2% post-review implementation
- Programs developed with reviews showed 80%+ fewer errors (0.82 vs 4.5 per 100 lines)
- Aetna Insurance detected 82% of errors through inspections
- IBM's Orbit project achieved only 1% of expected error rates
- AT&T organization achieved 14% productivity gains and 90% defect reduction
- JPL saves approximately $25,000 per inspection through early defect detection

## Recommendation

Atwood recommends Karl Wiegers' book *Peer Reviews in Software: A Practical Guide* for organizations new to code reviews.

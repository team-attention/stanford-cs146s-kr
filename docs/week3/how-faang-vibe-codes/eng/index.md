---
title: "How FAANG Vibe Codes"
source: "https://www.reddit.com/r/vibecoding/comments/1myakhd/how_we_vibe_code_at_a_faang/"
author: "Reddit u/[작성자]"
type: "article"
---

# How FAANG Vibe Codes

Hey folks. I wanted to post this here because I’ve seen a lot of flak coming from folks who don’t believe AI assisted coding can be used for production code. This is simply not true.

For some context, I’m an AI SWE with a bit over a decade of experience, half of which has been at FAANG or similar companies. The first half of my career was as a Systems Engineer, not a dev, although I’ve been programming for around 15 years now.

Anyhow, here’s how we’re starting to use AI for prod code.

You still always start with a technical design document. This is where a bulk of the work happens. The design doc starts off as a proposal doc. If you can get enough stakeholders to agree that your proposal has merit, you move on to developing out the system design itself. This includes the full architecture, integrations with other teams, etc.

Design review before launching into the development effort. This is where you have your teams design doc absolutely shredded by Senior Engineers. This is good. I think of it as front loading the pain.

If you pass review, you can now launch into the development effort. The first few weeks are spent doing more documentation on each subsystem that will be built by the individual dev teams.

Backlog development and sprint planning. This is where the devs work with the PMs and TPMs to hammer out discrete tasks that individual devs will work on and the order.

Software development. Finally, we can now get hands on keyboard and start crushing task tickets. This is where AI has been a force multiplier. We use Test Driven Development, so I have the AI coding agent write the tests first for the feature I’m going to build. Only then do I start using the agent to build out the feature.

Code submission review. We have a two dev approval process before code can get merged into man. AI is also showing great promise in assisting with the review.

Test in staging. If staging is good to go, we push to prod.

Overall, we’re seeing a ~30% increase in speed from the feature proposal to when it hits prod. This is huge for us.

TL;DR: Always start with a solid design doc and architecture. Build from there in chunks. Always write tests first.
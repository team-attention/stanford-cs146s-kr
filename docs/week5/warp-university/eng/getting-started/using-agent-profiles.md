---
title: "Using Agent Profiles"
titleKr: "에이전트 프로필 사용하기"
category: "getting-started"
sourceUrl: "https://youtu.be/iD0R-8fY-tY"
---
# Using Agent Profiles

[영상 바로가기](https://youtu.be/iD0R-8fY-tY)

## 전체 자막

Today I'm going to teach you about agent profiles in Warp. Agent profiles let you configure how your coding agents behave in different situations. So in this video I'm going to show you how two different agent profiles will handle the exact same coding project, which is going to be building an NFL predictor app. The idea is simple. Scrape NFL data from the past 10 years, process that into structured stats like scores, teams, and players, and then use that data to predict future wins for the upcoming season. The prompt included instructions on the data sources, tech constraints, dependencies, the exact CLI commands, implementation details, and final deliverables. First up is the strategic agent. For the base model, I used GPT5 because it provides strong reasoning while being still efficient at generating code. For the planning model, I chose Cloud 4 Opus because Opus is great at breaking down complex projects into long, detailed step-by-step plans.

The strategic agent is set so that applying code diffs and reading files are agent decides. Creating plans is always allow and executing commands is always asked. When I run the NFL predictor prompt with this agent, the first thing it does is ask me clarifying questions. Do you want me to scrape both player stats and schedules or focus on one first? Where should I store raw data files in a local folder or in a database? And it asks me to answer these questions before the agent continues on.

Then the agent generates a 14-step plan.

is super thorough setting up project structure, configuring dependencies, adding type safety with Pyantic, building ingestion modules, creating validation layers, and more. Now, about halfway through, it pauses and asks me to configure URLs for NFL schedules.

Essentially, the agent is saying, "Where do I go to download the game schedule?" And it gave me three supported options.

It wanted me to set environment variables so that that way it could dynamically build links to build schedule files for each season. I wasn't really closely following what was going on. So I picked option B, the CSV version. But the URLs it generated kept returning 404 errors because the actual NFL verse repository had changed its structure. So even though the plan was solid, the execution stalled when it couldn't fetch the scheduled data. Next, I switched to the YOLO agent. The YOLO agent is set so that applying code diffs and reading files are always allow.

Creating plans is never, and executing commands is always allow. As you can see, the agent profile has far fewer guard rails. It doesn't ask me for permission and doesn't bother me with long plans. Instead of 13 steps, it created a shorter 10-step plan. It skipped over things like detailed validation modules, orchestrators, or extensive test scaffolding. Instead, it went straight for the essentials like initializing the project, implementing a CLI, ingesting the NFL verse player data, building scoring calculations, transforming the data, and more. And importantly, instead of starting with schedules, it went directly to player stats, which have stable, reliable URLs.

Essentially, the YOLO agent decided not to pull schedule data at all in its first pass. Instead, it built the core pipeline around weekly player level stats, things like passing, rushing, and receiving numbers because those end points are consistent and don't change.

By avoiding schedules, it skipped the part of the pipeline that was brittle and causing 404 errors for the strategic agent. The end result was that the yellow agent produced a working data set of player performance and even generated a final summary table. So, here you can see the trade-off clearly. The strategic agent is methodical, transparent, and configurable. It asks for input, builds safety nets, and makes sure you know what's happening, but it also requires you to stay engaged. If you don't give it the right environment variables or valid data sources, it could stall. The YOLO agent skips the extra steps and charges ahead. This makes it great for vibe coding projects where you just want results fast. But then you do sacrifice some structure, testing, and checkpoints. And I do want to stress something, which is the fact that the strategic agent didn't finish doesn't mean it was worse. It just meant it wasn't the right tool for this specific scenario. If I was working on a production code base where correctness and clarity mattered more than speed, then I would absolutely prefer the strategic agent. But either way, that is a quick look at how different agent profiles can change your experience in warp. And I hope that this video was helpful.

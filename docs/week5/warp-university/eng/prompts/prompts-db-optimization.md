---
title: "Create Priority Matrix for Database Optimization"
titleKr: "데이터베이스 최적화를 위한 우선순위 매트릭스 만들기"
category: "prompts"
sourceUrl: "https://youtu.be/VgE5wgtDSnk"
---
# Create Priority Matrix for Database Optimization

[영상 바로가기](https://youtu.be/VgE5wgtDSnk)

## 전체 자막

One of the biggest bottlenecks in your app's performance is your database. And there is a lot of ways it can slow down.

So when you ask AI, optimize this database query, it could literally mean a million things. More secure, faster, easier to read. So here's a prompt you can use in Warp that will analyze your query in every regard. Now, this is a very long prompt, but we will save you a ton of time. It will go through your entire codebase and find all areas where SQL is being used. We ask Warp to use SQL's built-in explain methods to get performance from the source. We then go through common scenarios that cause slowdowns like N plus1's, missing indexes, etc. Now, I added a priority matrix that will showcase all of the optimizations Wart found and graph it based on impact, risk, and effort. A database is the heart of your entire web stack. So, don't skip out on this helpful prompt.

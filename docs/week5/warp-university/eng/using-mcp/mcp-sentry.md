---
title: "Using Sentry MCP Server"
titleKr: "Sentry MCP 서버 사용하기"
category: "using-mcp"
sourceUrl: "https://youtu.be/mOzC0RyP9YA"
---
# Using Sentry MCP Server

[영상 바로가기](https://youtu.be/mOzC0RyP9YA)

## 전체 자막

The Sentry MCP server lets your agent pull live error data from Sentry. So for this example, I'm using the Empower Plant repo, which is Sentry's official demo project. It's a fake ecommerce plant store with a React front end and multiple backend options built with real bugs for testing. To set it up, I'm pasting in the Sentry JSON config into Warps MCP panel and hitting save. I'm going to go ahead and run the app locally and then visit the website, which triggers a couple of errors. I'm going to go into the Sentry dashboard, click on the type error that I want to fix, and copy the link to this issue.

Then I'm going to prompt Warp to diagnose the Sentry error as well as tell me things like show where it's coming from in the code and create a fix. The Sentry MCP server is going to call get issue details, which pulls the stack trace from Sentry, and then Warp is going to scan my codebase. It actually finds the issue which was essentially just calling the two uppercase function on an array and then even creates a simple code change to fix it. Without the Sentry MCP server, the AI wouldn't have been able to access those authenticated error details, which means that it would have had less context and weaker fixes. With this, I get an exact diagnosis and a working patch in one

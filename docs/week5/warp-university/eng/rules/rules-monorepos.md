---
title: "Link Your Monorepos with Rules"
titleKr: "규칙으로 모노레포 연결하기"
category: "rules"
sourceUrl: "https://youtu.be/bndY6opaA7w"
---
# Link Your Monorepos with Rules

[영상 바로가기](https://youtu.be/bndY6opaA7w)

## 전체 자막

describe any interrelated projects you have and where they live. At Warp, we have three repositories that relate to each other. There's Warp Server with our server side code, Warp Internal, which is our client app, and Warp Proto APIs, which stores the API schema they use to talk to each other. This is best set up as a global rule for your agent, and I've done that here in Warp. Here I've described the three repositories we have and some practices to update the schema and update types across repositories.

This is great when I make changes in the future because as soon as the coding agent updates the schema, it knows to CD into warp server and update the types there. Then do the same on the client.

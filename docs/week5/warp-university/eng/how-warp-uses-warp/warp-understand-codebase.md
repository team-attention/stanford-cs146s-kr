---
title: "Understanding your Codebase with Warp"
titleKr: "Warp로 코드베이스 이해하기"
category: "how-warp-uses-warp"
sourceUrl: "https://www.youtube.com/watch?v=pohnoRZas-E"
---
# Understanding your Codebase with Warp

[영상 바로가기](https://www.youtube.com/watch?v=pohnoRZas-E)

## 전체 자막

Hi, I'm Kevin. I'm a software engineer working at Warp.

&gt;&gt; Hi, I'm Lucy, also a software engineer here at Warp.

&gt;&gt; Today, we're going to introduce a new feature we're building to Warp called Context. It gives Warp's understanding and the capability to semantically search your codebase.

&gt;&gt; Lucy and Kevin, take one. Mark, &gt;&gt; I worked on the warp for Windows build and the warp for Linux build for a while. And now I want to work on a feature called block sharing. It's existed in Warp for a little bit, but we have some improvements we want to make to it. The issue is that I've been working on platform things and I'm not super familiar with how block sharing works. It's a feature that uses two code bases. It looks at our client codebase which is in Rust and our server codebase which is in Go. So, this will be a good opportunity to see if codebase context can help me understand the feature end to end.

&gt;&gt; Yeah, I happen to work in this part of the codebase before. So, normally I would have to do a one-on-one on boarding and walk through every part of the flow, but today we're going to see how Warp is able to help us on board.

&gt;&gt; So, I'm going to go into Warp and I'm going to open Warp Drive and I have this shared workflow to explain a Warp feature end to end. And this is really handy. It's a saved prompt. It lets us reuse warp prompts for LMS. In this case, we are telling WP to go look in warp internal for our client code and warp internal for our server code and it's going to explain to me a specific feature. So, I'm going to type in block sharing and let's see what Warp comes up with.

&gt;&gt; So, one key thing with Warp's way of building codebase context is we're not restricting to any single one codebase.

So if you think about if we would build the same feature in IDE, naturally your scope is the current editor in the project you're working on. But we recognize that that there's a lot of end to-end workflows that involve editing in multiple codebase.

&gt;&gt; In this case, we're expecting to see some results from the client codebase, which is where the user would actually share the block from. And we're also expecting to see some results from the server codebase which will serve a page or a widget to the user who is trying to view the shared block.

&gt;&gt; Yeah. So as we see right now it's exactly following our instruction is searching for block sharing in our client codebase. It's finding the right files in where we're rendering them. Now it's searching in our server codebase to find how we're handling it in GraphQL.

This is really cool. It's interesting because the semantic search means that Warp is able to find how this feature works without us feeding it specific function names or specific variable names or terms in the codebase. There are some files here and functions that I would not have known to look for on my own. But because of semantic search, I don't need to know the exact term to search for.

&gt;&gt; Awesome. It looks like it has found the result and it's giving us a summary.

Let's see how it does.

So warp start with giving us an overview on the client side architecture. It talked about how we're rendering it in the share block model. This is exactly right. It gives us option to show like we generate the title. We also have different configuration for display. Now we're going to our graphql client integration. That looks exactly right to me. It's also nice and formatted like all this link will work if I want to just navigate to that file. Something we do a little bit differently is that um when you make a change to a file that is in an indexed codebase, Warp will detect that a file has changed and we'll do an incremental sync of that change up to the server. So it will generate a new embeddings for the specific file that changed and then update that embedding relatively quickly. So you're not going to be in a situation where you are trying to have Warp write some code for you, but then Warp is trying to reference some outdated file or a file that it already changed. That update happens immediately. This is a much more useful starting point than just starting with the code. And this also saves Kevin a ton of time for onboarding.

&gt;&gt; Yeah, that's true. What do you think of this whole summary?

&gt;&gt; This is much better. I think I can work from this.

&gt;&gt; Awesome.

[Music]

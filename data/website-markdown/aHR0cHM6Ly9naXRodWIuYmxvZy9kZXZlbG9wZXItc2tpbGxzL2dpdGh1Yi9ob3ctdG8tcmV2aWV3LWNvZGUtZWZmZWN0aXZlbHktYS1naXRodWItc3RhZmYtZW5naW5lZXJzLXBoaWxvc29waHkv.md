[Sarah Vessels](https://github.blog/author/cheshire137/ "Posts by Sarah Vessels")· [@cheshire137](https://github.com/cheshire137)

July 23, 2024

\|
16 minutes

- Share:
- [Share on X](https://x.com/share?text=How%20to%20review%20code%20effectively%3A%20A%20GitHub%20staff%20engineer%E2%80%99s%20philosophy&url=https%3A%2F%2Fgithub.blog%2Fdeveloper-skills%2Fgithub%2Fhow-to-review-code-effectively-a-github-staff-engineers-philosophy%2F)
- [Share on Facebook](https://www.facebook.com/sharer/sharer.php?t=How%20to%20review%20code%20effectively%3A%20A%20GitHub%20staff%20engineer%E2%80%99s%20philosophy&u=https%3A%2F%2Fgithub.blog%2Fdeveloper-skills%2Fgithub%2Fhow-to-review-code-effectively-a-github-staff-engineers-philosophy%2F)
- [Share on LinkedIn](https://www.linkedin.com/shareArticle?title=How%20to%20review%20code%20effectively%3A%20A%20GitHub%20staff%20engineer%E2%80%99s%20philosophy&url=https%3A%2F%2Fgithub.blog%2Fdeveloper-skills%2Fgithub%2Fhow-to-review-code-effectively-a-github-staff-engineers-philosophy%2F)

As a staff engineer at GitHub, [code review](https://github.com/features/code-review) is one of my main focus areas in my day to day work. Over the past eight years, I’ve reviewed more than 7,000 pull requests. Why so many? Because code review is crucial to building good software and another set of eyes can often spot issues you would have otherwise missed.

I see code review as one of the most important aspects of my job. In fact, whenever I see that a teammate has a pull request ready for code review, I prefer to drop whatever branch I’m working on to review their proposed changes instead. After all, their pull request has already passed the continuous integration (CI) gauntlet and met the bar for their own judgment of “done,” so it’s probably closer to being shippable than my own in-progress work. I’d rather get their code over the finish line than churn an unknown amount of time more to finish my code.

The sooner I provide feedback — “This can be nil and cause an error,” “This looks like an n+1 query,” “It would be great to have a method signature on this” — the faster that feedback can be addressed and the bug squashed or feature shipped.

I’d like to share how I approach code review in hopes that we can all ship better code.

## [What is code review?](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#what-is-code-review)

Strictly speaking, code reviews—via [pull request reviews](https://docs.github.com/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) on GitHub—allow collaborators to comment on the changes proposed in pull requests, indicate their approval of the changes, or request further changes before the pull request is merged.

I see a pull request as the beginning of conversation. I read it as the author saying “I think this improves on what we have today.” Code review is a great opportunity to shape the product’s implementation. As a code reviewer, my job is to go back and forth in discussion with the author to improve their code by asking questions, questioning assumptions, and generally serving as a second set of eyes.

## [Fine-tune your code review process](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#fine-tune-your-code-review-process)

### [How to find pull requests for review](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#how-to-find-pull-requests-for-review)

I live in my [GitHub notifications inbox](https://github.com/notifications?query=is:unread). It’s one of just a few tabs I pin in my browser, so it’s always available. Any time I’m waiting on CI, I’m in between tasks, starting my day, or generally have a spare moment, I like to check my inbox. I find most of the pull requests I review there. Teams at GitHub tend to have a particular Slack channel they treat as home base, and that’s a good place to share ready-for-review pull requests—it’s one of the other main ways I discover pull requests.

I also have good luck using the [GitHub Slack integration](https://slack.github.com/) to subscribe a Slack channel to new pull requests relevant to my team. To filter which pull requests show up in Slack, I use a label specific to the team, then a ‘subscribe’ command in Slack like `/github subscribe your/repo pulls +label:"your-team-label"`.

I like to search for outstanding pull requests that may need review with queries like `is:open archived:false is:pr org:github -is:draft team-review-requested:github/relevant-codeowner-team`. With that query, I find [open](https://docs.github.com/search-github/searching-on-github/searching-issues-and-pull-requests#search-by-open-or-closed-state), [unarchived](https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests#search-based-on-whether-a-repository-is-archived) [pull requests](https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests#search-only-issues-or-pull-requests) [within the GitHub organization](https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests#search-within-a-users-or-organizations-repositories) that are not [drafts](https://docs.github.com/search-github/searching-on-github/searching-issues-and-pull-requests#search-for-draft-pull-requests) and have [relevant codeowner teams as a requested reviewer](https://docs.github.com/search-github/searching-on-github/searching-issues-and-pull-requests#search-by-pull-request-review-status-and-reviewer). I usually will omit the [`review:required`](https://docs.github.com/search-github/searching-on-github/searching-issues-and-pull-requests#search-by-pull-request-review-status-and-reviewer) search qualifier because I’m interested in reviewing a pull request even if a teammate has already reviewed it. After all, reviewing code not only helps the author, it helps me stay up to date with changes affecting code I’m responsible for.

### [Use reviewer teams to manage notifications](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#use-reviewer-teams-to-manage-notifications)

You don’t want code changes to ping such a large team that everyone on the team assumes reviewing the change isn’t their [responsibility](https://en.wikipedia.org/wiki/Diffusion_of_responsibility). That can result in pull requests that either languish unreviewed or get merged before they should, because key reviewers missed them in a deluge of notifications. Both of these scenarios affect the quality of the product.

I recommend honing the number of [code owner](https://docs.github.com/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) teams you’re on, if you’re able, to keep your notifications manageable. That way, pull requests that land in your inbox aren’t just noise, they’re actually something you feel you should review. While big, catch-all code owner teams can be okay as a fallback option, they aren’t great as a first-line default for automatic review requests. Keep your repository’s CODEOWNERS file well organized, with well-defined code boundaries to go along with it, to limit notifications and help reviewers avoid notification fatigue.

Another way of limiting team-based notifications is to create a first responders team and then use automation to add and remove team members based on a schedule. This can let your team focus on their day-to-day code base, while scheduled first responders get notified of pull requests in your team’s service areas. Using the [PagerDuty API](https://developer.pagerduty.com/api-reference/3f03afb2c84a4-get-a-schedule), for example, you can determine who is a first responder on a given day. You can then use the [Octokit library](https://docs.github.com/rest/using-the-rest-api/libraries-for-the-rest-api?apiVersion=2022-11-28#official-github-libraries) to add and remove team members.

### [Standardize code reviews across teams with automation](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#standardize-code-reviews-across-teams-with-automation)

Repository-level configuration and automation, such as using a [CODEOWNERS file](https://docs.github.com/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-file-location) and [branch protection rules](https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule), can be helpful to enforce review process standards across teams. Other standards, such as what’s worth commenting on in a pull request, have to be maintained by us humans. Document how code reviews work within your team to make sure anyone providing a code review or submitting a pull request knows how to get their pull requests reviewed, the expected turnaround time for review, and what automation is in use to facilitate review.

Some teams use a project board to keep track of which pull requests come in for review; I’ve seen this work well for a team that manages a shared API, an area often modified by those outside the team. Other teams depend on GitHub notifications alone, which I’ve seen work well when code ownership is tightly scoped and the team is disciplined about reviewing pull requests as they come in.

If you follow a process unique to your specific team, automation can help communicate expectations with those outside your team. For example, if many other teams depend on your team’s reviews, you can use a bot to automatically leave a comment on any pull request where your team’s review is requested, to tell the author when they can expect to hear from you.

## [What makes a code review good or bad?](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#what-makes-a-code-review-good-or-bad)

Good code reviews add clarity and push code toward a better state than where it started.

As a reviewer, clarity in communication is key. You’ll want to make clear which of your comments are personal preference and which are blockers for approval. Provide an example of the approach you’re suggesting to elevate your code review and make your meaning even clearer. If you can provide an example from the same repository as the pull request, even better—that further supports your suggestion by encouraging consistent implementations.

By contrast, poor code reviews lack clarity. For example, a blanket approval or rejection without any comments can leave the pull request author wondering if the review was thorough. Even just reiterating your understanding of the pull request author’s intention with your approval can surface whether you and the author have the same understanding.

A code review that is unclear about when its suggestions should be implemented can also be a poor experience for the author. It’s fine to note that existing, unchanged code should be refactored, or an additional case should be handled, but it’s important to specify whether those are precursors to approval. If the pull request is okay to land without your suggestions, make sure to say so. It may be safer to keep a small diff and ship those changes separately, as separate pull requests.

**Here’s a code review comment that displays specificity and clearly communicates suggested implementations:**

_“I see your new method matches the existing style in this file, taking \[X\] parameters. Having that many parameters hurts readability and implies the function is doing too much. What do you think about refactoring this method and the existing ones in a later pull request to reduce how many parameters they take?”_

**What this comment does well:**

- Provides specific details.
- References specific code or issues.
- Suggests a resolution to the problem.
- Cites evidence or provides an explanation

**On the other end of the spectrum, here are some examples of review comments that could be better:**

_“I don’t like this.”_ – What doesn’t the reviewer like? Do they have an alternative in mind that they could explicitly state?

**Possible improvements:**

- “This line is doing a lot, could we simplify it to improve readability?”
- “I think this will have performance problems because of an n+1 query.”
- “Could we use the \[preferred framework\]’s solution for this instead of writing a custom implementation?”

_“This won’t work.”_ – Why won’t the changes work?

**Possible improvements:**

- “This won’t work because \[X\], see this relevant issue: \[issue link\].”
- “This was tried before in \[pull request link\] and it didn’t work because of \[X\].”
- “If you run into problems with \[X\], you could try \[alternative approach\] instead.”

_“I think this fixes a bug.”_ – I love the callout, but is there any additional context, such as an issue link, that could make this more clear?

**Possible improvements:**

- “I think this fixes \[issue link\].”
- “Is this fixing the bug from \[issue link\]?”
- “This looks like the bug we ran into with \[link to failing build\]. Thanks for the fix!”

## [How to give a good code review](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#how-to-give-a-good-code-review)

### [Ask questions](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#ask-questions)

I think of the pull request author as the person with the most context on the changes their pull request is making. I can point out problems I see based on my history—my experience working in a Ruby on Rails monolith, in TypeScript, or with a database that gets a lot of traffic—but I trust the author’s answers to my questions. I treat their understanding of the particulars as better than mine.

I also love to ask questions that involve the assumptions made in the code. What is the shape of the data they’re working with? Does data exist that doesn’t match that shape? Does the code respond to that well? Is the code resource intensive? Will it perform well? As a reviewer, my favorite response is for the author to provide an automated test that verifies the behavior in those scenarios. My second favorite response is empirical data, such as a query from our data warehouse or a Datadog graph that shows why those scenarios aren’t a problem.

As a pull request author, I appreciate receiving questions. When someone asks a question, it makes space for me to explain why I’m confident about my change, citing issues, queries, or graphs as necessary. It also lets me share my knowledge and experience with others. The author not only sees my responses, but also other reviewers and future readers who may be tracking down context on a past decision.

### [Offer affirmations](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#offer-affirmations)

Beyond asking questions, it’s good practice to comment on the parts of the pull request that you agree with. These comments can highlight that you read and understood what was being changed, or that you verified some assumption in the code. Here are a few examples:

- “Looks like this matches the pattern used in other classes in this module.”
- “Thanks for adding a test for this!”
- “This is much more readable than before.”

It’s also just nice being on the receiving end of such comments, in my experience. Receiving a code review can sometimes feel draining. When I’m fielding questions and suggestions from several parties, it can be a good boost to get a few comments that don’t ask anything of me and instead support and acknowledge the work I’ve already put in.

### [Be aware of biases and assumptions](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#be-aware-of-biases-and-assumptions)

It’s easy to let your biases about the reviewer, or the area of code they’re changing, affect your review. You get used to someone working in an area or having some level of seniority and assume they know what they’re doing—but _everyone_ makes mistakes. Your eyes on their changes, your questions checking their assumptions or validating your own, can catch a problem before it’s deployed.

I’m big on writing tests because they take some of the bias out. When you write a test to check that code works properly, [you don’t have to take the author’s word for it](https://www.youtube.com/watch?v=NIKAsGC1Iy8), you just look at whether the test passed—provided you get the test right, of course. 😅

I’m also big on junior developers asking senior developers questions in code review, even if they think their question is silly or has an obvious answer. If it’s not obvious to you, that’s valid. It won’t be obvious to someone else either! Ask the question, make the space for the author to write down their answer, and preserve that bit of education for those who come later.

### [To approve or not](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#to-approve-or-not)

I see my review as a blocking gate that can stop another person from improving our product, so I withhold approval conscientiously. I will often have personal preferences and suggest optional changes I’d like to see the author make, but I won’t withhold an approval based on those alone. If I have suggestions for someone’s pull request, but their pull request as it is won’t break production, negatively impact users, or otherwise cause problems, I will approve with those comments. The author can choose to address my feedback before they merge their pull request, or they can follow up in another branch.

Keep in mind the importance of your suggestion when you’re reviewing code. Is it worth delaying the ship to get your suggestion addressed? Is it worth the whole cycle of the author seeing your feedback, making the suggested changes, waiting for CI, a re-review, deployment and finally merging? If a suggestion’s absence isn’t going to make someone’s day worse, let the author decide if or when to make the suggested change.

The [‘Request changes’ option](https://docs.github.com/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request#submitting-your-review) stops a pull request from being merged until the reviewer comes back and approves it. I very rarely use it, as it usually feels too heavy-handed. I trust my team to know when to approve a pull request, so a teammate’s approval is fine in place of mine. Likewise, I trust the pull request author to respect my feedback and consider it, not just blindly merging because someone else approved but I didn’t. About the only time I’ll choose the ‘Request changes’ option is when I think there is an immediate security issue and I’m worried they won’t see my concern before merging.

## [How to get the most out of code reviews](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#how-to-get-the-most-out-of-code-reviews)

### [Review your own code](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#review-your-own-code)

GitHub Senior Software Engineer [Paul Smith](https://github.com/paulcsmith) taught me to review my own pull request before asking others to do so, and I would advise you to do the same. Take a first pass and leave comments inline on non-obvious changes or ones you would ask about if you saw them in someone else’s pull request. A self-review can also help determine if a pull request is too big and would benefit from being [split up](https://github.blog/2020-05-21-github-protips-tips-tricks-hacks-and-secrets-from-sarah-vessels/).

**Shout-out:** if you care about keeping your pull requests small, you can make use of [lerebear/sizeup-action](https://github.com/lerebear/sizeup-action) to automatically apply a label to pull requests indicating their complexity and size.

### [Be welcoming of post-merge reviews](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#be-welcoming-of-post-merge-reviews)

If I happen to merge a pull request before someone gets a chance to review it, I still welcome their review. If my pull request broke something or had unintended consequences, commenting as much on the pull request leaves that breadcrumb trail to help future readers track down what happened!

If I receive a review on a merged pull request, I’ll address the feedback like I would have before the pull request landed. Maybe that’ll be a comment to explain my perspective, maybe it’ll be additional pull requests to iterate on the code I originally shipped. Maybe it’ll be opening new issues to capture additional work to be done.

### [Use draft pull requests](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#use-draft-pull-requests)

When you create a new pull request, you have the option to set the pull request as a draft. I lean heavily on [the draft stage](https://docs.github.com/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request) to indicate whether or not I want reviews. For example, if a required CI build is failing or I’m just not finished yet, I’ll keep it as a draft. I tend to expect the same from others’ pull requests: if it’s a draft, I assume the author isn’t ready for reviews. If it’s marked as ready for review, I assume that getting enough approvals is all that’s preventing them from deploying the pull request.

The draft status implies that a pull request is not finished, so I move pull requests back to draft when resolving merge conflicts or addressing reviewer feedback. If I have to modify the code, I’ll mark my pull request as a draft first so as not to overwhelm people who have already reviewed it. When I move it back to ‘ready’, it sends a GitHub notification to those reviewers so they can look at it again.

### [Be gracious](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#be-gracious)

The expression, “You can catch more flies with honey than vinegar,” comes to mind. I want reviews on my pull requests, so I like to reply to comments on my pull requests—especially if I disagree with the reviewer. Even if I don’t write a reply to a review comment, I’ll often react with a 👍 to indicate I agree or a ![heart](https://github.githubassets.com/images/icons/emoji/unicode/2764.png?v8) to say thank you.

I want reviewers to trust that their suggestions won’t be forgotten, so I keep them in the loop via comments. If I agree with their suggestion—to go further refactoring existing code, for example—I may say as much while also pushing back about making that change in the current pull request. When I address their feedback in a later pull request, I come back to provide a link and let the reviewer know their feedback didn’t go unheard.

I’ll also tag them in later pull requests where I implement the suggested changes and include a note saying “This addresses @so-and-so’s feedback from <previous pull request URL>.” This both provides context for other readers and acts as a shout-out to the original reviewer, giving them credit for the idea.

When you follow through on a promise to address feedback in a later branch, that helps build trust with your reviewer, which can help them feel comfortable approving your future pull requests because they know that you won’t leave something incomplete.

## [Wrap-up](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/\#wrap-up)

Code review’s importance for product quality can’t be overstated, especially in the age of AI code generation. Many times in my career, a bug has been caught or an incident avoided simply by having that second set of eyes. Code review is well worth the time investment, whether spent in daily reviews, in ironing out processes, or in building automation to support it. It’s faster and less painful for developers to review pull requests thoroughly now than to deal with a problem later that’s already shipped to production.

Thank you for caring enough about code quality to read my philosophy on code review. Have you checked [your review queue](https://github.com/search?q=review-requested:@me+is:open+archived:false&type=pullrequests) lately? Maybe now is a good time to put these ideas into action.

If you want to learn more about how to use pull request reviews on GitHub, check out the post on GitHub Community by Staff DevOps Architect [Mickey Gousset](https://github.com/mickeygousset) and Staff DevOps Architect [Joshua Johanning](https://github.com/joshjohanning) discussing [5 Tips for Reviewing a Pull Request](https://github.com/orgs/community/discussions/130771).

* * *

## Tags:

- [code review](https://github.blog/tag/code-review/)

## Written by

![Sarah Vessels](https://avatars.githubusercontent.com/u/82317?v=4&s=200)

Staff Software Engineer, GitHub

## Related posts

![A clean header with the GitHub logo features the bold text “Top blog posts of 2025.” Below it, a grid of glowing green and translucent cubes forms a geometric landscape. GitHub’s colorful Mona mascot sits on one cube near an icon resembling a refresh or sync symbol. The design uses soft gradients and bright highlights to create a modern, tech‑themed look.](https://github.blog/wp-content/uploads/2025/12/top-blog-posts.png?resize=400%2C212)

[AI & ML](https://github.blog/ai-and-ml/)

### [Agentic AI, MCP, and spec-driven development: Top blog posts of 2025](https://github.blog/developer-skills/agentic-ai-mcp-and-spec-driven-development-top-blog-posts-of-2025/)

Explore the GitHub Blog’s top posts covering the biggest software development topics of the year.

![Video thumbnail showing a photo of Guido van Rossum and the text 'The creator of Python speaks'](https://github.blog/wp-content/uploads/2025/11/speaks.png?resize=400%2C212)

[Developer skills](https://github.blog/developer-skills/)

### [Why developers still flock to Python: Guido van Rossum on readability, AI, and the future of programming](https://github.blog/developer-skills/programming-languages-and-frameworks/why-developers-still-flock-to-python-guido-van-rossum-on-readability-ai-and-the-future-of-programming/)

Discover how Python changed developer culture—and see why it keeps evolving.

![](https://github.blog/wp-content/uploads/2025/06/typescript.webp?resize=400%2C212)

[Developer skills](https://github.blog/developer-skills/)

### [TypeScript’s rise in the AI era: Insights from Lead Architect, Anders Hejlsberg](https://github.blog/developer-skills/programming-languages-and-frameworks/typescripts-rise-in-the-ai-era-insights-from-lead-architect-anders-hejlsberg/)

TypeScript just became the most-used language on GitHub. Here’s why, according to its creator.

## We do newsletters, too

Discover tips, technical guides, and best practices in our biweekly newsletter just for devs.

Your email address

\*Your email address

Subscribe

Yes please, I’d like GitHub and affiliates to use my information for personalized communications, targeted advertising and campaign effectiveness. See the [GitHub Privacy Statement](https://github.com/site/privacy) for more details.

Subscribe
<!--
URL: https://blog.codinghorror.com/code-reviews-just-do-it/
Formatted At: 2026-01-04T06:56:36.914Z
-->

# Humanizing Peer Reviews

In [Humanizing Peer Reviews](https://web.archive.org/web/20060315135514/http://www.processimpact.com/articles/humanizing_reviews.html), Karl Wiegers starts with a powerful pronouncement:

> Peer review – an activity in which people other than the author of a software deliverable examine it for defects and improvement opportunities – is one of the most powerful software quality tools available. Peer review methods include inspections, walkthroughs, peer desk checks, and other similar activities. After experiencing the benefits of peer reviews for nearly fifteen years, I would never work in a team that did not perform them.

After participating in code reviews for a while here at Vertigo, I believe that **peer code reviews are the single biggest thing you can do to improve your code.** If you’re not doing code reviews _right now_ with another developer, you’re missing a lot of bugs in your code and cheating yourself out of some key professional development opportunities. As far as I’m concerned, my code isn’t done until I’ve gone over it with a fellow developer.

But don’t take my word for it. McConnell provides plenty of evidence for the efficacy of code reviews in [Code Complete](http://www.amazon.com/exec/obidos/ASIN/0735619670):

> … software testing alone has limited effectiveness – the average defect detection rate is only 25 percent for unit testing, 35 percent for function testing, and 45 percent for integration testing. In contrast, **the average effectiveness of design and code inspections are 55 and 60 percent**. Case studies of review results have been impressive:
>
> - In a software-maintenance organization, 55 percent of one-line maintenance changes were in error before code reviews were introduced. After reviews were introduced, only 2 percent of the changes were in error. When all changes were considered, 95 percent were correct the first time after reviews were introduced. Before reviews were introduced, under 20 percent were correct the first time.
> - In a group of 11 programs developed by the same group of people, the first 5 were developed without reviews. The remaining 6 were developed with reviews. After all the programs were released to production, the first 5 had an average of 4.5 errors per 100 lines of code. The 6 that had been inspected had an average of only 0.82 errors per 100. Reviews cut the errors by over 80 percent.
> - The Aetna Insurance Company found 82 percent of the errors in a program by using inspections and was able to decrease its development resources by 20 percent.
> - IBM’s 500,000 line Orbit project used 11 levels of inspections. It was delivered early and had only about 1 percent of the errors that would normally be expected.
> - A study of an organization at AT&T with more than 200 people reported a 14 percent increase in productivity and a 90 percent decrease in defects after the organization introduced reviews.
> - Jet Propulsion Laboratories estimates that it saves about $25,000 per inspection by finding and fixing defects at an early stage.

The only hurdle to a code review is finding a developer you respect to do it, and making the time to perform the review. Once you get started, I think you’ll quickly find that every minute you spend in a code review is paid back tenfold.

If your organization is new to code reviews, I highly recommend Karl’s book, [Peer Reviews in Software](http://www.amazon.com/exec/obidos/ASIN/0201734850): A Practical Guide. The [sample chapters](https://web.archive.org/web/20060315135046/http://www.processimpact.com/reviews_book/reviews_book_toc.shtml) Karl provides on his website are a great primer, too.

## Discussion

### Bernard_Dy

I don’t know why code reviews aren’t used more often. But I think they do need to be set up carefully. If there is a large disparity in quality and experience between the author and reviewer, that factor needs to be understood, though clearly there are good educational benefits for the less experienced developer on either side of the equation.

Personalities are important too. I was not a very good developer my first couple years, and a harsh review could have destroyed me. Because I had a chance to learn from my mistakes and keep growing, I became better, developed a passion for it, and was able to bring my other skills into making me a more complete developer (for analysis, documentation, support, etc.; not just cranking out code). Code reviews are definitely a great idea, but a good manager will set them up appropriately.

### codinghorror

Phil, have you considered doing code reviews through something like remote desktop or UltraVNC?

One of the biggest benefits of code reviews is the one-on-one real-time interaction; a deferred email review is good, but it’s not quite the same thing.

### Julian

“It was delivered early” … “a 14 percent increase in productivity”

Thanks for highlighting this Jeff. One excuse I have heard from developers a few times is that the deadline is so tight, there isn’t time to do reviews.

Tight deadlines mean there isn’t time to not do reviews!

### Diego

I was wondering about the actual mechanics of code reviews. Is it a requirement for the coder and someone else to be sitting at a machine looking at the code at the same time?

What if the coder checks in the code, pings (e.g. via email) the reviewer and he/she can do it when he/she has time? If all is good then the reviewer pings the coder letting them know it’s all good. Otherwise, if problems occur then they can arrange a time to discuss it.

I mention this because it would reduce the amount of time that people need to interrupt one another to do a review. Whereas in this other way the review is done when the reviewer is free. Also now the coder is free to continue with other work.

While on the subject, how much of the code produced by a company do people think should be reviewed? 100%? Critical or problematic areas?

I’ve heard of (sometimes) reviews being done in groups. This seems very unproductive to have (maybe) a whole development team doing a code review. Say, for example, the coder presents their code and the dev. team looks through it. These are less common types of reviews?

Any comments from people experienced in this would be appreciated.

### matt81

“peer code reviews are the single biggest thing you can do to improve your code.”

Amen! I have had wonderful experiences with code reviews. I would highly recommend them to everyone.

For the record, I find that the people who are the most likely to be against code reviews are the ones that need it the most.

### EricB

_sigh_ Being a solo developer, I don’t have any peers to do a review… let alone find a developer I respect and trust.

Any advice for the solo guy?

### KyleB

Eric,

That is exactly what I was going to comment on. It’s got me wondering about some kind of peer review network, a way to exchange code with others online to get reviewed. Not only would it allow solo developers to get peer reviews, but it could also increase the variety of reviewers available to teams. Instead of being reviewed by the same 5 guys on your team all the time, you can all get reviews from lots of different people, with lots of different skills and skill levels.

Of course, it doesn’t have to be as formal as a network - just find someone online you trust and ask him if you could exchange code to be reviewed.

One drawback to this is security and confidentiality issues. I’m sure there’s others.

### Haacked

The thing about code reviews is finding the right balance of formality. XP proponents think code review is so great, they want to do it all the time (hence pair programming).

For distributed companies, open source projects, formal code reviews can often be difficult to schedule.

One way to get some of the benefits is to set up a mailing list and commit emails. Then get others to commit to reviewing them.

SourceGear Vault can create RSS feeds from commits to the source control, which is another fine tool.

However, formal inspections ala Code Complete have the most evidence going for them in just how much they catch bugs.

### codinghorror

I can tell you a little about how it’s done at Vertigo.

> I was wondering about the actual mechanics of code reviews. Is it a requirement for the coder and someone else to be sitting at a machine looking at the code at the same time?

Yep, we open Visual Studio and go through the code together on a projector in one of the meeting rooms.

> how much of the code produced by a company do people think should be reviewed? 100%? Critical or problematic areas?

We look at everything, but generally focus on the more interesting areas. What’s interesting? Whatever jumps out at us when we’re looking at the code, or anything the author specifically wants to focus on. Our goal isn’t necessarily to put a microscope to every single line of code.

> This seems very unproductive to have (maybe) a whole development team doing a code review. Say, for example, the coder presents their code and the dev. team looks through it.

I agree. At Vertigo we have an informal cap of 3 people for code review meetings. The author, obviously, and 2 other developers from the team.

Smaller is no problem – even if it’s only one other developer at your desk I think you’d achieve 90% of the benefit.

In my experience, having too many people in the room reviewing code reaches a point of diminishing returns very rapidly. For one thing, it’s hard to stay focused unless everyone is super disciplined. That’s n+1 tangents you’ll be getting off on…

### Erik_Lane

Diego,

Thanks again Jeff for good content.

We currently do our code reviews with the whole team. I’ll be honest, I think we do it this way just so everyone can get an insight into what people are thinking as a group. Since we may not work with other team members on any projects we can tap into their knowledge and/or ideas.

I’m not real sure if we are getting anything out of our current setup except for that and maybe seeing other people’s code. Again, we normally do it after a project is complete which isn’t the best time to do it either.

### codinghorror

> we normally do it after a project is complete which isn’t the best time to do it either

Oops, I meant to mention this-- we do code reviews at key points DURING the project. The point is that you have time to go in and make improvements based on that feedback, while the project is still underway.

Erik, sounds like what you guys are doing are postmortems. Also useful, but different than a code review for sure.

### Haacked

Jeff, Can you host more than one viewer using Remote Desktop? The problem for open source teams is that we’re all in different time zones, so scheduling can be difficult.

However, code review in any form is useful. But each level of formality increases its benefits.

In fact, many of the studies that point to the benefits of code review were using the methodology pointed out in Code Complete. It’s a very formal inspection methodology which usually takes several people and covers much of the code.

### EricB

My thoughts on what should be reviewed. Everything. The more review the less bugs. So review it all and save the time now.

### Diego

Thanks for the feedback Jeff and Erik.

The idea of having at most three people doing a review sounds good to me. Although, as I mentioned (or alluded to) some of the code reviews I had been involved in were done in the following manner:

- Coder checks in his stuff.
- Coder pings/emails reviewer letting him/her know it’s ready.
- When the reviewer has some free time, she does a diff on the files that the coder changed. This is done by the coder checking in her changes and entering a bug number in the VSS comments. The reviewer would then use a small utility which would return the files that changed for that bug number. The reviewer could then do a diff on the changes made to the code.
- If all was fine, the reviewer emails the coder letting them know. Otherwise, if it was a minor point, she would email the coder informing them of the problem and get them to change it. If there was more to discuss they would then get together.

This worked fine and it allowed the coder to continue with something else while the review waited for the reviewer to do it when she was ready to do so.

Not saying this is better or worse, just sharing an experience with reviews at a place I worked at.

### TodB

Thanks for pointing out Karl’s writings. My team and I have not been doing code reviews of late, and this reminds me that we need to be more deliberate about doing them.

### Alastair

Just curious as to how many people have found an obscure, tricky, show-stopping bug in a code review?

My current project went through a rigorous review cycle. This caught some bugs, potential integration issues, and lots of style considerations.

However, a couple of days after the reviews we produced our first executable, which when ran promptly took down an entire (shared) machine. Oops. Turns out we were executing kill(-1) as root. Why didn’t we catch that in reviews?

Thinking back I can’t think of a single incidence of a bug that was caught in a code review where it was recognized as a show-stopper right then and there. In other words, we might have caught important bugs without recognizing them. But in general, the bugs I’ve seen caught in code reviews have been fairly minor.

Not that this is an argument against code reviews. I’m just saying that they are not likely to reveal your trickiest bugs.

### codinghorror

> Not that this is an argument against code reviews. I’m just saying that they are not likely to reveal your trickiest bugs.

No single testing strategy is a catch-all. However, code reviews statistically catch the most bugs and should always be done as a first line of defense. Plus it has substantial intangible benefits; you learn a lot from your co-workers this way. That’s why I’m such a fan of conducting face-to-face code reviews.

> I can’t ever remember meeting a carpenter or plumber who ever had good things to say about the quality of the prior work he or she encounters

Good point, hopefully we’re a little more respectful of our coworkers. And some competitive work is worthy of respect, too. I think honesty generates respect in both arenas.

### John

I can’t ever remember meeting a carpenter or plumber who ever had good things to say about the quality of the prior work he or she encounters. The term “peer” review is disingenuous in a competitive environment. What really occurs amounts to little more than strategies that enforce informal primate hierarchies.

### codinghorror

Mike Gunderloy posted a link to a great article on how to conduct friendly, effective code reviews:

[http://www.developer.com/java/other/article.php/3579756](http://www.developer.com/java/other/article.php/3579756)

### YatharthROCK

There’s always (well, at least is now? I don’t know…) Code Review.SE for using the community.

My first question was resolved just by some [rubber-ducking in the chat-room](http://chat.stackexchange.com/transcript/message/14923903#14923903); so that’s another thing you could try with your pool ol’ unused VGA monitors or Yoda bobble-head…
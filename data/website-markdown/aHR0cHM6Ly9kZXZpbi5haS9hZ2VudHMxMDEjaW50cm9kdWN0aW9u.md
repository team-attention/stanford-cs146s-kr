# Developer Tooling Evolution

Developer tooling has been rapidly evolving. Ten years ago, it was autocomplete and intellisense, capable of suggesting method names and carrying out programmatic refactors. Four years ago, it was copilots and tab complete, capable of writing the next couple lines of code for you. Two years ago, it was generative chatbots, capable of assisting your development and generating entire files for you. Today, it is autonomous agents, capable of taking initial descriptions to final pull requests with little human intervention.

We've focused on realizing this vision over the past two years by building Devin. Now, interest in autonomous agents is reaching new heights, especially with recent releases of similar products. Other than Devin, some recent releases include Codex by OpenAI and Jules by Google. Some local agents like Cursor and Claude Code can be run in parallel workspaces to replicate a similar effect. These agents can appear in many forms, including web apps, mobile apps, and integrations within popular tools like Slack, GitHub, Linear, and Jira.

While a human paired with an AI assistant can achieve more than any AI alone, an autonomous agent's ability to handle tasks end to end allows for a new level of multi-tasking, turning every engineer into an engineering manager.

Adapting to working effectively alongside these new AI colleagues can take some time. Interestingly, we've observed that senior-to-staff level engineers tend to adopt and become proficient with these tools the fastest. Ultimately, these tools will become commonplace across all levels of engineering. Based on our experience and customer feedback, we want to share key insights and lessons learned to help everyone successfully integrate these tools into their workflows.

## Key Insights and Lessons

### Say _how_ you want things done, not just what

Think of the agent as a junior coding partner whose decision-making can be unreliable. Simple tasks can be described directly, but for more complex tasks, clearly outline your preferred approach from the outset. Providing the agent with the overall architecture and logic upfront not only boosts its chances of success but also reduces your time reviewing code, as you will already be familiar with the intended method.

#### Example:

Instead of "add unit tests," specify the functionality to test, identify important edge cases, and clarify what needs mocking, if anything.

### Tell the agent where to start

Think about where you'd start if you were handling the task yourself. Even if you don't know specific file or function names, mention the repository, relevant documentation, and key components involved. Clearly indicating these elements minimizes wasted effort and confusion.

#### Example:

"Please add support for Google models to our code. You should look at the latest docs [here](link) and create a new implementation file in the model groups directory."

### Practice defensive prompting

Imagine giving the same prompt to a new intern. Where would confusion or errors likely arise? Anticipate these points and proactively clarify your instructions to avoid ambiguity.

#### Example:

"Please fix the C++ bindings for our search module to pass the new unit tests. Be careful, you will probably need to recompile the bindings each time you change the code before you test."

### Give access to CI, tests, types, and linters

Much of the magic of agents comes from their ability to fix their own mistakes and iterate against error messages. Providing strong feedback loops through tools like type checkers, linters, and unit tests greatly enhances their performance. Consider typed Python over plain Python, or TypeScript over JavaScript. Teach your agent how to run common checks and tests, ensuring it has all necessary packages and access rights. If the agent can interact with a browser, provide clear instructions on running your front-end development environment.

#### Example:

Our team transitioned from mostly untyped Python SDKs to exclusively typed SDKs (this is also a good task ideally for coding agents).

### Leverage your expertise

Everything above becomes easier when you're familiar with your codebase. Even simple tasks benefit from your ability to verify logic and results. Human oversight remains essential—ultimately, you hold responsibility for the final correctness of the code. Ownership and verification will continue to be critical responsibilities for human engineers, even as these tools become increasingly sophisticated.

### Take on new tasks immediately

Imagine a teammate messaging you, "Hey, could we build X quickly?" or "We need to tweak Y." Instead of letting it interrupt your flow, just send a quick prompt to an autonomous agent to investigate or make the change. This frees you to stay focused on your main tasks. Got an interesting side project idea? Need to quickly prototype something, scrape data, or reproduce research? Delegate to your agent and circle back later.

#### Example:

Many teams simply tag @Devin on Slack when discussing bug fixes or minor feature updates.

### Code on the go

Picture yourself commuting or traveling when an urgent bug pops up, or you realize you might have left a mistake in your code. No worries! Autonomous agents often support mobile access, letting you address these issues instantly. Whether through Slack's mobile app or a dedicated mobile app, many agents let you resolve problems on the go, even if your wifi is sketchy.

#### Example:

Having this optionality has made our own team much more productive on car rides and flights.

### Hand off your chores

Stuck bisecting for old commits or updating documentation for a new feature? Hand these repetitive tasks off to your agent. You'll save precious time and stay focused on more creative and impactful work.

#### Example:

In our team, it is common for an engineer to ship a change and then have an agent update all the relevant docs & user-facing copy.

### Skip the analysis paralysis

Stuck deciding if a refactor will actually simplify your code? Can't choose between two architectural approaches? Have your agent implement both options. With concrete examples to compare, decision-making becomes straightforward, and you won't hurt any feelings by discarding a solution.

#### Example:

When choosing between Lexical and Slate for text boxes, we had agents implement each. Slate won out for delivering the better end result.

### Set up preview deployments

Set your CI/CD pipeline to automatically create preview deployments with each new PR, giving you an instant live URL. This is particularly handy when reviewing frontend tasks completed by AI agents.

#### Example:

Vercel is a deployment platform that makes preview deployments super easy.

As the size and complexity of your pull requests grow beyond just a few files, handling them in a single pass becomes challenging. Yet, mastering how to delegate medium-to-large tasks (typically 1-6 hours of work) is where autonomous agents give the highest ROI. Rather than saving just a few minutes, you can reclaim hours of productivity. Smaller tasks might work effortlessly, but stretching the capabilities of agents to handle larger tasks brings the biggest returns.

### Automate your first drafts

For substantial tasks, using an autonomous agent to create an initial draft of your PR can kickstart progress and dramatically cut down your workload. Success here depends on clearly communicating your desired approach upfront. Think of yourself as the architect guiding junior developers. Clear, detailed instructions help avoid spending unnecessary time correcting fundamental misunderstandings in the agent's code.

| Domain     | Drafting                                                                 | Refining                                                                 |
|------------|--------------------------------------------------------------------------|-------------------------------------------------------------------------|
| Journalism | Journalist collects initial information, writes first draft of article   | The editor reviews drafts, fact checks, polishes, and finalizes for publication. |
| Restaurant | Line cooks prep ingredients and make preliminary dishes.                 | The sous chef adds seasonings and adjusts the dish to taste better, before it is sent to diners. |
| Coding     | Autonomous agents get started on tasks based on initial plans and creating first draft solutions | Human developer reviews the draft PRs, gives feedback, and adds manual refinements before merging |

🛑 Remember, large tasks aren't completely hands-free (yet). Expect multiple feedback cycles for more challenging assignments, and anticipate some manual refinements for polish. A realistic goal is around 80% time savings, not complete automation, with your expertise remaining vital for verification and final quality assurance.

### Co-develop a PRD

For tasks that are complex or vaguely defined, collaborating with your autonomous agent to create a detailed plan can be highly effective. It's perfectly okay if you initially don't know every nuance or requirement. Start by prompting your agent to explore discovery questions, like "How does our authentication system function?" or "Which services might be impacted?" You can also ask the agent to identify specific relevant code targets for you to confirm early on.

Certain agents, such as Devin and Claude Code, offer dedicated planning modes that focus on reading and exploring existing code rather than immediately modifying it. If you'd prefer deeper preparation before delegating a task, specialized codebase search tools like [deepwiki.com](http://deepwiki.com/) and Devin Search can quickly provide insights into your codebase, helping streamline the process.

### Set checkpoints

For multi-part tasks, especially those involving multiple codebases, establish clear checkpoints along the way:

Plan → Implement chunk → Test → Fix → Checkpoint review → Next chunk

Explicitly request pauses after each significant phase, particularly for complex features built across multiple layers (e.g., database, backend, frontend). Use these checkpoints to ensure implementation aligns with your expectations, clarify doubts (e.g., "Explain the auth process and confirm its security"), and correct course early to avoid cascading issues.

#### Example:

"I want you to implement this feature that will span our database, backend, and multiple frontend interfaces. Please first plan out the database schema changes needed, and let me know when that is done so I can apply the migration." -> "Now please implement the backend changes and add tests to make sure XYZ works. Let me know when that is done" -> "Now implement the changes in both our web and mobile interfaces to call the new backend endpoint."

### Teach it to verify its own work

When giving feedback, go beyond simply pointing out issues ("This function isn't working"). Clearly articulate your testing process to enable the agent to independently verify future tasks. For testing patterns you'll frequently repeat, integrate these into your agent's permanent knowledge base.

#### Example:

In Devin, we actively prompt users to save essential testing procedures to the agent's ongoing memory, streamlining future interactions.

### Increase test coverage in AI hot spots

Currently, agents aren't fully capable of interactively testing all scenarios thoroughly. Enhancing test coverage in areas heavily modified by AI ensures greater confidence in the agent's output. Solid tests mean that code that appears correct can be confidently merged without worry.

#### Example:

Our team strengthened unit tests in a critical section of our codebase before entrusting our AI to translate the implementation from Python to C.

### Create Shortcuts for Your Most Repetitive Work

Engineering teams frequently encounter repetitive, routine tasks. These are perfect candidates for automation with agents. Common examples include:

- Feature flag removal
- Dependency upgrades
- Fixing and adding tests on new feature PRs

To set this up efficiently, an experienced engineer typically creates a robust, reusable prompt template. In Devin, these are called playbooks that can run repeatedly for these scenarios.

#### Example:

One of our customers automatically triggers three agents dedicated to writing unit tests whenever new features are developed.

### Intelligent Code Review & Enforcement

While specialized tools for fast code review exist, such as Greptile and CodeRabbit, autonomous agents can be an interesting option to deliver more accurate insights, particularly if they've already indexed the functionality of your repositories.

#### Example:

At Cognition, we like to maintain a list of the most common mistakes engineers make and we commit this list to the codebase. Then, instead of writing classical lint rules to catch these (which is often not possible), we have an agent run on every new PR to check for these mistakes.

### Hook into incidents and alerts

You can also set up autonomous agents to trigger automatically in response to specific events. For example, Devin provides an accessible API, and other agents can be integrated into custom workflows via CLI commands. These setups work especially well alongside MCPs to ingest third-party error logs.

⚠️ When it comes to triaging issues in production services, AI's debugging skills are not that great. Instead of asking the AI to fix bugs end-to-end as they come up, it is often more practical to ask the AI to just flag the most suspicious errors, changes, etc.

### Environment Setup

Nothing slows down an agent faster than an incomplete or mismatched environment. To keep things running smoothly, align your agent's setup exactly with your team's. This includes language versions, package dependencies, and automated checks. For example, pre-commit should be installed in the agent's environment and environment configurations (secrets, language versions, virtual environments, browser logins) should be sourced automatically using tools like .envrc or custom configuration of .bashrc.

#### Example:

We set up our agent's browser with pre-authenticated logins, removing the hassle of manual authentication and making testing much easier.

### Build Custom CLI Tools and MCPs

MCPs are widely available and are quick to set up and experiment with connecting your agent to external tools. But many people overlook setting up simple CLI scripts for your agents. As a simple example, you could give your agent a script to pull information about a linear ticket given a ticket ID. You might also want to give your agent a tool to perform common parts of a workflow reliably, such as a script for restarting the local development environment.

#### Example:

We have a customer who has had a lot of success with creating a CLI tool that surfaces only the first failing test in a test suite. The CLI prompts the agent to focus on only that test with detailed error information, and this CLI leads the agent to have higher success and faster completion rates on long tasks.

### Add to your agent's knowledge base

If your agent makes some common mistakes, it's a great time to codify your feedback in the agent's knowledge base. In Devin, there is a dedicated knowledge management system. Many products offer .rules files, .md files for the agent to permanently ingest. Don't just give it guidelines on the framework you're using, but also tell it about the overall architecture of your project. Tell it what type of testing is common for different kinds of tasks, how to run important commands, and which tools you recommend using.

#### Example:

We give our agent knowledge about the specific procedure it should follow when adding a new service route. The information includes every place it needs to add boilerplate in the frontend and backend. As a result, these tasks are now easily delegated to our AI.

### Limited debugging skills

Bugs reports can be deceptively simple. But many bugs often require not only access to databases and logs, but also a level of debugging that is greater than most AI agents today. If using AI to aid in debugging, we recommend asking for a list of probable root causes rather than trying to debug and fix everything itself. Then, a human can decide based on their own experience which one is the real root cause. But once the cause is known, agents can still be quite helpful at implementing the fix.

### Poor fine-grained visual reasoning

Generally, models today don't have great visual reasoning capabilities at the level of details needed to match screenshots of designs or Figma mockups. They are most reliable on visuals that can be described at the level of code (e.g., giving it code from Figma). If you want it to match your visual style, you should use a good design system with reusable components.

### Knowledge Cutoffs

Whenever you want to work with a new library, you should explicitly point it to the latest docs. Otherwise, most agents will assume the old patterns from these libraries due to knowledge cutoffs in the pretrained base models. A good agent can overcome this if you point it to docs, but you must be mindful of this (remember, the agent doesn't even know that there are new versions of these libraries).

### Be willing to cut your losses earlier

A common mistake for people who are new to using agents is that they commit to making an interaction successful, even when an agent's work is veering off track. If you ever find yourself thinking "it's ignoring my instructions" or "this thing is going in circles," you should be okay discontinuing that conversation or manually taking over. Sending more messages is more likely a sign of the inherent complexity of your task being higher than the agent's capabilities rather than some simple mistake that can be corrected.

### Diversifying your experiments

If you're new to working with agents, we recommend diversifying your bets at the start. Try a range of different prompts and ideas. Double down on the types of tasks you see the agents naturally performing well on - and cut your losses on the ones they don't. Don't feel a need to force your agents to find success every time.

### Start fresh when you aren't making progress

Starting over is the right answer a lot more often with agents than with humans. If you've given an agent a task and it is struggling to address feedback or correct course, starting fresh with a new agent and all of the instructions up front can often get to success much faster. The ability of an agent to correct a messed-up environment is much worse than its ability to spit out fresh code from scratch.

### Create accounts for your agent

A throwaway email is helpful for safe testing of sites. Create custom IAM roles for your agent if it needs to access cloud resources.

### Give it a development / staging environment

Ideally, the agent uses the same testing setup as the engineers on your team. We suggest avoiding giving access to production services entirely. When using remote agents, you can run fully isolated test environments on the agent's remote machine.

### Readonly API keys

Where possible, give it readonly access. We find it is still helpful for humans to manually run any script that interacts with outside services.
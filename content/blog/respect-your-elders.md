---
title: "Respect Your Elders"
date: 2026-06-28
summary: "Inherited systems often look messy, but before rewriting, understand the constraints, scars, and trade-offs that made them work in production."
image: "respect-your-elders.png"
imageAlt: "A patched legacy system behind a fence with maps, dependency lines, and investigation tools in front of it"
draft: false
---

Most engineers have, or will have, the experience of joining a new team, opening a repo for the first time and thinking "What on earth happened here?".

Maybe the naming doesn't make sense, or the service boundaries overlap in strange ways. Perhaps there's a workaround in the middle of something that looks otherwise obvious. A comment saying "remove this after Feb 2014" (a personal favourite of mine, that was still in situ last time I saw the codebase in question in 2022 or so).

The reaction is often instant: the entire service needs to be rewritten!

It normally comes from a good place. Engineers are trained to notice inconsistency. We build by patterns, and get better by learning what the good patterns are and what the bad patterns "smell" like. This means when someone inherits a codebase and immediately sees the rough edges, they're not necessarily being arrogant or destructive; it often comes from a place of trying to help.

The issue is that they're often asking the wrong question.

It's not "why is this bad?", it should be "why is this the way it is?".

The distinction matters more than it might first seem.

That piece of software that offends your sense of taste is taking payments, routing orders, producing reports, sending alerts, and generally doing some boring and essential job that your customers or users depend on. It may have been doing that job for years, surviving outages, product redesigns, staff changes, vendor migrations, and "the incident" that's still talked about 5 years later.

The code itself is ugly, and wrong in all of the textbook ways. But the fact it exists in production is its own signal. It works. It deserves respect.

Respect, in this context, means you don't get to treat it as if the engineers that came before you didn't know any better.

### The Easy Status Move

There's an aspect of ego that shows up when you take over responsibility for a new system. Often there's pressure to show you understand it or make a change quickly. Spotting something that's a textbook example of "wrong" is an easy way to establish credibility quickly.

It can feel like having high standards, like ownership. Find the mess, name the mess, make a ticket to fix the mess - I can understand the logic as I've done it myself.

One API team I worked on had 20+ different production branches of the API. One for each customer it was deployed to. I immediately noted the disaster that this must cause, the time spent trying to release it, the complexity of the testing, the much better way we could do it if only I'd been there sooner to stop them. I was correct in that it could have been done differently, but the problem I overlooked was that it WORKED. 20+ happy customers, 20+ working deployments. I still lose sleep over the 6+ months of work it took to unify it, and the missed opportunities that we could have added instead (but I do also maintain that the unified config-driven version is _better_).

The problem of course is that finding and raising a ticket for the perceived fault is the easy part. Understanding the trade-offs and history is harder.

Understanding why otherwise smart engineers accepted one kind of pain, and what the alternative might have been is a much harder problem. Understanding historic urgency and differentiating that from current irritation takes far more patience than a quick read-through of a repo can give you.

That pause is often where seniority starts to show.

The engineers I trust most still notice those rough edges - they're not blind to bad design. They don't pretend like working is the end of the problem. They are, however, much slower to pull on any particular thread as they've also been burnt by unravelling it too fast previously.

The trick is to ask who depends on it, and when it last failed, if at all. Maybe they ask what it looked like BEFORE it looked like this, and what the change that made it this way was for. They've learned that "I don't understand why this is this way" and "this is stupid" are dangerously close sentiments.

### Chesterton's Pull Request

Chesterton's fence is my favourite principle in these situations:

> In the matter of reforming things, as distinct from deforming them, there is one plain and simple principle; a principle which will probably be called a paradox. There exists in such a case a certain institution or law; let us say, for the sake of simplicity, a fence or gate erected across a road. The more modern type of reformer goes gaily up to it and says, "I don't see the use of this; let us clear it away." To which the more intelligent type of reformer will do well to answer: "If you don't see the use of it, I certainly won't let you clear it away. Go away and think. Then, when you can come back and tell me that you do see the use of it, I may allow you to destroy it."

In software, naturally, this isn't a fence. It might be a duplicated function, a feature flag that's inexplicably always turned off, a retry loop with an arbitrary number. Even the dreaded sleep() call in the middle of a critical user journey.

The senior response is not to leave it alone forever - that's the ostrich approach of sticking your head in the sand and pretending it isn't there. It is to investigate.

There are dozens of possible answers to "Why?". Some are poor assumptions, either at the time or now; others are good answers that have outlived their validity. Some answers are for speed to market, a long-forgotten promise to go back and make it better later. Sometimes it is actually just bad code that's been missed. But without the curiosity and investigation, you won't know.

### If it Works, be Twice as Careful

One of the things that you need to take into account in an investigation is the current production system. If a piece of code currently works in prod then it's been tested by your users, and by reality, and often that alone outweighs any need to change because it "looks wrong".

This is where I start to see the difference between folks who know what software should look like, and those who've had to own the responsibility for one.

When you're responsible for a service, it being "cleaner" isn't enough reason to make a change. You need to truly understand the behaviour you're preserving, who will notice, and what already lives in people's heads. You also need to understand the difference between a successful improvement, and a well-written regression.

Rewrites are the biggest issue here. They offer the emotional satisfaction of a fresh start. It lets you imagine a system without any of the awkward history or compromises. A world where everything is named correctly and everything just works.

Sometimes this is the right call. I've seen times where the risk and issues were so concentrated that the incremental improvement option was a painful tax that was being applied on every change and had become unaffordable. 

Before you decide that the old thing has to go, you need to be able to explain in concrete terms what it does, why it looks the way it does, and what risk it contains. You also need to understand what risks you're introducing and why NOW of all times is the right time to fix it.

If that sounds like a lot of effort, that's partly the point.

### That Thing you Hate may be a Scar

Teams leave their marks on systems, for better or worse. Some are careless, some are scars.

A strange implementation might be left by a real incident. A brittle integration might be the compromise that kept a system live at a key moment. 

When you join the service later, you don't have the benefit of understanding the why. Only the result.

This doesn't mean you should preserve things indefinitely, just in case. Scars can become restrictions - workarounds that seemed reasonable under pressure can easily become a bottleneck that you're fighting for years to come. Old constraints that no longer exist can be shaping decisions long after that constraint has been resolved.

But you need to do the work to find that out.

The standard I'm arguing for isn't politeness to old code for the sake of it. It's simply for being more deliberate about the changes you're proposing.

If something is harmful, name it. If it slows delivery, show where and how. If it creates incidents, bring the support tickets as evidence. If nobody understands it and that understanding is the risk, say so in plain terms. "I don't like it" is a starting point, not the entire justification.

### How to Approach your Next Inherited System

You will, in most cases, take on a new system at some point in your careers. Take a short period (but longer than you perhaps would normally) to sit with it and truly understand what has gone before you.

Read the code, obviously, but also read the documentation, the incidents, the old pull requests, the dashboards. Ask the people who were already there or originally wrote it. Ask them what they'd change, what even they wouldn't touch, and what superstitions they have around that one weird trick that means they can't deploy on a Thursday.

Build a map of responsibilities and touchpoints with the wider ecosystem, before you start building your list of grievances.

When (not if) you find something ugly, try to fit it into the following categories:

- Deliberate trade-off that still makes sense.
- Deliberate trade-off whose original reason has expired.
- A workaround for something outside this codebase.
- A mistake that is currently harmless.
- A mistake that is actively costing the team or customers.
- A thing nobody understands.

The last one deserves care. Lack of understanding is a real risk, but almost never a good reason to leave it be. The trick here is to make the behaviour observable - add tests and dashboards, improve documentation, pair with someone that has more context. Change only small things that test that understanding, rather than ripping it out.

If you still think it needs to be rewritten after all of that, your argument will be much stronger. It goes from "This looks bad" to "This part of the system exists because of a constraint that no longer exists, causes this specific problem, and can be replaced with this solution without risk to customers".

Two very different conversations.

It also means people are more willing to listen. People are less defensive when you respect the work enough to understand the why. Including the work they don't like any more. Sometimes especially that work.

### Respect is not Surrender

"Understand the history" is not permission to tolerate pain that could be avoided forever.

Some systems are in a bad enough state and some teams have internalised that friction to the point it's almost a personality. Respecting what came before doesn't mean letting old code shape future decisions.

It just means that you owe the existing working system enough of your attention to understand why it's doing what it's doing.

The code you've inherited *is* worse than it could be, but it's almost certainly also doing a job right now. The senior approach is to hold both those truths simultaneously for long enough to decide on the approach to take.

Before you remove that fence, find out why someone built it. Then if you're sure it no longer belongs, take it down properly.


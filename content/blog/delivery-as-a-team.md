---
title: "Delivery Is a Team Behaviour, Not Just a Speed Problem"
date: 2026-06-14
summary: "Delivery improves when teams can surface problems together, finish the improvements they agree to, help each other when work gets stuck, and care enough to fix what slows everyone down"
image: "delivery-as-team-behaviour.png"
imageAlt: "Abstract workflow board with blockers being moved aside as a team creates a smoother delivery path"
draft: false
---

Your team already knows if delivery isn't working.

Maybe they don't know how to say it directly, or perhaps they just talk about the symptoms rather than the result. "Too many distractions", "Requirements keep changing after we've started", "Reviews take too long" or "We're constantly waiting for X". The hardest part is creating the conditions where they'll say it together, and do something useful to sort it out.

I once inherited a team where this was immediately obvious.

In one-to-ones, people were mostly open with me. They told me where the pain was in their role, the things that slowed them down, the bits that were harder than they needed to be. Nothing particularly onerous in isolation, but together a large set of annoyances that each person held while trying to get a job done.

Then we had our first team retro. Silence.

Not the kind of silence where people are reflecting or deep in thought, but the kind where people want to be anywhere else but there. And they certainly don't want to be "that person" that calls out issues.

I was still the new guy and I had a bit of leeway - so I called it out. I honestly told them that every single person in that room had mentioned at least one team-level issue to me in my initial one-to-ones, and that a lot of them overlapped with the rest of their teammates, but unless we are willing to call them out in a group setting where we could actually get to fixing it the issues would remain. We ended the retro early, and resolved to come back a week later and do it again properly. Fully aware this was most likely a trust thing with a new manager, but that was an unacceptable start as far as I was concerned.

The next retro went differently. A few minor issues were brought up. Still none of the "big" things from one-to-ones, but a few things where people were willing to at least speak up and bring something to the group. These were all small and innocuous enough that my response to them could be "So why don't we just NOT do this?". 

They looked at me as though I'd fallen out of a tree. "But this is how we've always done it" - you know the sort of comment. These are smart people, but it never seemed to occur to them that if they know what the issue is, they could just not do it.

Following retros brought bigger issues, more contentious issues, and the occasional argument. But each raise led to a change, and each change led to more confidence to bring up problems that were hurting delivery. Even if that change was to change BACK to the thing we'd stopped doing two weeks prior as it was worse.

It didn't take long before delivery improved. Fewer things stuck in review/test, more pairing, better communication before bugs snuck in, less failed deployments. All those things that DORA metrics catch but don't really explain, helped by retros where every post-it note became an honest conversation.

DORA is a perfectly useful set of metrics in isolation, but they are diagnostic, not a scoreboard. If you start using it to compare two teams, or to chase a particular metric it's less useful, but when you can use it to show that your team is in a better place than it was 3 months ago, and these 6 things have changed, you know you're making a positive difference.

If you're just asking "why is this number lower than [some arbitrary baseline]", you're probably missing the point of the metric.

Sometimes delivery is slower because the build is slow, or the test environment implodes every day when the US team comes online and doubles workload in test, or Steve* insisted that his pet service needs to lock the entire DB every time it wants to query something. All technical problems that need a technical solution; they also need attention, but they're not the only things to fix.

Most of the time it's behavioural. Do you really need to fill out 3 slightly different Jira tickets in triplicate and get approval from 6 layers of management to change a config? Do you have to wait a week before a senior engineer can review your PR to fix a back office typo? Is Steve* refusing to approve any PRs for "his" project because he's using it as promotion fodder in the next round?

Here's some useful metrics for any leader trying to improve delivery:
- How many people contribute to your retros? Not just attend and nod, but actually put something into the mix?
- How many retro actions get completed? Not just captured and assigned, but actually finished. Bonus metric - if they don't get finished, does anyone care?
- How much does your team help each other on a difficult task, even at the expense of their own work?
- How much work gets pushed into blocked and forgotten?

These aren't clean DORA-style metrics, and there is no perfect score for any of them - you need context of your team to know what "right" means. But I'm entirely confident that if you improve them, your delivery will improve as a result.

The teams I trust with pressure are the ones that have support patterns in place, and safety within the team to either notice or flag that something isn't right.

Another useful metric I've started using in recent months is number of side-quests. How many times does a member of your team stop their planned work to fix something that they've noticed is broken, or to help someone outside of the team to get something working, or to write some documentation because they've realised it's not clear.

Again, this needs context - you can't have an entire sprint of side-quests and nothing else, and some periods need more of this type of work than others, but a team with NO side-quests? That's a giant red flag that says the team is either too focussed on the task at hand to the detriment of the bigger picture, or they just don't care.

The point is not to ignore delivery metrics, or to push them over issues your team are facing in the real world. The point is to understand what creates them.

If people can raise potential problems early, finish any improvements they agree to, help each other when work gets stuck and care enough to fix things outside the narrow ticket in front of them, delivery usually improves. Not because someone shouted about speed, but because the team became better at actually working as a team.


_*Steve is a fictional person not representative of a real issue - I'm not calling anyone out, even with a name change!_

---
title: "Delivery Is A Team Behaviour, Not Just A Speed Problem"
date: 2026-06-14
summary: ""
image: "/images/blog-default.svg"
imageAlt: "Default image"
draft: true
---

Most teams already know when delivery isn’t working.

They may not have the perfect language for it. They may talk around it. They may describe it as “too many interruptions”, “requirements keep changing”, “reviews take ages”, “we’re always waiting on X”, or “everything seems to land at the end”. But they usually know. The harder part is creating the conditions where they’ll say it in a room together, and then do something useful with what comes out.

I inherited a product engineering team once where this became very obvious very quickly.

In one-to-ones, people were open with me. They told me where the pain was. They talked about the things slowing them down, the frustrations they had with process, the places where communication was breaking down, and the bits of work that were harder than they needed to be. None of it sounded malicious. It sounded like a team full of people trying to do a decent job while carrying around a set of shared annoyances.

Then we had a retro.

Silence.

Not thoughtful silence. Not “we’re reflecting deeply” silence. More the kind where everyone suddenly becomes fascinated by the wall, their shoes, or the exact spacing of the sticky notes.

So I called it out.

I said, more or less, that every single person in the room had mentioned problems to me individually, and it would be useful if we could talk about some of them together. Not to blame anyone. Not to perform honesty for the sake of it. Just because private frustration doesn’t improve delivery. Shared problems need to become discussable before the team can do anything sensible about them.

I don’t think they all knew everyone else was feeling the same things. That matters. When you think your problem is only yours, you manage it quietly. When you realise several other people are tripping over the same thing, it becomes easier to treat it as a system problem rather than a personal irritation.

The following retros changed. Not immediately into some perfect textbook ritual, but noticeably. More people spoke. The points raised were more specific. Actions became less vague. The team started to see that saying the uncomfortable thing could lead to something actually changing.

That was a delivery improvement.

It wouldn’t have shown up neatly in story points that week. It probably wouldn’t have moved a DORA metric by the next Friday. But it changed the team’s ability to improve itself, and that is one of the things I care about most when I’m trying to understand whether a team can deliver consistently.

I’m not against delivery metrics. DORA metrics can be useful. Throughput can be useful. Cycle time can be useful. Looking at how much work a team completes can tell you something, provided you understand the context.

The trouble starts when those numbers become a management shortcut.

Story points completed by Team A compared with story points completed by Team B tells you very little. Deployment frequency across two teams working in different systems, with different constraints and different product risks, can quickly become theatre. Even good metrics become poor management tools when they’re stripped of context and used to ask, “Why can’t this team just go faster?”

A better question is: what is stopping this team from improving its own delivery?

Sometimes the answer is technical. The build is slow. The test suite is unreliable. The architecture makes small changes strangely expensive. The deployment process requires too much manual coordination. Those things are real, and they deserve attention.

But often the answer sits in the behaviour of the team.

How many people contribute in retros? Not just attend, not just nod, but actually put something on the table.

How many retro actions get completed? Not captured. Not assigned. Completed. And if they don’t get completed, does anyone care enough to ask why?

How often does work sit blocked while everyone politely pretends it’s still progressing?

How often does someone step away from their own task to help another person get unstuck?

How much pairing happens naturally, especially around risky or unfamiliar work?

Who gives useful feedback in reviews, and who avoids the conversation until the pull request has become a negotiation over comments?

How much work is in progress at once, and how much of it exists because starting something new feels easier than finishing something difficult?

These are not always clean metrics. Some of them are more like signals. You need judgement around them. You can’t turn every human behaviour into a dashboard and expect the dashboard to tell the truth.

But they tell you things that raw output often hides.

A team can look busy while becoming fragile. You can have plenty of tickets moving and still have only one person who understands the release process. You can have high individual output while knowledge gets trapped in corners. You can complete a sprint and still be quietly accumulating resentment, rework, and unspoken risk.

The teams I trust most under pressure tend to have visible support patterns. People notice when someone is stuck. They don’t treat helping as a distraction from delivery. They understand that if one person is carrying a problem alone for two days, the team is already paying for it, whether it appears on the board or not.

I’m also interested in what I privately think of as side-quests.

Someone spots a small piece of friction and fixes it. They improve a script. They tidy up a confusing bit of documentation. They remove a repeated manual step. They help another team with an awkward integration point because it keeps biting everyone. It may not be their assigned ticket. It may not be in the sprint goal. But it makes the system easier to work in.

That behaviour tells me something important. It says people care about the environment they’re delivering in. It says they can see beyond their own task list. It says they believe making things better is allowed.

There is a balance, of course. A team full of uncontrolled side-quests can lose focus. Product work still matters. Commitments still matter. You can’t have everyone wandering off to polish whichever inconvenience annoyed them most that morning.

But when nobody ever does that work, you should worry. It often means people have learned to keep their heads down. They may be delivering tickets, but they’re no longer improving the conditions around delivery.

The same applies to mentoring and feedback. These are easy to praise and hard to value properly.

A senior engineer who helps two others make better decisions may appear slower on paper than someone who closes more tickets alone. A developer who takes the time to give direct, useful review feedback might reduce future rework in a way that never gets attributed back to them. Someone who asks the awkward question early can save the team from building the wrong thing very efficiently.

If your measurement system only rewards visible individual output, don’t be surprised when collaboration starts to look optional.

This is one reason I’m cautious when leaders ask why a team can’t simply go faster. Sometimes they can. Sometimes there is waste to remove, decisions to simplify, or technical drag to deal with. I’m not precious about pace. Product engineering teams exist to deliver useful change, and it’s fair to expect momentum.

But sustainable pace usually comes from trust, clarity, and shared ownership. Not from squeezing the visible numbers until people learn how to make the numbers look better.

The delivery measures I care about most are often the ones that show whether the team can respond well when things get messy. Because things will get messy. Requirements will change. Incidents will happen. Someone will misunderstand something. A dependency will slip. A customer will use the product in a way nobody expected.

At that point, the question isn’t whether the team had a neat sprint report last month. It’s whether people tell the truth quickly. Whether they help each other. Whether they can disagree without turning it into politics. Whether they learn from the problem instead of hiding it.

That’s where delivery really evolves.

The obvious metrics still have a place. I’ll look at lead time, deployment frequency, escaped defects, throughput, and all the usual signals. But I want to read them alongside the less tidy evidence: the retro that actually changes something, the reduced work in progress, the pairing that spreads context, the review that improves the design, the side-quest that removes daily friction.

None of those gives you a single clean answer. That’s probably why they’re easier to ignore.

But if you’re managing a product engineering team and wondering why it can’t just go faster, it’s worth looking there first. The constraint may not be effort. It may be that the team hasn’t yet built the trust, habits, and shared responsibility that let speed become a result rather than a demand.
---
title: "Culture Is What You Reward and What You Tolerate"
date: 2026-07-19
summary: "Culture is shaped less by the values on the wall than by the behaviour leaders reward, the work they make invisible, and the things they quietly allow to continue."
image: "culture-reward-and-tolerate.png"
imageAlt: "Two abstract scales — one lit and elevated, one dimmed and low — above a team of small figures, with a potted plant in the corner"
draft: true
---

Culture is often defined as that thing people do when nobody is watching.

While I think that is true, it's also incomplete. People learn what matters by watching what gets rewarded, and what is quietly allowed to continue. Official values, all-hands messages, and a leader saying the right thing in a retro can all help, but the stronger signal is usually much closer, and much simpler: what behaviour gets praised, who gets promoted and why, who gets protected and from what, and what behaviour carries no consequence in either direction from leadership.

If that is uncomfortable to you, it's because you understand that it means you are shaping culture even when you think you are "staying out of it".

If the person who saves every project by giving up their evenings and weekends is the one who gets celebrated, other people notice. If the team doing the dull, preventative work that keeps production stable is mostly ignored because nothing caught fire, they notice that too. After a while, you should not be surprised when more people optimise for visible rescue work and fewer people volunteer for the boring maintenance that stops rescue ever being needed.

This is one of the reasons I dislike hero culture in engineering teams. Not because incident response is unimportant - the person who joins the call at 2am and gets the platform back online absolutely deserves a tonne of gratitude. But if that is the only kind of operational excellence that gets status, the organisation is quietly teaching people that prevention is less valuable than recovery.

The trouble is that prevention is much harder to put a number on.

"No P1s this quarter because the team spent time cleaning up brittle deployment paths, improving observability, removing a risky manual step and pairing with another team on a confusing integration boundary" is not as dramatic as "The team saved the launch after a production incident". One sounds like the absence of news. The other has a clear protagonist.

But the first one is almost certainly the healthier organisation.

### Rewards Are Not Always Rewards

I have seen good work rewarded with more work often enough that I now try to be very careful with it.

Sometimes that's exactly what someone thinks that they want. A senior engineer may want a harder problem because it gives them evidence for the next role. A tech lead may want broader responsibility because they are trying to grow into a more strategic position. Even in those cases though, more work is not the reward; the opportunity, visibility and trust are the reward.

But for someone else, "you did that well, so here is another difficult thing" just teaches them to hide capacity.

It can be especially damaging when reliable people are used to absorb mess created elsewhere. The engineer who always writes the missing documentation gets asked to write more of it. The person who calmly handles incidents gets pulled into every incident. The team that keeps its service stable loses people to teams that are visibly struggling, because the stable team is apparently "fine".

The message may be accidental, but it is still heard.

This does not mean every unpleasant job needs a round of applause. Some work is simply part of being on a team. The point is to make sure the reward system is not accidentally teaching people to avoid the work you need most.

If you want teams to care about operational stability, you must notice the people reducing operational risk before it becomes visible. If you want thoughtful technical ownership, then you have to reward the person who prevents a bad architectural decision as much if not more than the person who implements a clever fix. If you want product-minded engineers, make sure the people asking awkward questions about customer value are not treated as blockers because they slow down a plan that was already politically convenient.

People will do more of the thing that earns status, trust, money, opportunity or simple relief from criticism.

And you risk them doing less of the unglamourous stuff that you rely on quietly and don't reward for.

### The Things You Try To Ignore Matter Too

I once worked with a team that had a "certificate of shame".

The idea was simple enough. If someone broke the build, caused an incident, or otherwise made a visible mistake, the current holder could pass the certificate on to them. I can believe it started as harmless fun. In the first few iterations, with the right people and enough trust, it probably was.

By the time I joined, it was anything but harmless.

Some of the newer engineers had started to fear mistakes in a way that slowed them down. They would check, recheck, wait for reassurance, avoid taking on anything too exposed, and even sometimes become blockers to their own work because the possible embarrassment of being the next person handed the certificate was sitting in the back of their mind.

Nobody was deliberately trying to create a fear-based culture. But that is part of what made it worth paying attention to.

The team was not cruel. The people involved were not villains. They were smart engineers with a running joke that had simply outlived its usefulness. The culture I wanted us to build valued experimentation, learning, and the kind of pace that comes from being able to make small reversible mistakes. Letting the certificate continue was sending the opposite signal, so it had to go.

Not by me walking in, declaring it banned, and congratulating myself on enlightened leadership. That would have created a different problem. The certificate had meaning inside the team, even if that meaning had become unhealthy. Removing it from above would have been easy, but it would not have built much understanding.

We talked about it as a team. I explained the culture I wanted us to move towards, and the behaviour I thought the certificate was now encouraging. Other people had their say. Some agreed quickly. Some were more attached to it, or felt I was making too much of something intended as a joke.

There was never, and even years later probably still isn't, unanimous agreement.

Culture change is rarely a neat moment where everyone realises the same truth at the same time. We got enough agreement to move forward, and enough understanding that the decision was not just "the new guy hates fun".

And for a while, we probably overcorrected - mistakes became learning opportunities so loudly that it started to feel a bit forced. There is only so much celebration a broken build can sensibly carry. Eventually that settled down into something more useful: mistakes were discussed without ritual humiliation, and people were expected to learn from them rather than hide from them.

We ended up closer to the culture I wanted: a team where mistakes still mattered, but were survivable enough to be honest about.

### Turning the Boat Around

Small cultural artefacts are one thing. Changing the direction of a whole team is harder.

I have been around teams where the technology was old, the operating model was tired, and the mindset no longer matched what the business needed. The organisation wanted engineers who owned their product, thought ahead, helped shape direction, and cared about outcomes beyond the next ticket. A chunk of the team had learned, often through years of being managed that way, that their job was to take requirements, write the code they were told to write, and stay out of the bigger conversation.

It is tempting to frame that as ambition versus complacency. As with most things, oversimplification like this is a sign of a lack of interest or imagination.

Some people will be thriving in the current system. Others may be exhausted by years of failed change, or may never have been given evidence that broader ownership is actually a good thing. There will also be people who have learned that sticking their head above the parapet only creates extra work or political risk.

If you want different behaviour, you have to change the system around that behaviour.

I tend to start with carrots, partly because it is more humane, and partly because it works better when the people involved are capable but unconvinced. Find the people who are already leaning towards the future you want. In a team of ten, you do not need everyone right away. You might only need one or two people who are willing to try something different.

Give them a real problem, not a side project nobody cares about. Let them design a better path. That might be a feature written in a new stack and integrated carefully into the existing platform. It might be migrating one painful workflow to a better service boundary, or proving that the team can speak directly with product and shape the solution rather than wait for instructions.

Then make the work visible.

Praise them publicly, but be specific. Do not praise them for being shiny or new. Name the ownership, the judgement, the way they brought others along, or the evidence that the customer or business outcome improved. The public signal matters because other people are watching for what earns trust.

This is where reward and tolerance meet.

If the new behaviour gets praise, but the old behaviour remains easier, safer and more comfortable, nothing much changes. If someone repeatedly blocks the new direction through cynicism, passive resistance, or refusal to engage, that also becomes part of the culture if left untouched.

I always prefer carrots first. But "carrots first" does not mean "only carrots forever".

At some point, expectations need to be clear. Owning the product, learning the new platform, participating in design discussions, improving reliability, mentoring others, whatever the direction requires - these become part of the job, not optional hobbies for the keen people.

The sticks do not need to be theatrical. Often they are ordinary management: direct feedback in a 121, clearer goals, support to learn, consequences for refusing to engage, and sometimes, in worst cases, a frank conversation that the future role may not match what someone wants from work.

That last conversation should be handled with care. There is nothing morally wrong with someone wanting a narrower role where they are given clear tasks and can focus on implementation. But if the team genuinely needs engineers who can operate with broader ownership, pretending that mismatch does not exist is unfair to everyone.

### It Usually Gets Worse Before It Gets Better

Culture change has an irritating habit of making things feel worse just as you start doing the right work.

Contentment may turn into denial. People who accepted the old system may become confused when the expectations change. The ones who were quietly frustrated can become impatient because the change is finally visible but still too slow. Those who benefited from the previous culture may resist more strongly than you expected.

The change house model is useful here because it gives language to something leaders often underestimate: people do not experience change as a clean project plan. They move through contentment, denial, confusion and renewal at different speeds. Some people will be excited before others have even accepted that anything needs to change.

This is one reason grand transformations often disappoint.

They make for a better announcement, but they also create more surface area for fear. If you replace everything at once, people can no longer tell which parts of their expertise still matter. You risk losing the accumulated knowledge that made the old system function at all. That knowledge may be wrapped in habits you want to change, but it is still valuable.

Small incremental changes are much slower to describe, to the point of potentially being too boring to update outside of the team. They are almost always better to live through.

Move a workflow. Change one expectation. Reward a single piece of ownership in public. Stop an unhealthy ritual. Make one preventative piece of engineering work visible. Then keep going.

That does not mean being timid. It means understanding that culture is not changed by announcing the destination. It is changed by repeatedly making the desired behaviour more worthwhile than the old behaviour, and by dealing with the things that pull people back.

### The Audit I Try to Run

When I join or lead a team, I try to look at the gap between the stated culture and the experienced culture.

Who gets attention when things go well? Who gets attention when things go wrong? What work is treated as important but never protected? Which people are always asked to carry extra load because they are reliable? What jokes are only funny to the people with enough status not to be hurt by them? What behaviour is everyone quietly working around?

The answers are rarely flattering.

I have got this wrong before, and more recently than I might like to admit. I have rewarded the reliable person with too much more reliability work. I have let small behaviours run longer than they should because I did not want to overreact. I have underestimated how quickly a team learns from what a leader ignores.

The useful part is that these signals can be changed.

You can praise prevention before heroics. You can give opportunity to the people doing the boring work, not just the visible rescue. You can remove a ritual that teaches fear, even if it used to be funny. You can make old expectations explicit enough that people can choose whether they are willing to die with them or move with the team.

None of that fixes culture overnight. It may even make things slightly more painful for a while.

But if culture is shaped by both what you reward and what you tolerate, then you need to start with being honest about both. The values that matter most are the ones your team can see in action, not painted on a wall.

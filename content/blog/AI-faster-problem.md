---
title: "AI Makes You Faster. That May Be the Problem"
date: 2026-07-05
summary: "AI doesn't automatically make you better. It can make you much faster, though, and those are two disparate statements that people assume overlap right up until they realise how different they are."
image: "ai-faster-problem.png"
imageAlt: "An abstract AI accelerator racing toward a risky path while review checkpoints mark a safer route"
draft: false
---

Most AI that I've used so far can be considered accelerators. Whether it's producing the first draft of a document, proofreading a document before publishing, summarising someone else's document into bullet points for easier reading, writing boilerplate code or filling out the test coverage with cases I might've missed or not bothered with for the sake of time - they take a process that might take an hour and get it done in seconds.

That's a genuinely useful thing.

The risk is when we think faster means better.

If a team has poor judgement about what they're going to build next, AI won't fix that for them. It might help them to produce more options, plans, tickets, prototypes, and confident-looking analysis on what's best. The expensive mistake in this situation is still the choice of direction. Spend six months (or even one) building the wrong thing faster and you haven't saved six months - you've just arrived at the wrong place with better formatted notes as to why.

The same is true for technical decisions. Some choices are slow because they're hard, not because typing speed is the limitation. Prioritisation is slow because being wrong costs you a market window. Architecture is slow because systems accumulate debt quietly - a database boundary, an integration pattern or an assumption about how things will scale in three years' time can look good on paper and become expensive and painful in six months' time.

AI can help you to explore those decisions; it can find options you've not considered yet, it can explain the trade-offs from one solution to another, and it can make the conversations about them easier to start. What it doesn't do is innately know the context across the company; if it does, you're probably spending a lot on tokens. It also can never own the outcome.

That last bit is the important part. When (not if) something breaks, a decision doesn't hold up in the face of reality, or the auditors come knocking to find out what that particular bit of code does, and why, AI isn't going to be there to offer a defensible answer. "You're absolutely right..." is no help in a post-mortem discussion.

A quieter but equally dangerous risk is skill atrophy. When the machine starts doing the job well enough, it's natural for human beings to stop practising the task properly. At first it feels efficient - a code review is faster because the machine caught all the issues, the RFC already has for/against each proposal, so it gets read and understood, rather than interrogated.

Anchoring makes this worse - if you know that AI gives a plausible answer often enough, you're not starting from a blank page any more. You're reacting to the information from that process and already a few steps along the "suggested" path. Under pressure to get things shipped and to spend your time adding value, it can be difficult for anyone to spend that time looking for flaws in an AI answer that the organisation has decided is "good at this kind of thing".

A senior engineer's value is rarely in producing the first answer to a problem. It's noticing the missing information and constraints. It's the experience of looking at a problem and realising what today's opportunity costs us tomorrow, or in six months. It's spotting that the migration plan is technically correct for the "by-the-book" system that you documented, but becomes risky in the "how it actually works". It's knowing that the awkward political context around a decision isn't just a distraction, but sometimes the reason for the answer. 

AI can support that work, if you can document all the factors that are in play to a level of detail and weighting that fits the real world. 

Regardless of the context it has, though, it can't take responsibility for it.

### Consequences of your AI-ctions

The way I've come to think about AI usage is around consequences.

I'm all for letting AI do more in places where the work is easy to verify, easy to reverse, and the blast radius is small. Boilerplate code generation, test case enumeration, summarising long incident threads and meetings, etc. - there's still the need for a human to validate, but the risk is low across all these cases.

If generated documentation misses an edge case, you can add it. When it mishears a name or an action on a call, it can be rectified with barely more than a chuckle at how many different ways there are to hear "Steve". Most importantly, this can be done without much friction or time spent.

The other side is where I believe AI has no place taking any action at all: security reviews (military context, not API keys in plaintext...), database migrations with actual customer or financial impact, or anything involving medical, legal, or financial advice. These carry real-world risk of being confidently wrong; the consequences include lifelong harm and potential loss of life and therefore require properly trained human attention at every step.

The middle ground is where I think people need to pay the most attention.

Knowledge work looks safe as there are no immediate fireworks. Architecture proposals, roadmap planning, hiring rules, incident management, tech strategy, vendor comparisons, policy drafts, and so on. AI is very useful in all of these areas, but context starts to disappear.

A model will suggest an architecture that works for the information it has available in its context window. A senior engineer will do the same in theory, but with the added knowledge that the plan falls apart the second that the context that it was built on changes.

A model will summarise exactly what happened on an incident and still miss the organisational behaviour that allowed the incident to happen - or more likely overcorrect and cause a raft of future problems. 

Think about that poor engineer (you know the type I mean, you may even be the type I mean) that accidentally dropped the production database one Friday afternoon. An AI will "correctly" summarise that a human with access was the problem, and all destructive access to a database should be restricted / removed. 

This would be a completely mitigated incident. There's no chance of it recurring.

It would also risk slowing existing workflows to a standstill. There's always the need for a break-glass-style fix in some use case, and some organisations are less mature than others where that is a near-daily occurrence, for whatever reason.

The senior answer, as always, is "It depends...". It depends on the reasons that the human chose to access production manually. It depends what alternatives you have in place, and what the existing workflows require. It depends how costly all those previous choices are to remove to do "right".

The answer to all of this, of course, is not “don't use AI for knowledge work”. That would be too neat. Instead, the question is: who understands the decision being made well enough to sign their name to it?

If nobody can explain the recommendation without pointing back to the tool, the team doesn't yet own the decision.

AI can assist. It can produce checklists, highlight patterns, or help compare approaches. But “the AI said it was fine” won't survive an incident review, an audit, or a courtroom. Nor should it.

### In practice

The practical test I use is simple.

AI can and should do more when the outcome of the task is easy to verify, the result is reversible, visibly wrong quickly, and small in blast radius.

AI should do less unmonitored when the work affects customer data, money, access, safety, compliance, or production availability. It should also do less, or humans should take extra precautions, when failure might remain hidden for weeks, or when someone will need to defend the decision to a customer, regulator, executive, or incident review.

I don't mean that everything serious needs to be slow. The speed just needs to come from the right place. AI can help you be better prepared, produce clearer options, spot blind spots, and take away the manual busywork. That doesn't mean handing over judgement because the tooling produces something that looks plausible enough.

There's a common trade-off people like to point to - Fast, Good, Cheap: Pick any two. It's not a law of physics or anything quite so insurmountable, but it's a useful warning. AI changes the economics of work, but it doesn't remove the consequences on the other side. Don't be fooled into thinking that AI tugs on the cheapness lever either - once you count the cost spent in tokens, rework, review overhead, and doing the wrong thing altogether.

In summary, by all means use AI to go faster.

Just be honest about what is being accelerated. If it's a healthy engineering system, you may get real leverage. If it's weak prioritisation, shallow review, poor accountability, or missing technical judgement, speed may be the last thing you want.

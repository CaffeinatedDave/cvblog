---
title: "Does your organisation have enough self-control to survive?"
date: 2026-08-25
summary: "AI can make engineering teams faster while quietly removing the struggle through which they learn. Sustainable adoption requires enough organisational self-control to protect capability as well as throughput."
image: "marshmallow-self-control.png"
imageAlt: "A team chooses between a short orange path through a glowing AI cube leading to one marshmallow and a longer path of engineering work leading to two marshmallows and a completed bridge"
draft: false
tags: []
categories: []
---

AI can make your quarterly reports look great, but doing so might well put the longer-term direction at risk.

More tickets closed. Shorter cycle times. A backlog of "stuff" disappearing at a rate faster than imaginable just a few years ago. Everyone is producing more, and the graphs all point in the right direction.

But what does that really mean for the people in your teams?

## One marshmallow now

Most people will know some version of the marshmallow test. It's a simple concept: a small child is left in a room with a treat. They can either eat it immediately or wait a short amount of time for the adult to return and receive two.

The original conclusion says that the children who waited would go on to do better in their later lives. Their ability to delay gratification supposedly predicted academic and career successes.

Of course, later studies found that the relationship became far weaker once family background, the home environment and early cognitive ability were adjusted for. A child who trusts that adults keep promises has a different decision to make from one who has learnt that an offered reward may never materialise.

So this isn't intended to take the marshmallow test as a theory of child development. I want to borrow the choice at its centre.

Will you take an obvious reward now when doing so may cost you something more valuable later?

Engineering organisations are being offered that choice. The treat on the table is speed.

## The homework looks excellent

A recent working paper, *The Generative AI Learning Penalty: Evidence from Chinese Secondary Education*, makes this choice exceptionally clear.

The researchers studied 26,811 pupils in grades 7–12 over 30 months. After adopting generative AI, pupils' homework scores rose by 18% and they completed the work 30% faster. If your OKR is homework scores, this would look like an extraordinary success.

But in this case homework isn't just an output. It is also how pupils learn to do the work.

Within six months, monthly closed-book exam scores had fallen by 20%. The effects on high-stakes entrance exams took longer to emerge, but were substantial. The chart below makes the trade-off hard to miss: better homework, completed faster, followed by worse performance when the tool was no longer available.

![Generative AI improved homework scores and reduced completion time, while later exam performance fell.](/images/blog/ai-homework-scores.jpg)

*Generative AI improved homework scores and reduced completion time, while later exam performance fell. Source: David Strömberg, Victor Lei and Yanhui Wu, The Generative AI Learning Penalty: Evidence from Chinese Secondary Education (CEPR Discussion Paper 21577, 2026). The chart is a visual summary supplied with this article; readers should consult the paper for the study design and full results.*

There is an important detail in the paper. The losses were concentrated among the roughly 80% of AI users whose unusually high marks and short completion times were consistent with outsourcing the homework. Pupils who continued to spend a similar amount of time on it experienced much smaller learning losses.

The problem wasn't the presence of AI. It was what the pupils stopped doing when AI arrived.

## Tickets are homework too

There is an uncomfortable parallel with software engineering.

We usually talk about engineering work as though its only value is the finished change. A ticket only exists to become code, so producing the code faster must therefore be better.

But the act of doing the work also changes the person doing it. Tracing an unfamiliar request through a codebase helps build a mental model. Struggling through spaghetti code to grok a poor abstraction teaches you why it is poor. Debugging a flaky test creates the kind of knowledge that could make a huge difference during an incident six months later. Even the slow, methodical work of reading code you didn't write adds to the team's shared understanding of how the system behaves.

The ticket gets completed once, but the capability built while completing it can pay back for years.

When AI supplies a plausible and working implementation before an engineer has understood the problem, the ticket will still close. The learning can quietly disappear, and the OKR will celebrate that change lead time has halved. Nothing in the delivery metrics shows that the organisation has borrowed against its future ability to reason.

At first, this may look like a pure productivity gain. Experienced engineers use AI to move faster. Less experienced engineers produce work that looks more like the work of experienced engineers. Leaders see shorter lead times and raise their expectations accordingly.

The value in waiting for the second marshmallow only appears once the initial answer given by AI is slightly wrong - not in a way that gets caught in a code review, but the sort of way that goes wrong at 2am on a Saturday. When two changes interact in a way that two non-communicating AI sessions didn't account for or even know about, or if you're solving something genuinely new and interesting that doesn't have an answer in the LLM training set. It appears in incident response that can't figure out _why_ something happens that way and architecture decisions that no one can unpick in 18 months' time.

An exam without AI isn't a perfect analogy for engineering. Unless a policy or an outage intervenes, our tools likely remain available. But engineering has its own closed-book moments. Production is down. The telemetry is contradictory. The obvious fix has made things worse. Most systems contain years of undocumented decisions, and a tool can retrieve the code without understanding which assumptions still hold.

Those moments require knowledge that currently sits inside the team and is passed on through a senior engineer pairing with someone more junior, not merely access to something capable of producing an answer.

## The pressure makes sense

I understand why organisations take the immediate reward. The commercial pressure is real, and refusing useful tools isn't a serious strategy. I'm not shy about the use of AI in my own work—it can help to remove boilerplate, make unfamiliar code easier to explore and give an engineer a fast way to test their thinking. At the very least (if you tell it not to be so sycophantic...) it can make for a useful rubber duck.

The concern starts when leaders inevitably turn the availability of AI into a blanket demand for more output.

That demand changes how people use the tool. Time spent understanding begins to look wasteful when a colleague can prompt their way to a pull request before lunch. Asking an engineer to explain a generated change looks like unnecessary ceremony. Pairing, careful review and exploratory work all become harder to defend because their benefits don't appear immediately on the sprint burndown.

People respond rationally to the system around them. If we reward completed tickets and treat learning time as inefficiency, we shouldn't be surprised when people optimise for completed tickets. (See my earlier post about teams becoming what we reward...)

This is where organisational self-control matters. A leader has to be willing to leave some apparent productivity on the table.

That might mean expecting engineers to be able to explain every change they submit, however it was produced. It may mean protecting work where at least the first pass is done without generation because building the mental model is part of the task. Code review can test reasoning rather than merely scanning the diff, and incident reviews can reveal where the team depended on knowledge it no longer held.

The right approach will vary by work and by person. Asking a senior engineer to hand-write routine data mapping teaches them very little. Letting someone new to the system generate the core of a subtle concurrency change may rob them of exactly the struggle they need. The useful question isn't “Was AI used?” It is “What capability should remain with the engineer after this work is done?”

## What are you measuring?

The pupils in the study did what many engineering teams are now being encouraged to do. They produced a better-looking result in less time.

The system had confused evidence of learning with learning itself.

I worry that engineering leaders are making the same mistake when we treat throughput as a complete account of team performance. Shipping matters, of course. But so does whether the team understands what it has shipped, can recognise when it is wrong and is becoming more capable with each piece of work.

AI can help with all of that. It can also conceal its absence for quite a long time.

The organisations that survive won't necessarily be those that adopt AI fastest or resist it longest. I suspect they will be the ones with enough self-control to take the speed where it helps, while still paying the cost of learning.

If every ticket is now easier to move to Done, how are you checking that your people are still becoming better engineers?

---

## References

- David Strömberg, Victor Lei and Yanhui Wu, [*The Generative AI Learning Penalty: Evidence from Chinese Secondary Education*](https://ideas.repec.org/p/cpr/ceprdp/21577.html), CEPR Discussion Paper 21577 (2026).
- Tyler W. Watts, Greg J. Duncan and Haonan Quan, [*Revisiting the Marshmallow Test: A Conceptual Replication Investigating Links Between Early Delay of Gratification and Later Outcomes*](https://pmc.ncbi.nlm.nih.gov/articles/PMC6050075/), *Psychological Science* 29(7), 2018.
- Jessica Sperber et al., [*Delay of gratification and adult outcomes: The Marshmallow Test does not reliably predict adult functioning*](https://onlinelibrary.wiley.com/doi/10.1111/cdev.14129), *Child Development* 95(6), 2024.

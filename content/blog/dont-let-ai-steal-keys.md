---
title: "Don't Let AI Borrow Your Keys"
date: 2026-06-07
summary: "AI agents should be treated like any other actor in a system: give them their own identity, scoped permissions, audit trails, and a deliberate recovery path."
image: "ai-scoped-credentials.png"
imageAlt: "Scoped keys and a bounded AI agent separated from a large master key"
draft: false
---

Every few days I see another post about an AI agent doing something dramatic.

“The AI deleted my production database.”

“The AI emailed my entire customer list.”

“The AI ate my goldfish.”

The last one is usually a joke, or at least I hope it is. The pattern underneath it is less funny. Someone gives an agent broad permissions, vague instructions, and access to real systems. Then they act surprised when it uses the access it was given.

I don’t think the interesting question is “Can we trust AI?” That’s too broad to be useful. I’m more interested in the same question we’ve been asking about people, scripts, services, CI jobs, and production systems for years: trusted to do what, under which identity, with what limits, and with what recovery path?

A good sysadmin has been answering that question since long before AI agents became fashionable.

Most developers have, at some point, wanted more access than they needed. Sometimes for good reasons. Waiting on permissions is annoying. Debugging through layers of access control is tedious. Nobody wants to discover they can’t read a log file at 11pm when production is broken.

So they ask for admin. Or DBA. Or root. Or “just give me the AWS keys for now and I’ll be careful.” And the sysadmin, security engineer, platform lead, or weary person holding the pager says "no".

Not because they think the developer is incompetent. Usually quite the opposite. They say no because competence isn’t the point. People make mistakes. Shell histories persist. Tools behave unexpectedly. Credentials leak. Scripts run in the wrong terminal. Copy-paste is a surprisingly powerful source of incidents.

Least privilege exists because trust is easier to reason about when it has edges.

AWS IAM is a good example because it makes the tension visible. You can create a user or role that can read from one bucket, write to a particular queue, and invoke a specific Lambda. Or you can attach a policy that effectively says “do anything to everything” and hope nobody has a bad day.

The second option is faster right up until it isn’t.

Regulated systems are built around the same idea. Separation of duties. Audit trails. Approval flows. Temporary access. Break-glass accounts. None of these are there because every person involved is assumed to be malicious. They’re there because systems need to survive ordinary human fallibility, changing context, and pressure.

AI agents don’t remove that need. They make it more obvious.

If you give an agent your own credentials, you’re often giving it your history, your authority, and your blast radius. It can do what you can do. If you’re a DBA, it may be able to drop tables. If you’re an AWS administrator, it may be able to delete infrastructure. If you use your personal GitHub token, it may be able to rewrite repositories you didn’t intend to touch.

Then, when something goes wrong, the logs may show that you did it.

That’s a bad place to be. Not just for blame, though people will inevitably care about that. It’s bad because it makes the system harder to understand. You no longer have a clean line between human decision and agent execution. You can’t easily say, “This agent was allowed to read these files and open pull requests, but nothing else.” You’ve replaced a bounded tool with a strange extension of your own authority.

The answer isn’t to refuse to use agents. That would be a bit like refusing to use automation because a shell script once deleted the wrong directory. The answer is to treat agents as actors in the system.

Give the AI its own user, it its own role, and most importantly give it credentials that are scoped to just the job you actually want it to do.

If it needs to inspect logs, give it read-only access to those logs. If it needs to propose infrastructure changes, let it open a pull request rather than applying them directly. If it needs to query a database, start with read-only access to the smallest sensible dataset. If it needs write access, make that explicit, narrow, and observable.

This is not glamorous work. It’s the same slightly boring discipline that keeps serious systems alive.

It also changes how we think about trust. You don’t have to decide whether you “trust AI” in some grand philosophical sense. You decide whether you trust this agent, for this task, with this permission set, in this environment.

That’s a much more useful question.

There will be times when broader access is justified. During an incident, with the right controls, you might need a break-glass path. For a trusted internal tool, a wider role may be acceptable if the system has strong logging, rollback, and review. Context matters. I get wary when people turn security principles into slogans and stop thinking about the actual trade-offs.

But “I gave the AI my admin credentials because it was convenient” is not a trade-off. It’s usually just impatience with a future incident report attached.

The funny social media versions will keep coming. The AI deleted someone’s files, cancelled a meeting, renamed a folder, broke a build, or committed nonsense with alarming confidence. Some of those stories will be exaggerated. Some will be user error wrapped in novelty. A few will be genuinely interesting failures.

Underneath most of them will be a familiar lesson: Permissions are part of the design.

So yes, use agents. Let them help. Let them do useful work rather than treating them like autocomplete with a hat on. But don’t hand them your entire digital life and hope prompt wording will save you.

Create a user for the AI. Give it only what it needs. Review what it does. Log its actions. Make the dangerous path deliberate. For destructive or externally visible actions, the agent should propose and a human should approve.

And maybe spare a small thought for every sysadmin who has spent years telling developers that no, they don’t need full access to everything. Turns out they were not being difficult. They were protecting you from the same mistake you’re about to make with a much faster assistant.

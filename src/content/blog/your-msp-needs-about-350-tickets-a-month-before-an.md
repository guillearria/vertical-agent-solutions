---
title: "Your MSP Needs About 350 Tickets a Month Before an AI Help Desk Agent Pays for Itself"
description: "Break-even math for a 5–20 person MSP: the stack cost, the ticket share an AI help desk agent really closes, and the four things it can't touch."
pubDate: 'Aug 2 2026'
sources:
  - "TruMethods — tickets per endpoint per month benchmark — https://www.trumethods.com/resources/blog/service-tickets-are-they-standing-in-the-way-of-productivity"
  - "BLS Occupational Outlook Handbook, Computer Support Specialists — https://www.bls.gov/ooh/computer-and-information-technology/computer-support-specialists.htm"
  - "Bennett Financials — MSP labor utilization 65% benchmark — https://bennettfinancials.com/msp-labor-utilization-the-65-rule-for-field-techs/"
  - "Stealth Agents — cost-per-ticket benchmarks citing MetricNet — https://stealthagents.com/research/customer-support-cost-per-ticket-benchmarks-2026"
  - "BleepingComputer — Gartner password reset call share — https://www.bleepingcomputer.com/news/security/password-reset-calls-are-costing-your-org-big-money/"
  - "Thread — published pricing for MSP AI service desk — https://www.getthread.com/thread-pricing"
  - "Retell AI — AI voice agent all-in per-minute cost breakdown — https://www.retellai.com/blog/ai-voice-agent-pricing-full-cost-breakdown-platform-comparison-roi-analysis"
---

Most AI pitches to MSPs skip the arithmetic. This post is the arithmetic. If you need the distinction between an agent that takes action in your PSA and a chatbot that answers questions, that's covered in [the primer on agents versus chatbots](/blog/the-agentic-wave-is-not-just-for-tech/) — everything below assumes you already buy the concept and want to know whether the numbers work.

## The shop we're pricing

A 12-person MSP: six help desk techs, two field/project engineers, two vCIO/account people, an owner, an admin. Twenty-four client companies, about 800 managed endpoints, mostly fixed-fee agreements.

Average-performing MSPs generate roughly 0.75 to 1 ticket per endpoint per month; top performers run 0.2 to 0.5, per [TruMethods' widely-quoted band](https://www.trumethods.com/resources/blog/service-tickets-are-they-standing-in-the-way-of-productivity). At 0.7, that's **550 tickets a month**.

## Where 550 tickets come from

A plausible mix for a shop like this:

| Category | Tickets/mo |
|---|---|
| Password resets, MFA, lockouts | 120 |
| Outlook / Teams / email weirdness | 77 |
| Printers and scanners | 66 |
| "Is the internet down?" / service status | 55 |
| Onboarding, offboarding, access requests | 50 |
| VPN and remote access | 44 |
| Software installs and licenses | 38 |
| Everything else (servers, hardware, security, projects) | 100 |

The password share tracks a much-recycled Gartner figure putting resets at [20–50% of help desk calls](https://www.bleepingcomputer.com/news/security/password-reset-calls-are-costing-your-org-big-money/). Treat it as directional, not gospel — but pull your own PSA report and you'll likely find the same shape.

## The real cost of a technician hour

BLS puts the median wage for computer user support specialists at [$60,340 as of May 2024](https://www.bls.gov/ooh/computer-and-information-technology/computer-support-specialists.htm) — about $29/hour. Load that with payroll tax, benefits, PTO, licenses, and equipment and you're near $39. But a tech isn't productive every hour; [65% utilization is a common benchmark](https://bennettfinancials.com/msp-labor-utilization-the-65-rule-for-field-techs/). Divide $39 by 0.65 and an hour of actual ticket work costs roughly **$60 — a dollar a minute**.

At 12 minutes average handle time including notes and context switching, that's **$12 a ticket**, in the neighborhood of the $15–$20 per level-1 ticket that MetricNet benchmarking is [commonly cited at](https://stealthagents.com/research/customer-support-cost-per-ticket-benchmarks-2026). The real-world spread is enormous, so use your own number if you have one.

## Closed, assisted, or escalated

Conservative assumptions, with the agent wired into identity (Entra ID), RMM, and PSA:

- **Password / MFA / lockout:** 60% closed end-to-end → 72 tickets
- **Service status questions:** 70% closed → 38
- **Printer, Outlook, VPN, software installs:** 20–25% closed → 53
- **Onboarding requests:** 0% closed, but fully collected and structured

That's **163 tickets a month closed without a human** — about 30%. On the other 387, the agent gathers details, categorizes, attaches the asset, drafts a reply, and writes the time entry, saving roughly 3 minutes each.

- 163 × 12 min = 32.6 hours = **$1,960**
- 387 × 3 min = 19.4 hours = **$1,160**
- **Gross monthly value: ~$3,120**

## The monthly stack

- **AI service desk platform.** MSP-specific tools publish list prices in this range: Thread, which integrates with ConnectWise, Autotask, and HaloPSA, lists [AI Essentials at $19 per license](https://www.getthread.com/thread-pricing) with a voice add-on priced per customer. Ask precisely how a "license" is counted — per tech and per managed customer produce very different bills. Budget **$250–$450**.
- **Voice channel.** Say 165 calls at 4 minutes. All-in voice AI realistically runs [$0.12–$0.45 per conversation minute](https://www.retellai.com/blog/ai-voice-agent-pricing-full-cost-breakdown-platform-comparison-roi-analysis) once telephony and platform fees are stacked. **$150–$250**.
- **Identity/automation connector** for scoped reset and unlock actions: **$100–$300**.
- **Setup**, including knowledge cleanup: $3,000–$6,000 one-time, spread over year one: **$250–$500**.
- **Ongoing tuning**, about 5 hours a month of a senior tech: **$300**.

**All-in year one: roughly $1,050–$1,800/month.** Call it $1,300.

## Net, break-even, and one caveat about fixed fees

Net: about **$1,800/month, ~$21,600 a year**, with the setup fee paid back inside two to three months.

Break-even: at $1,300 in fixed monthly cost and $12 per fully closed ticket, you need **108 closed tickets a month**. At a 30% close rate, that's **roughly 360 total tickets a month** — around 500 managed endpoints. Below that, platform minimums eat the savings. This is the most useful number here: under about 350 tickets a month, wait, or buy only the cheap assistive tier that drafts and triages for your techs.

Now the caveat. On fixed-fee agreements, that $21,600 is **capacity, not invoices**. It turns into money only if you add clients without hiring, cut after-hours overflow spend, or move a tech to billable project work. Otherwise you just have a quieter queue. The same trap shows up in the [freight brokerage cost model](/blog/what-an-ai-check-call-agent-costs-a-5-person/).

## Four line items that wreck the model

1. **Admin credentials.** The agent should never hold Global Admin or Domain Admin. Give it narrow, individually logged actions — reset this user's password, unlock this account — and nothing that creates accounts or changes policy without a human approving.
2. **Security incidents.** "My files have weird names" and "I clicked a link" must route to a human instantly. Misclassifying one of those as a routine ticket costs you a client, not $12.
3. **One-off client environments.** The undocumented firewall, the 2011 line-of-business app at your one manufacturing client. Agent quality equals documentation quality, and the documentation debt surfaces during setup whether you budgeted for it or not.
4. **The SLA clock.** Decide in writing whether an AI first response stops the clock, and tell clients before they find it in a report. If your MSA promises human response times, amend it or exclude those tickets.

## Before you take a demo

Export 90 days of tickets from your PSA, group by category, and count how many land in the four buckets above the line: resets, status checks, printers, and standard requests. Multiply by $12. If that number isn't at least three times a realistic monthly platform cost, what you have is a documentation and self-service problem, not an AI opportunity — and fixing that first makes the agent worth more when you do buy one.

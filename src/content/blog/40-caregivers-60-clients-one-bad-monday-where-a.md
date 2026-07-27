---
title: "40 Caregivers, 60 Clients, One Bad Monday — Where a Home Care Agency Let AI Run Scheduling"
description: "Hour by hour through a home care agency's worst Monday: which call-outs and family inquiries an AI agent closed, and which it handed straight to a human."
pubDate: 'Jul 27 2026'
sources:
  - "McKnight's Home Care — home care turnover and Activated Insights benchmarking — https://www.mcknightshomecare.com/news/home-care-revenues-rise-as-client-caregiver-turnover-rates-drop-activated-insights-reports/"
  - "HCAOA — home care turnover rate — https://www.hcaoa.org/newsletters/home-care-turnover-rate-jumps-to-80hcaoa-is-here-to-help-members"
  - "Genworth/CareScout 2024 Cost of Care Survey (via McKnight's Home Care) — https://www.mcknightshomecare.com/news/homemaker-costs-lead-growth-in-long-term-care-costs-in-2024-genworth-report-finds/"
  - "Genworth investor release, 2024 Cost of Care Survey — https://investor.genworth.com/news-events/press-releases/detail/982/genworth-and-carescout-release-cost-of-care-survey-results"
  - "Medicare.gov — long-term/custodial care coverage — https://www.medicare.gov/coverage/long-term-care"
  - "Medicaid.gov — Electronic Visit Verification requirements (21st Century Cures Act) — https://www.medicaid.gov/medicaid/home-community-based-services/home-community-based-services-guidance-additional-resources/electronic-visit-verification"
  - "Maynard Nexsen — OIG background check audits, National Background Check Program requirements — https://www.maynardnexsen.com/publication-nursing-home-background-checks-oigs-ongoing-series-of-state-audits-signals-need-to-focus-on-background-check-compliance"
  - "GoodHire — caregiver background check requirements and state registries — https://www.goodhire.com/resources/articles/caregiver-background-check-best-practices/"
  - "Connecticut OLR — home health aides' duty to report elder abuse (state variation) — https://cga.ct.gov/PS99/rpt/olr/htm/99-R-0370.htm"
  - "Enginehire — home care agency license requirements by state — https://enginehire.io/do-home-care-agencies-need-a-license-requirements/"
---

Meet Cedar Grove Home Care — a composite of the non-medical agencies I've looked at, not a real company. Forty caregivers, sixty clients, one full-time staffing coordinator, and an on-call phone that rings all weekend. No nursing services: bathing, dressing, meals, transfers, companionship, medication reminders.

Six months ago they turned on an AI agent for two jobs only — filling open shifts and taking new inquiries. Everything else stayed human. (If you want the difference between an agent and a chatbot, [this piece covers it](/blog/the-agentic-wave-is-not-just-for-tech/).) Here's a Monday that tested the setup.

## 5:04 a.m. — "I can't make it"

A caregiver texts that her son is sick. The 6 a.m. shift with a client who needs a two-person transfer is now uncovered.

The agent does three things in ninety seconds: logs the call-out against the shift, texts the client's family a heads-up that a replacement is being arranged, and pulls the list of caregivers who are *eligible for that specific client*. Not the whole roster — the ones already oriented to that client's home, cleared for transfers, with valid credentials and no overtime conflict.

Then it blasts those six people with the shift, the address's cross streets, and pay. First "yes" wins; the rest get an auto "filled, thanks."

Cedar Grove's rule: the agent may offer a shift only to caregivers on the pre-approved list for that client. It cannot improvise. Sending an uncleared substitute isn't a scheduling error — it's a compliance one. Depending on the state, agencies must verify caregivers against state abuse and neglect registries, the federal OIG exclusion list, and in states participating in the National Background Check Program, fingerprint-based FBI checks. A software shortcut can't undo that.

## 6:30–8:00 a.m. — three more holes

Monday call-outs cluster. Two more no-shows, one caregiver stuck behind a closed road. The agent runs the same loop nine times across the morning and fills two of the three. The third — a client with dementia who reacts badly to unfamiliar faces — is flagged to the coordinator with a note: *no cleared substitute available, family notified, needs a call.*

That's the honest picture. The agent doesn't eliminate the scramble; it removes the typing. With median caregiver turnover in home care around 75% in 2024, per the Activated Insights (formerly Home Care Pulse) benchmarking data, the roster churns constantly and shift-fill blasts never stop. It's the same math that makes [screening agents pencil out at staffing firms](/blog/where-a-staffing-agencys-recruiter-hours-go-and/).

## 10:20 a.m. — a fall

A client's son calls: Dad fell getting out of the shower, he seems fine, should the caregiver stay longer?

The agent says one sentence — "I'm getting our coordinator on the line right now" — and escalates. No triage, no advice, no rescheduling. Falls, any health change, medication questions, complaints about a caregiver, and anything touching the care plan go to a human immediately, day or night. Home care staff are mandated reporters of suspected elder abuse in many states (the lists vary), and a fall report can start a chain of obligations no software should be steering. Same logic as [daycares refusing to let an agent write incident reports](/blog/ai-agents-for-daycare-centers-yes-to-enrollment/).

## 1:15 p.m. — "Does Medicare pay for this?"

A prospect asks about Medicaid versus private pay. The agent sends the rate sheet and states the plain facts: Medicare doesn't cover custodial care when that's the only care needed, and Cedar Grove's Medicaid waiver hours require an authorization from the case manager. For context, Genworth and CareScout put the 2024 national median at $33/hour for homemaker services and $34 for a home health aide.

What it does *not* do is quote a discount, promise waiver eligibility, or estimate authorized hours. Medicaid-funded personal care visits also have to run through electronic visit verification under the 21st Century Cures Act — the agent flags the payer question and a human confirms.

## 9:40 p.m. — the daughter who can't sleep

An adult daughter fills out the website form at 9:40 p.m.: mom, 84, hospital discharge Thursday. The agent replies in under a minute, asks the intake questions (mobility, hours needed, who's paying, zip code), confirms Cedar Grove serves that county, and books a Wednesday assessment visit on the care manager's calendar. Before, that form sat until Tuesday.

## Thirty days later

Cedar Grove's illustrative numbers — their own tracking, not a study: 41 shifts filled without a coordinator touching them, average fill time down from 38 minutes to 9, after-hours inquiries answered same-night instead of next-business-day, 11 escalations, all reaching a human in under two minutes. Two shifts still went uncovered.

## Two guardrails they wrote down

1. **The agent offers, humans approve exceptions.** If no cleared caregiver accepts, it stops and pages the coordinator. It never widens the eligibility list on its own.
2. **Health words end the conversation.** Fall, pain, hospital, confused, refused, bruise, missing, "I want a different caregiver" — any of these triggers instant handoff, even mid-form.

## Try it on one shift type

Pick your least-risky recurring gap — weekday companion visits, say — and let an agent handle only those fill requests for two weeks, from a caregiver list you built by hand. If the fill times drop and nothing surprising happens, widen it. If your scheduling software already holds caregiver clearances per client, ask your vendor whether that list can be exposed to an agent. That answer decides whether this is a Tuesday project or a next-year one.

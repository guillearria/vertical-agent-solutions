---
title: "Absence Calls, Tour Requests, and the Price Tag on a Private School's AI Front-Office Agent"
description: "Setup fees, monthly rates, SIS integration effort, and break-even math for a K-12 school of 150-600 students where two people answer every call."
pubDate: 'Aug 9 2026'
sources:
  - "Aircall — AI Voice Agent Pricing in 2026 — https://aircall.io/blog/best-practices/ai-voice-agent-cost/"
  - "Retell AI — AI Voice Agent Pricing: Full Cost Breakdown — https://www.retellai.com/blog/ai-voice-agent-pricing-full-cost-breakdown-platform-comparison-roi-analysis"
  - "NextPhone — AI Receptionist Pricing in 2026 — https://www.getnextphone.com/blog/ai-receptionist-pricing-guide"
  - "AgentZap — AI Receptionist Pricing 2026 — https://agentzap.ai/blog/ai-receptionist-pricing-complete-cost-guide-2025"
  - "PrivateSchoolReview — Average Private School Tuition Cost — https://www.privateschoolreview.com/tuition-stats/private-school-cost-by-state"
  - "PrivateSchoolCost — Catholic School Tuition (NCEA 2024 data) — https://privateschoolcost.com/catholic-school-cost"
  - "U.S. Bureau of Labor Statistics — Secretaries and Administrative Assistants — https://www.bls.gov/ooh/office-and-administrative-support/secretaries-and-administrative-assistants.htm"
  - "NAIS — Facts at a Glance 2024-2025 (admission funnel medians) — https://resources.finalsite.net/images/v1748959183/finalsite/uxod4t5a4mmmyjzxx9n1/Facts-at-a-Glance-2024-2025-NAIS-Members.pdf"
  - "SAIS — Fast Stats: Essential Questions (attrition) — https://sais.org/resource/fast-stats-essential-questions/"
  - "Veracross — API & Integrations — https://www.veracross.com/integrations-2/"
  - "Veracross — Using the OneRoster API — https://api-docs.veracross.com/docs/api-plus-for-academics/bd08d5lpygdl1-using-the-one-roster-api"
  - "U.S. Dept. of Education, Student Privacy Policy Office — Responsibilities of Third-Party Service Providers under FERPA — https://studentprivacy.ed.gov/sites/default/files/resource_document/file/Vendor%20FAQ.pdf"
  - "FCC — Robocalls by Schools and School Systems Update — https://www.fcc.gov/robocalls-schools-and-school-systems-update"
---

Your front office has two people in it, and between 7:40 and 8:30 a.m. the phone rings more than either of them can pick up. Most of those calls are "Maeve has a dentist appointment, she'll be in at 10." One of them is a family who found you on a Google search and wants to see the school. The second call is worth vastly more than the first, and right now both get the same treatment: voicemail.

Below is the arithmetic on handing part of that phone line to an AI agent. If you want grounding on what an agent is and how it differs from a phone tree, [start here](/blog/the-agentic-wave-is-not-just-for-tech/).

## First, count the phone hours

Before pricing any tool, tally a normal week. A school of about 320 students might land near this:

- **Morning absence and late-arrival line:** 25 to 40 calls a day, one to two minutes each, all crammed into 50 minutes. Call it 3 hours a week.
- **Admissions inquiries and tour scheduling:** 6 to 12 inquiries a week, plus the callbacks nobody gets to until Thursday. 2 hours.
- **Re-enrollment and tuition-payment nudges:** seasonal, but brutal in January and February. Average it at 1.5 hours a week.
- **Weather and early-dismissal blasts:** rare, then all-consuming.
- **"Did anyone turn in a navy fleece, size 10?":** 1 hour a week, spread across 40 interruptions.

Roughly 7.5 hours a week of work that requires no judgment and no relationship. Over a 175-day school year, about 260 hours.

## What the agent itself costs

Published rates for AI voice agents run from about $0.05 to $1.00 per minute, though vendor cost breakdowns put realistic all-in production costs (telephony, transcription, the language model, the voice) closer to $0.12 to $0.25 a minute. Flat-rate AI receptionist products sit in a different band: roughly $25 to $65 a month for capped entry plans, and about $149 to $299 a month for unlimited plans with real routing rules. Read the fine print on "unlimited," which usually carries a fair-use cap.

A workable first-year budget for the example school:

| Line item | Cost |
|---|---|
| Platform subscription (mid tier, unlimited calls) | $175/mo = $2,100 |
| Overage minutes on peak mornings | ~$300/yr |
| Outbound texts for reminders and confirmations | ~$180/yr |
| One-time setup: scripts, phone number, testing | $500 to $4,000 |
| SIS or calendar integration | $0 to $2,500 |

**Year one: roughly $3,100 on the low end, $9,000 if you pay someone to build it.** Ongoing: about $2,600 a year.

The integration line has the widest spread, so pin it down early. Veracross, for example, offers an open two-way API plus OneRoster endpoints, which makes a read-only attendance and roster connection tractable for a competent contractor. PowerSchool, Blackbaud, and FACTS have integration paths too, but effort varies by product and by how tidy your data is. The cheap version skips the SIS entirely: the agent takes the absence report, texts a structured summary to the office, and a human types it in. That still kills the interruption, which was the expensive part.

## Break-even on labor: about 90 hours

The Bureau of Labor Statistics put the median wage for secretaries and administrative assistants at $47,460 as of May 2024, about $22.82 an hour. Load it with payroll taxes and benefits and call it $28 to $30 fully loaded.

At $2,600 a year in ongoing cost, the agent needs to absorb roughly 90 hours of front-office work to pay for itself. Two hours a week across the school year. The morning absence line alone clears it.

The labor case works. It is not the interesting number.

## Break-even on admissions: one family

National average K-12 private school tuition is around $14,999; Catholic elementary tuition runs far lower, near $5,330 for parish families based on NCEA figures. Either way, one additional enrolled student covers the agent for two to six years, and if that seat was going to sit empty, most of the tuition drops to the bottom line.

NAIS member medians show about 46.6% of inquiries becoming completed applications, 66.0% of those applications accepted, and 71.4% of acceptances enrolling. Multiply it out: roughly one in five inquiries ends with a student in a seat. So an agent that answers the inquiry call at 7:52 a.m., books the tour on the spot, and texts a reminder the day before does not need to rescue many lost inquiries to justify the whole budget.

Retention is the same shape. Median attrition at NAIS schools is commonly cited around 8%. A re-enrollment reminder sequence that saves one family is worth more than a full year of front-office minutes.

## Calls the agent never takes

Write these into the script as hard stops:

- Student discipline, in any direction
- Health incidents, injuries, medication, allergies
- Custody arrangements and pickup authorization disputes
- Financial aid decisions or appeals
- Grades, transcripts, evaluations, anything in a FERPA-protected record
- Anything touching a child's safety, which transfers to a live human immediately, mid-sentence if needed

FERPA is contractual as well as conversational. If a vendor touches education records, it generally needs to qualify under the "school official" exception: performing a function you would otherwise do in-house, under your direct control, using the data only for that purpose. The Department of Education's vendor guidance says a written agreement is not strictly required but is strongly recommended. Get one. Our [daycare post](/blog/ai-agents-for-daycare-centers-yes-to-enrollment/) walks the same yes/no line for younger programs.

On blasts: a 2016 FCC declaratory ruling found that school calls and texts about weather closures, threats, health risks, and unexcused absences can fall under the TCPA's emergency purpose exception. Routine messages about conferences and activities rest on consent instead. Keep opt-out handling clean either way.

## Pull your last 30 inquiry calls

Sit down with your admissions director and go through them. How many were answered live? How many produced a booked tour within 48 hours? That one number tells you whether you are buying back staff hours or buying back enrollment, and it decides which price tier is worth quoting.

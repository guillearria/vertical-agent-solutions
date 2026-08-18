---
title: "From First Call to PTO: What AI Phone Agents Handle at a Residential Solar Company"
description: "Nine questions residential solar installers ask about AI phone and text agents: lead qualifying, survey booking, PTO status texts, TCPA limits, and hard red…"
pubDate: 'Aug 18 2026'
sources:
  - "Goodwin, Eleventh Circuit vacates TCPA one-to-one consent rule — https://www.goodwinlaw.com/en/insights/publications/2025/01/alerts-otherindustries-eleventh-circuit-deals-fatal-blow"
  - "Justia, Insurance Marketing Coalition Ltd. v. FCC (11th Cir. 2025) — https://law.justia.com/cases/federal/appellate-courts/ca11/24-10277/24-10277-2025-01-24.html"
  - "FCC, AI-generated voices in robocalls are \"artificial\" under the TCPA (Feb. 2024) — https://www.fcc.gov/document/fcc-makes-ai-generated-voices-robocalls-illegal"
  - "Wiley, FCC announces TCPA restrictions cover AI-generated voices — https://www.wiley.law/alert-FCC-Extends-Regulatory-Reach-Over-AI-Announces-TCPA-Restrictions-Cover-AI-Generated-Voices-in-Outbound-Calls"
  - "BCLP, TCPA opt-out rules effective April 11, 2025 — https://www.bclplaw.com/en-US/events-insights-news/the-tcpas-new-opt-out-rules-take-effect-on-april-11-2025-what-does-this-mean-for-businesses.html"
  - "Kelley Drye, FCC limited waiver of part of the consent revocation rule — https://www.kelleydrye.com/viewpoints/blogs/ad-law-access/fcc-issues-one-year-limited-waiver-of-new-tcpa-consent-revocation-rule"
  - "Congressional Research Service, expiration of the Residential Clean Energy Credit (Sec. 25D) — https://www.congress.gov/crs-product/IN12611"
  - "NREL, Solar Permitting, Inspection, and Interconnection Timelines / SolarTRACE — https://www.nrel.gov/solar/market-research-analysis/permitting-inspection-interconnection-timelines"
  - "CSLB, Solar Energy System Disclosure Document — https://www.cslb.ca.gov/Resources/Contractors/SolarDisclosureDoc.pdf"
  - "California AB 1070 (2017), solar energy systems: contracts: disclosures — https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180AB1070"
  - "Benesch, increased enforcement scrutiny on solar savings claims — https://www.beneschlaw.com/insight/increased-enforcement-scrutiny-on-solar-industry-targets-savings-claims/"
  - "AInora summary of lead response time research (Oldroyd / Lead Response Management study) — https://ainora.lt/blog/lead-response-time-statistics-every-study-2026"
---

You buy leads, a door team knocks the same ZIP codes, and three national installers call the homeowner within minutes of the same form fill. Meanwhile your one office coordinator is on hold with the utility. This FAQ covers what an AI phone and text agent realistically does in that gap, and where it will get you in trouble. If you want the difference between an agent, a chatbot, and a Zapier automation first, start with [the agentic wave primer](/blog/the-agentic-wave-is-not-just-for-tech/).

## Can it actually qualify an inbound lead, or does it just take a message?

It can qualify, as long as your qualification is a list of facts rather than a judgment call. An agent reliably collects: own or rent, single family or condo, roof age and material, whether the roof has been replaced or has active leaks, HOA, utility company, average monthly electric bill, panel/service size if the homeowner knows it, and whether they've already signed with anyone.

Two of those need care. Renters and "my landlord handles that" should end the call politely, not get booked. And roof age is where solar deals die later, so treat a 22-year-old shingle roof as a flag for a human callback, not an auto-booking. Roofers run into the same sorting problem, and the [green-light/red-line checklist for roofing calls](/blog/a-roofers-green-light-red-line-checklist-for-ai/) is worth borrowing.

## Can it put a site survey on my calendar?

Yes, and this is the highest-value thing it does. Give it real constraints: survey windows by crew, drive-time buffers between territories, a cap on surveys per day, and a rule that anything outside your service radius routes to a person. It should send a confirmation text with what the homeowner needs to have ready (main panel access, attic access, a recent bill).

## Does answering in 60 seconds instead of an hour really matter?

The most-cited evidence here is the Lead Response Management study led by James Oldroyd, which tracked more than 15,000 leads and found that contacting a lead within five minutes made contact and qualification dramatically more likely than waiting 30 minutes. Solar is more competitive than the average industry in that study, because the same homeowner's information often went to several installers at once. An agent that answers at 8:40 p.m. is competing against your competitor's voicemail box. Dealerships face the identical math, laid out in [AI agent vs. BDC rep](/blog/should-a-small-dealership-use-an-ai-agent-or-a-bdc/).

## Can it handle the permitting and interconnection wait?

This is the underrated use. Most "where is my project" calls come from a stall the customer can't see. NREL's cycle-time work found a median of 53 business days from interconnection submission to permission to operate across 30,000-plus systems in an early dataset, and its SolarTRACE tool now publishes median timelines for over 1,500 jurisdictions. Months of silence is normal, and homeowners read silence as abandonment.

An agent connected to your project tracker can text on milestone changes: permit submitted, permit approved, install scheduled, inspection passed, interconnection application filed, PTO received. It can also send a scheduled check-in when a stage has been open longer than usual. Milestones only. Never a predicted approval date.

## Can it triage a post-install service call?

It can separate three buckets, which is most of the value:

- **"My app shows lower production."** Usually seasonal, weather, or a monitoring gap. The agent captures the date range, the reported number, and whether panels are visibly shaded or soiled, then logs a ticket.
- **"Zero production" or a red/flashing inverter light.** Real fault. Ask for the inverter brand and any error code on the screen or app, then route to a technician queue with priority.
- **Anything involving burning smells, sparks, water intrusion, or a tripped main breaker that won't reset.** Immediate human transfer, no diagnostic questions.

## What must it never do?

Hard stops, written into the script and tested:

- Quote a system price, a price per watt, or a monthly payment.
- Estimate savings, payback, or "your bill goes to zero." Savings claims are exactly what regulators have gone after in this industry, and California requires a specific CSLB disclosure document with a one-year savings estimate on the front of residential solar contracts.
- Make federal tax credit claims. The residential clean energy credit under Section 25D ended for expenditures after December 31, 2025 under P.L. 119-21, and third-party-ownership rules have kept moving. An agent working from last year's script will say something false.
- Promise a utility approval or PTO date.
- Discuss financing terms, interest rates, credit qualification, or run any credit-related question. Route those to a licensed human, every time.

## What are the texting rules if I buy leads?

Get real legal advice, but know the landscape. The FCC ruled in February 2024 that AI-generated voices count as "artificial" under the TCPA, so an outbound AI voice call carries the same consent requirements as a prerecorded one. The FCC's one-to-one consent rule was vacated by the Eleventh Circuit in January 2025, so bundled lead-gen consent is not federally banned, but you still need documented prior express written consent for marketing calls and texts, and you should be able to produce the consent record for any purchased lead. Since April 11, 2025, consumers can revoke consent by any reasonable means, and you must honor it within 10 business days. Some states add stricter rules on top.

Practical version: only text purchased leads when the vendor hands you a timestamped consent record with the language shown, include opt-out instructions, and pipe every STOP into your CRM automatically.

## How do I test it before it touches a real homeowner?

Run 20 scripted calls with your own team, and record all of them:

1. Five clean inbound leads that should book a survey.
2. Three renters or condo owners who should be politely disqualified.
3. Three price hunters who ask "what does a system cost?" three different ways, including "ballpark is fine."
4. Two tax-credit questions.
5. Two financing questions ("what's the rate?", "will my credit be run?").
6. Three status calls at different project stages.
7. Two service calls: one soft production complaint, one dead inverter.

Score pass/fail on each. Any price, savings, credit, or approval-date answer is an automatic fail and a script fix, not a "close enough."

## Before you call a vendor

Pull your last 40 inbound leads and write down the timestamp of the form fill and the timestamp of your first live contact. That single number tells you whether an agent is worth buying, and it becomes the benchmark you hold the vendor to in month one.

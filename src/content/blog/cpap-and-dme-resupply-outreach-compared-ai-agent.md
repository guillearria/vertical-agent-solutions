---
title: "CPAP and DME Resupply Outreach, Compared: AI Agent, Resupply Software, or a Coordinator on Payroll"
description: "Illustrative monthly costs, contact volumes, and shipped-order math for three ways an independent CPAP and DME supplier can work its resupply list."
pubDate: 'Aug 28 2026'
sources:
  - "CMS DMEPOS Refill Requirements — https://www.cms.gov/dmepos-refill-requirements"
  - "Medtrade, CMS Codifies Refill Rules for DMEPOS — https://medtrade.com/news/billing-reimbursement/cms-codifies-refill-rules-for-dmepos/"
  - "Noridian, Standard Written Order (SWO) — https://med.noridianmedicare.com/web/jddme/topics/documentation/standard-written-order"
  - "CMS MLN SE19003, Proof of Delivery Documentation Requirements — https://www.cms.gov/outreach-and-education/medicare-learning-network-mln/mlnmattersarticles/downloads/se19003.pdf"
  - "FCC, AI-Generated Voices in Robocalls Are Illegal (Declaratory Ruling FCC 24-17) — https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf"
  - "BCLP, The TCPA's New Opt-Out Rules Take Effect April 11, 2025 — https://www.bclplaw.com/en-US/events-insights-news/the-tcpas-new-opt-out-rules-take-effect-on-april-11-2025-what-does-this-mean-for-businesses.html"
  - "Nixon Peabody, FCC partially delays new TCPA consent revocation rules — https://www.nixonpeabody.com/insights/alerts/2025/04/11/fcc-partially-delays-new-tcpa-consent-revocation-rules"
  - "Manatt, The TCPA and Healthcare: Consent, Exemptions and Risk Mitigation — https://www.manatt.com/insights/newsletters/health-highlights/the-tcpa-and-healthcare-consent-exemptions-and-ri"
  - "Brightree ReSupply — https://www.brightree.com/brightree-resupply/"
  - "Brightree press release, acquisition of SnapWorx — https://www.brightree.com/press-release/brightree-to-acquire-technology-provider-snapworx-expanding-cpap-resupply-offerings-for-hme-providers/"
  - "Sleep Foundation, CPAP Compliance — https://www.sleepfoundation.org/cpap/cpap-compliance"
---

Every independent HME supplier has the same buried asset: a list of active CPAP, oxygen, and wound-care patients who are due for supplies and nobody has called. Working that list is worth real revenue. It is also the least glamorous job in the building, so it gets skipped whenever intake or billing catches fire.

Three things can work it: a resupply platform, an AI phone-and-text agent, or a person you hire. They fail in different places, and the rules below apply to all three.

## The rules every option has to live inside

- **You cannot just auto-ship.** For recurring supplies, Medicare requires you to contact the patient before dispensing a refill rather than shipping on a predetermined schedule. Your documentation has to show the patient confirmed the need within the 30 days before the current supply runs out, and delivery can't happen more than 10 calendar days before the current supply is used up.
- **The order and the delivery record still rule the claim.** A Standard Written Order (which replaced the old five-element order for dates of service from January 1, 2020) and proof of delivery, kept seven years, are what survive an audit. No POD, no payment.
- **Anything that hears PHI is a business associate.** That means a signed BAA, and for AI voice systems it can mean several: the telephony carrier, the speech engine, and the model provider are separate vendors.
- **Outbound texts and AI voice are TCPA territory.** The FCC ruled in February 2024 that AI-generated voices count as "artificial" voices under the TCPA, which puts them in the prior-express-consent bucket. Since April 2025, patients can revoke consent by any reasonable means (stop, quit, cancel, unsubscribe), and you have 10 business days to honor it. The healthcare exemption is narrow and carries frequency caps; don't assume it blesses a resupply campaign.

## Option 1: A dedicated resupply platform

Software like Brightree ReSupply (which absorbed SnapWorx in 2020) sits on eligibility and last-shipped dates, decides who's due, and pushes text, email, and IVR touches at them until they confirm.

Strength: coverage. It touches everyone on schedule and writes the compliance trail as it goes.

Where it breaks: it is a broadcast. Patients who ignore texts stay ignored, and anyone with a question ("did my deductible reset?" "my mask leaks") drops out of the funnel into a callback queue your staff may or may not clear.

## Option 2: An AI phone-and-text agent

The agent actually calls, holds a short conversation, confirms which supplies are needed and whether the current ones are wearing out, and writes the confirmation back to your system. It answers the inbound half too: where's my order, is this covered, why is there a balance. If you want the plain-English version of how an agent differs from an automation, we covered it in [the agentic wave](/blog/the-agentic-wave-is-not-just-for-tech/).

Strength: it converts the people who never answer a text but will talk for 90 seconds, and it doesn't get pulled off the list on a busy Tuesday.

Where it breaks: clinical territory. Mask fit, oxygen concentrator alarms, desaturation complaints, a patient saying the machine "stopped working" overnight. Those route to a human or a respiratory therapist immediately, with no attempt at troubleshooting. It also can't chase a physician's office for a missing order.

## Option 3: A resupply coordinator on payroll

A person calls, handles the eligibility question in the same breath, and chases documentation gaps.

Strength: judgment. They notice the patient who sounds confused, the account that's been double-billed, the CPAP patient who quietly stopped using the machine.

Where it breaks: throughput and turnover. One person gets through a few hundred meaningful conversations a month before inbound interruptions eat the rest, and when they're out, the list stops.

## One month, three ways (illustrative)

Assume 1,200 active resupply patients, with 700 due or overdue in a given month. Every number below is illustrative and meant to be replaced by your own data.

| | Platform | AI agent | Coordinator |
|---|---|---|---|
| Monthly cost | ~$2,400 | ~$1,300 | ~$4,800 loaded |
| Patients touched | 700 | 700 | ~450 |
| Live/interactive contacts | n/a (self-serve) | ~320 | ~230 |
| Orders confirmed | ~245 | ~280 | ~190 |
| Cost per confirmed order | ~$10 | ~$5 | ~$25 |
| Handles the inbound "where's my order" call | no | yes | yes |
| Chases a missing SWO from a physician office | no | no | yes |

The coordinator loses on cost per order and wins on everything the other two hand back to your staff.

## A decision rule you can apply today

- **Under about 400 active resupply patients:** software alone, worked by existing staff. Neither an agent nor a hire pays for itself yet.
- **400 to 1,500:** the AI agent for outbound confirmation and inbound status calls, with software (or your billing system) as the source of who's due. This is where the math is clearest.
- **Over 1,500:** agent plus one coordinator whose job is exceptions and documentation, not dialing. Same split we described for [plan-of-care recalls in physical therapy](/blog/plan-of-care-dropoff-in-physical-therapy-ai-agent/).

Before you price anything, pull two reports: active patients with no shipment in 120 days, and inbound call reasons for one week. If half your inbound volume is order status and coverage questions, and a third of your list is dormant, you already know which bucket to fund first. The [pharmacy refill-line rules](/blog/is-it-ready-yet-what-an-ai-phone-agent-can-legally/) are worth reading alongside it, because the consent questions are nearly identical.

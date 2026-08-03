---
title: "Member Calls Tripled After the Holiday. What a Credit Union's AI Agent Did With All 412."
description: "412 calls hit a three-person credit union contact center in one day — here's what the AI agent closed, what it escalated in seconds, and what broke."
pubDate: 'Aug 3 2026'
sources:
  - "CFPB — 12 CFR 1005.11, Procedures for resolving errors — https://www.consumerfinance.gov/rules-policy/regulations/1005/11/"
  - "eCFR — 12 CFR 1005.11 — https://www.ecfr.gov/current/title-12/chapter-X/part-1005/subpart-A/section-1005.11"
  - "CFPB — 12 CFR 1005.6, Liability of consumer for unauthorized transfers — https://www.consumerfinance.gov/rules-policy/regulations/1005/6/"
  - "NCUA — Guidelines for Safeguarding Member Information, Appendix A to Part 748 — https://ncua.gov/regulation-supervision/legal-opinions/2001/guidelines-safeguarding-member-information-appendix-part-748"
  - "NCUA — Evaluating Third Party Relationships — https://ncua.gov/regulation-supervision/letters-credit-unions-other-guidance/evaluating-third-party-relationships"
  - "Posh AI — Client Story: Sound Credit Union — https://www.posh.ai/client-stories/sound-credit-union"
  - "Future of Privacy Forum — Chatbots in Check: Utah's Latest AI Legislation — https://fpf.org/blog/chatbots-in-check-utahs-latest-ai-legislation/"
  - "Davis Polk — Utah scales back reach of generative AI consumer protection law — https://www.davispolk.com/insights/client-update/utah-scales-back-reach-generative-ai-consumer-protection-law"
  - "Recording Law — Two-Party Consent States for Recording — https://www.recordinglaw.com/party-two-party-consent-states/"
---

The credit union in this walkthrough is a composite: a $180 million shop with 9,000 members, four branches, and a three-person contact center. The volumes and percentages are illustrative, not audited. Every call type, escalation rule, and regulatory trigger below is real.

A normal Monday brings about 140 inbound calls. The Monday after a three-day holiday weekend brought 412.

## 7:00 a.m. — 118 calls in ninety minutes

The queue opens and the flood arrives. The AI voice agent answers all of it simultaneously, which is the whole reason it exists: three humans cannot pick up 118 lines.

What it finished on its own:

- **Balance and recent transactions** — but only after authenticating the member. Not caller ID. A one-time passcode to the number already on file, plus a second factor above a set dollar threshold.
- **Branch and drive-thru hours**, including which locations opened late.
- **Card activation** for cards mailed before the weekend.
- **Online banking password resets**, routed through the same authentication path the website uses.

Ninety-one of those 118 calls ended without a human touching them. The three staff worked the other 27.

(If the difference between this and the phone tree you already own isn't obvious, that's the ground covered in [The Agentic Wave, Explained](/blog/the-agentic-wave-is-not-just-for-tech/).)

## 9:30 a.m. — The sentences that end the AI's turn instantly

Long weekends generate fraud calls. This one generated 31.

The rule was written before launch. Certain phrases stop the agent mid-sentence and ring a human, with the transcript already open on their screen: *"I didn't make that charge." "My card's gone." "Someone used my account."*

The urgency is regulatory, not just polite:

- Under Regulation E, a member's **oral** notice of an error starts the clock. The credit union may require written confirmation, but it must investigate promptly and determine whether an error occurred within 10 business days of the notice — it cannot wait for paper to start ([12 CFR 1005.11](https://www.consumerfinance.gov/rules-policy/regulations/1005/11/)).
- That window extends to 45 days only if the account is provisionally credited within the first 10 business days.
- On a lost or stolen card, the member's own liability turns on speed: capped at $50 if they notify within two business days of learning of the loss, and up to $500 if they don't ([12 CFR 1005.6](https://www.consumerfinance.gov/rules-policy/regulations/1005/6/)).

A voice agent that parks a fraud call in a callback queue isn't a service failure. It's a timestamp problem with a regulator attached.

Also hard-routed to humans: hardship and collections conversations, anything touching a loan decision, and any rate quote. That last one was a management call, not a legal one — the CEO's line was that nothing resembling an offer leaves the building through software.

## 11:00 a.m. — Loan status, appointments, and a payoff quote that wasn't

The agent handled "where's my loan application?" by reading a status field and nothing else: *received, in underwriting, conditionally approved, docs ready.* It booked 22 branch appointments.

Then it read a member their auto loan **balance** when the member had asked for a **10-day payoff quote**. Different numbers, because of accrued interest. The member drove to a branch with a check for the wrong amount. That skill was switched off by 2 p.m. and rebuilt as a hard handoff.

## 2:00 p.m. — Two more failures, both boring

The agent quoted **regular** branch hours from a page nobody had updated for the holiday schedule. Roughly a dozen members were told a branch was open when it wasn't.

Then an 84-year-old member failed the one-time passcode three times, because the number on file was a landline. The agent looped instead of escalating. The fix — two failed attempts, then a human, always — was a one-line rule that should have shipped on day one.

## Guardrails a regulated shop can't skip

- **Authentication before any account data.** No exceptions, no "just this once."
- **A written information security program that covers the vendor.** NCUA's Appendix A to Part 748 sets GLBA-based standards for administrative, technical, and physical safeguards over member information ([NCUA](https://ncua.gov/regulation-supervision/legal-opinions/2001/guidelines-safeguarding-member-information-appendix-part-748)), and NCUA guidance is blunt that the credit union remains responsible for third-party arrangements.
- **Full logging and retention** — transcript, timestamp, authentication result, escalation reason. Your examiner will ask what the machine told members.
- **Disclosure at the top of the call.** About a dozen states require all-party consent to record. And Utah's amended AI law requires disclosure in high-risk interactions involving financial data, with a safe harbor when the AI clearly identifies itself as nonhuman at the outset — a sensible default even outside Utah.

## What went in the 90-day board packet

Containment of 63% of inbound calls. Average hold time down from just over four minutes to under one. Abandonment from 11% to 3%. No new hires and no cuts — the three staff shifted to fraud, collections, and member outreach. Eleven escalation-rule changes in three months, most written the week after a member complained.

For scale, vendors publish higher numbers at mature deployments: Posh AI reports a 77% containment rate at Sound Credit Union, with wait time down from 1.5 minutes to 19 seconds. Treat that as a ceiling built on years of tuning, not a launch expectation.

## Before your next long weekend

Pull last year's call log for the Monday after a holiday and sort every call into three piles: *closeable after authentication*, *human within seconds*, and *not sure yet*. The third pile is your actual project plan — and the honest answer for most of it will be "leave it alone this year." For a worked version of that sorting exercise in another regulated industry, see the [insurance agency checklist](/blog/an-ai-agent-checklist-for-independent-insurance/).

---
title: "Status Texts First, Phone Second: An AI Agent Rollout for Collision Repair Shops"
description: "Body shops can hand repair-status texts and calls to an AI agent in a set order, from CCC milestones to rental handoffs. Includes five pre-launch test calls."
pubDate: 'Sep 6 2026'
sources:
  - "Enterprise U.S. Length of Rental Q2 2025 — https://www.enterprise.com/content/dam/ent-brand/LOB/ReplacementResources/q2-2025/25_ENT_N01966_RLD%20LOR_Q2_2025_USA_V2.pdf"
  - "CollisionWeek, U.S. Length of Rental Holds at 15.1 Days in Second Quarter — https://collisionweek.com/2026/08/14/u-s-length-rental-holds-15-1-days-second-quarter/"
  - "Autobody News, Length of Rental Data Show Repair Cycle Time Continued Decline in Q2 2025 — https://www.autobodynews.com/news/length-of-rental-data-show-repair-cycle-time-continued-decline-in-q2-2025"
  - "CCC Repair Status Updates & Surveys (UpdatePlus) — https://www.cccis.com/collision-repairers/consumer-engagement/repair-status-surveys"
  - "CCC Knowledge Base, Delayed Promise Jobs — https://cccis.zendesk.com/hc/en-us/articles/360042339371-Delayed-Promise-Jobs"
  - "BodyShop Business, Enterprise Program Provides Repair Updates to Insurers, Rental Car Offices — https://www.bodyshopbusiness.com/enterprise-program-provides-repair-updates-to-insurers-rental-car-offices/"
  - "PR Newswire, CCC ONE Total Repair Platform and Enterprise ARMS Integration — https://www.prnewswire.com/news-releases/ccc-one-total-repair-platform-enterprise-rent-a-car-arms-integration-announced-117310788.html"
  - "BCLP, The TCPA's New Opt-Out Rules Take Effect on April 11, 2025 — https://www.bclplaw.com/en-US/events-insights-news/the-tcpas-new-opt-out-rules-take-effect-on-april-11-2025-what-does-this-mean-for-businesses.html"
  - "Nixon Peabody, FCC Partially Delays New TCPA Consent Revocation Rules — https://www.nixonpeabody.com/insights/alerts/2025/04/11/fcc-partially-delays-new-tcpa-consent-revocation-rules"
  - "BodyShop Business, Is It Legal to Waive a Customer's Deductible? — https://www.bodyshopbusiness.com/is-it-legal-to-waive-a-customer-s-deductible/"
  - "NY DFS OGC Opinion 07-10-05, Waiver of Deductible by an Automobile Collision Repair Facility — https://www.dfs.ny.gov/insurance/ogco2007/rg071005.htm"
  - "Repairer Driven News, New anti-steering regulations in Calif. take effect Jan. 1 — https://www.repairerdrivennews.com/2016/12/14/new-anti-steering-regulations-approved-in-calif-take-effect-jan-1-auto-insurers-must-comply-by-march-12/"
---

A collision customer is out of their car for roughly two weeks. Enterprise's national length-of-rental figure held at 15.1 days in the second quarter of 2026, and it has sat near that mark for a while. Two weeks is plenty of time for one person to call your front desk four times, and most of those calls carry the same question: where's my car?

That question suits automation because the answer already exists inside your management system. Nobody has to think about it. Somebody just has to say it.

This is a different job from the one at a mechanical shop, where the agent's value is booking diagnostics and chasing declined work ([covered here](/blog/ai-agents-for-auto-repair-shops-where-they/)), and different again from a dealership's lead follow-up ([covered here](/blog/should-a-small-dealership-use-an-ai-agent-or-a-bdc/)). Body shop work is already sold. The insurer is involved. The customer is stressed, driving a rental, and rarely happy. Your agent's job is information and logistics, not selling.

## Wire the data before you write a single script

An agent with no live data will guess, and guessing is what gets shops in trouble. Give it read access to:

- Repair order number, customer name and phone, vehicle year/make/model
- Current workflow stage and the timestamp it changed (teardown, parts ordered, body, paint, reassembly, QC, ready)
- Parts status, including anything backordered
- The promise date **plus a separate flag for whether that date is confirmed or tentative**
- Insurer, claim number, and a DRP/non-DRP marker used only for internal routing
- Rental branch and whether a rental is on the claim
- The assigned estimator or advisor for each RO
- Your estimate and drop-off calendar, capped by paint booth capacity

That confirmed/tentative flag is the single most important field. Everything the agent is allowed to say about timing hangs off it.

## Configure in this order

**1. Outbound milestone texts.** Start here, not with the phone. One short text at each real milestone: vehicle checked in, teardown complete, parts ordered, in paint, in quality control, ready for pickup. If you already run CCC UpdatePlus or a similar tool, do not stack a second sender on top of it. Pick one. Suppress automated "on track" messages on any job whose promise date has slipped, and route those to a human. CCC flags these internally as delayed-promise jobs. A slipped date is a conversation, not a notification.

On consent: get texting permission in writing on the repair authorization, and make sure your platform honors STOP, CANCEL, and UNSUBSCRIBE. Since April 11, 2025, FCC rules require opt-out requests to be processed within ten business days.

**2. Inbound status calls.** The agent matches the caller ID to an open RO, confirms the last name and vehicle, and reports the current stage and the last thing that happened. If the promise date is flagged confirmed, it can state it. If not, the line is: "It's in paint as of this morning. Your advisor confirms delivery dates, and I've asked her to call you today."

**3. Drop-off and pickup scheduling.** Ordinary calendar work, with two guardrails: don't schedule a drop-off before parts are received on jobs your shop pre-orders, and don't book a pickup before QC is signed off.

**4. Rental coordination.** The agent's role is a handoff, not a transaction. It confirms the rental branch, tells the customer when the shop will notify Enterprise, and passes the pickup time along. Enterprise's ARMS and Entegral tools already push repair status to rental branches and insurers. The agent should never tell a customer how many rental days their policy covers.

**5. Estimate appointments.** Last, because these are half sales calls. Collect vehicle, damage description, drivability, insurer if a claim is open, and photos by text. Book the appointment. Stop there.

## The red lines

The agent never:

- Quotes repair cost, supplement amounts, or betterment
- Discusses fault, liability, or whether someone should file a claim
- States a delivery date that isn't flagged confirmed
- Offers to waive, discount, or absorb a deductible (in Massachusetts and Rhode Island, that offer is treated as insurance fraud, and padding an estimate to cover it is fraud anywhere)
- Handles a call from an active accident scene

That last one matters. If a caller mentions a crash that just happened, injuries, or a vehicle in the roadway, the agent stops and transfers, or gives your tow partner's number. That's a [towing intake problem](/blog/the-overnight-phone-at-a-6-truck-towing-company/), not a body shop one.

## How to phrase insurer questions

Anti-steering statutes like New York Insurance Law §2610 and California's regulations point at insurers, not shops. But an agent that editorializes about carriers is a complaint waiting to happen. Give it neutral scripts:

- "You can have your vehicle repaired wherever you choose. We work with your carrier either way."
- "Your deductible amount is set by your policy. Your advisor can confirm what's due at pickup."
- "We submit supplements directly to the carrier. Your estimator will explain anything that changes."

No comparisons of carriers. No opinions on the adjuster.

## Sample escalation rules

Route to a human, same day, on any of these: attorney mentioned, total loss mentioned, injury mentioned, a workmanship complaint after delivery, a caller asking twice for a date, any question containing a dollar amount, or a third call from the same customer within seven days. That last trigger catches unhappiness before a review does.

## Five test calls to run before launch

1. A matched caller ID asking status on a job in paint with a tentative promise date. Did the agent stay vague on the date?
2. A spouse calling from a different number about a vehicle in your system. Did it verify identity before disclosing anything?
3. "The insurance only approved $2,800, what's my part?" Did it hand off without naming a number?
4. An angry third-delay caller demanding to know who pays for extra rental days. Did it transfer to a live person rather than explain policy?
5. "I just got hit, I'm on the shoulder of Route 9." Did it drop the script immediately?

Score each one yourself before your service advisors ever hear it.

## Pick your launch week

Turn on outbound milestone texts only, on a single location, during a normal week rather than a hail-repair backlog. Run it for two weeks and count how many inbound status calls disappear. That number tells you whether the phone side is worth configuring at all.

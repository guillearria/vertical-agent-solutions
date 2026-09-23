---
title: "Winery Tasting Room Phones: The Break-Even on AI Call Answering in Tastings and Club Members"
description: "Sample math for a 2,000 to 10,000 case winery: the monthly cost of an AI phone agent and how many tastings and club saves it takes to cover it."
pubDate: 'Sep 23 2026'
industry: hospitality-leisure
sources:
  - "Sovos: 2026 Direct-to-Consumer Wine Shipping Report press release — https://sovos.com/press-releases/2026-direct-to-consumer-wine-shipping-report-reveals-record-declines-as-market-downturn-deepens/"
  - "Retell AI: AI Voice Agent Pricing in 2026 — https://www.retellai.com/blog/ai-voice-agent-pricing-full-cost-breakdown-platform-comparison-roi-analysis"
  - "Cekura: Retell AI pricing per minute — https://www.cekura.ai/blogs/retell-ai-pricing-per-minute"
  - "Twilio: US Programmable Voice pricing — https://www.twilio.com/en-us/voice/pricing/us"
  - "Commerce7 Developer Documentation — https://developer.commerce7.com/"
  - "Commerce7 Technology Overview — https://documentation.commerce7.com/commerce7s-technology"
  - "WineDirect: Reservations via Tock — https://documentation.vin65.com/Settings/Integrations/Reservations"
  - "Tock API FAQ — https://tock.zendesk.com/hc/en-us/articles/25447494175508-API-FAQ"
  - "Supergood API Report Card: Tock — https://supergood.ai/api-report-card/tock"
  - "Free The Grapes: DTC Wine Shipping Laws in 2026 — https://freethegrapes.org/dtc-wine-shipping-in-2026/"
  - "Free The Grapes: Delaware's New Wine Shipping Law Takes Effect August 15 — https://freethegrapes.org/delaware-wine-shipping-law-takes-effect/"
  - "Free The Grapes: Rhode Island's Wine Shipping Law — https://freethegrapes.org/rhode-island-wine-shipping-law/"
  - "Sovos: Alcohol Delivery Restrictions — https://sovos.com/blog/ship/alcohol-delivery-restrictions/"
  - "Free The Grapes: Age Verification for Wine Shipping — https://freethegrapes.org/age-verification-wine-shipping/"
  - "Wineshipping.com: FedEx Adult Signature Deliveries — https://wineshipping.com/fedex-adult-signature-deliveries/"
  - "vinSUITE: How to Reduce Declined Payments in Your Wine Club — https://www.vinsuite.com/declinedpayments"
---

Every number below is **illustrative**. The example winery is made up so you can follow the math. Swap in your own call counts, tasting fees and club prices before you decide anything.

## The winery in this example

The winery makes 5,000 cases a year and runs a tasting room open five days a week. It has about 600 club members on four shipments a year. Reservations run through Tock, and the club and online store run through Commerce7 or WineDirect. In busy months the phone gets about 700 calls. Most come in while staff are pouring for guests, so many of them go to voicemail.

The club matters more than it used to. Sovos ShipCompliant's 2026 report found that direct-to-consumer wine shipments fell 15% by volume in 2025, the steepest drop since the report began. Each member who stays is worth more than before.

## Line by line: the monthly bill

**Agent usage.** Voice platforms charge by the minute. Retell AI's published base rate is $0.07 a minute. Once you add the language model and the voice, all-in costs usually land between about $0.13 and $0.31. Our example gets 700 calls at 3 minutes each, which is 2,100 minutes, or roughly **$250–$650 a month**. Packaged "AI receptionist" products often charge a flat fee in the same range.

**Telephony.** The phone line is often included. If it isn't, Twilio lists a US local number at $1.15 a month and inbound calls at under a penny a minute, so about **$20 a month** here.

**Setup.** Someone has to write the scripts, load your tasting menu, hours and directions, and test the handoffs. Budget **$1,500–$4,000 once**, or roughly $125–$330 a month if you spread it over the first year.

**Connecting it to your software.** This line varies the most:

- **Commerce7** is built entirely on open APIs, with more than 900 endpoints. (An API is the socket that lets two programs plug into each other.) A developer can let the agent look up a member's club status or put a shipment on hold without much trouble.
- **WineDirect** already syncs with Tock in real time, so booking and club data stay in step.
- **Tock** is the tricky one. API access is limited to its Premium plans, and you have to request it by email. Third-party reviews of that API say it can't create or change reservations. If that's still true when you shop, the agent texts callers a booking link instead of booking them itself. That still works, but ask each vendor exactly how they handle Tock.

Allow **$0–$200 a month** for upkeep if a consultant maintains these connections.

**First-year total:** roughly **$550–$1,200 a month.**

## Counting the return in guests and members

Measure the payback in visits and memberships, not percentages.

- **One recovered tasting.** Four guests at $35 is $140 in fees. Add around $180 in bottles bought at the counter, and the booking is worth about **$320**.
- **One saved club member.** Four shipments at $200 is about **$800 a year**.

At $1,000 a month, the agent pays for itself with **two recovered tastings and one saved member a month**, which comes to $1,440. Those are revenue figures, and your margin is what actually pays the bill. To stay conservative, double the targets: four tastings and two saves.

In practice, most saved members come from declined cards. Expired or reissued cards are a common reason members drop out without meaning to. A member who gets a friendly call the day their card fails is easier to keep than one who notices three weeks later that a shipment never arrived.

## Calls the agent can own

- **Tasting bookings and group size.** It checks availability, confirms the party size, and either sends a booking link or books directly, depending on what your Tock plan allows. It flags groups over your limit (say, 8) for a manager.
- **Club shipment holds.** "I'm traveling in October, can you skip this one?" It looks up the member, applies the hold and confirms by text.
- **Address changes.** It updates the record when the new address is in a state you already ship to. The state rules are covered below.
- **Declined-card follow-ups.** It calls or texts the member a secure link to update the card themselves. It should never take card numbers out loud on a recorded line.
- **Directions and hours.** Gate codes, parking, whether dogs are allowed, the last seating time. These calls are easy to answer but eat up a pourer's afternoon.

## Calls that go to a person

**Whether you can ship to a given state.** The law changes too often for a script. Utah bans direct shipping outright. Rhode Island only allows it when the order was placed in person at the winery. Delaware's new law took effect August 15, 2026, with case caps and a ban for wineries that have a Delaware wholesaler. Mississippi only opened in July 2025. Your own permits add another layer. When a caller asks about a new state or is moving to one, the agent takes their details and a staff member checks your compliance list.

**Age verification.** The agent can't check an ID. It can explain that UPS and FedEx require an adult 21 or older to sign for every wine delivery. Anything beyond that, like a caller who sounds underage or questions about sending wine as a gift, goes to staff.

**Intoxicated callers and complaints.** Someone slurring while trying to book a second tasting that day, or a guest upset about how they were treated, needs a human with judgment. Set the agent to transfer as soon as it hears either one.

**Private event pricing.** The price of a buyout, a rehearsal dinner or a corporate barrel tasting depends on the date, the food and your staffing. The agent collects the headcount and date and books a call with your events lead. It never quotes a number. The [wedding venue checklist](/blog/before-you-let-an-ai-agent-near-your-wedding/) draws the same line for high-value events.

## Before you sign anything

Pull one month of phone records from your carrier or voicemail and count three things: missed calls during open hours, voicemails about reservations, and club declines that ended in a cancellation. If two recovered tastings and one saved member a month looks unlikely from those counts, hold off. If it looks easy, ask two vendors for a demo that uses your real Tock plan and your real Commerce7 or WineDirect account. The [HVAC pricing breakdown](/blog/ai-answering-service-pricing-for-hvac-shops-the/) lists the contract terms worth checking along the way.

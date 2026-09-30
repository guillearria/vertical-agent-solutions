---
title: "Pricing an AI Receptionist for a Coworking Space With 80 to 400 Members"
description: "Room hours, day passes, and tours a 1 to 3 location coworking space must capture to cover an AI phone and chat agent costing $400 to $1,200 a month."
pubDate: 'Sep 30 2026'
industry: real-estate-property
sources:
  - "Smith.ai pricing explained (Macha) — https://www.getmacha.com/blog/smith-ai-pricing-explained"
  - "Smith.ai pricing overview (CloudTalk) — https://www.cloudtalk.io/smith-ai-pricing/"
  - "Retell AI pricing — https://www.retellai.com/pricing"
  - "Twilio voice pricing breakdown (Quiq) — https://quiq.com/blog/twilio-voice-pricing/"
  - "Twilio 10DLC registration and pricing explained (Sociocs) — https://www.sociocs.com/post/twilio-10dlc-explained/"
  - "A2P 10DLC fees (HighLevel Support) — https://help.gohighlevel.com/support/solutions/articles/155000005200-a2p-10dlc-messaging-fees-registration-monthly-and-carrier-costs"
  - "Nexudus Public API overview — https://learn.nexudus.com/api/overview"
  - "Nexudus API-first platform — https://nexudus.com/api-first-coworking-platform/"
  - "OfficeRnD API v2 introduction — https://help.officernd.com/en/articles/300780-introducing-officernd-api-v2"
  - "OfficeRnD developer docs, add new booking — https://developer.officernd.com/reference/bookingscontroller_additem_apiv2"
  - "Optix and Zapier integration — https://www.optixapp.com/integrations/zapier/"
  - "How Zapier works with Optix — https://support.optixapp.com/en/articles/2056089-how-does-zapier-integrate-with-optix"
  - "Optix US coworking benchmarks and pricing 2025 — https://www.optixapp.com/blog/us-coworking-industry-benchmarks/"
---

Every dollar figure in this post is illustrative. Vendor prices change and so do local markets. Use the structure, and replace the numbers with your own quotes and your own booking data.

## The operator we're pricing

Picture an independent flex-office operator with two locations in a mid-sized city and about 220 members. Each month there are roughly 350 phone calls, plus about 400 website chats and texts. Most of them fall into a few groups: "Can I tour?", "Do you sell day passes?", "Is the big conference room free Thursday?", and "What's the Wi-Fi password?" A large share arrive after the community manager has left for the day.

The agent's job is to answer those, book what it can, and pass the rest to a person.

## Line item 1: the agent itself

You can buy this in two ways.

**A packaged AI receptionist service.** You pay per call. Smith.ai's AI plans, for example, come to roughly $1.60 to $2.00 per call within plan limits, and booking and extra software connections are billed as add-ons. At 350 calls, expect about **$550 to $800 a month** before add-ons.

**A voice platform set up by you or a contractor.** Retell AI bills by the minute and lists $0.07 to $0.31 per minute depending on the voice and model you choose. If calls average 3 minutes, that's 1,050 minutes, or about **$75 to $325 a month**. Usage costs less this way, but someone has to build the agent and maintain it.

Add a chat and text agent for your website and phone number. Budget **$50 to $300 a month**, depending on whether your voice vendor includes it.

## Line item 2: phone numbers and texting

This line is small but easy to forget.

- **Phone number and minutes:** On Twilio, a local US number costs $1.15 a month and incoming calls cost $0.0085 a minute. At 1,050 minutes that's under $10. Many packaged services include this in their price.
- **Texting registration:** US carriers require businesses that text customers to register. Low-volume senders pay about $19.50 up front plus $1.50 a month. A standard registration costs more: a $46 brand fee, a $15 vetting fee, and $10 a month.

Call it **$15 to $25 a month**.

## Line item 3: setup and wiring into your software

This line decides whether the agent can actually book a room or tour, or can only take messages.

- **Nexudus** has a documented public API (a way for other software to plug in) with functions for checking booking availability and creating bookings.
- **OfficeRnD** offers API v2, which can add bookings and look up members.
- **Optix** connects through Zapier and webhooks. For example, a new booking or a new user can trigger other steps automatically.

So all three can be connected. The cost is in configuring the connection: which rooms non-members can book, the prices, the buffers between bookings, and whether a deposit is taken. Budget **$500 to $3,000 one time** for setup and integration. Spread over 12 months, that's roughly **$40 to $250 a month**. If you use Zapier for Optix, add its subscription.

Last, count your own time. Once things settle down, reviewing transcripts and fixing wrong answers takes 2 to 4 hours a month.

## The monthly total

| Line item | Illustrative monthly cost |
|---|---|
| Voice agent | $75–$800 |
| Chat and text agent | $50–$300 |
| Phone number and texting | $15–$25 |
| Setup and integration (spread over 12 months) | $40–$250 |
| **Total** | **roughly $400–$1,200** |

The low end assumes you build on a voice platform and handle some setup yourself. The high end is a fully managed service with add-ons. The break-even below uses **$800**.

## What it takes to break even

Coworking prices vary a lot by city. Optix's 2025 US benchmarks put the average hot-desk day at $30 and meeting rooms at $45 an hour, with private offices around $800 to $1,200 a month in a city like Austin. Using those numbers, here is one illustrative month of bookings the agent captures that you would otherwise have lost:

- **10 after-hours meeting-room hours** booked by non-members at $45: $450
- **8 day passes** sold to evening callers and chat visitors at $30: $240
- **4 extra tours** booked, with 1 converting to a dedicated desk at about $300: $300

That adds up to $990, which covers the $800. Memberships also recur. If one private office signs because someone answered a 7 p.m. call, that single office pays for the whole system and keeps paying every month after.

Count only bookings that would really have been lost. Members who already book rooms through your portal don't count. The gain comes from people who call, reach no one, and try the next space on Google. To gauge that number, check how many voicemails and unanswered chats you get after 6 p.m. [This look at an AI leasing assistant at a 200-unit apartment community](/blog/does-an-ai-leasing-assistant-actually-work-at-a/) runs a similar tour-booking calculation.

## Calls the agent passes to a person

Set these up to go to a human from day one:

- **Lease and office agreement negotiations.** Term length, discounts, build-outs, and moving a team from desks to a suite. The agent can book the conversation, but it shouldn't quote terms.
- **Access and security incidents.** A member locked out, a door propped open, someone following people in, an alarm. The agent should reach your on-call person immediately. It should never read out door codes or unlock anything.
- **Billing disputes.** Double charges, contested late fees, arguments over cancellation. The agent collects the details and a callback number, and a person decides.

Complaints about mail handling and calls from upset members should also go to a person.

## Before you call a vendor

Pull 30 days of call logs and chat history from both locations. Tag each one as a tour, day pass, room booking, member question, or human-only call. Then ask two vendors to quote against that exact mix and to make a live test booking in your own Nexudus, OfficeRnD, or Optix account. If they can't book a real room during the demo, you'd end up paying for an agent that only takes messages. For another example that prices the full setup instead of just the per-minute rate, see [how an HVAC shop adds up the costs](/blog/ai-answering-service-pricing-for-hvac-shops-the/).

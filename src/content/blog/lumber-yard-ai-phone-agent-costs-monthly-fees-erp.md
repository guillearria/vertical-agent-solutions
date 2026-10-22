---
title: "Lumber Yard AI Phone Agent Costs: Monthly Fees, ERP Hookup, and the Will-Call Break-Even"
description: "A two-location lumber yard with four trucks, priced out: about $1,000 a month for an AI phone agent, covered by roughly four saved will-call orders."
pubDate: 'Oct 22 2026'
industry: trade-industrial
sources:
  - "Macha, Retell AI pricing explained — https://www.getmacha.com/blog/retell-ai-pricing-explained"
  - "11x, Retell AI pricing guide — https://www.11x.ai/guides/retell-ai-pricing"
  - "eesel.ai, Retell AI pricing 2026 — https://eesel.ai/blog/retell-ai-pricing"
  - "Twilio Programmable Voice pricing (US) — https://twilio.com/voice/pricing"
  - "SoftwareConnect, Epicor BisTrack review — https://softwareconnect.com/reviews/epicor-bistrack/"
  - "SoftwareConnect, Best building materials software — https://softwareconnect.com/roundups/best-building-materials-software/"
  - "Cleverence, Top ERP systems for lumber and building materials dealers — https://cleverence.com/articles/erp-reviews/top-10-erps-lumber-building-materials-3941"
  - "J. J. Keller, 1926.1408 power line safety summary — https://jjkellercompliancenetwork.com/regsense/1926-1408-power-line-safety-up-to-350-kv-equipment-operations"
  - "OSHA, 29 CFR 1926.1400 Scope — https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.1400"
  - "OSHA standard interpretation, 2016 — https://www.osha.gov/laws-regs/standardinterpretations/2016-06-27"
---

Every number below is **illustrative**. It's a worked example for you to replace with your own figures, not a quote. Vendor prices change often, so check current rates before you budget.

## The yard in this example

The example dealer is independent, with two locations, a contractor counter at each, and four delivery trucks (two of them boom trucks). The phones ring about 2,400 times a month. Most calls fall into three groups: contractors placing will-call orders, people asking "when's my drop?", and stock checks like "do you have 16-foot 2x10s?"

The AI agent has a narrow job. It answers overflow during the morning rush, picks up after hours, and handles delivery-status and stock questions without help. Every other call goes to the counter.

## Why a yard's phone isn't a distributor's order desk

At a wholesale distributor, the call mostly *is* the order: a known account reorders known items for next-day shipping. That setup is covered in [the wholesale distributor order-taking post](/blog/an-ai-agent-for-wholesale-distributor-order-taking/). A yard's calls are about time and place. The caller is standing on a slab with a saw running behind him. He wants to know if the drywall shows up before the tapers do, if the driver can get past the gate, and if his will-call is pulled and waiting.

That means the agent leans less on your price list and more on your dispatch board. If drivers don't mark loads delivered in the system, the agent will cheerfully tell a framer his trusses are "scheduled" two hours after they landed. Clean up the dispatch data before anything else.

## The monthly stack, line by line

Assume the agent handles 1,200 calls a month at about two minutes each, or 2,400 minutes.

| Line item | Illustrative monthly cost |
|---|---|
| Voice agent minutes (2,400 × ~$0.12) | ~$290 |
| Phone line and carrier minutes | ~$25 |
| ERP connection upkeep | ~$200 |
| One-time setup and integration (~$6,000 spread over 24 months) | ~$250 |
| Staff time reviewing call transcripts (2 hrs/week) | ~$240 |
| **Total** | **~$1,005** |

Where those figures come from:

- **Agent minutes.** Retell AI advertises $0.07 to $0.31 per minute. Third-party breakdowns put real production setups at about $0.11 to $0.15 once the language model and add-ons are included. Packaged "AI receptionist" products roll all of this into a flat plan, which usually costs more but takes less tinkering.
- **Telephony.** Twilio lists US inbound local calls at $0.0085 a minute and local numbers at $1.15 a month. This line barely registers.
- **The ERP connection.** This line decides whether the project works. Yard systems like Epicor BisTrack and ECI Spruce combine point of sale, inventory, and delivery management, and BisTrack has a dispatch module for scheduling and tracking deliveries. Getting the agent to *read* stock levels and delivery status from that system usually takes an integrator or help from your ERP vendor. Ask for read-only access. At this stage the agent shouldn't be able to write orders into the system.
- **Setup.** Most setup time goes into teaching the agent yard language: "half-inch CDX," "two-by-ten sixteens," "treated or green," and which branch stocks what.

## Break-even one: will-call orders that would have hit voicemail

Say a typical contractor will-call order is $1,000 and you keep about 25% as gross margin, or $250 per order. $1,005 divided by $250 comes to roughly **four saved orders a month**, about one a week.

Only count orders that were actually lost. A voicemail from a loyal remodeler isn't a lost sale, because he'll call back. The calls that count come from the contractor who gets voicemail at 6:40 a.m. and dials the yard down the road. To estimate how often that happens, pull two weeks of your missed-call log and count the numbers that never called back.

## Break-even two: counter hours spent on "when's my drop?"

Suppose the two locations together get 50 delivery-status and stock-check calls a day. The agent fully resolves 60% of them, and each one costs a counter person about three minutes once you count the interruption. That adds up to 90 minutes a day, or about 39 hours over a 26-day month. At a loaded wage of $30 an hour, that's roughly $1,170.

On paper, that covers the bill by itself. In practice, freed hours only matter if they go somewhere useful: faster takeoffs, walk-in customers served without a wait, or one fewer Saturday shift. If they just become quieter mornings, rely on the first break-even.

## Four calls that stay at the counter

1. **Material takeoffs.** Reading plans, picking waste factors, and knowing that this builder always under-orders sheathing all take judgment. An agent that guesses quantities causes returns and shortages on the job site.
2. **House-account credit decisions.** Releasing an order for an account that's over its limit or 60 days behind depends on the relationship and on history the agent shouldn't be weighing. The agent can say "let me get someone who can help with your account" and transfer the call.
3. **Special-order millwork and windows.** A person needs to confirm rough openings, swing direction, lead times, and non-returnable terms. A wrong-handed door that can't go back is a loss nobody wants pinned on a bot.
4. **Boom-truck load and site-access calls.** Your dispatcher and driver decide whether the truck can reach the second floor, whether the ground is too soft, and whether there are overhead lines. OSHA's crane rule requires checking whether a boom or load could come within 20 feet of a power line. Its exemption for delivery trucks covers packaged sheet goods and shingles set on a structure, but it excludes roof trusses and prefabricated panels. Those calls go to the people who know the equipment.

A [ready-mix producer](/blog/ready-mix-producers-ask-whether-an-ai-phone-agent/) splits the work the same way: the agent confirms the schedule, and people decide whether a site is safe and ready.

## Tally marks before vendor calls

Before you talk to any vendor, put a sheet next to each counter phone for one week. Give it four columns: will-call orders, "when's my drop?" calls, stock checks, and everything else. Then pull your missed-call log for the same week. If the first three columns fill up and missed calls bunch up before 7 a.m. or after close, your numbers will probably look like the ones above, and you'll have real counts to bring to an ERP integrator or voice-agent vendor. If "everything else" is the biggest column, the agent has less work at your yard than this example assumes.

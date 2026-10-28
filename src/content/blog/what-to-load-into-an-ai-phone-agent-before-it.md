---
title: "What to Load Into an AI Phone Agent Before It Books Fishing Charters and Boat Tours"
description: "For charter and tour outfits running 1 to 6 boats: tally your calls, link FareHarbor or Peek, cap seats per boat, script tides, and test before launch."
pubDate: 'Oct 28 2026'
industry: hospitality-leisure
sources:
  - "U.S. Coast Guard National Maritime Center, OUPV (6-pack) — https://dco.uscg.mil/nmc/charter_boat_captain"
  - "Mariners Learning System, OUPV/Six-Pack License Explained — https://marinerslearningsystem.com/blogs/knowledge/oupv-six-pack-general-information"
  - "OpenCX docs, FareHarbor connection (partner App Key and User Key) — https://docs.open.cx/integrations/fareharbor/connect.md"
  - "Getmyboat and FareHarbor partnership announcement — https://getmyboat.com/journal/company-news/getmyboat-fareharbor-launch-partnership-2020"
  - "Supergood, Peek Pro API overview (reseller/partner access) — https://supergood.ai/docs/peek-pro-api"
  - "NOAA Tide Predictions Users Guide — https://tidesandcurrents.noaa.gov/PageHelp.html"
---

The phone rings most when nobody can answer it. On a good morning the captain is 20 miles offshore with a full boat, and a family in a rental condo is calling to ask about Saturday. The call goes to voicemail. By the time the boat docks, they've booked with the outfit down the marina.

An AI phone agent can pick up those calls, but only if you set it up in the right order. The steps below are written for independent operators with one to six boats. Every number in them is an example, so swap in your own.

## Step 1: Count last season's calls by type

Before you shop for an agent, spend one evening sorting your calls. Go through your voicemails, call log, and the texts you returned from the dock, and tally them into rough buckets. A six-boat inshore and sunset-cruise outfit might find something like this:

- **Availability and booking** ("Do you have Saturday for four?"): about half
- **Trip questions** (what's biting, how long, kids, seasickness): about a quarter
- **Changes and reschedules**: about one in ten
- **Weather worries** ("Is tomorrow still on?"): spikes before every front
- **Everything else**: lost sunglasses, gift certificates, charter-broker calls

Your split will be different. The tally tells you which calls the agent has to handle well on day one and which ones it only needs to route.

## Step 2: Connect it to your booking system, not a copy of it

The agent has to read live availability from FareHarbor, Peek, or whatever you use. If it works from a spreadsheet you update by hand, it will sell a seat that a walk-up bought an hour earlier.

Check this before you sign. FareHarbor's and Peek's APIs (the connections that let other software read and write bookings) are both partner-gated, so not every phone agent can actually write a booking into them. Ask any vendor you're considering: "Are you an approved integration partner with my booking platform, and can you show me a test booking landing on my calendar?" If the answer is no, the agent can still check times and text the caller your booking link, which is a smaller job but a useful one.

## Step 3: Set passenger caps per boat, and make them hard limits

This step can't be skipped. A captain with an OUPV ("six-pack") license runs an uninspected vessel that may carry no more than six paying passengers. A larger inspected boat has its own limit set by its Coast Guard paperwork.

Enter each boat's cap in the booking platform as a hard limit, then tell the agent never to override it. If a caller says, "We're seven, but my son's only eight, can he squeeze in?", the agent should answer that the boat legally carries six and offer two boats or a larger vessel. It should never promise to "check with the captain" on a legal limit. Any yes it gives on that question is a yes you can't honor.

## Step 4: Script the money, the water, and the packing list

Write these answers down once, in your own words, and load them:

- **Deposits:** amount (say, 50% for a half-day private), when it's charged, and when the balance is due. Have the agent send a payment link and avoid reading card numbers aloud on the call.
- **Departure times and tides:** if your trips move with the tide, give the agent your rule ("we leave two hours before high tide at the inlet") and a tide source. NOAA publishes free predictions for thousands of U.S. stations. If tides and departures get complicated, have the agent quote only the times already listed on the booking calendar.
- **What to bring:** licenses if guests need one, food, sunscreen, soft-soled shoes, cash for the mate's tip if that's your custom, and what not to bring (hard coolers, bananas, if your crew is superstitious).

## Step 5: Weather cancellations always come from the captain

The agent can say what your policy is: "If the captain cancels for weather, you can reschedule or get a full refund." It cannot decide whether tomorrow's trip runs. When a caller asks, it should say the captain makes that call by a set time (6 p.m. the night before, for example) and that the caller will get a text either way. A forecast app isn't a captain, and a guest told "looks fine!" will hold you to it.

## Step 6: Write down the handoffs

Each of these goes straight to a human, with a summary text to the owner's phone:

- **Safety:** anything about an incident on a boat, an overdue vessel, or a caller on the water in trouble. The agent should tell them to call 911 or hail the Coast Guard on VHF channel 16, then alert you.
- **Medical:** pregnancy, heart conditions, mobility limits, serious medications. The agent notes the question and doesn't judge whether the trip is safe for that guest.
- **Licensing and regulations:** bag limits, closed seasons, whether a guest needs their own fishing license. Rules change, so the captain answers these.
- **Refund disputes:** anyone unhappy about a cancellation, a no-fish day, or a charge.

Operators in similar seasonal businesses face the same split. A [marina's take on pricing an agent by the year](/blog/why-a-marina-should-price-its-ai-phone-agent-by/) also helps when your calls bunch into five busy months.

## Before the Agent Answers a Real Customer

Run these five test calls from a cell phone you don't normally use, and listen to the recordings:

1. **The seventh passenger:** book a full six-pack, then call back asking to add one more. The agent should refuse and offer alternatives.
2. **The front:** "There's a storm tomorrow, are we going?" It should give the policy and the callback time and make no prediction.
3. **The tide trap:** ask for a 7 a.m. departure on a day your tide rule puts it at 10. It should quote the real time or defer to the calendar.
4. **The heart patient:** "My dad had a stent last month, is that OK?" It should hand off without giving any medical opinion.
5. **The angry refund:** "You cancelled and the sun was out." It should stay calm, avoid promising money back, and get a summary to you quickly.

If any test fails, fix the script and run it again before going live. Do the first round in the off-season, when a bad answer costs you an awkward callback and not a lost July Saturday.

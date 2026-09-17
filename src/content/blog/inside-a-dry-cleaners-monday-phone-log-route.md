---
title: "Inside a Dry Cleaner's Monday Phone Log: Route Changes the AI Agent Closed, Claims It Handed Off"
description: "A composite Monday at a three-store dry cleaner with two vans: 61 calls, six handoffs, one bad answer, and the escalation rules that fixed it."
pubDate: 'Sep 17 2026'
industry: personal-services
sources:
  - "Dry Cleaning and Laundry Institute, Fair Claims Guide — https://dlionline.org/fair-claims-guide/"
  - "International Fair Claims Guide for Consumer Textiles Products (PDF) — https://irp-cdn.multiscreensite.com/670b4da8678441db9ca09d24ced7de7c/files/uploaded/Fair%20Claims%20Guide.pdf"
  - "CleanCloud, Dry Cleaning and Laundry API — https://cleancloudapp.com/api"
  - "CleanCloud, Dry Cleaners (pickup and delivery, route optimizer) — https://cleancloudapp.com/dry-cleaners"
  - "Xplor Spot, dry cleaning software — https://xplorspot.com/"
  - "Enlite POS, dry cleaning software — https://darkpos.com/enlite-pos-software"
  - "The Knot, How Much Does It Cost to Preserve Your Wedding Dress — https://www.theknot.com/content/preserving-your-wedding-dress"
  - "American Drycleaner, Customer Service vs. Fair Claims — https://americandrycleaner.com/node/63166"
---

Three stores, one shared phone number, one counter person per location, two delivery vans, and a plant behind store 1. On a Monday the phone rings all day while the same person tagging garments is supposed to answer it. This walkthrough follows one composite Monday at a business like that, call by call, with an AI phone agent answering first.

All numbers here are illustrative. They are modeled on a plausible small chain, not pulled from one company's books.

## The rules the owner wrote before anything got connected

The owner wrote the escalation rules first, on paper, before looking at a single vendor demo. Four of them:

1. **Any call that mentions lost, missing, damaged, stained, shrunk, or ruined goes to a human immediately.** The agent does not apologize on the company's behalf, estimate value, or promise a refund. Claim value under the industry's Fair Claims Guide depends on the garment's replacement cost, age, and condition, which means somebody has to look at it.
2. **No quotes on wedding gowns, leather, suede, rugs, or restoration work.** The agent collects fabric, beading, and stain details and books a drop-off window. (Preservation commonly runs a few hundred dollars and up depending on the gown, so a number over the phone is a promise nobody should make sight unseen.)
3. **Nothing about a commercial account's counts, credits, or invoices.** Those go to the plant manager.
4. **Route changes only inside the caller's own assigned route, and only before that van is loaded.** Cutoff is 7:00 a.m.

## What had to be wired in

Read access to the POS and route software, keyed on two things: the phone number on file and the tag or order number. If the caller's number does not match the account, the agent does not read out what is in the order.

Three specific data sources:

- **Order status by tag number**, including the promised-date field, not just the "in plant" flag. Alterations go to a tailor who comes Tuesdays and Thursdays, so the ready flag lies and the promised date does not.
- **Today's route manifest**, by van and stop order, so the agent knows whether van 2 has left.
- **A write path limited to three actions**: add a stop, skip a week, reschedule to the route's next scheduled day. Nothing else.

If you run CleanCloud, its published API sits on the Grow plans and caps at 50,000 requests a month at three per second, which is plenty for phone lookups but worth knowing before anyone promises live syncing. Xplor Spot and Enlite both handle pickup and delivery routing; ask your rep specifically what a third-party voice agent can read and write, because "has an API" and "will let your vendor use it" are different answers.

## The log

**7:04 a.m.** "Is my order ready?" Number matched, tag 48213, six shirts and two suits, ready Wednesday after 3. Forty-one seconds.

**7:12 a.m.** Skip request for the Tuesday route. Van 2 unloaded, inside cutoff, skip logged, confirmation text sent.

**7:41 a.m.** New stop requested at an address outside route 2's zip list. The agent did not invent a stop. It captured the address and flagged it for route review, which is the right non-answer.

**8:30 a.m. to 11:00 a.m.** Twenty-two status lookups. Nineteen resolved on the call. Three had no matching tag and went to the counter.

**9:15 a.m.** Hem on three pairs of slacks. The agent read the promised date, said Thursday, and did not mention the plant flag.

**11:50 a.m.** Wedding gown preservation inquiry. No price given. Gown details logged, drop-off booked for Thursday at 10.

**12:30 p.m.** The restaurant account, short two dozen napkins.

**2:10 p.m.** Customer missed the Monday pickup. Next route day is Thursday. Logged.

**3:35 p.m.** A navy blazer missing from a four-piece order. Rule 1 fired. Warm transfer to the store 1 manager in under 30 seconds, with the owner's cell as the fallback.

**5:50 p.m. to 6:40 p.m.** Four after-hours calls: three status, one skip.

Tally for the day: 61 calls, 55 finished by the agent, six handed to a person, none missed. What the counter staff actually got back was not "labor savings," it was 30-odd interruptions they did not have to take while sorting.

## The call it got wrong

The linen account. The restaurant manager said the Monday drop was two dozen napkins light. The agent treated it as a status question, read the manifest, and told him the delivery showed complete. Technically accurate, completely useless, and it cost the plant manager a longer phone call at 4 p.m. than the one he would have had at 12:30.

The fix was one sentence added to rule 3: on any commercial account, if the caller disputes a count, the agent stops, does not read the manifest back, and transfers or takes a callback number. Manifests record what left the plant, not what arrived. A dumpster company hit a version of the same problem, which is why [sorting call types before launch](/blog/ai-phone-agents-at-roll-off-dumpster-companies/) matters more than tuning the voice.

## Try this against your own phone

Print last Monday's call list from your phone system. Mark every call with the tag number the caller gave and whether the answer lived in your POS, the manifest, or somebody's head. The POS and manifest rows are your candidates. The "somebody's head" rows are your escalation rules, already written for you. A [heat-wave Monday at a pool company](/blog/ai-phone-agent-for-pool-service-companies-a-heat/) sorted out the same way.

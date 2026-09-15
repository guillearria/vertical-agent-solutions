---
title: "Four Stages of AI Guest Messaging for Vacation Rental Managers, From WiFi Codes to Direct-Booking Rates"
description: "Connect the PMS first, then automate the five questions guests repeat. A staged rollout plan for short-term rental teams running 15 to 150 units."
pubDate: 'Sep 15 2026'
industry: real-estate-property
sources:
  - "Airbnb Help Center, Improve your response rate and response time — https://www.airbnb.com/help/article/430"
  - "Airbnb Help Center, Why hosts are asked to respond within 24 hours — https://www.airbnb.com/help/article/2414"
  - "Vrbo Host Communication Policy — https://www.vrbo.com/tlp/trust-and-safety/communication-and-property-access-policy"
  - "Vrbo Help, About communicating with guests — https://help.vrbo.com/articles/About-the-Vrbo-Host-Communication-Policy"
  - "Airbnb Help Center, Paying and communicating through Airbnb — https://www.airbnb.com/help/article/209"
  - "Airbnb Help Center, Host damage protection — https://www.airbnb.com/help/article/279"
  - "Smoobu, What is the Airbnb API? — https://www.smoobu.com/en/blog/airbnb-api/"
  - "OwnerRez, Airbnb Messaging Integration — https://www.ownerrez.com/airbnb-messaging"
---

Guest messages do not arrive on a schedule. A 10 p.m. "which door is the lockbox on," a 6 a.m. "can we drop bags early," a Saturday afternoon of parking questions from three properties at once. The volume is not the real problem. The clock is.

Airbnb calculates your response rate as the percentage of new guest messages you answer within 24 hours over the past 30 days, and Superhost status looks at your first reply to each new thread over the past 12 months. Follow-up messages in an existing thread do not move the metric. Vrbo goes further on anything it classes as critical stay information: an inquiry that lands between 8 a.m. and 9 p.m. in the property's time zone needs an answer within an hour, and one that arrives outside those hours needs an answer by 9 a.m. the next morning. Vrbo's policy also states plainly that automatic replies do not count as an adequate response.

That last line sets the bar for this whole project. A canned "thanks, we'll get back to you" is worse than useless. The agent has to actually answer.

## Stage one: connect the systems before you write a single reply

Almost nobody gets direct Airbnb API access. It is not public, and it is granted to approved partners. So your agent reaches guests through your PMS or channel manager (Hostaway, Guesty, Hospitable, OwnerRez, Lodgify and similar all run unified inboxes), and the agent's job is to read from that same system rather than from a document you update by hand.

Per property, the agent needs a structured record containing:

- Exact address, cross street, and what the building actually looks like from the road
- Access method: lockbox location, smart-lock code source, gate code, elevator fob
- WiFi network name and password, verbatim, including capitalization
- Parking: how many spots, where, permit rules, what happens if the spot is occupied
- Check-in and checkout times, plus whether early or late is ever possible and at what fee
- Quirks: the shower handle, the garbage day, the stair that creaks, the dog next door
- Cleaner name and phone, maintenance contact, and who covers that property overnight
- Five to ten local recommendations you would actually give a friend

If the door code lives only in a spreadsheet one person updates, fix that before anything else. An agent confidently reading a stale code to a guest standing in the rain at 11 p.m. is the failure mode that ends these projects.

## Stage two: the repeating five

Run these and nothing else for the first month.

1. Check-in instructions and access
2. WiFi
3. Early check-in and late checkout requests
4. Parking
5. Local recommendations

On the third one, give the agent a rule, not a judgment call: it may confirm early check-in only when the PMS shows no same-day checkout and the clean is marked complete. Otherwise it says the request is with the team and gives a time by which the guest will hear back.

Keep everything inside the platform's own messaging. Airbnb requires host-guest communication to run through its system and will block messages that look like phone numbers, outside links, or attempts to move a conversation off-platform before a booking is confirmed. An agent trained to say "just text me directly" can get an account suspended.

## Stage three: maintenance and cleaner coordination

Now let the agent triage operational reports. It collects what a dispatcher would ask for (unit, symptom, photo, whether the guest is comfortable staying) and opens a ticket in your PMS with the right vendor attached. It can tell a guest the AC tech is scheduled for Tuesday between 1 and 3. It should never promise a same-day fix, and it should never negotiate compensation.

Cleaner coordination is the quiet win. Checkout confirmations, "the clean is running late, can you push 4 p.m.," reassigning a turn when someone calls out. Small rental operations run into the same triage question in [a small landlord's tenant and vendor calls](/blog/tenant-calls-late-rent-and-vendor-scheduling-an-ai/), and the answer is the same: route and document, do not decide.

## Stage four: direct bookings

Save this for last, because direct is where the agent finally has room to sell. On your own site it can quote live rates and availability, explain minimum stays and cleaning fees, hold a date, and send a payment link. None of that is permitted in the same shape on Airbnb or Vrbo.

## Red lines that stay human, every time

- Damage claims and deposit disputes. Airbnb's host damage protection requires you to report damage within 14 days of the incident or before your next guest checks in, whichever comes first. That clock is too consequential for an agent.
- Guest injuries, gas or smoke smells, or a lockout after dark. Wake someone up.
- Noise complaints and any neighbor or HOA contact. These become city complaints and permit problems.
- Refunds, cancellation exceptions, and goodwill credits.
- Any message where the guest sounds angry, scared, or is threatening a review as leverage.

Sample handoff wording the agent can use:

> "I want to get this right rather than guess. I've flagged it for Dana, who handles this property, and she'll message you here within 15 minutes."

> "I'm not able to make a decision on the refund. I've sent your note to our team with your reservation details, and you'll hear back today before 6 p.m."

Then make sure that promise is real. Route to a phone that rings, not an inbox.

## Five messages to send before launch

Send these from a test guest account, at odd hours, and grade the replies:

1. "Hey we're here early, can we get in now?" (sent at 11:40 a.m. on a same-day turnover)
2. "Code isn't working." (the correct code, mistyped)
3. "There's water under the kitchen sink."
4. "The people upstairs were screaming until 2. I want a refund."
5. "Do you have the week of the 14th, and what's your best rate if we book direct?"

The first three test data accuracy. The fourth must escalate without arguing. The fifth should behave differently depending on channel.

## Reading your own inbox before you buy anything

Pull the last 300 guest messages out of your PMS and tally them by type. Illustrative, but common in this business: roughly 60 to 70 percent land in the repeating five, maybe 15 percent are operational, and a small remainder are the ones that need you. That tally tells you what to automate, in what order, and whether the math works at your unit count. If you also run a small inn or B&B alongside the portfolio, [the overnight phone question](/blog/who-answers-your-b-bs-phone-at-2-a-m-three-options/) is worth sorting at the same time.

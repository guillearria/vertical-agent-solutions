---
title: "AI Answering Service Escalation Rules for Commercial Property Managers With 10 to 60 Buildings"
description: "Which office, retail, and flex tenant calls an AI phone agent can close, and why fire alarms, leaks, and stuck elevators must reach a person in seconds."
pubDate: 'Oct 17 2026'
industry: real-estate-property
sources:
  - "Law Insider, HVAC services and after-hours usage sample clauses — https://www.lawinsider.com/clause/hvac-services"
  - "Law Insider, after-hours usage sample clauses — https://lawinsider.com/clause/after-hours-usage"
  - "Beancount.io, CAM reconciliation guide — https://beancount.io/blog/2026/05/17/cam-reconciliation-commercial-tenants-audit-landlord-true-up-bill-caps-exclusions-gross-up-pro-rata-share-guide"
  - "Vantage, What is CAM True-Up? — https://www.vantagespace.com/bg/glossary/space-costing-financial-metrics/cam-true-up"
  - "City of Sierra Madre, sample insurance forms (ACORD 25 language) — https://www.sierramadreca.gov/media/2cod0vfx/sample-insurance-for-construction-contracts.pdf"
  - "BCS, certificates of insurance and additional insured risk — https://getbcs.com/blog/2011/07/30/are-you-protecting-your-company-or-putting-it-at-greater-risk"
  - "Avire, A17.1-2019 code requirements summary — https://www.avire-global.com/en-us/wp-content/uploads/sites/10/2023/09/A17-2019-Code-Requirements.pdf"
  - "KONE, two-way communication customer notice — https://www.kone.us:443/Images/kone-two-way-communication-customer-risk-notice_tcm25-18805.pdf"
  - "City of Richland, fire alarm monitoring standard — https://ci.richland.wa.us/home/showpublisheddocument/12669/637686182865130000"
  - "Fire Engineering, Increasing Your Fire Alarm Literacy — https://www.fireengineering.com/?p=252419"
---

If you run a few dozen commercial buildings with two property managers and one building engineer, you get a lot of calls that aren't urgent and a few that are. This FAQ covers which calls an AI phone and email agent can handle for you, and the rules that keep it away from the calls it shouldn't touch.

## How is this different from a residential landlord or HOA setup?

Your callers are businesses, and most answers depend on what their lease says. A residential agent mostly takes maintenance tickets and questions about rent. An HOA agent mostly answers homeowners asking about dues and rules. (Those cases are covered in [the small-landlord FAQ](/blog/tenant-calls-late-rent-and-vendor-scheduling-an-ai/) and [the HOA setup guide](/blog/setting-up-an-ai-phone-agent-for-the-homeowner/).) A commercial agent needs to know each tenant's lease terms: after-hours HVAC rates, how much notice is required, which suite can use which dock. Your calls also come from more kinds of people. Vendors, couriers, tenants' office managers, and alarm monitoring companies all call the same number.

## Can it handle after-hours HVAC and access requests?

Yes. For most portfolios this will be the most common request. Office leases often charge an hourly rate for HVAC outside building hours. Sample clauses in public lease databases show rates of $17 to $35 per hour, priced per floor or per zone, and many require 24 or 48 hours' notice. If you load each building's rate and notice rule into the agent, it can:

- Confirm the suite, zone, date, and hours
- Tell the caller the charge from their lease ("That's billed at your lease rate per zone, per hour")
- Book the override in your building automation schedule, or put it on the engineer's list if no one has connected the agent to that system
- Send a written confirmation so the charge isn't disputed later

Access requests work the same way. The agent can pass a weekend contractor visit to whoever manages badges, but it should never give out door codes or temporary credentials. Issuing those stays with a person.

## What about vendor certificates of insurance?

This is tedious work, and the agent is good at it. It can email vendors whose certificates are about to expire, follow up on a schedule, and log what comes back. One caution: the standard ACORD 25 certificate says on its face that it confers no rights on the certificate holder. Being an additional insured depends on an endorsement to the vendor's policy. The agent can collect documents and flag a missing endorsement. A person (or your insurance broker) decides whether the coverage is actually good enough.

## Can it book the loading dock and freight elevator?

Yes, as long as there's a single calendar per building that it can read and write to. Give it the rules: time slots, padding requirements for the freight elevator, the latest move-in time, and which tenants have priority. To take an illustrative example, a flex building with one dock and six tenants might get eight booking calls a week. The agent can confirm slots and send reminders. Your engineer only has to deal with conflicts, which it should flag instead of resolving on its own.

## Should it answer CAM reconciliation questions?

Only the first layer of them. CAM reconciliation is the annual true-up: tenants pay estimated shared costs all year, and afterward the landlord compares those estimates to actual expenses, then bills the shortfall or credits the overpayment. The agent can explain that process, resend a statement, give the due date, and say what the tenant's pro rata share is based on.

Once a tenant says "that charge shouldn't be in there," it's a dispute. Exclusions such as capital repairs are where the arguments happen. The agent should log the specific line item and send it to the property manager, without defending the number or commenting on it.

## Which calls must always go to a person?

These, with no exceptions:

- **Lease or rent disputes.** Default notices, abatement claims, renewal or termination talk, or any mention of an attorney.
- **Fire alarms.** If a caller reports an alarm, smoke, or fire, the agent tells them to call 911 if they haven't, then immediately pages the on-call engineer and property manager. It doesn't try to work out whether it's a false alarm. Your monitoring company still reports alarms to the fire department as it does now. The agent's job is getting your people moving.
- **Water intrusion.** Active leaks, ceiling stains spreading in real time, sprinkler discharge. The agent does a warm transfer to the engineer and gets the suite number and photos while it's connecting.
- **Elevator entrapment.** Code already requires the in-car phone to reach a staffed location, and ASME A17.1 sets time limits for a backup to pick up if the first call isn't answered. The agent will be handling calls from people outside the car, like a coworker in the lobby. It should tell them to call 911 if anyone is hurt or panicking, page your elevator contractor and engineer, and never suggest anyone try to open the doors.
- **Anything involving injury, gas smell, or security threats.**

The rule that matters most: **an escalation isn't finished until a human acknowledges it.** If the engineer doesn't answer within, say, two minutes, the agent calls the next person on the list, and keeps working down the list. An unanswered page shouldn't count as a handoff.

## How do I test it before tenants rely on it?

Make 20 scripted calls covering everything above, including tricky ones: a tenant who asks for HVAC and then mentions water on the floor, or a vendor who says the elevator "made a weird noise with someone in it." Check that the urgent detail beats the routine request every time. The [janitorial contractor FAQ](/blog/no-square-foot-quotes-no-alarm-codes-an-ai-phone/) uses a similar approach to keep alarm codes away from the agent.

## What does the workload look like?

As an illustration only: a 30-building portfolio might get 150 calls and emails a week. Maybe 60% are HVAC, access, dock bookings, and certificate follow-ups, which the agent can close. Maybe 30% need a person but can wait, like CAM questions and lease issues. Maybe a handful are emergencies. Your actual split will be different, which is why you should count before you buy.

## Homework for this week

Export last month's call log and inbox from one building. Label every item as "close," "route," or "emergency." Then write the after-hours call list in the exact order the agent should dial. If you can't fill in that list today, fix that before choosing a vendor, because no agent is safer than the people it escalates to.

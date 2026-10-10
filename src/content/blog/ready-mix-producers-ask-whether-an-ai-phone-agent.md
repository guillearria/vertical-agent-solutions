---
title: "Ready-Mix Producers Ask Whether an AI Phone Agent Can Handle Pour Orders and Rainouts"
description: "For ready-mix producers running 5 to 40 trucks: which contractor calls an AI phone and text agent can take, and which belong to your dispatcher."
pubDate: 'Oct 10 2026'
industry: trade-industrial
sources:
  - "California HCAI PIN 82, Ready Mix Concrete Placement Times (on ASTM C94-24d changes) — https://hcai.ca.gov/document/pin-82-ready-mix-concrete-placement-times"
  - "JoVE, Ready Mixed Concrete (older C94 90-minute/300-revolution guidance) — https://www.jove.com/science-education/v/16909/ready-mixed-concrete"
  - "For Construction Pros, Mastering Cold Weather Concreting (ACI 306 definition) — https://www.forconstructionpros.com/concrete/equipment-products/article/22954894/american-concrete-institute-aci-mastering-cold-weather-concrete-placement"
  - "STRUCTURE magazine, Cold and Hot Weather Concrete — https://www.structuremag.org/article/cold-and-hot-weather-concrete/"
  - "Command Alkon TrackIt — https://emea.commandalkon.com/products/trackit"
  - "Mack and WheresMyConcrete.com — https://www.forconstructionpros.com/press_release/12296318/mack-connects-customers-and-concrete-loads-with-wheresmyconcretecom"
  - "Jefferson County, MO, Ready Mix Concrete 2020 Bid Tabulation (short-load charges) — https://www.jeffcomo.gov/DocumentCenter/View/8028/Ready-Mix-Concrete-2020-Bid-Tabulation-PDF"
  - "Clay County, MO, IFB 72-22 Concrete Bid Tab Sheet (short-load charges) — https://www.claycountymo.gov/DocumentCenter/View/2393/IFB-72-22-Concrete-MoDOT-Standards-Bid-Tab-Sheet"
---

Ready-mix dispatch is mostly the same few calls over and over: "Can I get 30 yards Thursday at 7?", "Where's my truck?", "We're rained out, cancel." Mixed in are the calls that cost real money when someone guesses wrong. The questions below come up when an independent producer considers putting an AI agent (software that answers calls and texts and follows rules you set) on the dispatch line. All numbers are illustrative. Use your own.

## Which calls can the agent take with no dispatcher involved?

It can take four kinds, provided each one has a fixed script and a clear end point:

- **Pour orders against an intake list.** The agent collects the same fields every time: yardage, mix code, slump, site address and access notes, start time, spacing between trucks, and whether a pump is on site. It only offers mixes already approved for that customer or job, and it reads the order back before closing the call.
- **Will-call confirmations.** The contractor ordered "on will-call" and now calls to release the trucks. The agent checks that the order exists and confirms the release time.
- **Truck ETA checks.** The agent reads where the next truck is from your tracking system and reports it. It does not estimate.
- **Weather cancellations before your cutoff.** If your rule says cancellations must come in by, say, 5:00 a.m. for a 7:00 a.m. pour, the agent can process anything that arrives before the cutoff. Anything after it goes to a person.

## Does it decide whether a pour goes ahead in bad weather?

No. The contractor decides to cancel, and the agent records it. If a caller asks "Should we pour today?", the agent should answer that the call belongs to the contractor and the dispatcher, then transfer it. Its weather role is purely clerical: log the cancellation, apply the cutoff rule, and text a confirmation.

## What about late-season pours and admixtures?

Those calls go to a person every time. Fall is when the question changes from "Can I get my usual mix?" to "Do I need accelerator, hot water, or a non-chloride admixture?" Under ACI's current cold-weather guide, cold weather exists when the air temperature has fallen to, or is expected to fall below, 40°F during the protection period. Whether a particular slab needs a different mix is a judgment for your QC staff. Summer has the same problem in reverse with retarders and hot-weather placing. If an order mentions an admixture that isn't already on the approved mix, the agent should flag it to the dispatcher, not confirm it.

## Which other calls must skip the agent entirely?

- **Mix design and spec questions.** "Does your 4000 meet the engineer's spec?" needs someone who can read a submittal.
- **Short-load disputes and ticket disagreements.** "Your ticket says 10 yards and we came up short" is a billing and measurement argument. The same goes for disputes over short-load fees. Those fees vary a lot by producer and contract. Public bid sheets show everything from flat per-load charges to per-yard fees below a minimum, so the agent should never paraphrase your policy in the middle of a dispute.
- **Rejected loads.** A truck turned away for slump, temperature, or time involves the driver, the tester, the ticket, and possibly a credit. Agree on the timing in advance. The current ASTM C94 leaves discharge time and drum-revolution limits to the purchaser (or to the producer, if the purchaser doesn't set them), so the answer depends on the job's spec. The old "90 minutes or 300 revolutions" default no longer applies automatically.
- **Jobsite safety.** A truck stuck on a soft grade, a pump-line problem, or a person hurt. The agent transfers immediately and, if no one picks up, keeps calling down a list.

A useful test: if the honest answer begins with "It depends on the job," a person should answer it.

## What does it need to read from our dispatch software?

At minimum, it needs live access to:

1. **Customer and job records**, including the approved mixes for each job, credit status, and site notes.
2. **The order board**, so it can see open orders, will-call status, and existing commitments for each plant and hour.
3. **Truck status and location** from your telematics. Command Alkon's TrackIt, for example, shows live truck location and delivery status. Contractor apps like WheresMyConcrete already give customers live ETAs.

If your dispatch system can't share that data with outside software, the agent can only take messages. Ask your dispatch vendor whether it offers an integration interface (an API) or an existing connector before you look at any phone agent.

## Does it put orders straight onto the board?

Not at first. In the first phase, every order the agent takes should land as "pending" until a dispatcher accepts it. Once a few weeks of pending orders match what the dispatcher would have written, you can let routine repeat orders post directly. That is an internal decision you make based on your own error rate.

## What's a realistic volume for a 15-truck producer?

Here is an illustrative example. A busy morning might bring 60 calls before 9 a.m., half of them ETA checks. If the agent handles the ETA checks and the cancellations that arrive before the cutoff, the dispatcher is left with the 20 or so calls that need judgment. The point is not to cut headcount. The point is that the person who knows your mixes is no longer answering "Where's my truck?" while a pump crew waits.

## What about texting?

Text works well for confirmations ("Order #4471: 30 yd, 4000 psi, 5-inch slump, Thurs 7:00, pump on site. Reply YES to confirm"). It also gives you a written record if a contractor later says they ordered 35 yards. For the general idea of sorting call types before launch, see [AI Phone Agents at Roll-Off Dumpster Companies](/blog/ai-phone-agents-at-roll-off-dumpster-companies/). It's a different industry with the same early-morning time pressure.

## A test you can run with last week's calls

Before you talk to any vendor, pull one week of dispatch calls, or simply have the dispatcher keep a tally. Mark each call as "fixed script" (an order, will-call, ETA, or on-time cancel) or "judgment" (mix, admixture, dispute, rejection, safety). Then write your intake list and cancellation cutoff on one page. If you can't fill that page out without arguing, the agent isn't ready either. Bring the page and the tally to your dispatch software vendor and to any phone agent provider, and ask each of them to show you how it would handle three of your actual calls.

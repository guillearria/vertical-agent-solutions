---
title: "A Go/No-Go List for Limo and Black Car Fleets Adding an AI Booking Agent"
description: "Airport runs, ETA texts, prom quotes: which ones a 5-to-40-car fleet's AI agent can book alone, plus the data to wire in and five test calls to run first."
pubDate: 'Sep 5 2026'
sources:
  - "Limo Anywhere Knowledge Center, How to Set Up and Use Real-Time Flight Tracking — https://kb.limoanywhere.com/docs/how-the-set-up-and-use-real-time-flight-tracking/"
  - "Limo Anywhere, Black Car Service Software — https://www.limoanywhere.com/black-car-service-software/"
  - "eCFR, 49 CFR 37.29 Private entities providing taxi service — https://www.ecfr.gov/current/title-49/subtitle-A/part-37/subpart-B/section-37.29"
  - "ActiveProspect, TCPA text message rules — https://activeprospect.com/blog/tcpa-text-messages/"
---

If your reservation line and your dispatch line are the same phone, you know the pattern. A 6 a.m. airport pickup, a chauffeur who can't find the passenger at Terminal C, a bride's mother asking about a June Saturday, and a chargeback notice from your card processor all land on the same number, sometimes inside ten minutes.

An AI phone and text agent can take a real share of that volume. Not all of it. Sort your call types before you buy anything, because the sorting is the actual work. (For the plain-English version of what an agent is and how it differs from a chatbot, see [The Agentic Wave, Explained](/blog/the-agentic-wave-is-not-just-for-tech/).)

## Go: the agent can close these on its own

These share one trait. The correct answer already exists somewhere in your system, and reading it back accurately is the whole job.

- **Point-to-point quotes off a published zone or hourly minimum.** If Zone 3 to the airport is a fixed $95 in a sedan and $145 in an SUV (illustrative numbers, use yours), the agent quotes it, takes the card, and books it.
- **Airport pickups with a flight number.** The agent collects airline, flight number, terminal, and meet-and-greet preference, then writes them to the reservation.
- **Flight-delay reschedules.** Reservation platforms already do the math. In Limo Anywhere, for example, the pickup time updates to the flight's ETA plus whatever chauffeur offset you set, so a 12:30 flight landing at 12:35 with a 15-minute offset becomes a 12:50 pickup. The agent's job is telling the passenger what changed and confirming the car is still wanted.
- **"Where's my car?" texts.** Answered from the driver GPS feed. Highest-volume call type at most operators, and the easiest to move off a human.
- **Night-before confirmations.** Outbound text or call: chauffeur name, vehicle, pickup time, reply to confirm or change.
- **Policy questions.** Gratuity, cancellation windows, wait-time charges, car seats, luggage capacity by vehicle class.

One note on texting. Confirmations and ETA updates for a ride the customer booked are transactional messages, which sit under a lower consent standard than marketing. Attach a promotion to that same text and it becomes marketing, with a stricter written-consent requirement behind it. Keep the two streams separate.

## Slow down: these need a written rule first

Bookable by an agent, but only after you make a decision you may currently be making by feel.

- **Weddings and proms.** Multi-hour, deposit-driven, contract-driven, often with alcohol and damage-deposit terms. The agent can qualify (date, hours, passenger count, vehicle class) and collect a deposit against a fixed package. It should not improvise terms.
- **Multi-stop hourly charters.** Fine with a hard rule: four-hour minimum, overtime in 30-minute increments, tolls and parking passed through.
- **Corporate accounts with negotiated rates.** Only if the agent verifies the caller against the account record. Otherwise anyone who names a company gets contract pricing.
- **Deadhead and out-of-town trips.** Write the formula down (garage-to-garage mileage, chauffeur hours, overnight, fuel) or the agent will guess low.

Rule of thumb: if two of your own dispatchers would quote it differently, it stays in this pile until you pick one answer.

## Stop: route to a person immediately

- **Accidents and breakdowns mid-ride.** Passengers in a disabled vehicle need a human and a replacement car, in that order.
- **Intoxicated or unsafe passengers.** A judgment call with liability attached.
- **Chargeback and damage disputes.** These become evidence. Whatever the agent says gets read back to you later.
- **Wheelchair-accessible vehicle requests.** Federal rules treat limousine services like taxi service: you are not required to buy accessible automobiles, but a non-automobile vehicle you purchase must be accessible unless you demonstrate equivalent service, and refusing service to riders who can use your vehicles is prohibited outright ([49 CFR 37.29](https://www.ecfr.gov/current/title-49/subtitle-A/part-37/subpart-B/section-37.29)). A scripted "we don't have that" is a compliance risk. Route it.
- **Anything touching a livery insurance claim.** No exceptions, including "just asking."

## Wire in four things before day one

1. **Two-way access to your reservation software.** Read availability, write bookings. Read-only turns the agent into expensive voicemail.
2. **Rate zones and hourly minimums in one place.** Not a PDF, a spreadsheet, and the owner's memory.
3. **Vehicle availability by class**, including out-of-service units, so nobody sells the stretch that's in the shop.
4. **Live chauffeur ETA.** Without it, every "where's my car" call still reaches a person.

## Five test calls before you flip it on

1. Airport pickup with the flight delayed two hours. Does the agent move the time and tell the passenger?
2. Saturday in May, 7 p.m., stretch limo, none available. Does it offer an alternative or invent one?
3. Caller claims a corporate rate with no account verification. Does it hold the line?
4. "We've been in an accident." Measure seconds to a live human.
5. Wheelchair-accessible van request. Does it escalate instead of declining?

## Why your NEMT playbook doesn't transfer

Non-emergency medical transport runs on authorizations, broker trip IDs, and will-call pickups from clinics, a different rulebook with different failure modes. That workflow is covered in [When 187 Calls Hit a 12-Van NEMT Dispatch Board](/blog/when-187-calls-hit-a-12-van-nemt-dispatch-board/). Don't port that configuration onto a black car line.

## Pick the overnight shift as your pilot

Give the agent one lane to start: after-hours ETA texts and next-day confirmations, 10 p.m. to 6 a.m. Low stakes, high volume, easy to audit. Pull a week of transcripts and read every single one. Within days you'll know whether your "go" list is really a go at your company.

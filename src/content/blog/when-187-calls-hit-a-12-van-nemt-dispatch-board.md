---
title: "When 187 Calls Hit a 12-Van NEMT Dispatch Board, the AI Agent Answered First"
description: "Dialysis runs, will-calls, and \"where's my driver\" calls at a 12-van NEMT company, mapped hour by hour against what an AI phone agent can actually do."
pubDate: 'Aug 10 2026'
sources:
  - "Louisiana Medicaid Medical Transportation manual (will-call two-hour standard) — https://www.lamedicaid.com/provweb1/Providermanuals/manuals/Med_Trans/Med_Trans_10.2_11-16-21.pdf"
  - "Louisiana DHH Informational Bulletin 12-8, scheduling NEMT — https://www.ldh.la.gov/assets/docs/BayouHealth/Informational_Bulletins/12-08/IB12-8_revised_2.25.19.pdf"
  - "DOJ: Owner of Toledo-area medical transportation service found guilty of health care fraud — https://www.justice.gov/usao-ndoh/pr/owner-toledo-area-medical-transportation-service-found-guilty-healthcare-fraud"
  - "Mass. AG: Newton transportation company resolves claims of improperly billing MassHealth for wheelchair van rides — https://www.mass.gov/news/newton-transportation-company-resolves-claims-of-improperly-billing-masshealth-for-wheelchair-van-rides"
  - "Impact of Rescheduling a Missed Hemodialysis Treatment on Clinical Outcomes (Kidney Medicine) — https://www.sciencedirect.com/science/article/pii/S2590059519301773"
  - "Missed hemodialysis treatments (American Journal of Kidney Diseases) — https://www.ajkd.org/article/S0272-6386(18)30868-0/fulltext"
  - "Modivcare, WellRyde dispatch software for NEMT — https://modivcare.com/offerings/dispatch-software-for-NEMT"
  - "Modivcare, Transportation Providers/Drivers — https://www.modivcare.com/who-we-serve/transportation-provider-driver/"
  - "Bass, Berry & Sims: TCPA exemptions for healthcare companies — https://bassberry.com/news/tcpa-exemptions-for-healthcare-companies/"
  - "NAHAM checklist on FCC TCPA healthcare exemptions — https://cdn.ymaws.com/www.naham.org/resource/resmgr/FCC_TCPA_Order/NAHAM_Checklist__FCC_TCPA_Ex.pdf"
  - "Washington HCA: NEMT brokers and HIPAA business associates — https://www.hca.wa.gov/assets/billers-and-providers/brokers_hipaa_business_associates.pdf"
---

Kestrel Medical Transport is a composite: 12 vans (7 wheelchair-accessible), 16 drivers, about 95 trips a day. Roughly 60% are Medicaid brokerage trips, 25% are dialysis standing orders, and the rest is private pay and facility contracts. Two dispatchers, Rosa and Danny, share one phone line that rang 187 times last Monday. The owner, Ray, put an AI phone and text agent on that line three months ago.

Here is where it sat in the day, and where it got out of the way.

## 5:10 a.m. to 7:00 a.m., the standing-order shuffle

Dialysis standing orders are pre-approved recurring trips, so nobody calls to book them. What they generate is churn. At 5:10, a member's daughter calls to say her mother is in the hospital and won't need her Monday/Wednesday/Friday chair for two weeks.

The agent confirmed the caller against the trip record, cancelled today's leg in dispatch, and flagged the standing order for Rosa. It did not cancel the standing order. That lives on the broker's authorization, and only Rosa touches it.

At 5:44, a driver called out sick. The agent took the message and paged Danny. Rebuilding a route before dawn is a judgment call about which patients can absorb a 20-minute slip and which cannot.

## 7:15 a.m. to 10:00 a.m., 41 versions of "where's my driver"

Highest volume, lowest risk call in the business. The agent handled 38 of the 41.

It reads live vehicle status out of the dispatch system and answers in one sentence: your driver is on the way, about nine minutes out. If the van is running more than 15 minutes past the window, it says so plainly and offers a text when the driver is two minutes away.

The three it escalated: the caller was upset, the pickup was already 40 minutes late, or the caller was a clinic charge nurse rather than the passenger. Angry and institutional callers go to a human immediately.

## 10:20 a.m., a discharge planner needs a van today

She wants a wheelchair ride at 1 p.m. The agent collected the details, confirmed the drop-off, and put it in front of Danny as a pending request. It did not accept the trip.

Same-day capacity is a real-time question about whether a van can absorb 30 extra minutes without breaking three downstream pickups. Danny's call.

## 11:45 a.m., the level-of-service argument

A family member insists their father needs a wheelchair van; the trip is authorized as ambulatory. The agent took the details and handed it to Rosa without debate.

That is not politeness. Billing wheelchair or ambulette transport for patients who were ambulatory is a documented fraud pattern: a federal jury convicted a Toledo-area transport owner in 2022 for billing Medicaid for ambulette services to beneficiaries who did not use a wheelchair. Level-of-service changes route through the broker's authorization with clinical documentation. An agent that "helpfully" agrees to upgrade a ride is helping build a false claim.

## 1:30 p.m., the no-show with a clinical clock on it

A dialysis clinic calls: their patient never arrived for the morning chair, and the unit has a slot at 4.

The agent escalated in under 20 seconds. Missed hemodialysis treatments are associated with sharply higher odds of hospitalization and emergency department visits, which makes this a clinical problem wearing a scheduling costume. Rosa called the patient, learned he had fallen, and called the clinic back herself.

## 2:00 p.m. to 5:00 p.m., will-calls and tomorrow's list

Will-call return trips (the patient calls when treatment ends) are the agent's best work. It answers instantly, logs the ready time, dispatches the nearest van, and texts an ETA. Those windows are contractual: Louisiana's Medicaid rules require pickup no more than two hours after the will-call request, and other states and brokers set their own. A line that rolls to voicemail during a 3 p.m. surge burns that clock.

The agent also ran 64 outbound confirmations for Tuesday and caught 9 cancellations before a van was routed.

## Monday, counted

- Handled end to end: 118 calls and texts
- Escalated to Rosa or Danny: 41
- Human from the first ring: 28 (broker calls, facility contracts, driver issues)

## The index card of escalation rules

Escalate immediately on: same-day add-ons, any level-of-service change, a missed or late dialysis trip, authorization or eligibility questions, complaints and grievances, driver or vehicle incidents, and any request for medical detail beyond what is already in the trip record. Also escalate after a second failed attempt to understand a caller, and any time someone asks for a person.

## The compliance floor

A transport company hauling Medicaid members for a broker is a HIPAA business associate. Every layer that touches a name plus an appointment (telephony, speech-to-text, the model, the texting vendor, the recordings) needs a signed business associate agreement, plus encryption, access controls, and audit logs. Vendors who won't sign a BAA are not candidates. The same minimum-necessary thinking shapes scripts at a [dental front desk](/blog/ai-agents-for-dental-practices-where-they-actually/).

Texting carries its own rulebook. The FCC's healthcare treatment of appointment-related messages covers ride reminders sent to the number the patient gave you, with limits on content, length, frequency, and a working opt-out. "We now accept private pay, tell a friend" is marketing and falls outside it.

## What the software won't let the agent touch

Broker portals are built for humans clicking screens. Kestrel's agent writes to the dispatch system through an integration and reads broker trip data that already synced in. It cannot log into a broker portal and alter an authorization. Modivcare, for example, offers providers its own WellRyde dispatch tool for managing Modivcare trips, but what reaches your system is trip data, not permission to change what the payer approved.

## Ray's rollout order, and his permanent human list

Week one: ETA calls only, during business hours, transcripts reviewed daily. Week three: will-call intake and next-day confirmation texts. Week six: after-hours coverage for those same call types, everything else to the on-call phone. If you want the volume math behind a dispatch-heavy pilot, the [freight check-call breakdown](/blog/what-an-ai-check-call-agent-costs-a-5-person/) works through it.

Permanently human: authorizations, level of service, same-day capacity, complaints, and any call where a patient sounds unwell.

Tag one week of your inbound calls into two piles: answerable from the trip record, and requires a decision. The first pile is your pilot scope. The second tells you how many dispatchers you actually need.

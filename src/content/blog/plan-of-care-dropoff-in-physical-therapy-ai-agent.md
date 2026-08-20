---
title: "Plan-of-Care Dropoff in Physical Therapy: AI Agent vs. Coordinator vs. EMR Recalls"
description: "Monthly cost, realistic recovered visits, and breaking points for three ways a small PT or chiro clinic can rebook patients who quit halfway through care."
pubDate: 'Aug 20 2026'
sources:
  - "StrataPT payer reimbursement benchmarks — https://www.stratapt.com/benchmarks/payer-reimbursement-rates"
  - "StrataPT New York reimbursement benchmarks — https://www.stratapt.com/benchmarks/payer-reimbursement-rates/new-york"
  - "Reasons for patient no-shows and drop-offs after initial evaluation in physical therapy outpatient care (ScienceDirect) — https://www.sciencedirect.com/science/article/abs/pii/S2468781225000748"
  - "Patient No-show for Outpatient Physical Therapy: A National Survey (UNLV) — https://oasis.library.unlv.edu/thesesdissertations/2323/"
  - "WebPT appointment reminders announcement (Fierce Healthcare) — https://www.fiercehealthcare.com/healthcare/webpt-improves-practice-efficiency-and-boosts-bottom-line-appointment-reminder-software"
  - "HIPAA-compliant AI voice agent pricing and BAA tiers (Retell AI) — https://www.retellai.com/blog/10-best-hipaa-compliant-ai-voice-agents-for-healthcare-clinics"
  - "HIPAA-compliant voice AI buyer guide (Telnyx) — https://telnyx.com/resources/hipaa-compliant-voice-ai-agents"
  - "Medical receptionist salary guide — https://www.job-applications.com/salary-guide-medical-receptionist"
  - "Patient care coordinator salary (Jobted) — https://www.jobted.com/salary/patient-care-coordinator"
  - "TCPA healthcare exemption explained (Accountable HQ) — https://www.accountablehq.com/post/tcpa-healthcare-exemption-explained-rules-examples-and-compliance-tips-for-providers"
  - "TCPA exemptions for healthcare companies (Bass, Berry & Sims) — https://bassberry.com/news/tcpa-exemptions-for-healthcare-companies/"
---

A patient gets authorized for 12 visits. They come to six, feel better on a Tuesday, skip Thursday, and nobody ever calls. The authorization expires. The chart quietly closes. Multiply that by 30 patients a quarter and you have a real hole in the schedule that no marketing budget fills.

Three things can plug it: an AI phone and text agent that works your lapsed list, a human coordinator whose job is the phone, or the recall and reminder tools already sitting inside your EMR. They cost very different amounts and fail in very different places.

## First, the number that decides everything

Before comparing tools, price a single recovered visit. StrataPT's payer benchmark data puts expected reimbursement per visit at roughly $97 nationally for PT, OT, and speech practices, with state variation (about $88 in New York). Use your own average, but that's a workable placeholder.

At $95 a visit, any solution costing $600 a month has to produce about seven extra attended visits to break even. One costing $5,000 a month needs about 53. That single ratio settles most of this argument.

Also worth knowing before you set expectations: a qualitative study of PT dropoff found the reasons split roughly into access and logistics problems (about 27%), patients who improved enough (23%), patients who saw no value or thought they could self-manage (23%), other medical needs (15%), and relationship issues (12%). A phone call realistically converts the first group and some of the third. Nothing recovers the patient who genuinely got better.

## Option 1: An AI phone and text agent working the lapsed list

This is an agent that pulls patients with unused authorized visits or a gap of 10-plus days, calls them, has a short conversation, and books into open slots. If you want the plain-English version of how an agent differs from a chatbot or an automation, we covered that in [The Agentic Wave, Explained](/blog/the-agentic-wave-is-not-just-for-tech/).

**Cost.** Published vendor pricing for healthcare voice agents runs roughly $0.05 to $0.70 per call minute for do-it-yourself platforms, and roughly $300 to $2,000-plus per month for managed plans. Watch the compliance tier: Retell AI, for example, lists its HIPAA add-on at $2,000 a month and only signs a business associate agreement on higher editions. That detail can quadruple a quoted price.

**What it realistically produces.** It calls every lapsed patient, every week, without getting behind. On a list of 150 lapsed patients, expect a meaningful share to answer and a smaller share to rebook. At the break-even math above, a $700 setup only needs about eight recovered visits a month to pay for itself, which is a low bar for a list that size.

**Where it breaks.** Authorization questions. When a patient asks "do I have visits left?" or "did my referral expire?", the agent can only answer if it reads that field accurately from your system, and authorization data is messy in most clinics. Set it to state visit counts only when confident and otherwise take a message. It also breaks on emotional calls: the patient who stopped coming because their shoulder got worse needs a therapist, not a booking script.

## Option 2: A front-desk hire or patient care coordinator

**Cost.** Medical receptionists average around $19.40 an hour, roughly $40,000 a year. Patient care coordinator averages sit higher, near $50,000 in one 2025 estimate, with wide variation by source and market. Loaded with payroll taxes, benefits, and turnover, budget $4,000 to $6,000 a month.

**What it produces.** The best recall results in any clinic come from a person who knows the patients. A coordinator handles authorization renewals, calls the referring physician's office, and reads hesitation in a patient's voice.

**Where it breaks.** Recall calls are the first thing dropped when the lobby fills up. A coordinator hired to reactivate patients spends most of the day on intake, copays, and faxes. If you hire, protect the call block on the calendar or you've bought a receptionist, not a recovery program.

## Option 3: The EMR's automated reminders and recall texts

**Cost.** Usually a module on your existing platform, often a few hundred dollars a month or bundled.

**What it produces.** Reminders are genuinely good at preventing the next miss. A national survey of outpatient PT no-shows found multi-method reminders combined with a 24-hour cancellation policy correlated with about a 6% no-show rate versus roughly 14% for phone-call-only reminders. WebPT has reported customers cutting missed appointments by 10% or more with its reminders feature.

**Where it breaks.** A text is a broadcast, not a conversation. The patient who stopped coming because they're confused about their deductible will not text back. Reminders prevent dropoff; they rarely reverse it. Similar to what small gyms find with [lapsed member reactivation](/blog/filling-empty-class-spots-and-reviving-lapsed/), the win comes from an actual back-and-forth.

## The compliance floor, whichever you choose

Any vendor touching patient names, appointments, or diagnoses is a business associate. Get a signed BAA before go-live, not after the pilot. The dental version of this problem is worth reading if you want specifics on [front-desk HIPAA boundaries](/blog/ai-agents-for-dental-practices-where-they-actually/).

Separately, TCPA governs how you contact people. Healthcare messages get a narrower consent standard than marketing, but they must stay strictly informational, include opt-out, and respect frequency limits. The moment your recall text mentions a cash-pay wellness package, it's marketing and the exemption is gone.

## Hard red lines

No automated system, and no front-desk employee, should:

- Give clinical advice or interpret symptoms
- Triage pain levels or decide whether worsening pain means "come in" or "go to the ER"
- Discuss anything past appointment logistics with a spouse, adult child, or attorney who isn't the patient
- Promise coverage or quote what insurance will pay
- Argue with a patient who says stop calling

Write these into the agent's instructions as hard stops that route to a human, and test them by calling in yourself and trying to break them.

## Try it on 40 charts before you buy anything

Pull every patient with unused authorized visits and no appointment in the last three weeks. Count them. Have someone call 40 by hand over two weeks and log what happened: booked, wrong number, declined, needs a therapist callback. That single list tells you your real conversion rate, your real per-visit value, and whether the volume justifies software, a hire, or just a better Friday afternoon habit.

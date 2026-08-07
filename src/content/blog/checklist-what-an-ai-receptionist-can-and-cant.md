---
title: "Checklist: What an AI Receptionist Can and Can't Handle at a Therapy Practice"
description: "A call-by-call checklist for solo counselors and group practices weighing an AI receptionist, with a crisis escalation script and pre-launch test calls."
pubDate: 'Aug 7 2026'
sources:
  - "Senate Finance Committee secret shopper study on ghost networks — https://www.finance.senate.gov/chairmans-news/wyden-calls-for-action-to-get-rid-of-ghost-networks-releases-secret-shopper-study"
  - "HIPAA Journal, February 16, 2026 compliance deadline for the Part 2 final rule — https://www.hipaajournal.com/february-16-2026-compliance-deadline-part-2-final-rule/"
  - "HHS, Understanding Confidentiality of Substance Use Disorder Patient Records — https://www.hhs.gov/hipaa/part-2/index.html"
  - "Baker Donelson, Illinois Passes Extensive Law Regulating AI in Behavioral Health — https://www.bakerdonelson.com/illinois-passes-extensive-law-regulating-ai-in-behavioral-health"
  - "Taft Law, New Illinois Law Restricts AI Use in Therapy Sessions — https://www.taftlaw.com/news-events/law-bulletins/new-illinois-law-restricts-ai-use-in-therapy-sessions/"
  - "Wilson Sonsini, Nevada Passes Law Limiting AI Use for Mental and Behavioral Healthcare — https://www.wsgr.com/en/insights/nevada-passes-law-limiting-ai-use-for-mental-and-behavioral-healthcare.html"
  - "Cooley, AI Chatbots at the Crossroads (Utah HB 452) — https://www.cooley.com/news/insight/2025/2025-10-21-ai-chatbots-at-the-crossroads-navigating-new-laws-and-compliance-risks"
  - "SAMHSA, 988 Suicide & Crisis Lifeline FAQs — https://www.samhsa.gov/mental-health/988/faqs"
  - "Recording Law, Two-Party Consent States (2026) — https://www.recordinglaw.com/party-two-party-consent-states/"
---

A Senate Finance Committee secret shopper study of Medicare Advantage mental health directories found that staff could book an appointment only 18% of the time across 120 calls, and a third of the listings had bad numbers or calls that were never returned. That is the problem a lot of practice owners are trying to solve when they look at an AI receptionist: people in distress call, nobody picks up, and they don't call back.

An AI phone agent can fix part of that. It can also do real damage on the wrong call. Below is a sorting list you can work through in an afternoon, plus the tests to run before you turn anything on.

## Green light: work the agent can carry end to end

- [ ] **New-client inquiry intake.** Name, callback number, what they're looking for in plain language, insurance carrier, availability, preferred modality (in person or telehealth). Collect, don't evaluate.
- [ ] **Waitlist screening on logistics only.** Does the caller live in a state where you're licensed? Are they seeking an age group or specialty you serve? Can they do daytime sessions? These are administrative filters, not clinical ones.
- [ ] **Insurance and EAP verification.** The agent captures member ID and group number, runs the eligibility check, and reports the result as an estimate. EAP authorizations (session counts, authorization numbers, expiration dates) are ideal for this: tedious, fully rule-based, and expensive in staff time.
- [ ] **Appointment reminders and cancellation backfill.** When a Thursday 4 p.m. opens up, the agent calls or texts the three clients who asked for that slot, in order, and books the first yes.
- [ ] **Superbill and copay follow-up.** Resending a superbill, confirming a card on file, answering "what did I pay in March."
- [ ] **No-show fee reminders.** Stating a policy the client already signed is administrative. Waiving the fee is a judgment call, so route those to you.
- [ ] **Directions, parking, telehealth link resends, intake paperwork nudges.** Unglamorous and high volume.

## Red line: calls the agent must never attempt

- [ ] **Anything resembling assessment or triage.** No symptom questions, no severity scales, no "how long have you been feeling this way." Once the agent asks a clinical question it is practicing, not answering phones.
- [ ] **Crisis calls.** Suicidal ideation, self-harm, overdose, threats toward another person, active abuse disclosures. Script below.
- [ ] **Diagnosis or medication questions.** "Is 20mg too much?" and "should I stop taking this before my appointment?" go to the prescriber, full stop. This matters most in psychiatry and medication-assisted treatment programs.
- [ ] **Minors' consent and custody.** Who can authorize treatment for a 15-year-old varies by state and by the specific service, and a custody order can override the parent who is calling. Every one of these is a human call.
- [ ] **Confirming that anyone is a client.** For programs covered by 42 CFR Part 2, the federal rule on substance use disorder records, even acknowledging that a person is enrolled can be a disclosure. The 2024 final rule aligned Part 2 more closely with HIPAA and carried a February 16, 2026 compliance deadline, but the consent requirements are still stricter than HIPAA. An agent that says "yes, he has an appointment Tuesday" to a spouse has created a violation.

## Check your state before you shop

Three states now regulate AI in behavioral health directly. Illinois signed the Wellness and Oversight for Psychological Resources Act in August 2025, banning AI from delivering therapy or making clinical decisions, with penalties up to $10,000 per violation. It explicitly permits administrative uses like scheduling, billing, and eligibility verification. Nevada's AB 406 (effective July 2025) prohibits offering AI systems that provide or claim to provide professional mental or behavioral health care. Utah's HB 452 (effective May 2025) takes a disclosure approach for mental health chatbots. Read your state's version, not a summary, before signing anything.

## The escalation script, written down before launch

Give your vendor trigger words and a verbatim response. Something like:

> "I'm an automated assistant, and I'm not able to help with this. If you're in immediate danger, please hang up and call 911. You can also reach the 988 Suicide and Crisis Lifeline any time by calling or texting 988. I'm connecting you with a person right now."

Then a warm transfer to the on-call clinician, and a fallback to a live answering service if nobody picks up within a set number of rings. The agent asks no follow-up questions. Put 988 in your after-hours greeting too, before the agent starts talking.

## Three calls to place yourself before go-live

1. **The crisis call.** Say a sentence a distressed caller would actually say. Confirm the exact wording, the transfer, and the fallback if the clinician's phone is off.
2. **The confused caller.** Talk over the agent, change your mind about the appointment time, mention a medication, trail off mid-sentence. You're checking whether it hands off or keeps improvising.
3. **The duplicate booking.** Book a slot, then call back and book the same one under a different name. Then cancel through the agent and confirm the slot reopens in your actual calendar, not just in the agent's log.

Run all three again after any change to your scheduling software.

## Paperwork worth ten minutes

Get a signed business associate agreement before a single call routes through the vendor, and ask three questions the standard agreement often leaves vague: how long call audio and transcripts are retained, which subprocessors touch them, and whether your calls are used to train models. (Our [dental front desk post](/blog/ai-agents-for-dental-practices-where-they-actually/) covers the general HIPAA vendor terrain.) Separately, if you're recording calls, twelve states require all parties to consent, including California, Illinois, Florida, Massachusetts, Pennsylvania, and Washington. The safest setting for a behavioral health practice is to transcribe without retaining audio.

## Telling clients, without making it weird

Say it once, plainly, in your intake packet and on your voicemail greeting: an automated assistant answers scheduling and billing calls, a person handles everything clinical, and here's how to reach a person immediately. Clients tolerate automation on logistics. What breaks trust is discovering it after the fact, or feeling handled by a machine during a hard moment. The same instinct applies to any practice where callers arrive upset, which is why [funeral homes draw similar lines](/blog/would-an-ai-answer-a-grieving-familys-call-where/).

## What to do with this list

Pull your last 50 inbound calls and sort each one into the green column, the red column, or neither. If fewer than half land in green, an AI receptionist won't earn its keep at your practice yet. If most of them do, take that list to a vendor demo and make them run your crisis script live, on the call, before you talk about price.

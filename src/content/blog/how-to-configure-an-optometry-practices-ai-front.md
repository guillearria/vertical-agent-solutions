---
title: "How to Configure an Optometry Practice's AI Front-Desk Agent, From Recall Calls to Retinal Emergencies"
description: "Optometry front desks field the same four calls all day. Set up recalls, lab status, reorders, and benefits questions with hard rules for eye emergencies."
pubDate: 'Aug 30 2026'
sources:
  - "FTC, The Contact Lens Rule: A Guide for Prescribers and Sellers — https://www.ftc.gov/business-guidance/resources/contact-lens-rule-guide-prescribers-sellers"
  - "FTC, FAQs: Complying with the Contact Lens Rule — https://www.ftc.gov/business-guidance/resources/faqs-complying-contact-lens-rule"
  - "eCFR, 16 CFR 315.6, Expiration of contact lens prescriptions — https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-315/section-315.6"
  - "American Academy of Ophthalmology, What Are Floaters and Flashes? — https://www.aao.org/eye-health/diseases/what-are-floaters-flashes"
  - "American Academy of Ophthalmology, Detached Retina — https://www.aao.org/eye-health/diseases/detached-torn-retina"
  - "Mayo Clinic, Chemical splash in the eye: First aid — https://www.mayoclinic.org/first-aid/first-aid-eye-emergency/basics/art-20056647"
  - "HIPAA Journal, HIPAA Business Associate Agreement — https://www.hipaajournal.com/hipaa-business-associate-agreement/"
  - "RevolutionEHR — https://www.revolutionehr.com/"
  - "Crystal Practice Management — https://www.crystalpm.com/"
---

An optical office phone rings with a narrow set of questions, and they repeat all day. Somebody wants to know if their glasses came back from the lab. Somebody's contacts ran out. Somebody got a postcard about their annual exam. Meanwhile one person at the front desk is checking in a patient, pretreating a claim, and adjusting a pair of frames.

That repetition is exactly what an AI phone and text agent handles well. What follows is the configuration order that keeps the agent useful and out of clinical territory. (If you want the plain-English version of what an agent actually is, start with [this explainer](/blog/the-agentic-wave-is-not-just-for-tech/).)

## 1. Tally one week of calls into four buckets

Before anyone writes a script, have the front desk make tick marks for five business days across four categories:

- **Exam scheduling and recalls** (new patients, annual returns, reschedules)
- **"Is my order ready?"** (glasses, contacts, repairs, warranty remakes)
- **Contact lens reorders and prescription questions**
- **Insurance** (VSP or EyeMed benefits, whether a visit goes to medical)

One bucket usually dominates. That bucket is what you configure first. Everything else goes to a human for the first month.

## 2. Decide exactly what the agent can read

Your agent is only as useful as its view into your practice management system: RevolutionEHR, Crystal PM, Compulink, Eyefinity OfficeMate, or whatever runs your schedule. For launch, read-only access to five things covers most calls:

1. Open appointment slots by exam type and doctor
2. Patient lookup by name, date of birth, and phone number
3. Last exam date and recall due date
4. Lab job status (at lab, received, ready, dispensed)
5. Contact lens prescription expiration date, plus last order brand and parameters

Give it one write permission at first: book, reschedule, or cancel an appointment, and leave a task for staff. If your system has no usable connection, a nightly export of order status and recall lists still covers the two highest-volume buckets.

## 3. Write the sentences it is allowed to say

Do not let a vendor "figure out the phrasing." Approve the language yourself, especially in two places.

**Coverage.** The agent confirms which plan is on file and stops there. Approved: "Your chart shows EyeMed. I'll book you, and our staff will verify your benefits before the visit." Forbidden: quoting a copay, promising a frame allowance, or saying anything is covered. Vision plans pay for routine exams and materials, while medical plans cover visits driven by a diagnosis such as conjunctivitis or diabetic eye disease. That split is a billing decision your staff makes, not a phone script.

**Expired prescriptions.** Approved: "Your contact lens prescription expired on March 12, so the doctor needs to see you before we can fill a reorder. I have Thursday at 2:15." The FTC's Contact Lens Rule sets a floor of one year unless there is a documented medical reason for a shorter date, so "expired" is a date lookup, not a judgment call. The agent should never extend, interpret, or read out prescription parameters over the phone.

One more rule worth hard-coding: if a caller describes symptoms while booking a "routine exam," the agent stops offering routine slots and hands the call to staff. That is where vision-versus-medical billing goes wrong.

## 4. Set the escalation red lines

Four categories must reach a human immediately, with no menu, no callback promise, and no voicemail:

- Sudden vision loss, or a curtain or shadow across the vision
- New flashes of light or a sudden shower of floaters (the American Academy of Ophthalmology says to call an ophthalmologist immediately about sudden flashing lights, because these can signal a retinal tear or detachment)
- Eye trauma, including anything embedded in the eye
- Chemical exposure of any kind

Build these as keyword and phrase triggers that fire at any point in a call, including mid-booking. During office hours: warm transfer, with the agent staying on the line until someone picks up. After hours: the on-call doctor's cell. If nobody answers within your set number of rings, the agent gives one line your doctor approved, typically directing the caller to the nearest emergency room. Chemical splashes need immediate flushing and emergency care per Mayo Clinic first aid guidance, and that is not a script you want software improvising.

## 5. Sign the BAA before it hears a single name

A vendor whose system receives patient names, phone numbers, and reasons for calling is a business associate under HIPAA, and the agreement needs to be signed before it handles live calls. Ask where recordings and transcripts live, how long they are retained, which subprocessors sit underneath the vendor, and whether your call data trains models. The [dental front-desk post](/blog/ai-agents-for-dental-practices-where-they-actually/) goes deeper on the paperwork, and the [pharmacy refill post](/blog/is-it-ready-yet-what-an-ai-phone-agent-can-legally/) covers the same tension between speed and disclosure.

## 6. Run twelve test calls before you go live

Call your own number and score each outcome, pass or fail:

1. New patient booking an annual exam
2. Existing patient rescheduling
3. "Are my glasses ready?" with the order still at the lab
4. Same question, order ready for pickup
5. Contact reorder, prescription valid
6. Contact reorder, prescription expired eight months ago
7. "Does VSP cover my son's second pair?"
8. "My eye is red and goopy" (routes to staff, does not book routine)
9. Flashes and floaters dropped mid-booking (triggers transfer)
10. Chemical splash at 9 p.m. (reaches the on-call doctor)
11. A spouse asking for someone else's prescription
12. "Just let me talk to a person"

Fix failures before launch, then listen to every recording for the first two weeks. Older patients are a common worry here, and the [audiology clinic post](/blog/ai-receptionist-for-audiology-clinics-do-older/) covers what actually shows up in the hang-up data.

## The tally to run this week

Start with the five days of tick marks. Two numbers matter: how many calls landed in your biggest bucket, and how many of those needed a doctor's judgment. If the first number is large and the second is small, you have a clean job for an agent, and you will walk into vendor demos knowing precisely what to ask them to prove.

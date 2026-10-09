---
title: "\"Is Biscuit Still Available?\" An Animal Rescue's AI Phone Agent on Adoption Day"
description: "Follow a 6-staff animal rescue through an adoption-event Saturday as an AI phone agent fields pet availability, fees, surrenders, and stray reports."
pubDate: 'Oct 9 2026'
industry: education-nonprofits
sources:
  - "Shelter Animals Count, Shelterluv API availability — https://www.shelteranimalscount.org/shelterluv/"
  - "Doobert, Importing your animals from Shelterluv (API key location) — https://doobert.com/importing-your-animals-from-shelterluv"
  - "PetPress WordPress plugin (PetPoint web services and authorization key, on-hold option) — https://wordpress.org/plugins/petpress/"
  - "Petpoint Webservices project on GitHub — https://github.com/PRDeltoid/Petpoint-Webservices"
  - "Town of Westford, MA, animal bite reporting — https://westfordma.gov/DocumentCenter/View/3477"
  - "West Windsor Township, NJ, Animal Bites (12-hour reporting) — https://www.westwindsortwp.gov/departments/police/animal_control/animal_bites.php"
---

*Riverbend Animal Rescue is a composite. It's built from the way mid-sized independent shelters typically run, and every number below is illustrative, not taken from a real organization.*

Riverbend has six paid staff, about forty active volunteers, and one front-desk phone. On a normal Saturday that phone rings far more often than one person can answer while also checking in adopters. On the October adoption event it got worse. Fees were cut in half, a local TV station had run a segment on Friday, and by 9:15 a.m. the line had been ringing for twenty minutes straight.

That spring, the director had put an AI phone and text agent on the main number. This is how it handled that Saturday.

## The rules came first, written by the director

Before the agent took a single call, the director wrote a one-page rulebook. It was not technical. It was a list of situations, each with one of two instructions: **answer it** or **hand it to a person now**.

**Answer it:**
- Hours, directions, parking, and the event schedule
- Whether a specific listed animal is still available, read live from the shelter software
- Adoption fees, including the event discount and what the fee covers
- Where an existing application stands (received, under review, approved, waiting on a landlord check)
- Volunteer orientation dates, plus booking a seat
- Donation drop-off: what is accepted, what isn't, and where to leave it

**Hand to a person now:**
- Anyone wanting to surrender an animal
- Found strays
- Any bite, injury, or cruelty or neglect report
- A lost-pet caller, especially one who sounds upset
- Any mention of euthanasia, from any direction
- Anyone who asks for a human, at any point

The rule beneath everything: when the agent isn't sure which list a call belongs on, it treats it as a handoff. A warm transfer meant the call went to the staff member carrying the "hot phone" that day, along with a two-line summary texted ahead. If nobody picked up within 30 seconds, the agent took a callback number and flagged the call as urgent.

## What it closed alone

Between 9 a.m. and 5 p.m. the line took 212 calls and texts. The agent finished 164 of them without involving anyone.

Most were the questions any shelter will recognize. "Are you open until five?" "Is the fee really $50 today?" "Is Biscuit still there?" On that last one, the agent checked the shelter's records while the caller waited: Biscuit, a three-year-old hound mix, was available. It texted the caller his listing link and the online application.

Application-status calls were the biggest relief for staff. Thirty-one people called to ask whether their applications had been reviewed. Before the agent, every one of those calls meant a staffer stopping mid-adoption to dig through a file. Volunteer orientation added 14 bookings. Nineteen callers wanted to know whether the rescue would take an open bag of kibble (yes) or a used crate (yes, if it's clean) or a couch (no).

## What it handed off, and how quickly

Thirty-eight calls went to a human. Ten more were hang-ups or wrong numbers.

The handoffs were the calls where a wrong answer costs something real. A man said his landlord was making him rehome two cats by the end of the month. That's an owner surrender, so it was transferred within seconds. A woman had found a dog with no collar on a county road, and she went to a staffer who knows the local stray-hold process. A father said a neighbor's dog had bitten his son. The agent passed him straight to the director, because bite reporting depends on local rules (some areas route it to animal control, others to the health department, and some set deadlines measured in hours), and nobody wanted software guessing at that.

One caller was crying because her dog had slipped out of the yard that morning. The agent said a person would be right with her and transferred the call. It didn't stop to collect her pet's description first. The staff member could get that.

## The mistake, and the rule that fixed it

At 1:40 p.m. a woman called to ask about adoption fees for cats. Partway through she said, "We're thinking about it because we might have to give up our older cat soon, and we'd want a new one for the kids later."

The agent answered the fee question and moved on. Buried in a question about adopting was a likely surrender, and it never got flagged. A staffer only caught it on Monday while reviewing transcripts, and called the family back.

The director added two lines to the rulebook. First, words like "give up," "rehome," "can't keep," and "have to get rid of" now trigger a handoff even if they come up halfway through an unrelated call. Second, staff now spend 15 minutes every Monday reading the agent's transcripts, looking for anything that should have been handed off. Spot-checking like this is how most of these rulebooks improve. The [church office triage list](/blog/if-the-caller-is-grieving-the-ai-agent-stops/) works the same way for grief calls that start out sounding routine.

## Connect the shelter software before launch

Every answer about whether a pet is available depends on the agent reading the same records staff use. Riverbend runs on Shelterluv, which has an API (a data connection other software can pull from) that the shelter turns on in its settings. Shelters on PetPoint have a similar option: PetPoint support has to enable its web services, and that produces a key the agent's vendor can use.

Two details matter more than people expect:

- **How often it syncs.** If the agent pulls data hourly, it will spend that hour telling callers about a dog adopted at 10:05. Ask the vendor to look up each animal live during the call, or to sync every few minutes.
- **Holds and pending applications.** An animal that is "on hold" isn't simply "available." Riverbend's agent now says, "She has a pending application, but you can apply as a backup."

Without that connection, the agent is reading a stale list. Callers will drive across town for a cat that went home yesterday, which is worse than no agent at all.

## Before you sign with a vendor

Write your own two-column rulebook this week, using your last month of phone messages as the source. Then ask any phone-agent vendor you're considering to show you a live lookup in Shelterluv, PetPoint, or whatever system you run, and to demonstrate a mid-call handoff on a surrender buried inside an adoption question. If the voice side looks like more than your team can handle right now, the [30-day nonprofit plan for donor and volunteer email](/blog/a-30-day-plan-for-nonprofits-that-want-an-ai-agent/) is a gentler place to start.

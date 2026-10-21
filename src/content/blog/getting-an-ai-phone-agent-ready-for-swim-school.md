---
title: "Getting an AI Phone Agent Ready for Swim School Enrollment Week and Makeup Calls"
description: "Swim school owners: connect your class software, script level placement and makeup credits, set handoff rules, and run five test calls before launch."
pubDate: 'Oct 21 2026'
industry: education-nonprofits
sources:
  - "Jackrabbit Class: Parent and family experience — https://www.jackrabbitclass.com/features/parent-family-experience/"
  - "Capterra: Jackrabbit Swim reviews — https://www.capterra.co.uk/reviews/172589/jackrabbit-swim"
  - "Supergood: Jackrabbit Technologies API report card — https://supergood.ai/api-report-card/jackrabbit-technologies"
  - "Supergood: Jackrabbit Technologies API docs — https://supergood.ai/docs/jackrabbit-technologies-api"
  - "iClassPro blog (Autopilot waitlist and makeup token workflows) — https://iclasspro.com/iclasspro-blog"
  - "Emler Swim School: iClassPro makeup tokens — https://emlerswimschool.com/?p=128479"
  - "DeMont Family Swim School policies — https://demontswim.com/wp-content/uploads/2024/04/Welcome-and-Policies.pdf"
  - "Glennie Aquatics FAQs — https://aquatic.glennie.qld.edu.au/faqs"
  - "EMS1: CDC finds drowning deaths on the rise in the U.S. — https://www.ems1.com/drowning/cdc-finds-drowning-deaths-on-the-rise-in-the-u-s"
---

At a swim school, most of the phone traffic shows up in two waves. The first comes when session enrollment opens and every returning family wants the same Saturday 9 a.m. slot. The second comes on makeup days, after a closure or a week of colds, when parents call to use their credits. This guide is for independent schools with one or two pools and roughly 300 to 1,500 enrolled swimmers. It walks through setting up a phone agent so it takes those two waves without making promises your pool can't keep.

To make it concrete, picture a school with 900 swimmers that gets about 220 calls in the first two days of enrollment. Most of those are some version of "Is there room in Level 3 on Tuesdays?" (These numbers are made up to show scale. Use your own call log.)

## Step 1: Connect your class software, starting with read-only access

The agent can only answer "Is there room?" correctly if it can see your schedule. That means connecting it to your class management software (Jackrabbit, iClassPro, or whatever you run) comes before anything else.

Expect this to take some digging. One third-party review of Jackrabbit says it has no self-serve public API, which is the standard way for one program to talk to another. Its connection options are website widgets, a Zapier connector, and a class feed you request from its team. iClassPro and other platforms have their own rules. Before you sign with any phone-agent vendor, ask two questions:

- Can your agent read live openings from my software, or only a copy that I upload by hand?
- Can it write anything back, such as a waitlist entry or a makeup booking, or does it only take a message?

Start with read-only access. If the agent can see openings but can't enroll anyone, the worst it can do is give a parent wrong information. Once you trust it, you can let it put a family on a waitlist or send them a registration link.

## Step 2: Have it ask placement questions instead of guessing levels

"My daughter is six and can float. What level is she?" Callers will ask this constantly. The agent should never assign a level on its own judgment. Give it your placement questions word for word, the same ones your front desk uses: Can the child put their face in the water? Swim a set distance unassisted? Tread water? Then let it map the answers to a *suggested* level, labeled that way, and add one more line: "Our instructors confirm placement in the first lesson."

If your school requires an in-water assessment for new swimmers, have the agent book that assessment and skip the guess.

## Step 3: Script makeup credits and waitlists

Makeup policies vary a lot. Some schools allow two makeups a month, some cap them per term, and some let tokens expire after six months. iClassPro, for example, offers automated workflows for waitlists and for expiring makeup tokens. Whatever your rules are, write them out in plain sentences so the agent can repeat them exactly:

- How many credits a swimmer gets, and when they expire.
- How far ahead a makeup can be booked.
- Whether a makeup can take a spot that a waitlisted family is waiting for.

Settle that last question before launch, because it causes the most arguments. The agent should be able to tell a caller their place in line, if your software exposes it, and what happens when a spot opens. It should never hint that a spot is "probably" coming.

## Step 4: Load pool-closure notices before the calls start

When a heater fails or the pool has a fecal incident and has to close, parents call within minutes. Set up one place where you or your manager types the closure notice: what's closed, until when, and how credits will be handled. The agent reads from that and nothing else. If no notice is posted, it should say it will have someone call back. It shouldn't guess why the pool is closed.

## Step 5: Decide which calls skip the agent entirely

Some calls should transfer to a live person immediately, with no menu and no "Can I get your account number first?":

- **Any report of a child injured, pulled from the water, or nearly drowning.** That includes a parent calling hours later about coughing or tiredness after a lesson. Drowning is the leading cause of death for U.S. children ages 1 to 4, according to CDC data. Your agent should not handle these calls. If nobody answers the transfer, it should tell the caller to call 911 for anything happening right now, then page the owner.
- **Custody and pickup disputes.** "Her father isn't allowed to pick her up" is a safety and legal matter, and staff need to handle it directly.
- **Special-needs accommodation requests.** Questions about autism, sensory needs, or a physical disability deserve a conversation with someone who can actually make the arrangement.

The [daycare post on enrollment calls versus incident reports](/blog/ai-agents-for-daycare-centers-yes-to-enrollment/) draws a similar line for a nearby industry. If you're also running summer programs, the [summer camp registration questions](/blog/summer-camp-directors-questions-about-letting-ai/) overlap a lot with this one.

## Five test calls before launch

Have a staff member or a friend call the agent and play each of these parents:

1. **The returning family:** "Is there still room in Level 2 Thursday at 4:30?" Check the answer against your software in real time.
2. **The new swimmer:** a nervous parent of a five-year-old who has never been in a pool. Did the agent ask your placement questions and avoid naming a level as final?
3. **The expired credit:** someone trying to use a makeup token that expired last week. Did it quote your policy correctly and stay polite?
4. **The closure caller:** the morning of a closure you've posted. Then repeat the call with no notice posted and confirm it doesn't make up a reason.
5. **The emergency:** "My son was coughing badly after his lesson and now he's really sleepy." It should transfer within seconds. Time it.

Listen to the recordings yourself, not just a summary of them.

## Before the next session opens

Pick a date two weeks before your next enrollment opens. Before that date, get a straight answer from your class software company about what a phone agent can connect to. Write your makeup policy in five sentences or fewer, and list the names and numbers that emergency transfers will ring. If you're still comparing costs, this [breakdown for dance studios and martial arts schools](/blog/ai-receptionist-cost-for-a-dance-studio-or-martial/) works with similar enrollment sizes.

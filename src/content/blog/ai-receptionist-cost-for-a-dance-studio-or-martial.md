---
title: "AI Receptionist Cost for a Dance Studio or Martial Arts School, Broken Down by Enrollment"
description: "Full-stack pricing for studios with 150 to 600 students: agent fees, telephony, setup, software wiring, and the break-even math in recovered trial enrollments."
pubDate: 'Sep 16 2026'
industry: education-nonprofits
sources:
  - "AI Receptionist Pricing 2026 (AgentZap) — https://agentzap.ai/blog/ai-receptionist-pricing-complete-guide-2026"
  - "AI Receptionist Pricing 2026: Vendor Rates (CloudNSite) — https://cloudnsite.com/blog/ai-receptionist-pricing"
  - "Twilio Voice Pricing 2026 (IDT Express) — https://www.idtexpress.com/blog/twilio-pricing-explained-how-to-reduce-voice-costs/"
  - "Pike13 Developer Center — https://www.pike13.com/api-developer-center"
  - "Pike13 Core API Documentation — https://developer.pike13.com/docs/api/v2"
  - "Jackrabbit Class Pricing — https://www.jackrabbitclass.com/pricing/"
  - "Jackrabbit Class Partner Marketplace — https://www.jackrabbitclass.com/partner-marketplace/"
  - "Kicksite Martial Arts Management Software — https://kicksite.com/martial-arts-management-software/"
  - "DanceStudio-Pro integrations overview (Activity Messenger) — https://activitymessenger.com/blog/12-dance-studio-pro-alternatives-in-depth-comparison/"
  - "Zapier Pricing 2026 (No Code MBA) — https://www.nocode.mba/articles/zapier-pricing-2026"
  - "Dance Class Pricing Guide 2026 (Dance Studio Journal) — https://dancestudiojournal.com/how-much-to-charge-for-dance-classes-in-2026/"
  - "Involuntary Churn benchmarks (Baremetrics) — https://baremetrics.com/blog/involuntary-churn"
  - "FTC Finalizes Changes to Children's Privacy Rule — https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-changes-childrens-privacy-rule-limiting-companies-ability-monetize-kids-data"
  - "COPPA Rule Update Now in Effect (Koley Jessen) — https://www.koleyjessen.com/insights/publications/ftcs-strengthened-childrens-online-privacy-rules-now-in-effect"
---

Registration week at a 300-student studio looks like this: the phone rings during the 4:30 class, nobody is at the desk, and the parent who called about Tuesday beginner hip-hop books a trial at the studio two towns over instead. Meanwhile eleven autopay charges failed overnight and the owner will get to them Sunday.

That is the problem an AI receptionist is being hired to solve. Here is what it actually costs, and how many students it has to keep for the number to work.

## The four lines on the bill

**1. The agent subscription.** Vendor pricing in 2026 falls into a few bands. Per-minute plans run roughly $0.25 to $0.48 a minute. Flat monthly plans for a small business typically land between $149 and $299, with cheaper capped tiers around $25 to $65 and premium custom builds well above $400.

Do the arithmetic both ways. A studio taking 400 calls a month averaging 2.5 minutes is 1,000 minutes. At $0.30 a minute that is $300, and September will be double. A flat plan is usually the safer buy for a business with a brutal seasonal spike, because your worst month is the one you can't afford a surprise in.

**2. Telephony.** This is the smallest line and the one people forget. A US local number on Twilio runs about $1.15 a month, with inbound local minutes at roughly $0.0085. Some vendors bundle this; some pass it through. Either way it's dollars, not hundreds.

**3. Setup.** Self-serve products charge nothing and you write the script yourself. Anything involving a custom voice, a knowledge base built from your handbook, and live call testing gets quoted as a one-time onboarding fee. Ask for that number in writing before you sign, and ask what a change costs in November when you add a competition team.

**4. The wiring into your studio software.** This is where the quotes diverge, and it depends entirely on which platform you run.

## What integration costs by platform

- **Pike13** publishes a real developer program: a Core API for client and enrollment actions, a Reporting API, a Webhooks API, and OAuth2 authentication. An agent that checks live class capacity and writes a trial booking back into Pike13 is a normal build here.
- **Jackrabbit Class** has an API and a partner marketplace. Jackrabbit prices its own subscription by student count, from $49 a month under 100 students to $129 at 251 to 500. Partners set their own rates and bill separately, except Jackrabbit Plus and Twilio, which appear on the Jackrabbit invoice.
- **Kicksite** added a free Zapier integration, which opens up automation without custom development.
- **DanceStudio-Pro** publishes Zapier connections plus integrations with tools like Keap, QuickBooks, and Xero, rather than an open developer API of the Pike13 kind.

Zapier-based plumbing is cheaper but slower. Expect around $20 to $30 a month for a Professional plan at the entry task tier, and accept that a Zap firing a few minutes after the call ended is fine for "text this parent the registration link" and wrong for "is there room in Tuesday 4:30 right now."

Plan on $350 to $600 a month all-in for a studio in this size range, plus a one-time setup charge, plus whatever your management software already costs.

## Break-even in students, not percentages

Price a student, not a percentage. A common structure: $95 a month for one weekly class across a nine-month season is $855, plus a recital or testing fee around $95 and a costume or uniform charge. Call it $1,000 a year in tuition value per enrolled student, and use your own figure instead of mine.

At $500 a month, the agent costs $6,000 a year. Six recovered enrollments pay for it. Two of those can come from trial requests that arrive at 8:40 p.m. after the last class, which is exactly when parents shop. Speed matters more than polish here, a point we've made about [five-minute lead response](/blog/ai-agents-for-realtors-where-they-actually-help/) in other industries.

The quieter half is failed autopay. Estimates of recurring-payment failure rates vary widely, from about 7 to 10 percent in some analyses up to a mid-teens average in others, and expired cards drive a large share. At 300 students, even the low end is roughly 20 failed charges a month. An agent that texts the parent the same morning, explains the decline, and sends a secure update link recovers tuition that otherwise turns into a silent departure. Two saved students a season is another $2,000. Studios running membership models will recognize the pattern from [lapsed-member outreach at small gyms](/blog/filling-empty-class-spots-and-reviving-lapsed/).

## Three calls the agent should never finish

- **A parent quitting mid-season.** That call is a retention conversation and belongs to the owner. The agent takes the reason, flags it urgent, and gets out of the way.
- **Injury or behavior incidents.** Nobody's child should be discussed by an automated system. Same reasoning applies to [incident reports at daycare centers](/blog/ai-agents-for-daycare-centers-yes-to-enrollment/).
- **Anything touching a minor's record or pickup authorization.** Adding a name to a pickup list, changing an emergency contact, releasing a child to a non-custodial adult: human, verified in person or against your system of record. Also note that the FTC's amended children's privacy rule took effect in June 2025 with a full compliance deadline of April 22, 2026, so if your vendor is collecting kids' information through a website chat widget, that belongs in the contract conversation.

## Four numbers to pull this week

Open your phone log and count last September's calls and average length. Open your billing report and count failed charges over the past three months. Open your CRM and count trial requests that never got a callback. Multiply that last number by your annual tuition value per student.

If that figure clears $6,000, you have a business case. If it doesn't, you have a cheaper problem than you thought.

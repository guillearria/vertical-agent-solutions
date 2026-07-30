---
title: "Three Ways to Clear a Machine Shop's RFQ Inbox (and What Each One Gets Wrong)"
description: "Speed-to-quote, monthly cost, and failure modes for three ways a 5–50 person machine shop can handle RFQ intake: an AI agent, a part-timer, or you."
pubDate: 'Jul 30 2026'
sources:
  - "The Fabricator — 5 steps to faster quoting in the job shop — https://www.thefabricator.com/thefabricator/article/shopmanagement/5-steps-to-faster-quoting-in-the-job-shop"
  - "CNCCookbook — Machine Shop Quoting + Cost Estimation survey results — https://www.cnccookbook.com/job-quote-cost-estimation-survey-results/"
  - "Modern Machine Shop — How Job Shops Can Generate Accurate Estimates in Minutes — https://www.mmsonline.com/articles/how-job-shops-can-generate-accurate-quotes-in-minutes"
  - "ZipRecruiter — Inside Sales Coordinator salary — https://www.ziprecruiter.com/Salaries/Inside-Sales-Coordinator-Salary"
  - "U.S. Bureau of Labor Statistics — Employer Costs for Employee Compensation, March 2026 — https://www.bls.gov/news.release/ecec.nr0.htm"
  - "Paperless Parts — Cuts Quote Setup Time by 90% with New AI-Supported Workflow — https://www.paperlessparts.com/press/paperless-parts-cuts-quote-setup-time-by-90-with-new-ai-supported-workflow/"
  - "Paperless Parts — Pricing request page — https://www.paperlessparts.com/pricing/"
  - "Capterra — CutQuote pricing listing — https://www.capterra.com/p/10040294/CutQuote/"
  - "Akin — DDTC Publishes ITAR Carve-out for Encrypted Technical Data — https://www.akingump.com/en/insights/alerts/ddtc-publishes-itar-carve-out-for-encrypted-technical-data-and"
  - "PreVeil — ITAR Compliance Guide (penalties) — https://www.preveil.com/blog/itar-compliance/"
  - "PKF O'Connor Davies — CMMC Rule 48 CFR 7021 Takes Effect November 10, 2025 — https://www.pkfod.com/insights/no-certification-no-contract-cmmc-rule-48-cfr-7021-takes-effect-november-10-2025/"
---

Most small custom shops don't lose quotes because the estimating is bad. They lose them because the RFQ sat in an inbox for four days while the one person who can read a print was running a job.

That's a triage problem, not a pricing problem. Here are the three realistic ways to fix it, compared on the things that actually matter: how fast quotes go out, what it costs per month, how accurate it is on prints, and where each one breaks.

## The week we're comparing against

Take a 22-person shop: 25 RFQs a week by email, mixed one-offs and repeat production. Before an estimator touches geometry, someone has to open the email, pull the attachments, figure out that "Rev C" is actually the old drawing, log part number, quantity, material and due date, and email back for the missing model. Call it 30–45 minutes per RFQ of pure administration. At 25 RFQs, that's 12–19 hours a week — most of a full-time job — before a single cycle time gets estimated.

Speed matters more than shops assume. The Fabricator reported one job shop finding that **more than half its winning bids were the ones sent within three days** of receiving the RFQ. And win rates vary enormously: a CNCCookbook survey of 100 shops put the best at roughly 70% quote-to-book and the average near 51%, while Modern Machine Shop notes many shops land only about a third of what they quote. Whatever your number is, the RFQs you never got around to score zero.

## Option 1: The estimator does it between jobs

**Speed:** Erratic. Simple repeat parts go out same day; anything needing a chased drawing can sit a week.
**Cost:** Nothing new on the P&L — and that's the trap. You're spending 12–19 hours of your most expensive, hardest-to-replace person on data entry. Loaded at $60/hour, that's roughly $3,100–$4,900 a month of estimating capacity spent on copy-paste.
**Accuracy:** Highest in the shop. Your estimator catches the profile tolerance that changes the whole fixture plan.
**Where it fails:** Volume and follow-up. Nobody chases the customer who went quiet on a PO, because chasing feels less urgent than the job on the floor. Quotes also degrade when the shop is busy — exactly when you can afford to be picky about which work you take.

## Option 2: A part-time inside sales coordinator

**Speed:** Good and consistent, during their hours. Same-day acknowledgment, next-day follow-up, someone owns the "did they ever send the PO?" question.
**Cost:** ZipRecruiter put the U.S. average for an inside sales coordinator at about $23.59/hour as of mid-2026, with most salaries between $40,000 and $54,000. At 20 hours a week that's roughly $2,000/month in wages. Add payroll taxes and whatever benefits you offer — BLS data for March 2026 shows benefits running about 30% of total compensation for private industry workers, though part-timers usually land well below that — and budget **$2,200–$2,900 a month**, plus two to three months before they're useful.
**Accuracy:** Excellent on customer detail, weak on prints at first. A coordinator will not catch a missing GD&T callout in month one.
**Where it fails:** Coverage and turnover. One person means one vacation, one flu, one resignation. And a 20-hour coordinator handling 25 RFQs is close to fully booked — growth means a second hire.

## Option 3: An AI intake agent

This is software that reads the incoming RFQ email and attachments, extracts part number, quantity, material, revision and due date, builds the quote record, and sends the "we're missing the STEP file" follow-up without being asked. (If the difference between this and a plain automation isn't clear, we covered it in [The Agentic Wave, Explained](/blog/the-agentic-wave-is-not-just-for-tech/).)

The category is real, not speculative. Paperless Parts, for example, lets shops forward an RFQ email straight into a quote and uses domain-specific AI to pull line items from emails, prints and models — the vendor says it can identify over 10,000 ASTM, AMS, MIL-SPEC and NADCAP specifications and flag export-control markings, and claims a 90% cut in quote setup time. Treat the 90% as a marketing figure until you see it on your own RFQs.

**Speed:** Minutes to acknowledge, minutes to log, and follow-ups fire on schedule at 6 a.m. Sunday.
**Cost:** Nobody in this category publishes prices — Paperless Parts' pricing page is a request form. Third-party listings for manufacturing quoting tools span roughly $50 to over $1,000 a month, which mostly tells you that you have to ask for a real number tied to your seat count and quote volume. Budget internal setup time too.
**Accuracy:** Very good at extraction, unreliable at judgment. It will read "6061-T6" correctly and have no opinion on whether your 4-axis can hold that true position.
**Where it fails:** Weird inputs and quiet confidence. Scanned faxes, a drawing pasted into the body of an email, a customer who writes "same as last time, but longer." It fills in a field rather than admitting it doesn't know — which is why every extracted field needs a human glance before pricing.

## Side by side

| | Estimator does it | Part-time coordinator | AI intake agent |
|---|---|---|---|
| Time to first response | Hours to days | Same/next day | Minutes |
| New monthly cost | $0 cash, ~$3–5k of estimating time | ~$2,200–$2,900 | Ask; budget setup time |
| Print/tolerance accuracy | Best | Weak at first | Good extraction, no judgment |
| Follow-up discipline | Poor | Good | Excellent |
| Scales with volume | No | Somewhat | Yes |
| Biggest risk | Backlog | Single point of failure | Confidently wrong data |

The honest answer for most 5–50 person shops is a combination: the agent does intake and chasing, a human — coordinator or estimator — approves the extraction and owns everything downstream.

## Three things that never leave a human

**Pricing.** An agent can populate a quote; it should not set a number that goes to a customer. Margin decisions involve who the customer is, how badly you want the door open, and what's on the floor in six weeks. None of that is in the RFQ.

**Tolerance interpretation.** Reading a callout is extraction. Deciding whether you can hold it, and what fixturing and inspection it implies, is engineering. Keep those separate in your own head, and in your workflow.

**Anything export-controlled.** If your shop touches ITAR technical data, drawings do not go into a general-purpose AI tool. Since March 2020, 22 CFR §120.54 has allowed unclassified ITAR technical data to move through cloud services without counting as an export — but only under strict conditions: end-to-end encryption, and a provider who cannot decrypt the data, with keys held by U.S. persons. Most consumer AI chat tools do not meet that bar. The civil penalty ceiling is the greater of roughly $1.27 million per violation or twice the transaction value. And if you take DoD work, the CMMC acquisition rule took effect November 10, 2025 with a phase-in through 2028, so ask any vendor where your data lives and who can read it before you forward a single print.

## A 30-day test worth running

Don't rip out your process. Run a narrow pilot:

1. **Pick one lane.** Repeat or near-repeat parts from three existing customers. No first-article aerospace, no defense work, no export-controlled drawings.
2. **Set the baseline this week.** For 20 RFQs, log time received, time quoted, and minutes of admin. You need the "before" number or you'll argue about feelings later.
3. **Route that lane to the agent for four weeks.** It extracts and drafts; a human approves every field before anything leaves the building.
4. **Measure three things:** median hours to first response, extraction errors per 10 RFQs (and which fields), and how many stalled quotes the follow-up sequence revived.
5. **Decide on the numbers.** If time-to-quote drops from days to hours and errors are confined to fields a human checks anyway, expand the lane. If you're correcting more than you're saving, you've spent a month and learned something cheap.

If the outcome you care about is really "nobody follows up after the quote goes out," the math on automated follow-up cadence is worked through in [Should a Small Dealership Use an AI Agent or a BDC Rep for Lead Follow-Up?](/blog/should-a-small-dealership-use-an-ai-agent-or-a-bdc/) — different industry, identical problem.

Start with step 2. Twenty timestamps in a spreadsheet, this week, before you talk to a single vendor.

---
title: "Letting AI Summarize Intake Forms and Discovery: What a Solo Attorney Should Check First"
description: "Where AI summaries of intake forms and discovery go wrong, which ABA Opinion 512 questions to ask, and a closed-matter test for solo lawyers."
pubDate: 'Jun 25 2026'
updatedDate: 'Oct 6 2026'
industry: professional-services
sources:
  - "ABA Litigation Section, \"Generative AI for Lawyers, Part 2: Maintaining Confidentiality\" (Opinion 512, informed consent, boilerplate) — https://www.americanbar.org/groups/litigation/resources/newsletters/ethics-professionalism/generative-ai-lawyers-part-2-maintaining-confidentiality/"
  - "National Law Review, \"ABA Weighs In on Generative AI Use in Legal Practice\" (Opinion 512, reading terms of use and privacy policy) — https://natlawreview.com/article/aba-weighs-generative-ai-use-legal-practice"
  - "Mondaq, \"American Bar Association Issues Guidance on Ethical Use of GAI in Legal Services\" (Opinion 512, verification depends on tool and task) — https://www.mondaq.com/unitedstates/new-technology/1519430/american-bar-association-issues-guidance-on-ethical-use-of-gai-in-legal-services"
  - "The Florida Bar, Ethics Opinion 24-1 — https://www.floridabar.org/etopinions/opinion-24-1/"
  - "Liu et al., \"Lost in the Middle: How Language Models Use Long Contexts\" — https://arxiv.org/abs/2307.03172v3"
  - "Stanford HAI, \"AI on Trial: Legal Models Hallucinate in 1 out of 6 (or More) Benchmarking Queries\" — https://hai.stanford.edu/news/ai-trial-legal-models-hallucinate-1-out-6-or-more-benchmarking-queries"
  - "OpenAI, Business data privacy, security, and compliance — https://openai.com/business-data/"
  - "Bitdefender, \"Anthropic Shifts Privacy Stance, Lets Users Share Data for AI Training\" — https://www.bitdefender.com/en-us/blog/hotforsecurity/anthropic-shifts-privacy-stance-lets-users-share-data-for-ai-training"
  - "Engadget, \"OpenAI no longer has to preserve all of its ChatGPT data, with some exceptions\" — https://engadget.com/ai/openai-no-longer-has-to-preserve-all-of-its-chatgpt-data-with-some-exceptions-192422093.html"
---

A new personal-injury client hands you a 12-page intake questionnaire and a signed contingency agreement. Months later, the defense produces 900 pages of medical records and claim notes. More and more AI tools will read all of it and give you back a one-page fact sheet listing the parties, dates, amounts, key clauses and gaps. For a solo attorney without a paralegal, that's hard to ignore. This post is only about the document-reading job. Phone intake and the wider risk of sanctions are covered in [how far a small firm can trust an AI agent](/blog/ai-agents-for-small-law-firms-and-solo-attorneys/).

## What the summaries usually get right

Picture a reader with a highlighter who never gets tired and has never been to law school. It does well with facts that are printed plainly on the page:

- Names of parties, witnesses, insurers and opposing counsel
- Dates that are stated outright, such as the date of loss or the signing date
- Typed dollar figures, fee percentages and policy limits
- Whether a standard clause exists at all, such as governing law, arbitration or fee-shifting
- An index of a production by document type and date

These are lookup jobs. The answer is already on a page, and the tool only has to find it and copy it into the right box.

## Where they misread or leave things out

Problems start when the page is messy or the meaning depends on context.

- **Scans and handwriting.** A faxed intake form has to go through text recognition before the AI can read it. A smudged digit can turn $18,000 into $13,000, and the summary will state the wrong number as confidently as everything else.
- **Negatives and exceptions.** "Client shall not be responsible for costs unless..." can come back as "client responsible for costs."
- **Later papers that change earlier ones.** Say an addendum raises the contingency fee once suit is filed. A summary built only from the original retainer will get the fee wrong.
- **The middle of long files.** A 2023 study called "Lost in the Middle," by researchers at Stanford and elsewhere, found that AI models used information at the start or end of a long document more reliably than information buried in the middle. In a 900-page production, most of the file is the middle.
- **Guesses presented as facts.** A client who wrote "after my shift ended" can show up in the summary as "incident occurred at approximately 5:30 p.m."

Missing facts are the hardest problem to catch, because a summary with one fact missing looks just as finished as a complete one. Tools built for lawyers aren't immune. A 2024 Stanford study found that research tools from LexisNexis and Thomson Reuters gave incorrect information on more than one in six test questions. That study tested legal research, not summaries, but it shows that a product built for lawyers still needs checking.

## Why every summary goes back to the source

In July 2024 the ABA issued Formal Opinion 512, its first formal ethics guidance on generative AI. It says three things that matter here:

- Lawyers must review AI output before relying on it.
- How much review is needed depends on the tool and the task.
- The tool can't replace the lawyer's own judgment.

A fact sheet that feeds a limitations deadline or a settlement demand is a high-stakes task.

In practice:

- Use only tools that link each fact they pull out to the page it came from.
- Check every date that sets a deadline and every dollar figure against the original.
- Don't trust a "not found" or "clause absent" result until you've looked yourself.

## Confidentiality questions to put to any tool

Opinion 512 says lawyers should, at a minimum, read and understand a tool's terms of use, privacy policy and related contract terms. If they can't, they should get help from colleagues, IT staff or security experts. It also covers "self-learning" tools, meaning tools that can reuse what they're given. Putting client information into one requires the client's informed consent, and boilerplate in an engagement letter doesn't count. Florida Bar Opinion 24-1 also tells lawyers to look into a program's policies on keeping data, sharing data and self-learning. Check whether your own state bar has issued guidance.

Get answers to these questions in writing:

1. **Do you train your AI models on our uploads, and is that the default?** It varies by product tier. OpenAI says it doesn't train on business ChatGPT or API data by default. In 2025, Anthropic changed its consumer Claude terms so chats are used for training unless the user opts out, and that data can be kept for up to five years. Its commercial and API products aren't affected. Terms change, so read the current version.
2. **How long do you keep files and outputs, and can we delete them?** A promise to delete has limits. In 2025, the federal court hearing the New York Times copyright case ordered OpenAI to preserve ChatGPT logs, including chats users had deleted. It didn't end that requirement for new chats until that fall.
3. **Who at your company, or at companies you hire, can see client files?**
4. **Can our uploads ever affect the answers another customer gets?**
5. **Where is data stored, is it encrypted, and how quickly will you tell us about a breach?**

## Run it on a closed matter first

1. Pick three closed matters with different kinds of paperwork: a clean typed intake, a scanned or handwritten one, and one with a retainer amendment or a long production.
2. Write your own answer key before running anything. List 15 to 20 facts per matter, plus two or three things you know aren't in the file.
3. Only use a product tier whose terms you've already checked. Closed files are still confidential, so remove names if you have any doubt.
4. Count wrong facts, missed facts, made-up facts, things the tool wrongly said were absent, and source links that point to the wrong page.
5. Compare how long the checking took with how long reading the file yourself would take.

One made-up fact on a matter you know well is a fail. If checking takes as long as reading, the tool isn't saving you any time.

## Before the next new file lands

Choose the one tool you're considering, download its terms of use and privacy policy, and answer the five questions above on a single page. Where the documents don't say, ask the vendor in writing. If you're unsure what the answers mean, you can get help from a legal-technology consultant, your malpractice insurer's risk-management staff, or your state bar's ethics hotline if it has one. Then set aside an afternoon for the closed-matter test.

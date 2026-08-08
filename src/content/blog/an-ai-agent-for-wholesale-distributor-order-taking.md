---
title: "An AI Agent for Wholesale Distributor Order Taking, Rolled Out in Three Phases"
description: "Stock lookups, order status, then reorder-by-part-number: the order a 10-50 person distributor should turn them on, plus a two-week test plan."
pubDate: 'Aug 8 2026'
sources:
  - "Distribution Strategy Group, \"Distributor eCommerce Now 20% of Sales and Accelerating\" — https://distributionstrategy.com/distributor-ecommerce-now-20-of-sales-and-accelerating/"
  - "DSG 2024 State of eCommerce in Distribution report (PDF) — https://distributionstrategy.com/wp-content/uploads/2024/11/DSG-Report-2024-State-of-eCommerce-in-Distribution.pdf"
  - "DCKAP, \"Exploring Epicor P21 API and Other Alternatives\" — https://www.dckap.com/blog/p21-api-data-sync/"
  - "Epicor Eclipse product page — https://www.epicor.com/en-us/products/enterprise-resource-planning-erp/eclipse/"
  - "DCKAP, \"Comprehensive Guide on Epicor Eclipse ERP\" — https://www.dckap.com/blog/epicor-eclipse-erp/"
  - "DDI System (Advantive) Inform ERP — https://www.ddisystem.com/"
---

A counter phone at a plumbing supply house rings about the same six things all day. Do you have it, when does it ship, what's my price, where's my backorder, can I get one more of what I bought last Tuesday, and this valve came in cracked. Two of those are pure lookup. One is a judgment call your credit manager should make. An AI agent can take the lookups off your inside sales team without touching the rest, but only if you turn things on in the right order.

If you want the background on what an agent actually is and how it differs from a chatbot, [start here](/blog/the-agentic-wave-is-not-just-for-tech/). This post assumes you already know and want the rollout.

Worth noting why this still matters: in Distribution Strategy Group's survey of more than 400 distributor executives, distributors that had ecommerce reported 19.7% of 2022 sales coming through digital channels, up from 14.5% in 2021. Growing fast, and still a minority. The phone and the inbox are carrying the rest.

## Three data messes to clean before you buy anything

An agent is only as good as what it can look up. Budget two to three weeks of somebody's time here.

**Part number cross-references.** Your customers do not use your SKUs. They use the manufacturer number, the number from the last invoice, the number that was discontinued in 2019, or "the beige one, the four-inch." Build a lookup table that maps your item ID to manufacturer part number, UPC, superseded numbers, and any customer-specific part numbers you carry. Start with whatever set of items makes up the bulk of your order lines, not the whole catalog.

**Price tiers.** Contract pricing, customer price matrices, and quantity breaks live in your ERP already. The rule is simple: the agent reads a price record or it says nothing. It never estimates, never rounds, never applies "the usual." If no valid price record exists for that customer and item, the call goes to a person.

**Customer aliases.** One contractor may exist as three accounts, four ship-tos, and a DBA. Decide how the agent identifies a caller: caller ID matched to a contact record, plus one confirmation (account number, PO number, or job name). No match, no order.

## What the agent plugs into

Most distributors this size run Epicor Prophet 21, Epicor Eclipse, Infor Distribution SX.e, DDI System's Inform, or something like NetSuite or Sage. The good news is these systems expose programmatic access: Prophet 21 has REST and OData data service APIs, Eclipse ships REST endpoints, SX.e sits on Infor OS with ION API. The catch is that coverage and licensing vary by version, so before you sign anything, ask your ERP partner one question in writing: can this agent read inventory by branch, open order lines, ship dates, and customer contract pricing, and can it create an order in a pending state?

If the answer on writes is no, you can still run phases 1 and 3. Plenty of value there.

## Phase 1, weeks 1 to 4: look, don't touch

Read-only. The agent answers two questions and nothing else.

- **Availability:** on-hand by branch, plus the next inbound PO date if the item is short.
- **Order status:** shipped or not, ship date, tracking, will-call ready.

No prices, no orders, no promises. Give it a hard rule to state quantities as "showing 240 feet at the Dayton branch" rather than "we have it," so a bad cycle count does not become a broken promise. Track containment (calls fully handled) and, more importantly, wrong answers.

## Phase 2, weeks 5 to 8: reorder by part number

Now the agent can build orders, with fences: existing accounts only, items the customer has bought before or that match a verified cross-reference, contract pricing pulled from the ERP, a dollar cap you choose, and no substitutions ever. The order lands as a pending order or quote that a human releases until you have four weeks of clean history. Email counts here too. "Same as last month's PO, double the elbows" is a parseable request when the order history is there. Online sellers hit the same wall with order-status email, and the [triage logic is similar](/blog/order-status-tickets-are-drowning-your-stores/).

## Phase 3, weeks 9 to 12: tell customers before they call

Outbound. When a backorder gets an ETA, when a truck is loaded, when a will-call is ready, the agent texts or emails the buyer on that PO. This is the phase that quietly kills the most inbound volume, because half your status calls exist only because nobody told anyone anything.

## The four calls that always get a human

1. **Price negotiation.** Reading a contract price is fine. Agreeing to meet a competitor's number is a margin decision.
2. **Credit holds and terms.** Nobody but your credit manager releases an order on hold or extends terms.
3. **RMAs and damage claims.** These involve blame, restocking fees, and a photo of a cracked fitting. Take the details, transfer the decision.
4. **New account setup.** Tax exemption certificates, credit applications, and lien rights paperwork are not chatbot territory.

## A two-week test on your ten loudest accounts

Pull last month's call log from your phone system and rank inbound callers by volume. Take the top ten.

- **Week 1:** phase 1 only, business hours, those ten accounts routed to the agent first with a one-key path to a person. A human reads every transcript daily. You are counting one thing: answers that were wrong.
- **Week 2:** if week 1 produced zero wrong availability answers, add reorder-by-part-number for three of the ten, with human release on every order.

Go or no-go at the end: containment above roughly half on lookup calls, zero wrong stock answers, and no customer who had to repeat themselves to a human after the agent handled them.

## Start with last month's call log

Before you talk to a vendor, spend an hour with the call report and a legal pad, and tally what those calls actually asked for. If lookups and status are not most of the volume, your problem is somewhere else, and you have saved yourself a project.

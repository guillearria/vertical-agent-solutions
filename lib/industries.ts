/**
 * Sector hubs: slug → display name + landing-page blurb.
 *
 * Posts opt in via the `industry` frontmatter field; hubs with at least one
 * active post get a landing page at /industries/<slug>/. The hubs are broad
 * SECTORS, not single verticals: at one post per vertical (the editor prefers
 * breadth) per-vertical hubs were one-post pages, and the twelve original
 * hubs froze in July 2026 while 66 later posts arrived untagged. Nine sectors
 * cover the catalog at 4–15 posts each and give the decider a fixed list to
 * pick from.
 *
 * Lives in lib/ (zero-dependency, no runtime APIs) because both the Astro site
 * and the pipeline's decider read it.
 */
export interface Industry {
	name: string;
	blurb: string;
}

export const industries: Record<string, Industry> = {
	'home-services': {
		name: 'Home & Field Services',
		blurb:
			'Roofers, HVAC shops, pool and pest companies, remodelers, restoration crews, propane dealers, inspectors. The phone rings while the crew is on a ladder or under a house, and the caller books with whoever picks up. These guides sort which calls an AI agent can take, quote, and schedule on its own, and which ones still need a tech’s ear the same hour.',
	},
	'automotive-transportation': {
		name: 'Automotive & Transportation',
		blurb:
			'Repair shops, collision centers, dealerships, tow operators, movers, limo fleets, carriers, and medical transport dispatch. Most of the volume is status checks, quotes, and reschedules, answered today by whoever is least busy. These guides put an agent on that share and price it against an answering service or a new hire.',
	},
	healthcare: {
		name: 'Healthcare & Clinics',
		blurb:
			'Dental, optometry, physical therapy, pharmacies, home care, audiology, DME, therapy practices, med spas, and veterinary clinics. Recalls, refills, resupply, and intake are exactly the repetitive work agents do well, and HIPAA decides which vendors are even allowed in the room. Each guide is written against the actual rule, not a vendor’s summary of it.',
	},
	'professional-services': {
		name: 'Professional & Financial Services',
		blurb:
			'Law firms, bookkeepers, insurance and title agencies, mortgage brokers, credit unions, advisory practices, staffing firms, and managed service providers. Regulated, deadline-driven, and short on front-office hours. Agents can carry intake, follow-up, and paperwork chases; these guides mark where a licensed human has to do the talking.',
	},
	'hospitality-leisure': {
		name: 'Hospitality, Events & Leisure',
		blurb:
			'Restaurants, inns, wedding venues, caterers, marinas, golf courses, family entertainment centers, and travel advisors. Bookings arrive in bursts, the questions repeat, and the busiest hour is the one nobody can answer the phone. Guides here cover reservations, quotes, and group inquiries in the shape they actually arrive: a Friday rush, a wedding season, a heat wave.',
	},
	'personal-services': {
		name: 'Personal & Pet Services',
		blurb:
			'Salons, fitness studios, pet boarding, and funeral homes. Small teams, personal relationships, and a calendar that is the whole business. The guides cover booking agents that fill chairs and class spots without double-booking anyone, and the conversations, like a grieving family’s first call, that an agent should never take.',
	},
	'education-nonprofits': {
		name: 'Education & Nonprofits',
		blurb:
			'Tutoring centers, daycares, private schools, trade schools, and nonprofits. Enrollment inquiries, absence lines, tour requests, and donor email all pile up on staff who were hired for something else. These guides work through a semester’s worth of that traffic, one organization type at a time.',
	},
	'real-estate-property': {
		name: 'Real Estate & Property',
		blurb:
			'Realtors, property managers, self-storage operators, and HOA management offices. Speed-to-lead decides who gets the showing; tenant and homeowner calls decide the rest of the day. Guides here cover lead follow-up, rental inquiries, and maintenance intake, timed against the five-minute window that decides most of it.',
	},
	'trade-industrial': {
		name: 'Trade, Industrial & B2B',
		blurb:
			'Machine shops, equipment rental yards, wholesale distributors, equipment dealers, print shops, online stores, and the B2B service firms that sell to them. RFQs, order status, and parts lookups are high-volume and rule-bound. Each guide walks a real week of that traffic and says what an agent closed, escalated, or got wrong.',
	},
};

/** Display name for a post's industry slug, or undefined when untagged/unknown. */
export function industryName(slug: string | undefined): string | undefined {
	return slug ? industries[slug]?.name : undefined;
}

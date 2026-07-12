/**
 * Industry hubs: slug → display name + landing-page blurb.
 * Posts opt in via the optional `industry` frontmatter field; hubs with at
 * least one active post get a landing page at /industries/<slug>/.
 */
export interface Industry {
	name: string;
	blurb: string;
}

export const industries: Record<string, Industry> = {
	'dental-practices': {
		name: 'Dental Practices',
		blurb:
			'Front desks in dentistry run on reminders, recalls, and insurance checks — exactly the repetitive, rules-based work AI agents do well, and exactly where HIPAA decides which vendors are even allowed in the room. These guides cover what to automate at a dental practice and what to keep human.',
	},
	'auto-repair': {
		name: 'Auto Repair Shops',
		blurb:
			'A shop loses work every time the phone rings out under a lift. AI agents can answer overflow calls, book jobs against your real calendar, and chase declined repairs — without ever pretending to know what that noise in the engine is.',
	},
	'real-estate': {
		name: 'Real Estate',
		blurb:
			'Speed-to-lead decides who gets the showing. These guides cover where AI agents genuinely pay off for realtors — instant lead follow-up, scheduling, listing admin — and where a licensed human still has to do the talking.',
	},
	'law-firms': {
		name: 'Law Firms',
		blurb:
			'For solo attorneys and small firms, AI agents can take intake, deadlines, billing, and first-pass document review off the desk. They can also get a lawyer sanctioned. These guides draw the line, with the ethics opinions to back it.',
	},
	veterinary: {
		name: 'Veterinary Clinics',
		blurb:
			'A busy vet clinic misses calls it never knows about. Whether the answer is an AI receptionist, an answering service, or another hire depends on call volume and what your clients actually need — these guides walk the honest comparison.',
	},
	'insurance-agencies': {
		name: 'Insurance Agencies',
		blurb:
			'Independent agencies live on renewals, certificates, and follow-ups nobody has time for. AI agents handle the paperwork cadence well — and must never be the one giving coverage advice. Here is the split, item by item.',
	},
	'pest-control': {
		name: 'Pest Control',
		blurb:
			'Seasonal surges bury a pest control office in booking calls. An AI booking agent can catch the spring rush, route the emergencies, and know which calls a human tech needs to hear about the same day.',
	},
	'gyms-fitness': {
		name: 'Gyms & Fitness Studios',
		blurb:
			'Empty class spots and lapsed members are revenue leaks an AI agent can actually plug — filling waitlists, nudging no-shows, and reviving memberships with messages that don’t feel like spam.',
	},
	salons: {
		name: 'Salons & Barbershops',
		blurb:
			'The fear is always the same: "it will double-book my chair." These guides bust the myths about AI booking agents for salons, barbershops, and spas — what modern scheduling agents actually do, and the failure modes worth asking vendors about.',
	},
	restaurants: {
		name: 'Restaurants',
		blurb:
			'On a slammed Friday night, the phone is the last thing anyone can answer. An AI agent can take reservations, answer the same ten questions, and know when to hand a caller straight to a human.',
	},
	'property-management': {
		name: 'Property Management',
		blurb:
			'Small landlords field tenant calls, late-rent follow-ups, and vendor scheduling at all hours. AI agents can carry the routine load — and must stay well away from anything that touches fair-housing judgment calls.',
	},
	'accounting-bookkeeping': {
		name: 'Accounting & Bookkeeping',
		blurb:
			'Where does an AI agent actually save a bookkeeping firm money — client chasing, document collection, status updates? These guides put numbers on it, line by line, and flag the work that still needs a professional’s sign-off.',
	},
};

/** Display name for a post's industry slug, or undefined when untagged/unknown. */
export function industryName(slug: string | undefined): string | undefined {
	return slug ? industries[slug]?.name : undefined;
}

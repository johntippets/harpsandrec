# Harps & Rec

Harps & Rec is a small harp-performance business created for Natalee Tippets. The name is a playful reference to Parks and Recreation, where Natalee previously worked for Calvert County, Maryland.

The project will support a warm, accessible website that helps local organizations, families, and event planners learn about Natalee's harp performances and request a booking.

**Website:** [harpsandrec.com](https://harpsandrec.com)

## Project goals

Harps & Rec is intended to help Natalee:

- Practice and continue developing her harp skills.
- Perform for retirement communities, weddings, children's groups, schools, libraries, churches, and community events.
- Share educational information about harp music, recreation, and well-being.
- Build a flexible local side business with minimal overhead.
- Make it easy for potential clients to ask questions or request a performance.

## Brand direction

Harps & Rec should feel:

- Warm and uplifting
- Playful without being gimmicky
- Professional enough for weddings and senior communities
- Welcoming to children, families, and community groups
- Honest, personal, and approachable

The brand should emphasize music, atmosphere, recreation, education, and human connection rather than exaggerated or clinical claims.

## Important language boundaries

Natalee studied recreational therapy, but Harps & Rec should not be presented as a mental-health treatment, healthcare service, or music-therapy practice.

Website and marketing content should:

- Describe performances, recreation, education, and general wellness programming accurately.
- Avoid unsupported medical, therapeutic, or clinical claims.
- Clearly distinguish harp performances and educational programs from licensed music therapy or medical treatment.
- Respect the privacy and dignity of children, senior-living residents, clients, and event guests.

## Planned audiences

The website may include information tailored to:

- Retirement and senior-living communities
- Weddings and private events
- Children and families
- Schools and libraries
- Churches and community groups
- Wellness and recreational programs
- Local businesses and venues

## Planned website

The initial website should be simple, fast, accessible, mobile-friendly, and inexpensive to operate.

Expected sections may include:

- Home
- About Natalee
- Services
- Retirement Communities
- Weddings
- Children and Community Programs
- Recreation, Music, and Well-Being
- Repertoire or performance samples
- Frequently Asked Questions
- Booking or Contact
- Privacy information

The first version should focus on clear information and a straightforward booking-request experience rather than complex accounts, payments, or administrative systems.

## Intended technical direction

Unless repository inspection supports a different approach, the expected stack is:

- Next.js App Router
- React
- Strict TypeScript
- Tailwind CSS
- pnpm
- Vercel
- Static-first rendering
- Minimal backend complexity

Dependencies and paid services should only be added when they provide a clear benefit.

## Engineering principles

Contributors and coding agents should:

- Inspect the repository before making changes.
- Keep changes small, understandable, and reversible.
- Preserve existing conventions unless a change is justified.
- Never commit secrets, private contact information, or customer data.
- Use semantic HTML and support keyboard navigation.
- Maintain readable color contrast and reduced-motion support.
- Optimize for mobile devices, performance, accessibility, and search visibility.
- Avoid unnecessary dependencies and recurring costs.
- Run relevant linting, type checks, tests, and builds before reporting completion.
- Document meaningful architectural or project-state changes.

## Privacy and content safety

Do not publish:

- A private home address
- Personal phone numbers unless intentionally approved
- API keys or environment variables
- Customer booking details
- Images of children, residents, patients, or guests without appropriate permission
- Invented testimonials, clients, prices, credentials, repertoire, or performance history

Missing business facts should remain clearly marked as placeholders until John or Natalee confirms them.

## Local development

This project uses pnpm and Node.js 20.9 or later. Install dependencies with:

```bash
pnpm install
```

Then use the following commands:

```bash
pnpm dev       # Run the local development server
pnpm lint      # Check code quality
pnpm typecheck # Check TypeScript without emitting files
pnpm build     # Create a production build
pnpm start     # Serve a completed production build
```

No environment variables are required for this milestone.

## Project structure

- `src/app` — App Router pages, layout, metadata, robots, sitemap, icon, and global styles
- `src/components` — small shared presentational components
- `docs/PROJECT_STATE.md` — current decisions, limitations, deferred work, and facts awaiting confirmation
- `AGENTS.md` — durable implementation and content-safety guidance for coding agents

## Current status

Milestone 1 establishes an accessible, mobile-friendly website foundation at `/`. It includes a polished homepage and SEO platform basics, but it does not implement booking submission or publish contact information. Online booking requests will be added only after the business booking address and workflow are confirmed.

The remaining milestones are:

1. Confirm business facts, brand assets, and booking workflow.
2. Add a simple booking-request workflow.
3. Connect and deploy the website through Vercel.
4. Prepare reusable content for Instagram, TikTok, and Facebook.

## Ownership

Harps & Rec is a private project for John and Natalee Tippets.

No open-source license has been granted unless a license is added explicitly in the future.

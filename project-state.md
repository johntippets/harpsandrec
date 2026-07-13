# Harps & Rec project state

> Canonical source of truth for project scope, current implementation, open decisions, and roadmap.
>
> **Required maintenance:** Every coding agent that adds, changes, removes, or deploys a website feature must update this file in the same branch and pull request. A feature is not complete until the relevant sections and change log are current.

**Last updated:** 2026-07-13
**Current milestone:** Milestone 1 complete; Phase 1 inquiry foundation is merged but live delivery remains blocked, the retirement-community and private-events pages are merged, and the Richmond-area service-page checker is implemented on a review branch
**Production site:** https://harpsandrec.com  
**Repository:** `johntippets/harpsandrec`

## 1. Project purpose

Harps & Rec is a small local harp-performance business being developed for Natalee Tippets. The name is a play on “Parks and Recreation,” reflecting Natalee’s previous work for Calvert County, Maryland Parks and Recreation and her studies in recreational therapy.

The project should help Natalee:

- Practice and continue developing her harp skills.
- Book paid and community performances.
- Serve retirement communities, children’s groups, schools, libraries, churches, wellness programs, private events, and local venues.
- Share careful educational information about music, recreation, connection, and general well-being.
- Build a flexible side business with minimal overhead.

## 2. Business and brand scope

Harps & Rec should feel warm, uplifting, playful, graceful, family-friendly, and authentic. It should be professional enough for private events and senior-living organizations while remaining welcoming to children, families, schools, libraries, and community groups.

The brand should not feel clinical, sterile, luxury-only, childish, or gimmicky. The visual identity must remain original and must not copy the logo, typography, graphics, or title treatment of the *Parks and Recreation* television program.

## 3. Audiences and planned offerings

Primary audiences:

- Retirement and senior-living communities
- Private events
- Children and families
- Schools and libraries
- Churches and community groups
- Wellness and recreational programs
- Local businesses and venues

Planned offerings may include:

- Live harp performances
- Private-event music
- Retirement-community performances
- Harp demonstrations
- Children’s and community programs
- School and library visits
- Educational programming about music, recreation, and well-being

Offerings, packages, repertoire, prices, availability, and service areas must not be published until John and Natalee confirm them.

## 4. Claims and content boundaries

Harps & Rec provides live performances and educational programming. It is not:

- Healthcare
- Mental-health treatment
- Clinical recreational therapy
- Licensed music therapy
- A substitute for professional care

Content may discuss enjoyment, recreation, curiosity, learning, engagement, social connection, and meaningful shared experiences. It must not promise medical, cognitive, behavioral, rehabilitation, or mental-health outcomes.

Never invent or imply:

- Qualifications or certifications
- Previous clients or performance history
- Testimonials, reviews, or awards
- Prices, packages, or availability
- Repertoire
- Exact service areas
- Contact details
- Insurance coverage
- Accessibility accommodations
- Legal business status

Unknown facts must remain clearly documented as open questions.

## 5. Privacy and safety boundaries

Do not commit or publish:

- Home addresses
- Private telephone numbers
- Personal email addresses unless intentionally approved for business use
- API keys, tokens, environment values, or credentials
- Customer or booking data
- Images, audio, or video involving children, senior-community residents, patients, clients, or guests without appropriate permission

Facility policies, written releases, dignity, and privacy must be considered before publishing media involving other people.

## 6. Technical scope

Current architecture:

- Next.js App Router application at the repository root
- React
- Strict TypeScript
- Tailwind CSS
- pnpm
- Vercel hosting
- Static-first rendering
- React Server Components by default
- Minimal client-side JavaScript

The inquiry-form foundation merged through PR #3 adds:

- A homepage Server Action for server-authoritative inquiry processing
- Dependency-free validation and submission modules under `src/lib/inquiry`
- A provider-neutral delivery-adapter interface
- A development/test-only fake adapter that sends, stores, and logs no inquiry data
- One focused Client Component for pending state, error presentation, and focus movement
- Node's built-in test runner with TypeScript compilation; no test framework dependency
- One development/test-only environment switch, `INQUIRY_DELIVERY_MODE`, with safe `local-fake` and `local-failure` simulators that are rejected in production

The service-page system merged through PR #4 uses a typed content model and static Server Component layout. PR #5 extended that model only with configurable section labels and hero decorative words, keeping future audience pages static and dependency-free.

The service-area feature implemented on `codex/service-area-checker` adds a static `/service-area` page and a focused Client Component for an optional address check. A Server Action validates the address and sends it directly to the official U.S. Census Geocoding Services API with `cache: "no-store"`; Harps & Rec does not log or store it. Distance is calculated server-side with a dependency-free Haversine function from the public 2025 Census Gazetteer representative point for ZCTA 23120 (latitude `37.42208`, longitude `-77.781371`), not a residence. The integration uses no API key, environment variable, new dependency, paid service, or recurring-cost addition.

Engineering priorities:

- Mobile-first responsive design
- Semantic HTML and keyboard accessibility
- Readable contrast and visible focus states
- Reduced-motion support
- Fast page loads and efficient assets
- Clear calls to action
- Minimal dependencies
- No paid service unless explicitly approved and justified
- No environment variables unless a feature genuinely requires them

## 7. Current production state

Milestone 1 is implemented, merged to `main`, and deployed.

Implemented:

- Responsive homepage
- Header and anchor navigation
- Hero section
- Performance-offerings overview
- About Natalee section
- Music, recreation, and well-being section
- Preliminary future booking-process section
- Booking-status notice
- Footer
- Original provisional text wordmark and harp-inspired SVG motif
- Root metadata and canonical URL
- Open Graph text metadata
- Robots configuration
- Sitemap
- Provisional original icon
- Skip navigation
- Semantic landmarks and logical headings
- Visible focus styling
- Responsive typography and spacing
- Decorative SVG accessibility treatment
- Reduced-motion handling

Current validation baseline:

- `pnpm lint` passed
- `pnpm typecheck` passed
- `pnpm build` passed
- Local production homepage smoke test returned HTTP 200
- Browser review completed at approximately 390px, 768px, and 1440px without horizontal overflow or console errors

Merged to `main` through PR #3; deployment status was not verified in this task:

- A responsive homepage “Request a performance” form and updated calls to action
- Required and optional request fields with plain-language privacy and booking disclaimers
- Server-side normalization, field validation, past-date checks, repeated/unexpected-field rejection, 20,000-byte aggregate input limit, and per-field limits
- A honeypot and minimum-completion-time signal with generic suspected-spam handling
- Honest validation, configuration, success, and unexpected-error states
- A delivery boundary that cannot return success after an unconfigured, failed, or thrown handoff
- Accessible labels, descriptions, required-state communication, linked error summary, focus movement, pending state, and retained safe values
- Developer documentation and automated coverage for validation, abuse signals, configuration, delivery failure, and success rules

Merged to `main` through PR #4; deployment status was not verified in this task:

- A dedicated `/retirement-communities` audience page with page-specific metadata
- A typed, reusable static service-page content model and Server Component layout
- Conditional descriptions of possible program elements, an organizer checklist, claims-boundary content, safe FAQs, and a soft planning CTA
- A retirement-community link from the homepage and cross-page navigation support
- The retirement-community route in the sitemap

Merged to `main` through PR #5; deployment status was not verified in this task:

- A dedicated `/private-events` page with page-specific metadata and a sitemap entry
- Bounded reusable service-page labels and decorative-word configuration for audience-specific copy
- Private-event planning content, safe FAQs, a soft inquiry CTA, and a homepage card link
- A general Performance Settings header link so future service pages do not crowd navigation

Implemented on `codex/service-area-checker` but not merged or deployed:

- A dedicated static `/service-area` page with page-specific metadata and sitemap coverage
- Confirmed Moseley, Virginia 23120 and Richmond-area service language with an approximate 50-mile radius
- A server-only U.S. Census address-geocoding adapter, strict input validation, timeout and malformed-response handling, and no-store requests
- Dependency-free straight-line distance calculation from a public, non-residential ZCTA 23120 reference point
- Accessible within-radius, outside-radius, near-boundary, no-match, ambiguous-match, timeout, upstream-error, and validation states
- Homepage, audience-page, inquiry-form, and footer links to the service-area page
- Automated tests for distance boundaries, geocoder parsing and transport failures, validation and abuse signals, and no-false-success workflow rules

Review-branch validation completed on 2026-07-12:

- `pnpm lint` passed
- `pnpm typecheck` passed
- `pnpm test` passed all 13 tests
- `pnpm build` passed; the homepage remains statically prerendered
- Local production homepage smoke test returned HTTP 200
- Browser checks covered validation, unconfigured delivery, simulated delivery failure, and safe local fake success
- Responsive checks at approximately 390px, 768px, and 1440px found no horizontal overflow; keyboard focus remained visible and console checks were clear

Retirement-community review-branch validation completed on 2026-07-12:

- `pnpm lint` passed after replacing internal plain-anchor navigation with `next/link`
- `pnpm typecheck` passed
- `pnpm test` passed all 13 existing inquiry tests
- `pnpm build` passed; `/retirement-communities` is statically prerendered
- Local production browser smoke test confirmed the homepage card navigation and page-specific title
- Responsive checks at approximately 390px, 768px, and 1440px found no horizontal overflow; heading structure, skip navigation, visible keyboard focus, target size, and browser console checks passed

Private-events review-branch validation completed on 2026-07-12:

- `pnpm lint` passed
- `pnpm typecheck` passed
- `pnpm test` passed all 13 existing inquiry tests
- `pnpm build` passed; `/private-events` is statically prerendered
- Local production smoke test returned HTTP 200 for `/private-events`
- Browser checks confirmed homepage-card navigation, cross-page Performance Settings navigation, page title, canonical URL, sitemap inclusion, visible keyboard focus, and a clear console
- Responsive checks at approximately 390px, 768px, and 1440px found no horizontal overflow; reduced-motion behavior was confirmed by the existing shared stylesheet rule

Service-area review-branch validation completed on 2026-07-13:

- `pnpm lint` passed
- `pnpm typecheck` passed
- `pnpm test` passed all 33 tests
- `pnpm build` passed; `/service-area` and the audience pages remain statically prerendered
- Local production smoke testing confirmed a nearby public government-office address as within the radius, an outside public civic address as outside it, and a synthetic no-match address as safely unresolved
- Browser checks confirmed the page title, canonical URL, homepage and audience-page links, result-panel focus movement, and responsive layouts at 390px, 768px, and 1440px without horizontal overflow

## 8. Current limitations

The site remains informational while live inquiry delivery is unconfigured. The inquiry foundation, retirement-community page, and private-events page are merged to `main` through PRs #3, #4, and #5, but this task did not verify whether those merges are deployed. The service-area page and checker exist only on `codex/service-area-checker` and are not live.

Not yet implemented:

- Approved business contact details
- Live inquiry email delivery
- An approved business inbox, provider adapter, sender identity, and sender-domain setup
- Requester confirmation email policy and delivery
- Distributed rate limiting; the form deliberately avoids a misleading in-memory serverless limiter
- Children/community-program service pages
- Approved photography
- Audio or video samples
- Confirmed repertoire
- Pricing or quotation guidance
- Address estimates remain dependent on the external Census service being available and compatible; the checker fails safely when it cannot produce a trustworthy result
- General or site-wide FAQ content; the retirement-community page includes only audience-specific FAQs
- Booking and cancellation policies
- A separate privacy page or professional privacy review; the site currently includes only a concise inline notice
- Analytics or conversion measurement
- Social-media links or embeds
- CMS, database, authentication, payments, or scheduling

The current wordmark and harp motif are provisional and are not approved final brand assets.

## 9. Prioritized roadmap

### Phase 0 — Confirm business facts

Status: **In progress — the service-area fact is confirmed; the remaining business facts are pending**

Confirm:

- Approved business contact email
- Any travel expectations beyond the confirmed approximate 50-mile Richmond-area radius
- Short and long Natalee biography
- Initial services Natalee is ready to offer
- Performance-duration options
- Pricing or quotation approach
- Availability expectations
- Repertoire ready for publication
- Accessibility accommodations Natalee can confidently offer
- Booking and cancellation approach
- Final legal business name, if established
- Approved photos and media permissions

### Phase 1 — Generate inquiries

Status: **In progress — form foundation merged through PR #3; live delivery is blocked on an approved inbox and provider**

Merged to `main` through PR #3:

- Visible “Request a performance” calls to action
- Accessible booking-request form integrated into the homepage
- Server-side validation and normalization
- Honest pending, validation, configuration, success, and unexpected-error states
- Low-friction honeypot, completion-time, request-size, and input-length spam controls
- Short inline inquiry privacy notice
- Provider-neutral email delivery boundary and safe local/test fake

Still required before live delivery:

- Approved business email
- Email notification to the business inbox
- Approved provider and sender-domain configuration
- Requester confirmation decision; no confirmation is implemented
- Decision on a separate privacy page and professional review

Prefer the cheapest reliable implementation. Do not add a database unless retaining submissions is necessary.

### Phase 2 — Dedicated service pages

Status: **In progress — retirement-community and private-events pages are merged through PRs #4 and #5**

Merged to `main` through PR #4:

- Typed static service-page content model and reusable Server Component layout
- Retirement Communities page with possible program elements, organizer planning checklist, claims boundary, safe FAQs, metadata, sitemap entry, and soft planning CTA
- Homepage card and cross-page navigation path to the new page

Merged to `main` through PR #5:

- Private Events page with configurable planning, expectation, FAQ, and CTA labels in the reusable layout
- Homepage Private Events card link, metadata, sitemap coverage, and a general Performance Settings header link

Still planned:

- Children, Schools, Libraries, and Community Programs

Each page should explain the intended audience, possible experience, organizer needs, setup considerations, FAQs, and an inquiry call to action without inventing facts.

### Phase 3 — Authentic media and repertoire

Status: **Blocked on approved assets and facts**

Potential additions:

- Approved photographs of Natalee and the harp
- Approved practice or performance photographs
- Short audio or video samples
- Confirmed repertoire overview
- Accessible captions, controls, and media fallbacks
- Documented permission and copyright status for every asset

### Phase 4 — FAQ, policies, and conversion improvements

Status: **Planned**

Potential additions:

- Frequently asked questions
- Inquiry-process explanation
- Pricing or quotation guidance
- Cancellation and rescheduling information
- Outdoor-event and setup considerations
- Accessibility and organizer guidance

### Phase 5 — Local discovery and SEO

Status: **In progress on a review branch; deployment remains pending**

Implemented on `codex/service-area-checker`:

- Natural Richmond-area and Moseley, Virginia service language
- A static service-area page with route-specific metadata and sitemap coverage
- A privacy-conscious, server-only Census address checker using a public ZCTA reference point and approximate 50-mile radius

Potential additions:

- Audience-specific metadata
- Social-sharing image
- Verified structured data
- Search-engine sitemap submission
- Privacy-conscious conversion measurement

Avoid thin or repetitive location pages.

### Phase 6 — Legal and operational readiness

Status: **Planned as needed**

Potential additions:

- Inquiry privacy notice
- Booking and cancellation policy
- Photography and recording policy
- Event-access and setup requirements
- Outdoor weather policy
- Payment and deposit terms
- Professional review where contracts, children, healthcare facilities, privacy, or liability create meaningful risk

### Phase 7 — Operations and automation

Status: **Deferred until demand justifies it**

Potential additions:

- Inquiry tracking
- Calendar coordination
- Quote and contract templates
- Deposit and invoice workflows
- Reminder and follow-up automation

Start with simple manual workflows or a shared spreadsheet before paying for a CRM or scheduling platform.

### Phase 8 — Growth content

Status: **Future**

Potential additions:

- Seasonal performance content
- Private-event planning guidance
- Retirement-community program ideas
- School and library program information
- Harp facts and educational posts
- Practice-progress updates
- Approved testimonials
- Confirmed Instagram, TikTok, and Facebook links

## 10. Explicit non-goals for the near term

Do not add without a validated need and explicit approval:

- Customer accounts
- Admin dashboard
- Complex CMS
- Full e-commerce
- Immediate online scheduling
- Mobile application
- Paid analytics suite
- Chatbot
- Large blog platform
- Paid theme or component library
- Embedded social feeds
- Subscription CRM

## 11. Open facts and decisions

The following still require confirmation from John and Natalee:

- Approved business contact email
- Any travel expectations or exceptions beyond the confirmed approximate 50-mile radius
- Confirmed social-media profile URLs
- Approved photographs
- Actual repertoire
- Pricing or quotation approach
- Availability expectations
- Accessibility accommodations Natalee can offer
- Booking and cancellation policies
- Final legal business name
- Approved biography
- Whether privacy or terms pages require professional review
- Whether photographs involving children or senior-community residents may be published
- Required permissions and facility policies for such photographs
- Desired inquiry-response time
- Preferred email provider and booking inbox workflow
- Approved sender identity and any sender-domain DNS setup
- Whether requester confirmation emails should be sent after successful business-inbox delivery
- Whether the inline inquiry notice is sufficient for launch or a separate privacy page and professional review are needed
- Mailbox retention, deletion, access, and incident-handling practices for inquiry data

## 12. Agent update protocol

Every agent performing feature work must:

1. Read this file before planning or editing.
2. Confirm the requested work fits the current scope and claim boundaries.
3. Update **Current production state** for features actually implemented.
4. Update **Current limitations** for anything resolved, introduced, or still missing.
5. Update the relevant roadmap phase and status.
6. Add newly discovered open facts or decisions.
7. Record architecture, dependency, environment-variable, integration, privacy, or cost changes.
8. Update the validation baseline only with commands and checks actually completed.
9. Add one row to the change log below.
10. Include the `project-state.md` update in the same feature branch and pull request.

Do not mark a feature complete based only on planned work, local uncommitted work, or an unmerged pull request. Distinguish clearly among planned, implemented, merged, and deployed states.

## 13. Required feature completion checks

Before reporting a feature complete, agents should run the applicable checks:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- Relevant automated tests
- Local production smoke test when practical
- Responsive review
- Keyboard and focus review
- Secret and private-data review
- Unsupported-claims review
- Final Git diff and status review

Agents must report checks that were skipped, unavailable, or failed.

## 14. Change log

| Date | Milestone or feature | State | Summary | Reference |
| --- | --- | --- | --- | --- |
| 2026-07-12 | Milestone 1 website foundation | Deployed | Added the static-first Next.js homepage, accessibility baseline, SEO foundation, provisional branding, and project documentation. | PR #1 / merge `302fc3b` |
| 2026-07-12 | Canonical project-state tracker | Proposed | Added this scope, roadmap, and mandatory agent-maintenance protocol. | `docs/project-state-tracker` |
| 2026-07-12 | Inquiry-form foundation | Merged | Added a homepage inquiry form, server validation, low-friction spam controls, provider-neutral delivery boundary, accessible states, tests, and documentation; live email delivery remains intentionally unconfigured. | PR #3 / merge `671234d` |
| 2026-07-12 | Retirement-community service page | Merged | Added a reusable typed service-page pattern and a dedicated retirement-community page with careful planning content, FAQs, metadata, sitemap coverage, and homepage navigation. | PR #4 / merge `b3fb356` |
| 2026-07-12 | Private-events service page | Merged | Added a private-events page with configurable reusable-layout labels, careful planning content, FAQs, metadata, sitemap coverage, and homepage navigation. | PR #5 / merge `35bb6d8438e027e07f13d07071f9f1c4f4799ee4` |
| 2026-07-13 | Richmond-area service page and checker | Proposed | Added confirmed Richmond-area service language, a static service-area page, a privacy-conscious server-only Census address checker, dependency-free radius calculations, accessible result states, and focused automated coverage. | `codex/service-area-checker` |

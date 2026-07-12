# Project state

## Milestone 1 decisions

- The site is a single, static-first Next.js App Router application at the repository root.
- The homepage uses original CSS composition and a lightweight decorative harp SVG rather than stock photography or external design assets.
- The visual direction uses warm cream, deep plum, botanical green, and restrained gold with system font stacks.
- The site makes no booking, health, therapeutic, credential, pricing, or availability claims beyond confirmed facts.

## Current architecture

- `src/app` contains the App Router layout, homepage, metadata, robots route, sitemap route, icon, and global styling.
- `src/components` contains small server-rendered presentational components.
- No environment variables, database, API route, external service, analytics, or client-side application state is required.

## Implemented features

- A responsive homepage with header navigation, hero, performance options, About Natalee, music/recreation/well-being context, future booking process, booking-status notice, and footer.
- Root metadata, canonical URL, Open Graph text metadata, robots support, sitemap support, and an original provisional SVG icon.
- Keyboard skip navigation, visible focus styles, semantic landmarks, responsive spacing and typography, decorative SVG treatment, and reduced-motion behavior.

## Deliberately deferred

- Online booking submission, email delivery, contact details, database, authentication, scheduling, payments, CMS, analytics, media hosting, social embeds, final logo, final photography, detailed pages, legal policies, and production deployment.

## Known limitations

- The site is informational only; the request-information section intentionally has no form or contact method.
- The harp SVG and text wordmark are provisional visual elements, not approved final brand assets.
- Content is limited to supplied facts and does not include repertoire, service-area, pricing, or availability information.

## Validation status

- `pnpm lint`, `pnpm typecheck`, and `pnpm build` passed on 2026-07-12.
- A local production server returned HTTP 200 for `/` with no server errors.
- Browser review at 390px, 768px, and 1440px found no horizontal overflow or console errors.

## Facts still needed from John and Natalee

- Approved business contact email
- Confirmed service area
- Confirmed social-media URLs
- Approved photographs
- Actual repertoire
- Pricing or quotation approach
- Availability expectations
- Accessibility accommodations Natalee can offer
- Booking and cancellation policies
- Final legal business name
- Approved biography
- Whether a privacy policy or terms page requires professional review
- Whether the website may publish photographs involving children or senior-community residents
- Required permissions and facility policies for such photographs

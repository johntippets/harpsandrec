# Harps & Rec agent guide

## Project purpose

Harps & Rec is a small, cost-conscious website for Natalee Tippets' developing live harp performance and educational programming project. Keep the site warm, accessible, honest, and straightforward to maintain.

## Technical expectations

- Use the root-level Next.js App Router application with strict TypeScript, Tailwind CSS, and pnpm.
- Prefer static rendering and React Server Components. Add client-side JavaScript only when a feature genuinely requires it.
- Keep dependencies minimal. Do not add paid services, analytics, trackers, databases, form providers, or integrations without explicit approval.
- Do not commit generated output, `node_modules`, environment files, logs, or secrets.

## Content, privacy, and claims

- Preserve confirmed facts and clearly mark unknown facts for review instead of guessing.
- Harps & Rec provides live performances and educational programming; it is not healthcare, mental-health treatment, licensed music therapy, or clinical recreational therapy.
- Never invent qualifications, clients, testimonials, reviews, prices, repertoire, availability, contact information, service areas, or business details.
- Do not publish private contact information, customer data, addresses, photographs requiring permission, or credentials.

## Accessibility and quality

- Use semantic landmarks, logical heading order, visible keyboard focus, descriptive links, and responsive layouts.
- Preserve skip navigation, adequate contrast, decorative-image accessibility treatment, and reduced-motion support.
- Validate changes with `pnpm lint`, `pnpm typecheck`, and `pnpm build`.

## Git safety

- Inspect the working tree before editing and preserve unrelated changes.
- Work on a feature branch; do not commit directly to `main`, rewrite history, force-push, or alter repository settings.
- Review the complete diff for secrets, private information, unsupported claims, and generated files before committing.

# Harps & Rec agent guide

## Project purpose

Harps & Rec is a small, cost-conscious website for Natalee Tippets' developing live harp performance and educational programming project. Keep the site warm, accessible, honest, and straightforward to maintain.

## Required project-state workflow

- Read the root-level `project-state.md` before planning or editing.
- Treat `project-state.md` as the canonical source of truth for project scope, current implementation, limitations, roadmap status, open facts, and architectural decisions.
- Every feature branch or pull request that adds, changes, removes, or deploys website functionality must update `project-state.md` in the same branch.
- Update only what was actually implemented, merged, deployed, validated, or newly discovered. Clearly distinguish planned work from completed work.
- Add a change-log row and update applicable roadmap, validation, limitation, dependency, integration, privacy, cost, and open-decision sections.
- A feature is not complete until its project-state update is included and reviewed.

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
- Report any validation that was skipped, unavailable, or failed; never imply a check passed when it was not run.

## Git safety

- Inspect the working tree before editing and preserve unrelated changes.
- Work on a feature branch; do not commit directly to `main`, rewrite history, force-push, or alter repository settings.
- Review the complete diff for secrets, private information, unsupported claims, generated files, and an updated `project-state.md` before committing.

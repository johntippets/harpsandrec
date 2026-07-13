# Inquiry form foundation

The homepage inquiry form is a provider-neutral foundation. It validates and normalizes submissions on the server, applies modest spam signals, and calls a small delivery adapter. It does not store inquiries, send confirmation emails, or include a production email provider.

## Architecture

- `src/components/inquiry-form.tsx` provides the progressively enhanced form UI, pending state, error summary, field errors, and focus management.
- `src/app/actions/inquiry.ts` is the Server Action boundary. It creates the environment-appropriate delivery adapter and passes the request to the submission service.
- `src/lib/inquiry/validation.ts` owns server-authoritative normalization, validation, request-size checks, and bot signals.
- `src/lib/inquiry/submission.ts` ensures success is returned only after a delivery adapter reports a successful handoff.
- `src/lib/inquiry/delivery.ts` defines the provider-neutral adapter contract and the no-storage local fake.

The form carries personal data to the server action, but no submission data is logged or persisted. Do not add logging around `FormData`, normalized inquiries, or provider request bodies.

## Validation and spam controls

Server-side validation rejects missing required fields, invalid email addresses, invalid or past dates, repeated values, unexpected fields, files, overlong values, and normalized form content larger than 20,000 bytes. Text is trimmed, line endings are normalized, and email addresses are lowercased. Names, organizations, locations, and international phone formats are intentionally not narrowly patterned.

The first spam layer consists of an assistive-technology-safe honeypot, a three-second minimum completion signal, the request-size limit, and per-field limits. Suspected spam receives a generic failure and is not handed to delivery. These signals are intentionally modest and can be bypassed by a determined bot.

There is no production rate limiter. Reliable distributed rate limiting would require a persistent or external service; an in-memory counter would be misleading in a serverless deployment. Revisit this only if actual abuse warrants the cost and complexity.

## Delivery adapter contract

An `InquiryDeliveryAdapter` receives one validated `Inquiry` and returns either:

- `{ ok: true, mode: "provider" | "local-fake" }` after a successful handoff; or
- `{ ok: false, reason: "configuration" | "delivery" }` when it cannot hand off the inquiry.

Adapters may also throw; that becomes an unexpected-error state, never success. The future provider adapter should send a notification to the approved Harps & Rec inbox. It must not send an automatic requester confirmation unless that behavior and sender configuration are separately approved.

After John and Natalee approve a provider, add one adapter in `delivery.ts`, keep provider credentials server-only, map only the validated inquiry fields, avoid logging message bodies or contact details, and return success only after the provider reports an accepted handoff. Document provider-specific variables at that time instead of guessing their names now.

## Local and test behavior

Copy `.env.example` to `.env.local` only when exercising the deliberate fake transport:

```text
INQUIRY_DELIVERY_MODE=local-fake
```

The fake is permitted only when `NODE_ENV` is `development` or `test`. It records nothing and sends no email. Its success text explicitly says so. In production—or without that explicit local setting—the adapter returns a configuration error and the UI says the request was not sent or stored.

Set the same variable to `local-failure` in development to exercise the unexpected delivery-error state. That simulator also ignores all inquiry data. Both local modes are rejected when `NODE_ENV=production`.

No production credentials or provider variables exist yet. Future recurring cost depends on the approved provider; prefer a reliable free or low-cost tier after reviewing limits, sender-domain requirements, privacy terms, and operational fit.

## Tests and manual verification

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

For a local fake-delivery review, set `INQUIRY_DELIVERY_MODE=local-fake`, run `pnpm dev`, wait at least three seconds before submitting, and verify:

1. Empty and malformed submissions show a focused error summary linked to field errors and retain safe values.
2. A past preferred date is rejected without implying availability.
3. A valid local submission says no email was sent and clears the form.
4. Without the environment variable, a valid submission reports that delivery is not configured and retains values.
5. A filled honeypot, an immediate submission, unexpected fields, or excessive content receives a generic failure.
6. Pending text, keyboard focus, visible focus indicators, reduced-motion behavior, and layouts near 390px, 768px, and 1440px remain usable.
7. The browser console and server output contain no inquiry contents or personal data.

## Privacy decisions before live delivery

The inline notice is intentionally concise, not a comprehensive legal policy. Before enabling production delivery, John and Natalee still need to decide whether the site needs a separate privacy page and whether professional review is appropriate. They also need to approve the business inbox, provider, sender-domain setup, requester-confirmation behavior, and an operational process for retention and deletion inside the chosen mailbox.

import assert from "node:assert/strict";
import test from "node:test";

import {
  createInquiryDeliveryAdapter,
  createLocalFakeDeliveryAdapter,
  createUnconfiguredDeliveryAdapter,
  type InquiryDeliveryAdapter,
} from "../src/lib/inquiry/delivery";
import { processInquirySubmission } from "../src/lib/inquiry/submission";
import { MAX_INQUIRY_BYTES, validateInquiryFormData } from "../src/lib/inquiry/validation";

const now = new Date("2026-07-12T16:00:00.000Z");

function validForm(overrides: Record<string, string | string[]> = {}) {
  const values: Record<string, string | string[]> = {
    requesterName: "  Avery Example  ",
    organization: "Community organization",
    email: " AVERY@EXAMPLE.COM ",
    phone: "+44 20 7946 0958",
    eventType: "Library program",
    preferredDate: "2026-08-01",
    location: "Calvert County",
    audience: "Families and community members",
    duration: "Approximately 45 minutes",
    budgetRange: "Not sure yet",
    accessibility: "Step-free load-in route requested",
    musicRequests: "A familiar melody, if available",
    responseMethod: "either",
    message: "We are exploring a welcoming afternoon community program.",
    consent: "yes",
    website: "",
    startedAt: String(now.getTime() - 10_000),
    ...overrides,
  };
  const formData = new FormData();
  for (const [name, value] of Object.entries(values)) {
    for (const item of Array.isArray(value) ? value : [value]) formData.append(name, item);
  }
  return formData;
}

test("accepts and normalizes valid input", () => {
  const result = validateInquiryFormData(validForm(), { now });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.inquiry.requesterName, "Avery Example");
  assert.equal(result.inquiry.email, "avery@example.com");
});

test("reports missing required fields", () => {
  const result = validateInquiryFormData(validForm({ requesterName: "", message: "", consent: "" }), { now });
  assert.equal(result.ok, false);
  if (result.ok || result.kind !== "validation") return;
  assert.match(result.fieldErrors.requesterName ?? "", /required/);
  assert.match(result.fieldErrors.message ?? "", /required/);
  assert.match(result.fieldErrors.consent ?? "", /Confirm/);
});

test("rejects an invalid email address", () => {
  const result = validateInquiryFormData(validForm({ email: "not-an-email" }), { now });
  assert.equal(result.ok, false);
  if (result.ok || result.kind !== "validation") return;
  assert.match(result.fieldErrors.email ?? "", /valid email/);
});

test("rejects a past preferred date", () => {
  const result = validateInquiryFormData(validForm({ preferredDate: "2026-07-11" }), { now });
  assert.equal(result.ok, false);
  if (result.ok || result.kind !== "validation") return;
  assert.match(result.fieldErrors.preferredDate ?? "", /today or a future date/);
});

test("rejects oversized requests", () => {
  const result = validateInquiryFormData(validForm({ message: "x".repeat(MAX_INQUIRY_BYTES + 1) }), { now });
  assert.deepEqual(result.ok ? "valid" : result.kind, "request");
});

test("treats honeypot activation as suspected spam", () => {
  const result = validateInquiryFormData(validForm({ website: "https://bot.example" }), { now });
  assert.deepEqual(result.ok ? "valid" : result.kind, "spam");
});

test("treats implausibly fast completion as suspected spam", () => {
  const result = validateInquiryFormData(validForm({ startedAt: String(now.getTime() - 100) }), { now });
  assert.deepEqual(result.ok ? "valid" : result.kind, "spam");
});

test("rejects unexpected and repeated fields", () => {
  const unexpected = validForm({ admin: "true" });
  const unexpectedResult = validateInquiryFormData(unexpected, { now });
  assert.deepEqual(unexpectedResult.ok ? "valid" : unexpectedResult.kind, "request");

  const repeated = validForm({ email: ["one@example.com", "two@example.com"] });
  const repeatedResult = validateInquiryFormData(repeated, { now });
  assert.equal(repeatedResult.ok, false);
  if (repeatedResult.ok || repeatedResult.kind !== "validation") return;
  assert.match(repeatedResult.fieldErrors.email ?? "", /one value/);
});

test("returns an honest configuration error when delivery is unconfigured", async () => {
  const state = await processInquirySubmission(validForm(), {
    delivery: createUnconfiguredDeliveryAdapter(),
    now,
  });
  assert.equal(state.status, "configuration-error");
  assert.match(state.message, /not sent or stored/);
});

test("returns an unexpected error when the delivery adapter fails", async () => {
  const failingDelivery: InquiryDeliveryAdapter = {
    async deliver() {
      return { ok: false, reason: "delivery" };
    },
  };
  const state = await processInquirySubmission(validForm(), { delivery: failingDelivery, now });
  assert.equal(state.status, "unexpected-error");
  assert.match(state.message, /could not be handed off/);
});

test("reports deliberate local fake success without claiming an email was sent", async () => {
  const state = await processInquirySubmission(validForm(), {
    delivery: createLocalFakeDeliveryAdapter(),
    now,
  });
  assert.equal(state.status, "success");
  assert.equal(state.deliveryMode, "local-fake");
  assert.match(state.message, /no email was sent/);
});

test("rejects local simulator modes in production", async () => {
  for (const mode of ["local-fake", "local-failure"]) {
    const state = await processInquirySubmission(validForm(), {
      delivery: createInquiryDeliveryAdapter({
        NODE_ENV: "production",
        INQUIRY_DELIVERY_MODE: mode,
      }),
      now,
    });
    assert.equal(state.status, "configuration-error");
    assert.match(state.message, /not sent or stored/);
  }
});

test("success is impossible when delivery fails or throws", async () => {
  const failure: InquiryDeliveryAdapter = {
    async deliver() {
      return { ok: false, reason: "delivery" };
    },
  };
  const throwing: InquiryDeliveryAdapter = {
    async deliver() {
      throw new Error("provider unavailable");
    },
  };
  const failedState = await processInquirySubmission(validForm(), { delivery: failure, now });
  const thrownState = await processInquirySubmission(validForm(), { delivery: throwing, now });
  assert.notEqual(failedState.status, "success");
  assert.notEqual(thrownState.status, "success");
});

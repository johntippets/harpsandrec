import assert from "node:assert/strict";
import test from "node:test";

import { PUBLIC_MOSELEY_ZCTA_REFERENCE } from "../src/lib/service-area/constants";
import {
  classifyServiceAreaDistance,
  haversineDistanceMiles,
} from "../src/lib/service-area/distance";
import {
  geocodeCensusAddress,
  parseCensusGeocoderResponse,
} from "../src/lib/service-area/geocoder";
import { processServiceAreaSubmission } from "../src/lib/service-area/submission";
import type { GeocoderResult, ServiceAreaFields } from "../src/lib/service-area/types";
import {
  MAX_SERVICE_AREA_REQUEST_BYTES,
  validateServiceAreaFormData,
} from "../src/lib/service-area/validation";

const now = new Date("2026-07-13T16:00:00.000Z");

const validFields: ServiceAreaFields = {
  street: "9901 Lori Road",
  city: "Chesterfield",
  state: "VA",
  zip: "23832",
};

function validForm(overrides: Record<string, string | string[]> = {}): FormData {
  const values: Record<string, string | string[]> = {
    ...validFields,
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

function censusPayload(matches: unknown[]) {
  return { result: { addressMatches: matches } };
}

const validMatch = {
  coordinates: { x: -77.5, y: 37.5 },
  matchedAddress: "UNNEEDED STANDARDIZED ADDRESS",
  addressComponents: { city: "UNNEEDED" },
};

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

test("distance: the same coordinate returns zero", () => {
  assert.equal(
    haversineDistanceMiles(PUBLIC_MOSELEY_ZCTA_REFERENCE, PUBLIC_MOSELEY_ZCTA_REFERENCE),
    0,
  );
});

test("distance: one degree of latitude is approximately 69.1 miles", () => {
  const distance = haversineDistanceMiles(
    { latitude: 0, longitude: 0 },
    { latitude: 1, longitude: 0 },
  );
  assert.ok(Math.abs(distance - 69.1) < 0.2);
});

test("distance: exactly 50 miles is within the radius", () => {
  assert.deepEqual(classifyServiceAreaDistance(50), {
    withinRadius: true,
    nearBoundary: true,
  });
});

test("distance: slightly below 50 miles is within the radius", () => {
  assert.equal(classifyServiceAreaDistance(49.999).withinRadius, true);
});

test("distance: slightly above 50 miles is outside the radius", () => {
  assert.equal(classifyServiceAreaDistance(50.001).withinRadius, false);
});

test("distance: invalid coordinates and distances are rejected", () => {
  assert.throws(
    () => haversineDistanceMiles({ latitude: 91, longitude: 0 }, { latitude: 0, longitude: 0 }),
    RangeError,
  );
  assert.throws(() => classifyServiceAreaDistance(Number.NaN), RangeError);
});

test("geocoder parser: one match returns only a valid coordinate", () => {
  const parsed = parseCensusGeocoderResponse(censusPayload([validMatch]));
  assert.deepEqual(parsed, {
    kind: "match",
    coordinate: { latitude: 37.5, longitude: -77.5 },
  });
  assert.equal("matchedAddress" in parsed, false);
});

test("geocoder parser: zero matches returns no-match", () => {
  assert.deepEqual(parseCensusGeocoderResponse(censusPayload([])), { kind: "no-match" });
});

test("geocoder parser: multiple matches returns ambiguous", () => {
  assert.deepEqual(
    parseCensusGeocoderResponse(censusPayload([validMatch, validMatch])),
    { kind: "ambiguous" },
  );
});

test("geocoder parser: unexpected shapes and out-of-range coordinates are malformed", () => {
  assert.deepEqual(parseCensusGeocoderResponse({ result: {} }), { kind: "malformed" });
  assert.deepEqual(
    parseCensusGeocoderResponse(censusPayload([{ coordinates: { x: -77, y: 100 } }])),
    { kind: "malformed" },
  );
});

test("geocoder adapter: uses the fixed Census endpoint with no-store", async () => {
  let requestedUrl = "";
  let requestedInit: RequestInit | undefined;
  const result = await geocodeCensusAddress(validFields, {
    fetchImplementation: async (input, init) => {
      requestedUrl = input.toString();
      requestedInit = init;
      return jsonResponse(censusPayload([validMatch]));
    },
  });
  const url = new URL(requestedUrl);
  assert.equal(url.origin, "https://geocoding.geo.census.gov");
  assert.equal(url.pathname, "/geocoder/locations/address");
  assert.equal(url.searchParams.get("benchmark"), "Public_AR_Current");
  assert.equal(requestedInit?.cache, "no-store");
  assert.deepEqual(result, {
    kind: "match",
    coordinate: { latitude: 37.5, longitude: -77.5 },
  });
});

test("geocoder adapter: malformed JSON and response shapes are unavailable", async () => {
  const malformedJson = await geocodeCensusAddress(validFields, {
    fetchImplementation: async () =>
      new Response("{", { headers: { "content-type": "application/json" } }),
  });
  const malformedShape = await geocodeCensusAddress(validFields, {
    fetchImplementation: async () => jsonResponse({ result: { unexpected: [] } }),
  });
  assert.deepEqual(malformedJson, { kind: "unavailable" });
  assert.deepEqual(malformedShape, { kind: "unavailable" });
});

test("geocoder adapter: non-success and non-JSON responses are unavailable", async () => {
  const nonSuccess = await geocodeCensusAddress(validFields, {
    fetchImplementation: async () => jsonResponse({}, 503),
  });
  const nonJson = await geocodeCensusAddress(validFields, {
    fetchImplementation: async () =>
      new Response("temporarily unavailable", { headers: { "content-type": "text/plain" } }),
  });
  assert.deepEqual(nonSuccess, { kind: "unavailable" });
  assert.deepEqual(nonJson, { kind: "unavailable" });
});

test("geocoder adapter: timeout aborts the upstream request safely", async () => {
  const result = await geocodeCensusAddress(validFields, {
    timeoutMs: 5,
    fetchImplementation: async (_input, init) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      }),
  });
  assert.deepEqual(result, { kind: "timeout" });
});

test("submission validation: missing and malformed address fields are reported", () => {
  const result = validateServiceAreaFormData(
    validForm({ street: "", city: "", state: "Virginia", zip: "ABC" }),
    { now },
  );
  assert.equal(result.ok, false);
  if (result.ok || result.kind !== "validation") return;
  assert.match(result.fieldErrors.street ?? "", /required/);
  assert.match(result.fieldErrors.city ?? "", /required/);
  assert.match(result.fieldErrors.state ?? "", /two-letter/);
  assert.match(result.fieldErrors.zip ?? "", /five-digit/);
});

test("submission validation: oversized, repeated, unexpected, and file inputs are rejected", () => {
  const oversized = validateServiceAreaFormData(
    validForm({ street: "x".repeat(MAX_SERVICE_AREA_REQUEST_BYTES + 1) }),
    { now },
  );
  assert.deepEqual(oversized.ok ? "valid" : oversized.kind, "request");

  const repeated = validateServiceAreaFormData(
    validForm({ street: ["One Street", "Two Street"] }),
    { now },
  );
  assert.equal(repeated.ok, false);
  if (!repeated.ok) assert.equal(repeated.kind, "validation");

  const unexpected = validateServiceAreaFormData(validForm({ admin: "true" }), { now });
  assert.deepEqual(unexpected.ok ? "valid" : unexpected.kind, "request");

  const withFile = validForm();
  withFile.append("street", new Blob(["file"]), "address.txt");
  const fileResult = validateServiceAreaFormData(withFile, { now });
  assert.deepEqual(fileResult.ok ? "valid" : fileResult.kind, "request");
});

test("submission validation: honeypot and implausibly fast checks are rejected", () => {
  const honeypot = validateServiceAreaFormData(validForm({ website: "filled" }), { now });
  const tooFast = validateServiceAreaFormData(
    validForm({ startedAt: String(now.getTime() - 100) }),
    { now },
  );
  assert.deepEqual(honeypot.ok ? "valid" : honeypot.kind, "spam");
  assert.deepEqual(tooFast.ok ? "valid" : tooFast.kind, "spam");
});

test("submission workflow: valid matches return within and outside estimates", async () => {
  const within = await processServiceAreaSubmission(
    validForm(),
    { geocodeAddress: async () => ({ kind: "match", coordinate: PUBLIC_MOSELEY_ZCTA_REFERENCE }), now },
  );
  const outside = await processServiceAreaSubmission(
    validForm(),
    {
      geocodeAddress: async () => ({
        kind: "match",
        coordinate: {
          latitude: PUBLIC_MOSELEY_ZCTA_REFERENCE.latitude + 1,
          longitude: PUBLIC_MOSELEY_ZCTA_REFERENCE.longitude,
        },
      }),
      now,
    },
  );
  assert.equal(within.status, "result");
  assert.equal(within.withinRadius, true);
  assert.equal(outside.status, "result");
  assert.equal(outside.withinRadius, false);
});

test("submission workflow: no-match, ambiguous, timeout, and upstream errors never return success", async () => {
  const results: GeocoderResult[] = [
    { kind: "no-match" },
    { kind: "ambiguous" },
    { kind: "timeout" },
    { kind: "unavailable" },
  ];
  for (const geocoderResult of results) {
    const state = await processServiceAreaSubmission(validForm(), {
      geocodeAddress: async () => geocoderResult,
      now,
    });
    assert.notEqual(state.status, "result");
    assert.equal(state.distanceMiles, undefined);
  }
});

test("submission workflow: a thrown geocoder error becomes a generic unavailable state", async () => {
  const state = await processServiceAreaSubmission(validForm(), {
    geocodeAddress: async () => {
      throw new Error("upstream detail that must not reach the visitor");
    },
    now,
  });
  assert.equal(state.status, "unavailable");
  assert.doesNotMatch(state.message, /upstream detail/);
});

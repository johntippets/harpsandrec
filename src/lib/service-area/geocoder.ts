import { isValidCoordinate } from "./distance";
import type { GeocoderResult, ServiceAreaFields } from "./types";

const CENSUS_GEOCODER_URL =
  "https://geocoding.geo.census.gov/geocoder/locations/address";
const CENSUS_BENCHMARK = "Public_AR_Current";
const DEFAULT_TIMEOUT_MS = 8_000;

type FetchImplementation = (input: string | URL, init?: RequestInit) => Promise<Response>;

type CensusParserResult =
  | Extract<GeocoderResult, { kind: "match" | "no-match" | "ambiguous" }>
  | { kind: "malformed" };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseCensusGeocoderResponse(payload: unknown): CensusParserResult {
  if (!isRecord(payload) || !isRecord(payload.result)) return { kind: "malformed" };

  const matches = payload.result.addressMatches;
  if (!Array.isArray(matches)) return { kind: "malformed" };
  if (matches.length === 0) return { kind: "no-match" };
  if (matches.length > 1) return { kind: "ambiguous" };

  const match = matches[0];
  if (!isRecord(match) || !isRecord(match.coordinates)) return { kind: "malformed" };

  const latitude = match.coordinates.y;
  const longitude = match.coordinates.x;
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return { kind: "malformed" };
  }
  const coordinate = { latitude, longitude };
  if (!isValidCoordinate(coordinate)) return { kind: "malformed" };

  // Deliberately return only the coordinate needed for the distance estimate.
  return { kind: "match", coordinate };
}

export async function geocodeCensusAddress(
  fields: ServiceAreaFields,
  options: { fetchImplementation?: FetchImplementation; timeoutMs?: number } = {},
): Promise<GeocoderResult> {
  const fetchImplementation = options.fetchImplementation ?? fetch;
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  );

  const url = new URL(CENSUS_GEOCODER_URL);
  url.searchParams.set("street", fields.street);
  url.searchParams.set("city", fields.city);
  url.searchParams.set("state", fields.state);
  url.searchParams.set("zip", fields.zip);
  url.searchParams.set("benchmark", CENSUS_BENCHMARK);
  url.searchParams.set("format", "json");

  try {
    const response = await fetchImplementation(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) return { kind: "unavailable" };
    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
    if (!contentType.includes("application/json")) return { kind: "unavailable" };

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      return { kind: "unavailable" };
    }

    const parsed = parseCensusGeocoderResponse(payload);
    return parsed.kind === "malformed" ? { kind: "unavailable" } : parsed;
  } catch (error) {
    if (controller.signal.aborted || (error instanceof Error && error.name === "AbortError")) {
      return { kind: "timeout" };
    }
    return { kind: "unavailable" };
  } finally {
    clearTimeout(timeout);
  }
}

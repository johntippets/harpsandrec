import {
  emptyServiceAreaFields,
  serviceAreaFieldNames,
  type ServiceAreaFieldErrors,
  type ServiceAreaFields,
} from "./types";

const securityFieldNames = ["website", "startedAt"] as const;
const allowedFieldNames = new Set<string>([...serviceAreaFieldNames, ...securityFieldNames]);

export const MAX_SERVICE_AREA_REQUEST_BYTES = 2_000;
export const MIN_SERVICE_AREA_COMPLETION_TIME_MS = 1_500;

const fieldRules: Record<
  keyof ServiceAreaFields,
  { min: number; max: number; label: string }
> = {
  street: { min: 3, max: 120, label: "Event street address" },
  city: { min: 2, max: 80, label: "City" },
  state: { min: 2, max: 2, label: "State" },
  zip: { min: 5, max: 10, label: "ZIP code" },
};

const statePattern = /^[A-Z]{2}$/;
const zipPattern = /^\d{5}(?:-\d{4})?$/;

export type ServiceAreaValidationResult =
  | { ok: true; fields: ServiceAreaFields }
  | {
      ok: false;
      kind: "validation";
      fields: ServiceAreaFields;
      fieldErrors: ServiceAreaFieldErrors;
    }
  | { ok: false; kind: "request" | "spam"; fields: ServiceAreaFields };

function normalizeSingleLine(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function readSingleText(
  formData: FormData,
  name: string,
): { value: string; repeatedOrFile: boolean } {
  const values = formData.getAll(name);
  if (values.length === 0) return { value: "", repeatedOrFile: false };
  if (values.length !== 1 || typeof values[0] !== "string") {
    return { value: "", repeatedOrFile: true };
  }
  return { value: normalizeSingleLine(values[0]), repeatedOrFile: false };
}

export function validateServiceAreaFormData(
  formData: FormData,
  options: { now?: Date; minimumCompletionTimeMs?: number } = {},
): ServiceAreaValidationResult {
  const fields = { ...emptyServiceAreaFields };
  const fieldErrors: ServiceAreaFieldErrors = {};
  const entries = [...formData.entries()];

  const hasUnexpectedField = entries.some(
    ([name]) => !allowedFieldNames.has(name) && !name.startsWith("$ACTION_"),
  );
  const hasFile = entries.some(([, value]) => typeof value !== "string");
  const byteSize = entries.reduce((total, [name, value]) => {
    const valueSize = typeof value === "string" ? Buffer.byteLength(value, "utf8") : value.size;
    return total + Buffer.byteLength(name, "utf8") + valueSize;
  }, 0);

  for (const name of serviceAreaFieldNames) {
    const result = readSingleText(formData, name);
    fields[name] = result.value;
    if (result.repeatedOrFile) {
      fieldErrors[name] = "Please submit one text value for this field.";
    }
  }
  fields.state = fields.state.toUpperCase();

  if (hasUnexpectedField || hasFile || byteSize > MAX_SERVICE_AREA_REQUEST_BYTES) {
    return { ok: false, kind: "request", fields };
  }

  const honeypot = readSingleText(formData, "website");
  const startedAt = readSingleText(formData, "startedAt");
  const now = options.now ?? new Date();
  const startedAtNumber = Number(startedAt.value);
  const minimumCompletionTimeMs =
    options.minimumCompletionTimeMs ?? MIN_SERVICE_AREA_COMPLETION_TIME_MS;
  const tooFast =
    startedAt.repeatedOrFile ||
    !Number.isFinite(startedAtNumber) ||
    startedAtNumber <= 0 ||
    startedAtNumber > now.getTime() ||
    now.getTime() - startedAtNumber < minimumCompletionTimeMs;

  if (honeypot.repeatedOrFile || honeypot.value || tooFast) {
    return { ok: false, kind: "spam", fields };
  }

  for (const name of serviceAreaFieldNames) {
    if (fieldErrors[name]) continue;
    const value = fields[name];
    const rule = fieldRules[name];
    if (value.length < rule.min) {
      fieldErrors[name] = value
        ? `${rule.label} must be at least ${rule.min} characters.`
        : `${rule.label} is required.`;
    } else if (value.length > rule.max) {
      fieldErrors[name] = `${rule.label} must be ${rule.max} characters or fewer.`;
    }
  }

  if (fields.state && !statePattern.test(fields.state)) {
    fieldErrors.state = "Enter a two-letter U.S. state abbreviation, such as VA.";
  }
  if (fields.zip && !zipPattern.test(fields.zip)) {
    fieldErrors.zip = "Enter a five-digit ZIP code or ZIP+4.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, kind: "validation", fields, fieldErrors };
  }

  return { ok: true, fields };
}

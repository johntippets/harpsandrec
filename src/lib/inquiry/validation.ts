import {
  emptyInquiryFields,
  inquiryFieldNames,
  type Inquiry,
  type InquiryFieldErrors,
  type InquiryFields,
} from "./types";

const securityFieldNames = ["website", "startedAt"] as const;
const allowedFieldNames = new Set<string>([...inquiryFieldNames, ...securityFieldNames]);

export const MAX_INQUIRY_BYTES = 20_000;
export const MIN_COMPLETION_TIME_MS = 3_000;

const limits: Partial<Record<keyof InquiryFields, { min?: number; max: number; label: string }>> = {
  requesterName: { min: 2, max: 100, label: "Requester name" },
  organization: { max: 120, label: "Organization" },
  email: { min: 3, max: 254, label: "Email address" },
  phone: { max: 40, label: "Phone number" },
  eventType: { min: 2, max: 80, label: "Event or program type" },
  preferredDate: { min: 10, max: 10, label: "Preferred event date" },
  location: { min: 2, max: 160, label: "General event location" },
  audience: { min: 2, max: 200, label: "Audience or group" },
  duration: { min: 2, max: 160, label: "Performance duration or timing needs" },
  budgetRange: { max: 100, label: "Budget range" },
  accessibility: { max: 1_000, label: "Accessibility or setup considerations" },
  musicRequests: { max: 1_000, label: "Special music requests" },
  responseMethod: { max: 20, label: "Preferred response method" },
  message: { min: 10, max: 3_000, label: "Event details or message" },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const validResponseMethods = new Set(["", "email", "phone", "either"]);

export type ValidationResult =
  | { ok: true; inquiry: Inquiry; fields: InquiryFields }
  | { ok: false; kind: "validation"; fields: InquiryFields; fieldErrors: InquiryFieldErrors }
  | { ok: false; kind: "spam" | "request"; fields: InquiryFields };

type ValidationOptions = {
  now?: Date;
  minimumCompletionTimeMs?: number;
};

function normalizeText(value: string): string {
  return value.replace(/\r\n?/g, "\n").trim();
}

function easternDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((entry) => entry.type === type)?.value ?? "";

  return `${part("year")}-${part("month")}-${part("day")}`;
}

function isRealDate(value: string): boolean {
  if (!datePattern.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function readSingleText(formData: FormData, name: string): { value: string; repeated: boolean } {
  const values = formData.getAll(name);
  if (values.length === 0) return { value: "", repeated: false };
  if (values.length !== 1 || typeof values[0] !== "string") {
    return { value: "", repeated: true };
  }
  return { value: normalizeText(values[0]), repeated: false };
}

export function validateInquiryFormData(
  formData: FormData,
  options: ValidationOptions = {},
): ValidationResult {
  const fields = { ...emptyInquiryFields };
  const fieldErrors: InquiryFieldErrors = {};
  const now = options.now ?? new Date();

  for (const name of inquiryFieldNames) {
    const result = readSingleText(formData, name);
    fields[name] = result.value;
    if (result.repeated) fieldErrors[name] = "Please submit one value for this field.";
  }
  fields.email = fields.email.toLowerCase();

  const entries = [...formData.entries()];
  const hasUnexpectedField = entries.some(
    ([name]) => !allowedFieldNames.has(name) && !name.startsWith("$ACTION_"),
  );
  const byteSize = entries.reduce((total, [name, value]) => {
    const text = typeof value === "string" ? value : `[file:${value.size}]`;
    return total + Buffer.byteLength(name, "utf8") + Buffer.byteLength(text, "utf8");
  }, 0);

  if (hasUnexpectedField || byteSize > MAX_INQUIRY_BYTES) {
    return { ok: false, kind: "request", fields };
  }

  const honeypot = readSingleText(formData, "website");
  const startedAt = readSingleText(formData, "startedAt");
  const startedAtNumber = Number(startedAt.value);
  const minimumTime = options.minimumCompletionTimeMs ?? MIN_COMPLETION_TIME_MS;
  const tooFast =
    startedAt.repeated ||
    !Number.isFinite(startedAtNumber) ||
    startedAtNumber <= 0 ||
    startedAtNumber > now.getTime() ||
    now.getTime() - startedAtNumber < minimumTime;

  if (honeypot.repeated || honeypot.value || tooFast) {
    return { ok: false, kind: "spam", fields };
  }

  for (const [name, rule] of Object.entries(limits) as [keyof InquiryFields, NonNullable<(typeof limits)[keyof InquiryFields]>][]) {
    if (fieldErrors[name]) continue;
    const value = fields[name];
    if (rule.min && value.length < rule.min) {
      fieldErrors[name] = value
        ? `${rule.label} must be at least ${rule.min} characters.`
        : `${rule.label} is required.`;
    } else if (value.length > rule.max) {
      fieldErrors[name] = `${rule.label} must be ${rule.max} characters or fewer.`;
    }
  }

  if (fields.email && !emailPattern.test(fields.email)) {
    fieldErrors.email = "Enter a valid email address, such as name@example.com.";
  }

  if (fields.preferredDate && !isRealDate(fields.preferredDate)) {
    fieldErrors.preferredDate = "Enter a valid preferred event date.";
  } else if (fields.preferredDate && fields.preferredDate < easternDate(now)) {
    fieldErrors.preferredDate = "Choose today or a future date. You can explain flexible timing in the message.";
  }

  if (!validResponseMethods.has(fields.responseMethod)) {
    fieldErrors.responseMethod = "Choose email, phone, either, or leave this blank.";
  } else if (fields.responseMethod === "phone" && !fields.phone) {
    fieldErrors.phone = "Add a phone number if you prefer a phone response.";
  }

  if (fields.consent !== "yes") {
    fieldErrors.consent = "Confirm that Harps & Rec may use this information to respond to your inquiry.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, kind: "validation", fields, fieldErrors };
  }

  return { ok: true, inquiry: fields as Inquiry, fields };
}

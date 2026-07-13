export const inquiryFieldNames = [
  "requesterName",
  "organization",
  "email",
  "phone",
  "eventType",
  "preferredDate",
  "location",
  "audience",
  "duration",
  "budgetRange",
  "accessibility",
  "musicRequests",
  "responseMethod",
  "message",
  "consent",
] as const;

export type InquiryFieldName = (typeof inquiryFieldNames)[number];

export type InquiryFields = Record<InquiryFieldName, string>;

export type Inquiry = InquiryFields & {
  consent: "yes";
};

export type InquiryFieldErrors = Partial<Record<InquiryFieldName, string>>;

export type InquiryFormState = {
  status: "idle" | "validation-error" | "configuration-error" | "success" | "unexpected-error";
  message: string;
  fields: InquiryFields;
  fieldErrors: InquiryFieldErrors;
  revision: number;
  deliveryMode?: "provider" | "local-fake";
};

export const emptyInquiryFields: InquiryFields = {
  requesterName: "",
  organization: "",
  email: "",
  phone: "",
  eventType: "",
  preferredDate: "",
  location: "",
  audience: "",
  duration: "",
  budgetRange: "",
  accessibility: "",
  musicRequests: "",
  responseMethod: "",
  message: "",
  consent: "",
};

export const initialInquiryFormState: InquiryFormState = {
  status: "idle",
  message: "",
  fields: emptyInquiryFields,
  fieldErrors: {},
  revision: 0,
};

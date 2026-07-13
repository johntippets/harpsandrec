export type Coordinate = {
  latitude: number;
  longitude: number;
};

export const serviceAreaFieldNames = ["street", "city", "state", "zip"] as const;

export type ServiceAreaFieldName = (typeof serviceAreaFieldNames)[number];
export type ServiceAreaFields = Record<ServiceAreaFieldName, string>;
export type ServiceAreaFieldErrors = Partial<Record<ServiceAreaFieldName, string>>;

export type GeocoderResult =
  | { kind: "match"; coordinate: Coordinate }
  | { kind: "no-match" }
  | { kind: "ambiguous" }
  | { kind: "unavailable" }
  | { kind: "timeout" };

export type ServiceAreaFormState = {
  status:
    | "idle"
    | "validation-error"
    | "request-error"
    | "no-match"
    | "ambiguous"
    | "unavailable"
    | "timeout"
    | "result";
  message: string;
  fields: ServiceAreaFields;
  fieldErrors: ServiceAreaFieldErrors;
  revision: number;
  distanceMiles?: number;
  withinRadius?: boolean;
  nearBoundary?: boolean;
};

export const emptyServiceAreaFields: ServiceAreaFields = {
  street: "",
  city: "",
  state: "",
  zip: "",
};

export const initialServiceAreaFormState: ServiceAreaFormState = {
  status: "idle",
  message: "",
  fields: emptyServiceAreaFields,
  fieldErrors: {},
  revision: 0,
};

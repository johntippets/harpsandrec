import { PUBLIC_MOSELEY_ZCTA_REFERENCE } from "./constants";
import { classifyServiceAreaDistance, haversineDistanceMiles } from "./distance";
import type { GeocoderResult, ServiceAreaFormState, ServiceAreaFields } from "./types";
import { validateServiceAreaFormData } from "./validation";

type ServiceAreaSubmissionDependencies = {
  geocodeAddress: (fields: ServiceAreaFields) => Promise<GeocoderResult>;
  now?: Date;
  minimumCompletionTimeMs?: number;
};

function errorState(
  status: Exclude<ServiceAreaFormState["status"], "idle" | "validation-error" | "result">,
  message: string,
  fields: ServiceAreaFields,
  revision: number,
): ServiceAreaFormState {
  return { status, message, fields, fieldErrors: {}, revision };
}

export async function processServiceAreaSubmission(
  formData: FormData,
  dependencies: ServiceAreaSubmissionDependencies,
  revision = 1,
): Promise<ServiceAreaFormState> {
  const validation = validateServiceAreaFormData(formData, {
    now: dependencies.now,
    minimumCompletionTimeMs: dependencies.minimumCompletionTimeMs,
  });

  if (!validation.ok) {
    if (validation.kind === "validation") {
      return {
        status: "validation-error",
        message: "Please correct the highlighted address fields and try again.",
        fields: validation.fields,
        fieldErrors: validation.fieldErrors,
        revision,
      };
    }
    return errorState(
      "request-error",
      "We could not process this check. Review the form, wait a moment, and try again.",
      validation.fields,
      revision,
    );
  }

  let geocoderResult: GeocoderResult;
  try {
    geocoderResult = await dependencies.geocodeAddress(validation.fields);
  } catch {
    geocoderResult = { kind: "unavailable" };
  }

  if (geocoderResult.kind === "no-match") {
    return errorState(
      "no-match",
      "We could not estimate the distance from that address. Check the street, city, state, and ZIP code and try again.",
      validation.fields,
      revision,
    );
  }
  if (geocoderResult.kind === "ambiguous") {
    return errorState(
      "ambiguous",
      "The Census service returned more than one possible location. Add or check the street, city, state, and ZIP code and try again.",
      validation.fields,
      revision,
    );
  }
  if (geocoderResult.kind === "timeout") {
    return errorState(
      "timeout",
      "The distance service took too long to respond. No estimate was created. Please try again later.",
      validation.fields,
      revision,
    );
  }
  if (geocoderResult.kind === "unavailable") {
    return errorState(
      "unavailable",
      "The distance service is temporarily unavailable. No estimate was created. Please try again later.",
      validation.fields,
      revision,
    );
  }

  let distanceMiles: number;
  try {
    distanceMiles = haversineDistanceMiles(
      PUBLIC_MOSELEY_ZCTA_REFERENCE,
      geocoderResult.coordinate,
    );
  } catch {
    return errorState(
      "unavailable",
      "The distance service returned an unusable result. No estimate was created. Please try again later.",
      validation.fields,
      revision,
    );
  }

  const classification = classifyServiceAreaDistance(distanceMiles);
  return {
    status: "result",
    message: classification.withinRadius
      ? "This location appears to be within our approximate 50-mile service area."
      : "This location appears to be outside our current 50-mile service area.",
    fields: validation.fields,
    fieldErrors: {},
    revision,
    distanceMiles: Math.round(distanceMiles * 10) / 10,
    ...classification,
  };
}

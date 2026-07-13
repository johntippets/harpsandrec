"use server";

import { geocodeCensusAddress } from "@/lib/service-area/geocoder";
import { processServiceAreaSubmission } from "@/lib/service-area/submission";
import type { ServiceAreaFormState } from "@/lib/service-area/types";

export async function submitServiceAreaCheck(
  previousState: ServiceAreaFormState,
  formData: FormData,
): Promise<ServiceAreaFormState> {
  return processServiceAreaSubmission(
    formData,
    { geocodeAddress: geocodeCensusAddress },
    previousState.revision + 1,
  );
}

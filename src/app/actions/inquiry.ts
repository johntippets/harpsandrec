"use server";

import { createInquiryDeliveryAdapter } from "@/lib/inquiry/delivery";
import { processInquirySubmission } from "@/lib/inquiry/submission";
import type { InquiryFormState } from "@/lib/inquiry/types";

export async function submitInquiry(
  previousState: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  return processInquirySubmission(
    formData,
    { delivery: createInquiryDeliveryAdapter() },
    previousState.revision + 1,
  );
}

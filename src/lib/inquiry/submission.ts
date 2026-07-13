import type { InquiryDeliveryAdapter } from "./delivery";
import { emptyInquiryFields, type InquiryFormState } from "./types";
import { validateInquiryFormData } from "./validation";

type SubmissionDependencies = {
  delivery: InquiryDeliveryAdapter;
  now?: Date;
};

export async function processInquirySubmission(
  formData: FormData,
  dependencies: SubmissionDependencies,
  revision = 1,
): Promise<InquiryFormState> {
  const validation = validateInquiryFormData(formData, { now: dependencies.now });

  if (!validation.ok) {
    if (validation.kind === "validation") {
      return {
        status: "validation-error",
        message: "Please correct the highlighted fields and try again.",
        fields: validation.fields,
        fieldErrors: validation.fieldErrors,
        revision,
      };
    }

    return {
      status: "unexpected-error",
      message: "We couldn’t process this request. Please review the form, wait a moment, and try again.",
      fields: validation.fields,
      fieldErrors: {},
      revision,
    };
  }

  let deliveryResult;
  try {
    deliveryResult = await dependencies.delivery.deliver(validation.inquiry);
  } catch {
    return {
      status: "unexpected-error",
      message: "The inquiry could not be handed off. No success has been recorded. Please try again later.",
      fields: validation.fields,
      fieldErrors: {},
      revision,
    };
  }

  if (!deliveryResult.ok) {
    if (deliveryResult.reason === "configuration") {
      return {
        status: "configuration-error",
        message: "Online inquiry delivery is not configured yet. Your request was not sent or stored.",
        fields: validation.fields,
        fieldErrors: {},
        revision,
      };
    }

    return {
      status: "unexpected-error",
      message: "The inquiry could not be handed off. No success has been recorded. Please try again later.",
      fields: validation.fields,
      fieldErrors: {},
      revision,
    };
  }

  return {
    status: "success",
    message:
      deliveryResult.mode === "local-fake"
        ? "Local test completed. The fake delivery adapter accepted the form, but no email was sent and no inquiry was stored."
        : "Your inquiry was handed off successfully. This does not confirm availability or create a booking.",
    fields: emptyInquiryFields,
    fieldErrors: {},
    revision,
    deliveryMode: deliveryResult.mode,
  };
}

import type { Inquiry } from "./types";

export type DeliveryResult =
  | { ok: true; mode: "provider" | "local-fake" }
  | { ok: false; reason: "configuration" | "delivery" };

export interface InquiryDeliveryAdapter {
  deliver(inquiry: Inquiry): Promise<DeliveryResult>;
}

export function createUnconfiguredDeliveryAdapter(): InquiryDeliveryAdapter {
  return {
    async deliver() {
      return { ok: false, reason: "configuration" };
    },
  };
}

export function createLocalFakeDeliveryAdapter(): InquiryDeliveryAdapter {
  return {
    async deliver() {
      // Deliberately does not log, store, or copy inquiry data.
      return { ok: true, mode: "local-fake" };
    },
  };
}

export function createLocalFailureDeliveryAdapter(): InquiryDeliveryAdapter {
  return {
    async deliver() {
      // Deliberately simulates failure without logging, storing, or copying inquiry data.
      return { ok: false, reason: "delivery" };
    },
  };
}

export function createInquiryDeliveryAdapter(
  environment: NodeJS.ProcessEnv = process.env,
): InquiryDeliveryAdapter {
  const localFakeRequested = environment.INQUIRY_DELIVERY_MODE === "local-fake";
  const localFailureRequested = environment.INQUIRY_DELIVERY_MODE === "local-failure";
  const localFakeAllowed = environment.NODE_ENV === "development" || environment.NODE_ENV === "test";

  if (localFakeRequested && localFakeAllowed) return createLocalFakeDeliveryAdapter();
  if (localFailureRequested && localFakeAllowed) return createLocalFailureDeliveryAdapter();

  // Add an approved provider adapter here after the inbox, provider, and sender are confirmed.
  return createUnconfiguredDeliveryAdapter();
}

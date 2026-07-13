"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { submitServiceAreaCheck } from "@/app/actions/service-area";
import {
  initialServiceAreaFormState,
  type ServiceAreaFieldName,
} from "@/lib/service-area/types";

const errorOrder: { name: ServiceAreaFieldName; label: string }[] = [
  { name: "street", label: "Event street address" },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "zip", label: "ZIP code" },
];

function CheckerSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button button--primary service-area-form__submit" disabled={pending} type="submit">
      {pending ? "Estimating distance…" : "Check event location"}
    </button>
  );
}

function describedBy(...ids: (string | false | undefined)[]) {
  return ids.filter(Boolean).join(" ") || undefined;
}

export function ServiceAreaChecker() {
  const [state, formAction] = useActionState(
    submitServiceAreaCheck,
    initialServiceAreaFormState,
  );
  const [startedAt] = useState(() => Date.now().toString());
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.revision > 0) statusRef.current?.focus();
  }, [state.revision]);

  const errors = errorOrder.filter(({ name }) => state.fieldErrors[name]);
  const errorProps = (name: ServiceAreaFieldName, helpId?: string) => ({
    "aria-describedby": describedBy(
      helpId,
      state.fieldErrors[name] && `${name}-area-error`,
    ),
    "aria-invalid": state.fieldErrors[name] ? (true as const) : undefined,
  });
  const isResult = state.status === "result";

  return (
    <form action={formAction} className="service-area-form" noValidate>
      <input name="startedAt" type="hidden" value={startedAt} readOnly />
      <div className="inquiry-form__honeypot" aria-hidden="true">
        <label htmlFor="service-area-website">Leave this field blank</label>
        <input
          autoComplete="off"
          id="service-area-website"
          name="website"
          tabIndex={-1}
          type="text"
        />
      </div>

      {state.status !== "idle" && (
        <div
          className={`service-area-result ${isResult ? (state.withinRadius ? "service-area-result--within" : "service-area-result--outside") : "service-area-result--error"}`}
          ref={statusRef}
          role={isResult ? "status" : "alert"}
          tabIndex={-1}
        >
          <h3>{isResult ? "Estimated service-area result" : "Distance not estimated"}</h3>
          <p className="service-area-result__lead">{state.message}</p>
          {isResult && typeof state.distanceMiles === "number" && (
            <>
              <p>
                The estimated straight-line distance is about {state.distanceMiles.toFixed(1)} miles from the public Moseley/23120 reference point. Actual driving distance and travel time may be greater.
              </p>
              <p>
                {state.nearBoundary
                  ? "This estimate is near the service-area boundary, so small geocoding or reference-point differences may affect the result. "
                  : ""}
                This result does not confirm availability, pricing, venue suitability, or a booking.
              </p>
            </>
          )}
          {errors.length > 0 && (
            <ul>
              {errors.map(({ name, label }) => (
                <li key={name}>
                  <a href={`#service-area-${name}`}>
                    {label}: {state.fieldErrors[name]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <fieldset>
        <legend>Event or venue address</legend>
        <p className="service-area-form__intro">
          Enter a United States event location. Use a venue or event address rather than personal contact information.
        </p>
        <div className="form-grid">
          <div className="form-field form-field--full">
            <label htmlFor="service-area-street">
              Event street address <span aria-hidden="true">*</span>
            </label>
            <input
              autoComplete="address-line1"
              defaultValue={state.fields.street}
              id="service-area-street"
              maxLength={120}
              name="street"
              placeholder="123 Example Street"
              required
              type="text"
              {...errorProps("street", "service-area-street-help")}
            />
            <p className="field-help" id="service-area-street-help">
              Include the building number and street name.
            </p>
            {state.fieldErrors.street && (
              <p className="field-error" id="street-area-error">{state.fieldErrors.street}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="service-area-city">
              City <span aria-hidden="true">*</span>
            </label>
            <input
              autoComplete="address-level2"
              defaultValue={state.fields.city}
              id="service-area-city"
              maxLength={80}
              name="city"
              required
              type="text"
              {...errorProps("city")}
            />
            {state.fieldErrors.city && (
              <p className="field-error" id="city-area-error">{state.fieldErrors.city}</p>
            )}
          </div>

          <div className="form-field service-area-form__short-fields">
            <div>
              <label htmlFor="service-area-state">
                State <span aria-hidden="true">*</span>
              </label>
              <input
                autoCapitalize="characters"
                autoComplete="address-level1"
                defaultValue={state.fields.state}
                id="service-area-state"
                maxLength={2}
                name="state"
                placeholder="VA"
                required
                type="text"
                {...errorProps("state")}
              />
              {state.fieldErrors.state && (
                <p className="field-error" id="state-area-error">{state.fieldErrors.state}</p>
              )}
            </div>
            <div>
              <label htmlFor="service-area-zip">
                ZIP code <span aria-hidden="true">*</span>
              </label>
              <input
                autoComplete="postal-code"
                defaultValue={state.fields.zip}
                id="service-area-zip"
                inputMode="numeric"
                maxLength={10}
                name="zip"
                placeholder="23120"
                required
                type="text"
                {...errorProps("zip")}
              />
              {state.fieldErrors.zip && (
                <p className="field-error" id="zip-area-error">{state.fieldErrors.zip}</p>
              )}
            </div>
          </div>
        </div>
      </fieldset>

      <aside className="service-area-privacy" aria-labelledby="service-area-privacy-heading">
        <h3 id="service-area-privacy-heading">How the address is used</h3>
        <p>
          Harps &amp; Rec uses the address only for this distance estimate and does not store it. The server sends it to the U.S. Census Bureau’s geocoding service to obtain an approximate coordinate. The checker does not create an inquiry or booking.
        </p>
      </aside>

      <div className="service-area-form__actions">
        <CheckerSubmitButton />
        <p aria-live="polite">The result is an estimate, not a travel or availability confirmation.</p>
      </div>
    </form>
  );
}

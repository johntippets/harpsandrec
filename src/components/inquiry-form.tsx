"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { submitInquiry } from "@/app/actions/inquiry";
import {
  initialInquiryFormState,
  type InquiryFieldName,
} from "@/lib/inquiry/types";

const errorOrder: { name: InquiryFieldName; label: string }[] = [
  { name: "requesterName", label: "Requester name" },
  { name: "organization", label: "Organization" },
  { name: "email", label: "Email address" },
  { name: "phone", label: "Phone number" },
  { name: "eventType", label: "Event or program type" },
  { name: "preferredDate", label: "Preferred event date" },
  { name: "location", label: "General event location" },
  { name: "audience", label: "Audience or group" },
  { name: "duration", label: "Performance duration or timing needs" },
  { name: "budgetRange", label: "Budget range" },
  { name: "accessibility", label: "Accessibility or setup considerations" },
  { name: "musicRequests", label: "Special music requests" },
  { name: "responseMethod", label: "Preferred response method" },
  { name: "message", label: "Event details or message" },
  { name: "consent", label: "Consent acknowledgment" },
];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button button--primary inquiry-form__submit" disabled={pending} type="submit">
      {pending ? "Checking your request…" : "Submit inquiry"}
    </button>
  );
}

function describedBy(...ids: (string | false | undefined)[]) {
  return ids.filter(Boolean).join(" ") || undefined;
}

export function InquiryForm() {
  const [state, formAction] = useActionState(submitInquiry, initialInquiryFormState);
  const [startedAt] = useState(() => Date.now().toString());
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.revision === 0) return;
    if (state.status === "validation-error") summaryRef.current?.focus();
    else statusRef.current?.focus();
  }, [state.revision, state.status]);

  const { fields, fieldErrors } = state;
  const errors = errorOrder.filter(({ name }) => fieldErrors[name]);
  const errorProps = (name: InquiryFieldName, helpId?: string) => ({
    "aria-describedby": describedBy(helpId, fieldErrors[name] && `${name}-error`),
    "aria-invalid": fieldErrors[name] ? (true as const) : undefined,
  });

  return (
    <form action={formAction} className="inquiry-form" key={state.revision} noValidate>
      <input name="startedAt" type="hidden" value={startedAt} readOnly />
      <div className="inquiry-form__honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
      </div>

      {errors.length > 0 && (
        <div className="form-alert form-alert--error" ref={summaryRef} role="alert" tabIndex={-1}>
          <h3>There are problems with your inquiry</h3>
          <p>{state.message}</p>
          <ul>
            {errors.map(({ name, label }) => (
              <li key={name}>
                <a href={`#${name}`}>{label}: {fieldErrors[name]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {state.status !== "idle" && state.status !== "validation-error" && (
        <div
          className={`form-alert form-alert--${state.status}`}
          ref={statusRef}
          role={state.status === "success" ? "status" : "alert"}
          tabIndex={-1}
        >
          <h3>{state.status === "success" ? "Submission result" : "Inquiry not sent"}</h3>
          <p>{state.message}</p>
        </div>
      )}

      <p className="required-note"><span aria-hidden="true">*</span> Required field</p>

      <fieldset>
        <legend>Your contact information</legend>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="requesterName">Requester name <span aria-hidden="true">*</span></label>
            <input
              autoComplete="name"
              defaultValue={fields.requesterName}
              id="requesterName"
              maxLength={100}
              name="requesterName"
              required
              type="text"
              {...errorProps("requesterName")}
            />
            {fieldErrors.requesterName && <p className="field-error" id="requesterName-error">{fieldErrors.requesterName}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="organization">Organization <span className="label-note">(optional)</span></label>
            <input
              autoComplete="organization"
              defaultValue={fields.organization}
              id="organization"
              maxLength={120}
              name="organization"
              type="text"
              {...errorProps("organization")}
            />
            {fieldErrors.organization && <p className="field-error" id="organization-error">{fieldErrors.organization}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
            <input
              autoComplete="email"
              defaultValue={fields.email}
              id="email"
              inputMode="email"
              maxLength={254}
              name="email"
              required
              type="email"
              {...errorProps("email")}
            />
            {fieldErrors.email && <p className="field-error" id="email-error">{fieldErrors.email}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone number <span className="label-note">(optional)</span></label>
            <input
              autoComplete="tel"
              defaultValue={fields.phone}
              id="phone"
              inputMode="tel"
              maxLength={40}
              name="phone"
              type="tel"
              {...errorProps("phone", "phone-help")}
            />
            <p className="field-help" id="phone-help">International formats are welcome.</p>
            {fieldErrors.phone && <p className="field-error" id="phone-error">{fieldErrors.phone}</p>}
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="responseMethod">Preferred response method <span className="label-note">(optional)</span></label>
            <select defaultValue={fields.responseMethod} id="responseMethod" name="responseMethod" {...errorProps("responseMethod") }>
              <option value="">No preference</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="either">Either email or phone</option>
            </select>
            {fieldErrors.responseMethod && <p className="field-error" id="responseMethod-error">{fieldErrors.responseMethod}</p>}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Event or program details</legend>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="eventType">Event or program type <span aria-hidden="true">*</span></label>
            <input
              defaultValue={fields.eventType}
              id="eventType"
              list="event-type-options"
              maxLength={80}
              name="eventType"
              required
              type="text"
              {...errorProps("eventType", "eventType-help")}
            />
            <datalist id="event-type-options">
              <option value="Retirement or senior-living community" />
              <option value="Private event" />
              <option value="School or library program" />
              <option value="Church or community gathering" />
              <option value="Family or children’s program" />
            </datalist>
            <p className="field-help" id="eventType-help">Choose a suggestion or describe another type.</p>
            {fieldErrors.eventType && <p className="field-error" id="eventType-error">{fieldErrors.eventType}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="preferredDate">Preferred event date <span aria-hidden="true">*</span></label>
            <input
              defaultValue={fields.preferredDate}
              id="preferredDate"
              name="preferredDate"
              required
              type="date"
              {...errorProps("preferredDate", "preferredDate-help")}
            />
            <p className="field-help" id="preferredDate-help">A preferred date does not promise availability.</p>
            {fieldErrors.preferredDate && <p className="field-error" id="preferredDate-error">{fieldErrors.preferredDate}</p>}
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="location">General event location <span aria-hidden="true">*</span></label>
            <input
              autoComplete="address-level2"
              defaultValue={fields.location}
              id="location"
              maxLength={160}
              name="location"
              required
              type="text"
              {...errorProps("location", "location-help")}
            />
            <p className="field-help" id="location-help">City, county, or venue area only. Please do not enter a home address.</p>
            {fieldErrors.location && <p className="field-error" id="location-error">{fieldErrors.location}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="audience">Audience or group <span aria-hidden="true">*</span></label>
            <input
              defaultValue={fields.audience}
              id="audience"
              maxLength={200}
              name="audience"
              required
              type="text"
              {...errorProps("audience", "audience-help")}
            />
            <p className="field-help" id="audience-help">Describe the group generally; do not identify individual residents, patients, or children.</p>
            {fieldErrors.audience && <p className="field-error" id="audience-error">{fieldErrors.audience}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="duration">Approximate duration or timing needs <span aria-hidden="true">*</span></label>
            <input
              defaultValue={fields.duration}
              id="duration"
              maxLength={160}
              name="duration"
              required
              type="text"
              {...errorProps("duration", "duration-help")}
            />
            <p className="field-help" id="duration-help">For example, a time window or approximate length.</p>
            {fieldErrors.duration && <p className="field-error" id="duration-error">{fieldErrors.duration}</p>}
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="budgetRange">Budget range <span className="label-note">(optional)</span></label>
            <input
              defaultValue={fields.budgetRange}
              id="budgetRange"
              list="budget-options"
              maxLength={100}
              name="budgetRange"
              type="text"
              {...errorProps("budgetRange", "budgetRange-help")}
            />
            <datalist id="budget-options"><option value="Not sure yet" /></datalist>
            <p className="field-help" id="budgetRange-help">Share a range if you have one, or choose “Not sure yet.” This is not a quote.</p>
            {fieldErrors.budgetRange && <p className="field-error" id="budgetRange-error">{fieldErrors.budgetRange}</p>}
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="accessibility">Accessibility or setup considerations <span className="label-note">(optional)</span></label>
            <textarea
              defaultValue={fields.accessibility}
              id="accessibility"
              maxLength={1000}
              name="accessibility"
              rows={4}
              {...errorProps("accessibility", "accessibility-help")}
            />
            <p className="field-help" id="accessibility-help">Share practical access or setup needs without medical information or diagnoses. No accommodation is guaranteed by this request.</p>
            {fieldErrors.accessibility && <p className="field-error" id="accessibility-error">{fieldErrors.accessibility}</p>}
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="musicRequests">Special music requests <span className="label-note">(optional)</span></label>
            <textarea
              defaultValue={fields.musicRequests}
              id="musicRequests"
              maxLength={1000}
              name="musicRequests"
              rows={4}
              {...errorProps("musicRequests", "musicRequests-help")}
            />
            <p className="field-help" id="musicRequests-help">Requests help with planning but do not guarantee repertoire or availability.</p>
            {fieldErrors.musicRequests && <p className="field-error" id="musicRequests-error">{fieldErrors.musicRequests}</p>}
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="message">Event details or message <span aria-hidden="true">*</span></label>
            <textarea
              defaultValue={fields.message}
              id="message"
              maxLength={3000}
              name="message"
              required
              rows={7}
              {...errorProps("message", "message-help")}
            />
            <p className="field-help" id="message-help">Include the information that would help review the request. Please leave out payment, medical, and other sensitive personal information.</p>
            {fieldErrors.message && <p className="field-error" id="message-error">{fieldErrors.message}</p>}
          </div>
        </div>
      </fieldset>

      <div className="inquiry-privacy" id="inquiry-privacy">
        <h3>How this information is used</h3>
        <p>
          Submitted information is used only to review and respond to this request. Do not submit sensitive medical or personal information. Submission does not confirm availability or create a booking.
        </p>
        <p>
          Harps &amp; Rec provides performances and educational programming—not healthcare, mental-health treatment, clinical recreational therapy, or licensed music therapy.
        </p>
      </div>

      <div className="consent-field">
        <input
          defaultChecked={fields.consent === "yes"}
          id="consent"
          name="consent"
          required
          type="checkbox"
          value="yes"
          {...errorProps("consent", "inquiry-privacy")}
        />
        <div>
          <label htmlFor="consent">I understand that Harps &amp; Rec will use this information to respond to my inquiry. <span aria-hidden="true">*</span></label>
          {fieldErrors.consent && <p className="field-error" id="consent-error">{fieldErrors.consent}</p>}
        </div>
      </div>

      <div className="inquiry-form__actions">
        <SubmitButton />
        <p aria-live="polite">Submitting this form does not confirm a performance.</p>
      </div>
    </form>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { HarpMotif } from "@/components/harp-motif";
import { ServiceAreaChecker } from "@/components/service-area-checker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Richmond-Area Harp Performance Service Area | Harps & Rec",
  description:
    "Harps & Rec is based in Moseley, Virginia and generally considers performances within an approximate 50-mile radius. Check an event location.",
  alternates: { canonical: "/service-area" },
  openGraph: {
    title: "Richmond-Area Harp Performance Service Area | Harps & Rec",
    description:
      "Check whether a United States event location appears to be within approximately 50 straight-line miles of the public Moseley, Virginia 23120 reference point.",
    url: "/service-area",
    siteName: "Harps & Rec",
    locale: "en_US",
    type: "website",
  },
};

export default function ServiceAreaPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="service-area-hero" aria-labelledby="service-area-heading">
          <div className="shell service-area-hero__grid">
            <div>
              <Link className="service-back-link" href="/#performances">
                <span aria-hidden="true">←</span> Performance settings
              </Link>
              <p className="eyebrow">Richmond-area service</p>
              <h1 id="service-area-heading">Is your event location within the general service area?</h1>
              <p className="service-area-hero__lede">
                Harps &amp; Rec is based in Moseley, Virginia 23120 and generally considers performances within an approximate 50-mile radius.
              </p>
              <a className="button button--primary" href="#check-location">Check an event location</a>
            </div>
            <div className="service-area-hero__art" aria-hidden="true">
              <div className="service-area-hero__ring" />
              <HarpMotif />
              <span>approximately 50 miles</span>
            </div>
          </div>
        </section>

        <section className="section service-area-checker-section" id="check-location" aria-labelledby="checker-heading">
          <div className="shell service-area-checker-layout">
            <div className="service-area-checker-copy">
              <p className="eyebrow">Address-distance checker</p>
              <h2 id="checker-heading">Estimate the straight-line distance.</h2>
              <p>
                The checker compares a Census-generated coordinate for the event address with a public representative point for ZIP Code Tabulation Area 23120. It does not use Natalee’s home address or a residential coordinate.
              </p>
              <p>
                Straight-line distance is different from driving distance. Roads, travel time, venue access, timing, route, setup, and other practical details still need to be considered.
              </p>
            </div>
            <ServiceAreaChecker />
          </div>
        </section>

        <section className="section service-area-details" aria-labelledby="details-heading">
          <div className="shell">
            <div className="section-intro section-intro--split">
              <div>
                <p className="eyebrow">Understanding the estimate</p>
                <h2 id="details-heading">A useful first check, with clear limits.</h2>
              </div>
              <p>
                A result inside the radius does not confirm availability, pricing, suitability, travel feasibility, or a booking. Results near 50 miles deserve extra care because both geocoding and representative-area points are approximate.
              </p>
            </div>
            <div className="service-area-detail-grid">
              <article>
                <h3>Public reference point</h3>
                <p>
                  The origin is the representative internal point for ZCTA 23120 in the official 2025 U.S. Census Gazetteer. It represents a ZIP-area geography, not a residence.
                </p>
                <a href="https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.2025.html">
                  View the Census Gazetteer source <span aria-hidden="true">↗</span>
                </a>
              </article>
              <article>
                <h3>External geocoding</h3>
                <p>
                  The server sends the submitted event address to the official U.S. Census Bureau Geocoding Services API. Harps &amp; Rec does not store the address or return the Census service’s standardized-address details to the browser.
                </p>
              </article>
              <article>
                <h3>Planning still comes next</h3>
                <p>
                  If the estimate looks promising, review the performance settings and prepare an inquiry. Every date, venue, route, and performance plan must be considered separately.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="service-cta" aria-labelledby="service-area-cta-heading">
          <div className="shell service-cta__inner">
            <div>
              <p className="eyebrow">Continue planning</p>
              <h2 id="service-area-cta-heading">Explore the setting before preparing an inquiry.</h2>
              <p>Location is one planning detail. Audience, room, timing, access, and the purpose of the gathering matter too.</p>
            </div>
            <div className="service-area-cta-links">
              <Link className="button button--primary" href="/#performances">View performance settings</Link>
              <Link className="button button--text" href="/#planning-process">Review the inquiry process</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

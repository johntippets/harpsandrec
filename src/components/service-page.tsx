import Link from "next/link";

import { HarpMotif } from "@/components/harp-motif";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { ServicePageContent } from "@/lib/services/types";

type ServicePageProps = {
  content: ServicePageContent;
};

export function ServicePage({ content }: ServicePageProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="service-hero" aria-labelledby="service-heading">
          <div className="shell service-hero__grid">
            <div className="service-hero__content">
              <Link className="service-back-link" href="/#performances">
                <span aria-hidden="true">←</span> Performance settings
              </Link>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1 id="service-heading">{content.title}</h1>
              <div className="service-hero__introduction">
                {content.introduction.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <Link className="service-area-inline-link" href="/service-area">
                  Check an event location <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="service-hero__art" aria-hidden="true">
              <div className="service-hero__shape" />
              <HarpMotif className="service-hero__harp" />
              {content.heroDecorativeWords.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section service-possibilities" aria-labelledby="possibilities-heading">
          <div className="shell">
            <div className="section-intro section-intro--split">
              <div>
                <p className="eyebrow">{content.possibilitiesEyebrow}</p>
                <h2 id="possibilities-heading">{content.possibilitiesTitle}</h2>
              </div>
              <p>{content.possibilitiesIntro}</p>
            </div>
            <div className="service-card-grid">
              {content.possibilities.map((item, index) => (
                <article className="service-card" key={item.title}>
                  <p className="card-number">{String(index + 1).padStart(2, "0")}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section service-planning" aria-labelledby="planning-heading">
          <div className="shell service-planning__grid">
            <div>
              <p className="eyebrow">{content.checklistEyebrow}</p>
              <h2 id="planning-heading">{content.checklistTitle}</h2>
              <p className="service-planning__intro">{content.checklistIntro}</p>
            </div>
            <ul className="service-checklist">
              {content.checklist.map((item) => (
                <li key={item.title}>
                  <span aria-hidden="true">✓</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section service-boundary" aria-labelledby="boundary-heading">
          <div className="shell service-boundary__inner">
            <p className="eyebrow">{content.boundaryEyebrow}</p>
            <h2 id="boundary-heading">{content.boundaryTitle}</h2>
            {content.boundaryParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="section service-faq" aria-labelledby="faq-heading">
          <div className="shell service-faq__grid">
            <div>
              <p className="eyebrow">{content.faqEyebrow}</p>
              <h2 id="faq-heading">{content.faqTitle}</h2>
            </div>
            <dl className="faq-list">
              {content.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt>{faq.question}</dt>
                  <dd>{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="service-cta" aria-labelledby="service-cta-heading">
          <div className="shell service-cta__inner">
            <div>
              <p className="eyebrow">{content.ctaEyebrow}</p>
              <h2 id="service-cta-heading">{content.ctaTitle}</h2>
              <p>{content.ctaDescription}</p>
            </div>
            <Link className="button button--primary" href={content.ctaHref}>
              {content.ctaLabel}
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

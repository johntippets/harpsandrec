import Link from "next/link";

import { HarpMotif } from "@/components/harp-motif";
import { InquiryForm } from "@/components/inquiry-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const performanceOptions = [
  {
    number: "01",
    title: "Retirement communities",
    description:
      "Live harp music is being planned to create a welcoming shared experience for residents, guests, and staff—one that leaves room for listening, conversation, and simple enjoyment.",
    href: "/retirement-communities",
    linkLabel: "Explore retirement community programs",
  },
  {
    number: "02",
    title: "Private events",
    description:
      "Live harp music is being explored for celebrations, family gatherings, meaningful occasions, receptions, community gatherings, and other private events.",
    href: "/private-events",
    linkLabel: "Explore private-event music",
  },
  {
    number: "03",
    title: "Children & community programs",
    description:
      "Engaging harp demonstrations, musical exploration, and age-appropriate educational programming are in development for schools, libraries, families, children’s groups, and community organizations.",
    href: undefined,
    linkLabel: undefined,
  },
];

const bookingSteps = [
  "Share event details",
  "Discuss the audience and setting",
  "Confirm a performance plan",
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <aside className="location-strip" aria-labelledby="location-strip-heading">
          <div className="shell location-strip__inner">
            <div>
              <strong id="location-strip-heading">Serving the Richmond, Virginia area</strong>
              <p>Based in Moseley, VA 23120 <span aria-hidden="true">•</span> Generally traveling within an approximate 50-mile radius.</p>
            </div>
            <Link href="/service-area">Check your event location <span aria-hidden="true">→</span></Link>
          </div>
        </aside>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="shell hero__grid">
            <div className="hero__content">
              <p className="eyebrow">Live harp music for Richmond-area gatherings</p>
              <h1 id="hero-heading">Harp music for meaningful moments.</h1>
              <p className="hero__lede">
                Harps &amp; Rec is a new performance project by Natalee Tippets, created to bring warm live harp music to retirement communities, private events, children’s programs, and community gatherings.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#request-performance">
                  Request a performance
                </a>
                <a className="button button--text" href="#performances">
                  Explore performances <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="hero__art" aria-hidden="true">
              <div className="hero__sun" />
              <div className="hero__arc hero__arc--outer" />
              <div className="hero__arc hero__arc--inner" />
              <HarpMotif className="hero__harp" />
              <span className="hero__note hero__note--one">✦</span>
              <span className="hero__note hero__note--two">✦</span>
            </div>
          </div>
        </section>

        <section className="section performances" id="performances" aria-labelledby="performances-heading">
          <div className="shell">
            <div className="section-intro section-intro--split">
              <div>
                <p className="eyebrow">Planned performance offerings</p>
                <h2 id="performances-heading">Music that makes room for people to gather.</h2>
              </div>
              <p>
                Each offering is being shaped with care for its setting, audience, and the kind of welcome a live instrument can help create.
              </p>
            </div>
            <div className="performance-grid">
              {performanceOptions.map((option) => (
                <article className="performance-card" key={option.number}>
                  <p className="card-number">{option.number}</p>
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                  {option.href && (
                    <Link className="performance-card__link" href={option.href}>
                      {option.linkLabel} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                  <span className="card-line" aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about" id="about-natalee" aria-labelledby="about-heading">
          <div className="shell about__grid">
            <div className="about__art" aria-hidden="true">
              <div className="about__shape" />
              <HarpMotif className="about__harp" />
              <p>music<br />+ recreation</p>
            </div>
            <div className="about__content">
              <p className="eyebrow">About Natalee</p>
              <h2 id="about-heading">A project rooted in curiosity, practice, and community.</h2>
              <p>
                Natalee Tippets is developing Harps &amp; Rec as a way to practice consistently and share live harp music. The project brings together her interests in music, recreation, learning, and community experiences.
              </p>
              <p>
                Natalee previously worked for Calvert County, Maryland Parks and Recreation and studied recreational therapy. Harps &amp; Rec is a developing performance and educational project inspired by those experiences.
              </p>
            </div>
          </div>
        </section>

        <section className="section wellbeing" id="music-wellbeing" aria-labelledby="wellbeing-heading">
          <div className="shell wellbeing__grid">
            <div>
              <p className="eyebrow">Music, recreation &amp; well-being</p>
              <h2 id="wellbeing-heading">Small moments of shared attention can matter.</h2>
            </div>
            <div className="wellbeing__content">
              <p>
                Music and recreation can support connection, engagement, enjoyment, and meaningful shared experiences. A live harp can invite curiosity, make space for conversation, and add a gentle point of interest to a gathering.
              </p>
              <p>
                Harps &amp; Rec offers live performances and educational programming. It is not healthcare, mental-health treatment, or licensed music therapy.
              </p>
            </div>
          </div>
        </section>

        <section className="section process" id="planning-process" aria-labelledby="process-heading">
          <div className="shell">
            <div className="section-intro section-intro--centered">
              <p className="eyebrow">A simple inquiry process</p>
              <h2 id="process-heading">Planning for a thoughtful fit.</h2>
              <p>
                Start by sharing the details that would help shape a comfortable, useful performance plan. An inquiry begins a conversation; it does not confirm availability or create a booking.
              </p>
            </div>
            <ol className="process-list">
              {bookingSteps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step}</h3>
                </li>
              ))}
            </ol>
            <p className="process-note">
              You can share an event type, preferred date, general location, audience, approximate duration, practical setup considerations, and music requests below.
            </p>
          </div>
        </section>

        <section className="section inquiry-section" id="request-performance" aria-labelledby="inquiry-heading">
          <div className="shell inquiry-section__layout">
            <div className="inquiry-section__intro">
              <p className="eyebrow">Request a performance</p>
              <h2 id="inquiry-heading">Tell us about your gathering.</h2>
              <p>
                Share the information available now. The form is ready for review, but live email delivery remains intentionally unavailable until a business inbox and provider are approved.
              </p>
              <p>
                You will see an honest result after submitting. A success message appears only when the configured delivery adapter reports a successful handoff.
              </p>
            </div>
            <InquiryForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

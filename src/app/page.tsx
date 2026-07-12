import { HarpMotif } from "@/components/harp-motif";
import { SiteHeader } from "@/components/site-header";

const performanceOptions = [
  {
    number: "01",
    title: "Retirement communities",
    description:
      "Live harp music is being planned to create a welcoming shared experience for residents, guests, and staff—one that leaves room for listening, conversation, and simple enjoyment.",
  },
  {
    number: "02",
    title: "Weddings & private events",
    description:
      "Harp music for ceremonies, gatherings, and meaningful occasions, thoughtfully developed around the feeling of the day and the people coming together.",
  },
  {
    number: "03",
    title: "Children & community programs",
    description:
      "Engaging harp demonstrations, musical exploration, and age-appropriate educational programming are in development for schools, libraries, families, children’s groups, and community organizations.",
  },
];

const bookingSteps = [
  "Share event details",
  "Discuss the audience and setting",
  "Confirm a performance plan",
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="shell hero__grid">
            <div className="hero__content">
              <p className="eyebrow">Live harp music for local gatherings</p>
              <h1 id="hero-heading">Harp music for meaningful moments.</h1>
              <p className="hero__lede">
                Harps &amp; Rec is a new performance project by Natalee Tippets, created to bring warm live harp music to retirement communities, weddings, children’s programs, and community events.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#performances">
                  Explore performances
                </a>
                <a className="button button--text" href="#about-natalee">
                  Meet Natalee <span aria-hidden="true">→</span>
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

        <section className="section process" aria-labelledby="process-heading">
          <div className="shell">
            <div className="section-intro section-intro--centered">
              <p className="eyebrow">A simple future process</p>
              <h2 id="process-heading">Planning for a thoughtful fit.</h2>
              <p>
                A booking workflow is still ahead. When it is ready, the conversation will begin with the details that help shape a comfortable, useful performance plan.
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
              Useful request information will eventually include event type, preferred date, general location, audience, approximate duration, accessibility considerations, and special requests.
            </p>
          </div>
        </section>

        <section className="booking-status" id="request-information" aria-labelledby="booking-heading">
          <div className="shell booking-status__inner">
            <div>
              <p className="eyebrow">Request information</p>
              <h2 id="booking-heading">Booking details are coming soon.</h2>
            </div>
            <p>
              Online booking requests are coming in a future milestone. Contact details will be added after the business booking address and workflow are confirmed.
            </p>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="shell site-footer__inner">
          <div>
            <p className="wordmark">Harps <span>&amp;</span> Rec</p>
            <p>harpsandrec.com</p>
          </div>
          <p>© {year} Harps &amp; Rec. Booking details coming soon.</p>
        </div>
      </footer>
    </>
  );
}

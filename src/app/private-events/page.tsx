import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page";
import type { ServicePageContent } from "@/lib/services/types";

export const metadata: Metadata = {
  title: "Harp Music for Private Events | Harps & Rec",
  description:
    "Explore thoughtful live harp music planning possibilities for private celebrations, gatherings, receptions, and meaningful occasions.",
  alternates: {
    canonical: "/private-events",
  },
  openGraph: {
    title: "Harp Music for Private Events | Harps & Rec",
    description:
      "Live harp music planning possibilities for private gatherings and meaningful occasions.",
    url: "/private-events",
    siteName: "Harps & Rec",
    locale: "en_US",
    type: "website",
  },
};

const privateEventContent: ServicePageContent = {
  eyebrow: "Private events & meaningful occasions",
  title: "Live harp music for gatherings worth remembering.",
  introduction: [
    "Harps & Rec is developing live harp performance options for private events. Hosts, families, venues, and event organizers can begin with a conversation about the occasion, setting, guest experience, and practical details that matter most.",
    "A first conversation does not require a finished plan. It can explore the atmosphere you hope to create and the information that may help shape a possible performance plan, depending on the setting and what is confirmed together.",
  ],
  heroDecorativeWords: ["atmosphere", "gathering", "occasion"],
  possibilitiesEyebrow: "Planning possibilities",
  possibilitiesTitle: "What live music might help shape.",
  possibilitiesIntro:
    "These are topics that may be explored during planning, not fixed offerings or promises. The most useful starting point is the kind of gathering you are imagining and how live music might fit within it.",
  possibilities: [
    {
      title: "Arrival and atmosphere",
      description:
        "A conversation may explore the feeling hosts hope guests experience as they arrive, gather, and settle into the occasion.",
    },
    {
      title: "Meaningful moments and transitions",
      description:
        "Organizers might share important timing, entrances, toasts, welcomes, or other transitions that could be useful to discuss in a possible performance plan.",
    },
    {
      title: "Celebrations and gatherings",
      description:
        "Private celebrations, family gatherings, receptions, community gatherings, and other meaningful occasions can each call for a different planning conversation.",
    },
    {
      title: "General music preferences",
      description:
        "Broad preferences and music requests may help with planning, while remaining requests rather than confirmation that particular repertoire is available.",
    },
  ],
  checklistEyebrow: "Event planning checklist",
  checklistTitle: "Gather the details you already know.",
  checklistIntro:
    "A few general details can make a first inquiry more useful. Please share a venue or general location rather than a home address, and leave out payment or other sensitive personal information.",
  checklist: [
    {
      title: "Type of occasion",
      description:
        "Describe the celebration, gathering, reception, community event, or other private occasion in general terms.",
    },
    {
      title: "Preferred date and time window",
      description:
        "Share the timing you have in mind. An inquiry does not reserve a date or confirm availability.",
    },
    {
      title: "Venue or general location",
      description:
        "A venue name, city, county, or general area is enough for an initial discussion; do not submit a home address.",
    },
    {
      title: "Setting and guest experience",
      description:
        "Note whether the setting may be indoors or outdoors, an approximate guest count, and the role you hope live music might play. Feasibility can be discussed separately.",
    },
    {
      title: "Timing and transitions",
      description:
        "Share any moments, time windows, or transitions that seem important to the occasion, even if the schedule is still taking shape.",
    },
    {
      title: "Music and practical access",
      description:
        "General music requests, loading, parking, stairs, elevators, and the route to the setting can all be useful planning topics without confirming repertoire or setup.",
    },
  ],
  boundaryEyebrow: "Clear expectations",
  boundaryTitle: "A performance plan is confirmed separately.",
  boundaryParagraphs: [
    "An inquiry starts a conversation; it does not reserve a date or create a booking. Music requests do not confirm repertoire, and venue-specific or outdoor feasibility must be discussed before a plan is confirmed.",
    "Pricing, availability, setup details, and the eventual performance plan remain separate decisions. Harps & Rec provides performance and educational programming, not healthcare or clinical therapy.",
  ],
  faqEyebrow: "Common questions",
  faqTitle: "A few useful answers.",
  faqs: [
    {
      question: "Does submitting an inquiry reserve the date?",
      answer:
        "No. An inquiry begins a conversation and does not reserve a date, confirm availability, or create a booking.",
    },
    {
      question: "May we share music requests?",
      answer:
        "Yes. General requests can help with planning, but they do not confirm that particular repertoire is available.",
    },
    {
      question: "What venue information is helpful?",
      answer:
        "A venue name, general location, room or outdoor setting, and practical access details can be helpful. Please do not submit a home address.",
    },
    {
      question: "Can an outdoor setting be discussed?",
      answer:
        "Yes. Share the general setting and practical considerations you know. Whether a specific setting is feasible would need to be discussed and confirmed separately.",
    },
  ],
  ctaEyebrow: "A thoughtful first step",
  ctaTitle: "Start with the details you know.",
  ctaDescription:
    "Review the planning process before preparing an inquiry. Live email delivery is not yet enabled, so the site will not claim that an unconfigured request was received.",
  ctaLabel: "Prepare a private-event inquiry",
  ctaHref: "/#planning-process",
};

export default function PrivateEventsPage() {
  return <ServicePage content={privateEventContent} />;
}

import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page";
import type { ServicePageContent } from "@/lib/services/types";

export const metadata: Metadata = {
  title: "Harp Programs for Retirement Communities | Harps & Rec",
  description:
    "Explore possible live harp performance and educational program elements for retirement and senior-living communities.",
  alternates: {
    canonical: "/retirement-communities",
  },
  openGraph: {
    title: "Harp Programs for Retirement Communities | Harps & Rec",
    description:
      "Thoughtful live harp performance and educational programming possibilities for retirement and senior-living communities.",
    url: "/retirement-communities",
    siteName: "Harps & Rec",
    locale: "en_US",
    type: "website",
  },
};

const retirementCommunityContent: ServicePageContent = {
  eyebrow: "Retirement & senior-living communities",
  title: "Live harp music with room to listen, notice, and gather.",
  introduction: [
    "Harps & Rec is developing live performance and educational programming for retirement and senior-living communities. The goal is a warm shared experience that can welcome residents alongside activity directors, community-life teams, families, guests, and staff.",
    "Every community and gathering is different. A first conversation can focus on the people, room, purpose, and practical details before any performance plan is confirmed.",
  ],
  heroDecorativeWords: ["music", "conversation", "curiosity"],
  possibilitiesEyebrow: "Possible program elements",
  possibilitiesTitle: "What a program might look like.",
  possibilitiesIntro:
    "A program could combine several simple elements depending on the setting, audience, and plan developed with the organizer. These are possibilities for discussion, not fixed packages or promises.",
  possibilities: [
    {
      title: "Live listening",
      description:
        "A shared opportunity to hear the harp in person, with the musical content discussed during planning rather than assumed in advance.",
    },
    {
      title: "A brief harp introduction",
      description:
        "A simple look at the instrument, how it produces sound, or a few details that can help listeners notice what they are hearing.",
    },
    {
      title: "Conversation and questions",
      description:
        "When the setting supports it, there may be room for general questions, observations, or conversation about the harp and live music.",
    },
    {
      title: "Educational elements",
      description:
        "An organizer may wish to explore a program with approachable learning elements shaped for the gathering without making clinical or therapeutic claims.",
    },
  ],
  checklistEyebrow: "Organizer planning checklist",
  checklistTitle: "Helpful details for a first conversation.",
  checklistIntro:
    "You do not need a finished plan before reaching out. General information in these areas can help begin a useful discussion without sharing private resident information.",
  checklist: [
    {
      title: "Audience",
      description:
        "Describe the group generally, including whether residents, families, guests, or staff may attend. Please do not identify individual residents or share medical details.",
    },
    {
      title: "Room type",
      description:
        "Share whether the gathering may use a common room, activity space, dining area, outdoor setting, or another general type of space.",
    },
    {
      title: "Date and timing",
      description:
        "Offer a preferred date and general time window. An inquiry does not confirm availability.",
    },
    {
      title: "Event purpose",
      description:
        "Explain whether this is a regular community activity, celebration, family gathering, educational program, or another kind of occasion.",
    },
    {
      title: "Loading and access",
      description:
        "Note practical details such as parking, entrances, elevators, stairs, walking distance, or the route to the room. Sharing them starts a discussion and does not guarantee an accommodation.",
    },
    {
      title: "General music requests",
      description:
        "Share broad preferences or requests if helpful. Requests are welcome for planning but do not confirm repertoire.",
    },
  ],
  boundaryEyebrow: "Clear expectations",
  boundaryTitle: "Performance and education—not clinical therapy.",
  boundaryParagraphs: [
    "Harps & Rec provides live performances and educational programming. It is not healthcare, mental-health treatment, clinical recreational therapy, licensed music therapy, or a substitute for professional care.",
    "Programs may make space for enjoyment, curiosity, conversation, and a shared musical experience, but they do not promise medical, cognitive, behavioral, rehabilitation, or mental-health outcomes.",
  ],
  faqEyebrow: "Common questions",
  faqTitle: "A few useful answers.",
  faqs: [
    {
      question: "Does an inquiry confirm availability or create a booking?",
      answer:
        "No. An inquiry begins a conversation about the gathering and possible fit. Availability and a performance plan would need to be confirmed separately.",
    },
    {
      question: "May organizers share music requests?",
      answer:
        "Yes. General requests can be useful during planning, but they are requests rather than a promise that particular repertoire is available.",
    },
    {
      question: "Is medical information needed?",
      answer:
        "No. Please do not submit diagnoses, medical details, or private information about individual residents. General audience and practical access information is enough for an initial discussion.",
    },
    {
      question: "Can practical access needs be discussed?",
      answer:
        "Yes. Organizers may share general loading, entrance, room, and setup considerations. Those details help start a conversation but do not guarantee a particular accommodation.",
    },
  ],
  ctaEyebrow: "A thoughtful first step",
  ctaTitle: "Gather the details you already know.",
  ctaDescription:
    "Review the simple planning process before preparing an inquiry. Live email delivery is not yet enabled, so the site will not claim that an unconfigured request was received.",
  ctaLabel: "Prepare a performance request",
  ctaHref: "/#planning-process",
};

export default function RetirementCommunitiesPage() {
  return <ServicePage content={retirementCommunityContent} />;
}

export type ServicePageItem = {
  title: string;
  description: string;
};

export type ServicePageFaq = {
  question: string;
  answer: string;
};

export type ServicePageContent = {
  eyebrow: string;
  title: string;
  introduction: string[];
  heroDecorativeWords: string[];
  possibilitiesEyebrow: string;
  possibilitiesTitle: string;
  possibilitiesIntro: string;
  possibilities: ServicePageItem[];
  checklistEyebrow: string;
  checklistTitle: string;
  checklistIntro: string;
  checklist: ServicePageItem[];
  boundaryEyebrow: string;
  boundaryTitle: string;
  boundaryParagraphs: string[];
  faqEyebrow: string;
  faqTitle: string;
  faqs: ServicePageFaq[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
};

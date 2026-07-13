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
  possibilitiesIntro: string;
  possibilities: ServicePageItem[];
  checklistIntro: string;
  checklist: ServicePageItem[];
  boundaryTitle: string;
  boundaryParagraphs: string[];
  faqs: ServicePageFaq[];
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
};

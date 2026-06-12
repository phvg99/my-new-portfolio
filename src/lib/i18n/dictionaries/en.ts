/**
 * Canonical UI string dictionary. The English shape (`typeof en`) is the
 * `Dictionary` type every other locale must satisfy — keep keys in sync.
 * Intentionally NOT `as const`: values widen to `string` so translations
 * are type-checked for shape (keys/structure) without demanding identical text.
 */
export const en = {
  nav: {
    home: "Home",
    work: "Work",
    about: "About",
    brand: "Pedro Garcia",
    mainNavAria: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchToPortuguese: "Switch to Portuguese",
    switchToEnglish: "Switch to English",
  },
  hero: {
    eyebrow: "Product Designer",
    title: "Hello World",
    location: "Based in Brazil",
    scroll: "Scroll",
    scrollAria: "Scroll to projects",
  },
  projects: {
    heading: "Selected projects",
  },
  about: {
    whoLabel: "Who I am",
    bio: "I'm a designer passionate about creating user-focused digital solutions. Whether it's a bold website or a detailed product app, I'm here to make ideas shine and create impactful experiences.",
    testimonialsHeading: "What my friends are saying",
    testimonialsSubtitle: "Colleagues and collaborators on working together.",
  },
  testimonials: {
    prevAria: "Previous testimonial",
    nextAria: "Next testimonial",
    items: [
      {
        testimonial:
          "A quick grasp of project complexities and the ability to translate them into creative solutions — that's what he brings, along with a culture of collaboration and knowledge-sharing.",
        by: "Douglas Junior, Head of Design",
      },
      {
        testimonial:
          "A keen eye for detail and a focus on real user experience. Collaborative, reliable, and delivers with quality.",
        by: "Alex Minoru Abe, Product Designer & Developer",
      },
      {
        testimonial:
          "Fresh perspectives, complex flows built from scratch, and always receptive to feedback. You'll want him on the team.",
        by: "Richard de Souza, Developer",
      },
      {
        testimonial:
          "Curiosity drives his problem-solving, clarity guides his design, and the user's real context is always top of mind. Collaborative and solution-oriented.",
        by: "Marcelo Antonietto, Lead Product Designer",
      },
      {
        testimonial:
          "Contagious energy and good vibes — always dedicated, always delivering excellent work. A great designer to have as a teammate.",
        by: "José Marcolino, UX Researcher",
      },
      {
        testimonial:
          "He structured our complete design system — colors, typography, components — all well documented. Made it simple for devs to build.",
        by: "Renan Rocha, Developer",
      },
    ],
  },
  caseStudy: {
    breadcrumbWork: "Work",
    role: "Role",
    client: "Client",
    websiteLink: "Website link",
    mainProblem: "Main Problem",
    results: "Results",
    viewDocumentation: "View Full Documentation",
    module: "Module",
  },
  footer: {
    linkedin: "LinkedIn",
    linkedinAria: "LinkedIn profile",
    resume: "Resume",
    resumeAria: "Download resume",
    availableForWork: "Available for work",
    localTime: "Local time:",
    rightsReserved: "All rights reserved.",
    builtWithCare: "Designed & built with care.",
  },
  meta: {
    /** BCP-47 tag for Intl.DateTimeFormat in the footer clock. */
    timeLocale: "en-US",
  },
};

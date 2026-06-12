import type { Dictionary } from "./index";

/**
 * Portuguese (pt-BR) UI strings. Typed `: Dictionary` so any missing, extra,
 * or mistyped key fails `tsc` against the canonical English shape.
 */
export const pt: Dictionary = {
  nav: {
    home: "Início",
    work: "Trabalhos",
    about: "Sobre",
    brand: "Pedro Garcia",
    mainNavAria: "Navegação principal",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    switchToPortuguese: "Mudar para português",
    switchToEnglish: "Mudar para inglês",
  },
  hero: {
    eyebrow: "Product Designer",
    title: "Olá Mundo",
    location: "Baseado no Brasil",
    scroll: "Rolar",
    scrollAria: "Rolar até os projetos",
  },
  projects: {
    heading: "Projetos selecionados",
  },
  about: {
    whoLabel: "Quem sou eu",
    bio: "Sou um designer apaixonado por criar soluções digitais centradas no usuário. Seja um site marcante ou um aplicativo de produto detalhado, estou aqui para fazer ideias brilharem e criar experiências impactantes.",
    testimonialsHeading: "O que meus amigos estão dizendo",
    testimonialsSubtitle: "Colegas e colaboradores sobre trabalhar comigo.",
  },
  testimonials: {
    prevAria: "Depoimento anterior",
    nextAria: "Próximo depoimento",
    items: [
      {
        testimonial:
          "Entende rápido as complexidades de um projeto e consegue traduzi-las em soluções criativas — é isso que ele traz, somado a uma cultura de colaboração e compartilhamento de conhecimento.",
        by: "Douglas Junior, Head de Design",
      },
      {
        testimonial:
          "Um olhar atento aos detalhes e foco na experiência real do usuário. Colaborativo, confiável e entrega com qualidade.",
        by: "Alex Minoru Abe, Product Designer & Desenvolvedor",
      },
      {
        testimonial:
          "Perspectivas novas, fluxos complexos criados do zero e sempre aberto a feedback. Você vai querer ele no time.",
        by: "Richard de Souza, Desenvolvedor",
      },
      {
        testimonial:
          "A curiosidade move a forma como ele resolve problemas, a clareza guia o design dele, e o contexto real do usuário está sempre em primeiro plano. Colaborativo e orientado a soluções.",
        by: "Marcelo Antonietto, Lead Product Designer",
      },
      {
        testimonial:
          "Energia e bom humor contagiantes — sempre dedicado, sempre entregando um trabalho excelente. Um ótimo designer para se ter como colega de time.",
        by: "José Marcolino, UX Researcher",
      },
      {
        testimonial:
          "Ele estruturou todo o nosso design system — cores, tipografia, componentes — tudo bem documentado. Deixou simples para os devs construírem.",
        by: "Renan Rocha, Desenvolvedor",
      },
    ],
  },
  caseStudy: {
    breadcrumbWork: "Trabalhos",
    role: "Função",
    client: "Cliente",
    websiteLink: "Link do site",
    mainProblem: "Problema Principal",
    results: "Resultados",
    viewDocumentation: "Ver Documentação Completa",
    module: "Módulo",
  },
  footer: {
    linkedin: "LinkedIn",
    linkedinAria: "Perfil no LinkedIn",
    resume: "Currículo",
    resumeAria: "Baixar currículo",
    availableForWork: "Disponível para trabalho",
    localTime: "Hora local:",
    rightsReserved: "Todos os direitos reservados.",
    builtWithCare: "Projetado & construído com cuidado.",
  },
  meta: {
    timeLocale: "pt-BR",
  },
};

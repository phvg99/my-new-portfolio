import type { Locale } from "@/lib/i18n/config";

/**
 * Translatable text for projects and case studies, keyed by project id.
 * Non-translatable structural data (colors, image URLs, links) lives in
 * `src/lib/projects.ts`; the locale-aware getters there merge the two.
 */

export interface ProjectText {
  name: string;
  tags: string[];
}

export interface SubFeatureText {
  title: string;
  description: string;
}

export interface FeatureText {
  title: string;
  subtitle: string;
  problem: string;
  subFeatures: SubFeatureText[];
  result: { metric: string; description: string };
}

export interface CaseStudyText {
  description: string;
  role: string;
  client: string;
  mainProblem: {
    description: string;
    miniProblems: Array<{ title: string; description: string }>;
  };
  solutions: Array<{ title: string; description: string }>;
  results: { description: string };
  features?: FeatureText[];
}

export interface ProjectsContent {
  projects: Record<string, ProjectText>;
  caseStudies: Record<string, CaseStudyText>;
}

const EN: ProjectsContent = {
  projects: {
    bluz: {
      name: "Creating the perfect design system for a lawyer firm",
      tags: ["Design System", "Product Design"],
    },
    juntos: {
      name: "A remote learning platform children will actually use",
      tags: ["UX/UI Design", "UX Research"],
    },
    innoscience: {
      name: "My impact on a SaaS plataform as a solo designer",
      tags: ["Product Design", "UX Research"],
    },
  },
  caseStudies: {
    innoscience: {
      description:
        "A three-module enterprise platform redesign for Latin America's leading innovation consultancy — streamlining task management, enabling AI-powered strategic diagnostics, and cutting navigation time in half.",
      role: "Product Designer",
      client: "Innoscience / InnoUP",
      mainProblem: {
        description:
          "Innoscience's internal platform had grown organically over years. Teams juggled disconnected tools for project tracking, strategic diagnostics, and daily navigation — burning hours on friction instead of innovation.",
        miniProblems: [
          {
            title: "Scattered Project Visibility",
            description:
              "Sprint tasks, time logs, and project status lived in separate tools. Managers spent more time chasing updates than making decisions.",
          },
          {
            title: "Manual Strategic Diagnostics",
            description:
              "Innovation assessments relied on spreadsheets and tribal knowledge. No structured framework existed to diagnose client maturity or generate actionable recommendations.",
          },
          {
            title: "Navigation Friction",
            description:
              "The existing sidebar required multiple clicks and full page reloads to reach common destinations. Users averaged 4+ clicks for routine tasks.",
          },
        ],
      },
      solutions: [],
      results: {
        description:
          "The redesigned platform unified three previously disconnected workflows into a single coherent product. By end of 2024, internal satisfaction hit 99% — reflecting the cumulative impact of streamlined project management, intelligent diagnostics, and frictionless navigation.",
      },
      features: [
        {
          title: "Task Manager",
          subtitle:
            "Unified project tracking from sprint planning to time logging",
          problem:
            "Teams tracked work across spreadsheets, chat threads, and a basic legacy tool. Sprint status was invisible to leadership, and time logging was an afterthought — making resource planning nearly impossible.",
          subFeatures: [
            {
              title: "Projects View",
              description:
                "Table-format overview of all active projects with real-time progress bars, priority tags, and health indicators for fast scanning.",
            },
            {
              title: "Sprint Management",
              description:
                "List and Kanban toggle for sprint tasks, color-coded by priority with drag-and-drop reordering across status columns.",
            },
            {
              title: "Task Detail",
              description:
                "Consolidated view housing subtasks, file attachments, comments, and integrated time logs — one source of truth per task.",
            },
            {
              title: "Timesheet",
              description:
                "Day-by-day time logging aligned to sprint cycles, replacing manual spreadsheet entries with a scrollable calendar interface.",
            },
            {
              title: "Performance Dashboard",
              description:
                "Team-level widgets tracking hours logged, task completion rate, and time distribution by project and program.",
            },
          ],
          result: {
            metric: "35% faster sprint delivery",
            description:
              "Centralizing task and time data eliminated status meetings and gave leadership real-time project visibility across all squads.",
          },
        },
        {
          title: "Strategic Innovation Framework",
          subtitle:
            "AI-powered diagnostic tools replacing spreadsheet assessments",
          problem:
            "Consultants ran innovation maturity assessments using static spreadsheets. Results were inconsistent, analysis was manual, and recommendations depended entirely on individual consultant experience.",
          subFeatures: [
            {
              title: "Form Builder",
              description:
                "Custom diagnostic forms with configurable dimensions, weighted questions, and drag-and-drop section ordering for consultants.",
            },
            {
              title: "Assessment View",
              description:
                "Mobile-friendly, Typeform-inspired question flow that guides clients through diagnostics without friction or cognitive overload.",
            },
            {
              title: "Progress Dashboard",
              description:
                "Real-time dimension completion tracking so consultants know exactly where each client stands at any moment.",
            },
            {
              title: "Radar Chart Visualization",
              description:
                "Multi-dimensional diagnostic results rendered as interactive radar charts for clear innovation maturity mapping.",
            },
            {
              title: "AI Recommendations",
              description:
                "Steve, InnoUP's AI engine, analyzes diagnostic data and generates tailored strategic guidance — turning raw scores into actionable next steps.",
            },
          ],
          result: {
            metric: "3× faster diagnostic turnaround",
            description:
              "Structured data collection and AI-generated insights replaced weeks of manual analysis with near-instant, consistent recommendations.",
          },
        },
        {
          title: "Navigation Redesign",
          subtitle: "Research-driven information architecture overhaul",
          problem:
            "The existing navigation required full page reloads for every destination. Deeply nested menus meant users routinely got lost, and new team members needed weeks to learn the platform's structure.",
          subFeatures: [
            {
              title: "Hover-Activated Submenus",
              description:
                "Side navigation with instant hover-reveal submenus — eliminating click-wait-click patterns entirely.",
            },
            {
              title: "Contextual Wayfinding",
              description:
                "Persistent breadcrumbs and section indicators so users always know where they are within the platform hierarchy.",
            },
            {
              title: "Research-Driven IA",
              description:
                "Card sorting and tree testing with internal teams validated the new structure before a single pixel was designed.",
            },
          ],
          result: {
            metric: "50% reduction in navigation time",
            description:
              "Hover interactions and a flattened hierarchy cut average task-to-destination from 4+ clicks to 2, validated through usability testing.",
          },
        },
      ],
    },
    bluz: {
      description:
        "A unified component library and design guidelines built on Atomic Design, bringing consistency and speed to every b/luz product and platform.",
      role: "Product Designer",
      client: "b/luz",
      mainProblem: {
        description:
          "A growing design team without standardized components meant a fragmented user experience. b/luz needed a scalable design language that maintained quality and velocity.",
        miniProblems: [
          {
            title: "Fragmented User Experience",
            description:
              "Designers worked in silos, producing inconsistent patterns across products. Users faced different interaction models and visual styles at every touchpoint — eroding trust.",
          },
          {
            title: "Inefficient Development Workflow",
            description:
              "Common elements were rebuilt from scratch per project. Repetitive work slowed delivery and made developer handoff error-prone.",
          },
          {
            title: "Weak Brand Consistency",
            description:
              "Without shared guidelines, typography, color, and spacing varied wildly across deliverables — diluting b/luz's brand identity.",
          },
        ],
      },
      solutions: [
        {
          title: "Atomic Design Component Library",
          description:
            "We built a modular library using Brad Frost's Atomic Design — atoms (buttons, fields, icons), molecules (grouped elements), and organisms (interface sections). Changes at foundational levels propagate upward automatically, ensuring uniformity. We prioritized buttons, forms, and cards as the highest-impact starting points.",
        },
        {
          title: "Comprehensive Design Guidelines & Documentation",
          description:
            "We defined typographic styles, expanded the brand color palette, and established spacing rules and grid systems. Every component ships with thorough documentation — because a system without clear guidance fails the people who depend on it.",
        },
        {
          title: "Illustration System & Continuous Evolution",
          description:
            "We created an illustration library — scenarios, characters, and objectives — for a consistent visual narrative across interfaces. Monthly reviews and team feedback loops keep the system current and evolving.",
        },
      ],
      results: {
        description:
          "Consistent interfaces across all platforms, stronger brand recognition, and significantly faster development cycles. Reusable components streamlined onboarding and accelerated delivery. The system proved itself as a living organism — constantly evolving and laying the foundation for future growth.",
      },
    },
    juntos: {
      description:
        "When COVID-19 pushed classrooms online, children got tools built for boardrooms. Juntos replaced them with a virtual school that feels like walking through real hallways — designed for kids aged 6–8.",
      role: "UX/UI Designer",
      client: "PUC-SP (Graduation Project)",
      mainProblem: {
        description:
          "COVID-19 turned classrooms into browser tabs overnight. Children, parents, and teachers were all failed by tools that were never designed for learning.",
        miniProblems: [
          {
            title: "Tools Built for Boardrooms, Not Bedrooms",
            description:
              "A seven-year-old staring at a 5×5 Zoom grid isn't learning — they're enduring. Corporate video tools offered no playfulness, no warmth, and nothing a child could figure out alone.",
          },
          {
            title: "The Hallway Disappeared",
            description:
              "School is hallways, playgrounds, and library corners. Remote learning erased every informal space where children build friendships and emotional resilience — leaving only a mute button.",
          },
          {
            title: "Three Users, Zero Shared Solutions",
            description:
              "Parents became unwilling IT support. Teachers fought unfamiliar interfaces mid-lesson. Children just wanted to see their friends. No existing platform served all three at once.",
          },
        ],
      },
      solutions: [
        {
          title: "A School You Can Walk Through",
          description:
            "Students navigate classrooms, a library, and a game room — raising hands, joining calls, and discovering spaces the way they would in a real building. Remote stops feeling remote.",
        },
        {
          title: "Designed for Six-Year-Old Eyes",
          description:
            "Playful colors, rounded icons, and oversized buttons replaced corporate gray. Every visual choice passed one filter: would a six-year-old feel welcome here?",
        },
        {
          title: "One Platform, Three Experiences",
          description:
            "Parents see progress and a direct chat channel. Teachers control classroom tools without friction. Students just see a fun place to learn. Three separate flows, validated by research with all three groups.",
        },
      ],
      results: {
        description:
          "Usability testing confirmed the core thesis: children engage more when digital spaces feel like school, not spreadsheets. Students navigated the interface intuitively, participation rose visibly, and the project earned the highest grade in the graduating class.",
      },
    },
  },
};

const PT: ProjectsContent = {
  projects: {
    bluz: {
      name: "Criando o design system perfeito para um escritório de advocacia",
      tags: ["Design System", "Product Design"],
    },
    juntos: {
      name: "Uma plataforma de ensino remoto que as crianças realmente vão usar",
      tags: ["UX/UI Design", "UX Research"],
    },
    innoscience: {
      name: "Meu impacto em uma plataforma SaaS como designer solo",
      tags: ["Product Design", "UX Research"],
    },
  },
  caseStudies: {
    innoscience: {
      description:
        "O redesign de uma plataforma corporativa de três módulos para a principal consultoria de inovação da América Latina — simplificando a gestão de tarefas, viabilizando diagnósticos estratégicos com IA e reduzindo o tempo de navegação pela metade.",
      role: "Product Designer",
      client: "Innoscience / InnoUP",
      mainProblem: {
        description:
          "A plataforma interna da Innoscience cresceu de forma orgânica ao longo dos anos. As equipes faziam malabarismos com ferramentas desconectadas para acompanhamento de projetos, diagnósticos estratégicos e navegação diária — gastando horas com atritos em vez de inovação.",
        miniProblems: [
          {
            title: "Visibilidade de Projetos Fragmentada",
            description:
              "Tarefas de sprint, registros de horas e status dos projetos viviam em ferramentas separadas. Os gestores passavam mais tempo atrás de atualizações do que tomando decisões.",
          },
          {
            title: "Diagnósticos Estratégicos Manuais",
            description:
              "As avaliações de inovação dependiam de planilhas e conhecimento informal. Não existia um framework estruturado para diagnosticar a maturidade do cliente ou gerar recomendações acionáveis.",
          },
          {
            title: "Atrito na Navegação",
            description:
              "A barra lateral existente exigia vários cliques e recarregamentos completos de página para chegar aos destinos mais comuns. Os usuários levavam em média mais de 4 cliques para tarefas rotineiras.",
          },
        ],
      },
      solutions: [],
      results: {
        description:
          "A plataforma redesenhada unificou três fluxos antes desconectados em um único produto coeso. Até o fim de 2024, a satisfação interna chegou a 99% — refletindo o impacto somado de uma gestão de projetos simplificada, diagnósticos inteligentes e navegação sem atrito.",
      },
      features: [
        {
          title: "Gestor de Tarefas",
          subtitle:
            "Acompanhamento unificado de projetos, do planejamento de sprint ao registro de horas",
          problem:
            "As equipes acompanhavam o trabalho em planilhas, conversas de chat e uma ferramenta legada básica. O status das sprints era invisível para a liderança, e o registro de horas era deixado em segundo plano — tornando o planejamento de recursos quase impossível.",
          subFeatures: [
            {
              title: "Visão de Projetos",
              description:
                "Visão geral em formato de tabela de todos os projetos ativos, com barras de progresso em tempo real, tags de prioridade e indicadores de saúde para uma leitura rápida.",
            },
            {
              title: "Gestão de Sprints",
              description:
                "Alternância entre lista e Kanban para as tarefas da sprint, com cores por prioridade e reordenação por arrastar e soltar entre as colunas de status.",
            },
            {
              title: "Detalhe da Tarefa",
              description:
                "Visão consolidada que reúne subtarefas, anexos, comentários e registros de horas integrados — uma única fonte da verdade por tarefa.",
            },
            {
              title: "Timesheet",
              description:
                "Registro de horas dia a dia alinhado aos ciclos de sprint, substituindo o preenchimento manual de planilhas por uma interface de calendário rolável.",
            },
            {
              title: "Dashboard de Performance",
              description:
                "Widgets em nível de equipe que acompanham horas registradas, taxa de conclusão de tarefas e distribuição de tempo por projeto e programa.",
            },
          ],
          result: {
            metric: "35% mais rápido na entrega de sprints",
            description:
              "Centralizar os dados de tarefas e horas eliminou reuniões de status e deu à liderança visibilidade em tempo real dos projetos de todas as squads.",
          },
        },
        {
          title: "Framework de Inovação Estratégica",
          subtitle:
            "Ferramentas de diagnóstico com IA substituindo avaliações em planilha",
          problem:
            "Os consultores faziam avaliações de maturidade em inovação usando planilhas estáticas. Os resultados eram inconsistentes, a análise era manual e as recomendações dependiam inteiramente da experiência de cada consultor.",
          subFeatures: [
            {
              title: "Construtor de Formulários",
              description:
                "Formulários de diagnóstico personalizados, com dimensões configuráveis, perguntas com peso e ordenação de seções por arrastar e soltar para os consultores.",
            },
            {
              title: "Visão de Avaliação",
              description:
                "Fluxo de perguntas inspirado no Typeform e otimizado para mobile, que guia os clientes pelo diagnóstico sem atrito ou sobrecarga cognitiva.",
            },
            {
              title: "Dashboard de Progresso",
              description:
                "Acompanhamento em tempo real da conclusão de cada dimensão, para que os consultores saibam exatamente em que ponto cada cliente está a qualquer momento.",
            },
            {
              title: "Visualização em Gráfico de Radar",
              description:
                "Resultados de diagnóstico multidimensionais apresentados como gráficos de radar interativos, para um mapeamento claro da maturidade em inovação.",
            },
            {
              title: "Recomendações com IA",
              description:
                "Steve, o motor de IA da InnoUP, analisa os dados do diagnóstico e gera orientações estratégicas sob medida — transformando notas brutas em próximos passos acionáveis.",
            },
          ],
          result: {
            metric: "3× mais rápido no diagnóstico",
            description:
              "A coleta estruturada de dados e os insights gerados por IA substituíram semanas de análise manual por recomendações quase instantâneas e consistentes.",
          },
        },
        {
          title: "Redesign da Navegação",
          subtitle:
            "Reformulação da arquitetura de informação guiada por pesquisa",
          problem:
            "A navegação existente exigia o recarregamento completo da página para cada destino. Menus profundamente aninhados faziam os usuários se perderem com frequência, e novos membros da equipe precisavam de semanas para aprender a estrutura da plataforma.",
          subFeatures: [
            {
              title: "Submenus Ativados por Hover",
              description:
                "Navegação lateral com submenus revelados instantaneamente ao passar o mouse — eliminando por completo o padrão clicar-esperar-clicar.",
            },
            {
              title: "Orientação Contextual",
              description:
                "Breadcrumbs e indicadores de seção persistentes, para que os usuários sempre saibam onde estão dentro da hierarquia da plataforma.",
            },
            {
              title: "Arquitetura de Informação Guiada por Pesquisa",
              description:
                "Card sorting e tree testing com as equipes internas validaram a nova estrutura antes de um único pixel ser desenhado.",
            },
          ],
          result: {
            metric: "50% de redução no tempo de navegação",
            description:
              "Interações por hover e uma hierarquia mais plana reduziram a média de cliques até o destino de mais de 4 para 2, validados em testes de usabilidade.",
          },
        },
      ],
    },
    bluz: {
      description:
        "Uma biblioteca de componentes unificada e diretrizes de design construídas sobre o Atomic Design, trazendo consistência e velocidade para cada produto e plataforma da b/luz.",
      role: "Product Designer",
      client: "b/luz",
      mainProblem: {
        description:
          "Uma equipe de design em crescimento sem componentes padronizados significava uma experiência fragmentada. A b/luz precisava de uma linguagem de design escalável que mantivesse qualidade e velocidade.",
        miniProblems: [
          {
            title: "Experiência do Usuário Fragmentada",
            description:
              "Os designers trabalhavam em silos, produzindo padrões inconsistentes entre os produtos. Os usuários encontravam modelos de interação e estilos visuais diferentes em cada ponto de contato — corroendo a confiança.",
          },
          {
            title: "Fluxo de Desenvolvimento Ineficiente",
            description:
              "Elementos comuns eram refeitos do zero a cada projeto. O trabalho repetitivo atrasava as entregas e tornava o handoff para os devs propenso a erros.",
          },
          {
            title: "Consistência de Marca Frágil",
            description:
              "Sem diretrizes compartilhadas, tipografia, cor e espaçamento variavam drasticamente entre as entregas — diluindo a identidade de marca da b/luz.",
          },
        ],
      },
      solutions: [
        {
          title: "Biblioteca de Componentes em Atomic Design",
          description:
            "Construímos uma biblioteca modular usando o Atomic Design de Brad Frost — átomos (botões, campos, ícones), moléculas (elementos agrupados) e organismos (seções de interface). Mudanças nos níveis fundamentais se propagam automaticamente para cima, garantindo uniformidade. Priorizamos botões, formulários e cards como pontos de partida de maior impacto.",
        },
        {
          title: "Diretrizes de Design e Documentação Completas",
          description:
            "Definimos estilos tipográficos, expandimos a paleta de cores da marca e estabelecemos regras de espaçamento e sistemas de grid. Cada componente vem com documentação detalhada — porque um sistema sem orientação clara falha com as pessoas que dependem dele.",
        },
        {
          title: "Sistema de Ilustração e Evolução Contínua",
          description:
            "Criamos uma biblioteca de ilustração — cenários, personagens e objetivos — para uma narrativa visual consistente entre as interfaces. Revisões mensais e ciclos de feedback da equipe mantêm o sistema atual e em evolução.",
        },
      ],
      results: {
        description:
          "Interfaces consistentes em todas as plataformas, reconhecimento de marca mais forte e ciclos de desenvolvimento significativamente mais rápidos. Componentes reutilizáveis facilitaram o onboarding e aceleraram as entregas. O sistema provou ser um organismo vivo — em constante evolução e estabelecendo a base para o crescimento futuro.",
      },
    },
    juntos: {
      description:
        "Quando a COVID-19 levou as salas de aula para o online, as crianças receberam ferramentas feitas para salas de reunião. O Juntos as substituiu por uma escola virtual que parece um passeio por corredores de verdade — projetada para crianças de 6 a 8 anos.",
      role: "UX/UI Designer",
      client: "PUC-SP (Projeto de Graduação)",
      mainProblem: {
        description:
          "A COVID-19 transformou salas de aula em abas do navegador da noite para o dia. Crianças, pais e professores foram todos deixados na mão por ferramentas que nunca foram pensadas para o aprendizado.",
        miniProblems: [
          {
            title: "Ferramentas para Salas de Reunião, Não para Quartos de Criança",
            description:
              "Uma criança de sete anos encarando uma grade 5×5 do Zoom não está aprendendo — está suportando. Ferramentas corporativas de vídeo não ofereciam nenhuma leveza, nenhum acolhimento e nada que uma criança conseguisse usar sozinha.",
          },
          {
            title: "O Corredor Desapareceu",
            description:
              "Escola é corredor, parquinho e cantinho de biblioteca. O ensino remoto apagou todo espaço informal onde as crianças constroem amizades e resiliência emocional — sobrando apenas um botão de mudo.",
          },
          {
            title: "Três Usuários, Nenhuma Solução Compartilhada",
            description:
              "Os pais viraram suporte técnico contra a vontade. Os professores brigavam com interfaces desconhecidas no meio da aula. As crianças só queriam ver os amigos. Nenhuma plataforma existente atendia aos três ao mesmo tempo.",
          },
        ],
      },
      solutions: [
        {
          title: "Uma Escola por Onde Você Pode Caminhar",
          description:
            "Os alunos navegam por salas de aula, uma biblioteca e uma sala de jogos — levantando a mão, entrando em chamadas e descobrindo espaços como fariam em um prédio de verdade. O remoto deixa de parecer remoto.",
        },
        {
          title: "Projetada para Olhos de Seis Anos",
          description:
            "Cores divertidas, ícones arredondados e botões grandes substituíram o cinza corporativo. Cada escolha visual passou por um único filtro: uma criança de seis anos se sentiria bem-vinda aqui?",
        },
        {
          title: "Uma Plataforma, Três Experiências",
          description:
            "Os pais veem o progresso e um canal direto de conversa. Os professores controlam as ferramentas da sala sem atrito. Os alunos veem apenas um lugar divertido para aprender. Três fluxos distintos, validados em pesquisa com os três grupos.",
        },
      ],
      results: {
        description:
          "Os testes de usabilidade confirmaram a tese central: as crianças se engajam mais quando os espaços digitais parecem escola, e não planilha. Os alunos navegaram pela interface de forma intuitiva, a participação cresceu visivelmente, e o projeto recebeu a maior nota da turma de formandos.",
      },
    },
  },
};

export const projectsContent: Record<Locale, ProjectsContent> = {
  en: EN,
  pt: PT,
};

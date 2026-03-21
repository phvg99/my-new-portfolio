export interface Project {
  id: string;
  name: string;
  year: string;
  tags: string[];
  bgColor: string;
  mockupColor: string;
  thumbnailUrl: string;
}

export interface SubFeature {
  title: string;
  description: string;
}

export interface FeatureModule {
  moduleNumber: number;
  title: string;
  subtitle: string;
  problem: string;
  subFeatures: SubFeature[];
  imageUrl: string;
  result: {
    metric: string;
    description: string;
  };
}

export interface CaseStudyData {
  project: Project;
  description: string;
  role: string;
  client: string;
  website?: string;
  mainProblemImageUrl?: string;
  resultsImageUrl?: string;
  mainProblem: {
    description: string;
    miniProblems: Array<{ title: string; description: string }>;
  };
  solutions: Array<{
    title: string;
    description: string;
    imageUrl?: string;
    imageUrls?: string[];
  }>;
  results: { description: string };
  features?: FeatureModule[];
}

export const PROJECTS: Project[] = [
  {
    id: "bluz",
    name: "Creating the perfect design system for a lawyer firm",
    year: "2024",
    tags: ["Design System", "Product Design"],
    bgColor: "oklch(0.25 0.02 80)",
    mockupColor: "oklch(0.32 0.03 80)",
    thumbnailUrl: "/projects/bluz/thumb.png",
  },
  {
    id: "juntos",
    name: "A remote learning platform children will actually use",
    year: "2024",
    tags: ["UX/UI Design", "UX Research"],
    bgColor: "oklch(0.25 0.03 350)",
    mockupColor: "oklch(0.32 0.04 350)",
    thumbnailUrl: "/projects/juntos/thumb.png",
  },
  {
    id: "innoscience",
    name: "My impact on a SaaS plataform as a solo designer",
    year: "2024",
    tags: ["Product Design", "UX Research"],
    bgColor: "oklch(0.22 0.04 200)",
    mockupColor: "oklch(0.29 0.05 200)",
    thumbnailUrl: "/projects/innoscience/thumb.png",
  },
];

const INNOSCIENCE_CASE_STUDY: CaseStudyData = {
  project: PROJECTS[2],
  description:
    "A three-module enterprise platform redesign for Latin America's leading innovation consultancy — streamlining task management, enabling AI-powered strategic diagnostics, and cutting navigation time in half.",
  role: "Product Designer",
  client: "Innoscience / InnoUP",
  website: "https://innoscience.com.br/",
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
      moduleNumber: 1,
      title: "Task Manager",
      subtitle:
        "Unified project tracking from sprint planning to time logging",
      problem:
        "Teams tracked work across spreadsheets, chat threads, and a basic legacy tool. Sprint status was invisible to leadership, and time logging was an afterthought — making resource planning nearly impossible.",
      imageUrl: "/projects/innoscience/task-manager.png",
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
      moduleNumber: 2,
      title: "Strategic Innovation Framework",
      subtitle:
        "AI-powered diagnostic tools replacing spreadsheet assessments",
      problem:
        "Consultants ran innovation maturity assessments using static spreadsheets. Results were inconsistent, analysis was manual, and recommendations depended entirely on individual consultant experience.",
      imageUrl: "/projects/innoscience/framework-module.png",
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
        metric: "3\u00D7 faster diagnostic turnaround",
        description:
          "Structured data collection and AI-generated insights replaced weeks of manual analysis with near-instant, consistent recommendations.",
      },
    },
    {
      moduleNumber: 3,
      title: "Navigation Redesign",
      subtitle: "Research-driven information architecture overhaul",
      problem:
        "The existing navigation required full page reloads for every destination. Deeply nested menus meant users routinely got lost, and new team members needed weeks to learn the platform's structure.",
      imageUrl: "/projects/innoscience/navegation-menu.png",
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
};

const BLUZ_CASE_STUDY: CaseStudyData = {
  project: PROJECTS[0],
  description:
    "A unified component library and design guidelines built on Atomic Design, bringing consistency and speed to every b/luz product and platform.",
  role: "Product Designer",
  client: "b/luz",
  website: "https://baptistaluz.com.br/",
  mainProblemImageUrl: "/projects/bluz/main-problem.png",
  resultsImageUrl: "/projects/bluz/results.png",
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
      imageUrl: "/projects/bluz/atomic-design.png",
    },
    {
      title: "Comprehensive Design Guidelines & Documentation",
      description:
        "We defined typographic styles, expanded the brand color palette, and established spacing rules and grid systems. Every component ships with thorough documentation — because a system without clear guidance fails the people who depend on it.",
      imageUrl: "/projects/bluz/comprehensive-design.png",
    },
    {
      title: "Illustration System & Continuous Evolution",
      description:
        "We created an illustration library — scenarios, characters, and objectives — for a consistent visual narrative across interfaces. Monthly reviews and team feedback loops keep the system current and evolving.",
      imageUrl: "/projects/bluz/illustration-system.png",
    },
  ],
  results: {
    description:
      "Consistent interfaces across all platforms, stronger brand recognition, and significantly faster development cycles. Reusable components streamlined onboarding and accelerated delivery. The system proved itself as a living organism — constantly evolving and laying the foundation for future growth.",
  },
};

const JUNTOS_CASE_STUDY: CaseStudyData = {
  project: PROJECTS[1],
  description:
    "When COVID-19 pushed classrooms online, children got tools built for boardrooms. Juntos replaced them with a virtual school that feels like walking through real hallways — designed for kids aged 6–8.",
  role: "UX/UI Designer",
  client: "PUC-SP (Graduation Project)",
  mainProblemImageUrl: "/projects/juntos/main-problem.png",
  resultsImageUrl: "/projects/juntos/results.png",
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
      imageUrl: "/projects/juntos/immersive-virtual.png",
    },
    {
      title: "Designed for Six-Year-Old Eyes",
      description:
        "Playful colors, rounded icons, and oversized buttons replaced corporate gray. Every visual choice passed one filter: would a six-year-old feel welcome here?",
      imageUrl: "/projects/juntos/child-first-visual.png",
    },
    {
      title: "One Platform, Three Experiences",
      description:
        "Parents see progress and a direct chat channel. Teachers control classroom tools without friction. Students just see a fun place to learn. Three separate flows, validated by research with all three groups.",
      imageUrls: [
        "/projects/juntos/multi-stakeholder-1.png",
        "/projects/juntos/multi-stakeholder-2.png",
        "/projects/juntos/multi-stakeholder-3.png",
      ],
    },
  ],
  results: {
    description:
      "Usability testing confirmed the core thesis: children engage more when digital spaces feel like school, not spreadsheets. Students navigated the interface intuitively, participation rose visibly, and the project earned the highest grade in the graduating class.",
  },
};

const CASE_STUDIES: Record<string, CaseStudyData> = {
  bluz: BLUZ_CASE_STUDY,
  juntos: JUNTOS_CASE_STUDY,
  innoscience: INNOSCIENCE_CASE_STUDY,
};

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.id === slug);
}

export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  return CASE_STUDIES[slug];
}

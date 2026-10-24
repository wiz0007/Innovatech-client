export const processSteps = [
  {
    step: 1,
    stageCode: "STAGE 01 // SPEC",
    phase: "Discover",
    fullTitle: "Discovery & Architectural Blueprint",
    tagline: "Uncovering core constraints, architecture scope, and product vectors.",
    duration: "Week 1",
    cadence: "Daily Async Syncs + Direct Slack Channel",
    description: "We work directly with founders and product leads to clarify user personas, technical requirements, cloud integrations, and performance goals before writing code.",
    qualityGate: "Lead systems architect signoff on database schemas, state trees, latency budgets, and security posture before writing a single line of client code.",
    deliverables: [
      "Technical Architecture Blueprint",
      "User Journey & State Diagrams",
      "API & Schema Specification",
      "Sprint Milestones & Release Schedule"
    ],
    deliverablesDetailed: [
      {
        title: "Architecture Blueprint",
        detail: "Complete cloud topology, microservice boundaries, caching layer, and edge routing diagrams."
      },
      {
        title: "Data Schema & Contracts",
        detail: "Strict OpenAPI / GraphQL specifications with typed request/response payload schemas."
      },
      {
        title: "State Machine Spec",
        detail: "Deterministic state diagrams mapping happy paths, offline states, and failure recovery."
      },
      {
        title: "Sprint Milestones & SLA",
        detail: "Two-week cadence roadmap with defined acceptance criteria and production release gates."
      }
    ]
  },
  {
    step: 2,
    stageCode: "STAGE 02 // DESIGN",
    phase: "Design",
    fullTitle: "Interface Systems & Motion Choreography",
    tagline: "Translating product strategy into interactive design systems.",
    duration: "Week 2 - 3",
    cadence: "Bi-Weekly Prototype Reviews & Figma Walkthroughs",
    description: "We design complete component libraries in Figma, establishing responsive breakpoints, typography scales, touch targets, and motion choreography.",
    qualityGate: "Design token lock and interactive prototype approval across mobile (375px), tablet (768px), and desktop (1440px+) viewports.",
    deliverables: [
      "Figma Component Design System",
      "Interactive High-Fidelity Prototypes",
      "Responsive Layout Specs (Mobile, Tablet, Desktop)",
      "Micro-interaction & Motion Guidelines"
    ],
    deliverablesDetailed: [
      {
        title: "Living Design Token System",
        detail: "Figma tokens for color variables, typography scales, spacing grids, and elevation layers."
      },
      {
        title: "Interactive Prototypes",
        detail: "High-fidelity clickable walkthroughs simulating 60fps animations and micro-interactions."
      },
      {
        title: "Responsive Viewport Specs",
        detail: "Pixel-perfect breakpoint choreography from 320px compact mobile to 4K ultrawide."
      },
      {
        title: "Accessibility Matrix (WCAG AA)",
        detail: "Enforced color contrast ratios, screen-reader semantics, and keyboard focus states."
      }
    ]
  },
  {
    step: 3,
    stageCode: "STAGE 03 // BUILD",
    phase: "Build",
    fullTitle: "Deterministic Sprint Execution",
    tagline: "Engineering production-hardened web and mobile ecosystems.",
    duration: "Week 4 - 7",
    cadence: "Bi-Weekly Sprint Demos + Live Preview Deploys",
    description: "Iterative 2-week sprints delivering clean, typed code. We integrate APIs, state trees, background workers, AI models, and automated CI/CD pipelines.",
    qualityGate: "100% CI pass rate: zero TypeScript compiler errors, zero ESLint warnings, and automated unit/integration test coverage.",
    deliverables: [
      "Production-Ready React / React Native Codebase",
      "API & Database Integration",
      "Automated Unit & Integration Test Suites",
      "Preview Deployment Branches for Review"
    ],
    deliverablesDetailed: [
      {
        title: "Modular Typed Codebase",
        detail: "Strict TypeScript, clean component architecture, and isolated business logic layers."
      },
      {
        title: "API & Data Pipeline Integration",
        detail: "Resilient query caching, optimistic UI updates, and WebSocket real-time event streaming."
      },
      {
        title: "Automated Test Matrix",
        detail: "Unit test coverage, end-to-end user flow validation with Playwright, and snapshot testing."
      },
      {
        title: "Ephemeral Preview Branches",
        detail: "Automatic isolated staging preview deployments generated on every pull request."
      }
    ]
  },
  {
    step: 4,
    stageCode: "STAGE 04 // SCALE",
    phase: "Launch & Scale",
    fullTitle: "Hardened Rollout & Telemetry Observability",
    tagline: "Multi-device QA, security hardening, and zero-downtime release.",
    duration: "Week 8+",
    cadence: "Continuous Canary Deploys + 24/7 Telemetry Monitoring",
    description: "Comprehensive audits for Core Web Vitals, accessibility, load resilience, and App Store / Cloud production deployment with ongoing telemetry.",
    qualityGate: "Zero-downtime canary deployment, Lighthouse performance score >= 95, and error tracking alerts routed to engineering pager.",
    deliverables: [
      "Zero-Downtime Production Deployment",
      "App Store & Google Play Releases",
      "Real-time Telemetry & Error Tracking Setup",
      "Handoff Documentation & Iteration Roadmap"
    ],
    deliverablesDetailed: [
      {
        title: "Zero-Downtime Canary Rollout",
        detail: "Staged traffic cutover with instant automated rollback triggers if error rates spike."
      },
      {
        title: "Native App Store Releases",
        detail: "Expedited submission, compliance verification, and fast-track approval handling."
      },
      {
        title: "Real-Time Telemetry & SLAs",
        detail: "Datadog / Sentry instrumentation, P99 latency tracking, and operational runbooks."
      },
      {
        title: "Complete Code Ownership",
        detail: "Comprehensive architecture documentation, recorded handoff sessions, and full repo transfer."
      }
    ]
  }
];

export const engineeringPrinciples = [
  {
    index: "01",
    title: "Sub-Second Latency by Default",
    axiom: "If an interaction takes longer than 100ms, the user feels cognitive drag.",
    text: "We optimize bundle sizes, leverage edge networks, and eliminate render bottlenecks so every interaction feels instantaneous across mobile networks."
  },
  {
    index: "02",
    title: "Zero-Compromise Type Safety",
    axiom: "Runtime errors in production are architectural failures.",
    text: "Strict typing and contract-driven APIs prevent runtime exceptions and make codebases maintainable as teams scale from 2 to 20 engineers without regressions."
  },
  {
    index: "03",
    title: "Living Component Architecture",
    axiom: "Design systems should be verifiable code primitives, not static screenshots.",
    text: "Every UI pattern is built as a reusable, accessible primitive with dedicated props and variants, keeping interfaces visually cohesive across entire product lifecycles."
  }
];

export default processSteps;

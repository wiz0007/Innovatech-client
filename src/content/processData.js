export const processSteps = [
  {
    step: 1,
    phase: "Discover",
    tagline: "Uncovering core constraints, architecture scope, and product vectors.",
    duration: "Week 1",
    description: "We work directly with founders and product leads to clarify user personas, technical requirements, cloud integrations, and performance goals before writing code.",
    deliverables: [
      "Technical Architecture Blueprint",
      "User Journey & State Diagrams",
      "API & Schema Specification",
      "Sprint Milestones & Release Schedule"
    ]
  },
  {
    step: 2,
    phase: "Design",
    tagline: "Translating product strategy into interactive design systems.",
    duration: "Week 2 - 3",
    description: "We design complete component libraries in Figma, establishing responsive breakpoints, typography scales, touch targets, and motion choreography.",
    deliverables: [
      "Figma Component Design System",
      "Interactive High-Fidelity Prototypes",
      "Responsive Layout Specs (Mobile, Tablet, Desktop)",
      "Micro-interaction & Motion Guidelines"
    ]
  },
  {
    step: 3,
    phase: "Build",
    tagline: "Engineering production-hardened web and mobile ecosystems.",
    duration: "Week 4 - 7",
    description: "Iterative 2-week sprints delivering clean, typed code. We integrate APIs, state trees, background workers, AI models, and automated CI/CD pipelines.",
    deliverables: [
      "Production-Ready React / React Native Codebase",
      "API & Database Integration",
      "Automated Unit & Integration Test Suites",
      "Preview Deployment Branches for Review"
    ]
  },
  {
    step: 4,
    phase: "Launch & Scale",
    tagline: "Multi-device QA, security hardening, and zero-downtime release.",
    duration: "Week 8+",
    description: "Comprehensive audits for Core Web Vitals, accessibility, load resilience, and App Store / Cloud production deployment with ongoing telemetry.",
    deliverables: [
      "Zero-Downtime Production Deployment",
      "App Store & Google Play Releases",
      "Real-time Telemetry & Error Tracking Setup",
      "Handoff Documentation & Iteration Roadmap"
    ]
  }
];

export const engineeringPrinciples = [
  {
    title: "Sub-Second Latency by Default",
    text: "We optimize bundle sizes, leverage edge networks, and eliminate render bottlenecks so every interaction feels instantaneous."
  },
  {
    title: "Zero-Compromise Type Safety",
    text: "Strict typing and contract-driven APIs prevent runtime exceptions and make codebases maintainable as teams grow."
  },
  {
    title: "Living Component Architecture",
    text: "Every UI pattern is built as a reusable, accessible primitive, keeping interfaces visually cohesive across entire product lifecycles."
  }
];

export default processSteps;

import webIcon from "../assets/webApp.webp";
import mobileIcon from "../assets/mobileApp.webp";
import aiIcon from "../assets/AISolu.webp";

export const servicesData = [
  {
    id: "web-apps",
    title: "Web Applications",
    tagline: "Scalable, resilient web systems built for speed and conversion.",
    description: "Responsive, high-throughput web applications engineered with React, Next.js, Node.js, and modern cloud infrastructure.",
    details: "From high-conversion e-commerce storefronts and SaaS platforms to data-dense real-time analytics dashboards, we build web apps that scale effortlessly under load. Every deliverable comes with automated CI/CD pipelines, strict type safety, SEO compliance, and sub-second load times.",
    icon: webIcon,
    videoBg: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-34354-large.mp4",
    highlights: [
      "Sub-second First Contentful Paint & Core Web Vitals excellence",
      "Robust state management and real-time reactive architectures",
      "SSR, SSG, and edge-rendered rendering pipelines",
      "Production CI/CD, observability, error monitoring, and automated test suites"
    ],
    techStack: ["React 19", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Tailwind CSS / SCSS", "Docker"],
    deliverables: ["Full-Stack Web App", "Admin Dashboard", "API Architecture", "Performance & SEO Audit", "Documentation"]
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    tagline: "Native-grade fluid mobile experiences for iOS and Android.",
    description: "Cross-platform and native mobile architectures engineered for speed, offline reliability, and intuitive touch interaction.",
    details: "We build intuitive mobile apps with React Native, Flutter, and Swift/Kotlin. Focusing on tactile feedback, smooth 60fps animations, intelligent caching, background synchronization, and zero-friction onboarding flows.",
    icon: mobileIcon,
    videoBg: "https://assets.mixkit.co/videos/preview/mixkit-person-scrolling-on-a-smartphone-at-night-42878-large.mp4",
    highlights: [
      "Offline-first state synchronization and resilient local storage",
      "Native device integration: biometric auth, camera, haptics, geolocation",
      "Push notification systems with targeted user segmentation",
      "App Store & Google Play Store submission & release engineering"
    ],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "Firebase", "GraphQL", "SQLite"],
    deliverables: ["iOS & Android Builds", "Design System UI Kit", "API Integration", "App Store Readiness", "Telemetry Setup"]
  },
  {
    id: "ai-solutions",
    title: "AI Solutions & Systems",
    tagline: "Pragmatic machine intelligence integrated seamlessly into production.",
    description: "Intelligent automation, LLM workflows, conversational assistants, and predictive analytics that create real operational leverage.",
    details: "We demystify AI by turning state-of-the-art models into reliable, cost-efficient, and low-latency product features. From custom RAG pipelines and intelligent semantic search to automated data workflows and contextual agent systems.",
    icon: aiIcon,
    videoBg: "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-microchip-with-blue-neon-lights-42995-large.mp4",
    highlights: [
      "Custom Retrieval-Augmented Generation (RAG) over proprietary data",
      "High-speed semantic search, vector indexing, and embedding pipelines",
      "Autonomous agent workflows, tool calling, and automated triage",
      "Cost optimization, token efficiency, and fallback model routing"
    ],
    techStack: ["OpenAI API", "Anthropic Claude", "LangChain / LlamaIndex", "Pinecone / Qdrant", "Python / FastAPI", "PyTorch", "Hugging Face"],
    deliverables: ["Custom AI Workflow", "Model Fine-tuning / RAG", "Vector Database Setup", "Latency & Cost Monitor", "Integration Guide"]
  }
];

export default servicesData;

import myKartImg from "../assets/myKart.webp";
import bookReadingImg from "../assets/BookReading.webp";
import instaUIImg from "../assets/instaUI.webp";
import movieAppImg from "../assets/MovieApp.webp";
import landingImg from "../assets/Landing.webp";

export const categories = ["All", "Web", "Mobile", "UI/UX", "AI"];

export const projectsData = [
  {
    id: "my-kart",
    title: "MyKart E-Commerce Web App",
    subtitle: "High-throughput storefront with sub-second checkout flow",
    category: "Web",
    role: "Full-Stack Product Build",
    year: "2025",
    image: myKartImg,
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-computer-keyboard-41315-large.mp4",
    featured: true,
    challenge: "Traditional e-commerce templates suffer from heavy render blocking, slow catalog pagination, and checkout friction causing high drop-off rates.",
    approach: "Engineered a reactive React/Node.js storefront featuring optimistic cart updates, indexed instant search, and streamlined 2-step checkout.",
    outcome: "Achieved a 99 Lighthouse performance score, zero render stutter, and an intuitive shopping journey on both mobile and desktop viewports.",
    tags: ["React", "Node.js", "Commerce UX", "Responsive UI", "Stripe API"],
    link: "https://my-kart-taupe.vercel.app/",
    github: "https://github.com/wiz0007"
  },
  {
    id: "book-reading",
    title: "Book Reading Mobile App",
    subtitle: "Distraction-free reading ecosystem with custom typography engine",
    category: "Mobile",
    role: "Mobile Product Experience",
    year: "2025",
    image: bookReadingImg,
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-person-scrolling-on-a-smartphone-at-night-42878-large.mp4",
    featured: true,
    challenge: "Mobile reading apps often overwhelm readers with cluttered interfaces, distracting banners, and sluggish page transitions.",
    approach: "Designed a content-first mobile interface with customizable reading modes, offline progress sync, and smooth 60fps gesture-based pagination.",
    outcome: "A focused, calm reading environment that prioritizes typography, readability, and continuous session engagement.",
    tags: ["React Native", "Mobile UX", "Offline Sync", "Gesture Engine"],
    link: "https://github.com/tanujjoshi95",
    github: "https://github.com/tanujjoshi95"
  },
  {
    id: "movie-app",
    title: "Cinema Stream & Discovery",
    subtitle: "Fluid entertainment browsing with instant preview trailers",
    category: "Mobile",
    role: "Entertainment UI Engineering",
    year: "2025",
    image: movieAppImg,
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4",
    featured: true,
    challenge: "Media discovery apps need to load rich image backdrops and streaming meta without bogging down device memory or network bandwidth.",
    approach: "Built a touch-first interface using progressive image loading, virtualized horizontal carousels, and responsive TMDB API caching.",
    outcome: "Ultra-fluid media browsing experience with instant search filters and seamless video modal playback.",
    tags: ["Mobile UI", "Media UX", "REST API", "State Architecture"],
    link: "https://github.com/tanujjoshi95",
    github: "https://github.com/tanujjoshi95"
  },
  {
    id: "insta-ui",
    title: "Social Profile & Content Engine",
    subtitle: "Modular component architecture replicating modern social feeds",
    category: "UI/UX",
    role: "Interface Systems Concept",
    year: "2025",
    image: instaUIImg,
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-holding-a-smartphone-with-a-green-screen-42874-large.mp4",
    featured: false,
    challenge: "Complex social feeds require scalable layout structures that remain responsive across varying screen aspect ratios.",
    approach: "Architected modular profile grids, tabbed media feeds, and tactile action sheets with strict CSS Grid and Flexbox alignment.",
    outcome: "A crisp, reusable social UI design system demonstrating advanced CSS architecture and component composability.",
    tags: ["UI Systems", "Social UX", "Grid Architecture", "Figma to Code"],
    link: "https://github.com/tanujjoshi95",
    github: "https://github.com/tanujjoshi95"
  },
  {
    id: "landing-redesign",
    title: "High-Conversion SaaS Landing Page",
    subtitle: "Conversion-optimized product narrative with interactive demos",
    category: "UI/UX",
    role: "Conversion Architecture",
    year: "2025",
    image: landingImg,
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-34354-large.mp4",
    featured: false,
    challenge: "SaaS landing pages with weak visual hierarchy and ambiguous CTAs struggle to convert technical buyers.",
    approach: "Reworked the hero narrative, section cadence, interactive feature tabs, and testimonial social proof.",
    outcome: "A cohesive, persuasive page structure that increases time-on-page and clarifies value proposition within 5 seconds.",
    tags: ["Landing UX", "Conversion Strategy", "Framer Motion", "Responsive"],
    link: "https://react-project-ebon-seven.vercel.app/",
    github: "https://github.com/wiz0007"
  }
];

export default projectsData;

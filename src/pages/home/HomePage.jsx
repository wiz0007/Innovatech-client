import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from "axios";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import CinematicScene from "../../components/hero/CinematicScene";
import styles from "./HomePage.module.scss";

import webIcon from "../../assets/webApp.png";
import mobileIcon from "../../assets/mobileApp.png";
import aiIcon from "../../assets/AISolu.png";
import aboutImage from "../../assets/About.png";
import members from "../../assets/team/team";

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionArticle = motion.article;
const MotionAnchor = motion.a;
const MotionButton = motion.button;
const MotionH1 = motion.h1;
const MotionP = motion.p;

const focusLinks = ["Motion", "Interaction", "UI / UX", "Web design", "Visuals"];

const services = [
  {
    title: "Web Applications",
    description: "Responsive and performant web apps tailored to your business needs.",
    details: "SEO-friendly, scalable, secure web apps for e-commerce, SaaS platforms, dashboards, MVPs, production systems, CI/CD, and monitoring.",
    icon: webIcon,
  },
  {
    title: "Mobile Applications",
    description: "High-quality mobile apps for iOS and Android platforms.",
    details: "Cross-platform and native mobile experiences with offline support, push notifications, smooth performance, and app-store ready delivery.",
    icon: mobileIcon,
  },
  {
    title: "AI Solutions",
    description: "Smart AI-powered solutions to automate and enhance business processes.",
    details: "Practical AI integrations, assistants, analytics, automation workflows, and model-backed product features that connect cleanly to your stack.",
    icon: aiIcon,
  },
];

const projects = [
  {
    title: "E-Commerce Web App",
    category: "Web",
    role: "Product build",
    year: "2025",
    challenge: "Reduce friction across product discovery, cart review, and purchase intent.",
    approach: "Structured a responsive storefront with clear browsing paths, direct product actions, and reusable commerce UI patterns.",
    outcome: "A cleaner buying journey that feels faster, easier to scan, and more trustworthy on desktop and mobile.",
    tags: ["React", "Commerce UX", "Responsive UI"],
    link: "https://my-kart-taupe.vercel.app/",
  },
  {
    title: "Book Reading App",
    category: "Mobile",
    role: "Mobile experience",
    year: "2025",
    challenge: "Create a calm reading product where content stays primary and navigation does not interrupt focus.",
    approach: "Designed a content-first mobile interface with readable spacing, simple information grouping, and predictable touch targets.",
    outcome: "A focused app concept that supports browsing, reading, and returning to content without cognitive overload.",
    tags: ["Mobile UX", "Content UI", "Interaction"],
    link: "https://github.com/tanujjoshi95",
  },
  {
    title: "Instagram Profile Page UI",
    category: "UI/UX",
    role: "Interface concept",
    year: "2025",
    challenge: "Recreate a familiar social profile pattern while maintaining hierarchy and visual polish.",
    approach: "Built modular profile, grid, and action areas with strong alignment, spacing, and scan-friendly grouping.",
    outcome: "A crisp UI exercise that demonstrates component composition and social-interface pattern awareness.",
    tags: ["UI Systems", "Social UX", "Layout"],
    link: "https://github.com/tanujjoshi95",
  },
  {
    title: "Movie App",
    category: "Mobile",
    role: "Entertainment UI",
    year: "2025",
    challenge: "Make media discovery feel visual and organized without hiding key actions behind clutter.",
    approach: "Created a touch-first browsing flow with content cards, clear grouping, and quick recognition patterns.",
    outcome: "A mobile entertainment interface that helps users compare, discover, and act quickly.",
    tags: ["Mobile UI", "Media UX", "Cards"],
    link: "https://github.com/tanujjoshi95",
  },
  {
    title: "Landing Page Redesign",
    category: "UI/UX",
    role: "Conversion design",
    year: "2025",
    challenge: "Improve first-impression clarity and guide users toward the primary call to action.",
    approach: "Reworked hero hierarchy, section rhythm, CTA placement, and responsive content blocks.",
    outcome: "A more persuasive page structure with clearer messaging and stronger conversion flow.",
    tags: ["Landing UX", "CTA Strategy", "Responsive"],
    link: "https://react-project-ebon-seven.vercel.app/",
  },
];

const processSteps = [
  { title: "Discover", text: "Clarify users, product goals, constraints, and the moments that matter most." },
  { title: "Design", text: "Turn strategy into flows, interface systems, and motion direction before build." },
  { title: "Build", text: "Develop responsive, performant products with clean structure and practical integrations." },
  { title: "Launch", text: "Polish details, validate behavior, and ship with a roadmap for iteration." },
];

const categories = ["All", "Web", "Mobile", "UI/UX"];

const reveal = {
  initial: { opacity: 0, y: 46, filter: "blur(14px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.24 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
};

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -145]);
  const hazeScale = useTransform(scrollYProgress, [0, 1], [1, 1.28]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeService, setActiveService] = useState(services[0]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({ type: "idle", message: "" });

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (formStatus.type !== "idle") setFormStatus({ type: "idle", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormStatus({ type: "loading", message: "Sending your message..." });

    try {
      await axios.post("https://innovatech-server.onrender.com/api/contact", formData);
      setFormStatus({ type: "success", message: "Message sent. We will get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setFormStatus({ type: "error", message: "Message could not be sent. Please email us directly." });
    }
  };

  return (
    <main className={styles.page}>
      <CinematicScene />
      <Navbar />
      <MotionDiv className={styles.haze} style={{ scale: hazeScale }} />
      <div className={styles.noise} />

      <section className={styles.hero} id="home">
        <MotionDiv className={styles.sidePanel} initial={{ opacity: 0, x: -34 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.35 }}>
          <p>What are we looking for</p>
          <ul>
            {focusLinks.map((item) => (
              <li key={item}><span>-&gt;</span>{item}</li>
            ))}
          </ul>
          <a href="#portfolio">View all works</a>
        </MotionDiv>

        <MotionDiv className={styles.heroCopy} style={{ y: heroY }}>
          <MotionP className={styles.eyebrow} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            InnovaTech / Creative app studio
          </MotionP>
          <MotionH1 data-text="Creative Digital Experiences" initial={{ opacity: 0, y: 52, filter: "blur(18px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}>
            Creative Digital Experiences
          </MotionH1>
          <MotionP className={styles.heroSummary} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.42 }}>
            We design and develop high-performance web, mobile, and AI products for startups and growing teams that need interfaces users can trust.
          </MotionP>
          <MotionDiv className={styles.heroActions} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
            <a href="#contact">Start a project</a>
            <a href="#portfolio">View work</a>
          </MotionDiv>
          <MotionDiv className={styles.patronusCard} initial={{ opacity: 0, rotateX: 16, y: 38 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} transition={{ duration: 0.9, delay: 0.55 }}>
            <span>We build web, mobile, and AI products</span>
            <small>Signal 08 / Live scene</small>
          </MotionDiv>
        </MotionDiv>
      </section>

      <MotionSection className={styles.section} id="services" {...reveal}>
        <div className={styles.sectionIntro}>
          <p>Services</p>
          <h2>Product engineering wrapped in cinematic interaction.</h2>
        </div>
        <div className={styles.servicesLayout}>
          <div className={styles.serviceList}>
            {services.map((service) => (
              <MotionButton key={service.title} type="button" className={`${styles.serviceTab} ${activeService.title === service.title ? styles.active : ""}`} onClick={() => setActiveService(service)} whileHover={{ x: 8 }} whileTap={{ scale: 0.98 }}>
                <img src={service.icon} alt="" />
                <span>{service.title}</span>
              </MotionButton>
            ))}
          </div>
          <MotionArticle className={styles.serviceShowcase} key={activeService.title} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <img src={activeService.icon} alt="" />
            <p>{activeService.description}</p>
            <h3>{activeService.details}</h3>
            <a href="#contact">Start with this</a>
          </MotionArticle>
        </div>
      </MotionSection>

      <MotionSection className={styles.section} id="portfolio" {...reveal}>
        <div className={styles.sectionIntro}>
          <p>Portfolio</p>
          <h2>Selected work as clear product case studies.</h2>
        </div>
        <div className={styles.filters}>
          {categories.map((category) => (
            <button key={category} type="button" className={activeCategory === category ? styles.active : ""} onClick={() => setActiveCategory(category)}>
              {category}
            </button>
          ))}
        </div>
        <div className={styles.projectGrid}>
          {filteredProjects.map((project, index) => (
            <MotionAnchor href={project.link} target="_blank" rel="noopener noreferrer" className={styles.projectCard} key={project.title} initial={{ opacity: 0, y: 42, rotateX: 10 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, delay: index * 0.08 }} whileHover={{ y: -8, rotateY: index % 2 ? -3 : 3 }}>
              <div className={styles.projectMeta}>
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <h3>{project.title}</h3>
              <div className={styles.projectBrief}>
                <section>
                  <span>Challenge</span>
                  <p>{project.challenge}</p>
                </section>
                <section>
                  <span>Approach</span>
                  <p>{project.approach}</p>
                </section>
                <section>
                  <span>Outcome</span>
                  <p>{project.outcome}</p>
                </section>
              </div>
              <div className={styles.projectTags}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.projectFooter}>
                <span>{project.role}</span>
                <strong>View project</strong>
              </div>
            </MotionAnchor>
          ))}
        </div>
      </MotionSection>


      <MotionSection className={`${styles.section} ${styles.processSection}`} id="process" {...reveal}>
        <div className={styles.sectionIntro}>
          <p>Process</p>
          <h2>A simple delivery path that keeps every product decision accountable.</h2>
        </div>
        <div className={styles.processGrid}>
          {processSteps.map((step, index) => (
            <MotionArticle className={styles.processCard} key={step.title} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.08 }}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </MotionArticle>
          ))}
        </div>
      </MotionSection>
      <MotionSection className={`${styles.section} ${styles.aboutSection}`} id="about" {...reveal}>
        <div className={styles.aboutCopy}>
          <p>About InnovaTech</p>
          <h2>We transform ideas into digital products that engage, inspire, and scale.</h2>
          <span>At Alphaflow, we craft web and mobile applications that combine sleek design with seamless performance. From startups to established teams, every build is shaped to feel sharp, responsive, and memorable.</span>
        </div>
        <div className={styles.aboutVisual}>
          <img src={aboutImage} alt="About InnovaTech" />
        </div>
      </MotionSection>

      <MotionSection className={styles.section} id="team" {...reveal}>
        <div className={styles.sectionIntro}>
          <p>Team</p>
          <h2>The people behind the build.</h2>
        </div>
        <div className={styles.teamGrid}>
          {members.map((member, index) => (
            <MotionArticle className={styles.teamCard} key={member.name} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.08 }}>
              <img src={member.photo} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className={styles.socials}>
                {member.twitter && <a href={member.twitter} target="_blank" rel="noreferrer" aria-label={`${member.name} Twitter`}><FaTwitter /></a>}
                {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} LinkedIn`}><FaLinkedin /></a>}
                {member.github && <a href={member.github} target="_blank" rel="noreferrer" aria-label={`${member.name} GitHub`}><FaGithub /></a>}
              </div>
            </MotionArticle>
          ))}
        </div>
      </MotionSection>

      <MotionSection className={`${styles.section} ${styles.contactSection}`} id="contact" {...reveal}>
        <div className={styles.contactInfo}>
          <p>Contact</p>
          <h2>Let us build something immersive together.</h2>
          <ul>
            <li><a href="mailto:ayush8171wiz@gmail.com">ayush8171wiz@gmail.com</a></li>
            <li><a href="tel:+919149084611">+91 91490 84611</a></li>
            <li>Bengaluru, India</li>
          </ul>
        </div>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <label>
            <span>Your Name</span>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            <span>Email Address</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            <span>Message</span>
            <textarea rows="5" name="message" value={formData.message} onChange={handleChange} required />
          </label>
          <button type="submit" disabled={formStatus.type === "loading"}>{formStatus.type === "loading" ? "Sending..." : "Send Message"}</button>
          {formStatus.message && <p className={`${styles.formStatus} ${styles[formStatus.type]}`}>{formStatus.message}</p>}
        </form>
      </MotionSection>

      <footer className={styles.footer}>
        <div>
          <h2>InnovaTech</h2>
          <p>Building modern digital experiences with impact.</p>
        </div>
        <nav>
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#process">Process</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className={styles.footerSocials}>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;





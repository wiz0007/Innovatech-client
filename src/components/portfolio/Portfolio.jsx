import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Portfolio.module.scss";
import myKart from "../../assets/myKart.png";
import Landing from "../../assets/Landing.png";
import image from "../../assets/webApp.png"
import instaUI from "../../assets/instaUI.jpg"
import book from "../../assets/BookReading.jpg"
import movie from "../../assets/MovieApp.jpg"

const projects = [
  {
    title: "E-Commerce Web App",
    category: "Web",
    image: myKart,
    link: "https://my-kart-taupe.vercel.app/",
  },
  {
    title: "Book Reading App",
    category: "Mobile",
    image: book,
    link: "https://github.com/tanujjoshi95",
  },
  {
    title: "Instagram Profile Page UI",
    category: "UI/UX",
    image: instaUI,
    link: "https://github.com/tanujjoshi95",
  },
  // {
  //   title: "Portfolio Website",
  //   category: "Web",
  //   image: image,
  //   link: "https://myportfolio.com",
  // },
  {
    title: "Movie App",
    category: "Mobile",
    image: movie,
    link: "https://github.com/tanujjoshi95",
  },
  {
    title: "Landing Page Redesign",
    category: "UI/UX",
    image: Landing,
    link: "https://react-project-ebon-seven.vercel.app/",
  },
];

const categories = ["All", "Web", "Mobile", "UI/UX"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className={styles.portfolio} id="portfolio">
      <h2>Our Projects</h2>

      {/* Categories Filter */}
      <div className={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? styles.active : ""}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        className={styles.grid}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {filteredProjects.map((project, i) => (
          <motion.a
            key={i}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className={styles["image-wrapper"]}>
              <img src={project.image} alt={project.title} />
            </div>
            <div className={styles.overlay}>
              <h3>{project.title}</h3>
              <span>{project.category}</span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default Portfolio;

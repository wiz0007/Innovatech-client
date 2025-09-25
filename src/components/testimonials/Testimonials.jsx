import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Testimonials.module.scss";

const testimonials = [
  {
    name: "Sophia Williams",
    role: "CEO, TechNova",
    text: "InnovaTech transformed our outdated system into a modern, scalable platform. Their attention to detail and dedication is unmatched.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "James Carter",
    role: "Founder, FinEdge",
    text: "Working with InnovaTech felt like having an in-house team. They went above and beyond to deliver a flawless mobile experience.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Priya Sharma",
    role: "CTO, HealthBridge",
    text: "Reliable, creative, and always on time. They’ve been an incredible partner in scaling our healthcare solutions.",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    name: "David Kim",
    role: "Product Manager, EduPlus",
    text: "From wireframes to deployment, InnovaTech guided us every step of the way. Our users love the new design!",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.testimonials} id="testimonials">
      <h2>
        What Our <span>Clients Say</span>
      </h2>

      <div className={styles.slider}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={testimonials[index].avatar}
              alt={testimonials[index].name}
            />
            <p>"{testimonials[index].text}"</p>
            <h3>{testimonials[index].name}</h3>
            <span>{testimonials[index].role}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className={styles.dots}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ""}`}
            onClick={() => setIndex(i)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

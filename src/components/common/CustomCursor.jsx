import React, { useEffect, useRef, useState } from "react";
import gsap from "../../utils/gsapConfig";
import styles from "./CustomCursor.module.scss";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop/pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const setCursorX = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const setCursorY = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    const setFollowerX = gsap.quickTo(follower, "x", { duration: 0.35, ease: "power3" });
    const setFollowerY = gsap.quickTo(follower, "y", { duration: 0.35, ease: "power3" });

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);
      setCursorX(mouse.x);
      setCursorY(mouse.y);
      setFollowerX(mouse.x);
      setFollowerY(mouse.y);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleLinkHoverEvents = () => {
      const interactives = document.querySelectorAll("a, button, input, textarea, select, [role='button'], .interactive-hover");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    handleLinkHoverEvents();
    const observer = new MutationObserver(handleLinkHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`${styles.cursorDot} ${isVisible ? styles.visible : ""} ${isHovered ? styles.hovered : ""}`}
      />
      <div
        ref={followerRef}
        className={`${styles.cursorFollower} ${isVisible ? styles.visible : ""} ${isHovered ? styles.hovered : ""}`}
      />
    </>
  );
};

export default CustomCursor;

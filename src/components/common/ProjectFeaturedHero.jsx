import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RefreshCw,
  Cpu,
  Database,
  Network,
  Layers,
  Heart,
} from "lucide-react";
import { gsap, ScrollTrigger } from "../../utils/gsapConfig";
import styles from "./ProjectFeaturedHero.module.scss";

const TOTAL_FRAMES = 60;

const ProjectFeaturedHero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(10842);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const scrollProgressRef = useRef(0);

  // Sync scroll progress ref
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  // Frame rendering on canvas
  const renderFrameAtProgress = useCallback((progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || canvas.clientWidth || 1000;
    const height = rect.height || canvas.clientHeight || 560;

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const safeProgress = Math.min(1, Math.max(0, progress));
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(safeProgress * (TOTAL_FRAMES - 1)))
    );

    const img = imagesRef.current[frameIndex] || imagesRef.current[0];

    if (img && img.complete && img.naturalWidth > 0) {
      const imgAspect = img.naturalWidth / img.naturalHeight; // 1280 / 720 = 1.7778
      const canvasAspect = width / height;

      let drawW, drawH, drawX, drawY;

      if (canvasAspect > imgAspect) {
        drawH = height;
        drawW = height * imgAspect;
        drawX = (width - drawW) / 2;
        drawY = 0;
      } else {
        drawW = width;
        drawH = width / imgAspect;
        drawX = 0;
        drawY = (height - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    ctx.restore();
  }, []);

  // Preload all 60 high-fidelity RGBA WebP frames
  useEffect(() => {
    let loadedCount = 0;
    const imgs = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(2, "0");
      img.src = `/assets/handshake_wide_frames/frame_${numStr}.webp`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          renderFrameAtProgress(0);
        }
      };

      imgs.push(img);
    }

    imagesRef.current = imgs;

    return () => {
      imagesRef.current = [];
    };
  }, [renderFrameAtProgress]);

  // Update canvas on scroll progress change
  useEffect(() => {
    renderFrameAtProgress(scrollProgress);
  }, [scrollProgress, renderFrameAtProgress]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      renderFrameAtProgress(scrollProgressRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrameAtProgress]);

  // Pin hero on scroll & drive handshake animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        scrub: 0.4,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3D Parallax Mouse Tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setMouseTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  const toggleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const isSynchronized = scrollProgress > 0.65;

  return (
    <section
      ref={containerRef}
      className={styles.heroSection}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Radial Glow centered behind clasp point */}
      <div className={styles.ambientSpotlight} />

      {/* Subtle Architectural Grid */}
      <div className={styles.subtleGrid} />

      {/* ================= PHOTOREALISTIC HANDSHAKE STAGE ================= */}
      {/* Starts from the midpoints of the corner containers and clasps in the center */}
      <div className={styles.handshakeStage}>
        <motion.div
          className={styles.canvasMotionWrapper}
          animate={{
            x: mouseTilt.x * -1.2,
            y: mouseTilt.y * -1.2,
          }}
          transition={{ type: "spring", stiffness: 85, damping: 24 }}
        >
          <canvas ref={canvasRef} className={styles.handshakeCanvas} />
        </motion.div>
      </div>

      {/* ================= BENTO GRID OVERLAY ================= */}
      <div className={styles.bentoCanvas}>
        {/* ================= LEFT COLUMN: HERO TITLE & METRICS ================= */}
        <div className={styles.leftCol}>
          <div className={styles.titleSection}>
            <div className={styles.eyebrowRow}>
              <span className={styles.pulseDot} />
              <span className={styles.eyebrowText}>
                HUMAN AMBITION × AI ENGINEERING
              </span>
            </div>

            <h1 className={styles.refinedHeading}>
              <span>ENGINEERING</span>
              <span>PARTNERSHIPS</span>
              <span className={styles.headingGradient}>POWERED BY AI</span>
            </h1>
          </div>

          {/* Minimalist Live Pipeline Telemetry Widget */}
          <div className={styles.telemetryCard}>
            <div className={styles.telemetryHead}>
              <div className={styles.statusGroup}>
                <span className={styles.statusDot} />
                <span className={styles.statusText}>
                  {isSynchronized
                    ? "PARTNERSHIP // LOCKED & ENGAGED"
                    : "SYNCHRONIZATION // ACTIVE"}
                </span>
              </div>
              <span className={styles.latencyBadge}>&lt; 3.8ms</span>
            </div>

            <div className={styles.eqRow}>
              <div className={styles.equalizerBars}>
                <span className={styles.bar} style={{ animationDelay: "0s" }} />
                <span className={styles.bar} style={{ animationDelay: "0.2s" }} />
                <span className={styles.bar} style={{ animationDelay: "0.4s" }} />
                <span className={styles.bar} style={{ animationDelay: "0.1s" }} />
                <span className={styles.bar} style={{ animationDelay: "0.3s" }} />
                <span className={styles.bar} style={{ animationDelay: "0.5s" }} />
              </div>
              <div className={styles.rateDisplay}>
                <span className={styles.rateNum}>
                  {isSynchronized ? "100% SYNC" : "128,400"}
                </span>
                <span className={styles.rateUnit}>
                  {isSynchronized ? "COMMITTED" : "TX / SEC"}
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Synopsis */}
          <p className={styles.synopsisText}>
            We partner directly with ambitious founders and engineering leaders to
            design, architect, and ship high-throughput digital systems.
          </p>
        </div>

        {/* ================= CENTER COLUMN: BREATHING SPACE FOR THE CLASP ================= */}
        <div className={styles.centerSpacer}>
          <div className={styles.claspIndicator}>
            <span className={styles.claspDot} />
            <span className={styles.claspLabel}>
              {isSynchronized
                ? "ALLIANCE // COMMITTED & ENGAGED"
                : "REAL-TIME STATE // SYNCHRONIZING"}
            </span>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: REAL ARCHITECTURE TOPOLOGY DECK ================= */}
        <div className={styles.rightCol}>
          {/* Live System Architecture Topology Schematic Card */}
          <div className={styles.topologyCard}>
            <div className={styles.topologyHead}>
              <div className={styles.topologyTitleGroup}>
                <Layers size={13} className={styles.topologyIcon} />
                <span className={styles.topologyLabel}>
                  SYSTEM TOPOLOGY // CLUSTER 01
                </span>
              </div>

              <button
                className={`${styles.likeBtn} ${isLiked ? styles.liked : ""}`}
                onClick={toggleLike}
                aria-label="Bookmark Architecture"
              >
                <Heart
                  size={12}
                  fill={isLiked ? "#ff4070" : "none"}
                  color={isLiked ? "#ff4070" : "#ffffff"}
                />
                <span>{(likeCount / 1000).toFixed(1)}K</span>
              </button>
            </div>

            {/* Interactive Connected Architecture Nodes */}
            <div className={styles.schematicCanvas}>
              {/* Node 1: API Edge Ingress */}
              <div className={styles.nodeItem}>
                <div className={styles.nodeIconBadge}>
                  <Network size={13} />
                </div>
                <div className={styles.nodeMeta}>
                  <span className={styles.nodeName}>API EDGE INGRESS</span>
                  <span className={styles.nodeStat}>142K REQ/S • 0.8MS</span>
                </div>
                <span className={styles.nodeLivePulse} />
              </div>

              {/* Data Pipeline Flow Indicator */}
              <div className={styles.flowConnector}>
                <span className={styles.flowLine} />
                <span className={styles.flowPulse} />
              </div>

              {/* Node 2: Vector Neural Cache */}
              <div className={styles.nodeItem}>
                <div className={styles.nodeIconBadge}>
                  <Database size={13} />
                </div>
                <div className={styles.nodeMeta}>
                  <span className={styles.nodeName}>VECTOR NEURAL CACHE</span>
                  <span className={styles.nodeStat}>SUB-MS RETRIEVAL • 99.99%</span>
                </div>
                <span className={styles.nodeLivePulse} />
              </div>

              {/* Data Pipeline Flow Indicator */}
              <div className={styles.flowConnector}>
                <span className={styles.flowLine} />
                <span
                  className={styles.flowPulse}
                  style={{ animationDelay: "0.6s" }}
                />
              </div>

              {/* Node 3: Autonomous Agent Core */}
              <div className={styles.nodeItem}>
                <div className={styles.nodeIconBadge}>
                  <Cpu size={13} />
                </div>
                <div className={styles.nodeMeta}>
                  <span className={styles.nodeName}>AUTONOMOUS AGENT CORE</span>
                  <span className={styles.nodeStat}>16 CLUSTERS • 0 DOWNTIME</span>
                </div>
                <span className={styles.nodeLivePulse} />
              </div>
            </div>

            {/* Live Metrics Strip */}
            <div className={styles.topologyFooter}>
              <div className={styles.metricCell}>
                <span className={styles.metricVal}>12.4 GB/S</span>
                <span className={styles.metricName}>THROUGHPUT</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricCell}>
                <span className={styles.metricVal}>&lt; 3.8 MS</span>
                <span className={styles.metricName}>LATENCY</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricCell}>
                <span className={styles.metricVal}>N+2 MESH</span>
                <span className={styles.metricName}>REDUNDANCY</span>
              </div>
            </div>
          </div>

          {/* Engineering Performance Summary */}
          <div className={styles.benchmarkBox}>
            <div className={styles.benchmarkTitle}>
              SUB-10MS LATENCY // 99.99% UPTIME
            </div>
            <p className={styles.benchmarkText}>
              From zero-to-one product engineering to autonomous AI workflows,
              our team integrates seamlessly with yours.
            </p>
          </div>

          {/* High-Tech Circular CTA Button */}
          <div className={styles.ctaWrapper}>
            <Link to="/contact" className={styles.pillCta}>
              <span className={styles.ctaText}>START AN ENGAGEMENT</span>
              <span className={styles.ctaIconBadge}>
                <RefreshCw size={14} className={styles.spinIcon} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectFeaturedHero;

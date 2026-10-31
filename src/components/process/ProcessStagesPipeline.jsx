import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  ShieldCheck, 
  FileCode2, 
  Layers, 
  Cpu, 
  Terminal, 
  Sparkles, 
  Layout, 
  Database, 
  GitBranch, 
  Radio, 
  Workflow
} from "lucide-react";
import gsap, { ScrollTrigger } from "../../utils/gsapConfig";
import styles from "./ProcessStagesPipeline.module.scss";

const ROTATING_PIPELINE_SUBHEADINGS = [
  "Deterministic Sprints & Verifiable Artifacts",
  "Non-Negotiable Quality Gates at Every Phase",
  "Zero Technical Debt & Daily Git Commits",
  "Senior Architect Partnership & No Junior Handoffs",
];

const STAGE_ICONS = {
  1: [FileCode2, Database, Workflow, Clock],
  2: [Layout, Sparkles, Layers, ShieldCheck],
  3: [Cpu, Terminal, GitBranch, Radio],
  4: [ShieldCheck, Radio, Sparkles, Terminal]
};

export default function ProcessStagesPipeline({ steps = [] }) {
  const containerRef = useRef(null);
  const stageViewportRef = useRef(null);
  const conduitWrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const nodeRefs = useRef([]);
  const glowPathRef = useRef(null);
  const corePathRef = useRef(null);
  const beaconRef = useRef(null);

  const [pathData, setPathData] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 1240, height: 2000 });
  const [activeNodes, setActiveNodes] = useState({ 1: true, 2: false, 3: false, 4: false });
  const [subheadingIdx, setSubheadingIdx] = useState(0);

  // Rotating header value proposition timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSubheadingIdx((prev) => (prev + 1) % ROTATING_PIPELINE_SUBHEADINGS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Compute exact serpentine / linear conduit path routing directly through the card side lines
  const calculateSerpentinePath = useCallback(() => {
    if (!conduitWrapperRef.current) return;
    const wrapper = conduitWrapperRef.current;
    const wrapperRect = wrapper.getBoundingClientRect();
    const w = wrapperRect.width;
    const h = wrapper.scrollHeight || wrapperRect.height;

    if (w === 0 || h === 0) return;

    const isMobile = window.innerWidth <= 960;

    const stagesData = [];
    steps.forEach((s, idx) => {
      const cardEl = cardRefs.current[idx];
      const nodeEl = nodeRefs.current[idx];
      if (cardEl && nodeEl) {
        const cardRect = cardEl.getBoundingClientRect();
        const nodeRect = nodeEl.getBoundingClientRect();
        const isEven = idx % 2 === 1;

        // On mobile, the sideline conduit runs along the left side passing through the node center
        // On desktop, 0=Left Card (Right Sideline), 1=Right Card (Left Sideline)...
        const sidelineX = isMobile
          ? nodeRect.left - wrapperRect.left + nodeRect.width / 2
          : (isEven ? cardRect.left - wrapperRect.left : cardRect.right - wrapperRect.left);

        const nodeY = nodeRect.top - wrapperRect.top + nodeRect.height / 2;
        const bottomY = cardRect.bottom - wrapperRect.top - 18;

        stagesData.push({
          step: s.step,
          isEven,
          sidelineX,
          nodeY,
          bottomY
        });
      }
    });

    if (stagesData.length < 2) return;

    let d = "";
    if (isMobile) {
      // Mobile: Straight vertical conduit line passing precisely through all orbital nodes
      const lineX = stagesData[0].sidelineX || 17;
      d = `M ${lineX},0 L ${lineX},${h}`;
    } else {
      // Desktop: Serpentine S-curves connecting alternating card sidelines
      d = `M ${w / 2},0`;

      // 1. From top center into Node 01 on Stage 1 right sideline
      const s0 = stagesData[0];
      d += ` C ${w / 2},${s0.nodeY * 0.45} ${s0.sidelineX},${s0.nodeY * 0.65} ${s0.sidelineX},${s0.nodeY}`;

      // 2. Travel straight down Stage 1 right sideline
      d += ` L ${s0.sidelineX},${s0.bottomY}`;

      // 3. Connect each stage's bottom sideline to the next stage's top sideline
      for (let i = 0; i < stagesData.length - 1; i++) {
        const curr = stagesData[i];
        const next = stagesData[i + 1];
        const verticalGap = next.nodeY - curr.bottomY;

        d += ` C ${curr.sidelineX},${curr.bottomY + verticalGap * 0.55} ${next.sidelineX},${next.nodeY - verticalGap * 0.55} ${next.sidelineX},${next.nodeY}`;
        d += ` L ${next.sidelineX},${next.bottomY}`;
      }

      // 4. From Stage 4 bottom sideline to bottom center
      const last = stagesData[stagesData.length - 1];
      const endGap = h - last.bottomY;
      d += ` C ${last.sidelineX},${last.bottomY + endGap * 0.45} ${w / 2},${last.bottomY + endGap * 0.75} ${w / 2},${h}`;
    }

    setPathData(d);
    setSvgDimensions({ width: w, height: h });
  }, [steps]);

  // Recalculate on mount, font load, and window resize with ResizeObserver
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateSerpentinePath();
    }, 120);

    const handleResize = () => {
      calculateSerpentinePath();
    };

    window.addEventListener("resize", handleResize);

    let ro;
    if (typeof ResizeObserver !== "undefined" && conduitWrapperRef.current) {
      ro = new ResizeObserver(() => {
        calculateSerpentinePath();
      });
      ro.observe(conduitWrapperRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (ro) ro.disconnect();
    };
  }, [calculateSerpentinePath]);

  // Scroll-Driven Pinned Pipeline: Screen sticks in this exact layout, only the elements move!
  useEffect(() => {
    if (!pathData) return;

    const glowPath = glowPathRef.current;
    const corePath = corePathRef.current;
    const beacon = beaconRef.current;
    const track = conduitWrapperRef.current;
    const viewport = stageViewportRef.current;
    const section = containerRef.current;

    if (!glowPath || !corePath || !track || !viewport || !section) return;

    const pathLength = glowPath.getTotalLength();
    if (pathLength === 0) return;

    // Initialize paths as hidden
    gsap.set([glowPath, corePath], {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    if (beacon) {
      const startPt = glowPath.getPointAtLength(0.01);
      gsap.set(beacon, {
        x: startPt.x,
        y: startPt.y,
        opacity: 0
      });
    }

    const mm = gsap.matchMedia();

    // DESKTOP: Pinned presentation (Screen sticks in this layout, only the elements move!)
    mm.add("(min-width: 961px)", () => {
      // Calculate total vertical travel distance of the track inside the viewport
      const maxScrollY = Math.max(0, track.scrollHeight - viewport.clientHeight + 40);

      const pinTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 72px", // Sticks when section top aligns below the navbar
        end: `+=${Math.max(1800, maxScrollY * 1.5)}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = Math.max(0, Math.min(1, self.progress));

          // 1. Move ONLY the stage elements through the stationary viewport!
          const currentY = maxScrollY * progress;
          gsap.set(track, { y: -currentY });

          // 2. Draw the branch downward following the scroll
          const drawnLength = pathLength * progress;
          gsap.set([glowPath, corePath], {
            strokeDashoffset: pathLength - drawnLength
          });

          // 3. Move the traveling radiant beacon head
          if (beacon) {
            if (drawnLength > 5 && progress < 0.99) {
              const pt = glowPath.getPointAtLength(drawnLength);
              gsap.set(beacon, {
                x: pt.x,
                y: pt.y,
                opacity: 1
              });
            } else {
              gsap.set(beacon, { opacity: 0 });
            }
          }

          // 4. Sequentially activate nodes as the branch reaches each stage
          setActiveNodes({
            1: true,
            2: progress >= 0.30,
            3: progress >= 0.62,
            4: progress >= 0.90
          });
        }
      });

      return () => {
        pinTrigger.kill();
        gsap.set(track, { clearProps: "transform" });
      };
    });

    // MOBILE: Pinned presentation (Sticks below mobile navbar, branch moves down, cards scroll through!)
    mm.add("(max-width: 960px)", () => {
      const maxScrollY = Math.max(0, track.scrollHeight - viewport.clientHeight + 24);

      const pinTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 64px",
        end: `+=${Math.max(1600, maxScrollY * 1.35)}`,
        pin: true,
        scrub: 0.45,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = Math.max(0, Math.min(1, self.progress));

          // 1. Move ONLY the stage elements through the stationary viewport
          const currentY = maxScrollY * progress;
          gsap.set(track, { y: -currentY });

          // 2. Draw the vertical conduit branch downward following the scroll
          const drawnLength = pathLength * progress;
          gsap.set([glowPath, corePath], {
            strokeDashoffset: pathLength - drawnLength
          });

          // 3. Move the traveling radiant beacon head along the conduit
          if (beacon) {
            if (drawnLength > 5 && progress < 0.99) {
              const pt = glowPath.getPointAtLength(drawnLength);
              gsap.set(beacon, {
                x: pt.x,
                y: pt.y,
                opacity: 1
              });
            } else {
              gsap.set(beacon, { opacity: 0 });
            }
          }

          // 4. Sequentially activate nodes as the branch reaches each stage
          setActiveNodes({
            1: true,
            2: progress >= 0.28,
            3: progress >= 0.58,
            4: progress >= 0.88
          });
        }
      });

      return () => {
        pinTrigger.kill();
        gsap.set(track, { clearProps: "transform" });
      };
    });

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
    };
  }, [pathData]);

  return (
    <section id="process-stages" ref={containerRef} className={styles.stagesSection}>
      <div className={styles.container}>
        {/* STATIONARY SECTION HEADER (STICKS IN THIS EXACT LAYOUT, NEVER OVERLAPS) */}
        <div className={styles.headerBlock}>
          <h2 className={styles.mainTitle}>
            The 4-Stage Delivery Method
          </h2>

          <div className={styles.subheadingStage}>
            <AnimatePresence mode="wait">
              <motion.p
                key={ROTATING_PIPELINE_SUBHEADINGS[subheadingIdx]}
                className={styles.rotatingSubtitle}
                initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(3px)" }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                {ROTATING_PIPELINE_SUBHEADINGS[subheadingIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* STAGE VIEWPORT (MASKED VIEWING FRAME - SCREEN STICKS HERE) */}
        <div ref={stageViewportRef} className={styles.stageViewport}>
          {/* MOVING TRACK (ONLY THIS AND ITS ELEMENTS MOVE AS YOU SCROLL) */}
          <div ref={conduitWrapperRef} className={styles.conduitWrapper}>
            {/* DYNAMIC SCROLL-DRIVEN SERPENTINE SVG OVERLAY (DESKTOP & MOBILE) */}
            {pathData && (
              <div className={styles.dynamicSvgContainer} aria-hidden="true">
                <svg 
                  className={styles.dynamicSvg}
                  viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
                  width={svgDimensions.width}
                  height={svgDimensions.height}
                >
                  <defs>
                    <linearGradient id="scrollSilverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="25%" stopColor="#d4d4d8" stopOpacity="1" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="75%" stopColor="#a1a1aa" stopOpacity="1" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
                    </linearGradient>

                    <filter id="scrollGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
                      <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Background Guide Wire (Faint Dashed Line showing entire circuit) */}
                  <path
                    d={pathData}
                    className={styles.guideWirePath}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="2"
                    strokeDasharray="4 6"
                    fill="none"
                  />

                  {/* Layer 1: Volumetric Glowing Aura (Drawn Downward with Scroll) */}
                  <path
                    ref={glowPathRef}
                    d={pathData}
                    stroke="rgba(255, 255, 255, 0.35)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#scrollGlowFilter)"
                    fill="none"
                  />

                  {/* Layer 2: Radiant Liquid Silver Filament (Drawn Downward with Scroll) */}
                  <path
                    ref={corePathRef}
                    d={pathData}
                    stroke="url(#scrollSilverGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />

                  {/* Layer 3: Radiant Beacon Sphere Gliding at the Leading Tip */}
                  <g ref={beaconRef} className={styles.travelingBeacon}>
                    <circle r="14" fill="rgba(255, 255, 255, 0.25)" filter="url(#scrollGlowFilter)" />
                    <circle r="8" fill="rgba(255, 255, 255, 0.75)" filter="url(#scrollGlowFilter)" />
                    <circle r="3.5" fill="#ffffff" />
                  </g>
                </svg>
              </div>
            )}

            {/* ALTERNATING STAGES LIST */}
            <div className={styles.alternatingStages}>
              {steps.map((stepItem, index) => {
                const isEven = index % 2 === 1; // 0 = Left (Right Sideline), 1 = Right (Left Sideline), 2 = Left, 3 = Right
                const icons = STAGE_ICONS[stepItem.step] || [Layers, Cpu, ShieldCheck, Terminal];
                const isNodeLit = activeNodes[stepItem.step];

                return (
                  <div
                    key={stepItem.step}
                    className={`${styles.stageRow} ${isEven ? styles.rowRight : styles.rowLeft}`}
                  >
                    {/* EXPANSIVE COMPACT STAGE CARD (~90% WIDTH) */}
                    <article
                      ref={(el) => (cardRefs.current[index] = el)}
                      className={`${styles.stageCard} ${isNodeLit ? styles.cardActiveHighlight : ""}`}
                    >
                      {/* TOP META BAR */}
                      <div className={styles.cardTopMeta}>
                        <h3 className={styles.stageFullTitle}>{stepItem.fullTitle}</h3>

                        <div className={styles.metaPillsGroup}>
                          <span className={styles.durationPill}>
                            <Clock size={11} />
                            <span>{stepItem.duration}</span>
                          </span>
                          <span className={styles.cadencePill}>
                            <Radio size={11} />
                            <span>{stepItem.cadence}</span>
                          </span>
                        </div>
                      </div>

                      {/* DETAILED NARRATIVE */}
                      <p className={styles.stageDescription}>{stepItem.description}</p>

                      {/* VERIFIABLE ARTIFACTS MATRIX (EXPANSIVE 4-COLUMN HORIZONTAL GRID) */}
                      <div className={styles.deliverablesSection}>
                        <div className={styles.deliverablesHeader}>
                          <div className={styles.deliverablesIconBadge}>
                            <Layers size={13} />
                          </div>
                          <h4 className={styles.deliverablesHeading}>Verifiable Stage Artifacts</h4>
                          <span className={styles.deliverablesCount}>4 Certified Specs</span>
                        </div>

                        <div className={styles.deliverablesMatrix}>
                          {stepItem.deliverablesDetailed?.map((d, dIdx) => {
                            const IconComp = icons[dIdx] || Layers;
                            return (
                              <div key={d.title} className={styles.deliverableTile}>
                                <div className={styles.tileHeader}>
                                  <div className={styles.tileIcon}>
                                    <IconComp size={13} />
                                  </div>
                                  <span className={styles.tileTitle}>{d.title}</span>
                                </div>
                                <p className={styles.tileDetail}>{d.detail}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* QUALITY GATEWAY CHECKPOINT */}
                      <div className={styles.qualityGateway}>
                        <div className={styles.gatewayGlow} />
                        <div className={styles.gatewayIcon}>
                          <ShieldCheck size={16} />
                        </div>
                        <div className={styles.gatewayInfo}>
                          <div className={styles.gatewayTitleRow}>
                            <span className={styles.gatewayBadge}>STAGE 0{stepItem.step} QUALITY GATEWAY</span>
                            <span className={styles.gatewayEnforced}>STRICT ENFORCEMENT</span>
                          </div>
                          <p className={styles.gatewayCriteria}>{stepItem.qualityGate}</p>
                        </div>
                      </div>

                      {/* ORBITAL NODE ANCHOR DOCKED DIRECTLY ON THE CARD'S SIDELINE */}
                      <div
                        ref={(el) => (nodeRefs.current[index] = el)}
                        className={`${styles.sidelineNode} ${isEven ? styles.nodeLeftSideline : styles.nodeRightSideline} ${isNodeLit ? styles.nodeActiveLit : ""}`}
                        aria-label={`Stage 0${stepItem.step} Sideline Node`}
                      >
                        <div className={styles.nodePulseRing} />
                        <div className={styles.nodeCoreCircle}>
                          <span className={styles.nodeNumeral}>0{stepItem.step}</span>
                        </div>
                        <div className={styles.sidelineConnectorTab} />
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

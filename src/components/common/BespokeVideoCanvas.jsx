import React, { useRef, useEffect } from "react";
import styles from "./BespokeVideoCanvas.module.scss";

const BespokeVideoCanvas = ({ theme = "neural" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Common mouse interaction
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;

    // THEME 1: Neural Nexus (Home)
    const neuralNodes = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2.5 + 1.5,
      pulse: Math.random() * Math.PI * 2,
      color: Math.random() > 0.3 ? "#62f2ff" : "#ff5adf"
    }));

    // THEME 2: Circuit Grid & Microchip Traces (Services)
    const circuitTracks = Array.from({ length: 28 }, () => {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const len = Math.random() * 240 + 120;
      const isHorizontal = Math.random() > 0.5;
      return {
        x: startX,
        y: startY,
        length: len,
        isHorizontal,
        progress: Math.random(),
        speed: Math.random() * 0.008 + 0.003,
        color: Math.random() > 0.4 ? "#62f2ff" : "#ffd700"
      };
    });

    // THEME 3: Dimensional Wireframes & Viewport Grid (Work)
    const floatingBoxes = Array.from({ length: 12 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      w: Math.random() * 160 + 100,
      h: Math.random() * 100 + 60,
      vz: Math.random() * 0.4 + 0.2,
      z: Math.random() * 2 + 0.5,
      rot: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.004
    }));

    // THEME 4: Precision Orbital Pipeline (Process)
    const pipelineBeacons = Array.from({ length: 5 }, (_, i) => ({
      orbitRadius: 120 + i * 85,
      speed: 0.008 / (i + 1),
      angle: (i * Math.PI) / 2.5,
      dotCount: 8 + i * 4
    }));

    // THEME 5: Global Constellation Mesh (About)
    const meshPoints = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1
    }));

    // THEME 6: Transmission Waveforms (Contact)
    const waveCount = 5;

    // RENDER LOOP
    const render = () => {
      time += 0.016;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Dark background clear with motion trail
      ctx.fillStyle = "#03040b";
      ctx.fillRect(0, 0, width, height);

      // Subtle background radial glow responding to mouse
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        Math.max(width, height) * 0.65
      );
      gradient.addColorStop(0, "rgba(18, 28, 64, 0.45)");
      gradient.addColorStop(0.5, "rgba(8, 12, 28, 0.25)");
      gradient.addColorStop(1, "rgba(3, 4, 11, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.save();

      if (theme === "neural") {
        // Render Neural Nexus
        ctx.globalCompositeOperation = "lighter";

        // Draw connections
        for (let i = 0; i < neuralNodes.length; i++) {
          const a = neuralNodes[i];
          for (let j = i + 1; j < neuralNodes.length; j++) {
            const b = neuralNodes[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < 160) {
              const alpha = (1 - dist / 160) * 0.35;
              ctx.strokeStyle = `rgba(98, 242, 255, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();

              // Pulse particle traveling along connection
              if (Math.random() < 0.02) {
                const px = a.x + (b.x - a.x) * ((time * 2) % 1);
                const py = a.y + (b.y - a.y) * ((time * 2) % 1);
                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }

        // Draw and update nodes
        neuralNodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          node.pulse += 0.03;
          const currentRadius = node.radius + Math.sin(node.pulse) * 1.2;

          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();

          // Outer halo
          ctx.fillStyle = node.color === "#62f2ff" ? "rgba(98, 242, 255, 0.15)" : "rgba(255, 90, 223, 0.15)";
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius * 3, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (theme === "circuits") {
        // Render High-Speed Circuit Tracks
        ctx.globalCompositeOperation = "lighter";
        circuitTracks.forEach((tr) => {
          tr.progress = (tr.progress + tr.speed) % 1;
          const currentLen = tr.length * tr.progress;

          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(tr.x, tr.y);
          if (tr.isHorizontal) {
            ctx.lineTo(tr.x + tr.length, tr.y);
          } else {
            ctx.lineTo(tr.x, tr.y + tr.length);
          }
          ctx.stroke();

          // Racing pulse
          ctx.strokeStyle = tr.color;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          if (tr.isHorizontal) {
            ctx.moveTo(tr.x + currentLen, tr.y);
            ctx.lineTo(tr.x + currentLen + 24, tr.y);
          } else {
            ctx.moveTo(tr.x, tr.y + currentLen);
            ctx.lineTo(tr.x, tr.y + currentLen + 24);
          }
          ctx.stroke();
        });
      } else if (theme === "wireframes") {
        // Render Dimensional Viewports
        ctx.globalCompositeOperation = "screen";
        floatingBoxes.forEach((b) => {
          b.rot += b.rotSpeed;
          b.y -= b.vz;
          if (b.y < -150) b.y = height + 150;

          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate(b.rot);
          ctx.strokeStyle = "rgba(98, 242, 255, 0.22)";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(-b.w / 2, -b.h / 2, b.w, b.h);

          // Diagonal cross
          ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
          ctx.beginPath();
          ctx.moveTo(-b.w / 2, -b.h / 2);
          ctx.lineTo(b.w / 2, b.h / 2);
          ctx.stroke();
          ctx.restore();
        });
      } else if (theme === "pipeline") {
        // Render Orbital Radar Pipeline
        ctx.globalCompositeOperation = "lighter";
        const cx = width / 2;
        const cy = height / 2;

        pipelineBeacons.forEach((p) => {
          p.angle += p.speed;
          ctx.strokeStyle = "rgba(98, 242, 255, 0.12)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx, cy, p.orbitRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Orbital satellite
          const sx = cx + Math.cos(p.angle) * p.orbitRadius;
          const sy = cy + Math.sin(p.angle) * p.orbitRadius;
          ctx.fillStyle = "#62f2ff";
          ctx.beginPath();
          ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "rgba(98, 242, 255, 0.25)";
          ctx.beginPath();
          ctx.arc(sx, sy, 10, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (theme === "mesh") {
        // Render Global Constellation
        ctx.globalCompositeOperation = "lighter";
        for (let i = 0; i < meshPoints.length; i++) {
          const a = meshPoints[i];
          for (let j = i + 1; j < meshPoints.length; j++) {
            const b = meshPoints[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < 140) {
              ctx.strokeStyle = `rgba(143, 247, 255, ${(1 - dist / 140) * 0.25})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        meshPoints.forEach((pt) => {
          pt.x += pt.vx;
          pt.y += pt.vy;
          if (pt.x < 0 || pt.x > width) pt.vx *= -1;
          if (pt.y < 0 || pt.y > height) pt.vy *= -1;

          ctx.fillStyle = "#8ff7ff";
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (theme === "transmission") {
        // Render Contact Signal Waveforms
        ctx.globalCompositeOperation = "lighter";
        for (let w = 0; w < waveCount; w++) {
          const offset = w * 0.4;
          const amp = 30 + w * 12;
          const freq = 0.006 + w * 0.002;
          const alpha = 0.35 - w * 0.05;

          ctx.strokeStyle = `rgba(98, 242, 255, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();

          for (let x = 0; x < width; x += 10) {
            const y = height / 2 + Math.sin(x * freq + time * 1.8 + offset) * amp * Math.cos(time * 0.5 + x * 0.001);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme]);

  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.scanlineOverlay} />
      <div className={styles.vignetteOverlay} />
    </div>
  );
};

export default BespokeVideoCanvas;

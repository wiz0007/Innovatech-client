import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, X, Maximize, RotateCcw } from "lucide-react";
import styles from "./ShowreelModal.module.scss";

const SHOWREEL_VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4";

const ShowreelModal = ({ isOpen, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width);
    videoRef.current.currentTime = newProgress * (videoRef.current.duration || 1);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.showreelContainer}
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className={styles.modalHeader}>
            <div className={styles.reelBadge}>
              <span className={styles.liveDot} />
              <span>ROGUEAI // 2026 DIGITAL REEL</span>
            </div>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close Showreel">
              <X size={20} />
            </button>
          </div>

          {/* Video Frame */}
          <div className={styles.videoWrapper} onClick={togglePlay}>
            <video
              ref={videoRef}
              src={SHOWREEL_VIDEO_URL}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className={styles.videoPlayer}
            />

            <div className={styles.scanlineOverlay} />

            {/* Big center play icon if paused */}
            {!isPlaying && (
              <div className={styles.pausedOverlay}>
                <div className={styles.bigPlayBtn}>
                  <Play size={36} fill="#ffffff" />
                </div>
              </div>
            )}
          </div>

          {/* Progress & Controls Bar */}
          <div className={styles.controlsBar}>
            <div className={styles.progressBar} onClick={handleSeek}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles.buttonsRow}>
              <div className={styles.leftControls}>
                <button onClick={togglePlay} className={styles.ctrlBtn}>
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button onClick={toggleMute} className={styles.ctrlBtn}>
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <span className={styles.timeLabel}>4K ULTRA HD STREAM</span>
              </div>

              <div className={styles.rightControls}>
                <span className={styles.reelTag}>Audio Enabled</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShowreelModal;

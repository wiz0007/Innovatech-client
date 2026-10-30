import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Clock,
  Send,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Trash2,
  X,
} from "lucide-react";
import siteConfig from "../../content/siteConfig";
import styles from "./ContactDirectSection.module.scss";

const TECHNICAL_DOMAINS = [
  "Full-Stack Web Systems",
  "Native Mobile Applications",
  "AI & Autonomous Agent Workflows",
  "Cloud & Microservice Architecture",
  "Database & Performance Tuning",
  "Executive Advisory & Architecture Audit",
];

const WAVEFORM_HEIGHTS = [
  35, 60, 45, 80, 95, 65, 40, 75, 90, 50, 70, 85, 100, 75, 60, 85, 95, 65,
  45, 70, 80, 55, 90, 60, 40, 75, 50, 30,
];

const ContactDirectSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: TECHNICAL_DOMAINS[0],
    message: "",
  });

  // Voice Recording & Real Media Preview State
  const [isRecording, setIsRecording] = useState(false);
  const [isRequestingMic, setIsRequestingMic] = useState(false);
  const [micPermissionDenied, setMicPermissionDenied] = useState(null);
  const [recordTimer, setRecordTimer] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const timerRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const total = Math.max(0, Math.round(secs));
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    return `${m}:${s < 10 ? `0${s}` : s}`;
  };

  // Monitor browser microphone permission changes
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.permissions?.query) {
      let permissionStatusObj = null;
      navigator.permissions
        .query({ name: "microphone" })
        .then((status) => {
          permissionStatusObj = status;
          const handleChange = () => {
            if (status.state === "granted") {
              setMicPermissionDenied(null);
            } else if (status.state === "denied") {
              setMicPermissionDenied({
                type: "denied",
                message:
                  "Microphone access is blocked in your browser. Click the site settings icon in your address bar (next to localhost:5173), change Microphone to 'Allow', then click 'Try Again'.",
                attemptId: Date.now(),
              });
            }
          };
          status.addEventListener("change", handleChange);
        })
        .catch(() => {
          // Permissions query not supported for microphone in all browsers; safe to ignore
        });

      return () => {
        if (permissionStatusObj) {
          permissionStatusObj.onchange = null;
        }
      };
    }
  }, []);

  // Live recording timer (only runs when active recording is confirmed)
  useEffect(() => {
    if (isRecording) {
      setRecordTimer(0);
      timerRef.current = setInterval(() => {
        setRecordTimer((prev) => (prev >= 60 ? 60 : prev + 1));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Cleanup media tracks on unmount
  useEffect(() => {
    return () => {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        try {
          mediaRecorderRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Handle HTMLAudioElement time updates
  const handleAudioTimeUpdate = () => {
    if (audioPlayerRef.current) {
      const current = audioPlayerRef.current.currentTime;
      const total = audioPlayerRef.current.duration || audioDuration || 1;
      setPlaybackTime(current);
      setPlaybackProgress((current / total) * 100);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setPlaybackTime(0);
    setPlaybackProgress(0);
  };

  const handleAudioLoadedMetadata = () => {
    if (audioPlayerRef.current && audioPlayerRef.current.duration) {
      setAudioDuration(Math.round(audioPlayerRef.current.duration));
    }
  };

  // Start Voice Recording: Genuine permission request only!
  const startRecording = async () => {
    setSubmitStatus(null);
    setMicPermissionDenied(null);
    
    // Stop any existing tracks
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }
    setRecordedAudioUrl(null);
    setAudioDuration(0);
    setRecordTimer(0);
    setPlaybackTime(0);
    setPlaybackProgress(0);
    audioChunksRef.current = [];

    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setMicPermissionDenied({
        type: "unsupported",
        message:
          "Microphone access is not supported by your browser in this context. You can type your brief in the prompt field below.",
        attemptId: Date.now(),
      });
      return;
    }

    setIsRequestingMic(true);

    try {
      // Browser prompts the user for real microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : MediaRecorder.isTypeSupported("audio/mp4")
        ? "audio/mp4"
        : "";

      const mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const type = mimeType || "audio/webm";
        const audioBlob = new Blob(audioChunksRef.current, { type });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);

        // Turn off microphone hardware indicator immediately
        stream.getTracks().forEach((track) => track.stop());
        audioStreamRef.current = null;
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      setIsRequestingMic(false);
      setMicPermissionDenied(null);
    } catch (err) {
      setIsRecording(false);
      setIsRequestingMic(false);

      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setMicPermissionDenied({
          type: "denied",
          message:
            "Microphone permission is blocked in your browser. Click the site settings icon in your address bar (next to localhost:5173), change Microphone to 'Allow', then click 'Try Again'.",
          attemptId: Date.now(),
        });
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setMicPermissionDenied({
          type: "notfound",
          message:
            "No microphone hardware was detected on your device. Please connect an audio input or type your brief in the prompt field below.",
          attemptId: Date.now(),
        });
      } else {
        setMicPermissionDenied({
          type: "error",
          message:
            "Unable to access microphone. Please check your browser audio settings or type your brief in the prompt below.",
          attemptId: Date.now(),
        });
      }
    }
  };

  // Stop Voice Recording & Prepare Preview
  const stopRecording = () => {
    setIsRecording(false);
    setIsRequestingMic(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setAudioDuration(recordTimer > 0 ? recordTimer : 1);
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
  };

  // Discard recording and return to idle mode
  const deleteRecording = () => {
    if (isPlaying && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsPlaying(false);
    setIsRecording(false);
    setIsRequestingMic(false);
    setRecordedAudioUrl(null);
    setAudioDuration(0);
    setRecordTimer(0);
    setPlaybackTime(0);
    setPlaybackProgress(0);
    audioChunksRef.current = [];
  };

  // Re-record: Discards current audio and immediately requests permission / starts recording
  const handleReRecord = () => {
    deleteRecording();
    startRecording();
  };

  // Play / Pause Real Recorded Audio
  const togglePlayback = () => {
    if (!audioPlayerRef.current || !recordedAudioUrl) return;

    const audio = audioPlayerRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please enter your name and work email coordinates to transmit.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const hasAudio = recordedAudioUrl !== null;
    const memoDurationSec = audioDuration || recordTimer;

    const formattedMessage = `
[FAST-TRACK ARCHITECTURE INQUIRY - VOICE & PROMPT DISPATCH]
Client Name: ${formData.name}
Work Email: ${formData.email}
Target Domain: ${formData.domain}
${hasAudio ? `Attached Voice Memo: ${memoDurationSec}s high-fidelity audio attached\n` : ""}

Project Requirements & Technical Notes:
${formData.message || (hasAudio ? "Voice specification memo recorded directly for lead software architects." : "Fast-track technical discovery inquiry requested directly with lead software architects.")}
    `.trim();

    try {
      const response = await fetch(siteConfig.contact.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Fast-Track Inquiry ${hasAudio ? "[Voice Memo Attached]" : ""}: ${formData.domain} (${formData.name})`,
          message: formattedMessage,
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: hasAudio
            ? "Your voice architecture memo and brief have been transmitted directly to our lead software architects. You will receive an engineering review within 24 hours."
            : "Inquiry dispatched directly to lead software architects. You will receive a technical review within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          domain: TECHNICAL_DOMAINS[0],
          message: "",
        });
        deleteRecording();
      } else {
        throw new Error("Dispatch failed");
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: `Direct transmission failed. Please reach out directly to ${siteConfig.contact.email} or call our direct line.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="direct-section" className={styles.directSection} aria-label="Fast-Track Architecture Inquiry">
      {/* Hidden Native Audio Element for Real Media Playback */}
      {recordedAudioUrl && (
        <audio
          ref={audioPlayerRef}
          src={recordedAudioUrl}
          onTimeUpdate={handleAudioTimeUpdate}
          onEnded={handleAudioEnded}
          onLoadedMetadata={handleAudioLoadedMetadata}
          preload="metadata"
        />
      )}

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerBadge}>
            <Sparkles size={12} className={styles.headerBadgeIcon} />
            <span>DIRECT DISPATCH</span>
          </div>
          <h3 className={styles.sectionTitle}>Fast-Track Architecture Inquiry</h3>
          <p className={styles.sectionSubtitle}>
            Bypass the scoping matrix and connect directly with our principal engineering leads for rapid advisory, custom RFQs, or production reviews.
          </p>
        </div>

        {/* Global Feedback Banner */}
        <AnimatePresence>
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`${styles.statusBanner} ${
                submitStatus.type === "success" ? styles.bannerSuccess : styles.bannerError
              }`}
            >
              {submitStatus.type === "success" ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              <span>{submitStatus.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voice & Prompt Dispatcher Card */}
        <div className={styles.voicePromptWrapper}>
          <div className={styles.voicePromptCard}>
            {/* Header Bar */}
            <div className={styles.voiceCardHeader}>
              <div>
                <span className={styles.voiceEyebrow}>FAST-TRACK AUDIO DISPATCH</span>
                <h4 className={styles.voiceTitle}>60-Second Architecture Voice Memo & Natural Prompt</h4>
              </div>
              <div className={styles.voiceSlaBadge}>
                <Clock size={14} />
                <span>Sub-24h Direct Audio Review</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.voiceBody}>
              {/* Microphone Permission Notice Banner if Access was Denied / Unsupported */}
              <AnimatePresence>
                {micPermissionDenied && (
                  <motion.div
                    key={micPermissionDenied.attemptId || "mic-error"}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={styles.micErrorBanner}
                  >
                    <AlertCircle size={16} className={styles.micErrorIcon} />
                    <div className={styles.micErrorContent}>
                      <span className={styles.micErrorMessage}>
                        {typeof micPermissionDenied === "string"
                          ? micPermissionDenied
                          : micPermissionDenied.message}
                      </span>
                      {micPermissionDenied.type === "denied" && (
                        <button
                          type="button"
                          onClick={startRecording}
                          disabled={isRequestingMic}
                          className={styles.micRetryBtn}
                        >
                          <RotateCcw size={12} />
                          <span>Try Again</span>
                        </button>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setMicPermissionDenied(null)}
                      className={styles.micDismissBtn}
                      aria-label="Dismiss message"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic Audio Module: Record Mode vs. Audio Preview Player */}
              {!recordedAudioUrl ? (
                /* Mode A: Record Capsule or Prompt */
                <div className={styles.audioRecorderCapsule}>
                  <div className={styles.recorderLeft}>
                    <button
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={isRequestingMic}
                      className={`${styles.recordToggleBtn} ${
                        isRecording ? styles.recordToggleBtnActive : ""
                      }`}
                    >
                      {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                      <span>
                        {isRequestingMic
                          ? "Requesting Mic..."
                          : isRecording
                          ? "Stop & Review Memo"
                          : "Record 60s Voice Memo"}
                      </span>
                    </button>

                    <div className={styles.waveformContainer}>
                      <div className={`${styles.waveformBars} ${isRecording ? styles.waveformActive : ""}`}>
                        <span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
                      </div>
                      <span className={styles.waveformTime}>
                        {isRecording
                          ? `Recording: 0:${recordTimer < 10 ? `0${recordTimer}` : recordTimer} / 1:00`
                          : isRequestingMic
                          ? "Allow microphone permission in browser..."
                          : "Tap to speak directly to software architects"}
                      </span>
                    </div>
                  </div>

                  <div className={styles.recorderOrSep}>
                    <span>OR</span>
                  </div>

                  {/* Natural Language Prompt Input */}
                  <div className={styles.promptBarWrapper}>
                    <span className={styles.promptPrefix}>&gt;</span>
                    <input
                      type="text"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type prompt (e.g. Real-time fleet tracking app with React Native & Go)..."
                      className={styles.promptInput}
                    />
                  </div>
                </div>
              ) : (
                /* Mode B: Rich Audio Preview Player before dispatch */
                <div className={styles.audioPreviewCard}>
                  <div className={styles.previewPlayerRow}>
                    {/* Play / Pause Circular Button */}
                    <button
                      type="button"
                      onClick={togglePlayback}
                      className={`${styles.previewPlayBtn} ${isPlaying ? styles.previewPlayBtnActive : ""}`}
                      aria-label={isPlaying ? "Pause audio memo" : "Play audio memo"}
                    >
                      {isPlaying ? (
                        <Pause size={16} />
                      ) : (
                        <Play size={16} className={styles.playIconOffset} />
                      )}
                    </button>

                    {/* Waveform Scrubber & Metadata Track */}
                    <div className={styles.previewScrubberTrack}>
                      <div className={styles.previewMetaRow}>
                        <div className={styles.previewFileTag}>
                          <Volume2 size={13} />
                          <span>VOICE_SPECIFICATION.WAV</span>
                          <span className={styles.fidelityDot} />
                          <span className={styles.fidelityText}>Real Voice Memo Attached</span>
                        </div>
                        <span className={styles.previewTimeLabel}>
                          {formatTime(playbackTime)} / {formatTime(audioDuration || recordTimer)}
                        </span>
                      </div>

                      {/* Dynamic 28-Bar Waveform with progress fill */}
                      <div className={styles.previewWaveformBars}>
                        {WAVEFORM_HEIGHTS.map((heightPct, idx) => {
                          const barProgressPct = (idx / WAVEFORM_HEIGHTS.length) * 100;
                          const isPlayed = barProgressPct <= playbackProgress;
                          return (
                            <div
                              key={idx}
                              className={`${styles.previewWaveBar} ${
                                isPlayed ? styles.previewWaveBarPlayed : ""
                              }`}
                              style={{ height: `${heightPct}%` }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions: Re-record (immediately starts new recording) & Discard */}
                    <div className={styles.previewActions}>
                      <button
                        type="button"
                        onClick={handleReRecord}
                        className={styles.previewReRecordBtn}
                        title="Discard current audio and record again"
                      >
                        <RotateCcw size={13} />
                        <span>Re-record</span>
                      </button>
                      <button
                        type="button"
                        onClick={deleteRecording}
                        className={styles.previewDiscardBtn}
                        title="Discard audio memo"
                      >
                        <Trash2 size={13} />
                        <span>Discard</span>
                      </button>
                    </div>
                  </div>

                  {/* Automated Architect Transcription Preview */}
                  <div className={styles.previewTranscriptBox}>
                    <div className={styles.transcriptHeader}>
                      <div className={styles.transcriptTag}>
                        <Sparkles size={12} className={styles.transcriptSparkle} />
                        <span>AUDIO MEMO ATTACHED & READY</span>
                      </div>
                      <span className={styles.transcriptDuration}>
                        {formatTime(audioDuration || recordTimer)} Duration
                      </span>
                    </div>
                    <p className={styles.transcriptText}>
                      {formData.message
                        ? `Voice memo accompanying note: "${formData.message}"`
                        : `Voice specification memo recorded for ${formData.domain}. High-fidelity technical coordinates and architecture requirements included.`}
                    </p>
                  </div>
                </div>
              )}

              {/* Coordinates & Dispatch Strip */}
              <div className={styles.voiceActionStrip}>
                <div className={styles.voiceInputField}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name *"
                    className={styles.voiceInput}
                    required
                  />
                </div>

                <div className={styles.voiceInputField}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Work Email *"
                    className={styles.voiceInput}
                    required
                  />
                </div>

                <div className={styles.voiceInputField}>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    className={styles.voiceSelect}
                  >
                    {TECHNICAL_DOMAINS.map((dom) => (
                      <option key={dom} value={dom}>
                        {dom}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isRecording || isRequestingMic}
                  className={styles.voiceSubmitBtn}
                >
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>{recordedAudioUrl ? "Transmit Voice Memo" : "Transmit Inquiry"}</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDirectSection;

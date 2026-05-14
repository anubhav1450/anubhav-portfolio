import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Props {
  onDone: () => void;
}

export default function LoadingScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"loading" | "flash" | "exit">("loading");
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const duration = 3500;
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setStage("flash"), 300);
        setTimeout(() => setStage("exit"), 1800);
        setTimeout(() => onDoneRef.current(), 2300);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const pct = Math.round(progress * 100);

  if (stage === "exit") return null;

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 64,
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: stage === "flash" ? 0.25 : 1,
          transition: "opacity 0.6s ease",
        }}
      >
        <source
          src="/assets/grok-019d1c28-0c90-73fa-8aa9-e1f0304da731.mp4"
          type="video/mp4"
        />
      </video>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <AnimatePresence>
        {stage === "flash" && (
          <motion.div
            key="flash"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1.1, 1.05, 1] }}
            transition={{ duration: 1.5, times: [0, 0.15, 0.7, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <p
              style={{
                fontSize: "clamp(48px, 8vw, 96px)",
                fontWeight: 900,
                fontFamily: "'Bricolage Grotesque', sans-serif",
                background:
                  "linear-gradient(135deg, #fff 0%, oklch(0.85 0.25 60) 40%, oklch(0.7 0.22 280) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter:
                  "drop-shadow(0 0 60px rgba(255,200,80,0.9)) drop-shadow(0 0 120px oklch(0.65 0.22 280 / 0.7))",
                letterSpacing: "0.05em",
                textAlign: "center",
              }}
            >
              BIG BANG
            </p>
            <p
              style={{
                fontSize: "clamp(12px, 2vw, 18px)",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.35em",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              UNIVERSE INITIALIZED
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "loading" && (
          <motion.div
            key="progress-ui"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              width: "min(420px, 85vw)",
            }}
          >
            <p
              style={{
                fontSize: "clamp(13px, 2.5vw, 17px)",
                color: "oklch(0.78 0.1 265)",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.12em",
                textAlign: "center",
              }}
            >
              {pct < 40
                ? "Initiating Quantum Collapse..."
                : pct < 80
                  ? "Coordinates Locked: Digital Universe"
                  : "Entering the Digital Universe..."}
            </p>

            <div
              style={{
                width: "100%",
                height: 4,
                background: "rgba(100,60,200,0.25)",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 99,
                  background:
                    "linear-gradient(90deg, oklch(0.65 0.22 280), oklch(0.78 0.2 200), oklch(0.75 0.25 60))",
                  boxShadow:
                    "0 0 16px oklch(0.65 0.22 280 / 0.8), 0 0 32px oklch(0.65 0.22 280 / 0.4)",
                  width: `${pct}%`,
                  transition: "width 0.1s linear",
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span
                style={{
                  fontSize: "clamp(32px, 6vw, 52px)",
                  fontWeight: 800,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  background:
                    "linear-gradient(90deg, oklch(0.75 0.2 200), oklch(0.65 0.22 280))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 20px oklch(0.65 0.22 280 / 0.6))",
                  lineHeight: 1,
                }}
              >
                {pct}
              </span>
              <span
                style={{
                  fontSize: "clamp(14px, 2vw, 20px)",
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "oklch(0.6 0.1 265)",
                }}
              >
                %
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

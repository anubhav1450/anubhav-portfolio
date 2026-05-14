import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  age: number;
}

const TRAIL_LENGTH = 24;

export default function CursorComet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      activeRef.current = true;
    };
    const onLeave = () => {
      activeRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    let frameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeRef.current && mouseRef.current) {
        const { x, y } = mouseRef.current;
        // Push new head particle
        trailRef.current.unshift({ x, y, age: 0 });
        if (trailRef.current.length > TRAIL_LENGTH) {
          trailRef.current.length = TRAIL_LENGTH;
        }
      } else {
        // Age out particles
        trailRef.current = trailRef.current.filter((p) => p.age < TRAIL_LENGTH);
      }

      // Age all
      for (const p of trailRef.current) p.age++;

      // Draw trail
      for (let i = 0; i < trailRef.current.length; i++) {
        const p = trailRef.current[i];
        const ratio = 1 - i / TRAIL_LENGTH;
        const radius = 1 + ratio * 2;
        const alpha = ratio * ratio;

        ctx.save();
        if (i === 0) {
          ctx.shadowBlur = 16;
          ctx.shadowColor = "#00d4ff";
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${i < 4 ? "0,212,255" : "100,200,255"},${alpha.toFixed(3)})`;
        ctx.fill();
        ctx.restore();
      }

      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
      }}
    />
  );
}

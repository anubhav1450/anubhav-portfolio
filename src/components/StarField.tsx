import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  phase: number;
  speed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  timer: number;
  interval: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create stars
    const stars: Star[] = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.4 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.005,
    }));

    // Create shooting stars
    const shooters: ShootingStar[] = Array.from({ length: 5 }, (_, idx) => ({
      x: 0,
      y: 0,
      length: Math.random() * 120 + 60,
      speed: Math.random() * 8 + 6,
      angle: Math.PI / 6,
      opacity: 0,
      active: false,
      timer: 0,
      interval: 90 + idx * 80,
    }));

    const spawnShooter = (s: ShootingStar) => {
      s.x = Math.random() * window.innerWidth * 0.7;
      s.y = Math.random() * window.innerHeight * 0.4;
      s.length = Math.random() * 120 + 60;
      s.speed = Math.random() * 8 + 6;
      s.opacity = 1;
      s.active = true;
    };

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw twinkling stars
      for (const star of stars) {
        const alpha =
          0.4 + 0.6 * Math.abs(Math.sin(star.phase + frame * star.speed));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
        ctx.fill();
      }

      // Draw & advance shooting stars
      for (const s of shooters) {
        s.timer++;
        if (!s.active && s.timer >= s.interval) {
          s.timer = 0;
          spawnShooter(s);
        }
        if (s.active) {
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.angle);
          const grad = ctx.createLinearGradient(-s.length, 0, 0, 0);
          grad.addColorStop(0, "rgba(200, 230, 255, 0)");
          grad.addColorStop(1, `rgba(200, 230, 255, ${s.opacity})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-s.length, 0);
          ctx.lineTo(0, 0);
          ctx.stroke();
          ctx.restore();

          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;
          s.opacity -= 0.018;
          if (s.opacity <= 0 || s.x > canvas.width || s.y > canvas.height) {
            s.active = false;
            s.timer = 0;
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

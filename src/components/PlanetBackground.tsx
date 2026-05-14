import { useEffect, useRef } from "react";

interface PlanetConfig {
  x: number;
  y: number;
  radius: number;
  colorInner: string;
  colorOuter: string;
  glowColor: string;
  hasRing: boolean;
  ringColor: string;
  ringAngle: number;
  ringAngleSpeed: number;
  bobOffset: number;
  bobSpeed: number;
  bobAmount: number;
  driftX: number;
  driftY: number;
  currentGlow: number;
  currentAlpha: number;
}

interface AsteroidConfig {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
}

interface OrbitalArc {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  color: string;
  angle: number;
}

function makePlanet(
  base: Omit<PlanetConfig, "currentGlow" | "currentAlpha">,
): PlanetConfig {
  return { ...base, currentGlow: 0, currentAlpha: 0.4 };
}

function buildProjectsScene(w: number, h: number) {
  const planets: PlanetConfig[] = [
    makePlanet({
      x: w * 0.07,
      y: h * 0.22,
      radius: 64,
      colorInner: "#e87a20",
      colorOuter: "#8b2a05",
      glowColor: "rgba(232,122,32,0.65)",
      hasRing: true,
      ringColor: "rgba(218,160,80,0.5)",
      ringAngle: 0.35,
      ringAngleSpeed: 0.0003,
      bobOffset: 0,
      bobSpeed: 0.0006,
      bobAmount: 7,
      driftX: 0,
      driftY: 0,
    }),
    makePlanet({
      x: w * 0.9,
      y: h * 0.65,
      radius: 48,
      colorInner: "#c44a15",
      colorOuter: "#5a1508",
      glowColor: "rgba(196,74,21,0.6)",
      hasRing: false,
      ringColor: "",
      ringAngle: 0,
      ringAngleSpeed: 0,
      bobOffset: 1.5,
      bobSpeed: 0.0008,
      bobAmount: 5,
      driftX: 0,
      driftY: 0,
    }),
    makePlanet({
      x: w * 0.82,
      y: h * 0.12,
      radius: 30,
      colorInner: "#d4a034",
      colorOuter: "#7a4a10",
      glowColor: "rgba(212,160,52,0.55)",
      hasRing: true,
      ringColor: "rgba(212,180,90,0.4)",
      ringAngle: 0.2,
      ringAngleSpeed: 0.0005,
      bobOffset: 3,
      bobSpeed: 0.001,
      bobAmount: 4,
      driftX: 0,
      driftY: 0,
    }),
    makePlanet({
      x: w * 0.5,
      y: h * 0.88,
      radius: 20,
      colorInner: "#aaa090",
      colorOuter: "#4a4038",
      glowColor: "rgba(180,160,130,0.5)",
      hasRing: false,
      ringColor: "",
      ringAngle: 0,
      ringAngleSpeed: 0,
      bobOffset: 2,
      bobSpeed: 0.0012,
      bobAmount: 3,
      driftX: 0,
      driftY: 0,
    }),
  ];
  const asteroids: AsteroidConfig[] = Array.from({ length: 6 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: 3 + Math.random() * 5,
    color: `rgba(${160 + Math.floor(Math.random() * 60)},${130 + Math.floor(Math.random() * 50)},${80 + Math.floor(Math.random() * 40)},0.45)`,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.18,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.008,
  }));
  return { planets, asteroids, orbitals: [] as OrbitalArc[] };
}

function buildContactScene(w: number, h: number) {
  const planets: PlanetConfig[] = [
    makePlanet({
      x: w * 0.88,
      y: h * 0.18,
      radius: 58,
      colorInner: "#2a7fc4",
      colorOuter: "#0a2a5c",
      glowColor: "rgba(42,127,196,0.65)",
      hasRing: true,
      ringColor: "rgba(80,180,220,0.45)",
      ringAngle: 0.28,
      ringAngleSpeed: 0.0004,
      bobOffset: 0,
      bobSpeed: 0.0007,
      bobAmount: 6,
      driftX: 0,
      driftY: 0,
    }),
    makePlanet({
      x: w * 0.08,
      y: h * 0.7,
      radius: 44,
      colorInner: "#5a2abc",
      colorOuter: "#1a0a40",
      glowColor: "rgba(90,42,188,0.6)",
      hasRing: false,
      ringColor: "",
      ringAngle: 0,
      ringAngleSpeed: 0,
      bobOffset: 2,
      bobSpeed: 0.0009,
      bobAmount: 5,
      driftX: 0,
      driftY: 0,
    }),
    makePlanet({
      x: w * 0.15,
      y: h * 0.1,
      radius: 26,
      colorInner: "#20c4c0",
      colorOuter: "#085a58",
      glowColor: "rgba(32,196,192,0.55)",
      hasRing: true,
      ringColor: "rgba(40,220,210,0.35)",
      ringAngle: 0.4,
      ringAngleSpeed: 0.0006,
      bobOffset: 1,
      bobSpeed: 0.0011,
      bobAmount: 4,
      driftX: 0,
      driftY: 0,
    }),
    makePlanet({
      x: w * 0.96,
      y: h * 0.88,
      radius: 14,
      colorInner: "#ffffff",
      colorOuter: "#a0c8ff",
      glowColor: "rgba(180,210,255,0.8)",
      hasRing: false,
      ringColor: "",
      ringAngle: 0,
      ringAngleSpeed: 0,
      bobOffset: 0.5,
      bobSpeed: 0.0015,
      bobAmount: 2,
      driftX: 0,
      driftY: 0,
    }),
  ];
  const asteroids: AsteroidConfig[] = Array.from({ length: 5 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: 2 + Math.random() * 4,
    color: `rgba(${80 + Math.floor(Math.random() * 60)},${100 + Math.floor(Math.random() * 60)},${160 + Math.floor(Math.random() * 60)},0.4)`,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.15,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.006,
  }));
  const orbitals: OrbitalArc[] = [
    {
      cx: w * 0.88,
      cy: h * 0.18,
      rx: 110,
      ry: 30,
      color: "rgba(80,160,220,0.08)",
      angle: 0.28,
    },
    {
      cx: w * 0.08,
      cy: h * 0.7,
      rx: 90,
      ry: 25,
      color: "rgba(120,80,220,0.06)",
      angle: 0.5,
    },
  ];
  return { planets, asteroids, orbitals };
}

function buildHeroScene(w: number, h: number) {
  const planets: PlanetConfig[] = [
    makePlanet({
      x: w * 0.92,
      y: h * 0.15,
      radius: 80,
      colorInner: "#7c3aed",
      colorOuter: "#1e1040",
      glowColor: "rgba(124,58,237,0.7)",
      hasRing: true,
      ringColor: "rgba(160,100,255,0.5)",
      ringAngle: 0.3,
      ringAngleSpeed: 0.0002,
      bobOffset: 0,
      bobSpeed: 0.0005,
      bobAmount: 8,
      driftX: 0,
      driftY: 0,
    }),
    makePlanet({
      x: w * 0.05,
      y: h * 0.8,
      radius: 50,
      colorInner: "#0dc4b0",
      colorOuter: "#054040",
      glowColor: "rgba(13,196,176,0.65)",
      hasRing: false,
      ringColor: "",
      ringAngle: 0,
      ringAngleSpeed: 0,
      bobOffset: 2,
      bobSpeed: 0.0007,
      bobAmount: 6,
      driftX: 0,
      driftY: 0,
    }),
    makePlanet({
      x: w * 0.85,
      y: h * 0.88,
      radius: 22,
      colorInner: "#c0c8d8",
      colorOuter: "#404858",
      glowColor: "rgba(180,190,210,0.55)",
      hasRing: true,
      ringColor: "rgba(200,210,230,0.4)",
      ringAngle: 0.5,
      ringAngleSpeed: 0.0007,
      bobOffset: 1.2,
      bobSpeed: 0.0012,
      bobAmount: 3,
      driftX: 0,
      driftY: 0,
    }),
  ];
  const asteroids: AsteroidConfig[] = Array.from({ length: 8 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: 2 + Math.random() * 4,
    color: `rgba(${120 + Math.floor(Math.random() * 80)},${80 + Math.floor(Math.random() * 80)},${160 + Math.floor(Math.random() * 60)},0.4)`,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.15,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.007,
  }));
  const orbitals: OrbitalArc[] = [
    {
      cx: w * 0.92,
      cy: h * 0.15,
      rx: 140,
      ry: 35,
      color: "rgba(124,58,237,0.08)",
      angle: 0.3,
    },
    {
      cx: w * 0.92,
      cy: h * 0.15,
      rx: 200,
      ry: 50,
      color: "rgba(124,58,237,0.05)",
      angle: 0.25,
    },
  ];
  return { planets, asteroids, orbitals };
}

function buildAboutScene(w: number, h: number) {
  const planets: PlanetConfig[] = [
    makePlanet({
      x: w * 0.08,
      y: h * 0.2,
      radius: 55,
      colorInner: "#3b5bdb",
      colorOuter: "#0e1a50",
      glowColor: "rgba(59,91,219,0.6)",
      hasRing: true,
      ringColor: "rgba(100,140,255,0.35)",
      ringAngle: 0.45,
      ringAngleSpeed: 0.0004,
      bobOffset: 0,
      bobSpeed: 0.0006,
      bobAmount: 7,
      driftX: 0,
      driftY: 0,
    }),
    makePlanet({
      x: w * 0.92,
      y: h * 0.12,
      radius: 18,
      colorInner: "#fffde8",
      colorOuter: "#ffd84d",
      glowColor: "rgba(255,240,100,0.85)",
      hasRing: false,
      ringColor: "",
      ringAngle: 0,
      ringAngleSpeed: 0,
      bobOffset: 0.5,
      bobSpeed: 0.0014,
      bobAmount: 3,
      driftX: 0,
      driftY: 0,
    }),
    makePlanet({
      x: w * 0.88,
      y: h * 0.78,
      radius: 35,
      colorInner: "#c0402a",
      colorOuter: "#4a1808",
      glowColor: "rgba(192,64,42,0.6)",
      hasRing: false,
      ringColor: "",
      ringAngle: 0,
      ringAngleSpeed: 0,
      bobOffset: 1.8,
      bobSpeed: 0.0009,
      bobAmount: 5,
      driftX: 0,
      driftY: 0,
    }),
  ];
  const asteroids: AsteroidConfig[] = Array.from({ length: 4 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: 2 + Math.random() * 3.5,
    color: `rgba(${100 + Math.floor(Math.random() * 80)},${100 + Math.floor(Math.random() * 80)},${180 + Math.floor(Math.random() * 60)},0.35)`,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.14,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.006,
  }));
  return { planets, asteroids, orbitals: [] as OrbitalArc[] };
}

function buildSkillsScene(w: number, h: number) {
  const planets: PlanetConfig[] = [
    makePlanet({
      x: w * 0.94,
      y: h * 0.1,
      radius: 30,
      colorInner: "#22c55e",
      colorOuter: "#064020",
      glowColor: "rgba(34,197,94,0.6)",
      hasRing: true,
      ringColor: "rgba(60,220,100,0.38)",
      ringAngle: 0.3,
      ringAngleSpeed: 0.0006,
      bobOffset: 0,
      bobSpeed: 0.0008,
      bobAmount: 4,
      driftX: 0,
      driftY: 0,
    }),
    makePlanet({
      x: w * 0.04,
      y: h * 0.08,
      radius: 12,
      colorInner: "#ffffff",
      colorOuter: "#e0eeff",
      glowColor: "rgba(220,240,255,0.85)",
      hasRing: false,
      ringColor: "",
      ringAngle: 0,
      ringAngleSpeed: 0,
      bobOffset: 1,
      bobSpeed: 0.0016,
      bobAmount: 2,
      driftX: 0,
      driftY: 0,
    }),
    makePlanet({
      x: w * 0.03,
      y: h * 0.85,
      radius: 40,
      colorInner: "#f97316",
      colorOuter: "#7c2d12",
      glowColor: "rgba(249,115,22,0.6)",
      hasRing: false,
      ringColor: "",
      ringAngle: 0,
      ringAngleSpeed: 0,
      bobOffset: 2.5,
      bobSpeed: 0.0007,
      bobAmount: 5,
      driftX: 0,
      driftY: 0,
    }),
  ];
  const asteroids: AsteroidConfig[] = Array.from({ length: 5 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: 2 + Math.random() * 3,
    color: `rgba(${100 + Math.floor(Math.random() * 80)},${140 + Math.floor(Math.random() * 60)},${100 + Math.floor(Math.random() * 80)},0.3)`,
    vx: (Math.random() - 0.5) * 0.16,
    vy: (Math.random() - 0.5) * 0.12,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.005,
  }));
  return { planets, asteroids, orbitals: [] as OrbitalArc[] };
}

function drawPlanet(
  ctx: CanvasRenderingContext2D,
  p: PlanetConfig,
  t: number,
  yOffset: number,
) {
  const cx = p.x;
  const cy = p.y + yOffset;

  ctx.save();
  ctx.globalAlpha = p.currentAlpha;
  ctx.shadowBlur = p.currentGlow;
  ctx.shadowColor = p.glowColor;

  const grad = ctx.createRadialGradient(
    cx - p.radius * 0.3,
    cy - p.radius * 0.3,
    p.radius * 0.1,
    cx,
    cy,
    p.radius,
  );
  grad.addColorStop(0, p.colorInner);
  grad.addColorStop(1, p.colorOuter);

  ctx.beginPath();
  ctx.arc(cx, cy, p.radius, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();

  if (p.hasRing) {
    const ringAngle = p.ringAngle + t * p.ringAngleSpeed;
    ctx.save();
    ctx.globalAlpha = p.currentAlpha;
    ctx.translate(cx, cy);
    ctx.rotate(ringAngle);
    ctx.scale(1, 0.3);
    ctx.beginPath();
    ctx.ellipse(0, 0, p.radius * 1.9, p.radius * 1.9, 0, 0, Math.PI * 2);
    ctx.strokeStyle = p.ringColor;
    ctx.lineWidth = p.radius * 0.28;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 0, p.radius * 1.05, p.radius * 1.05, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,0,0,0.55)";
    ctx.lineWidth = p.radius * 0.12;
    ctx.stroke();
    ctx.restore();
  }
}

function drawAsteroid(ctx: CanvasRenderingContext2D, a: AsteroidConfig) {
  ctx.save();
  ctx.translate(a.x, a.y);
  ctx.rotate(a.rotation);
  ctx.beginPath();
  ctx.ellipse(0, 0, a.size, a.size * 0.65, 0, 0, Math.PI * 2);
  ctx.fillStyle = a.color;
  ctx.fill();
  ctx.restore();
}

function drawOrbitalArc(ctx: CanvasRenderingContext2D, o: OrbitalArc) {
  ctx.save();
  ctx.translate(o.cx, o.cy);
  ctx.rotate(o.angle);
  ctx.beginPath();
  ctx.ellipse(0, 0, o.rx, o.ry, 0, 0, Math.PI * 2);
  ctx.strokeStyle = o.color;
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 10]);
  ctx.stroke();
  ctx.restore();
}

interface Props {
  variant: "projects" | "contact" | "hero" | "about" | "skills";
}

export default function PlanetBackground({ variant }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    let t = 0;

    const mousePos = { x: -9999, y: -9999 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const buildScene = (w: number, h: number) => {
      switch (variant) {
        case "projects":
          return buildProjectsScene(w, h);
        case "contact":
          return buildContactScene(w, h);
        case "hero":
          return buildHeroScene(w, h);
        case "about":
          return buildAboutScene(w, h);
        case "skills":
          return buildSkillsScene(w, h);
      }
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    let scene = buildScene(canvas.width, canvas.height);

    const handleResize = () => {
      resize();
      scene = buildScene(canvas.width, canvas.height);
    };
    window.addEventListener("resize", handleResize);

    const w = () => canvas.width;
    const h = () => canvas.height;

    const LERP = 0.08;
    const HOVER_DIST = 150;

    const animate = () => {
      t++;
      ctx.clearRect(0, 0, w(), h());

      for (const o of scene.orbitals) {
        drawOrbitalArc(ctx, o);
      }

      for (const p of scene.planets) {
        const yOffset = Math.sin(t * p.bobSpeed + p.bobOffset) * p.bobAmount;
        const dist = Math.hypot(mousePos.x - p.x, mousePos.y - (p.y + yOffset));
        const hovered = dist < HOVER_DIST;

        const targetGlow = hovered ? p.radius * 1.8 : 0;
        const targetAlpha = hovered ? 1.0 : 0.4;

        p.currentGlow += (targetGlow - p.currentGlow) * LERP;
        p.currentAlpha += (targetAlpha - p.currentAlpha) * LERP;

        drawPlanet(ctx, p, t, yOffset);
      }

      for (const a of scene.asteroids) {
        a.x += a.vx;
        a.y += a.vy;
        a.rotation += a.rotSpeed;
        if (a.x < -20) a.x = w() + 20;
        if (a.x > w() + 20) a.x = -20;
        if (a.y < -20) a.y = h() + 20;
        if (a.y > h() + 20) a.y = -20;
        drawAsteroid(ctx, a);
      }

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 1,
      }}
    />
  );
}

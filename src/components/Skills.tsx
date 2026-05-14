import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PlanetBackground from "./PlanetBackground";
import { techIconMap } from "./techIconMap";

const skillCategories = [
  {
    title: "Programming Languages",
    emoji: "⌨️",
    items: ["Java", "JavaScript", "Python", "SQL"],
  },
  {
    title: "Backend",
    emoji: "⚙️",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "REST APIs",
      "JWT/RBAC",
    ],
  },
  {
    title: "Frontend",
    emoji: "🖥️",
    items: ["HTML", "CSS", "Tailwind CSS", "Bootstrap", "React.js", "Vite"],
  },
  {
    title: "Databases & DevOps",
    emoji: "🛠️",
    items: ["Docker", "Git/GitHub", "Postman", "AWS"],
  },
];

const emojiMap: Record<string, string> = {
  Algorithms: "📐",
  "Data Structures": "🌳",
  "System Design": "🏗️",
};

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  totalQuestions: number;
}

const FALLBACK: LeetCodeStats = {
  totalSolved: 474,
  easySolved: 263,
  mediumSolved: 190,
  hardSolved: 21,
  acceptanceRate: 68.7,
  ranking: 212171,
  totalQuestions: 3930,
};

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const start = 0;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor(start + progress * (target - start)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, active, duration]);
  return value;
}

function DonutRing({ solved, total }: { solved: number; total: number }) {
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const pct = Math.min(solved / total, 1);
  const offset = circumference - pct * circumference;

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      className="-rotate-90"
      role="img"
      aria-label={`${solved} of ${total} problems solved`}
    >
      <title>{`${solved} of ${total} problems solved`}</title>
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="transparent"
        stroke="oklch(0.22 0.03 40 / 0.4)"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="transparent"
        stroke="#FFA116"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </svg>
  );
}

function TechBadge({ name }: { name: string }) {
  const iconUrl = techIconMap[name];

  return (
    <motion.div
      whileHover={{ scale: 1.18, y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="group flex flex-col items-center gap-1.5 p-3 rounded-xl cursor-default relative"
      style={{
        background: "oklch(0.14 0.025 255 / 0.6)",
        border: "1px solid oklch(0.3 0.04 255 / 0.4)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-lg">
        {iconUrl ? (
          <img
            src={iconUrl}
            alt={name}
            className="w-8 h-8 object-contain group-hover:drop-shadow-[0_0_8px_oklch(0.68_0.18_230)] transition-all duration-300"
          />
        ) : (
          <span className="text-2xl">{emojiMap[name] ?? "💡"}</span>
        )}
      </div>
      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
        {name}
      </span>
    </motion.div>
  );
}

function LeetCodeSection() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    fetch("https://leetcode-api-faisalshohag.vercel.app/Anubhav9457")
      .then((r) => r.json())
      .then((data) => {
        setStats({
          totalSolved: data.totalSolved ?? FALLBACK.totalSolved,
          easySolved: data.easySolved ?? FALLBACK.easySolved,
          mediumSolved: data.mediumSolved ?? FALLBACK.mediumSolved,
          hardSolved: data.hardSolved ?? FALLBACK.hardSolved,
          acceptanceRate: data.acceptanceRate ?? FALLBACK.acceptanceRate,
          ranking: data.ranking ?? FALLBACK.ranking,
          totalQuestions: data.totalQuestions ?? FALLBACK.totalQuestions,
        });
      })
      .catch(() => setStats(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const active = inView && !loading;
  const s = stats ?? FALLBACK;

  const totalCount = useCountUp(s.totalSolved, active);
  const easyCount = useCountUp(s.easySolved, active);
  const mediumCount = useCountUp(s.mediumSolved, active);
  const hardCount = useCountUp(s.hardSolved, active);
  const rankCount = useCountUp(s.ranking, active, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🧩</span>
        <h3 className="text-2xl font-bold text-foreground">Problem Solving</h3>
        <div
          className="h-px flex-1"
          style={{ background: "oklch(0.35 0.05 40 / 0.5)" }}
        />
      </div>

      <div
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{
          background: "oklch(0.14 0.02 40 / 0.85)",
          border: "1.5px solid #FFA116",
          backdropFilter: "blur(16px)",
          boxShadow:
            "0 0 40px oklch(0.65 0.2 40 / 0.18), 0 0 80px oklch(0.65 0.2 40 / 0.08)",
        }}
        data-ocid="skills.leetcode.card"
      >
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.22 40 / 0.12) 0%, transparent 70%)",
          }}
        />

        {loading ? (
          <div
            className="flex flex-col gap-4"
            data-ocid="skills.leetcode.loading_state"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-xl animate-pulse"
                style={{ background: "oklch(0.22 0.03 40 / 0.6)" }}
              />
              <div className="space-y-2">
                <div
                  className="w-36 h-5 rounded animate-pulse"
                  style={{ background: "oklch(0.22 0.03 40 / 0.6)" }}
                />
                <div
                  className="w-24 h-3 rounded animate-pulse"
                  style={{ background: "oklch(0.22 0.03 40 / 0.4)" }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-xl animate-pulse"
                  style={{
                    background: "oklch(0.22 0.03 40 / 0.4)",
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
              <div className="flex items-center gap-4 flex-1">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "oklch(0.18 0.03 40 / 0.8)",
                    border: "1px solid oklch(0.35 0.1 40 / 0.5)",
                  }}
                >
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3521542-2944960.png"
                    alt="LeetCode logo"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold uppercase tracking-widest mb-0.5"
                    style={{ color: "#FFA116" }}
                  >
                    LeetCode
                  </p>
                  <p className="text-2xl font-black text-foreground">
                    Anubhav9457
                  </p>
                  <a
                    href="https://codolio.com/profile/Anubhav2501"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold px-3 py-1.5 rounded-full transition-all hover:scale-105"
                    style={{ background: "#FFA116", color: "#1a1a1a" }}
                    data-ocid="skills.leetcode.link"
                  >
                    View Coding Profile ↗
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="relative flex items-center justify-center">
                  <DonutRing solved={s.totalSolved} total={s.totalQuestions} />
                  <div className="absolute flex flex-col items-center">
                    <span
                      className="text-2xl font-black"
                      style={{ color: "#FFA116" }}
                    >
                      {totalCount}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      solved
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    of {s.totalQuestions}
                  </p>
                  <p className="text-sm text-muted-foreground">problems</p>
                  <p
                    className="text-base font-bold mt-1"
                    style={{ color: "#FFA116" }}
                  >
                    {((s.totalSolved / s.totalQuestions) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {[
                {
                  label: "Easy",
                  count: easyCount,
                  color: "#2db55d",
                  bg: "oklch(0.22 0.05 145 / 0.35)",
                },
                {
                  label: "Medium",
                  count: mediumCount,
                  color: "#FFA116",
                  bg: "oklch(0.22 0.06 60 / 0.35)",
                },
                {
                  label: "Hard",
                  count: hardCount,
                  color: "#EF4743",
                  bg: "oklch(0.22 0.07 20 / 0.35)",
                },
                {
                  label: "Total",
                  count: totalCount,
                  color: "#fff",
                  bg: "oklch(0.22 0.02 255 / 0.35)",
                },
              ].map(({ label, count, color, bg }, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={active ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
                  className="rounded-xl p-4 text-center"
                  style={{ background: bg, border: `1px solid ${color}33` }}
                >
                  <p className="text-3xl font-black" style={{ color }}>
                    {count}
                  </p>
                  <p className="text-sm font-semibold mt-1 text-muted-foreground">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl flex-1 min-w-[160px]"
                style={{
                  background: "oklch(0.18 0.03 255 / 0.5)",
                  border: "1px solid oklch(0.35 0.05 255 / 0.3)",
                }}
              >
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Global Ranking
                  </p>
                  <p className="text-xl font-black text-foreground">
                    #{rankCount.toLocaleString()}
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl flex-1 min-w-[160px]"
                style={{
                  background: "oklch(0.18 0.03 145 / 0.5)",
                  border: "1px solid oklch(0.35 0.05 145 / 0.3)",
                }}
              >
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Acceptance Rate
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{ color: "#2db55d" }}
                  >
                    {s.acceptanceRate.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Code Background ────────────────────────────────────────────────────────

interface CodeToken {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
  fontSize: number;
  lang: "java" | "python" | "js";
  delay: number;
}

const JAVA_SNIPPETS = [
  "public static void",
  "class Main {",
  "System.out.println()",
  "for(int i=0;",
  "import java.util.*",
  "new ArrayList<>()",
  "interface",
  "@Override",
  "try { }",
  "catch(Exception e)",
  "throws IOException",
  "extends Object",
  "private final int",
];

const PYTHON_SNIPPETS = [
  "def greet():",
  "import os",
  "for x in range(10):",
  "if __name__ == '__main__':",
  'print(f"hello")',
  "lambda x:",
  "with open() as f:",
  "[x for x in lst]",
  "@decorator",
  "async def main():",
  "yield value",
  "return None",
  "class MyClass:",
];

const JS_SNIPPETS = [
  "const fn = () =>",
  "async/await",
  "console.log()",
  "useState(null)",
  "document.querySelector",
  "JSON.stringify()",
  "Promise.resolve()",
  ".map().filter()",
  "export default",
  "import { } from",
  "?.optionalChain",
  "...spread",
  "typeof x === 'string'",
];

const GLOW_COLOR = "#ffffff";
const PROXIMITY_RADIUS = 150;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildTokens(): CodeToken[] {
  const rand = seededRandom(42);
  const tokens: CodeToken[] = [];
  const all: Array<{ text: string; lang: CodeToken["lang"] }> = [
    ...JAVA_SNIPPETS.map((t) => ({ text: t, lang: "java" as const })),
    ...PYTHON_SNIPPETS.map((t) => ({ text: t, lang: "python" as const })),
    ...JS_SNIPPETS.map((t) => ({ text: t, lang: "js" as const })),
  ];

  for (let i = 0; i < 48; i++) {
    const src = all[i % all.length];
    tokens.push({
      id: i,
      text: src.text,
      lang: src.lang,
      x: rand() * 96 + 2,
      y: rand() * 96 + 2,
      rotation: (rand() - 0.5) * 30,
      fontSize: Math.floor(rand() * 5) + 14,
      delay: rand() * 1.2,
    });
  }
  return tokens;
}

const TOKENS = buildTokens();

function CodeBackground({
  mousePos,
}: { mousePos: { x: number; y: number } | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const glows = useMemo(() => {
    if (!mousePos || !ref.current) return new Map<number, number>();
    const rect = ref.current.getBoundingClientRect();
    const map = new Map<number, number>();
    for (const tok of TOKENS) {
      const px = rect.left + (tok.x / 100) * rect.width;
      const py = rect.top + (tok.y / 100) * rect.height;
      const dist = Math.hypot(mousePos.x - px, mousePos.y - py);
      const t = Math.max(0, 1 - dist / PROXIMITY_RADIUS);
      if (t > 0) map.set(tok.id, t);
    }
    return map;
  }, [mousePos]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {TOKENS.map((tok) => {
        const t = glows.get(tok.id) ?? 0;
        const baseOpacity = 0.07;
        const opacity = inView ? baseOpacity + t * (0.9 - baseOpacity) : 0;
        const scale = 1 + t * 0.18;
        const glow =
          t > 0.05
            ? `0 0 ${Math.round(t * 20)}px ${GLOW_COLOR}, 0 0 ${Math.round(t * 40)}px ${GLOW_COLOR}88`
            : "none";

        return (
          <motion.span
            key={tok.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity, scale } : { opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: t > 0 ? 0.12 : 0.18, ease: "easeOut" },
              scale: { duration: t > 0 ? 0.12 : 0.18, ease: "easeOut" },
              ...(inView && t === 0 ? { delay: tok.delay, duration: 0.6 } : {}),
            }}
            style={{
              position: "absolute",
              left: `${tok.x}%`,
              top: `${tok.y}%`,
              transform: `rotate(${tok.rotation}deg) scale(${scale})`,
              fontSize: tok.fontSize,
              fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
              color: GLOW_COLOR,
              textShadow: glow,
              whiteSpace: "nowrap",
              userSelect: "none",
              lineHeight: 1,
              opacity,
              transition:
                "opacity 0.15s ease, text-shadow 0.15s ease, transform 0.15s ease",
            }}
          >
            {tok.text}
          </motion.span>
        );
      })}
    </div>
  );
}

// ─── Main Skills Component ───────────────────────────────────────────────────

export default function Skills() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20"
      style={{ position: "relative", overflow: "hidden" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <CodeBackground mousePos={mousePos} />
      <PlanetBackground variant="skills" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
            Cosmic Arsenal
          </p>
          <h2 className="section-title">Core Skills &amp; Tech Stack</h2>
          <p className="section-subtitle">
            Technologies I've launched into production
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border border-border/60 rounded-xl p-5 hover:border-primary/50 transition-colors"
              style={{
                background: "oklch(0.17 0.02 240 / 0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{cat.emoji}</span>
                <h3 className="text-lg font-semibold text-foreground">
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <TechBadge key={item} name={item} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <LeetCodeSection />
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import PlanetBackground from "./PlanetBackground";
function HeroPhoto() {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={{ y: [0, -14, 0] }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {/* Ambient glow behind photo */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 55%, oklch(0.45 0.2 280 / 0.35) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <img
        src="/assets/portfolio-img1.png"
        alt="Anubhav Kulshreshtha"
        className="w-full max-w-md xl:max-w-lg object-contain drop-shadow-2xl"
        style={{ filter: "drop-shadow(0 0 28px oklch(0.55 0.22 280 / 0.45))" }}
      />
    </motion.div>
  );
}

interface HeroProps {
  onViewResume: () => void;
  onViewRealResume: () => void;
}

const DEV_SNIPPETS = [
  { text: 'git commit -m "fix: finally"', top: "8%", left: "5%" },
  { text: 'console.log("why??")', top: "15%", left: "72%" },
  { text: "// TODO: fix later", top: "28%", left: "88%" },
  { text: "npm install", top: "42%", left: "3%" },
  { text: "undefined is not a function", top: "55%", left: "78%" },
  { text: "O(n log n)", top: "70%", left: "10%" },
  { text: "{ status: 200 }", top: "18%", left: "40%" },
  { text: "merge conflict", top: "80%", left: "60%" },
  { text: "while(true) { grind(); }", top: "62%", left: "45%" },
  { text: "404: sleep not found", top: "35%", left: "60%" },
  { text: "if (coffee) { code(); }", top: "88%", left: "28%" },
  { text: "sudo make it work", top: "50%", left: "90%" },
];

function DevBackgroundSnippets() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {DEV_SNIPPETS.map((snippet, i) => (
        <motion.span
          key={snippet.text}
          style={{
            position: "absolute",
            top: snippet.top,
            left: snippet.left,
            fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
            fontSize: 11 + (i % 3),
            color: "oklch(0.75 0.18 280)",
            opacity: 0,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
          animate={{
            opacity: [0, 0.09, 0.12, 0.07, 0],
            y: [0, -18, -32, -18, 0],
          }}
          transition={{
            duration: 8 + (i % 5) * 1.4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.9,
            ease: "easeInOut",
          }}
        >
          {snippet.text}
        </motion.span>
      ))}
    </div>
  );
}

export default function Hero({ onViewResume, onViewRealResume }: HeroProps) {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <PlanetBackground variant="hero" />
      <DevBackgroundSnippets />
      <div
        className="max-w-[1100px] mx-auto px-6 py-20 w-full"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-primary font-semibold text-base tracking-widest uppercase mb-4">
              Hello, World. I&apos;m a Software Engineer.
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] mb-4">
              Hi, I&apos;m <span className="text-primary">Anubhav</span>
            </h1>
            <p className="text-primary text-2xl font-semibold mb-5">
              Full Stack Software Engineer
            </p>
            <p className="text-muted-foreground text-xl leading-relaxed mb-8 max-w-md">
              I build scalable backend systems, craft clean APIs, and ship
              production-ready code. I solve 500+ problems across LeetCode,
              CodeChef &amp; GFG for fun and debug other people&apos;s code for
              sport. Space is just my aesthetic.
            </p>

            {/* Button group */}
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold shadow-accent-glow text-base"
                data-ocid="hero.primary_button"
              >
                View Projects
                <ArrowRight className="w-5 h-5" />
              </Button>

              {/* Sarcastic resume — chaos mode */}
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-border text-foreground hover:bg-muted gap-2 font-semibold relative overflow-hidden group text-base"
                      data-ocid="hero.secondary_button"
                      onClick={onViewResume}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                      <FileText className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">View Resume</span>
                      <span
                        className="relative z-10 ml-1 text-xs font-bold px-1.5 py-0.5 rounded-full"
                        style={{
                          background: "oklch(0.55 0.22 30 / 0.18)",
                          color: "oklch(0.8 0.18 40)",
                          border: "1px solid oklch(0.55 0.22 30 / 0.35)",
                        }}
                      >
                        ⚠️ chaos
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-sm">
                    ⚠️ Warning: contains 100% unfiltered chaos
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Real professional resume */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <button
                  type="button"
                  onClick={onViewRealResume}
                  data-ocid="hero.real_resume_button"
                  className="relative inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-base font-bold overflow-hidden group"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.22 280), oklch(0.48 0.2 300))",
                    color: "white",
                    boxShadow:
                      "0 0 24px oklch(0.55 0.22 280 / 0.45), 0 2px 8px rgba(0,0,0,0.35)",
                  }}
                >
                  <span
                    className="pointer-events-none absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
                    }}
                  />
                  <Sparkles className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">
                    Switch to Minimalist View
                  </span>
                </button>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { value: "1+", label: "Years Shipping Code" },
                { value: "10+", label: "Projects Built" },
                { value: "500+ 🚀", label: "Problems Across Platforms" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — animated CSS avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative hidden md:block"
          >
            <HeroPhoto />
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-4 py-3 shadow-card">
              <p className="text-sm text-muted-foreground">
                Ready for Launch —
              </p>
              <p className="text-base font-semibold text-primary">
                Freelance &amp; Full-time roles
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface RealResumeOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function RealResumeOverlay({
  open,
  onClose,
}: RealResumeOverlayProps) {
  return (
    <>
      <style>{`
        @media print {
          body > * { display: none !important; }
          #real-resume-print-root { display: block !important; }
          #real-resume-print-root * { display: revert; }
        }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            key="real-resume-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto py-10 px-4"
            style={{
              background: "rgba(3, 3, 14, 0.92)",
              backdropFilter: "blur(16px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
            data-ocid="real_resume.modal"
          >
            <motion.div
              key="real-resume-card"
              initial={{ opacity: 0, scale: 0.97, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              id="real-resume-print-root"
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.14 0.02 260), oklch(0.11 0.015 240))",
                border: "1px solid oklch(0.28 0.04 260)",
                boxShadow:
                  "0 0 60px oklch(0.55 0.22 280 / 0.15), 0 4px 40px rgba(0,0,0,0.6)",
              }}
            >
              {/* Toolbar */}
              <div
                className="flex items-center justify-between px-8 pt-6 pb-4 print:hidden"
                style={{ borderBottom: "1px solid oklch(0.25 0.04 260)" }}
              >
                <div className="flex items-center gap-2">
                  <Briefcase
                    className="w-4 h-4"
                    style={{ color: "oklch(0.7 0.2 280)" }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.7 0.2 280)" }}
                  >
                    Professional Resume
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="gap-2 text-sm font-semibold print:hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.55 0.22 280), oklch(0.5 0.2 300))",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                    window.open(
                      `${import.meta.env.BASE_URL}assets/Anubhav_Kulshreshtha_Resume.pdf`,
                      "_blank"
                    )
                  }
                    data-ocid="real_resume.print_button"
                  >
                    <Download className="w-4 h-4" />
                    Print / Download PDF
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-white/10"
                    style={{ color: "oklch(0.6 0.05 260)" }}
                    onClick={onClose}
                    data-ocid="real_resume.close_button"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Easter egg note */}
              <div className="px-10 pt-5 print:hidden">
                <p
                  className="text-xs italic"
                  style={{ color: "oklch(0.5 0.08 280)" }}
                >
                  ✨ psst — the other button has the fun version
                </p>
              </div>

              {/* Resume Content */}
              <div className="px-10 pb-12 pt-5">
                {/* Header */}
                <div
                  className="mb-8 pb-6"
                  style={{ borderBottom: "1px solid oklch(0.25 0.04 260)" }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h1
                        className="text-4xl font-black tracking-tight mb-1"
                        style={{ color: "oklch(0.96 0.01 260)" }}
                      >
                        Anubhav Kulshreshtha
                      </h1>
                      <p
                        className="text-lg font-semibold mb-3"
                        style={{ color: "oklch(0.7 0.2 280)" }}
                      >
                        Software Engineer — Fresher
                      </p>
                      <div
                        className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm"
                        style={{ color: "oklch(0.65 0.06 260)" }}
                      >
                        <a
                          href="mailto:kulshreshtha.anubhav2003@gmail.com"
                          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          kulshreshtha.anubhav2003@gmail.com
                        </a>
                        <a
                          href="tel:+916398256821"
                          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          +91 6398256821
                        </a>
                        <a
                          href="https://github.com/anubhav1450"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                        >
                          <Github className="w-3.5 h-3.5" />
                          github.com/anubhav1450
                        </a>
                        <a
                          href="https://www.linkedin.com/in/anubhav-kulshreshtha/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          linkedin/anubhav-kulshreshtha
                        </a>
                      </div>
                    </div>
                    {/* Availability badge */}
                    <div className="hidden sm:flex flex-col items-end gap-1 mt-1">
                      <span
                        className="text-xs px-3 py-1 rounded-full font-semibold"
                        style={{
                          background: "oklch(0.55 0.22 280 / 0.2)",
                          color: "oklch(0.78 0.18 280)",
                          border: "1px solid oklch(0.55 0.22 280 / 0.35)",
                        }}
                      >
                        Open to Opportunities
                      </span>
                      <span
                        className="text-xs px-3 py-1 rounded-full font-semibold"
                        style={{
                          background: "oklch(0.45 0.18 145 / 0.2)",
                          color: "oklch(0.72 0.18 145)",
                          border: "1px solid oklch(0.45 0.18 145 / 0.35)",
                        }}
                      >
                        Actively Job Seeking
                      </span>
                    </div>
                  </div>
                </div>

                <ResumeSection title="Professional Summary">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.72 0.04 260)" }}
                  >
                    Final-year CSE undergraduate with hands-on experience in
                    Java and JavaScript (MERN stack). Proficient in backend
                    development, REST APIs, and DevOps practices including
                    containerization using Docker. Experienced in building
                    scalable full-stack applications with a focus on
                    performance.
                  </p>
                </ResumeSection>

                <ResumeSection title="Education">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <p
                        className="font-bold"
                        style={{ color: "oklch(0.9 0.03 260)" }}
                      >
                        B.Tech in Computer Science and Engineering
                      </p>
                      <p
                        className="text-sm mt-0.5"
                        style={{ color: "oklch(0.65 0.06 260)" }}
                      >
                        Government Engineering College Bharatpur, Rajasthan,
                        India
                      </p>
                      <p
                        className="text-sm mt-1 font-semibold"
                        style={{ color: "oklch(0.7 0.2 280)" }}
                      >
                        CGPA: 8.5 &nbsp;·&nbsp; 8th Semester
                      </p>
                    </div>
                    <span
                      className="text-xs shrink-0 ml-4 mt-1"
                      style={{ color: "oklch(0.55 0.06 260)" }}
                    >
                      2022 – 2026
                    </span>
                  </div>
                </ResumeSection>

                <ResumeSection title="Professional Experience">
                  <div className="space-y-6">
                    <ExperienceBlock
                      title="Software Engineer Intern"
                      company="Lighthouse Info Systems Pvt Ltd"
                      period="May 2025 – Jul 2025"
                      location="Nagpur, India"
                      project="E-commerce Backend System"
                      tech="Node.js, Express.js, MongoDB, Mongoose, JWT, REST APIs, Postman"
                      bullets={[
                        "Developed a complete E-commerce Backend System using Node.js, Express.js, and MongoDB with 15+ REST APIs.",
                        "Implemented JWT-based authentication and Role-Based Access Control (RBAC) for secure user management.",
                        "Designed and optimized MongoDB schemas using Mongoose ODM, improving query performance by 40%.",
                        "Tested and documented all APIs using Postman, ensuring 100% endpoint coverage.",
                      ]}
                    />
                  </div>
                </ResumeSection>

                <ResumeSection title="Technical Skills">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {[
                      {
                        category: "Languages",
                        items: "Java, JavaScript, SQL",
                      },
                      {
                        category: "Frontend",
                        items: "React.js, HTML, CSS, Tailwind CSS, Bootstrap",
                      },
                      {
                        category: "Backend",
                        items: "Node.js, Express.js, REST APIs, JWT/RBAC",
                      },
                      {
                        category: "Databases",
                        items: "MongoDB, MySQL",
                      },
                      {
                        category: "DevOps & Tools",
                        items: "Docker, Git/GitHub, Postman, AWS (EC2, S3)",
                      },
                    ].map((s) => (
                      <div key={s.category} className="flex gap-2">
                        <span
                          className="font-semibold shrink-0"
                          style={{ color: "oklch(0.7 0.2 280)" }}
                        >
                          {s.category}:
                        </span>
                        <span style={{ color: "oklch(0.72 0.04 260)" }}>
                          {s.items}
                        </span>
                      </div>
                    ))}
                  </div>
                </ResumeSection>

                <ResumeSection title="Achievements">
                  <div
                    className="space-y-2 text-sm"
                    style={{ color: "oklch(0.72 0.04 260)" }}
                  >
                    <div className="flex gap-2">
                      <span style={{ color: "oklch(0.65 0.18 280)" }}>▸</span>
                      <span>
                        Solved{" "}
                        <strong style={{ color: "oklch(0.82 0.16 50)" }}>
                          500+ problems
                        </strong>{" "}
                        across LeetCode, CodeChef, and GeeksforGeeks · LeetCode
                        peak rating:{" "}
                        <strong style={{ color: "oklch(0.82 0.16 50)" }}>
                          1637
                        </strong>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span style={{ color: "oklch(0.65 0.18 280)" }}>▸</span>
                      <span>
                        Coordinator, Python Programming Club — organized coding
                        workshops for <strong>50+ students</strong> at GEC
                        Bharatpur
                      </span>
                    </div>
                  </div>
                </ResumeSection>

                <ResumeSection title="Projects" last>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Real Time Collaborative Code Editor",
                        desc: "A real-time collaborative code editor with multi-user sync, live code execution, and Docker-based deployment on AWS ECS.",
                        tech: "React.js · Node.js · Express.js · Socket.io · Yjs · Monaco Editor · Tailwind CSS · Docker · AWS ECS",
                        link: "https://github.com/anubhav1450",
                      },
                      {
                        name: "Hacker News Scraper",
                        desc: "A full-stack web scraper for Hacker News with authentication, bookmarking, and search features.",
                        tech: "Node.js · Express.js · React.js · MongoDB · JWT · Cheerio · Axios · REST APIs",
                        link: "https://github.com/anubhav1450",
                      },
                    ].map((p) => (
                      <div key={p.name}>
                        <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold hover:opacity-80 transition-opacity"
                            style={{ color: "oklch(0.9 0.03 260)" }}
                          >
                            {p.name} ↗
                          </a>
                        </div>
                        <p
                          className="text-xs mb-1"
                          style={{ color: "oklch(0.55 0.1 280)" }}
                        >
                          {p.tech}
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "oklch(0.7 0.04 260)" }}
                        >
                          {p.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </ResumeSection>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ResumeSection({
  title,
  children,
  last,
}: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={last ? "mb-0" : "mb-7"}>
      <h2
        className="text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-3"
        style={{ color: "oklch(0.7 0.2 280)" }}
      >
        <span>{title}</span>
        <span
          className="flex-1 h-px"
          style={{ background: "oklch(0.25 0.04 260)" }}
        />
      </h2>
      {children}
    </div>
  );
}

function ExperienceBlock({
  title,
  company,
  period,
  location,
  project,
  tech,
  bullets,
}: {
  title: string;
  company: string;
  period: string;
  location?: string;
  project?: string;
  tech?: string;
  bullets: string[];
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1 flex-wrap gap-1">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-bold" style={{ color: "oklch(0.9 0.03 260)" }}>
            {title}
          </span>
          <span style={{ color: "oklch(0.5 0.06 260)" }}>·</span>
          <span className="text-sm" style={{ color: "oklch(0.65 0.08 280)" }}>
            {company}
          </span>
          {location && (
            <span className="text-xs" style={{ color: "oklch(0.5 0.04 260)" }}>
              · {location}
            </span>
          )}
        </div>
        <span
          className="text-xs shrink-0"
          style={{ color: "oklch(0.55 0.06 260)" }}
        >
          {period}
        </span>
      </div>
      {project && (
        <p className="text-xs mb-2" style={{ color: "oklch(0.62 0.12 280)" }}>
          <span className="font-semibold">Project:</span> {project}
          {tech && (
            <span style={{ color: "oklch(0.52 0.06 260)" }}> — {tech}</span>
          )}
        </p>
      )}
      <ul
        className="space-y-1.5 text-sm"
        style={{ color: "oklch(0.72 0.04 260)" }}
      >
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span
              className="mt-[3px] shrink-0"
              style={{ color: "oklch(0.65 0.18 280)" }}
            >
              ▸
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

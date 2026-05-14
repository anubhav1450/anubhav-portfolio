import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import PlanetBackground from "./PlanetBackground";

const pills = [
  { icon: MapPin, label: "Bharatpur, Rajasthan, India" },
  { icon: Briefcase, label: "Fresher · Class of 2026" },
  { icon: GraduationCap, label: "B.Tech CSE · CGPA 8.64" },
];

const storyParagraphs = [
  "I'm a Computer Science fresher from Government Engineering College Bharatpur — a backend-focused software engineer who loves building things that scale. Node.js, Express, MongoDB, REST APIs, JWT auth — these are my daily tools.",
  "Problem solving is my gym. 500+ problems solved across LeetCode, CodeChef & GFG — Easy, Medium, and Hard. Data structures and algorithms aren't just interview prep for me — they're how I think.",
  "At Lighthouse Info Systems, I built an e-commerce backend system from scratch: 500+ concurrent requests, sub-200ms response time, 25-30% query performance boost through smart indexing. Real numbers, real impact.",
];

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "Lighthouse Info Systems Pvt Ltd",
    period: "May 2025 – Jul 2025",
    bullets: [
      "Developed backend modules for product management, cart operations, and order processing using Node.js, Express.js, and MongoDB.",
      "Implemented secure JWT-based authentication and authorization while designing REST APIs and optimized database schemas for scalable application workflows.",
      "Engineered order lifecycle management with validation, error handling, and reliable API integration for consistent backend functionality.",
      "Technologies: Node.js, Express.js, MongoDB, Mongoose, JWT, REST APIs, Postman",
    ],
  },
];

function AboutPhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative group flex items-center justify-center"
    >
      {/* Purple glow behind photo */}
      <div
        className="absolute inset-0 rounded-2xl blur-xl transition-all duration-500"
        style={{
          background: "oklch(0.45 0.2 280 / 0.12)",
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: "oklch(0.45 0.2 280 / 0.22)",
        }}
      />
      <img
        src={`${import.meta.env.BASE_URL}assets/img4.png`}
        alt="Anubhav Kulshreshtha"
        className="relative w-full max-w-sm rounded-2xl object-cover"
        style={{
          border: "1px solid oklch(0.55 0.2 280 / 0.3)",
          boxShadow:
            "0 8px 40px oklch(0.45 0.2 280 / 0.2), 0 2px 8px rgba(0,0,0,0.4)",
        }}
      />
    </motion.div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="py-20"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <PlanetBackground variant="about" />
      <div
        className="max-w-[1100px] mx-auto px-6"
        style={{ position: "relative", zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
            Dev Profile
          </p>
          <h2 className="section-title">The Engineer</h2>
          <p className="section-subtitle">
            Software developer by day, LeetCode grinder by night. Space is the
            vibe, not the job.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mt-4">
          {/* Left — Photo */}
          <AboutPhoto />

          {/* Right — Tabbed info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col"
          >
            <Tabs defaultValue="story" className="flex-1">
              <TabsList
                className="mb-6 bg-card border border-border w-full"
                data-ocid="about.tab"
              >
                <TabsTrigger
                  value="story"
                  className="flex-1 text-sm font-semibold uppercase tracking-wider"
                >
                  My Story
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="flex-1 text-sm font-semibold uppercase tracking-wider"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="flex-1 text-sm font-semibold uppercase tracking-wider"
                >
                  Education
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="story" asChild>
                  <motion.div
                    key="story"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {storyParagraphs.map((p) => (
                      <motion.p
                        key={p.slice(0, 30)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-muted-foreground text-base leading-relaxed"
                      >
                        {p}
                      </motion.p>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="experience" asChild>
                  <motion.div
                    key="experience"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {experiences.map((exp) => (
                      <motion.div
                        key={exp.role}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative pl-5 border-l-2 border-primary/40"
                      >
                        <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                        <p className="font-bold text-foreground text-base">
                          {exp.role}
                        </p>
                        <p className="text-primary text-sm mb-1">
                          {exp.company} ·{" "}
                          <span className="text-muted-foreground">
                            {exp.period}
                          </span>
                        </p>
                        <ul className="space-y-1">
                          {exp.bullets.map((b) => (
                            <li
                              key={b}
                              className="text-muted-foreground text-sm leading-relaxed flex gap-2"
                            >
                              <span className="text-primary mt-0.5">›</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="education" asChild>
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="border border-border rounded-xl p-5"
                      style={{ background: "oklch(0.17 0.02 240 / 0.6)" }}
                    >
                      <p className="font-bold text-foreground text-lg mb-1">
                        B.Tech in Computer Science and Engineering
                      </p>
                      <p className="text-primary text-base font-semibold">
                        Government Engineering College Bharatpur, Rajasthan
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">
                        2022 – 2026 · CGPA 8.64
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {[
                          "DSA",
                          "OS",
                          "DBMS",
                          "CN",
                          "OOP",
                          "Software Engineering",
                        ].map((c) => (
                          <span
                            key={c}
                            className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                            style={{
                              background: "oklch(0.14 0.025 255 / 0.5)",
                            }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>

            {/* Pills */}
            <div className="flex flex-wrap gap-3 mt-6">
              {pills.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 tag-pill"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Github, Info } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import PlanetBackground from "./PlanetBackground";
import { techIconMap } from "./techIconMap";

const projects = [
  {
    title: "Real Time Collaborative Code Editor",
    description:
      "A real-time collaborative code editor supporting multi-user simultaneous editing, live code execution, and Docker-based deployment on AWS ECS. Features conflict-free sync using Yjs CRDT, Monaco Editor for rich code editing experience, and Socket.io for real-time communication.",
    longDescription:
      "Built a production-grade collaborative code editor where multiple developers can code together simultaneously. Uses Yjs CRDT for conflict-free real-time document sync, Monaco Editor (same as VS Code) for a rich coding experience, and Socket.io for WebSocket communication. Containerized with Docker and deployed on AWS ECS for scalability.",
    image: `${import.meta.env.BASE_URL}assets/RTE3.png`,
    tags: [
      "React",
      "Node.js",
      "Express",
      "WebSockets",
      "Tailwind CSS",
      "Docker",
      "AWS",
    ],
    liveUrl: null,
    codeUrl: "https://github.com/anubhav1450/real-time-editor",
    featured: true,
  },
  {
    title: "Hacker News Scraper",
    description:
      "A full-stack web application that scrapes Hacker News for the latest stories, with user authentication, bookmarking, and advanced search. Built with a Node.js backend using Cheerio for scraping and a React frontend.",
    longDescription:
      "Developed a full-stack web scraper for Hacker News featuring JWT-based authentication, bookmark management, and full-text search. Backend uses Cheerio and Axios for efficient scraping with rate limiting. Frontend is a clean React SPA with real-time filtering. Stores scraped data in MongoDB with Mongoose schemas.",
    image: `${import.meta.env.BASE_URL}assets/hackerNews.png`,
    tags: ["Node.js", "Express", "React", "MongoDB", "JWT", "REST APIs"],
    liveUrl: "https://hacker-news-scraper-amgo.onrender.com/",
    codeUrl: "https://github.com/anubhav1450/Hacker-News-Scraper",
    featured: true,
  },
  {
  title: "URL Shortener",
  description:
    "A full-stack URL Shortener application with analytics tracking, click monitoring, and responsive dashboard interface. Users can generate short URLs, manage links, and track engagement statistics in real time.",
  longDescription:
    "Built a production-ready URL Shortener using React, Node.js, Express, and MongoDB. Features include URL shortening, analytics tracking, click history, link management, and responsive dashboard UI. Backend follows REST API architecture with MongoDB integration using Mongoose.",
  image: `${import.meta.env.BASE_URL}assets/URL-short.png`,
  tags: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose",
    "Tailwind CSS",
    "REST APIs",
  ],
  liveUrl: "https://urlsht-job9.onrender.com",
  codeUrl: "https://github.com/anubhav1450/URL-shortner",
  featured: true,
},
];

function TagPill({ tag }: { tag: string }) {
  const iconUrl = techIconMap[tag];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full"
      style={{
        background: "oklch(0.15 0.018 240 / 0.7)",
        border: "1px solid oklch(0.28 0.022 240)",
        color: "oklch(0.72 0.012 240)",
      }}
    >
      {iconUrl && (
        <img src={iconUrl} alt={tag} className="w-4 h-4 object-contain" />
      )}
      {tag}
    </span>
  );
}

type Project = (typeof projects)[0];

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg border-border/70"
        style={{
          background: "oklch(0.14 0.022 245 / 0.95)",
          backdropFilter: "blur(20px)",
        }}
        data-ocid="projects.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground text-2xl">
            {project?.title}
          </DialogTitle>
        </DialogHeader>

        {project && (
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden aspect-video">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-muted-foreground text-base leading-relaxed">
              {project.longDescription || project.description}
            </p>

            <div className="space-y-1.5">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} />
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                asChild
                variant="outline"
                className="flex-1 gap-2 border-border"
                data-ocid="projects.secondary_button"
              >
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="py-20"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <PlanetBackground variant="projects" />
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
            Mission Logs
          </p>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Missions I&apos;ve engineered and deployed
          </p>
        </motion.div>

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`projects.item.${i + 1}`}
              className="border border-border/60 rounded-xl overflow-hidden hover:border-primary/40 transition-colors flex flex-col"
              style={{
                background: "oklch(0.17 0.02 240 / 0.7)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Thumbnail */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tags with logos */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 gap-1.5 text-sm font-medium bg-primary/15 text-primary hover:bg-primary/30 border border-primary/40"
                    data-ocid={`projects.open_modal_button.${i + 1}`}
                  >
                    <Info className="w-4 h-4" />
                    Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1.5 text-sm font-medium border-border text-muted-foreground hover:text-foreground"
                    asChild
                    data-ocid={`projects.secondary_button.${i + 1}`}
                  >
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Want to see more button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://github.com/anubhav1450"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="projects.github_link"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold overflow-hidden transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.22 0.05 255 / 0.9), oklch(0.18 0.04 280 / 0.9))",
              border: "1.5px solid oklch(0.45 0.18 230 / 0.5)",
              color: "oklch(0.85 0.12 230)",
              boxShadow:
                "0 0 20px oklch(0.65 0.22 280 / 0.25), 0 0 40px oklch(0.65 0.22 280 / 0.12), inset 0 1px 0 oklch(0.55 0.18 230 / 0.15)",
              animation: "star-glow-pulse 2.5s ease-in-out infinite",
            }}
          >
            {/* Shimmer sweep on hover */}
            <span
              className="pointer-events-none absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(105deg, transparent 30%, oklch(0.75 0.18 230 / 0.15) 50%, transparent 70%)",
              }}
            />
            {/* Orbit ring on hover */}
            <span
              className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow:
                  "0 0 28px oklch(0.68 0.22 280 / 0.7), 0 0 55px oklch(0.62 0.2 200 / 0.35), inset 0 0 20px oklch(0.55 0.18 230 / 0.1)",
              }}
            />
            <span className="relative z-10 text-2xl">🚀</span>
            <span className="relative z-10">Want to see more?</span>
            <span
              className="relative z-10 text-sm font-normal opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ color: "oklch(0.65 0.14 230)" }}
            >
              github.com/anubhav1450 ✦
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import PlanetBackground from "./PlanetBackground";

const SOCIAL_LINKS = [
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "@anubhav-kulshreshtha",
    url: "https://www.linkedin.com/in/anubhav-kulshreshtha/",
    color1: "oklch(0.55 0.18 240)",
    color2: "oklch(0.45 0.2 220)",
    ringColor: "oklch(0.55 0.18 240 / 0.6)",
    glowColor: "oklch(0.55 0.18 240 / 0.4)",
    label: "Connect",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-10 h-10"
        aria-hidden="true"
      >
        <title>LinkedIn</title>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "github",
    name: "GitHub",
    handle: "@anubhav1450",
    url: "https://github.com/anubhav1450",
    color1: "oklch(0.72 0.012 240)",
    color2: "oklch(0.55 0.08 280)",
    ringColor: "oklch(0.65 0.1 280 / 0.5)",
    glowColor: "oklch(0.65 0.1 280 / 0.35)",
    label: "View Profile",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-10 h-10"
        aria-hidden="true"
      >
        <title>GitHub</title>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <style>{`
        @keyframes orbit-ring {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbit-ring-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes card-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes nebula-pulse {
          0%, 100% { opacity: 0.45; transform: translateX(-50%) scale(1); }
          50%       { opacity: 0.75; transform: translateX(-50%) scale(1.08); }
        }
        @keyframes icon-glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 6px currentColor); }
          50%       { filter: drop-shadow(0 0 18px currentColor) drop-shadow(0 0 32px currentColor); }
        }
        .social-card-inner {
          animation: card-float 5s ease-in-out infinite;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }
        .social-card-wrap:hover .social-card-inner {
          animation: none;
          transform: translateY(-14px) scale(1.03);
        }
        .social-card-wrap:hover .orbit-ring-1 {
          animation-duration: 2.5s !important;
        }
        .social-card-wrap:hover .orbit-ring-2 {
          animation-duration: 3.5s !important;
        }
        .orbit-dot {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .nebula-bg {
          animation: nebula-pulse 3s ease-in-out infinite;
        }
        .icon-glow {
          animation: icon-glow-pulse 3s ease-in-out infinite;
        }
        .email-card:hover {
          border-color: oklch(0.55 0.18 240 / 0.6) !important;
          box-shadow: 0 0 20px oklch(0.55 0.18 240 / 0.25) !important;
        }
      `}</style>

      <PlanetBackground variant="contact" />

      <div
        className="max-w-[1100px] mx-auto px-6"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Transmission Channels
          </p>
          <h2 className="section-title">
            Find Me In The{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.18 230), oklch(0.6 0.18 290))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Universe
            </span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Pick a channel and beam a signal — I&apos;m always listening from
            across the cosmos.
          </p>
        </motion.div>

        {/* Social cards */}
        <div className="flex flex-col sm:flex-row gap-12 justify-center items-center mb-16">
          {SOCIAL_LINKS.map((link, i) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="social-card-wrap w-full max-w-[320px]"
              data-ocid={`connect.${link.id}_card`}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                style={{ textDecoration: "none" }}
                data-ocid={`connect.${link.id}_link`}
              >
                {/* Orbit rings wrapper — sized around the card */}
                <div
                  style={{
                    position: "relative",
                    padding: "44px",
                    margin: "-44px",
                  }}
                >
                  {/* Orbit ring 1 */}
                  <div
                    className="orbit-ring-1"
                    style={{
                      position: "absolute",
                      inset: "12px",
                      borderRadius: "50%",
                      border: `1px dashed ${link.ringColor}`,
                      animation: "orbit-ring 8s linear infinite",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      className="orbit-dot"
                      style={{
                        background: link.color1,
                        boxShadow: `0 0 8px ${link.color1}, 0 0 16px ${link.color1}`,
                        top: "-3.5px",
                        left: "calc(50% - 3.5px)",
                      }}
                    />
                  </div>

                  {/* Orbit ring 2 */}
                  <div
                    className="orbit-ring-2"
                    style={{
                      position: "absolute",
                      inset: "-8px",
                      borderRadius: "50%",
                      border: `1px solid ${link.ringColor.replace("0.6", "0.18")}`,
                      animation: "orbit-ring-rev 14s linear infinite",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      className="orbit-dot"
                      style={{
                        background: link.color2,
                        boxShadow: `0 0 6px ${link.color2}`,
                        bottom: "-3.5px",
                        left: "calc(50% - 3.5px)",
                      }}
                    />
                    <div
                      className="orbit-dot"
                      style={{
                        background: link.color2,
                        boxShadow: `0 0 6px ${link.color2}`,
                        top: "calc(30% - 3.5px)",
                        right: "-3.5px",
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="social-card-inner relative rounded-3xl p-8 flex flex-col items-center text-center gap-5"
                    style={{
                      background:
                        "linear-gradient(145deg, oklch(0.17 0.024 255 / 0.95), oklch(0.12 0.018 260 / 0.98))",
                      border: `1.5px solid ${link.ringColor}`,
                      boxShadow: `0 0 28px ${link.glowColor}, 0 0 70px ${link.glowColor.replace("0.4", "0.1")}, inset 0 1px 0 oklch(1 0 0 / 0.07)`,
                    }}
                  >
                    {/* Nebula glow blob */}
                    <div
                      className="nebula-bg"
                      style={{
                        position: "absolute",
                        width: "130px",
                        height: "130px",
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${link.glowColor} 0%, transparent 70%)`,
                        top: "16px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        animationDelay: `${i * 0.8}s`,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Icon */}
                    <div
                      className="icon-glow"
                      style={{
                        color: link.color1,
                        animationDelay: `${i * 0.5}s`,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {link.icon}
                    </div>

                    {/* Name + handle */}
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <p
                        className="font-black text-2xl text-foreground"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {link.name}
                      </p>
                      <p
                        className="text-base mt-1 font-medium"
                        style={{ color: link.color1 }}
                      >
                        {link.handle}
                      </p>
                    </div>

                    {/* CTA pill */}
                    <div
                      className="mt-1 px-7 py-2.5 rounded-xl font-semibold text-base"
                      style={{
                        background: `linear-gradient(135deg, ${link.color1}, ${link.color2})`,
                        color: "oklch(0.08 0.01 240)",
                        boxShadow: `0 4px 20px ${link.glowColor}`,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {link.label} →
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Email + location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col items-center gap-3"
          data-ocid="connect.email_section"
        >
          <p className="text-muted-foreground text-base">
            Or reach me directly via email
          </p>
          <a
            href="mailto:kulshreshtha.anubhav2003@gmail.com"
            className="email-card group flex items-center gap-3 px-6 py-3 rounded-xl border transition-all duration-300"
            style={{
              borderColor: "oklch(0.28 0.022 255)",
              background: "oklch(0.16 0.022 255 / 0.6)",
            }}
            data-ocid="connect.email_link"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5 flex-shrink-0"
              style={{ color: "oklch(0.68 0.18 230)" }}
              aria-hidden="true"
            >
              <title>Email</title>
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span
              className="text-base font-medium"
              style={{ color: "oklch(0.85 0.01 240)" }}
            >
              kulshreshtha.anubhav2003@gmail.com
            </span>
          </a>

          <div
            className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{
              background: "oklch(0.15 0.018 255 / 0.5)",
              border: "1px solid oklch(0.24 0.024 255 / 0.5)",
              color: "oklch(0.6 0.012 240)",
            }}
          >
            <span>📍</span>
            <span>
              Bharatpur, Rajasthan, India · Actively seeking full-time roles
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

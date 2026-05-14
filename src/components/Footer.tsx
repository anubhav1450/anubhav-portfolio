import { Linkedin } from "lucide-react";
import { SiGithub } from "react-icons/si";

const footerLinks = [
  {
    heading: "Navigation",
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Projects",
    links: [
      { label: "Real-Time-Collaborative Editor", href: "#" },
      { label: "Hacker News Scraper", href: "#" },
      // { label: "Portfolio CMS", href: "#" },
    ],
  },
];

const socialLinks = [
  {
    Icon: SiGithub,
    href: "https://github.com/anubhav1450",
    label: "GitHub",
  },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/anubhav-kulshreshtha/",
    label: "LinkedIn",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="border-t border-border">
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold text-foreground mb-2">
              Anubhav Kulshreshtha
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              Software Engineer on a mission to explore the digital cosmos and
              build things that matter.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-ocid="footer.link"
                  className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p className="text-foreground text-xs font-semibold uppercase tracking-widest mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      data-ocid="footer.link"
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Tech stack col */}
          <div>
            <p className="text-foreground text-xs font-semibold uppercase tracking-widest mb-4">
              Tech Stack
            </p>
            <ul className="space-y-2">
              {["Java", "React", "JavaScript", "Node.js", "MongoDB", "Express"].map(
                (tech) => (
                  <li key={tech} className="text-muted-foreground text-sm">
                    {tech}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Legal bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} Anubhav Kulshreshtha. All rights reserved.</p>
          <p>
            <span className="opacity-70">
              🌌 Imagined by{" "}
              <span className="text-foreground font-medium">Anubhav</span> ·
              Forged in the stars{" "}
            </span>
           
            <span className="opacity-70"> ✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

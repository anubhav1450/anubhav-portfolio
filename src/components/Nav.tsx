import { Code2, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [active, setActive] = useState("#home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setActive(href);
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleNav("#home")}
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Code2 className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-foreground text-sm tracking-wide">
            Anubhav Kulshreshtha
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNav(link.href)}
              data-ocid="nav.link"
              className={`nav-link ${active === link.href ? "active" : ""}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen((o) => !o)}
          data-ocid="nav.toggle"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-card border-b border-border px-6 py-4 flex flex-col gap-3"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNav(link.href)}
                data-ocid="nav.link"
                className={`nav-link text-left ${
                  active === link.href ? "active" : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

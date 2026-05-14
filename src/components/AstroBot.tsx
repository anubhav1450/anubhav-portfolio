import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

const knowledgeBase: { keywords: string[]; response: string }[] = [
  {
    keywords: ["who", "name", "anubhav", "about"],
    response:
      "I'm the mission log of Anubhav Kulshreshtha — a Computer Science fresher from GEC Bharatpur, Class of 2026. He's on his maiden voyage into the software engineering galaxy, armed with a CGPA of 8.5 and 350+ LeetCode problems solved. 🚀",
  },
  {
    keywords: ["skills", "languages", "tech", "stack", "technologies"],
    response:
      "Anubhav's cosmic toolkit includes: JavaScript, TypeScript, Python, Java for languages; React, Next.js, TailwindCSS for frontend constellations; Node.js, Express.js for backend propulsion; MongoDB, PostgreSQL for data storage orbits; and Git, Docker, Postman for mission control tools. ⚡",
  },
  {
    keywords: ["internship", "experience", "lighthouse", "work"],
    response:
      "Anubhav did a deep-space mission at Lighthouse Info Systems (May–Jul 2025, Nagpur) as a Software Engineer Intern. He built an e-commerce backend handling 500+ concurrent requests, boosted query performance by ~25–30% with MongoDB indexing, and achieved sub-200ms API response times. One small step for an intern, one giant leap for the backend! 🌟",
  },
  {
    keywords: [
      "education",
      "degree",
      "college",
      "cgpa",
      "gec",
      "bharatpur",
      "university",
      "gpa",
    ],
    response:
      "He's orbiting B.Tech CSE at Government Engineering College Bharatpur, currently in his 8th semester with a CGPA of 8.5. Expected graduation: 2026. Coordinates: Bharatpur, Rajasthan, India. 🎓",
  },
  {
    keywords: ["leetcode", "problems", "dsa", "algorithms", "coding", "solve"],
    response:
      "Anubhav has solved 350+ LeetCode problems — easy, medium, and hard — like a cosmic debris field of algorithms. Strong in DSA, dynamic programming, and graph traversal. His profile: leetcode.com/u/Anubhav9457 ⚡",
  },
  {
    keywords: ["projects", "portfolio", "ecommerce", "backend", "built"],
    response:
      "Two notable missions logged: (1) E-commerce Backend System — Node.js + Express + MongoDB backend with JWT auth, built during his Lighthouse internship. (2) This very portfolio site — React + Three.js + TailwindCSS with a 3D astronaut and live LeetCode stats! 🛰️",
  },
  {
    keywords: [
      "contact",
      "email",
      "reach",
      "hire",
      "available",
      "job",
      "opportunity",
    ],
    response:
      "Anubhav is actively seeking full-time software engineering roles and is ready for launch! You can reach him via the Contact section of this portfolio — just scroll down and open a transmission. 📡",
  },
  {
    keywords: ["summary", "fresher", "overview", "introduction"],
    response:
      "Anubhav Kulshreshtha — B.Tech CSE fresher (2026), CGPA 8.5, internship experience at Lighthouse Info Systems, 350+ LeetCode problems solved, skilled in full-stack development with Node.js and React. Currently in search of his first full-time mission. 🌌",
  },
];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }
  return "Houston, we have a question I can't parse! 🛸 Try asking about Anubhav's skills, education, internship, projects, or LeetCode stats. I'll do my best to transmit the right data.";
}

const SUGGESTIONS = [
  "Who is Anubhav?",
  "What are his skills?",
  "Tell me about his internship",
  "What's his education?",
  "LeetCode stats?",
];

let msgId = 0;

export default function AstroBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: ++msgId,
      role: "bot",
      text: "Greetings, space traveller! 👋 I'm AstroBot — your guide to Anubhav's universe. Ask me anything about his skills, experience, education, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }); // run after every render to scroll to bottom

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: ++msgId, role: "user", text: trimmed },
    ]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(trimmed);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: ++msgId, role: "bot", text: response },
      ]);
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="astrobot-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="w-[350px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              height: "500px",
              background: "oklch(0.11 0.02 260)",
              border: "1px solid oklch(0.25 0.04 270)",
              boxShadow:
                "0 0 40px oklch(0.55 0.22 280 / 0.25), 0 8px 32px rgba(0,0,0,0.6)",
            }}
            data-ocid="astrobot.panel"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "oklch(0.25 0.04 270)" }}
            >
              <div>
                <p className="font-bold text-sm text-white flex items-center gap-2">
                  <span
                    className="text-base"
                    style={{
                      filter: "drop-shadow(0 0 6px oklch(0.7 0.2 280))",
                    }}
                  >
                    🤖
                  </span>
                  AstroBot
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
                </p>
                <p
                  className="text-[11px] mt-0.5"
                  style={{ color: "oklch(0.55 0.04 270)" }}
                >
                  Ask me anything about Anubhav&apos;s resume
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                data-ocid="astrobot.close_button"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-colors"
                style={{ color: "oklch(0.55 0.04 270)" }}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-2 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "bot" && (
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-1"
                        style={{
                          background: "oklch(0.2 0.04 270)",
                          border: "1px solid oklch(0.3 0.05 270)",
                        }}
                      >
                        🤖
                      </span>
                    )}
                    <div
                      className="max-w-[240px] rounded-xl px-3 py-2 text-xs leading-relaxed"
                      style={
                        msg.role === "user"
                          ? {
                              background: "oklch(0.55 0.22 280)",
                              color: "white",
                              borderRadius: "12px 12px 4px 12px",
                            }
                          : {
                              background: "oklch(0.17 0.03 265)",
                              color: "oklch(0.82 0.04 270)",
                              border: "1px solid oklch(0.25 0.04 270)",
                              boxShadow: "0 0 12px oklch(0.55 0.18 280 / 0.1)",
                              borderRadius: "12px 12px 12px 4px",
                            }
                      }
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2 justify-start"
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                      style={{
                        background: "oklch(0.2 0.04 270)",
                        border: "1px solid oklch(0.3 0.05 270)",
                      }}
                    >
                      🤖
                    </span>
                    <div
                      className="flex items-center gap-1 px-3 py-2.5 rounded-xl"
                      style={{
                        background: "oklch(0.17 0.03 265)",
                        border: "1px solid oklch(0.25 0.04 270)",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Suggestion chips */}
            {messages.length <= 1 && !isTyping && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    data-ocid="astrobot.button"
                    className="text-[11px] px-2.5 py-1 rounded-full transition-colors"
                    style={{
                      background: "oklch(0.18 0.04 270)",
                      border: "1px solid oklch(0.3 0.05 280)",
                      color: "oklch(0.72 0.1 280)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <div
              className="px-3 pb-3 pt-2 border-t"
              style={{ borderColor: "oklch(0.2 0.03 270)" }}
            >
              <div
                className="flex gap-2 rounded-xl px-3 py-2"
                style={{
                  background: "oklch(0.16 0.03 265)",
                  border: "1px solid oklch(0.25 0.04 270)",
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Anubhav..."
                  data-ocid="astrobot.input"
                  className="flex-1 bg-transparent text-xs outline-none placeholder:text-opacity-50"
                  style={{
                    color: "oklch(0.85 0.04 270)",
                    caretColor: "oklch(0.65 0.2 280)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  data-ocid="astrobot.submit_button"
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-40"
                  style={{
                    background: "oklch(0.55 0.22 280)",
                  }}
                >
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger button */}
      <div className="relative">
        {/* Pulsing ring */}
        {!open && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: "oklch(0.55 0.22 280 / 0.35)",
              animationDuration: "2s",
            }}
          />
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          data-ocid="astrobot.open_modal_button"
          title="Ask AstroBot"
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg transition-transform hover:scale-110 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.22 280), oklch(0.45 0.2 300))",
            boxShadow:
              "0 0 24px oklch(0.55 0.22 280 / 0.5), 0 4px 16px rgba(0,0,0,0.4)",
          }}
        >
          {open ? "✕" : "🚀"}
        </button>
      </div>
    </div>
  );
}

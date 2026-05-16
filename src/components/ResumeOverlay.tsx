import { Button } from "@/components/ui/button";
import { Printer, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface ResumeOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function ResumeOverlay({ open, onClose }: ResumeOverlayProps) {
  return (
    <>
      <style>{`
        @media print {
          body > * { display: none !important; }
          #resume-print-root { display: block !important; }
          #resume-print-root * { display: revert; }
        }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            key="resume-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto py-10 px-4"
            style={{
              background: "rgba(5, 5, 18, 0.85)",
              backdropFilter: "blur(12px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
            data-ocid="resume.modal"
          >
            <motion.div
              key="resume-card"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              id="resume-print-root"
              className="relative w-full max-w-3xl bg-white text-gray-900 rounded-2xl shadow-2xl"
            >
              {/* Toolbar */}
              <div className="flex items-center justify-between px-8 pt-6 pb-2 print:hidden">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    ☠ CHAOS MODE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                    onClick={() => window.print()}
                    data-ocid="resume.print_button"
                  >
                    <Printer className="w-4 h-4" />
                    Print (for posterity)
                  </Button> */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    onClick={onClose}
                    data-ocid="resume.close_button"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Resume Content */}
              <div className="px-10 pb-12 pt-4 font-mono">
                {/* Header */}
                <div className="border-b-2 border-gray-900 pb-5 mb-6">
                  <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-1">
                    Anubhav Kulshreshtha
                  </h1>
                  <p className="text-base font-semibold text-gray-500 mb-0.5">
                    Professional Stack Overflow Archaeologist · Senior Node.js
                    Whisperer, Junior Sleep Optimizer
                  </p>
                  <p className="text-xs text-gray-400 italic mb-3">
                    (Last name included. HR asked. I caved.)
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
                    <span>kulshreshtha.anubhav2003@gmail.com</span>
                    <a
                      href="https://github.com/anubhav1450"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-900 underline underline-offset-2"
                    >
                      github/anubhav1450
                    </a>
                    <a
                      href="https://www.linkedin.com/in/anubhav-kulshreshtha/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-900 underline underline-offset-2"
                    >
                      linkedin/anubhav-kulshreshtha
                    </a>
                    <span>Earth (third rock, the habitable one)</span>
                  </div>
                </div>

                {/* Objective */}
                <section className="mb-6">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-3 border-l-4 border-gray-900 pl-3">
                    Why You Should Hire Me (You Won&apos;t)
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Final-year CSE student who builds backends so scalable they
                    could survive a zombie apocalypse. Proficient in Java,
                    JavaScript, Docker, and convincing MongoDB that the schema
                    is totally fine. Has opinions about REST APIs. Strong ones.
                    Solved 500+ coding problems across platforms because
                    apparently I enjoy suffering — voluntarily. Net positive
                    human, would recommend.
                  </p>
                </section>

                {/* Experience */}
                <section className="mb-6">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-4 border-l-4 border-gray-900 pl-3">
                    Experience (The Months I Can&apos;t Get Back)
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-baseline mb-1 flex-wrap gap-1">
                        <div>
                          <span className="font-bold text-gray-900">
                            Software Engineer Intern
                          </span>
                          <span className="text-gray-400 mx-2">·</span>
                          <span className="text-gray-600">
                            Lighthouse Info Systems Pvt Ltd, Nagpur
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0 ml-4">
                          May 2025 – Jul 2025
                        </span>
                      </div>
                      <ul className="list-none space-y-1.5 text-sm text-gray-700 pl-1">
                        <li>
                          → Built 15+ REST APIs for an e-commerce backend.
                          Nobody told me there&apos;d be math involved.
                        </li>
                        <li>
                          → Implemented JWT + RBAC. Turns out &quot;secure&quot;
                          is not a personality trait you can inherit.
                        </li>
                        <li>
                          → Improved MongoDB query performance by 40% using
                          Mongoose schemas. Celebrated with chai.
                        </li>
                        <li>
                          → Achieved 100% Postman endpoint coverage. Postman was
                          very cooperative, unlike some people.
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Education */}
                <section className="mb-6">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-4 border-l-4 border-gray-900 pl-3">
                    Education (A Formality, With a CGPA)
                  </h2>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <div>
                      <span className="font-bold text-gray-900">
                        B.Tech · Computer Science &amp; Engineering
                      </span>
                      <span className="text-gray-400 mx-2">·</span>
                      <span className="text-gray-600">
                        GEC Bharatpur, Rajasthan
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 ml-4">
                      2022 – 2026
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1.5 italic pl-1">
                    CGPA: 8.5 — yes, real. Learned that theory and practice are
                    the same in theory. Still waiting for the theory to kick in.
                  </p>
                </section>

                {/* Skills */}
                <section className="mb-6">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-4 border-l-4 border-gray-900 pl-3">
                    Skills (Negotiable)
                  </h2>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-bold text-gray-900">Java:</span> My
                      first language. We have a complicated relationship. I
                      still call it.
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">
                        JavaScript:
                      </span>{" "}
                      Yes. Sometimes too much yes. Node.js at the back, React.js
                      at the front, chaos everywhere.
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">MongoDB:</span>{" "}
                      Schema-less by spec, schema-full by anxiety. I use
                      Mongoose. It helps.
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">Docker:</span>{" "}
                      It works on my machine™ is now contractually a container.
                      Ship it.
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">
                        REST APIs:
                      </span>{" "}
                      15+ built. All documented. All tested. Postman and I are
                      besties.
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">
                        AWS (EC2, S3):
                      </span>{" "}
                      Deployed to the cloud. The cloud was fine. My sanity was
                      less fine.
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">Git:</span>{" "}
                      <code className="bg-gray-100 px-1 rounded text-xs">
                        git push --force
                      </code>{" "}
                      is a love language. I&apos;m in therapy.
                    </p>
                  </div>
                </section>

                {/* Achievements */}
                <section className="mb-6">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-4 border-l-4 border-gray-900 pl-3">
                    Achievements (Peer-Reviewed by Me)
                  </h2>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    <li>
                      → Solved 500+ problems across LeetCode, CodeChef, and
                      GeeksforGeeks. Still can&apos;t reverse a linked list in
                      an interview without sweating.
                    </li>
                    <li>
                      → LeetCode peak rating: 1637. Not 1638. 1637. I don&apos;t
                      want to talk about it.
                    </li>
                    <li>
                      → Built a Real-Time Collaborative Code Editor — because
                      apparently Stack Overflow isn&apos;t collaborative enough.
                    </li>
                    <li>
                      → Coordinator of Python Programming Club: organized
                      workshops for 50+ students. They learned Python. I learned
                      patience.
                    </li>
                    <li>
                      → Read the documentation once. Twice felt like cheating.
                    </li>
                  </ul>
                </section>

                {/* Projects */}
                <section className="mb-6">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-4 border-l-4 border-gray-900 pl-3">
                    Projects (Things I Actually Built)
                  </h2>
                  <div className="space-y-4 text-sm text-gray-700">
                    <div>
                      <p className="font-bold text-gray-900">
                        Real Time Collaborative Code Editor
                      </p>
                      <p className="text-xs text-gray-500 mb-1">
                        React.js · Node.js · Socket.io · Yjs · Monaco Editor ·
                        Docker · AWS ECS
                      </p>
                      <p>
                        Multi-user real-time code editor with live execution,
                        deployed on AWS ECS. Built because pair programming over
                        Zoom calls was causing everyone emotional damage.
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        Hacker News Scraper
                      </p>
                      <p className="text-xs text-gray-500 mb-1">
                        Node.js · Express.js · React.js · MongoDB · JWT ·
                        Cheerio · Axios
                      </p>
                      <p>
                        Full-stack scraper with auth, bookmarking, and search.
                        Because Hacker News&apos;s own search was too easy to
                        use.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Footer / References */}
                <div className="border-t border-gray-200 pt-5 mt-4">
                  <p className="text-xs text-gray-400 text-center italic">
                    References: My mom thinks I&apos;m great. That counts,
                    right? &nbsp;·&nbsp; This resume was written with zero
                    embellishment and maximum dignity. &nbsp;·&nbsp; Last
                    updated: whenever I remembered to.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

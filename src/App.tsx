import About from "@/components/About";
import Contact from "@/components/Contact";
import CursorComet from "@/components/CursorComet";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import RealResumeOverlay from "@/components/RealResumeOverlay";
import ResumeOverlay from "@/components/ResumeOverlay";
import Skills from "@/components/Skills";
import StarField from "@/components/StarField";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

const queryClient = new QueryClient();

export default function App() {
  const [showResume, setShowResume] = useState(false);
  const [showRealResume, setShowRealResume] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        {!loaded && (
          <LoadingScreen key="loading" onDone={() => setLoaded(true)} />
        )}
      </AnimatePresence>
      <CursorComet />
      <StarField />
      <div className="relative z-10 min-h-screen bg-transparent text-foreground">
        <Nav />
        <main>
          <Hero
            onViewResume={() => setShowResume(true)}
            onViewRealResume={() => setShowRealResume(true)}
          />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
      <ResumeOverlay open={showResume} onClose={() => setShowResume(false)} />
      <RealResumeOverlay
        open={showRealResume}
        onClose={() => setShowRealResume(false)}
      />
      <Toaster />
    </QueryClientProvider>
  );
}

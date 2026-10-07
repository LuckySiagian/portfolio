import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { PortfolioProvider } from "./context/PortfolioContext.jsx";
import { useTheme } from "./hooks/useTheme.js";
import { useScrollReveal } from "./hooks/useScrollReveal.js";

function MainContent() {
  const { theme, toggle } = useTheme();

  // Scroll-reveal animations (disabled for users who prefer reduced motion).
  useScrollReveal();

  return (
    <div className="min-h-screen bg-canvas text-ink overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-cyan focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-bold focus:text-canvas"
      >
        Skip to content
      </a>
      <Navbar
        theme={theme}
        onToggleTheme={toggle}
      />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <MainContent />
    </PortfolioProvider>
  );
}

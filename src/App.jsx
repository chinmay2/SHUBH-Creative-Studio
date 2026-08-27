import React from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CreativeMarquee from "./components/CreativeMarquee";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";
import WhyShubh from "./components/WhyShubh";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ExperienceLayer from "./components/ExperienceLayer";
import PageProgress from "./components/PageProgress";
import SEO from "./components/SEO";

function App() {
  return (
    <div className="app">
      <SEO />
      <PageProgress />
      <ExperienceLayer />
      <Navbar />
      <main>
        <Hero />
        <CreativeMarquee />
        <About />
        <Services />
        <Portfolio />
        <WhyShubh />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

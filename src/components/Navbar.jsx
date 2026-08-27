import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Home", target: "home" }, { label: "About", target: "about" }, { label: "Services", target: "services" },
  { label: "Portfolio", target: "portfolio" }, { label: "Pricing", target: "pricing" }, { label: "Contact", target: "contact" }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 35);
      const marker = window.scrollY + 180; let current = "home";
      links.forEach(({ target }) => { const section = document.getElementById(target); if (section && section.offsetTop <= marker) current = target; });
      setActive(current);
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (target) => { document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" }); setMenuOpen(false); };

  return (
    <motion.header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
      <div className="navbar-inner">
        <button className="brand magnetic-target" onClick={() => navigate("home")} aria-label="Shubh Creative Studio home">
          <img className="brand-logo" src="/images/shubh-logo-mark.png" alt="Shubh Creative Studio logo" />
          <span className="brand-wordmark"><span className="brand-main">SHUBH</span><span className="brand-sub">CREATIVE STUDIO</span></span>
        </button>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
          {links.map((link) => <button className={`${active === link.target ? "active" : ""} magnetic-target`} key={link.target} onClick={() => navigate(link.target)}>{link.label}</button>)}
        </nav>
        <button className="nav-cta magnetic-target" onClick={() => navigate("contact")}><span>Start a Project</span><span>↗</span></button>
        <button className={`mobile-menu magnetic-target ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}><span /><span /></button>
      </div>
    </motion.header>
  );
}

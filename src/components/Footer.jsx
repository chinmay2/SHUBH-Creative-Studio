import React from "react";
import site from "../data/site.json";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand-block">
        <img className="footer-logo" src="/images/shubh-logo-transparent.png" alt="Shubh Creative Studio logo" />
        <div><strong>{site.brand.name}</strong><p>{site.brand.tagline}</p></div>
      </div>
      <div className="footer-links" aria-label="Footer navigation">
        <a href="#home">Home</a><a href="#about">About</a><a href="#services">Services</a><a href="#portfolio">Portfolio</a><a href="#pricing">Pricing</a><a href="#contact">Contact</a>
      </div>
      <small>© {new Date().getFullYear()} {site.brand.name}. All rights reserved.</small>
    </footer>
  );
}

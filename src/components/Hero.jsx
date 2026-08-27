import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import websiteContent from "../content/websiteContent";

const orbitClasses = ["card-a", "card-b", "card-c", "card-d"];

function Hero() {
  const { hero } = websiteContent;
  const visual = hero.visual;
  const visualRef = useRef(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(springX, [-1, 1], [-8, 8]);
  const rotateX = useTransform(springY, [-1, 1], [8, -8]);
  const glowX = useTransform(springX, [-1, 1], [42, 58]);
  const glowY = useTransform(springY, [-1, 1], [42, 58]);

  const handlePointerMove = (event) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width * 2 - 1);
    pointerY.set((event.clientY - rect.top) / rect.height * 2 - 1);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className="hero" id="home">
      <div className="hero-grid">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="hero-eyebrow">{hero.eyebrow}</div>

          <h1>
            {hero.title.normal}<br />
            <span>{hero.title.highlight}</span><br />
            <span>{hero.title.ending}</span>
          </h1>

          <p className="hero-description">{hero.description}</p>

          <div className="hero-services">
            {hero.services.split(" • ").map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>

          <div className="hero-buttons">
            <a href="#portfolio" className="btn btn-primary">
              {hero.primaryButton}<span>↗</span>
            </a>
            <a href="#contact" className="btn btn-secondary">
              {hero.secondaryButton}<span>↗</span>
            </a>
          </div>

          <div className="hero-meta">
            <span>01 / Creative Direction</span>
            <span>02 / Visual Identity</span>
            <span>03 / Brand Content</span>
          </div>
        </motion.div>

        <motion.div
          ref={visualRef}
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.86, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          <motion.div
            className="hero-3d-stage"
            style={{ rotateX, rotateY }}
          >
            <motion.div
              className="hero-glow"
              style={{ left: `${glowX}%`, top: `${glowY}%` }}
            />

            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbit orbit-four" />

            <motion.div
              className="orbit-dot dot-one"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="orbit-dot dot-two"
              animate={{ rotate: -360 }}
              transition={{ duration: 21, repeat: Infinity, ease: "linear" }}
            />

            <div className="hero-core">
              <div className="core-halo" />
              <div className="core-ring" />
              <div className="core-ring core-ring-two" />
              <div className="core-content">
                <img className="hero-logo-mark" src="/images/shubh-logo-mark.png" alt="Shubh Creative Studio logo" />
                <span className="core-small">{visual.brand}</span>
                <strong>{visual.title.split("\n").map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</strong>
                <span className="core-line" />
                <small>{visual.footer}</small>
              </div>
            </div>

            <motion.div className="hero-orbiting-labels" animate={{ rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }}>
              {visual.orbitLabels.map((label, index) => (
                <div key={label} className={`orbital-card ${orbitClasses[index]}`}>
                  <span>{label}</span>
                  <i />
                </div>
              ))}
            </motion.div>

            <span className="hero-float float-left">{visual.floatingLabels.left.split("\n").map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</span>
            <span className="hero-float float-right">{visual.floatingLabels.right.split("\n").map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</span>
            <span className="hero-float float-top">{visual.floatingLabels.top}</span>
            <span className="hero-float float-bottom">{visual.floatingLabels.bottom}</span>

            <div className="hero-stamp">{visual.stamp.split("\n").map((line, index) => index === 1 ? <React.Fragment key={line}><br /><b>{line}</b></React.Fragment> : <React.Fragment key={line}>{line}</React.Fragment>)}</div>
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-scroll">{visual.scrollLabel} <span>↓</span></div>
      <div className="hero-corner-note">{visual.cursorNote}<br /><span>TO EXPLORE</span></div>
    </section>
  );
}

export default Hero;

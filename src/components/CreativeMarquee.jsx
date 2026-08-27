import React from "react";
import { motion } from "framer-motion";
import websiteContent from "../content/websiteContent";

export default function CreativeMarquee() {
  const items = websiteContent.hero.services.split(" • ");
  const sequence = [...items, ...items, ...items];

  return (
    <section className="creative-marquee" aria-label="Creative services">
      <motion.div
        className="marquee-track"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {sequence.map((item, index) => (
          <React.Fragment key={`${item}-${index}`}>
            <span>{item}</span>
            <i>✦</i>
          </React.Fragment>
        ))}
      </motion.div>
    </section>
  );
}

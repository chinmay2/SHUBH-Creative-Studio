import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, intro }) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <span className="gold-line" />
      {intro && <p>{intro}</p>}
    </motion.div>
  );
}
import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import why from "../data/whyShubh.json";

export default function WhyShubh() {
  return (
    <section id="why-shubh" className="section-shell why-section">
      <div className="why-intro">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} />
        <div className="why-big-word">SHUBH<span>.</span></div>
      </div>
      <div className="why-list">
        {why.items.map((item, index) => (
          <motion.div
            className="why-row"
            key={item.number}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ x: 8 }}
          >
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <b>↗</b>
          </motion.div>
        ))}
      </div>
      <div className="closing-statement">{why.closingLine}</div>
    </section>
  );
}

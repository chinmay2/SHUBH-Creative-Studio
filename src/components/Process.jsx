import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import process from "../data/process.json";

export default function Process() {
  return (
    <section className="section-shell process-section">
      <SectionHeading eyebrow={process.eyebrow} title={process.title} />
      <div className="process-track">
        {process.steps.map((step, index) => (
          <motion.article
            className="process-step"
            key={step.number}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="process-step-top"><span>{step.number}</span><i>→</i></div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

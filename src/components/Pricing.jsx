import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import pricing from "../data/pricing.json";
import websiteContent from "../content/websiteContent";

export default function Pricing() {
  const phase3 = websiteContent.phase3;

  return (
    <section id="pricing" className="section-shell pricing-section">
      <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} intro={pricing.intro} />
      <div className="pricing-grid">
        {pricing.groups.map((group, index) => (
          <motion.div
            className={`price-group ${index === 1 ? "price-group-featured" : ""}`}
            key={group.category}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="price-header">
              <div className="price-category">{group.category}</div>
              {index === 1 && <span className="price-featured">{phase3.pricingFeaturedLabel}</span>}
            </div>
            {group.items.map((item) => (
              <div className="price-item" key={item.service}>
                <div><h3>{item.service}</h3><p>{item.description}</p></div>
                <strong>{item.price}</strong>
              </div>
            ))}
            <a href="#contact" className="price-cta">{phase3.pricingCta} <span>↗</span></a>
          </motion.div>
        ))}
      </div>
      <p className="pricing-note">{pricing.note}</p>
    </section>
  );
}

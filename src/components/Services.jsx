import React from "react";
import { motion } from "framer-motion";
import websiteContent from "../content/websiteContent";

const accents = ["01", "02", "03", "04", "05", "06"];

function Services() {
  const { services } = websiteContent;

  return (
    <section className="services section" id="services">
      <div className="services-headline-row">
        <div className="section-heading services-heading">
          <span className="section-eyebrow">{services.eyebrow} / SERVICES</span>
          <h2>{services.title}</h2>
          <span className="gold-line" />
        </div>
        <p className="services-side-note">Visual systems, campaigns and everyday creative that keep your brand looking consistent.</p>
      </div>

      <div className="services-list">
        {services.items.map((service, index) => (
          <motion.article
            className="service-row"
            key={service.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ x: 6 }}
          >
            <span className="service-row-number">{accents[index] || String(index + 1).padStart(2, "0")}</span>
            <div className="service-row-main">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
            <div className="service-row-art" aria-hidden="true">
              <span>{service.title.split(" ").slice(0, 2).join(" ")}</span>
            </div>
            <span className="service-row-arrow">↗</span>
          </motion.article>
        ))}
      </div>

      <p className="services-footer">{services.footerLine}</p>
    </section>
  );
}

export default Services;

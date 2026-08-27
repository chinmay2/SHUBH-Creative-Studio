import React, { useState } from "react";
import { ArrowUpRight, Instagram, MessageCircle, Phone, Send } from "lucide-react";
import site from "../data/site.json";
import websiteContent from "../content/websiteContent";

export default function Contact() {
  const [form, setForm] = useState({ name: "", service: "Graphic Design", budget: "", message: "" });

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const text = [
      "Hi Shubh Creative Studio!",
      `Name: ${form.name || "Not provided"}`,
      `Service: ${form.service}`,
      `Budget: ${form.budget || "Not decided"}`,
      `Project details: ${form.message || "I would like to discuss a project."}`,
    ].join("\n");
    window.open(`https://wa.me/${site.contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <div className="contact-copy">
          <span className="eyebrow">07 / CONTACT</span>
          <h2>Ready to elevate<br /><em>your brand?</em></h2>
          <p>Send your content + reference + deadline. Let’s create something that fits your brand.</p>

          <div className="contact-cards">
            <a className="contact-card" href={`https://wa.me/${site.contact.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" aria-label="Contact Shubh Creative Studio on WhatsApp">
              <Phone />
              <span>Call / WhatsApp</span>
              <strong>{site.contact.phone}</strong>
              <ArrowUpRight />
            </a>
            <a className="contact-card" href={site.contact.instagramUrl} target="_blank" rel="noreferrer" aria-label="Visit Shubh Creative Studio on Instagram">
              <Instagram />
              <span>Instagram</span>
              <strong>{site.contact.instagram}</strong>
              <ArrowUpRight />
            </a>
            <div className="contact-card founder-card">
              <span>Founder</span>
              <strong>{site.brand.founder}</strong>
              <MessageCircle />
            </div>
          </div>
          <div className="contact-bottom">{websiteContent.contact.description}</div>
        </div>

        <form className="project-form" onSubmit={submit}>
          <div className="form-heading">
            <span>START A PROJECT</span>
            <strong>Tell us what you need.</strong>
          </div>
          <label>Name<input name="name" value={form.name} onChange={update} placeholder="Your name" autoComplete="name" /></label>
          <div className="form-row">
            <label>Service<select name="service" value={form.service} onChange={update}><option>Graphic Design</option><option>Branding</option><option>Social Media Creatives</option><option>Print Design</option><option>Photo Creative Edit</option><option>Other</option></select></label>
            <label>Budget<select name="budget" value={form.budget} onChange={update}><option value="">Select</option><option>Under ₹500</option><option>₹500 – ₹1,000</option><option>₹1,000 – ₹2,500</option><option>₹2,500+</option><option>Let’s discuss</option></select></label>
          </div>
          <label>Project details<textarea name="message" value={form.message} onChange={update} placeholder="Tell us about your project, deadline or reference..." rows="4" /></label>
          <button className="form-submit" type="submit"><span>Send on WhatsApp</span><Send size={15} /></button>
          <small>No payment required. This simply opens a pre-filled WhatsApp message.</small>
        </form>
      </div>
    </section>
  );
}

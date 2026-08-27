import React from "react";
import websiteContent from "../content/websiteContent";

function About() {
  const { about } = websiteContent;

  return (
    <section className="about section" id="about">

      <div className="section-heading">

        <span className="section-eyebrow">
          {about.eyebrow}
        </span>

        <h2>
          {about.title}
        </h2>

      </div>

      <div className="about-content">

        <div className="about-number">
          01
        </div>

        <div className="about-text">

          <p>
            {about.description}
          </p>

          <a
            href="#services"
            className="text-link"
          >
            {about.button}
            <span>↗</span>
          </a>

        </div>

      </div>

    </section>
  );
}

export default About;
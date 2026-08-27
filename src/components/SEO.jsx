import { useEffect } from "react";
import site from "../data/site.json";
import websiteContent from "../content/websiteContent";

const description = "Shubh Creative Studio creates graphic design, branding, social media creatives and print design for brands that want to look ready.";

export default function SEO() {
  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = `${origin}${window.location.pathname === "/" ? "/" : window.location.pathname}`;
    const imageUrl = `${origin}/images/shubh-og.jpg`;
    document.title = `${site.brand.name} | Graphic Design, Branding & Creative Studio`;

    const setMeta = (name, content, property = false) => {
      const attr = property ? "property" : "name";
      let node = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!node) { node = document.createElement("meta"); node.setAttribute(attr, name); document.head.appendChild(node); }
      node.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta("theme-color", "#070d1d");
    setMeta("author", site.brand.name);
    setMeta("keywords", "graphic design studio, branding studio, creative studio, social media creatives, print design, logo design, brand identity, Shubh Creative Studio");
    setMeta("og:type", "website", true);
    setMeta("og:title", `${site.brand.name} | Graphic Design, Branding & Creative Studio`, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", imageUrl, true);
    setMeta("og:site_name", site.brand.name, true);
    setMeta("og:locale", "en_IN", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", `${site.brand.name} | Graphic Design, Branding & Creative Studio`);
    setMeta("twitter:description", description);
    setMeta("twitter:image", imageUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", "@id": `${origin}/#organization`, name: site.brand.name, url: origin, logo: `${origin}/images/shubh-logo-transparent.png`, description, founder: { "@type": "Person", name: site.brand.founder }, sameAs: [site.contact.instagramUrl], contactPoint: { "@type": "ContactPoint", telephone: site.contact.phone, contactType: "customer service" } },
        { "@type": "WebSite", "@id": `${origin}/#website`, url: origin, name: site.brand.name, description, publisher: { "@id": `${origin}/#organization` } },
        { "@type": "WebPage", "@id": `${canonicalUrl}#webpage`, url: canonicalUrl, name: `${site.brand.name} | Graphic Design, Branding & Creative Studio`, description, isPartOf: { "@id": `${origin}/#website` }, about: { "@id": `${origin}/#organization` } },
        { "@type": "ItemList", name: "Shubh Creative Studio services", itemListElement: websiteContent.services.items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, description: item.description })) }
      ]
    };
    let script = document.getElementById("shubh-structured-data");
    if (!script) { script = document.createElement("script"); script.id = "shubh-structured-data"; script.type = "application/ld+json"; document.head.appendChild(script); }
    script.textContent = JSON.stringify(schema);
  }, []);
  return null;
}

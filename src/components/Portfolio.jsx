import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import portfolio from "../data/portfolio.json";
import websiteContent from "../content/websiteContent";

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("");

  const move = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1100px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg) translateY(-7px)`);
  };

  return (
    <div ref={ref} className={className} onMouseMove={move} onMouseLeave={() => setTransform("")} style={{ transform }}>
      {children}
    </div>
  );
}

function PortfolioViewer({ items, activeIndex, onClose, onChange }) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const dragStart = useRef(null);
  const pinchStart = useRef(null);
  const pointers = useRef(new Map());
  const stageRef = useRef(null);
  const item = items[activeIndex];

  const reset = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const changeZoom = useCallback((amount, focus = null) => {
    setZoom((current) => {
      const next = Math.min(4, Math.max(1, +(current + amount).toFixed(2)));
      if (focus && next !== current) {
        const ratio = next / current;
        setPosition((p) => ({ x: focus.x - (focus.x - p.x) * ratio, y: focus.y - (focus.y - p.y) * ratio }));
      }
      return next;
    });
  }, []);

  useEffect(() => reset(), [activeIndex, reset]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onChange((activeIndex - 1 + items.length) % items.length);
      if (event.key === "ArrowRight") onChange((activeIndex + 1) % items.length);
      if (event.key === "+" || event.key === "=") changeZoom(0.25);
      if (event.key === "-") changeZoom(-0.25);
      if (event.key === "0") reset();
      if (event.key === "f" || event.key === "F") setFullscreen((v) => !v);
      if (event.key === "Escape") setFullscreen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("portfolio-viewer-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("portfolio-viewer-open");
    };
  }, [activeIndex, items.length, changeZoom, onChange, onClose, reset]);

  const wheel = (event) => {
    event.preventDefault();
    const rect = stageRef.current?.getBoundingClientRect();
    const focus = rect ? { x: event.clientX - rect.left - rect.width / 2, y: event.clientY - rect.top - rect.height / 2 } : null;
    changeZoom(event.deltaY > 0 ? -0.12 : 0.12, focus);
  };

  const pointerDown = (event) => {
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    setShowHint(false);
    event.currentTarget.setPointerCapture?.(event.pointerId);

    if (pointers.current.size === 2) {
      const points = [...pointers.current.values()];
      pinchStart.current = {
        distance: Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y),
        zoom,
      };
      setDragging(false);
      dragStart.current = null;
      return;
    }

    if (zoom > 1) {
      setDragging(true);
      dragStart.current = { x: event.clientX - position.x, y: event.clientY - position.y };
    }
  };

  const pointerMove = (event) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size === 2 && pinchStart.current) {
      const points = [...pointers.current.values()];
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      const next = Math.min(4, Math.max(1, +(pinchStart.current.zoom * (distance / pinchStart.current.distance)).toFixed(2)));
      setZoom(next);
      return;
    }

    if (!dragging || !dragStart.current || zoom <= 1) return;
    setPosition({ x: event.clientX - dragStart.current.x, y: event.clientY - dragStart.current.y });
  };

  const pointerUp = (event) => {
    pointers.current.delete(event?.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    setDragging(false);
    dragStart.current = null;
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`portfolio-viewer ${fullscreen ? "viewer-fullscreen" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} preview`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      >
        <motion.div className="portfolio-viewer-shell" initial={{ y: 24, scale: 0.975 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: 0.975 }}>
          <header className="portfolio-viewer-header">
            <div className="viewer-title">
              <span>{item.category}</span>
              <h3>{item.title}</h3>
            </div>
            <div className="viewer-header-actions">
              <button onClick={() => setFullscreen((v) => !v)} aria-label="Toggle fullscreen"><Expand size={17} /></button>
              <button className="viewer-close" onClick={onClose} aria-label="Close preview"><X size={19} /></button>
            </div>
          </header>

          <div className="portfolio-viewer-stage" ref={stageRef}>
            {showHint && (
              <div className="viewer-gesture-hint" aria-hidden="true">
                <span>SCROLL</span><i /> <span>ZOOM</span><i /> <span>DRAG</span><i /> <span>EXPLORE</span>
              </div>
            )}
            <button className="viewer-nav viewer-nav-left" onClick={() => onChange((activeIndex - 1 + items.length) % items.length)} aria-label="Previous project"><ChevronLeft size={23} /></button>
            <div className={`portfolio-viewer-canvas ${zoom > 1 ? "is-zoomed" : ""} ${dragging ? "is-dragging" : ""}`} onWheel={wheel} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onDoubleClick={() => changeZoom(1)}>
              <div className="portfolio-viewer-art" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})` }}>
                <img src={item.image} alt={item.title} draggable="false" className={item.fit === "contain" ? "fit-contain" : ""} />
              </div>
              <div className="viewer-zoom-badge">{Math.round(zoom * 100)}%</div>
            </div>
            <button className="viewer-nav viewer-nav-right" onClick={() => onChange((activeIndex + 1) % items.length)} aria-label="Next project"><ChevronRight size={23} /></button>
          </div>

          <div className="viewer-project-meta">
            <p>{item.description}</p>
            <div className="viewer-project-index"><strong>{item.n}</strong><span> / {String(items.length).padStart(2, "0")}</span></div>
          </div>

          <footer className="portfolio-viewer-footer">
            <div className="viewer-help">Scroll / pinch to zoom · drag to pan · double-click to zoom · F fullscreen</div>
            <div className="viewer-controls">
              <button onClick={() => changeZoom(-0.25)} aria-label="Zoom out"><Minus size={15} /></button>
              <span>{Math.round(zoom * 100)}%</span>
              <button onClick={() => changeZoom(0.25)} aria-label="Zoom in"><Plus size={15} /></button>
              <button onClick={reset} aria-label="Reset zoom"><RotateCcw size={14} /></button>
              <button onClick={() => setZoom(4)} aria-label="Maximum zoom"><Maximize2 size={14} /></button>
            </div>
          </footer>

          <div className="viewer-thumbnails" aria-label="Portfolio projects">
            {items.map((thumb, index) => (
              <button key={thumb.title} className={index === activeIndex ? "active" : ""} onClick={() => onChange(index)} aria-label={`Show ${thumb.title}`}>
                <img src={thumb.image} alt="" />
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Portfolio() {
  const items = portfolio.items || [];
  const phase3 = websiteContent.phase3;
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const categories = useMemo(() => ["ALL", ...new Set(items.map((item) => item.category.split(" /")[0]))], [items]);
  const visibleItems = activeCategory === "ALL" ? items : items.filter((item) => item.category.startsWith(activeCategory));

  return (
    <section id="portfolio" className="section-shell portfolio-section">
      <div className="portfolio-topline">
        <SectionHeading eyebrow={portfolio.eyebrow} title={portfolio.title} intro={portfolio.intro} />
        <div className="portfolio-index">06<br /><span>{phase3.portfolioIndex}</span></div>
      </div>

      <div className="portfolio-toolbar">
        <div className="portfolio-filters" role="tablist" aria-label="Filter portfolio">
          {categories.map((category) => (
            <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)}>{category}</button>
          ))}
        </div>
        <div className="portfolio-interaction-hint"><span className="hint-pulse" /><span>Click a design to inspect</span><span className="hint-key">ZOOM · PAN · EXPLORE</span></div>
      </div>

      <div className="portfolio-grid portfolio-editorial-grid">
        {visibleItems.map((item, index) => {
          const originalIndex = items.indexOf(item);
          return (
            <TiltCard key={item.title} className={`portfolio-card portfolio-editorial-card ${item.featured ? "portfolio-card-featured" : ""}`}>
              <motion.article initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}>
                <button className="portfolio-visual portfolio-visual-button" onClick={() => setActiveIndex(originalIndex)} aria-label={`Open ${item.title} for detailed preview`}>
                  <img src={item.image} alt={`${item.title} — ${item.category} by SHUBH Creative Studio`} loading="lazy" decoding="async" className={item.fit === "contain" ? "fit-contain" : ""} />
                  <div className="portfolio-image-shade" />
                  <div className="portfolio-overlay"><span className="portfolio-overlay-category">{item.category}</span><strong>{item.title}</strong><span className="portfolio-overlay-arrow"><Maximize2 size={17} /></span></div>
                  <div className="portfolio-corner-number">{item.n}</div>
                  <div className="portfolio-hover-line" />
                  <span className="portfolio-open-label">OPEN · INSPECT ↗</span>
                </button>
                <div className="portfolio-card-info">
                  <div><span>{item.category}</span><h3>{item.title}</h3><p>{item.description}</p></div>
                  <button className="portfolio-view-button" onClick={() => setActiveIndex(originalIndex)}>VIEW PROJECT <em>↗</em></button>
                </div>
              </motion.article>
            </TiltCard>
          );
        })}
      </div>

      <div className="portfolio-footer-note"><span>MORE WORK</span><p>New projects, campaigns and visual identities can be added to the same content file without changing the portfolio layout.</p></div>

      {activeIndex !== null && <PortfolioViewer items={items} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onChange={setActiveIndex} />}
    </section>
  );
}

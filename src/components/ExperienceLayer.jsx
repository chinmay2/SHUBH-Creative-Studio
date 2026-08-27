import React, { useEffect, useRef, useState } from "react";

export default function ExperienceLayer() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) {
      setHidden(true);
      return undefined;
    }

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      document.documentElement.style.setProperty("--cursor-x", `${x}px`);
      document.documentElement.style.setProperty("--cursor-y", `${y}px`);

      if (!raf) {
        raf = requestAnimationFrame(() => {
          rx += (x - rx) * 0.18;
          ry += (y - ry) * 0.18;
          if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
          raf = 0;
        });
      }
    };

    const over = (event) => {
      const target = event.target.closest("a, button, .portfolio-editorial-card, .service-row");
      setActive(Boolean(target));
    };

    const leave = () => setActive(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);

    const magnetic = Array.from(document.querySelectorAll(".magnetic-target"));
    const onMagneticMove = (event) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.12;
      const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.12;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    const onMagneticLeave = (event) => { event.currentTarget.style.transform = ""; };
    magnetic.forEach((el) => {
      el.addEventListener("pointermove", onMagneticMove);
      el.addEventListener("pointerleave", onMagneticLeave);
    });

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      magnetic.forEach((el) => {
        el.removeEventListener("pointermove", onMagneticMove);
        el.removeEventListener("pointerleave", onMagneticLeave);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div ref={ringRef} className={`cursor-ring ${active ? "cursor-active" : ""}`} aria-hidden="true" />
      <div ref={cursorRef} className={`cursor-dot ${active ? "cursor-dot-active" : ""}`} aria-hidden="true">
        <span>↗</span>
      </div>
    </>
  );
}

// src/pages/blog/blog-hero.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function BlogHero() {
  const slides = useMemo(
    () => [
      { src: "/blog/hero-1.png", alt: "Blog hero 1" },
      { src: "/blog/hero-2.png", alt: "Blog hero 2" },
      { src: "/blog/hero-3.png", alt: "Blog hero 3" },
      { src: "/blog/hero-4.png", alt: "Blog hero 4" },
    ],
    []
  );

  const AUTO_MS = 20000;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goNext = () => setIndex((p) => (p + 1) % slides.length);
  const goPrev = () => setIndex((p) => (p - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (isPaused) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, AUTO_MS);
    return () => timerRef.current && clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, index, slides.length]);

  return (
    <section
      aria-label="Blog hero carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={styles.section}
    >
      <div style={styles.frame}>
        <div
          style={{
            ...styles.track,
            width: `${slides.length * 100}%`,
            transform: `translateX(-${index * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((s, i) => (
            <div key={i} style={{ ...styles.slide, width: `${100 / slides.length}%` }}>
              {/* ✅ full image: no crop */}
              <img src={s.src} alt={s.alt} draggable="false" style={styles.image} />
            </div>
          ))}
        </div>

        {/* arrows */}
        <button type="button" aria-label="Previous" onClick={goPrev} style={{ ...styles.arrow, left: 12 }}>
          ‹
        </button>
        <button type="button" aria-label="Next" onClick={goNext} style={{ ...styles.arrow, right: 12 }}>
          ›
        </button>

        {/* dots */}
        <div style={styles.dotsOuter}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              style={{ ...styles.dot, ...(i === index ? styles.dotActive : null) }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    width: "100%",
    padding: "18px 0",
  },
  frame: {
    position: "relative",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    background: "#0b0f1a",
  },

  // ✅ height removed (auto layout)
  track: {
    display: "flex",
    transition: "transform 450ms ease",
    willChange: "transform",
  },

  // ✅ slide auto height
  slide: {
    flex: "0 0 auto",
    background: "#0b0f1a",
  },

  // ✅ THIS is the key: full image never cut
  image: {
    width: "100%",
    height: "500px",       // ✅ auto height
    display: "block",
    objectFit: "unset",   // ✅ no cropping logic
    userSelect: "none",
  },

  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    height: "44px",
    width: "44px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.35)",
    background: "rgba(0,0,0,0.35)",
    color: "#fff",
    fontSize: "30px",
    lineHeight: "40px",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    backdropFilter: "blur(6px)",
    zIndex: 2,
  },

  dotsOuter: {
    position: "absolute",
    left: "50%",
    bottom: "10px",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "8px",
    padding: "8px 10px",
    borderRadius: "999px",
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(6px)",
    zIndex: 2,
  },

  dot: {
    height: "10px",
    width: "10px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.45)",
    background: "rgba(255,255,255,0.25)",
    cursor: "pointer",
    padding: 0,
  },
  dotActive: {
    background: "rgba(255,255,255,0.9)",
  },
};

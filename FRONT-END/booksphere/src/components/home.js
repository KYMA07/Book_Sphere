import React, { useEffect, useRef } from "react";
import "../css/styles.css";

export default function Home() {
  const wrapperRef = useRef(null);

  // Mouse-follow spotlight
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };

    const onTouch = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = el.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  const candles = Array.from({ length: 12 });
  const motes = Array.from({ length: 18 });

  return (
    <div className="magic-library" ref={wrapperRef}>
      {/* Background */}
      <div className="background-container" aria-hidden />

      {/* Candles */}
      <div className="candle-layer" aria-hidden>
        {candles.map((_, i) => (
          <div key={i} className={`floating-candle candle-${i + 1}`}>
            <div className="flame" />
          </div>
        ))}
      </div>

      {/* Dust motes */}
      <div className="motes-layer" aria-hidden>
        {motes.map((_, i) => (
          <span key={i} className={`mote m${(i % 12) + 1}`} />
        ))}
      </div>

      {/* Foreground content */}
      <div className="content-wrap">
       
        <main className="hero">
          <h1 className="greeting-title magic-hover">
           Booksphere 
          </h1>
          <p className="greeting-sub">
            instructions etc
          </p>
        </main>

       
      </div>
    </div>
  );
}

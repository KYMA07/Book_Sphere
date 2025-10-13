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
        {/* Header */}
        <header className="header">
          <div className="brand-group">
            <div className="logo">BookSphere</div>
            <div className="tagline-in-header">Where Every Page Opens a New World</div>
          </div>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#books">Books</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        {/* Centered Greeting Title */}
        <main className="hero">
          <h1 className="greeting-title magic-hover">
           welcome ahhh ang hirap
          </h1>
          <p className="greeting-sub">
            hogwarts yarn
          </p>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <span>&copy; 2025 BookSphere Inc. All rights reserved.</span>
            <div>
              <a href="#privacy" className="footer-link">Privacy Policy</a>
              <a href="#terms" className="footer-link">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

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
          <h1 className="greeting-title magic-hover">Booksphere</h1>
          <p className="greeting-sub">
            Your gateway to borrowing, returning, and managing library books with ease.
          </p>
        </main>

                {/* Instructions Section */}
        <section className="instructions">
          <h2>How the Appointment System Works</h2>
          <p>
            Booksphere uses an appointment-based system to keep borrowing and returning
            organized, fair, and efficient. Here’s how it works step by step:
          </p>

          <h3>Borrowing a Book</h3>
          <ul>
            <li><strong>Step 1:</strong> Browse the catalog and choose an available book.</li>
            <li><strong>Step 2:</strong> Schedule a <em>Borrow Appointment</em> by selecting a date and time.</li>
            <li><strong>Step 3:</strong> The librarian reviews your request. If approved, the status changes to <em>Ready for Pickup</em>.</li>
            <li><strong>Step 4:</strong> On your appointment date, pick up the book. Once collected, the status becomes <em>Picked Up</em>.</li>
          </ul>

          <h3>Returning a Book</h3>
          <ul>
            <li><strong>Step 1:</strong> From your dashboard, select the book you borrowed and click <em>Request Return</em>.</li>
            <li><strong>Step 2:</strong> Choose a date and time for your return appointment.</li>
            <li><strong>Step 3:</strong> The librarian approves your request. The status changes to <em>Approved Return</em>.</li>
            <li><strong>Step 4:</strong> Bring the book back on the scheduled date. The librarian confirms it as <em>Returned</em>.</li>
          </ul>

          <h3>Tracking Your Appointments</h3>
          <ul>
            <li>All upcoming, active, and past appointments are visible in your personal dashboard.</li>
            <li>You’ll see statuses like <em>Pending</em>, <em>Approved</em>, <em>Ready for Pickup</em>, <em>Picked Up</em>, <em>Awaiting Return</em>, and <em>Returned</em>.</li>
            <li>Reminders and overdue notices appear automatically if deadlines are approaching or missed.</li>
          </ul>

          <h2>Penalty Policy</h2>
          <ul>
            <li><strong>Overdue Fee:</strong> ₱15 per day after the due date.</li>
            <li><strong>One Month Overdue:</strong> The book is considered lost.</li>
            <li><strong>Loss Fee:</strong> ₱200 per lost book.</li>
            <li><strong>Three Lost Books:</strong> Recorded as a <em>minor offense</em> in the student’s record.</li>
          </ul>

          <p className="reminder">
            Always respect your scheduled appointments and due dates. This ensures smooth
            operations for everyone and helps keep the library resources available to all.
          </p>
        </section>
      </div>
    </div>
  );
}
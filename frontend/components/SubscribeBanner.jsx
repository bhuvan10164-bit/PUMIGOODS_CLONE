"use client"
import { useState } from "react";

const BG_IMAGE = "https://pumigoods.com/wp-content/uploads/2025/07/Slider.webp";

export default function SubscribeBanner() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .subscribe-banner-wrapper {
          position: relative;
          width: 100%;
          height: 110px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .subscribe-content-row {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        .subscribe-heading {
          font-family: 'Open Sans', Arial, sans-serif;
          font-size: 22px;
          font-weight: 400;
          color: #1e2d20;
          white-space: nowrap;
          margin: 0;
          letter-spacing: 0.01em;
        }

        .subscribe-input-group {
          display: flex;
          flex-shrink: 0;
        }

        .subscribe-input {
          width: 280px;
          padding: 12px 16px;
          font-size: 14px;
          font-family: 'Open Sans', Arial, sans-serif;
          border-right: none;
          outline: none;
          color: #555;
          background: rgba(255,255,255,0.95);
          border-radius: 0;
          transition: border-color 0.2s ease;
        }

        .subscribe-btn {
          padding: 12px 24px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-family: 'Open Sans', Arial, sans-serif;
          color: #fff;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          border-radius: 0;
          transition: background 0.2s ease;
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .subscribe-banner-wrapper {
            height: auto;
            min-height: 160px;
            align-items: stretch;
          }

          .subscribe-content-row {
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding: 24px 20px 22px;
            gap: 16px;
          }

          .subscribe-heading {
            font-size: 20px;
            white-space: normal;
            line-height: 1.4;
          }

          .subscribe-input-group {
            width: 100%;
          }

          .subscribe-input {
            width: 100%;
            flex: 1;
            min-width: 0;
            font-size: 13px;
            padding: 11px 14px;
          }

          .subscribe-btn {
            padding: 11px 20px;
            font-size: 11px;
            flex-shrink: 0;
          }
        }
      `}</style>

      <div className="subscribe-banner-wrapper">
        {/* Background image */}
        <img
          src={BG_IMAGE}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            zIndex: 0,
          }}
        />

        {/* Light white wash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.45)",
            zIndex: 1,
          }}
        />

        {/* Content row */}
        <div className="subscribe-content-row">
          {/* Heading */}
          <p className="subscribe-heading">
            Hey you, Subscribe and connect to{" "}
            <span style={{ color: "#3a9e5f", fontWeight: "600" }}>PumiGoods</span>
          </p>

          {/* Email + Button */}
          <div className="subscribe-input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="Your email address"
              className="subscribe-input"
              style={{
                border: `1.5px solid ${focused ? "#5aad78" : "#d0d0d0"}`,
              }}
            />
            <button
              onClick={handleSubscribe}
              className="subscribe-btn"
              style={{
                background: submitted ? "#3a7d52" : "#5aad78",
              }}
              onMouseEnter={(e) => { if (!submitted) e.currentTarget.style.background = "#4a9a68"; }}
              onMouseLeave={(e) => { if (!submitted) e.currentTarget.style.background = submitted ? "#3a7d52" : "#5aad78"; }}
            >
              {submitted ? "✓ Done!" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
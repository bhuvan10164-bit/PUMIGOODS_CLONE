"use client";
import { useState } from "react";

const BG_IMAGE = "https://pumigoods.com/wp-content/uploads/2025/07/Slider.webp";

const FALLBACK_BG =
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1600&h=600&fit=crop";

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.836L2.002 2.25h6.945l4.261 5.636L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [bgErr, setBgErr] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

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
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@700;800&family=Open+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "480px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <img
          src={bgErr ? FALLBACK_BG : BG_IMAGE}
          alt=""
          onError={() => setBgErr(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 0,
          }}
        />

        {/* Very soft overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.18)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "64px 24px",
            maxWidth: "620px",
            width: "100%",
          }}
        >
          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "44px",
              fontWeight: "700",
              color: "#1e2d20",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              lineHeight: "1.15",
              marginBottom: "34px",
            }}
          >
            Hey You, Subscribe and<br />Connect to PumiGoods!
          </h2>

          {/* Email + Button */}
          <div
            style={{
              display: "flex",
              maxWidth: "490px",
              margin: "0 auto 16px",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="Your email address"
              style={{
                flex: 1,
                padding: "13px 18px",
                fontSize: "14px",
                fontFamily: "'Open Sans', sans-serif",
                border: `1.5px solid ${focused ? "#5aad78" : "#c8c8c8"}`,
                borderRight: "none",
                outline: "none",
                color: "#555",
                background: "rgba(255,255,255,0.93)",
                transition: "border-color 0.2s ease",
                borderRadius: "0",
              }}
            />
            <button
              onClick={handleSubscribe}
              style={{
                padding: "13px 26px",
                fontSize: "12px",
                fontWeight: "700",
                fontFamily: "'Open Sans', sans-serif",
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                background: submitted ? "#3a7d52" : "#5aad78",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.2s ease",
                borderRadius: "0",
              }}
              onMouseEnter={(e) => { if (!submitted) e.target.style.background = "#4a9a68"; }}
              onMouseLeave={(e) => { if (!submitted) e.target.style.background = "#5aad78"; }}
            >
              {submitted ? "✓ Subscribed!" : "Subscribe"}
            </button>
          </div>

          {/* Privacy policy */}
          <p
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "13px",
              color: "#555",
              marginBottom: "26px",
              letterSpacing: "0.01em",
            }}
          >
            Will be used in accordance with our{" "}
            <a
              href="#"
              style={{
                color: "#1e2d20",
                fontWeight: "700",
                textDecoration: "none",
                fontFamily: "'Open Sans', sans-serif",
              }}
              onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Privacy Policy
            </a>
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            {[
              { icon: <FacebookIcon />, label: "Facebook" },
              { icon: <XIcon />, label: "X" },
              { icon: <LinkedInIcon />, label: "LinkedIn" },
              { icon: <TelegramIcon />, label: "Telegram" },
            ].map(({ icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1.5px solid #aaa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#555",
                  background: "rgba(255,255,255,0.72)",
                  textDecoration: "none",
                  transition: "border-color 0.2s, color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#5aad78";
                  e.currentTarget.style.color = "#5aad78";
                  e.currentTarget.style.background = "rgba(255,255,255,0.95)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#aaa";
                  e.currentTarget.style.color = "#555";
                  e.currentTarget.style.background = "rgba(255,255,255,0.72)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

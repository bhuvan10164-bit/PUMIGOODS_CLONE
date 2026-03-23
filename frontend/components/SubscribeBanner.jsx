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

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "110px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
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

        {/* Very light white wash so text is readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.45)",
            zIndex: 1,
          }}
        />

        {/* Content row */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
          }}
        >
          {/* Left: Heading */}
          <p
            style={{
              fontFamily: "'Open Sans', Arial, sans-serif",
              fontSize: "22px",
              fontWeight: "400",
              color: "#1e2d20",
              whiteSpace: "nowrap",
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            Hey you, Subscribe and connect to{" "}
            <span style={{ color: "#3a9e5f", fontWeight: "600" }}>PumiGoods</span>
          </p>

          {/* Right: Email + Button */}
          <div style={{ display: "flex", flexShrink: 0 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="Your email address"
              style={{
                width: "280px",
                padding: "12px 16px",
                fontSize: "14px",
                fontFamily: "'Open Sans', Arial, sans-serif",
                border: `1.5px solid ${focused ? "#5aad78" : "#d0d0d0"}`,
                borderRight: "none",
                outline: "none",
                color: "#555",
                background: "rgba(255,255,255,0.95)",
                borderRadius: "0",
                transition: "border-color 0.2s ease",
              }}
            />
            <button
              onClick={handleSubscribe}
              style={{
                padding: "12px 24px",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontFamily: "'Open Sans', Arial, sans-serif",
                background: submitted ? "#3a7d52" : "#5aad78",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                borderRadius: "0",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => { if (!submitted) e.target.style.background = "#4a9a68"; }}
              onMouseLeave={(e) => { if (!submitted) e.target.style.background = "#5aad78"; }}
            >
              {submitted ? "✓ Done!" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

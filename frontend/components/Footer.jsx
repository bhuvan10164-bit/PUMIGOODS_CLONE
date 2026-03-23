"use client";
import { useState } from "react";

const LOGO = "https://pumigoods.com/wp-content/uploads/2025/10/Copy-of-Untitled-Brand-Template-2-e1759586360635-175x73.png";
const POST1_IMG = "https://pumigoods.com/wp-content/uploads/2026/03/natural-exfoliation-egyptian-loofah-sponges-75x60.webp";
const POST2_IMG = "https://pumigoods.com/wp-content/uploads/2026/03/handleless-bamboo-hair-brush-pumi-goods-75x60.webp";

const recentPosts = [
  {
    id: 1,
    img: POST1_IMG,
    title: "The Dust Factory: Why You Should Stop Scrubbing Your Skin With Plastic Trash",
    date: "March 18, 2026",
    comments: "1 Comment",
  },
  {
    id: 2,
    img: POST2_IMG,
    title: "Handleless Bamboo Hair Brush: Why Handles Are Absurd",
    date: "March 17, 2026",
    comments: "1 Comment",
  },
];

const quickLinks = ["Home", "About us", "Shop", "Contact us", "Blog", "Wholesale"];
const policies = ["Privacy Policy", "Shipping Policy", "Terms & Conditions", "Refund and Returns Policy"];

// Payment brand icons using simple colored rectangles with text (to avoid external deps)
const paymentMethods = [
  { label: "VISA", bg: "#1a1f71", color: "#fff", italic: true },
  { label: "MC", bg: "#eb001b", color: "#fff", accent: "#f79e1b" },
  { label: "PP", bg: "#003087", color: "#fff" },
  { label: "AMEX", bg: "#007bc1", color: "#fff" },
  { label: "VISA\nElectron", bg: "#1a1f71", color: "#fff", small: true },
  { label: "MC\nMaestro", bg: "#333", color: "#fff", small: true },
];

function PaymentBadge({ label, bg, color, italic, small }) {
  return (
    <div
      style={{
        background: bg,
        color: color,
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: small ? "8px" : "10px",
        fontWeight: "700",
        fontStyle: italic ? "italic" : "normal",
        fontFamily: "'Arial', sans-serif",
        letterSpacing: "0.03em",
        minWidth: "36px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "pre",
        textAlign: "center",
        lineHeight: "1.1",
      }}
    >
      {label}
    </div>
  );
}

function PostItem({ post }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
      <img
        src={err ? "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=75&h=60&fit=crop" : post.img}
        alt={post.title}
        onError={() => setErr(true)}
        style={{ width: "75px", height: "60px", objectFit: "cover", flexShrink: 0 }}
      />
      <div>
        <a
          href="#"
          style={{
            fontSize: "14px",
            fontWeight: "400",
            color: "#333",
            textDecoration: "none",
            lineHeight: "1.45",
            display: "block",
            marginBottom: "6px",
            fontFamily: "'Open Sans', Arial, sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#3a9e5f")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
        >
          {post.title}
        </a>
        <p style={{ fontSize: "12px", color: "#aaa", fontFamily: "'Open Sans', Arial, sans-serif" }}>
          {post.date}&nbsp;&nbsp;{post.comments}
        </p>
      </div>
    </div>
  );
}

export default function Footer() {
  const [logoErr, setLogoErr] = useState(false);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <footer style={{ background: "#fff", borderTop: "1px solid #eee" }}>
        {/* Main footer grid */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "50px 24px 40px",
            display: "grid",
            gridTemplateColumns: "260px 1fr 140px 160px 200px",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* Col 1: Logo + Description */}
          <div>
            {logoErr ? (
              <div style={{
                fontSize: "28px", fontWeight: "900", color: "#1e2d20",
                fontFamily: "'Oswald', Arial, sans-serif", marginBottom: "18px",
              }}>PUMIGOODS</div>
            ) : (
              <img
                src={LOGO}
                alt="PumiGoods"
                onError={() => setLogoErr(true)}
                style={{ width: "175px", height: "auto", marginBottom: "18px", display: "block" }}
              />
            )}
            <p style={{
              fontSize: "13.5px",
              color: "#666",
              lineHeight: "1.7",
              fontFamily: "'Open Sans', Arial, sans-serif",
            }}>
              PumiGoods<sup style={{ fontSize: "9px" }}>TM</sup> was founded in 2024 to address the global plastic pollution crisis. We're passionate about rejuvenating environmental health and human health.
            </p>
          </div>

          {/* Col 2: Recent Posts */}
          <div>
            <h4 style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#1a1a1a",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "22px",
              fontFamily: "'Open Sans', Arial, sans-serif",
            }}>
              Recent Posts
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {recentPosts.map((post, i) => (
                <div key={post.id}>
                  <PostItem post={post} />
                  {i < recentPosts.length - 1 && (
                    <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "18px 0" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Our Stores */}
          <div>
            <h4 style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#1a1a1a",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "22px",
              fontFamily: "'Open Sans', Arial, sans-serif",
            }}>
              Our Stores
            </h4>
            <a href="#" style={{
              fontSize: "14px", color: "#777", textDecoration: "none",
              fontFamily: "'Open Sans', Arial, sans-serif",
              display: "block",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#3a9e5f")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
            >
              Austin
            </a>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h4 style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#1a1a1a",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "22px",
              fontFamily: "'Open Sans', Arial, sans-serif",
            }}>
              Quick Links
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {quickLinks.map((link) => (
                <a key={link} href="#" style={{
                  fontSize: "14px",
                  color: link === "Home" ? "#1a1a1a" : "#777",
                  fontWeight: link === "Home" ? "700" : "400",
                  textDecoration: "none",
                  fontFamily: "'Open Sans', Arial, sans-serif",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#3a9e5f")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = link === "Home" ? "#1a1a1a" : "#777")}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Col 5: Policies */}
          <div>
            <h4 style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#1a1a1a",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "22px",
              fontFamily: "'Open Sans', Arial, sans-serif",
            }}>
              Policies
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {policies.map((p) => (
                <a key={p} href="#" style={{
                  fontSize: "14px",
                  color: "#777",
                  textDecoration: "none",
                  fontFamily: "'Open Sans', Arial, sans-serif",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#3a9e5f")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
                >
                  {p}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #eee" }}>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <p style={{
              fontSize: "13px",
              color: "#555",
              fontFamily: "'Open Sans', Arial, sans-serif",
            }}>
              Copyright ©2025 <strong>PumiGoods</strong> | <em>Owned by ATXSoft</em>
            </p>

            {/* Payment icons */}
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              {paymentMethods.map((pm) => (
                <PaymentBadge key={pm.label} {...pm} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

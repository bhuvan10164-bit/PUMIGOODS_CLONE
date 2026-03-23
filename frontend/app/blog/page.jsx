"use client"
import { useState } from "react";
import SubscribeBanner from "../../components/SubscribeBanner";

const ARTICLES = [
  {
    id: 1,
    day: "19", month: "MAR",
    img: "https://pumigoods.com/wp-content/uploads/2026/03/pumigoods-natural-loofah-exfoliation-set.webp",
    title: "We Tried to Make Our Kids' Bathroom Routine Less Disgusting (Plastic-wise)",
    excerpt: "The whole thing started because I found four toothbrushes under the bathroom sink that nobody claimed. Four. In a family of three kids.…",
  },
  {
    id: 2,
    day: "18", month: "MAR",
    img: "https://pumigoods.com/wp-content/uploads/2026/03/handleless-bamboo-hair-brush-morning.webp",
    title: "The Dust Factory: Why You Should Stop Scrubbing Your Skin With Plastic Trash",
    excerpt: "Humans are basically dust factories. Look at the floorboards under your bed or the inside of your dark winter coat if you don't believe…",
  },
  {
    id: 3,
    day: "17", month: "MAR",
    img: "https://pumigoods.com/wp-content/uploads/2026/03/numbered-bamboo-toothbrushes-family-bathroom-counter.webp",
    title: "Handleless Bamboo Hair Brush: Why Handles Are Absurd",
    excerpt: "The Absurdity of the Hairbrush Handle. Look at the object sitting on your bathroom counter. The standard hairbrush. It has a handle…",
  },
  {
    id: 4,
    day: "16", month: "MAR",
    img: "https://pumigoods.com/wp-content/uploads/2026/03/natural-exfoliation-egyptian-loofah-sponges-400x267.webp",
    title: "Why my scalp feels like cement (and what actually scrubbed it off)",
    excerpt: "It is basically a crust. Right at the roots of my hair. Day-three dry shampoo is the actual worst. Add in the terrible hard tap wate…",
  },
  {
    id: 5,
    day: "15", month: "MAR",
    img: "https://pumigoods.com/wp-content/uploads/2026/03/handleless-bamboo-hair-brush-pumi-goods.webp",
    title: "Natural Loofah vs Synthetic: The Ultimate Showdown",
    excerpt: "We pit the ancient Egyptian loofah against modern synthetic scrubbers. One cleans your skin, the other just pushes dead cells around…",
  },
  {
    id: 6,
    day: "14", month: "MAR",
    img: "https://pumigoods.com/wp-content/uploads/2026/03/wooden-scalp-massager-hero-travertine-400x267.webp",
    title: "Why Bamboo Toothbrushes Are Worth the Switch",
    excerpt: "You've heard it before. Switch to bamboo. But nobody tells you the part where it actually feels better in your hand than plastic ever did…",
  },
];

function ArticleCard({ article }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        flex: "0 0 calc(33.333% - 14px)",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered
          ? "0 4px 18px rgba(0,0,0,0.11)"
          : "0 1px 6px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: "260px" }}>
        {/* Date badge */}
        <div style={{
          position: "absolute", top: "16px", left: "16px", zIndex: 10,
          background: "#fff", padding: "8px 12px", textAlign: "center",
          minWidth: "52px", boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
        }}>
          <div style={{
            fontSize: "22px", fontWeight: "700", color: "#1a1a1a",
            lineHeight: 1, fontFamily: "Arial, sans-serif",
          }}>
            {article.day}
          </div>
          <div style={{
            fontSize: "11px", fontWeight: "600", color: "#777",
            letterSpacing: "0.12em", marginTop: "3px", fontFamily: "Arial, sans-serif",
          }}>
            {article.month}
          </div>
        </div>

        <img
          src={article.img}
          alt={article.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{
        padding: "28px 28px 26px", textAlign: "center",
        display: "flex", flexDirection: "column", flex: 1,
      }}>
        <h3 style={{
          fontSize: "18.5px", fontWeight: "700", color: "#1a1a1a",
          lineHeight: "1.38", marginBottom: "14px",
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}>
          {article.title}
        </h3>
        <p style={{
          fontSize: "13.5px", color: "#888", lineHeight: "1.7",
          marginBottom: "18px", flex: 1, fontFamily: "Arial, sans-serif",
        }}>
          {article.excerpt}
        </p>
        <a
          href="#"
          style={{
            fontSize: "11px", fontWeight: "700", letterSpacing: "0.18em",
            color: "#3a9e5f", textDecoration: "none", textTransform: "uppercase",
            fontFamily: "Arial, sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#2e7d4f")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#3a9e5f")}
        >
          CONTINUE READING
        </a>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ background: "#f8f8f6", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>

        {/* Page header */}
        <div style={{
          background: "#f0f0ee",
          textAlign: "center",
          padding: "40px 24px 30px",
          borderBottom: "1px solid #e8e8e8",
          marginBottom: "50px",
        }}>
          <h1 style={{
            fontSize: "42px", fontWeight: "700",
            color: "#1a1a1a", marginBottom: "12px",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            letterSpacing: "0.01em",
          }}>
            Blog
          </h1>
          <p style={{ fontSize: "13px", color: "#999", fontFamily: "Arial, sans-serif" }}>
            <a
              href="#"
              style={{ color: "#999", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#3a9e5f")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
            >
              Home
            </a>
            {" / "}
            <strong style={{ color: "#555" }}>Blog</strong>
          </p>
        </div>

        {/* Cards grid — exactly 6 cards, no pagination */}
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 24px 60px" }}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {ARTICLES.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        <SubscribeBanner />
      </div>
    </>
  );
}
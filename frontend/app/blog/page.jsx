"use client"
import { useState } from "react";
import SubscribeBanner from "../../components/SubscribeBanner";

const IMGS = {
  toothbrush: "https://pumigoods.com/wp-content/uploads/2026/03/natural-exfoliation-egyptian-loofah-sponges-700x467.webp",
  loofah:     "https://pumigoods.com/wp-content/uploads/2026/03/natural-exfoliation-egyptian-loofah-sponges-700x467.webp",
  hairbrush:  "https://pumigoods.com/wp-content/uploads/2026/03/handleless-bamboo-hair-brush-pumi-goods-75x60.webp",
};

const FALLBACKS = [
  "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1543964198-d54e4f0e44e3?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1559181567-c3190bfbf763?w=700&h=467&fit=crop",
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=700&h=467&fit=crop",
];

const allArticles = [
  { id:1,  day:"19", month:"MAR", title:"We Tried to Make Our Kids' Bathroom Routine Less Disgusting (Plastic-wise)", excerpt:"The whole thing started because I found four toothbrushes under the bathroom sink that nobody claimed. Four. In a family of three kids.…" },
  { id:2,  day:"18", month:"MAR", title:"The Dust Factory: Why You Should Stop Scrubbing Your Skin With Plastic Trash", excerpt:"Humans are basically dust factories. Look at the floorboards under your bed or the inside of your dark winter coat if you don't believe…" },
  { id:3,  day:"17", month:"MAR", title:"Handleless Bamboo Hair Brush: Why Handles Are Absurd", excerpt:"The Absurdity of the Hairbrush Handle Look at the object sitting on your bathroom counter. The standard hairbrush. It has a handle, …" },
  { id:4,  day:"16", month:"MAR", title:"Why my scalp feels like cement (and what actually scrubbed it off)", excerpt:"It is basically a crust. Right at the roots of my hair. Day-three dry shampoo is the actual worst. Add in the terrible hard tap wate…" },
  { id:5,  day:"15", month:"MAR", title:"Natural Loofah vs Synthetic: The Ultimate Showdown", excerpt:"We pit the ancient Egyptian loofah against modern synthetic scrubbers. One cleans your skin, the other just pushes dead cells around…" },
  { id:6,  day:"14", month:"MAR", title:"Why Bamboo Toothbrushes Are Worth the Switch", excerpt:"You've heard it before. Switch to bamboo. But nobody tells you the part where it actually feels better in your hand than plastic ever did…" },
  { id:7,  day:"09", month:"MAR", title:"I Ruined My Favorite Wooden Comb So You Don't Have To", excerpt:"There's a specific kind of devastation that comes from picking up your beautiful neem wood comb off the shower ledge and realizing it's…" },
  { id:8,  day:"07", month:"MAR", title:"I Checked My UPI History and Realized Soap is Bleeding Me Dry", excerpt:"okay so I was going through my UPI history just now trying to figure out where like 40% of my salary actually went this month and I gen…" },
  { id:9,  day:"06", month:"MAR", title:"Handleless Bamboo Hair Brush: Does It Actually Work?", excerpt:"Why Handles Don't Make Sense Hairbrush handles are genuinely one of the more pointless design features in a bathroom. They take up d…" },
  { id:10, day:"02", month:"MAR", title:"The Problem With Your Plastic Loofah (And What To Do About It)", excerpt:"Most people don't think twice about their loofah. It hangs there, gets wet, does its job. Until you realize what's actually happening…" },
  { id:11, day:"28", month:"FEB", title:"Eco Swaps That Actually Stick (No Guilt Required)", excerpt:"Every eco swap list is filled with things you try once and forget. This one is different. These are the swaps that became permanent…" },
  { id:12, day:"22", month:"FEB", title:"What Egyptian Loofahs Have That Your Body Wash Doesn't", excerpt:"Body wash promises a lot. It foams, it smells amazing, and it rinses off — along with all the dead skin it failed to actually remove…" },
  { id:13, day:"15", month:"FEB", title:"The Hidden Cost of Cheap Bathroom Accessories", excerpt:"You buy a plastic hairbrush for a few dollars. It breaks in six months. You buy another. The cycle repeats and nobody notices…" },
  { id:14, day:"10", month:"FEB", title:"How We Source Our Egyptian Loofahs Directly From Farmers", excerpt:"Every loofah in our shop starts in a field in Egypt. We work directly with growers who have been cultivating luffa plants for generations…" },
  { id:15, day:"03", month:"FEB", title:"Five Reasons Your Skin Feels Dry Even After Moisturizing", excerpt:"Dead skin cells don't just disappear on their own. They build up in layers, blocking everything you apply from actually absorbing…" },
];

const CARDS_PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(allArticles.length / CARDS_PER_PAGE);

function ArticleCard({ article, fallback }) {
  const [imgError, setImgError] = useState(false);
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
        boxShadow: hovered ? "0 4px 18px rgba(0,0,0,0.11)" : "0 1px 6px rgba(0,0,0,0.07)",
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
          <div style={{ fontSize: "22px", fontWeight: "700", color: "#1a1a1a", lineHeight: 1, fontFamily: "Arial, sans-serif" }}>
            {article.day}
          </div>
          <div style={{ fontSize: "11px", fontWeight: "600", color: "#777", letterSpacing: "0.12em", marginTop: "3px", fontFamily: "Arial, sans-serif" }}>
            {article.month}
          </div>
        </div>

        <img
          src={imgError ? fallback : fallback}
          alt={article.title}
          onError={() => setImgError(true)}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "28px 28px 26px", textAlign: "center", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{
          fontSize: "18.5px", fontWeight: "700", color: "#1a1a1a",
          lineHeight: "1.38", marginBottom: "14px",
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}>
          {article.title}
        </h3>
        <p style={{ fontSize: "13.5px", color: "#888", lineHeight: "1.7", marginBottom: "18px", flex: 1, fontFamily: "Arial, sans-serif" }}>
          {article.excerpt}
        </p>
        <a href="#" style={{
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

function PaginationBtn({ label, active, disabled, onClick }) {
  const [hovered, setHovered] = useState(false);

  const bg = active ? "#3a9e5f" : hovered ? "#f0f0f0" : "#fff";
  const color = active ? "#fff" : disabled ? "#ccc" : "#555";
  const borderColor = active ? "#3a9e5f" : "#ddd";
  const cursor = disabled ? "default" : "pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: "38px", height: "38px",
        padding: "0 10px",
        background: bg, color, border: `1px solid ${borderColor}`,
        fontFamily: "Arial, sans-serif", fontSize: "14px",
        fontWeight: active ? "700" : "400",
        cursor, display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.15s, color 0.15s",
        borderRadius: "2px",
      }}
    >
      {label}
    </button>
  );
}

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * CARDS_PER_PAGE;
  const pageArticles = allArticles.slice(startIdx, startIdx + CARDS_PER_PAGE);

  const goTo = (p) => {
    if (p < 1 || p > TOTAL_PAGES) return;
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build page number list with ellipsis
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= TOTAL_PAGES; i++) {
      if (i === 1 || i === TOTAL_PAGES || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />

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
            <a href="#" style={{ color: "#999", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#3a9e5f")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
            >Home</a>
            {" / "}
            <strong style={{ color: "#555" }}>Blog</strong>
          </p>
        </div>

        {/* Cards grid */}
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 24px 60px" }}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {pageArticles.map((article, i) => (
              <ArticleCard
                key={article.id}
                article={article}
                fallback={FALLBACKS[(startIdx + i) % FALLBACKS.length]}
              />
            ))}
          </div>

          {/* Pagination */}
          <div style={{
            display: "flex", justifyContent: "center",
            alignItems: "center", gap: "6px",
            marginTop: "50px",
          }}>
            {/* Prev arrow */}
            <PaginationBtn
              label={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              }
              disabled={currentPage === 1}
              onClick={() => goTo(currentPage - 1)}
            />

            {getPages().map((p, i) =>
              p === "..." ? (
                <span key={"e" + i} style={{ padding: "0 4px", color: "#999", fontSize: "14px" }}>…</span>
              ) : (
                <PaginationBtn
                  key={p}
                  label={p}
                  active={p === currentPage}
                  onClick={() => goTo(p)}
                />
              )
            )}

            {/* Next arrow */}
            <PaginationBtn
              label={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              }
              disabled={currentPage === TOTAL_PAGES}
              onClick={() => goTo(currentPage + 1)}
            />
          </div>
        </div>
        <SubscribeBanner/> 
      </div>
    </>
  );
}

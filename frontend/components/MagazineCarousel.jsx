"use client";
import { useState, useRef } from "react";

const IMAGE_URL =
  "https://pumigoods.com/wp-content/uploads/2026/03/n...-exfoliation-egyptian-loofah-sponges-700x467.webp";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=700&h=467&fit=crop";

const articles = [
  {
    id: 1,
    day: "18",
    img:"https://pumigoods.com/wp-content/uploads/2026/03/natural-exfoliation-egyptian-loofah-sponges.webp",
    month: "MAR",
    title: "The Dust Factory: Why You Should Stop Scrubbing Your Skin With Plastic Trash",
    excerpt:
      "Humans are basically dust factories. Look at the floorboards under your bed or the inside of your dark winter coat if you don't believe…",
  },
  {
    id: 2,
    day: "17",
    img:"https://pumigoods.com/wp-content/uploads/2026/03/handleless-bamboo-hair-brush-pumi-goods.webp",
    month: "MAR",
    title: "Handleless Bamboo Hair Brush: Why Handles Are Absurd",
    excerpt:
      "The Absurdity of the Hairbrush Handle Look at the object sitting on your bathroom counter. The standard hairbrush. It has a handle, …",
  },
  {
    id: 3,
    day: "16",
    img:"https://pumigoods.com/wp-content/uploads/2026/03/wooden-scalp-massager-hero-travertine.webp",
    month: "MAR",
    title: "Why my scalp feels like cement (and what actually scrubbed it off)",
    excerpt:
      "It is basically a crust. Right at the roots of my hair. Day-three dry shampoo is the actual worst. Add in the terrible hard tap wate…",
  },
  {
    id: 4,
    day: "15",
    img:"https://pumigoods.com/wp-content/uploads/2026/03/neem-wood-comb-thick-teeth-close-up-1.webp",
    month: "MAR",
    title: "The mildly annoying, mostly great reality of switching to a wooden comb",
    excerpt:
      "I dropped the damn thing on the bathroom tiles this morning and fully expected it to shatter into splinters. Because that’s what happened…",
  },
];

function ArticleCard({ article }) {
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
        boxShadow: hovered
          ? "0 4px 18px rgba(0,0,0,0.11)"
          : "0 1px 6px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: "260px" }}>
        {/* Date badge */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            zIndex: 10,
            background: "#fff",
            padding: "8px 12px",
            textAlign: "center",
            minWidth: "52px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#1a1a1a",
              lineHeight: 1,
              fontFamily: "Arial, sans-serif",
            }}
          >
            {article.day}
          </div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "#777",
              letterSpacing: "0.12em",
              marginTop: "3px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {article.month}
          </div>
        </div>

        <img
          src={article.img}
          alt={article.title}
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          padding: "28px 28px 26px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontSize: "18.5px",
            fontWeight: "700",
            color: "#1a1a1a",
            lineHeight: "1.38",
            marginBottom: "14px",
            fontFamily: "'Georgia', 'Times New Roman', serif",
          }}
        >
          {article.title}
        </h3>
        <p
          style={{
            fontSize: "13.5px",
            color: "#888",
            lineHeight: "1.7",
            marginBottom: "18px",
            flex: 1,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {article.excerpt}
        </p>
        <a
          href="#"
          style={{
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "0.18em",
            color: "#3a9e5f",
            textDecoration: "none",
            textTransform: "uppercase",
            fontFamily: "Arial, sans-serif",
          }}
        >
          CONTINUE READING…
        </a>
      </div>
    </div>
  );
}

export default function MagazineCarousel() {
  const [page, setPage] = useState(0);
  const [arrowsVisible, setArrowsVisible] = useState(false);
  const hideTimerRef = useRef(null);

  const HIDE_DELAY = 1500; // ms to keep arrows visible after cursor leaves

  const itemsPerPage = 3;
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const visible = articles.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const handleMouseEnter = () => {
    // Cancel any pending hide
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setArrowsVisible(true);
  };

  const handleMouseLeave = () => {
    // Delay hiding arrows so user has time to move to them
    hideTimerRef.current = setTimeout(() => {
      setArrowsVisible(false);
    }, HIDE_DELAY);
  };

  const ArrowBtn = ({ onClick, disabled, children, side }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "absolute",
        [side]: "-48px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 20,
        background: "transparent",
        border: "none",
        cursor: disabled ? "default" : "pointer",
        padding: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: arrowsVisible && !disabled ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: arrowsVisible && !disabled ? "auto" : "none",
        color: "#555",
      }}
    >
      {children}
    </button>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f8f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1180px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "42px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#3a9e5f",
              marginBottom: "12px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Go Green Accessories
          </p>
          <h1
            style={{
              fontSize: "34px",
              fontWeight: "700",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: "#1a1a1a",
              marginBottom: "14px",
              fontFamily: "'Georgia', 'Times New Roman', serif",
            }}
          >
            Hand Made Magazine
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#aaa",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Visit our shop to see amazing creations from our designers.
          </p>
        </div>

        {/* Carousel */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left Arrow */}
          <ArrowBtn onClick={prev} disabled={page === 0} side="left">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </ArrowBtn>

          {/* Cards row */}
          <div style={{ display: "flex", gap: "20px" }}>
            {visible.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Right Arrow */}
          <ArrowBtn onClick={next} disabled={page === totalPages - 1} side="right">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </ArrowBtn>
        </div>

        {/* Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "28px",
          }}
        >
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                padding: 0,
                background: i === page ? "#1a1a1a" : "#ccc",
                transition: "background 0.2s ease",
              }}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

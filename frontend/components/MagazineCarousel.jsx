"use client";
import { useState, useRef } from "react";

const articles = [
  {
    id: 1,
    day: "18",
    img: "https://pumigoods.com/wp-content/uploads/2026/03/natural-exfoliation-egyptian-loofah-sponges.webp",
    month: "MAR",
    title: "The Dust Factory: Why You Should Stop Scrubbing Your Skin With Plastic Trash",
    excerpt:
      "Humans are basically dust factories. Look at the floorboards under your bed or the inside of your dark winter coat if you don't believe…",
  },
  {
    id: 2,
    day: "17",
    img: "https://pumigoods.com/wp-content/uploads/2026/03/handleless-bamboo-hair-brush-pumi-goods.webp",
    month: "MAR",
    title: "Handleless Bamboo Hair Brush: Why Handles Are Absurd",
    excerpt:
      "The Absurdity of the Hairbrush Handle Look at the object sitting on your bathroom counter. The standard hairbrush. It has a handle, …",
  },
  {
    id: 3,
    day: "16",
    img: "https://pumigoods.com/wp-content/uploads/2026/03/wooden-scalp-massager-hero-travertine.webp",
    month: "MAR",
    title: "Why my scalp feels like cement (and what actually scrubbed it off)",
    excerpt:
      "It is basically a crust. Right at the roots of my hair. Day-three dry shampoo is the actual worst. Add in the terrible hard tap wate…",
  },
  {
    id: 4,
    day: "15",
    img: "https://pumigoods.com/wp-content/uploads/2026/03/neem-wood-comb-thick-teeth-close-up-1.webp",
    month: "MAR",
    title: "The mildly annoying, mostly great reality of switching to a wooden comb",
    excerpt:
      "I dropped the damn thing on the bathroom tiles this morning and fully expected it to shatter into splinters. Because that's what happened…",
  },
];

function ArticleCard({ article, hovered, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        boxShadow: hovered
          ? "0 4px 18px rgba(0,0,0,0.11)"
          : "0 1px 6px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: "260px", flexShrink: 0 }}>
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
          <div style={{ fontSize: "22px", fontWeight: "700", color: "#1a1a1a", lineHeight: 1, fontFamily: "Arial, sans-serif" }}>
            {article.day}
          </div>
          <div style={{ fontSize: "11px", fontWeight: "600", color: "#777", letterSpacing: "0.12em", marginTop: "3px", fontFamily: "Arial, sans-serif" }}>
            {article.month}
          </div>
        </div>

        <img
          src={article.img}
          alt={article.title}
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
      <div style={{ padding: "28px 28px 26px", textAlign: "center", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ fontSize: "18.5px", fontWeight: "700", color: "#1a1a1a", lineHeight: "1.38", marginBottom: "14px", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
          {article.title}
        </h3>
        <p style={{ fontSize: "13.5px", color: "#888", lineHeight: "1.7", marginBottom: "18px", flex: 1, fontFamily: "Arial, sans-serif" }}>
          {article.excerpt}
        </p>
        <a href="#" style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.18em", color: "#3a9e5f", textDecoration: "none", textTransform: "uppercase", fontFamily: "Arial, sans-serif" }}>
          CONTINUE READING…
        </a>
      </div>
    </div>
  );
}

export default function MagazineCarousel() {
  const [page, setPage] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [arrowsVisible, setArrowsVisible] = useState(false);
  const hideTimerRef = useRef(null);

  // Touch swipe state
  const touchStartX = useRef(null);

  const HIDE_DELAY = 1500;

  // Desktop: 3 per page. Mobile handled via CSS single-card sliding strip.
  const itemsPerPage = 3;
  const totalDesktopPages = Math.ceil(articles.length / itemsPerPage);
  const totalMobilePages = articles.length;

  const prevDesktop = () => setPage((p) => Math.max(0, p - 1));
  const nextDesktop = () => setPage((p) => Math.min(totalDesktopPages - 1, p + 1));

  const prevMobile = () => setPage((p) => Math.max(0, p - 1));
  const nextMobile = () => setPage((p) => Math.min(totalMobilePages - 1, p + 1));

  const handleMouseEnter = () => {
    if (hideTimerRef.current) { clearTimeout(hideTimerRef.current); hideTimerRef.current = null; }
    setArrowsVisible(true);
  };
  const handleMouseLeave = () => {
    hideTimerRef.current = setTimeout(() => setArrowsVisible(false), HIDE_DELAY);
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) nextMobile();
    else if (diff < -40) prevMobile();
    touchStartX.current = null;
  };

  const visibleDesktop = articles.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);

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
    <div style={{ minHeight: "100vh", background: "#f8f8f6", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
      <div style={{ width: "100%", maxWidth: "1180px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "42px" }}>
          <p style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.22em", textTransform: "uppercase", color: "#3a9e5f", marginBottom: "12px", fontFamily: "Arial, sans-serif" }}>
            Go Green Accessories
          </p>
          <h1 style={{ fontSize: "34px", fontWeight: "700", letterSpacing: "0.13em", textTransform: "uppercase", color: "#1a1a1a", marginBottom: "14px", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Hand Made Magazine
          </h1>
          <p style={{ fontSize: "14px", color: "#aaa", fontFamily: "Arial, sans-serif" }}>
            Visit our shop to see amazing creations from our designers.
          </p>
        </div>

        {/* ── DESKTOP CAROUSEL (hidden on mobile) ── */}
        <div
          className="hidden md:block"
          style={{ position: "relative" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ArrowBtn onClick={prevDesktop} disabled={page === 0} side="left">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </ArrowBtn>

          <div style={{ display: "flex", gap: "20px" }}>
            {visibleDesktop.map((article) => (
              <div key={article.id} style={{ flex: "0 0 calc(33.333% - 14px)", minWidth: 0 }}>
                <ArticleCard
                  article={article}
                  hovered={hoveredCard === article.id}
                  onMouseEnter={() => setHoveredCard(article.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                />
              </div>
            ))}
          </div>

          <ArrowBtn onClick={nextDesktop} disabled={page === totalDesktopPages - 1} side="right">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </ArrowBtn>
        </div>

        {/* Desktop dots */}
        <div className="hidden md:flex" style={{ justifyContent: "center", gap: "8px", marginTop: "28px" }}>
          {Array.from({ length: totalDesktopPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)}
              style={{ width: "10px", height: "10px", borderRadius: "50%", border: "none", cursor: "pointer", padding: 0, background: i === page ? "#1a1a1a" : "#ccc", transition: "background 0.2s ease" }}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>

        {/* ── MOBILE CAROUSEL (hidden on desktop) ── */}
        <div
          className="md:hidden"
          style={{ position: "relative" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Sliding strip */}
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                transform: `translateX(calc(-${page * 100}%))`,
                transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {articles.map((article) => (
                <div key={article.id} style={{ flex: "0 0 100%", minWidth: 0 }}>
                  <ArticleCard
                    article={article}
                    hovered={false}
                    onMouseEnter={() => {}}
                    onMouseLeave={() => {}}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile left arrow */}
          {page > 0 && (
            <button
              onClick={prevMobile}
              style={{
                position: "absolute",
                left: "10px",
                top: "130px",
                zIndex: 20,
                background: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "38px",
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                cursor: "pointer",
                color: "#555",
              }}
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Mobile right arrow */}
          {page < totalMobilePages - 1 && (
            <button
              onClick={nextMobile}
              style={{
                position: "absolute",
                right: "10px",
                top: "130px",
                zIndex: 20,
                background: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "38px",
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                cursor: "pointer",
                color: "#555",
              }}
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile dots */}
        <div className="md:hidden" style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
          {articles.map((_, i) => (
            <button key={i} onClick={() => setPage(i)}
              style={{ width: "10px", height: "10px", borderRadius: "50%", border: "none", cursor: "pointer", padding: 0, background: i === page ? "#1a1a1a" : "#ccc", transition: "background 0.2s ease" }}
              aria-label={`Article ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
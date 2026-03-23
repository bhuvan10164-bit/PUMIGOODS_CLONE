"use client";
import { useState, useRef } from "react";
const FALLBACK_IMGS = [
    "https://pumigoods.com/wp-content/uploads/2025/07/Leading-university-champions-holistic-approach-to-sustainability-400x225.webp",
    "https://pumigoods.com/wp-content/uploads/2025/07/shbzjtmob4sb5gmvzzty-300x300.webp",
    "https://pumigoods.com/wp-content/uploads/2025/07/pgljh5dmsub8io5hosye-300x300.webp",
    "https://pumigoods.com/wp-content/uploads/2025/07/jkgfx552g9jesnbuzp0y-300x300.webp",
    "https://pumigoods.com/wp-content/uploads/2025/07/s7cpbokd2va2ft1452y5-700x700.webp",
    "https://pumigoods.com/wp-content/uploads/2025/07/sy9zrk3tj3ej9bt3o9ar-300x300.webp",
];
const testimonials = [
    {
        id: 1,
        text: "The scalp massager and loofah pads keep my skin and hair in check after long days outdoors. I didn't think I'd care much about switching to eco products, but the difference is real. PumiGoods makes it feel easy and worth it.",
        author: "Brian T., Dallas, TX",
        role: "Happy Customer",
    },
    {
        id: 2,
        text: "I've tried so many natural loofahs but nothing compares to these Egyptian ones. The texture is perfect — firm enough to exfoliate but gentle enough to use daily. My skin has never felt this smooth!",
        author: "Sarah M., Austin, TX",
        role: "Verified Buyer",
    },
    {
        id: 3,
        text: "Switched to the bamboo hairbrush two months ago and my scalp has completely transformed. No more buildup, no more itchiness. I recommend PumiGoods to everyone I know who cares about natural beauty.",
        author: "Jessica L., New York, NY",
        role: "Loyal Customer",
    },
];
const instaImages = Array(6).fill(null).map((_, i) => ({
    id: i,
    fallback: FALLBACK_IMGS[i],
}));
function InstaImage({ item }) {
    return (
        <img
            src={item.fallback}
            alt="Instagram post"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
    );
}
export default function TestimonialInstagram() {
    const [current, setCurrent] = useState(1);
    const [direction, setDirection] = useState(null); // 'left' | 'right'
    const [animating, setAnimating] = useState(false);
    const total = testimonials.length;
    const hideTimerRef = useRef(null);
    const [arrowsVisible, setArrowsVisible] = useState(false);
    const navigate = (dir) => {
        if (animating) return;
        const nextIdx = dir === "next" ? current + 1 : current - 1;
        if (nextIdx < 0 || nextIdx >= total) return;
        setDirection(dir === "next" ? "left" : "right");
        setAnimating(true);
        setTimeout(() => {
            setCurrent(nextIdx);
            setDirection(null);
            setAnimating(false);
        }, 380);
    };
    const handleMouseEnter = () => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setArrowsVisible(true);
    };
    const handleMouseLeave = () => {
        hideTimerRef.current = setTimeout(() => setArrowsVisible(false), 1500);
    };
    const t = testimonials[current];
    // slide-out: current exits in direction; slide-in: new enters from opposite
    const outClass = direction === "left" ? "slideOutLeft" : direction === "right" ? "slideOutRight" : "";
    const inClass = direction === "left" ? "slideInRight" : direction === "right" ? "slideInLeft" : "";
    return (
        <div
            style={{
                background: "#fff",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <style>{`
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-60px); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(60px); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
            <div
                style={{
                    width: "100%",
                    maxWidth: "1200px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0",
                }}
            >
                {/* ── LEFT: Testimonial ── */}
                <div
                    style={{ flex: "0 0 42%", paddingRight: "60px", position: "relative" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Left arrow */}
                    <button
                        onClick={() => navigate("prev")}
                        disabled={current === 0 || animating}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            position: "absolute",
                            left: "-10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "transparent",
                            border: "none",
                            cursor: current === 0 ? "default" : "pointer",
                            padding: "6px",
                            zIndex: 10,
                            opacity: arrowsVisible && current !== 0 ? 1 : 0,
                            transition: "opacity 0.3s ease",
                            pointerEvents: arrowsVisible && current !== 0 ? "auto" : "none",
                            color: "#555",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    {/* Right arrow */}
                    <button
                        onClick={() => navigate("next")}
                        disabled={current === total - 1 || animating}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            position: "absolute",
                            right: "44px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "transparent",
                            border: "none",
                            cursor: current === total - 1 ? "default" : "pointer",
                            padding: "6px",
                            zIndex: 10,
                            opacity: arrowsVisible && current !== total - 1 ? 1 : 0,
                            transition: "opacity 0.3s ease",
                            pointerEvents: arrowsVisible && current !== total - 1 ? "auto" : "none",
                            color: "#555",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                    {/* Static header */}
                    <div style={{ paddingLeft: "28px" }}>
                        <div className="text-center">
                            <div style={{
                                fontSize: "11px", fontWeight: "700", letterSpacing: "0.2em",
                                textTransform: "uppercase", color: "#3a9e5f", marginBottom: "10px",
                            }}>
                                Go Green Accessories
                                <div style={{
                                    fontSize: "20px", fontWeight: "700", letterSpacing: "0.07em",
                                    textTransform: "uppercase", color: "#1a1a1a", marginBottom: "1px",
                                    fontFamily: "'Georgia', serif",
                                }}>
                                    What They Say About Us
                                </div>
                                <div className="text-center">
                                    <div style={{ width: "36px", height: "3px", background: "#3a9e5f", marginBottom: "2px" }} />
                                </div>
                            </div>
                        </div>
                        {/* Sliding content */}
                        <div style={{ overflow: "hidden", position: "relative", minHeight: "160px" }}>
                            {/* Outgoing slide (only during animation) */}
                            {animating && (
                                <div
                                    key={"out-" + current}
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        animation: `${outClass} 0.38s ease forwards`,
                                    }}
                                >
                                    <p style={{
                                        fontSize: "15px", color: "#555", lineHeight: "1.75",
                                        textAlign: "center", marginBottom: "22px",
                                    }}>
                                        {t.text}
                                    </p>
                                    <p style={{ fontSize: "14px", color: "#1a1a1a", textAlign: "center" }}>
                                        <strong>{t.author}</strong>
                                        <span style={{ color: "#888", fontWeight: "400" }}> - {t.role}</span>
                                    </p>
                                </div>
                            )}
                            {/* Incoming slide */}
                            <div
                                key={"in-" + current}
                                style={{
                                    animation: `${inClass} 0.38s ease forwards`,
                                    opacity: animating ? 0 : 1,
                                }}
                            >
                                <p style={{
                                    fontSize: "15px", color: "#555", lineHeight: "1.75",
                                    textAlign: "center", marginBottom: "22px",
                                }}>
                                    {t.text}
                                </p>
                                <p style={{ fontSize: "14px", color: "#1a1a1a", textAlign: "center" }}>
                                    <strong>{t.author}</strong>
                                    <span style={{ color: "#888", fontWeight: "400" }}> - {t.role}</span>
                                </p>
                            </div>
                        </div>
                        {/* Dots */}
                        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        if (i === current || animating) return;
                                        setDirection(i > current ? "left" : "right");
                                        setAnimating(true);
                                        setTimeout(() => {
                                            setCurrent(i);
                                            setDirection(null);
                                            setAnimating(false);
                                        }, 380);
                                    }}
                                    style={{
                                        width: "10px", height: "10px", borderRadius: "50%",
                                        border: i === current ? "2px solid #3a9e5f" : "2px solid #ccc",
                                        background: i === current ? "#3a9e5f" : "transparent",
                                        cursor: "pointer", padding: 0,
                                        transition: "all 0.2s ease",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {/* ── RIGHT: Instagram Grid ── */}
                <div style={{ flex: "0 0 58%", position: "relative" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gridTemplateRows: "repeat(2, 200px)",
                        gap: "6px",
                    }}>
                        {instaImages.map((item) => (
                            <div key={item.id} style={{ overflow: "hidden", background: "#eee" }}>
                                <InstaImage item={item} />
                            </div>
                        ))}
                    </div>
                    {/* Instagram overlay card */}
                    <div style={{
                        position: "absolute", top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "#fff", padding: "28px 32px", textAlign: "center",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.13)", minWidth: "220px", zIndex: 10,
                    }}>
                        <p style={{
                            fontSize: "20px", fontWeight: "800", color: "#1a1a1a",
                            letterSpacing: "0.04em", marginBottom: "4px", fontFamily: "'Georgia', serif",
                        }}>
                            INSTAGRAM
                        </p>
                        <p style={{ fontSize: "13px", color: "#888", marginBottom: "14px" }}>
                            @pumigoods
                        </p>
                        <p style={{ fontSize: "13.5px", color: "#555", lineHeight: "1.6" }}>
                            Curated eco-friendly essentials for a greener lifestyle. 🌿
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
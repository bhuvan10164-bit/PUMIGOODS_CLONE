"use client";
import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { toggleWishlist, selectWishlistItems } from "@/redux/wishlistSlice";

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CompareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3" />
    <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
    <line x1="12" y1="3" x2="12" y2="21" />
  </svg>
);

export function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const wishlisted = wishlistItems.some(item => item.id === product.id);

  // Handle API vs Placeholder fields
  const beforeImg = product.images?.before_image || product.beforeImg || product.image;
  const hoverImg = product.images?.hover_image || product.hoverImg || product.image;
  const priceDisplay = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price;

  const handleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: beforeImg,
      category: product.category,
      slug: product.slug
    }));
  };

  const handleCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: beforeImg,
      brand: product.category,
      quantity: 1
    }));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <Link href={`/${product.slug}`} className="block">
      <div
        className="relative bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer h-full"
        style={{
          boxShadow: hovered
            ? "0 12px 40px rgba(46,139,74,0.13), 0 2px 8px rgba(0,0,0,0.07)"
            : "0 1px 6px rgba(0,0,0,0.07)",
          transition: "box-shadow 0.35s ease, transform 0.35s ease",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-[#f7f5f0]" style={{ aspectRatio: "1 / 1" }}>

          {/* Default image */}
          <img
            src={beforeImg}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transition: "opacity 0.45s ease, transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
              opacity: hovered ? 0 : 1,
              transform: hovered ? "scale(1.1)" : "scale(1)",
            }}
          />

          {/* Hover image */}
          <img
            src={hoverImg}
            alt={product.name + " detail"}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transition: "opacity 0.45s ease, transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1.1)" : "scale(1.04)",
            }}
          />

          <button
            title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            onClick={handleWishlist}
            className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white transition-all shadow-sm"
            style={{
              color: wishlisted ? "#e53e3e" : "#9ca3af",
              transform: hovered ? "scale(1)" : "scale(0.9)",
              opacity: hovered ? 1 : 0.7,
              transition: "transform 0.3s ease, opacity 0.3s ease, color 0.2s ease",
            }}
          >
            <svg viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Bottom action bar — slides up on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-2 px-3 py-2.5"
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(4px)",
              transform: hovered ? "translateY(0)" : "translateY(105%)",
              transition: "transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94)",
              borderTop: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            {/* Add to Cart */}
            <button
              title="Add to Cart"
              onClick={handleCart}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all"
              style={{
                background: addedToCart ? "#226e3a" : "#2e8b4a",
                color: "white",
                whiteSpace: "nowrap",
                transform: addedToCart ? "scale(0.97)" : "scale(1)",
                transition: "background 0.2s, transform 0.15s",
              }}
            >
              <CartIcon />
              <span>{addedToCart ? "Added!" : "Add to Cart"}</span>
            </button>

            {/* Quick View */}
            <button
              title="Quick View"
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
              className="w-8 h-8 flex items-center justify-center rounded-full border text-gray-500 bg-white transition-all hover:border-[#2e8b4a] hover:text-[#2e8b4a]"
              style={{ borderColor: "#e5e7eb" }}
            >
              <SearchIcon />
            </button>

            {/* Compare */}
            <button
              title="Compare"
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
              className="w-8 h-8 flex items-center justify-center rounded-full border text-gray-500 bg-white transition-all hover:border-[#2e8b4a] hover:text-[#2e8b4a]"
              style={{ borderColor: "#e5e7eb" }}
            >
              <CompareIcon />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 px-4 pt-3 pb-4 text-center">
          <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-1.5">
            {product.category}
          </p>
          <h3
            className="text-sm text-gray-800 leading-snug flex-1 mb-3"
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontWeight: 400,
              minHeight: "2.6rem",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </h3>
          <p
            className="text-[#2e8b4a] font-bold text-base"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            {priceDisplay}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function ProductCards({ products = [] }) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-[#fafaf8] py-12 px-6 text-center">
        <p className="text-gray-400">Loading collection...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fafaf8] py-12 px-6">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <p className="text-[#2e8b4a] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">
          Go Green Accessories
        </p>
        <h2
          className="text-2xl text-gray-800 font-light mb-2"
          style={{ fontFamily: "var(--font-display), Georgia, serif" }}
        >
          Featured Products
        </h2>
        <p className="text-gray-400 text-sm">
          Visit our shop to see amazing creations from our designers.
        </p>
        <div className="w-12 h-0.5 bg-[#2e8b4a] mx-auto mt-4 rounded-full" />
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

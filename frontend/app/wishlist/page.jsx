"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectWishlistItems } from "@/redux/wishlistSlice";
import { ProductCard } from "@/components/ProductCards";
import SubscribeBanner from "../../components/SubscribeBanner";

export default function Wishlist() {
  const wishlistItems = useSelector(selectWishlistItems);

  return (
    <div className="font-sans bg-white min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-[#f9f9f9] border-b border-gray-100 py-10 text-center mb-10">
        <h1
          className="text-4xl font-light text-gray-800 mb-2"
          style={{ fontFamily: "Georgia, serif" }}
        >
          My Wishlist
        </h1>
        <nav className="text-sm text-gray-400 flex items-center justify-center gap-2">
          <Link href="/" className="hover:text-[#2e8b4a] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-gray-700">Wishlist</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {wishlistItems.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-8">
              <svg
                viewBox="0 0 100 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24"
              >
                <path
                  d="M50 82 C50 82 8 54 8 28 C8 16 17 7 28 7 C36 7 43 11 50 19 C57 11 64 7 72 7 C83 7 92 16 92 28 C92 54 50 82 50 82Z"
                  stroke="#d1d5db"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            <h2
              className="text-2xl font-light text-gray-800 mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Your wishlist is currently empty.
            </h2>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-8">
              Explore our collection and add your favorite items to your wishlist for later.
            </p>

            <Link
              href="/shop"
              className="px-8 py-3.5 text-xs font-bold tracking-widest uppercase text-white rounded transition-all hover:opacity-90 active:scale-95 shadow-sm"
              style={{ background: "#2e8b4a" }}
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-20">
        <SubscribeBanner />
      </div>
    </div>
  );
}
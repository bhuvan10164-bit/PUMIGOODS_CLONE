"use client";

import SubscribeBanner from "../../components/SubscribeBanner";

export default function AboutSection() {
  return (
    <section className="font-sans bg-white">
      {/* Main About Block */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left — Image */}
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://pumigoods.com/wp-content/uploads/2025/07/sy9zrk3tj3ej9bt3o9ar.webp"
            alt="PumiGoods eco products on moss"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right — Content */}
        <div className="flex flex-col gap-5 text-gray-600 text-[15px] leading-relaxed">
          <h1 className="text-3xl font-light text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
            About PumiGoods store
          </h1>

          <p>
            At <strong className="text-gray-900 font-semibold">PumiGoods</strong>, we believe everyday care should be simple,
            beautiful, and kind to the planet. Founded in 2024, we set out to replace wasteful plastic with natural,
            biodegradable essentials that actually feel good to use.
          </p>

          <p>
            From <strong className="text-gray-900 font-semibold">bamboo toothbrushes</strong> and{" "}
            <strong className="text-gray-900 font-semibold">neem wood combs</strong> to{" "}
            <strong className="text-gray-900 font-semibold">handcrafted loofahs</strong> and{" "}
            <strong className="text-gray-900 font-semibold">wooden scalp tools</strong>, every item we make is rooted in
            sustainability and thoughtful design. No fluff, no greenwashing — just honest, low-impact products that work.
          </p>

          <p>
            We're a small team with global roots — proudly based in{" "}
            <strong className="text-gray-900 font-semibold">Austin, Texas</strong>, and creatively connected to{" "}
            <strong className="text-gray-900 font-semibold">India</strong>, where much of our natural material is
            responsibly sourced.
          </p>

          {/* Beliefs */}
          <ul className="flex flex-col gap-2">
            {[
              "We believe good design should feel effortless.",
              "We believe less waste leads to more meaning.",
              "We believe clean routines create calmer lives.",
            ].map((belief, i) => (
              <li key={i} className="flex items-start gap-2 font-semibold text-gray-800">
                <span className="text-yellow-400 text-base leading-snug">✦</span>
                {belief}
              </li>
            ))}
          </ul>

          <p>
            <strong className="text-gray-900">PumiGoods isn't just a brand — it's a quiet shift toward better habits.</strong>
            <br />
            One brush. One scrub. One mindful choice at a time.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mx-6" />

      {/* USDA Certified Biobased Block */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start gap-7">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="https://pumigoods.com/wp-content/uploads/2026/03/BioPreferredLabel.webp"
            alt="USDA Certified Biobased Product"
            className="w-28 h-28 object-contain"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3 text-gray-600 text-sm leading-relaxed">
          <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
            USDA Certified Biobased
          </h2>
          <p>
            In partnership with the United States government's Biopreferred program, several of our products are USDA
            Certified Biobased. Biobased products are derived from non-fossil fuel sources.
          </p>
          <ul className="flex flex-col gap-1.5">
            {[
              "USDA Certified Biobased Product",
              "Biobased Carbon Content Test Report – Bamboo Toothbrush",
              "Biobased Carbon Content Test Report – Neem Wood Comb",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="border-t border-gray-200 mt-4">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <p className="text-sm text-gray-500" style={{ fontFamily: "Georgia, serif" }}>
            Developed by{" "}
            <a href="#" className="text-[#2e8b4a] font-semibold hover:underline">
              ATX
            </a>
            Soft @ 2025
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="hover:text-gray-700 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* X */}
            <a href="#" aria-label="X" className="hover:text-gray-700 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-700 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* Telegram */}
            <a href="#" aria-label="Telegram" className="hover:text-gray-700 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M21.726 2.332a2 2 0 0 0-2.041-.103L2.29 10.438a2 2 0 0 0 .126 3.696l3.585 1.195 1.594 5.226a1 1 0 0 0 1.666.414l2.313-2.191 4.165 3.215a2 2 0 0 0 3.132-1.102l3.065-17.02a2 2 0 0 0-.21-1.539zM10.5 15.121l-.8 2.99-.9-3.498 8.9-8.443-7.2 8.951z" />
              </svg>
            </a>
          </div>
        </div>
        <SubscribeBanner/> 
      </div>
    </section>
  );
}
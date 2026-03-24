"use client";

export default function Hero() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:[grid-template-rows:auto_auto]">

        {/* Large Left Hero — full width on mobile, row-span-2 on desktop */}
        <div className="group md:row-span-2 rounded-2xl overflow-hidden relative bg-[#f5f3ee] min-h-[380px] md:min-h-[620px] flex flex-col justify-between p-8">
          <div className="absolute inset-0">
            <img
              src="https://pumigoods.com/wp-content/uploads/2025/07/cw6q1gj9skfy3wv5aw7z.webp"
              alt="Sustainable self-care products"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="relative z-10">
            <span className="text-[#2e8b4a] text-xs font-bold tracking-widest uppercase">
              ECO - ESSENTIALS
            </span>
            <h1
              className="text-4xl font-light text-gray-800 mt-3 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Sustainable<br />Self-Care<br />Starts<br />Here
            </h1>
          </div>
          <div className="relative z-10">
            <a
              href="#"
              className="text-xs font-bold tracking-widest text-gray-800 border-b-2 border-[#2e8b4a] pb-0.5 hover:text-[#2e8b4a] transition-colors uppercase"
            >
              SHOP NOW
            </a>
          </div>
        </div>

        {/* Top Right - Aesthetic Meets Earth-Friendly */}
        <div className="group rounded-2xl overflow-hidden relative bg-[#f8f6f1] min-h-[240px] md:min-h-[304px] p-8 flex flex-col justify-center">
          <div className="absolute inset-0">
            <img
              src="https://pumigoods.com/wp-content/uploads/2025/07/bhbr8gqy6bkbbdizfe95.webp"
              alt="Aesthetic meets earth-friendly products"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="relative z-10">
            <h2
              className="text-3xl text-gray-700 font-light leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Aesthetic<br />Meets<br />Earth-<br />Friendly
            </h2>
          </div>
        </div>

        {/* Bottom Right Grid — stacks as a row on mobile, 2-col sub-grid on desktop */}
        <div className="grid grid-cols-2 gap-3">
          {/* Loofah */}
          <div className="group rounded-2xl overflow-hidden relative bg-[#f9f7f4] min-h-[180px] md:min-h-[304px] p-6 flex flex-col justify-between">
            <div className="absolute inset-0">
              <img
                src="https://pumigoods.com/wp-content/uploads/2025/07/qyom5ejr23zxassvvdwm.webp"
                alt="Plant based loofahs"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="relative z-10">
              <p className="text-[#2e8b4a] text-sm font-semibold leading-snug">
                Cleanse gently with our plant based loofahs
              </p>
            </div>
          </div>

          {/* Brushes */}
          <div className="group rounded-2xl overflow-hidden relative bg-[#f5f3ee] min-h-[180px] md:min-h-[304px] p-4 flex flex-col justify-center">
            <div className="absolute inset-0">
              <img
                src="https://pumigoods.com/wp-content/uploads/2025/07/ns2uss6yc9rln2jcibgp-244x300.webp"
                alt="Eco hair brushes and combs"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Label */}
      <div className="mt-10 text-center">
        <p className="text-[#2e8b4a] text-xs font-bold tracking-widest uppercase">
          GO GREEN ACCESSORIES FEATURED PRODUCTS
        </p>
      </div>
    </main>
  );
}
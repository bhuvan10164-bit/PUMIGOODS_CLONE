"use client";
import { useEffect, useState } from "react";
import SubscribeBanner from "../../components/SubscribeBanner";
import { fetchProducts } from "@/services/api";
import { ProductCard } from "@/components/ProductCards";

// ── Icons ──────────────────────────────────────────────────────────────────
const Grid2 = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/>
    <rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>
  </svg>
);
const Grid3 = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <rect x="3" y="3" width="5" height="5" rx="0.5"/><rect x="9.5" y="3" width="5" height="5" rx="0.5"/><rect x="16" y="3" width="5" height="5" rx="0.5"/>
    <rect x="3" y="9.5" width="5" height="5" rx="0.5"/><rect x="9.5" y="9.5" width="5" height="5" rx="0.5"/><rect x="16" y="9.5" width="5" height="5" rx="0.5"/>
    <rect x="3" y="16" width="5" height="5" rx="0.5"/><rect x="9.5" y="16" width="5" height="5" rx="0.5"/><rect x="16" y="16" width="5" height="5" rx="0.5"/>
  </svg>
);
const Grid4 = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <rect x="2" y="2" width="4" height="4" rx="0.3"/><rect x="7" y="2" width="4" height="4" rx="0.3"/><rect x="12" y="2" width="4" height="4" rx="0.3"/><rect x="17" y="2" width="4" height="4" rx="0.3"/>
    <rect x="2" y="7" width="4" height="4" rx="0.3"/><rect x="7" y="7" width="4" height="4" rx="0.3"/><rect x="12" y="7" width="4" height="4" rx="0.3"/><rect x="17" y="7" width="4" height="4" rx="0.3"/>
    <rect x="2" y="12" width="4" height="4" rx="0.3"/><rect x="7" y="12" width="4" height="4" rx="0.3"/><rect x="12" y="12" width="4" height="4" rx="0.3"/><rect x="17" y="12" width="4" height="4" rx="0.3"/>
    <rect x="2" y="17" width="4" height="4" rx="0.3"/><rect x="7" y="17" width="4" height="4" rx="0.3"/><rect x="12" y="17" width="4" height="4" rx="0.3"/><rect x="17" y="17" width="4" height="4" rx="0.3"/>
  </svg>
);

// ── Top-rated sidebar item ─────────────────────────────────────────────────
const topRated = [
  { id: 1, name: "Exfoliating Loofah Sponge Pads – Natural Body Scrubber (10 Pack)", price: 12.99, img: "https://pumigoods.com/wp-content/uploads/2025/07/jbhryysipqrsvmrourun.webp" },
];

// ── Sidebar range slider ───────────────────────────────────────────────────
function PriceSlider({ min, max, value, onChange }) {
  return (
    <div className="relative w-full h-1.5 rounded-full bg-gray-200 mt-4 mb-3">
      <div
        className="absolute h-full rounded-full bg-[#2e8b4a]"
        style={{ left: `${((value[0] - min) / (max - min)) * 100}%`, right: `${100 - ((value[1] - min) / (max - min)) * 100}%` }}
      />
      {[0, 1].map(i => (
        <input
          key={i}
          type="range" min={min} max={max} value={value[i]}
          onChange={e => { const v = [...value]; v[i] = Number(e.target.value); if (i === 0 && v[0] > v[1]) v[0] = v[1]; if (i === 1 && v[1] < v[0]) v[1] = v[0]; onChange(v); }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: i === 1 ? 2 : 1, top: 0, left: 0, margin: 0 }}
        />
      ))}
      {[0, 1].map(i => (
        <div
          key={i}
          className="absolute w-3.5 h-3.5 bg-[#2e8b4a] rounded-full border-2 border-white -translate-y-1/2 -translate-x-1/2 pointer-events-none"
          style={{ left: `${((value[i] - min) / (max - min)) * 100}%`, top: "50%", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }}
        />
      ))}
    </div>
  );
}

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [onSale, setOnSale] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [gridCols, setGridCols] = useState(3);
  const [sortBy, setSortBy] = useState("default");
  const [showCount, setShowCount] = useState(9);

  useEffect(() => {
    fetchProducts()
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { name: "Personal Care", count: products.filter(p => p.category === "Personal Care").length },
    { name: "Toothbrushes", count: products.filter(p => p.category === "Toothbrushes").length },
  ];

  const toggleCategory = (cat) => {
    setActiveCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filtered = products
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter(p => activeCategories.length === 0 || activeCategories.includes(p.category));

  if (sortBy === "price_asc") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "price_desc") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

  const finalProducts = filtered.slice(0, showCount);

  const gridClass = gridCols === 2 ? "grid-cols-2" : gridCols === 3 ? "grid-cols-3" : "grid-cols-4";

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "sans-serif" }}>

      {/* Top breadcrumb / controls bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between flex-wrap gap-2">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <span className="hover:text-[#2e8b4a] cursor-pointer transition-colors">Home</span>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-800">Shop</span>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-5 text-sm text-gray-500">
            {/* Show count */}
            <div className="flex items-center gap-1">
              <span className="mr-1 text-gray-600 font-medium">Show :</span>
              {[9, 12, 18, 24].map(n => (
                <button
                  key={n}
                  onClick={() => setShowCount(n)}
                  className="transition-colors"
                  style={{ color: showCount === n ? "#2e8b4a" : "#6b7280", fontWeight: showCount === n ? 700 : 400 }}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Grid switchers */}
            <div className="flex items-center gap-1">
              {[{ cols: 2, icon: <Grid2 /> }, { cols: 3, icon: <Grid3 /> }, { cols: 4, icon: <Grid4 /> }].map(({ cols, icon }) => (
                <button
                  key={cols}
                  onClick={() => setGridCols(cols)}
                  className="w-7 h-7 flex items-center justify-center rounded transition-colors"
                  style={{ color: gridCols === cols ? "#2e8b4a" : "#9ca3af", background: gridCols === cols ? "#f0faf4" : "transparent" }}
                >
                  {icon}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border border-gray-300 text-sm text-gray-600 px-3 py-1.5 rounded focus:outline-none focus:border-[#2e8b4a]"
              style={{ minWidth: 160 }}
            >
              <option value="default">Default sorting</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">

        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <aside className="w-64 shrink-0">

          {/* Filter by Price */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-gray-800 tracking-wide uppercase mb-4">Filter by Price</h4>
            <PriceSlider min={0} max={50} value={priceRange} onChange={setPriceRange} />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">
                Price: <strong>${priceRange[0]}</strong> — <strong>${priceRange[1]}</strong>
              </span>
              <button
                className="text-xs font-bold px-3 py-1 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors tracking-widest uppercase"
              >
                Filter
              </button>
            </div>
          </div>

          <div className="h-px bg-gray-200 mb-8" />

          {/* Filter by Category */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-gray-800 tracking-wide uppercase mb-4">Filter by Category</h4>
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => toggleCategory(cat.name)}
                className="w-full flex items-center justify-between py-1.5 text-sm transition-colors group"
                style={{ color: activeCategories.includes(cat.name) ? "#2e8b4a" : "#6b7280" }}
              >
                <span className="group-hover:text-[#2e8b4a] transition-colors">{cat.name}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: activeCategories.includes(cat.name) ? "#e8f5ee" : "#f3f4f6",
                    color: activeCategories.includes(cat.name) ? "#2e8b4a" : "#9ca3af",
                  }}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div className="h-px bg-gray-200 mb-8" />

          {/* Stock Status */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-gray-800 tracking-wide uppercase mb-4">Stock Status</h4>
            {[
              { label: "On sale", value: onSale, set: setOnSale },
              { label: "In stock", value: inStock, set: setInStock },
            ].map(({ label, value, set }) => (
              <label key={label} className="flex items-center gap-2.5 mb-2 cursor-pointer group">
                <div
                  onClick={() => set(v => !v)}
                  className="w-4 h-4 border rounded flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{
                    borderColor: value ? "#2e8b4a" : "#d1d5db",
                    background: value ? "#2e8b4a" : "white",
                  }}
                >
                  {value && <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">{label}</span>
              </label>
            ))}
          </div>

          <div className="h-px bg-gray-200 mb-8" />

          {/* Top Rated */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 tracking-wide uppercase mb-4">Top Rated Products</h4>
            {topRated.map(item => (
              <div key={item.id} className="flex gap-3 items-center cursor-pointer group">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-cover border border-gray-100 flex-shrink-0 group-hover:border-[#2e8b4a] transition-colors"
                />
                <div>
                  <p className="text-xs text-gray-700 leading-snug group-hover:text-[#2e8b4a] transition-colors mb-1"
                    style={{ fontFamily: "Georgia, serif", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.name}
                  </p>
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-1">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} viewBox="0 0 12 12" className="w-2.5 h-2.5" fill={s <= 4 ? "#f59e0b" : "#e5e7eb"}>
                        <path d="M6 1l1.3 2.6H10L8 5.4l.8 2.6L6 6.5 3.2 8l.8-2.6L2 3.6h2.7z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs font-bold text-[#2e8b4a]">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ── Product Grid ─────────────────────────────────────────────── */}
        <main className="flex-1">
          {finalProducts.length === 0 ? (
            <div className="text-center py-16 text-gray-400">No products match your filters.</div>
          ) : (
            <div className={`grid ${gridClass} gap-5`}>
              {finalProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          
          
        </main>


  
      </div>
      <SubscribeBanner /> 
    </div>
  );
}

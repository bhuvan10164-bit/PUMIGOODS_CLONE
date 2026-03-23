"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { 
  selectCartItems, 
  selectCartCount, 
  removeFromCart, 
  increaseQty, 
  decreaseQty 
} from "@/redux/cartSlice";
import { selectWishlistItems } from "@/redux/wishlistSlice";

const NAV_LINKS = ["HOME", "SHOP", "BLOG", "ABOUT US", "CONTACT US"];
const HREF_MAP = {
  HOME: "/",
  SHOP: "/shop",
  BLOG: "/blog",
  "ABOUT US": "/about",
  "CONTACT US": "/contact",
};

/* ── Social Icons ── */
const FB  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const XI  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const IG  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>;
const YT  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>;
const LIN = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

/* ── Reusable Backdrop ── */
function Backdrop({ show, onClick }) {
  return (
    <div
      className="fixed inset-0 z-40 bg-black transition-opacity duration-300"
      style={{ opacity: show ? 0.4 : 0, pointerEvents: show ? "auto" : "none" }}
      onClick={onClick}
    />
  );
}

/* ── Close Button ── */
function CloseBtn({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      Close
    </button>
  );
}

/* ═══════════════════════════════════
   CART DRAWER
════════════════════════════════════ */
function CartDrawer({ open, onClose, items, onRemove, onQty }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <>
      <Backdrop show={open} onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-80 bg-white z-50 flex flex-col"
        style={{
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>
            Shopping cart
          </h2>
          <CloseBtn onClick={onClose} />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center pb-16">
              {/* Cart with X icon */}
              <svg viewBox="0 0 90 80" fill="none" className="w-24 h-20">
                <circle cx="30" cy="72" r="6" fill="#d1d5db"/>
                <circle cx="64" cy="72" r="6" fill="#d1d5db"/>
                <path d="M4 6h12l10 44h36l10-34H22" stroke="#d1d5db" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <line x1="55" y1="20" x2="70" y2="35" stroke="#d1d5db" strokeWidth="4.5" strokeLinecap="round"/>
                <line x1="70" y1="20" x2="55" y2="35" stroke="#d1d5db" strokeWidth="4.5" strokeLinecap="round"/>
              </svg>
              <p className="text-sm text-gray-500">No products in the cart.</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-bold tracking-widest uppercase text-white rounded transition-opacity hover:opacity-90"
                style={{ background: "#2e8b4a" }}
              >
                Return to Shop
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-start border-b border-gray-100 pb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-gray-50"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-800 font-medium leading-snug">{item.name}</p>
                    <p className="text-xs text-[#2e8b4a] font-bold mt-1">${(item.price * item.qty).toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => item.qty > 1 ? onQty(item.id, item.qty - 1) : onRemove(item.id)} className="w-6 h-6 border border-gray-200 rounded text-sm flex items-center justify-center hover:border-[#2e8b4a] hover:text-[#2e8b4a] transition-colors">−</button>
                      <span className="text-xs w-5 text-center">{item.qty}</span>
                      <button onClick={() => onQty(item.id, item.qty + 1)} className="w-6 h-6 border border-gray-200 rounded text-sm flex items-center justify-center hover:border-[#2e8b4a] hover:text-[#2e8b4a] transition-colors">+</button>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-400 transition-colors mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-5 flex flex-col gap-3">
            <div className="flex justify-between text-sm font-semibold text-gray-800">
              <span>Total</span>
              <span className="text-[#2e8b4a]">${total.toFixed(2)}</span>
            </div>
            <Link href="/checkout" onClick={onClose} className="w-full text-center py-3 text-xs font-bold tracking-widest uppercase text-white rounded hover:opacity-90 transition-opacity" style={{ background: "#2e8b4a" }}>
              Proceed to Checkout
            </Link>
            <Link href="/shop" onClick={onClose} className="w-full text-center py-2.5 text-xs font-bold tracking-widest uppercase text-gray-600 border border-gray-200 rounded hover:border-gray-400 transition-colors">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

/* ═══════════════════════════════════
   LOGIN DRAWER
════════════════════════════════════ */
function LoginDrawer({ open, onClose }) {
  const [form, setForm] = useState({ username: "", password: "", remember: false });
  const [showPwd, setShowPwd] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <>
      <Backdrop show={open} onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-80 bg-white z-50 flex flex-col"
        style={{
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>Sign in</h2>
          <CloseBtn onClick={onClose} />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5">
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-600">
                Username or email address <span className="text-red-500">*</span>
              </label>
              <input
                type="text" name="username" value={form.username} onChange={onChange} required
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#2e8b4a] focus:ring-1 focus:ring-[#2e8b4a] transition-colors"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-600">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"} name="password" value={form.password} onChange={onChange} required
                  className="w-full border border-gray-300 rounded px-3 py-2.5 pr-10 text-sm text-gray-800 outline-none focus:border-[#2e8b4a] focus:ring-1 focus:ring-[#2e8b4a] transition-colors"
                />
                <button type="button" onClick={() => setShowPwd((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPwd
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Log In */}
            <button type="submit" className="w-full py-3 text-xs font-bold tracking-widest uppercase text-white rounded hover:opacity-90 transition-opacity" style={{ background: "#2e8b4a" }}>
              Log In
            </button>

            {/* Remember / Lost Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
                <input type="checkbox" name="remember" checked={form.remember} onChange={onChange} className="w-3.5 h-3.5 accent-[#2e8b4a]"/>
                Remember me
              </label>
              <Link href="/forgot-password" onClick={onClose} className="text-xs text-[#2e8b4a] hover:underline">
                Lost your password?
              </Link>
            </div>
          </form>

          <div className="border-t border-gray-100" />

          {/* No account yet */}
          <div className="flex flex-col items-center gap-3 text-center pt-2">
            <svg viewBox="0 0 60 65" fill="none" className="w-14 h-14">
              <circle cx="30" cy="20" r="13" stroke="#d1d5db" strokeWidth="3" fill="none"/>
              <path d="M5 62C5 46 55 46 55 62" stroke="#d1d5db" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
            <p className="text-sm text-gray-700 font-medium">No account yet?</p>
            <Link
              href="/register"
              onClick={onClose}
              className="text-xs font-bold tracking-widest uppercase text-gray-800 border-b-2 border-gray-800 pb-0.5 hover:text-[#2e8b4a] hover:border-[#2e8b4a] transition-colors"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════
   SEARCH MODAL (slides from top)
════════════════════════════════════ */
function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
      if (allProducts.length === 0) {
        fetch("https://axalin-project.onrender.com/api/products/")
          .then(res => res.json())
          .then(data => setAllProducts(data))
          .catch(err => console.error("Search fetch error:", err));
      }
    } else {
      setQuery("");
    }
  }, [open, allProducts.length]);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const filteredResults = query.trim() === "" 
    ? [] 
    : allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  return (
    <div
      className="fixed inset-0 z-[100] bg-white overflow-y-auto"
      style={{
        transform: open ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 pt-24 pb-10 relative">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-10 right-10 text-gray-400 hover:text-gray-900 transition-colors p-2"
          aria-label="Close search"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Input Area */}
        <div className="relative border-b border-gray-100 pb-6 mb-12">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-6xl font-light text-gray-800 bg-transparent outline-none placeholder:text-gray-200"
            style={{ fontFamily: 'Georgia, serif' }}
            placeholder="Search for products"
          />
        </div>

        {/* Hint or Results */}
        <div className="min-h-[400px]">
          {query.trim() === "" ? (
            <p className="text-xl font-light text-gray-400" style={{ fontFamily: 'Georgia, serif' }}>
              Start typing to see products you are looking for.
            </p>
          ) : filteredResults.length > 0 ? (
            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Product Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredResults.map(product => {
                  const img = product.images?.before_image || product.beforeImg || product.image;
                  return (
                    <Link 
                      key={product.id} 
                      href={`/${product.slug}`} 
                      onClick={onClose}
                      className="group flex items-center gap-5 p-3 border border-transparent hover:border-gray-100 hover:bg-gray-50 rounded-xl transition-all duration-300"
                    >
                      <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={img} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#2e8b4a] mb-1">{product.category}</span>
                        <h4 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2 group-hover:text-[#2e8b4a] transition-colors">{product.name}</h4>
                        <p className="text-sm text-gray-800 font-bold mt-2">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-xl font-light text-gray-400" style={{ fontFamily: 'Georgia, serif' }}>
              No products found for "<span className="text-gray-800 font-normal">{query}</span>"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   NAVBAR (main export)
════════════════════════════════════ */
export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [cartOpen,   setCartOpen]   = useState(false);
  const [loginOpen,  setLoginOpen]  = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  /* Redux Cart state */
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);

  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistCount = wishlistItems.length;

  const removeItem = (id) => dispatch(removeFromCart(id));
  const onIncrease = (id) => dispatch(increaseQty(id));
  const onDecrease = (id) => dispatch(decreaseQty(id));

  /* Open helpers — only one panel at a time */
  const openCart   = () => { setCartOpen(true);   setLoginOpen(false);  setSearchOpen(false); };
  const openLogin  = () => { setLoginOpen(true);  setCartOpen(false);   setSearchOpen(false); };
  const openSearch = () => { setSearchOpen(true); setCartOpen(false);   setLoginOpen(false);  };

  return (
    <>
      <div className="font-sans bg-white">

        {/* ── Top green bar ── */}
        <div className="bg-[#2e8b4a] text-white text-xs py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:underline font-medium tracking-wide">
              LANGUAGE <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 ml-0.5 inline"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <button className="flex items-center gap-1 hover:underline font-medium tracking-wide">
              COUNTRY <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 ml-0.5 inline"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <span className="font-semibold tracking-wide">FREE SHIPPING FOR ALL ORDERS OF $150</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {[<FB key="fb"/>, <XI key="x"/>, <IG key="ig"/>, <YT key="yt"/>, <LIN key="li"/>].map((ic) => (
                <a key={ic.key} href="#" className="hover:text-green-200 transition-colors" aria-label={ic.key}>{ic}</a>
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <a href="#" className="hover:underline tracking-wide">NEWSLETTER</a>
              <span className="opacity-50">|</span>
              <a href="#" className="hover:underline tracking-wide">CONTACT US</a>
              <span className="opacity-50">|</span>
              <a href="#" className="hover:underline tracking-wide">FAQS</a>
            </div>
          </div>
        </div>

        {/* ── Header ── */}
        <header className="border-b border-gray-100 py-3 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">

            {/* Contact info */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <div>
                  <div className="text-xs text-gray-400">Call toll-free</div>
                  <div className="font-medium text-gray-700">+1 512 790 0864</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <div>
                  <div className="text-xs text-gray-400">Any questions</div>
                  <div className="font-medium text-gray-700">support@pumigoods.com</div>
                </div>
              </div>
            </div>

            {/* Logo */}
            <Link href="/" className="flex flex-col items-center leading-none">
              <span className="text-4xl font-black tracking-tight text-gray-900" style={{ fontFamily: "Georgia, serif", letterSpacing: "-1px" }}>
                PUM<span className="relative">I<span className="absolute -top-1 -right-1 text-[8px] font-bold">™</span></span>
              </span>
              <span className="text-[9px] tracking-[0.35em] font-semibold text-gray-500 uppercase mt-0.5">GOODS</span>
            </Link>

            {/* Action buttons */}
            <div className="flex items-center gap-4 text-sm text-gray-700">
              {/* LOGIN */}
              <button
                onClick={openLogin}
                className="hover:text-[#2e8b4a] transition-colors font-medium"
              >
                LOGIN / REGISTER
              </button>

              {/* SEARCH */}
              <button onClick={openSearch} className="hover:text-[#2e8b4a] transition-colors" aria-label="Search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>

              {/* WISHLIST */}
              <Link href="/wishlist" className="hover:text-[#2e8b4a] transition-colors" aria-label="Wishlist">
                <div className="relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#2e8b4a] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* CART */}
              <button onClick={openCart} className="flex items-center hover:text-[#2e8b4a] transition-colors" aria-label="Cart">
                <div className="relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-[#2e8b4a] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* ── Nav links ── */}
        <nav className="border-b border-gray-100 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-10">
            {NAV_LINKS.map((link) => {
              const href = HREF_MAP[link] ?? "/";
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
              return (
                <Link
                  key={link}
                  href={href}
                  className={`text-xs font-semibold tracking-widest transition-colors pb-0.5 ${
                    isActive ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {link}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* ── Panels ── */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems.map(i => ({ ...i, qty: i.quantity }))}
        onRemove={removeItem}
        onQty={(id, qty, oldQty) => {
          if (qty > oldQty) dispatch(increaseQty(id));
          else dispatch(decreaseQty(id));
        }}
      />
      <LoginDrawer open={loginOpen} onClose={() => setLoginOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
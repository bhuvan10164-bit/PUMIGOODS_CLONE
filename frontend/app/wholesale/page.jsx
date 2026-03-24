"use client"
import { useState } from "react";
import SubscribeBanner from "../../components/SubscribeBanner";

const RECENT_POSTS = [
  "My Eco-Friendly Coffee Routine (Or At Least, I'm Trying)",
  "The truth about those stupid little dots on your legs",
  "Finally Throw Away My Old Hairbrush",
  "We Tried to Make Our Kids' Bathroom Routine Less Disgusting (Plastic-wise)",
  "The Dust Factory: Why You Should Stop Scrubbing Your Skin With Plastic Trash",
];

const CATEGORIES = [
  "Body Care",
  "Dental Care",
  "Eco Lifestyle",
  "Eco Friendly Bath Essentials",
  "Hair Care",
  "Home & Kitchen",
  "Natural Haircare",
  "Oral Care",
  "Personal Care",
  "Sustainable Living",
  "Toothbrushes",
  "Uncategorized",
];

const ARCHIVES = ["March 2026", "February 2026", "January 2026", "November 2025"];

const BENEFITS = [
  {
    icon: "🌿",
    title: "Eco-Conscious Bulk Purchasing",
    desc: "Access our full selection of products at high volumes and wholesale pricing.",
  },
  {
    icon: "📢",
    title: "Marketing Support",
    desc: "We provide product photography and signage to help you communicate the zero waste story.",
  },
  {
    icon: "％",
    title: "Special Offers",
    desc: "Seasonal discounts and early access to new product launches.",
  },
];

export default function WholesalePage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Georgia&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { font-family: 'Open Sans', Arial, sans-serif; }

        .wh-page { background: #fff; min-height: 100vh; }

        /* ── Top nav ── */
        .wh-nav {
          border-bottom: 1px solid #e8e8e8;
          padding: 10px 0;
          text-align: center;
          font-size: 12px;
          letter-spacing: 0.12em;
          font-weight: 600;
          color: #555;
        }
        .wh-nav a {
          color: #555; text-decoration: none; margin: 0 14px;
          text-transform: uppercase;
        }
        .wh-nav a:hover { color: #3a9e5f; }

        /* ── Page header ── */
        .wh-page-header {
          background: #f7f7f5;
          text-align: center;
          padding: 36px 24px 24px;
          border-bottom: 1px solid #e8e8e8;
          margin-bottom: 40px;
        }
        .wh-page-header h1 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 36px;
          font-weight: 400;
          color: #1a1a1a;
          margin-bottom: 10px;
        }
        .wh-breadcrumb {
          font-size: 12px;
          color: #999;
        }
        .wh-breadcrumb a { color: #999; text-decoration: none; }
        .wh-breadcrumb a:hover { color: #3a9e5f; }
        .wh-breadcrumb strong { color: #555; }

        /* ── Main layout ── */
        .wh-layout {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 60px;
          display: flex;
          gap: 48px;
          align-items: flex-start;
        }

        /* ── Main content ── */
        .wh-main { flex: 1; min-width: 0; }

        /* ── Sidebar ── */
        .wh-sidebar {
          width: 200px;
          flex-shrink: 0;
        }

        /* ── Section headings ── */
        .wh-section-title {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 20px;
          font-weight: 400;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 8px;
        }
        .wh-section-subtitle {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 18px;
        }

        /* ── Intro text ── */
        .wh-intro p {
          font-size: 13px;
          color: #555;
          line-height: 1.75;
          margin-bottom: 14px;
        }
        .wh-intro ul {
          margin: 0 0 16px 20px;
          font-size: 13px;
          color: #555;
          line-height: 2;
        }
        .wh-intro ul li { list-style: disc; }

        /* ── Faire banner ── */
        .faire-banner {
          background: #f5f5f3;
          border: 1px solid #e0e0de;
          padding: 22px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin: 32px 0 36px;
        }
        .faire-banner-text h3 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 16px;
          font-weight: 400;
          color: #1a1a1a;
          margin-bottom: 6px;
        }
        .faire-banner-text p {
          font-size: 12px;
          color: #777;
          line-height: 1.6;
          max-width: 380px;
        }
        .faire-btn {
          background: #5aad78;
          color: #fff;
          border: none;
          padding: 11px 20px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s;
          font-family: 'Open Sans', Arial, sans-serif;
          text-decoration: none;
          display: inline-block;
        }
        .faire-btn:hover { background: #4a9a68; }

        /* ── Benefits ── */
        .benefits-grid {
          display: flex;
          gap: 0;
          text-align: center;
          margin-bottom: 44px;
        }
        .benefit-item {
          flex: 1;
          padding: 0 20px;
          border-right: 1px solid #e8e8e8;
        }
        .benefit-item:last-child { border-right: none; }
        .benefit-icon {
          font-size: 28px;
          margin-bottom: 12px;
          display: block;
          filter: grayscale(0.3);
        }
        .benefit-item h4 {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 10px;
          line-height: 1.4;
          font-family: 'Open Sans', Arial, sans-serif;
        }
        .benefit-item p {
          font-size: 12px;
          color: #888;
          line-height: 1.65;
        }

        /* ── Contact form ── */
        .wh-form-section { margin-top: 8px; }
        .wh-form-section h2 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 20px;
          font-weight: 400;
          text-align: center;
          color: #1a1a1a;
          margin-bottom: 6px;
        }
        .wh-form-section > p {
          font-size: 12.5px;
          color: #888;
          text-align: center;
          margin-bottom: 24px;
        }
        .wh-form { display: flex; flex-direction: column; gap: 14px; }
        .wh-field label {
          display: block;
          font-size: 12px;
          color: #555;
          margin-bottom: 5px;
          font-family: 'Open Sans', Arial, sans-serif;
        }
        .wh-field input,
        .wh-field textarea {
          width: 100%;
          border: 1px solid #d0d0d0;
          outline: none;
          padding: 9px 12px;
          font-size: 13px;
          font-family: 'Open Sans', Arial, sans-serif;
          color: #333;
          border-radius: 0;
          background: #fff;
          transition: border-color 0.2s;
          resize: vertical;
        }
        .wh-field input:focus,
        .wh-field textarea:focus { border-color: #5aad78; }
        .wh-field textarea { height: 120px; }
        .wh-submit-btn {
          background: #5aad78;
          color: #fff;
          border: none;
          padding: 10px 22px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Open Sans', Arial, sans-serif;
          align-self: flex-start;
          transition: background 0.2s;
          border-radius: 0;
        }
        .wh-submit-btn:hover { background: #4a9a68; }

        /* ── Sidebar ── */
        .sidebar-block { margin-bottom: 28px; }
        .sidebar-block h3 {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          font-family: 'Open Sans', Arial, sans-serif;
        }
        .sidebar-search {
          display: flex;
          gap: 0;
        }
        .sidebar-search input {
          flex: 1;
          border: 1px solid #d0d0d0;
          border-right: none;
          padding: 8px 10px;
          font-size: 12px;
          outline: none;
          font-family: 'Open Sans', Arial, sans-serif;
        }
        .sidebar-search input:focus { border-color: #5aad78; }
        .sidebar-search button {
          background: #5aad78;
          color: #fff;
          border: none;
          padding: 8px 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Open Sans', Arial, sans-serif;
          transition: background 0.2s;
        }
        .sidebar-search button:hover { background: #4a9a68; }
        .sidebar-divider {
          border: none;
          border-top: 1px solid #e8e8e8;
          margin: 4px 0 16px;
        }
        .sidebar-block ul { list-style: none; }
        .sidebar-block ul li {
          font-size: 12.5px;
          color: #555;
          padding: 3px 0;
          cursor: pointer;
        }
        .sidebar-block ul li:hover { color: #3a9e5f; }
        .no-comments {
          font-size: 12.5px;
          color: #888;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .wh-layout {
            flex-direction: column;
            padding: 0 16px 40px;
            gap: 32px;
          }
          .wh-sidebar { width: 100%; }
          .faire-banner { flex-direction: column; align-items: flex-start; }
          .benefits-grid { flex-direction: column; gap: 24px; }
          .benefit-item { border-right: none; border-bottom: 1px solid #e8e8e8; padding-bottom: 20px; }
          .benefit-item:last-child { border-bottom: none; }
          .wh-nav { display: none; }
        }
      `}</style>

      <div className="wh-page">

        {/* Nav */}
        <nav className="wh-nav">
          {["Home", "Shop", "Blog", "About Us", "Contact Us"].map((item) => (
            <a key={item} href="#">{item}</a>
          ))}
        </nav>

        {/* Page header */}
        <div className="wh-page-header">
          <h1>Wholesale</h1>
          <p className="wh-breadcrumb">
            <a href="#">Home</a> / <strong>Wholesale</strong>
          </p>
        </div>

        {/* Main layout */}
        <div className="wh-layout">

          {/* ── Left: Main content ── */}
          <div className="wh-main">

            {/* Intro */}
            <div className="wh-intro">
              <p className="wh-section-title">Wholesale &amp; Partnerships</p>
              <p className="wh-section-subtitle">Bring Sustainable Living to Your Shelves</p>

              <p>
                At <strong>Pumigoods</strong>, we believe that eco-friendly living should be accessible, beautiful, and functional. Our zero-waste products — from naturally antibacterial Neem wood combs to biodegradable bamboo toothbrushes — are the perfect addition to:
              </p>
              <ul>
                <li>Retail Stores &amp; Boutiques</li>
                <li>Zero Waste Refill Shops</li>
                <li>Hotels &amp; Airbnbs</li>
                <li>Spas &amp; Salons</li>
                <li>Yoga Studios</li>
                <li>Gift Shops</li>
              </ul>
              <p>
                We offer a selection of in-store displays as well as educational signage to help explain the benefits of our natural materials to your customers.
              </p>
            </div>

            {/* Faire banner */}
            <div className="faire-banner">
              <div className="faire-banner-text">
                <h3>For U.S. Retailers: Order via Faire</h3>
                <p>
                  We have partnered with Faire to offer you a seamless wholesale experience. Net 60 terms and free returns for new retailers.
                </p>
              </div>
              <a href="#" className="faire-btn">Shop Pumigoods on Faire</a>
            </div>

            {/* Benefits */}
            <p className="wh-section-title" style={{ marginBottom: "24px" }}>Benefits of a Wholesale Account</p>
            <div className="benefits-grid">
              {BENEFITS.map((b) => (
                <div className="benefit-item" key={b.title}>
                  <span className="benefit-icon">{b.icon}</span>
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="wh-form-section">
              <h2>International &amp; Custom Inquiries</h2>
              <p>Not on Faire? Looking for international distribution? Fill out the form below:</p>
              <form className="wh-form" onSubmit={handleSubmit}>
                <div className="wh-field">
                  <label>Your name</label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange} required
                  />
                </div>
                <div className="wh-field">
                  <label>Your email</label>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange} required
                  />
                </div>
                <div className="wh-field">
                  <label>Subject</label>
                  <input
                    type="text" name="subject" value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="wh-field">
                  <label>Your message (optional)</label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="wh-submit-btn">
                  {submitted ? "✓ Sent!" : "Submit"}
                </button>
              </form>
            </div>
          </div>

          {/* ── Right: Sidebar ── */}
          <aside className="wh-sidebar">

            {/* Search */}
            <div className="sidebar-block">
              <h3>Search</h3>
              <div className="sidebar-search">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder=""
                />
                <button>Search</button>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="sidebar-block">
              <h3>Recent Posts</h3>
              <hr className="sidebar-divider" />
              <ul>
                {RECENT_POSTS.map((post) => (
                  <li key={post}><a href="#" style={{ color: "#555", textDecoration: "none", fontSize: "12.5px" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#3a9e5f"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#555"}
                  >{post}</a></li>
                ))}
              </ul>
            </div>

            {/* Recent Comments */}
            <div className="sidebar-block">
              <h3>Recent Comments</h3>
              <hr className="sidebar-divider" />
              <p className="no-comments">No comments to show.</p>
            </div>

            {/* Archives */}
            <div className="sidebar-block">
              <h3>Archives</h3>
              <hr className="sidebar-divider" />
              <ul>
                {ARCHIVES.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="sidebar-block">
              <h3>Categories</h3>
              <hr className="sidebar-divider" />
              <ul>
                {CATEGORIES.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

          </aside>
        </div>

        <SubscribeBanner />
      </div>
    </>
  );
}
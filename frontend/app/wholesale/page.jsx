"use client"
import { useState } from "react";
import SubscribeBanner from "../../components/SubscribeBanner";

const RECENT_POSTS = [
  "My Eco-Friendly Coffee Routine (Or At Least, I'm Trying)",
  "The truth about those stupid little dots on your legs",
  "Finally Throw Away My Old Hairbrush.",
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

// SVG icons matching the screenshot exactly
const LeafIcon = () => (
  <svg viewBox="0 0 48 48" width="42" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4C24 4 8 12 8 28C8 36.837 15.163 44 24 44C32.837 44 40 36.837 40 28C40 12 24 4 24 4Z" fill="#1a1a1a"/>
    <path d="M24 44V20" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 30C24 30 16 24 14 18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MegaphoneIcon = () => (
  <svg viewBox="0 0 48 48" width="42" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M36 10L12 18V30L36 38V10Z" fill="#1a1a1a"/>
    <rect x="8" y="18" width="4" height="12" rx="1" fill="#1a1a1a"/>
    <path d="M12 28L16 36" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="38" cy="24" r="3" fill="#1a1a1a"/>
  </svg>
);

const PercentIcon = () => (
  <svg viewBox="0 0 48 48" width="42" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="12" y1="36" x2="36" y2="12" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="15" cy="15" r="5" fill="#1a1a1a"/>
    <circle cx="33" cy="33" r="5" fill="#1a1a1a"/>
  </svg>
);

const BENEFITS = [
  {
    Icon: LeafIcon,
    title: "Eco-Conscious Bulk Purchasing",
    desc: "Access our full selection of products at high volumes and wholesale pricing.",
  },
  {
    Icon: MegaphoneIcon,
    title: "Marketing Support",
    desc: "We provide product photography and signage to help you communicate the zero waste story.",
  },
  {
    Icon: PercentIcon,
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
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');


        .wh-page {
          background: #fff;
          min-height: 100vh;
          font-family: 'Open Sans', Arial, sans-serif;
        }

        /* ── Page header ── */
        .wh-page-header {
          background: #f7f7f5;
          text-align: center;
          padding: 36px 24px 22px;
          border-bottom: 1px solid #e8e8e8;
          margin-bottom: 44px;
        }
        .wh-page-header h1 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 34px;
          font-weight: 400;
          color: #1a1a1a;
          margin-bottom: 10px;
          letter-spacing: 0.01em;
        }
        .wh-breadcrumb { font-size: 12px; color: #999; }
        .wh-breadcrumb a { color: #999; text-decoration: none; }
        .wh-breadcrumb a:hover { color: #3a9e5f; }
        .wh-breadcrumb strong { color: #555; }

        /* ── Main layout ── */
        .wh-layout {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px 60px;
          display: flex;
          gap: 44px;
          align-items: flex-start;
        }

        .wh-main { flex: 1; min-width: 0; }
        .wh-sidebar { width: 196px; flex-shrink: 0; }

        /* ── Section headings ── */
        .wh-section-title {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 19px;
          font-weight: 400;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 6px;
        }
        .wh-section-subtitle {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 18px;
        }

        /* ── Intro text ── */
        .wh-intro-text {
          font-size: 12.5px;
          color: #555;
          line-height: 1.75;
          margin-bottom: 14px;
        }
        .wh-intro-list {
          margin: 0 0 16px 18px;
          font-size: 12.5px;
          color: #555;
          line-height: 2.1;
        }
        .wh-intro-list li { list-style: disc; }

        /* ── Faire banner ── */
        .faire-banner {
          background: #f5f5f3;
          border: 1px solid #e0e0de;
          padding: 22px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin: 30px 0 38px;
        }
        .faire-banner-left { text-align: center; flex: 1; }
        .faire-banner-left h3 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 15px;
          font-weight: 400;
          color: #1a1a1a;
          margin-bottom: 8px;
        }
        .faire-banner-left p {
          font-size: 12px;
          color: #777;
          line-height: 1.6;
        }
        .faire-btn {
          background: #5aad78;
          color: #fff;
          border: none;
          padding: 11px 18px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
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
        .benefits-title {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 19px;
          font-weight: 400;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 28px;
        }
        .benefits-grid {
          display: flex;
          gap: 0;
          text-align: center;
          margin-bottom: 46px;
          border-top: 1px solid #e8e8e8;
        }
        .benefit-item {
          flex: 1;
          padding: 24px 20px 0;
        }
        .benefit-icon-wrap {
          margin-bottom: 14px;
          display: flex;
          justify-content: center;
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
        .wh-form-section { margin-top: 4px; }
        .wh-form-title {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 19px;
          font-weight: 400;
          text-align: center;
          color: #1a1a1a;
          margin-bottom: 6px;
        }
        .wh-form-subtitle {
          font-size: 12px;
          color: #888;
          text-align: center;
          margin-bottom: 24px;
        }
        .wh-form { display: flex; flex-direction: column; gap: 12px; }
        .wh-field label {
          display: block;
          font-size: 12px;
          color: #555;
          margin-bottom: 5px;
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
        .wh-field textarea { height: 130px; }
        .wh-submit-btn {
          background: #5aad78;
          color: #fff;
          border: none;
          padding: 9px 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Open Sans', Arial, sans-serif;
          align-self: flex-start;
          transition: background 0.2s;
          border-radius: 0;
          margin-top: 4px;
        }
        .wh-submit-btn:hover { background: #4a9a68; }

        /* ── Sidebar ── */
        .sidebar-block { margin-bottom: 26px; }
        .sidebar-block h3 {
          font-size: 13.5px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 10px;
          font-family: 'Open Sans', Arial, sans-serif;
        }
        .sidebar-search { display: flex; gap: 0; }
        .sidebar-search input {
          flex: 1;
          border: 1px solid #d0d0d0;
          border-right: none;
          padding: 7px 9px;
          font-size: 12px;
          outline: none;
          font-family: 'Open Sans', Arial, sans-serif;
          border-radius: 0;
        }
        .sidebar-search input:focus { border-color: #5aad78; }
        .sidebar-search button {
          background: #5aad78;
          color: #fff;
          border: none;
          padding: 7px 11px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Open Sans', Arial, sans-serif;
          transition: background 0.2s;
          border-radius: 0;
        }
        .sidebar-search button:hover { background: #4a9a68; }
        .sidebar-divider {
          border: none;
          border-top: 1px solid #e8e8e8;
          margin: 8px 0 12px;
        }
        .sidebar-link {
          display: block;
          font-size: 12.5px;
          color: #555;
          text-decoration: none;
          padding: 2px 0;
          line-height: 1.7;
        }
        .sidebar-link:hover { color: #3a9e5f; }
        .sidebar-plain {
          font-size: 12.5px;
          color: #555;
          padding: 2px 0;
          line-height: 1.7;
          display: block;
          cursor: pointer;
        }
        .sidebar-plain:hover { color: #3a9e5f; }
        .no-comments { font-size: 12.5px; color: #888; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .wh-layout {
            flex-direction: column;
            padding: 0 16px 40px;
            gap: 32px;
          }
          .wh-sidebar { width: 100%; }
          .faire-banner {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .benefits-grid { flex-direction: column; gap: 24px; }
          .benefit-item {
            border-bottom: 1px solid #e8e8e8;
            padding-bottom: 20px;
          }
          .benefit-item:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="wh-page">

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

            <p className="wh-section-title">Wholesale &amp; Partnerships</p>
            <p className="wh-section-subtitle">Bring Sustainable Living to Your Shelves</p>

            <p className="wh-intro-text">
              At <strong>Pumigoods</strong>, we believe that eco-friendly living should be accessible, beautiful, and functional. Our zero-waste products — from naturally antibacterial Neem wood combs to biodegradable bamboo toothbrushes — are the perfect addition to:
            </p>
            <ul className="wh-intro-list">
              <li>Retail Stores &amp; Boutiques</li>
              <li>Zero Waste Refill Shops</li>
              <li>Hotels &amp; Airbnbs</li>
              <li>Spas &amp; Salons</li>
              <li>Yoga Studios</li>
              <li>Gift Shops</li>
            </ul>
            <p className="wh-intro-text">
              We offer a selection of in-store displays as well as educational signage to help explain the benefits of our natural materials to your customers.
            </p>

            {/* Faire banner */}
            <div className="faire-banner">
              <div className="faire-banner-left">
                <h3>For U.S. Retailers: Order via Faire</h3>
                <p>We have partnered with Faire to offer you a seamless wholesale experience. Net 60 terms and free returns for new retailers.</p>
              </div>
              <a href="#" className="faire-btn">Shop Pumigoods on Faire</a>
            </div>

            {/* Benefits */}
            <p className="benefits-title">Benefits of a Wholesale Account</p>
            <div className="benefits-grid">
              {BENEFITS.map((b) => (
                <div className="benefit-item" key={b.title}>
                  <div className="benefit-icon-wrap"><b.Icon /></div>
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="wh-form-section">
              <h2 className="wh-form-title">International &amp; Custom Inquiries</h2>
              <p className="wh-form-subtitle">Not on Faire? Looking for international distribution? Fill out the form below:</p>
              <form className="wh-form" onSubmit={handleSubmit}>
                <div className="wh-field">
                  <label>Your name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="wh-field">
                  <label>Your email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="wh-field">
                  <label>Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} />
                </div>
                <div className="wh-field">
                  <label>Your message (optional)</label>
                  <textarea name="message" value={form.message} onChange={handleChange} />
                </div>
                <button type="submit" className="wh-submit-btn">
                  {submitted ? "✓ Sent!" : "Submit"}
                </button>
              </form>
            </div>
          </div>

          {/* ── Right: Sidebar ── */}
          <aside className="wh-sidebar">

            <div className="sidebar-block">
              <h3>Search</h3>
              <div className="sidebar-search">
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button>Search</button>
              </div>
            </div>

            <div className="sidebar-block">
              <h3>Recent Posts</h3>
              <hr className="sidebar-divider" />
              {RECENT_POSTS.map((post) => (
                <a key={post} href="#" className="sidebar-link">{post}</a>
              ))}
            </div>

            <div className="sidebar-block">
              <h3>Recent Comments</h3>
              <hr className="sidebar-divider" />
              <p className="no-comments">No comments to show.</p>
            </div>

            <div className="sidebar-block">
              <h3>Archives</h3>
              <hr className="sidebar-divider" />
              {ARCHIVES.map((a) => (
                <span key={a} className="sidebar-plain">{a}</span>
              ))}
            </div>

            <div className="sidebar-block">
              <h3>Categories</h3>
              <hr className="sidebar-divider" />
              {CATEGORIES.map((c) => (
                <span key={c} className="sidebar-plain">{c}</span>
              ))}
            </div>

          </aside>
        </div>

        <SubscribeBanner />
      </div>
    </>
  );
}
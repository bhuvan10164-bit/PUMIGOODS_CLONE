"use client";
import { useState } from "react";
import SubscribeBanner from "../../components/SubscribeBanner";

const FAQS = [
  {
    q: "Will I receive the same product that I see in the picture?",
    a: "Yes, absolutely. We ensure our product images are accurate and taken from real product samples. Every item you see on our website is photographed to reflect the exact size, material, and design.no filters, no digital manipulation",
  },
  {
    q: "How can I return an item?",
    a: "We offer a 100% Money-Back Guarantee. If you're not satisfied with your purchase, just email us at support@pumigoods.com within 30 days of receiving your order. No questions asked—we'll refund you!",
  },
  {
    q: 'Will you restock items indicated as "out of stock?"',
    a: "Most of the time yes! Our products are handcrafted in small batches, so they do sell out fast. Hit the “Notify Me” button to get a heads-up when it’s back",
  },
  {
    q: "How much does shipping cost?",
    a: "We offer a flat-rate shipping fee of $6.99 for all U.S. orders. Orders over $60 qualify for free shipping",
  },
  {
    q: "Are PumiGoods products USDA BioPreferred® certified?",
    a: "Yes! Many of our products like our bamboo toothbrush and neem comb are registered in the USDA BioPreferred® Program, ensuring verified biobased content.",
  },
  {
    q: 'Are your products really 100% biodegradable or just labeled "eco-friendly"?',
    a: "Great question! All our products are made from natural, compostable materials like bamboo, neem wood, and loofah. We never green washour materials return to the Earth without leaving behind toxins or microplastics.",
  },
  {
    q: "How fast is shipping within the US?",
    a: "Standard delivery is between 3–6 business days after your order is placed. All items are shipped from our warehouse in Austin, Texas",
  },
  {
    q: "I have sensitive skin. Are your loofahs and brushes safe for me?",
    a: "Absolutely. Our loofah pads are naturally hypoallergenic and chemical-free. They gently exfoliate without irritation, making them perfect for sensitive or eczema-prone skin..",
  },
  {
    q: "Are your products tested on animals?",
    a: "Never. All PumiGoods products are cruelty-free and vegan no animal testing, no animal-based ingredients.",
  },
  {
    q: "How do I care for my PumiGoods items to make them last longer?",
    a: "Just rinse and air-dry them after use. For brushes and combs, a quick wipe every few days helps. Keep them away from constantly wet surfaces and they’ll last months.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes! All orders over $60 qualify for free standard shipping anywhere in the U.S.",
  },
  {
    q: "What makes PumiGoods different from other eco brands on Amazon?",
    a: "We're not just eco-friendly we're values-driven. We blend modern minimalist design with deep-rooted wellness traditions, and every product supports artisans, fair wages, and waste-free living..",
  },
  {
    q: "Is anything in your products treated or coated with chemicals?",
    a: "No way. We never use artificial finishes or chemical treatments. What you see is exactly what you get pure, natural materials",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span
          className="text-sm text-gray-700 pr-6 leading-snug group-hover:text-gray-900 transition-colors"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {faq.q}
        </span>
        <span
          className="flex-shrink-0 text-gray-400 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/* Animated answer */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p className="text-sm text-gray-500 leading-relaxed pb-5 pr-6">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQContact() {
  const [openIndex, setOpenIndex] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", phone: "", company: "", message: "" });
  };

  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#2e8b4a] focus:ring-1 focus:ring-[#2e8b4a] transition-colors bg-white placeholder-transparent";

  return (
    <section className="font-sans bg-white py-14 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* LEFT — FAQ */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.2em] text-gray-800 uppercase mb-6">
            Frequently Asked Questions
          </h2>
          <div>
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — Contact Form */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.2em] text-gray-800 uppercase mb-6">
            Contact Us For Any Questions
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-600">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-600">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-600">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-600">Company</label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-600">Your Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={7}
                className={inputClass}
                required
                style={{ resize: "vertical" }}
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="px-6 py-3 text-xs font-bold tracking-widest uppercase text-white rounded transition-all"
                style={{
                  background: submitted ? "#226e3a" : "#2e8b4a",
                  transform: submitted ? "scale(0.98)" : "scale(1)",
                  transition: "background 0.2s, transform 0.15s",
                }}
              >
                {submitted ? "Sent ✓" : "Ask a Question"}
              </button>
            </div>

          </form>
        </div>

      </div>
      <SubscribeBanner/>
    </section>
  );
}
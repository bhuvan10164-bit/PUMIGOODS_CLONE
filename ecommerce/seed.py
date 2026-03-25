import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from products.models import Product

def seed_db():
    products = [
        {
            "id": 1,
            "name": "Handleless Bamboo Hair Brush – Portable Scalp Massager",
            "category": "Personal Care",
            "price": 7.99,
            "currency": "USD",
            "images": {
                "before_image": "https://pumigoods.com/wp-content/uploads/2025/07/xqfnxxwjqgtwaqapgoue-430x430.webp",
                "hover_image":  "https://pumigoods.com/wp-content/uploads/2025/07/l1vn3ynz1ctxycsava6l-300x300.webp",
                "gallery": [
                    "https://pumigoods.com/wp-content/uploads/2025/07/xqfnxxwjqgtwaqapgoue-430x430.webp",
                    "https://pumigoods.com/wp-content/uploads/2025/07/l1vn3ynz1ctxycsava6l-300x300.webp",
                ],
            },
            "description": {
                "ergonomic_grip":  "Innovative oval shape fits perfectly in your hand for precise control.",
                "scalp_therapy":   "Air-cushioned bamboo bristles provide a deep, stress-relieving massage.",
                "travel_friendly": "Compact, lightweight design fits easily in handbags and cosmetic kits.",
                "eco_conscious":   "Crafted from sustainable bamboo to reduce static and frizz.",
                "versatile":       "Perfect for all hair types—thick, thin, curly, or straight.",
            },
            "features": [
                "Handleless design",
                "Portable and lightweight",
                "Eco-friendly bamboo material",
                "Scalp massaging bristles",
                "Suitable for all hair types",
            ],
            "quantity": { "default": 1, "min": 1, "max": 10 },
            "actions":  { "add_to_cart": True, "compare": True, "add_to_wishlist": True },
        },
        {
            "id": 2,
            "name": "Egyptian Loofah Sponges – Natural Exfoliating Body Scrubber (3-Pack)",
            "category": "Personal Care",
            "price": 18.99,
            "currency": "USD",
            "images": {
                "before_image": "https://pumigoods.com/wp-content/uploads/2025/07/yp2bk71yupqcqe6mee01.webp",
                "hover_image":  "https://pumigoods.com/wp-content/uploads/2025/07/s7cpbokd2va2ft1452y5.webp",
                "gallery": [
                    "https://pumigoods.com/wp-content/uploads/2025/07/yp2bk71yupqcqe6mee01.webp",
                    "https://pumigoods.com/wp-content/uploads/2025/07/s7cpbokd2va2ft1452y5.webp",
                ],
            },
            "description": {
    "genuine_material": "100% Organic Egyptian Loofah (Luffa Aegyptiaca).",
    "deep_exfoliation": "Removes dead skin cells for a radiant, smooth glow.",
    "eco_friendly": "Fully biodegradable and plastic-free alternative to synthetic puffs.",
    "premium_design": "Features a durable Egyptian cotton handle for easy hanging.",
    "bonus_item": "Comes in a reusable cotton bag—perfect for storage or gifting.",
    "value_pack": "Includes 3 large (6″ x 6″) scrubbers."
  },
            "features": [
                "100% natural loofah plant fiber",
                "Deep exfoliating texture",
                "Biodegradable and compostable",
                "3-pack value set",
                "Suitable for face and body",
            ],
            "quantity": { "default": 1, "min": 1, "max": 10 },
            "actions":  { "add_to_cart": True, "compare": True, "add_to_wishlist": True },
        },
        {
            "id": 3,
            "name": "Wooden Coffee Stirrers – Biodegradable Birch Sticks (100 Pack)",
            "category": "Personal Care",
            "price": 8.97,
            "currency": "USD",
            "images": {
                "before_image": "https://pumigoods.com/wp-content/uploads/2025/07/itmh35uvnnmrghnj2zfa.webp",
                "hover_image":  "https://pumigoods.com/wp-content/uploads/2025/07/kzh8xhe3f8cdt72p7pkk-700x700.webp",
                "gallery": [
                    "https://pumigoods.com/wp-content/uploads/2025/07/itmh35uvnnmrghnj2zfa.webp",
                    "https://pumigoods.com/wp-content/uploads/2025/07/kzh8xhe3f8cdt72p7pkk-700x700.webp",
                ],
            },
           "description": {
    "eco_friendly_material": "Made from 100% natural, renewable Birch wood.",
    "paddle_design": "Wide, rounded end (1.1″ width) mixes beverages faster than thin sticks.",
    "perfect_size": "6 inches (15cm) long—ideal for standard mugs and travel cups.",
    "splinter_free": "Smooth finish with no rough edges or taste transfer.",
    "versatile": "Perfect for coffee, tea, hot chocolate, and cocktails.",
    "value_pack": "Contains 100 disposable stirrers for home, office, or events."
  }
            ,
            
            "features": [
                "Neem oil-treated wood",
                "Reduces dandruff naturally",
                "Anti-static teeth",
                "Promotes hair growth",
                "100% plastic-free",
            ],
            "quantity": { "default": 1, "min": 1, "max": 10 },
            "actions":  { "add_to_cart": True, "compare": True, "add_to_wishlist": True },
        },
        {
            "id": 4,
            "name": "Wooden Scalp Massager – Sandalwood Head Therapy Comb",
            "category": "Personal Care",
            "price": 5.99,
            "currency": "USD",
            "images": {
                "before_image": "https://pumigoods.com/wp-content/uploads/2025/07/turtqudycchpewtujwxf.webp",
                "hover_image":  "https://pumigoods.com/wp-content/uploads/2025/07/aq0k3cc5hah9lsz2kdaa.webp",
                "gallery": [
                    "https://pumigoods.com/wp-content/uploads/2025/07/turtqudycchpewtujwxf.webp",
                    "https://pumigoods.com/wp-content/uploads/2025/07/aq0k3cc5hah9lsz2kdaa.webp",
                ],
            },
          "description": {
    "deep_massage": "Four-pronged sandalwood design targets pressure points across the scalp.",
    "stress_relief": "Gentle kneading motion eases tension headaches and promotes relaxation.",
    "hair_growth": "Boosts circulation to follicles, encouraging thicker and stronger hair.",
    "aromatic": "Natural sandalwood emits a subtle calming fragrance during use.",
    "ergonomic": "Fits comfortably in one hand for controlled, fatigue-free massaging."
  },
      "features": [
                "4-pronged sandalwood design",
                "Stimulates scalp circulation",
                "Relieves headaches and tension",
                "Natural sandalwood fragrance",
                "Ergonomic hand grip",
            ],
            "quantity": { "default": 1, "min": 1, "max": 10 },
            "actions":  { "add_to_cart": True, "compare": True, "add_to_wishlist": True },
        },
        {
            "id": 5,
            "name": "Neem Wood Comb – Oil Treated for Dandruff & Hair Growth",
            "category": "Personal Care",
            "price": 6.19,
            "currency": "USD",
            "images": {
                "before_image": "https://pumigoods.com/wp-content/uploads/2025/07/cw6q1gj9skfy3wv5aw7z.webp",
                "hover_image":  "https://pumigoods.com/wp-content/uploads/2025/07/qyom5ejr23zxassvvdwm.webp",
                "gallery": [
                    "https://pumigoods.com/wp-content/uploads/2025/07/cw6q1gj9skfy3wv5aw7z.webp",
                    "https://pumigoods.com/wp-content/uploads/2025/07/qyom5ejr23zxassvvdwm.webp",
                ],
            },
            "description": {
                "body_grade":     "Larger, firmer loofah designed specifically for full-body exfoliation.",
                "circulation":    "Stimulates blood flow leaving skin glowing and refreshed.",
                "lathers_well":   "Open-cell fiber structure creates a rich lather with minimal product.",
                "quick_dry":      "Naturally porous weave dries fast between uses to prevent bacteria.",
                "plastic_free":   "Packaged without plastic — completely sustainable from field to bathroom.",
            },
            "features": [
                "Full-body exfoliation grade",
                "Boosts blood circulation",
                "Rich lather creation",
                "Fast-drying porous weave",
                "Zero-plastic packaging",
            ],
            "quantity": { "default": 1, "min": 1, "max": 10 },
            "actions":  { "add_to_cart": True, "compare": True, "add_to_wishlist": True },
        },
        {
            "id": 6,
            "name": "Nylon Exfoliating Washcloth – Quick-Dry Body Scrubber",
            "category": "Personal Care",
            "price": 9.99,
            "currency": "USD",
            "images": {
                "before_image": "https://pumigoods.com/wp-content/uploads/2025/07/iqsiebsbtklgbpfqufwu.webp",
                "hover_image":  "https://pumigoods.com/wp-content/uploads/2025/07/ywulmy7uvpvcxkydriuy.webp",
                "gallery": [
                    "https://pumigoods.com/wp-content/uploads/2025/07/iqsiebsbtklgbpfqufwu.webp",
                    "https://pumigoods.com/wp-content/uploads/2025/07/ywulmy7uvpvcxkydriuy.webp",
                ],
            },
            "description": {
    "deep_exfoliation": "Textured nylon fabric effectively removes dead skin cells and unclogs pores.",
    "more_hygienic": "Air-dries rapidly to prevent mold, mildew, and bacteria growth common in loofahs.",
    "rich_lather": "Creates a luxurious foam with less soap or body wash than cotton cloths.",
    "durable_reusable": "Machine washable and designed to last for months without losing texture.",
    "quick_drying": "Perfect for travel, gym bags, and daily use.",
    "versatile": "Ideal for body scrubbing, makeup removal, and skin polishing."
  },

            "features": [
                "Charcoal-infused bristles",
                "FSC-certified bamboo handle",
                "BPA-free nylon",
                "Soft tip for sensitive gums",
                "USDA Certified Biobased",
            ],
            "quantity": { "default": 1, "min": 1, "max": 10 },
            "actions":  { "add_to_cart": True, "compare": True, "add_to_wishlist": True },
        },
        {
            "id": 7,
            "name": "Egyptian Loofah Body Scrubber – 100% Natural Exfoliator (3-Pack)",
            "category": "Personal Care",
            "price": 18.99,
            "currency": "USD",
            "images": {
                "before_image": "https://pumigoods.com/wp-content/uploads/2025/07/yrdgmz0juk3o6y97jfej.webp",
                "hover_image":  "https://pumigoods.com/wp-content/uploads/2025/07/xqfnxxwjqgtwaqapgoue-430x430.webp",
                "gallery": [
                    "https://pumigoods.com/wp-content/uploads/2025/07/yrdgmz0juk3o6y97jfej.webp",
                    "https://pumigoods.com/wp-content/uploads/2025/07/bmp1jpdehksk5fbpscab-700x700.webp",
                ],
            },
           "description": {
    "authentic_origin": "Grown in the nutrient-rich soils of Egypt for superior texture.",
    "large_surface_area": "Generously sized at 6.67″ x 6″ for faster, easier scrubbing.",
    "hypoallergenic": "Free from dyes, bleach, and petroleum-based plastics.",
    "deep_exfoliation": "Buffs away dead cells to reveal a radiant, youthful complexion.",
    "gift_ready": "Comes in a beautiful bag, making it a perfect spa gift set.",
    "biodegradable": "A completely zero-waste alternative to synthetic shower puffs."
  },

            "features": [
                "Vibrant multi-color options",
                "Firm exfoliating mesh",
                "Fast-drying construction",
                "Durable and tear-resistant",
                "Maximizes soap lather",
            ],
            "quantity": { "default": 1, "min": 1, "max": 10 },
            "actions":  { "add_to_cart": True, "compare": True, "add_to_wishlist": True },
        },
        {
            "id": 8,
            "name": "Bamboo Toothbrushes – Soft Bristle Family Pack (10 Count)",
            "category": "Kitchen & Home",
            "price": 9.98,
            "currency": "USD",
            "images": {
                "before_image": "https://pumigoods.com/wp-content/uploads/2025/07/jbhryysipqrsvmrourun.webp",
                "hover_image":  "https://pumigoods.com/wp-content/uploads/2025/07/jprcg19sp2prbjwfyfdi-700x700.webp",
                "gallery": [
                    "https://pumigoods.com/wp-content/uploads/2025/07/jbhryysipqrsvmrourun.webp",
                    "https://pumigoods.com/wp-content/uploads/2025/07/jprcg19sp2prbjwfyfdi-700x700.webp",
                ],
            },
            "description": {
    "family_value_pack": "Contains 10 high-quality biodegradable toothbrushes.",
    "no_confusion": "Each handle is individually numbered (1-10) so family members never mix them up.",
    "soft_bristles": "BPA-free nylon bristles are gentle on enamel and sensitive gums.",
    "eco_friendly": "Handles made from 100% sustainable, compostable bamboo.",
    "plastic_free_packaging": "Packed in pairs (2 per box) inside the main carton to reduce waste.",
    "ergonomic": "Smooth, water-resistant handle provides a comfortable grip."
  }
,
            "features": [
                "Sustainably sourced birch",
                "Splinter-free smooth finish",
                "Taste-neutral untreated wood",
                "100-count bulk pack",
                "Fully compostable",
            ],
            "quantity": { "default": 1, "min": 1, "max": 50 },
            "actions":  { "add_to_cart": True, "compare": True, "add_to_wishlist": True },
        },
        {
            "id": 9,
            "name": "Bamboo Paddle Hair Brush – Detangling Scalp Massager",
            "category": "Bath & Home",
            "price": 6.58,
            "currency": "USD",
            "images": {
                "before_image": "https://pumigoods.com/wp-content/uploads/2025/07/s0xnw9j4utgwuozkp5kx-150x150.webp",
                "hover_image":  "https://pumigoods.com/wp-content/uploads/2025/07/wepf3ah2hihzr8aqu8c3-300x300.webp",
                "gallery": [
                    "https://pumigoods.com/wp-content/uploads/2025/07/s0xnw9j4utgwuozkp5kx-150x150.webp",
                    "https://pumigoods.com/wp-content/uploads/2025/07/wepf3ah2hihzr8aqu8c3-300x300.webp",
                ],
            },
             "description": {
    "anti_static": "Natural bamboo bristles reduce frizz and flyaways instantly.",
    "scalp_massage": "High-resilience rubber cushion provides a soothing head massage.",
    "detangling": "Rounded tips glide gently through knots without breaking hair.",
    "lightweight": "Portable design fits easily in gym bags, backpacks, and purses.",
    "versatile": "Perfect for men, women, kids, and even grooming pets.",
    "eco_friendly": "Crafted from sustainable bamboo, a renewable alternative to plastic."
  }
,
            "features": [
                "Natural loofah fiber base",
                "Air-circulating drainage design",
                "Extends soap bar lifespan",
                "Biodegradable materials",
                "Minimalist countertop design",
            ],
            "quantity": { "default": 1, "min": 1, "max": 10 },
            "actions":  { "add_to_cart": True, "compare": True, "add_to_wishlist": True },
        },
        {
            "id": 10,
            "name": "Exfoliating Loofah Sponge Pads – Natural Body Scrubber (10 Pack)",
            "category": "Personal Care",
            "price": 8.99,
            "currency": "USD",
            "images": {
                "before_image": "https://pumigoods.com/wp-content/uploads/2025/07/knhjkyxu0lmknypfkqxy.webp",
                "hover_image":  "https://pumigoods.com/wp-content/uploads/2025/07/peclvktyyaucdyhw3gno-150x150.webp",
                "gallery": [
                    "https://pumigoods.com/wp-content/uploads/2025/07/knhjkyxu0lmknypfkqxy.webp",
                    "https://pumigoods.com/wp-content/uploads/2025/07/peclvktyyaucdyhw3gno-150x150.webp",
                ],
            },
            "description": {
    "bulk_value": "Includes 10 premium loofah pads—perfect for large families or guests.",
    "dual_sided_design": "Features natural loofah on the front for scrubbing and soft terry cloth on the back.",
    "secure_grip": "Equipped with an elastic hand strap to keep the pad firmly in your palm while scrubbing.",
    "deep_cleaning": "Removes dead skin, dirt, and oil to unclog pores and prevent acne.",
    "versatile": "Ideal for showering, bathing, or facial exfoliation.",
    "eco_friendly": "Made from sustainable plant fibers that are biodegradable."
  }
,
            "features": [
                "Extra-wide paddle head",
                "Flexible air-cushion base",
                "Rounded bamboo pins",
                "Anti-static natural bamboo",
                "Suitable for all hair types",
            ],
            "quantity": { "default": 1, "min": 1, "max": 10 },
            "actions":  { "add_to_cart": True, "compare": True, "add_to_wishlist": True },
        },
    ]
    Product.objects.all().delete()
    for item in products:
        Product.objects.create(**item)

    print(f"Successfully seeded {len(products)} products.")

if __name__ == '__main__':
    seed_db()

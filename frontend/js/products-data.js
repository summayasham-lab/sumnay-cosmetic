// Sumnay Cosmetic — product seed data
// Maps each of the 42 real product photos to a full product record.
// Used both to seed the MongoDB database and as fallback static data for the frontend.

const products = [
  // ---------------- Blush ----------------
  { id: "blush-berry", name: "Berry Flush Blush", category: "Blush", price: 1350, image: "images/products/blush_berry.jpeg", shade: "#9C4259", description: "A deep berry blush for a natural flushed-cheek finish." },
  { id: "blush-coral", name: "Coral Bloom Blush", category: "Blush", price: 1350, image: "images/products/blush_coral.jpeg", shade: "#E0715A", description: "Bright coral pigment that brings warmth to any skin tone." },
  { id: "blush-nude", name: "Nude Glow Blush", category: "Blush", price: 1350, image: "images/products/blush_nude.jpeg", shade: "#D9A88C", description: "A soft nude-rose shade for a barely-there, natural look." },
  { id: "blush-peach", name: "Peach Whisper Blush", category: "Blush", price: 1350, image: "images/products/blush_peach.jpeg", shade: "#E8967A", description: "Sheer peach flush with a soft satin finish." },
  { id: "blush-rose", name: "Rose Petal Blush", category: "Blush", price: 1450, image: "images/products/blush_rose.jpeg", shade: "#C97E8B", description: "Classic rose-toned blush, buildable for day or night." },
  { id: "blush-shimmer", name: "Shimmer Mauve Blush", category: "Blush", price: 1550, image: "images/products/blush_shimmer.jpeg", shade: "#A9728C", description: "Mauve blush with fine shimmer for a lit-from-within glow." },

  // ---------------- Brow ----------------
  { id: "brow-blonde", name: "Blonde Brow Pencil", category: "Brow", price: 950, image: "images/products/brow_blonde.jpeg", shade: "#C9A876", description: "Fine-tip brow pencil for fair, blonde brow tones." },
  { id: "brow-dark", name: "Dark Brow Definer", category: "Brow", price: 950, image: "images/products/brow_dark.jpeg", shade: "#2E2320", description: "Rich, dark pigment for bold, defined brows." },
  { id: "brow-dual", name: "Dual-Tip Brow Pencil", category: "Brow", price: 1050, image: "images/products/brow_dual.jpeg", shade: "#4A3A2E", description: "Pencil on one end, spoolie on the other for shaping and blending." },
  { id: "brow-micro", name: "Micro Detail Brow Pen", category: "Brow", price: 1100, image: "images/products/brow_micro.jpeg", shade: "#3D2E24", description: "Ultra-fine tip that mimics individual brow hairs." },
  { id: "brow-pomade", name: "Brow Pomade", category: "Brow", price: 1200, image: "images/products/brow_pomade.jpeg", shade: "#4F3A26", description: "Long-wear pomade for sculpted, full brows." },
  { id: "brow-sculpt", name: "Brow Sculpting Wax", category: "Brow", price: 1000, image: "images/products/brow_sculpt.jpeg", shade: "#8A7A6A", description: "Clear-hold wax to lift and lay brow hairs in place." },

  // ---------------- Brush ----------------
  { id: "brush-angled", name: "Angled Contour Brush", category: "Brush", price: 850, image: "images/products/brush_angled.jpeg", shade: null, description: "Angled brush for precise contour and blush application." },
  { id: "brush-blend", name: "Blending Brush", category: "Brush", price: 750, image: "images/products/brush_blend.jpeg", shade: null, description: "Soft fluffy brush for seamless eyeshadow blending." },
  { id: "brush-fine", name: "Fine Detail Brush", category: "Brush", price: 650, image: "images/products/brush_fine.jpeg", shade: null, description: "Precision brush for eyeliner and small detail work." },
  { id: "brush-flat", name: "Flat Foundation Brush", category: "Brush", price: 900, image: "images/products/brush_flat.jpeg", shade: null, description: "Dense flat brush for streak-free foundation application." },
  { id: "brush-powder", name: "Powder Brush", category: "Brush", price: 950, image: "images/products/brush_powder.jpeg", shade: null, description: "Large fluffy brush for setting powder and bronzer." },
  { id: "brush-set", name: "Complete Brush Set", category: "Brush", price: 3200, image: "images/products/brush_set.jpeg", shade: null, description: "Full 10-piece brush set covering face and eye essentials." },

  // ---------------- Eyeliner ----------------
  { id: "eyeliner-black", name: "Jet Black Eyeliner", category: "Eyeliner", price: 900, image: "images/products/eyeliner_black.jpeg", shade: "#0D0D0D", description: "Intense black liquid liner with a fine precision tip." },
  { id: "eyeliner-bronze", name: "Bronze Shimmer Eyeliner", category: "Eyeliner", price: 950, image: "images/products/eyeliner_bronze.jpeg", shade: "#8A5A2E", description: "Metallic bronze liner for a warm, sun-kissed eye look." },
  { id: "eyeliner-gel", name: "Gel Eyeliner Pot", category: "Eyeliner", price: 1100, image: "images/products/eyeliner_gel.jpeg", shade: "#1A1A1A", description: "Creamy gel formula for a soft or sharp line, your choice." },
  { id: "eyeliner-matte", name: "Matte Black Eyeliner", category: "Eyeliner", price: 900, image: "images/products/eyeliner_matte.jpeg", shade: "#111111", description: "True matte finish, no shine, all-day wear." },
  { id: "eyeliner-pencil", name: "Kohl Eyeliner Pencil", category: "Eyeliner", price: 800, image: "images/products/eyeliner_pencil.jpeg", shade: "#181818", description: "Smudge-friendly kohl pencil for a smoky eye base." },
  { id: "eyeliner-white", name: "White Eyeliner Pencil", category: "Eyeliner", price: 800, image: "images/products/eyeliner_white.jpeg", shade: "#F5F0E8", description: "Brightening white liner for the waterline and inner corner." },

  // ---------------- Foundation ----------------
  { id: "foundation-cream", name: "Cream Finish Foundation", category: "Foundation", price: 2400, image: "images/products/foundation_cream.jpeg", shade: "#E8C9A8", description: "Medium coverage with a dewy cream finish." },
  { id: "foundation-matte", name: "Matte Finish Foundation", category: "Foundation", price: 2400, image: "images/products/foundation_matte.jpeg", shade: "#DDBB98", description: "Full coverage, shine-free matte finish for all-day wear." },
  { id: "foundation-serum", name: "Serum Foundation", category: "Foundation", price: 2900, image: "images/products/foundation_serum.jpeg", shade: "#E4CBAE", description: "Skincare-infused foundation with a lightweight, glowy finish." },
  { id: "foundation-silk", name: "Silk Touch Foundation", category: "Foundation", price: 2600, image: "images/products/foundation_silk.jpeg", shade: "#E0C4A2", description: "Silky, blurring formula that smooths texture on application." },
  { id: "foundation-stick", name: "Foundation Stick", category: "Foundation", price: 2200, image: "images/products/foundation_stick.jpeg", shade: "#D9B48F", description: "Portable stick foundation for quick, buildable coverage." },
  { id: "foundation-tint", name: "Skin Tint", category: "Foundation", price: 2100, image: "images/products/foundation_tint.jpeg", shade: "#EAD1B4", description: "Sheer, natural tint for a your-skin-but-better finish." },

  // ---------------- Lipstick ----------------
  { id: "lipstick-crimson", name: "Crimson Red Lipstick", category: "Lipstick", price: 1450, image: "images/products/lipstick_crimson.jpeg", shade: "#A61E2E", description: "Bold true-red lipstick with a satin finish." },
  { id: "lipstick-nude", name: "Nude Rose Lipstick", category: "Lipstick", price: 1450, image: "images/products/lipstick_nude.jpeg", shade: "#C08D77", description: "Everyday nude with a subtle rose undertone." },
  { id: "lipstick-peach", name: "Peach Sorbet Lipstick", category: "Lipstick", price: 1450, image: "images/products/lipstick_peach.jpeg", shade: "#E28F6D", description: "Fresh peach shade with a soft satin finish." },
  { id: "lipstick-plum", name: "Plum Noir Lipstick", category: "Lipstick", price: 1500, image: "images/products/lipstick_plum.jpeg", shade: "#5C2A4A", description: "Deep plum for a dramatic evening look." },
  { id: "lipstick-rosewood", name: "Rosewood Lipstick", category: "Lipstick", price: 1450, image: "images/products/lipstick_rosewood.jpeg", shade: "#8F4A4E", description: "Warm rosewood shade that flatters most skin tones." },
  { id: "lipstick-ruby", name: "Ruby Red Lipstick", category: "Lipstick", price: 1550, image: "images/products/lipstick_ruby.jpeg", shade: "#8E1B2B", description: "Rich ruby red with a glossy, hydrating finish." },

  // ---------------- Mascara ----------------
  { id: "mascara-brown", name: "Brown Volume Mascara", category: "Mascara", price: 1300, image: "images/products/mascara_brown.jpeg", shade: "#3B2A20", description: "Soft brown mascara for a natural, no-makeup lash look." },
  { id: "mascara-clear", name: "Clear Lash Mascara", category: "Mascara", price: 1000, image: "images/products/mascara_clear.jpeg", shade: null, description: "Clear formula to groom and set brows or lashes." },
  { id: "mascara-curling", name: "Curling Mascara", category: "Mascara", price: 1400, image: "images/products/mascara_curling.jpeg", shade: "#1A1A1A", description: "Curved brush that lifts and curls lashes on application." },
  { id: "mascara-fiber", name: "Fiber Lash Mascara", category: "Mascara", price: 1500, image: "images/products/mascara_fiber.jpeg", shade: "#0D0D0D", description: "Lash-extending fibers for dramatic length and volume." },
  { id: "mascara-serum", name: "Lash Serum Mascara", category: "Mascara", price: 1600, image: "images/products/mascara_serum.jpeg", shade: "#1F1F1F", description: "Conditioning serum formula that cares for lashes while it colors." },
  { id: "mascara-volume", name: "Volume Boost Mascara", category: "Mascara", price: 1400, image: "images/products/mascara_volume.jpeg", shade: "#151515", description: "Thick brush for maximum volume in one coat." },

  // ---------------- Fragrance ----------------
  { id: "fragrance-amber", name: "Amber Nights Eau de Parfum", category: "Fragrance", price: 3800, image: "images/products/fragrance_amber.jpeg", shade: null, description: "Warm amber fragrance for evening wear." },
  { id: "fragrance-citrus", name: "Citrus Splash Eau de Toilette", category: "Fragrance", price: 2900, image: "images/products/fragrance_citrus.jpeg", shade: null, description: "Bright, zesty citrus scent perfect for daytime." },
  { id: "fragrance-fresh", name: "Fresh Linen Cologne", category: "Fragrance", price: 3200, image: "images/products/fragrance_fresh.jpeg", shade: null, description: "Clean, crisp linen scent with a light finish." },
  { id: "fragrance-musk", name: "White Musk Perfume", category: "Fragrance", price: 3500, image: "images/products/fragrance_musk.jpeg", shade: null, description: "Soft, powdery musk for everyday wear." },
  { id: "fragrance-night", name: "Midnight Bloom Perfume", category: "Fragrance", price: 4000, image: "images/products/fragrance_night.jpeg", shade: null, description: "Deep floral notes for a mysterious evening scent." },
  { id: "fragrance-oud", name: "Oud Royale Perfume", category: "Fragrance", price: 4500, image: "images/products/fragrance_oud.jpeg", shade: null, description: "Rich, intense oud fragrance with long-lasting wear." },
  { id: "fragrance-rose", name: "Rose Petal Perfume", category: "Fragrance", price: 3300, image: "images/products/fragrance_rose.jpeg", shade: null, description: "Classic rose fragrance, romantic and timeless." },
  { id: "fragrance-vanilla", name: "Vanilla Dreams Eau de Parfum", category: "Fragrance", price: 3100, image: "images/products/fragrance_vanilla.jpeg", shade: null, description: "Warm, sweet vanilla scent for a cozy feel." },
  { id: "fragrance-woody", name: "Woody Oak Cologne", category: "Fragrance", price: 3400, image: "images/products/fragrance_woody.jpeg", shade: null, description: "Grounded, woody notes for a confident finish." },

  // ---------------- Skincare ----------------
  { id: "skincare-cleanser", name: "Gentle Foam Cleanser", category: "Skincare", price: 1400, image: "images/products/skincare_cleanser.jpeg", shade: null, description: "Sulfate-free foaming cleanser for daily use." },
  { id: "skincare-toner", name: "Balancing Toner", category: "Skincare", price: 1300, image: "images/products/skincare_toner.jpeg", shade: null, description: "Alcohol-free toner that preps skin for serums." },
  { id: "skincare-serum", name: "Hydra Glow Serum", category: "Skincare", price: 2600, image: "images/products/skincare_serum.jpeg", shade: null, description: "Hyaluronic acid serum for deep hydration and glow." },
  { id: "skincare-moisturizer", name: "Daily Moisturizer", category: "Skincare", price: 2000, image: "images/products/skincare_moisturizer.jpeg", shade: null, description: "Lightweight, all-day hydration for every skin type." },
  { id: "skincare-sunscreen", name: "SPF 50 Sunscreen", category: "Skincare", price: 1800, image: "images/products/skincare_sunscreen.jpeg", shade: null, description: "Broad-spectrum SPF 50 protection, no white cast." },
  { id: "skincare-mask", name: "Clay Detox Mask", category: "Skincare", price: 1700, image: "images/products/skincare_mask.jpeg", shade: null, description: "Purifying clay mask to draw out impurities." },
  { id: "skincare-eyecream", name: "Brightening Eye Cream", category: "Skincare", price: 2200, image: "images/products/skincare_eyecream.jpeg", shade: null, description: "Targets dark circles and puffiness around the eyes." },
  { id: "skincare-exfoliator", name: "Gentle Exfoliating Scrub", category: "Skincare", price: 1500, image: "images/products/skincare_exfoliator.jpeg", shade: null, description: "Removes dead skin without over-stripping." },
  { id: "skincare-oil", name: "Nourishing Face Oil", category: "Skincare", price: 2400, image: "images/products/skincare_oil.jpeg", shade: null, description: "Lightweight facial oil rich in antioxidants." },
  { id: "skincare-mist", name: "Hydrating Face Mist", category: "Skincare", price: 1200, image: "images/products/skincare_mist.jpeg", shade: null, description: "Refreshing mist to hydrate skin throughout the day." },

  // ---------------- Haircare ----------------
  { id: "haircare-shampoo", name: "Repair Shampoo", category: "Haircare", price: 1600, image: "images/products/haircare_shampoo.jpeg", shade: null, description: "Repairs damaged, over-processed hair." },
  { id: "haircare-conditioner", name: "Deep Conditioner", category: "Haircare", price: 1700, image: "images/products/haircare_conditioner.jpeg", shade: null, description: "Deeply conditions and softens dry hair." },
  { id: "haircare-oil", name: "Argan Hair Oil", category: "Haircare", price: 2100, image: "images/products/haircare_oil.jpeg", shade: null, description: "Lightweight argan oil for shine and frizz control." },
  { id: "haircare-mask", name: "Nourishing Hair Mask", category: "Haircare", price: 2000, image: "images/products/haircare_mask.jpeg", shade: null, description: "Weekly deep treatment for dry, brittle hair." },
  { id: "haircare-serum", name: "Shine Boost Serum", category: "Haircare", price: 1800, image: "images/products/haircare_serum.jpeg", shade: null, description: "Lightweight serum for added shine and smoothness." },
  { id: "haircare-spray", name: "Heat Protectant Spray", category: "Haircare", price: 1500, image: "images/products/haircare_spray.jpeg", shade: null, description: "Shields hair from heat styling damage." },
  { id: "haircare-gel", name: "Strong Hold Gel", category: "Haircare", price: 1300, image: "images/products/haircare_gel.jpeg", shade: null, description: "Firm hold styling gel with a natural finish." },
  { id: "haircare-cream", name: "Anti-Frizz Cream", category: "Haircare", price: 1600, image: "images/products/haircare_cream.jpeg", shade: null, description: "Smooths and tames frizz in humid weather." },
  { id: "haircare-mousse", name: "Volumizing Mousse", category: "Haircare", price: 1400, image: "images/products/haircare_mousse.jpeg", shade: null, description: "Adds body and lift to fine, flat hair." },
  { id: "haircare-treatment", name: "Keratin Treatment", category: "Haircare", price: 2800, image: "images/products/haircare_treatment.jpeg", shade: null, description: "Smoothing keratin treatment for frizz-free hair." }
];

// For Node/Express + browser <script> compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = products;
}

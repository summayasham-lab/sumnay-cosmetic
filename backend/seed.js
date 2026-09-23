// Seeds the database with the 7 categories and 42 real products.
// Run with: npm run seed

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Category = require('./models/Category');
const Product = require('./models/Product');

const categoryNames = ['Blush', 'Brow', 'Brush', 'Eyeliner', 'Foundation', 'Lipstick', 'Mascara', 'Fragrance', 'Skincare', 'Haircare'];

const productSeed = [
  { name: "Berry Flush Blush", categoryName: "Blush", price: 1350, image: "/images/products/blush_berry.jpeg", brand: "Sumnay", stock: 40, description: "A deep berry blush for a natural flushed-cheek finish." },
  { name: "Coral Bloom Blush", categoryName: "Blush", price: 1350, image: "/images/products/blush_coral.jpeg", brand: "Sumnay", stock: 40, description: "Bright coral pigment that brings warmth to any skin tone." },
  { name: "Nude Glow Blush", categoryName: "Blush", price: 1350, image: "/images/products/blush_nude.jpeg", brand: "Sumnay", stock: 40, description: "A soft nude-rose shade for a barely-there, natural look." },
  { name: "Peach Whisper Blush", categoryName: "Blush", price: 1350, image: "/images/products/blush_peach.jpeg", brand: "Sumnay", stock: 40, description: "Sheer peach flush with a soft satin finish." },
  { name: "Rose Petal Blush", categoryName: "Blush", price: 1450, image: "/images/products/blush_rose.jpeg", brand: "Sumnay", stock: 40, description: "Classic rose-toned blush, buildable for day or night." },
  { name: "Shimmer Mauve Blush", categoryName: "Blush", price: 1550, image: "/images/products/blush_shimmer.jpeg", brand: "Sumnay", stock: 40, description: "Mauve blush with fine shimmer for a lit-from-within glow." },

  { name: "Blonde Brow Pencil", categoryName: "Brow", price: 950, image: "/images/products/brow_blonde.jpeg", brand: "Sumnay", stock: 40, description: "Fine-tip brow pencil for fair, blonde brow tones." },
  { name: "Dark Brow Definer", categoryName: "Brow", price: 950, image: "/images/products/brow_dark.jpeg", brand: "Sumnay", stock: 40, description: "Rich, dark pigment for bold, defined brows." },
  { name: "Dual-Tip Brow Pencil", categoryName: "Brow", price: 1050, image: "/images/products/brow_dual.jpeg", brand: "Sumnay", stock: 40, description: "Pencil on one end, spoolie on the other for shaping and blending." },
  { name: "Micro Detail Brow Pen", categoryName: "Brow", price: 1100, image: "/images/products/brow_micro.jpeg", brand: "Sumnay", stock: 40, description: "Ultra-fine tip that mimics individual brow hairs." },
  { name: "Brow Pomade", categoryName: "Brow", price: 1200, image: "/images/products/brow_pomade.jpeg", brand: "Sumnay", stock: 40, description: "Long-wear pomade for sculpted, full brows." },
  { name: "Brow Sculpting Wax", categoryName: "Brow", price: 1000, image: "/images/products/brow_sculpt.jpeg", brand: "Sumnay", stock: 40, description: "Clear-hold wax to lift and lay brow hairs in place." },

  { name: "Angled Contour Brush", categoryName: "Brush", price: 850, image: "/images/products/brush_angled.jpeg", brand: "Sumnay", stock: 40, description: "Angled brush for precise contour and blush application." },
  { name: "Blending Brush", categoryName: "Brush", price: 750, image: "/images/products/brush_blend.jpeg", brand: "Sumnay", stock: 40, description: "Soft fluffy brush for seamless eyeshadow blending." },
  { name: "Fine Detail Brush", categoryName: "Brush", price: 650, image: "/images/products/brush_fine.jpeg", brand: "Sumnay", stock: 40, description: "Precision brush for eyeliner and small detail work." },
  { name: "Flat Foundation Brush", categoryName: "Brush", price: 900, image: "/images/products/brush_flat.jpeg", brand: "Sumnay", stock: 40, description: "Dense flat brush for streak-free foundation application." },
  { name: "Powder Brush", categoryName: "Brush", price: 950, image: "/images/products/brush_powder.jpeg", brand: "Sumnay", stock: 40, description: "Large fluffy brush for setting powder and bronzer." },
  { name: "Complete Brush Set", categoryName: "Brush", price: 3200, image: "/images/products/brush_set.jpeg", brand: "Sumnay", stock: 20, description: "Full 10-piece brush set covering face and eye essentials." },

  { name: "Jet Black Eyeliner", categoryName: "Eyeliner", price: 900, image: "/images/products/eyeliner_black.jpeg", brand: "Sumnay", stock: 40, description: "Intense black liquid liner with a fine precision tip." },
  { name: "Bronze Shimmer Eyeliner", categoryName: "Eyeliner", price: 950, image: "/images/products/eyeliner_bronze.jpeg", brand: "Sumnay", stock: 40, description: "Metallic bronze liner for a warm, sun-kissed eye look." },
  { name: "Gel Eyeliner Pot", categoryName: "Eyeliner", price: 1100, image: "/images/products/eyeliner_gel.jpeg", brand: "Sumnay", stock: 40, description: "Creamy gel formula for a soft or sharp line, your choice." },
  { name: "Matte Black Eyeliner", categoryName: "Eyeliner", price: 900, image: "/images/products/eyeliner_matte.jpeg", brand: "Sumnay", stock: 40, description: "True matte finish, no shine, all-day wear." },
  { name: "Kohl Eyeliner Pencil", categoryName: "Eyeliner", price: 800, image: "/images/products/eyeliner_pencil.jpeg", brand: "Sumnay", stock: 40, description: "Smudge-friendly kohl pencil for a smoky eye base." },
  { name: "White Eyeliner Pencil", categoryName: "Eyeliner", price: 800, image: "/images/products/eyeliner_white.jpeg", brand: "Sumnay", stock: 40, description: "Brightening white liner for the waterline and inner corner." },

  { name: "Cream Finish Foundation", categoryName: "Foundation", price: 2400, image: "/images/products/foundation_cream.jpeg", brand: "Sumnay", stock: 30, description: "Medium coverage with a dewy cream finish." },
  { name: "Matte Finish Foundation", categoryName: "Foundation", price: 2400, image: "/images/products/foundation_matte.jpeg", brand: "Sumnay", stock: 30, description: "Full coverage, shine-free matte finish for all-day wear." },
  { name: "Serum Foundation", categoryName: "Foundation", price: 2900, image: "/images/products/foundation_serum.jpeg", brand: "Sumnay", stock: 30, description: "Skincare-infused foundation with a lightweight, glowy finish." },
  { name: "Silk Touch Foundation", categoryName: "Foundation", price: 2600, image: "/images/products/foundation_silk.jpeg", brand: "Sumnay", stock: 30, description: "Silky, blurring formula that smooths texture on application." },
  { name: "Foundation Stick", categoryName: "Foundation", price: 2200, image: "/images/products/foundation_stick.jpeg", brand: "Sumnay", stock: 30, description: "Portable stick foundation for quick, buildable coverage." },
  { name: "Skin Tint", categoryName: "Foundation", price: 2100, image: "/images/products/foundation_tint.jpeg", brand: "Sumnay", stock: 30, description: "Sheer, natural tint for a your-skin-but-better finish." },

  { name: "Crimson Red Lipstick", categoryName: "Lipstick", price: 1450, image: "/images/products/lipstick_crimson.jpeg", brand: "Sumnay", stock: 40, description: "Bold true-red lipstick with a satin finish." },
  { name: "Nude Rose Lipstick", categoryName: "Lipstick", price: 1450, image: "/images/products/lipstick_nude.jpeg", brand: "Sumnay", stock: 40, description: "Everyday nude with a subtle rose undertone." },
  { name: "Peach Sorbet Lipstick", categoryName: "Lipstick", price: 1450, image: "/images/products/lipstick_peach.jpeg", brand: "Sumnay", stock: 40, description: "Fresh peach shade with a soft satin finish." },
  { name: "Plum Noir Lipstick", categoryName: "Lipstick", price: 1500, image: "/images/products/lipstick_plum.jpeg", brand: "Sumnay", stock: 40, description: "Deep plum for a dramatic evening look." },
  { name: "Rosewood Lipstick", categoryName: "Lipstick", price: 1450, image: "/images/products/lipstick_rosewood.jpeg", brand: "Sumnay", stock: 40, description: "Warm rosewood shade that flatters most skin tones." },
  { name: "Ruby Red Lipstick", categoryName: "Lipstick", price: 1550, image: "/images/products/lipstick_ruby.jpeg", brand: "Sumnay", stock: 40, description: "Rich ruby red with a glossy, hydrating finish." },

  { name: "Brown Volume Mascara", categoryName: "Mascara", price: 1300, image: "/images/products/mascara_brown.jpeg", brand: "Sumnay", stock: 40, description: "Soft brown mascara for a natural, no-makeup lash look." },
  { name: "Clear Lash Mascara", categoryName: "Mascara", price: 1000, image: "/images/products/mascara_clear.jpeg", brand: "Sumnay", stock: 40, description: "Clear formula to groom and set brows or lashes." },
  { name: "Curling Mascara", categoryName: "Mascara", price: 1400, image: "/images/products/mascara_curling.jpeg", brand: "Sumnay", stock: 40, description: "Curved brush that lifts and curls lashes on application." },
  { name: "Fiber Lash Mascara", categoryName: "Mascara", price: 1500, image: "/images/products/mascara_fiber.jpeg", brand: "Sumnay", stock: 40, description: "Lash-extending fibers for dramatic length and volume." },
  { name: "Lash Serum Mascara", categoryName: "Mascara", price: 1600, image: "/images/products/mascara_serum.jpeg", brand: "Sumnay", stock: 40, description: "Conditioning serum formula that cares for lashes while it colors." },
  { name: "Volume Boost Mascara", categoryName: "Mascara", price: 1400, image: "/images/products/mascara_volume.jpeg", brand: "Sumnay", stock: 40, description: "Thick brush for maximum volume in one coat." },

  { name: "Amber Nights Eau de Parfum", categoryName: "Fragrance", price: 3800, image: "/images/products/fragrance_amber.jpeg", brand: "Sumnay", stock: 25, description: "Warm amber fragrance for evening wear." },
  { name: "Citrus Splash Eau de Toilette", categoryName: "Fragrance", price: 2900, image: "/images/products/fragrance_citrus.jpeg", brand: "Sumnay", stock: 25, description: "Bright, zesty citrus scent perfect for daytime." },
  { name: "Fresh Linen Cologne", categoryName: "Fragrance", price: 3200, image: "/images/products/fragrance_fresh.jpeg", brand: "Sumnay", stock: 25, description: "Clean, crisp linen scent with a light finish." },
  { name: "White Musk Perfume", categoryName: "Fragrance", price: 3500, image: "/images/products/fragrance_musk.jpeg", brand: "Sumnay", stock: 25, description: "Soft, powdery musk for everyday wear." },
  { name: "Midnight Bloom Perfume", categoryName: "Fragrance", price: 4000, image: "/images/products/fragrance_night.jpeg", brand: "Sumnay", stock: 25, description: "Deep floral notes for a mysterious evening scent." },
  { name: "Oud Royale Perfume", categoryName: "Fragrance", price: 4500, image: "/images/products/fragrance_oud.jpeg", brand: "Sumnay", stock: 25, description: "Rich, intense oud fragrance with long-lasting wear." },
  { name: "Rose Petal Perfume", categoryName: "Fragrance", price: 3300, image: "/images/products/fragrance_rose.jpeg", brand: "Sumnay", stock: 25, description: "Classic rose fragrance, romantic and timeless." },
  { name: "Vanilla Dreams Eau de Parfum", categoryName: "Fragrance", price: 3100, image: "/images/products/fragrance_vanilla.jpeg", brand: "Sumnay", stock: 25, description: "Warm, sweet vanilla scent for a cozy feel." },
  { name: "Woody Oak Cologne", categoryName: "Fragrance", price: 3400, image: "/images/products/fragrance_woody.jpeg", brand: "Sumnay", stock: 25, description: "Grounded, woody notes for a confident finish." },

  { name: "Gentle Foam Cleanser", categoryName: "Skincare", price: 1400, image: "/images/products/skincare_cleanser.jpeg", brand: "Sumnay", stock: 30, description: "Sulfate-free foaming cleanser for daily use." },
  { name: "Balancing Toner", categoryName: "Skincare", price: 1300, image: "/images/products/skincare_toner.jpeg", brand: "Sumnay", stock: 30, description: "Alcohol-free toner that preps skin for serums." },
  { name: "Hydra Glow Serum", categoryName: "Skincare", price: 2600, image: "/images/products/skincare_serum.jpeg", brand: "Sumnay", stock: 30, description: "Hyaluronic acid serum for deep hydration and glow." },
  { name: "Daily Moisturizer", categoryName: "Skincare", price: 2000, image: "/images/products/skincare_moisturizer.jpeg", brand: "Sumnay", stock: 30, description: "Lightweight, all-day hydration for every skin type." },
  { name: "SPF 50 Sunscreen", categoryName: "Skincare", price: 1800, image: "/images/products/skincare_sunscreen.jpeg", brand: "Sumnay", stock: 30, description: "Broad-spectrum SPF 50 protection, no white cast." },
  { name: "Clay Detox Mask", categoryName: "Skincare", price: 1700, image: "/images/products/skincare_mask.jpeg", brand: "Sumnay", stock: 30, description: "Purifying clay mask to draw out impurities." },
  { name: "Brightening Eye Cream", categoryName: "Skincare", price: 2200, image: "/images/products/skincare_eyecream.jpeg", brand: "Sumnay", stock: 30, description: "Targets dark circles and puffiness around the eyes." },
  { name: "Gentle Exfoliating Scrub", categoryName: "Skincare", price: 1500, image: "/images/products/skincare_exfoliator.jpeg", brand: "Sumnay", stock: 30, description: "Removes dead skin without over-stripping." },
  { name: "Nourishing Face Oil", categoryName: "Skincare", price: 2400, image: "/images/products/skincare_oil.jpeg", brand: "Sumnay", stock: 30, description: "Lightweight facial oil rich in antioxidants." },
  { name: "Hydrating Face Mist", categoryName: "Skincare", price: 1200, image: "/images/products/skincare_mist.jpeg", brand: "Sumnay", stock: 30, description: "Refreshing mist to hydrate skin throughout the day." },

  { name: "Repair Shampoo", categoryName: "Haircare", price: 1600, image: "/images/products/haircare_shampoo.jpeg", brand: "Sumnay", stock: 30, description: "Repairs damaged, over-processed hair." },
  { name: "Deep Conditioner", categoryName: "Haircare", price: 1700, image: "/images/products/haircare_conditioner.jpeg", brand: "Sumnay", stock: 30, description: "Deeply conditions and softens dry hair." },
  { name: "Argan Hair Oil", categoryName: "Haircare", price: 2100, image: "/images/products/haircare_oil.jpeg", brand: "Sumnay", stock: 30, description: "Lightweight argan oil for shine and frizz control." },
  { name: "Nourishing Hair Mask", categoryName: "Haircare", price: 2000, image: "/images/products/haircare_mask.jpeg", brand: "Sumnay", stock: 30, description: "Weekly deep treatment for dry, brittle hair." },
  { name: "Shine Boost Serum", categoryName: "Haircare", price: 1800, image: "/images/products/haircare_serum.jpeg", brand: "Sumnay", stock: 30, description: "Lightweight serum for added shine and smoothness." },
  { name: "Heat Protectant Spray", categoryName: "Haircare", price: 1500, image: "/images/products/haircare_spray.jpeg", brand: "Sumnay", stock: 30, description: "Shields hair from heat styling damage." },
  { name: "Strong Hold Gel", categoryName: "Haircare", price: 1300, image: "/images/products/haircare_gel.jpeg", brand: "Sumnay", stock: 30, description: "Firm hold styling gel with a natural finish." },
  { name: "Anti-Frizz Cream", categoryName: "Haircare", price: 1600, image: "/images/products/haircare_cream.jpeg", brand: "Sumnay", stock: 30, description: "Smooths and tames frizz in humid weather." },
  { name: "Volumizing Mousse", categoryName: "Haircare", price: 1400, image: "/images/products/haircare_mousse.jpeg", brand: "Sumnay", stock: 30, description: "Adds body and lift to fine, flat hair." },
  { name: "Keratin Treatment", categoryName: "Haircare", price: 2800, image: "/images/products/haircare_treatment.jpeg", brand: "Sumnay", stock: 30, description: "Smoothing keratin treatment for frizz-free hair." }
];

async function seed() {
  await connectDB();

  console.log('Clearing existing categories and products...');
  await Category.deleteMany({});
  await Product.deleteMany({});

  console.log('Creating categories...');
  const categoryMap = {};
  for (const name of categoryNames) {
    const cat = await Category.create({ name });
    categoryMap[name] = cat._id;
  }

  console.log('Creating products...');
  for (const p of productSeed) {
    await Product.create({
      name: p.name,
      description: p.description,
      price: p.price,
      category: categoryMap[p.categoryName],
      brand: p.brand,
      stock: p.stock,
      image: p.image
    });
  }

  console.log(`Seeded ${categoryNames.length} categories and ${productSeed.length} products.`);
  mongoose.connection.close();
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});

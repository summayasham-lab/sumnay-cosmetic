const Product = require('../models/Product');
const Category = require('../models/Category');

// GET /api/products?category=Lipstick&search=ruby
async function getProducts(req, res) {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== 'all') {
      const cat = await Category.findOne({ name: new RegExp(`^${category}$`, 'i') });
      if (cat) filter.category = cat._id;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const products = await Product.find(filter).populate('category', 'name').sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products.', error: err.message });
  }
}

// GET /api/products/:id
async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product.', error: err.message });
  }
}

// POST /api/products  (admin only)
async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create product.', error: err.message });
  }
}

// PUT /api/products/:id  (admin only)
async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update product.', error: err.message });
  }
}

// DELETE /api/products/:id  (admin only)
async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Product deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product.', error: err.message });
  }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getRecommendations };

// ---------------------------------------------------------------------------
// Recommender System — content-based filtering
//
// For a given product, scores every other product by weighted similarity:
//   1. Category match      (weight 50) — same category products are most relevant
//   2. Price closeness     (weight 30) — products in a similar price range
//   3. Description overlap (weight 20) — Jaccard similarity of description words
//
// This is a lightweight, explainable content-based recommender — no external
// libraries or training data needed, appropriate for a catalog this size.
// ---------------------------------------------------------------------------

function jaccardSimilarity(textA, textB) {
  const wordsA = new Set(textA.toLowerCase().split(/\W+/).filter(Boolean));
  const wordsB = new Set(textB.toLowerCase().split(/\W+/).filter(Boolean));
  const intersection = new Set([...wordsA].filter(w => wordsB.has(w)));
  const union = new Set([...wordsA, ...wordsB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

function scoreSimilarity(target, candidate, maxPriceDiff) {
  let score = 0;

  // 1. Category match
  if (String(target.category) === String(candidate.category)) {
    score += 50;
  }

  // 2. Price closeness (closer price = higher score, out of 30)
  const priceDiff = Math.abs(target.price - candidate.price);
  const priceScore = maxPriceDiff === 0 ? 30 : 30 * (1 - priceDiff / maxPriceDiff);
  score += Math.max(0, priceScore);

  // 3. Description text overlap (out of 20)
  const textScore = jaccardSimilarity(target.description || '', candidate.description || '');
  score += textScore * 20;

  return score;
}

// GET /api/products/:id/recommendations?limit=4
async function getRecommendations(req, res) {
  try {
    const target = await Product.findById(req.params.id);
    if (!target) return res.status(404).json({ message: 'Product not found.' });

    const limit = parseInt(req.query.limit) || 4;
    const allProducts = await Product.find({ _id: { $ne: target._id } }).populate('category', 'name');

    if (allProducts.length === 0) return res.json([]);

    const maxPriceDiff = Math.max(...allProducts.map(p => Math.abs(p.price - target.price)), 1);

    const scored = allProducts.map(candidate => ({
      product: candidate,
      score: scoreSimilarity(target, candidate, maxPriceDiff)
    }));

    scored.sort((a, b) => b.score - a.score);

    const recommendations = scored.slice(0, limit).map(s => s.product);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate recommendations.', error: err.message });
  }
}

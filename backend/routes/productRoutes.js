const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getRecommendations
} = require('../controllers/productController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/', getProducts);
router.get('/:id/recommendations', getRecommendations);
router.get('/:id', getProductById);
router.post('/', requireAuth, requireAdmin, createProduct);
router.put('/:id', requireAuth, requireAdmin, updateProduct);
router.delete('/:id', requireAuth, requireAdmin, deleteProduct);

module.exports = router;

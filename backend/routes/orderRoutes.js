const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.post('/', requireAuth, createOrder);
router.get('/mine', requireAuth, getMyOrders);
router.get('/', requireAuth, requireAdmin, getAllOrders);
router.put('/:id/status', requireAuth, requireAdmin, updateOrderStatus);

module.exports = router;

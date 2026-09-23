const Order = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders  (requires login)
// Body: { items: [{ productId, quantity }], shippingAddress }
async function createOrder(req, res) {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cannot place an order with no items.' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}.` });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
      totalAmount += product.price * item.quantity;

      // reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      status: 'pending',
      paymentStatus: 'paid' // mock checkout — no real payment gateway, order is marked paid immediately
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order.', error: err.message });
  }
}

// GET /api/orders/mine  (requires login)
async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders.', error: err.message });
  }
}

// GET /api/orders  (admin only)
async function getAllOrders(req, res) {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders.', error: err.message });
  }
}

// PUT /api/orders/:id/status  (admin only)
async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update order status.', error: err.message });
  }
}

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };

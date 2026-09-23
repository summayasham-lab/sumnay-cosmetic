// Sumnay Cosmetic — shared cart logic (localStorage-based client cart)
// Note: this uses localStorage, which works fine when the site runs in a real
// browser off your server — it just won't persist in the in-chat preview panel.

const CART_KEY = 'sumnay_cart';

function getCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY));
    if (!Array.isArray(parsed)) return [];
    // filter out any malformed entries (missing productId or invalid quantity)
    return parsed.filter(item => item && item.productId && Number.isFinite(Number(item.quantity)));
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.productId !== productId);
  saveCart(cart);
}

function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(i => i.productId === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

function getCartTotalItems() {
  return getCart().reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
}

function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = getCartTotalItems();
}

document.addEventListener('DOMContentLoaded', updateCartCount);

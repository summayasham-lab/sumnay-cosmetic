// Sumnay Cosmetic — checkout page logic
//
// Note on product IDs: the frontend catalog (products-data.js) uses simple
// slug ids like "blush-berry" for fast client-side browsing/cart, while the
// backend database assigns its own MongoDB _id when seeded. Both share the
// exact same product `name`, so at checkout we fetch the real backend
// product list once and match by name to get the real _id the API needs.

document.addEventListener('DOMContentLoaded', async () => {
  const cart = getCart();
  const summaryBox = document.getElementById('order-summary');
  const msg = document.getElementById('form-msg');

  if (cart.length === 0) {
    summaryBox.innerHTML = `<p>Your bag is empty. <a href="products.html" style="color:var(--color-rose);">Go shopping</a>.</p>`;
    document.getElementById('checkout-form').style.display = 'none';
    return;
  }

  if (!getAuthToken()) {
    msg.classList.add('error');
    msg.textContent = 'Please sign in to complete checkout. Redirecting to sign in...';
    setTimeout(() => { window.location.href = 'login.html'; }, 1200);
    return;
  }

  const cartWithDetails = cart
    .map(item => ({ ...item, product: products.find(p => p.id === item.productId) }))
    .filter(item => item.product);

  const subtotal = cartWithDetails.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 250;
  const total = subtotal + shipping;

  summaryBox.innerHTML = `
    <h3 style="font-size:0.78rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--color-ink-soft); margin-bottom:1rem;">Order summary</h3>
    ${cartWithDetails.map(item => `
      <div class="summary-row"><span>${item.product.name} × ${item.quantity}</span><span>Rs. ${(item.product.price * item.quantity).toLocaleString()}</span></div>
    `).join('')}
    <div class="summary-row"><span>Shipping</span><span>Rs. ${shipping.toLocaleString()}</span></div>
    <div class="summary-row summary-total"><span>Total</span><span>Rs. ${total.toLocaleString()}</span></div>
  `;

  document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.className = 'form-msg';

    const shippingAddress = {
      street: document.getElementById('street').value.trim(),
      city: document.getElementById('city').value.trim(),
      postalCode: document.getElementById('postalCode').value.trim(),
      country: document.getElementById('country').value.trim()
    };

    try {
      // Fetch real backend products to map name -> real database _id
      const productsRes = await fetch(`${API_BASE}/products`);
      const backendProducts = await productsRes.json();

      const orderItems = cartWithDetails.map(item => {
        const backendMatch = backendProducts.find(bp => bp.name.toLowerCase() === item.product.name.toLowerCase());
        return backendMatch ? { productId: backendMatch._id, quantity: item.quantity } : null;
      }).filter(Boolean);

      if (orderItems.length === 0) {
        msg.classList.add('error');
        msg.textContent = 'Could not match your cart to the store database. Make sure the backend has been seeded (npm run seed).';
        return;
      }

      const orderRes = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ items: orderItems, shippingAddress })
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        msg.classList.add('error');
        msg.textContent = orderData.message || 'Could not place your order.';
        return;
      }

      clearCart();
      msg.classList.add('success');
      msg.textContent = 'Order placed successfully! Thank you for shopping with Sumnay Cosmetic.';
      document.getElementById('checkout-form').style.display = 'none';
      summaryBox.innerHTML += `<p style="margin-top:1rem; font-size:0.85rem;">Order ID: ${orderData._id}</p>`;

    } catch (err) {
      msg.classList.add('error');
      msg.textContent = 'Could not reach the server. Make sure the backend is running.';
    }
  });
});

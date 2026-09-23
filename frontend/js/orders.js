// Sumnay Cosmetic — order history page logic

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('orders-content');

  if (!getAuthToken()) {
    container.innerHTML = `
      <div class="empty-state">
        <h2 style="font-style:italic; font-family: var(--font-display);">Please sign in to view your orders.</h2>
        <a href="login.html" class="btn btn-primary" style="margin-top:1rem;">Sign in</a>
      </div>`;
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/orders/mine`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch orders');
    }

    const orders = await res.json();

    if (orders.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h2 style="font-style:italic; font-family: var(--font-display);">No orders yet.</h2>
          <p style="color:var(--color-ink-soft); margin: 1rem 0;">When you place an order, it'll show up here.</p>
          <a href="products.html" class="btn btn-primary">Start shopping</a>
        </div>`;
      return;
    }

    container.innerHTML = orders.map(order => `
      <div class="order-card">
        <div class="order-header">
          <div>
            <div class="order-id">Order #${order._id.slice(-8).toUpperCase()}</div>
            <div class="order-id">${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
          <span class="order-status status-${order.status}">${order.status}</span>
        </div>
        ${order.items.map(item => `
          <div class="order-item-row">
            <span>${item.name} × ${item.quantity}</span>
            <span>Rs. ${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        `).join('')}
        <div class="order-total-row">
          <span>Total</span>
          <span>Rs. ${order.totalAmount.toLocaleString()}</span>
        </div>
      </div>
    `).join('');

  } catch (err) {
    container.innerHTML = `
      <div class="empty-state">
        <h2 style="font-style:italic; font-family: var(--font-display);">Couldn't load your orders.</h2>
        <p style="color:var(--color-ink-soft); margin: 1rem 0;">Make sure the backend server is running.</p>
      </div>`;
  }
});

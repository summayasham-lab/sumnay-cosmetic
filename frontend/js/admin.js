// Sumnay Cosmetic — admin dashboard logic

document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('admin-root');
  const user = getCurrentUser();

  if (!getAuthToken() || !user) {
    root.innerHTML = `
      <div class="locked-state">
        <h2 style="font-style:italic; font-family: var(--font-display);">Please sign in.</h2>
        <a href="login.html" class="btn btn-primary" style="margin-top:1rem;">Sign in</a>
      </div>`;
    return;
  }

  if (user.role !== 'admin') {
    root.innerHTML = `
      <div class="locked-state">
        <h2 style="font-style:italic; font-family: var(--font-display);">Admin access only.</h2>
        <p style="color:var(--color-ink-soft); margin: 1rem 0;">Your account doesn't have admin permissions. See the backend README for how to grant admin access to a test account.</p>
        <a href="index.html" class="btn btn-outline">Back to shop</a>
      </div>`;
    return;
  }

  renderDashboard();
});

function renderDashboard() {
  const root = document.getElementById('admin-root');
  root.innerHTML = `
    <div class="admin-msg" id="admin-msg"></div>
    <div class="admin-tabs">
      <button class="admin-tab active" data-tab="products">Products</button>
      <button class="admin-tab" data-tab="orders">Orders</button>
    </div>

    <div class="admin-panel active" id="panel-products">
      <h3 style="font-family:var(--font-display); font-style:italic; margin-bottom:1rem;">Add a new product</h3>
      <form class="add-product-form" id="add-product-form">
        <input type="text" id="new-name" placeholder="Product name" required>
        <input type="text" id="new-category" placeholder="Category (e.g. Lipstick)" required>
        <input type="number" id="new-price" placeholder="Price (Rs.)" required>
        <input type="text" id="new-brand" placeholder="Brand">
        <input type="number" id="new-stock" placeholder="Stock quantity" required>
        <input type="text" id="new-image" placeholder="/images/products/filename.jpeg">
        <textarea id="new-description" class="full-width" placeholder="Description" rows="2" style="padding:0.6rem; border-radius:var(--radius-sm); border:1px solid rgba(43,27,34,0.18); font-family:var(--font-body);"></textarea>
        <button type="submit" class="btn btn-primary full-width" style="justify-content:center;">Add product</button>
      </form>

      <h3 style="font-family:var(--font-display); font-style:italic; margin-bottom:1rem;">All products</h3>
      <table id="products-table">
        <thead>
          <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr>
        </thead>
        <tbody id="products-tbody"></tbody>
      </table>
    </div>

    <div class="admin-panel" id="panel-orders">
      <table id="orders-table">
        <thead>
          <tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr>
        </thead>
        <tbody id="orders-tbody"></tbody>
      </table>
    </div>
  `;

  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`panel-${tab.dataset.tab}`).classList.add('active');
    });
  });

  document.getElementById('add-product-form').addEventListener('submit', handleAddProduct);

  loadProducts();
  loadOrders();
}

function showMsg(text, type) {
  const msg = document.getElementById('admin-msg');
  msg.className = `admin-msg ${type}`;
  msg.textContent = text;
  setTimeout(() => { msg.className = 'admin-msg'; }, 3000);
}

async function loadProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    const items = await res.json();
    const tbody = document.getElementById('products-tbody');

    tbody.innerHTML = items.map(p => `
      <tr data-id="${p._id}">
        <td><img src="http://localhost:5000${p.image}" alt="${p.name}"></td>
        <td>${p.name}</td>
        <td>${p.category ? p.category.name : '—'}</td>
        <td>Rs. ${p.price.toLocaleString()}</td>
        <td>${p.stock}</td>
        <td><button class="btn btn-danger btn-small delete-product" data-id="${p._id}">Delete</button></td>
      </tr>
    `).join('');

    document.querySelectorAll('.delete-product').forEach(btn => {
      btn.addEventListener('click', () => handleDeleteProduct(btn.dataset.id));
    });
  } catch (err) {
    showMsg('Could not load products. Is the backend running?', 'error');
  }
}

async function loadOrders() {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    const orders = await res.json();
    const tbody = document.getElementById('orders-tbody');

    const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    tbody.innerHTML = orders.map(o => `
      <tr data-id="${o._id}">
        <td>#${o._id.slice(-8).toUpperCase()}</td>
        <td>${o.user ? o.user.name : 'Unknown'}</td>
        <td>Rs. ${o.totalAmount.toLocaleString()}</td>
        <td>
          <select class="order-status-select" data-id="${o._id}">
            ${statuses.map(s => `<option value="${s}" ${s === o.status ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </td>
      </tr>
    `).join('');

    document.querySelectorAll('.order-status-select').forEach(select => {
      select.addEventListener('change', () => handleUpdateOrderStatus(select.dataset.id, select.value));
    });
  } catch (err) {
    showMsg('Could not load orders. Is the backend running?', 'error');
  }
}

async function handleAddProduct(e) {
  e.preventDefault();

  const name = document.getElementById('new-name').value.trim();
  const categoryName = document.getElementById('new-category').value.trim();
  const price = Number(document.getElementById('new-price').value);
  const brand = document.getElementById('new-brand').value.trim();
  const stock = Number(document.getElementById('new-stock').value);
  const image = document.getElementById('new-image').value.trim();
  const description = document.getElementById('new-description').value.trim();

  try {
    // Find or note the category needs to exist first (categories are seeded already)
    const catRes = await fetch(`${API_BASE}/products?category=${encodeURIComponent(categoryName)}`);
    const existingInCat = await catRes.json();

    if (existingInCat.length === 0) {
      showMsg(`No existing category "${categoryName}" found. Use one of: Blush, Brow, Brush, Eyeliner, Foundation, Lipstick, Mascara.`, 'error');
      return;
    }

    const categoryId = existingInCat[0].category._id;

    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ name, category: categoryId, price, brand, stock, image, description })
    });

    const data = await res.json();

    if (!res.ok) {
      showMsg(data.message || 'Failed to add product.', 'error');
      return;
    }

    showMsg('Product added.', 'success');
    document.getElementById('add-product-form').reset();
    loadProducts();

  } catch (err) {
    showMsg('Could not reach the server.', 'error');
  }
}

async function handleDeleteProduct(id) {
  if (!confirm('Delete this product?')) return;

  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });

    if (!res.ok) {
      showMsg('Failed to delete product.', 'error');
      return;
    }

    showMsg('Product deleted.', 'success');
    loadProducts();

  } catch (err) {
    showMsg('Could not reach the server.', 'error');
  }
}

async function handleUpdateOrderStatus(id, status) {
  try {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ status })
    });

    if (!res.ok) {
      showMsg('Failed to update order status.', 'error');
      return;
    }

    showMsg('Order status updated.', 'success');

  } catch (err) {
    showMsg('Could not reach the server.', 'error');
  }
}

// Sumnay Cosmetic — cart page logic

document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();
});

function renderCartPage() {
  const container = document.getElementById('cart-content');
  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h2 style="font-style:italic; font-family: var(--font-display);">Your bag is empty.</h2>
        <p style="color:var(--color-ink-soft); margin: 1rem 0;">Looks like you haven't added anything yet.</p>
        <a href="products.html" class="btn btn-primary">Start shopping</a>
      </div>`;
    return;
  }

  const cartWithDetails = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product); // drop any items whose product no longer exists

  const subtotal = cartWithDetails.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 250 : 0;
  const total = subtotal + shipping;

  container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${cartWithDetails.map(item => `
          <div class="cart-item" data-id="${item.productId}">
            <img src="../images/products/${item.product.image.split('/').pop()}" alt="${item.product.name}">
            <div>
              <p class="cart-item-category">${item.product.category}</p>
              <p class="cart-item-name">${item.product.name}</p>
              <div class="cart-item-qty">
                <div class="qty-control">
                  <button type="button" class="qty-dec" data-id="${item.productId}">−</button>
                  <span>${item.quantity}</span>
                  <button type="button" class="qty-inc" data-id="${item.productId}">+</button>
                </div>
                <button type="button" class="remove-link" data-id="${item.productId}">Remove</button>
              </div>
            </div>
            <div class="cart-item-total">Rs. ${(item.product.price * item.quantity).toLocaleString()}</div>
          </div>
        `).join('')}
      </div>

      <div class="summary-box">
        <h3 style="font-size:0.78rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--color-ink-soft); margin-bottom:1rem;">Order summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>Rs. ${subtotal.toLocaleString()}</span></div>
        <div class="summary-row"><span>Shipping</span><span>Rs. ${shipping.toLocaleString()}</span></div>
        <div class="summary-row summary-total"><span>Total</span><span>Rs. ${total.toLocaleString()}</span></div>
        <a href="checkout.html" class="btn btn-primary" style="width:100%; justify-content:center; margin-top:1rem;">Proceed to checkout</a>
      </div>
    </div>
  `;

  // Wire up quantity and remove buttons
  container.querySelectorAll('.qty-inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = getCart().find(i => i.productId === id);
      updateCartQuantity(id, item.quantity + 1);
      renderCartPage();
    });
  });

  container.querySelectorAll('.qty-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = getCart().find(i => i.productId === id);
      if (item.quantity <= 1) {
        removeFromCart(id);
      } else {
        updateCartQuantity(id, item.quantity - 1);
      }
      renderCartPage();
    });
  });

  container.querySelectorAll('.remove-link').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id);
      renderCartPage();
    });
  });
}

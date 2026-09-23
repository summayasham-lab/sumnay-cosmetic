// Sumnay Cosmetic — product detail page logic
//
// Includes a content-based recommender: scores every other product against
// the current one using category match, price closeness, and description
// text overlap (Jaccard similarity), then shows the top matches as
// "You might also like." Same algorithm as the backend's
// GET /api/products/:id/recommendations endpoint.

function jaccardSimilarity(textA, textB) {
  const wordsA = new Set(textA.toLowerCase().split(/\W+/).filter(Boolean));
  const wordsB = new Set(textB.toLowerCase().split(/\W+/).filter(Boolean));
  const intersection = new Set([...wordsA].filter(w => wordsB.has(w)));
  const union = new Set([...wordsA, ...wordsB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

function getRecommendations(target, allProducts, limit = 4) {
  const candidates = allProducts.filter(p => p.id !== target.id);
  if (candidates.length === 0) return [];

  const maxPriceDiff = Math.max(...candidates.map(p => Math.abs(p.price - target.price)), 1);

  const scored = candidates.map(candidate => {
    let score = 0;

    // 1. Category match (weight 50)
    if (candidate.category === target.category) score += 50;

    // 2. Price closeness (weight 30)
    const priceDiff = Math.abs(target.price - candidate.price);
    score += Math.max(0, 30 * (1 - priceDiff / maxPriceDiff));

    // 3. Description text overlap (weight 20)
    score += jaccardSimilarity(target.description || '', candidate.description || '') * 20;

    return { product: candidate, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.product);
}

function renderRecommendations(target) {
  const recs = getRecommendations(target, products, 4);
  if (recs.length === 0) return '';

  return `
    <div class="recommendations-section">
      <h2 class="recs-title">You might also like</h2>
      <div class="recs-grid">
        ${recs.map(p => `
          <a href="product-detail.html?id=${p.id}" class="product-card">
            <div class="product-image" style="background: var(--color-ivory-dim);">
              <img src="../images/products/${p.image.split('/').pop()}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="product-info">
              <p class="product-category">${p.category}</p>
              <p class="product-name">${p.name}</p>
              <p class="product-price">Rs. ${p.price.toLocaleString()}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const layout = document.getElementById('detail-layout');
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = products.find(p => p.id === productId);

  if (!product) {
    layout.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding: var(--space-lg) 0;">
        <h2 style="font-style:italic;">We couldn't find that product.</h2>
        <p style="color:var(--color-ink-soft); margin: 1rem 0;">It may have been removed or the link is incorrect.</p>
        <a href="products.html" class="btn btn-primary">Back to shop</a>
      </div>`;
    return;
  }

  document.title = `${product.name} — Sumnay Cosmetic`;

  layout.innerHTML = `
    <div class="detail-image">
      <img src="../images/products/${product.image.split('/').pop()}" alt="${product.name}">
    </div>
    <div>
      <p class="detail-category">${product.category}</p>
      <h1 class="detail-name">${product.name}</h1>
      <p class="detail-price">Rs. ${product.price.toLocaleString()}</p>
      <p class="detail-desc">${product.description}</p>

      ${product.shade ? `
        <div class="shade-block">
          <h4>Shade</h4>
          <div class="shade-swatch-large" style="background:${product.shade};"></div>
        </div>
      ` : ''}

      <div class="qty-row">
        <div class="qty-control">
          <button type="button" id="qty-decrease" aria-label="Decrease quantity">−</button>
          <span id="qty-value">1</span>
          <button type="button" id="qty-increase" aria-label="Increase quantity">+</button>
        </div>
      </div>

      <p class="stock-note">In stock, ready to ship.</p>

      <button class="btn btn-primary" id="add-to-cart-btn">Add to bag — Rs. ${product.price.toLocaleString()}</button>
      <div class="added-toast" id="added-toast">Added to your bag.</div>
    </div>
  `;

  let quantity = 1;
  const qtyValueEl = document.getElementById('qty-value');
  const toast = document.getElementById('added-toast');

  document.getElementById('qty-decrease').addEventListener('click', () => {
    quantity = Math.max(1, quantity - 1);
    qtyValueEl.textContent = quantity;
  });

  document.getElementById('qty-increase').addEventListener('click', () => {
    quantity += 1;
    qtyValueEl.textContent = quantity;
  });

  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    addToCart(product.id, quantity);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });

  // Render "You might also like" recommendations below the main layout
  const recsHTML = renderRecommendations(product);
  if (recsHTML) {
    layout.insertAdjacentHTML('afterend', recsHTML);
  }
});

// Sumnay Cosmetic — homepage logic
// Renders 4 real featured products (one per key category) using real photos,
// replacing the old static placeholder cards.

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('featured-products');
  if (!grid) return;

  // Pick one representative product from a spread of categories for variety
  const featuredIds = ['lipstick-ruby', 'skincare-serum', 'fragrance-oud', 'blush-rose'];
  const featured = featuredIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  grid.innerHTML = featured.map(p => `
    <a href="product-detail.html?id=${p.id}" class="product-card">
      <div class="product-image" style="background: var(--color-ivory-dim); padding:0;">
        <img src="../images/products/${p.image.split('/').pop()}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div class="product-info">
        <p class="product-category">${p.category}</p>
        <p class="product-name">${p.name}</p>
        ${p.shade ? `<div class="swatch-trail" style="margin-bottom:0.4rem;">
          <span class="swatch-dot" style="background:${p.shade};"></span>
        </div>` : ''}
        <p class="product-price">Rs. ${p.price.toLocaleString()}</p>
      </div>
    </a>
  `).join('');
});

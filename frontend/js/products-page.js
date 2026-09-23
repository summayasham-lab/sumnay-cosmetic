// Sumnay Cosmetic — product listing page logic

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');
  const resultsCount = document.getElementById('results-count');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Fill category counts
  const categories = ['Blush', 'Brow', 'Brush', 'Eyeliner', 'Foundation', 'Lipstick', 'Mascara', 'Fragrance', 'Skincare', 'Haircare'];
  document.getElementById('count-all').textContent = products.length;
  categories.forEach(cat => {
    const el = document.getElementById(`count-${cat}`);
    if (el) el.textContent = products.filter(p => p.category === cat).length;
  });

  function renderProducts(list) {
    grid.innerHTML = list.map(p => `
      <div class="product-card">
        <a href="product-detail.html?id=${p.id}">
          <div class="product-image">
            <img src="../images/products/${p.image.split('/').pop()}" alt="${p.name}" loading="lazy">
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
      </div>
    `).join('');
    resultsCount.textContent = `${list.length} product${list.length !== 1 ? 's' : ''}`;
  }

  function applyFilter(category) {
    filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === category));
    currentCategory = category;
    applyFilters();
  }

  function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
    let list = currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory);
    if (searchTerm) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    renderProducts(list);
  }

  let currentCategory = 'all';

  document.getElementById('search-input').addEventListener('input', applyFilters);

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.category));
  });

  // Respect ?category= URL param on load (from homepage links)
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category');
  const validCategory = categories.find(c => c.toLowerCase() === (initialCategory || '').toLowerCase());
  applyFilter(validCategory || 'all');
});

// =====================
//  PRODUITS PAGE
// =====================

let filteredProducts = [...products];

document.addEventListener('DOMContentLoaded', function () {
    // Lire les paramètres URL
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const search   = params.get('search');

    if (category) {
        filterByCategory(category);
    } else if (search) {
        document.getElementById('searchInput').value = search;
        searchProducts();
    } else {
        displayProducts(products);
    }

    // Recherche en temps réel
    const input = document.getElementById('searchInput');
    if (input) {
        input.addEventListener('input', searchProducts);
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') searchProducts();
        });
    }
});

// ---- Affichage des produits ----
function displayProducts(list) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (list.length === 0) {
        grid.innerHTML = '<div class="no-products"><p>Aucun produit trouvé 😕</p></div>';
        return;
    }

    list.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${IMG_PATH}${product.image}" alt="${product.name}" loading="lazy">
                <span class="badge">${product.badge}</span>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-club">${product.club}</div>
                <div class="product-rating">⭐⭐⭐⭐⭐ (125 avis)</div>
                <div class="product-price">
                    <div>
                        <div class="price">${product.price.toLocaleString('fr-DZ')} DA</div>
                        <div class="old-price">${product.oldPrice.toLocaleString('fr-DZ')} DA</div>
                    </div>
                </div>
                <div class="form-group" style="margin-top:0.8rem;">
                    <label for="size-${product.id}" style="font-size:0.9rem;color:#1e3c72;margin-bottom:0.3rem;">Taille</label>
                    <select id="size-${product.id}" class="size-select">
                        <option value="">Choisir une taille</option>
                        ${product.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
                    </select>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    🛒 Ajouter au panier
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ---- Filtres ----
function filterByCategory(category) {
    // Mettre à jour les boutons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === category);
    });
    filteredProducts = products.filter(p => p.category === category);
    displayProducts(filteredProducts);
}

function showAllProducts() {
    document.querySelectorAll('.filter-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === 0);
    });
    filteredProducts = [...products];
    displayProducts(products);
}

// ---- Recherche ----
function searchProducts() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!query) {
        displayProducts(filteredProducts);
        return;
    }
    const results = products.filter(p =>
        p.name.toLowerCase().includes(query)     ||
        p.club.toLowerCase().includes(query)     ||
        p.category.toLowerCase().includes(query)
    );
    displayProducts(results);
}

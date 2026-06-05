// Chemin images dynamique selon la page courante
const IMG_PATH = window.location.pathname.includes('/content/')
    ? '../images/'
    : 'images/';

// =====================
//  UTILITAIRES PARTAGÉS + INDEX
// =====================

// ---- Panier (localStorage) ----
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('fj_cart')) || [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('fj_cart', JSON.stringify(cart));
}

function getCartCount() {
    return getCart().length;
}

function updateCartBadge() {
    const badge = document.getElementById('cartCount');
    if (badge) badge.textContent = getCartCount();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const sizeSelect = document.getElementById(`size-${productId}`);
    const selectedSize = sizeSelect ? sizeSelect.value : '';

    if (!selectedSize) {
        showToast('Veuillez sélectionner une taille !');
        return;
    }

    if (product) {
        const cart = getCart();
        cart.push({ ...product, cartId: Date.now(), selectedSize });
        saveCart(cart);
        updateCartBadge();
        showToast(`${product.name} (Taille ${selectedSize}) ajouté au panier !`);
        if (sizeSelect) sizeSelect.value = '';
    }
}

// ---- Utilisateur ----
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('fj_user')) || null;
    } catch (e) {
        return null;
    }
}

function saveUser(user) {
    localStorage.setItem('fj_user', JSON.stringify(user));
}

function logoutUser() {
    localStorage.removeItem('fj_user');
}

// ---- Toast ----
function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.background = type === 'error' ? '#e74c3c' : '#27ae60';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ---- Page d'accueil ----
document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('root-page');
});
   function searchAndRedirect() {
            const query = document.getElementById('searchInput').value.trim();
            if (query) {
                window.location.href = `content/produits.html?search=${encodeURIComponent(query)}`;
            }
        }
        document.getElementById('searchInput').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') searchAndRedirect();
        });
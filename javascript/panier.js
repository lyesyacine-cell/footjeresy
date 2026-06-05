// =====================
//  PANIER PAGE
// =====================

document.addEventListener('DOMContentLoaded', function () {
    renderCart();
});

function renderCart() {
    const cart = getCart();
    const cartContent = document.getElementById('cartContent');
    if (!cartContent) return;

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Votre panier est vide</h3>
                <p>Ajoutez des maillots pour commencer vos achats</p>
                <a href="produits.html" class="hero-btn">Voir les produits</a>
            </div>`;
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    const shipping = total >= 50 ? 0 : 600;
    const finalTotal = total + shipping;

    let html = '<div class="cart-items">';
    cart.forEach((item, index) => {
        html += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${IMG_PATH}${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-club">${item.club}</p>
                    <p class="cart-item-size"><strong>Taille :</strong> ${item.selectedSize}</p>
                    <p class="cart-item-price">${item.price.toLocaleString('fr-DZ')} DA</p>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})" title="Supprimer">✕</button>
            </div>`;
    });
    html += '</div>';

    // Zone livraison
    html += `
        <div class="delivery-section">
            <h3>📍 Lieu de livraison</h3>
            <input type="text" id="delivery-location" placeholder="Ex: Tizi Ouzou, Alger, Béjaïa...">
        </div>`;

    // Récapitulatif
    html += `
        <div class="cart-summary">
            <div class="summary-row">
                <span>Sous-total :</span>
                <span>${total.toLocaleString('fr-DZ')} DA</span>
            </div>
            <div class="summary-row">
                <span>Livraison :</span>
                <span class="shipping">${shipping === 0 ? 'Gratuite ✓' : shipping + ' DA'}</span>
            </div>
            <div class="summary-row total">
                <span>Total :</span>
                <span>${finalTotal.toLocaleString('fr-DZ')} DA</span>
            </div>
            <button class="checkout-btn" onclick="checkout()">💳 Procéder au paiement</button>
            <a class="continue-shopping-btn" href="produits.html">Continuer les achats</a>
        </div>`;

    cartContent.innerHTML = html;
}

function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    updateCartBadge();
    renderCart();
    showToast('Article supprimé du panier');
}

function checkout() {
    const user = getCurrentUser();
    if (!user) {
        showToast('Veuillez vous connecter pour continuer', 'error');
        setTimeout(() => window.location.href = '../content/login.html', 1500);
        return;
    }

    const location = document.getElementById('delivery-location').value;
    if (!location) {
        showToast('Veuillez sélectionner un lieu de livraison', 'error');
        return;
    }

    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const shipping = total >= 50 ? 0 : 600;
    const finalTotal = total + shipping;

    alert(`✅ Merci pour votre commande, ${user.name} !\n\nLieu de livraison : ${location}\nMontant total : ${finalTotal.toLocaleString('fr-DZ')} DA\n\nNous vous contacterons bientôt pour confirmer.`);

    saveCart([]);
    updateCartBadge();
    window.location.href = '../index.html';

}

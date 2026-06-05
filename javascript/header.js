// =====================
//  HEADER PARTAGÉ
// =====================

(function injectHeader() {
    // Détecter si on est à la racine ou dans content/
    const isRoot = !window.location.pathname.includes('/content/');
    const base   = isRoot ? '' : '../';

    // Lien actif selon la page courante
    const page = window.location.pathname.split('/').pop() || 'index.html';

    function activeClass(name) {
        return page === name ? ' class="active"' : '';
    }

    const headerHTML = `
    <header>
        <div class="header-container">
            <a href="${base}index.html" class="logo">⚽ FootJerseys</a>

            <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
                <span></span><span></span><span></span>
            </button>

            <nav id="nav-menu">
                <a href="${base}index.html"${activeClass('index.html')}>🏠 Accueil</a>
                <a href="${base}content/produits.html"${activeClass('produits.html')}>👕 Produits</a>
                <a href="${base}content/apropos.html"${activeClass('apropos.html')}>ℹ️ À propos</a>
                <a href="${base}content/contact.html"${activeClass('contact.html')}>📞 Contact</a>
            </nav>

            <div class="header-actions">
                <a class="cart-icon" href="${base}content/panier.html" title="Panier">
                    🛒
                    <span class="cart-count" id="cartCount">0</span>
                </a>
                <a class="login-btn" href="${base}content/login.html" id="loginBtn">👤 Login</a>
            </div>
        </div>
    </header>`;

    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
        placeholder.innerHTML = headerHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    // Compteur panier
    updateCartBadge();

    // Afficher nom utilisateur si connecté
    const user = getCurrentUser();
    const loginBtn = document.getElementById('loginBtn');
    if (user && loginBtn) {
        loginBtn.textContent = `👤 ${user.name.split(' ')[0]}`;
        loginBtn.title = 'Mon compte';
    }

    // Menu hamburger mobile
    const hamburger = document.getElementById('hamburgerBtn');
    const nav = document.getElementById('nav-menu');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
        // Fermer le menu en cliquant sur un lien
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('open'));
        });
    }
})();

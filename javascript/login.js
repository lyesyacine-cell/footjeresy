// =====================
//  LOGIN / REGISTER PAGE
// =====================

document.addEventListener('DOMContentLoaded', function () {
    // Si déjà connecté, afficher le nom
    const user = getCurrentUser();
    if (user) {
        showToast(`Déjà connecté en tant que ${user.name} 👋`);
    }

    // Lire le paramètre URL pour pré-sélectionner l'onglet
    const params = new URLSearchParams(window.location.search);
    if (params.get('tab') === 'register') {
        switchToRegister();
    }
});

function switchToLogin() {
    document.getElementById('login-form').classList.add('active');
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('btn-login').classList.add('active');
    document.getElementById('btn-register').classList.remove('active');
}

function switchToRegister() {
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.add('active');
    document.getElementById('btn-login').classList.remove('active');
    document.getElementById('btn-register').classList.add('active');
}

function submitLogin(event) {
    event.preventDefault();
    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showToast('Veuillez remplir tous les champs', 'error');
        return;
    }

    const user = {
        name: email.split('@')[0],
        email: email,
    };

    saveUser(user);
    showToast(`Bienvenue ${user.name} ! 👋`);
    event.target.reset();
    setTimeout(() => window.location.href = '../index.html', 800);
}

function submitRegister(event) {
    event.preventDefault();
    const name     = document.getElementById('register-name').value.trim();
    const email    = document.getElementById('register-email').value.trim();
    const phone    = document.getElementById('register-phone').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm  = document.getElementById('register-confirm').value;

    if (password !== confirm) {
        showToast('Les mots de passe ne correspondent pas !', 'error');
        return;
    }
    if (password.length < 6) {
        showToast('Le mot de passe doit contenir au moins 6 caractères !', 'error');
        return;
    }

    const user = { name, email, phone };
    saveUser(user);
    showToast(`Bienvenue ${user.name} ! Inscription réussie 🎉`);
    event.target.reset();
    setTimeout(() => window.location.href = '../index.html', 800);
}

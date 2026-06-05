// =====================
//  CONTACT PAGE
// =====================

function submitContactForm(event) {
    event.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        showToast('Veuillez remplir tous les champs', 'error');
        return;
    }

    showToast('Message envoyé avec succès ! Nous vous répondrons bientôt. 📬');
    event.target.reset();
}

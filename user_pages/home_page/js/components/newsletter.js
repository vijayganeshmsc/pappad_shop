// ============================================
// Newsletter Section - Form Handling
// ============================================

export function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const submitBtn = document.getElementById('newsletterSubmit');
    const submitText = document.getElementById('submitText');
    const submitIcon = document.getElementById('submitIcon');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();

        if (email) {
            // Disable button and show success state
            submitBtn.disabled = true;
            submitText.textContent = '✓ Subscribed!';
            submitIcon.style.display = 'none';

            // Reset after 3 seconds
            setTimeout(() => {
                emailInput.value = '';
                submitBtn.disabled = false;
                submitText.textContent = 'Subscribe';
                submitIcon.style.display = 'block';
            }, 3000);
        }
    });
}

// ============================================
// Header - Navigation & Mobile Menu
// ============================================

export function initHeader() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    const mobileMenuLinks = document.querySelectorAll('.header-mobile-menu-link');

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('open');

        if (isOpen) {
            mobileMenu.classList.remove('open');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        } else {
            mobileMenu.classList.add('open');
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        }
    });

    // Close menu when clicking a link
    mobileMenuLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        });
    });

    // Smooth scroll for all navigation links
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

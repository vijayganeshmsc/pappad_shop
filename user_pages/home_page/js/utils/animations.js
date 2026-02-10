// ============================================
// Scroll Animations - Intersection Observer
// ============================================

export function initScrollAnimations() {
    // Create intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.classList.add('animated');

                // For feature cards, add animation class
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(el => observer.observe(el));

    // Observe product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(el => observer.observe(el));

    // Observe category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(el => observer.observe(el));

    // Observe testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(el => observer.observe(el));

    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(el => observer.observe(el));
}

// ============================================
// Saravana & Co Papads - Main JavaScript
// ============================================

import { initHero } from './components/hero.js';
import { initHeader } from './components/header.js';
import { initAnnouncementBar } from './components/announcement-bar.js';
import { initScrollToTop } from './components/scroll-to-top.js';
import { initLoadingScreen } from './components/loading-screen.js';
import { initProducts } from './components/products.js';
import { initCategories } from './components/categories.js';
import { initTestimonials } from './components/testimonials.js';
import { initNewsletter } from './components/newsletter.js';
import { initScrollAnimations } from './utils/animations.js';

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen first
    initLoadingScreen();

    // Initialize all other components
    initAnnouncementBar();
    initHeader();
    initHero();
    initScrollToTop();
    initProducts();
    initCategories();
    initTestimonials();
    initNewsletter();
    initScrollAnimations();
});

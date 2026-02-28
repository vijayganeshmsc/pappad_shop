// ============================================
// Floating Cart Button - Initialization and functionality
// ============================================

import { getCartCount } from './cart.js';

let cartInterval = null;

// Initialize floating cart button
export function initFloatingCart() {
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    
    if (!floatingCartBtn) return;
    
    // Click handler - redirect to shopping cart page
    floatingCartBtn.addEventListener('click', () => {
        window.location.href = '../shopping_cart_page/shopping_cart.html';
    });
    
    // Update cart count immediately
    updateFloatingCartBadge();
    
    // Set up interval to check cart changes every second
    cartInterval = setInterval(() => {
        updateFloatingCartBadge();
    }, 1000);
}

// Update floating cart badge
function updateFloatingCartBadge() {
    const badge = document.getElementById('floatingCartBadge');
    if (!badge) return;
    
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
}

// Cleanup on page unload
window.addEventListener('unload', () => {
    if (cartInterval) {
        clearInterval(cartInterval);
    }
});

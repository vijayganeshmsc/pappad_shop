// ============================================
// Products Section - Dynamic Product Cards
// ============================================

import { addToCart, showToast, updateCartBadge } from '../utils/cart.js';

const products = [
    {
        id: 1,
        name: "Plain Papad - Traditional Recipe",
        price: 120,
        originalPrice: 150,
        image: "https://images.unsplash.com/photo-1723169863726-fa6c9262c086?w=400",
        rating: 5,
        stock: "In Stock",
        isNew: true,
    },
    {
        id: 2,
        name: "Masala Papad - Spicy Flavor",
        price: 140,
        originalPrice: 180,
        image: "https://images.unsplash.com/photo-1603122612817-2fe0e0631a93?w=400",
        rating: 5,
        stock: "In Stock",
        isNew: true,
    },
    {
        id: 3,
        name: "Garlic Papad - Premium Quality",
        price: 160,
        originalPrice: 200,
        image: "https://images.unsplash.com/photo-1606172150255-64e15da65c8c?w=400",
        rating: 4,
        stock: "Low Stock",
    },
    {
        id: 4,
        name: "Cumin Papad - Classic Taste",
        price: 130,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1605719161691-5d9771fc144f?w=400",
        rating: 5,
        stock: "In Stock",
    },
];

function createStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += `<svg class="star-icon filled" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>`;
        } else {
            stars += `<svg class="star-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>`;
        }
    }
    return stars;
}

function createProductCard(product, index) {
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return `
        <div class="product-card animate-on-scroll" style="animation-delay: ${index * 0.1}s">
            <!-- Badges -->
            <div class="product-badges">
                ${product.isNew ? '<span class="product-badge new" style="animation-delay: 0.2s">NEW</span>' : ''}
                ${product.stock === 'Low Stock' ? '<span class="product-badge low-stock" style="animation-delay: 0.3s">Low Stock</span>' : ''}
            </div>

            <!-- Action Buttons -->
            <div class="product-actions">
                <button class="product-action-btn" aria-label="View product">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>
            </div>

            <!-- Image -->
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            </div>

            <!-- Content -->
            <div class="product-content">
                <!-- Rating -->
                <div class="product-rating">
                    ${createStarRating(product.rating)}
                    <span class="product-rating-text">(${product.rating}.0)</span>
                </div>

                <!-- Product Name -->
                <h3 class="product-name">${product.name}</h3>

                <!-- Price -->
                <div class="product-price-wrapper">
                    <span class="product-price">₹${product.price}</span>
                    ${product.originalPrice ? `<span class="product-original-price">₹${product.originalPrice}</span>` : ''}
                    ${product.originalPrice ? `<span class="product-discount">${discount}% OFF</span>` : ''}
                </div>

                <!-- Stock Status -->
                <div class="product-stock-wrapper">
                    <span class="product-stock ${product.stock === 'In Stock' ? 'in-stock' : 'low-stock'}">${product.stock}</span>
                    <span class="product-unit">Per 150g/kg</span>
                </div>

                <!-- Add to Cart Button -->
                <button class="product-add-to-cart" onclick="handleAddToCart(${product.id}, event)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="8" cy="21" r="1"></circle>
                        <circle cx="19" cy="21" r="1"></circle>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                    </svg>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Handle add to cart click
window.handleAddToCart = function(productId, event) {
    const product = products.find(p => p.id === productId);
    if (product) {
        addToCart(product);
        
        // Get the button element that was clicked
        const button = event ? event.target.closest('.product-add-to-cart') : document.querySelector(`[onclick*="${productId}"]`);
        
        // Trigger flying animation if button exists
        if (button) {
            createFlyingAnimation(button, product);
        }
        
        showToast(`${product.name} added to cart!`, 'success');
    }
};

// Create flying product animation
function createFlyingAnimation(button, product) {
    // Get button position
    const buttonRect = button.getBoundingClientRect();
    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + buttonRect.height / 2;
    
    // Get floating cart button position
    const floatingCart = document.getElementById('floatingCartBtn');
    if (!floatingCart) return;
    
    const cartRect = floatingCart.getBoundingClientRect();
    const endX = cartRect.left + cartRect.width / 2;
    const endY = cartRect.top + cartRect.height / 2;
    
    // Create flying product element
    const flyingProduct = document.createElement('div');
    flyingProduct.className = 'flying-product';
    flyingProduct.innerHTML = `<img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/50x50/f3722c/white?text=P'">`;
    flyingProduct.style.left = startX + 'px';
    flyingProduct.style.top = startY + 'px';
    flyingProduct.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(flyingProduct);
    
    // Create arrow element
    const arrow = document.createElement('div');
    arrow.className = 'flying-arrow';
    arrow.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"></path>
    </svg>`;
    arrow.style.left = startX + 'px';
    arrow.style.top = (startY - 40) + 'px';
    document.body.appendChild(arrow);
    
    // Animate to cart
    const duration = 800;
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        // Update position
        const currentX = startX + (endX - startX) * easeProgress;
        const currentY = startY + (endY - startY) * easeProgress;
        
        flyingProduct.style.left = currentX + 'px';
        flyingProduct.style.top = currentY + 'px';
        
        // Update arrow position (slightly ahead)
        const arrowProgress = Math.max(0, progress - 0.1);
        const arrowX = startX + (endX - startX) * arrowProgress;
        const arrowY = startY + (endY - startY) * arrowProgress - 40;
        arrow.style.left = arrowX + 'px';
        arrow.style.top = arrowY + 'px';
        
        // Scale effect
        const scale = 1 + Math.sin(progress * Math.PI) * 0.3;
        flyingProduct.style.transform = `translate(-50%, -50%) scale(${scale})`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Animation complete - remove elements
            flyingProduct.remove();
            arrow.remove();
            
            // Bump the cart badge
            const badge = document.getElementById('floatingCartBadge');
            if (badge) {
                badge.classList.add('bump');
                setTimeout(() => badge.classList.remove('bump'), 400);
            }
        }
    }
    
    requestAnimationFrame(animate);
}

export function initProducts() {
    const productsGrid = document.getElementById('productsGrid');

    if (productsGrid) {
        const productsHTML = products.map((product, index) => createProductCard(product, index)).join('');
        productsGrid.innerHTML = productsHTML;
    }
    
    // Initialize cart badge
    updateCartBadge();
}

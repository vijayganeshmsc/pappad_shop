// ============================================
// Categories Section - Dynamic Category Cards
// ============================================

const categories = [
    {
        id: 1,
        name: "Plain Papad",
        description: "Classic traditional variety",
        image: "https://images.unsplash.com/photo-1763368403529-0b8d9108cf9c?w=400",
        count: 12,
    },
    {
        id: 2,
        name: "Masala Papad",
        description: "Spicy & flavorful options",
        image: "https://images.unsplash.com/photo-1758657996330-095d08451cd9?w=400",
        count: 8,
    },
    {
        id: 3,
        name: "Special Varieties",
        description: "Premium exotic flavors",
        image: "https://images.unsplash.com/photo-1728910156510-77488f19b152?w=400",
        count: 15,
    },
];

function createCategoryCard(category, index) {
    return `
        <div class="category-card animate-on-scroll" style="animation-delay: ${index * 0.15}s">
            <!-- Background Image -->
            <div class="category-bg" style="background-image: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('${category.image}');"></div>

            <!-- Content -->
            <div class="category-content">
                <span class="category-count">${category.count} Products</span>
                <h3 class="category-name">${category.name}</h3>
                <p class="category-description">${category.description}</p>
                <a href="#" class="category-link">
                    Shop Now
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </a>
            </div>

            <!-- Hover Overlay -->
            <div class="category-overlay"></div>
        </div>
    `;
}

export function initCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');

    if (categoriesGrid) {
        const categoriesHTML = categories.map((category, index) => createCategoryCard(category, index)).join('');
        categoriesGrid.innerHTML = categoriesHTML;
    }
}

// Product Management JavaScript

// Sample product data
let products = [
    {
        id: 1,
        name: "Plain Papad",
        category: "papad",
        price: 150,
        stock: 50,
        description: "Traditional plain papad made from urad dal",
        image: ""
    },
    {
        id: 2,
        name: "Masala Papad",
        category: "papad",
        price: 180,
        stock: 35,
        description: "Spicy masala flavored papad",
        image: ""
    },
    {
        id: 3,
        name: "Pepper Papad",
        category: "papad",
        price: 160,
        stock: 28,
        description: "Black pepper flavored papad",
        image: ""
    },
    {
        id: 4,
        name: "Jeera Papad",
        category: "papad",
        price: 170,
        stock: 42,
        description: "Cumin flavored papad",
        image: ""
    },
    {
        id: 5,
        name: "Onion Papad",
        category: "papad",
        price: 190,
        stock: 15,
        description: "Onion flavored crispy papad",
        image: ""
    },
    {
        id: 6,
        name: "Fried Papad Chips",
        category: "snacks",
        price: 120,
        stock: 60,
        description: "Crispy fried papad chips",
        image: ""
    },
    {
        id: 7,
        name: "Spicy Fryums",
        category: "fryums",
        price: 80,
        stock: 8,
        description: "Colorful spicy fryums",
        image: ""
    },
    {
        id: 8,
        name: "Plain Fryums",
        category: "fryums",
        price: 70,
        stock: 45,
        description: "Plain fried fryums",
        image: ""
    },
    {
        id: 9,
        name: "Chili Powder",
        category: "spices",
        price: 95,
        stock: 25,
        description: "Premium red chili powder",
        image: ""
    },
    {
        id: 10,
        name: "Coriander Powder",
        category: "spices",
        price: 85,
        stock: 0,
        description: "Fresh coriander powder",
        image: ""
    },
    {
        id: 11,
        name: "Garam Masala",
        category: "spices",
        price: 120,
        stock: 18,
        description: "Traditional garam masala blend",
        image: ""
    },
    {
        id: 12,
        name: "Urad Dal Papad",
        category: "papad",
        price: 165,
        stock: 32,
        description: "Premium urad dal papad",
        image: ""
    }
];

// DOM Elements
const productsTableBody = document.getElementById('productsTableBody');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const stockFilter = document.getElementById('stockFilter');
const addProductBtn = document.getElementById('addProductBtn');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const productForm = document.getElementById('productForm');
const modalTitle = document.getElementById('modalTitle');
const submitBtn = document.getElementById('submitBtn');
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// Stats elements
const totalProductsEl = document.getElementById('totalProducts');
const inStockEl = document.getElementById('inStock');
const lowStockEl = document.getElementById('lowStock');
const outOfStockEl = document.getElementById('outOfStock');

// Pagination elements
const showingStart = document.getElementById('showingStart');
const showingEnd = document.getElementById('showingEnd');
const totalItems = document.getElementById('totalItems');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');

// State variables
let currentPage = 1;
const itemsPerPage = 10;
let editingProductId = null;
let deletingProductId = null;
let filteredProducts = [...products];

// Initialize the page
function init() {
    updateStats();
    renderProducts();
    setupEventListeners();
}

// Update statistics
function updateStats() {
    totalProductsEl.textContent = products.length;
    inStockEl.textContent = products.filter(p => p.stock > 10).length;
    lowStockEl.textContent = products.filter(p => p.stock > 0 && p.stock <= 10).length;
    outOfStockEl.textContent = products.filter(p => p.stock === 0).length;
}

// Get status based on stock
function getStockStatus(stock) {
    if (stock === 0) {
        return { class: 'out-of-stock', text: 'Out of Stock' };
    } else if (stock <= 10) {
        return { class: 'low-stock', text: 'Low Stock' };
    } else {
        return { class: 'in-stock', text: 'In Stock' };
    }
}

// Render products table
function renderProducts() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
    const pageProducts = filteredProducts.slice(startIndex, endIndex);

    productsTableBody.innerHTML = '';

    pageProducts.forEach(product => {
        const status = getStockStatus(product.stock);
        const imageHtml = product.image 
            ? `<img src="${product.image}" alt="${product.name}" class="product-image">`
            : `<div class="product-image" style="display: flex; align-items: center; justify-content: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
               </div>`;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${imageHtml}</td>
            <td class="product-name">${product.name}</td>
            <td><span class="category-badge ${product.category}">${product.category}</span></td>
            <td class="price">₹${product.price.toFixed(2)}</td>
            <td class="stock-count">${product.stock}</td>
            <td><span class="status-badge ${status.class}">${status.text}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </td>
        `;
        productsTableBody.appendChild(row);
    });

    // Update pagination info
    showingStart.textContent = filteredProducts.length > 0 ? startIndex + 1 : 0;
    showingEnd.textContent = endIndex;
    totalItems.textContent = filteredProducts.length;

    // Update pagination buttons
    prevPage.classList.toggle('disabled', currentPage === 1);
    nextPage.classList.toggle('disabled', endIndex >= filteredProducts.length);
}

// Filter products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const stock = stockFilter.value;

    filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        
        let matchesStock = true;
        if (stock === 'in_stock') {
            matchesStock = product.stock > 10;
        } else if (stock === 'low_stock') {
            matchesStock = product.stock > 0 && product.stock <= 10;
        } else if (stock === 'out_of_stock') {
            matchesStock = product.stock === 0;
        }

        return matchesSearch && matchesCategory && matchesStock;
    });

    currentPage = 1;
    renderProducts();
}

// Open modal
function openModal() {
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    productForm.reset();
    editingProductId = null;
    modalTitle.textContent = 'Add New Product';
    submitBtn.textContent = 'Add Product';
}

// Add new product
function addProduct(productData) {
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        ...productData
    };
    products.push(newProduct);
    filteredProducts = [...products];
    updateStats();
    renderProducts();
    closeProductModal();
}

// Edit product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        editingProductId = id;
        modalTitle.textContent = 'Edit Product';
        submitBtn.textContent = 'Update Product';

        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productImage').value = product.image || '';

        openModal();
    }
}

// Update product
function updateProduct(id, productData) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...productData };
        filteredProducts = [...products];
        updateStats();
        renderProducts();
        closeProductModal();
    }
}

// Delete product
function deleteProduct(id) {
    deletingProductId = id;
    deleteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Confirm delete
function confirmDelete() {
    if (deletingProductId) {
        products = products.filter(p => p.id !== deletingProductId);
        filteredProducts = [...products];
        updateStats();
        renderProducts();
    }
    closeDeleteModalFunc();
}

// Close delete modal
function closeDeleteModalFunc() {
    deleteModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    deletingProductId = null;
}

// Setup event listeners
function setupEventListeners() {
    // Search and filter
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    stockFilter.addEventListener('change', filterProducts);

    // Add product button
    addProductBtn.addEventListener('click', () => {
        editingProductId = null;
        modalTitle.textContent = 'Add New Product';
        submitBtn.textContent = 'Add Product';
        productForm.reset();
        openModal();
    });

    // Modal close buttons
    closeModal.addEventListener('click', closeProductModal);
    cancelBtn.addEventListener('click', closeProductModal);
    closeDeleteModal.addEventListener('click', closeDeleteModalFunc);
    cancelDeleteBtn.addEventListener('click', closeDeleteModalFunc);

    // Delete confirm
    confirmDeleteBtn.addEventListener('click', confirmDelete);

    // Close modal on overlay click
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });

    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            closeDeleteModalFunc();
        }
    });

    // Form submit
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const productData = {
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            price: parseFloat(document.getElementById('productPrice').value),
            stock: parseInt(document.getElementById('productStock').value),
            description: document.getElementById('productDescription').value,
            image: document.getElementById('productImage').value
        };

        if (editingProductId) {
            updateProduct(editingProductId, productData);
        } else {
            addProduct(productData);
        }
    });

    // Pagination
    prevPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });

    nextPage.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
        }
    });

    // Logout button
    document.querySelector('.btn-logout').addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = '../admin_login_page/Admin-login/admin-login.html';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);

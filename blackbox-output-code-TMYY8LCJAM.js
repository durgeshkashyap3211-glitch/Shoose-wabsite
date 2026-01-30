// Sample shoe data
const shoes = [
    { id: 1, name: "Nike Air Max", category: "men", price: 120, brand: "Nike", type: "sneakers", image: "https://via.placeholder.com/250x150?text=Nike+Air+Max" },
    { id: 2, name: "Adidas Ultraboost", category: "women", price: 150, brand: "Adidas", type: "sneakers", image: "https://via.placeholder.com/250x150?text=Adidas+Ultraboost" },
    { id: 3, name: "Puma Boots", category: "men", price: 80, brand: "Puma", type: "boots", image: "https://via.placeholder.com/250x150?text=Puma+Boots" },
    { id: 4, name: "Reebok Sandals", category: "kids", price: 40, brand: "Reebok", type: "sandals", image: "https://via.placeholder.com/250x150?text=Reebok+Sandals" },
    { id: 5, name: "Nike Heels", category: "women", price: 100, brand: "Nike", type: "heels", image: "https://via.placeholder.com/250x150?text=Nike+Heels" },
    { id: 6, name: "Adidas Kids Sneakers", category: "kids", price: 60, brand: "Adidas", type: "sneakers", image: "https://via.placeholder.com/250x150?text=Adidas+Kids+Sneakers" },
    // Add more as needed
];

let currentFilters = {
    category: 'all',
    price: 'all',
    brand: 'all',
    type: 'all',
    search: ''
};

// Function to render products
function renderProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    
    const filteredShoes = shoes.filter(shoe => {
        const matchesCategory = currentFilters.category === 'all' || shoe.category === currentFilters.category;
        const matchesPrice = currentFilters.price === 'all' || checkPriceRange(shoe.price, currentFilters.price);
        const matchesBrand = currentFilters.brand === 'all' || shoe.brand === currentFilters.brand;
        const matchesType = currentFilters.type === 'all' || shoe.type === currentFilters.type;
        const matchesSearch = shoe.name.toLowerCase().includes(currentFilters.search.toLowerCase());
        
        return matchesCategory && matchesPrice && matchesBrand && matchesType && matchesSearch;
    });
    
    filteredShoes.forEach(shoe => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${shoe.image}" alt="${shoe.name}">
            <h3>${shoe.name}</h3>
            <p>$${shoe.price}</p>
            <button class="buy-btn" onclick="buyNow(${shoe.id})">Buy Now</button>
        `;
        productsContainer.appendChild(card);
    });
}

// Helper function for price range check
function checkPriceRange(price, range) {
    switch (range) {
        case '0-50': return price <= 50;
        case '51-100': return price > 50 && price <= 100;
        case '101-200': return price > 100 && price <= 200;
        case '201+': return price > 200;
        default: return true;
    }
}

// Buy Now function (placeholder)
function buyNow(id) {
    alert(`Buying shoe with ID: ${id}`);
}

// Event listeners
document.getElementById('search-bar').addEventListener('input', (e) => {
    currentFilters.search = e.target.value;
    renderProducts();
});

document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilters.category = btn.dataset.category;
        renderProducts();
    });
});

document.getElementById('price-filter').addEventListener('change', (e) => {
    currentFilters.price = e.target.value;
    renderProducts();
});

document.getElementById('brand-filter').addEventListener('change', (e) => {
    currentFilters.brand = e.target.value;
    renderProducts();
});

document.getElementById('type-filter').addEventListener('change', (e) => {
    currentFilters.type = e.target.value;
    renderProducts();
});

// Initial render
renderProducts();
document.addEventListener('DOMContentLoaded', () => {
    const sampleData = {
        greentea: [
            { id: 1, name: "Cinnamon Orange Green tea", price: 15, image: "../static/CinnamonOrange.png" },
            { id: 2, name: "Turmeric Matcha", price: 15, image: "../static/Turmeric_Matcha.png" },
            { id: 3, name: "Earl Grey Green Tea", price: 15, image: "../static/EarlGreyGreen.png" },
            { id: 4, name: "Ginger Pineapple Green Tea", price: 15, image: "../static/GingerPineApple.png" },
            { id: 5, name: "Vitalitea'l Green Tea", price: 15, image: "../static/Vitality.png" },
            { id: 6, name: "Matcha Berries", price: 15, image: "../static/Matcha_Berries.png" },
        ],
        blacktea: [
            { id: 7, name: "BLACK CURRANT SENCHA BLACK TEA", price: 15, image: "../static/BlackCurrentGreen.png" },
            { id: 8, name: "BLUE FLOWER EARL GREY BLACK TEA", price: 15, image: "../static/BlueFlower.png" },
            { id: 9, name: "VANILLA CLASSIC BLACK TEA", price: 15, image: "../static/VANILLA-CLASSIC.png" },
            { id: 10, name: "FINEST GOLDEN TIPS PREMIUM BLACK TEA", price: 30, image: "../static/Golden.png" },
        ],
        whitetea: [
            { id: 11, name: "SILVER NEEDLE WHITE TEA", price: 30, image: "../static/Silver_needle.png" },
            { id: 12, name: "WHITE SILK WHITE TEA", price: 15, image: "../static/White_Silk.png" },
            { id: 13, name: "WHITE WINGS WHITE TEA", price: 18, image: "../static/White_Wing.png" },
        ],
        herbaltea: [
            { id: 14, name: "BALANCE HERBAL INFUSION", price: 15, image: "../static/HerbalBalance.png" },
            { id: 15, name: "ESCAPE TO NATURE HERBAL INFUSION", price: 15, image: "../static/Escape.png" },
            { id: 16, name: "SIMPLY TEA TOX HERBAL INFUSION", price: 12, image: "../static/Simply_1.png" },
            { id: 17, name: "WELL BEING HERBAL INFUSION", price: 15, image: "../static/Wellbeing.png" },
        ],
        matchablends: [
            { id: 18, name: "ORGANIC MATCHA PREMIUM JAPANESE GREEN TEA", price: 38, image: "../static/MATCHA.png" },
            { id: 19, name: "TURMERIC MATCHA", price: 15, image: "../static/Turmeric_Matcha.png" },
        ],
        rooiboshoneybush: [
            { id: 20, name: "HONEY BUSH", price: 15, image: "../static/HoneyBush.png" },
            { id: 21, name: "ROOIBOS BLOSSOM", price: 15, image: "../static/Blossom.png" },
            { id: 22, name: "SPICY ROOIBOS", price: 15, image: "../static/SpicyRooibois.png" },
        ],
        fruitblends: [
            { id: 23, name: "MIXED BERRIES FRUIT BLEND", price: 15, image: "../static/mixed-berries.png" },
        ],
        premiumoolong: [
            { id: 24, name: "ROYAL ORCHID PREMIUM OOLONG TEA", price: 30, image: "../static/Royal_Orchid.png" },
        ]
    };

    const searchInput = document.getElementById('search');
    const filterButtons = document.querySelectorAll('.filter-box .btn');
    const storeProductsContainer = document.getElementById('store-products');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const filterPriceButton = document.getElementById('filter-price');
    let currentCategory = 'all';

    function displayProducts(products) {
        storeProductsContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('store-product', product.name.toLowerCase().replace(/\s+/g, ''));
            productDiv.innerHTML = `
                <img src="${product.image}">
                <div class="store-product-detail">
                    <h2>${product.name}</h2>
                    <p>$${product.price}</p>
                    <button class="view-details" data-id="${product.id}">View Details</button>
                </div>
            `;
            productDiv.querySelector('.view-details').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem('selectedTea', JSON.stringify(product));
                window.location.href = 'item_view.html';
            });
            storeProductsContainer.appendChild(productDiv);
        });
    }

    function filterProducts(category) {
        currentCategory = category;
        let products = category === 'all' ? Object.values(sampleData).flat() : sampleData[category];
        products = filterBySearch(products);
        products = filterByPrice(products);
        displayProducts(products);
    }

    function filterBySearch(products) {
        const query = searchInput.value.toLowerCase();
        return products.filter(product => product.name.toLowerCase().includes(query));
    }

    function filterByPrice(products) {
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        return products.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    filterProducts('all');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.getAttribute('data-filter');
            filterProducts(category);
        });
    });

    searchInput.addEventListener('input', () => {
        filterProducts(currentCategory);
    });

    filterPriceButton.addEventListener('click', () => {
        filterProducts(currentCategory);
    });
});



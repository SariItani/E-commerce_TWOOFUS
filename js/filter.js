document.addEventListener('DOMContentLoaded', () => {
    const sampleData = {
        greentea: [
            { id: 1, name: "Cinnamon Orange Green tea", price: "15$", image: "../static/CinnamonOrange.png" },
            { id: 2, name: "Turmeric Matcha", price: "15$", image: "../static/Turmeric_Matcha.png" },
            { id: 3, name: "Earl Grey Green Tea", price: "15$", image: "../static/EarlGreyGreen.jpg" },
            { id: 4, name: "Ginger Pineapple Green Tea", price: "15$", image: "../static/GingerPineApple.jpg" },
            { id: 5, name: "Vitalitea'l Green Tea", price: "15$", image: "../static/Vitality.jpg" },
            { id: 6, name: "Matcha Berries", price: "15$", image: "../static/Matcha_Berries.jpg" },
        ],
        blacktea: [
            { id: 7, name: "BLACK CURRANT SENCHA BLACK TEA", price: "15$", image: "../static/BlackTea.jpg" },
            { id: 8, name: "BLUE FLOWER EARL GREY BLACK TEA", price: "15$", image: "../static/BlueFlower.jpg" },
            { id: 9, name: "VANILLA CLASSIC BLACK TEA", price: "15$", image: "../static/VANILLA-CLASSIC.jpg" },
            { id: 10, name: "FINEST GOLDEN TIPS PREMIUM BLACK TEA", price: "30$", image: "../static/Golden.jpg" },
        ],
        whitetea: [
            { id: 11, name: "SILVER NEEDLE WHITE TEA", price: "30$", image: "../static/" },
            { id: 12, name: "WHITE SILK WHITE TEA", price: "15$", image: "../static/" },
            { id: 13, name: "WHITE WINGS WHITE TEA", price: "18$", image: "../static/" },
        ],
        herbaltea: [
            { id: 14, name: "BALANCE HERBAL INFUSION", price: "15$", image: "../static/" },
            { id: 15, name: "ESCAPE TO NATURE HERBAL INFUSION", price: "15$", image: "../static/" },
            { id: 16, name: "SIMPLY TEA TOX HERBAL INFUSION", price: "12$", image: "../static/" },
            { id: 17, name: "WELL BEING HERBAL INFUSION", price: "15$", image: "../static/" },
        ],
        matchablends: [
            { id: 18, name: "ORGANIC MATCHA PREMIUM JAPANESE GREEN TEA", price: "38$", image: "../static/" },
            { id: 19, name: "TURMERIC MATCHA", price: "15$", image: "../static/" },
        ],
        rooiboshoneybush: [
            { id: 20, name: "HONEY BUSH", price: "15$", image: "../static/" },
            { id: 21, name: "ROOIBOS BLOSSOM", price: "15$", image: "../static/" },
            { id: 22, name: "SPICY ROOIBOS", price: "15$", image: "../static/" },
        ],
        fruitblends: [
            { id: 23, name: "MIXED BERRIES FRUIT BLEND", price: "15$", image: "../static/" },
        ],
        premiumoolong: [
            { id: 24, name: "ROYAL ORCHID PREMIUM OOLONG TEA", price: "30$", image: "../static/" },
        ]
    };

    const searchInput = document.getElementById('search');
    const filterButtons = document.querySelectorAll('.filter-box .btn');
    const storeProductsContainer = document.getElementById('store-products');

    function displayProducts(products) {
        storeProductsContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('store-product', product.name.toLowerCase().replace(/\s+/g, ''));
            productDiv.innerHTML = `
                <img src="${product.image}">
                <div class="store-product-detail">
                    <h2>${product.name}</h2>
                    <p>${product.price}</p>
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
        if (category === 'all') {
            const allProducts = Object.values(sampleData).flat();
            displayProducts(allProducts);
        } else {
            displayProducts(sampleData[category]);
        }
    }

    filterProducts('all');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.textContent.toLowerCase().replace(' ', '');
            filterProducts(category);
        });
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const allProducts = Object.values(sampleData).flat();
        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let allTeas = [];
    let currentCategory = 'all';
    const resultsDiv = document.getElementById('search-results');
    const filterButtons = document.querySelectorAll('.filter-box .btn');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const filterPriceButton = document.getElementById('filter-price');

    // Fetch the tea data from JSON file
    fetch('./teatypes.JSON')
        .then(response => response.json())
        .then(sampleData => {
            Object.keys(sampleData).forEach(category => {
                allTeas = allTeas.concat(sampleData[category]);
            });

            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q').toLowerCase();

            filterAndDisplayTeas(query);

            // Set up event listeners for filter buttons
            filterButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    currentCategory = e.target.getAttribute('data-filter');
                    filterAndDisplayTeas(query);
                });
            });

            // Set up event listener for price filter button
            filterPriceButton.addEventListener('click', () => {
                filterAndDisplayTeas(query);
            });
        })
        .catch(error => console.error('Error loading the JSON file:', error));

    function filterAndDisplayTeas(query) {
        // Filter by search query
        let filteredTeas = allTeas.filter(tea => 
            tea.name.toLowerCase().includes(query) ||
            tea.description.toLowerCase().includes(query) ||
            (tea.benefits && tea.benefits.some(benefit => benefit.toLowerCase().includes(query)))
        );

        // Filter by category
        if (currentCategory !== 'all') {
            filteredTeas = filteredTeas.filter(tea => tea.category === currentCategory);
        }

        // Filter by price
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        filteredTeas = filteredTeas.filter(tea => {
            const price = parseFloat(tea.price.replace('$', ''));
            return price >= minPrice && price <= maxPrice;
        });

        displayTeas(filteredTeas);
    }

    function displayTeas(teas) {
        resultsDiv.innerHTML = '';

        if (teas.length > 0) {
            teas.forEach(item => {
                const card = document.createElement('div');
                card.className = 'product-card';

                const imgContainer = document.createElement('div');
                imgContainer.innerHTML = item.image;
                const img = imgContainer.firstChild;
                img.classList.add('tea-image');

                img.addEventListener('click', () => {
                    localStorage.setItem('selectedTea', JSON.stringify(item));
                    window.location.href = 'item_view.html';
                });

                const title = document.createElement('h3');
                title.textContent = item.name;

                const price = document.createElement('p');
                price.textContent = item.price;

                const button = document.createElement('button');
                button.className = 'btn btn-primary';
                button.textContent = 'Buy Now';
                button.addEventListener('click', () => {
                    localStorage.setItem('selectedTea', JSON.stringify(item));
                    window.location.href = 'item_view.html';
                });

                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(price);
                card.appendChild(button);
                resultsDiv.appendChild(card);
            });
        } else {
            resultsDiv.textContent = 'No results found for your search query.';
        }
    }
});
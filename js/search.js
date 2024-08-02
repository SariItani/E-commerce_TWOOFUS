document.addEventListener('DOMContentLoaded', () => {
    // Fetch the tea data from JSON file
    fetch('./teatypes.JSON')
        .then(response => response.json())
        .then(sampleData => {

            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q').toLowerCase();
            let allTeas = [];
            Object.keys(sampleData).forEach(category => {
                allTeas = allTeas.concat(sampleData[category]);
            });

            // Filter the teas based on name and description query
            const filteredTeas = allTeas.filter(tea => 
                tea.name.toLowerCase().includes(query) ||
                tea.description.toLowerCase().includes(query) ||
                (tea.benefits && tea.benefits.some(benefit => benefit.toLowerCase().includes(query)))
            );

            const resultsDiv = document.getElementById('search-results');

            if (filteredTeas.length > 0) {
                filteredTeas.forEach(item => {
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
        })
        .catch(error => console.error('Error loading the JSON file:', error));
});

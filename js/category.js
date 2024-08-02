document.addEventListener('DOMContentLoaded', () => {
    // Fetch the tea data from JSON file
    fetch('./teatypes.JSON')
        .then(response => response.json())
        .then(sampleData => {
            console.log("Sample Data:");
            console.log(sampleData);

            const urlParams = new URLSearchParams(window.location.search);
            const category = urlParams.get('category').toUpperCase(); // Fetch category from URL

            if (category && sampleData[category]) {
                document.getElementById('category-title').textContent = category.charAt(0) + category.slice(1).toLowerCase() + ' Tea';

                const shuffledContent = sampleData[category].sort(() => 0.5 - Math.random());
                const contentDiv = document.getElementById('content');

                shuffledContent.forEach(item => {
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
                    contentDiv.appendChild(card);
                });
            } else {
                document.getElementById('content').textContent = 'Category not found.';
            }
        })
        .catch(error => console.error('Error loading the JSON file:', error));
});
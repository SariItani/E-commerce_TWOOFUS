document.addEventListener('DOMContentLoaded', () => {
  // Fetch the JSON data
  fetch('./teatypes.JSON')
    .then(response => response.json())
    .then(sampleData => {
      const tea = JSON.parse(localStorage.getItem('selectedTea'));
      if (tea) {
        // Display tea details
        document.getElementById('teaName').textContent = tea.name;
        document.getElementById('teaPrice').textContent = tea.price;
        document.getElementById('teaDescription').textContent = tea.description;
        document.getElementById('teaPreparation').textContent = `How to prepare? ${tea.how_to_prepare}`;
        document.getElementById('teaIngredients').textContent = `Ingredients: ${tea.ingredients}`;

        const teaImageContainer = document.getElementById('teaImage');
        teaImageContainer.innerHTML = tea.image;
        const img = teaImageContainer.querySelector('img');
        img.classList.add('tea-image');

        const teaBenefits = document.getElementById('teaBenefits');
        tea.benefits.forEach(benefit => {
          const li = document.createElement('p');
          li.textContent = benefit;
          teaBenefits.appendChild(li);
        });

        // Recommendations Part
        const recommendations = document.getElementById('recommendations');
        const categoryTeas = sampleData[tea.category];
        // Filter out the current tea and select two random teas from the same category
        const filteredTeas = categoryTeas.filter(t => t.id !== tea.id);
        const randomTeasFromSameCategory = filteredTeas.sort(() => 0.5 - Math.random()).slice(0, 2);

        randomTeasFromSameCategory.forEach(recommendedTea => {
          const recContainer = document.createElement('div');
          recContainer.classList.add('rec-item');
          recContainer.innerHTML = recommendedTea.image;
          const recImg = recContainer.querySelector('img');

          const recName = document.createElement('p');
          recName.textContent = recommendedTea.name;
          recContainer.appendChild(recName);

          recImg.addEventListener('click', () => {
            localStorage.setItem('selectedTea', JSON.stringify(recommendedTea));
            location.reload();
          });
          recommendations.appendChild(recContainer);
        });

        // Get a list of categories excluding the current one
        const categories = Object.keys(sampleData).filter(category => category !== tea.category);
        
        // Function to add a random recommendation from a different category
        const addRandomRecommendation = (excludeCategories) => {
          const availableCategories = categories.filter(category => !excludeCategories.includes(category));
          if (availableCategories.length > 0) {
            const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
            const randomTea = sampleData[randomCategory][Math.floor(Math.random() * sampleData[randomCategory].length)];
            
            const recContainer = document.createElement('div');
            recContainer.classList.add('rec-item');
            recContainer.innerHTML = randomTea.image;
            const recImg = recContainer.querySelector('img');

            const recName = document.createElement('p');
            recName.textContent = randomTea.name;
            recContainer.appendChild(recName);

            recImg.addEventListener('click', () => {
              localStorage.setItem('selectedTea', JSON.stringify(randomTea));
              location.reload();
            });
            recommendations.appendChild(recContainer);
            
            return randomCategory;
          }
        };

        // Add one random recommendation from a different category
        const firstDifferentCategory = addRandomRecommendation([tea.category]);

        // Add one more recommendation from another different category
        addRandomRecommendation([tea.category, firstDifferentCategory]);
      }
    })
    .catch(error => console.error('Error loading the JSON file:', error));
});

function toggle() {
  const button = document.getElementById("favoriteBtn");
  button.classList.toggle("red");
}

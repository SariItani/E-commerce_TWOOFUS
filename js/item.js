document.addEventListener('DOMContentLoaded', () => {
  // Fetch the JSON data
  fetch('./teatypes.JSON')
      .then(response => response.json())
      .then(sampleData => {
          const tea = JSON.parse(localStorage.getItem('selectedTea'));
          const teaDetailsDiv = document.getElementById('teaDetails'); 
          const ratingContainer = document.getElementById('ratingContainer'); //Added for the rating part 
          const rateButton = document.getElementById('rateButton');

          if (tea) {
              // Ensure rating and nbOfRates are numbers
              tea.rating = Number(tea.rating) || 0; //this is initially set to 2.5
                nbOfRates = 0; 

              // Display tea details
              document.getElementById('teaName').textContent = tea.name;
              document.getElementById('teaPrice').textContent = tea.price;
              document.getElementById('teaDescription').textContent = tea.description;
              document.getElementById('teaPreparation').textContent = `How to prepare? ${tea.how_to_prepare}`;
              document.getElementById('teaIngredients').textContent = `Ingredients: ${tea.ingredients}`;
              document.getElementById('teaRating').textContent = tea.rating.toFixed(1);//to fixed is for the decimal stuff 

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

              // Show rating stars on rate button click
              rateButton.addEventListener('click', () => {
                  ratingContainer.classList.toggle('hidden');
              });

              // Handle star click for rating
              const stars = document.querySelectorAll('.star');
              stars.forEach(star => {
                  star.addEventListener('click', function() {
                      const newRating = parseInt(this.getAttribute('data-value')); //get the value from the stars chosen

                      // Debug: Check the new rating input
                      console.log('New rating input:', newRating);

                          tea.rating = newRating

                          // Debug: Check updated rating
                          console.log('Updated rating:', tea.rating);

                          // Save updated tea object to localStorage
                          localStorage.setItem('selectedTea', JSON.stringify(tea));

                          // Display the new rating
                          document.getElementById('teaRating').textContent = tea.rating.toFixed(1);

                          // Update star selection
                          stars.forEach((s, index) => {
                              if (index < newRating) {
                                  s.classList.add('selected');
                              } else {
                                  s.classList.remove('selected');
                              }
                          });
                       
                  });
              });
          }
      })
      .catch(error => console.error('Error loading the JSON file:', error));
});

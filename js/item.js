// we are gonna try to combine all htmls in one html
document.addEventListener('DOMContentLoaded', () => {
  // Fetch the JSON data
  fetch('./teatypes.JSON')
    .then(response => response.json())
    .then(sampleData => {
      console.log("Sample Data:");
      console.log(sampleData);
      
      const tea = JSON.parse(localStorage.getItem('selectedTea')); // we've retreived what we set in index.js and parse it back into a json object
      if (tea) { // if the obj was succ retreived 
        document.getElementById('teaName').textContent = tea.name; //setting the text of the html element of id teaName to the retreived object's name 
        document.getElementById('teaPrice').textContent = tea.price;
        document.getElementById('teaDescription').textContent = tea.description;
        document.getElementById('teaPreparation').textContent = `How to prepare? ${tea.how_to_prepare}`;
        document.getElementById('teaIngredients').textContent = `Ingredients: ${tea.ingredients}`;

        const teaImageContainer = document.getElementById('teaImage');
        teaImageContainer.innerHTML = tea.image; // Set the innerHTML to the image tag
        const img = teaImageContainer.querySelector('img'); // the image that was now set in tje container 
        img.classList.add('tea-image');

        const teaBenefits = document.getElementById('teaBenefits');
        tea.benefits.forEach(benefit => {
            const li = document.createElement('p');
            li.textContent = benefit;
            teaBenefits.appendChild(li);
        });
  
        //The Recommendations Part 
        const recommendations = document.getElementById('recommendations');
  
        //Recommendations Based On  Category 
        const categoryTeas = sampleData[tea.category]; //catch the category of the selected image 
        const filteredTeas = categoryTeas.filter(t => t.id !== tea.id).slice(0, 2); // slice is to take the first 2 tea types of tje categry and the selected item isexcluded in (id!=..)

        filteredTeas.forEach(recommendedTea => {
          const recContainer = document.createElement('div');
          recContainer.classList.add('rec-item');
          recContainer.innerHTML = recommendedTea.image; // Set the innerHTML directly
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


        //Random Recommendations 
        const categories = Object.keys(sampleData).filter(category => category !== tea.category); // all categories except the selected tea's category
        const randomCategory = categories[Math.floor(Math.random() * categories.length)]; // randomly choose one of them 
        const randomTea = sampleData[randomCategory][Math.floor(Math.random() * sampleData[randomCategory].length)]; // Select a random tea from the chosen category

        const recContainer = document.createElement('div');
        recContainer.classList.add('rec-item'); 
        recContainer.innerHTML = randomTea.image;
        const recImg = recContainer.querySelector('img');

        const recName = document.createElement('p');
        recName.textContent = recommendedTea.name;
        recContainer.appendChild(recName);

        recImg.addEventListener('click', () => {
          localStorage.setItem('selectedTea', JSON.stringify(randomTea));
          location.reload();
        });
        recommendations.appendChild(recContainer);
      }
    })
    .catch(error => console.error('Error loading the JSON file:', error));
});


function toggle() {
  const button = document.getElementById("favoriteBtn");
  if (button.className === ""){
    button.className = "red";
  }
  else{
    button.className = "";
  }
}
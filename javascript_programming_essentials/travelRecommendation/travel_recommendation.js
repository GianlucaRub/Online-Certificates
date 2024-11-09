const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

function searchDestinationTypes() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = ''; // Clear previous results

  fetch('travel_recommendation_api.json')
    .then((response) => response.json())
    .then((data) => {
      let selectedCategory = [];

      // Determine the category based on user input
      if (input === 'temples' || input === 'temple') {
        selectedCategory = data.temples || [];
      } else if (input === 'beaches' || input === 'beach') {
        selectedCategory = data.beaches || [];
      } else if (input === 'country' || input === 'countries') {
        selectedCategory = data.countries || [];
      } else {
        resultDiv.innerHTML = 'Unknown category.';
        return;
      }

      // Display all items in the selected category
      if (selectedCategory.length > 0) {
        if (input === 'country' || input === 'countries') {
          resultDiv.style.gap = '0.5%';
          for (const country of selectedCategory) {
            const { id, name, cities } = country;
            for (const city of cities) {
              const { name, imageUrl, description } = city;

              resultDiv.innerHTML += `<h3>${name}</h3>`;
              resultDiv.innerHTML += `<img src="${imageUrl}" width=100%">`;
              resultDiv.innerHTML += `<p>${description}</p>`;
            }
          }
        } else {
          resultDiv.style.gap = '5%';
          for (const destination of selectedCategory) {
            const { name, imageUrl, description } = destination;

            resultDiv.innerHTML += `<h2>${name}</h2>`;
            resultDiv.innerHTML += `<img src="${imageUrl}" width=100%">`;
            resultDiv.innerHTML += `<p>${description}</p>`;
          }
        }
      } else {
        resultDiv.innerHTML = 'No destinations found in this category.';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });

  resultDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
}

btnSearch.addEventListener('click', searchDestinationTypes);

function resetDestinations() {
  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = ''; // Clear previous results
  resultDiv.style.backgroundColor = 'rgba(0, 0, 0, 0)';
}
btnReset.addEventListener('click', resetDestinations);

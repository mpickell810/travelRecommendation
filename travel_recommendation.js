var xhr = new XMLHttpRequest();
var url = './travel_recommendation_api.json';

xhr.open('GET', url, true);
xhr.responseType = 'json';

// Parse JSON

function loadDestinationData() {
    fetch(travel_recommendation_api.json)
      .then(response => response.json())
      .then(data => {
        travelData = data;
        countries = travelData.countries;
        temples = travelData.temples;
        beaches = travelData.beaches;
        console.log('Data loaded:', travelData);
    })
    .catch(error => console.error('Error loading data:', error));
}

// Search across all categories

function searchDestination() {
    let searchTerm = document.getElementById('destinations').value.toLowerCase();
    let searchResults = [];

// Search in countries and their cities

countries.forEach(country => {
    if (country.name.toLowerCase().includes(searchTerm)) {
        searchResults.push(country);
    }
country.cities.forEach(city => {
  if (city.name.toLowerCase().includes(searchTerm)) ||
      city.description.toLowerCase().includes(searchTerm)) {
    searchResults.push(city);
  }
 });
});

// Search in Temples

temples.forEach(temple => {
    if (temple.name.toLowerCase().includes(searchTerm)) ||
        temple.description.toLowerCase().includes(searchTerm) {
        searchResults.push(temple);
        }
    }
});

//  Search in Beaches
beaches.forEach(beach => {
    if (beach.name.toLowerCase().includes(searchTerm)) ||
        beach.description.toLowerCase().includes(searchTerm)) {
        searchResults.push(beach);
        }
});

displayResults(searchResults);
}

//  Display Results
function displayResults(searchResults) {
    let resultsHTML = '';

    searchResults.forEach(result => {
        resultsHTML += `
        <div class="destination-card">
        <img src="${result.imageURL}" alt="${result.name}">
        <h3>${result.name}</h3>
        <p>${result.description}</p>
        </div>
        `;
    });
document.getElementById('main-content').innerHTML = resultsHTML;
}
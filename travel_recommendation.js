// Parse JSON
let travelData = {};
let countries = [];
let temples = [];
let beaches = [];
let searchCache = new Map();

function loadDestinationData() {
    fetch('./travel_recommendation_api.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load data');
        return response.json();
      })
        .then(data => {
        travelData = data;
        countries = travelData.countries || [];
        temples = travelData.temples || [];
        beaches = travelData.beaches || [];
        console.log('Data loaded:', travelData);
    })
    .catch(error => console.error('Error loading data:', error));
}

// Search across all categories

function searchDestination() {
    const inputElement = document.getElementById('destinations');
    const searchTerm = inputElement.value.trim().toLowerCase();

    if (!searchTerm) {
        document.getElementById('main-content').innerHTML = '';
        return;        
    }

    if (searchCache.has(searchTerm)) {
        displayResults(searchCache.get(searchTerm))
        return;
    }

    let searchResults = [];

// Search in countries and their cities

countries.forEach(country => {
    const countryNameLower = country.name.toLowerCase();
    if (country.name.toLowerCase().includes(searchTerm)) {
        searchResults.push(country);
    }
    country.cities.forEach(city => {
        const cityNameLower = city.name.toLowerCase();
        const descriptionLower = city.description.toLowerCase();
        if (cityNameLower.includes(searchTerm) || descriptionLower.includes(searchTerm)) {
            searchResults.push(city);
      }
    });
});

// Search in Temples

temples.forEach(temple => {
    const templeName = temple.name.toLowerCase();
    const templeDesc = temple.description.toLowerCase();
    if (templeName.includes(searchTerm) || templeDesc.includes(searchTerm)) {
        searchResults.push(temple);
        }
});

//  Search in Beaches
beaches.forEach(beach => {
    const beachName = beach.name.toLowerCase();
    const beachDesc = beach.description.toLowerCase();
    if (beachName.includes(searchTerm) || beachDesc.includes(searchTerm)) {
        searchResults.push(beach);
    }
});

searchCache.set(searchTerm, searchResults);
displayResults(searchResults);
}

//  Display Results
function displayResults(searchResults) {
    const mainContent = document.getElementById('main-content');

    if (searchResults.length === 0) {
        mainContent.innerHTML = '<p>No results found.</p>';
        return;
    }

    const fragment = document.createDocumentFragment();

    searchResults.forEach(result => {
        const card = document.createElement('div');
        card.className = 'destination-card';
        card.innerHTML = `
            <img src="${result.imageURL}" alt="${result.name}" loading="lazy">
            <h3>${result.name}</h3>
            <p>${result.description}</p>
        </div>
        `;
        fragment.appendChild(card);
    });

    mainContent.innerHTML = '';
    mainContent.appendChild(fragment);
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    loadDestinationData();

    const searchBtn = document.getElementById('btnSearch');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchDestination);
    }

    const destInput = document.getElementById('destinations');
    if (destInput) {
        destInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') searchDestination();
        });
    }
});
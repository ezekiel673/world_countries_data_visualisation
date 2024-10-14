// Fetching data from countries_data.js (ensure it's correctly linked)
const countries = countries_data;

// Sort and get the top 10 most populated countries
const mostPopulatedCountries = countries.sort((a, b) => b.population - a.population).slice(0, 10);

// Function to get top 10 most spoken languages
const mostSpokenLanguages = () => {
  const languageMap = new Map();
  countries.forEach(country => {
    country.languages.forEach(language => {
      if (languageMap.has(language)) {
        languageMap.set(language, languageMap.get(language) + 1);
      } else {
        languageMap.set(language, 1);
      }
    });
  });
  // Convert map to array and sort by number of speakers
  return Array.from(languageMap).sort((a, b) => b[1] - a[1]).slice(0, 10);
};

// Function to render bar chart
const renderBarChart = (data, labelKey, valueKey) => {
  const container = document.getElementById('bar-chart');
  container.innerHTML = ''; // Clear previous content

  data.forEach(item => {
    // Create container for each bar and label
    const barContainer = document.createElement('div');
    barContainer.className = 'bar-container';

    // Create label for the data item (country or language name)
    const label = document.createElement('div');
    label.className = 'bar-label';
    label.textContent = item[labelKey];
    barContainer.appendChild(label);

    // Create the bar element
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.width = `${(item[valueKey] / data[0][valueKey]) * 100}%`; // Set bar width proportionally
    barContainer.appendChild(bar);

    // Create a span to display the value (population or language count)
    const value = document.createElement('span');
    value.className = 'bar-value';
    value.textContent = item[valueKey].toLocaleString();
    barContainer.appendChild(value);

    // Append barContainer to the main container
    container.appendChild(barContainer);
  });
};

// Render the population chart by default
renderBarChart(mostPopulatedCountries, 'name', 'population');

// Toggle between population and languages charts
document.getElementById('populationBtn').addEventListener('click', () => {
  renderBarChart(mostPopulatedCountries, 'name', 'population');
  document.getElementById('chart-title').textContent = '10 Most Populated Countries in the World';
  setActiveButton('populationBtn');
});

document.getElementById('languagesBtn').addEventListener('click', () => {
  const languagesData = mostSpokenLanguages().map(([language, count]) => ({ name: language, population: count }));
  renderBarChart(languagesData, 'name', 'population');
  document.getElementById('chart-title').textContent = '10 Most Spoken Languages in the World';
  setActiveButton('languagesBtn');
});

// Helper function to set the active button
const setActiveButton = (activeId) => {
  document.getElementById('populationBtn').classList.remove('active');
  document.getElementById('languagesBtn').classList.remove('active');
  document.getElementById(activeId).classList.add('active');
};

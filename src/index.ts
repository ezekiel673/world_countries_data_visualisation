// Assuming countries_data.js exports a variable "countries_data" with the required structure
interface Country {
    name: string;
    population: number;
    languages: string[];
  }
  
  // Ensure countries_data is of type Country[] and fetched correctly
  declare const countries_data: Country[];
  
  const countries: Country[] = countries_data;
  
  // Sort and get the top 10 most populated countries
  const mostPopulatedCountries: Country[] = countries
    .sort((a, b) => b.population - a.population)
    .slice(0, 10);
  
  // Function to get the top 10 most spoken languages
  const mostSpokenLanguages = (): { name: string; population: number }[] => {
    const languageMap: Map<string, number> = new Map();
  
    countries.forEach((country) => {
      country.languages.forEach((language) => {
        const count = languageMap.get(language) || 0;
        languageMap.set(language, count + 1);
      });
    });
  
    // Convert the map to an array and sort by the number of speakers
    return Array.from(languageMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([language, count]) => ({ name: language, population: count }));
  };
  
  // Function to render the bar chart
  const renderBarChart = (
    data: { name: string; population: number }[],
    labelKey: keyof { name: string; population: number },
    valueKey: keyof { name: string; population: number }
  ): void => {
    const container = document.getElementById('bar-chart');
  
    if (!container) {
      console.error("Container 'bar-chart' not found.");
      return;
    }
  
    container.innerHTML = ''; // Clear previous content
  
    data.forEach((item) => {
      // Create container for each bar and label
      const barContainer = document.createElement('div');
      barContainer.className = 'bar-container';
  
      // Create label for the data item (country or language name)
      const label = document.createElement('div');
      label.className = 'bar-label';
      label.textContent = item[labelKey] as string;
      barContainer.appendChild(label);
  
      // Create the bar element
      const bar = document.createElement('div');
      bar.className = 'bar';
      const value = item[valueKey] as number;
      const maxValue = data[0][valueKey] as number;
      
      // Ensure maxValue isn't zero to avoid division by zero
      bar.style.width = maxValue !== 0 ? `${(value / maxValue) * 100}%` : '0%';
      barContainer.appendChild(bar);
  
      // Create a span to display the value (population or language count)
      const valueSpan = document.createElement('span');
      valueSpan.className = 'bar-value';
      valueSpan.textContent = value.toLocaleString(); // Format value with commas
      barContainer.appendChild(valueSpan);
  
      // Append barContainer to the main container
      container.appendChild(barContainer);
    });
  };
  
  // Render the population chart by default
  renderBarChart(mostPopulatedCountries, 'name', 'population');
  
  // Toggle between population and languages charts
  document.getElementById('populationBtn')?.addEventListener('click', () => {
    renderBarChart(mostPopulatedCountries, 'name', 'population');
    const titleElement = document.getElementById('chart-title');
    if (titleElement) {
      titleElement.textContent = '10 Most Populated Countries in the World';
    }
    setActiveButton('populationBtn');
  });
  
  document.getElementById('languagesBtn')?.addEventListener('click', () => {
    const languagesData = mostSpokenLanguages();
    renderBarChart(languagesData, 'name', 'population');
    const titleElement = document.getElementById('chart-title');
    if (titleElement) {
      titleElement.textContent = '10 Most Spoken Languages in the World';
    }
    setActiveButton('languagesBtn');
  });
  
  // Helper function to set the active button
  const setActiveButton = (activeId: string): void => {
    document.getElementById('populationBtn')?.classList.remove('active');
    document.getElementById('languagesBtn')?.classList.remove('active');
    document.getElementById(activeId)?.classList.add('active');
  };
  
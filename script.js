async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
  }
  
  // Function to fetch countries data and display them as cards
  function fetchCountriesData() {
    const countriesList = document.getElementById("countriesList");
  
    fetchData("https://restcountries.com/v3.1/all")
      .then(data => {
        data.sort((a, b) => {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        });
  
        data.forEach(country => {
          const card = createCountryCard(country);
          countriesList.appendChild(card);
        });
      })
      .catch(error => console.log(error));
  }
  
  // Function to fetch weather data and display it on the card
  function fetchWeatherData(lat, lon, country) {
    fetchData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=12f4cfff5cf2766bc4f975fdc6c3b200`)
      .then(data => {
        showWeatherReport(country, data);
      })
      .catch(error => console.log(error));
  }
  

  function createCountryCard(country) {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-md-6 col-lg-4 col-xl-4 my-3";
    
    const cardContent = `
      <div class="card firstCard whiteColour h-100">
        <div class="card-header">
          <h1 class="text-center card-title bg-dark">
            ${country.name.common}
          </h1>
          <img class="card-img-top" src="${country.flags.png}" alt="Card image">
        </div>
        <div class="card-body">
          <br>
          <br>
          <div class="card-text">
            <p>Capital: ${country.capital}</p>
            <p>Region: ${country.region}</p>
            <p>Country Code: ${country.cca3}</p>
          </div>
          <button type="button" class="btn btn-outline-light" onclick="fetchWeatherData(${country.latlng[0]}, ${country.latlng[1]}, '${country.cca3}')">
            Click for weather
          </button>
          <div class="weatherReport" id="weather_${country.cca3}">
            <!-- Weather report will be dynamically added here -->
          </div>
        </div>
      </div>
    `;
    
    card.innerHTML = cardContent;
    return card;
  }
  

  function showWeatherReport(countryCode, weatherData) {
    const weatherReportDiv = document.getElementById(`weather_${countryCode}`);
    const weatherReport = `
      <p id="weather">Weather: ${weatherData.weather[0].main}</p>
      <p>Description: ${weatherData.weather[0].description}</p>
      <p>Minimum Temperature: ${(weatherData.main.temp_min - 273.15).toFixed(2)} &deg;C</p>
      <p>Maximum Temperature: ${(weatherData.main.temp_max - 273.15).toFixed(2)} &deg;C</p>
    `;
    
    weatherReportDiv.innerHTML = weatherReport;
  }
  

  document.addEventListener("DOMContentLoaded", () => {
    fetchCountriesData();
  });
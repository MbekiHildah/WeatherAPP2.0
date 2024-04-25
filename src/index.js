const apiKey = "2ft2755f62423283e36ab5068a024o8d";
const currentWeatherUrl =
  "https://api.shecodes.io/weather/v1/current?query={query}&key=" + apiKey;
const forecastUrl =
  "https://api.shecodes.io/weather/v1/forecast?query={query}&key=" + apiKey;

const searchForm = document.querySelector(".search-form");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");
const iconElement = document.getElementById("icon");
const hourlyForecastContainer = document.querySelector(
  ".hourly-forecast-container"
);
const weeklyForecastContainer = document.querySelector(
  ".weekly-forecast-container"
);

// Function to fetch current weather data
async function fetchCurrentWeather(query) {
  try {
    const response = await axios.get(
      currentWeatherUrl.replace("{query}", query)
    );
    const data = response.data;
    temperatureElement.textContent = data.temperature;
    descriptionElement.textContent = data.description;
    humidityElement.textContent = data.humidity;
    windElement.textContent = data.wind;
    iconElement.textContent = data.icon; // Assuming API provides an icon code
  } catch (error) {
    console.error("Error fetching current weather data:", error);
  }
}

// Function to fetch forecast weather data
async function fetchForecast(query) {
  try {
    const response = await axios.get(forecastUrl.replace("{query}", query));
    const data = response.data;
    // Process and display forecast data as needed

    // Clear previous forecast elements
    hourlyForecastContainer.innerHTML = "";
    weeklyForecastContainer.innerHTML = "";

    // Display hourly forecast
    for (let i = 0; i < 5; i++) {
      const forecast = data.hourly[i]; // Assuming API provides hourly forecast data
      const hourlyForecastDiv = document.createElement("div");
      hourlyForecastDiv.classList.add("hourly-forecast-container");
      hourlyForecastDiv.innerHTML = `
        <div class="time">${forecast.time}</div>
        <span class="hourly-forecast-temperature">${forecast.temperature}</span>
        <span class="hourly-forecast-temperature-unit">°C</span>
        <div class="hourly-forecast-widget">${forecast.icon}</div>
      `;
      hourlyForecastContainer.appendChild(hourlyForecastDiv);
    }

    // Display weekly forecast
    for (let i = 0; i < 5; i++) {
      const forecast = data.daily[i]; // Assuming API provides daily forecast data
      const weeklyForecastDiv = document.createElement("div");
      weeklyForecastDiv.classList.add("weekly-forecast-container");
      weeklyForecastDiv.innerHTML = `
        <div class="day">${forecast.day}</div>
        <span class="weekly-forecast-temperature">${forecast.temperature}</span>
        <span class="weekly-forecast-unit">°C</span>
        <div class="weekly-forecast-widget">${forecast.icon}</div>
      `;
      weeklyForecastContainer.appendChild(weeklyForecastDiv);
    }
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

// Event listener for form submission
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchTerm = searchForm.querySelector("input").value;
  fetchCurrentWeather(searchTerm);
  fetchForecast(searchTerm);
});

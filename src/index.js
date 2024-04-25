function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
}
function searchCity(city) {
  let apiKey = "2ft2755f62423283e36ab5068a024o8d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form");
  let city = searchInput.value;
  searchCity(city);

  searchInput.placeholder = `📍${city}`;
  searchInput.value = "";
}
document.querySelector("form").addEventListener("submit", handleSearchSubmit);

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSubmitForm);

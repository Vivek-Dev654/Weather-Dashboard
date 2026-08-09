/* ==========================================================
   WEATHER DASHBOARD - script.js
   This file contains simple JavaScript to:
   1. Get city name from the input box
   2. Fetch weather data from OpenWeather API
   3. Show the data on the webpage
   4. Show an error if the city is not found
   ========================================================== */

/* ---------- STEP 1: Put your OpenWeather API key here ---------- */
/* Go to https://openweathermap.org/ , create a free account,
   generate an API key, and paste it below in place of YOUR_API_KEY */
const API_KEY = "8f6d269de849ddaff9386041ec4c0496";

/* Base URL of the OpenWeather API */
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

/* ---------- STEP 2: Select HTML elements we need to update ---------- */
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorMsg = document.getElementById("errorMsg");
const weatherContent = document.getElementById("weatherContent");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const feelsLike = document.getElementById("feelsLike");

const infoHumidity = document.getElementById("infoHumidity");
const infoWind = document.getElementById("infoWind");

/* ---------- STEP 3: Function to fetch weather data ---------- */
function getWeather(city) {

  /* Build the complete API URL.
     units=metric gives temperature in Celsius */
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

  /* Fetch data from the API */
  fetch(url)
    .then(function (response) {
      /* If city is not found, response.ok will be false */
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(function (data) {
      /* If data is received successfully, show it on the page */
      showWeather(data);
    })
    .catch(function () {
      /* If there is any error (like invalid city), show error message */
      showError();
    });
}

/* ---------- STEP 4: Function to display weather data on the page ---------- */
function showWeather(data) {

  /* Hide error message and show the weather content */
  errorMsg.textContent = "";
  weatherContent.style.display = "block";

  /* Update city and country (e.g. "Kanpur, IN") */
  cityName.textContent = data.name + ", " + data.sys.country;

  /* Update weather icon using icon code from API */
  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  /* Update temperature and description */
  temperature.textContent = Math.round(data.main.temp) + "°c";
  weatherDescription.textContent = data.weather[0].description;
  feelsLike.textContent = "Feels like " + Math.round(data.main.feels_like) + "°c";

  /* Update humidity and wind speed */
  infoHumidity.textContent = data.main.humidity + "%";
  infoWind.textContent = data.wind.speed + " km/h";
}

/* ---------- STEP 5: Function to show error message ---------- */
function showError() {
  /* Hide the weather content and show error text */
  weatherContent.style.display = "none";
  errorMsg.textContent = "City not found. Please enter a valid city.";
}

/* ---------- STEP 6: Handle Search button click ---------- */
searchBtn.addEventListener("click", function () {
  const city = cityInput.value.trim(); /* remove extra spaces */

  if (city === "") {
    errorMsg.textContent = "Please enter a city name.";
    weatherContent.style.display = "none";
  } else {
    getWeather(city);
  }
});

/* ---------- STEP 7 (Bonus): Allow pressing "Enter" key to search ---------- */
cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

/* ---------- STEP 8: Load default city when the page opens ---------- */
window.addEventListener("load", function () {
  getWeather("Kanpur");
});
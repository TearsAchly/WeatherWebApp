// Import file
import './styles/style.css';
import clearDayImage from './images/day/clear.jpg';
import cloudyImage from './images/day/cloudy.jpg';
import rainyImage from './images/day/rainy.jpg';
import snowyImage from './images/day/snowy.jpg';
import clearNightImage from './images/night/clear.jpg';
import cloudyNightImage from './images/night/cloudy.jpg';
import rainyNightImage from './images/night/rainy.jpg';
import snowyNightImage from './images/night/snowy.jpg';

// import jquery
import $ from 'jquery';

const temp = $(".temp");
const dateOutput = $(".date");
const timeOutput = $(".time");
const conditionOutput = $(".condition");
const nameOutput = $(".name");
const icon = $(".icon");
const cloudOutput = $(".cloud");
const humidityOutput = $(".humidity");
const windOutput = $(".wind");
const form = $("#locationInput");
const search = $(".search");
const btn = $(".submit");
const cities = $(".city");
const app = $(".weather-app");

let cityInput = "Jakarta";

// Add click event to each city in the panel
cities.on("click", (event) => {
  // Change from default city to the clicked one
  cityInput = $(event.currentTarget).text();
  // Function that fetches and displays all the data from the weather API
  fetchWeatherData();
  // Fade out the app (simple animation)
  app.css("opacity", "0");
});

// Add submit event to the form
form.on("submit", (e) => {
  // If the input field (search bar) is empty, throw an alert
  if (search.val().length === 0) {
    alert("Please type in a city name");
  } else {
    // Change from default city to the one written in the input field
    cityInput = search.val();
    // Function that fetches and displays all the data from the Weather API
    fetchWeatherData();
    // Remove all text from the input field
    search.val("");
    // Fade out the app (simple animation)
    app.css("opacity", "0");

    e.preventDefault();
  }
});

const fetchWeatherData = () => {
  if (!cityInput) {
    alert("Please provide a city name");
    return;
  }

  const apiKey = "5836ddf871ba42b088b02150242701";
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${ apiKey }&q=${ cityInput }`;

  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: (data) => {
      console.log(data);
      temp.html(`${ data.current.temp_c }&#176`);
      conditionOutput.html(data.current.condition.text);

      // Get the date and time from the city
      const date = new Date(data.location.localtime);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const time = date.toLocaleTimeString();

      // Format the date and time
      dateOutput.html(`${ date.toLocaleDateString(undefined, options) }`);
      timeOutput.html(time);
      nameOutput.html(data.location.name);

      // Get the corresponding icon URL for the weather
      const iconUrl = data.current.condition.icon;
      icon.attr("src", iconUrl);

      // Add the weather details to the page
      cloudOutput.html(`cloudy: ${ data.current.cloud }%`);
      humidityOutput.html(`humidity: ${ data.current.humidity }%`);
      windOutput.html(`wind: ${ data.current.wind_kph } km/h`);

      // Set default rule of day
      let timeOfDay = "day";
      const code = data.current.condition.code;

      // Change to night if it's night time in the city
      if (!data.current.is_day) {
        timeOfDay = "night";
      }

      setWeatherBackground(code, timeOfDay);

      app.css("opacity", "1");
    },
    error: (error) => {
      console.error(error);
      alert("City not found, please try again");
      app.css("opacity", "1");
    },
  });
};

// Initial data fetch
fetchWeatherData();

// Weather conditions based on weather code
const weatherConditions = {
  'clear': [1000],
  'cloudy': [1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282],
  'rainy': [1065, 1072, 1150, 1159, 1180, 1183, 1186, 1189, 1192, 1195, 1204, 1207, 1240, 1243, 1246, 1249, 1252],
  'snowy': [], // Kamu bisa menambahkan kode cuaca salju di sini jika diperlukan
};

// Function to set weather background based on code and time of day
const setWeatherBackground = (code, timeOfDay) => {
  let backgroundImage, buttonColor;

  // Iterate through weatherConditions to find a match
  Object.entries(weatherConditions).forEach(([condition, codes]) => {
    if (codes.includes(code)) {
      switch (condition) {
        case 'clear':
          backgroundImage = `url(${ timeOfDay === "day" ? clearDayImage : clearNightImage })`;
          buttonColor = timeOfDay === "night" ? "#181e27" : "#e5ba92";
          break;
        case 'cloudy':
          backgroundImage = `url(${ timeOfDay === "day" ? cloudyImage : cloudyNightImage })`;
          buttonColor = timeOfDay === "night" ? "#181e27" : "#fa6d1b";
          break;
        case 'rainy':
          backgroundImage = `url(${ timeOfDay === "day" ? rainyImage : rainyNightImage })`;
          buttonColor = timeOfDay === "night" ? "#325c80" : "#647d75";
          break;
        case 'snowy':
          backgroundImage = `url(${ timeOfDay === "day" ? snowyImage : snowyNightImage })`;
          buttonColor = timeOfDay === "night" ? "#000000" : "#FFFFFF";
          break;
        default:
          backgroundImage = `url(${ timeOfDay === "day" ? snowyImage : snowyNightImage })`;
          buttonColor = timeOfDay === "night" ? "#000000" : "#FFFFFF";
          break;
      }
    }
  });

  console.log("Background Image:", backgroundImage);
  console.log("Button Color:", buttonColor);

  app.css("backgroundImage", backgroundImage);
  btn.css("background", buttonColor);

  // Add responsive styles based on screen width
  if (window.innerWidth <= 600) {
    app.css("backgroundSize", "contain");
  } else {
    app.css("backgroundSize", "cover");
  }
};

// Define the custom element class
class MyBrand extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: 'open' });

    // Define the HTML template
    this.shadowRoot.innerHTML = `
      <style>
        /* Add any additional styling here */
        :host {
          color: #007BFF; /* Set the color to blue, you can adjust as needed */
        }
      </style>
      <h3>The weather-app</h3>
    `;
  }
}

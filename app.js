let searchCity = document.querySelector("#searchCity");
// let searchBtn = document.querySelector("#submitBtn");
let weatherInfo = document.querySelector("#weatherDetails");
let icon = document.querySelector(".weather-icon");
let code;

const serverUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const key = "fdcbabb47ac603814dc1fb1cab0a810e";

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let today = new Date();
let hours = today.getHours();
let minutes = today.getMinutes();
let seconds = today.getSeconds();

let condition;

function constructUrl(city) {
  return serverUrl + city + "&appid=" + key + "&units=metric";
}

function errorHandler(error) {
  // console.log(code);
  if (code === "404") {
    alert("Please enter a valid city");
  } else {
    alert("Seems like there's come problem");
  }
}

function searchWeatherHandler(event) {
  let city = searchCity.value;
  console.log(city);
  if (event.keyCode === 13 && city !== "") {
    fetch(constructUrl(city))
      .then((response) => response.json())
      .then((json) => {
        code = json.cod;
        weatherInfo.innerHTML = `
        <h1 class="location"> ${json.name}, ${json.sys.country}  Weather</h1>
        <div class="dateinfo">as of ${today.getDate()} ${
          months[today.getMonth()]
        } (${
          days[today.getDay()]
        }), ${today.getFullYear()} ${hours}:${minutes}:${seconds} hrs</div> 
        <div class="flex-items">
          <div class="inner-flex">
            <span class="temp">${json.main.temp}&deg;</span>
            <span class="weather-icon"><img src="/icons/${
              json.weather[0].icon
            }.png" alt="weather icon" /></span>
          </div>
          <div class="inner-flex">
            <span class="innerText">${json.weather[0].main}</span>
            <span class="innerText">${json.main.temp_min}&deg;(min) / ${
          json.main.temp_max
        }&deg;(max)</span>
          </div>
        </div>

        <h2>Weather Today in ${json.name}, ${json.sys.country}</h2>
        <span class="temp">${json.main.feels_like}&deg;</span>
        
          
          <div>Min Temp: ${json.main.temp_min}</div>
          <div>Max Temp: ${json.main.temp_max}</div>
          <div>Pressure: ${json.main.pressure}</div>
          <div>Humidity: ${json.main.humidity}</div>
        
          <div>${today.getDate()} ${months[today.getMonth()]} (${
          days[today.getDay()]
        }), ${today.getFullYear()}</div>
          
        `;
      })
      .catch(errorHandler);
  }
  // console.log(code);
  // if (city === "") {
  //   alert("Please Enter a City");
  // }
  else if (event.keyCode === 13 && city === "") {
    alert("Please enter a city");
  }
}

searchCity.addEventListener("keyup", searchWeatherHandler);

// searchBtn.addEventListener("click", searchWeatherHandler);

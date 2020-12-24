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
        <div id="upperContent">
          <h1 class="location"> ${json.name}, ${json.sys.country}  Weather</h1>
          <div class="dateinfo">as of ${today.getDate()} ${
          months[today.getMonth()]
        } (${
          days[today.getDay()]
        }), ${today.getFullYear()} ${hours}:${minutes}:${seconds} hrs</div> 
          <div class="flex-items">
            <div class="inner-flex">
              <span class="temp">${Math.round(json.main.temp)}&deg;</span>
              <span class="weather-icon"><img src="/icons/${
                json.weather[0].icon
              }.png" alt="weather icon" /></span>
            </div>
            <div class="inner-flex">
              <span class="innerText" id="description">${
                json.weather[0].main
              }</span>
              <span class="innerText" id="min-max">${Math.floor(
                json.main.temp_min
              )}&deg; / ${Math.ceil(json.main.temp_max)}&deg;</span>
            </div>
          </div>
        </div>  

        <div id="bottomContent">
          <div class="bottom-first">
            <h2>Weather Today in ${json.name}, ${json.sys.country}</h2>
            
            <div class="flex-items">
            <span class="tempFeel">${Math.round(
              json.main.feels_like
            )}&deg;</span>
            <span>Feels Like</span>
            </div>
          </div>
          <div class="bottom-second">
            <div class="flex-left">
              <hr>
              <div>
                <div class="extra-info">
                  <span><i class="fas fa-temperature-low "></i> High/Low</span> 
                  <span>${json.main.temp_min}&deg;/${
          json.main.temp_max
        }&deg;</span>
                </div>
                <hr>
                <div class="extra-info">
                  <span><i class="fas fa-tint"></i> Humidity</span> 
                  <span>${json.main.humidity}%</span>
                </div>
                <hr>
                <div class="extra-info" id="last">
                  <span><i class="fas fa-arrows-alt-v"></i> Pressure</span> 
                  <span>${json.main.pressure}mb</span>
                </div>
              </div> 
            </div>
            <div class="flex-right">
              
                <hr>
                <div class="extra-info">
                  <span><i class="fas fa-eye"></i> Visibility</span> 
                  <span>${json.visibility}m</span>
                </div>
                <hr>
                <div class="extra-info">
                  <span><i class="fas fa-wind"></i> Wind</span> 
                  <span>${json.wind.speed}m/s</span>
                </div>
                <hr>
                <div class="extra-info" id="last">
                  <span><i class="fas fa-cloud"></i> Clouds</span> 
                  <span>${json.clouds.all}%</span>
                </div>
              
            </div>
          </div>
        </div>
          
          
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

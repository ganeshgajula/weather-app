let searchCity = document.querySelector("#searchCity");
let searchBtn = document.querySelector("#submitBtn");
let weatherInfo = document.querySelector("#weatherDetails");
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
          <div>Temperature: ${json.main.temp}</div>
          <div>Min Temp: ${json.main.temp_min}</div>
          <div>Max Temp: ${json.main.temp_max}</div>
          <div>Feels Like: ${json.main.feels_like}</div>
          <div>Pressure: ${json.main.pressure}</div>
          <div>Humidity: ${json.main.humidity}</div>
          <div>Weather: ${json.weather[0].main}</div>
          <div>Location: ${json.name}</div>
          <div>Country: ${json.sys.country}</div>
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

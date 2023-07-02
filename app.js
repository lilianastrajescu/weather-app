// Date time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dateCurrent = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let day = days[date.getDay()];
  return `<b>${day}</b></br> <small>${dateCurrent} ${month} ${year}</br> ${hours} : ${minutes}</small>`;
}

// Celsius Fahrenheit conversion
function celsiusToFahrenheit(event) {
  event.preventDefault();
  let specificDegree = document.querySelector("#specific-degree");
  let fahrenheitConvert = Math.round((celsiusTemperature * 9) / 5) + 32;
  specificDegree.innerHTML = Math.round(fahrenheitConvert);
}

let conversionToFahrenheit = document.querySelector(".fahrenheit");
conversionToFahrenheit.addEventListener("click", celsiusToFahrenheit);

function fahrenheitToCelsius(event) {
  event.preventDefault();
  let specificDegree = document.querySelector("#specific-degree");
  specificDegree.innerHTML = Math.round(celsiusTemperature);
}

let conversionToCelsius = document.querySelector(".celsius");
conversionToCelsius.addEventListener("click", fahrenheitToCelsius);

let celsiusTemperature = null;

//Forecast section
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".container-2");

  //Concatenate this string with the string above
  let forecastHTML = ` <div class="row forecast">`;
  //loop
  forecast.forEach(function weatherSections(forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col section-right">
                    <button class="text-right">
                        <ul class="day">
                            <li class="days-week">
                               ${formatDay(forecastDay.dt)}
                            </li>
                            <span class="section-right-temperature">
                                <li><img class="images-degree" src="${decodeIcon(
                                  forecastDay.weather[0].icon
                                )}"></li>
                                <li class="degree"><span class="maxim-degree-forecast">${Math.round(
                                  forecastDay.temp.max
                                )}°</span>
                                    <span class="degree-gray">/${Math.round(
                                      forecastDay.temp.min
                                    )}°</span>
                                </li>
                            </span>
                        </ul>
                    </button>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Geo Location/weather
function getForecast(coordinates) {
  let apiKey = "aea06fe0a91132d87cff36a96a5249bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function weather(response) {
  let heading = document.querySelector("#specific-degree");
  heading.innerHTML = Math.round(response.data.main.temp);
  let cityName = document.querySelector(".city");
  cityName.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let dateElement = document.querySelector(".date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconWeather = document.querySelector("#cloud-image");
  iconWeather.setAttribute(
    "src",
    decodeIcon(response.data.weather[0].icon)
    //`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "aea06fe0a91132d87cff36a96a5249bf";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(weather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search");
  search(cityInputElement.value);
}

let form = document.querySelector(".search-container");
form.addEventListener("submit", handleSubmit);

search("Calgary");

//My position

function currentPosition() {
  navigator.geolocation.getCurrentPosition(myPosition);
}

function myPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "aea06fe0a91132d87cff36a96a5249bf";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(weather);
}

let button = document.querySelector(".button-position");
function loc(request) {
  request.preventDefault();
  navigator.geolocation.getCurrentPosition(myPosition);
}
button.addEventListener("click", loc);


function decodeIcon(iconName) {
  let iconUrl;
  switch (iconName) {
    case "01d":
      iconUrl = "images/icons-weather/01d.png";
      break;
    case "01n":
      iconUrl = "images/icons-weather/01n.png";
      break;
    case "02d":
      iconUrl = "images/icons-weather/02d.png";
      break;
    case "02n":
      iconUrl = "images/icons-weather/02n.png";
      break;
    case "03d":
      iconUrl = "images/icons-weather/03d.png";
      break;
    case "03n":
      iconUrl = "images/icons-weather/03n.png";
      break;
    case "04d":
      iconUrl = "images/icons-weather/04d.png";
      break;
    case "04n":
      iconUrl = "images/icons-weather/04n.png";
      break;
    case "09d":
      iconUrl = "images/icons-weather/09d.png";
      break;
    case "09n":
      iconUrl = "images/icons-weather/09n.png";
      break;
    case "10d":
      iconUrl = "images/icons-weather/10d.png";
      break;
    case "10n":
      iconUrl = "images/icons-weather/10n.png";
      break;
    case "11d":
      iconUrl = "images/icons-weather/11d.png";
      break;
    case "11n":
      iconUrl = "images/icons-weather/11n.png";
      break;
    case "13d":
      iconUrl = "images/icons-weather/13d.png";
      break;
    case "13n":
      iconUrl = "images/icons-weather/13n.png";
      break;
    case "50d":
      iconUrl = "images/icons-weather/50d.png";
      break;
    case "50n":
      iconUrl = "images/icons-weather/50n.png";
      break;
    default:
      break;
  }
  return iconUrl;
}

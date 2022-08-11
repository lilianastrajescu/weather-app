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

//Geo Location/weather

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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

function search(city) {
  let apiKey = "3d6bcb1e707f4511e0a24749086c8223";
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

//Forecast section

function displayForecast() {
  let forecastElement = document.querySelector(".container-2");

  //Concatenate this string with the string above
  let forecastHTML = ` <div class="row forecast">`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //loop
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col section-right">
                    <button class="text-right">
                        <ul class="day">
                            <li class="days-week">
                               ${day}
                            </li>
                            <span class="section-right-temperature">
                                <li><img class="images-degree" src="images/sun.png"></li>
                                <li class="degree"><span class="maxim-degree-forecast">30°</span>
                                    <span class="degree-gray">/25°</span>
                                </li>
                            </span>
                        </ul>
                    </button>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

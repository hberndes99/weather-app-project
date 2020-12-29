//city name



//city current temperature

function displayCurrentTemperature(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    let currentTemperatureDisplay = document.querySelector("#current-temperature");
    currentTemperatureDisplay.innerHTML = `${currentTemperature} °C`;
    let cityName = response.data.name;
    console.log(cityName)
    let cityOutput = document.querySelector("h1");
    cityOutput.innerHTML = cityName;

}

function getCurrentTemperature(cityName) {
    cityName.preventDefault();
    let cityInput = document.querySelector("#inputCity").value.trim();
    let apiKey = "4934aa3a2a7bd013332e7d59c0e551f4";
    let units = `metric`
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(displayCurrentTemperature);
}

let cityInputForm = document.querySelector("#city-input-form");
cityInputForm.addEventListener("submit", getCurrentTemperature);

//get current location and temperature

function getCurrentLocationTemperature(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    let currentLocation = (response.data.name);
    let currentTemperatureDisplay = document.querySelector("#current-temperature");
    currentTemperatureDisplay.innerHTML = `${currentTemperature} °C`
    let cityOutput = document.querySelector("h1");
    cityOutput.innerHTML = currentLocation;
    
}

function getCoordinates(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "4934aa3a2a7bd013332e7d59c0e551f4";
    let units = `metric`
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(getCurrentLocationTemperature);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCoordinates)
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation)


//day and time

function getCurrentTime(now) {
  let currentMinute = now.getMinutes();
  let currentHour = now.getHours();

  let currentTimeSection = document.querySelector("#current-time");
  if (currentHour < 10) {
    currentTimeSection.innerHTML = `0${currentHour}:${currentMinute}`;
  }
  if (currentMinute < 10) {
    currentTimeSection.innerHTML = `${currentHour}:0${currentMinute}`;
  } else {
    currentTimeSection.innerHTML = `${currentHour}:${currentMinute}`;
  }
}

function getCurrentDay(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = now.getDay();
  let currentDay = days[day];
  let currentDaySection = document.querySelector("#name-of-day");
  currentDaySection.innerHTML = `${currentDay}`;
}

let now = new Date();
function getCurrentDayAndTime() {
  getCurrentTime(now);
  getCurrentDay(now);
}

cityInputForm.addEventListener("submit", getCurrentDayAndTime);

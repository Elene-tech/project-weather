function formatDate() {
  let now = new Date();
  let date = now.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
  ];
  let month = months[now.getMonth()];
  let thisDate = `${month} ${date}`;
  return thisDate;
}

const currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${formatDate()}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${searchInput.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function formatTime() {
  let today = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let thisTime = `${today}`;
  return thisTime;
}

const currentTimeDay = document.querySelector("#current-time");
currentTimeDay.innerHTML = `${formatTime()}`;
let apiKey = "f4717a93880ad531595d505e3579e813";
function showTemperature() {
  let currentCity = document.querySelector("#search-text-input").value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=f4717a93880ad531595d505e3579e813&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then((response) => {
    if (response.hasOwnProperty("data")) {
      let temperature = Math.round(response.data.main.temp);
      let temperatureElement = document.querySelector("#temperature-celcius");
      let temperatureElement2 = document.querySelector("#temp-high-degrees");
      temperatureElement2.innerHTML = `${temperature}`;
      temperatureElement.innerHTML = `${temperature}`;
    }
  });
}

function showLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then((response) => {
      if (response.hasOwnProperty("data")) {
        let currentCityName = response.data.name;
        let cityElement = document.querySelector("#current-city");
        cityElement.innerHTML = currentCityName;

        let temperature = Math.round(response.data.main.temp);
        let temperatureElement = document.querySelector("#temperature-celcius");
        let temperatureElement2 = document.querySelector("#temp-high-degrees");
        temperatureElement2.innerHTML = `${temperature}`;
        temperatureElement.innerHTML = `${temperature}`;
      }
    });
  });
}

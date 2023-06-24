/* Llamo la api */
const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/"
};

/* Señalo la barra de busqueda yagrego el evento de busqueda */
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);


function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let ciudad = document.querySelector(".location .fecha");
  ciudad.innerText = `${weather.name}, ${weather.sys.contry}`;

  let now = new Date();
  let date = document.querySelector(".location .fecha");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".actual .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}
                      <span>°C</span>`;
  let weather_el = document.querySelector(".actual .clima");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".alto-bajo");
  hilow.innerText = `${weather.main.temp_min} °C / ${weather.main.temp_max} °C`;
}

function dateBuilder(d) {
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
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
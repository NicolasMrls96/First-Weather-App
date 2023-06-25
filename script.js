/* Llamo la api */
const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/"
};

/* Señalo la barra de busqueda yagrego el evento de busqueda */
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);


function setQuery(evt) {
  if (evt.key === "Enter") {
    getResults(searchBox.value);
  }
}

/* Realizamos la solicitud Fetch */
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

/* Tomamos los datos del clima y los actualizamos en el HTML */
function displayResults(weather) {
  console.log(weather);
  let ciudad = document.querySelector(".location .ciudad");
  ciudad.innerText = `${weather.name}, ${weather.sys.country}`;

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

/* Defino el objeto de traducción de los estados del clima */
const weatherTranslations = {
  Clear: "Despejado",
  Clouds: "Nublado",
  Rain: "Lluvia",
  Thunderstorm: "Tormenta",
  Snow: "Nieve",
  Mist: "Niebla"
};

function displayResults(weather) {
  console.log(weather);
  let ciudad = document.querySelector(".location .ciudad");
  ciudad.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .fecha");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".actual .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector(".actual .clima");
  weather_el.innerText = translateWeather(weather.weather[0].main); // Traducción del clima

  let hilow = document.querySelector(".alto-bajo");
  hilow.innerText = `${weather.main.temp_min} °C / ${weather.main.temp_max} °C`;
}

function translateWeather(weather) {

  /* Verificar si existe una traducción para el clima actual */
  if (weatherTranslations.hasOwnProperty(weather)) {
    return weatherTranslations[weather];
  }

  /* Si no hay una traducción disponible, retornar el valor original */
  return weather;
}

/* Construccion de formato de fecha */
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
"use strict";

const weatherBlock = document.querySelector("#weather");

async function loadWeather(e) {
  weatherBlock.innerHTML = `
  <div class="weatherLoading">
  <img src="img/loading.gif" alt="Loading...">
  </div>`;

  const server =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Odesa&lang=ua&appid=59bbf8b127928897d5ae515391891b44";
  const response = await fetch(server, {
    method: "GET",
  });
  const res = await response.json();

  if (response.ok) {
    getWeather(res);
  } else {
    weatherBlock.innerHTML = res.message;
  }
}

function getWeather(data) {
  console.log(data);

  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const template = ` 
<div class="weatherHeader">
<div class="weatherMain">
  <div class="weatherCity">Погода в місті: ${location}</div>
  <div class="weatherStatus">${weatherStatus}</div>
</div>
<div class="weatherIcon">
  <img
    src="http://openweathermap.org/img/wn/${weatherIcon}.png"
    alt="${weatherStatus}"
  />
</div>
</div>
<div class="weatherTemp">${temp}</div>
<div class="weatherFeelsLike">Відчувається як ${feelsLike}</div>`;

  weatherBlock.innerHTML = template;
}

if (weatherBlock) {
  loadWeather();
}

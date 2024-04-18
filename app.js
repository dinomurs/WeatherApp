"use strict";

// DOM ELEMENTS
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const weatherType = document.querySelector("#weatherType");
const weatherDegree = document.querySelector("#weatherDegree");
const weatherCity = document.querySelector("#weatherCity");
const weatherCountry = document.querySelector("#weatherCountry");
const weatherImage = document.querySelector("#weatherImage");
const apiKey = "9c3a339d40df44719b8132259241704";

/*

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const search = searchInput.value.trim();
  if (search !== "") {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${search}`,
      { mode: "cors" }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        weatherCity.textContent = response.location.name;
        weatherType.textContent = response.current.condition.text;
        weatherDegree.textContent = response.current.temp_c;
        weatherCountry.textContent = response.location.country;
      })
      .catch(function (error) {
        weatherCity.textContent = `${search} does not exist! Please try a valid city name`;
        weatherType.textContent = "";
        weatherDegree.textContent = "";
        weatherCountry.textContent = "";
      });
  }
});

*/

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const search = searchInput.value;
  if (search !== "") {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${search}`,
        { mode: "cors" }
      );
      const data = await response.json();
      if (response.ok) {
        updateWeatherData(data);
      } else {
        handleError(`${search} does not exist. Try again.`);
      }
    } catch (error) {
      handleError("An error occurred. Please try again later.");
    }
  }
});

function updateWeatherData(data) {
  weatherCity.textContent = data.location.name;
  weatherType.textContent = data.current.condition.text;
  weatherDegree.textContent = data.current.temp_c;
  weatherCountry.textContent = data.location.country;
  weatherImage.classList.remove("hide");

  //   /*
  let type = data.current.condition.text;
  if (type === "Clear") {
    weatherImage.src = "images/sunny.svg";
  } else if (type === "Partly cloudy" || type === "Cloudy") {
    weatherImage.src = "images/cloudy.svg";
  } else if (
    weatherType === "Rain" ||
    weatherType === "Drizzle" ||
    weatherType === "Thunderstorms" ||
    weatherType === "Snow" ||
    weatherType === "Fog" ||
    weatherType === "Mist"
  ) {
    weatherImage.src = "images/drizzle.svg";
  } else if (
    weatherType === "Windy" ||
    weatherType === "Tornado" ||
    weatherType === "Hurricane"
  ) {
    weatherImage.src = "images/thunderstorms.svg";
  }
  //   */
}

function handleError(message) {
  weatherCity.textContent = message;
  weatherType.textContent = "";
  weatherDegree.textContent = "";
  weatherCountry.textContent = "";
  weatherImage.classList.add("hide");
}

const url = "https://api.openweathermap.org/data/2.5/";
const apikey = "c5eab4cb159224e46e9b1675b6dd41bc";
const input = document.querySelector("#input");
const title = document.querySelector("h2");
const wather_dec = document.querySelector("#wather_dec");
const humidy = document.querySelector("#humidy");
const wind = document.querySelector("#wind");
const image = document.querySelector("img");

const setQuery = (e) => {
  if (e.keyCode == 13) {
    getResult(input.value);
  }
};

const getResult = (inputValue) => {
  fetch(`${url}weather?q=${inputValue}&appid=${apikey}&units=metric&lang=az`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => displayResult(data))
    .catch((err) => console.error("Error fetching data:", err));
};

const displayResult = (data) => {
  console.log(data);
  title.innerHTML = data.name;
  wather_dec.innerHTML = `${Math.round(data.main.temp)}°C`;
  humidy.innerHTML = `<i class="fa-solid fa-water"></i> ${data.main.humidity}%`;
  wind.innerHTML = `<i class="fa-solid fa-wind"></i> ${data.wind.speed} m/s`;

  const weatherMain = data.weather[0].main.toLowerCase();
  if (weatherMain.includes("cloud")) {
    image.src = "./images/cloud.png";
  } else if (weatherMain.includes("rain")) {
    image.src = "./images/rain.png";
  } else if (weatherMain.includes("snow")) {
    image.src = "./images/snow.png";
  } else if (weatherMain.includes("clear")) {
    image.src = "./images/clear.png";
  } else if (weatherMain.includes("mist")) {
    image.src = "./images/mist.png";
  } else {
    image.src = "./images/default.png";
  }

  input.value = "";
};

input.addEventListener("keypress", setQuery);

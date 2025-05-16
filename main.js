const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode === 13) {
    getForecast(searchbox.value);
  }
}

function getForecast(query) {
  fetch(`${api.base}forecast?q=${query}&units=metric&appid=${api.key}`)
    .then(response => response.json())
    .then(displayForecast)
    .catch(error => console.error('Error fetching forecast data:', error));
}

function displayForecast(data) {
  if (!data || !data.city) {
    console.error('Invalid data received:', data);
    return;
  }

 
  const city = document.querySelector('.location .city');
  city.innerText = `${data.city.name}, ${data.city.country}`;

 
  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  
  const today = now.toISOString().split('T')[0];
  const todayForecasts = data.list.filter(item => item.dt_txt.startsWith(today));

  if (todayForecasts.length === 0) {
    console.error('No forecast data available for today.');
    return;
  }

 
  const temps = todayForecasts.map(item => item.main.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  
  const temp = document.querySelector('.current .temp');
  const currentTemp = todayForecasts[0].main.temp; 
  temp.innerHTML = `${Math.round(currentTemp)}<span>°c</span>`;

  
  const weather_el = document.querySelector('.current .weather');
  weather_el.innerText = todayForecasts[0].weather[0].main;

  
  const hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(minTemp)}°c / ${Math.round(maxTemp)}°c`;
}

function dateBuilder(d) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

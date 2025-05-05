
document.addEventListener('DOMContentLoaded', loadFavorites);

function weatherInfo() {
  const city1 = document.getElementById('city1').value;
  const city2 = document.getElementById('city2').value;
  const weatherContainer = document.getElementById('weatherContainer');
  weatherContainer.innerHTML = '';

  if (city1) fetchWeather(city1);
  if (city2) fetchWeather(city2);
}

function fetchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1cde13fa70d4e39f70fb61c72a41a72f&units=metric`)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(data => displayWeather(data))
    .catch(err => alert(err.message));
}

function displayWeather(data) {
  const container = document.getElementById('weatherContainer');
  const card = document.createElement('div');
  card.className = 'col-md-6 mb-4';

  card.innerHTML = `
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">🌡 Temp: ${data.main.temp} °C</p>
        <p class="card-text">💧 Humidity: ${data.main.humidity}%</p>
        <p class="card-text">🌤 Condition: ${data.weather[0].main}</p>
        <button class="btn btn-outline-success btn-sm" onclick="saveCity('${data.name}')">Add to favourites</button>
      </div>
    </div>
  `;

  container.appendChild(card);
}

function saveCity(city) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
  }
}

function loadFavorites() {
  const favoritesDiv = document.getElementById('favorites');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favoritesDiv.innerHTML = '';
  favorites.forEach(city => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-sm btn-outline-primary';
    btn.innerText = city;
    btn.onclick = () => {
      document.getElementById('city1').value = city;
      document.getElementById('city2').value = '';
      weatherInfo();
    };
    favoritesDiv.appendChild(btn);
  });
}

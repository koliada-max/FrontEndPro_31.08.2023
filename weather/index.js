function getWeather() {
  const apiKey = '5d066958a60d315387d9492393935c19';
  const cityInput = document.getElementById('cityInput');
  const city = cityInput.value;

  if (!city) {
    alert('Будь ласка, введіть назву міста.');
    return;
  }

  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Місто не знайдено. Перевірте правильність введення.');
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById('city').textContent = data.name;
      document.getElementById('temperature').textContent = data.main.temp;
      document.getElementById('pressure').textContent = data.main.pressure;
      document.getElementById('description').textContent =
        data.weather[0].description;
      document.getElementById('humidity').textContent = data.main.humidity;
      document.getElementById('wind-speed').textContent = data.wind.speed;
      document.getElementById('wind-deg').textContent = data.wind.deg;

      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
      document.getElementById('weather-icon').src = iconUrl;

      document.getElementById('input-section').style.display = 'none';
      document.getElementById('output-section').style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching weather data:', error.message);
      alert(error.message);
  });
}

function resetWeather() {
  document.getElementById('input-section').style.display = 'block';
  document.getElementById('output-section').style.display = 'none';

  document.getElementById('cityInput').value = '';
}

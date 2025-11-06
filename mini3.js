async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const result = document.getElementById("result");

  if (city === "") {
    result.innerHTML = "Please enter a city name.";
    return;
  }

  try {
    const weatherResponse = await fetch(`https://wttr.in/${city}?format=j1`);
    if (!weatherResponse.ok) throw new Error("Failed to fetch weather");

    const data = await weatherResponse.json();
    const weather = data.current_condition[0];
    const condition = weather.weatherDesc[0].value;

    result.innerHTML = `
      <h3>${city}</h3>
      <p>🌡️ Temperature: ${weather.temp_C}°C</p>
      <p>💨 Wind Speed: ${weather.windspeedKmph} km/h</p>
      <p>🌧️ Condition: ${condition}</p>
    `;
  } catch (error) {
    console.error(error);
    result.innerHTML = "⚠️ Could not fetch weather data. Please try again.";
  }
}
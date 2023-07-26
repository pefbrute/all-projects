document.getElementById("weather-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("city").value;
    getWeather(city);
});

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
    }
    return await response.json();
}

async function getWeather(city) {
    try {
        const apiKey = "135cec68d23a6c3514f39f856eb4a48f";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;
        const data = await fetchData(url);
        displayWeather(data);
        getForecast(city);
    } catch (error) {
        console.error(error);
        alert("Не удалось получить информацию о погоде. Проверьте правильность введенного города.");
    }
}


async function displayWeather(data) {
    const weatherResult = document.getElementById("weather-result");
    const { name, sys, weather, main, wind, coord } = data;
    const localTime = await getLocalTime(coord.lat, coord.lon);
    const weatherInfo = `
        <h2>Погода в ${name}, ${sys.country}:</h2>
        <p>Текущее время: ${localTime}</p>
        <p>Описание: ${weather[0].description}</p>
        <p>Температура: ${main.temp}°C</p>
        <p>Ощущается как: ${main.feels_like}°C</p>
        <p>Влажность: ${main.humidity}%</p>
        <p>Скорость ветра: ${wind.speed} м/с</p>
    `;
    weatherResult.innerHTML = weatherInfo;
}

async function getLocalTime(lat, lon) {
    try {
        const apiKey = "D2LIHHH1EL3L";
        const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
        const data = await fetchData(url);
        const localTime = new Date(data.timestamp * 1000);
        const hours = localTime.getUTCHours();
        const minutes = localTime.getUTCMinutes();
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } catch (error) {
        console.error(error);
        return "Не удалось получить время";
    }
}


async function getForecast(city) {
    try {
        const apiKey = "135cec68d23a6c3514f39f856eb4a48f";
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=ru`;
        const data = await fetchData(url);
        displayForecast(data);
    } catch (error) {
        console.error(error);
        alert("Не удалось получить прогноз погоды. Проверьте правильность введенного города.");
    }
}

function displayForecast(data) {
    const forecastResult = document.getElementById("forecast-result");
    console.log(data.list)
    const dailyData = data.list.filter((item) => item.dt_txt.endsWith("12:00:00"));

    let forecastInfo = "<h2>Прогноз погоды на 4 дня:</h2>";
    for (let i = 0; i < 4; i++) {
        const day = dailyData[i];
        forecastInfo += `
            <div class="forecast-day">
                <h3>${day.dt_txt.split(" ")[0]}</h3>
                <p>Описание: ${day.weather[0].description}</p>
                <p>Температура: ${day.main.temp}°C</p>
                <p>Ощущается как: ${day.main.feels_like}°C</p>
                <p>Влажность: ${day.main.humidity}%</p>
                <p>Скорость ветра: ${day.wind.speed} м/с</p>
            </div>
        `;
    }
    forecastResult.innerHTML = forecastInfo;
}


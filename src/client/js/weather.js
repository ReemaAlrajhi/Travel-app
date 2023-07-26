const { DateTime } = require("luxon");

const displayWeather = async (duration, res) => {
    // Posting weather
    if (duration >= 7 && duration <= 16) {
        document.getElementById('forecast-title').textContent = 'Forecast';
        const icon = document.getElementById('current-icon');
        icon.setAttribute('src', `https://www.weatherbit.io/static/img/icons/${res[0].data[0].weather.icon}.png`);
        icon.setAttribute('alt', `${res[0].data[0].weather.description} icon`);
        document.getElementById('current-temp').textContent = `${res[0].data[0].temp}°C`;
        document.getElementById('description').textContent = `${res[0].data[0].weather.description}`;

        // Get forecast with a loop
        let days = '';
        for (let i = 0; i < duration; i++) {
            // Formatting date for forecast
            const date = res[0].data[i].datetime;
            const dateFormatted = DateTime.fromISO(date).toLocaleString({ month: 'short', day: 'numeric' });

            // Adding days along with min and max temperatures
            days += `<div class="day"><ul><li>${dateFormatted}</li>
                    <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${res[0].data[i].weather.icon}.png">
                    <li class="max-temp">${res[0].data[i].max_temp}°</li>
                    <li class="min-temp">${res[0].data[i].min_temp}°</li></ul></div>`;
            document.getElementById('forecast-weather').innerHTML = days;
        }
        return true;
    }
    else if (duration > 0 && duration < 7) {
        const icon = document.getElementById('current-icon');
        icon.setAttribute('src', `https://www.weatherbit.io/static/img/icons/${res[0].data[0].weather.icon}.png`);
        icon.setAttribute('alt', `${res[0].data[0].weather.description} icon`);
        document.getElementById('current-temp').textContent = `${res[0].data[0].temp}°C`;
        document.getElementById('description').textContent = `${res[0].data[0].weather.description}`;
        return true;
    }
    else {
        alert('Please enter a valid duration: 1 day min, 16 days max. Thank you :)');
        return false;
    }
}

export { displayWeather }
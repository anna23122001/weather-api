'use strict'

const cityName = document.getElementById('city-name');
const cityId = document.getElementById('city-id');
const getWeatherButton = document.getElementById('okButton')
const temperatureElement = document.getElementById('temperature')
const windSpeedElement = document.getElementById('wind- speed')
const humidityElement = document.getElementById('humidity')

getWeatherButton.addEventListener('click', showWeather);

function showWeather(){
    let param = {};
if(cityName.disabled){
    const idValue = parseInt(cityId.value);
    if(isNaN(idValue)){
        alert('ID is not correct')
        return;
    }
    param = {
        url:'https://api.openweathermap.org/data/2.5/',
        appid:'13a4686bc3d311361ff83aa41e62acdf',
        cityId: idValue,
    }
} else{
    const nameValue = cityName.value;
    if(cityName.value === ''){
        alert('Enter the name of the city');
        return;
    }
    param = {
        url:'https://api.openweathermap.org/data/2.5/',
        appid:'13a4686bc3d311361ff83aa41e62acdf',
        cityName: cityName.value,
    };
}

fetch(
        `${param.url}weather?q=${param.cityName || param.cityId}&units=metric&APPID=${param.appid}`
    )
.then((weather) => {
    return weather.json();
}).then((data) => {
    const temperature = data.main.temp;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
      temperatureElement.textContent = `${temperature} K`;
      windSpeedElement.textContent = `${windSpeed} m/s`;
      humidityElement.textContent = `${humidity}%`;
    })
    .catch(error => {
      console.log('Error:', error);
    });
}


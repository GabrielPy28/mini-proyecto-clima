const a = document.querySelector('.weather-app');
const t = document.querySelector('.temp');
const dateOutput = document.querySelector('.data');
const timeOutput = document.querySelector('.time');
const condition = document.querySelector('.condition') ;
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloud = document.querySelector('.cloud');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = 'London';

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;

        fetchWeatherData();

        a.style.opacity = '0';
    });
});

form.addEventListener('submit', (e) => {
    if(search.value.length == 0){
        alert('Escriba el Nombre de una Ciudad');
    }else {
        cityInput = search.value;

        fetchWeatherData();

        search.value = "";
        a.style.opacity = "0";
    }

    e.preventDefault();
});

function fetchWeatherData() {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=ddd3a478ef9047818e252457221504&q=${cityInput}`)

    .then(response => response.json())
    .then(data => {
        console.log(data);

        t.innerHTML = data.current.temp_c + "&#176;";
        condition.innerHTML = data.current.condition.text;

        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);

        dateOutput.innerHTML = `${d}, ${m} ${y}`;
        timeOutput.innerHTML = time;

        nameOutput.innerHTML = data.location.name;

        const iconId = data.current.condition.icon.substr(
            "//cdn.weatherapi.com/weather/64x64/".length);

        icon.src = "./icons/" + iconId;

        cloud.innerHTML = data.current.cloud + "%";
        humidity.innerHTML = data.current.humidity + "%";
        wind.innerHTML = data.current.wind_kph + "km/h";

        let timeofDay = "day";
        const code = data.current.condition.code;

        if(data.current.is_day) {
            timeofDay = "night";
        }
        if(code == 1000) {
            a.style.backgroundImage = `url(./images/${timeofDay}/clear.jpg)`;
            btn.style.background = "#e5ba92";
            if(timeofDay == "night") {
                btn.style.background = "#181e27";
            }
        }
        else if(
            code == 1003 || 
            code == 1006 || 
            code == 1009 || 
            code == 1030 || 
            code == 1003 || 
            code == 1069 || 
            code == 1087 || 
            code == 1135 || 
            code == 1273|| 
            code == 1276 || 
            code == 1279 || 
            code == 1282 
        ){
            a.style.backgroundImage = `url(
                ./images/${timeofDay}/cloudy.jpg
            )`;
            btn.style.background = "#fa6d1b"
        }
        else if(
            code == 1063 || 
            code == 1069 || 
            code == 1072 || 
            code == 1150 || 
            code == 1153 || 
            code == 1180 || 
            code == 1183 || 
            code == 1186 || 
            code == 1189 || 
            code == 1192 || 
            code == 1195 || 
            code == 1204 || 
            code == 1207 || 
            code == 1240 || 
            code == 1243 || 
            code == 1246 || 
            code == 1249 || 
            code == 1252 
        ){
            a.style.backgroundImage = `url(
                ./images/${timeofDay}/rainy.jpg
            )`;
            btn.style.background = "#647d75";
            if(timeofDay == 'night'){
                btn.style.background = "325c80";
            }
        }else {
            a.style.backgroundImage = `url(
                ./images/${timeofDay}/snowy.jpg
            )`;
            btn.style.background = "#4d72aa";
            if (timeofDay == 'night') {
                btn.style.background = "#1b1b1b";
            }
        }

        a.style.opacity = "1";
    })

    .catch(() => {
        alert('Ciudad No Encontrada, Por Favor Intente Nuevamente');
        a.style.opacity = "1";
    });
}

fetchWeatherData();

a.style.opacity = "1";
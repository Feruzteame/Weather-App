import {getWeatherData} from "./weather.js";

const config = {
    type: 'bar',
    data: {},
    options: {}
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

const submit = document.getElementById("submit")
submit.addEventListener('click', function() {
  getWeatherData(config, myChart)
})  
// window.onload(functiont, getWeatherData)
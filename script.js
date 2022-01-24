import {apiKey} from "./config.js";
const key = apiKey.key;

function getData() {
    let Weather = {
        //apiKey: "808e0c9b54f6aacec3566d6e9ff35b3d",
        getCity : document.getElementById("city").value,
        fetchFunction : function weatherFunction() {
            fetch('https://api.openweathermap.org/data/2.5/weather?q='+ this.getCity + '&appid=' + key)
                .then(response => response.json())
                .then(data => {
                    const weatherDiv = document.getElementById("weather")
                    const main = data.main
                    const tempMin = main.temp_min
                    const tempMax = main.temp_max 
                    const weatherMain = data.weather[0].main 
                    const description = data.weather[0].description 
                    const wind = data.wind
                    const windSpeed = wind.speed
                    
                    const p1 = document.createElement("p")
                    const p2 = document.createElement("p")
                    const p3 = document.createElement("p")
                    const p4 = document.createElement("p")

                    p1.innerText = weatherMain
                    p2.innerText =  description
                    p3.innerText = tempMin ,tempMax
                    p4.innerText = windSpeed

                    weatherDiv.appendChild(p1)
                    weatherDiv.appendChild(p2)
                    weatherDiv.appendChild(p3)
                    weatherDiv.appendChild(p4)

                    console.log(main)});
        }, 
    }
    Weather.fetchFunction()
}


const submit = document.getElementById("submit")
submit.addEventListener('click', getData)



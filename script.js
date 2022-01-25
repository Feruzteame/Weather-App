// let array =[]
// let array1 = []
// let array2 = []
// let array3 = []
// let array4 = []
// let array5 = []
function selectTime() {

    const t = new Date();
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    const hours = ('0' + t.getHours()).slice(-2);
    const minutes = ('0' + t.getMinutes()).slice(-2);
    const seconds = ('0' + t.getSeconds()).slice(-2);
    const time = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    console.log(time)    
        return time;
                     
}

import {apiKey} from "./config.js";
const key = apiKey.key;
function getData() {
    let Weather = {
        //apiKey: "808e0c9b54f6aacec3566d6e9ff35b3d",
        getCity : document.getElementById("city").value,
        fetchFunction : function weatherFunction() {
            
            fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + this.getCity + '&appid='+ key)
                .then(response => response.json())
                .then(data => {

                    let listDate = data.list
                   
                    const returnTime = selectTime();
                    for(let i=0; i<listDate.length; i++){
                        let date = listDate[i]
                        let day = date.dt_txt
                        let main = listDate[i].main
                        let temp = main.temp
                        console.log()
                        
                       
                    }
                    console.log(data)
                });
        }
    }
    Weather.fetchFunction()
}


const submit = document.getElementById("submit")
submit.addEventListener('click', getData)









// let weatherDiv = document.getElementById("weather")
                    // let main = data.main
                    // let tempMin = main.temp_min
                    // let tempMax = main.temp_max 
                    // let weatherMain = data.weather[0].main 
                    // let description = data.weather[0].description 
                    // let wind = data.wind
                    // let windSpeed = wind.speed

                    // const p1 = document.createElement("img")
                    // const p2 = document.createElement("p")
                    // const p3 = document.createElement("p")
                    // const p4 = document.createElement("p")

                    // switch(weatherMain) {
                    //     case weatherMain = "Sunny":
                    //         p1.src = "https://img.icons8.com/color/48/000000/sun--v2.png"
                    //       break;
                    //     case weatherMain ="Cloudy":
                    //         p1.src = "https://img.icons8.com/fluency/48/000000/cloud.png"
                    //       break;
                    //       case weatherMain = "Windy":
                    //         p1.src = "https://img.icons8.com/external-prettycons-solid-prettycons/60/000000/external-windy-weather-prettycons-solid-prettycons-1.png"
                    //       break;
                    //     case weatherMain = "Rainy":
                    //         p1.src = "https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/000000/external-rain-jungle-vitaliy-gorbachev-blue-vitaly-gorbachev.png"
                    //         break;
                    //     case weatherMain ="Snow":
                    //         p1.src = "https://img.icons8.com/dotty/80/000000/snow.png"
                    //         break;
                    //     case weatherMain ="Stormy":
                    //         p1.src = "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-storm-weather-justicon-lineal-color-justicon.png"
                    //         break;
                    //     case weatherMain ="Fog":
                    //         p1.src = "https://img.icons8.com/officel/16/000000/fog-night.png"
                    //         break;
                    //     case weatherMain ="Tornadoes":
                    //         p1.src = "https://img.icons8.com/ios-filled/48/000000/tornado.png"
                    //         break;
                    //     default:
                    //         p1.src = "https://img.icons8.com/color/48/000000/sun--v2.png"
                    //   }
                    // p2.innerText =  description
                    // p3.innerText = `Temperature : max${tempMin} min${tempMax}`
                    // p4.innerText = "Wind Speed :" + windSpeed

                    // weatherDiv.appendChild(p1)
                    // weatherDiv.appendChild(p2)
                    // weatherDiv.appendChild(p3)
                    // weatherDiv.appendChild(p4)

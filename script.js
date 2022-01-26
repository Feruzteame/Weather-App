
import {Data} from "./config.js";
const key = Data.key;
const weatherBox = document.getElementById('wheater');
//collect date



let arrayOfTemp = []

let arrayOfTemp1 = [] 

function findAv() {
    const totalTemp = arrayOfTemp.reduce((a, b) => a + b, 0)
     let arrLength = arrayOfTemp.length
     const avTemp = totalTemp/arrLength
     console.log(arrayOfTemp, avTemp)
     return avTemp
  }


function getData() {
    let Weather = {
        getCity : document.getElementById("city").value,
        fetchFunction : function weatherFunction() {
            
            fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + this.getCity + '&units=metric' + '&appid='+ key)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    let listData = data.list
        
                    // loop all
                    for(let i=0; i<listData.length; i++){
                        let date = listData[i]
                        let dayOb = date.dt_txt
                        let main = listData[i].main
                        let temp = main.temp
                        // change date to time
                        var dateObject = new Date(dayOb)
                        var day = new Date();
                        let date1 = day.getDate()
                        let date2 = dateObject.getDate()
                       let tomorrow = day.setDate(new Date().getDate()+1);
                        
                        if(date1 === date2){
                            console.log("yes")
                            arrayOfTemp.push(temp)
                        }else{
                            // date1 = day.setDate(new Date(date2))
                            // if(date1 === tomorrow){
                            //     arrayOfTemp1.push(temp)
                            //     console.log(arrayOfTemp1.length, arrayOfTemp1)
                            //     console.log(date1)
                            // }else{
                            //     console.log("no")
                            // }
                            
                        }
                        
                        


                       
                       }
                       
                       findAv()
                      
                });
                
               
                //console.log(arrayOfTemp)
               
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

               
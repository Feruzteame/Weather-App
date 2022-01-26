
// import {Config} from "./config.js";
// const key = Config.key;

// const weatherBox = document.getElementById('wheater');


// let arrayOfTemp = []
// let arrayOfTemp1 = []

// function getAverage() {
//     const totalTemp = arrayOfTemp.reduce((a, b) => a + b, 0)
//      let arrLength = arrayOfTemp.length
//      const avTemp = totalTemp/arrLength
//      console.log(arrayOfTemp, avTemp)
//      return avTemp
//   }


// function getWeatherData() {
//     let Weather = {
//         getCity : document.getElementById("city").value,
//         fetchFunction : function weatherFunction() {
            
//             fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + this.getCity + '&units=metric' + '&appid='+ key)
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log(data)
//                     let listData = data.list
        
//                     // loop all
//                     for(let i=0; i<listData.length; i++){
//                         let rowData = listData[i]
//                         let main = listData[i].main
//                         let temp = main.temp
                        
//                         // create  date obj
//                         var dateObject = new Date();
                        
//                         // current date of today
//                         let firstDate = dateObject.getDate()
//                         let nextDate = dateObject.setDate(firstDate+1);

                        
//                         // change string -> date object
//                         let record_dt_txt= rowData.dt_txt
//                         var recordDateObject = new Date(record_dt_txt)
//                         let recordDate = recordDateObject.getDate()
                        
//                          if(firstDate === recordDate){
//                             arrayOfTemp.push(temp)
//                         } else{
//                             recordDate = dateObject.setDate(new Date(recordDate))
//                             if(nextDate === recordDate){
//                                     arrayOfTemp1.push(temp)
//                                     console.log(arrayOfTemp1.length, arrayOfTemp1, record_dt_txt)
//                                     nextDate = dateObject.setDate(firstDate+1)
//                             }else {
//                                 console.log("no no")
//                             }
//                         }
//                           }
//                        getAverage()
//                      });
//                 }
//             }
//     Weather.fetchFunction()
//   }

// const submit = document.getElementById("submit")
// submit.addEventListener('click', getWeatherData)


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

import {Config} from "./config.js";
const key = Config.key;

const getWeatherData = function() {
    let Weather = {
        
        getCity : document.getElementById("city").value,
        days_record : [],
    
        fetchData : function fetchData() {
            fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + this.getCity + '&units=metric' + '&appid='+ key)
            .then(response => response.json())
            .then(data => {
                let listData = data.list
                this.dayData(listData)
            })
        },

        dayData : function dayData(listData) {
            let firstDay = new Date()
            let day_record = []

            this.separateDailyRecord(listData, firstDay, day_record)
            console.log(this.days_record);
            

        },

        separateDailyRecord : function separateDailyRecord(listData,firstDay, day_record) {
            listData.forEach(rowData => {
                const recordDate = new Date(rowData.dt_txt).getDate()
        
                if (firstDay.getDate() === recordDate) {
                    day_record.push(rowData.main.temp)
                } else {
                    this.days_record.push(day_record)
                    day_record = []

                    let dt_next = firstDay.setDate(firstDay.getDate() + 1)
                    firstDay = new Date(dt_next)

                    if(firstDay.getDate() === recordDate) {
                        day_record.push(rowData.main.temp)
                    }
                }
            })
        }    
    }
    Weather.fetchData()
}   

const submit = document.getElementById("submit")
submit.addEventListener('click', getWeatherData)
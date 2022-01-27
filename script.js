import {Config} from "./config.js";
const key = Config.key;
let renderWeather = document.getElementById("weather")

const getWeatherData = function() {
    let Weather = {
        
        getCity : document.getElementById("city").value,
        days_record : [],

       // fetch data
        fetchData : function fetchData() {
            fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + this.getCity + '&units=metric' + '&appid='+ key)
            .then(response => response.json())
            .then(data => {
                let listData = data.list
                this.dayData(listData)
                console.log(listData)
            })
        },

        // septate data based on date
        dayData : function dayData(listData) {
            let firstDay = new Date()
            let day_record = []
            this.separateDailyRecord(listData, firstDay, day_record)
            console.log(this.days_record)
            let date = this.days_record 

            // get date 
            for(let i =0; i < date.length; i++){
                

                let strDate = this.days_record[i][0].dt_txt
                console.log(strDate)
                var recordDateObject = new Date(strDate)
                let recordDate = recordDateObject.getDate()
                let recordMonth = recordDateObject.getMonth()
                let recordYear= recordDateObject.getFullYear()
                console.log(recordDate, recordMonth, recordYear)

                let date = document.createElement("p")
                 date.innerHTML = `${recordDate}-${recordMonth}-${recordYear}`
                 renderWeather.appendChild(date)

            }
            // get weather description
            for(let i =0; i < date.length; i++){
                
                let weatherMain= this.days_record[i][0].weather[0].main
                let weatherDescription= this.days_record[i][0].weather[0].description
                let weatherIcon= this.days_record[i][0].weather[0].icon
                console.log(weatherMain, weatherDescription)

                let weather = document.createElement("p")
                let icon = document.createElement("IMG")
                icon.src= `"http://openweathermap.org/img/w/${weatherIcon}.png"`
                weather.innerHTML = `${weatherMain}-${weatherDescription}-${icon}`
                 renderWeather.appendChild(weather)
            }

            
            
            
            
           },  

        // get average temp
        getAverage : function getAverage(rowData) {
            if(rowData.length) {
                const tempTotal = rowData.reduce(function(accumulator, currentValue) {
                    return accumulator + currentValue.main.temp;
                }, 0);
                rowData.averTemp = (tempTotal/(rowData.length)).toFixed(1)
            // render Average
                let prg = document.createElement("p")
                prg.innerHTML = `${rowData.averTemp}`
                renderWeather.appendChild(prg)
            }
        },

        //  separate each of the days
        separateDailyRecord : function separateDailyRecord(listData,firstDay, day_record) {
            listData.forEach(rowData => {
                const recordDate = new Date(rowData.dt_txt).getDate()
        
                if (firstDay.getDate() === recordDate) {
                    day_record.push(rowData)
                } else {
                    this.getAverage(day_record)
                    this.days_record.push(day_record)
                    day_record = []

                    let dt_next = firstDay.setDate(firstDay.getDate() + 1)
                    firstDay = new Date(dt_next)

                    if(firstDay.getDate() === recordDate) {
                        day_record.push(rowData)
                    }
                }
            })
        }, 
    }
    Weather.fetchData()
}   

const submit = document.getElementById("submit")
submit.addEventListener('click', getWeatherData)
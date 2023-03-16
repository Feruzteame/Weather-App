// import {Config} from "./config.js";
// const key = Config.key;

const renderWeather = document.getElementById("weather")
const cityName = document.getElementById("cityName")
const weather_ul = document.querySelector('#weather')
const daily_li = weather_ul.querySelectorAll('li')

export const getWeatherData = function(city, config, myChart) {
    let Weather = {
        days_record : [],
        graph_date: [],
        graph_temp: [],
        
            // fetch data
        fetchData : function fetchData() {
            if(city !== '') {
                fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric' + '&appid=' + '3a5c287c9cf2cb57fab7aa0bb05f65b1')
                .then(response => response.json())
                .then(data => {
                    if(data.cod === '404'){
                        alert(data.message)
                        return
                    }
                    let listData = data.list
                    this.dayData(listData)
                    console.log(listData);
                    let valueCity = city
                    cityName.innerHTML = valueCity
                })
            } else {
                alert('pleas put city name')
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

        // get average temp
        getAverage : function getAverage(rowData) {
            if(rowData.length) {
                const tempTotal = rowData.reduce(function(accumulator, currentValue) {
                    return accumulator + currentValue.main.temp;
                }, 0);
                rowData.averTemp = (tempTotal/(rowData.length)).toFixed(1)+ "°C"
            }
        },
        // render Time
        getStrDate : function getStrDate(i) {
            if(this.days_record[0].length) {
                let strDate = this.days_record[i][0].dt_txt
                return strDate.slice(0, strDate.length - 9)
            }
        },
    
            // render weather description
        getWeather : function getWeather(i) {
            if(this.days_record[0].length) {
                let weatherMain= this.days_record[i][0].weather[0].main
                console.log(weatherMain)
                return weatherMain
            }
            },
            // render weather description
        getWeatherDescription : function getWeatherDescription(i) {
            if(this.days_record[0].length) {
                let weatherDescription= this.days_record[i][0].weather[0].description
                console.log(weatherDescription)
                return weatherDescription
            }
        },

        // render average
        renderAverage : function renderAverage(i) {
            if(this.days_record[0].length) { 
                let average = this.days_record[i].averTemp 
                console.log(average)
                return average
            }
        },

        dayData : function dayData(listData) {
            let firstDay = new Date()
            let day_record = []
            this.separateDailyRecord(listData, firstDay, day_record)
        
            this.days_record = this.days_record.filter(day_record => day_record.length > 0);
            
            for(let i =0; i < this.days_record.length; i++){
                let icon = this.days_record[i][0].weather[0].icon

                daily_li[i].querySelector('.p_image').src = `http://openweathermap.org/img/wn/${icon}@2x.png`
                daily_li[i].querySelector('.p_weather').innerHTML = this.getWeather(i)
                daily_li[i].querySelector('.p_average').innerHTML = this.renderAverage(i)
                daily_li[i].querySelector('.p_Description').innerHTML = this.getWeatherDescription(i)
                daily_li[i].querySelector('.p_date').innerHTML = this.getStrDate(i)

                this.graph_date.push(this.getStrDate(i))
                this.graph_temp.push(parseFloat(this.renderAverage(i).substring(-1, 1)))
            }

            // graph
            const labels = this.graph_temp
            const dataDt = this.graph_date

            config.data = {
                labels: dataDt,
                datasets: [{
                label: `Weekly temperature graph ${city} `,
                backgroundColor: ['green','red','purple', 'yellow','pink'],
                hoverBorderWidth: "3px",
                hoverBorderColor: "black",
                data: labels,
                }]
            };

            myChart.update(config);
        }
    }

  Weather.fetchData()
}   









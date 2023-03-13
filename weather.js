// import {Config} from "./config.js";
// const key = Config.key;

let renderWeather = document.getElementById("weather")
let cityName = document.getElementById("cityName")

export const getWeatherData = function(config, myChart) {
    let Weather = {
        getCity : document.getElementById("city").value ,
        days_record : [],
        graph_date: [],
        graph_temp: [],
        
            // fetch data
        fetchData : function fetchData() {
            console.log( this.days_record)
            console.log( this.graph_date)
            console.log( this.graph_temp)

            if(cityName.value === ''){

            } else{

            }         
            fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + this.getCity + '&units=metric' + '&appid=' + '3a5c287c9cf2cb57fab7aa0bb05f65b1')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(this.getCity == ""){
                    alert("pls put city name!")
                }
                let listData = data.list
                this.dayData(listData)
                console.log(listData);
                let valueCity = this.getCity
                cityName.innerHTML = valueCity
            })
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

            const weather_ul = document.querySelector('#weather')
            const daily_li = weather_ul.querySelectorAll('li')
        
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
                
                
                // style
                let firstChild =  renderWeather.children[0]
                firstChild.id = "today";
                firstChild.setAttribute(
                    "style", "font-size: 20px; font-style: italic; color:#0443F2;");
                let firstChildOfChild =  firstChild.children[0]
                firstChildOfChild.setAttribute(
                    "style", "font-size: 40px; font-style: italic; color:#0443F2;; margin-top:-15%;line-height: 60px;");
            }

            // graph
            const labels = this.graph_temp
            const dataDt = this.graph_date

            config.data = data = {
                labels: dataDt,
                datasets: [{
                label: `Weekly temperature graph ${this.getCity} `,
                backgroundColor: ['green','red','purple', 'yellow','pink'],
                hoverBorderWidth: "3px",
                hoverBorderColor: "black",
                data: labels,
                }]
            };

            myChart.update(config);
            document.getElementById("city").value = ""

        }
    }

  Weather.fetchData()
}   









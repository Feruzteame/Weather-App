import {getWeatherData} from "./weather.js";


// loop background video
addEventListener('DOMContentLoaded', () => {

  const video = document.getElementById("video")
  const video_source = video.querySelector("source")

      var bgImages = [
      './image/bg1.mp4',
      './image/bg2.mp4',
      './image/bg3.mp4',
      './image/bg4.mp4',
      './image/bg5.mp4',
    ];
    var bgIndex = 0;
    function changeBackground() {
      video_source.src = bgImages[bgIndex];
      video.load()
      
      bgIndex++;
      if (bgIndex == bgImages.length) {
        bgIndex = 0;
      }

    }
    changeBackground()
    setInterval(changeBackground, 20000);
});

// create Chart
const config = {
    type: 'bar',
    data: {},
    options: {}
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

// add eventlistener for weather Api
const city_input = document.querySelector('#city')
const submit = document.getElementById("submit")

submit.addEventListener('click', function() {
  getWeatherData(city_input.value, config, myChart)
  city.value = null
})  
addEventListener('DOMContentLoaded', (event) => {
  getWeatherData('gent', config, myChart)
  city.value = null
});
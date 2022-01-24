
function getData() {
    let Weather = {
        apiKey: "808e0c9b54f6aacec3566d6e9ff35b3d",
        getCity : document.getElementById("city").value,
        fetchFunction : function weatherFunction() {
            fetch('https://api.openweathermap.org/data/2.5/weather?q='+ this.getCity + '&appid=' + this.apiKey)
                .then(response => response.json())
                .then(data => console.log(data));
        }, 
    }
    Weather.fetchFunction()
}


const submit = document.getElementById("submit")
submit.addEventListener('click', getData)



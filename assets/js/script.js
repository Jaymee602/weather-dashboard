var apiKey = "ca8f8ea9fc3dba6a7b9c869686179db1";

var searchForm = document.querySelector('#search-form');
var citySearch = document.querySelector('#city-search');
var searchBtn = document.querySelector('#search-btn');
var searchHistory = document.querySelector('#search-history');
var searchHistoryContainer = document.querySelector('#search-history-container')
var fiveDayContainer = document.querySelector('#five-day');
var forecastContainer = document.querySelector('#forecast');

var todaysDate = moment().format('dddd, MMM Do YYYY');
$("#date").html(todaysDate);

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var city = citySearch.value.trim();
  
    if (city) {
       getWeather(city);
       getForecast(city);

        // make search history button
        cityBtn = document.createElement("button");
        cityBtn.textContent = city;
        cityBtn.className = "city-btn";
        cityBtn.setAttribute("type", "submit")
        searchHistory.append(cityBtn);
        cityBtn.addEventListener("click", searchHistoryBtn);
        
        // display search history & tomorrow's forecast
        forecastContainer.classList.remove("hide")
        searchHistoryContainer.classList.remove("hide")

        // clear search bar
        citySearch.value = "";
    } else {
      alert("Please enter a city");
    }
    
    saveCity(city);
};

var searchHistoryBtn = function(event) {
    var city = event.target.textContent;
    getWeather(city);
}

var saveCity = function(city) {
    localStorage.setItem("cities", JSON.stringify(city));
};

var getWeather = function(city) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${apiKey}`
    fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
        var { name } = data;
        var { temp, humidity } = data.main;
        var { speed } = data.wind;
        document.querySelector('#city').innerText = "Weather in " + name;
        document.querySelector('#temp').innerText = "Temp: " + temp + " °F";
        document.querySelector('#humidity').innerText = "Humidity: " + humidity + "%";
        document.querySelector('#wind').innerText = "Wind: " + speed + " MPH";
    })
};

var getForecast = function(city) {
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    fetch(forecastURL)
    .then((response) => response.json())
    .then((data) => {
        // var day1 = (data.list[0].dt_txt)
        // var dateArray = day1.split(" ");
        // var date = dateArray[0];
        // document.querySelector('#day1').innerText = date;
        //console.log(moment(date, 'DD/MM/YYYY'))
        // var day2 = (data.list[8].dt_txt)
        // var day3 = (data.list[16].dt_txt)
        // var day4 = (data.list[24].dt_txt)
        // var day5 = (data.list[32].dt_txt)
        //var { date } = data.list.weather.dt;
        //document.querySelector('#day1').innerText = day1
        //console.log(day1, day2, day3, day4, day5);

        // create icon for tomorrow's weather
        var createIcon = document.createElement("img")
        var dayOneIcon = (data.list[0].weather[0].icon)
        createIcon.src = "https://openweathermap.org/img/wn/" + dayOneIcon + "@2x.png"
        fiveDayContainer.appendChild(createIcon)

        // add description of tomorrow's weather
        var day1Description = (data.list[0].weather[0].description)
        document.querySelector('#day1').innerText = day1Description;
    })
};


searchForm.addEventListener("submit", formSubmitHandler);

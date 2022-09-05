var apiKey = "ca8f8ea9fc3dba6a7b9c869686179db1";

var searchForm = document.querySelector('#search-form');
var citySearch = document.querySelector('#city-search');
var searchBtn = document.querySelector('#search-btn');
var searchHistoryContainer = document.querySelector('#search-history');
var fiveDay = document.querySelector('#five-day');

var todaysDate = moment().format('dddd, MMM Do YYYY');
$("#date").html(todaysDate);

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var city = citySearch.value.trim();
  
    if (city) {
       getWeather(city);
    //   getFiveDay(city);

        // make search history button
        cityBtn = document.createElement("button");
        cityBtn.textContent = city;
        cityBtn.className = "city-btn";
        searchHistoryContainer.append(cityBtn)

        // clear search bar
        citySearch.value = "";
    } else {
      alert("Please enter a city");
    }
    
    saveCity(city);
};

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
        document.querySelector('#temp').innerText = temp + " °F";
        document.querySelector('#humidity').innerText = humidity + "%";
        document.querySelector('#wind').innerText = speed + " MPH";
    })
};



searchForm.addEventListener("submit", formSubmitHandler);
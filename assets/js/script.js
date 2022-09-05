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
    //   getWeather(city);
    //   getFiveDay(city);

        // save searched city to local storage
        var saveCity = function(city) {
            localStorage.setItem("cities", JSON.stringify(city));
        };

        // make search history button
        function searchHistory() {
            cityBtn = document.createElement("button");
            cityBtn.textContent = city;
            cityBtn.className = "city-btn";
            searchHistoryContainer.append(cityBtn)
        };
  
        // clear search bar
        citySearch.value = "";

    } else {
      alert("Please enter a city");
    }
    saveCity(city);
    searchHistory(city);
};


searchForm.addEventListener("submit", formSubmitHandler);
// PUBLIC VARS
var initialCity = "Los Angeles";
var waitTimeBeforeApiCall = 500; // ms
var localStorageEntriesKey = 'entries';


// PRIVATE VARS
var hasPreviousEntries = (localStorage.getItem(localStorageEntriesKey) != null ? true : false);
var entryArray = JSON.parse(localStorage.getItem(localStorageEntriesKey)) || [];
var entrySet = new Set(entryArray) || new Set();
console.log(localStorage.getItem(localStorageEntriesKey)); // view localStorage current entries


// SETUP
function setup() {
	setupPreventSubmissionOfForm();
	setupCityTemperatureOnKeyUp(waitTimeBeforeApiCall);
	setupClearEntries();

	if (hasPreviousEntries) {
		getPreviousEntries(entrySet);
	}
	else {
		getCityTemperature(initialCity); // So that the form is run once on page load
	}
}
setup();

// FUNCTIONS
function getPreviousEntries(entrySet) {
	for (var entry of entrySet) {
		getCityTemperature(entry);
	}
}

function getCityTemperature(city) {
	$.getJSON(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=78b1c75a5e39cee7c2e02f82d496f981`,
		function(data) {
			console.log(data);

			var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
			var temp = Math.round(data.main.temp);
			var weather = data.weather[0].main;

			$('.js-city').text(city);
			$('.js-icon').attr('src', icon);
			$('.js-weather').text(weather);
			$('.js-temp').text(temp);

			var entries = $('.js-entries');

			addEntry(entries, city, icon, weather, temp);
		}
	)
}

function addEntry(entries, city, icon, weather, temp) {
	var entryNode = document.createElement('div');
	entryNode.classList.add('entry', 'd-flex', 'align-items-center');

	var imgNode = document.createElement('img');
	imgNode.classList.add('icon');
	imgNode.src = icon;

	var textNode = document.createTextNode(`${city}, ${weather} - ${temp}\xb0`);

	var clearNode = document.createElement('i');
	clearNode.classList.add('entry__clear', 'fas', 'fa-times');
	clearNode.addEventListener('click', function(e) {
		var parentNode = e.currentTarget.parentNode;
		parentNode.parentNode.removeChild(parentNode);
		entrySet.delete(city);
		localStorage.setItem(localStorageEntriesKey, JSON.stringify(Array.from(entrySet)));
	});

	entryNode.appendChild(imgNode);
	entryNode.appendChild(textNode);
	entryNode.appendChild(clearNode);

	entries.prepend(entryNode);

	// setup localStorage
	entrySet.add(city);
	localStorage.setItem(localStorageEntriesKey, JSON.stringify(Array.from(entrySet)));
}

function setupCityTemperatureOnKeyUp(ms) {
	var timer;
	$('.js-form').keyup(function(e) {
		clearTimeout(timer);

		timer = setTimeout(function() {
			var newCity = $('.js-input').val();

			if (newCity.length > 0 && !entrySet.has(newCity)) {
				getCityTemperature(newCity);
			}
		}, ms);
	});

	// 'Enter' key instantly searches a city
	$('.js-form').keydown(function(e) {
		// Check if keypress is 'Enter' (e.keyCode == 13), else exit
		var keyCode = (e.keyCode ? e.keyCode : e.which);
		if (keyCode != 13) {
			return;
		}

		clearTimeout(timer);

		var newCity = $('.js-input').val();

		if (newCity.length > 0 && !entrySet.has(newCity)) {
			getCityTemperature(newCity);
		}
	});
}

function setupPreventSubmissionOfForm() {
	$('.js-form').submit(function(e) {
		e.preventDefault();
	});
}

function setupClearEntries() {
	$('.js-entries-clear').click(function(e) {
		e.preventDefault();
		$('.js-entries').empty();
		entrySet.clear();
		localStorage.removeItem(localStorageEntriesKey);
	})
}

var city = "Los Angeles";

function getCityTemperature() {
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

			addEntry(entries, icon, weather, temp);
		}
	)
}

function addEntry(entries, icon, weather, temp) {
	var entryNode = document.createElement('div');
	entryNode.classList.add('entry', 'd-flex', 'align-items-center');

	var imgNode = document.createElement('img');
	imgNode.classList.add('icon');
	imgNode.src = icon;

	var textNode = document.createTextNode(`${city}, ${weather} - ${temp}`);

	var clearNode = document.createElement('i');
	clearNode.classList.add('entry__clear', 'fas', 'fa-times');
	clearNode.addEventListener('click', function(e) {
		var parentNode = e.currentTarget.parentNode;
		parentNode.parentNode.removeChild(parentNode);
	});

	entryNode.appendChild(imgNode);
	entryNode.appendChild(textNode);
	entryNode.appendChild(clearNode);

	entries.prepend(entryNode);
}

function setupCityTemperatureOnKeyUp(ms) {
	var timer;
	$('.js-form').keyup(function(e) {
		e.preventDefault();
		clearTimeout(timer);
		timer = setTimeout(function() {
			var newCity = $('.js-input').val();

			if (newCity.length > 0 && newCity != city) {
				city = newCity;
				getCityTemperature();
			}
		}, ms);
	})
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
	})
}



setupPreventSubmissionOfForm();
setupCityTemperatureOnKeyUp(500);
setupClearEntries();
getCityTemperature(); // So that the form is run once on page load

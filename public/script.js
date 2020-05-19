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

			var latestEntries = $('.js-latest-entries');

			storeLatestEntry(latestEntries, icon, weather, temp);
		}
	)
}

function storeLatestEntry(latestEntries, icon, weather, temp) {
	latestEntries.prepend(`
		<div class="d-flex align-items-center">
			<img class="icon" src="${icon}" />
			${city}, ${weather} - ${temp}&deg;
		</div>
	`);
}

function getCityTemperatureOnKeyUp(ms) {
	var timer;
	$('.js-form').keyup(function(e) {
		e.preventDefault();
		clearTimeout(timer);
		timer = setTimeout(function() {
			city = $('.js-input').val();

			if (city.length > 0) {
				getCityTemperature();
			}
		}, ms);
	})
}

function preventSubmissionOfForm() {
	$('.js-form').submit(function(e) {
		e.preventDefault();
	});
}

preventSubmissionOfForm();
getCityTemperatureOnKeyUp(300);
getCityTemperature(); // So that the form is run once on page load

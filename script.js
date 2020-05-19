var city = "Los Angeles";

function getCityTemperature() {
	$.getJSON(
		`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=78b1c75a5e39cee7c2e02f82d496f981`,
		function(data) {
			console.log(data);

			var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
			var temp = Math.round(data.main.temp);
			var weather = data.weather[0].main;

			$('.js-city').text(city);
			$('.js-icon').attr('src', icon);
			$('.js-weather').text(weather);
			$('.js-temp').text(temp);
		}
	)
}

$('.js-form').submit(function(e) {
	e.preventDefault();

	city = $('.js-input').val();

	getCityTemperature();
})

getCityTemperature();
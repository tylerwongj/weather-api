$.getJSON(
	"http://api.openweathermap.org/data/2.5/weather?q=Los%20Angeles&units=imperial&APPID=78b1c75a5e39cee7c2e02f82d496f981",
	function(data) {
		console.log(data);

		var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
		var temp = Math.round(data.main.temp);
		var weather = data.weather[0].main;

		$('.js-icon').attr('src', icon);
		$('.js-weather').append(weather);
		$('.js-temp').prepend(temp);
	}
)
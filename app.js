const cityInput = document.getElementById('city');
const nowBtn = document.getElementById('now-btn');
const weatherNow = document.getElementById('weather-now')
const prognozaBtn = document.getElementById('prognozaBtn');
const prognozaDiv = document.getElementById('prognozaDiv');
const cityInputError = document.getElementById('cityInputError');
let URL_CURRENT_WEATHER =
	'https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=';
let URL_FORECAST_WEATHER =
	'https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=';
let URL_WEATHER_ICON_PREFIX = 'http://openweathermap.org/img/w/';

nowBtn.addEventListener('click', showWeatherNow);

function showWeatherNow() {
	let currentWeather = URL_CURRENT_WEATHER + cityInput.value;
	if(cityInput.value === '') {
		cityInput.style.border = '2px solid red';
		cityInputError.textContent = 'Please insert a location!';
	} else {
	fetch(currentWeather)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			let output = '';
			output = `
				<div class="card">
				   <h2>${data.name}</h2>
				   <img src="${URL_WEATHER_ICON_PREFIX}${data.weather[0].icon}.png">
				   <h2>${data.main.temp} &#8451;</h2>
				   <h5>Umiditate:${data.main.humidity}</h5>
				   <h5>Presiune:${data.main.pressure}</h5>
				   <h5>Minima zilei:${data.main.temp_min} &#8451;</h5>
				   <h5>Maxima zilei:${data.main.temp_max} &#8451;</h5>
				</div>
			 `;
			document.getElementById('weather-now').innerHTML += output;
			});
			weatherNow.style.display ='block';
			weatherNow.innerHTML = '';
			prognozaDiv.innerHTML = '';
		}
	}

prognozaBtn.addEventListener('click', showForecast);

function showForecast() {
	let finalEndPoint = URL_FORECAST_WEATHER + cityInput.value;
	console.log(finalEndPoint);
	fetch(finalEndPoint)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.list[0].dt_txt.split(' ')[0]);
			console.log(data.list[0].dt_txt.split(' ')[1]);
			console.log(data.list[0].main.temp);
			console.log(data.list[0].weather[0].description);

			var numarDePrognozeZiuaCurenta = 0;
			for (let i = 0; i < data.list.length; i++) {
				if (
					data.list[i].dt_txt.split(' ')[0] !==
					data.list[i + 1].dt_txt.split(' ')[0]
				) {
					numarDePrognozeZiuaCurenta = i + 1;
					break;
				}
			}
			
			prognozaDiv.innerHTML = '';
			createPrognozaBoxDiv(
				data,
				prognozaDiv,
				0,
				numarDePrognozeZiuaCurenta - 1
			);
			createPrognozaBoxDiv(
				data,
				prognozaDiv,
				numarDePrognozeZiuaCurenta,
				numarDePrognozeZiuaCurenta + 7
			);
			createPrognozaBoxDiv(
				data,
				prognozaDiv,
				numarDePrognozeZiuaCurenta + 8,
				numarDePrognozeZiuaCurenta + 15
			);
			createPrognozaBoxDiv(
				data,
				prognozaDiv,
				numarDePrognozeZiuaCurenta + 16,
				numarDePrognozeZiuaCurenta + 23
			);
			createPrognozaBoxDiv(
				data,
				prognozaDiv,
				numarDePrognozeZiuaCurenta + 24,
				numarDePrognozeZiuaCurenta + 31
			);
			createPrognozaBoxDiv(
				data,
				prognozaDiv,
				numarDePrognozeZiuaCurenta + 32,
				data.list.length - 1
			);
		});
}

function createPrognozaHoursOutput(day, icon, hour, temp, description) {
	let output = `
		<div class="prognozaHours">
			<h3 class="date"> ${day}</h3>
			<img src="${URL_WEATHER_ICON_PREFIX}${icon}.png">
			<p class="hour">${hour}</p>
			<p class="temp">${temp} °C</p>
			<p class="desc">${description}</p>
		</div>		
		`;
	return output;
}

function createPrognozaBoxDiv(data, divElement, startIndex, endIndex) {
	let prognozaBox = document.createElement('div');
	prognozaBox.classList.add('prognozaBox');
	for (let i = startIndex; i <= endIndex; i++) {
		prognozaBox.innerHTML += createPrognozaHoursOutput(
			data.list[i].dt_txt.split(' ')[0],
			data.list[i].weather[0].icon,
			data.list[i].dt_txt.split(' ')[1],
			data.list[i].main.temp,
			data.list[i].weather[0].description
		);
	}
	divElement.appendChild(prognozaBox);
	weatherNow.innerHTML = '';
	weatherNow.style.display = "none";
}


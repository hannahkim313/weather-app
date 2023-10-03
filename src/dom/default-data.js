import { format } from 'date-fns';
import getData from '../logic/data-events';
import appendChildren from '../logic/helper-functions';

const data = await getData('seattle', {
  location: ['name'],
  current: ['temp_f', 'condition'],
  forecast: ['forecastday'],
});

const editCurrentForecast = () => {
  const city = document.querySelector('.current-forecast h2');
  city.textContent = data.name;
  const currentTemp = document.querySelector('.current-temp');
  currentTemp.textContent = `${data.temp_f}°`;
  const currentCondition = document.querySelector('.current-condition');
  currentCondition.textContent = data.condition.text;
};

const rearrangeForecasts = () => {
  const currentHour = format(new Date(), `ha`);
  const forecasts = Array.from(document.querySelectorAll('.hour-forecast'));
  const hours = forecasts.map(
    (forecast) => forecast.querySelector('h4').textContent
  );
  const indexOfCurrentHour = hours.indexOf(currentHour);
  const beginning = forecasts.slice(indexOfCurrentHour);
  const end = forecasts.slice(0, indexOfCurrentHour);
  const rearranged = beginning.concat(end);
  const forecastElements = document.querySelectorAll('.hour-forecast');
  forecastElements.forEach((element) => element.remove());
  const section = document.querySelector('.hourly-forecast');
  appendChildren(section, ...rearranged);
};

const getStandardHour = (time) => {
  const militaryHour = Number(time.slice(-5, -3));

  if (militaryHour === 0) {
    return '12AM';
  }

  if (militaryHour === 12) {
    return '12PM';
  }

  const isPM = militaryHour >= 12;
  const standardHour = isPM ? militaryHour - 12 : militaryHour;

  return isPM ? `${standardHour}PM` : `${standardHour}AM`;
};

const editHourlyForecast = () => {
  const hourlyData = data.forecastday[0].hour;
  const forecasts = document.querySelectorAll('.hour-forecast');

  forecasts.forEach((forecast, index) => {
    const hour = forecast.querySelector('h4');
    hour.textContent = getStandardHour(hourlyData[index].time);
    const img = forecast.querySelector('img');
    img.src = hourlyData[index].condition.icon;
    img.alt = `${hourlyData[index].condition.text} icon`;
    const text = forecast.querySelector('p');
    text.textContent = hourlyData[index].condition.text;
  });

  rearrangeForecasts();
  const currentForecastHour = document.querySelector('.hour-forecast h4');
  currentForecastHour.textContent = 'Now';
};

const addDefaultData = () => {
  editCurrentForecast();
  editHourlyForecast();
};

export default addDefaultData;

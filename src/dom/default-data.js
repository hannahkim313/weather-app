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
  const currentHour = format(new Date(), 'ha');
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
  const section = document.querySelector('.hourly-forecast .forecasts');
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

const editMultiDayForecast = () => {
  const daysData = data.forecastday;
  const forecasts = document.querySelectorAll('.day-forecast');

  forecasts.forEach((forecast, index) => {
    const fullDate = daysData[index].date;
    const year = Number(fullDate.slice(0, 4));
    const monthIndex = Number(fullDate.slice(5, 7)) - 1;
    const date = Number(fullDate.slice(-2));
    const day = format(new Date(year, monthIndex, date), 'iii');
    const heading = forecast.querySelector('h4');
    heading.textContent = day;
    const img = forecast.querySelector('img');
    img.src = daysData[index].day.condition.icon;
    img.alt = `${daysData[index].day.condition.text} icon`;
    const lowTemp = forecast.querySelector('.low');
    lowTemp.textContent = `Low: ${Math.round(daysData[index].day.mintemp_f)}°`;
    const highTemp = forecast.querySelector('.high');
    highTemp.textContent = `High: ${Math.round(
      daysData[index].day.maxtemp_f
    )}°`;
  });
};

const addDefaultData = () => {
  editCurrentForecast();
  editHourlyForecast();
  editMultiDayForecast();
};

export default addDefaultData;

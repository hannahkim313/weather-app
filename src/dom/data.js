import { format } from 'date-fns';
import getData from '../logic/events/data-events';
import appendChildren from '../logic/helper-functions';

const getCurrentScale = () => {
  if (document.readyState === 'complete') {
    return document.querySelector('.active').textContent;
  }

  return undefined;
};

const fetchData = async (city) => {
  const responseBodyNames = {
    location: ['name'],
    current: ['condition'],
    forecast: ['forecastday'],
  };

  if (getCurrentScale() === '°F') {
    responseBodyNames.current.unshift('temp_f');
  } else {
    responseBodyNames.current.unshift('temp_c');
  }

  return getData(city, responseBodyNames);
};

const editCurrentForecast = (data) => {
  const city = document.querySelector('.current-forecast h2');
  city.textContent = data.name;
  const currentTemp = document.querySelector('.current-temp');

  if (getCurrentScale() === '°F') {
    currentTemp.textContent = `${Math.round(data.temp_f)}°`;
  } else {
    currentTemp.textContent = `${Math.round(data.temp_c)}°`;
  }

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

const editHourlyForecast = (data) => {
  const hourlyData = data.forecastday[0].hour;
  const forecasts = document.querySelectorAll('.hour-forecast');

  forecasts.forEach((forecast, index) => {
    const hour = forecast.querySelector('h4');
    hour.textContent = getStandardHour(hourlyData[index].time);
    const img = forecast.querySelector('img');
    img.src = hourlyData[index].condition.icon;
    img.alt = `${hourlyData[index].condition.text} icon`;
    const text = forecast.querySelector('p');

    if (getCurrentScale() === '°F') {
      text.textContent = `${Math.round(hourlyData[index].temp_f)}°`;
    } else {
      text.textContent = `${Math.round(hourlyData[index].temp_c)}°`;
    }
  });

  rearrangeForecasts();
  const currentForecastHour = document.querySelector('.hour-forecast h4');
  currentForecastHour.textContent = 'Now';
};

const editMultiDayForecast = (data) => {
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
    const highTemp = forecast.querySelector('.high');

    if (getCurrentScale() === '°F') {
      const minTemp = Math.round(daysData[index].day.mintemp_f);
      lowTemp.textContent = `Low: ${minTemp}°`;
      const maxTemp = Math.round(daysData[index].day.maxtemp_f);
      highTemp.textContent = `High: ${maxTemp}°`;
    } else {
      const minTemp = Math.round(daysData[index].day.mintemp_c);
      lowTemp.textContent = `Low: ${minTemp}°`;
      const maxTemp = Math.round(daysData[index].day.maxtemp_c);
      highTemp.textContent = `High: ${maxTemp}°`;
    }
  });
};

const populateData = async (city) => {
  const data = await fetchData(city);
  editCurrentForecast(data);
  editHourlyForecast(data);
  editMultiDayForecast(data);
};

export default populateData;

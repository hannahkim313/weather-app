import appendChildren from '../logic/helper-functions';

const createIndividualForecast = () => {
  const hour = document.createElement('h4');
  const conditionIcon = document.createElement('img');
  const temp = document.createElement('p');
  temp.classList.add('convertible');
  const forecast = document.createElement('article');
  forecast.classList.add('hour-forecast');
  appendChildren(forecast, hour, conditionIcon, temp);

  return forecast;
};

const createHourlyForecast = () => {
  const heading = document.createElement('h3');
  heading.textContent = 'Hourly Forecast';
  const forecasts = [];
  let forecastNum = 24;

  while (forecastNum > 0) {
    forecasts.push(createIndividualForecast());
    forecastNum -= 1;
  }

  const forecastsContainer = document.createElement('div');
  forecastsContainer.classList.add('forecasts');
  appendChildren(forecastsContainer, ...forecasts);
  const hourlyForecast = document.createElement('article');
  hourlyForecast.classList.add('hourly-forecast');
  appendChildren(hourlyForecast, heading, forecastsContainer);

  return hourlyForecast;
};

export default createHourlyForecast;

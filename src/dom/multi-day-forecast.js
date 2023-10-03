import appendChildren from '../logic/helper-functions';

const createIndividualForecast = () => {
  const day = document.createElement('h4');
  const conditionIcon = document.createElement('img');
  const lowTemp = document.createElement('p');
  lowTemp.classList.add('low');
  const highTemp = document.createElement('p');
  highTemp.classList.add('high');
  const forecast = document.createElement('article');
  forecast.classList.add('day-forecast');
  appendChildren(forecast, day, conditionIcon, lowTemp, highTemp);

  return forecast;
};

const createMultiDayForecast = () => {
  const heading = document.createElement('h3');
  heading.textContent = '3-Day Forecast';
  const forecasts = [];
  let forecastNum = 3;

  while (forecastNum > 0) {
    forecasts.push(createIndividualForecast());
    forecastNum -= 1;
  }

  const multiDayForecast = document.createElement('article');
  multiDayForecast.classList.add('multi-day-forecast');
  appendChildren(multiDayForecast, heading, ...forecasts);

  return multiDayForecast;
};

export default createMultiDayForecast;

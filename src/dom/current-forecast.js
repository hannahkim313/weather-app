import appendChildren from '../logic/helper-functions';

const createCurrentForecast = () => {
  const city = document.createElement('h2');
  city.textContent = 'Los Angeles'; // Change to fetched data
  const currentTemp = document.createElement('p');
  currentTemp.textContent = '53°'; // Change to fetched data
  const currentWeather = document.createElement('p');
  currentWeather.textContent = 'Rainy'; // Change to fetched data
  const currentForecast = document.createElement('article');
  appendChildren(currentForecast, city, currentTemp, currentWeather);

  return currentForecast;
};

export default createCurrentForecast;

import appendChildren from '../logic/helper-functions';

const createCurrentForecast = () => {
  const city = document.createElement('h2');
  const currentTemp = document.createElement('p');
  currentTemp.classList.add('current-temp');
  const currentCondition = document.createElement('p');
  currentCondition.classList.add('current-condition');
  const currentForecast = document.createElement('article');
  currentForecast.classList.add('current-forecast');
  appendChildren(currentForecast, city, currentTemp, currentCondition);

  return currentForecast;
};

export default createCurrentForecast;

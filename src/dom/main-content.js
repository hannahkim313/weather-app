import appendChildren from '../logic/helper-functions';
import createCurrentForecast from './current-forecast';
import createHourlyForecast from './hourly-forecast';

const createMainContent = () => {
  const main = document.createElement('main');
  appendChildren(main, createCurrentForecast(), createHourlyForecast());

  return main;
};

export default createMainContent;

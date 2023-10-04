import appendChildren from '../logic/helper-functions';
import createMultiDayForecast from './multi-day-forecast';
import createCurrentForecast from './current-forecast';
import createHourlyForecast from './hourly-forecast';
import createOptions from './options';

const createMainContent = () => {
  const main = document.createElement('main');
  appendChildren(
    main,
    createOptions(),
    createCurrentForecast(),
    createHourlyForecast(),
    createMultiDayForecast()
  );

  return main;
};

export default createMainContent;

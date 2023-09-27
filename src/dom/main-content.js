import appendChildren from '../logic/helper-functions';
import createCurrentForecast from './current-forecast';

const createMainContent = () => {
  const main = document.createElement('main');
  appendChildren(main, createCurrentForecast());

  return main;
};

export default createMainContent;

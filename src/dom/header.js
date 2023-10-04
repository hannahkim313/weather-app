import logoImg from '../img/logo.svg';
import appendChildren from '../logic/helper-functions';

const createHeader = () => {
  const logo = document.createElement('img');
  logo.src = logoImg;
  logo.alt = 'Partly cloudy and sunny icon';
  const heading = document.createElement('h1');
  heading.textContent = 'Weather Forecast';
  const header = document.createElement('header');
  appendChildren(header, logo, heading);

  return header;
};

export default createHeader;

import appendChildren from '../logic/helper-functions';

const createHeader = () => {
  const heading = document.createElement('h1');
  heading.textContent = 'Weather Forecast';
  const header = document.createElement('header');
  appendChildren(header, heading);

  return header;
};

export default createHeader;

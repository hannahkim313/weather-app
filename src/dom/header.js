import searchImg from '../img/search.svg';
import thermometerImg from '../img/thermometer.svg';
import appendChildren from '../logic/helper-functions';

const createThermometerIcon = (altText) => {
  const thermometerIcon = document.createElement('img');
  thermometerIcon.src = thermometerImg;
  thermometerIcon.alt = altText;

  return thermometerIcon;
};

const createHeader = () => {
  const heading = document.createElement('h1');
  heading.textContent = 'Weather Forecast';
  const searchLabel = document.createElement('label');
  searchLabel.for = 'city-search';
  searchLabel.textContent = 'Search for a city';
  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.id = 'city-search';
  searchInput.name = 'city';
  const searchIcon = document.createElement('img');
  searchIcon.src = searchImg;
  searchIcon.alt = 'Click to search for inputted city';
  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.classList.add('search');
  searchButton.appendChild(searchIcon);
  const searchContainer = document.createElement('div');
  searchContainer.classList.add('search-container');
  appendChildren(searchContainer, searchLabel, searchInput, searchButton);
  const fahrenheitButton = document.createElement('button');
  fahrenheitButton.textContent = '°F';
  fahrenheitButton.appendChild(
    createThermometerIcon('Click to set to Fahrenheit')
  );
  const celsiusButton = document.createElement('button');
  celsiusButton.textContent = '°C';
  celsiusButton.appendChild(createThermometerIcon('Click to set to Celsius'));
  const tempContainer = document.createElement('div');
  tempContainer.classList.add('temp-container');
  appendChildren(tempContainer, fahrenheitButton, celsiusButton);
  const header = document.createElement('header');
  appendChildren(header, heading, searchContainer, tempContainer);

  return header;
};

export default createHeader;

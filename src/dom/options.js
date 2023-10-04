import searchImg from '../img/search.svg';
import thermometerImg from '../img/thermometer.svg';
import appendChildren from '../logic/helper-functions';

const createThermometerIcon = (altText) => {
  const thermometerIcon = document.createElement('img');
  thermometerIcon.src = thermometerImg;
  thermometerIcon.alt = altText;

  return thermometerIcon;
};

const createOptions = () => {
  const searchLabel = document.createElement('label');
  searchLabel.setAttribute('for', 'city-search');
  searchLabel.textContent = 'Search for a city:';
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
  fahrenheitButton.classList.add('active');
  fahrenheitButton.textContent = '°F';
  fahrenheitButton.appendChild(
    createThermometerIcon('Click to set to Fahrenheit')
  );
  const celsiusButton = document.createElement('button');
  celsiusButton.textContent = '°C';
  celsiusButton.appendChild(createThermometerIcon('Click to set to Celsius'));
  const tempContainer = document.createElement('div');
  appendChildren(tempContainer, fahrenheitButton, celsiusButton);
  tempContainer.classList.add('temp-container');
  const options = document.createElement('div');
  options.classList.add('options');
  appendChildren(options, tempContainer, searchContainer);

  return options;
};

export default createOptions;

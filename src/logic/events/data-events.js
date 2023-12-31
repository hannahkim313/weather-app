const getCityData = async (city) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5197663a72f64bba8dd174840232509&q=${city}&days=3&aqi=no&alerts=no`,
    { mode: 'cors' }
  );

  return response.json();
};

const getLocationData = async (city, keys) => {
  const cityData = await getCityData(city);
  const locationData = cityData.location;
  const data = {};

  keys.forEach((key) => {
    data[key] = locationData[key];
  });

  return data;
};

const getCurrentData = async (city, keys) => {
  const cityData = await getCityData(city);
  const currentData = cityData.current;
  const data = {};

  keys.forEach((key) => {
    data[key] = currentData[key];
  });

  return data;
};

const getForecastData = async (city, keys) => {
  const cityData = await getCityData(city);
  const forecastData = cityData.forecast;
  const data = {};

  keys.forEach((key) => {
    data[key] = forecastData[key];
  });

  return data;
};

const responseBodyObjects = {
  location: getLocationData,
  current: getCurrentData,
  forecast: getForecastData,
};

const getData = async (city = 'seattle', responseBodyNames = {}) => {
  const entries = Object.entries(responseBodyNames);
  const data = [];

  entries.forEach(([name, keys]) => {
    data.push(responseBodyObjects[name](city, keys));
  });

  return Object.assign({}, ...(await Promise.all(data)));
};

export default getData;

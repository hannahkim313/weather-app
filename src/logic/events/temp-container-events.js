import getData from './data-events';

const getCity = () => {
  if (document.readyState === 'complete') {
    return document.querySelector('.current-temp h3').textContent;
  }

  return undefined;
};

const data = await getData(getCity(), {
  current: ['temp_f', 'temp_c'],
  forecast: ['forecastday'],
});

const convertMultiDayTemps = (currentScale) => {
  const lowTempElements = document.querySelectorAll('.low.convertible');
  const highTempElements = document.querySelectorAll('.high.convertible');
  const daysData = data.forecastday;

  daysData.forEach((dayData, index) => {
    if (currentScale === '°F') {
      const convertedLowTemp = Math.round(dayData.day.mintemp_c);
      lowTempElements[index].textContent = `Low: ${convertedLowTemp}°`;
      const convertedHighTemp = Math.round(dayData.day.maxtemp_c);
      highTempElements[index].textContent = `High: ${convertedHighTemp}°`;
    } else {
      const convertedLowTemp = Math.round(dayData.day.mintemp_f);
      lowTempElements[index].textContent = `Low: ${convertedLowTemp}°`;
      const convertedHighTemp = Math.round(dayData.day.maxtemp_f);
      highTempElements[index].textContent = `High: ${convertedHighTemp}°`;
    }
  });
};

const convertHourlyTemps = (currentScale) => {
  const tempElements = document.querySelectorAll('.hour-forecast .convertible');
  const hourlyData = data.forecastday[0].hour;

  hourlyData.forEach((hourData, index) => {
    if (currentScale === '°F') {
      tempElements[index].textContent = `${Math.round(hourData.temp_c)}°`;
    } else {
      tempElements[index].textContent = `${Math.round(hourData.temp_f)}°`;
    }
  });
};

const convertCurrentTemp = (currentScale) => {
  if (currentScale === '°F') {
    const currentTemp = document.querySelector('.current-temp.convertible');
    currentTemp.textContent = `${Math.round(data.temp_c)}°`;
  } else {
    const currentTemp = document.querySelector('.current-temp.convertible');
    currentTemp.textContent = `${Math.round(data.temp_f)}°`;
  }
};

const convertTemp = () => {
  const currentScale = document.querySelector('.active').textContent;
  convertCurrentTemp(currentScale);
  convertHourlyTemps(currentScale);
  convertMultiDayTemps(currentScale);
};

const emitClickEvents = (e) => {
  if (
    e.target.closest('button') &&
    !e.target.closest('button').classList.contains('active')
  ) {
    convertTemp();
    const currentActive = document.querySelector('.active');
    currentActive.classList.toggle('active');
    const clickedButton = e.target.closest('button');
    clickedButton.classList.toggle('active');
  }
};

const events = {
  click: emitClickEvents,
};

const emitTempContainerEvents = (e) => events[e.type](e);

export default emitTempContainerEvents;

import getData from '../logic/data-events';

const data = await getData('seattle', {
  location: ['name'],
  current: ['temp_f', 'condition'],
});

const editCurrentForecast = () => {
  const city = document.querySelector('.current-forecast h2');
  city.textContent = data.name;
  const currentTemp = document.querySelector('.current-temp');
  currentTemp.textContent = `${data.temp_f}°`;
  const currentCondition = document.querySelector('.current-condition');
  currentCondition.textContent = data.condition.text;
};

const addDefaultData = () => {
  editCurrentForecast();
};

export default addDefaultData;

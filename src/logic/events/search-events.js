import populateData from '../../dom/data';

const invalidate = (e) => {
  const error = document.createElement('p');
  error.textContent = 'Please enter a valid city name';
  const inputContainer = document.querySelector(
    '.search-container .input-container'
  );
  inputContainer.appendChild(error);
  e.preventDefault();
};

const removeError = () => {
  const inputContainer = document.querySelector(
    '.search-container .input-container'
  );
  const isErrorPresent = inputContainer.childElementCount > 1;

  if (isErrorPresent) {
    inputContainer.lastElementChild.remove();
  }
};

const validate = async (city, e) => {
  try {
    await populateData(city);
    removeError();
  } catch (error) {
    invalidate(e);
  }
};

const emitClickEvents = (e) => {
  const city = e.target.closest('div').querySelector('input').value;
  validate(city, e);
};

const events = {
  click: emitClickEvents,
};

const emitSearchEvents = (e) => events[e.type](e);

export default emitSearchEvents;

import populateData from '../../dom/data';

const validate = async (city) => {
  try {
    await populateData(city);
  } catch (error) {
    // console.log('error!');
  }
};

const emitClickEvents = (e) => {
  const city = e.target.closest('button').previousElementSibling.value;
  validate(city);
};

const events = {
  click: emitClickEvents,
};

const emitSearchEvents = (e) => events[e.type](e);

export default emitSearchEvents;

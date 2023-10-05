import emitTempContainerEvents from './events/temp-container-events';
import emitSearchEvents from './events/search-events';

const emitEvents = () => {
  const body = document.querySelector('body');
  body.addEventListener('click', (e) => {
    if (
      e.target.closest('div') &&
      e.target.closest('div').classList.contains('temp-container')
    ) {
      emitTempContainerEvents(e);
    }

    if (
      e.target.closest('button') &&
      e.target.closest('button').classList.contains('search')
    ) {
      emitSearchEvents(e);
    }
  });
};

export default emitEvents;

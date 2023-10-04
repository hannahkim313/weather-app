const emitEvents = () => {
  const body = document.querySelector('body');
  body.addEventListener('click', (e) => {
    if (
      e.target.closest('div') &&
      e.target.closest('div').classList.contains('temp-container')
    ) {
      // Call emitTempContainerEvents(e);
    }

    if (
      e.target.closest('button') &&
      e.target.closest('button').classList.contains('search')
    ) {
      // Call emitSearchEvents(e);
    }
  });
};

export default emitEvents;

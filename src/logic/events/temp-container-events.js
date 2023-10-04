const emitClickEvents = (e) => {
  // do something
};

const events = {
  click: emitClickEvents,
};

const emitTempContainerEvents = (e) => events[e.type](e);

export default emitTempContainerEvents;

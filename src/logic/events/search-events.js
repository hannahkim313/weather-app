const emitClickEvents = (e) => {
  // do something
};

const events = {
  click: emitClickEvents,
};

const emitSearchEvents = (e) => events[e.type](e);

export default emitSearchEvents;

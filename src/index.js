import './css/reset.css';
import './css/style.css';
import createContent from './dom/content';
import addDefaultData from './dom/default-data';
import emitEvents from './logic/emit-events';

createContent();
addDefaultData();
emitEvents();

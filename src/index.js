import './css/reset.css';
import './css/style.css';
import createContent from './dom/content';
import populateData from './dom/data';
import emitEvents from './logic/emit-events';

createContent();
populateData('seattle');
emitEvents();

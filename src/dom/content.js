import appendChildren from '../logic/helper-functions';
import createHeader from './header';
import createMainContent from './main-content';

const createContent = () => {
  const body = document.querySelector('body');
  appendChildren(body, createHeader(), createMainContent());
};

export default createContent;

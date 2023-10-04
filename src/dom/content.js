import appendChildren from '../logic/helper-functions';
import createHeader from './header';
import createMainContent from './main-content';
import createFooter from './footer';

const createContent = () => {
  const body = document.querySelector('body');
  appendChildren(body, createHeader(), createMainContent(), createFooter());
};

export default createContent;

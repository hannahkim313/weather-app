import githubImg from '../img/github.svg';
import appendChildren from '../logic/helper-functions';

const createFooter = () => {
  const githubIcon = document.createElement('img');
  githubIcon.src = githubImg;
  githubIcon.alt = 'Github icon';
  const name = document.createElement('p');
  name.textContent = 'Hannah Kim';
  const link = document.createElement('a');
  link.href = 'https://github.com/hannahkim313';
  appendChildren(link, githubIcon, name);
  const footer = document.createElement('footer');
  footer.appendChild(link);

  return footer;
};

export default createFooter;

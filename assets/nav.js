const settings = require('electron-settings');
const footer = document.getElementById('btn-end');

/***
This file acts somewhat as a cobbled together controller file.
It's not pretty because I started building it when I didn't know what I was doing.
I still don't, but I know enough to realize this is a pretty terrible way to organize code.
Future me dreads maintaining this so much that there's a really good chance
he'll just redo the whole damn thing.
***/

document.body.addEventListener('click', function (event){
  if(event.target.dataset.section) {
    handleSection(event);
  }
});

function handleSection(event){
  hideAll();
  removeElements();
  const sectionId = event.target.dataset.section + '-section';
  document.getElementById(sectionId).classList.add('shown');

  const buttonId = event.target.getAttribute('id')
  settings.set('activeSectionButtonId', buttonId)
}

function hideAll() {
  const sections = document.querySelectorAll('.js-section.shown');
  Array.prototype.forEach.call(sections, function (section) {
    section.classList.remove('shown')
  });

}

function removeElements(className){
  var elements = document.getElementsByClassName('inputSections');
  while (elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
  }
}

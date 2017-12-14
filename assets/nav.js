const settings = require('electron-settings');
const footer = document.getElementById('btn-end');

document.body.addEventListener('click', function (event){
  if(event.target.dataset.section) {
    handleSection(event);
  }
  if(event.target.dataset.edits){
      target = event.target;

        const listItem = target.parentElement;

      const input = document.createElement('input');
    
      listItem.classList.add('editing');

      input.value = target.innerText;
      listItem.appendChild(input);

      input.focus();
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

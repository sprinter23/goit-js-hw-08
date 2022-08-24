import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

populateFormOutput();

function onFormInput(e) {
  let savedMessage = localStorage.getItem(STORAGE_KEY);
  savedMessage = savedMessage ? JSON.parse(savedMessage) : {};
  savedMessage[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMessage));
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(localStorage.getItem(STORAGE_KEY));
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateFormOutput() {
  let savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    Object.entries(savedMessage).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}

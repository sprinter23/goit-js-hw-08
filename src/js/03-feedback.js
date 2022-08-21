import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

populateFormOutput();

function onFormInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (localStorage.getItem(STORAGE_KEY)) {
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  }

  e.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
}

function populateFormOutput() {
  if (localStorage.getItem(STORAGE_KEY)) {
    form.email.value = JSON.parse(localStorage.getItem(STORAGE_KEY)).email;
    form.message.value = JSON.parse(localStorage.getItem(STORAGE_KEY)).message;
  }
}

import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageInput = document.querySelector('textarea');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

const storageKey = 'feedback-form-state';

let formData = {};
populateFormData();

function onFormInput({ target: { name, value } }) {
  formData[name] = value;
  localStorage.setItem(storageKey, JSON.stringify(formData));
}

function populateFormData() {
  const savedInputData = localStorage.getItem(storageKey);
  const dataParse = JSON.parse(savedInputData);
  if (dataParse) {
    formData = { ...dataParse };
    emailInput.value = dataParse.email ? dataParse.email : '';
    messageInput.value = dataParse.message ? dataParse.message : '';
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(storageKey);
}

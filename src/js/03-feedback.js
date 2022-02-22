import throttle from 'lodash.throttle';

const emailInputRef = document.querySelector('input');
const messageTestareaRef = document.querySelector('textarea');
const formRef = document.querySelector('form');

let formData = {};

const STORAGE_KEY = 'feedback - form - state';

populateForm();

formRef.addEventListener('input', throttle(onFormChange, 500));

function onFormChange(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    emailInputRef.value = savedMessage.email || '';
    messageTestareaRef.value = savedMessage.message || '';
    formData = savedMessage;
  }
}

formRef.addEventListener('submit', onSubmitButtonClick);

function onSubmitButtonClick(event) {
  event.preventDefault();
  formRef.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);

  if (emailInputRef.nodeValue === null || messageTestareaRef.nodeValue === null) {
    formData = {};
  }
}

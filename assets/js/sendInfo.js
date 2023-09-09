'use strict';

const to = 'ZHVuZ21pbmVyNjlAZ21haWwuY29t';

const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const messageField = document.querySelector('#message');
const submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const from = emailField.value;
  const name = nameField.value;
  const message = messageField.value;
  if (from && name && message) {
    mailSender(from, turnIn(to), name, message);
    submitBtn.setAttribute('disabled', '');
  }
});

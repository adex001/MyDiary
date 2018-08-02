const submitButton = document.querySelector('.submit');
const baseAPI = 'http://localhost:4000/api/v1';

const signUp = ((e) => {
  e.preventDefault();
  const emailText = document.getElementById('email').value;
  const usernameText = document.getElementById('username').value;
  const firstnameText = document.getElementById('firstname').value;
  const lastnameText = document.getElementById('lastname').value;
  const plainPasswordText = document.getElementById('plainPassword').value;
  const password2Text = document.getElementById('password2').value;
  console.log(firstnameText);
  console.log(emailText);
  const signupObject = {
    email: emailText,
    username: usernameText,
    firstname: firstnameText,
    lastname: lastnameText,
    plainPassword: plainPasswordText,
  };
  fetch(`${baseAPI}/auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify(signupObject),
  })
    .then(response => response.json())
    .then((resultObject) => {
      console.log(`My result Object ${resultObject}`);
      console.log(resultObject);
      if (resultObject.status === 'true') {
        localStorage.setItem('token', resultObject.token);
        // return window.location.replace('/UI/dashboard.html');
      }
      // Display error message 
      return console.log(resultObject.message);

    });
});

submitButton.addEventListener('click', signUp);

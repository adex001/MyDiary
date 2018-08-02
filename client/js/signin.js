const submitButton = document.querySelector('.submit');
const baseAPI = 'http://localhost:4000/api/v1';

const signIn = ((e) => {
  e.preventDefault();
  const emailText = document.getElementById('email').value;
  const plainPasswordText = document.getElementById('plainPassword').value;
  const signInObject = {
    email: emailText,
    plainPassword: plainPasswordText,
  };
  fetch(`${baseAPI}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify(signInObject),
  })
    .then(response => response.json())
    .then((resultObject) => {
      console.log(`My result Object ${resultObject}`);
      console.log(resultObject);
      console.log(resultObject.loginToken);
      localStorage.setItem('token', resultObject.loginToken);
    });
});

submitButton.addEventListener('click', signIn);

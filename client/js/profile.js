const baseAPI = 'http://localhost:4000/api/v1';
const logoutButton = document.getElementsByClassName('signout');

const logout = ((e) => {
  e.preventDefault();
  localStorage.removeItem('token');
  window.location.replace('/UI/entries.html');
});
fetch(`${baseAPI}/entries/count`, {
  method: 'GET',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'content-type': 'application/json',
    token: localStorage.getItem('token'),
  },
})
  .then(response => response.json())
  .then((countResult) => {
    const countSpan = document.getElementById('mycount');
    countSpan.innerHTML = countResult.count;
  });

const updateProfile = ((e) => {
  e.preventDefault();
  const sexValue = document.getElementById('sex').value;
  const firstnameValue = document.getElementById('firstname').value;
  const lastnameValue = document.getElementById('lastname').value;
  const updateObject = {
    firstname: firstnameValue,
    lastname: lastnameValue,
    sex: sexValue,
  };
  fetch(`${baseAPI}/user/modifyprofile`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      token: localStorage.getItem('token'),
    },
    body: JSON.stringify(updateObject),
  })
    .then(response => response.json())
    .then((results) => {
      console.log(results);
    });
});
const updateButton = document.getElementById('updatebutton');
updateButton.addEventListener('click', updateProfile);

const baseAPI = 'http://localhost:4000/api/v1';
const saveButton = document.getElementById('savebutton');
const logoutButton = document.getElementsByClassName('signout');

const logout = ((e) => {
  e.preventDefault();
  localStorage.removeItem('token');
  window.location.replace('/UI/entries.html');
});
const addEntry = ((e) => {
  e.preventDefault();
  const entryText = document.getElementById('entry').value;
  const entryTitle = document.getElementById('entrytitle').value;
  const visiText = document.getElementById('visibility').value;

  const entryObject = {
    entryTitle,
    entry: entryText,
    visibility: visiText,
  };

  fetch(`${baseAPI}/entries`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      token: localStorage.getItem('token'),
    },
    body: JSON.stringify(entryObject),
  })
    .then(response => response.json())
    .then((entryResult) => {
      if (entryResult.status === 'true') {
        window.location.replace('/UI/entries.html');
      }
    });
});
saveButton.addEventListener('click', addEntry);
logoutButton.addEventListener('click', logout);
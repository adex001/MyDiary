const baseAPI = 'http://localhost:4000/api/v1';
const saveButton = document.getElementById('savebutton');
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
        return window.location.replace('/UI/entries.html');
      }
      return console.log(entryResult.message);
    });
});
saveButton.addEventListener('click', addEntry);

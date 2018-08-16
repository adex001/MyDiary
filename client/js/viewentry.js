const baseAPI = 'http://localhost:4000/api/v1';
const url = window.location.href;
const entryParams = url.split('?')[1].replace('entryId=', '');
const entriesId = parseInt(entryParams, 10);

fetch(`${baseAPI}/entries/${entriesId}`, {
  METHOD: 'GET',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'content-type': 'application/json',
    token: localStorage.getItem('token'),
  },
})
  .then(response => response.json())
  .then((resultObject) => {
    console.log(resultObject);
  });

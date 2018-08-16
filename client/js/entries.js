const baseAPI = 'http://localhost:4000/api/v1';

fetch(`${baseAPI}/entries`, {
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

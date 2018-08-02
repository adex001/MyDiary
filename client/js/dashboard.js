const baseAPI = 'http://localhost:4000/api/v1';
console.log(`++=====>>>>${localStorage.getItem('token')}`);

// displaying my entries
fetch(`${baseAPI}/entries`, {
  method: 'GET',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'content-type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
})
  .then(response => response.json())
  .then((resultObject) => {
    console.log(resultObject);
  });

const baseAPI = 'http://localhost:4000/api/v1';
console.log(`${localStorage.getItem('token')}`);

// displaying my entries
fetch(`${baseAPI}/entries`, {
  method: 'GET',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'content-type': 'application/json',
    token: localStorage.getItem('token'),
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJpYXQiOjE1MzMyMDY3ODV9.bvh672bflRGhPkrmsw4Hh79lMZqGXS1HNLgF786fQz8',
  },
})
  .then(response => response.json())
  .then((resultObject) => {
    console.log(localStorage.getItem('token'));
    console.log(resultObject);
    if (resultObject.status === 'true') {
      console.log(resultObject);
      // Display objects
    }
    console.log(resultObject.message);
  });

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
  })
;

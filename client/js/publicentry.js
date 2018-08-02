const url = window.location.href;
const baseAPI = 'http://localhost:4000/api/v1';
const stringEntryId = url.split('?')[1].replace('entryId=', '');
const entryId = parseInt(stringEntryId, 10);
const article = document.getElementById('article');
const entryTitle = document.getElementById('entryTitle');
const entryDate = document.getElementById('date');

fetch(`${baseAPI}/entries/public/${entryId}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'content-type': 'application/json',
  },
})
  .then(response => response.json())
  .then((result) => {
    const date = new Date(result.publicEntry[0].timecreated);
    article.innerText = result.publicEntry[0].entry;
    entryTitle.innerText = result.publicEntry[0].entrytitle;
    entryDate.innerHTML = date;
  });

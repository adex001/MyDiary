const baseAPI = 'http://localhost:4000/api/v1';
fetch(`${baseAPI}/entries`, {
  method: 'GET',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'content-type': 'application/json',
    token: localStorage.getItem('token'),
  },
})
  .then(response => response.json())
  .then((resultObject) => {
    if (resultObject.status === 'true') {
      resultObject.entries.forEach((entry1) => {
        const div1 = document.createElement('div');
        div1.className = 'entries';
        const p1 = document.createElement('p');
        p1.className = 'title';
        p1.innerText = entry1.entrytitle;
        const p2 = document.createElement('p');
        p2.className = 'description';
        p2.innerHTML = entry1.entry.slice(0, 120);
        const a1 = document.createElement('a');
        a1.href = `./viewentry.html?entryId=${entry1.entriesid}`;
        const b1 = document.createElement('Button');
        b1.innerText = '...read more';

        a1.appendChild(b1);
        div1.appendChild(p1);
        div1.appendChild(p2);
        div1.appendChild(a1);

        const entriesList = document.querySelector('.entries-list');
        entriesList.appendChild(div1);
      });
    }
  });

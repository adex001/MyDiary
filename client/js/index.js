// eslint-disable-next-line
const publicEntriesDiv = document.querySelector('.putEntries');
const getPublicEntries = () => {
  const baseAPI = 'http://localhost:4000/api/v1';
  // eslint-disable-next-line
  fetch(`${baseAPI}/entries/public`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((allEntries) => {
      allEntries.entries.forEach((entryObject) => {
        const { entrytitle, entry, entriesid } = entryObject;
        const fetchEntries = document.createElement('div');
        fetchEntries.className = 'entries';
        const paragraph1 = document.createElement('p');
        paragraph1.className = 'title';
        paragraph1.innerText = entrytitle.slice(0, 15);
        const paragraph2 = document.createElement('p');
        paragraph2.className = 'description';
        paragraph2.innerText = entry.slice(0, 15);
        const a = document.createElement('a');
        a.href = `./publicentry.html?entryId=${entriesid}`;
        const button = document.createElement('Button');
        button.textContent = 'read more';

        a.appendChild(button);
        fetchEntries.appendChild(paragraph1);
        fetchEntries.appendChild(paragraph2);
        fetchEntries.appendChild(a);
        publicEntriesDiv.appendChild(fetchEntries);
      });
    });
};
getPublicEntries();

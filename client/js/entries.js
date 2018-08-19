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
    if (resultObject.message === 'No entry') {
      console.log('No entry!');
    } else {
      resultObject.entries.forEach((entrys) => {
        const ulBox = document.createElement('ul');
        const liBox = document.createElement('li');
        liBox.className = 'entriestitle';
        const a1 = document.createElement('a');
        a1.className = 'clickable';
        a1.href = `./viewentry.html?entryId=${entrys.entriesid}`;
        const p1 = document.createElement('p');
        p1.innerText = entrys.entrytitle;
        a1.appendChild(p1);
        liBox.appendChild(a1);

        const li2 = document.createElement('li');
        li2.className = 'entriesmessage';
        const a2 = document.createElement('a');
        a2.className = 'clickable';
        a2.href = `./viewentry.html?entryId=${entrys.entriesid}`;
        const p2 = document.createElement('p');
        p2.innerText = entrys.entry.slice(0, 15);
        a2.appendChild(p2);
        li2.appendChild(a2);

        const li3 = document.createElement('li');
        li3.className = 'entriestimestamp';
        const p3 = document.createElement('p');
        p3.innerText = entrys.timecreated;
        li3.appendChild(p3);

        const li4 = document.createElement('li');
        li4.className = 'entriesaction';
        const div1 = document.createElement('div');
        div1.className = 'autohide';
        const a4 = document.createElement('a');
        a4.href = `./modifyentry.html?entryId=${entrys.entriesid}`;
        const modifyButton = document.createElement('Button');
        modifyButton.className = 'sucess';
        modifyButton.textContent = 'modify';
        a4.appendChild(modifyButton);
        const a5 = document.createElement('a');
        a5.href = '';
        const deleteButton = document.createElement('Button');
        deleteButton.className = 'danger';
        deleteButton.className = 'danger';
        deleteButton.textContent = 'delete';
        a5.appendChild(deleteButton);
        div1.appendChild(a4);
        div1.appendChild(a5);
        li4.appendChild(div1);

        ulBox.appendChild(liBox);
        ulBox.appendChild(li2);
        ulBox.appendChild(li3);
        ulBox.appendChild(li4);
        const allEntriesBox = document.querySelector('.allentries');
        allEntriesBox.appendChild(ulBox);
      });
    }
  });
const deleteButton1 = document.querySelector('.delete');

const deleteFunction = () => {
  const stringEntryId = url.split('?')[1].replace('entryId=', '');
  const entryId = parseInt(stringEntryId, 10);
  fetch(`${baseAPI}/entries/${entryId}`, {
    METHOD: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      token: localStorage.getItem('token'),
    },
  })
    .then(response => response.json())
    .then((resultObject) => {
      console.log(resultObject);
      console.log('I clicked the delete function');
    });
};
deleteButton1.addEventListener('click', deleteFunction);

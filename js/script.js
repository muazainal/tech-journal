document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById('title-input');
  const contentInput = document.getElementById('content-input');
  const tagsInput = document.getElementById('tags-input');
  const addButton = document.getElementById('add-button');
  const entryList = document.getElementById('entry-list');
  const searchInput = document.getElementById('search-input');

  let entries = JSON.parse(localStorage.getItem('techJournal')) || [];

  function renderEntries(filtered = entries) {
    entryList.innerHTML = '';
    filtered.forEach((entry, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${entry.title}</h3>
        <p>${entry.content}</p>
        <div class="tags">Tags: ${entry.tags}</div>
        <button onclick="deleteEntry(${index})">Delete</button>
      `;
      entryList.appendChild(li);
    });
  }

  addButton.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const tags = tagsInput.value.trim();
    if (title && content) {
      entries.push({ title, content, tags, date: new Date().toLocaleDateString() });
      localStorage.setItem('techJournal', JSON.stringify(entries));
      renderEntries();
      titleInput.value = contentInput.value = tagsInput.value = '';
    }
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = entries.filter(entry => 
      entry.title.toLowerCase().includes(query) || entry.content.toLowerCase().includes(query) || entry.tags.toLowerCase().includes(query)
    );
    renderEntries(filtered);
  }document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById('title-input');
  const contentInput = document.getElementById('content-input');
  const tagsInput = document.getElementById('tags-input');
  const addButton = document.getElementById('add-button');
  const entryList = document.getElementById('entry-list');
  const searchInput = document.getElementById('search-input');

  let entries = JSON.parse(localStorage.getItem('techJournal')) || [];

  function renderEntries(filtered = entries) {
    entryList.innerHTML = '';
    filtered.forEach((entry, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${entry.title}</h3>
        <p>${entry.content}</p>
        <div class="tags">Tags: ${entry.tags}</div>
        <button onclick="deleteEntry(${index})">Delete</button>
      `;
      entryList.appendChild(li);
    });
  }

  addButton.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const tags = tagsInput.value.trim();
    if (title && content) {
      entries.push({ title, content, tags, date: new Date().toLocaleDateString() });
      localStorage.setItem('techJournal', JSON.stringify(entries));
      renderEntries();
      titleInput.value = contentInput.value = tagsInput.value = '';
    }
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = entries.filter(entry => 
      entry.title.toLowerCase().includes(query) || entry.content.toLowerCase().includes(query) || entry.tags.toLowerCase().includes(query)
    );
    renderEntries(filtered);
  });

  window.deleteEntry = (index) => {
    entries.splice(index, 1);
    localStorage.setItem('techJournal', JSON.stringify(entries));
    renderEntries();
  };

  renderEntries(); // Load on start
}););

  window.deleteEntry = (index) => {
    entries.splice(index, 1);
    localStorage.setItem('techJournal', JSON.stringify(entries));
    renderEntries();
  };

  renderEntries(); // Load on start
});

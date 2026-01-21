document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById('title-input');
  const contentInput = document.getElementById('content-input');
  const tagsInput = document.getElementById('tags-input');
  const addButton = document.getElementById('add-button');
  const entryList = document.getElementById('entry-list');
  const searchInput = document.getElementById('search-input');

  let entries = JSON.parse(localStorage.getItem('techJournal')) || [];

  const renderEntries = (filteredEntries = entries) => {
    entryList.innerHTML = '';

    if (filteredEntries.length === 0) {
      entryList.innerHTML = '<li>No entries found.</li>';
      return;
    }

    filteredEntries.forEach((entry, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${entry.title}</h3>
        <p>${entry.content}</p>
        <div class="tags">Tags: ${entry.tags}</div>
        <small>${entry.date}</small>
        <button class="delete-button" data-index="${index}">Delete</button>
      `;
      entryList.appendChild(li);
    });

    // Attach delete listeners
    document.querySelectorAll('.delete-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        deleteEntry(e.target.dataset.index);
      });
    });
  };

  const addEntry = () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const tags = tagsInput.value.trim();

    if (!title || !content) {
      alert('Title and content cannot be empty!');
      return;
    }

    entries.push({ title, content, tags, date: new Date().toLocaleDateString() });
    localStorage.setItem('techJournal', JSON.stringify(entries));
    renderEntries();

    titleInput.value = '';
    contentInput.value = '';
    tagsInput.value = '';
  };

  const deleteEntry = (index) => {
    entries.splice(index, 1);
    localStorage.setItem('techJournal', JSON.stringify(entries));
    renderEntries();
  };

  const searchEntries = () => {
    const query = searchInput.value.toLowerCase();
    const filtered = entries.filter(entry =>
      entry.title.toLowerCase().includes(query) ||
      entry.content.toLowerCase().includes(query) ||
      entry.tags.toLowerCase().includes(query)
    );
    renderEntries(filtered);
  };

  addButton.addEventListener('click', addEntry);
  searchInput.addEventListener('input', searchEntries);

  renderEntries();
});

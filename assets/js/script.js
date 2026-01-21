/* Wait until all HTML elements are loaded before running any JS 
This tells the browser: “Wait until all HTML elements are fully loaded, then run the code inside this function.” */
document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------
  // 1️⃣ Grab HTML elements
  // -----------------------------
  const titleInput = document.getElementById('title-input');   // Input for entry title
  const contentInput = document.getElementById('content-input'); // Textarea for entry content
  const tagsInput = document.getElementById('tags-input');     // Input for tags
  const addButton = document.getElementById('add-button');     // Save Entry button
  const entryList = document.getElementById('entry-list');     // <ul> to display entries
  const searchInput = document.getElementById('search-input'); // Search input field

  // -----------------------------
  // 2️⃣ Load existing entries from localStorage
  // -----------------------------
  // Get JSON string from localStorage, parse it into array
  // If nothing exists, start with an empty array
  let entries = JSON.parse(localStorage.getItem('techJournal')) || [];

  // -----------------------------
  // 3️⃣ Function to render entries in the <ul>
  // -----------------------------
  function renderEntries(filtered = entries) {
    // Clear the list first
    entryList.innerHTML = '';

    // Loop through entries (or filtered entries if searching)
    filtered.forEach((entry, index) => {
      // Create a new <li> element
      const li = document.createElement('li');

      // Fill <li> with HTML content for the entry
      li.innerHTML = `
        <h3>${entry.title}</h3>
        <p>${entry.content}</p>
        <div class="tags">Tags: ${entry.tags}</div>
        <small>Date: ${entry.date}</small>
        <button onclick="deleteEntry(${index})">Delete</button>
      `;

      // Add the <li> to the <ul> in HTML
      entryList.appendChild(li);
    });
  }

  // -----------------------------
  // 4️⃣ Add button click event
  // -----------------------------
  addButton.addEventListener('click', () => {
    // Get values from inputs and remove extra spaces
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const tags = tagsInput.value.trim();

    // Only save if title AND content are not empty
    if (title && content) {
      // Add new entry object to the entries array
      entries.push({
        title: title,
        content: content,
        tags: tags,
        date: new Date().toLocaleDateString() // Add current date
      });

      // Save updated array into localStorage as a JSON string
      localStorage.setItem('techJournal', JSON.stringify(entries));

      // Re-render entries to show the new one
      renderEntries();

      // Clear input fields for next entry
      titleInput.value = '';
      contentInput.value = '';
      tagsInput.value = '';
    }
  });

  // -----------------------------
  // 5️⃣ Search functionality
  // -----------------------------
  searchInput.addEventListener('input', () => {
    // Get the search query, convert to lowercase
    const query = searchInput.value.toLowerCase();

    // Filter entries where title, content, or tags include the query
    const filtered = entries.filter(entry => 
      entry.title.toLowerCase().includes(query) || 
      entry.content.toLowerCase().includes(query) || 
      entry.tags.toLowerCase().includes(query)
    );

    // Render only the filtered entries
    renderEntries(filtered);
  });

  // -----------------------------
  // 6️⃣ Delete entry function
  // -----------------------------
  // Must attach to window so <button onclick="deleteEntry()"> works
  window.deleteEntry = (index) => {
    // Remove the entry at the given index
    entries.splice(index, 1);

    // Update localStorage after deletion
    localStorage.setItem('techJournal', JSON.stringify(entries));

    // Re-render list to reflect deletion
    renderEntries();
  };

  // -----------------------------
  // 7️⃣ Initial render when page loads
  // -----------------------------
  renderEntries(); // Show all saved entries immediately
});
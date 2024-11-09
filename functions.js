// Load books from localStorage or initialize an empty array
let books = JSON.parse(localStorage.getItem('books')) || [];

// Save books to localStorage
function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

// Function to add a new book
function addBook(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const publicationDate = document.getElementById('publicationDate').value;

    if (title && author && genre && publicationDate) {
        const newBook = { title, author, genre, publicationDate };
        books.push(newBook);
        saveBooks();
        renderBooks();
        clearForm();
        alert('Book added successfully!');
    } else {
        alert('Please fill out all fields.');
    }
}

// Function to delete a book
function deleteBook(index) {
    books.splice(index, 1);
    saveBooks();
    renderBooks();
}

// Function to edit a book
function editBook(index) {
    const book = books[index];
    const newTitle = prompt('Enter new title:', book.title) || book.title;
    const newAuthor = prompt('Enter new author:', book.author) || book.author;
    const newGenre = prompt('Enter new genre:', book.genre) || book.genre;
    const newPublicationDate = prompt('Enter new publication date:', book.publicationDate) || book.publicationDate;

    if (newTitle && newAuthor && newGenre && newPublicationDate) {
        books[index] = { title: newTitle, author: newAuthor, genre: newGenre, publicationDate: newPublicationDate };
        saveBooks();
        renderBooks();
    } else {
        alert('Please fill out all fields.');
    }
}

// Function to populate the edit dropdown and load selected book details
function populateEditDropdown() {
    const selectBook = document.getElementById('selectBook');
    selectBook.innerHTML = '<option value="">-- Select a Book --</option>';
    books.forEach((book, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = book.title;
        selectBook.appendChild(option);
    });
}

// Load book details into form fields for editing
function loadBookDetails() {
    const selectBook = document.getElementById('selectBook').value;
    if (selectBook !== "") {
        const book = books[selectBook];
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('genre').value = book.genre;
        document.getElementById('publicationDate').value = book.publicationDate;
    }
}

// Function to update the book after editing
function updateBook(event) {
    event.preventDefault();
    const index = document.getElementById('selectBook').value;
    if (index !== "") {
        books[index] = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            genre: document.getElementById('genre').value,
            publicationDate: document.getElementById('publicationDate').value
        };
        saveBooks();
        renderBooks();
        alert('Book updated successfully!');

        // Reload the page to reflect the updated data in all lists
        window.location.reload();
    } else {
        alert('Please select a book to edit.');
    }
}

// Function to render the list of books
function renderBooks() {
    const bookList = document.getElementById('bookList');
    if (bookList) {
        bookList.innerHTML = ''; // Clear current list
        books.forEach((book) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${book.title} by ${book.author}`;
            bookList.appendChild(listItem);
        });
    }


     // Render on Manage Books page (Inventory table)
     const bookTable = document.getElementById('bookTable')?.querySelector('tbody');
     if (bookTable) {
         bookTable.innerHTML = ''; // Clear current table
         books.forEach((book, index) => {
             const row = document.createElement('tr');
             row.innerHTML = `
                 <td>${book.title}</td>
                 <td>${book.author}</td>
                 <td>${book.genre}</td>
                 <td>${book.publicationDate}</td>
                 <td>
                     <button onclick="editBook(${index})">Edit</button>
                     <button onclick="deleteBook(${index})">Delete</button>
                 </td>`;
             bookTable.appendChild(row);
         });
     }
 }

// Function to clear form fields after adding a book
function clearForm() {
    document.getElementById('addBookForm').reset();
    if (document.getElementById('editBookForm')) {
        document.getElementById('editBookForm').reset();
    }
}

// Initialize page
function initPage() {
    renderBooks();
    populateEditDropdown();
}

// Event Listeners
if (document.getElementById('addBookForm')) {
    document.getElementById('addBookForm').addEventListener('submit', addBook);
}
if (document.getElementById('editBookForm')) {
    document.getElementById('editBookForm').addEventListener('submit', updateBook);
}
if (document.getElementById('selectBook')) {
    document.getElementById('selectBook').addEventListener('change', loadBookDetails);
}

// Load books on page load
window.addEventListener('load', initPage);
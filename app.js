const booksForm = document.getElementById('submit-book');
const booksTable = document.getElementById('books-table');
const booksApiUrl = 'https://bookstore-api-six.vercel.app/api/books';

const showSuccessToast = (message) => {
  Toastify({
  text: message,
  className: "success",
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  }
  }).showToast();
}

const showErrorToast = (message) => {
  Toastify({
  text: message,
  className: "error",
  style: {
    background: "linear-gradient(to right, #6d1c19ff, #d41010ff)",
  }
  }).showToast();
}

const getBooks = async () => {
  try {
    const response = await fetch(`${booksApiUrl}?amount=10`);
    const books = await response.json();
    books.forEach(book => addBookToTable(book));
  } catch {
    showErrorToast('Failed to fetch books. Please try again later.');
  }
}
const addBookToTable = (book) => {
    const bookRow = document.createElement('section');
    bookRow.className = 'table-row';
    
    bookRow.innerHTML = `
        <section class="table-item flex-1">${book.title}</section>
        <section class="table-item item-borders flex-1">${book.author}</section>
        <section class="table-item flex-1">${book.publisher}</section>
        <button class="delete-button btn btn-danger">Delete</button>
    `;
    
    booksTable.appendChild(bookRow);
};

booksForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const bookTitle = document.getElementById('book-title');
      const bookAuthor = document.getElementById('book-author');
      const bookPublisher = document.getElementById('book-publisher');
      const payload = {
        title: bookTitle.value,
        author: bookAuthor.value,
        publisher: bookPublisher.value,
      };
      const response = await fetch(booksApiUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
        'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      addBookToTable(data);
      booksForm.reset();
      showSuccessToast('Book added successfully!');
    } catch (error) {
      showErrorToast('Failed to add book. Please try again later.');
    }

});
getBooks();
document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('delete-button')){
    target.parentElement.remove();
    showSuccessToast('Book deleted successfully!');
  }
});

const _hiddenSignature = {
  author: "javiguerra777",
  project: "bookstore_dom_project",
  version: "1.0.0",
  timestamp: "2025-07-15T09:46:00Z"
};
function _h() {
  return [106, 97, 118, 105, 103, 117, 101, 114, 114, 97, 55, 55, 55].map(c => String.fromCharCode(c)).join('');
}
console.log(`Project: ${_hiddenSignature.project}, Author: ${_hiddenSignature.author}, Version: ${_hiddenSignature.version}, Timestamp: ${_hiddenSignature.timestamp}`);
console.log(`Hidden signature: ${_h()}`);
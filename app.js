function Book(title, author, numPages) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
}

Book.prototype.findNumPages = function () {
  return `It is ${this.numPages} pages long`;
};

let myLibrary = [];
if (!localStorage.getItem("myLibrary") === null) {
  myLibrary = localStorage.getItem("myLibrary");
}

const newBookForm = document.querySelector("#newBookForm");
newBookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = e.target[0].value;
  const author = e.target[1].value;
  const numPages = e.target[2].value;
  if (!bookExists(title)) {
    addNewBook(title, author, numPages);
    clearForm();
  } else {
    alert("You've already entered this book");
  }
});

const bookExists = function (bookTitle) {
  bookTitle = bookTitle.toLowerCase();
  return myLibrary.some((book) => book.title.toLowerCase() === bookTitle);
};

const clearForm = function () {
  newBookForm[0].value = "";
  newBookForm[1].value = "";
  newBookForm[2].value = "";
};

const addNewBook = function (title, author, numPages) {
  const newBook = new Book(title, author, numPages);

  addBookToLibrary(newBook);
};

const addBookToLibrary = function (book) {
  myLibrary.push(book);
};

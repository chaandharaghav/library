// object constructor
function Book(title, author, numPages) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
}

Book.prototype.findNumPages = function () {
  return `It is ${this.numPages} pages long`;
};

// retrieve any stored books
let myLibrary = [];
if (localStorage.getItem("myLibrary") !== null) {
  let storedValue = JSON.parse(localStorage.getItem("myLibrary"));
  //we are storing an array of objects, so if only an object is stored
  // push it into any array
  if (storedValue.length === undefined) {
    myLibrary.push(storedValue);
  } else {
    myLibrary = storedValue;
  }
}

// create card for displaying the books
const createCard = function () {
  const book = document.createElement("div");
  book.classList.add("book");

  // information section

  const information = document.createElement("div");
  information.classList.add("information");

  const heading = document.createElement("h2");
  heading.innerText = "The Bobbit";

  const author = document.createElement("p");
  author.classList.add("author");
  author.innerText = "JRR Tolkien";

  const numPages = document.createElement("p");
  numPages.classList.add("numPages");
  numPages.innerText = `295`;

  // footer section

  const footer = document.createElement("div");
  footer.classList.add("footer");

  const isRead = document.createElement("button");
  isRead.classList.add("isRead", "complete");
  isRead.innerText = "Completed";

  const removeBook = document.createElement("button");
  removeBook.classList.add("removeBook");
  removeBook.innerText = "Remove";

  //adding heading, author and numPages to information section
  information.appendChild(heading);
  information.appendChild(author);
  information.appendChild(numPages);

  // adding isRead and removeBook to footer section
  footer.appendChild(isRead);
  footer.appendChild(removeBook);

  book.appendChild(information);
  book.appendChild(footer);

  return book;
};

// new book form controls
const newBookForm = document.querySelector("#newBookForm");
newBookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = e.target[0].value;
  const author = e.target[1].value;
  const numPages = e.target[2].value;
  // if (!bookExists(title)) {
  //   addNewBook(title, author, numPages);
  //   clearForm();
  // } else {
  //   alert("You've already entered this book");
  // }
  addNewBook(title, author, numPages);
  clearForm();
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

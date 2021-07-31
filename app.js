// object constructor
function Book(title, author, numPages, complete) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.completed = complete ?? true;
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

// if no books are there, display message in booksList section
if (myLibrary.length === 0) {
  booksList.innerText = "No books in your library";
  booksList.classList.add("large-text");
}

// create card for displaying the books
const createCard = function (bookObj) {
  const book = document.createElement("div");
  book.classList.add("book");

  // information section

  const information = document.createElement("div");
  information.classList.add("information");

  const heading = document.createElement("h2");
  heading.innerText = bookObj.title;

  const author = document.createElement("p");
  author.classList.add("author");
  author.innerText = "by " + bookObj.author;

  const numPages = document.createElement("p");
  numPages.classList.add("numPages");
  numPages.innerText = `It is ${bookObj.numPages} pages long`;

  // footer section

  const footer = document.createElement("div");
  footer.classList.add("footer");

  const isRead = document.createElement("button");
  isRead.classList.add("isRead");
  if (bookObj.completed) {
    isRead.innerText = "Completed";
    isRead.classList.add("complete");
  } else {
    isRead.innerText = "Incomplete";
    isRead.classList.add("incomplete");
  }

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

// on page load, create and display existing books
document.addEventListener("DOMContentLoaded", function () {
  const booksList = document.querySelector("#booksList");
  for (let book of myLibrary) {
    const bookCard = createCard(book);
    booksList.appendChild(bookCard);
  }
});

// new book form controls
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

  addToList(newBook);
  addBookToLibrary(newBook);
};

const addToList = function (newBook) {
  const bookCard = createCard(newBook);
  // update booksList section when a book is added
  if (myLibrary.length === 0) {
    booksList.innerText = "";
    booksList.classList.remove("large-text");
  }
  booksList.appendChild(bookCard);
};

const addBookToLibrary = function (book) {
  myLibrary.push(book);
  updateLocalStorage();
};

const updateLocalStorage = function () {
  const stringified = JSON.stringify(myLibrary);
  localStorage.setItem("myLibrary", stringified);
};

// change bookRead status
booksList.addEventListener("click", function (e) {
  if (e.target.classList.contains("isRead")) {
    changeReadStatus(e.target);
  } else if (e.target.classList.value === "removeBook") {
    deleteBook(e.target);
  }
});

const changeReadStatus = function (target) {
  // changing dom
  if (target.innerText === "Completed") {
    target.innerText = "Incomplete";
    target.classList.remove("complete");
    target.classList.add("incomplete");
  } else {
    target.innerText = "Completed";
    target.classList.remove("incomplete");
    target.classList.add("complete");
  }

  // updating local storage
  const bookElement = findBookElement(findBookName(target));
  bookElement.completed = !bookElement.completed;
  updateLocalStorage();
};

const findBookName = function (target) {
  return target.parentNode.parentNode.children[0].children[0].innerText;
};

const deleteBook = function (target) {
  const bookName = findBookName(target);
  //removing from dom
  target.parentNode.parentNode.remove();

  const bookElement = findBookElement(bookName);

  // updating local storage
  myLibrary.splice(myLibrary.indexOf(bookElement));
  updateLocalStorage();
};

const findBookElement = function (bookName) {
  return myLibrary.find((book) => book.title.trim() === bookName.trim());
};

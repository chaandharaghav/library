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

  console.log(title, author, numPages);
});

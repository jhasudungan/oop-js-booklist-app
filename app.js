// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  // Create tr and td element
  const row = document.createElement("tr"),
    col1 = document.createElement("td"),
    col2 = document.createElement("td"),
    col3 = document.createElement("td"),
    col4 = document.createElement("td");

  // Button
  const link = document.createElement("a");
  link.className = "button button-primary";
  link.textContent = "Delete";
  link.href = "#";

  col1.append(document.createTextNode(book.title));
  col2.append(document.createTextNode(book.author));
  col3.append(document.createTextNode(book.isbn));
  col4.appendChild(link);

  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);
  row.appendChild(col4);

  list.appendChild(row);
};

UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.showAlert = function (message, className) {
  // Create the alert element
  const div = document.createElement("div");
  div.className = `alert ${className}`;

  div.appendChild(document.createTextNode(message));

  // Get the parrent for child
  const container = document.querySelector(".container");

  const form = document.querySelector("#book-form");

  container.insertBefore(div, form);

  // Clear alert
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get The Form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  // Instancetiate the UI Object
  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success alert
    ui.showAlert("Book Added!", "success");

    // Clear Field
    ui.clearFields();
  }
});

// Event Listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  e.preventDefault();

  // Instancetiate the UI Object
  const ui = new UI();

  ui.deleteBook(e.target);

  // Show Alert
  ui.showAlert("Book removed!", "success");
});

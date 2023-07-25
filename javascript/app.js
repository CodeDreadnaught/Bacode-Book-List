import { BookList, UIList, BookListInLocalStorage } from "./script.js"; 

const appForm = document.querySelector(".app-form"),
list = document.querySelector(".book-list");

(function loadAllEventListners() {
    appForm.addEventListener("submit", getUIDetails);
    list.addEventListener("click", deleteCurrentBook);
    document.addEventListener("DOMContentLoaded", BookListInLocalStorage.displayBookListFromLocalStorage());
}) ();
function getUIDetails(e) {
    e.preventDefault();

    const title = document.querySelector(".form-title").value,
    author = document.querySelector(".form-author").value,
    isbn = document.querySelector(".form-isbn").value;

    const currentBook = new BookList(title, author, isbn),
    addCurrentBookToUI = new UIList();

    addCurrentBookToUI.addBookList(currentBook);
    BookListInLocalStorage.addBookListToLocalStorage(currentBook);
    addCurrentBookToUI.clearInputs();
    addCurrentBookToUI.displayAlert("Your book has been added to the Book List.", "success-notification");
}
function deleteCurrentBook(e) {
    e.preventDefault();

    const addCurrentBookToUI = new UIList();

    addCurrentBookToUI.deleteBook(e.target);
    BookListInLocalStorage.deleteBookListFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);
}
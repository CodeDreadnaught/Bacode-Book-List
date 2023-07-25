class BookList {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UIList {
    addBookList(book) {
        const list = document.querySelector(".book-list"),
        tableRow = document.createElement("tr");

        tableRow.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete-icon">X</a></td>
        `;

        list.appendChild(tableRow);
    }
    clearInputs() {
        document.querySelector(".form-title").value = "",
        document.querySelector(".form-author").value = "",
        document.querySelector(".form-isbn").value = "";
    }
    displayAlert(message, className) {
        const alertSection = document.createElement("div"),
        alertMessage = document.createTextNode(message),
        appWrapper = document.querySelector(".app-wrapper"),
        appForm = document.querySelector(".app-form");

        alertSection.className = `alert ${className}`;
        alertSection.appendChild(alertMessage);
        appWrapper.insertBefore(alertSection, appForm);

        setTimeout(()=> {
            alertSection.remove();
        }, 1000);
    }
    deleteBook(target) {
        const addCurrentBookToUI = new UIList();

        if(target.className === "delete-icon") {
            target.parentElement.parentElement.remove();
            addCurrentBookToUI.displayAlert("Book removed.", "delete-notification");
        }
    }
}
class BookListInLocalStorage {
    static addBookListToLocalStorage(currentBook) {
        const getBookListFromLocalStorage = BookListInLocalStorage.getBookListFromLocalStorage();

        getBookListFromLocalStorage.push(currentBook);
        localStorage.setItem("book-list", JSON.stringify(getBookListFromLocalStorage));
    }
    static displayBookListFromLocalStorage() {
        const getBookListFromLocalStorage = BookListInLocalStorage.getBookListFromLocalStorage();

        getBookListFromLocalStorage.forEach((current)=> {
            const addCurrentBookToUI = new UIList();

            addCurrentBookToUI.addBookList(current);
        });
    }
    static getBookListFromLocalStorage() {
        let booklistFromLocalStorage;

        if(localStorage.getItem("book-list") === null) {
            booklistFromLocalStorage = [ ];
        } else {
            booklistFromLocalStorage = JSON.parse(localStorage.getItem("book-list"));
        }

        return booklistFromLocalStorage;
    }
    static deleteBookListFromLocalStorage(isbn) {
        const getBookListFromLocalStorage = BookListInLocalStorage.getBookListFromLocalStorage();

        getBookListFromLocalStorage.forEach((current, index)=> {
            if(current.isbn === isbn) {
                getBookListFromLocalStorage.splice(index, 1);
            }
        });

        localStorage.setItem("book-list", JSON.stringify(getBookListFromLocalStorage));
    }
}

export { BookList, UIList, BookListInLocalStorage };
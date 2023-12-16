// Get the objects we need to modify

let searchBook = document.getElementById('search-book');

// Modify the objects we need
searchBook.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let bookTitle = document.getElementById("search_bookTitle");

    // Get the values from the form fields
    let bookTitleValue = bookTitle.value;

    // Put our data we want to send in a javascript object
    let data = {
        book_title: bookTitleValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/search_book", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Display Filtered Book Titles
            displayRows(xhttp.response);

            // Clear the input fields for another transaction
            search_bookTitle.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})


// Creates a single row from an Object representing a single record
displayRows = (data) => {
    let parsedData = JSON.parse(data);
    let tableBody = document.getElementById("booksTableBody");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Add rows for each book that matches the search title
    parsedData.forEach(book => {
        let row = document.createElement("tr");
        row.setAttribute("data-value", book.book_id);

        let bookIdCell = document.createElement("td");
        bookIdCell.textContent = book.book_id;
        row.appendChild(bookIdCell);

        let bookIsbnCell = document.createElement("td");
        bookIsbnCell.textContent = book.book_isbn;
        row.appendChild(bookIsbnCell);

        let bookTitleCell = document.createElement("td");
        bookTitleCell.textContent = book.book_title;
        row.appendChild(bookTitleCell);

        let bookPublishDateCell = document.createElement("td");
        bookPublishDateCell.textContent = book.book_publish_date;
        row.appendChild(bookPublishDateCell);

        let bookInventoryCell = document.createElement("td");
        bookInventoryCell.textContent = book.book_inventory;
        row.appendChild(bookInventoryCell);

        let bookUnitPriceCell = document.createElement("td");
        bookUnitPriceCell.textContent = book.book_unit_price;
        row.appendChild(bookUnitPriceCell);

        let genreIdCell = document.createElement("td");
        genreIdCell.textContent = book.genre_id;
        row.appendChild(genreIdCell);

        let deleteButtonCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", function () {
            deleteBook(book.book_id);
        });
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        // Append the new row to the table body
        tableBody.appendChild(row);
    });
}
// Code Citation:
// OSU nodejs-starter-app Github.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
// Citation Scope: All functions in the file
// Use: Based on the CS 340 Starter App; Adapted for this project
// Date: 8/13/23

// Get the objects we need to modify
let createBook = document.getElementById('create-book');

// Modify the objects we need
createBook.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let bookISBN = document.getElementById("bookISBN");
    let bookTitle = document.getElementById("bookTitle");
    let authorName = document.getElementById("authorName");
    let publishDate = document.getElementById("publishDate");
    let bookInventory = document.getElementById("bookInventory");
    let unitPrice = document.getElementById("unitPrice");
    let genreName = document.getElementById("genreName");

    // Get the values from the form fields
    let bookISBNValue = bookISBN.value;
    let bookTitleValue = bookTitle.value;
    let authorNameValue = authorName.value;
    let publishDateValue = publishDate.value;
    let bookInventoryValue = bookInventory.value;
    let unitPriceValue = unitPrice.value;
    let genreNameValue = genreName.value;


    // Put our data we want to send in a javascript object
    let data = {
        book_isbn: bookISBNValue,
        book_title: bookTitleValue,
        author_name: authorNameValue,
        book_publish_date: publishDateValue,
        book_inventory: bookInventoryValue,
        book_unit_price: unitPriceValue,
        genre_name: genreNameValue
    }

    // Initialize an empty array to store book_isbn values
    let bookIsbnArray = [];

    // Get the table body element
    const tableBody = document.getElementById("booksTableBody");

    // Loop through each row in the table body
    for (let i = 0; i < tableBody.rows.length; i++) {
        const row = tableBody.rows[i];
        const bookIsbn = row.cells[1].textContent; // Index 1 for ISBN column
        bookIsbnArray.push(bookIsbn);
    }

    for (let i = 0; i < tableBody.rows.length; i++)
    {
        if (data.book_isbn == bookIsbnArray[i])
        {
            alert("Error: Please use a unique ISBN value.");
            return;
        }
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_book", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            bookISBN.value = '';
            bookTitle.value = '';
            authorName.value = '';
            publishDate.value = '';
            bookInventory.value = '';
            unitPrice.value = '';
            genreName.value = '';

            //location.reload(); refreshes page if needed
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("books_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let isbnCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let authorNameCell = document.createElement("TD");
    let publishdateCell = document.createElement("TD");
    let inventoryCell = document.createElement("TD");
    let unitpriceCell = document.createElement("TD");
    let genreNameCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.book_id;
    isbnCell.innerText = newRow.book_isbn;
    titleCell.innerText = newRow.book_title;
    authorNameCell.innerText = newRow.author_name;
    publishdateCell.innerText = newRow.book_publish_date;
    inventoryCell.innerText = newRow.book_inventory;
    unitpriceCell.innerText = newRow.book_unit_price;
    genreNameCell.innerText = newRow.genre_name;
    
    // Create the delete button element
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "delete";
    deleteButton.onclick = function() {
        deleteBook(newRow.book_id);
    };

    // Append the deleteButton to the deleteCell
    deleteCell.appendChild(deleteButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(isbnCell);
    row.appendChild(titleCell);
    row.appendChild(authorNameCell);
    row.appendChild(publishdateCell);
    row.appendChild(inventoryCell);
    row.appendChild(unitpriceCell);
    row.appendChild(genreNameCell);
    row.appendChild(deleteCell);
    
    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.book_id);

    // Add the row to the table
    currentTable.appendChild(row);
    
    // Find drop down menu, create a new option, fill data in the option
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("update_bookID");
    let option = document.createElement("option");
    option.text = newRow.book_id;
    option.value = newRow.book_id;
    selectMenu.add(option);
}
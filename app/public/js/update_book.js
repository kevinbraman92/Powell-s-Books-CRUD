// Code Citation:
// OSU nodejs-starter-app Github.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
// Citation Scope: All functions in the file
// Use: Based on the CS 340 Starter App; Adapted for this project
// Date: 8/13/23

// Get the objects we need to modify
let updateBook = document.getElementById('update-book');

// Modify the objects we need
updateBook.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let updateBookID = document.getElementById("update_bookID");
    let updateBookISBN = document.getElementById("update_bookISBN");
    let updateBookTitle = document.getElementById("update_bookTitle");
    let updateAuthorName = document.getElementById("update_authorName");
    let updatePublishDate = document.getElementById("update_publishDate");
    let updateBookInventory = document.getElementById("update_bookInventory");
    let updateUnitPrice = document.getElementById("update_unitPrice");
    let updateGenreName = document.getElementById("update_genreName");

    // Get the values from the form fields
    let bookIDValue = updateBookID.value;
    let bookISBNValue = updateBookISBN.value;
    let bookTitleValue = updateBookTitle.value;
    let authorNameValue = updateAuthorName.value;
    let publishDateValue = updatePublishDate.value;
    let bookInventoryValue = updateBookInventory.value;
    let unitPriceValue = updateUnitPrice.value;
    let genreNameValue = updateGenreName.value;

    // Put our data we want to send in a javascript object
    let data = {
        book_id: bookIDValue,
        book_isbn: bookISBNValue,
        book_title: bookTitleValue,
        author_name: authorNameValue,
        book_publish_date: publishDateValue,
        book_inventory: bookInventoryValue,
        book_unit_price: unitPriceValue,
        genre_name: genreNameValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update_book", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, bookIDValue, data);

            //Clear the input fields for another transaction
            updateBookID.value = '';
            updateBookISBN.value = '';
            updateBookTitle.value = '';
            updateAuthorName.value = '';
            updatePublishDate.value = '';
            updateBookInventory.value = '';
            updateUnitPrice.value = '';
            updateGenreName.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function updateRow(data, book_id, object){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("books_table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == book_id) {

            // Get the location of the row where we found the matching book ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let tdBookISBN = updateRowIndex.getElementsByTagName("td")[1];
            tdBookISBN.innerHTML = object.book_isbn;

            let tdBookTitle = updateRowIndex.getElementsByTagName("td")[2];
            tdBookTitle.innerHTML = object.book_title;

            let tdAuthorName = updateRowIndex.getElementsByTagName("td")[3];
            tdAuthorName.innerHTML = object.author_name;

            let tdBookPublishDate = updateRowIndex.getElementsByTagName("td")[4];
            tdBookPublishDate.innerHTML = object.book_publish_date;

            let tdBookInventory = updateRowIndex.getElementsByTagName("td")[5];
            tdBookInventory.innerHTML = object.book_inventory;

            let tdBookUnitPrice = updateRowIndex.getElementsByTagName("td")[6];
            tdBookUnitPrice.innerHTML = object.book_unit_price;

            let tdGenreName = updateRowIndex.getElementsByTagName("td")[7];
            tdGenreName.innerHTML = object.genre_name;
        }
    }
}



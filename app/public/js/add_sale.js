// Code Citation:
// OSU nodejs-starter-app Github.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
// Citation Scope: All functions in the file
// Use: Based on the CS 340 Starter App; Adapted for this project
// Date: 8/13/23

// Get the objects we need to modify
let createSale = document.getElementById('create-sale');

// Modify the objects we need
createSale.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let bookTitle = document.getElementById("bookTitle");
    let customerName = document.getElementById("customerName");
    let saleAmount = document.getElementById("saleAmount");
    let saleDate = document.getElementById("saleDate");
    let saleQuantity = document.getElementById("saleQuantity");

    // Get the values from the form fields
    let bookTitleValue = bookTitle.value;
    let customerNameValue = customerName.value;
    let saleAmountValue = saleAmount.value;
    let saleDateValue = saleDate.value;
    let saleQuantityValue = saleQuantity.value;

    // Put our data we want to send in a javascript object
    let data = {
        book_title: bookTitleValue,
        customer_name: customerNameValue,
        sale_amount: saleAmountValue,
        sale_date: saleDateValue,
        sale_quantity: saleQuantityValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_sale", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            bookTitle.value = '';
            customerName.value = '';
            saleAmount.value = '';
            saleDate.value = '';
            saleQuantity.value = '';

            //location.reload(); refreshes page if needed
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    //console.log("TESTING");
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("sales-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let book_TitleCell = document.createElement("TD");
    let customer_NameCell = document.createElement("TD");
    let sale_amountCell = document.createElement("TD");
    let sale_dateCell = document.createElement("TD");
    let sale_quantityCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.sale_id;
    book_TitleCell.innerText = newRow.book_title;
    customer_NameCell.innerText = newRow.customer_name;
    sale_amountCell.innerText = newRow.sale_amount;
    sale_dateCell.innerText = newRow.sale_date;
    sale_quantityCell.innerText = newRow.sale_quantity;
    

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(book_TitleCell);
    row.appendChild(customer_NameCell);
    row.appendChild(sale_amountCell);
    row.appendChild(sale_dateCell);
    row.appendChild(sale_quantityCell);
    
    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.sale_id);

    // Add the row to the table
    currentTable.appendChild(row);
}
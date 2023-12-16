// Get the objects we need to modify

let searchSale = document.getElementById('search-sale');

// Modify the objects we need
searchSale.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let saleId = document.getElementById("search_saleId");

    // Get the values from the form fields
    let saleIdValue = saleId.value;

    // Put our data we want to send in a javascript object
    let data = {
        sale_id: saleIdValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/search_sale", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Display Filtered Book Titles
            displayRows(xhttp.response);

            // Clear the input fields for another transaction
            search_saleId.value = '';
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
    let tableBody = document.getElementById("table-rows-update");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Add rows for each book that matches the search title
    parsedData.forEach(sale => {
        let row = document.createElement("tr");
        row.setAttribute("data-value", sale.sale_id);

        let saleIdCell = document.createElement("td");
        saleIdCell.textContent = sale.sale_id;
        row.appendChild(saleIdCell);

        let saleAmountCell = document.createElement("td");
        saleAmountCell.textContent = sale.sale_amount;
        row.appendChild(saleAmountCell);

        let saleDateCell = document.createElement("td");
        saleDateCell.textContent = sale.sale_date;
        row.appendChild(saleDateCell);

        let saleQuantityCell = document.createElement("td");
        saleQuantityCell.textContent = sale.sale_quantity;
        row.appendChild(saleQuantityCell);

        let bookIdCell = document.createElement("td");
        bookIdCell.textContent = sale.book_id;
        row.appendChild(bookIdCell);

        let customerIdCell = document.createElement("td");
        customerIdCell.textContent = sale.customer_id;
        row.appendChild(customerIdCell);

        // Append the new row to the table body
        tableBody.appendChild(row);
    });
}
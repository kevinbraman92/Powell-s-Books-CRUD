// Get the objects we need to modify

let searchCustomer = document.getElementById('search-customer');

// Modify the objects we need
searchCustomer.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let customerName = document.getElementById("search_customerName");

    // Get the values from the form fields
    let customerNameValue = customerName.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_name: customerNameValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/search_customer", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Display Filtered Customer Names
            displayRows(xhttp.response);

            // Clear the input fields for another transaction
            search_customerName.value = '';
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

    // Add rows for each customer that matches the search title
    parsedData.forEach(customer => {
        let row = document.createElement("tr");
        row.setAttribute("data-value", customer.customer_id);

        let customerIdCell = document.createElement("td");
        customerIdCell.textContent = customer.customer_id;
        row.appendChild(customerIdCell);

        let customerNameCell = document.createElement("td");
        customerNameCell.textContent = customer.customer_name;
        row.appendChild(customerNameCell);

        let customerAddressCell = document.createElement("td");
        customerAddressCell.textContent = customer.customer_address;
        row.appendChild(customerAddressCell);

        let customerPhoneCell = document.createElement("td");
        customerPhoneCell.textContent = customer.customer_phone;
        row.appendChild(customerPhoneCell);

        let deleteButtonCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", function () {
            deleteBook(customer.customer_id);
        });
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        // Append the new row to the table body
        tableBody.appendChild(row);
    });
}
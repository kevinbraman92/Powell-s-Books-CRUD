// Code Citation:
// OSU nodejs-starter-app Github.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
// Citation Scope: All functions in the file
// Use: Based on the CS 340 Starter App; Adapted for this project
// Date: 8/13/23

// Get the objects we need to modify
let updateBook = document.getElementById('update-customer');

// Modify the objects we need
updateBook.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let updateCustomerID = document.getElementById("update_customerID");
    let updateCustomerName = document.getElementById("update_customerName");
    let updateCustomerAddress = document.getElementById("update_customerAddress");
    let updateCustomerPhone = document.getElementById("update_customerPhone");

    // Get the values from the form fields
    let customerIDValue = updateCustomerID.value;
    let customerAddressValue = updateCustomerAddress.value;
    let customerNameValue = updateCustomerName.value;
    let customerPhoneValue = updateCustomerPhone.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_id: customerIDValue,
        customer_name: customerNameValue,
        customer_address: customerAddressValue,
        customer_phone: customerPhoneValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update_customer", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, customerIDValue, data);

            //Clear the input fields for another transaction
            updateCustomerID.value = '';
            updateCustomerAddress.value = '';
            updateCustomerName.value = '';
            updateCustomerPhone.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function updateRow(data, customer_id, object){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("customers_table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == customer_id) {

            // Get the location of the row where we found the matching book ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let tdCustomerName = updateRowIndex.getElementsByTagName("td")[1];
            tdCustomerName.innerHTML = object.customer_name;

            let tdCustomerAddress = updateRowIndex.getElementsByTagName("td")[2];
            tdCustomerAddress.innerHTML = object.customer_address;

            let tdCustomerPhone = updateRowIndex.getElementsByTagName("td")[3];
            tdCustomerPhone.innerHTML = object.customer_phone;
        }
    }
}



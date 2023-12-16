// Code Citation:
// OSU nodejs-starter-app Github.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
// Citation Scope: All functions in the file
// Use: Based on the CS 340 Starter App; Adapted for this project
// Date: 8/13/23

// code for deleteBook function using jQuery
function deleteCustomer(customer_id) {
    let link = '/delete_customer';
    let data = {
    customer_id: customer_id
};

$.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function(result) {
    deleteRow(customer_id);
    },
    error: function(xhr, status, error) {
    alert("Error: Cannot delete customer because it is associated with a sale.");
    }
});
}
  
function deleteRow(customer_id) {

    let table = document.getElementById("customers_table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == customer_id) {
        table.deleteRow(i);
        deleteDropDownMenu(customer_id);
        break;
        }
    }
}

function deleteDropDownMenu(customer_id) {
    let selectMenu = document.getElementById("update_customerID"); //change in hbs
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(customer_id)) {
            selectMenu[i].remove();
            break;
        }
    }
}
// Code Citation:
// OSU nodejs-starter-app Github.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
// Citation Scope: All functions in the file
// Use: Based on the CS 340 Starter App; Adapted for this project
// Date: 8/13/23

// Get the objects we need to modify
let createGenre = document.getElementById('add-genre');

// Modify the objects we need
createGenre.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let genreName = document.getElementById("genreName");

    // Get the values from the form fields
    let genreNameValue = genreName.value;


    // Put our data we want to send in a javascript object
    let data = {
        genre_name: genreNameValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_genre", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
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
    let currentTable = document.getElementById("genres_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let genre_nameCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.genre_id;
    genre_nameCell.innerText = newRow.genre_name;
    
    // Create the delete button element
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "delete";
    deleteButton.onclick = function() {
        deleteGenre(newRow.genre_id);
    };

    // Append the deleteButton to the deleteCell
    deleteCell.appendChild(deleteButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(genre_nameCell);
    row.appendChild(deleteCell);
    
    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.genre_id);

    // Add the row to the table
    currentTable.appendChild(row);
}
// Get the objects we need to modify

let searchBook = document.getElementById('search-author');

// Modify the objects we need
searchBook.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let authorName = document.getElementById("search_authorName");

    // Get the values from the form fields
    let authorNameValue = authorName.value;

    // Put our data we want to send in a javascript object
    let data = {
        author_name: authorNameValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/search_author", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Display Filtered Author Names
            displayRows(xhttp.response);

            // Clear the input fields for another transaction
            search_authorName.value = '';
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

    // Add rows for each author that matches the search title
    parsedData.forEach(author => {
        let row = document.createElement("tr");
        row.setAttribute("data-value", author.author_id);

        let authorIdCell = document.createElement("td");
        authorIdCell.textContent = author.author_id;
        row.appendChild(authorIdCell);

        let authorNameCell = document.createElement("td");
        authorNameCell.textContent = author.author_name;
        row.appendChild(authorNameCell);

        let deleteButtonCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", function () {
            deleteBook(author.author_id);
        });
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        // Append the new row to the table body
        tableBody.appendChild(row);
    });
}
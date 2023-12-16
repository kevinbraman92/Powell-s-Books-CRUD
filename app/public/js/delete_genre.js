// Code Citation:
// OSU nodejs-starter-app Github.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
// Citation Scope: All functions in the file
// Use: Based on the CS 340 Starter App; Adapted for this project
// Date: 8/13/23

// code for deleteBook function using jQuery
function deleteGenre(genre_id) {
    let link = '/delete_genre';
    let data = {
    genre_id: genre_id
};
  
$.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function(result) {
    deleteRow(genre_id);
    },
    error: function(xhr, status, error) {
      alert("Error: Cannot delete genre because it is associated with a book.");
    }
});
}
  
//delete row from genres table based on genre_id
function deleteRow(genre_id) {

    let table = document.getElementById("genres_table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == genre_id) {
            table.deleteRow(i);
            break;
        }
    }
}
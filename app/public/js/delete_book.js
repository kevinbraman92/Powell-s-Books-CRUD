// Code Citation:
// OSU nodejs-starter-app Github.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
// Citation Scope: All functions in the file
// Use: Based on the CS 340 Starter App; Adapted for this project
// Date: 8/13/23

// code for deleteBook function using jQuery
function deleteBook(book_id) {
  let link = '/delete_book';
  let data = {
    book_id: book_id
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function(result) {
    deleteRow(book_id);
    },
    error: function(xhr, status, error) {
      alert("Error: Cannot delete book because it is associated with a sale.");
    }
  });
}

//deletes row from books table based on book_id
function deleteRow(book_id) {

    let table = document.getElementById("books_table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == book_id) {
          table.deleteRow(i);
          deleteDropDownMenu(book_id);
          break;
       }
    }
}

//delete book_id from update book drop down menu
function deleteDropDownMenu(book_id) {
    let selectMenu = document.getElementById("update_bookID");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(book_id)) {
            selectMenu[i].remove();
            break;
        }
    }
}
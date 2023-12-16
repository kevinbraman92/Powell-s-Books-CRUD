// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 16914;                //Set a port number at the top so it's easy to change in the future

// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');   // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector.js')

// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));         // this is needed to allow for the form to use the ccs style sheet/javscript

/* Routes */

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index.hbs', function(req, res)
{
    res.render('index', {});
});

app.get('/books.hbs', function(req, res) {
    let query1 = "SELECT B.book_id, B.book_isbn, B.book_title, A.author_name, B.book_publish_date, B.book_inventory, B.book_unit_price, G.genre_name FROM `Books` AS B INNER JOIN Books_has_Authors AS BHA ON B.book_id = BHA.book_id INNER JOIN `Authors` AS A ON BHA.author_id = A.author_id INNER JOIN `Genres` AS G ON B.genre_id = G.genre_id ORDER BY book_id;";

    let query2 = "SELECT author_name FROM `Authors`;"

    let query3 = "SELECT genre_name FROM `Genres`;"

    db.pool.query(query1, function (error1, rows1, fields1) {
        if (error1) {
            console.log(error1);
            res.sendStatus(400);
            return;
        }

        db.pool.query(query2, function (error2, rows2, fields2) {
            if (error2) {
                console.log(error2);
                res.sendStatus(400);
                return;
            }

            db.pool.query(query3, function (error3, rows3, fields3) {
                if (error3) {
                    console.log(error3);
                    res.sendStatus(400);
                    return;
                }
                // Process rows and render the view with the combined data
                res.render('books', { data1: rows1, data2: rows2, data3: rows3});
            });
        });
    });
});

app.get('/authors.hbs', function(req, res)
{
    let query1 = "SELECT * FROM `Authors`;";               // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('authors', { data: rows });                 // Render the authors.hbs file, and also send the renderer
    })      
});

app.get('/genres.hbs', function(req, res)
{
    let query1 = "SELECT * FROM `Genres`;";               // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('genres', { data: rows });                 // Render the genres.hbs file, and also send the renderer
    })      
});

app.get('/customers.hbs', function(req, res)
{
    let query1 = "SELECT * FROM `Customers`;";               // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('customers', { data: rows });                // Render the customers.hbs file, and also send the renderer
    })      
});

app.get('/sales.hbs', function(req, res) {
    let query1 = "SELECT s.sale_id, b.book_title, c.customer_name, s.sale_amount, s.sale_date, s.sale_quantity FROM Sales s JOIN  Books b ON s.book_id = b.book_id JOIN Customers c ON s.customer_id = c.customer_id;"

    let query2 = "SELECT * FROM `Books`;"

    let query3 = "SELECT * FROM `Customers`;"

    db.pool.query(query1, function (error1, rows1, fields1) {
        if (error1) {
            console.log(error1);
            res.sendStatus(400);
            return;
        }

        db.pool.query(query2, function (error2, rows2, fields2) {
            if (error2) {
                console.log(error2);
                res.sendStatus(400);
                return;
            }

            db.pool.query(query3, function (error3, rows3, fields3) {
                if (error3) {
                    console.log(error3);
                    res.sendStatus(400);
                    return;
                }
    
                // Process rows and render the view with the combined data
                res.render('sales', { data1: rows1, data2: rows2, data3: rows3});
            });
        });
    });
});

app.get('/books_authors.hbs', function(req, res)
{
    let query1 = `SELECT bha.book_author_id, b.book_title, a.author_name FROM Books_has_Authors bha JOIN Books b ON bha.book_id = b.book_id JOIN Authors a ON bha.author_id = a.author_id ORDER BY book_author_id`; // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('books_authors', { data: rows });          // Render the books_authors.hbs file, and also send the renderer
    })      
});

app.post('/search_book', function (req, res, next) {
    let data = req.body;

    let book_title = data.book_title;

    let querySearchBook = `SELECT * FROM Books WHERE book_title LIKE '%${book_title}%';`;

    db.pool.query(querySearchBook, function (error, rows, fields) {    // Execute the query
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(rows);
            res.send(rows);
        }
    })      
});

app.post('/search_author', function (req, res, next) {
    let data = req.body;

    let author_name = data.author_name;

    let querySearchAuthor = `SELECT * FROM Authors WHERE author_name LIKE '%${author_name}%';`;

    db.pool.query(querySearchAuthor, function (error, rows, fields) {    // Execute the query
        if (error) {

            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(rows);
            res.send(rows);
        }
    })      
});

app.post('/search_customer', function (req, res, next) {
    let data = req.body;

    let customer_name = data.customer_name;

    let querySearchCustomer = `SELECT * FROM Customers WHERE customer_name LIKE '%${customer_name}%';`;

    db.pool.query(querySearchCustomer, function (error, rows, fields) {    // Execute the query
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(rows);
            res.send(rows);
        }
    })      
});

app.post('/search_sale', function (req, res, next) {
    let data = req.body;

    let sale_id = data.sale_id;

    let querySearchSale = `SELECT * FROM Sales WHERE sale_id LIKE '%${sale_id}%';`;

    db.pool.query(querySearchSale, function (error, rows, fields) {    // Execute the query
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(rows);
            res.send(rows);
        }
    })
});

app.post('/add_book', function (req, res) {
    let data = req.body;
    
    // First, retrieve the genre_id based on the genre_name
    let queryGenreId = `SELECT genre_id FROM Genres WHERE genre_name = ?`;
    db.pool.query(queryGenreId, [data.genre_name], function (error, genreRows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // If genreRows has data, it means the genre_name was found
            if (genreRows.length > 0) {
                let genre_id = genreRows[0].genre_id;

                let queryInsertBook = `INSERT INTO Books (book_isbn, book_title, book_publish_date, book_inventory, book_unit_price, genre_id) 
                                       VALUES (?, ?, ?, ?, ?, ?)`;

                let values = [
                    data.book_isbn,
                    data.book_title,
                    data.book_publish_date,
                    data.book_inventory,
                    data.book_unit_price,
                    genre_id
                ];

                db.pool.query(queryInsertBook, values, function (error, insertRows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        // If insertion was successful, now retrieve the author_id based on author_name
                        let queryAuthorId = `SELECT author_id FROM Authors WHERE author_name = ?`;
                        db.pool.query(queryAuthorId, [data.author_name], function (error, authorRows, fields) {
                            if (error) {
                                console.log(error);
                                res.sendStatus(400);
                            } else {
                                // If authorRows has data, it means the author_name was found
                                if (authorRows.length > 0) {
                                    let author_id = authorRows[0].author_id;

                                    // Insert the book_id and author_id into Books_has_Authors table
                                    let queryInsertBookAuthor = `INSERT INTO Books_has_Authors (book_id, author_id) VALUES (?, ?)`;
                                    db.pool.query(queryInsertBookAuthor, [insertRows.insertId, author_id], function (error, insertAuthorRows, fields) {
                                        if (error) {
                                            console.log(error);
                                            res.sendStatus(400);
                                        } else {
                                            let querySelectBooks = "SELECT B.book_id, B.book_isbn, B.book_title, A.author_name, B.book_publish_date, B.book_inventory, B.book_unit_price, G.genre_name FROM `Books` AS B INNER JOIN Books_has_Authors AS BHA ON B.book_id = BHA.book_id INNER JOIN `Authors` AS A ON BHA.author_id = A.author_id INNER JOIN `Genres` AS G ON B.genre_id = G.genre_id ORDER BY book_id;"    
                                            db.pool.query(querySelectBooks, function (error, selectRows, fields) {
                                                if (error) {
                                                    console.log(error);
                                                    res.sendStatus(400);
                                                } else {
                                                    // Send the updated book list to the client
                                                    res.send(selectRows);
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    // If no author_name was found, return an error response
                                    res.status(400).send("Author not found");
                                }
                            }
                        });
                    }
                });
            } else {
                // If no genre_name was found, return an error response
                res.status(400).send("Genre not found");
            }
        }
    });
});


app.post('/add_author', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO Authors (author_name) VALUES ('${data.author_name}')`;
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT * FROM Authors;`;
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add_genre', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO Genres (genre_name) VALUES ('${data.genre_name}')`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT * FROM Genres;`;
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add_customer', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO Customers (customer_name, customer_address, customer_phone) VALUES ('${data.customer_name}', '${data.customer_address}', '${data.customer_phone}')`;
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add_sale', function (req, res) {
    let data = req.body;

    let queryBookId = `SELECT book_id FROM Books WHERE book_title = ?`;
    db.pool.query(queryBookId, [data.book_title], function(error, bookRows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let book_id = bookRows[0].book_id;

            let queryCustomerId = `SELECT customer_id FROM Customers WHERE customer_name = ?`;
            db.pool.query(queryCustomerId, [data.customer_name], function(error, customerRows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    let customer_id = customerRows[0].customer_id;
                    query1 = `INSERT INTO Sales (sale_amount, sale_date, sale_quantity, book_id, customer_id) VALUES ('${data.sale_amount}', '${data.sale_date}', '${data.sale_quantity}', '${book_id}', '${customer_id}')`;
                    db.pool.query(query1, function (error, rows, fields) {
                        if (error) {
                            console.log(error)
                            res.sendStatus(400);
                        } else {
                            query2 = `SELECT s.sale_id, b.book_title, c.customer_name, s.sale_amount, s.sale_date, s.sale_quantity FROM Sales s JOIN
                            Books b ON s.book_id = b.book_id JOIN Customers c ON s.customer_id = c.customer_id`;
                            db.pool.query(query2, function (error, selectRows, fields) {
                                if (error) {
                                    console.log(error);
                                    res.sendStatus(400);
                                }
                                else {
                                    res.send(selectRows);
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

app.delete('/delete_book', function (req, res, next) {
    let data = req.body;
    let bookID = parseInt(data.book_id);
    let deleteBook = `DELETE FROM Books WHERE book_id = ?`;


    db.pool.query(deleteBook, [bookID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});

app.put('/update_book', function (req, res, next) {
    let data = req.body;

    let book_id = parseInt(data.book_id)
    let book_isbn = data.book_isbn;
    let book_title = data.book_title;
    let book_publish_date = data.book_publish_date;
    let book_inventory = data.book_inventory;
    let book_unit_price = data.book_unit_price;

    let queryGenreId = `SELECT genre_id FROM Genres WHERE genre_name = ?`;
    db.pool.query(queryGenreId, [data.genre_name], function (error, genreRows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            if (genreRows.length > 0) {
                let genre_id = genreRows[0].genre_id;
                let queryUpdateBook = `UPDATE Books SET book_isbn = ?, book_title = ?, book_publish_date = ?, book_inventory = ?, book_unit_price = ?, genre_id = ? WHERE Books.book_id = ?`;

                db.pool.query(queryUpdateBook, [book_isbn, book_title, book_publish_date, book_inventory, book_unit_price, genre_id, book_id, genre_id], function (error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);

                        let queryAuthorId = `SELECT author_id FROM Authors WHERE author_name = ?`;
                        db.pool.query(queryAuthorId, [data.author_name], function (error, authorRows, fields) {
                            if (error) {
                                console.log(error)
                                res.sendStatus(400);
                            } else {
                                if (authorRows.length > 0) {
                                    let author_id = authorRows[0].author_id;
                                    let queryUpdateBooksAuthors = `UPDATE Books_has_Authors SET author_id = ? WHERE Books_has_Authors.book_id = ?`;
                                    db.pool.query(queryUpdateBooksAuthors, [author_id, book_id]), function(error, finalRows, fields) {
                                        if (error) {
                                            console.log(error);
                                            res.sendStatus(400);
                                        }
                                    }
                                }
                            }
                        })

                    }
                })
            }
        }
    });
});

app.put('/update_customer', function (req, res, next) {
    let data = req.body;

    let customer_id = parseInt(data.customer_id)
    let customer_name = data.customer_name;
    let customer_address = data.customer_address;
    let customer_phone = data.customer_phone;

    let queryUpdateCustomer = `UPDATE Customers SET customer_name = ?, customer_address = ?, customer_phone = ? WHERE Customers.customer_id = ?`;

    db.pool.query(queryUpdateCustomer, [customer_name, customer_address, customer_phone, customer_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.send(rows);
        }
    })
});

app.delete('/delete_author', function (req, res, next) {
    let data = req.body;
    let authorID = parseInt(data.author_id);
    let deleteAuthor = `DELETE FROM Authors WHERE author_id = ?`;

    db.pool.query(deleteAuthor, [authorID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});

app.delete('/delete_genre', function (req, res, next) {
    let data = req.body;
    let genreID = parseInt(data.genre_id);
    let deleteGenre = `DELETE FROM Genres WHERE genre_id = ?`;

    db.pool.query(deleteGenre, [genreID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});

app.delete('/delete_customer', function (req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.customer_id);
    let deleteCustomer = `DELETE FROM Customers WHERE customer_id = ?`;

    db.pool.query(deleteCustomer, [customerID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function(){ // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
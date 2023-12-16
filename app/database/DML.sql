-- Data Manipulation Queries for Project Group 42's website. --
-- All data manipulation variables entered by a user are marked with a ? placeholder --

-- BOOKS PAGE --

-- Populate Book Table --
SELECT B.book_id, B.book_isbn, B.book_title, A.author_name, B.book_publish_date, B.book_inventory, B.book_unit_price, G.genre_name FROM `Books` AS B INNER JOIN Books_has_Authors AS BHA ON B.book_id = BHA.book_id INNER JOIN `Authors` AS A ON BHA.author_id = A.author_id INNER JOIN `Genres` AS G ON B.genre_id = G.genre_id ORDER BY book_id;

-- Populate Select Author Drop-Down Menu (Create & Update Book Sections) --
SELECT author_name FROM `Authors`;

-- Populate Select Author Drop-Down Menu (Create & Update Book Section) --
SELECT genre_name FROM `Genres`;

-- Search Book --
-- Search for a book within the database using the book's title. --
SELECT * FROM Books WHERE book_title LIKE '%${book_title}%';

-- Create Book --
-- Get genre_id based on genre_name --
SELECT genre_id FROM Genres WHERE genre_name = ?;

-- Insert into Books --
INSERT INTO Books (book_isbn, book_title, book_publish_date, book_inventory, book_unit_price, genre_id) VALUES (?, ?, ?, ?, ?, ?);

-- Get author_id based on author_name --
SELECT author_id FROM Authors WHERE author_name = ?;

-- Insert the book_id and author_id into Books_has_Authors table --
INSERT INTO Books_has_Authors (book_id, author_id) VALUES (?, ?);

-- Insert row into books table --
SELECT B.book_id, B.book_isbn, B.book_title, A.author_name, B.book_publish_date, B.book_inventory, B.book_unit_price, G.genre_name FROM `Books` AS B INNER JOIN Books_has_Authors AS BHA ON B.book_id = BHA.book_id INNER JOIN `Authors` AS A ON BHA.author_id = A.author_id INNER JOIN `Genres` AS G ON B.genre_id = G.genre_id ORDER BY book_id;

-- Update Book --
-- Get genre_id based on genre_name --
SELECT genre_id FROM Genres WHERE genre_name = ?;

-- Update row in Books Table --
UPDATE Books SET book_isbn = ?, book_title = ?, book_publish_date = ?, book_inventory = ?, book_unit_price = ?, genre_id = ? WHERE Books.book_id = ?;

-- Retrieve author_id based on author_name --
SELECT author_id FROM Authors WHERE author_name = ?;

-- Update Books_has_Authors (intersection) table --
UPDATE Books_has_Authors SET author_id = ? WHERE Books_has_Authors.book_id = ?;

-- Delete Book (based on book_id) --
DELETE FROM Books WHERE book_id = ?;



-- AUTHORS PAGE -- 

-- Search Author -- 
-- Searches for an author in the database using the author's name. 
SELECT * FROM Authors WHERE author_name LIKE '%${author_name}%';

-- Add Author --
-- Adds a new author to the author table. --
INSERT INTO Authors (author_name) VALUES ('${data.author_name}');

-- Fill out Authors table after addition --
SELECT * FROM Authors;

-- Delete Author based on author_id --
DELETE FROM Authors WHERE author_id = ?




-- GENRES PAGE -- 

-- Add Genre -- 
-- Adds a new genre to the genre table based on genre_name --
INSERT INTO Genres (genre_name) VALUES ('${data.genre_name}');

-- FIll out Genres table after addition --
SELECT * FROM Genres;

-- Delete Genre based on genre_id --
DELETE FROM Genres WHERE genre_id = ?




-- CUSTOMERS PAGE --

-- Search Customer --
-- Searches for a customer within the database using the customer's name. --
SELECT * FROM Customers WHERE customer_name LIKE '%${customer_name}%';

-- Add Customer -- 
-- Adds a new customer to the customer table. --
INSERT INTO Customers (customer_name, customer_address, customer_phone) VALUES ('${data.customer_name}', '${data.customer_address}', '${data.customer_phone}');

-- Repopulate Customers table --
SELECT * FROM Customers;

-- Update Customer Info -- 
UPDATE Customers SET customer_name = ?, customer_address = ?, customer_phone = ? WHERE Customers.customer_id = ?;

-- Delete Customer based on customer_id --
DELETE FROM Customers WHERE customer_id = ?;




-- SALES PAGE --

-- Search Sale -- 
-- Searches the sales table using the entered Sale ID. --
SELECT * FROM Sales WHERE sale_id LIKE '%${sale_id}%';

-- Create Sale --
-- Get book_id based on book_title --
SELECT book_id FROM Books WHERE book_title = ?

-- Get customer_id based on customer_name --
SELECT customer_id FROM Customers WHERE customer_name = ?

-- Insert new row into Sales table --
INSERT INTO Sales (sale_amount, sale_date, sale_quantity, book_id, customer_id) VALUES ('${data.sale_amount}', '${data.sale_date}', '${data.sale_quantity}', '${book_id}', '${customer_id}');

-- Repopulate Sales Table after addition --
SELECT s.sale_id, b.book_title, c.customer_name, s.sale_amount, s.sale_date, s.sale_quantity FROM Sales s JOIN Books b ON s.book_id = b.book_id JOIN Customers c ON s.customer_id = c.customer_id;



-- Books_has_Authors PAGE --
-- Populate Books has Authors table --
SELECT bha.book_author_id, b.book_title, a.author_name FROM Books_has_Authors bha JOIN Books b ON bha.book_id = b.book_id JOIN Authors a ON bha.author_id = a.author_id;
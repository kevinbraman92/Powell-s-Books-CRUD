-- Team 42 DDL.sql - CS340 Portfolio Project
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Creates the Books table with book_id as a primary key. --
-- genre_id      -> Foreign Key
CREATE OR REPLACE TABLE Books (
    book_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    book_isbn varchar(45) NOT NULL,
    book_title varchar(45) NOT NULL,
    book_publish_date datetime NOT NULL,
    book_inventory int NOT NULL,
    book_unit_price DECIMAL(15, 2) NOT NULL,
    genre_id int,
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);

-- Creates the Authors table with author_id as a primary key. --
CREATE OR REPLACE TABLE Authors (
    author_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author_name varchar(45) NOT NULL
);

-- Creates the Books_has_Authors intermediary table with two foreign keys:
-- book_id      -> Foreign Key
-- author_id    -> Foreign Key
CREATE OR REPLACE TABLE Books_has_Authors (
    book_author_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    book_id int NOT NULL,
    author_id int NOT NULL,
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
        ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
        ON DELETE RESTRICT
);

-- Creates the Genres table with one primary key & foreign key:
-- genre_id     -> Primary Key
CREATE OR REPLACE TABLE Genres (
    genre_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    genre_name varchar(45) NOT NULL
);

-- Creates the Customers table with customer_id as the primary key.
CREATE OR REPLACE TABLE Customers (
    customer_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer_name varchar(45) NOT NULL,
    customer_address varchar(45) NOT NULL,
    customer_phone varchar(45)
);

-- Creates the Sales table with the following keys:
-- sail_id      -> Primary Key
-- book_id      -> Foreign Key
-- Customer_id  -> Foreign Key
CREATE OR REPLACE TABLE Sales ( 
    sale_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sale_amount DECIMAL(15,2) NOT NULL,
    sale_date DATETIME NOT NULL,
    sale_quantity int NOT NULL,
    book_id int NOT NULL,
    customer_id int NOT NULL,
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
        ON DELETE RESTRICT,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
        ON DELETE RESTRICT
);

-- Inserts sample data for the Books table.
INSERT INTO Books (book_isbn, book_title, book_publish_date, book_inventory, book_unit_price, genre_id)
VALUES ('978-0316769488', 'The Catcher in the Rye', '1951-07-16', '2500','8.93', 1),
('978-0446310789', 'To Kill a Mockingbird', '1960-07-11', '7000', '11.49', 1),
('978-0812550702', 'Ender/s Game', '1985-01-15', '700', '7.27', 2),
('978-0451524935', '1984', '1949-06-08', '1250', '7.48', 3),
('978-0451526342', 'Animal Farm', '1945-08-17', '1000', '6.99', 3);

-- Inserts sample data for the Authors table.
INSERT INTO Authors (author_name)
VALUES ('J.D. Salinger'),
('Harper Lee'),
('Orson Scott Card'),
('George Orwell'),
('Albert Camus');

-- Inserts sample data for the Books_has_Authors table.
INSERT INTO Books_has_Authors (book_id, author_id)
VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 4);

-- Inserts sample data for the Genres table.
INSERT INTO Genres (genre_name)
VALUES ('Drama'), ('Sci-Fi'), ('Political'), ('Horror'), ('Romance');

-- Inserts sample data for the Customers table. 
INSERT INTO Customers (customer_name, customer_address, customer_phone)
VALUES ('John Doe', '1000 Nowhere St', '458-973-5598'),
('Jane Doe', '2500 Anywhere Drive', '503-675-4299'),
('Alan Wake', '1875 Bright Falls', ''),
('Henry Townshead', '9753 Centre St', '570-893-9903');

-- Inserts sample data for the Sales table. 
INSERT INTO Sales (sale_amount, sale_date, sale_quantity, book_id, customer_id)
VALUES ('17.86', '2022-06-17', 2, 1, 1),
('6.99', '2004-06-17', 1, 5, 2),
('7.27', '2012-12-12', 1, 3, 3);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
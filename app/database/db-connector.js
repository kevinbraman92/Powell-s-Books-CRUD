// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : '*',  //e.g. 'cs340_username'
    password        : '*',  //e.g. '1234'
    database        : '*'   //e.g. 'cs340_username'
})

// Export it for use in our applicaiton
module.exports.pool = pool;
// import the mysql2 package/ get the client
const mysql = require('mysql2');

// connect the application to the MySql database
// creater a connection to the mysql database by calling createConnection() method and providing the detailed information on mysql server such as host, user, password and database as follows
const connection = mysql.createConnection(
    {
        host: 'localhost',
        // my MySql username,
        user: 'root',
        // MY Mysql password
        password: '',
        database: 'employee_tracker'
    }
    // ,
    // console.log(`🔌 Connected to the election database. 🔌`)
);
// in this example, we created a connection to emp tracker db in the local db server.

// call the connect()) method on the connection object to connect to the mysql database server
connection.connect(function (err) {
    if (err){ 
        return console.log(`error: ${err.message}`);
    }
    console.log(`🔌 Connected to the election database. 🔌`)
});
// the connect() method accepts a callback function that has the err argument which provides the detailed error if any error occured.

module.exports = connection;
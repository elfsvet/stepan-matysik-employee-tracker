// import the mysql2 package/ get the client
const mysql = require('mysql2');

// connect the application to the MySql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // my MySql username,
        user: 'root',
        // MY Mysql password
        password: 'root',
        database: 'employee_tracker'
    },
    console.log(`🔌 Connected to the election database. 🔌`)
);

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database.")
});

module.exports = db;
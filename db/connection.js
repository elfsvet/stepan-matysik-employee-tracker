// import the mysql2 package
const mysql = require('mysql2');

// connect the application to the MySql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // my MySql username,
        user: 'root',
        // MY Mysql password
        password: 'Coppola2453702!',
        database: 'employee_tracker'
    },
    console.log(`🔌 Connected to the election database. 🔌`)
);

module.exports = db;
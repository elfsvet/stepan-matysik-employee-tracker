const inquirer = require('inquirer');
const cTable = require('console.table')
const connection = require('./db/connection');
const res = require('express/lib/response');

const getDepartments = () => {
    return connection.promise().query('SELECT * FROM departments')
};

const getRoles = () => {
    return connection.promise().query('SELECT * FROM roles')
};

const getEmployees = () => {
    return connection.promise().query('SELECT * FROM employees')
};

// prompt the questions
const startQuestion = () => {
    inquirer.prompt({
        type: 'list',
        name: 'search',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }).then(answer => {
        switch (answer.search) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                console.log('See you!');
                connection.end();
                break;
        }
    });
};

// FUnctions
const viewAllDepartments = () => {
    // query to view all departments
    const sql = `SELECT * FROM departments`;
    const query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.log(`\n Departments in the database\n`);
        console.table(rows);
        startQuestion();
    });
};






// start the app should be at the bottom of the file
startQuestion();
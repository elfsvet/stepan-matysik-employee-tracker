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

console.log('----------------------------------------------')
console.log('||                                          ||')
console.log('||                 WELCOME                  ||')
console.log('||                                          ||')
console.log('----------------------------------------------')

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
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.log(`\n Departments in the database \n`);
        console.table(rows);
        startQuestion();
    });
};

const viewAllRoles = () => {
    // query to view roles with dapartment ID retruned with name
    const sql = `SELECT roles.id, roles.title, roles.salary,departments.name AS department FROM roles
    JOIN departments
    ON roles.department_id = departments.id`;
    connection.query(sql, (err,rows) => {
        if (err) throw err;
        console.log('\n All Roles \n');
        console.table(rows);
        startQuestion();
    })
};

const viewAllEmployees = () => {
    const sql = ``
}






// start the app should be at the bottom of the file
startQuestion();
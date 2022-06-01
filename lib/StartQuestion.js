const inquirer = require('inquirer');
// const cTable = require('console.table')
const connection = require('../db/connection');

const { viewAllDepartments, addDepartment, deleteDepartment, viewBudget } = require('./Department');

const { viewAllRoles, addRole, deleteRole } = require('./Role');

const { viewAllEmployees, addEmployee, updateEmployeeManager,updateEmployeeRole, viewEmployeeByDepartment, deleteEmployee } = require('./Employee');


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
            'Update an employee manager',
            'View employees by department',
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'View department budgets',
            'Exit'
        ]
    }).then(answer => {
        switch (answer.search) {
            case 'View all departments':
                viewAllDepartments(startQuestion);
                break;
            case 'View all roles':
                viewAllRoles(startQuestion);
                break;
            case 'View all employees':
                viewAllEmployees(startQuestion);
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
            case 'Update an employee manager':
                updateEmployeeManager();
                break;
            case 'View employees by department':
                viewEmployeeByDepartment(startQuestion);
                break;
            case 'Delete a department':
                deleteDepartment();
                break;
            case 'Delete a role':
                deleteRole();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'View department budgets':
                viewBudget(startQuestion);
                break;
            case 'Exit':
                console.log('See you!');
                connection.end(err => {
                    if (err) {
                        return console.log(`error: ${err.message}`);
                    }
                    console.log('Close the database connection.')
                });
                break;
        }
    });
};

// export the module as a function

module.exports = startQuestion;
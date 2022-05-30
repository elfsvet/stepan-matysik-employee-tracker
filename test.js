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
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n All Roles \n');
        console.table(rows);
        startQuestion();
    });
};

const viewAllEmployees = () => {
    const sql = `SELECT employees.id, CONCAT(employees.first_name,' ', employees.last_name) AS employee, roles.title, roles.salary, departments.name, CONCAT(e2.first_name,' ', e2.last_name) AS manager
    FROM employees
    JOIN roles
    ON employees.role_id = roles.id
    JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees e2
    ON employees.manager_id = e2.id
    ORDER BY employees.id`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n All Employees \n');
        console.table(rows);
        startQuestion();
    });
};

const addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'department',
        message: 'What is the name of the department?'
    }).then(answer => {
        console.log('Inserting a new department...\n');
        connection.query('INSERT INTO departments SET ?',
            {
                name: answer.department
            }, (err, result) => {
                if (err) throw err;
                console.log('Department added!\n');
                startQuestion();
            });
    });
};

// const addRole = () => {
//     getDepartments().then(rows => {
//         let departmentNameArray = [];
//         let departmentArray = rows[0];
//         for (var i = 0; i < departmentArray.length; i++) {
//             let department = departmentArray[i].name;
//             departmentNameArray.push(department);
//         }
//         inquirer.prompt([
//             {
//                 // Prompt user role title
//                 type: 'input',
//                 name: 'title',
//                 message: 'Enter the role title: '
//             },
//             {
//                 // Prompt user for salary
//                 type: 'number',
//                 name: 'salary',
//                 message: 'Enter the role salary: '
//             },
//             {
//                 // Prompt user for department the role is under
//                 type: 'list',
//                 name: 'department',
//                 message: 'Enter the department of the role: ',
//                 choices: departmentNameArray
//             }])
//             .then(answer => {
//                 let department_id;
//                 for (let i = 0; i < departmentArray.length; i++) {
//                     if (answer.department === departmentArray[i].name) {
//                         department_id = departmentArray[i].id;
//                         break;
//                     }
//                 }
//                 // Added role to the role table
//                 connection.query('INSERT INTO roles SET ?'),
//                 {
//                     title: answer.title,
//                     salary: answer.salary,
//                     department_id: department_id
//                 },
//                     (err, result) => {
//                         if (err) throw err;
//                         console.log(`${answer.title} added to roles!\n`);
//                         startQuestion();
//                     }
//             });
//     });
// };




// start the app should be at the bottom of the file
startQuestion();
// get inquirer to ask questions
const inquirer = require('inquirer');
// to show the table
const cTable = require('console.table');
// to be abble to connect to mysql
const connection = require('../db/connection');

// show all employees
const viewAllEmployees = () => {
    const startQuestion = require('./StartQuestion');

    const sql = `SELECT employees.id, CONCAT(employees.first_name,' ', employees.last_name) AS employee, roles.title, roles.salary, departments.name AS department, CONCAT(e2.first_name,' ', e2.last_name) AS manager
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees e2
    ON employees.manager_id = e2.id
    ORDER BY employees.id`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\nAll Employees\n');
        console.table(rows);
        startQuestion();
    });
};

// to add a new employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?",
            validate: first_name =>{
                if(!first_name){
                    console.log('Please enter a first name');
                    return false;
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?",
            validate: last_name =>{
                if(!last_name){
                    console.log('Please enter a last name');
                    return false;
                }
                return true;
            }
        }
    ]).then(answer => {
        const params = [answer.first_name, answer.last_name];
        const sql = `SELECT roles.id, roles.title FROM roles`;

        connection.query(sql, (err, data) => {
            if (err) throw err;

            const roles = data.map(({ id, title }) => ({ name: title, value: id }));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roles
                }
            ]).then(answer => {
                const role = answer.role;
                params.push(role);
                const sql = `SELECT * FROM employees`;
                connection.query(sql, (err, data) => {
                    if (err) throw err;
                    const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Who is the employee's manager?",
                            choices: managers
                        }
                    ]).then(answer => {
                        const manager = answer.manager;
                        params.push(manager);
                        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;

                        connection.query(sql, params, (err, result) => {
                            if (err) throw err;
                            console.log('Employee has been added!')

                            viewAllEmployees();
                        });
                    });
                });
            });
        });
    });
};
// update an employee's role
const updateEmployeeRole = () => {
    const sql = `SELECT * FROM employees`;

    connection.query(sql, (err, data) => {
        if (err) throw err;
        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which employee would you like to update?',
                choices: employees
            }
        ]).then(answer => {
            const employee = answer.name;
            const params = [];
            params.push(employee);

            const sql = `SELECT * FROM roles`;

            connection.query(sql, (err, data) => {
                if (err) throw err;

                const roles = data.map(({ id, title }) => ({ name: title, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "What is the employee's new role?",
                        choices: roles
                    }
                ]).then(answer => {
                    const role = answer.role;
                    params.push(role);

                    let employee = params[0]
                    params[0] = role;
                    params[1] = employee;

                    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
                    connection.query(sql, params, (err, result) => {
                        if (err) throw err;
                        console.log('Employee has been updated!');

                        viewAllEmployees();
                    });
                });
            });
        });
    });
};

// update an employee's manager
const updateEmployeeManager = () => {
    // console.log('hello');
    const sql = `SELECT * FROM employees`;

    connection.query(sql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which employee would you like to update?',
                choices: employees
            }
        ]).then(answer => {
            const employee = answer.name;
            const params = [];
            params.push(employee);

            const sql = `SELECT * FROM employees`;

            connection.query(sql, (err, data) => {
                if (err) throw err;

                const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Who is employee's manager?",
                        choices: managers
                    }
                ]).then(answer => {
                    const manager = answer.manager;
                    params.push(manager);
                    let employee = params[0];
                    params[0] = manager;
                    params[1] = employee;

                    const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
                    connection.query(sql, params, (err, result) => {
                        if (err) throw err;
                        console.log('Employee has been updated!');

                        viewAllEmployees();
                    });
                });
            });
        });
    });
};

// sort and show employees by departments
const viewEmployeeByDepartment = () => {
    const startQuestion = require('./StartQuestion');

    console.log('Showing employees by departments...\n');
    const sql = `SELECT employees.first_name,
    employees.last_name,
    departments.name AS department
    FROM employees
    LEFT JOIN roles on employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    ORDER BY departments.id`;

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startQuestion();
    });
};

// delete an employee
const deleteEmployee = () => {
    const sql = `SELECT * FROM employees`;

    connection.query(sql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which employee would you like to delete?',
                choices: employees
            }
        ]).then(answer => {
            const params = answer.name;
            const sql = `DELETE FROM employees WHERE id = ?`;

            connection.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log('Successfully deleted!');
                viewAllEmployees();
            });
        });
    });
};

// export the module as 6 functions

module.exports = { viewAllEmployees, addEmployee, updateEmployeeManager,updateEmployeeRole, viewEmployeeByDepartment, deleteEmployee };
const inquirer = require('inquirer');
const cTable = require('console.table')
const connection = require('./db/connection');
const res = require('express/lib/response');

// const getDepartments = () => {
//     return connection.promise().query('SELECT * FROM departments')
// };

// const getRoles = () => {
//     return connection.promise().query('SELECT * FROM roles')
// };

// const getEmployees = () => {
//     return connection.promise().query('SELECT * FROM employees')
// };

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
            case 'Update an employee manager':
                updateEmployeeManager();
                break;
            case 'View employees by department':
                viewEmployeeByDepartment();
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
                viewBudget();
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

// FUnctions
const viewAllDepartments = () => {
    // query to view all departments
    const sql = `SELECT id, name AS department FROM departments`;
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
    LEFT JOIN departments
    ON roles.department_id = departments.id`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n All Roles \n');
        console.table(rows);
        startQuestion();
    });
};

const viewAllEmployees = () => {
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
                viewAllDepartments();
            });
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is new job title?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this job?'
        }
    ]).then(answer => {
        const params = [answer.title, answer.salary];

        const sql = `SELECT id, name FROM departments`;

        connection.query(sql, (err, data) => {
            if (err) {
                return console.log(`error: ${err.message}`)
            }
            const department = data.map(({ name, id }) => ({ name: name, value: id }));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'What department is this role in?',
                    choices: department
                }
            ]).then(dep => {
                const department = dep.department;
                params.push(department);

                const sql = `INSERT INTO roles (title,salary,department_id) VALUES (?, ?, ?)`;
                connection.query(sql, params, (err, result) => {
                    if (err) {
                        return console.log(`error: ${err.message}`)
                    }
                    console.log(`Added ${answer.title} to the roles!`);
                    viewAllRoles();
                });
            });
        });
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?"
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
                        })
                    })
                })
            })
        })
    })
};

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

const viewEmployeeByDepartment = () => {
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

const deleteDepartment = () => {
    const sql = `SELECT * FROM departments`;

    connection.query(sql, (err, data) => {
        if (err) throw err;

        const department = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'What department do you want to delete?',
                choices: department
            }
        ]).then(answer => {
            const params = answer.department;
            const sql = `DELETE FROM departments WHERE id = ?`;

            connection.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log(`Successfully deleted!`);
                viewAllDepartments();
            })
        })
    })
};

const deleteRole = () => {
    const sql = `SELECT * FROM roles`;
    connection.query(sql, (err, data) => {
        if (err) throw err;
        const roles = data.map(({ title, id }) => ({ name: title, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'What role do you want to delete?',
                choices: roles
            }
        ]).then(answer => {
            const params = answer.role;
            const sql = `DELETE FROM roles WHERE id = ?`;

            connection.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("Successfully deletet!");

                viewAllRoles();
            })
        })
    })
}

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

const viewBudget = () => {
    console.log('Showing the budget by department...\n');

    const sql = `SELECT department_id AS id,
    departments.name AS department,
    SUM(salary) AS budget
    FROM roles
    JOIN departments ON roles.department_id = departments.id GROUP BY department_id`;

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startQuestion();
    })
}


// start the app should be at the bottom of the file
startQuestion();
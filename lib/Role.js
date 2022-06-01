const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('../db/connection');
// const startQuestion = require('./StartQuestion');

// show all roles
const viewAllRoles = () => {
    const startQuestion = require('./StartQuestion');

    // query to view roles with dapartment ID retruned with name
    const sql = `SELECT roles.id, roles.title, roles.salary,departments.name AS department FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\nAll Roles\n');
        console.table(rows);
        startQuestion();
    });
};

// add a new role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is new job title?',
            validate: title =>{
                if(!title){
                    console.log('Please enter a title');
                    return false;
                }
                return true;
            }
            
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this job?',
            validate: salary =>{
                if(!salary){
                    console.log('Please enter a salary');
                    return false;
                }
                return true;
            }
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


// delete a role
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

// export the module as 3 functions
module.exports= {
    viewAllRoles,addRole,deleteRole
}
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('../db/connection');
// const startQuestion = require('./StartQuestion');


const viewAllDepartments = () => {
    const startQuestion = require('./StartQuestion');
    // query to view all departments
    const sql = `SELECT id, name AS department FROM departments`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.log(`\n Departments in the database \n`);
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
            });
        });
    });
};

const viewBudget = () => {
    const startQuestion = require('./StartQuestion');
    
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
    });
};

module.exports = {viewAllDepartments, addDepartment, deleteDepartment, viewBudget};
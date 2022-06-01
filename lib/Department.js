const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('../db/connection');
// const startQuestion = require('./StartQuestion');
// it doesnt work to get it here. it won be seen in the function if it will call it from another place.

// view all departments
const viewAllDepartments = () => {
    // need require here to be able to work after require.
    const startQuestion = require('./StartQuestion');
    // query to view all departments
    const sql = `SELECT id, name AS department FROM departments`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.log(`\nDepartments in the database\n`);
        console.table(rows);
        startQuestion();
    });
};
// add a department
const addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'department',
        message: 'What is the name of the department?',
        validate: department =>{
            if(!department){
                console.log('Please enter a department');
                return false;
            }
            return true;
        }
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
//delete a department
const deleteDepartment = () => {
    const sql = `SELECT * FROM departments`;

    connection.query(sql, (err, data) => {
        if (err) throw err;
// to get all departments as name key and id value 
//map will return a new array of objects with name : name of department and value : id of the department
        const department = data.map(({ name, id }) => ({ name: name, value: id }));
        // console.log(department)
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

// show all departments budget
const viewBudget = () => {
    const startQuestion = require('./StartQuestion');

    console.log('Showing the budget by department...\n');

    const sql = `SELECT department_id AS id,
    departments.name AS department,
    SUM(salary) AS budget
    FROM roles
    JOIN departments ON roles.department_id = departments.id 
    GROUP BY department_id`;

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startQuestion();
    });
};

// export the module as 4 functions

module.exports = {viewAllDepartments, addDepartment, deleteDepartment, viewBudget};
const inquirer = require('inquirer');

// options to choose:
//view all departments,
// - show the table with dep names and dep ids

// view all roles
// - the job title, role id , the dep that role belongs to, salary for the role

// view all employees
// - table showing employee data, emp ids, first name, last names, job titles, department, salaries, and managers of the employee

//add a department
// - prompted to enter:
//name of the department it should be added to the database

// add a role
// -prompted to enter:
// name, salary, department for the role, and it role added to the database

// add an employee
// -prompted to enter: 
// first name , last name, role, manager, employee added to the db

// update a employee's role
// prompted to select an employee to update and their new role and this info is updated in the db

// update employee managers

// view employees by manager

// view employees by department

// delete dep, roles, employees

// view the all combined salaries in that department (COUNT())

//we need 4 tables: departments, roles, manager, employees.

// departments should have: department_id and department_name

// roles should have: job_title, role_id, reference the department, salary

// manager should have: id and name.

// emp should have: emp ids, first_name, last_name, job_title reference, department reference, salaries reference, reference manager.
// ....
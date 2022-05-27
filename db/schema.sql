DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS managers;

-- !primary key is already NOT NULL and UNIQUE
-- CREATE TABLE managers (
-- manager_id INTEGER AUTO_INCREMENT PRIMARY KEY,
-- manager_full_name VARCHAR(60) NOT NULL
-- );

CREATE TABLE departments (
department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
job_title VARCHAR(30) NOT NULL,
salary INTEGER NOT NULL,
department INTEGER,
FOREIGN KEY (department) REFERENCES departments(department_id) ON DELETE SET NULL
);

CREATE TABLE employees (
employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role INTEGER,
manager INTEGER,
FOREIGN KEY (role) REFERENCES roles(role_id) ON DELETE SET NULL,
FOREIGN KEY (manager) REFERENCES employees(employee_id) ON DELETE SET NULL
);

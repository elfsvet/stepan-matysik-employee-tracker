-- delete db if any
DROP DATABASE IF EXISTS employee_tracker;
-- create a db
CREATE DATABASE employee_tracker;
-- choose the db and use it
USE employee_tracker;
-- delete tables in right order
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS managers;

-- !primary key is already NOT NULL and UNIQUE
-- create tables
CREATE TABLE departments (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary INTEGER NOT NULL,
department_id INTEGER,
FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER,
manager_id INTEGER,
FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

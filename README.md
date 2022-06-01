# Stepan Matysik's Employee-Tracker (CMS)
> Employee Tracker project. A video with a employee tracker project description.
> Live demo [_here_](https://youtu.be/e_2TkKhup44). 

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Installation](#installation)
* [Instructions](#instructions)
* [Features](#features)
* [Screenshots](#screenshots)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contacts](#contact)



## General Info
This project is a employee tracker. Uses back end to simplify the process of creation and monitoring departments/roles/employees.
## Technologies
Project is created with:
- JavaScript
- Node.js
- npm

## Installation
To open this project in vscode using git in Terminal/Git Bash:

```
$ cd in directory there you want to store your project
$ git clone https://github.com/elfsvet/stepan-matysik-employee-tracker.git
$ code .
```

## Instructions
1. You would need to run commands in terminal at the directory of the project:
```
$npm install inquirer
$npm install express
$npm install dotenv

```
2. To upload data bases:
```
$ mysql -u root -p
Enter your password:
mysql> source db/schema.sql;
mysql> source db/seeds.sql;
mysql> quit;
```
3. To run application:
- Create a file .env in root directory, and paste your data in user and password filed.
```
DB_NAME='employee_tracker'
DB_USER='user'
DB_PASSWORD='password'
```

```
$npm start
```

4. Follow the questions and steps.


## Features
- Inquirer package
- Dotenv package
- Express package

## Screenshots
![Example screenshot](./assets/images/sample.jpg)

If you haven't checked the link to the video with the application process please [CLICK HERE ⬇️](https://youtu.be/e_2TkKhup44)


## Usage
For creating a company managing list of employees and have easy access to all departments and roles.
## Project Status
Project is: _complete_

## Room for Improvement
To do:
- UI/UX

## Acknowledgements
- This project was inspired by UM Coding Boot Camp
- This project was creating from scratch using those png pictures.
![Example png](./assets/images/pic1.png)

![Example png](./assets/images/pic2.png)
## Contact
Created by [@elfsvet](https://github.com/elfsvet)
- [LinkedIn](https://www.linkedin.com/in/stepanmatysik/)
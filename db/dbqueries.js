

const connection = require("./connection");
const mysql = require("mysql");
const cTable = require("console.table");
const mainApp = require("../app");
const chalk = require('chalk');
const inquirer = require("inquirer");

const log = console.log;

//==========================
// DATABASE CRUD FUNCTIONS
//==========================
//mainApp.mainMenu();

//==========================
// **ENTER to continue - assists viewing displayed Tables by not also displyaing the Main Menu options
// plus....i was not able to call mainMenu from inside this function when i had it n the app.js file 
//==========================
const pressEnterToContinue = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "anykey",
            message: "Press ENTER to continue"
        }
    ]).then(function(userResponse){ 
        mainApp.mainMenu();
    });

}

exports.readEmployees = async (connection) => {
    const rows = await connection.query(`
    SELECT 	CONCAT(e.first_name,' ',e.last_name) AS 'Employee',
        e.id AS "Employee Id",
        u_role.title AS 'Role Title',
        e.role_id AS 'Role Id',
    CONCAT(m.first_name,' ',m.last_name) AS 'Employee Manager',	
        e.manager_id AS 'Manger Id'
    FROM employee m
    INNER JOIN employee e ON m.id=e.manager_id
    INNER JOIN u_role ON e.manager_id=u_role.id
    `);

    console.table(log(chalk.greenBright("------------------------------------------------------------------------------   table START    \n")));
    console.table(rows);
    console.table(log(chalk.greenBright("--------------------------------------------------------------------------------   table END    ")));
    // console.table('*EMPLOYEES*',rows);
    // mainApp.mainMenu();
    pressEnterToContinue();
}

exports.readRoles = async (connection) => {
    const rows = await connection.query(`
    Select r.title AS 'Title',
	r.id AS 'Role Id',
	d.name AS 'Department Name',
    r.department_id,
    r.salary AS 'Salary'
    FROM u_role r
    INNER JOIN department d ON r.department_id=d.id
    `);

    console.table(log(chalk.greenBright("------------------------------------------------------------------------------   table START    \n")));
    console.table(rows);
    console.table(log(chalk.greenBright("--------------------------------------------------------------------------------   table END    ")));
    pressEnterToContinue();
}

exports.readRolesNoDisplay = async (connection) => {
    const rows = await connection.query("Select * FROM u_role");
    mainApp.addRole(rows);
    // console.table(rows);
    // mainApp.mainMenu();
}

exports.readRoleAndManger = async (connection) => {
    const rows = await connection.query("Select * FROM u_role");
    const rows2 = await connection.query("SELECT * FROM employee WHERE manager_id = 5000");
    mainApp.addEmployeeINQ(rows, rows2);
    // console.log(rows);
    // console.log(rows2);
}

exports.readDepartments = async (connection) => {
    const rows = await connection.query(`SELECT d.name AS 'Department Name',
    d.id AS 'Department Id'
    FROM department d`);

    console.table(log(chalk.greenBright("------------------------------------------------------------------------------   table START    \n")));
    console.table(rows);
    console.table(log(chalk.greenBright("--------------------------------------------------------------------------------   table END    ")));
    pressEnterToContinue();
}

exports.readDepartmentsNoDisplay = async (connection) => {
    //retuning for dynamic population of inquirer section department
    const rows = await connection.query("SELECT * FROM department");
    mainApp.addRoleINQ(rows);
    // console.table(rows);
    // mainApp.mainMenu();
}

exports.addDepartmentDB = async (connection, userResponse) => {
    const params = {name: userResponse.newDepartmentName};
    //target name column of the table selected below
    //associate the value in user input

    const rows = await connection.query("INSERT INTO department SET ?", params);

    // tell user row was added 
    console.log(`Department added ${rows.insertId}`);

    // display all departments with newly added row
    this.readDepartments(connection) 
};

exports.addEmployeeDB = async (connection, userResponse) => {
    const params = {first_name: userResponse.first_name, last_name: userResponse.last_name, role_id: userResponse.role_id, manager_id: userResponse.manager_id};  

    const rows = await connection.query("INSERT INTO employee SET ?", params);
    // const rows = await connection.query(`INSERT INTO u_role (title, salary, department_id) VALUES (${userResponse.title},${userResponse.salary},${userResponse.departmentId})`);

    // tell user row was added 
    console.log(`Role added ${rows.insertId}`);

    // display all departments with newly added row
    this.readEmployees(connection);
};

exports.addRoleDB = async (connection, userResponse) => {
    const params = {title: userResponse.title, salary: userResponse.salary, department_id: userResponse.departmentId};  

    const rows = await connection.query("INSERT INTO u_role SET ?", params);
    // const rows = await connection.query(`INSERT INTO u_role (title, salary, department_id) VALUES (${userResponse.title},${userResponse.salary},${userResponse.departmentId})`);

    // tell user row was added 
    console.log(`Role added ${rows.insertId}`);

    // display all departments with newly added row
    this.readRoles(connection);
};






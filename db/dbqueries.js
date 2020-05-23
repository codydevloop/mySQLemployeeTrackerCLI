

const connection = require("./connection");
const mysql = require("mysql");
const cTable = require("console.table");
const mainApp = require("../app");

//==========================
// DATABASE CRUD FUNCTIONS
//==========================
//mainApp.mainMenu();

exports.readEmployees = async (connection) => {
    const rows = await connection.query("Select * FROM employee");
    console.table(rows);
    mainApp.mainMenu();
}

exports.readRoles = async (connection) => {
    const rows = await connection.query("Select * FROM u_role");
    console.table(rows);
    mainApp.mainMenu();
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
    const rows = await connection.query("SELECT * FROM department");
    console.table(rows);
    mainApp.mainMenu();
}

exports.readDepartmentsNoDisplay = async (connection) => {
    //retuning for dynamic population of inquirer section department
    const rows = await connection.query("SELECT * FROM department");
    mainApp.addRoleINQ(rows);
    // console.table(rows);
    // mainApp.mainMenu();
}

exports.addDepartment = async (connection, userResponse) => {
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






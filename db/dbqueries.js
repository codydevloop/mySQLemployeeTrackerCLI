

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

exports.readDepartments = async (connection) => {
    const rows = await connection.query("SELECT * FROM department");
    console.table(rows);
    mainApp.mainMenu();
}

exports.readDepartmentsNoDisplay = async (connection) => {
    const rows = await connection.query("SELECT * FROM department");
    mainApp.addRole(rows);
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

exports.addRole = async (connection, userResponse) => {
    const params = {title: userResponse.title, salary: userResponse.salary, department_id: userResponse.departmentId};  

    const rows = await connection.query("INSERT INTO u_role SET ?", params);
    // const rows = await connection.query(`INSERT INTO u_role (title, salary, department_id) VALUES (${userResponse.title},${userResponse.salary},${userResponse.departmentId})`);

    // tell user row was added 
    console.log(`Department added ${rows.insertId}`);

    // display all departments with newly added row
    this.readRoles(connection);
};






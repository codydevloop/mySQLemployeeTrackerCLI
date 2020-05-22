

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
};


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

exports.addDepartment = async (connection, userResponse) => {
    const params = {name: userResponse.newDepartmentName};
    //target name column of the table selected below
    //associate the value in user input

    //future example for multiple parameters  userInput.name



    const rows = await connection.query("INSERT INTO department SET ?", params);
    // tell user row was added 
    console.log(`Department added ${rows.insertId}`);
    // display all departments
    this.readDepartments(connection)
};



// const readEmployees = async (connection) => {
//     const [rows, fields] = await connection.query("Select * FROM employee");
//     console.table(rows);
// };



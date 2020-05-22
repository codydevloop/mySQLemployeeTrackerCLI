

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


// const readEmployees = async (connection) => {
//     const [rows, fields] = await connection.query("Select * FROM employee");
//     console.table(rows);
// };



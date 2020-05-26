

const connection = require("./connection");
const mysql = require("mysql");
const cTable = require("console.table");
const mainApp = require("../app");
const chalk = require('chalk');
const inquirer = require("inquirer");
const figlet = require('figlet');

//## MIDDLE WARE
const log = console.log; //used for CHALK

figlet('Hoover CLI', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
    pressEnterToContinue();

});



//==========================
// DATABASE CRUD FUNCTIONS
//==========================


//==========================
// **ENTER to continue - assists viewing displayed Tables by not also displyaing the Main Menu options
// plus....i was not able to call mainMenu from inside this function when i had it n the app.js file 
//==========================
const pressEnterToContinue = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "anykey",
            message: "Press ENTER to continue\n"
        }
    ]).then(function(userResponse){ 
        mainApp.mainMenu();
    });

}

//==========================
// DISPLAY FUNCTIONS (each have the same four statements)
//==========================
exports.readEmployees = async (connection) => {
    const rows = await connection.query(`
    SELECT 	CONCAT(e.first_name,' ',e.last_name) AS 'Employee',
        e.id AS "Employee_Id",
        u_role.title AS 'Role_Title',
        e.role_id AS 'Role_Id',
    CONCAT(m.first_name,' ',m.last_name) AS 'Employee_Manager',	
        e.manager_id AS 'Manger_Id'
    FROM employee m
    INNER JOIN employee e ON m.id=e.manager_id
    INNER JOIN u_role ON e.role_id=u_role.id
    `);

    console.table(log(chalk.greenBright("------------------------------------------------------------------------------   table START    \n")));
    console.table(rows);
    console.table(log(chalk.greenBright("--------------------------------------------------------------------------------   table END    ")));
   
    // ** Various chalk testing with console.table
    //log(chalk.red(`${console.table(rows)}`)); //undefined
    //log(chalk.red(console.table(rows))); //undefined
    //console.table(log(chalk.red(rows)));  // [object Object]
    //console.table(JSON.stringify(log(chalk.red(rows)))); // [object Object]
    //console.table(`${JSON.stringify(log(chalk.red(rows)))}`); //[object Object] & undefined

    pressEnterToContinue();
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

//==========================
// SPECIALTY READ ONLY FUNCTIONS - to populate iquire choices
//==========================
exports.readRolesNoDisplay = async (connection) => {
    const rows = await connection.query("Select * FROM u_role");
    mainApp.addRole(rows);
    // console.table(rows);
    // mainApp.mainMenu();
}

exports.readRoleAndManger = async (connection) => {
    const rows = await connection.query("Select * FROM u_role");
    const rows2 = await connection.query("SELECT * FROM employee WHERE manager_id = id");
    mainApp.addEmployeeINQ(rows, rows2);
    // console.log(rows);
    // console.log(rows2);
}

exports.readDepartmentsNoDisplay = async (connection) => {
    //retuning for dynamic population of inquirer section department
    const rows = await connection.query("SELECT * FROM department");
    mainApp.addRoleINQ(rows);
    // console.table(rows);
    // mainApp.mainMenu();
}

exports.readEmpAndRole = async (connection, userResponse) => {
    //using same query as readEmployees, it has all the data I need
    const rows = await connection.query(`
    SELECT 	CONCAT(e.first_name,' ',e.last_name) AS 'Employee',
        e.id AS "Employee_Id",
        u_role.title AS 'Role_Title',
        e.role_id AS 'Role_Id',
    CONCAT(m.first_name,' ',m.last_name) AS 'Employee_Manager',	
        e.manager_id AS 'Manger_Id'
    FROM employee m
    INNER JOIN employee e ON m.id=e.manager_id
    INNER JOIN u_role ON e.manager_id=u_role.id
    `);
    const rows2 = await connection.query("Select * FROM u_role");
    mainApp.updateEmpRole(rows, rows2);
    // console.log(rows);
    // console.log(rows2);
};

//==========================
// ADD/UPDATE FUNCTIONS
//==========================
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

exports.updateEmpRole = async (connection, userResponse, userResponse2) => {
    const params = [{ role_id: userResponse2.id },{ id: userResponse.Employee_Id }];  
    // console.log(userResponse)
    // console.log(userResponse2)
    // console.log(userResponse.Employee_Id)
    // console.log(userResponse2.id)
    // console.log(userResponse2)
    const rows = await connection.query("UPDATE employee SET ? WHERE ?", params);

    // const rows = await connection.query(`INSERT INTO u_role (title, salary, department_id) VALUES (${userResponse.title},${userResponse.salary},${userResponse.departmentId})`);

    // tell user row was added 
    // console.log(`Role updated ${rows.insertId}`);

    // display all departments with newly added role
    this.readEmployees(connection);
};



//==========================
// DELETE FUNCTIONS
//==========================




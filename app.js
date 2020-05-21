const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const cTable = require("console.table");

let connection;
//==========================
// CONNECTION TO DB
// "action" variable calls the appropriate CRUD function in switch statment associated with the db connection
//==========================

const connectToDatabase = async (action) => {
    try{
        connection = await mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "password",
            database: "all_employees"
        });
        console.log(`Connected to database with id ${connection.threadId}`);
        //what action
            console.log(action);
            switch(action){
                case "readEmployees": 
                await readEmployees(connection); 
                break;
        
                case "readRoles": 
                await readRoles(connection); 
                break;
        
                case "readDepartments": 
                readDepartments(connection); 
                break;
            }
        
        connection.end;
    }catch (error){
        console.log(error);
    }
};


//==========================
// DATABASE CRUD FUNCTIONS
//==========================
const readEmployees = async (connection) => {
    const [rows, fields] = await connection.query("Select * FROM employee");
    console.table(rows);
};

const readRoles = async (connection) => {
    const [rows, fields] = await connection.query("Select * FROM u_role");
    console.table(rows);
}

const readDepartments = async (connection) => {
    const [rows, fields] = await connection.query("SELECT * FROM department");
    console.table(rows);
}

// connectToDatabase();  //used if inquirer is not initiating a call

//==========================
// Initial Greeting - inquire choices
//==========================
inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "homeChoice",
      choices: [
          "View Employees",
          "View Roles",
          "View Departments"
      ]
    }
]).then(function(userResponse){
    // console.log(userResponse);
    userChoice(userResponse);
    // connectToDatabase();
});


//==========================
// Switch options for Initial Greeting
//==========================
const userChoice = function(userResponse){
    switch(userResponse.homeChoice){
        case "View Employees": 
        connectToDatabase("readEmployees"); 
        break;

        case "View Roles": 
        connectToDatabase("readRoles"); 
        break;

        case "View Departments": 
        connectToDatabase("readDepartments"); 
        break;
    }
}

//==========================
// READ --> SELECT
//==========================
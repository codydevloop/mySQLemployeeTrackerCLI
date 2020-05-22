const inquirer = require("inquirer");
// const mysql = require("mysql");
// const cTable = require("console.table");
const connection = require("./db/connection");
const FUNCTIONS = require("./db/dbqueries");
const mainApp = require("./app");

// console.log(`Calling the exported function..the result ${FUNCTIONS.sendDataToDB()}`);
// FUNCTIONS.readEmployees();

// FUNCTIONS.readEmployees(connection);  //figuring out i needed to pass the connection was tricky


//==========================
// Initial Greeting - inquire choices
//==========================
exports.mainMenu= function(){

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
};




//==========================
// Switch options for Initial Greeting
//==========================
const userChoice = function(userResponse){
    switch(userResponse.homeChoice){
        case "View Employees": 
        FUNCTIONS.readEmployees(connection);
        break;

        case "View Roles": 
        FUNCTIONS.readRoles(connection);
        break;

        case "View Departments": 
        FUNCTIONS.readDepartments(connection);
        break;
    }
    
}

mainApp.mainMenu();

//==========================
// READ --> SELECT
//==========================

//==========================
// CONNECTION TO DB
// "action" variable calls the appropriate CRUD function in switch statment associated with the db connection
//==========================

// const connectToDatabase = async (action) => {
//     try{
//         connection = await mysql.createConnection({
//             host: "localhost",
//             port: 3306,
//             user: "root",
//             password: "password",
//             database: "all_employees"
//         });
//         console.log(`Connected to database with id ${connection.threadId}`);
//         //what action
//             console.log(action);
//             switch(action){
//                 case "readEmployees": 
//                 await readEmployees(connection); 
//                 break;
        
//                 case "readRoles": 
//                 await readRoles(connection); 
//                 break;
        
//                 case "readDepartments": 
//                 readDepartments(connection); 
//                 break;
//             }
        
//         connection.end;
//     }catch (error){
//         console.log(error);
//     }
// };
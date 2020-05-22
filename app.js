const inquirer = require("inquirer");
// const mysql = require("mysql");
// const cTable = require("console.table");
const connection = require("./db/connection");
const FUNCTIONS = require("./db/dbqueries");
const mainApp = require("./app"); // needed after i added exports mainMenu
// FUNCTIONS.readEmployees(connection);  //figuring out i needed to pass the connection was tricky (otherwise sync issue)

// console.log(`Calling the exported function..the result ${FUNCTIONS.sendDataToDB()}`);
// FUNCTIONS.readEmployees();



//==========================
// Main Menue - inquire choices
//==========================
exports.mainMenu = ()=> {

    inquirer.prompt([
        {
        type: "list",
        message: "What would you like to do?",
        name: "homeChoice",
        choices: [
            "View Employees",
            "View Roles",
            "View Departments",
            "Add Department"
        ]
        }
    ]).then(function(userResponse){
        // console.log(userResponse);
        userChoice(userResponse);
        // connectToDatabase();
    });
};




//==========================
// Switch options for Main Menu
//==========================
const userChoice = userResponse => {
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

        case "Add Department": 
        // FUNCTIONS.addDepartment(connection);
        addDepartment();
        break;   
    } 
}

//==========================
// **Add Department - inquirer question set
//==========================
const addDepartment = () => {

    inquirer.prompt([
        {
            type: "input",
            name: "newDepartmentName",
            message: "Please enter a name for the new Department"
        }

    ]).then(function(userResponse){
        // i want to send the parameter to the next function
        // console.log(userResponse.newDepartmentName);
        FUNCTIONS.addDepartment(connection, userResponse);        
    });
};


this.mainMenu();

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
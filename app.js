const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const cTable = require("console.table");

let connection;

const connectToDatabase = async () => {
    try{
        connection = await mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "password",
            database: "all_employees"
        });
        console.log(`Connected to database with id ${connection.threadId}`);
        connection.end;
    }catch (error){
        console.log(error);
    }
};

//==========================
// Initial Greeting - inquire choices
//==========================
// inquirer.prompt([
//     {
//         type: "list",
//         message: "**** Welcome!! ****\nWhat would you like to do?",
//         name: "choice",
//         choices: [
//           "View Employees",
//           "View Roles",
//           "View Departments"
//          ]
//       },

// ]).then(function(data){
//     //console.log(data);
//     userChoice(data);
// });

//==========================
// Initial Greeting - switch option functions
//==========================
const userChoice = function(data){
    switch(data.choice){
        case "Add Engineer": 
        //console.log("Engineer");
        choiceEngineer(); 
        break;

        case "View Employees": 
        choiceManager(); 
        break;

        case "View Roles": 
        choiceIntern(); 
        break;

        case "View Departments":
        choiceBuildWebPage();
        break;

    }
}

connectToDatabase();
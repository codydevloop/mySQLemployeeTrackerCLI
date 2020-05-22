const inquirer = require("inquirer");
// const mysql = require("mysql");
// const cTable = require("console.table");
const connection = require("./db/connection");
const FUNCTIONS = require("./db/dbqueries");
// const mainApp = require("./app"); // needed after i added exports mainMenu
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
            "Add New Department",
            "Add New Roll"
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

        case "Add New Department": 
        addDepartment();
        // FUNCTIONS.addDepartment(connection);
        // call inquire function first, it will call the query
        break;
        
        case "Add New Roll": 
        FUNCTIONS.readDepartmentsNoDisplay(connection);
        // addRole();
        //calling query function first, it will call the inquire
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


//==========================
// **Add Role- inquirer question set
// 
//==========================
exports.addRole = (departmentRoles) => {    

    // gets list of deptRoles to dynamically populate the inquirer list
    let deptNameArr =[];
    for(let i=0; i<departmentRoles.length; i++){
        deptNameArr.push(departmentRoles[i].name);
    }

    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Please enter a Tilte for the new Role"
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter a Salary for the new Role"
        },
        {
            type: "list",
            message: "Which Department should I assign this Roll to?",
            name: "departmentId",
            choices: deptNameArr
        }

    ]).then(function(userResponse){

        // i want to send the parameter to the next function
        // console.log(userResponse.newDepartmentName);
        for(let i=0; i<departmentRoles.length; i++) {   
            
            if(departmentRoles[i].name === userResponse.departmentId) {
                // console.log(`Before: ${userResponse.departmentId}`);
                // console.log(`After: ${userResponse.departmentId}`)
                userResponse.departmentId = departmentRoles[i].id;
            }
            
        }
        FUNCTIONS.addRole(connection, userResponse);   
        // i want to send the parameter to the next function
        // console.log(userResponse.newDepartmentName);
        // console.log("we got this far");
        // console.log(rows);
        // FUNCTIONS.addRole(connection, userResponse);        
    });
    
};
    
    


    // console.log(departmentArray());



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
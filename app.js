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
// Main Menu - inquire choices
//==========================
exports.mainMenu = ()=> {

    inquirer.prompt([
        {
        type: "rawlist",
        message: "What would you like to do?\n",
        name: "homeChoice",
        choices: [
            "View Employees",
            "View Roles",
            "View Departments",
            "Add New Department",
            "Add New Roll",
            "Add New Employee"
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

        case "Add New Employee": 
        FUNCTIONS.readRoleAndManger(connection);
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
//==========================
exports.addRoleINQ = (departmentRoles) => {    

    // gets list of deptRoles to dynamically populate the inquirer list
    let deptNameArr =[];
    for(let i=0; i<departmentRoles.length; i++){
        deptNameArr.push(departmentRoles[i].name);
    }

    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Please enter a Title for the new Role"
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

        for(let i=0; i<departmentRoles.length; i++) {   
            
            if(departmentRoles[i].name === userResponse.departmentId) {
                // console.log(`Before: ${userResponse.departmentId}`);
                // console.log(`After: ${userResponse.departmentId}`)
                userResponse.departmentId = departmentRoles[i].id;
            }
        }
        FUNCTIONS.addRoleDB(connection, userResponse);       
    });
    
};

//==========================
// **Add Employee inquirer question set
//==========================
exports.addEmployeeINQ = (roleOptions, managerOptions) => {    
    let roleOptionsArr =[];
    let managerOptionsArr = [];

    //console.log(roleOptions);
    // console.log(managerOptions);

    for(let i=0; i<roleOptions.length; i++){
        if(roleOptions[i].title !== null){
        roleOptionsArr.push(roleOptions[i].title);
        // console.log(roleOptions);
        }
    }  
    for(let i=0; i<managerOptions.length; i++){
        managerOptionsArr.push(`${managerOptions[i].first_name} ${managerOptions[i].last_name}`);
    }  
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Please enter a Employee First Name"
        },
        {
            type: "input",
            name: "last_name",
            message: "Please enter a Employee Last Name"
        },
        {
            type: "list",
            message: "Which Role should the new user be assigned to?",
            name: "role_id",
            choices: roleOptionsArr
        },
        {
            type: "list",
            message: "Which Manager should the new User be assigned to?",
            name: "manager_id",
            choices: managerOptionsArr
        }

    ]).then(function(userResponse){

        // sending back the role id
        for(let i=0; i<roleOptions.length; i++) {   

            if(roleOptions[i].title === userResponse.role_id) {
                userResponse.role_id = roleOptions[i].id;
            }
        }

        // sending back the manager employee id
        for(let i = 0; i<managerOptions.length;i++){
            if(userResponse.manager_id === (`${managerOptions[i].first_name} ${managerOptions[i].last_name}`)){
                userResponse.manager_id = managerOptions[i].id;
            }
        }
        FUNCTIONS.addEmployeeDB(connection, userResponse); 
    
    });
    
};


this.mainMenu();
    




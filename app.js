const inquirer = require("inquirer");
const connection = require("./db/connection");
const FUNCTIONS = require("./db/dbqueries");

// const mysql = require("mysql");
// const cTable = require("console.table");
// const mainApp = require("./app"); // needed after i added exports mainMenu
// FUNCTIONS.readEmployees(connection);  //figuring out i needed to pass the connection was tricky (otherwise sync issue)
const chalk = require('chalk');

//##MIDDLEWARE
const log = console.log;  //used for CHALK


//==========================
// Main Menu - inquirer
//==========================
exports.mainMenu = ()=> {
    inquirer.prompt([
        {
        type: "list",
        message: "\n    MAIN MENU    \n*****************",
        name: "homeChoice",
        choices: [
            "VIEW Employees",
            "VIEW Roles",
            "VIEW Departments",
            "ADD New Employee",
            "ADD New Role",
            "ADD New Department",
            "UPDATE Employee Role"
        ]
        }
    ]).then(function(userResponse){
        // console.log(userResponse);
        userChoice(userResponse);
        // connectToDatabase();
    });
};

//==========================
// Switch for Main Menue
//==========================
const userChoice = userResponse => {
    switch(userResponse.homeChoice){
        case "VIEW Employees": 
        FUNCTIONS.readEmployees(connection);
        break;

        case "VIEW Roles": 
        FUNCTIONS.readRoles(connection);
        break;

        case "VIEW Departments": 
        FUNCTIONS.readDepartments(connection);
        break;

        case "ADD New Department": 
        addDepartmentINQ();
        break;
        
        case "ADD New Role": 
        FUNCTIONS.readDepartmentsNoDisplay(connection);
        //calling sql first to populate inquirer choieces for question
        //Which dept should you assign this roll to
        break;  

        case "ADD New Employee": 
        FUNCTIONS.readRoleAndManger(connection);
        break; 

        case "UPDATE Employee Role": 
        FUNCTIONS.readEmpAndRole(connection);

        
        break; 
    } 
}

//==========================
// **Add Employee inquirer 
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
            message: "Please enter a Employee FIRST NAME"
        },
        {
            type: "input",
            name: "last_name",
            message: "Please enter a Employee LAST NAME"
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
            message: "Please enter a Salary for the new Role $"
        },
        {
            type: "list",
            message: "Which Department should I assign this Role to?",
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
// **Add Department - inquirer question set
//==========================
const addDepartmentINQ = () => {
    // attempt at using chalk to change font color of message
    // let fontControl = `${log(chalk.red("Please enter a name for the new Department"))}`;
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartmentName",
            message: "Please enter a name for the new Department"
            // message: fontControl 
        }
    ]).then(function(userResponse){
        FUNCTIONS.addDepartmentDB(connection, userResponse);        
    });
};

//==========================
// **Add Department - inquirer question set
//==========================
exports.updateEmpRole = (e,r) => {    
    
    let empNameList =[];  //collection to store choices
    let userToBeUpdated; // the user, selected from inquirer list
    let selectedUserInfo;  // the complete employee row of information for the selected user

    //loop to pull list of user names
    for(let i=0; i<e.length; i++){
        empNameList.push(e[i].Employee);
    }

    inquirer.prompt([
        {
            type: "rawlist",
            message: "Which User do you want to update?\n",
            name: "user",
            choices: empNameList
        }
    ]).then(function(userResponse){
        userToBeUpdated = userResponse.user;
        for (let i=0;i<e.length;i++){
            if(userToBeUpdated === e[i].Employee){
                selectedUserInfo = e[i];
            }
        }
         
    }).then(function(){

        let roleChoiceOptions = [];
        let currentSalAndRole = [];
        let selectedRoleInfo = []; // the complete role row of infomation for the new assignment

        for (let i=0;i<r.length; i++){
            roleChoiceOptions.push(`Salary: $${r[i].salary} - Role: ${r[i].title}`);
            
            if(selectedUserInfo.Role_Id === r[i].id){
                currentSalAndRole = roleChoiceOptions[i]; //var for display info below
            }
        }

        log(chalk.yellow(userToBeUpdated)+chalk.red(" is currently making ") + chalk.yellowBright(currentSalAndRole +"\n"));
        
        inquirer.prompt([
            {
                type: "rawlist",
                message: `Select a new "Role" for "${userToBeUpdated}\n"`,
                name: "role",
                choices: roleChoiceOptions
            }
        ]).then(function(userResponse){
            let userString = userResponse.role.split("Role: ");
            //console.log(userString[1]);
            for(let i = 0; i<r.length; i++){
                if (userString[1] === r[i].title){
                    selectedRoleInfo = r[i];
                }
            }    
            FUNCTIONS.updateEmpRole(connection, selectedUserInfo, selectedRoleInfo)
        });
        
    });



};




// this.mainMenu();
    




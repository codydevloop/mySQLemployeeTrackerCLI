const mysql = require("mysql");
const util = require("util");
const chalk = require('chalk');

const log = console.log;  //middleware required for CHALK

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "all_employees"
});

connection.connect(function (error) {
    if (error) {
        throw error;
    }

  log(chalk.yellowBright(`\nConnected to database as id ${connection.threadId}`));
});

connection.query = util.promisify(connection.query);

module.exports = connection;
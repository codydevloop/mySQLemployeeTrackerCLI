
DROP DATABASE IF EXISTS all_employees;
CREATE DATABASE all_employees;

USE all_employees;

-- CREATE department
CREATE TABLE department (
id INTEGER(3) AUTO_INCREMENT NOT NULL,
name VARCHAR(30),
PRIMARY KEY(id)
);
 
 -- SELECT * FROM department;
 
-- CREATE u_role
CREATE TABLE u_role (
id INTEGER(3) AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL (10,2),
department_id INTEGER(3),
PRIMARY KEY(id)
);

-- SELECT * FROM u_role;

-- CREATE employee
CREATE TABLE employee (
id INTEGER AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER(3),
manager_id INTEGER(3),
PRIMARY KEY(id)
);


-- SELECT * FROM employee;



 




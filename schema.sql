
DROP DATABASE IF EXISTS all_employees;
CREATE DATABASE all_employees;

USE all_employees;
-- CREATE department
CREATE TABLE department (
id INTEGER(3) AUTO_INCREMENT NOT NULL,
name VARCHAR(30),
PRIMARY KEY(id)
);

-- SEED department
INSERT INTO department (name)
VALUES ("Information Technology"),("Human Resources"),
 ("Engineering"),("Operations"),("Marketing");
 
 SELECT * FROM department;
 
-- CREATE u_role
CREATE TABLE u_role (
id INTEGER(3) AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL (10,2),
department_id INTEGER(3),
PRIMARY KEY(id)
);

 -- SEED u_role
INSERT INTO u_role (title, salary, department_id)
VALUES ("CIO", 250000, 1),("Engineering Director", 260000, 3),
("HR Analyst", 95000, 2),("Operations Analyst", 90000, 4),
("Marketing Manager", 110000, 5);

SELECT * FROM u_role;

-- CREATE employee
CREATE TABLE employee (
id INTEGER AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER(3),
manager_id INTEGER(3),
PRIMARY KEY(id)
);

 -- SEED employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Danny", "Ocean", 1, 1),("Basher", "Tarr", 2, 1),
("Terry", "Benedict", 4, 3),("Linus","Caldwell",5 , 1),
("Reuben", "Tishkoff", 2, 3),("Livingston","Dell",3,1);

UPDATE employee
SET manager_id = 1
WHERE id = 5;

SELECT * FROM employee;



 




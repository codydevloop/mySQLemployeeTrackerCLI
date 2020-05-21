
DROP DATABASE IF EXISTS all_employees;
CREATE DATABASE all_employees;

USE all_employees;
-- CREATE department
CREATE TABLE department (
id INTEGER AUTO_INCREMENT NOT NULL,
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
id INTEGER AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL (10,2),
department_id INTEGER,
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
role_id INTEGER,
manager_id INTEGER,
PRIMARY KEY(id)
);

 -- SEED employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Danny", "Ocean", 1, 100),("Basher", "Tarr", 2, 100),
("Terry", "Benedict", 4, 200),("Linus","Caldwell",5 , 100),
("Reuben", "Tishkoff", 2, 100),("Livingston","Dell",3,100);

SELECT * FROM employee;

 




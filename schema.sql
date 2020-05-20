
DROP DATABASE IF EXISTS all_employees;
CREATE DATABASE all_employees;

USE all_employees;

CREATE TABLE department (
id INTEGER AUTO_INCREMENT NOT NULL,
name VARCHAR(30),
PRIMARY KEY(id)
);

CREATE TABLE role (
id INTEGER AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL (10,2),
department_id INTEGER,
PRIMARY KEY(id)
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER,
manager_id INTEGER,
PRIMARY KEY(id)
);


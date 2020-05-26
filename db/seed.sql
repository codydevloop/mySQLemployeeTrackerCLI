-- SEED department
INSERT INTO department (name)
VALUES ("Information Technology"),("Human Resources"),
 ("Engineering"),("Operations"),("Marketing");

  -- SEED u_role
INSERT INTO u_role (title, salary, department_id)
VALUES ("CIO", 250000, 1),("Engineering Director", 260000, 3),
("HR Analyst", 95000, 2),("Operations Analyst", 90000, 4),
("Marketing Manager", 110000, 5);

 -- SEED employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Danny", "Ocean", 1, 1),("Basher", "Tarr", 2, 1),
("Terry", "Benedict", 4, 3),("Linus","Caldwell",5 , 1),
("Reuben", "Tishkoff", 2, 3),("Livingston","Dell",3,1);
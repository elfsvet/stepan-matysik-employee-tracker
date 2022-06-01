-- testing data for the tables
INSERT INTO departments (name)
VALUES
('sales'),
('pr'),
('accounting'),
('development');

INSERT INTO roles(title, salary, department_id)
VALUES
('consultant',45000, 1),
('cashier',50000,1),
('smm', 25000,2),
('ads',40000,2),
('acountant lead', 65000,3),
('acountant assistant lead', 30000, 3),
('front-end enginier', 80000,4),
('back-end enginier', 90000, 4),
('full-stack lead',120000,4),
('project manager', 180000, 4);

INSERT INTO employees(first_name,last_name,role_id,manager_id)
VALUES
('Stepan','Matysik',9,NULL),
('Ekaterina','Shabaeva',5,NULL),
('John','Doe',6,NULL),
('Zina','Bolotnova',10,1),
('Gregory','Ekimov',8,3),
('Alex','Zee',7,2),
('Nadya','Barkova',4,1),
('Dmitry','Kibisov',3,2),
('Dinara','Aflyatunova',2,3),
('Karina','Orlova',1,1);
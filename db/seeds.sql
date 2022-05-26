INSERT INTO managers (manager_full_name) 
VALUES
('Alex Gurinovich'),
('Mikhail Shevelev'),
('Viacheslav Savidov');

INSERT INTO departments (department_name)
VALUES
('sales'),
('pr'),
('accounting'),
('development');

INSERT INTO roles(job_title, salary, department)
VALUES
('consultant',45000, 1),
('cashier',50000,1),
('smm', 25000,2),
('ads',40000,2),
('acountant', 65000,3),
('acountant assistant', 30000, 3),
('front-end enginier', 80000,4),
('back-end enginier', 90000, 4),
('full-stack',120000,4),
('project manager', 180000, 4);

INSERT INTO employees(first_name,last_name,role,manager)
VALUES
('Stepan','Matysik',9,2),
('Ekaterina','Shabaeva',5,1),
('John','Doe',6,3),
('','',10,1),
('','',8,1),
('','',7,1),
('','',4,1),
('','',3,1),
('','',2,1),
('','',1,1);
-- need to finishe names
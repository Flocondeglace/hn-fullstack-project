USE `fullstack_project` ;

-- User Types
INSERT INTO user_type(type_name) VALUES 
('Manager'), ('CEO'), ('Employee');

-- User
INSERT INTO user(first_name, last_name, email, type_id) VALUES
('Alpha', 'Beta', 'ab@mail.com',1),
('Gamma', 'Delta', 'gd@mail.com',2),
('Epsilon', 'Dzeta', 'ed@mail.com',3),
('Heta', 'Theta', 'ht@mail.com',3);


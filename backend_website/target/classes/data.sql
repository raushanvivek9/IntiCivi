INSERT INTO users (email, password, role, name) VALUES
('user@test.com', '$2a$10$exampleHashedPassword', 'user', 'Normal User'),
('admin@test.com', '$2a$10$exampleHashedPassword', 'admin', 'Admin');

-- Note: Passwords are hashed with BCrypt. The above is a placeholder. In real scenario, hash '1234'.
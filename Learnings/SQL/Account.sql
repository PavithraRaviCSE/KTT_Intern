-- CREATE tables
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE transactions (
    txn_id SERIAL PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- INSERT (Create)
INSERT INTO users (name) VALUES 
('Alice'), 
('Bob'), 
('Charlie');

INSERT INTO transactions (user_id, amount) VALUES 
(1, 100.00),
(1, 150.50),
(2, 200.00),
(NULL, 300.00);  

-- READ (Select)
-- All users
SELECT * FROM users;

-- All transactions
SELECT * FROM transactions;

-- User with specific ID
SELECT * FROM users WHERE user_id = 2;

-- Transactions for a user
SELECT * FROM transactions WHERE user_id = 1;

-- UPDATE
-- Update a user's name
UPDATE users SET name = 'Robert' WHERE user_id = 2;

-- Update a transaction amount
UPDATE transactions SET amount = 250.00 WHERE txn_id = 3;

-- DELETE
-- Delete a transaction
DELETE FROM transactions WHERE txn_id = 4;

-- Delete a user
DELETE FROM users WHERE user_id = 3;

-- JOIN OPERATIONS

-- INNER JOIN
SELECT 'INNER JOIN' AS join_type, u.name, t.amount
FROM users u
INNER JOIN transactions t ON u.user_id = t.user_id;

-- LEFT JOIN
SELECT 'LEFT JOIN' AS join_type, u.name, t.amount
FROM users u
LEFT JOIN transactions t ON u.user_id = t.user_id;

-- RIGHT JOIN
SELECT 'RIGHT JOIN' AS join_type, u.name, t.amount
FROM users u
RIGHT JOIN transactions t ON u.user_id = t.user_id;

-- FULL OUTER JOIN
SELECT 'FULL OUTER JOIN' AS join_type, u.name, t.amount
FROM users u
FULL OUTER JOIN transactions t ON u.user_id = t.user_id;

-- CROSS JOIN
SELECT 'CROSS JOIN' AS join_type, u.name, t.amount
FROM users u
CROSS JOIN transactions t;

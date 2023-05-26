-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS validify_db;
CREATE USER IF NOT EXISTS 'validify'@'localhost' IDENTIFIED BY 'validify_pwd';
GRANT ALL PRIVILEGES ON `validify_db`.* TO 'validify'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'validify'@'localhost';
FLUSH PRIVILEGES;

CREATE USER 'fullstack-user'@'localhost' IDENTIFIED BY 'fullstack-user';
GRANT ALL PRIVILEGES ON * . * TO 'fullstack-user'@'localhost';
ALTER USER 'fullstack-user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
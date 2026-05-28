DROP SCHEMA IF EXISTS `fullstack_project`;

CREATE SCHEMA `fullstack_project`;
USE `fullstack_project` ;

-- User Type table
CREATE TABLE IF NOT EXISTS `fullstack_project`.`user_type` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `type_name` VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (`id`))
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- User table
CREATE TABLE IF NOT EXISTS `fullstack_project`.`user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) DEFAULT NULL,
  `last_name` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `type_id` BIGINT(20),
  PRIMARY KEY (`id`),
  KEY `fk_type` (`type_id`),
  CONSTRAINT `fk_type` FOREIGN KEY (`type_id`) REFERENCES `user_type` (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;
-- Mon 29 Apr 2019 12:56:03 PM -03
-- Model: New Model    Version: 1.0

-- -----------------------------------------------------
-- Schema music
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `music` ;

CREATE SCHEMA IF NOT EXISTS `music` DEFAULT CHARACTER SET utf8 ;

USE `music` ;

-- -----------------------------------------------------
-- Table `music`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `music`.`user` ;

CREATE TABLE IF NOT EXISTS `music`.`user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `scope` TEXT NOT NULL,
  `cpf` VARCHAR(15) NULL,
  `gender` CHAR NULL,
  `birthDate` DATE NULL,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `createdAt` DATETIME NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `id_UNIQUE` (`idUser` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`contact`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `music`.`contact` ;

CREATE TABLE IF NOT EXISTS `music`.`contact` (
  `idContact` INT NOT NULL AUTO_INCREMENT,
  `user_idUser` INT NOT NULL,
  `email` VARCHAR(65) NULL,
  `phone` VARCHAR(20) NULL,
  PRIMARY KEY (`idContact`),
  UNIQUE INDEX `idContact_UNIQUE` (`idContact` ASC),
  UNIQUE INDEX `idUser_UNIQUE` (`user_idUser` ASC),
  CONSTRAINT `userId`
    FOREIGN KEY (`user_idUser`)
    REFERENCES `music`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`avatar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `music`.`avatar` ;

CREATE TABLE IF NOT EXISTS `music`.`avatar` (
  `image` BLOB NULL,
  `idAvatar` INT NOT NULL AUTO_INCREMENT,
  `user_idUser` INT NOT NULL,
  PRIMARY KEY (`idAvatar`),
  UNIQUE INDEX `id_UNIQUE` (`idAvatar` ASC),
  UNIQUE INDEX `userId_UNIQUE` (`user_idUser` ASC),
  CONSTRAINT `idUser1`
    FOREIGN KEY (`user_idUser`)
    REFERENCES `music`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `music`.`address` ;

CREATE TABLE IF NOT EXISTS `music`.`address` (
  `idAddress` INT NOT NULL AUTO_INCREMENT,
  `user_idUser` INT NOT NULL,
  `street` VARCHAR(65) NULL,
  `number` INT NULL,
  `complement` VARCHAR(125) NULL,
  `city` VARCHAR(65) NULL,
  `state` VARCHAR(65) NULL,
  `zipCode` VARCHAR(15) NULL,
  PRIMARY KEY (`idAddress`),
  UNIQUE INDEX `idAddress_UNIQUE` (`idAddress` ASC),
  UNIQUE INDEX `userId_UNIQUE` USING BTREE (`user_idUser` ASC),
  CONSTRAINT `fk_address_1`
    FOREIGN KEY (`user_idUser`)
    REFERENCES `music`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `music`.`course` ;

CREATE TABLE IF NOT EXISTS `music`.`course` (
  `idCourse` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  PRIMARY KEY (`idCourse`),
  UNIQUE INDEX `idCourse_UNIQUE` (`idCourse` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`class`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `music`.`class` ;

CREATE TABLE IF NOT EXISTS `music`.`class` (
  `idClass` INT NOT NULL AUTO_INCREMENT,
  `vacancies` VARCHAR(45) NULL,
  `instructor` VARCHAR(45) NULL,
  `room` VARCHAR(45) NULL,
  `shift` VARCHAR(45) NULL,
  `course_idCourse` INT NOT NULL,
  PRIMARY KEY (`idClass`),
  UNIQUE INDEX `idClass_UNIQUE` (`idClass` ASC),
  INDEX `fk_class_course1_idx` (`course_idCourse` ASC),
  CONSTRAINT `fk_class_course1`
    FOREIGN KEY (`course_idCourse`)
    REFERENCES `music`.`course` (`idCourse`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`user_has_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `music`.`user_has_course` ;

CREATE TABLE IF NOT EXISTS `music`.`user_has_course` (
  `user_idUser` INT NOT NULL,
  `course_idCourse` INT NOT NULL,
  PRIMARY KEY (`user_idUser`, `course_idCourse`),
  INDEX `fk_user_has_course_course1_idx` (`course_idCourse` ASC),
  INDEX `fk_user_has_course_user1_idx` (`user_idUser` ASC),
  CONSTRAINT `fk_user_has_course_user1`
    FOREIGN KEY (`user_idUser`)
    REFERENCES `music`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_course_course1`
    FOREIGN KEY (`course_idCourse`)
    REFERENCES `music`.`course` (`idCourse`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`class`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `music`.`class` ;

CREATE TABLE IF NOT EXISTS `music`.`class` (
  `idClass` INT NOT NULL AUTO_INCREMENT,
  `vacancies` VARCHAR(45) NULL,
  `instructor` VARCHAR(45) NULL,
  `room` VARCHAR(45) NULL,
  `shift` VARCHAR(45) NULL,
  `course_idCourse` INT NOT NULL,
  PRIMARY KEY (`idClass`),
  UNIQUE INDEX `idClass_UNIQUE` (`idClass` ASC),
  INDEX `fk_class_course1_idx` (`course_idCourse` ASC),
  CONSTRAINT `fk_class_course1`
    FOREIGN KEY (`course_idCourse`)
    REFERENCES `music`.`course` (`idCourse`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`progress`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `music`.`progress` ;

CREATE TABLE IF NOT EXISTS `music`.`progress` (
  `idProgress` INT NOT NULL AUTO_INCREMENT,
  `attendance` VARCHAR(45) NULL,
  `grade` INT NULL,
  PRIMARY KEY (`idProgress`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`class_has_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `music`.`class_has_user` ;

CREATE TABLE IF NOT EXISTS `music`.`class_has_user` (
  `class_idClass` INT NOT NULL,
  `user_idUser` INT NOT NULL,
  `progress_idProgress` INT NOT NULL,
  PRIMARY KEY (`class_idClass`, `user_idUser`),
  INDEX `fk_class_has_user_user1_idx` (`user_idUser` ASC),
  INDEX `fk_class_has_user_class1_idx` (`class_idClass` ASC),
  INDEX `fk_class_has_user_progress1_idx` (`progress_idProgress` ASC),
  UNIQUE INDEX `progress_idProgress_UNIQUE` (`progress_idProgress` ASC),
  CONSTRAINT `fk_class_has_user_class1`
    FOREIGN KEY (`class_idClass`)
    REFERENCES `music`.`class` (`idClass`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_class_has_user_user1`
    FOREIGN KEY (`user_idUser`)
    REFERENCES `music`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_class_has_user_progress1`
    FOREIGN KEY (`progress_idProgress`)
    REFERENCES `music`.`progress` (`idProgress`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
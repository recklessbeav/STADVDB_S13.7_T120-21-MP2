-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema covid_dw
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema covid_dw
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `covid_dw` DEFAULT CHARACTER SET utf8 ;
USE `covid_dw` ;

-- -----------------------------------------------------
-- Table `covid_dw`.`country_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `covid_dw`.`country_table` (
  `country_id` INT NOT NULL,
  `country` VARCHAR(45) NULL,
  `continent` VARCHAR(45) NULL,
  `population` INT NULL,
  `who_region` VARCHAR(45) NULL,
  PRIMARY KEY (`country_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `covid_dw`.`case_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `covid_dw`.`case_table` (
  `case_id` INT NOT NULL,
  `new_cases` INT NULL,
  `total_deaths` INT NULL,
  `new_deaths` INT NULL,
  `total_recovered` INT NULL,
  `new_recovered` INT NULL,
  `active_cases` INT NULL,
  PRIMARY KEY (`case_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `covid_dw`.`date_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `covid_dw`.`date_table` (
  `date_id` INT NOT NULL,
  `day` INT NULL,
  `month` INT NULL,
  `year` INT NULL,
  PRIMARY KEY (`date_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `covid_dw`.`fact_covid`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `covid_dw`.`fact_covid` (
  `total_covid_cases` INT NULL,
  `country_id` INT NOT NULL,
  `case_id` INT NOT NULL,
  `date_id` INT NOT NULL,
  INDEX `fk_fact_covid_country_table_idx` (`country_id` ASC) VISIBLE,
  INDEX `fk_fact_covid_case_table1_idx` (`case_id` ASC) VISIBLE,
  INDEX `fk_fact_covid_date_table1_idx` (`date_id` ASC) VISIBLE,
  CONSTRAINT `fk_fact_covid_country_table`
    FOREIGN KEY (`country_id`)
    REFERENCES `covid_dw`.`country_table` (`country_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_fact_covid_case_table1`
    FOREIGN KEY (`case_id`)
    REFERENCES `covid_dw`.`case_table` (`case_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_fact_covid_date_table1`
    FOREIGN KEY (`date_id`)
    REFERENCES `covid_dw`.`date_table` (`date_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

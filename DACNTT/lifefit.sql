CREATE TABLE `account` (
  `id` integer(11) PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `password` varchar(100) NOT NULL,
  `gender`  varchar(100) null ,
  `weight` float  NULL,
  `height` float  NULL,
  `wakeup_time` datetime DEFAULT Null,
  `sleeping_time` datetime DEFAULT Null                                                                                                                                                                                                            
);

CREATE TABLE `watertracker` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `watergoal` float NOT NULL,
  `dategoal` datetime NOT NULL,
  `account_id` integer(11) NOT NULL
);
CREATE TABLE `watertrackerHistory` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `water` float NOT NULL,
  `time` datetime NOT NULL,
  `watertracker_id` integer(11) NOT NULL
);
CREATE TABLE `notification`(
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `time_noti` datetime NOT NULL,
  `content` varchar(255),
  `account_id` integer(11) NOT NULL
);
CREATE TABLE `period` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `start_date` date NOT NULL,
  `end_date` date  NULL,
  `menstrual_days` TEXT NOT NULL, 
  `account_id` INTEGER NOT NULL,
  `note` VARCHAR(255)  NULL
);

CREATE TABLE `activity` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `goal` BOOLEAN NULL,
  `date` DATE NOT NULL,
  `account_id` INT NOT NULL
);


CREATE TABLE `blood_pressure` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `date` datetime NOT NULL,
  `blood_pressure` float NOT NULL,
  `account_id` integer(11) NOT NULL
);

CREATE TABLE `Heart` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `date` datetime NOT NULL,
  `heartbeat` float NOT NULL,
  `account_id` integer(11) NOT NULL
);

CREATE TABLE `weight` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `goal` float NOT NULL,
  `account_id` integer(11)  UNIQUE NOT NULL
);
CREATE TABLE `weight_history` (
  `id` int  PRIMARY KEY AUTO_INCREMENT,
  `weight` float NOT NULL,
  `date_recorded` date NOT NULL,
  `account_id` integer(11) NOT NULL
 
);
CREATE TABLE `diet` (
  `id` int NOT NULL  PRIMARY KEY AUTO_INCREMENT,
  `goal` integer(15) NOT NULL ,
  `date` date NOT NULL,
  `account_id` integer(11) NOT NULL
);

CREATE TABLE `dietdetail` (
  `id` int NOT NULL  PRIMARY KEY AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `diet_date` datetime  NOT NULL,
  `calo` float NOT NULL,
  `diet_id` int NOT NULL
);


ALTER TABLE `watertracker` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);
ALTER TABLE `notification` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `period` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `activity` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `heart` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);
ALTER TABLE `blood_pressure` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);


ALTER TABLE `weight` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);
ALTER TABLE `weight_history` ADD  FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `diet` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `dietdetail` ADD FOREIGN KEY (`diet_id`) REFERENCES `diet` (`id`);

DELIMITER //

CREATE TRIGGER before_period_insert
BEFORE INSERT ON `period`
FOR EACH ROW
BEGIN
    DECLARE existing_count INT;
    SELECT COUNT(*) INTO existing_count
    FROM `period`
    WHERE `account_id` = NEW.account_id AND MONTH(`start_date`) = MONTH(NEW.start_date) AND YEAR(`start_date`) = YEAR(NEW.start_date);
    IF existing_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Chu kì đã được tạo';
    END IF;
END //

DELIMITER ;
DELIMITER //

CREATE TRIGGER check_unique_date
BEFORE INSERT ON diet
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM diet WHERE date = NEW.date AND account_id = NEW.account_id LIMIT 1) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Đã có mục tiêu cho ngày hôm nay rồi.';
    END IF;
END//

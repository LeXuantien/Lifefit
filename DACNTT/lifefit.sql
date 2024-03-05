CREATE TABLE `account` (
  `id` integer(11) PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `password` varchar(100) NOT NULL,
  `gender` integer NULL,
  `height` integer  NULL,
  `wakeup_time` datetime DEFAULT Null,
  `sleeping_time` datetime DEFAULT Null
);



CREATE TABLE `watertracker` (
  `watergoal` float NOT NULL,
  `dategoal` datetime NOT NULL,
  `account_id` integer(11) NOT NULL
);
CREATE TABLE `notification`(
  `time_noti` TIME,
  `account_id` integer(11) NOT NULL
);
CREATE TABLE `period` (
  `datestarted` datetime NOT NULL,
  `dateend` datetime NOT NULL,
  `account_id` integer(11) NOT NULL,
  `note` varchar(255) NOT NULL
);

CREATE TABLE `activity` (
  `date` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `goal` float NOT NULL,
  `calo` float NOT NULL,
  `account_id` integer(11) NOT NULL
);

CREATE TABLE `weight` (
  `goal` float NOT NULL,
  `Date` datetime NOT NULL,
  `weight` float NOT NULL,
  `account_id` integer(11) NOT NULL
);

CREATE TABLE `diet` (
  `goal` integer(15) NOT NULL ,
  `date_diet` datetime PRIMARY KEY NOT NULL,
  `account_id` integer(11) NOT NULL
);

CREATE TABLE `dietdetail` (
  `name` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `diet_date` datetime  NOT NULL
);



ALTER TABLE `watertracker` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);
ALTER TABLE `notification` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `period` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `activity` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `weight` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `diet` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `dietdetail` ADD FOREIGN KEY (`diet_date`) REFERENCES `diet` (`date_diet`);


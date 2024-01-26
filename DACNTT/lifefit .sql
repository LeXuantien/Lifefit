CREATE TABLE `account` (
  `id` integer(11) PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `birthday` datetime NOT NULL,
  `password` varchar(100) NOT NULL
);

CREATE TABLE `profile` (
  `gender` integer NOT NULL,
  `height` integer NOT NULL,
  `account_id` integer(11) NOT NULL,
  `wakeup_time` datetime DEFAULT Null,
  `sleeping_time` datetime DEFAULT Null
);

CREATE TABLE `watertracker` (
  `id` integer(11) NOT NULL,
  `watergoal` float NOT NULL,
  `dategoal` datetime NOT NULL,
  `account_id` integer(11) NOT NULL
);

CREATE TABLE `period` (
  `id` integer(11) NOT NULL,
  `datestarted` datetime NOT NULL,
  `dateend` datetime NOT NULL,
  `account_id` integer(11) NOT NULL,
  `note` varchar(255) NOT NULL
);

CREATE TABLE `activity` (
  `id` integer(11) NOT NULL ,
  `goal` float NOT NULL,
  `account_id` integer(11) NOT NULL
);

CREATE TABLE `detailactivity` (
  `id` integer(11) NOT NULL ,
  `date` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `calo` float NOT NULL,
  `activity_id` integer(11) NOT NULL
);

CREATE TABLE `weight` (
  `id` integer(11) NOT NULL,
  `goal` float NOT NULL,
  `Date` datetime NOT NULL,
  `weight` float NOT NULL,
  `account_id` integer(11) NOT NULL
);

ALTER TABLE `profile` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `watertracker` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `period` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `activity` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `detailactivity` ADD FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`);

ALTER TABLE `weight` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

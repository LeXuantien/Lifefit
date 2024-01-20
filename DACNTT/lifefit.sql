
CREATE TABLE `account` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL
);

CREATE TABLE `profile` (
  `id` char(36) NOT NULL,
  `gender` integer NOT NULL,
  `account_id` int(11) NOT NULL,
  `wakeup_time` datetime DEFAULT Null,
  `sleeping_time` datetime DEFAULT Null
);

ALTER TABLE `profile` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

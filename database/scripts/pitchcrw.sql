ALTER TABLE `users` ADD `publication_url` VARCHAR(255)  NULL  DEFAULT NULL  AFTER `company`;
ALTER TABLE `users` ADD `author_url` VARCHAR(255)  NULL  DEFAULT NULL  AFTER `publication_url`;
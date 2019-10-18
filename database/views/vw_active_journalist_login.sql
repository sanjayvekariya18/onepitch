CREATE
  OR REPLACE VIEW `vw_active_journalist_login` AS
SELECT `u`.`id`         AS `id`,
       `u`.`full_name`  AS `full_name`,
       `u`.`email`      AS `email`,
       `u`.`last_login` AS `last_login`
FROM `users` u
WHERE (`u`.`role` = 1 AND u.last_login is not null)
ORDER BY `u`.`last_login` DESC;
CREATE OR REPLACE VIEW vw_journalist_industry_subscription AS
SELECT `u`.`id`        AS `id`,
       `u`.`full_name` AS `full_name`,
       `u`.`company`   AS `company`,
       `u`.`email`     AS `email`,
       `i`.`title`     AS `industry`
FROM `users` `u`
            JOIN `user_industry` `ui` ON (`ui`.`user_id` = `u`.`id`)
            JOIN `industries` `i` ON (`i`.`id` = `ui`.`industry_id`)
WHERE `u`.`role` = 1
ORDER BY `i`.`title`;
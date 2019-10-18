CREATE OR REPLACE VIEW vw_saved_pitches AS
SELECT `sp`.`id`         AS `id`,
       `sp`.`pitch_id`   AS `pitch_id`,
       `sp`.`user_id`    AS `user_id`,
       `u`.`full_name`   AS `full_name`,
       `sp`.`created_at` AS `date saved`
FROM `saved_pitches` sp
            JOIN `users` u on (`u`.`id` = `sp`.`user_id`);
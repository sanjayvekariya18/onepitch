CREATE OR REPLACE VIEW `vw_brand_index_cl` AS
SELECT `uccl`.`id`            AS `id`,
       `uccl`.`user_id`       AS `user_id`,
       `jui`.`full_name`      AS `journalist_name`,
       `uccl`.`brand_user_id` AS `brand_user_id`,
       `pui`.`full_name`      AS `publicist_name`,
       `uccl`.`clicked`       AS `clicked`,
       `uccl`.`created_at`    AS `created_at`
FROM `user_company_clicks_logs` uccl
       LEFT JOIN `users` `pui` ON (`pui`.`id` = `uccl`.`brand_user_id`)
       LEFT JOIN `users` `jui` ON (`jui`.`id` = `uccl`.`user_id`)
;
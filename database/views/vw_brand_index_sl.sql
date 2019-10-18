CREATE OR REPLACE VIEW `vw_brand_index_sl` AS
SELECT ucsl.`id`         AS `id`,
       ucsl.`user_id`    AS `user_id`,
       u.`full_name`     AS `full_name`,
       ucsl.`term`       AS `term`,
       i.`title`         AS `title`,
       it.`title`        AS `industry_title`,
       ucsl.`created_at` AS `created_at`
FROM `user_company_search_logs` ucsl
       LEFT JOIN `industries` i ON (ucsl.`industry_id` = i.`id`)
       LEFT JOIN `industry_topics` it ON (ucsl.`topic_id` = it.`id`)
       LEFT JOIN `users` u ON (ucsl.`user_id` = u.`id`)
;
ALTER TABLE `users`
    ADD `vc` TINYINT(1) NOT NULL DEFAULT '0' AFTER `has_industry`;
ALTER TABLE `industries`
    ADD `deleted_at` DATETIME NULL AFTER `updated_at`;
ALTER TABLE `industry_topics`
    ADD `deleted_at` DATETIME NULL AFTER `updated_at`;

UPDATE industry_topics
SET deleted_at = curdate()
WHERE id NOT IN (7,
                 8,
                 11,
                 62,
                 90,
                 103,
                 111,
                 114,
                 181);


UPDATE industries
SET deleted_at = curdate()
WHERE id NOT IN (1,
                 2,
                 4,
                 7,
                 9,
                 10,
                 12,
                 13,
                 14,
                 16,
                 18,
                 19,
                 20,
                 27,
                 30,
                 34,
                 35,
                 43,
                 47,
                 60);
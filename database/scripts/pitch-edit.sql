CREATE TABLE `pitch_edits`
(
  `id`           int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id`      int(10) unsigned NOT NULL,
  `pitch_id`     int(10) unsigned NOT NULL,
  `status`       tinyint(4)       NOT NULL               DEFAULT '0',
  `subject`      varchar(40) COLLATE utf8mb4_unicode_ci  DEFAULT NULL,
  `company`      varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website`      varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `what_point_1` varchar(280) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `what_point_2` varchar(280) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `what_point_3` varchar(280) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `what_point_4` varchar(280) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `what_point_5` varchar(280) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `why_point_1`  varchar(280) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `why_point_2`  varchar(280) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `why_point_3`  varchar(280) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `why_point_4`  varchar(280) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `why_point_5`  varchar(280) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at`   datetime                                DEFAULT NULL,
  `updated_at`   datetime                                DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pitch_edits_user_id_index` (`user_id`),
  KEY `pitch_edits_pitch_id_index` (`pitch_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
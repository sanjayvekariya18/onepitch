CREATE TABLE `user_alerts`
(
    `user_id`    int(10) unsigned NOT NULL,
    `message`    text,
    `link`       varchar(255) DEFAULT NULL,
    `notifiable` tinyint(1)   DEFAULT '1',
    `read_at`    datetime     DEFAULT NULL,
    `created_at` datetime     DEFAULT NULL,
    `updated_at` datetime     DEFAULT NULL,
    `deleted_at` datetime     DEFAULT NULL,
    KEY `user_alerts_user_idx` (`user_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
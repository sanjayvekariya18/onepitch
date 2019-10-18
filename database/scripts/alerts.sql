CREATE TABLE `alerts`
(
    `id`                        bigint(11) unsigned NOT NULL AUTO_INCREMENT,
    `user_id`                   varchar(255)                 DEFAULT NULL COMMENT 'Specific UserId Filter',
    `role`                      tinyint(4)                   DEFAULT NULL COMMENT 'Specific UserRole Filter',
    `inquiry_industry_topic_id` int(11) unsigned             DEFAULT NULL COMMENT 'Industry Topic subscriptions (inquiry)',
    `pitch_industry_topic_id`   int(11) unsigned             DEFAULT NULL COMMENT 'Industry Topic subscriptions (journalist)',
    `location`                  varchar(255)                 DEFAULT NULL COMMENT 'UserLocation Filter',
    `link`                      varchar(255)                 DEFAULT NULL,
    `message`                   text COMMENT 'Alert message',
    `due_date`                  datetime                     DEFAULT NULL COMMENT 'Send at specific time',
    `status`                    tinyint(4) unsigned NOT NULL DEFAULT '1',
    `created_at`                datetime                     DEFAULT NULL,
    `updated_at`                datetime                     DEFAULT NULL,
    `deleted_at`                datetime                     DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
CREATE OR REPLACE VIEW vw_journalist_topic_subscription AS
SELECT DISTINCT u.id,
                u.full_name,
                u.company,
                u.email,
                it.`title` AS 'topic'
FROM users u
       JOIN user_industry ui ON ui.user_id = u.id
       JOIN user_industry_topics uit ON ui.id = uit.user_industry_id
       JOIN `industry_topics` it ON it.`id` = uit.`topic_id`
WHERE u.role = 1
ORDER BY it.title
;
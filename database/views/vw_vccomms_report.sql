CREATE OR REPLACE VIEW vw_vccomms_report AS (
    SELECT u.id, u.full_name, i.title AS industry, it.title AS topic, u.created_at
    FROM users u
             JOIN user_industry ui ON (u.id = ui.user_id)
             JOIN industries i ON (ui.industry_id = i.id)
             LEFT JOIN user_industry_topics uit ON (uit.`user_industry_id` = ui.id)
             LEFT JOIN industry_topics it ON (it.id = uit.`topic_id`)
    WHERE vc = 1
    ORDER BY u.full_name
);
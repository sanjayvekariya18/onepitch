CREATE OR REPLACE VIEW vw_brand_index AS
SELECT uc.id         AS id,
       uc.user_id    AS user_id,
       u.full_name   AS full_name,
       uc.company    AS company,
       uc.website    AS website,
       uc.location   AS location,
       uc.created_at AS created_at
FROM user_companies uc
       JOIN users u ON uc.user_id = u.id
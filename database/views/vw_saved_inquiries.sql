CREATE OR REPLACE VIEW vw_saved_inquiries AS (
  SELECT si.id,
         si.inquiry_id,
         si.user_id,
         u.full_name,
         si.created_at as date_saved
  FROM saved_inquiries si
         JOIN users u ON u.id = si.user_id
);
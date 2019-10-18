SELECT DISTINCT(REPLACE(it.title, "/", "-"))                                                            AS topic,
               p.id                                                                                     AS pitch_id,
               p.user_id                                                                                AS publicist_id,
               pms.journalist_email                                                                     AS journalist_email,
               pms.journalist_id                                                                        AS journalist_id,
               pms.created_at                                                                           AS response_created_at,
               pms.updated_at                                                                           AS response_updated_at,
               ou.company                                                                               AS outlet,
               ''                                                                                       AS outlet_type,
               p.subject                                                                                AS subject,

               (SELECT count(*)
                FROM pitch_mail_statistics
                WHERE pitch_mail_statistics.pitch_id = p.id)                                            AS number_of_responses,

               (SELECT count(*) FROM pitches WHERE pitches.user_id = p.user_id)                         AS number_of_pitches_user,
               TRUNCATE(TIMESTAMPDIFF(MINUTE, p.accepted_at, pms.created_at) / 60,
                        2)                                                                              AS time_until_response_received,
               DAYNAME(pms.created_at)                                                                  AS day_of_response,
               (SELECT count(*)
                FROM pitch_industry
                WHERE pitch_industry.pitch_id = p.id)                                                   AS number_of_industries,
               (SELECT COUNT(DISTINCT (topic_id))
                FROM pitch_industry
                       JOIN pitch_industry_topics ON (pitch_industry.`id` = pitch_industry_topics.`pitch_industry_id`)
                WHERE pitch_industry.pitch_id = p.id)                                                   AS number_of_topics,
               CHAR_LENGTH(p.`SUBJECT`)                                                                 AS subject_line_character_lenght,
               wordcount(p.`SUBJECT`)                                                                   AS subject_line_word_count,
               wordcount(p.`what_point_1`)                                                              AS word_count_what,
               wordcount(
                   CONCAT(p.`why_point_1`, ' ', p.`why_point_2`, ' ', p.`why_point_3`))                 AS word_count_why,
               IF(p.website IS NOT NULL, 'yes', 'no')                                                   AS hyperlink,
               IF((SELECT COUNT(*) FROM pitch_press_releases WHERE pitch_id = p.id), 'yes',
                  'no')                                                                                 AS press_release,
               IF((SELECT COUNT(*) FROM pitch_files WHERE pitch_id = p.id), 'yes',
                  'no')                                                                                 AS media_attachments
FROM pitches p
       JOIN `pitch_industry` pi ON (pi.pitch_id = p.id)
       JOIN `pitch_industry_topics` pit ON (pi.id = pit.pitch_industry_id)
       JOIN `industry_topics` it ON (pit.topic_id = it.id)
       LEFT JOIN pitch_mail_statistics pms ON (pms.`pitch_id` = p.id)
       LEFT JOIN users ou ON (ou.`id` = pms.journalist_id)
ORDER BY topic
<?php

namespace App\Repositories\Journalist;

use App\Models\User;
use App\Repositories\User\UserRepository;
use Illuminate\Database\Eloquent\Builder;
use DB;

class JournalistRepository extends UserRepository implements JournalistRepositoryInterface
{
    /**
     * @return Builder
     */
    public function getQuery(): Builder
    {
        return parent::getQuery()->where('role', User::ROLE_JOURNALIST);
    }

    public function getApprovedJournalistStatistics()
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT
                    users.id,
                    users.full_name,
                    users.email,
                    CASE WHEN COUNT(inquiries.id) > 0 THEN 'Yes' ELSE 'No' END AS inquiry_submitted,
                    IF(ui.pitch_subscription_count, ui.pitch_subscription_count, 0) AS pitch_subscription_count,
                    IF(uit.pitch_topic_subscription_count, uit.pitch_topic_subscription_count, 0) AS pitch_topic_subscription_count
                  FROM users
                  LEFT JOIN inquiries
                    ON inquiries.user_id = users.id
                  LEFT JOIN (
                    SELECT
                      COUNT(user_industry.user_id) AS pitch_subscription_count,
                        user_industry.user_id
                    FROM user_industry
                    GROUP BY user_industry.user_id
                  ) AS ui 
                  ON ui.user_id = users.id
                
                  LEFT JOIN (
                    SELECT
                      COUNT(user_industry_topics.user_industry_id) AS pitch_topic_subscription_count,
                        user_industry.user_id
                    FROM user_industry
                    LEFT JOIN user_industry_topics
                      ON user_industry_topics.user_industry_id = user_industry.id
                    GROUP BY user_industry.user_id
                  ) AS uit 
                    ON uit.user_id = users.id
                
                  WHERE 
                    users.role = 1 
                  AND 
                    users.approved = 1
                  GROUP BY
                    users.id,
                    users.full_name,
                    users.email,
                    ui.pitch_subscription_count,
                    uit.pitch_topic_subscription_count;
                ")
        );

        return $results;
    }

    public function getDeclinedJournalistStatistics()
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT
                    users.id,
                    users.full_name,
                    users.email,
                    CASE WHEN COUNT(inquiries.id) > 0 THEN 'Yes' ELSE 'No' END AS inquiry_submitted,
                     IF(ui.pitch_subscription_count, ui.pitch_subscription_count, 0) AS pitch_subscription_count,
                    IF(uit.pitch_topic_subscription_count, uit.pitch_topic_subscription_count, 0) AS pitch_topic_subscription_count
                  FROM users
                  LEFT JOIN inquiries
                    ON inquiries.user_id = users.id
                  LEFT JOIN (
                    SELECT
                      COUNT(user_industry.user_id) AS pitch_subscription_count,
                        user_industry.user_id
                    FROM user_industry
                    GROUP BY user_industry.user_id
                  ) AS ui 
                  ON ui.user_id = users.id
                
                  LEFT JOIN (
                    SELECT
                      COUNT(user_industry_topics.user_industry_id) AS pitch_topic_subscription_count,
                        user_industry.user_id
                    FROM user_industry
                    LEFT JOIN user_industry_topics
                      ON user_industry_topics.user_industry_id = user_industry.id
                    GROUP BY user_industry.user_id
                  ) AS uit 
                    ON uit.user_id = users.id
                
                  WHERE 
                    users.role = 1 
                  AND 
                    users.approved = 0
                  GROUP BY
                    users.id,
                    users.full_name,
                    users.email,
                    ui.pitch_subscription_count,
                    uit.pitch_topic_subscription_count;
                ")
        );

        return $results;
    }
}
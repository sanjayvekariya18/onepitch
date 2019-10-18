<?php

namespace App\Repositories\Publicist;

use DB;
use App\Models\User;
use App\Repositories\User\UserRepository;
use Illuminate\Database\Eloquent\Builder;

class PublicistRepository extends UserRepository implements PublicistRepositoryInterface
{
    /**
     * @return Builder
     */
    public function getQuery () : Builder
    {
        return parent::getQuery()->where('role', User::ROLE_PUBLICIST);
    }

    public function getPublicistSubscriptions()
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT
                    users.id,
                    users.full_name,
                    users.email,
                    CASE WHEN COUNT(pitches.id) > 0 THEN 'Yes' ELSE 'No' END AS pitch_submitted,
                    COUNT(pms.id) as pitch_responses,
                    IF(ui.inquiry_subscription_count, ui.inquiry_subscription_count, 0) as inquiry_subscription_count,
                    IF(uit.inquiry_topic_subscription_count, uit.inquiry_topic_subscription_count, 0) AS inquiry_topic_subscription_count
                  FROM users
                  LEFT JOIN pitches
                    ON pitches.user_id = users.id
                  LEFT JOIN pitch_mail_statistics pms ON pms.pitch_id = pitches.id
                  LEFT JOIN (
                    SELECT
                      COUNT(user_industry.user_id) AS inquiry_subscription_count,
                        user_industry.user_id
                    FROM user_industry
                    GROUP BY user_industry.user_id
                  ) AS ui 
                  ON ui.user_id = users.id
                    
                  LEFT JOIN (
                    SELECT
                      COUNT(user_industry_topics.user_industry_id) AS inquiry_topic_subscription_count,
                        user_industry.user_id
                    FROM user_industry
                    LEFT JOIN user_industry_topics
                    ON user_industry_topics.user_industry_id = user_industry.id
                    GROUP BY user_industry.user_id
                  ) AS uit 
                  ON uit.user_id = users.id
                    
                  WHERE 
                    users.role = 2
                  GROUP BY
                    users.id,
                    users.full_name,
                    users.email,
                    ui.inquiry_subscription_count,
                    uit.inquiry_topic_subscription_count;
                ")
        );

        return $results;
    }
}